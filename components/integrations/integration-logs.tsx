'use client'

import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react'

interface IntegrationLog {
  id: string
  timestamp: string
  type: string
  action: string
  status: string
  recordsProcessed?: number
  message: string
}

interface IntegrationLogsProps {
  logs: IntegrationLog[]
}

export default function IntegrationLogs({ logs }: IntegrationLogsProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-blue-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      success: 'default',
      error: 'destructive',
      warning: 'secondary',
    }
    return variants[status] || 'outline'
  }

  if (logs.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>No integration activity yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {logs.map((log) => (
        <div
          key={log.id}
          className="flex items-start gap-4 p-4 border rounded-lg"
        >
          <div className="mt-1">{getStatusIcon(log.status)}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline">{log.type}</Badge>
              <Badge variant="secondary">{log.action}</Badge>
              <Badge variant={getStatusBadge(log.status)}>{log.status}</Badge>
            </div>
            <p className="text-sm mb-1">{log.message}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{new Date(log.timestamp).toLocaleString()}</span>
              {log.recordsProcessed && (
                <span>{log.recordsProcessed} records processed</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
