'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Database, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface RetentionPolicy {
  id: string
  dataType: string
  retentionPeriod: string
  autoDelete: boolean
}

export default function DataRetention() {
  const [policies, setPolicies] = useState<RetentionPolicy[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('retention_policies')
    if (saved) {
      setPolicies(JSON.parse(saved))
    } else {
      const defaultPolicies: RetentionPolicy[] = [
        {
          id: '1',
          dataType: 'Case Records',
          retentionPeriod: '7-years',
          autoDelete: false,
        },
        {
          id: '2',
          dataType: 'SMS Messages',
          retentionPeriod: '3-years',
          autoDelete: true,
        },
        {
          id: '3',
          dataType: 'Audit Logs',
          retentionPeriod: '5-years',
          autoDelete: false,
        },
        {
          id: '4',
          dataType: 'Contact Information',
          retentionPeriod: '5-years',
          autoDelete: true,
        },
        {
          id: '5',
          dataType: 'Documents',
          retentionPeriod: '10-years',
          autoDelete: false,
        },
      ]
      setPolicies(defaultPolicies)
      localStorage.setItem('retention_policies', JSON.stringify(defaultPolicies))
    }
  }, [])

  const updatePolicy = (id: string, field: string, value: any) => {
    const updated = policies.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    )
    setPolicies(updated)
    localStorage.setItem('retention_policies', JSON.stringify(updated))
    toast.success('Retention policy updated')
  }

  const getPeriodLabel = (period: string) => {
    const labels: Record<string, string> = {
      '1-year': '1 Year',
      '2-years': '2 Years',
      '3-years': '3 Years',
      '5-years': '5 Years',
      '7-years': '7 Years',
      '10-years': '10 Years',
      'indefinite': 'Indefinite',
    }
    return labels[period] || period
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {policies.map((policy) => (
          <Card key={policy.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Database className="h-5 w-5 text-muted-foreground mt-1" />
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">{policy.dataType}</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically managed based on retention period
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Retention Period</Label>
                      <Select
                        value={policy.retentionPeriod}
                        onValueChange={(value) =>
                          updatePolicy(policy.id, 'retentionPeriod', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-year">1 Year</SelectItem>
                          <SelectItem value="2-years">2 Years</SelectItem>
                          <SelectItem value="3-years">3 Years</SelectItem>
                          <SelectItem value="5-years">5 Years</SelectItem>
                          <SelectItem value="7-years">7 Years</SelectItem>
                          <SelectItem value="10-years">10 Years</SelectItem>
                          <SelectItem value="indefinite">Indefinite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Auto-Delete</Label>
                      <Select
                        value={policy.autoDelete ? 'yes' : 'no'}
                        onValueChange={(value) =>
                          updatePolicy(policy.id, 'autoDelete', value === 'yes')
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Enabled</SelectItem>
                          <SelectItem value="no">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t text-sm">
                    <span className="text-muted-foreground">
                      Data older than {getPeriodLabel(policy.retentionPeriod)}{' '}
                      will be {policy.autoDelete ? 'automatically deleted' : 'flagged for review'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button className="w-full">
        <Database className="h-4 w-4 mr-2" />
        Run Retention Cleanup Now
      </Button>
    </div>
  )
}
