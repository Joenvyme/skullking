import { GameVersion, BonusEvent } from './types'
import { RULES_DIFFERENCES } from './rules-comparison'

export function calculateScore(
  bid: number,
  tricksWon: number,
  bonuses: BonusEvent[],
  roundNumber: number,
  version: GameVersion
): number {
  let score = 0

  // Vérification du pari
  if (bid === tricksWon) {
    // Pari de zéro
    if (bid === 0) {
      score = roundNumber * 10
    } else {
      score = bid * 20
    }

    // Ajout des bonus selon la version
    bonuses.forEach((bonus) => {
      switch (bonus.type) {
        case 'SKULL_PIRATE':
          score += (bonus.count || 1) * RULES_DIFFERENCES.skullPirateBonus[version]
          break

        case 'MERMAID_SKULL':
          score += RULES_DIFFERENCES.mermaidSkullBonus[version]
          break

        case 'CARD_14':
          if (version === 'new') {
            // En nouvelle version, différenciation trump/standard
            const trumpCount = bonus.trumpCount || 0
            const standardCount = (bonus.count || 0) - trumpCount
            score += standardCount * RULES_DIFFERENCES.card14Bonus.new.standard
            score += trumpCount * RULES_DIFFERENCES.card14Bonus.new.trump
          } else {
            score += (bonus.count || 1) * RULES_DIFFERENCES.card14Bonus.old
          }
          break
      }
    })
  } else {
    // Pari raté
    const difference = Math.abs(bid - tricksWon)
    score = -10 * difference
  }

  return score
}

