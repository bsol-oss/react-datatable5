import { FieldErrors } from 'react-hook-form';
/**
 * Gets the error message for a specific field from react-hook-form errors
 * Prioritizes required errors (#.required) over field-specific validation errors
 */
export declare const getFieldError: (errors: FieldErrors, fieldName: string) => string | undefined;
