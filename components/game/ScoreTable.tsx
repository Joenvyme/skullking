'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGameStore } from '@/lib/store/game-store'
import { Round } from '@/lib/game/types'
import { motion } from 'framer-motion'

interface ScoreTableProps {
  round: Round
  roundNumber: number
  showResults?: boolean // Indique si on doit afficher les colonnes de résultats
}

export function ScoreTable({ round, roundNumber, showResults = false }: ScoreTableProps) {
  const players = useGameStore((state) => state.players)
  const getPlayerScore = useGameStore((state) => state.getPlayerScore)

  return (
    <Card className="card-pirate">
      <CardHeader>
        <CardTitle className="text-2xl font-pirate text-pirate-gold">
          Manche {roundNumber}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-pirate-navy/50">
                <th className="text-left p-2 text-pirate-gold">Joueur</th>
                <th className="text-center p-2 text-pirate-gold">Pari</th>
                {showResults && (
                  <>
                    <th className="text-center p-2 text-pirate-gold">Réalisé</th>
                    <th className="text-center p-2 text-pirate-gold">Score</th>
                  </>
                )}
                <th className="text-center p-2 text-pirate-gold">Total</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => {
                const result = round.results.find((r) => r.playerId === player.id)
                const totalScore = getPlayerScore(player.id)
                const isSuccess = result && result.bid === result.tricksWon

                return (
                  <motion.tr
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className={`border-b border-pirate-navy/30 ${
                      isSuccess
                        ? 'bg-pirate-emerald/10'
                        : result && !isSuccess
                        ? 'bg-pirate-red/10'
                        : ''
                    }`}
                  >
                    <td className="p-2 text-pirate-cream font-medium">
                      {player.name}
                    </td>
                    <td className="p-2 text-center text-pirate-cream">
                      {result?.bid ?? '-'}
                    </td>
                    {showResults && (
                      <>
                        <td className="p-2 text-center text-pirate-cream">
                          {result?.tricksWon !== undefined ? result.tricksWon : '-'}
                        </td>
                        <td className="p-2 text-center">
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
                      </>
                    )}
                    <td className="p-2 text-center">
                      <span
                        className={`font-bold ${
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
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

