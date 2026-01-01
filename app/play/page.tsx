'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/lib/store/game-store'
import { BidEntry } from '@/components/game/BidEntry'
import { ScoreEntry } from '@/components/game/ScoreEntry'
import { ScoreTable } from '@/components/game/ScoreTable'
import { AllRoundsTable } from '@/components/game/AllRoundsTable'
import { RoundTransition } from '@/components/game/RoundTransition'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, BarChart3 } from 'lucide-react'

type Phase = 'transition' | 'bidding' | 'results' | 'summary'

export default function PlayPage() {
  const router = useRouter()
  const {
    version,
    players,
    currentRound,
    rounds,
    phase,
    submitBid,
    submitResult,
    nextRound,
  } = useGameStore()

  const [currentPhase, setCurrentPhase] = useState<Phase>('transition')
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [currentResultIndex, setCurrentResultIndex] = useState(0)
  const [showAllRounds, setShowAllRounds] = useState(false)

  useEffect(() => {
    if (!version || players.length === 0 || phase === 'setup') {
      router.push('/')
    }
  }, [version, players, phase, router])

  if (!version || players.length === 0) {
    return null
  }

  const maxBid = currentRound
  const currentRoundData = rounds[currentRound - 1]
  const allBidsSubmitted =
    currentRoundData?.results.length === players.length &&
    currentRoundData.results.every((r) => r.bid !== undefined)

  const handleBidSubmit = (bid: number) => {
    const player = players[currentPlayerIndex]
    submitBid(player.id, bid)

    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1)
    } else {
      setCurrentPhase('summary')
    }
  }

  const handleResultSubmit = (tricksWon: number, bonuses: Array<{ type: string; count?: number; trumpCount?: number }>) => {
    const player = players[currentResultIndex]
    const bid = currentRoundData?.results.find((r) => r.playerId === player.id)?.bid || 0

    submitResult({
      playerId: player.id,
      bid,
      tricksWon,
      bonuses,
    })

    if (currentResultIndex < players.length - 1) {
      setCurrentResultIndex(currentResultIndex + 1)
    } else {
      // Tous les résultats sont saisis
      if (currentRound < 10) {
        nextRound()
        setCurrentPhase('transition')
        setCurrentPlayerIndex(0)
        setCurrentResultIndex(0)
      } else {
        router.push('/results')
      }
    }
  }

  const handleBackToBidding = () => {
    setCurrentPhase('bidding')
    setCurrentPlayerIndex(0)
  }

  const handleStartResults = () => {
    setCurrentPhase('results')
    setCurrentResultIndex(0)
  }

  const handleNextRound = () => {
    if (currentRound < 10) {
      nextRound()
      setCurrentPhase('transition')
      setCurrentPlayerIndex(0)
      setCurrentResultIndex(0)
    } else {
      router.push('/results')
    }
  }

  if (phase === 'finished') {
    router.push('/results')
    return null
  }

  // Phase de transition
  if (currentPhase === 'transition') {
    return (
      <RoundTransition
        roundNumber={currentRound}
        onReady={() => {
          setCurrentPhase('bidding')
          setCurrentPlayerIndex(0)
        }}
      />
    )
  }

  // Phase de paris
  if (currentPhase === 'bidding') {
    const currentPlayer = players[currentPlayerIndex]
    return (
      <>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPlayer.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <BidEntry
              player={currentPlayer}
              maxBid={maxBid}
              onBidSubmit={handleBidSubmit}
              onBack={currentPlayerIndex > 0 ? () => setCurrentPlayerIndex(currentPlayerIndex - 1) : undefined}
            />
          </motion.div>
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3, type: 'spring' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-4 right-4"
        >
          <Button
            onClick={() => setShowAllRounds(true)}
            variant="pirate-secondary"
            className="rounded-full w-14 h-14 shadow-lg"
            title="Voir tous les résultats"
          >
            <BarChart3 className="w-6 h-6" />
          </Button>
        </motion.div>
        <Dialog open={showAllRounds} onOpenChange={setShowAllRounds}>
          <DialogContent onClose={() => setShowAllRounds(false)} className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Résultats par joueur</DialogTitle>
            </DialogHeader>
            <AllRoundsTable />
          </DialogContent>
        </Dialog>
      </>
    )
  }

  // Phase de résumé des paris
  if (currentPhase === 'summary' && allBidsSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen p-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 flex justify-between items-center"
          >
            <Button
              onClick={handleBackToBidding}
              variant="pirate-secondary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Modifier les paris
            </Button>
            <Button
              onClick={() => setShowAllRounds(true)}
              variant="pirate-secondary"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Tous les résultats
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <ScoreTable round={currentRoundData!} roundNumber={currentRound} showResults={false} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-6 flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button onClick={handleStartResults} variant="pirate" size="lg">
                Saisir les résultats
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
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

  // Phase de saisie des résultats
  if (currentPhase === 'results') {
    const currentPlayer = players[currentResultIndex]
    const bid = currentRoundData?.results.find((r) => r.playerId === currentPlayer.id)?.bid || 0

    return (
      <>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPlayer.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ScoreEntry
              player={currentPlayer}
              bid={bid}
              maxTricks={maxBid}
              roundNumber={currentRound}
              version={version}
              onResultSubmit={handleResultSubmit}
              onBack={
                currentResultIndex > 0
                  ? () => setCurrentResultIndex(currentResultIndex - 1)
                  : handleBackToBidding
              }
            />
          </motion.div>
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3, type: 'spring' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-4 right-4"
        >
          <Button
            onClick={() => setShowAllRounds(true)}
            variant="pirate-secondary"
            className="rounded-full w-14 h-14 shadow-lg"
            title="Voir tous les résultats"
          >
            <BarChart3 className="w-6 h-6" />
          </Button>
        </motion.div>
        <Dialog open={showAllRounds} onOpenChange={setShowAllRounds}>
          <DialogContent onClose={() => setShowAllRounds(false)} className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Résultats par joueur</DialogTitle>
            </DialogHeader>
            <AllRoundsTable />
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return null
}

