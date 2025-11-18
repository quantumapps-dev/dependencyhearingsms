"use client"

import { Document } from "./documents-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, FileText, Calendar, User, Lock, Download } from 'lucide-react'
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

interface DocumentListProps {
  documents: Document[]
  onEdit: (document: Document) => void
  onDelete: (id: string) => void
}

const statusColors = {
  active: "default",
  archived: "outline",
  "pending-review": "secondary",
} as const

const documentTypeLabels = {
  "court-order": "Court Order",
  "medical-record": "Medical Record",
  "school-record": "School Record",
  "evaluation": "Evaluation",
  "case-plan": "Case Plan",
  "evidence": "Evidence",
  "correspondence": "Correspondence",
  "legal-filing": "Legal Filing",
  "photo": "Photo",
  "other": "Other",
}

export function DocumentList({ documents, onEdit, onDelete }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No documents found</h3>
          <p className="text-muted-foreground text-center">
            Get started by adding your first document
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <Card key={document.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <CardTitle className="text-xl">{document.documentName}</CardTitle>
                  <Badge variant="outline">
                    {documentTypeLabels[document.documentType]}
                  </Badge>
                  <Badge variant={statusColors[document.status]}>
                    {document.status === "pending-review" ? "Pending Review" : document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                  </Badge>
                  {document.confidential && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      Confidential
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-base">
                  Case: {document.docketNumber} • {document.fileType} • {document.fileSize}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  title="Download (simulated)"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onEdit(document)}
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
                      <AlertDialogTitle>Delete Document?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete {document.documentName}. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(document.id)}>
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
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Upload Date</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(document.uploadDate), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Uploaded By</p>
                  <p className="text-sm text-muted-foreground">{document.uploadedBy}</p>
                </div>
              </div>

              {document.expirationDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Expires</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(document.expirationDate), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {document.description && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium mb-1">Description</p>
                <p className="text-sm text-muted-foreground">{document.description}</p>
              </div>
            )}

            {document.tags.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {document.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {document.notes && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium mb-1">Internal Notes</p>
                <p className="text-sm text-muted-foreground">{document.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
