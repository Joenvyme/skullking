import { GameVersion } from './types'

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
} as const

