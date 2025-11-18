import { Metadata } from 'next'
import InboxClient from '@/components/inbox/inbox-client'

export const metadata: Metadata = {
  title: 'Message Inbox | Dependency Hearing SMS',
  description: 'Manage incoming SMS messages and replies',
}

export default function InboxPage() {
  return <InboxClient />
}
