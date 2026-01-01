# Instructions Cursor - PWA Skull King Score Keeper

## 📋 Vue d'ensemble du projet

Créer une Progressive Web App (PWA) pour compter les points du jeu de cartes Skull King, avec un assistant IA intégré pour répondre aux questions sur les règles. L'application doit supporter deux versions du jeu (ancienne et nouvelle) avec des règles différentes.

## 🎯 Objectifs principaux

1. **PWA complète** - Application installable, fonctionnant hors ligne
2. **Deux versions du jeu** - Support des règles anciennes et nouvelles
3. **Comptage automatique** - Calcul automatique des scores avec bonus
4. **Assistant IA** - Chatbot contextuel basé sur la version sélectionnée
5. **UX optimale** - Interface intuitive avec thème pirate

## 🛠️ Stack technique

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **PWA**: next-pwa
- **Animations**: Framer Motion

### Backend & AI
- **Database**: Supabase (stockage des parties, historique)
- **AI Assistant**: Vercel AI SDK + OpenAI API
- **Chat Interface**: Vercel AI Chat SDK
- **RAG/Knowledge Base**: Vecteurs embeddings des règles dans Supabase

### Deployment
- **Platform**: Vercel
- **Edge Functions**: Pour l'assistant IA

### 🔌 MCP (Model Context Protocol) - IMPORTANT

**Ce projet utilise les serveurs MCP pour faciliter le développement avec Cursor. Assurez-vous d'avoir configuré les MCP suivants :**

#### MCP Supabase
Permet à Cursor d'interagir directement avec votre base de données Supabase :
- Création et modification de tables
- Exécution de requêtes SQL
- Gestion des fonctions et triggers
- Inspection du schéma

**Configuration requise** :
```json
// Dans votre configuration MCP Cursor
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-supabase"],
      "env": {
        "SUPABASE_URL": "https://votre-projet.supabase.co",
        "SUPABASE_SERVICE_KEY": "votre-service-key"
      }
    }
  }
}
```

**Utilisation recommandée** :
- Création du schéma de la base de données
- Génération des fonctions pour la recherche vectorielle
- Inspection et debugging des données
- Migration et seed de données

#### MCP Vercel
Permet de gérer le déploiement et la configuration Vercel :
- Gestion des variables d'environnement
- Consultation des logs de déploiement
- Configuration des domaines
- Inspection des builds

**Configuration requise** :
```json
{
  "mcpServers": {
    "vercel": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-vercel"],
      "env": {
        "VERCEL_TOKEN": "votre-vercel-token"
      }
    }
  }
}
```

**Utilisation recommandée** :
- Configuration initiale du projet Vercel
- Gestion des variables d'environnement (OpenAI, Supabase)
- Déploiement et monitoring
- Debug des erreurs de production

#### MCP shadcn
Facilite l'ajout et la personnalisation des composants shadcn/ui :
- Ajout de nouveaux composants
- Personnalisation du thème
- Génération de variantes

**Configuration requise** :
```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-shadcn"]
    }
  }
}
```

**Utilisation recommandée** :
- Installation initiale des composants nécessaires
- Création de variantes personnalisées (boutons pirates, cards parchemin)
- Modification du thème par défaut
- Génération de nouveaux composants sur mesure

#### Workflow recommandé avec les MCP

1. **Phase Setup**
   - Utiliser MCP Vercel pour créer le projet
   - Utiliser MCP Supabase pour initialiser la base de données
   - Utiliser MCP shadcn pour installer les composants de base

2. **Phase Développement**
   - Demander à Cursor d'utiliser MCP Supabase pour créer les tables
   - Demander à Cursor d'utiliser MCP shadcn pour ajouter/personnaliser les composants
   - Utiliser MCP Vercel pour gérer les variables d'environnement

3. **Phase Déploiement**
   - Utiliser MCP Vercel pour déployer et monitorer
   - Utiliser MCP Supabase pour vérifier les données en production

**Exemple de prompts pour Cursor** :
```
"Utilise le MCP Supabase pour créer la table rules_embeddings avec les colonnes spécifiées"

"Avec le MCP shadcn, ajoute le composant Button et personnalise-le pour avoir un style pirate"

"Via le MCP Vercel, configure les variables d'environnement pour OpenAI et Supabase"
```

## 📁 Structure du projet

```
skull-king-pwa/
├── app/
│   ├── (game)/
│   │   ├── page.tsx                 # Sélection de version
│   │   ├── setup/
│   │   │   └── page.tsx             # Configuration joueurs
│   │   ├── play/
│   │   │   └── page.tsx             # Jeu en cours
│   │   └── results/
│   │       └── page.tsx             # Résultats finaux
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts             # Endpoint assistant IA
│   │   └── game/
│   │       └── route.ts             # API jeu
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                          # shadcn components
│   ├── game/
│   │   ├── VersionSelector.tsx
│   │   ├── PlayerSetup.tsx
│   │   ├── BidEntry.tsx
│   │   ├── ScoreEntry.tsx
│   │   ├── ScoreTable.tsx
│   │   └── FinalPodium.tsx
│   ├── chat/
│   │   ├── ChatButton.tsx
│   │   └── ChatPanel.tsx
│   └── layout/
│       └── PirateTheme.tsx
├── lib/
│   ├── game/
│   │   ├── rules-old.ts             # Règles ancienne version
│   │   ├── rules-new.ts             # Règles nouvelle version
│   │   ├── scoring.ts               # Logique de calcul
│   │   └── types.ts                 # Types TypeScript
│   ├── ai/
│   │   ├── rules-embeddings.ts      # Génération embeddings
│   │   └── context-builder.ts       # Construction contexte IA
│   ├── supabase/
│   │   ├── client.ts
│   │   └── schema.sql
│   └── utils.ts
├── public/
│   ├── icons/                       # PWA icons
│   ├── manifest.json
│   └── sw.js
├── data/
│   ├── rules-old.md                 # Règles ancienne version
│   └── rules-new.md                 # Règles nouvelle version
└── next.config.js
```

