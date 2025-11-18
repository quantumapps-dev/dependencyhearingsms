'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText } from 'lucide-react'
import { toast } from 'sonner'

interface LegalNotice {
  title: string
  content: string
  enabled: boolean
  lastUpdated: string
}

interface LegalNotices {
  privacyPolicy: LegalNotice
  termsOfService: LegalNotice
  disclaimer: LegalNotice
}

export default function LegalNotices() {
  const [notices, setNotices] = useState<LegalNotices>({
    privacyPolicy: {
      title: 'Privacy Policy',
      content: '',
      enabled: true,
      lastUpdated: new Date().toISOString(),
    },
    termsOfService: {
      title: 'Terms of Service',
      content: '',
      enabled: true,
      lastUpdated: new Date().toISOString(),
    },
    disclaimer: {
      title: 'Legal Disclaimer',
      content: '',
      enabled: true,
      lastUpdated: new Date().toISOString(),
    },
  })

  useEffect(() => {
    const saved = localStorage.getItem('legal_notices')
    if (saved) {
      setNotices(JSON.parse(saved))
    } else {
      const defaults: LegalNotices = {
        privacyPolicy: {
          title: 'Privacy Policy',
          content: 'This system collects and processes personal information in accordance with HIPAA and FERPA regulations. All data is encrypted and access is logged for security purposes.',
          enabled: true,
          lastUpdated: new Date().toISOString(),
        },
        termsOfService: {
          title: 'Terms of Service',
          content: 'By accessing this system, you agree to comply with all applicable laws and regulations. Unauthorized access or misuse of this system is prohibited and may result in legal action.',
          enabled: true,
          lastUpdated: new Date().toISOString(),
        },
        disclaimer: {
          title: 'Legal Disclaimer',
          content: 'The information provided through this system is for official court business only. Users are responsible for maintaining confidentiality and protecting sensitive information.',
          enabled: true,
          lastUpdated: new Date().toISOString(),
        },
      }
      setNotices(defaults)
      localStorage.setItem('legal_notices', JSON.stringify(defaults))
    }
  }, [])

  const updateNotice = (
    key: keyof LegalNotices,
    field: keyof LegalNotice,
    value: any
  ) => {
    const updated = {
      ...notices,
      [key]: {
        ...notices[key],
        [field]: value,
        lastUpdated: new Date().toISOString(),
      },
    }
    setNotices(updated)
    localStorage.setItem('legal_notices', JSON.stringify(updated))
    toast.success('Legal notice updated')
  }

  return (
    <div className="space-y-6">
      {Object.entries(notices).map(([key, notice]) => (
        <Card key={key}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {notice.title}
                </CardTitle>
                <CardDescription>
                  Last updated: {new Date(notice.lastUpdated).toLocaleDateString()}
                </CardDescription>
              </div>
              <Switch
                checked={notice.enabled}
                onCheckedChange={(checked) =>
                  updateNotice(key as keyof LegalNotices, 'enabled', checked)
                }
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${key}-title`}>Title</Label>
              <Input
                id={`${key}-title`}
                value={notice.title}
                onChange={(e) =>
                  updateNotice(key as keyof LegalNotices, 'title', e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${key}-content`}>Content</Label>
              <Textarea
                id={`${key}-content`}
                value={notice.content}
                onChange={(e) =>
                  updateNotice(key as keyof LegalNotices, 'content', e.target.value)
                }
                rows={6}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button className="w-full">
        Save All Legal Notices
      </Button>
    </div>
  )
}
