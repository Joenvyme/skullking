'use client'

import { useState } from 'react'
import { Select } from '@/components/ui/select'
import { useGameStore } from '@/lib/store/game-store'
import { motion, AnimatePresence } from 'framer-motion'

export function AllRoundsTable() {
  const { players, rounds, getPlayerScore } = useGameStore()
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(
    players.length > 0 ? players[0].id : ''
  )

  if (rounds.length === 0) {
    return (
      <div className="p-6">
        <p className="text-center text-pirate-cream/60">
          Aucune manche terminée pour le moment
        </p>
      </div>
    )
  }

  const selectedPlayer = players.find((p) => p.id === selectedPlayerId)
  const totalScore = selectedPlayer ? getPlayerScore(selectedPlayer.id) : 0

  return (
    <div className="space-y-4">
        {/* Sélecteur de joueur */}
        <div>
          <label className="label-pirate">
            Sélectionner un joueur
          </label>
          <Select
            value={selectedPlayerId}
            onChange={(e) => setSelectedPlayerId(e.target.value)}
            className="bg-pirate-navy text-pirate-cream"
          >
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Tableau des résultats pour le joueur sélectionné */}
        <AnimatePresence mode="wait">
          {selectedPlayer && (
            <motion.div
              key={selectedPlayer.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="overflow-x-auto"
            >
              <table className="w-full">
                <thead>
                  <tr className="border-b border-pirate-navy/50">
                    <th className="text-left p-3 text-pirate-gold">Manche</th>
                    <th className="text-center p-3 text-pirate-gold">Pari</th>
                    <th className="text-center p-3 text-pirate-gold">Réalisé</th>
                    <th className="text-center p-3 text-pirate-gold">Score</th>
                    <th className="text-center p-3 text-pirate-gold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {rounds.map((round, index) => {
                  const result = round.results.find(
                    (r) => r.playerId === selectedPlayer.id
                  )
                  const isSuccess =
                    result && result.bid === result.tricksWon
                  const roundTotal = rounds
                    .slice(0, round.number)
                    .reduce((sum, r) => {
                      const res = r.results.find(
                        (res) => res.playerId === selectedPlayer.id
                      )
                      return sum + (res?.score || 0)
                    }, 0)

                  return (
                    <motion.tr
                      key={round.number}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className={`border-b border-pirate-navy/30 ${
                        isSuccess
                          ? 'bg-pirate-emerald/10'
                          : result && !isSuccess
                          ? 'bg-pirate-red/10'
                          : ''
                      }`}
                    >
                      <td className="p-3 text-pirate-cream font-medium">
                        Manche {round.number}
                      </td>
                      <td className="p-3 text-center text-pirate-cream">
                        {result?.bid ?? '-'}
                      </td>
                      <td className="p-3 text-center text-pirate-cream">
                        {result?.tricksWon !== undefined ? result.tricksWon : '-'}
                      </td>
                      <td className="p-3 text-center">
                        {result?.score !== undefined ? (
                          <span
                            className={`font-bold ${
                              result.score >= 0
                                ? 'text-pirate-emerald'
                                : 'text-pirate-red'
                            }`}
                          >
                            {result.score > 0 ? '+' : ''}
                            {result.score}
                          </span>
                        ) : (
                          <span className="text-pirate-cream/50">-</span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`font-bold ${
                            roundTotal >= 0
                              ? 'text-pirate-emerald'
                              : 'text-pirate-red'
                          }`}
                        >
                          {roundTotal > 0 ? '+' : ''}
                          {roundTotal}
                        </span>
                      </td>
                    </motion.tr>
                  )
                })}
                {/* Ligne de total final */}
                <motion.tr
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: rounds.length * 0.05, duration: 0.3 }}
                  className="border-t-2 border-pirate-navy/50 bg-pirate-gold/10"
                >
                  <td
                    colSpan={4}
                    className="p-3 text-right font-bold text-pirate-cream"
                  >
                    Total final
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`text-xl font-bold ${
                        totalScore >= 0
                          ? 'text-pirate-emerald'
                          : 'text-pirate-red'
                      }`}
                    >
                      {totalScore > 0 ? '+' : ''}
                      {totalScore}
                    </span>
                  </td>
                </motion.tr>
              </tbody>
            </table>
          </motion.div>
          )}
        </AnimatePresence>
    </div>
  )
}