## 🎨 Design System - Thème Pirate

### Palette de couleurs
```typescript
// tailwind.config.ts
const colors = {
  pirate: {
    darkBlue: '#0A1628',      // Fond principal
    navy: '#1A2942',           // Fond secondaire
    gold: '#D4AF37',           // Accents or
    copper: '#B87333',         // Accents cuivre
    red: '#8B0000',            // Danger/Négatif
    emerald: '#2D5F3F',        // Succès/Positif
    cream: '#F5E6D3',          // Texte clair
    wood: '#654321',           // Éléments bois
  }
}
```

### Typographie
- **Titres**: "Pirata One" ou "Jolly Lodger" (Google Fonts)
- **Corps**: "Roboto" ou "Inter" pour la lisibilité

### Composants UI
Tous les composants shadcn/ui doivent être customisés avec le thème pirate :
- Boutons avec effet bois/parchemin
- Inputs avec bordures dorées
- Cards avec texture parchemin
- Badges dorés pour les scores

## 🎮 Flux utilisateur détaillé

### 1. Sélection de version (/)

```typescript
// app/page.tsx
// Deux grandes cartes cliquables avec icônes distinctives
// - Version Classique (icône vieux parchemin)
// - Version Nouvelle (icône carte moderne)
// Stockage de la sélection dans localStorage
```

**Fonctionnalités** :
- Affichage côte à côte de deux options
- Animation au survol
- Effet de sélection visuel
- Stockage persistent de la version choisie

### 2. Configuration des joueurs (/setup)

```typescript
// components/game/PlayerSetup.tsx
interface Player {
  id: string;
  name: string;
  avatar?: string; // Optionnel : sélection d'avatar pirate
}

// Fonctionnalités :
// - Ajout/Suppression joueurs (2-6 joueurs)
// - Validation nom unique
// - Ordre des joueurs modifiable (drag & drop)
// - Bouton "Commencer la partie"
```

**Spécifications** :
- Minimum 2 joueurs, maximum 6-8 selon version
- Noms obligatoires, max 15 caractères
- Avatar optionnel parmi une sélection de pirates
- Sauvegarde dans state global (Zustand ou Context)

### 3. Saisie des paris (/play - Phase 1)

```typescript
// components/game/BidEntry.tsx
// Interface de saisie pour chaque joueur
// - Nom du joueur affiché en grand
// - Panneau numérique (0-X selon la manche)
// - Bouton de validation
// - Transition smooth vers le joueur suivant
```

**UX Détaillée** :
```
┌─────────────────────────────┐
│    Manche 3 - 3 cartes      │
├─────────────────────────────┤
│                             │
│    Capitaine Jean           │
│                             │
│    Combien de plis ?        │
│                             │
│    ┌───┬───┬───┬───┐       │
│    │ 0 │ 1 │ 2 │ 3 │       │
│    └───┴───┴───┴───┘       │
│                             │
│    [  Valider  ]            │
│                             │
└─────────────────────────────┘
```

**Fonctionnalités** :
- Sélection rapide du nombre de plis (boutons tactiles)
- Validation avec animation
- Indicateur de progression (Joueur X/Total)
- Possibilité de revenir en arrière

### 4. Affichage tableau des paris (/play - Phase 2)

```typescript
// components/game/ScoreTable.tsx
// Tableau récapitulatif avant saisie des résultats
// Colonnes : Joueur | Paris | Résultat | Score
```

**Layout** :
```
┌──────────────────────────────────────────┐
│  Manche 3                    [Résultats] │
├──────────┬───────┬──────────┬───────────┤
│  Joueur  │ Pari  │ Réalisé  │   Score   │
├──────────┼───────┼──────────┼───────────┤
│  Jean    │   2   │    -     │     -     │
│  Marie   │   1   │    -     │     -     │
│  Pierre  │   0   │    -     │     -     │
└──────────┴───────┴──────────┴───────────┘
```

### 5. Saisie des résultats avec bonus (/play - Phase 3)

```typescript
// components/game/ScoreEntry.tsx
interface RoundResult {
  playerId: string;
  tricksWon: number;
  bonuses: BonusEvent[];
}

interface BonusEvent {
  type: 'SKULL_PIRATE' | 'MERMAID_SKULL' | 'CARD_14';
  count?: number; // Pour plusieurs pirates capturés
}
```

**Interface de saisie** :
```
┌─────────────────────────────────────┐
│  Résultat - Capitaine Jean          │
├─────────────────────────────────────┤
│  Paris : 2 plis                     │
│                                     │
│  Plis réalisés : [0][1][2][3]      │
│                                     │
│  ⚔️ Événements spéciaux :           │
│  ┌─────────────────────────────┐   │
│  │ 💀 Skull → Pirates          │   │
│  │    Nombre : [0][1][2][3]    │   │
│  ├─────────────────────────────┤   │
│  │ 🧜 Mermaid → Skull          │   │
│  │    [Oui] [Non]              │   │
│  ├─────────────────────────────┤   │
│  │ 🎴 Cartes 14 capturées      │   │
│  │    Nombre : [0][1][2][3]    │   │
│  └─────────────────────────────┘   │
│                                     │
│  Score calculé : +60 pts            │
│  (20 pts/pli × 2 + 30 bonus)       │
│                                     │
│  [Précédent]        [Valider]      │
└─────────────────────────────────────┘
```

