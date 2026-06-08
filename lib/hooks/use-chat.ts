'use client'

import { useState, useCallback, useEffect } from 'react'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! 👋 Welcome to SpurCommerce. How can I help you today?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)

  // Load session and history on mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem('spur_chat_session')
    if (savedSessionId) {
      setSessionId(savedSessionId)
      fetch(`/api/chat/history?sessionId=${savedSessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.messages && data.messages.length > 0) {
            const historyMessages = data.messages.map((m: any) => ({
              id: m.id,
              role: m.sender as 'user' | 'assistant',
              content: m.text,
              timestamp: new Date(m.timestamp),
            }))
            // Keep the initial welcome message, then append history
            setMessages((prev) => [...prev, ...historyMessages])
          }
        })
        .catch((err) => console.error('Failed to load chat history', err))
    }
  }, [])

  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim()) return

      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: userMessage,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMsg])
      setInput('')
      setIsLoading(true)

      try {
        const response = await fetch('/api/chat/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessage, sessionId }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to send message')
        }

        // Save session ID if we just created a new one or the backend regenerated it
        if (data.sessionId && data.sessionId !== sessionId) {
          setSessionId(data.sessionId)
          localStorage.setItem('spur_chat_session', data.sessionId)
        }

        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMsg])
      } catch (error: any) {
        // Handle errors gracefully by showing them in the chat UI
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `⚠️ We encountered an issue: ${error.message || 'Please try again later.'}`,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMsg])
      } finally {
        setIsLoading(false)
      }
    },
    [sessionId]
  )

  const resetChat = useCallback(() => {
    localStorage.removeItem('spur_chat_session')
    setSessionId(null)
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Hi! 👋 Welcome to SpurCommerce. How can I help you today?',
        timestamp: new Date(),
      },
    ])
  }, [])

  return {
    messages,
    input,
    setInput,
    sendMessage,
    isLoading,
    resetChat,
  }
}
