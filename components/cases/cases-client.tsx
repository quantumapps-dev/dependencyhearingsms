"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileText, Calendar, Search } from 'lucide-react'
import { CaseForm } from "./case-form"
import { CaseList } from "./case-list"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export interface Case {
  id: string
  docketNumber: string
  caseTitle: string
  caseType: "dependency" | "abuse" | "neglect" | "termination"
  status: "active" | "pending" | "closed" | "appealed"
  county: string
  assignedJudge: string
  assignedCaseWorker: string
  filingDate: string
  nextHearingDate?: string
  hearingType?: string
  courtroom?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export function CasesClient() {
  const [cases, setCases] = useState<Case[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingCase, setEditingCase] = useState<Case | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Load cases from localStorage on mount
  useEffect(() => {
    const savedCases = localStorage.getItem("dhsms_cases")
    if (savedCases) {
      setCases(JSON.parse(savedCases))
    }
  }, [])

  // Save cases to localStorage whenever they change
  useEffect(() => {
    if (cases.length > 0) {
      localStorage.setItem("dhsms_cases", JSON.stringify(cases))
    }
  }, [cases])

  const handleAddCase = (caseData: Omit<Case, "id" | "createdAt" | "updatedAt">) => {
    const newCase: Case = {
      ...caseData,
      id: `CASE-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setCases([newCase, ...cases])
    setShowForm(false)
  }

  const handleEditCase = (caseData: Omit<Case, "id" | "createdAt" | "updatedAt">) => {
    if (!editingCase) return
    
    const updatedCase: Case = {
      ...editingCase,
      ...caseData,
      updatedAt: new Date().toISOString(),
    }
    
    setCases(cases.map(c => c.id === editingCase.id ? updatedCase : c))
    setEditingCase(null)
    setShowForm(false)
  }

  const handleDeleteCase = (id: string) => {
    setCases(cases.filter(c => c.id !== id))
  }

  const openEditForm = (caseItem: Case) => {
    setEditingCase(caseItem)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingCase(null)
  }

  const filteredCases = cases.filter(c =>
    c.docketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.caseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.county.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Case Management</h1>
          <p className="text-muted-foreground text-lg">
            Manage dependency hearing cases, track hearings, and maintain case records
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cases.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <Badge variant="default" className="h-6">Active</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {cases.filter(c => c.status === "active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Hearings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {cases.filter(c => c.nextHearingDate && new Date(c.nextHearingDate) > new Date()).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed Cases</CardTitle>
              <Badge variant="secondary" className="h-6">Closed</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {cases.filter(c => c.status === "closed").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by docket number, case title, or county..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setShowForm(true)} size="lg">
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </div>

        {/* Form or List */}
        {showForm ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingCase ? "Edit Case" : "Create New Case"}</CardTitle>
              <CardDescription>
                {editingCase 
                  ? "Update case information and hearing details" 
                  : "Enter case information including docket number, participants, and hearing dates"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CaseForm
                initialData={editingCase || undefined}
                onSubmit={editingCase ? handleEditCase : handleAddCase}
                onCancel={handleCancelForm}
              />
            </CardContent>
          </Card>
        ) : (
          <CaseList
            cases={filteredCases}
            onEdit={openEditForm}
            onDelete={handleDeleteCase}
          />
        )}
      </div>
    </div>
  )
}
