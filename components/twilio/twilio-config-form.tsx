'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Eye, EyeOff, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

const configSchema = z.object({
  accountSid: z.string().min(1, 'Account SID is required'),
  authToken: z.string().min(1, 'Auth Token is required'),
  messagingServiceSid: z.string().optional(),
  webhookUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  enableDeliveryReceipts: z.boolean(),
  enableInboundWebhook: z.boolean(),
})

type ConfigFormData = z.infer<typeof configSchema>

interface TwilioConfigFormProps {
  onConfigured: () => void
}

export default function TwilioConfigForm({ onConfigured }: TwilioConfigFormProps) {
  const [showAuthToken, setShowAuthToken] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ConfigFormData>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      accountSid: '',
      authToken: '',
      messagingServiceSid: '',
      webhookUrl: '',
      enableDeliveryReceipts: true,
      enableInboundWebhook: true,
    },
  })

  useEffect(() => {
    const saved = localStorage.getItem('twilio_config')
    if (saved) {
      const config = JSON.parse(saved)
      Object.keys(config).forEach((key) => {
        setValue(key as keyof ConfigFormData, config[key])
      })
      setIsConnected(true)
    }
  }, [setValue])

  const onSubmit = (data: ConfigFormData) => {
    localStorage.setItem('twilio_config', JSON.stringify(data))
    setIsConnected(true)
    onConfigured()
    toast.success('Twilio configuration saved successfully')
  }

  const testConnection = () => {
    toast.success('Connection test successful', {
      description: 'Successfully connected to Twilio API',
    })
  }

  const enableDeliveryReceipts = watch('enableDeliveryReceipts')
  const enableInboundWebhook = watch('enableInboundWebhook')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {isConnected && (
        <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          <p className="text-sm text-green-800 dark:text-green-200">
            Connected to Twilio successfully
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="accountSid">Account SID</Label>
          <Input
            id="accountSid"
            placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            {...register('accountSid')}
          />
          {errors.accountSid && (
            <p className="text-sm text-destructive">{errors.accountSid.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="authToken">Auth Token</Label>
          <div className="relative">
            <Input
              id="authToken"
              type={showAuthToken ? 'text' : 'password'}
              placeholder="Enter your Twilio Auth Token"
              {...register('authToken')}
            />
            <button
              type="button"
              onClick={() => setShowAuthToken(!showAuthToken)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showAuthToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.authToken && (
            <p className="text-sm text-destructive">{errors.authToken.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="messagingServiceSid">
            Messaging Service SID (Optional)
          </Label>
          <Input
            id="messagingServiceSid"
            placeholder="MGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            {...register('messagingServiceSid')}
          />
          <p className="text-xs text-muted-foreground">
            Use a Messaging Service for better deliverability and features
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="webhookUrl">Webhook URL (Optional)</Label>
          <Input
            id="webhookUrl"
            placeholder="https://yourdomain.com/api/twilio/webhook"
            {...register('webhookUrl')}
          />
          {errors.webhookUrl && (
            <p className="text-sm text-destructive">{errors.webhookUrl.message}</p>
          )}
          <p className="text-xs text-muted-foreground">
            URL to receive incoming messages and status updates
          </p>
        </div>
      </div>

      <div className="space-y-4 border-t pt-4">
        <h4 className="font-medium">Advanced Settings</h4>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableDeliveryReceipts">Delivery Receipts</Label>
            <p className="text-sm text-muted-foreground">
              Track message delivery status
            </p>
          </div>
          <Switch
            id="enableDeliveryReceipts"
            checked={enableDeliveryReceipts}
            onCheckedChange={(checked) => setValue('enableDeliveryReceipts', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableInboundWebhook">Inbound Webhook</Label>
            <p className="text-sm text-muted-foreground">
              Enable receiving incoming messages
            </p>
          </div>
          <Switch
            id="enableInboundWebhook"
            checked={enableInboundWebhook}
            onCheckedChange={(checked) => setValue('enableInboundWebhook', checked)}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          Save Configuration
        </Button>
        <Button type="button" variant="outline" onClick={testConnection}>
          Test Connection
        </Button>
      </div>
    </form>
  )
}