**Logique de calcul** :
```typescript
// lib/game/scoring.ts
export function calculateScore(
  bid: number,
  tricksWon: number,
  bonuses: BonusEvent[],
  version: GameVersion
): number {
  let score = 0;
  
  // Vérification du pari
  if (bid === tricksWon) {
    // Pari de zéro
    if (bid === 0) {
      score = roundNumber * 10; // Variable selon manche
    } else {
      score = bid * 20;
    }
    
    // Ajout des bonus
    bonuses.forEach(bonus => {
      switch(bonus.type) {
        case 'SKULL_PIRATE':
          score += (bonus.count || 1) * 30;
          break;
        case 'MERMAID_SKULL':
          score += version === 'new' ? 40 : 50; // Différence versions
          break;
        case 'CARD_14':
          score += (bonus.count || 1) * 10;
          break;
      }
    });
  } else {
    // Pari raté
    const difference = Math.abs(bid - tricksWon);
    score = -10 * difference;
  }
  
  return score;
}
```

### 6. Tableau des scores complet

```typescript
// components/game/DetailedScoreTable.tsx
// Accessible via bouton "Détails" à tout moment
```

**Interface** :
```
┌────────────────────────────────────────────────────────┐
│  Partie en cours                      [Fermer]         │
├────────┬────────────────────────────────────────────────┤
│        │  M1  │  M2  │  M3  │  M4  │  M5  │  Total    │
├────────┼──────┼──────┼──────┼──────┼──────┼───────────┤
│ Jean   │ 2/2  │ 1/1  │ 2/3  │  -   │  -   │   +30     │
│        │ +40  │ +20  │ -10  │      │      │           │
├────────┼──────┼──────┼──────┼──────┼──────┼───────────┤
│ Marie  │ 1/1  │ 0/0  │ 1/1  │  -   │  -   │   +60     │
│        │ +20  │ +20  │ +20  │      │      │           │
└────────┴──────┴──────┴──────┴──────┴──────┴───────────┘

Code couleur :
🟢 Vert = Pari réussi
🔴 Rouge = Pari raté
```

**Fonctionnalités** :
- Format : Pari/Réalisé sur ligne 1
- Score sur ligne 2
- Fond coloré selon réussite/échec
- Total cumulé
- Scrollable horizontalement sur mobile

### 7. Écran final et podium (/results)

```typescript
// components/game/FinalPodium.tsx
// Animation du podium avec confettis
```

**Animation** :
1. Transition fade-in du fond
2. Apparition des joueurs sur le podium (ordre 2e → 3e → 1er)
3. Confettis pour le vainqueur
4. Affichage des scores finaux

**Layout podium** :
```
        ┌─────────┐
        │  👑     │
    ┌───┤ Jean    │
    │   │  +180   │
    │   └─────────┘
    │
┌───┴───┐       ┌─────────┐
│ Marie │       │ Pierre  │
│ +150  │       │  +120   │
└───────┘       └─────────┘
   2nd             3rd

[📊 Détails]  [🔄 Nouvelle partie]
```

**Boutons d'action** :
- **Détails** : Ouvre le tableau complet de toutes les manches
- **Nouvelle partie** : Réinitialise et revient à la sélection de version
- **Partager** : Partage les résultats (Web Share API)

## 🤖 Assistant IA - Spécifications détaillées

### Interface Chat

```typescript
// components/chat/ChatButton.tsx
// Bouton flottant en bas à droite
// Icône : Tête de mort pirate avec bulles de chat
// Badge de notification si nouveau message

// components/chat/ChatPanel.tsx
// Panel coulissant depuis le bas (mobile) ou droite (desktop)
```

**Design du chat** :
```
┌────────────────────────────────────┐
│  ⚔️ L'Oracle du Skull King    [×] │
├────────────────────────────────────┤
│                                    │
│  🤖 Ahoy matelot ! Je connais     │
│     les règles de la version      │
│     NOUVELLE du jeu. Pose-moi     │
│     tes questions !               │
│                                    │
│  👤 Comment on calcule les        │
│     points si je fais 0 plis ?    │
│                                    │
│  🤖 Si tu paries 0 plis et que    │
│     tu réussis, tu gagnes...      │
│                                    │
├────────────────────────────────────┤
│  Pose une question...        [📤] │
└────────────────────────────────────┘
```

### Configuration IA

```typescript
// app/api/chat/route.ts
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export async function POST(req: Request) {
  const { messages, gameVersion } = await req.json();
  
  // Récupération du contexte selon la version
  const supabase = createClient(/*...*/);
  const { data: rules } = await supabase
    .rpc('match_rules', {
      query_embedding: await getEmbedding(messages[messages.length - 1].content),
      match_threshold: 0.78,
      match_count: 5,
      game_version: gameVersion
    });
  
  const context = rules.map(r => r.content).join('\n\n');
  
  const systemPrompt = `Tu es l'Oracle du Skull King, un assistant expert des règles du jeu de cartes Skull King.
  
Version du jeu : ${gameVersion === 'new' ? 'NOUVELLE' : 'ANCIENNE'}

Ton rôle :
- Répondre précisément aux questions sur les règles
- Utiliser un ton pirate amical (ahoy, matelot, etc.)
- Être concis et clair
- Citer les règles exactes quand c'est utile

Contexte des règles pertinentes :
${context}

Règles de réponse :
- Reste dans le thème pirate
- Si tu ne sais pas, dis-le honnêtement
- Propose des exemples si la règle est complexe
- Maximum 3-4 phrases par réponse`;

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages
    ],
    temperature: 0.7,
    stream: true,
  });
  
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
```

### Base de connaissances (Supabase)

```sql
-- lib/supabase/schema.sql

-- Table pour les embeddings des règles
CREATE TABLE rules_embeddings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_version TEXT NOT NULL, -- 'old' ou 'new'
  section TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding VECTOR(1536), -- OpenAI embeddings
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index pour recherche vectorielle
CREATE INDEX ON rules_embeddings USING ivfflat (embedding vector_cosine_ops);

-- Fonction de recherche sémantique
CREATE OR REPLACE FUNCTION match_rules(
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT,
  game_version TEXT
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    rules_embeddings.id,
    rules_embeddings.content,
    1 - (rules_embeddings.embedding <=> query_embedding) AS similarity
  FROM rules_embeddings
  WHERE 
    rules_embeddings.game_version = match_rules.game_version
    AND 1 - (rules_embeddings.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;
```

