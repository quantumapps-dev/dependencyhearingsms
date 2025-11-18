"use client"

import { MessageHistoryEntry } from "./message-history-client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ArrowUpCircle, ArrowDownCircle, CheckCircle, XCircle, Clock } from 'lucide-react'
import { format } from "date-fns"

interface MessageHistoryListProps {
  messages: MessageHistoryEntry[]
}

const statusColors = {
  delivered: "default",
  failed: "destructive",
  pending: "secondary",
  queued: "outline",
} as const

const statusIcons = {
  delivered: CheckCircle,
  failed: XCircle,
  pending: Clock,
  queued: Clock,
}

const messageTypeLabels = {
  "hearing-reminder": "Hearing Reminder",
  "court-notice": "Court Notice",
  "document-request": "Document Request",
  "follow-up": "Follow-up",
  "custom": "Custom",
  "reply": "Reply",
}

export function MessageHistoryList({ messages }: MessageHistoryListProps) {
  if (messages.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No messages found</h3>
          <p className="text-muted-foreground text-center">
            No messages match your current filters
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => {
        const StatusIcon = statusIcons[msg.deliveryStatus]
        const DirectionIcon = msg.direction === "outbound" ? ArrowUpCircle : ArrowDownCircle
        
        return (
          <Card key={msg.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">
                    <DirectionIcon className={`h-5 w-5 ${msg.direction === "outbound" ? "text-blue-500" : "text-green-500"}`} />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={msg.direction === "outbound" ? "default" : "secondary"}>
                        {msg.direction === "outbound" ? "SENT" : "RECEIVED"}
                      </Badge>
                      <Badge variant={statusColors[msg.deliveryStatus]} className="flex items-center gap-1">
                        <StatusIcon className="h-3 w-3" />
                        {msg.deliveryStatus}
                      </Badge>
                      <Badge variant="outline">
                        {messageTypeLabels[msg.messageType]}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(msg.timestamp), "MMM dd, yyyy HH:mm:ss")}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">
                        {msg.contactName} • {msg.docketNumber}
                      </p>
                      <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                        <p>From: {msg.fromNumber}</p>
                        <p>To: {msg.toNumber}</p>
                      </div>
                    </div>

                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm whitespace-pre-wrap">
                        {msg.messageBody}
                      </p>
                    </div>

                    <div className="flex gap-4 text-xs text-muted-foreground">
                      {msg.twilioMessageSid && (
                        <span>SID: {msg.twilioMessageSid}</span>
                      )}
                      {msg.costAmount && (
                        <span>Cost: {msg.costAmount}</span>
                      )}
                    </div>

                    {msg.errorMessage && (
                      <div className="bg-destructive/10 p-2 rounded-md">
                        <p className="text-xs text-destructive font-medium">
                          Error: {msg.errorMessage}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        )
      })}
    </div>
  )
}
