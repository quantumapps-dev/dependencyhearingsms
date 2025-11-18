"use client"

import { Participant } from "./participants-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Phone, Mail, Users, Briefcase, Calendar } from 'lucide-react'
import { format } from "date-fns"
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

interface ParticipantListProps {
  participants: Participant[]
  onEdit: (participant: Participant) => void
  onDelete: (id: string) => void
}

const statusColors = {
  active: "default",
  inactive: "secondary",
  closed: "outline",
} as const

const roleLabels = {
  "child": "Child",
  "parent": "Parent",
  "guardian": "Guardian",
  "attorney": "Attorney",
  "case-worker": "Case Worker",
  "foster-parent": "Foster Parent",
  "therapist": "Therapist",
  "advocate": "Advocate",
  "other": "Other",
}

export function ParticipantList({ participants, onEdit, onDelete }: ParticipantListProps) {
  if (participants.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No participants found</h3>
          <p className="text-muted-foreground text-center">
            Get started by adding your first participant
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {participants.map((participant) => (
        <Card key={participant.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-xl">
                    {participant.firstName} {participant.lastName}
                  </CardTitle>
                  <Badge variant="outline">
                    {roleLabels[participant.role]}
                  </Badge>
                  <Badge variant={statusColors[participant.status]}>
                    {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                  </Badge>
                  {participant.courtAppointment && (
                    <Badge variant="secondary">Court Appointed</Badge>
                  )}
                </div>
                <CardDescription className="text-base">
                  Case: {participant.docketNumber}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onEdit(participant)}
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
                      <AlertDialogTitle>Delete Participant?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete {participant.firstName} {participant.lastName}. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(participant.id)}>
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
              {participant.dateOfBirth && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date of Birth</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(participant.dateOfBirth), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
              )}

              {participant.contactPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{participant.contactPhone}</p>
                  </div>
                </div>
              )}

              {participant.contactEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{participant.contactEmail}</p>
                  </div>
                </div>
              )}

              {participant.languagePreference && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Language</p>
                    <p className="text-sm text-muted-foreground">{participant.languagePreference}</p>
                  </div>
                </div>
              )}

              {participant.address && (
                <div className="flex items-center gap-2 md:col-span-2">
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {participant.address}
                      {participant.city && participant.state && `, ${participant.city}, ${participant.state} ${participant.zipCode || ''}`}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {participant.attorneyName && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-semibold">Attorney Information</p>
                </div>
                <div className="grid gap-2 md:grid-cols-3 text-sm">
                  <div>
                    <p className="font-medium">Name</p>
                    <p className="text-muted-foreground">{participant.attorneyName}</p>
                  </div>
                  {participant.attorneyPhone && (
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">{participant.attorneyPhone}</p>
                    </div>
                  )}
                  {participant.attorneyEmail && (
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">{participant.attorneyEmail}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {participant.specialNeeds && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium mb-1">Special Needs</p>
                <p className="text-sm text-muted-foreground">{participant.specialNeeds}</p>
              </div>
            )}

            {participant.notes && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium mb-1">Notes</p>
                <p className="text-sm text-muted-foreground">{participant.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