### Génération des embeddings

```typescript
// lib/ai/rules-embeddings.ts
import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';
import fs from 'fs';

interface RuleSection {
  section: string;
  content: string;
  version: 'old' | 'new';
}

async function generateEmbeddings() {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  // Charger les règles
  const oldRules = fs.readFileSync('data/rules-old.md', 'utf-8');
  const newRules = fs.readFileSync('data/rules-new.md', 'utf-8');

  // Découper en sections (par titre de niveau 2)
  const oldSections = splitIntoSections(oldRules, 'old');
  const newSections = splitIntoSections(newRules, 'new');

  const allSections = [...oldSections, ...newSections];

  // Générer et stocker les embeddings
  for (const section of allSections) {
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: section.content,
    });

    await supabase.from('rules_embeddings').insert({
      game_version: section.version,
      section: section.section,
      content: section.content,
      embedding: embedding.data[0].embedding,
    });

    console.log(`✓ Embedded: ${section.section} (${section.version})`);
  }
}

function splitIntoSections(markdown: string, version: 'old' | 'new'): RuleSection[] {
  const sections: RuleSection[] = [];
  const lines = markdown.split('\n');
  let currentSection = '';
  let currentContent: string[] = [];

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentSection) {
        sections.push({
          section: currentSection,
          content: currentContent.join('\n').trim(),
          version,
        });
      }
      currentSection = line.replace('## ', '');
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  // Ajouter la dernière section
  if (currentSection) {
    sections.push({
      section: currentSection,
      content: currentContent.join('\n').trim(),
      version,
    });
  }

  return sections;
}
```

## 🗄️ Gestion de l'état

### Zustand Store

```typescript
// lib/store/game-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GameVersion = 'old' | 'new';

export interface Player {
  id: string;
  name: string;
  avatar?: string;
}

export interface BonusEvent {
  type: 'SKULL_PIRATE' | 'MERMAID_SKULL' | 'CARD_14';
  count?: number;
}

export interface RoundResult {
  playerId: string;
  bid: number;
  tricksWon: number;
  bonuses: BonusEvent[];
  score: number;
}

export interface Round {
  number: number;
  results: RoundResult[];
}

export interface GameState {
  // Configuration
  version: GameVersion | null;
  players: Player[];
  
  // État du jeu
  currentRound: number;
  rounds: Round[];
  phase: 'setup' | 'bidding' | 'playing' | 'finished';
  
  // Actions
  setVersion: (version: GameVersion) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  startGame: () => void;
  
  submitBid: (playerId: string, bid: number) => void;
  submitResult: (result: RoundResult) => void;
  nextRound: () => void;
  
  getPlayerScore: (playerId: string) => number;
  getGameResults: () => Array<{ player: Player; score: number }>;
  
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      version: null,
      players: [],
      currentRound: 1,
      rounds: [],
      phase: 'setup',

      setVersion: (version) => set({ version }),

      addPlayer: (player) =>
        set((state) => ({
          players: [...state.players, player],
        })),

      removePlayer: (playerId) =>
        set((state) => ({
          players: state.players.filter((p) => p.id !== playerId),
        })),

      startGame: () =>
        set({
          phase: 'bidding',
          currentRound: 1,
          rounds: [],
        }),

      submitBid: (playerId, bid) =>
        set((state) => {
          const currentRoundData = state.rounds[state.currentRound - 1] || {
            number: state.currentRound,
            results: [],
          };

          const existingResult = currentRoundData.results.find(
            (r) => r.playerId === playerId
          );

          if (existingResult) {
            existingResult.bid = bid;
          } else {
            currentRoundData.results.push({
              playerId,
              bid,
              tricksWon: 0,
              bonuses: [],
              score: 0,
            });
          }

          const updatedRounds = [...state.rounds];
          updatedRounds[state.currentRound - 1] = currentRoundData;

          return { rounds: updatedRounds };
        }),

      submitResult: (result) =>
        set((state) => {
          const currentRoundData = state.rounds[state.currentRound - 1];
          const resultIndex = currentRoundData.results.findIndex(
            (r) => r.playerId === result.playerId
          );

          if (resultIndex !== -1) {
            currentRoundData.results[resultIndex] = result;
          }

          const updatedRounds = [...state.rounds];
          updatedRounds[state.currentRound - 1] = currentRoundData;

          return { rounds: updatedRounds };
        }),

      nextRound: () =>
        set((state) => {
          const nextRound = state.currentRound + 1;
          return {
            currentRound: nextRound,
            phase: nextRound > 10 ? 'finished' : 'bidding',
          };
        }),

      getPlayerScore: (playerId) => {
        const state = get();
        return state.rounds.reduce((total, round) => {
          const result = round.results.find((r) => r.playerId === playerId);
          return total + (result?.score || 0);
        }, 0);
      },

      getGameResults: () => {
        const state = get();
        return state.players
          .map((player) => ({
            player,
            score: state.getPlayerScore(player.id),
          }))
          .sort((a, b) => b.score - a.score);
      },

      resetGame: () =>
        set({
          version: null,
          players: [],
          currentRound: 1,
          rounds: [],
          phase: 'setup',
        }),
    }),
    {
      name: 'skull-king-game',
    }
  )
);
```

## 📱 Configuration PWA

### Manifest

