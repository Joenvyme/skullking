'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface RoundTransitionProps {
  roundNumber: number
  onReady: () => void
}

export function RoundTransition({ roundNumber, onReady }: RoundTransitionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="card-pirate">
          <CardContent className="p-12 text-center">
            {/* Titre Manche */}
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
              className="text-6xl md:text-8xl font-pirate text-pirate-gold mb-4 text-pirate-shadow"
            >
              Manche {roundNumber}
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl md:text-3xl text-pirate-cream mb-12 font-medium"
            >
              Faites vos paris
            </motion.p>

            {/* Icône décorative */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
              className="mb-12"
            >
              <div className="text-8xl">⚔️</div>
            </motion.div>

            {/* Bouton */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Button
                onClick={onReady}
                variant="pirate"
                size="lg"
                className="text-2xl px-12 py-6 font-pirate"
              >
                On est prêt !
              </Button>
            </motion.div>

            {/* Effet de particules animées */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-pirate-gold rounded-full opacity-60"
                  initial={{
                    x: '50%',
                    y: '50%',
                    opacity: 0,
                  }}
                  animate={{
                    x: `${50 + (Math.sin(i) * 30)}%`,
                    y: `${50 + (Math.cos(i) * 30)}%`,
                    opacity: [0, 0.6, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

