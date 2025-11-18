import { Metadata } from 'next'
import ReportsClient from '@/components/reports/reports-client'

export const metadata: Metadata = {
  title: 'Reports & Analytics | Dependency Hearing SMS',
  description: 'View comprehensive reports and analytics',
}

export default function ReportsPage() {
  return <ReportsClient />
}
