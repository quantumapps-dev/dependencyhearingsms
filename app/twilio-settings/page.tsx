import { Metadata } from 'next'
import TwilioSettingsClient from '@/components/twilio/twilio-settings-client'

export const metadata: Metadata = {
  title: 'Twilio Configuration | Dependency Hearing SMS',
  description: 'Configure Twilio SMS integration settings',
}

export default function TwilioSettingsPage() {
  return <TwilioSettingsClient />
}
