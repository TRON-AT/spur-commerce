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
    <div className="fixed bottom-[100px] right-6 w-[420px] h-[560px] flex flex-col bg-card border border-border/40 rounded-2xl shadow-2xl shadow-accent/20 overflow-hidden z-40 backdrop-blur-sm">
      {/* Header */}
      <div className="border-b border-border/30 bg-gradient-to-r from-primary to-accent px-6 py-4 text-accent-foreground">
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
