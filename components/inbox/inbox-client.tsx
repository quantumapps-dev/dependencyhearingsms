'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Inbox, CheckCircle, Clock, Archive } from 'lucide-react'
import MessageQueue from './message-queue'
import MessageDetail from './message-detail'

export default function InboxClient() {
  const [messages, setMessages] = useState<any[]>([])
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null)

  useEffect(() => {
    const savedMessages = localStorage.getItem('incoming_messages')
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      // Generate sample incoming messages
      const sampleMessages = [
        {
          id: '1',
          from: '+1234567890',
          to: '+1987654321',
          body: 'Yes, I will attend the hearing on Monday',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: 'unread',
          caseId: 'CASE-001',
          contactName: 'John Doe',
          autoTagged: true,
          tags: ['hearing-confirmation', 'attendance'],
        },
        {
          id: '2',
          from: '+1234567891',
          to: '+1987654321',
          body: 'Can you change my hearing date?',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          status: 'unread',
          caseId: 'CASE-002',
          contactName: 'Jane Smith',
          autoTagged: true,
          tags: ['date-change-request'],
        },
        {
          id: '3',
          from: '+1234567892',
          to: '+1987654321',
          body: 'Thank you for the reminder',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          status: 'read',
          caseId: 'CASE-003',
          contactName: 'Bob Johnson',
          autoTagged: true,
          tags: ['acknowledgment'],
        },
      ]
      setMessages(sampleMessages)
      localStorage.setItem('incoming_messages', JSON.stringify(sampleMessages))
    }
  }, [])

  const handleMessageUpdate = (updatedMessage: any) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === updatedMessage.id ? updatedMessage : msg
    )
    setMessages(updatedMessages)
    localStorage.setItem('incoming_messages', JSON.stringify(updatedMessages))
    setSelectedMessage(updatedMessage)
  }

  const unreadCount = messages.filter((m) => m.status === 'unread').length
  const reviewCount = messages.filter((m) => m.status === 'reviewing').length
  const processedCount = messages.filter((m) => m.status === 'processed').length

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Message Inbox</h1>
        <p className="text-muted-foreground">
          Manage incoming SMS messages and replies from parents
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Inbox className="h-8 w-8 text-blue-500" />
              <p className="text-3xl font-bold">{unreadCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-yellow-500" />
              <p className="text-3xl font-bold">{reviewCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <p className="text-3xl font-bold">{processedCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Archive className="h-8 w-8 text-purple-500" />
              <p className="text-3xl font-bold">{messages.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Message Queue</CardTitle>
              <CardDescription>Incoming messages awaiting review</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="unread" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="unread">
                    Unread
                    {unreadCount > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {unreadCount}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="reviewing">Review</TabsTrigger>
                  <TabsTrigger value="processed">Done</TabsTrigger>
                </TabsList>
                <TabsContent value="unread" className="m-0">
                  <MessageQueue
                    messages={messages.filter((m) => m.status === 'unread')}
                    selectedId={selectedMessage?.id}
                    onSelect={setSelectedMessage}
                  />
                </TabsContent>
                <TabsContent value="reviewing" className="m-0">
                  <MessageQueue
                    messages={messages.filter((m) => m.status === 'reviewing')}
                    selectedId={selectedMessage?.id}
                    onSelect={setSelectedMessage}
                  />
                </TabsContent>
                <TabsContent value="processed" className="m-0">
                  <MessageQueue
                    messages={messages.filter((m) => m.status === 'processed')}
                    selectedId={selectedMessage?.id}
                    onSelect={setSelectedMessage}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedMessage ? (
            <MessageDetail
              message={selectedMessage}
              onUpdate={handleMessageUpdate}
            />
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <Inbox className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No Message Selected</p>
                <p className="text-sm">Select a message from the queue to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
