'use client'

import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import Link from 'next/link'
import { ChatButton } from '@/components/chat/ChatButton'

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full py-3 sm:py-4 px-4 border-t border-pirate-navy/50 bg-pirate-darkBlue/50 flex-shrink-0 relative flex items-center"
      style={{ minHeight: '60px' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-pirate-cream/80 text-sm flex-1">
        <p className="text-center flex items-center gap-2">
          Développé par{' '}
          <Link
            href="https://www.instagram.com/joenvyme"
            target="_blank"
            rel="noopener noreferrer"
            className="font-pirate text-pirate-gold hover:text-pirate-gold/80 transition-colors flex items-center gap-1"
          >
            Joenvyme
            <Instagram className="w-4 h-4" />
          </Link>
        </p>
      </div>
      <ChatButton />
    </motion.footer>
  )
}

