'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/store/game-store'
import { Player, BonusEvent } from '@/lib/game/types'
import { calculateScore } from '@/lib/game/scoring'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ScoreEntryProps {
  player: Player
  bid: number
  maxTricks: number
  roundNumber: number
  version: 'old' | 'new'
  onResultSubmit: (tricksWon: number, bonuses: BonusEvent[]) => void
  onBack?: () => void
}

export function ScoreEntry({
  player,
  bid,
  maxTricks,
  roundNumber,
  version,
  onResultSubmit,
  onBack,
}: ScoreEntryProps) {
  const [tricksWon, setTricksWon] = useState<number | null>(null)
  const [skullPirateCount, setSkullPirateCount] = useState(0)
  const [mermaidSkull, setMermaidSkull] = useState(false)
  const [card14Count, setCard14Count] = useState(0)
  const [card14TrumpCount, setCard14TrumpCount] = useState(0)
  const [showBonuses, setShowBonuses] = useState(false)

  // Réinitialiser tous les champs quand le joueur change
  useEffect(() => {
    setTricksWon(null)
    setSkullPirateCount(0)
    setMermaidSkull(false)
    setCard14Count(0)
    setCard14TrumpCount(0)
    setShowBonuses(false)
  }, [player.id])

  const bonuses: BonusEvent[] = []
  if (skullPirateCount > 0) {
    bonuses.push({ type: 'SKULL_PIRATE', count: skullPirateCount })
  }
  if (mermaidSkull) {
    bonuses.push({ type: 'MERMAID_SKULL' })
  }
  if (card14Count > 0) {
    bonuses.push({
      type: 'CARD_14',
      count: card14Count,
      trumpCount: version === 'new' ? card14TrumpCount : undefined,
    })
  }

  const calculatedScore = tricksWon !== null ? calculateScore(
    bid,
    tricksWon,
    bonuses,
    roundNumber,
    version
  ) : 0

  const handleSubmit = () => {
    if (tricksWon !== null) {
      onResultSubmit(tricksWon, bonuses)
    }
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="card-pirate">
          <CardHeader>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <CardTitle className="text-3xl font-pirate text-center text-pirate-gold">
                Résultat - {player.name}
              </CardTitle>
              <p className="text-center text-pirate-cream/80 mt-2">
                Pari : {bid} pli{bid > 1 ? 's' : ''}
              </p>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Plis réalisés */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <label className="label-pirate">
                Plis réalisés
              </label>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: maxTricks + 1 }, (_, i) => i).map((trick, index) => (
                  <motion.div
                    key={trick}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.3, type: 'spring' }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      onClick={() => setTricksWon(trick)}
                      variant={tricksWon === trick ? 'pirate' : 'outline'}
                      className={`h-12 w-full ${
                        tricksWon === trick
                          ? 'bg-pirate-gold text-pirate-darkBlue'
                          : 'text-pirate-cream hover:bg-pirate-gold/20'
                      }`}
                    >
                      {trick}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bonus - Menu déroulant */}
            <div className="pt-4">
              <Button
                onClick={() => setShowBonuses(!showBonuses)}
                variant="outline"
                className="w-full justify-between text-pirate-cream hover:bg-pirate-gold/20"
              >
                <span className="flex items-center gap-2">
                  <span>⚔️</span>
                  <span>Événements spéciaux (optionnel)</span>
                </span>
                {showBonuses ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>

              <AnimatePresence>
                {showBonuses && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-4 overflow-hidden"
                  >
                  {/* Skull → Pirates */}
                  <div className="bg-pirate-navy p-4 rounded-lg">
                    <label className="label-pirate">
                      💀 Skull King → Pirates
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[0, 1, 2, 3].map((count) => (
                        <Button
                          key={count}
                          onClick={() => setSkullPirateCount(count)}
                          variant={skullPirateCount === count ? 'pirate' : 'outline'}
                          size="sm"
                        >
                          {count}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Mermaid → Skull */}
                  <div className="bg-pirate-navy p-4 rounded-lg">
                    <label className="label-pirate">
                      🧜 Mermaid → Skull King
                    </label>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setMermaidSkull(true)}
                        variant={mermaidSkull ? 'pirate' : 'outline'}
                        className="flex-1"
                      >
                        Oui
                      </Button>
                      <Button
                        onClick={() => setMermaidSkull(false)}
                        variant={!mermaidSkull ? 'pirate' : 'outline'}
                        className="flex-1"
                      >
                        Non
                      </Button>
                    </div>
                  </div>

                  {/* Cartes 14 */}
                  <div className="bg-pirate-navy p-4 rounded-lg">
                    <label className="label-pirate">
                      🎴 Cartes 14 capturées
                    </label>
                    <div className="space-y-2">
                      <div>
                        <label className="label-pirate text-sm">
                          Total
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {[0, 1, 2, 3].map((count) => (
                            <Button
                              key={count}
                              onClick={() => {
                                setCard14Count(count)
                                if (count < card14TrumpCount) {
                                  setCard14TrumpCount(0)
                                }
                              }}
                              variant={card14Count === count ? 'pirate' : 'outline'}
                              size="sm"
                            >
                              {count}
                            </Button>
                          ))}
                        </div>
                      </div>
                      {version === 'new' && card14Count > 0 && (
                        <div>
                          <label className="label-pirate text-sm">
                            Dont noires (trump)
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            {Array.from({ length: card14Count + 1 }, (_, i) => i).map(
                              (count) => (
                                <Button
                                  key={count}
                                  onClick={() => setCard14TrumpCount(count)}
                                  variant={card14TrumpCount === count ? 'pirate' : 'outline'}
                                  size="sm"
                                >
                                  {count}
                                </Button>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Score calculé */}
            {tricksWon !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className={`p-4 rounded-lg border ${
                  calculatedScore >= 0
                    ? 'bg-pirate-emerald/20 border-pirate-emerald'
                    : 'bg-pirate-red/20 border-pirate-red'
                }`}
              >
                <p className="text-center text-lg font-bold text-pirate-cream">
                  Score calculé : {calculatedScore > 0 ? '+' : ''}
                  {calculatedScore} pts
                </p>
                {bid === tricksWon && (
                  <p className="text-center text-sm text-pirate-cream/80 mt-1">
                    {bid === 0
                      ? `${roundNumber} × 10 = ${roundNumber * 10}`
                      : `${bid} × 20 = ${bid * 20}`}
                    {bonuses.length > 0 && ' + bonus'}
                  </p>
                )}
              </motion.div>
            )}

            {/* Boutons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex gap-3"
            >
              {onBack && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Button onClick={onBack} variant="pirate-secondary" className="w-full">
                    Précédent
                  </Button>
                </motion.div>
              )}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
              <Button
                onClick={handleSubmit}
                disabled={tricksWon === null}
                variant="pirate"
                className="w-full"
              >
                Valider
              </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

