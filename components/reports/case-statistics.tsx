'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Download, TrendingUp, TrendingDown } from 'lucide-react'

interface CaseStatisticsProps {
  dateRange: string
  onExport: () => void
}

export default function CaseStatistics({ dateRange, onExport }: CaseStatisticsProps) {
  const casesByStatus = [
    { status: 'Active', count: 142, percentage: 57.5, trend: 'up', change: 8.2 },
    { status: 'Pending', count: 58, percentage: 23.5, trend: 'down', change: 3.1 },
    { status: 'Closed', count: 47, percentage: 19.0, trend: 'up', change: 12.5 },
  ]

  const casesByType = [
    { type: 'Dependency', count: 156, percentage: 63.2 },
    { type: 'Custody', count: 54, percentage: 21.9 },
    { type: 'Guardianship', count: 37, percentage: 15.0 },
  ]

  const hearingOutcomes = [
    { outcome: 'Appeared', count: 234, percentage: 87.3 },
    { outcome: 'No Show', count: 21, percentage: 7.8 },
    { outcome: 'Rescheduled', count: 13, percentage: 4.9 },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Case Overview</CardTitle>
              <CardDescription>Breakdown of cases by status and type</CardDescription>
            </div>
            <Button variant="outline" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-medium mb-4">Cases by Status</h4>
            <div className="space-y-4">
              {casesByStatus.map((item) => (
                <div key={item.status} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.status}</span>
                      <span className="flex items-center gap-1 text-xs">
                        {item.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span className={item.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                          {item.change}%
                        </span>
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-medium mb-4">Cases by Type</h4>
            <div className="space-y-4">
              {casesByType.map((item) => (
                <div key={item.type} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.type}</span>
                    <span className="text-muted-foreground">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-medium mb-4">Hearing Outcomes</h4>
            <div className="space-y-4">
              {hearingOutcomes.map((item) => (
                <div key={item.outcome} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.outcome}</span>
                    <span className="text-muted-foreground">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
