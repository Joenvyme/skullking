'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/lib/store/game-store'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { ChatPanel } from '@/components/chat/ChatPanel'

export function VersionSelector() {
  const router = useRouter()
  const setVersion = useGameStore((state) => state.setVersion)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleSelectVersion = (version: 'old' | 'new') => {
    setVersion(version)
    router.push('/setup')
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col items-center justify-center p-4"
      >
        <div className="w-full max-w-4xl flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-3xl sm:text-4xl md:text-5xl font-pirate text-center mb-2 sm:mb-4 text-pirate-gold text-pirate-shadow"
        >
          Skull King
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-pirate-cream/80"
        >
          Choisissez votre version du jeu
        </motion.p>
        
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl mb-6">
          {/* Version Ancienne */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-full"
          >
            <Card 
              className="card-pirate cursor-pointer transition-shadow duration-300 hover:shadow-2xl flex flex-col"
              onClick={() => handleSelectVersion('old')}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-3">
                  <Image
                    src="/Skull_New_icon.png"
                    alt="Version Classique"
                    width={60}
                    height={60}
                    className="sm:w-20 sm:h-20 rounded-lg object-contain"
                  />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-pirate text-center text-pirate-gold">
                  Version Classique
                </CardTitle>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Version Nouvelle */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-full"
          >
            <Card 
              className="card-pirate cursor-pointer transition-shadow duration-300 hover:shadow-2xl flex flex-col"
              onClick={() => handleSelectVersion('new')}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-3">
                  <Image
                    src="/Skull_Old_icon.png"
                    alt="Version Nouvelle"
                    width={60}
                    height={60}
                    className="sm:w-20 sm:h-20 rounded-lg object-contain"
                  />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-pirate text-center text-pirate-gold">
                  Version Nouvelle
                </CardTitle>
              </CardHeader>
            </Card>
          </motion.div>
        </div>

        {/* Bouton Assistant des règles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsChatOpen(true)}
            variant="ghost"
            className="flex items-center gap-2 !text-pirate-gold hover:!text-pirate-gold bg-pirate-navy hover:bg-pirate-navy/80 border-0"
          >
            <span>Assistant des règles</span>
            <MessageCircle className="w-5 h-5 text-pirate-gold" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
    <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  )
}