```json
// public/manifest.json
{
  "name": "Skull King Score Keeper",
  "short_name": "Skull King",
  "description": "Compteur de points pour le jeu Skull King avec assistant IA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0A1628",
  "theme_color": "#D4AF37",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### Next.js Config

```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPWA(nextConfig);
```

## 🎯 Différences entre les versions

### Tableau comparatif

```typescript
// lib/game/rules-comparison.ts
export const RULES_DIFFERENCES = {
  mermaidSkullBonus: {
    old: 50,
    new: 40,
  },
  skullPirateBonus: {
    old: 30,
    new: 30,
  },
  card14Bonus: {
    old: 10, // Toutes les 14
    new: {
      standard: 10, // Vert, jaune, violet
      trump: 20,    // Noir
    },
  },
  pirateAbilities: {
    old: false,
    new: true, // Rosie, Bendt, Rascal, Juanita, Harry
  },
  advancedCards: {
    old: false,
    new: true, // Kraken, White Whale, Loot
  },
  tigress: {
    old: 'Scary Mary',
    new: 'Tigress',
  },
} as const;
```

### Calcul de score contextualisé

```typescript
// lib/game/scoring.ts
import { RULES_DIFFERENCES } from './rules-comparison';

export function calculateScore(
  bid: number,
  tricksWon: number,
  bonuses: BonusEvent[],
  roundNumber: number,
  version: GameVersion
): number {
  let score = 0;

  // Vérification du pari
  if (bid === tricksWon) {
    // Pari de zéro
    if (bid === 0) {
      score = roundNumber * 10;
    } else {
      score = bid * 20;
    }

    // Ajout des bonus selon la version
    bonuses.forEach((bonus) => {
      switch (bonus.type) {
        case 'SKULL_PIRATE':
          score += (bonus.count || 1) * RULES_DIFFERENCES.skullPirateBonus[version];
          break;

        case 'MERMAID_SKULL':
          score += RULES_DIFFERENCES.mermaidSkullBonus[version];
          break;

        case 'CARD_14':
          if (version === 'new') {
            // En nouvelle version, différenciation trump/standard
            const trumpCount = bonus.trumpCount || 0;
            const standardCount = (bonus.count || 0) - trumpCount;
            score += standardCount * RULES_DIFFERENCES.card14Bonus.new.standard;
            score += trumpCount * RULES_DIFFERENCES.card14Bonus.new.trump;
          } else {
            score += (bonus.count || 1) * RULES_DIFFERENCES.card14Bonus.old;
          }
          break;
      }
    });
  } else {
    // Pari raté
    const difference = Math.abs(bid - tricksWon);
    score = -10 * difference;
  }

  return score;
}
```

## 🎨 Composants UI personnalisés

### Bouton Pirate

```typescript
// components/ui/pirate-button.tsx
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PirateButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export function PirateButton({
  className,
  variant = 'primary',
  children,
  ...props
}: PirateButtonProps) {
  return (
    <Button
      className={cn(
        'relative overflow-hidden font-pirate text-lg shadow-xl transition-all',
        'before:absolute before:inset-0 before:bg-gradient-to-b',
        'hover:scale-105 active:scale-95',
        {
          'bg-pirate-gold text-pirate-darkBlue before:from-yellow-300 before:to-pirate-copper':
            variant === 'primary',
          'bg-pirate-wood text-pirate-cream before:from-amber-700 before:to-pirate-wood':
            variant === 'secondary',
          'bg-pirate-red text-pirate-cream before:from-red-600 before:to-pirate-red':
            variant === 'danger',
        },
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
}
```

### Card Parchemin

```typescript
// components/ui/parchment-card.tsx
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ParchmentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ParchmentCard({
  className,
  children,
  ...props
}: ParchmentCardProps) {
  return (
    <Card
      className={cn(
        'border-4 border-pirate-gold bg-pirate-cream shadow-2xl',
        'bg-[url("/textures/parchment.png")] bg-cover',
        'relative overflow-hidden',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-50/20 to-amber-100/30" />
      <div className="relative z-10">{children}</div>
    </Card>
  );
}
```

## 📊 Analytics et Suivi

### Événements à tracker

```typescript
// lib/analytics.ts
import { track } from '@vercel/analytics';

export const trackEvent = {
  gameStarted: (version: GameVersion, playerCount: number) => {
    track('game_started', { version, playerCount });
  },

  roundCompleted: (roundNumber: number, version: GameVersion) => {
    track('round_completed', { roundNumber, version });
  },

  gameFinished: (
    version: GameVersion,
    playerCount: number,
    winnerScore: number
  ) => {
    track('game_finished', { version, playerCount, winnerScore });
  },

  chatMessageSent: (version: GameVersion) => {
    track('chat_message_sent', { version });
  },

  rulesViewed: (section: string, version: GameVersion) => {
    track('rules_viewed', { section, version });
  },
};
```

## 🧪 Tests

### Structure de tests

```typescript
// __tests__/scoring.test.ts
import { calculateScore } from '@/lib/game/scoring';

describe('Score Calculation', () => {
  describe('Old Version Rules', () => {
    it('should calculate correct score for successful bid', () => {
      const score = calculateScore(3, 3, [], 3, 'old');
      expect(score).toBe(60); // 3 * 20
    });

    it('should calculate Mermaid-Skull bonus correctly', () => {
      const score = calculateScore(
        1,
        1,
        [{ type: 'MERMAID_SKULL' }],
        1,
        'old'
      );
      expect(score).toBe(70); // 20 + 50
    });

    it('should penalize failed bids', () => {
      const score = calculateScore(3, 1, [], 3, 'old');
      expect(score).toBe(-20); // -10 * 2
    });

    it('should calculate zero bid correctly', () => {
      const score = calculateScore(0, 0, [], 7, 'old');
      expect(score).toBe(70); // 7 * 10
    });
  });

  describe('New Version Rules', () => {
    it('should calculate Mermaid-Skull bonus with new rules', () => {
      const score = calculateScore(
        1,
        1,
        [{ type: 'MERMAID_SKULL' }],
        1,
        'new'
      );
      expect(score).toBe(60); // 20 + 40
    });

    it('should differentiate trump and standard 14s', () => {
      const score = calculateScore(
        1,
        1,
        [{ type: 'CARD_14', count: 2, trumpCount: 1 }],
        1,
        'new'
      );
      expect(score).toBe(50); // 20 + 10 (standard) + 20 (trump)
    });
  });
});
```

## 🚀 Déploiement Vercel

### Variables d'environnement

```bash
# .env.local (à ajouter dans Vercel)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_KEY=eyJxxx...
OPENAI_API_KEY=sk-xxx...
```

### Configuration Vercel

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["fra1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_KEY": "@supabase-service-key",
    "OPENAI_API_KEY": "@openai-api-key"
  }
}
```

## 📝 Checklist de développement

### Phase 1 : Setup initial
- [ ] **Configurer les MCP dans Cursor** (Supabase, Vercel, shadcn)
- [ ] Créer projet Next.js 14+ via MCP Vercel ou manuellement
- [ ] Installer dépendances (Tailwind, shadcn, Zustand, etc.)
- [ ] Configurer Supabase via MCP
- [ ] Créer structure de dossiers
- [ ] Configurer Tailwind avec thème pirate

**Prompts Cursor recommandés** :
```
"Utilise le MCP Vercel pour créer un nouveau projet Next.js appelé skull-king-pwa"

"Avec le MCP shadcn, initialise shadcn/ui et installe les composants : button, card, input, table, badge, dialog"

"Via le MCP Supabase, crée un nouveau projet et donne-moi les credentials"
```

### Phase 2 : Configuration du jeu
- [ ] Page sélection de version
- [ ] Page setup joueurs
- [ ] Composant d'ajout/suppression de joueurs
- [ ] Validation et navigation

**Prompts Cursor recommandés** :
```
"Crée le composant VersionSelector avec deux cartes cliquables utilisant les composants shadcn Card. Style pirate avec les couleurs définies dans le design system"

"Implémente le composant PlayerSetup permettant d'ajouter 2 à 6 joueurs avec validation des noms uniques"
```

### Phase 3 : Logique de jeu
- [ ] Store Zustand avec état du jeu
- [ ] Composant saisie des paris
- [ ] Composant saisie des résultats
- [ ] Fonctions de calcul de score (2 versions)
- [ ] Gestion des bonus

**Prompts Cursor recommandés** :
```
"Crée le store Zustand game-store.ts avec la structure définie dans les instructions, incluant la persistance"

"Implémente la fonction calculateScore dans lib/game/scoring.ts en respectant les différences entre les versions old et new"
```

### Phase 4 : Affichage
- [ ] Tableau de scores en cours
- [ ] Tableau détaillé
- [ ] Page résultats avec podium
- [ ] Animations et transitions

**Prompts Cursor recommandés** :
```
"Crée le composant ScoreTable avec shadcn Table, affichant les paris et résultats avec fond coloré selon succès/échec"

"Implémente le composant FinalPodium avec animations Framer Motion pour l'apparition du classement"
```

### Phase 5 : Assistant IA
- [ ] Extraire et formater les règles en markdown
- [ ] Script de génération d'embeddings
- [ ] Table et fonction Supabase
- [ ] API route pour le chat
- [ ] Composant chat UI
- [ ] Intégration Vercel AI SDK

**Prompts Cursor recommandés** :
```
"Utilise le MCP Supabase pour créer la table rules_embeddings avec les colonnes : id, game_version, section, content, embedding (vector 1536), metadata (jsonb), created_at"

"Crée la fonction PostgreSQL match_rules pour la recherche vectorielle comme spécifié dans le schéma"

"Implémente l'API route /api/chat avec Vercel AI SDK, utilisant les embeddings Supabase pour le RAG et OpenAI pour la génération"

"Crée le composant ChatPanel avec Vercel AI Chat SDK, style pirate, bouton flottant en bas à droite"
```

### Phase 6 : PWA et optimisations
- [ ] Configurer PWA avec next-pwa
- [ ] Créer icônes
- [ ] Tester installation
- [ ] Mode hors ligne
- [ ] Performance optimizations

**Prompts Cursor recommandés** :
```
"Configure next-pwa dans next.config.js et crée le manifest.json avec les icônes spécifiées"

"Optimise les images et ajoute le support offline-first avec service worker"
```

### Phase 7 : Tests et déploiement
- [ ] Tests unitaires (scoring)
- [ ] Tests d'intégration
- [ ] Tests E2E (Playwright)
- [ ] Configuration Vercel
- [ ] Déploiement production

**Prompts Cursor recommandés** :
```
"Crée les tests unitaires pour calculateScore couvrant tous les cas : pari réussi, raté, zéro, bonus, pour les deux versions"

"Utilise le MCP Vercel pour configurer les variables d'environnement : NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_KEY, OPENAI_API_KEY"

"Via le MCP Vercel, déploie le projet en production et configure le domaine personnalisé"
```

## 🎓 Ressources et références

### Documentation
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Supabase Vector](https://supabase.com/docs/guides/ai)
- [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)

### Inspiration design
- Rechercher "pirate UI design" pour textures et éléments
- Utiliser des fonts pirates : Pirata One, Jolly Lodger
- S'inspirer de jeux comme Sea of Thieves pour la palette

## 🐛 Débogage et troubleshooting

### Problèmes courants

**Embeddings ne fonctionnent pas**
- Vérifier que pgvector est activé dans Supabase
- Vérifier la dimension (1536 pour text-embedding-3-small)
- Tester la fonction `match_rules` directement dans SQL Editor

**Chat ne stream pas**
- Vérifier que l'API route utilise bien `StreamingTextResponse`
- Vérifier la clé API OpenAI
- Tester avec un message simple sans RAG

**PWA ne s'installe pas**
- Vérifier que HTTPS est actif (obligatoire)
- Vérifier manifest.json
- Inspecter avec Chrome DevTools > Application > Manifest

**Scores incorrects**
- Ajouter des logs dans `calculateScore`
- Vérifier les différences de règles entre versions
- Écrire des tests unitaires pour chaque cas

## 🎉 Fonctionnalités bonus (optionnelles)

### V2 - Améliorations futures
- [ ] Mode multijoueur en ligne (Supabase Realtime)
- [ ] Historique des parties
- [ ] Statistiques par joueur
- [ ] Thèmes personnalisables
- [ ] Export/Import de parties
- [ ] Partage de résultats (Web Share API)
- [ ] Notifications push pour rappels
- [ ] Mode tournoi
- [ ] Achievements/Badges
- [ ] Classement global

---

## 🚀 Pour démarrer

### ⚠️ PRÉREQUIS : Configuration des MCP dans Cursor

**Avant de commencer le développement, vous DEVEZ configurer les serveurs MCP dans Cursor.**

1. Ouvrir les paramètres de Cursor (Cmd/Ctrl + ,)
2. Aller dans la section "MCP Servers"
3. Ajouter les trois serveurs suivants :

**Configuration complète des MCP** :
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-supabase"],
      "env": {
        "SUPABASE_URL": "https://VOTRE-PROJET.supabase.co",
        "SUPABASE_SERVICE_KEY": "VOTRE-SERVICE-KEY"
      }
    },
    "vercel": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-vercel"],
      "env": {
        "VERCEL_TOKEN": "VOTRE-VERCEL-TOKEN"
      }
    },
    "shadcn": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-shadcn"]
    }
  }
}
```

**Comment obtenir les tokens** :
- **Supabase** : Project Settings → API → service_role key
- **Vercel** : Account Settings → Tokens → Create Token

4. Redémarrer Cursor pour activer les MCP
5. Vérifier que les MCP sont actifs dans le panneau latéral

### Installation du projet

```bash
# Installation
npx create-next-app@latest skull-king-pwa --typescript --tailwind --app
cd skull-king-pwa

