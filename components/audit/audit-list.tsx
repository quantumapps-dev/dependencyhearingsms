"use client"

import { AuditEntry } from "./audit-client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, FileText, Users, MessageSquare, FolderOpen, UserCircle, Settings, AlertCircle } from 'lucide-react'
import { format } from "date-fns"

interface AuditListProps {
  entries: AuditEntry[]
}

const actionColors = {
  create: "default",
  update: "secondary",
  delete: "destructive",
  send: "default",
  receive: "default",
  view: "outline",
  export: "secondary",
  login: "default",
  logout: "outline",
} as const

const severityColors = {
  low: "outline",
  medium: "secondary",
  high: "destructive",
  critical: "destructive",
} as const

const entityIcons = {
  case: FileText,
  contact: Users,
  message: MessageSquare,
  document: FolderOpen,
  participant: UserCircle,
  user: UserCircle,
  system: Settings,
}

export function AuditList({ entries }: AuditListProps) {
  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Shield className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No audit entries found</h3>
          <p className="text-muted-foreground text-center">
            No entries match your current filters
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => {
        const EntityIcon = entityIcons[entry.entityType]
        
        return (
          <Card key={entry.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">
                    <EntityIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={actionColors[entry.action]}>
                        {entry.action.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">
                        {entry.entityType}
                      </Badge>
                      <Badge variant={severityColors[entry.severity]}>
                        {entry.severity}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(entry.timestamp), "MMM dd, yyyy HH:mm:ss")}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">
                        {entry.details}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        By {entry.userName} • Entity: {entry.entityName}
                      </p>
                    </div>

                    {entry.changes && entry.changes.length > 0 && (
                      <div className="bg-muted p-3 rounded-md mt-2">
                        <p className="text-xs font-semibold mb-2 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Changes Made:
                        </p>
                        <div className="space-y-1">
                          {entry.changes.map((change, idx) => (
                            <div key={idx} className="text-xs">
                              <span className="font-medium">{change.field}:</span>{" "}
                              <span className="text-muted-foreground line-through">{change.oldValue}</span>
                              {" → "}
                              <span className="text-foreground font-medium">{change.newValue}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {(entry.ipAddress || entry.deviceInfo) && (
                      <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                        {entry.ipAddress && (
                          <span>IP: {entry.ipAddress}</span>
                        )}
                        {entry.deviceInfo && (
                          <span>Device: {entry.deviceInfo}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        )
      })}
    </div>
  )
}
