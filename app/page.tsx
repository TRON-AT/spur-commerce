'use client'

import { useState } from 'react'
import { Navbar } from '@/components/store/navbar'
import { Hero } from '@/components/store/hero'
import { ProductGrid } from '@/components/store/product-grid'
import { ChatTriggerButton } from '@/components/chat/chat-trigger-button'
import { ChatContainer } from '@/components/chat/chat-container'
import { useChat } from '@/lib/hooks/use-chat'

export default function Page() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { messages, input, setInput, sendMessage, isLoading, resetChat } = useChat()

  return (
    <>
      {/* Store Content */}
      <main>
        <Navbar />
        <Hero />
        <ProductGrid />
      </main>

      {/* Chat Trigger Button */}
      <ChatTriggerButton
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Chat Overlay Container */}
      {isChatOpen && (
        <ChatContainer
          messages={messages}
          input={input}
          onInputChange={setInput}
          onSendMessage={sendMessage}
          isLoading={isLoading}
          onResetChat={resetChat}
        />
      )}
    </>
  )
}
