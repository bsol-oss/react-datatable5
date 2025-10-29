/**
 * Type definitions for error message configuration
 */

/**
 * Common validation error types that can be customized
 */
export type ValidationErrorType =
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'minimum'
  | 'maximum'
  | 'multipleOf'
  | 'format'
  | 'type'
  | 'enum';

/**
 * Configuration for field-specific validation errors
 */
export type FieldErrorConfig = Partial<Record<ValidationErrorType, string>>;

/**
 * Configuration for building error messages
 */
export interface ErrorMessageConfig {
  /**
   * Required field error messages
   * Maps field names to their required error messages
   * Supports both plain strings and i18n translation keys
   *
   * @example
   * ```typescript
   * required: {
   *   username: "Username is required", // plain string
   *   email: "user.email.field_required" // i18n key
   * }
   * ```
   */
  required?: Record<string, string>;

  /**
   * Field-specific validation error messages
   * Maps field names to their validation error configurations
   *
   * @example
   * ```typescript
   * properties: {
   *   username: {
   *     minLength: "Username must be at least 3 characters",
   *     pattern: "Username can only contain letters and numbers"
   *   },
   *   age: {
   *     minimum: "Age must be at least 18",
   *     maximum: "Age cannot exceed 120"
   *   }
   * }
   * ```
   */
  properties?: Record<string, FieldErrorConfig>;

  /**
   * Global fallback error messages for validation types
   * These are used when no field-specific message is provided
   *
   * @example
   * ```typescript
   * {
   *   minLength: "This field is too short",
   *   minimum: "Value is too small"
   * }
   * ```
   */
  [key: string]: any;
}

/**
 * Result of buildErrorMessages that follows ajv-errors format
 */
export interface ErrorMessageResult {
  required?: Record<string, string>;
  properties?: Record<string, FieldErrorConfig>;
  [key: string]: any;
}

/**
 * Schema-level error message builder
 *
 * Builds a complete errorMessage object compatible with ajv-errors plugin.
 * Supports both i18n translation keys and plain string messages.
 *
 * @param config - Error message configuration
 * @returns Complete errorMessage object for JSON Schema
 *
 * @example
 * ```typescript
 * // Simple required field errors
 * const errorMessage = buildErrorMessages({
 *   required: {
 *     username: "Username is required",
 *     email: "user.email.field_required" // i18n key
 *   }
 * });
 *
 * // With validation rules
 * const errorMessage = buildErrorMessages({
 *   required: {
 *     password: "Password is required"
 *   },
 *   properties: {
 *     password: {
 *       minLength: "Password must be at least 8 characters",
 *       pattern: "Password must contain letters and numbers"
 *     },
 *     age: {
 *       minimum: "Must be 18 or older",
 *       maximum: "Must be under 120"
 *     }
 *   }
 * });
 *
 * // With global fallbacks
 * const errorMessage = buildErrorMessages({
 *   required: {
 *     email: "Email is required"
 *   },
 *   minLength: "This field is too short", // applies to all fields
 *   minimum: "Value is too small"
 * });
 * ```
 */
export const buildErrorMessages = (
  config: ErrorMessageConfig
): ErrorMessageResult => {
  const result: ErrorMessageResult = {};

  // Add required field errors
  if (config.required && Object.keys(config.required).length > 0) {
    result.required = config.required;
  }

  // Add field-specific validation errors
  if (config.properties && Object.keys(config.properties).length > 0) {
    result.properties = config.properties;
  }

  // Add global fallback error messages
  const globalKeys: ValidationErrorType[] = [
    'minLength',
    'maxLength',
    'pattern',
    'minimum',
    'maximum',
    'multipleOf',
    'format',
    'type',
    'enum',
  ];

  globalKeys.forEach((key) => {
    if (config[key]) {
      result[key] = config[key];
    }
  });

  return result;
};

/**
 * Converts buildErrorMessages result to ajv-errors compatible format
 */
