'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download } from 'lucide-react'

interface MessageAnalyticsProps {
  dateRange: string
  onExport: () => void
}

export default function MessageAnalytics({ dateRange, onExport }: MessageAnalyticsProps) {
  const deliveryStats = [
    { status: 'Delivered', count: 1230, percentage: 98.7, color: 'bg-green-500' },
    { status: 'Failed', count: 12, percentage: 1.0, color: 'bg-red-500' },
    { status: 'Pending', count: 5, percentage: 0.4, color: 'bg-yellow-500' },
  ]

  const messageTypes = [
    { type: 'Hearing Reminders', sent: 847, delivered: 836, rate: 98.7 },
    { type: 'Court Notices', sent: 234, delivered: 232, rate: 99.1 },
    { type: 'Document Requests', sent: 123, delivered: 120, rate: 97.6 },
    { type: 'General Updates', sent: 43, delivered: 42, rate: 97.7 },
  ]

  const responseMetrics = {
    totalReplies: 382,
    avgResponseTime: '2.4 hours',
    positiveResponses: 298,
    negativeResponses: 54,
    neutral: 30,
  }

  const peakTimes = [
    { hour: '9 AM', messages: 145 },
    { hour: '10 AM', messages: 198 },
    { hour: '11 AM', messages: 223 },
    { hour: '1 PM', messages: 187 },
    { hour: '2 PM', messages: 156 },
    { hour: '3 PM', messages: 142 },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Delivery Statistics</CardTitle>
                <CardDescription>Message delivery breakdown</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deliveryStats.map((stat) => (
                <div key={stat.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                    <span className="font-medium">{stat.status}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{stat.count}</p>
                    <p className="text-xs text-muted-foreground">{stat.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Metrics</CardTitle>
            <CardDescription>Incoming message analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Replies</span>
                <span className="font-bold text-2xl">{responseMetrics.totalReplies}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Response Time</span>
                <Badge variant="secondary">{responseMetrics.avgResponseTime}</Badge>
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Positive</span>
                  <span className="font-medium text-green-600">
                    {responseMetrics.positiveResponses}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Negative</span>
                  <span className="font-medium text-red-600">
                    {responseMetrics.negativeResponses}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Neutral</span>
                  <span className="font-medium">{responseMetrics.neutral}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Messages by Type</CardTitle>
          <CardDescription>Performance breakdown by message category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {messageTypes.map((type) => (
              <div
                key={type.type}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{type.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {type.delivered} of {type.sent} delivered
                  </p>
                </div>
                <Badge variant={type.rate > 98 ? 'default' : 'secondary'}>
                  {type.rate}% success
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Peak Sending Times</CardTitle>
          <CardDescription>Messages sent by hour</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {peakTimes.map((time) => (
              <div key={time.hour} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{time.hour}</span>
                  <span className="text-muted-foreground">{time.messages} messages</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${(time.messages / 250) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
