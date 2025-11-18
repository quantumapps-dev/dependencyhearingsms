'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Settings, DollarSign, Activity } from 'lucide-react'
import TwilioConfigForm from './twilio-config-form'
import PhoneNumberManager from './phone-number-manager'
import MessageTemplates from './message-templates'
import UsageStats from './usage-stats'

export default function TwilioSettingsClient() {
  const [isConfigured, setIsConfigured] = useState(false)
  const [stats, setStats] = useState({
    messagesSent: 0,
    messagesReceived: 0,
    totalCost: 0,
    activeNumbers: 0,
  })

  useEffect(() => {
    const config = localStorage.getItem('twilio_config')
    setIsConfigured(!!config)

    // Load stats
    const savedStats = localStorage.getItem('twilio_stats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    } else {
      // Default stats
      setStats({
        messagesSent: 1247,
        messagesReceived: 382,
        totalCost: 124.35,
        activeNumbers: 3,
      })
    }
  }, [])

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Twilio Configuration</h1>
            <p className="text-muted-foreground">
              Manage your Twilio SMS integration and messaging settings
            </p>
          </div>
          <Badge variant={isConfigured ? 'default' : 'secondary'} className="text-lg px-4 py-2">
            {isConfigured ? 'Connected' : 'Not Configured'}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <p className="text-3xl font-bold">{stats.messagesSent.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Messages Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-green-500" />
              <p className="text-3xl font-bold">{stats.messagesReceived.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-yellow-500" />
              <p className="text-3xl font-bold">${stats.totalCost.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Settings className="h-8 w-8 text-purple-500" />
              <p className="text-3xl font-bold">{stats.activeNumbers}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="config" className="space-y-4">
        <TabsList>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="numbers">Phone Numbers</TabsTrigger>
          <TabsTrigger value="templates">Message Templates</TabsTrigger>
          <TabsTrigger value="usage">Usage & Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Twilio API Configuration</CardTitle>
              <CardDescription>
                Enter your Twilio account credentials to enable SMS functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TwilioConfigForm onConfigured={() => setIsConfigured(true)} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="numbers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Phone Number Management</CardTitle>
              <CardDescription>
                Manage Twilio phone numbers for sending and receiving messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PhoneNumberManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SMS Message Templates</CardTitle>
              <CardDescription>
                Create and manage reusable message templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MessageTemplates />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics & Billing</CardTitle>
              <CardDescription>
                Monitor message usage and costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UsageStats stats={stats} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
