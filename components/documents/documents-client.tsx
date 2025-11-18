"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FolderOpen, Search, Upload, FileText } from 'lucide-react'
import { DocumentForm } from "./document-form"
import { DocumentList } from "./document-list"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface Document {
  id: string
  documentName: string
  documentType: "court-order" | "medical-record" | "school-record" | "evaluation" | "case-plan" | "evidence" | "correspondence" | "legal-filing" | "photo" | "other"
  caseId: string
  docketNumber: string
  uploadedBy: string
  uploadDate: string
  fileSize: string
  fileType: string
  description?: string
  confidential: boolean
  tags: string[]
  relatedParticipants?: string[]
  expirationDate?: string
  notes?: string
  status: "active" | "archived" | "pending-review"
  createdAt: string
  updatedAt: string
}

export function DocumentsClient() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingDocument, setEditingDocument] = useState<Document | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // Load documents from localStorage on mount
  useEffect(() => {
    const savedDocuments = localStorage.getItem("dhsms_documents")
    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments))
    }
  }, [])

  // Save documents to localStorage whenever they change
  useEffect(() => {
    if (documents.length > 0) {
      localStorage.setItem("dhsms_documents", JSON.stringify(documents))
    }
  }, [documents])

  const handleAddDocument = (documentData: Omit<Document, "id" | "createdAt" | "updatedAt">) => {
    const newDocument: Document = {
      ...documentData,
      id: `DOC-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setDocuments([newDocument, ...documents])
    setShowForm(false)
  }

  const handleEditDocument = (documentData: Omit<Document, "id" | "createdAt" | "updatedAt">) => {
    if (!editingDocument) return
    
    const updatedDocument: Document = {
      ...editingDocument,
      ...documentData,
      updatedAt: new Date().toISOString(),
    }
    
    setDocuments(documents.map(d => d.id === editingDocument.id ? updatedDocument : d))
    setEditingDocument(null)
    setShowForm(false)
  }

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id))
  }

  const openEditForm = (document: Document) => {
    setEditingDocument(document)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingDocument(null)
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.docketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesType = filterType === "all" || doc.documentType === filterType
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const totalDocuments = documents.length
  const activeDocuments = documents.filter(d => d.status === "active").length
  const confidentialDocuments = documents.filter(d => d.confidential).length
  const pendingReview = documents.filter(d => d.status === "pending-review").length

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Document & Evidence Storage</h1>
          <p className="text-muted-foreground text-lg">
            Secure storage and management of case documents and evidence
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDocuments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <Badge variant="default" className="h-6">Active</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeDocuments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confidential</CardTitle>
              <Badge variant="destructive" className="h-6">Secure</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{confidentialDocuments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Badge variant="secondary" className="h-6">Review</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingReview}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions Bar */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by document name, case, tags, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="court-order">Court Order</SelectItem>
                <SelectItem value="medical-record">Medical Record</SelectItem>
                <SelectItem value="school-record">School Record</SelectItem>
                <SelectItem value="evaluation">Evaluation</SelectItem>
                <SelectItem value="case-plan">Case Plan</SelectItem>
                <SelectItem value="evidence">Evidence</SelectItem>
                <SelectItem value="correspondence">Correspondence</SelectItem>
                <SelectItem value="legal-filing">Legal Filing</SelectItem>
                <SelectItem value="photo">Photo</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
                <SelectItem value="pending-review">Pending Review</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setShowForm(true)} size="lg" className="sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Document
            </Button>
          </div>
        </div>

        {/* Form or List */}
        {showForm ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingDocument ? "Edit Document" : "Add New Document"}</CardTitle>
              <CardDescription>
                {editingDocument 
                  ? "Update document information and metadata" 
                  : "Upload and categorize case documents and evidence"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentForm
                initialData={editingDocument || undefined}
                onSubmit={editingDocument ? handleEditDocument : handleAddDocument}
                onCancel={handleCancelForm}
              />
            </CardContent>
          </Card>
        ) : (
          <DocumentList
            documents={filteredDocuments}
            onEdit={openEditForm}
            onDelete={handleDeleteDocument}
          />
        )}
      </div>
    </div>
  )
}
