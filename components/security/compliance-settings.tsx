'use client'

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { toast } from 'sonner'

interface ComplianceStatus {
  hipaa: boolean
  ferpa: boolean
  encryption: boolean
  auditLog: boolean
}

interface ComplianceSettingsProps {
  status: ComplianceStatus
  onUpdate: (status: ComplianceStatus) => void
}

export default function ComplianceSettings({
  status,
  onUpdate,
}: ComplianceSettingsProps) {
  const handleToggle = (key: keyof ComplianceStatus) => {
    const updated = { ...status, [key]: !status[key] }
    onUpdate(updated)
    localStorage.setItem('compliance_status', JSON.stringify(updated))
    toast.success(`${key.toUpperCase()} compliance ${updated[key] ? 'enabled' : 'disabled'}`)
  }

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Compliance Information</AlertTitle>
        <AlertDescription>
          Enable compliance features to ensure your system meets regulatory requirements
          for handling sensitive health and education data.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="hipaa" className="text-base font-semibold">
                  HIPAA Compliance
                </Label>
                {status.hipaa && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Health Insurance Portability and Accountability Act compliance for
                protected health information (PHI)
              </p>
            </div>
            <Switch
              id="hipaa"
              checked={status.hipaa}
              onCheckedChange={() => handleToggle('hipaa')}
            />
          </div>

          {status.hipaa && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                HIPAA compliance enabled. All PHI will be encrypted and access will
                be logged.
              </AlertDescription>
            </Alert>
          )}

          <div className="text-sm space-y-2 pt-2 border-t">
            <p className="font-medium">HIPAA Requirements:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>End-to-end encryption for all health data</li>
              <li>Audit logging of all PHI access</li>
              <li>User authentication and authorization</li>
              <li>Business Associate Agreements (BAA) required</li>
              <li>Data retention and disposal policies</li>
            </ul>
          </div>
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="ferpa" className="text-base font-semibold">
                  FERPA Compliance
                </Label>
                {status.ferpa && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Family Educational Rights and Privacy Act compliance for education
                records
              </p>
            </div>
            <Switch
              id="ferpa"
              checked={status.ferpa}
              onCheckedChange={() => handleToggle('ferpa')}
            />
          </div>

          {status.ferpa && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                FERPA compliance enabled. All education records will be protected
                and access restricted.
              </AlertDescription>
            </Alert>
          )}

          <div className="text-sm space-y-2 pt-2 border-t">
            <p className="font-medium">FERPA Requirements:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Parental consent for disclosure of education records</li>
              <li>Limited access to authorized personnel only</li>
              <li>Audit trail of record access and modifications</li>
              <li>Annual notification of rights to parents</li>
              <li>Secure storage of student records</li>
            </ul>
          </div>
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="encryption" className="text-base font-semibold">
                  Data Encryption
                </Label>
                {status.encryption && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Encrypt all sensitive data at rest and in transit
              </p>
            </div>
            <Switch
              id="encryption"
              checked={status.encryption}
              onCheckedChange={() => handleToggle('encryption')}
            />
          </div>
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="auditLog" className="text-base font-semibold">
                  Audit Logging
                </Label>
                {status.auditLog && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Log all user actions and data access for compliance
              </p>
            </div>
            <Switch
              id="auditLog"
              checked={status.auditLog}
              onCheckedChange={() => handleToggle('auditLog')}
            />
          </div>
        </div>
      </div>

      {(!status.hipaa || !status.ferpa) && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Compliance Warning</AlertTitle>
          <AlertDescription>
            Some compliance features are disabled. Ensure you have proper authorization
            before handling sensitive health or education data.
          </AlertDescription>
        </Alert>
      )}

      <Button className="w-full">
        Save Compliance Settings
      </Button>
    </div>
  )
}
