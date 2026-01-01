'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/store/game-store'
import { AllRoundsTable } from '@/components/game/AllRoundsTable'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { motion } from 'framer-motion'
import { Trophy, RotateCcw, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function ResultsPage() {
  const router = useRouter()
  const { getGameResults, resetGame, rounds } = useGameStore()
  const [showAllRounds, setShowAllRounds] = useState(false)

  useEffect(() => {
    const results = getGameResults()
    if (results.length === 0) {
      router.push('/')
    }
  }, [getGameResults, router])

  const results = getGameResults()

  if (results.length === 0) {
    return null
  }

  const winner = results[0]
  const second = results[1]
  const third = results[2]

  const handleNewGame = () => {
    resetGame()
    router.push('/')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-5xl font-pirate text-center mb-8 text-pirate-gold text-pirate-shadow"
        >
          Résultats Finaux
        </motion.h1>

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 mb-8">
          {/* 2ème */}
          {second && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 max-w-[200px]"
            >
              <Card className="card-pirate text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-2">🥈</div>
                  <h3 className="text-xl font-pirate text-pirate-gold mb-2">
                    {second.player.name}
                  </h3>
                  <p className="text-2xl font-bold text-pirate-cream">
                    {second.score > 0 ? '+' : ''}
                    {second.score}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* 1er */}
          {winner && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex-1 max-w-[200px]"
            >
              <Card className="card-pirate text-center">
                <CardContent className="p-6">
                  <div className="text-5xl mb-2">👑</div>
                  <h3 className="text-2xl font-pirate text-pirate-gold mb-2">
                    {winner.player.name}
                  </h3>
                  <p className="text-3xl font-bold text-pirate-gold">
                    {winner.score > 0 ? '+' : ''}
                    {winner.score}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* 3ème */}
          {third && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 max-w-[200px]"
            >
              <Card className="card-pirate text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-2">🥉</div>
                  <h3 className="text-xl font-pirate text-pirate-gold mb-2">
                    {third.player.name}
                  </h3>
                  <p className="text-2xl font-bold text-pirate-cream">
                    {third.score > 0 ? '+' : ''}
                    {third.score}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Classement complet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="card-pirate mb-6">
            <CardContent className="p-6">
              <h2 className="text-2xl font-pirate text-pirate-gold mb-4">
                Classement Complet
              </h2>
              <div className="space-y-2">
                {results.map((result, index) => (
                  <motion.div
                    key={result.player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                    className="flex items-center justify-between p-3 bg-pirate-navy rounded-lg"
                  >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-pirate text-pirate-gold w-8">
                      {index + 1}
                    </span>
                    <span className="text-pirate-cream font-medium">
                      {result.player.name}
                    </span>
                  </div>
                  <span
                    className={`text-xl font-bold ${
                      result.score >= 0
                        ? 'text-pirate-emerald'
                        : 'text-pirate-red'
                    }`}
                  >
                    {result.score > 0 ? '+' : ''}
                    {result.score}
                  </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Boutons d'action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button onClick={handleNewGame} variant="pirate" size="lg">
            <RotateCcw className="w-5 h-5 mr-2" />
            Nouvelle partie
          </Button>
          <Button
            onClick={() => setShowAllRounds(true)}
            variant="pirate-secondary"
            size="lg"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Détails des manches
          </Button>
          <Link href="/">
            <Button variant="pirate-secondary" size="lg">
              Accueil
            </Button>
          </Link>
        </motion.div>
      </div>

      <Dialog open={showAllRounds} onOpenChange={setShowAllRounds}>
        <DialogContent onClose={() => setShowAllRounds(false)} className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Résultats par joueur</DialogTitle>
          </DialogHeader>
          <AllRoundsTable />
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

