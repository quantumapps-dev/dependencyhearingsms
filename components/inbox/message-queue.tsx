'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Clock, Tag } from 'lucide-react'

interface Message {
  id: string
  from: string
  contactName: string
  body: string
  timestamp: string
  caseId?: string
  autoTagged?: boolean
  tags?: string[]
}

interface MessageQueueProps {
  messages: Message[]
  selectedId?: string
  onSelect: (message: Message) => void
}

export default function MessageQueue({
  messages,
  selectedId,
  onSelect,
}: MessageQueueProps) {
  if (messages.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p className="text-sm">No messages in this queue</p>
      </div>
    )
  }

  return (
    <div className="divide-y">
      {messages.map((message) => (
        <button
          key={message.id}
          onClick={() => onSelect(message)}
          className={cn(
            'w-full p-4 text-left hover:bg-accent transition-colors',
            selectedId === message.id && 'bg-accent'
          )}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{message.contactName}</p>
              <p className="text-sm text-muted-foreground truncate">
                {message.from}
              </p>
            </div>
            {message.autoTagged && (
              <Badge variant="secondary" className="ml-2 flex-shrink-0">
                <Tag className="h-3 w-3 mr-1" />
                Auto
              </Badge>
            )}
          </div>
          
          <p className="text-sm mb-2 line-clamp-2">{message.body}</p>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(message.timestamp).toLocaleString()}
            </div>
            {message.caseId && (
              <Badge variant="outline" className="text-xs">
                {message.caseId}
              </Badge>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}
