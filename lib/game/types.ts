export type GameVersion = 'old' | 'new'

export interface Player {
  id: string
  name: string
  avatar?: string
}

export interface BonusEvent {
  type: 'SKULL_PIRATE' | 'MERMAID_SKULL' | 'CARD_14'
  count?: number
  trumpCount?: number // Pour différencier les 14 noirs en nouvelle version
}

export interface RoundResult {
  playerId: string
  bid: number
  tricksWon: number
  bonuses: BonusEvent[]
  score: number
}

export interface Round {
  number: number
  results: RoundResult[]
}

export type GamePhase = 'setup' | 'bidding' | 'playing' | 'finished'

