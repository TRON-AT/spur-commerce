'use client'

import { useEffect, useRef } from 'react'
import { type Message } from '@/lib/hooks/use-chat'
import { MessageBubble } from './message-bubble'

interface MessageListProps {
  messages: Message[]
  isLoading?: boolean
}

export function MessageList({ messages, isLoading = false }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex flex-col gap-4 overflow-y-auto px-4 py-4 flex-1 bg-gradient-to-b from-background to-background/50">
      {messages.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-8">
          <div className="text-3xl">💬</div>
          <p className="text-sm text-foreground/50">Start a conversation</p>
          <p className="text-xs text-foreground/30">Ask about our products or services</p>
        </div>
      )}

      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isLoading && (
        <div className="flex gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-accent-foreground shadow-md">
            S
          </div>
          <div className="flex gap-1.5 rounded-2xl bg-muted/70 px-4 py-3 border border-border/30">
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/40 animate-bounce"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/40 animate-bounce delay-100"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-foreground/40 animate-bounce delay-200"></div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
