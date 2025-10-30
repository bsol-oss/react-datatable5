import { FieldErrors } from 'react-hook-form';

/**
 * Gets the error message for a specific field from react-hook-form errors
 * Prioritizes required errors (#.required) over field-specific validation errors
 */
export const getFieldError = (
  errors: FieldErrors,
  fieldName: string
): string | undefined => {
  // Check for form-level required errors first (highest priority)
  const requiredError = errors['#.required'];
  if (requiredError) {
    const requiredErrorMessage = extractErrorMessage(requiredError);
    if (requiredErrorMessage) {
      return requiredErrorMessage;
    }
  }

  // If no required errors, return field-specific error
  const fieldError = errors[fieldName];
  if (fieldError) {
    const fieldErrorMessage = extractErrorMessage(fieldError);
    if (fieldErrorMessage) {
      return fieldErrorMessage;
    }
  }

  return undefined;
};

/**
 * Helper function to extract error message from various error formats
 * Only returns message if explicitly provided, no fallback text
 */
const extractErrorMessage = (error: unknown): string | undefined => {
  if (!error) {
    return undefined;
  }

  // If it's a simple string error
  if (typeof error === 'string') {
    return error;
  }

  // If it's an error object with a message property
  if (error && typeof error === 'object' && 'message' in error) {
    return error.message as string;
  }

  // If it's an array of errors, get the first one
  if (Array.isArray(error) && error.length > 0) {
    const firstError = error[0];
    if (typeof firstError === 'string') {
      return firstError;
    }
    if (
      firstError &&
      typeof firstError === 'object' &&
      'message' in firstError
    ) {
      return firstError.message as string;
    }
  }

  // No fallback - return undefined if no message provided
  return undefined;
};
