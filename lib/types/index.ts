// Core Types for Dependency Hearing SMS System

export interface Case {
  id: string;
  docketNumber: string;
  title: string;
  type: 'dependency' | 'delinquency' | 'abuse' | 'neglect' | 'termination' | 'other';
  status: 'pending' | 'active' | 'closed' | 'transferred' | 'appealed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  filingDate: string;
  nextHearingDate?: string;
  nextHearingTime?: string;
  nextHearingLocation?: string;
  nextHearingType?: string;
  assignedJudge?: string;
  assignedCaseWorker?: string;
  childrenInvolved: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  relationship: 'mother' | 'father' | 'guardian' | 'foster_parent' | 'relative' | 'other';
  phoneNumber: string;
  alternatePhone?: string;
  email?: string;
  preferredContact: 'sms' | 'phone' | 'email';
  smsConsent: boolean;
  consentDate?: string;
  language: string;
  needsInterpreter: boolean;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  emergencyContact: boolean;
  linkedCases: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  role: 'child' | 'parent' | 'guardian' | 'attorney' | 'caseworker' | 'foster_parent' | 'therapist' | 'advocate' | 'other';
  caseId: string;
  contactPhone?: string;
  contactEmail?: string;
  attorneyBarNumber?: string;
  courtAppointed: boolean;
  specialNeeds?: string;
  languagePreference: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientPhone: string;
  caseId?: string;
  docketNumber?: string;
  messageType: 'hearing_reminder' | 'case_update' | 'document_request' | 'general' | 'emergency';
  subject: string;
  body: string;
  scheduledFor: string;
  sendBefore?: number;
  status: 'scheduled' | 'sent' | 'delivered' | 'failed' | 'cancelled';
  sentAt?: string;
  deliveredAt?: string;
  twilioSid?: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageHistory {
  id: string;
  direction: 'outbound' | 'inbound';
  from: string;
  to: string;
  body: string;
  status: 'sent' | 'delivered' | 'failed' | 'received' | 'undelivered';
  twilioSid?: string;
  twilioStatus?: string;
  errorCode?: string;
  errorMessage?: string;
  numSegments: number;
  price?: string;
  priceUnit?: string;
  caseId?: string;
  contactId?: string;
  sentAt: string;
  deliveredAt?: string;
  createdAt: string;
}

export interface IncomingMessage {
  id: string;
  from: string;
  to: string;
  body: string;
  twilioSid: string;
  receivedAt: string;
  status: 'unread' | 'reviewing' | 'processed';
  autoTagged: boolean;
  tags: string[];
  linkedCaseId?: string;
  linkedContactId?: string;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  requiresResponse: boolean;
  responseMessage?: string;
  notes?: string;
  processedAt?: string;
  processedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  caseId: string;
  docketNumber: string;
  title: string;
  type: 'petition' | 'order' | 'report' | 'evaluation' | 'medical_record' | 'evidence' | 'correspondence' | 'other';
  fileName: string;
  fileSize: number;
  uploadedBy: string;
  uploadDate: string;
  tags: string[];
  confidential: boolean;
  hipaaProtected: boolean;
  ferpaProtected: boolean;
  expirationDate?: string;
  status: 'active' | 'archived' | 'expired';
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: 'create' | 'update' | 'delete' | 'view' | 'export' | 'send' | 'login' | 'logout';
  entityType: 'case' | 'contact' | 'participant' | 'message' | 'document' | 'user' | 'setting';
  entityId: string;
  changes?: {
    field: string;
    oldValue?: string;
    newValue?: string;
  }[];
  ipAddress?: string;
  userAgent?: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  description: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'supervisor' | 'caseworker' | 'clerk' | 'readonly';
  permissions: Permission[];
  active: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  module: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
}

export interface IntegrationConfig {
  id: string;
  type: 'dex' | 'cpcms' | 'access_db';
  name: string;
  enabled: boolean;
  endpoint?: string;
  apiKey?: string;
  username?: string;
  syncInterval: number;
  lastSync?: string;
  autoSync: boolean;
  syncCases: boolean;
  syncParticipants: boolean;
  syncDocuments: boolean;
  syncHearings: boolean;
  fieldMappings?: FieldMapping[];
  status: 'connected' | 'disconnected' | 'error';
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FieldMapping {
  sourceField: string;
  targetField: string;
  dataType: string;
  required: boolean;
  transformation?: string;
}

export interface TwilioConfig {
  id: string;
  accountSid?: string;
  authToken?: string;
  messagingServiceSid?: string;
  statusCallbackUrl?: string;
  maxRetries: number;
  retryDelay: number;
  enableDeliveryReports: boolean;
  enableErrorNotifications: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PhoneNumber {
  id: string;
  phoneNumber: string;
  friendlyName: string;
  type: 'local' | 'tollfree' | 'shortcode';
  capabilities: {
    sms: boolean;
    mms: boolean;
    voice: boolean;
  };
  active: boolean;
  isPrimary: boolean;
  assignedTo?: string;
  monthlyMessagesLimit?: number;
  createdAt: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  category: string;
  subject: string;
  body: string;
  variables: string[];
  language: string;
  active: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ComplianceSettings {
  hipaaEnabled: boolean;
  ferpaEnabled: boolean;
  encryptionEnabled: boolean;
  dataRetentionDays: number;
  autoDeleteExpired: boolean;
  auditLogRetentionDays: number;
  requireConsentForSms: boolean;
  privacyPolicyUrl?: string;
  termsOfServiceUrl?: string;
  updatedAt: string;
}

export interface DataRetentionPolicy {
  id: string;
  entityType: string;
  retentionPeriodDays: number;
  autoDelete: boolean;
  archiveBeforeDelete: boolean;
  exceptions: string[];
  lastExecuted?: string;
  nextExecution?: string;
  createdAt: string;
  updatedAt: string;
}
