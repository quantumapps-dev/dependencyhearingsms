"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Filter, Search, Download } from 'lucide-react'
import { AuditList } from "./audit-list"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface AuditEntry {
  id: string
  timestamp: string
  userId: string
  userName: string
  action: "create" | "update" | "delete" | "send" | "receive" | "view" | "export" | "login" | "logout"
  entityType: "case" | "contact" | "message" | "document" | "participant" | "user" | "system"
  entityId: string
  entityName: string
  details: string
  changes?: {
    field: string
    oldValue: string
    newValue: string
  }[]
  ipAddress?: string
  deviceInfo?: string
  severity: "low" | "medium" | "high" | "critical"
}

export function AuditClient() {
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterAction, setFilterAction] = useState("all")
  const [filterEntityType, setFilterEntityType] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Load audit entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("dhsms_audit")
    if (savedEntries) {
      setAuditEntries(JSON.parse(savedEntries))
    } else {
      // Create sample audit entries for demonstration
      const sampleEntries: AuditEntry[] = [
        {
          id: "AUDIT-1",
          timestamp: new Date().toISOString(),
          userId: "USER-001",
          userName: "Admin User",
          action: "create",
          entityType: "case",
          entityId: "CASE-001",
          entityName: "JV-2024-001234",
          details: "Created new case JV-2024-001234",
          severity: "medium",
        },
        {
          id: "AUDIT-2",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          userId: "USER-001",
          userName: "Admin User",
          action: "send",
          entityType: "message",
          entityId: "MSG-001",
          entityName: "Hearing Reminder",
          details: "Sent hearing reminder to John Doe",
          severity: "low",
        },
        {
          id: "AUDIT-3",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          userId: "USER-002",
          userName: "Case Worker",
          action: "update",
          entityType: "contact",
          entityId: "CONTACT-001",
          entityName: "Jane Smith",
          details: "Updated contact information",
          changes: [
            { field: "phoneNumber", oldValue: "(555) 123-4567", newValue: "(555) 987-6543" },
            { field: "email", oldValue: "old@email.com", newValue: "new@email.com" },
          ],
          severity: "medium",
        },
      ]
      setAuditEntries(sampleEntries)
      localStorage.setItem("dhsms_audit", JSON.stringify(sampleEntries))
    }
  }, [])

  const filteredEntries = auditEntries.filter(entry => {
    const matchesSearch = 
      entry.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.details.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesAction = filterAction === "all" || entry.action === filterAction
    const matchesEntityType = filterEntityType === "all" || entry.entityType === filterEntityType
    const matchesTab = activeTab === "all" || entry.severity === activeTab

    return matchesSearch && matchesAction && matchesEntityType && matchesTab
  })

  const totalEntries = auditEntries.length
  const criticalEntries = auditEntries.filter(e => e.severity === "critical").length
  const highEntries = auditEntries.filter(e => e.severity === "high").length
  const todayEntries = auditEntries.filter(e => {
    const today = new Date().toISOString().split('T')[0]
    return e.timestamp.split('T')[0] === today
  }).length

  const exportAuditLog = () => {
    const dataStr = JSON.stringify(filteredEntries, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `audit-log-${new Date().toISOString().split('T')[0]}.json`
    
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
          <h1 className="text-4xl font-bold mb-2 text-foreground">Audit Trail & System Logs</h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive logging of all system activities, changes, and communications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEntries}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Badge variant="default" className="h-6">Active</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayEntries}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <Badge variant="destructive" className="h-6">Alert</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{highEntries}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical</CardTitle>
              <Badge variant="destructive" className="h-6">Critical</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{criticalEntries}</div>
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
            <CardDescription>Filter audit entries by action type, entity, and search criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by user, entity, or action..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="send">Send</SelectItem>
                  <SelectItem value="receive">Receive</SelectItem>
                  <SelectItem value="view">View</SelectItem>
                  <SelectItem value="export">Export</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterEntityType} onValueChange={setFilterEntityType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="case">Cases</SelectItem>
                  <SelectItem value="contact">Contacts</SelectItem>
                  <SelectItem value="message">Messages</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="participant">Participants</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Export Button */}
        <div className="flex justify-end mb-6">
          <Button onClick={exportAuditLog} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Audit Log
          </Button>
        </div>

        {/* Audit List with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({filteredEntries.length})</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="high">High</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="low">Low</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            <AuditList entries={filteredEntries} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
