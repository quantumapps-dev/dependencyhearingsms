import { Metadata } from 'next'
import SecurityClient from '@/components/security/security-client'

export const metadata: Metadata = {
  title: 'Security & Compliance | Dependency Hearing SMS',
  description: 'Manage security settings, role-based access, and compliance policies',
}

export default function SecurityPage() {
  return <SecurityClient />
}
