import { z } from 'zod';

// Case Schema
export const caseSchema = z.object({
  docketNumber: z.string().min(1, 'Docket number is required'),
  title: z.string().min(1, 'Case title is required'),
  type: z.enum(['dependency', 'delinquency', 'abuse', 'neglect', 'termination', 'other']),
  status: z.enum(['pending', 'active', 'closed', 'transferred', 'appealed']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  filingDate: z.string().min(1, 'Filing date is required'),
  nextHearingDate: z.string().optional(),
  nextHearingTime: z.string().optional(),
  nextHearingLocation: z.string().optional(),
  nextHearingType: z.string().optional(),
  assignedJudge: z.string().optional(),
  assignedCaseWorker: z.string().optional(),
  childrenInvolved: z.string().optional(),
  notes: z.string().optional(),
});

// Contact Schema
export const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  relationship: z.enum(['mother', 'father', 'guardian', 'foster_parent', 'relative', 'other']),
  phoneNumber: z.string().regex(/^\+?1?\d{10,15}$/, 'Invalid phone number format'),
  alternatePhone: z.string().regex(/^\+?1?\d{10,15}$/, 'Invalid phone number format').optional().or(z.literal('')),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  preferredContact: z.enum(['sms', 'phone', 'email']),
  smsConsent: z.boolean(),
  consentDate: z.string().optional(),
  language: z.string().min(1, 'Language is required'),
  needsInterpreter: z.boolean(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  emergencyContact: z.boolean(),
  linkedCases: z.string().optional(),
  notes: z.string().optional(),
});

// Participant Schema
export const participantSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().optional(),
  role: z.enum(['child', 'parent', 'guardian', 'attorney', 'caseworker', 'foster_parent', 'therapist', 'advocate', 'other']),
  caseId: z.string().min(1, 'Case is required'),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email('Invalid email format').optional().or(z.literal('')),
  attorneyBarNumber: z.string().optional(),
  courtAppointed: z.boolean(),
  specialNeeds: z.string().optional(),
  languagePreference: z.string().min(1, 'Language preference is required'),
  notes: z.string().optional(),
});

// Message Schema
export const messageSchema = z.object({
  recipientId: z.string().min(1, 'Recipient is required'),
  caseId: z.string().optional(),
  messageType: z.enum(['hearing_reminder', 'case_update', 'document_request', 'general', 'emergency']),
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Message body is required').max(1600, 'Message is too long'),
  scheduledFor: z.string().min(1, 'Schedule date/time is required'),
  sendBefore: z.number().optional(),
});

// Document Schema
export const documentSchema = z.object({
  caseId: z.string().min(1, 'Case is required'),
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['petition', 'order', 'report', 'evaluation', 'medical_record', 'evidence', 'correspondence', 'other']),
  fileName: z.string().min(1, 'File name is required'),
  fileSize: z.number().positive('File size must be positive'),
  uploadedBy: z.string().min(1, 'Uploaded by is required'),
  tags: z.string().optional(),
  confidential: z.boolean(),
  hipaaProtected: z.boolean(),
  ferpaProtected: z.boolean(),
  expirationDate: z.string().optional(),
  status: z.enum(['active', 'archived', 'expired']),
  description: z.string().optional(),
});

// Integration Config Schema
export const integrationConfigSchema = z.object({
  type: z.enum(['dex', 'cpcms', 'access_db']),
  name: z.string().min(1, 'Integration name is required'),
  enabled: z.boolean(),
  endpoint: z.string().url('Invalid endpoint URL').optional().or(z.literal('')),
  apiKey: z.string().optional(),
  username: z.string().optional(),
  syncInterval: z.number().min(5, 'Sync interval must be at least 5 minutes'),
  autoSync: z.boolean(),
  syncCases: z.boolean(),
  syncParticipants: z.boolean(),
  syncDocuments: z.boolean(),
  syncHearings: z.boolean(),
});

// Twilio Config Schema
export const twilioConfigSchema = z.object({
  accountSid: z.string().min(1, 'Account SID is required'),
  authToken: z.string().min(1, 'Auth Token is required'),
  messagingServiceSid: z.string().optional(),
  statusCallbackUrl: z.string().url('Invalid callback URL').optional().or(z.literal('')),
  maxRetries: z.number().min(0).max(5),
  retryDelay: z.number().min(1).max(60),
  enableDeliveryReports: z.boolean(),
  enableErrorNotifications: z.boolean(),
});

// Phone Number Schema
export const phoneNumberSchema = z.object({
  phoneNumber: z.string().regex(/^\+?1?\d{10,15}$/, 'Invalid phone number format'),
  friendlyName: z.string().min(1, 'Friendly name is required'),
  type: z.enum(['local', 'tollfree', 'shortcode']),
  active: z.boolean(),
  isPrimary: z.boolean(),
  assignedTo: z.string().optional(),
  monthlyMessagesLimit: z.number().optional(),
});

// Message Template Schema
export const messageTemplateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  category: z.string().min(1, 'Category is required'),
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Message body is required').max(1600, 'Message is too long'),
  language: z.string().min(1, 'Language is required'),
  active: z.boolean(),
});

// User Schema
export const userSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.enum(['admin', 'supervisor', 'caseworker', 'clerk', 'readonly']),
  active: z.boolean(),
});

// Compliance Settings Schema
export const complianceSettingsSchema = z.object({
  hipaaEnabled: z.boolean(),
  ferpaEnabled: z.boolean(),
  encryptionEnabled: z.boolean(),
  dataRetentionDays: z.number().min(30, 'Minimum 30 days retention required'),
  autoDeleteExpired: z.boolean(),
  auditLogRetentionDays: z.number().min(365, 'Minimum 1 year audit log retention required'),
  requireConsentForSms: z.boolean(),
  privacyPolicyUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  termsOfServiceUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

// Data Retention Policy Schema
export const dataRetentionPolicySchema = z.object({
  entityType: z.string().min(1, 'Entity type is required'),
  retentionPeriodDays: z.number().min(1, 'Retention period must be at least 1 day'),
  autoDelete: z.boolean(),
  archiveBeforeDelete: z.boolean(),
  exceptions: z.string().optional(),
});
