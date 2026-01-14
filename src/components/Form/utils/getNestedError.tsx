import { FieldErrors } from 'react-hook-form';

/**
 * Get nested error message from react-hook-form errors object.
 * For nested fields like 'address.street', errors are stored as
 * errors.address.street, not errors['address.street'].
 * This utility traverses the nested structure to find the error.
 *
 * @param errors - The errors object from react-hook-form
 * @param path - The field path (e.g., 'address.street' or 'contact.info.email')
 * @returns The error message string or undefined if no error
 */
export const getNestedError = (
  errors: FieldErrors,
  path: string
): string | undefined => {
  if (!errors || !path) return undefined;

  const parts = path.split('.');
  let current: any = errors;

  for (const part of parts) {
    if (current === undefined || current === null) {
      return undefined;
    }
    current = current[part];
  }

  // Return the message if it exists
  return current?.message as string | undefined;
};
