'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

interface ComplianceReportProps {
  dateRange: string
  onExport: () => void
}

export default function ComplianceReport({ dateRange, onExport }: ComplianceReportProps) {
  const auditSummary = {
    totalEvents: 12847,
    dataAccess: 8234,
    modifications: 3421,
    deletions: 142,
    failedAttempts: 50,
  }

  const complianceChecks = [
    { check: 'HIPAA Encryption', status: 'pass', lastCheck: '2024-01-15' },
    { check: 'FERPA Access Controls', status: 'pass', lastCheck: '2024-01-15' },
    { check: 'Data Retention Policies', status: 'pass', lastCheck: '2024-01-14' },
    { check: 'Audit Log Completeness', status: 'pass', lastCheck: '2024-01-15' },
    { check: 'User Authentication', status: 'pass', lastCheck: '2024-01-15' },
    { check: 'Backup Verification', status: 'warning', lastCheck: '2024-01-12' },
  ]

  const dataBreaches = {
    reported: 0,
    investigated: 0,
    resolved: 0,
  }

  const userActivity = [
    { user: 'Admin User', actions: 1247, violations: 0, risk: 'low' },
    { user: 'Case Worker 1', actions: 834, violations: 0, risk: 'low' },
    { user: 'Case Worker 2', actions: 723, violations: 1, risk: 'medium' },
    { user: 'Supervisor', actions: 456, violations: 0, risk: 'low' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pass':
        return <Badge variant="default" className="bg-green-500">Pass</Badge>
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-500">Warning</Badge>
      case 'fail':
        return <Badge variant="destructive">Fail</Badge>
      default:
        return null
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low':
        return <Badge variant="default" className="bg-green-500">Low Risk</Badge>
      case 'medium':
        return <Badge variant="secondary" className="bg-yellow-500">Medium Risk</Badge>
      case 'high':
        return <Badge variant="destructive">High Risk</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Audit Summary</CardTitle>
                <CardDescription>System activity overview</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Events</span>
                <span className="font-bold text-lg">{auditSummary.totalEvents.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Data Access</span>
                <span className="font-medium">{auditSummary.dataAccess.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Modifications</span>
                <span className="font-medium">{auditSummary.modifications.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Deletions</span>
                <span className="font-medium">{auditSummary.deletions}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <span className="text-sm text-muted-foreground">Failed Attempts</span>
                <span className="font-medium text-red-600">{auditSummary.failedAttempts}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Breach Report</CardTitle>
            <CardDescription>Security incident tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <p className="text-2xl font-bold mb-2">{dataBreaches.reported}</p>
              <p className="text-sm text-muted-foreground">No breaches reported</p>
              <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium">{dataBreaches.reported}</p>
                  <p className="text-muted-foreground">Reported</p>
                </div>
                <div>
                  <p className="font-medium">{dataBreaches.investigated}</p>
                  <p className="text-muted-foreground">Investigated</p>
                </div>
                <div>
                  <p className="font-medium">{dataBreaches.resolved}</p>
                  <p className="text-muted-foreground">Resolved</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Checks</CardTitle>
          <CardDescription>Automated compliance verification results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {complianceChecks.map((check) => (
              <div
                key={check.check}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(check.status)}
                  <div>
                    <p className="font-medium">{check.check}</p>
                    <p className="text-xs text-muted-foreground">
                      Last checked: {new Date(check.lastCheck).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {getStatusBadge(check.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Activity & Risk Assessment</CardTitle>
          <CardDescription>High-level user behavior analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {userActivity.map((user) => (
              <div
                key={user.user}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{user.user}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.actions} actions · {user.violations} violations
                  </p>
                </div>
                {getRiskBadge(user.risk)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
