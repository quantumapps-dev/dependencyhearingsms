'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface UsageStatsProps {
  stats: {
    messagesSent: number
    messagesReceived: number
    totalCost: number
    activeNumbers: number
  }
}

export default function UsageStats({ stats }: UsageStatsProps) {
  const costPerMessage = stats.messagesSent > 0 ? stats.totalCost / stats.messagesSent : 0
  const monthlyBudget = 500
  const budgetUsed = (stats.totalCost / monthlyBudget) * 100

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Messages This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sent</span>
                <span className="font-medium">{stats.messagesSent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Received</span>
                <span className="font-medium">{stats.messagesReceived.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t">
                <span className="font-medium">Total</span>
                <span className="font-bold">
                  {(stats.messagesSent + stats.messagesReceived).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Cost Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Cost</span>
                <span className="font-medium">${stats.totalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg. per Message</span>
                <span className="font-medium">${costPerMessage.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t">
                <span className="font-medium">Monthly Budget</span>
                <span className="font-bold">${monthlyBudget.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Budget Usage</CardTitle>
          <CardDescription>
            ${stats.totalCost.toFixed(2)} of ${monthlyBudget.toFixed(2)} used this month
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Progress value={budgetUsed} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{budgetUsed.toFixed(1)}% used</span>
            <span>${(monthlyBudget - stats.totalCost).toFixed(2)} remaining</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">vs Last Month</p>
                <p className="text-2xl font-bold">+12.5%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Delivery Rate</p>
                <p className="text-2xl font-bold">98.7%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-bold">30.6%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
