# Guide de configuration - Assistant IA

Ce guide vous explique comment configurer l'assistant IA pour le Skull King Score Keeper.

## 📋 Prérequis

1. **Compte OpenAI** avec une clé API
2. **Projet Supabase** (optionnel mais recommandé pour le RAG)
3. **Node.js** et npm installés

## 🔧 Configuration

### 1. Installation des dépendances

```bash
npm install
```

Les dépendances suivantes seront installées :
- `ai` - Vercel AI SDK
- `openai` - Client OpenAI
- `@supabase/supabase-js` - Client Supabase
- `tsx` - Pour exécuter les scripts TypeScript

### 2. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
# OpenAI
OPENAI_API_KEY=sk-votre-cle-api-openai

# Supabase (optionnel - pour le RAG)
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_KEY=votre-service-key
```

**Note** : L'assistant IA fonctionnera même sans Supabase, mais sans le RAG (Recherche Augmentée par Génération), il ne pourra pas accéder aux règles spécifiques du jeu.

### 3. Configuration Supabase (Optionnel mais recommandé)

#### Étape 1 : Créer le projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez l'URL et la service key

#### Étape 2 : Activer l'extension pgvector

Dans l'éditeur SQL de Supabase, exécutez :

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

#### Étape 3 : Créer les tables et fonctions

Exécutez le script SQL dans `lib/supabase/schema.sql` :

```sql
-- Copiez-collez le contenu de lib/supabase/schema.sql
-- dans l'éditeur SQL de Supabase
```

Ou utilisez le MCP Supabase si configuré :

```
"Utilise le MCP Supabase pour exécuter le script lib/supabase/schema.sql"
```

### 4. Préparer les règles du jeu

#### Étape 1 : Extraire le texte des PDFs

Vous devez créer deux fichiers markdown :
- `data/rules-old.md` - Règles de la version classique
- `data/rules-new.md` - Règles de la version nouvelle

**Structure recommandée** :

```markdown
# Règles Skull King - Version Classique

## Introduction
[Contenu de l'introduction]

## Déroulement du jeu
[Contenu du déroulement]

## Calcul des scores
[Contenu du calcul des scores]

## Bonus
[Contenu des bonus]
...
```

**Astuce** : Utilisez un outil d'extraction de texte PDF ou copiez manuellement le contenu des PDFs fournis.

#### Étape 2 : Générer les embeddings

Une fois les fichiers markdown créés, exécutez :

```bash
npm run generate-embeddings
```

Ce script va :
1. Lire les fichiers `data/rules-old.md` et `data/rules-new.md`
2. Les découper en sections (par titre `##`)
3. Générer un embedding pour chaque section via OpenAI
4. Stocker les embeddings dans Supabase

**Note** : Assurez-vous d'avoir configuré les variables d'environnement avant d'exécuter ce script.

## 🚀 Utilisation

Une fois configuré, l'assistant IA est accessible via le bouton flottant en bas à droite de toutes les pages.

### Fonctionnalités

- **Réponses contextuelles** : L'assistant connaît la version du jeu sélectionnée
- **RAG (si Supabase configuré)** : L'assistant peut rechercher dans les règles pour donner des réponses précises
- **Ton pirate** : L'assistant utilise un langage thématique pirate
- **Streaming** : Les réponses s'affichent en temps réel

## 🐛 Dépannage

### L'assistant ne répond pas

1. Vérifiez que `OPENAI_API_KEY` est bien configurée dans `.env.local`
2. Vérifiez les logs du serveur Next.js pour voir les erreurs
3. Assurez-vous que le modèle OpenAI est disponible (gpt-4o ou gpt-4-turbo-preview)

### Le RAG ne fonctionne pas

1. Vérifiez que Supabase est configuré (`NEXT_PUBLIC_SUPABASE_URL` et `SUPABASE_SERVICE_KEY`)
2. Vérifiez que les embeddings ont été générés (`npm run generate-embeddings`)
3. Vérifiez que la fonction `match_rules` existe dans Supabase
4. Consultez les logs de l'API route pour voir les erreurs

### Erreur lors de la génération des embeddings

1. Vérifiez que les fichiers `data/rules-old.md` et `data/rules-new.md` existent
2. Vérifiez que vous avez des crédits OpenAI suffisants
3. Vérifiez que la table `rules_embeddings` existe dans Supabase
4. Vérifiez que l'extension `vector` est activée dans Supabase

## 📝 Notes

- Sans Supabase, l'assistant fonctionne mais avec des connaissances générales uniquement
- Les embeddings sont générés une seule fois (sauf si vous les régénérez)
- Le coût des embeddings dépend du nombre de sections dans vos règles
- Le streaming des réponses améliore l'expérience utilisateur

## 🔐 Sécurité

- Ne commitez jamais le fichier `.env.local`
- Utilisez la service key de Supabase uniquement côté serveur
- Limitez l'accès à l'API route si nécessaire (rate limiting)

