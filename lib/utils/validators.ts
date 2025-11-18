// Validation utilities

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?1?\d{10,15}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidDocketNumber = (docketNumber: string): boolean => {
  // Basic validation - can be customized based on court system
  return docketNumber.length >= 4 && /^[A-Z0-9-]+$/i.test(docketNumber);
};

export const isValidZipCode = (zip: string): boolean => {
  return /^\d{5}(-\d{4})?$/.test(zip);
};

export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const isFutureDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date > new Date();
};

export const isPastDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date < new Date();
};
