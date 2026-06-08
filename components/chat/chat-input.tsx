'use client'

import { useCallback } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatInputProps {
  input: string
  onInputChange: (value: string) => void
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export function ChatInput({
  input,
  onInputChange,
  onSendMessage,
  isLoading,
}: ChatInputProps) {
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSendMessage(input)
    },
    [input, onSendMessage]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSendMessage(input)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 border-t border-border/30 bg-background/80 backdrop-blur-sm p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex-shrink-0">
      <textarea
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about shipping, sizes, materials..."
        className="resize-none rounded-xl border border-border/50 bg-card px-3 py-2 sm:px-4 sm:py-3 text-sm outline-none placeholder:text-foreground/40 focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-background transition-all"
        rows={2}
        disabled={isLoading}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="gap-2 px-5 py-2.5 bg-gradient-to-r from-accent to-primary text-accent-foreground text-sm font-semibold rounded-lg hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center"
        >
          <Send className="h-4 w-4" />
          Send
        </button>
      </div>
    </form>
  )
}
