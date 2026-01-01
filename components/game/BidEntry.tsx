'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/store/game-store'
import { Player } from '@/lib/game/types'
import { motion } from 'framer-motion'

interface BidEntryProps {
  player: Player
  maxBid: number
  onBidSubmit: (bid: number) => void
  onBack?: () => void
}

export function BidEntry({ player, maxBid, onBidSubmit, onBack }: BidEntryProps) {
  const [selectedBid, setSelectedBid] = useState<number | null>(null)

  // Réinitialiser la sélection quand le joueur change
  useEffect(() => {
    setSelectedBid(null)
  }, [player.id])

  const handleBidSelect = (bid: number) => {
    setSelectedBid(bid)
    // Passer automatiquement au joueur suivant
    onBidSubmit(bid)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="card-pirate w-full max-w-md">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CardTitle className="text-3xl font-pirate text-center text-pirate-gold">
              {player.name}
            </CardTitle>
            <p className="text-center text-pirate-cream/80 mt-2">
              Combien de plis prévoyez-vous ?
            </p>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="grid grid-cols-4 gap-3"
          >
            {Array.from({ length: maxBid + 1 }, (_, i) => i).map((bid, index) => (
              <motion.div
                key={bid}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05, duration: 0.3, type: 'spring' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  onClick={() => handleBidSelect(bid)}
                  variant={selectedBid === bid ? 'pirate' : 'outline'}
                  className={`h-16 text-xl font-bold w-full ${
                    selectedBid === bid
                      ? 'bg-pirate-gold text-pirate-darkBlue'
                      : 'text-pirate-cream hover:bg-pirate-gold/20'
                  }`}
                >
                  {bid}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {onBack && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onBack}
                  variant="pirate-secondary"
                  className="w-full"
                >
                  Retour
                </Button>
              </motion.div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

