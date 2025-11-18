// Application constants

export const CASE_TYPES = [
  { value: 'dependency', label: 'Dependency' },
  { value: 'delinquency', label: 'Delinquency' },
  { value: 'abuse', label: 'Abuse/Neglect' },
  { value: 'neglect', label: 'Neglect' },
  { value: 'termination', label: 'Termination of Parental Rights' },
  { value: 'other', label: 'Other' },
];

export const CASE_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'active', label: 'Active' },
  { value: 'closed', label: 'Closed' },
  { value: 'transferred', label: 'Transferred' },
  { value: 'appealed', label: 'Appealed' },
];

export const PRIORITIES = [
  { value: 'low', label: 'Low', color: 'text-slate-600' },
  { value: 'medium', label: 'Medium', color: 'text-blue-600' },
  { value: 'high', label: 'High', color: 'text-orange-600' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-600' },
];

export const RELATIONSHIPS = [
  { value: 'mother', label: 'Mother' },
  { value: 'father', label: 'Father' },
  { value: 'guardian', label: 'Legal Guardian' },
  { value: 'foster_parent', label: 'Foster Parent' },
  { value: 'relative', label: 'Relative' },
  { value: 'other', label: 'Other' },
];

export const PARTICIPANT_ROLES = [
  { value: 'child', label: 'Child' },
  { value: 'parent', label: 'Parent' },
  { value: 'guardian', label: 'Guardian' },
  { value: 'attorney', label: 'Attorney' },
  { value: 'caseworker', label: 'Case Worker' },
  { value: 'foster_parent', label: 'Foster Parent' },
  { value: 'therapist', label: 'Therapist' },
  { value: 'advocate', label: 'Advocate' },
  { value: 'other', label: 'Other' },
];

export const MESSAGE_TYPES = [
  { value: 'hearing_reminder', label: 'Hearing Reminder' },
  { value: 'case_update', label: 'Case Update' },
  { value: 'document_request', label: 'Document Request' },
  { value: 'general', label: 'General Notice' },
  { value: 'emergency', label: 'Emergency' },
];

export const DOCUMENT_TYPES = [
  { value: 'petition', label: 'Petition' },
  { value: 'order', label: 'Court Order' },
  { value: 'report', label: 'Report' },
  { value: 'evaluation', label: 'Evaluation' },
  { value: 'medical_record', label: 'Medical Record' },
  { value: 'evidence', label: 'Evidence' },
  { value: 'correspondence', label: 'Correspondence' },
  { value: 'other', label: 'Other' },
];

export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ar', label: 'Arabic' },
  { value: 'other', label: 'Other' },
];

export const USER_ROLES = [
  { value: 'admin', label: 'Administrator' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'caseworker', label: 'Case Worker' },
  { value: 'clerk', label: 'Clerk' },
  { value: 'readonly', label: 'Read Only' },
];

export const INTEGRATION_TYPES = [
  { value: 'dex', label: 'DEX (Data Exchange)' },
  { value: 'cpcms', label: 'CPCMS (Case Management)' },
  { value: 'access_db', label: 'Microsoft Access Database' },
];

export const PHONE_NUMBER_TYPES = [
  { value: 'local', label: 'Local Number' },
  { value: 'tollfree', label: 'Toll-Free Number' },
  { value: 'shortcode', label: 'Short Code' },
];

export const MESSAGE_STATUSES = [
  { value: 'scheduled', label: 'Scheduled', color: 'bg-blue-100 text-blue-800' },
  { value: 'sent', label: 'Sent', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { value: 'failed', label: 'Failed', color: 'bg-red-100 text-red-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-slate-100 text-slate-800' },
];

export const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];
