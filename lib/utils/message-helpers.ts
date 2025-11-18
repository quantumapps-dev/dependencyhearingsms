import type { Message, Contact, Case } from '@/lib/types';

export const generateMessageBody = (
  template: string,
  variables: Record<string, string>
): string => {
  let message = template;
  Object.entries(variables).forEach(([key, value]) => {
    message = message.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
  });
  return message;
};

export const extractVariablesFromTemplate = (template: string): string[] => {
  const regex = /\{\{(\w+)\}\}/g;
  const variables: string[] = [];
  let match;
  while ((match = regex.exec(template)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1]);
    }
  }
  return variables;
};

export const calculateMessageSegments = (message: string): number => {
  // SMS segments: 160 chars for GSM-7, 70 for UCS-2 (unicode)
  const hasUnicode = /[^\x00-\x7F]/.test(message);
  const maxLength = hasUnicode ? 70 : 160;
  return Math.ceil(message.length / maxLength);
};

export const validateMessageLength = (message: string, maxSegments = 10): boolean => {
  return calculateMessageSegments(message) <= maxSegments;
};

export const shouldSendReminder = (scheduledFor: string, sendBefore?: number): boolean => {
  if (!sendBefore) return false;
  
  const scheduledDate = new Date(scheduledFor);
  const sendTime = new Date(scheduledDate.getTime() - sendBefore * 60 * 60 * 1000);
  const now = new Date();
  
  return now >= sendTime && now < scheduledDate;
};

export const getMessagePriority = (messageType: Message['messageType']): 'low' | 'medium' | 'high' | 'urgent' => {
  const priorities: Record<Message['messageType'], 'low' | 'medium' | 'high' | 'urgent'> = {
    emergency: 'urgent',
    hearing_reminder: 'high',
    document_request: 'medium',
    case_update: 'medium',
    general: 'low',
  };
  return priorities[messageType];
};
