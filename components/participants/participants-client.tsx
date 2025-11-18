"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users, Search, UserCircle } from 'lucide-react'
import { ParticipantForm } from "./participant-form"
import { ParticipantList } from "./participant-list"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface Participant {
  id: string
  firstName: string
  lastName: string
  dateOfBirth?: string
  role: "child" | "parent" | "guardian" | "attorney" | "case-worker" | "foster-parent" | "therapist" | "advocate" | "other"
  caseId: string
  docketNumber: string
  contactPhone?: string
  contactEmail?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  attorneyName?: string
  attorneyPhone?: string
  attorneyEmail?: string
  specialNeeds?: string
  languagePreference?: string
  courtAppointment?: boolean
  appointmentDate?: string
  notes?: string
  status: "active" | "inactive" | "closed"
  createdAt: string
  updatedAt: string
}

export function ParticipantsClient() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // Load participants from localStorage on mount
  useEffect(() => {
    const savedParticipants = localStorage.getItem("dhsms_participants")
    if (savedParticipants) {
      setParticipants(JSON.parse(savedParticipants))
    }
  }, [])

  // Save participants to localStorage whenever they change
  useEffect(() => {
    if (participants.length > 0) {
      localStorage.setItem("dhsms_participants", JSON.stringify(participants))
    }
  }, [participants])

  const handleAddParticipant = (participantData: Omit<Participant, "id" | "createdAt" | "updatedAt">) => {
    const newParticipant: Participant = {
      ...participantData,
      id: `PART-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setParticipants([newParticipant, ...participants])
    setShowForm(false)
  }

  const handleEditParticipant = (participantData: Omit<Participant, "id" | "createdAt" | "updatedAt">) => {
    if (!editingParticipant) return
    
    const updatedParticipant: Participant = {
      ...editingParticipant,
      ...participantData,
      updatedAt: new Date().toISOString(),
    }
    
    setParticipants(participants.map(p => p.id === editingParticipant.id ? updatedParticipant : p))
    setEditingParticipant(null)
    setShowForm(false)
  }

  const handleDeleteParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id))
  }

  const openEditForm = (participant: Participant) => {
    setEditingParticipant(participant)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingParticipant(null)
  }

  const filteredParticipants = participants.filter(p => {
    const matchesSearch = 
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.docketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = filterRole === "all" || p.role === filterRole
    const matchesStatus = filterStatus === "all" || p.status === filterStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const totalParticipants = participants.length
  const activeParticipants = participants.filter(p => p.status === "active").length
  const childrenCount = participants.filter(p => p.role === "child").length
  const attorneysCount = participants.filter(p => p.role === "attorney").length

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Participant Management</h1>
          <p className="text-muted-foreground text-lg">
            Track all parties involved in dependency hearing cases
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalParticipants}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <Badge variant="default" className="h-6">Active</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeParticipants}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Children</CardTitle>
              <UserCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{childrenCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attorneys</CardTitle>
              <Badge variant="outline" className="h-6">Legal</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attorneysCount}</div>
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
                placeholder="Search by name, role, or docket number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="guardian">Guardian</SelectItem>
                <SelectItem value="attorney">Attorney</SelectItem>
                <SelectItem value="case-worker">Case Worker</SelectItem>
                <SelectItem value="foster-parent">Foster Parent</SelectItem>
                <SelectItem value="therapist">Therapist</SelectItem>
                <SelectItem value="advocate">Advocate</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setShowForm(true)} size="lg" className="sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Participant
            </Button>
          </div>
        </div>

        {/* Form or List */}
        {showForm ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingParticipant ? "Edit Participant" : "Add New Participant"}</CardTitle>
              <CardDescription>
                {editingParticipant 
                  ? "Update participant information and role details" 
                  : "Enter participant information including role, contact details, and case association"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ParticipantForm
                initialData={editingParticipant || undefined}
                onSubmit={editingParticipant ? handleEditParticipant : handleAddParticipant}
                onCancel={handleCancelForm}
              />
            </CardContent>
          </Card>
        ) : (
          <ParticipantList
            participants={filteredParticipants}
            onEdit={openEditForm}
            onDelete={handleDeleteParticipant}
          />
        )}
      </div>
    </div>
  )
}
