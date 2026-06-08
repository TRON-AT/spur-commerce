import { type Message } from '@/lib/hooks/use-chat'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {!isUser && (
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-accent-foreground shadow-md">
          S
        </div>
      )}

      <div
        className={`max-w-[85%] sm:max-w-xs rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm transition-all ${
          isUser
            ? 'bg-gradient-to-br from-accent to-primary text-accent-foreground'
            : 'bg-muted/70 text-foreground border border-border/30'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}
