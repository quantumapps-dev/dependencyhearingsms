import type {
  Case,
  Contact,
  Participant,
  Message,
  MessageHistory,
  IncomingMessage,
  Document,
  AuditLog,
  User,
  IntegrationConfig,
  TwilioConfig,
  PhoneNumber,
  MessageTemplate,
  ComplianceSettings,
  DataRetentionPolicy,
} from '@/lib/types';

// Generic storage operations
export const storage = {
  get: <T>(key: string): T[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  set: <T>(key: string, value: T[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  },

  add: <T extends { id: string }>(key: string, item: T): T => {
    const items = storage.get<T>(key);
    items.push(item);
    storage.set(key, items);
    return item;
  },

  update: <T extends { id: string }>(key: string, id: string, updates: Partial<T>): T | null => {
    const items = storage.get<T>(key);
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
    storage.set(key, items);
    return items[index];
  },

  delete: (key: string, id: string): boolean => {
    const items = storage.get(key);
    const filtered = items.filter((item: any) => item.id !== id);
    if (filtered.length === items.length) return false;
    storage.set(key, filtered);
    return true;
  },

  getById: <T extends { id: string }>(key: string, id: string): T | null => {
    const items = storage.get<T>(key);
    return items.find((item) => item.id === id) || null;
  },

  clear: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
};

// Storage keys
export const STORAGE_KEYS = {
  CASES: 'dh_cases',
  CONTACTS: 'dh_contacts',
  PARTICIPANTS: 'dh_participants',
  MESSAGES: 'dh_messages',
  MESSAGE_HISTORY: 'dh_message_history',
  INCOMING_MESSAGES: 'dh_incoming_messages',
  DOCUMENTS: 'dh_documents',
  AUDIT_LOGS: 'dh_audit_logs',
  USERS: 'dh_users',
  INTEGRATIONS: 'dh_integrations',
  TWILIO_CONFIG: 'dh_twilio_config',
  PHONE_NUMBERS: 'dh_phone_numbers',
  MESSAGE_TEMPLATES: 'dh_message_templates',
  COMPLIANCE_SETTINGS: 'dh_compliance_settings',
  DATA_RETENTION_POLICIES: 'dh_data_retention_policies',
} as const;

// Specific storage operations for each entity
export const caseStorage = {
  getAll: () => storage.get<Case>(STORAGE_KEYS.CASES),
  add: (item: Omit<Case, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCase: Case = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return storage.add(STORAGE_KEYS.CASES, newCase);
  },
  update: (id: string, updates: Partial<Case>) =>
    storage.update<Case>(STORAGE_KEYS.CASES, id, updates),
  delete: (id: string) => storage.delete(STORAGE_KEYS.CASES, id),
  getById: (id: string) => storage.getById<Case>(STORAGE_KEYS.CASES, id),
};

export const contactStorage = {
  getAll: () => storage.get<Contact>(STORAGE_KEYS.CONTACTS),
  add: (item: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newContact: Contact = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return storage.add(STORAGE_KEYS.CONTACTS, newContact);
  },
  update: (id: string, updates: Partial<Contact>) =>
    storage.update<Contact>(STORAGE_KEYS.CONTACTS, id, updates),
  delete: (id: string) => storage.delete(STORAGE_KEYS.CONTACTS, id),
  getById: (id: string) => storage.getById<Contact>(STORAGE_KEYS.CONTACTS, id),
};

export const participantStorage = {
  getAll: () => storage.get<Participant>(STORAGE_KEYS.PARTICIPANTS),
  add: (item: Omit<Participant, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newParticipant: Participant = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return storage.add(STORAGE_KEYS.PARTICIPANTS, newParticipant);
  },
  update: (id: string, updates: Partial<Participant>) =>
    storage.update<Participant>(STORAGE_KEYS.PARTICIPANTS, id, updates),
  delete: (id: string) => storage.delete(STORAGE_KEYS.PARTICIPANTS, id),
  getById: (id: string) => storage.getById<Participant>(STORAGE_KEYS.PARTICIPANTS, id),
};

export const messageStorage = {
  getAll: () => storage.get<Message>(STORAGE_KEYS.MESSAGES),
  add: (item: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newMessage: Message = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return storage.add(STORAGE_KEYS.MESSAGES, newMessage);
  },
  update: (id: string, updates: Partial<Message>) =>
    storage.update<Message>(STORAGE_KEYS.MESSAGES, id, updates),
  delete: (id: string) => storage.delete(STORAGE_KEYS.MESSAGES, id),
  getById: (id: string) => storage.getById<Message>(STORAGE_KEYS.MESSAGES, id),
};

export const messageHistoryStorage = {
  getAll: () => storage.get<MessageHistory>(STORAGE_KEYS.MESSAGE_HISTORY),
  add: (item: Omit<MessageHistory, 'id' | 'createdAt'>) => {
    const newHistory: MessageHistory = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    return storage.add(STORAGE_KEYS.MESSAGE_HISTORY, newHistory);
  },
  getById: (id: string) => storage.getById<MessageHistory>(STORAGE_KEYS.MESSAGE_HISTORY, id),
};

export const incomingMessageStorage = {
  getAll: () => storage.get<IncomingMessage>(STORAGE_KEYS.INCOMING_MESSAGES),
  add: (item: Omit<IncomingMessage, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newMessage: IncomingMessage = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return storage.add(STORAGE_KEYS.INCOMING_MESSAGES, newMessage);
  },
  update: (id: string, updates: Partial<IncomingMessage>) =>
    storage.update<IncomingMessage>(STORAGE_KEYS.INCOMING_MESSAGES, id, updates),
  delete: (id: string) => storage.delete(STORAGE_KEYS.INCOMING_MESSAGES, id),
  getById: (id: string) => storage.getById<IncomingMessage>(STORAGE_KEYS.INCOMING_MESSAGES, id),
};

export const documentStorage = {
  getAll: () => storage.get<Document>(STORAGE_KEYS.DOCUMENTS),
  add: (item: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDocument: Document = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return storage.add(STORAGE_KEYS.DOCUMENTS, newDocument);
  },
  update: (id: string, updates: Partial<Document>) =>
    storage.update<Document>(STORAGE_KEYS.DOCUMENTS, id, updates),
  delete: (id: string) => storage.delete(STORAGE_KEYS.DOCUMENTS, id),
  getById: (id: string) => storage.getById<Document>(STORAGE_KEYS.DOCUMENTS, id),
};

export const auditLogStorage = {
  getAll: () => storage.get<AuditLog>(STORAGE_KEYS.AUDIT_LOGS),
  add: (item: Omit<AuditLog, 'id'>) => {
    const newLog: AuditLog = {
      ...item,
      id: crypto.randomUUID(),
    };
    return storage.add(STORAGE_KEYS.AUDIT_LOGS, newLog);
  },
  getById: (id: string) => storage.getById<AuditLog>(STORAGE_KEYS.AUDIT_LOGS, id),
};
