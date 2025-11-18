"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users, Phone, Search } from 'lucide-react'
import { ContactForm } from "./contact-form"
import { ContactList } from "./contact-list"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export interface Contact {
  id: string
  firstName: string
  lastName: string
  relationship: "mother" | "father" | "guardian" | "foster-parent" | "relative" | "other"
  phoneNumber: string
  alternatePhoneNumber?: string
  email?: string
  preferredContactMethod: "sms" | "phone" | "email"
  consentToContact: boolean
  consentDate?: string
  language: string
  linkedCases: string[]
  address?: string
  city?: string
  state?: string
  zipCode?: string
  emergencyContact?: boolean
  notes?: string
  createdAt: string
  updatedAt: string
}

export function ContactsClient() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Load contacts from localStorage on mount
  useEffect(() => {
    const savedContacts = localStorage.getItem("dhsms_contacts")
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts))
    }
  }, [])

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem("dhsms_contacts", JSON.stringify(contacts))
    }
  }, [contacts])

  const handleAddContact = (contactData: Omit<Contact, "id" | "createdAt" | "updatedAt">) => {
    const newContact: Contact = {
      ...contactData,
      id: `CONTACT-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setContacts([newContact, ...contacts])
    setShowForm(false)
  }

  const handleEditContact = (contactData: Omit<Contact, "id" | "createdAt" | "updatedAt">) => {
    if (!editingContact) return
    
    const updatedContact: Contact = {
      ...editingContact,
      ...contactData,
      updatedAt: new Date().toISOString(),
    }
    
    setContacts(contacts.map(c => c.id === editingContact.id ? updatedContact : c))
    setEditingContact(null)
    setShowForm(false)
  }

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id))
  }

  const openEditForm = (contact: Contact) => {
    setEditingContact(contact)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingContact(null)
  }

  const filteredContacts = contacts.filter(c =>
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phoneNumber.includes(searchQuery) ||
    c.relationship.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Parent Contact Management</h1>
          <p className="text-muted-foreground text-lg">
            Manage parent and guardian contact information with consent tracking
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contacts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">SMS Enabled</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contacts.filter(c => c.preferredContactMethod === "sms" && c.consentToContact).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consented</CardTitle>
              <Badge variant="default" className="h-6">Active</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contacts.filter(c => c.consentToContact).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emergency Contacts</CardTitle>
              <Badge variant="destructive" className="h-6">Priority</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contacts.filter(c => c.emergencyContact).length}
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
              placeholder="Search by name, phone number, or relationship..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setShowForm(true)} size="lg">
            <Plus className="mr-2 h-4 w-4" />
            New Contact
          </Button>
        </div>

        {/* Form or List */}
        {showForm ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingContact ? "Edit Contact" : "Add New Contact"}</CardTitle>
              <CardDescription>
                {editingContact 
                  ? "Update contact information and preferences" 
                  : "Enter parent or guardian contact information with consent details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm
                initialData={editingContact || undefined}
                onSubmit={editingContact ? handleEditContact : handleAddContact}
                onCancel={handleCancelForm}
              />
            </CardContent>
          </Card>
        ) : (
          <ContactList
            contacts={filteredContacts}
            onEdit={openEditForm}
            onDelete={handleDeleteContact}
          />
        )}
      </div>
    </div>
  )
}
