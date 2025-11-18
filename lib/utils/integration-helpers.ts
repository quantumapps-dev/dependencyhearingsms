import type { IntegrationConfig, FieldMapping } from '@/lib/types';

export const mapFields = (
  sourceData: Record<string, any>,
  fieldMappings: FieldMapping[]
): Record<string, any> => {
  const mappedData: Record<string, any> = {};
  
  fieldMappings.forEach((mapping) => {
    const sourceValue = sourceData[mapping.sourceField];
    if (sourceValue !== undefined) {
      mappedData[mapping.targetField] = applyTransformation(
        sourceValue,
        mapping.transformation
      );
    }
  });
  
  return mappedData;
};

const applyTransformation = (value: any, transformation?: string): any => {
  if (!transformation) return value;
  
  switch (transformation) {
    case 'uppercase':
      return String(value).toUpperCase();
    case 'lowercase':
      return String(value).toLowerCase();
    case 'trim':
      return String(value).trim();
    case 'date':
      return new Date(value).toISOString();
    case 'number':
      return Number(value);
    case 'boolean':
      return Boolean(value);
    default:
      return value;
  }
};

export const validateIntegrationConnection = async (
  config: IntegrationConfig
): Promise<{ success: boolean; message: string }> => {
  // Simulate connection validation
  return new Promise((resolve) => {
    setTimeout(() => {
      if (config.endpoint && config.apiKey) {
        resolve({ success: true, message: 'Connection successful' });
      } else {
        resolve({ success: false, message: 'Missing credentials' });
      }
    }, 1000);
  });
};

export const performDataSync = async (
  config: IntegrationConfig
): Promise<{ success: boolean; recordsSynced: number; errors: string[] }> => {
  // Simulate data sync
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        recordsSynced: Math.floor(Math.random() * 100) + 10,
        errors: [],
      });
    }, 2000);
  });
};
