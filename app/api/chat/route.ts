import { OpenAI } from 'openai'
import { createClient } from '@supabase/supabase-js'
import { streamText } from 'ai'
import { openai as openaiModel } from '@ai-sdk/openai'
import { checkRateLimit } from '@/lib/api/rate-limit'

// Configuration Supabase (à remplacer par vos variables d'environnement)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ''

// Configuration OpenAI
const openaiApiKey = process.env.OPENAI_API_KEY || ''

// Client Supabase
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

// Fonction pour générer un embedding
async function getEmbedding(text: string): Promise<number[]> {
  if (!openaiApiKey) {
    console.warn('OPENAI_API_KEY not configured, skipping embedding generation')
    return []
  }

  try {
    const openaiClient = new OpenAI({ apiKey: openaiApiKey })
    const response = await openaiClient.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    })
    return response.data[0].embedding
  } catch (error) {
    console.error('Error generating embedding:', error)
    return []
  }
}

export async function POST(req: Request) {
  try {
    // Rate limiting - identifier par IP
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown'
    
    const rateLimit = checkRateLimit(ip)
    
    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({
          error: `Limite de requêtes atteinte. Maximum ${rateLimit.remaining} requêtes par heure. Réessayez dans ${Math.ceil((rateLimit.resetTime - Date.now()) / 1000 / 60)} minutes.`,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': '20',
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          },
        }
      )
    }

    const { messages, gameVersion = 'old' } = await req.json()

    if (!messages || messages.length === 0) {
      return new Response('No messages provided', { status: 400 })
    }

    const lastMessage = messages[messages.length - 1]
    const userQuestion = lastMessage.content

    // Limiter la longueur de la question
    if (userQuestion.length > 500) {
      return new Response(
        JSON.stringify({ error: 'La question est trop longue (maximum 500 caractères)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Récupération du contexte depuis Supabase (si configuré)
    let context = ''
    if (supabase && openaiApiKey) {
      try {
        const queryEmbedding = await getEmbedding(userQuestion)
        
        if (queryEmbedding.length > 0) {
          const { data: rules, error } = await supabase.rpc('match_rules', {
            query_embedding: queryEmbedding,
            match_threshold: 0.78,
            match_count: 5,
            game_version: gameVersion,
          })

          if (!error && rules && rules.length > 0) {
            context = rules.map((r: any) => r.content).join('\n\n')
          }
        }
      } catch (error) {
        console.error('Error fetching context from Supabase:', error)
        // Continue sans contexte si Supabase n'est pas configuré
      }
    }

    // Construction du prompt système
           const systemPrompt = `Tu es l&apos;Oracle du Skull King, un assistant expert des règles du jeu de cartes Skull King.

Version du jeu : ${gameVersion === 'new' ? 'NOUVELLE' : 'CLASSIQUE'}

Ton rôle :
- Répondre précisément aux questions sur les règles
- Utiliser un ton pirate amical (ahoy, matelot, etc.)
- Être concis et clair
- Citer les règles exactes quand c'est utile
- Si tu ne sais pas quelque chose, dis-le honnêtement

${context ? `\nContexte des règles pertinentes :\n${context}\n` : ''}

Règles de réponse :
- Reste dans le thème pirate
- Maximum 3-4 phrases par réponse
- Propose des exemples si la règle est complexe`

    // Vérifier que la clé API est configurée
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'OPENAI_API_KEY n\'est pas configurée. Veuillez créer un fichier .env.local avec votre clé API OpenAI.' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Génération de la réponse avec streaming
    // La clé API est automatiquement lue depuis OPENAI_API_KEY
    const result = await streamText({
      model: openaiModel('gpt-4o'),
      system: systemPrompt,
      messages: messages.slice(0, -1).concat({
        role: 'user',
        content: userQuestion,
      }),
      temperature: 0.7,
      maxTokens: 500, // Limiter le nombre de tokens pour contrôler les coûts
    })

    // Ajouter les headers de rate limit à la réponse
    const response = result.toDataStreamResponse()
    response.headers.set('X-RateLimit-Limit', '20')
    response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString())
    response.headers.set('X-RateLimit-Reset', new Date(rateLimit.resetTime).toISOString())
    
    return response
  } catch (error) {
    console.error('Error in chat API:', error)
    return new Response(
      JSON.stringify({ error: 'Une erreur est survenue lors de la génération de la réponse' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

