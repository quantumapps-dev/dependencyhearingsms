'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Download, TrendingUp } from 'lucide-react'

interface PerformanceMetricsProps {
  dateRange: string
  onExport: () => void
}

export default function PerformanceMetrics({ dateRange, onExport }: PerformanceMetricsProps) {
  const systemHealth = [
    { metric: 'System Uptime', value: 99.9, target: 99.5, status: 'good' },
    { metric: 'API Response Time', value: 98.2, target: 95.0, status: 'good' },
    { metric: 'Database Performance', value: 96.5, target: 95.0, status: 'good' },
    { metric: 'Message Delivery Rate', value: 98.7, target: 98.0, status: 'good' },
  ]

  const resourceUsage = [
    { resource: 'Storage', used: 234, total: 500, unit: 'GB' },
    { resource: 'Bandwidth', used: 1.2, total: 5.0, unit: 'TB' },
    { resource: 'Database Connections', used: 42, total: 100, unit: 'connections' },
  ]

  const integrationStatus = [
    { integration: 'DEX', status: 'operational', uptime: 99.9, lastSync: '2 hours ago' },
    { integration: 'CPCMS', status: 'operational', uptime: 99.7, lastSync: '1 hour ago' },
    { integration: 'Twilio', status: 'operational', uptime: 100, lastSync: '5 minutes ago' },
    { integration: 'Access DB', status: 'degraded', uptime: 95.3, lastSync: '12 hours ago' },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemHealth.map((item) => (
              <div key={item.metric} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.metric}</span>
                    {item.value >= item.target && (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <span className="text-muted-foreground">
                    {item.value}% (target: {item.target}%)
                  </span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resource Usage</CardTitle>
          <CardDescription>System resource consumption</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resourceUsage.map((item) => {
              const percentage = (item.used / item.total) * 100
              return (
                <div key={item.resource} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.resource}</span>
                    <span className="text-muted-foreground">
                      {item.used} / {item.total} {item.unit}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">
                    {percentage.toFixed(1)}% used
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integration Status</CardTitle>
          <CardDescription>Third-party system connectivity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {integrationStatus.map((item) => (
              <div
                key={item.integration}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{item.integration}</p>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.status === 'operational'
                          ? 'bg-green-500'
                          : item.status === 'degraded'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Last sync: {item.lastSync}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{item.uptime}%</p>
                  <p className="text-xs text-muted-foreground">uptime</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
