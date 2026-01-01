import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GameVersion, Player, RoundResult, Round, GamePhase } from '@/lib/game/types'
import { calculateScore } from '@/lib/game/scoring'

export interface GameState {
  // Configuration
  version: GameVersion | null
  players: Player[]
  
  // État du jeu
  currentRound: number
  rounds: Round[]
  phase: GamePhase
  
  // Actions
  setVersion: (version: GameVersion) => void
  addPlayer: (player: Player) => void
  removePlayer: (playerId: string) => void
  updatePlayer: (playerId: string, updates: Partial<Player>) => void
  startGame: () => void
  
  submitBid: (playerId: string, bid: number) => void
  submitResult: (result: Omit<RoundResult, 'score'>) => void
  nextRound: () => void
  
  getPlayerScore: (playerId: string) => number
  getGameResults: () => Array<{ player: Player; score: number }>
  
  resetGame: () => void
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

      updatePlayer: (playerId, updates) =>
        set((state) => ({
          players: state.players.map((p) =>
            p.id === playerId ? { ...p, ...updates } : p
          ),
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
          }

          const existingResult = currentRoundData.results.find(
            (r) => r.playerId === playerId
          )

          if (existingResult) {
            existingResult.bid = bid
          } else {
            currentRoundData.results.push({
              playerId,
              bid,
              tricksWon: 0,
              bonuses: [],
              score: 0,
            })
          }

          const updatedRounds = [...state.rounds]
          updatedRounds[state.currentRound - 1] = currentRoundData

          return { rounds: updatedRounds }
        }),

      submitResult: (result) =>
        set((state) => {
          const currentRoundData = state.rounds[state.currentRound - 1]
          if (!currentRoundData) return state

          const resultIndex = currentRoundData.results.findIndex(
            (r) => r.playerId === result.playerId
          )

          if (resultIndex === -1) return state

          // Calculer le score
          const score = calculateScore(
            result.bid,
            result.tricksWon,
            result.bonuses,
            state.currentRound,
            state.version || 'new'
          )

          currentRoundData.results[resultIndex] = {
            ...result,
            score,
          }

          const updatedRounds = [...state.rounds]
          updatedRounds[state.currentRound - 1] = currentRoundData

          return { rounds: updatedRounds }
        }),

      nextRound: () =>
        set((state) => {
          const nextRound = state.currentRound + 1
          const maxRounds = 10
          return {
            currentRound: nextRound,
            phase: nextRound > maxRounds ? 'finished' : 'bidding',
          }
        }),

      getPlayerScore: (playerId) => {
        const state = get()
        return state.rounds.reduce((total, round) => {
          const result = round.results.find((r) => r.playerId === playerId)
          return total + (result?.score || 0)
        }, 0)
      },

      getGameResults: () => {
        const state = get()
        return state.players
          .map((player) => ({
            player,
            score: state.getPlayerScore(player.id),
          }))
          .sort((a, b) => b.score - a.score)
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
)