# Installer les dépendances
npm install @supabase/supabase-js zustand ai openai next-pwa
npm install -D @types/node

# Initialiser shadcn (ou utiliser le MCP shadcn via Cursor)
npx shadcn-ui@latest init

# Ajouter les composants shadcn nécessaires (ou via MCP)
npx shadcn-ui@latest add button card input table badge dialog

# Démarrer le serveur de dev
npm run dev
```

### 🎯 Ordre de développement recommandé avec les MCP

1. **Setup infrastructure** (Jour 1)
   - Utiliser MCP Vercel pour créer le projet
   - Utiliser MCP Supabase pour créer les tables
   - Utiliser MCP shadcn pour installer et personnaliser les composants

2. **Développement UI** (Jour 2-3)
   - Demander à Cursor : "Crée la page de sélection de version avec les composants shadcn personnalisés"
   - Implémenter le store Zustand
   - Créer les écrans de jeu

3. **Logique de jeu** (Jour 4-5)
   - Implémenter les calculs de score
   - Tester avec les deux versions
   - Créer les composants de saisie

4. **Assistant IA** (Jour 6-7)
   - Préparer les règles en markdown
   - Utiliser MCP Supabase pour créer la table d'embeddings
   - Générer les embeddings
   - Implémenter l'API chat

5. **PWA et polish** (Jour 8-9)
   - Configurer PWA
   - Optimisations
   - Tests

6. **Déploiement** (Jour 10)
   - Utiliser MCP Vercel pour déployer
   - Configuration des variables d'environnement via MCP
   - Tests en production

---

**Note finale** : Cette PWA doit être développée de manière itérative. Commencer par la fonctionnalité de base (sélection version → ajout joueurs → saisie paris/résultats → affichage scores), puis ajouter l'assistant IA, et enfin peaufiner l'UX et les animations.

Le thème pirate doit être cohérent dans tous les écrans mais ne pas nuire à la lisibilité. Privilégier la clarté pour les scores et les boutons d'action.

---

## 🎯 Best Practices - Utilisation des MCP avec Cursor

### Principe général
Les MCP permettent à Cursor d'interagir directement avec vos services (Supabase, Vercel, shadcn) sans que vous ayez à copier-coller des commandes ou des configurations. **Utilisez-les systématiquement** pour gagner du temps et éviter les erreurs.

### Quand utiliser quel MCP ?

#### 🗄️ MCP Supabase
**Utiliser pour** :
- Créer et modifier le schéma de base de données
- Insérer des données de test
- Créer des fonctions SQL (comme `match_rules`)
- Activer des extensions (pgvector)
- Débugger des requêtes
- Vérifier l'état de la base de données

**Exemples de prompts** :
```
"Via MCP Supabase, crée la table rules_embeddings avec une colonne vector(1536) pour les embeddings OpenAI"

