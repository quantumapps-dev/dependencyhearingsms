'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

const integrationSchema = z.object({
  endpoint: z.string().url('Must be a valid URL'),
  apiKey: z.string().min(1, 'API key is required'),
  syncInterval: z.string(),
  autoSync: z.boolean(),
  syncCases: z.boolean(),
  syncParticipants: z.boolean(),
  syncHearings: z.boolean(),
  syncDocuments: z.boolean(),
})

type IntegrationFormData = z.infer<typeof integrationSchema>

interface DexIntegrationFormProps {
  type?: string
}

export default function DexIntegrationForm({ type = 'DEX' }: DexIntegrationFormProps) {
  const [config, setConfig] = useState<IntegrationFormData | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IntegrationFormData>({
    resolver: zodResolver(integrationSchema),
    defaultValues: {
      endpoint: 'https://api.dex.example.com/v1',
      apiKey: '',
      syncInterval: '3600',
      autoSync: true,
      syncCases: true,
      syncParticipants: true,
      syncHearings: true,
      syncDocuments: false,
    },
  })

  useEffect(() => {
    const saved = localStorage.getItem(`integration_config_${type.toLowerCase()}`)
    if (saved) {
      const data = JSON.parse(saved)
      setConfig(data)
      Object.keys(data).forEach((key) => {
        setValue(key as keyof IntegrationFormData, data[key])
      })
    }
  }, [type, setValue])

  const onSubmit = (data: IntegrationFormData) => {
    localStorage.setItem(`integration_config_${type.toLowerCase()}`, JSON.stringify(data))
    setConfig(data)
    toast.success(`${type} integration configuration saved`)
  }

  const autoSync = watch('autoSync')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="endpoint">API Endpoint</Label>
          <Input
            id="endpoint"
            placeholder="https://api.example.com/v1"
            {...register('endpoint')}
          />
          {errors.endpoint && (
            <p className="text-sm text-destructive">{errors.endpoint.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="Enter API key"
            {...register('apiKey')}
          />
          {errors.apiKey && (
            <p className="text-sm text-destructive">{errors.apiKey.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="syncInterval">Sync Interval</Label>
          <Select
            defaultValue="3600"
            onValueChange={(value) => setValue('syncInterval', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="900">Every 15 minutes</SelectItem>
              <SelectItem value="1800">Every 30 minutes</SelectItem>
              <SelectItem value="3600">Every hour</SelectItem>
              <SelectItem value="7200">Every 2 hours</SelectItem>
              <SelectItem value="14400">Every 4 hours</SelectItem>
              <SelectItem value="86400">Daily</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 flex items-center justify-between pt-8">
          <Label htmlFor="autoSync">Auto Sync</Label>
          <Switch
            id="autoSync"
            checked={autoSync}
            onCheckedChange={(checked) => setValue('autoSync', checked)}
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium mb-3">Data Sync Options</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="syncCases">Sync Cases</Label>
            <Switch
              id="syncCases"
              defaultChecked
              onCheckedChange={(checked) => setValue('syncCases', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="syncParticipants">Sync Participants</Label>
            <Switch
              id="syncParticipants"
              defaultChecked
              onCheckedChange={(checked) => setValue('syncParticipants', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="syncHearings">Sync Hearings</Label>
            <Switch
              id="syncHearings"
              defaultChecked
              onCheckedChange={(checked) => setValue('syncHearings', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="syncDocuments">Sync Documents</Label>
            <Switch
              id="syncDocuments"
              onCheckedChange={(checked) => setValue('syncDocuments', checked)}
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save Configuration
      </Button>
    </form>
  )
}
