"use client"

import { Case } from "./cases-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Calendar, User, Briefcase } from 'lucide-react'
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

interface CaseListProps {
  cases: Case[]
  onEdit: (caseItem: Case) => void
  onDelete: (id: string) => void
}

const statusColors = {
  active: "default",
  pending: "secondary",
  closed: "outline",
  appealed: "destructive",
} as const

const caseTypeLabels = {
  dependency: "Dependency",
  abuse: "Abuse",
  neglect: "Neglect",
  termination: "Termination",
}

export function CaseList({ cases, onEdit, onDelete }: CaseListProps) {
  if (cases.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No cases found</h3>
          <p className="text-muted-foreground text-center">
            Get started by creating your first case
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {cases.map((caseItem) => (
        <Card key={caseItem.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-xl">{caseItem.docketNumber}</CardTitle>
                  <Badge variant={statusColors[caseItem.status]}>
                    {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                  </Badge>
                  <Badge variant="outline">
                    {caseTypeLabels[caseItem.caseType]}
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  {caseItem.caseTitle}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onEdit(caseItem)}
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
                      <AlertDialogTitle>Delete Case?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete case {caseItem.docketNumber}. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(caseItem.id)}>
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
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Judge</p>
                  <p className="text-sm text-muted-foreground">{caseItem.assignedJudge}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Case Worker</p>
                  <p className="text-sm text-muted-foreground">{caseItem.assignedCaseWorker}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">County</p>
                  <p className="text-sm text-muted-foreground">{caseItem.county}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Filing Date</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(caseItem.filingDate), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
              {caseItem.nextHearingDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Next Hearing</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(caseItem.nextHearingDate), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
              )}
              {caseItem.hearingType && (
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Hearing Type</p>
                    <p className="text-sm text-muted-foreground">{caseItem.hearingType}</p>
                  </div>
                </div>
              )}
            </div>
            {caseItem.notes && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium mb-1">Notes</p>
                <p className="text-sm text-muted-foreground">{caseItem.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