"Utilise MCP Supabase pour activer l'extension pgvector et créer l'index ivfflat sur la colonne embedding"

"Avec MCP Supabase, insère des données de test dans la table players"

"Via MCP Supabase, montre-moi toutes les tables actuelles et leur schéma"
```

**Ne PAS utiliser pour** :
- Requêtes de l'application (utiliser le client Supabase classique)
- Opérations temps réel (utiliser Supabase Realtime)

#### 🚀 MCP Vercel
**Utiliser pour** :
- Créer et configurer le projet Vercel
- Gérer les variables d'environnement
- Déclencher des déploiements
- Consulter les logs de production
- Configurer les domaines

**Exemples de prompts** :
```
"Avec MCP Vercel, crée un nouveau projet lié à ce repo GitHub"

"Via MCP Vercel, ajoute les variables d'environnement pour OpenAI et Supabase"

"Utilise MCP Vercel pour déclencher un nouveau déploiement en production"

"Avec MCP Vercel, montre-moi les logs de déploiement des 24 dernières heures"

"Via MCP Vercel, configure le domaine personnalisé skull-king.vercel.app"
```

**Ne PAS utiliser pour** :
- Code de l'application (Next.js)
- Configuration locale (next.config.js)

#### 🎨 MCP shadcn
**Utiliser pour** :
- Installer de nouveaux composants shadcn/ui
- Personnaliser le thème global
- Créer des variantes de composants
- Générer des composants personnalisés basés sur shadcn

**Exemples de prompts** :
```
"Avec MCP shadcn, installe les composants button, card, input, table, badge, dialog"

