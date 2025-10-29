import { FieldValues, Resolver } from 'react-hook-form';
import { ErrorObject } from 'ajv';
import { validateData } from './validateData';
import { JSONSchema7 } from 'json-schema';

/**
 * Converts AJV error objects to react-hook-form field errors format
 */
export const convertAjvErrorsToFieldErrors = (
  errors:
    | ErrorObject<string, Record<string, unknown>, unknown>[]
    | null
    | undefined
): Record<string, { type: string; message: string }> => {
  if (!errors || errors.length === 0) {
    return {};
  }

  const fieldErrors: Record<string, { type: string; message: string }> = {};

  errors.forEach((error) => {
    let fieldName = '';

    // Special handling for required keyword: map to the specific missing property
    if (error.keyword === 'required') {
      const basePath = (error.instancePath || '')
        .replace(/^\//, '')
        .replace(/\//g, '.');
      // @ts-expect-error ajv params typing
      const missingProperty = (error.params &&
        (error.params as any).missingProperty) as string | undefined;
      if (missingProperty) {
        fieldName = basePath
          ? `${basePath}.${missingProperty}`
          : missingProperty;
      } else {
        // Fallback to schemaPath conversion if missingProperty is unavailable
        fieldName = (error.schemaPath || '')
          .replace(/^#\//, '#.')
          .replace(/\//g, '.');
      }
    } else {
      const fieldPath = error.instancePath || error.schemaPath;
      if (fieldPath) {
        fieldName = fieldPath.replace(/^\//, '').replace(/\//g, '.');
      }
    }

    if (fieldName) {
      const errorMessage = error.message || 'Validation error';

      if (error.keyword === 'required') {
        // Required errors override any existing non-required errors for this field
        fieldErrors[fieldName] = {
          type: 'required',
          message: errorMessage,
        };
      } else {
        const existing = fieldErrors[fieldName];
        if (existing) {
          // Do not override required errors
          if (existing.type === 'required') {
            return;
          }
          existing.message = `${existing.message}; ${errorMessage}`;
        } else {
          fieldErrors[fieldName] = {
            type: error.keyword,
            message: errorMessage,
          };
        }
      }
    }
  });

  return fieldErrors;
};

/**
 * AJV resolver for react-hook-form
 * Integrates AJV validation with react-hook-form's validation system
 */
export const ajvResolver = <T extends FieldValues>(
  schema: JSONSchema7
): Resolver<T> => {
  return async (values) => {
    try {
      const { isValid, errors } = validateData(values, schema);

      console.log('AJV Validation Result:', { isValid, errors });

      if (isValid) {
        return {
          values,
          errors: {},
        };
      }

      const fieldErrors = convertAjvErrorsToFieldErrors(errors);
      console.log('AJV Validation Failed:', { errors, fieldErrors });

      return {
        values: {} as T,
        errors: fieldErrors as Record<string, unknown>,
      };
    } catch (error) {
      return {
        values: {} as T,
        errors: {
          root: {
            type: 'validation',
            message:
              error instanceof Error ? error.message : 'Validation failed',
          },
        } as Record<string, unknown>,
      };
    }
  };
};
