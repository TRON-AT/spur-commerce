import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { generateReply } from '@/lib/ai/github'

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMIT_WINDOW_MS = 60000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10 // max 10 messages per minute per IP

export async function POST(req: Request) {
  try {
    // 1. IP-based Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown-ip'
    const now = Date.now()
    const rateLimitInfo = rateLimitMap.get(ip)

    if (rateLimitInfo) {
      if (now - rateLimitInfo.lastReset < RATE_LIMIT_WINDOW_MS) {
        if (rateLimitInfo.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { error: 'Too many requests. Please wait a minute before sending another message.' },
            { status: 429 }
          )
        }
        rateLimitInfo.count++
      } else {
        // Reset window
        rateLimitMap.set(ip, { count: 1, lastReset: now })
      }
    } else {
      rateLimitMap.set(ip, { count: 1, lastReset: now })
    }

    const body = await req.json()
    const { message, sessionId } = body

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Message is too long (maximum 2000 characters)' },
        { status: 400 }
      )
    }
    let conversationId = sessionId

    // 1. Check if conversation exists, or create a new one
    if (conversationId) {
      const existingConversation = await prisma.conversation.findUnique({
        where: { id: conversationId }
      })
      if (!existingConversation) {
        conversationId = null // Invalid session ID, so we'll create a new one
      }
    }

    if (!conversationId) {
      const newConversation = await prisma.conversation.create({
        data: {},
      })
      conversationId = newConversation.id
    }

    // 2. Save the user's message
    await prisma.message.create({
      data: {
        conversationId,
        sender: 'user',
        text: message,
      },
    })

    // 3. Fetch past messages for this session to give the AI context
    const history = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { timestamp: 'asc' },
    })

    // Map Prisma messages to the format expected by our OpenAI service
    const formattedHistory = history.map((msg: { sender: string; text: any }) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    })) as { role: 'user' | 'assistant' | 'system'; content: string }[]

    // 4. Generate AI Reply using OpenAI
    let reply: string
    try {
      reply = await generateReply(formattedHistory, message)
    } catch (aiError: any) {
      // If AI fails, still save an error message reply so the chat doesn't break
      reply = aiError.message || 'Sorry, I am currently unavailable.'
    }

    // 5. Save the AI's reply
    await prisma.message.create({
      data: {
        conversationId,
        sender: 'ai',
        text: reply,
      },
    })

    // 6. Return the reply and sessionId so the client can save it
    return NextResponse.json({
      reply,
      sessionId: conversationId,
    })
  } catch (error: any) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process message. Please try again later.' },
      { status: 500 }
    )
  }
}
