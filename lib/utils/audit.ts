import { auditLogStorage } from './storage';
import type { AuditLog } from '@/lib/types';

export const logAudit = (
  action: AuditLog['action'],
  entityType: AuditLog['entityType'],
  entityId: string,
  description: string,
  changes?: AuditLog['changes'],
  severity: AuditLog['severity'] = 'info'
) => {
  const log: Omit<AuditLog, 'id'> = {
    timestamp: new Date().toISOString(),
    userId: 'current-user-id', // This would come from auth context
    userName: 'Current User', // This would come from auth context
    action,
    entityType,
    entityId,
    changes,
    severity,
    description,
  };

  return auditLogStorage.add(log);
};

export const logCaseAction = (action: AuditLog['action'], caseId: string, description: string, changes?: AuditLog['changes']) => {
  return logAudit(action, 'case', caseId, description, changes);
};

export const logContactAction = (action: AuditLog['action'], contactId: string, description: string, changes?: AuditLog['changes']) => {
  return logAudit(action, 'contact', contactId, description, changes);
};

export const logMessageAction = (action: AuditLog['action'], messageId: string, description: string, changes?: AuditLog['changes']) => {
  return logAudit(action, 'message', messageId, description, changes);
};

export const logDocumentAction = (action: AuditLog['action'], documentId: string, description: string, changes?: AuditLog['changes']) => {
  return logAudit(action, 'document', documentId, description, changes);
};
