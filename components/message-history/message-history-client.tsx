"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Filter, Search, Download, ArrowUpCircle, ArrowDownCircle } from 'lucide-react'
import { MessageHistoryList } from "./message-history-list"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface MessageHistoryEntry {
  id: string
  timestamp: string
  direction: "outbound" | "inbound"
  fromNumber: string
  toNumber: string
  contactName: string
  caseId: string
  docketNumber: string
  messageBody: string
  deliveryStatus: "delivered" | "failed" | "pending" | "queued"
  messageType: "hearing-reminder" | "court-notice" | "document-request" | "follow-up" | "custom" | "reply"
  twilioMessageSid?: string
  errorMessage?: string
  costAmount?: string
}

export function MessageHistoryClient() {
  const [messages, setMessages] = useState<MessageHistoryEntry[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDirection, setFilterDirection] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Load message history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("dhsms_message_history")
    if (savedHistory) {
      setMessages(JSON.parse(savedHistory))
    } else {
      // Create sample message history for demonstration
      const sampleMessages: MessageHistoryEntry[] = [
        {
          id: "HIST-1",
          timestamp: new Date().toISOString(),
          direction: "outbound",
          fromNumber: "+15551234567",
          toNumber: "+15559876543",
          contactName: "John Doe",
          caseId: "CASE-001",
          docketNumber: "JV-2024-001234",
          messageBody: "Reminder: You have a court hearing tomorrow at 9:00 AM. Please arrive 15 minutes early.",
          deliveryStatus: "delivered",
          messageType: "hearing-reminder",
          twilioMessageSid: "SM1234567890",
          costAmount: "$0.0075",
        },
        {
          id: "HIST-2",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          direction: "inbound",
          fromNumber: "+15559876543",
          toNumber: "+15551234567",
          contactName: "John Doe",
          caseId: "CASE-001",
          docketNumber: "JV-2024-001234",
          messageBody: "Thank you. I will be there.",
          deliveryStatus: "delivered",
          messageType: "reply",
          twilioMessageSid: "SM0987654321",
        },
        {
          id: "HIST-3",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          direction: "outbound",
          fromNumber: "+15551234567",
          toNumber: "+15551112222",
          contactName: "Jane Smith",
          caseId: "CASE-002",
          docketNumber: "JV-2024-005678",
          messageBody: "Your court date has been rescheduled. New date: March 15, 2024 at 10:00 AM.",
          deliveryStatus: "delivered",
          messageType: "court-notice",
          twilioMessageSid: "SM1122334455",
          costAmount: "$0.0075",
        },
      ]
      setMessages(sampleMessages)
      localStorage.setItem("dhsms_message_history", JSON.stringify(sampleMessages))
    }
  }, [])

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.docketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.messageBody.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesDirection = filterDirection === "all" || msg.direction === filterDirection
    const matchesStatus = filterStatus === "all" || msg.deliveryStatus === filterStatus
    const matchesTab = activeTab === "all" || msg.direction === activeTab

    return matchesSearch && matchesDirection && matchesStatus && matchesTab
  })

  const totalMessages = messages.length
  const outboundCount = messages.filter(m => m.direction === "outbound").length
  const inboundCount = messages.filter(m => m.direction === "inbound").length
  const deliveredCount = messages.filter(m => m.deliveryStatus === "delivered").length
  const failedCount = messages.filter(m => m.deliveryStatus === "failed").length

  const exportMessageHistory = () => {
    const dataStr = JSON.stringify(filteredMessages, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `message-history-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Message History</h1>
          <p className="text-muted-foreground text-lg">
            Complete record of all sent and received SMS communications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-5 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMessages}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sent</CardTitle>
              <ArrowUpCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{outboundCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Received</CardTitle>
              <ArrowDownCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inboundCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <Badge variant="default" className="h-6">Success</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deliveredCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
              <Badge variant="destructive" className="h-6">Error</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{failedCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
            <CardDescription>Filter message history by direction, status, and search criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterDirection} onValueChange={setFilterDirection}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Directions</SelectItem>
                  <SelectItem value="outbound">Outbound (Sent)</SelectItem>
                  <SelectItem value="inbound">Inbound (Received)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="queued">Queued</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Export Button */}
        <div className="flex justify-end mb-6">
          <Button onClick={exportMessageHistory} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Message History
          </Button>
        </div>

        {/* Message List with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Messages ({filteredMessages.length})</TabsTrigger>
            <TabsTrigger value="outbound">Sent ({outboundCount})</TabsTrigger>
            <TabsTrigger value="inbound">Received ({inboundCount})</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            <MessageHistoryList messages={filteredMessages} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