"Via MCP shadcn, personnalise le composant Button pour avoir une variante 'pirate' avec les couleurs du thème"

"Utilise MCP shadcn pour modifier le thème global : couleurs primaires en or (#D4AF37) et fond en bleu marine (#0A1628)"

"Avec MCP shadcn, crée une variante de Card appelée 'parchment' avec texture parchemin"
```

**Ne PAS utiliser pour** :
- Composants React custom non basés sur shadcn
- Logique métier des composants

### Workflow optimal avec les MCP

#### 1️⃣ Phase Setup (Jour 1)
```
Prompt : "Je vais créer une PWA pour Skull King. 
1. Utilise MCP Vercel pour créer le projet skull-king-pwa
2. Utilise MCP Supabase pour créer les tables : players, games, rounds, rules_embeddings
3. Utilise MCP shadcn pour installer et configurer les composants de base avec un thème pirate"
```

#### 2️⃣ Phase Développement Database (Jour 2)
```
Prompt : "Via MCP Supabase :
1. Active l'extension pgvector
2. Crée la fonction match_rules pour la recherche sémantique
3. Insère des données de test pour 3 joueurs dans une partie"
```

#### 3️⃣ Phase Configuration Production (Jour 9)
```
Prompt : "Avec MCP Vercel :
1. Configure toutes les variables d'environnement nécessaires
2. Active les Edge Functions
3. Déclenche un déploiement en production
4. Vérifie que tout fonctionne correctement"
```

### ⚠️ Pièges à éviter

**Piège 1 : Oublier de spécifier le MCP**
❌ Mauvais : "Crée la table users dans Supabase"
✅ Bon : "Utilise MCP Supabase pour créer la table users"

**Piège 2 : Utiliser le MCP pour du code applicatif**
❌ Mauvais : "Avec MCP Supabase, écris la requête dans mon composant React"
✅ Bon : "Écris une requête Supabase dans mon composant React pour récupérer les joueurs"

**Piège 3 : Ne pas vérifier la connexion MCP**
Toujours vérifier que les MCP sont bien connectés dans Cursor avant de commencer (indicateur vert dans le panneau latéral).

**Piège 4 : Oublier les credentials**
Les MCP ont besoin des bonnes clés API. Si ça ne fonctionne pas, vérifier la configuration JSON.

### 📊 Tableau récapitulatif

| Tâche | MCP à utiliser | Exemple de prompt |
|-------|---------------|-------------------|
| Créer une table | Supabase | "Via MCP Supabase, crée la table X" |
| Installer un composant UI | shadcn | "Avec MCP shadcn, ajoute le composant Y" |
| Configurer des variables d'env | Vercel | "Utilise MCP Vercel pour ajouter OPENAI_API_KEY" |
| Activer pgvector | Supabase | "Via MCP Supabase, active l'extension pgvector" |
| Déployer | Vercel | "Avec MCP Vercel, déploie en production" |
| Personnaliser un thème | shadcn | "Via MCP shadcn, modifie les couleurs du thème" |
| Créer une fonction SQL | Supabase | "Utilise MCP Supabase pour créer la fonction match_rules" |
| Vérifier les logs | Vercel | "Avec MCP Vercel, montre les logs des 24h" |

### 🎓 Prompts complexes combinant plusieurs MCP

**Setup complet du projet** :
```
"Je commence le développement de Skull King PWA :

1. MCP Vercel : Crée le projet Next.js skull-king-pwa avec TypeScript et Tailwind
2. MCP Supabase : Crée le schéma complet avec les tables : players, games, rounds, round_results, rules_embeddings
3. MCP Supabase : Active pgvector et crée les fonctions de recherche sémantique
4. MCP shadcn : Installe les composants button, card, input, table, dialog, badge
5. MCP shadcn : Configure le thème avec les couleurs pirates (or #D4AF37, bleu #0A1628)

Donne-moi ensuite un récapitulatif de ce qui a été fait et les prochaines étapes."
```

**Préparation du déploiement** :
```
"Je suis prêt à déployer en production :

1. MCP Supabase : Vérifie que toutes les tables sont créées et que pgvector est actif
2. MCP Vercel : Configure les variables d'environnement suivantes :
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_KEY
   - OPENAI_API_KEY
3. MCP Vercel : Déclenche un déploiement en production
4. MCP Vercel : Vérifie que le déploiement s'est bien passé et donne-moi l'URL

Alerte-moi de tout problème détecté."
```

### 💡 Tips pro

1. **Toujours préfixer avec le nom du MCP** : Cursor comprend mieux "Via MCP Supabase" que juste "Supabase"

2. **Combiner les actions** : Vous pouvez demander plusieurs actions dans un seul prompt pour gagner du temps

3. **Vérifier après chaque action** : Demandez à Cursor de confirmer que l'action s'est bien passée

4. **Utiliser les MCP pour le debugging** : "Avec MCP Supabase, montre-moi le contenu de la table rules_embeddings"

5. **Documenter les actions** : Demandez à Cursor de créer un fichier de log des actions MCP effectuées
