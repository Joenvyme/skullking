'use client'

import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useGameStore } from '@/lib/store/game-store'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Skull } from 'lucide-react'
import { useChat } from 'ai/react'

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const version = useGameStore((state) => state.version)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      gameVersion: version || 'old',
    },
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Ahoy matelot ! ⚔️ Je suis l'Oracle du Skull King. Je connais les règles de la version ${
          version === 'new' ? 'NOUVELLE' : 'CLASSIQUE'
        } du jeu. Pose-moi tes questions sur les règles, les scores, ou les bonus !`,
      },
    ],
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onClose={onClose}
        hideCloseButton={true}
        className="max-w-2xl sm:max-w-full h-[95vh] sm:h-screen flex flex-col p-0 m-2 sm:m-0 rounded-lg sm:rounded-none"
      >
        <DialogHeader className="bg-pirate-navy p-4 border-b border-pirate-navy/50">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-pirate text-pirate-gold flex items-center gap-2">
              <Skull className="w-6 h-6" />
              L'Oracle du Skull King
            </DialogTitle>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-pirate-cream hover:text-pirate-gold"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-pirate-darkBlue">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-pirate-gold text-pirate-darkBlue'
                      : 'bg-pirate-navy text-pirate-cream'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-pirate-navy text-pirate-cream rounded-lg p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-pirate-gold rounded-full animate-bounce" />
                  <span
                    className="w-2 h-2 bg-pirate-gold rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <span
                    className="w-2 h-2 bg-pirate-gold rounded-full animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={onSubmit} className="p-4 border-t border-pirate-navy/50 bg-pirate-navy">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Pose une question sur les règles..."
              className="flex-1 bg-pirate-darkBlue text-pirate-cream placeholder:text-pirate-cream/50"
              disabled={isLoading}
            />
            <Button
              type="submit"
              variant="pirate"
              disabled={isLoading || !input.trim()}
              className="px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

