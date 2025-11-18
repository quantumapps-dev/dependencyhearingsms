'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Shield, Users, FileText, AlertTriangle } from 'lucide-react'
import RoleManagement from './role-management'
import ComplianceSettings from './compliance-settings'
import DataRetention from './data-retention'
import LegalNotices from './legal-notices'

export default function SecurityClient() {
  const [complianceStatus, setComplianceStatus] = useState({
    hipaa: false,
    ferpa: false,
    encryption: true,
    auditLog: true,
  })

  useEffect(() => {
    const saved = localStorage.getItem('compliance_status')
    if (saved) {
      setComplianceStatus(JSON.parse(saved))
    }
  }, [])

  const totalUsers = 12
  const activeRoles = 5
  const retentionPolicies = 3

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Security & Compliance</h1>
        <p className="text-muted-foreground">
          Manage security settings, user roles, and regulatory compliance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">HIPAA Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-500" />
              <div>
                <Badge variant={complianceStatus.hipaa ? 'default' : 'secondary'}>
                  {complianceStatus.hipaa ? 'Compliant' : 'Not Enabled'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">FERPA Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-green-500" />
              <div>
                <Badge variant={complianceStatus.ferpa ? 'default' : 'secondary'}>
                  {complianceStatus.ferpa ? 'Compliant' : 'Not Enabled'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-purple-500" />
              <p className="text-3xl font-bold">{totalUsers}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <p className="text-3xl font-bold">0</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Settings</TabsTrigger>
          <TabsTrigger value="retention">Data Retention</TabsTrigger>
          <TabsTrigger value="legal">Legal Notices</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role-Based Access Control</CardTitle>
              <CardDescription>
                Manage user roles and permissions for viewing and editing sensitive data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoleManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Configuration</CardTitle>
              <CardDescription>
                Configure HIPAA and FERPA compliance settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ComplianceSettings
                status={complianceStatus}
                onUpdate={setComplianceStatus}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Retention Policies</CardTitle>
              <CardDescription>
                Configure how long different types of data are stored
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataRetention />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Legal Notices & Disclaimers</CardTitle>
              <CardDescription>
                Manage legal notices displayed to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LegalNotices />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
