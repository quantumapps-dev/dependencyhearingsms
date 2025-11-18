'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Plus, Trash2, Copy } from 'lucide-react'
import { toast } from 'sonner'

interface Template {
  id: string
  name: string
  content: string
  variables: string[]
}

export default function MessageTemplates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [newName, setNewName] = useState('')
  const [newContent, setNewContent] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('twilio_templates')
    if (saved) {
      setTemplates(JSON.parse(saved))
    } else {
      // Default templates
      const defaultTemplates: Template[] = [
        {
          id: '1',
          name: 'Hearing Reminder',
          content: 'Hello {{name}}, this is a reminder about your dependency hearing on {{date}} at {{time}}. Location: {{location}}. Case #{{caseNumber}}.',
          variables: ['name', 'date', 'time', 'location', 'caseNumber'],
        },
        {
          id: '2',
          name: 'Document Request',
          content: 'Hi {{name}}, we need you to submit {{documentType}} for case #{{caseNumber}} by {{deadline}}. Please contact us if you have questions.',
          variables: ['name', 'documentType', 'caseNumber', 'deadline'],
        },
      ]
      setTemplates(defaultTemplates)
      localStorage.setItem('twilio_templates', JSON.stringify(defaultTemplates))
    }
  }, [])

  const extractVariables = (content: string): string[] => {
    const regex = /\{\{(\w+)\}\}/g
    const matches = content.matchAll(regex)
    return Array.from(matches, (m) => m[1])
  }

  const addTemplate = () => {
    if (!newName || !newContent) {
      toast.error('Please enter template name and content')
      return
    }

    const template: Template = {
      id: Date.now().toString(),
      name: newName,
      content: newContent,
      variables: extractVariables(newContent),
    }

    const updated = [...templates, template]
    setTemplates(updated)
    localStorage.setItem('twilio_templates', JSON.stringify(updated))
    
    setNewName('')
    setNewContent('')
    toast.success('Template created')
  }

  const removeTemplate = (id: string) => {
    const updated = templates.filter((t) => t.id !== id)
    setTemplates(updated)
    localStorage.setItem('twilio_templates', JSON.stringify(updated))
    toast.success('Template deleted')
  }

  const copyTemplate = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success('Template copied to clipboard')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="templateName">Template Name</Label>
            <Input
              id="templateName"
              placeholder="e.g., Hearing Reminder"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="templateContent">Template Content</Label>
            <Textarea
              id="templateContent"
              placeholder="Use {{variable}} for dynamic content"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Use double curly braces for variables, e.g., Hello {'{'}
              {'{'}name{'}'}
              {'}'}
            </p>
          </div>
          <Button onClick={addTemplate} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h4 className="font-medium">Saved Templates</h4>
        {templates.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No templates created yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardContent className="py-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {template.content}
                      </p>
                      {template.variables.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {template.variables.map((v) => (
                            <span
                              key={v}
                              className="text-xs px-2 py-1 bg-muted rounded"
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyTemplate(template.content)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTemplate(template.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
