'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { ChatPanel } from './ChatPanel'

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="absolute right-2 sm:right-4 z-50 top-1/2 -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3, type: 'spring' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 p-0 flex items-center justify-center bg-transparent hover:bg-transparent transition-colors"
            title="Ouvrir l'assistant IA"
          >
            <MessageCircle className="w-7 h-7 flex-shrink-0 text-pirate-gold" />
          </button>
        </motion.div>
      </div>
      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

