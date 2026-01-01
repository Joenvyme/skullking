'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useGameStore } from '@/lib/store/game-store'
import { Player } from '@/lib/game/types'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, ArrowRight } from 'lucide-react'

export default function SetupPage() {
  const router = useRouter()
  const players = useGameStore((state) => state.players)
  const addPlayer = useGameStore((state) => state.addPlayer)
  const removePlayer = useGameStore((state) => state.removePlayer)
  const startGame = useGameStore((state) => state.startGame)
  const version = useGameStore((state) => state.version)

  const [newPlayerName, setNewPlayerName] = useState('')

  const handleAddPlayer = () => {
    if (newPlayerName.trim() && players.length < 8) {
      const player: Player = {
        id: Date.now().toString(),
        name: newPlayerName.trim(),
      }
      addPlayer(player)
      setNewPlayerName('')
    }
  }

  const handleStartGame = () => {
    if (players.length >= 2) {
      startGame()
      router.push('/play')
    }
  }

  if (!version) {
    router.push('/')
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4"
    >
      <div className="max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-4xl font-pirate text-center mb-4 text-pirate-gold text-pirate-shadow"
        >
          Configuration des Joueurs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-pirate-cream/80 mb-8"
        >
          Ajoutez entre 2 et 8 joueurs
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="card-pirate mb-6">
          <CardHeader>
            <CardTitle className="text-pirate-gold">Ajouter un joueur</CardTitle>
            <CardDescription className="text-pirate-cream/80">
              Entrez le nom du joueur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
                placeholder="Nom du joueur"
                maxLength={15}
                className="bg-pirate-navy text-pirate-cream"
              />
              <Button
                onClick={handleAddPlayer}
                disabled={!newPlayerName.trim() || players.length >= 8}
                variant="pirate"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="card-pirate mb-6">
          <CardHeader>
            <CardTitle className="text-pirate-gold">
              Joueurs ({players.length}/8)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {players.length === 0 ? (
              <p className="text-center text-pirate-cream/60 py-8">
                Aucun joueur ajouté
              </p>
            ) : (
              <div className="space-y-2">
                <AnimatePresence>
                  {players.map((player, index) => (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="flex items-center justify-between p-3 bg-pirate-navy rounded-lg"
                    >
                    <span className="text-pirate-cream font-medium">
                      {player.name}
                    </span>
                    <Button
                      onClick={() => removePlayer(player.id)}
                      variant="ghost"
                      size="icon"
                      className="text-pirate-red hover:text-pirate-red hover:bg-pirate-red/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </CardContent>
        </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleStartGame}
              disabled={players.length < 2}
              variant="pirate"
              size="lg"
              className="text-xl px-8 py-6"
            >
              Commencer la partie
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

