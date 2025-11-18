'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Database, RefreshCw, Download, Upload, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import DexIntegrationForm from './dex-integration-form'
import AccessDatabaseForm from './access-database-form'
import IntegrationLogs from './integration-logs'
import { toast } from 'sonner'

export default function IntegrationsClient() {
  const [integrations, setIntegrations] = useState<any[]>([])
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    const savedIntegrations = localStorage.getItem('integrations')
    const savedLogs = localStorage.getItem('integration_logs')
    if (savedIntegrations) setIntegrations(JSON.parse(savedIntegrations))
    if (savedLogs) setLogs(JSON.parse(savedLogs))
  }, [])

  const handleSync = (type: string) => {
    const log = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: type,
      action: 'sync',
      status: 'success',
      recordsProcessed: Math.floor(Math.random() * 100) + 1,
      message: `Successfully synced with ${type}`
    }
    
    const updatedLogs = [log, ...logs]
    setLogs(updatedLogs)
    localStorage.setItem('integration_logs', JSON.stringify(updatedLogs))
    toast.success(`${type} sync completed successfully`)
  }

  const handleExport = (type: string) => {
    const log = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: type,
      action: 'export',
      status: 'success',
      recordsProcessed: Math.floor(Math.random() * 50) + 1,
      message: `Data exported to ${type}`
    }
    
    const updatedLogs = [log, ...logs]
    setLogs(updatedLogs)
    localStorage.setItem('integration_logs', JSON.stringify(updatedLogs))
    toast.success(`Data exported to ${type}`)
  }

  const handleImport = (type: string) => {
    const log = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: type,
      action: 'import',
      status: 'success',
      recordsProcessed: Math.floor(Math.random() * 75) + 1,
      message: `Data imported from ${type}`
    }
    
    const updatedLogs = [log, ...logs]
    setLogs(updatedLogs)
    localStorage.setItem('integration_logs', JSON.stringify(updatedLogs))
    toast.success(`Data imported from ${type}`)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">System Integrations</h1>
        <p className="text-muted-foreground">
          Manage connections with DEX, CPCMS, and legacy Access databases
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">DEX Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">Active</p>
                  <p className="text-xs text-muted-foreground">Last sync: 2 hours ago</p>
                </div>
              </div>
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">CPCMS Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">Active</p>
                  <p className="text-xs text-muted-foreground">Last sync: 1 hour ago</p>
                </div>
              </div>
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Access Database</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">Mapped</p>
                  <p className="text-xs text-muted-foreground">12 tables mapped</p>
                </div>
              </div>
              <Badge variant="secondary">
                <AlertCircle className="h-3 w-3 mr-1" />
                Legacy
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dex" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dex">DEX Integration</TabsTrigger>
          <TabsTrigger value="cpcms">CPCMS Integration</TabsTrigger>
          <TabsTrigger value="access">Access Database</TabsTrigger>
          <TabsTrigger value="logs">Integration Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="dex" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>DEX Integration Configuration</CardTitle>
              <CardDescription>
                Configure automated data import/export with the Data Exchange (DEX) system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <DexIntegrationForm />
              
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => handleSync('DEX')} className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync Now
                </Button>
                <Button onClick={() => handleExport('DEX')} variant="outline" className="flex-1">
                  <Upload className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button onClick={() => handleImport('DEX')} variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Import Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cpcms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CPCMS Integration Configuration</CardTitle>
              <CardDescription>
                Configure connection with Common Pleas Case Management System
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <DexIntegrationForm type="CPCMS" />
              
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => handleSync('CPCMS')} className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync Now
                </Button>
                <Button onClick={() => handleExport('CPCMS')} variant="outline" className="flex-1">
                  <Upload className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button onClick={() => handleImport('CPCMS')} variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Import Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Database Mapping</CardTitle>
              <CardDescription>
                Map legacy Access database tables and fields to the new system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AccessDatabaseForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integration Activity Logs</CardTitle>
              <CardDescription>
                View all integration sync activities, imports, and exports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IntegrationLogs logs={logs} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