export const convertToAjvErrorsFormat = (
  errorMessages: ErrorMessageResult
): Record<string, any> => {
  const result: Record<string, any> = {};

  // Convert required field errors
  if (errorMessages.required) {
    result.required = errorMessages.required;
  }

  // Convert properties errors to ajv-errors format
  if (errorMessages.properties) {
    result.properties = {};
    Object.keys(errorMessages.properties).forEach((fieldName) => {
      const fieldErrors = errorMessages.properties![fieldName];
      result.properties[fieldName] = {};

      Object.keys(fieldErrors).forEach((keyword) => {
        result.properties[fieldName][keyword] =
          fieldErrors[keyword as keyof typeof fieldErrors];
      });
    });
  }

  // Add global fallback errors
  const globalKeys: ValidationErrorType[] = [
    'minLength',
    'maxLength',
    'pattern',
    'minimum',
    'maximum',
    'multipleOf',
    'format',
    'type',
    'enum',
  ];

  globalKeys.forEach((key) => {
    if (errorMessages[key]) {
      result[key] = errorMessages[key];
    }
  });

  return result;
};

/**
 * Helper function to build required field errors
 *
 * Simplifies creating required field error messages, especially useful
 * for generating i18n translation keys following a pattern.
 *
 * @param fields - Array of required field names
 * @param messageOrGenerator - Either a string template or function to generate messages
 * @returns Required field error configuration
 *
 * @example
 * ```typescript
 * // Plain string messages
 * const required = buildRequiredErrors(
 *   ["username", "email", "password"],
 *   (field) => `${field} is required`
 * );
 * // Result: { username: "username is required", email: "email is required", ... }
 *
 * // i18n translation keys
 * const required = buildRequiredErrors(
 *   ["username", "email"],
 *   (field) => `user.${field}.field_required`
 * );
 * // Result: { username: "user.username.field_required", email: "user.email.field_required" }
 *
 * // Same message for all fields
 * const required = buildRequiredErrors(
 *   ["username", "email"],
 *   "This field is required"
 * );
 * // Result: { username: "This field is required", email: "This field is required" }
 *
 * // With keyPrefix for i18n
 * const required = buildRequiredErrors(
 *   ["username", "email"],
 *   (field) => `${field}.field_required`,
 *   "user"
 * );
 * // Result: { username: "user.username.field_required", email: "user.email.field_required" }
 * ```
 */
export const buildRequiredErrors = (
  fields: string[],
  messageOrGenerator: string | ((field: string) => string),
  keyPrefix: string = ''
): Record<string, string> => {
  const result: Record<string, string> = {};

  fields.forEach((field) => {
    if (typeof messageOrGenerator === 'function') {
      const message = messageOrGenerator(field);
      result[field] = keyPrefix ? `${keyPrefix}.${message}` : message;
    } else {
      result[field] = messageOrGenerator;
    }
  });

  return result;
};

/**
 * Helper function to build field-specific validation errors
 *
 * Creates property-specific error messages for multiple fields at once.
 *
 * @param config - Maps field names to their validation error configurations
 * @returns Properties error configuration
 *
 * @example
 * ```typescript
 * const properties = buildFieldErrors({
 *   username: {
 *     minLength: "Username must be at least 3 characters",
 *     pattern: "Username can only contain letters and numbers"
 *   },
 *   age: {
 *     minimum: "Must be 18 or older",
 *     maximum: "Must be under 120"
 *   },
 *   email: {
 *     format: "Please enter a valid email address"
 *   }
 * });
 * ```
 */
export const buildFieldErrors = (
  config: Record<string, FieldErrorConfig>
): Record<string, FieldErrorConfig> => {
  return config;
};

/**
 * Helper function to create a complete error message configuration in one call
 *
 * Convenient wrapper that combines required and validation errors.
 *
 * @param required - Required field error messages
 * @param properties - Field-specific validation error messages
 * @param globalFallbacks - Global fallback error messages
 * @returns Complete error message configuration
 *
 * @example
 * ```typescript
 * const errorMessage = createErrorMessage(
 *   {
 *     username: "Username is required",
 *     email: "Email is required"
 *   },
 *   {
 *     username: {
 *       minLength: "Username must be at least 3 characters"
 *     },
 *     email: {
 *       format: "Please enter a valid email"
 *     }
 *   },
 *   {
 *     minLength: "This field is too short",
 *     format: "Invalid format"
 *   }
 * );
 * ```
 */
export const createErrorMessage = (
  required?: Record<string, string>,
  properties?: Record<string, FieldErrorConfig>,
  globalFallbacks?: Partial<Record<ValidationErrorType, string>>
): ErrorMessageResult => {
  return buildErrorMessages({
    required,
    properties,
    ...globalFallbacks,
  });
};
