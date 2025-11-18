'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, Database } from 'lucide-react'
import { toast } from 'sonner'

interface FieldMapping {
  id: string
  sourceField: string
  targetField: string
  dataType: string
}

interface TableMapping {
  id: string
  sourceTable: string
  targetTable: string
  fields: FieldMapping[]
}

export default function AccessDatabaseForm() {
  const [mappings, setMappings] = useState<TableMapping[]>([])
  const [currentMapping, setCurrentMapping] = useState<TableMapping>({
    id: Date.now().toString(),
    sourceTable: '',
    targetTable: '',
    fields: [],
  })

  useEffect(() => {
    const saved = localStorage.getItem('access_db_mappings')
    if (saved) setMappings(JSON.parse(saved))
  }, [])

  const addFieldMapping = () => {
    const newField: FieldMapping = {
      id: Date.now().toString(),
      sourceField: '',
      targetField: '',
      dataType: 'text',
    }
    setCurrentMapping({
      ...currentMapping,
      fields: [...currentMapping.fields, newField],
    })
  }

  const updateFieldMapping = (
    fieldId: string,
    key: keyof FieldMapping,
    value: string
  ) => {
    setCurrentMapping({
      ...currentMapping,
      fields: currentMapping.fields.map((f) =>
        f.id === fieldId ? { ...f, [key]: value } : f
      ),
    })
  }

  const removeFieldMapping = (fieldId: string) => {
    setCurrentMapping({
      ...currentMapping,
      fields: currentMapping.fields.filter((f) => f.id !== fieldId),
    })
  }

  const saveMapping = () => {
    if (!currentMapping.sourceTable || !currentMapping.targetTable) {
      toast.error('Please specify source and target tables')
      return
    }

    const updatedMappings = [...mappings, currentMapping]
    setMappings(updatedMappings)
    localStorage.setItem('access_db_mappings', JSON.stringify(updatedMappings))
    
    setCurrentMapping({
      id: Date.now().toString(),
      sourceTable: '',
      targetTable: '',
      fields: [],
    })
    
    toast.success('Table mapping saved successfully')
  }

  const deleteMapping = (id: string) => {
    const updatedMappings = mappings.filter((m) => m.id !== id)
    setMappings(updatedMappings)
    localStorage.setItem('access_db_mappings', JSON.stringify(updatedMappings))
    toast.success('Mapping deleted')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">New Table Mapping</CardTitle>
          <CardDescription>
            Map fields from Access database tables to system tables
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sourceTable">Access Table Name</Label>
              <Input
                id="sourceTable"
                placeholder="e.g., tblCases"
                value={currentMapping.sourceTable}
                onChange={(e) =>
                  setCurrentMapping({ ...currentMapping, sourceTable: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetTable">System Table</Label>
              <Select
                value={currentMapping.targetTable}
                onValueChange={(value) =>
                  setCurrentMapping({ ...currentMapping, targetTable: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target table" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cases">Cases</SelectItem>
                  <SelectItem value="participants">Participants</SelectItem>
                  <SelectItem value="contacts">Contacts</SelectItem>
                  <SelectItem value="hearings">Hearings</SelectItem>
                  <SelectItem value="documents">Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Field Mappings</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addFieldMapping}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </div>

            <div className="space-y-2">
              {currentMapping.fields.map((field) => (
                <div key={field.id} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Input
                      placeholder="Access field name"
                      value={field.sourceField}
                      onChange={(e) =>
                        updateFieldMapping(field.id, 'sourceField', e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="System field name"
                      value={field.targetField}
                      onChange={(e) =>
                        updateFieldMapping(field.id, 'targetField', e.target.value)
                      }
                    />
                  </div>
                  <Select
                    value={field.dataType}
                    onValueChange={(value) =>
                      updateFieldMapping(field.id, 'dataType', value)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="boolean">Boolean</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFieldMapping(field.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={saveMapping} className="w-full">
            Save Table Mapping
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Existing Mappings</h3>
        {mappings.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <Database className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No table mappings configured yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {mappings.map((mapping) => (
              <Card key={mapping.id}>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {mapping.sourceTable} → {mapping.targetTable}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {mapping.fields.length} fields mapped
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMapping(mapping.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
