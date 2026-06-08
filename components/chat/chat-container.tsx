'use client'

import { MessageList } from './message-list'
import { ChatInput } from './chat-input'

interface ChatContainerProps {
  messages: any[]
  input: string
  onInputChange: (value: string) => void
  onSendMessage: (message: string) => void
  isLoading: boolean
  onResetChat: () => void
}

export function ChatContainer({
  messages,
  input,
  onInputChange,
  onSendMessage,
  isLoading,
  onResetChat,
}: ChatContainerProps) {
  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-[100px] sm:right-6 w-full sm:w-[420px] h-[100dvh] sm:h-[560px] flex flex-col bg-card sm:border sm:border-border/40 rounded-none sm:rounded-2xl shadow-none sm:shadow-2xl sm:shadow-accent/20 overflow-hidden z-[100] backdrop-blur-sm">
      {/* Header */}
      <div className="border-b border-border/30 bg-gradient-to-r from-primary to-accent px-4 sm:px-6 py-4 text-accent-foreground flex-shrink-0">
        <h3 className="font-bold text-sm tracking-wide">SPUR SUPPORT</h3>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-xs font-medium opacity-90">Always here to help</p>
          </div>
          {messages.length > 1 && (
            <button
              onClick={onResetChat}
              className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors"
            >
              I got my answer
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <MessageList messages={messages} isLoading={isLoading} />

      {/* Input */}
      <ChatInput
        input={input}
        onInputChange={onInputChange}
        onSendMessage={onSendMessage}
        isLoading={isLoading}
      />
    </div>
  )
}
