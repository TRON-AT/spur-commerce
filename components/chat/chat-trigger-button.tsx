'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatTriggerButtonProps {
  isOpen: boolean
  onToggle: () => void
}

export function ChatTriggerButton({ isOpen, onToggle }: ChatTriggerButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center group font-semibold ${
        isOpen
          ? 'bg-foreground/80 text-background'
          : 'bg-gradient-to-br from-accent to-primary text-accent-foreground hover:shadow-lg hover:shadow-accent/40'
      }`}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {isOpen ? (
        <span className="text-2xl">✕</span>
      ) : (
        <>
          <MessageCircle className="h-7 w-7" />
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-green-400 rounded-full animate-pulse"></span>
        </>
      )}
    </button>
  )
}
