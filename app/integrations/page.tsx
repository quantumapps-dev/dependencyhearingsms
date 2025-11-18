import { Metadata } from 'next'
import IntegrationsClient from '@/components/integrations/integrations-client'

export const metadata: Metadata = {
  title: 'System Integrations | Dependency Hearing SMS',
  description: 'Manage system integrations with DEX, CPCMS, and legacy Access databases',
}

export default function IntegrationsPage() {
  return <IntegrationsClient />
}
