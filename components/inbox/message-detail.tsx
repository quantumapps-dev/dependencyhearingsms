'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle, Eye, Archive, Reply, Tag, Plus, X } from 'lucide-react'
import { toast } from 'sonner'

interface MessageDetailProps {
  message: any
  onUpdate: (message: any) => void
}

export default function MessageDetail({ message, onUpdate }: MessageDetailProps) {
  const [notes, setNotes] = useState(message.notes || '')
  const [newTag, setNewTag] = useState('')
  const [localMessage, setLocalMessage] = useState(message)

  const handleStatusChange = (status: string) => {
    const updated = { ...localMessage, status }
    setLocalMessage(updated)
    onUpdate(updated)
    toast.success(`Message marked as ${status}`)
  }

  const handleAddTag = () => {
    if (!newTag.trim()) return
    
    const updated = {
      ...localMessage,
      tags: [...(localMessage.tags || []), newTag.trim()],
    }
    setLocalMessage(updated)
    onUpdate(updated)
    setNewTag('')
    toast.success('Tag added')
  }

  const handleRemoveTag = (tag: string) => {
    const updated = {
      ...localMessage,
      tags: localMessage.tags.filter((t: string) => t !== tag),
    }
    setLocalMessage(updated)
    onUpdate(updated)
    toast.success('Tag removed')
  }

  const handleSaveNotes = () => {
    const updated = { ...localMessage, notes }
    setLocalMessage(updated)
    onUpdate(updated)
    toast.success('Notes saved')
  }

  const handleLinkCase = (caseId: string) => {
    const updated = { ...localMessage, caseId }
    setLocalMessage(updated)
    onUpdate(updated)
    toast.success('Case linked')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{localMessage.contactName}</CardTitle>
              <CardDescription>{localMessage.from}</CardDescription>
            </div>
            <div className="flex gap-2">
              {localMessage.status === 'unread' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange('reviewing')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Review
                </Button>
              )}
              {localMessage.status === 'reviewing' && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleStatusChange('processed')}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Done
                </Button>
              )}
              {localMessage.status === 'processed' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange('archived')}
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Received: {new Date(localMessage.timestamp).toLocaleString()}
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-base">{localMessage.body}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {localMessage.autoTagged && (
              <Badge variant="secondary">
                <Tag className="h-3 w-3 mr-1" />
                Auto-Tagged
              </Badge>
            )}
            {localMessage.tags?.map((tag: string) => (
              <Badge key={tag} variant="outline" className="gap-1">
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Case Association</CardTitle>
          <CardDescription>Link this message to a case</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {localMessage.caseId ? (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Linked Case</p>
                <p className="text-sm text-muted-foreground">{localMessage.caseId}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLinkCase('')}
              >
                Unlink
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Select Case</Label>
              <Select onValueChange={handleLinkCase}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CASE-001">CASE-001 - John Doe</SelectItem>
                  <SelectItem value="CASE-002">CASE-002 - Jane Smith</SelectItem>
                  <SelectItem value="CASE-003">CASE-003 - Bob Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tags</CardTitle>
          <CardDescription>Add custom tags to categorize this message</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter tag name"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <Button onClick={handleAddTag}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notes</CardTitle>
          <CardDescription>Add internal notes about this message</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
          <Button onClick={handleSaveNotes} className="w-full">
            Save Notes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Reply</CardTitle>
          <CardDescription>Send a response to this message</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Type your reply..."
            rows={3}
          />
          <Button className="w-full">
            <Reply className="h-4 w-4 mr-2" />
            Send Reply
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
