"use client"

import { Contact } from "./contacts-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Phone, Mail, MessageSquare, Users, CheckCircle, XCircle } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ContactListProps {
  contacts: Contact[]
  onEdit: (contact: Contact) => void
  onDelete: (id: string) => void
}

const relationshipLabels = {
  "mother": "Mother",
  "father": "Father",
  "guardian": "Guardian",
  "foster-parent": "Foster Parent",
  "relative": "Relative",
  "other": "Other",
}

const contactMethodIcons = {
  sms: MessageSquare,
  phone: Phone,
  email: Mail,
}

export function ContactList({ contacts, onEdit, onDelete }: ContactListProps) {
  if (contacts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
          <p className="text-muted-foreground text-center">
            Get started by adding your first contact
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => {
        const ContactIcon = contactMethodIcons[contact.preferredContactMethod]
        
        return (
          <Card key={contact.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl">
                      {contact.firstName} {contact.lastName}
                    </CardTitle>
                    <Badge variant="outline">
                      {relationshipLabels[contact.relationship]}
                    </Badge>
                    {contact.emergencyContact && (
                      <Badge variant="destructive">Emergency</Badge>
                    )}
                    {contact.consentToContact ? (
                      <Badge variant="default" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Consented
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        No Consent
                      </Badge>
                    )}
                  </div>
                  {contact.linkedCases.length > 0 && (
                    <CardDescription className="text-sm">
                      Linked to {contact.linkedCases.length} case{contact.linkedCases.length !== 1 ? 's' : ''}
                    </CardDescription>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => onEdit(contact)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="icon" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Contact?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete {contact.firstName} {contact.lastName}. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete(contact.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{contact.phoneNumber}</p>
                  </div>
                </div>
                
                {contact.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <ContactIcon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Preferred Method</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {contact.preferredContactMethod}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Language</p>
                    <p className="text-sm text-muted-foreground">{contact.language}</p>
                  </div>
                </div>

                {contact.address && (
                  <div className="flex items-center gap-2 md:col-span-2">
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.address}
                        {contact.city && contact.state && `, ${contact.city}, ${contact.state} ${contact.zipCode || ''}`}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {contact.notes && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-1">Notes</p>
                  <p className="text-sm text-muted-foreground">{contact.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
