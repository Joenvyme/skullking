/**
 * Script pour générer les embeddings des règles du jeu
 * 
 * Usage:
 * 1. Créer les fichiers data/rules-old.md et data/rules-new.md
 * 2. Configurer les variables d'environnement (OPENAI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY)
 * 3. Exécuter: npx tsx lib/ai/generate-embeddings.ts
 */

import { createClient } from '@supabase/supabase-js'
import { OpenAI } from 'openai'
import fs from 'fs'
import path from 'path'

interface RuleSection {
  section: string
  content: string
  version: 'old' | 'new'
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY
const openaiApiKey = process.env.OPENAI_API_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes')
  process.exit(1)
}

if (!openaiApiKey) {
  console.error('❌ Variable d\'environnement OPENAI_API_KEY manquante')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)
const openai = new OpenAI({ apiKey: openaiApiKey })

function splitIntoSections(markdown: string, version: 'old' | 'new'): RuleSection[] {
  const sections: RuleSection[] = []
  const lines = markdown.split('\n')
  let currentSection = ''
  let currentContent: string[] = []

  for (const line of lines) {
    if (line.startsWith('## ')) {
      // Sauvegarder la section précédente
      if (currentSection) {
        sections.push({
          section: currentSection,
          content: currentContent.join('\n').trim(),
          version,
        })
      }
      currentSection = line.replace('## ', '').trim()
      currentContent = []
    } else if (line.startsWith('### ')) {
      // Sous-sections - on les inclut dans le contenu
      currentContent.push(line)
    } else {
      currentContent.push(line)
    }
  }

  // Ajouter la dernière section
  if (currentSection) {
    sections.push({
      section: currentSection,
      content: currentContent.join('\n').trim(),
      version,
    })
  }

  return sections
}

async function generateEmbeddings() {
  console.log('🚀 Début de la génération des embeddings...\n')

  // Vérifier que les fichiers existent
  const oldRulesPath = path.join(process.cwd(), 'data', 'rules-old.md')
  const newRulesPath = path.join(process.cwd(), 'data', 'rules-new.md')

  if (!fs.existsSync(oldRulesPath)) {
    console.error(`❌ Fichier non trouvé: ${oldRulesPath}`)
    console.log('💡 Créez le fichier data/rules-old.md avec les règles de la version classique')
    return
  }

  if (!fs.existsSync(newRulesPath)) {
    console.error(`❌ Fichier non trouvé: ${newRulesPath}`)
    console.log('💡 Créez le fichier data/rules-new.md avec les règles de la version nouvelle')
    return
  }

  // Charger les règles
  const oldRules = fs.readFileSync(oldRulesPath, 'utf-8')
  const newRules = fs.readFileSync(newRulesPath, 'utf-8')

  // Découper en sections
  const oldSections = splitIntoSections(oldRules, 'old')
  const newSections = splitIntoSections(newRules, 'new')

  const allSections = [...oldSections, ...newSections]

  console.log(`📚 ${allSections.length} sections trouvées (${oldSections.length} anciennes, ${newSections.length} nouvelles)\n`)

  // Vider la table existante (optionnel - commentez si vous voulez garder les anciens embeddings)
  console.log('🗑️  Suppression des anciens embeddings...')
  const { error: deleteError } = await supabase.from('rules_embeddings').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  
  if (deleteError) {
    console.warn('⚠️  Erreur lors de la suppression:', deleteError.message)
  } else {
    console.log('✅ Anciens embeddings supprimés\n')
  }

  // Générer et stocker les embeddings
  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < allSections.length; i++) {
    const section = allSections[i]
    
    try {
      console.log(`[${i + 1}/${allSections.length}] Génération de l'embedding pour: "${section.section}" (${section.version})...`)

      // Générer l'embedding
      const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: section.content,
      })

      const embedding = embeddingResponse.data[0].embedding

      // Insérer dans Supabase
      const { error } = await supabase.from('rules_embeddings').insert({
        game_version: section.version,
        section: section.section,
        content: section.content,
        embedding: embedding,
        metadata: {
          section: section.section,
          version: section.version,
        },
      })

      if (error) {
        console.error(`❌ Erreur lors de l'insertion:`, error.message)
        errorCount++
      } else {
        console.log(`✅ Embedding créé avec succès\n`)
        successCount++
      }

      // Petite pause pour éviter de surcharger l'API
      await new Promise((resolve) => setTimeout(resolve, 100))
    } catch (error: any) {
      console.error(`❌ Erreur pour "${section.section}":`, error.message)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`✅ Terminé ! ${successCount} embeddings créés, ${errorCount} erreurs`)
  console.log('='.repeat(50))
}

// Exécuter le script
generateEmbeddings().catch(console.error)

