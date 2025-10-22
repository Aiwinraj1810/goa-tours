// 📁 /lib/form-validations.ts

// ✅ Utility to check for blank or only spaces
export const isNotBlank = (value: string) => {
  if (!value || value.trim().length === 0) return "This field cannot be empty or blank";
  return true;
};

// ✅ Validate name: only alphabets and spaces
export const isValidName = (value: string) => {
  if (!/^[a-zA-Z\s]+$/.test(value.trim()))
    return "Only alphabets and spaces are allowed";
  return true;
};

// ✅ Validate Indian phone number
export const isValidIndianPhone = (value: string) => {
  if (!/^[6-9]\d{9}$/.test(value.trim()))
    return "Enter a valid 10-digit Indian phone number";
  return true;
};

// ✅ Validate email format
export const isValidEmail = (value: string) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
    return "Enter a valid email address";
  return true;
};

// ✅ Validate message content (optional field)
export const isSafeMessage = (value?: string) => {
  if (!value || value.trim().length === 0) return true; // Empty allowed
  if (!/^[a-zA-Z0-9\s.,!?'"()-]*$/.test(value.trim()))
    return "Avoid using special characters like $, %, <, > etc.";
  return true;
};


// ✅ Validate number of people
export const isPositiveNumber = (value: number) => {
  if (value < 1) return "Must be at least 1";
  return true;
};

// ✅ Cross-field: endDate must be after startDate
export const isAfterDate = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return true;
  if (new Date(endDate) < new Date(startDate))
    return "End date must be after start date";
  return true;
};
