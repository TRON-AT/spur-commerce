import OpenAI from 'openai'
import { SYSTEM_PROMPT } from './prompts'

// Initialize the OpenAI client pointing to GitHub Models
const ai = new OpenAI({
  baseURL: 'https://models.inference.ai.azure.com',
  apiKey: process.env.GITHUB_TOKEN,
})

export async function generateReply(
  history: { role: 'user' | 'assistant' | 'system'; content: string }[],
  userMessage: string
): Promise<string> {
  try {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: userMessage },
    ]

    const response = await ai.chat.completions.create({
      model: 'gpt-4o', // GitHub Models offers gpt-4o, gpt-4o-mini, llama-3, etc.
      messages,
      max_tokens: 200,
      temperature: 0.7,
    })

    const reply = response.choices[0]?.message?.content
    return reply || 'Sorry, I am unable to respond right now.'
  } catch (error) {
    console.error('GitHub Models generation error:', error)
    throw new Error('Our AI agent is currently taking a break. Please try again later!')
  }
}
