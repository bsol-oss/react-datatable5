import { FieldValues, Resolver } from 'react-hook-form';
import { ErrorObject } from 'ajv';
import { validateData } from './validateData';
import { CustomJSONSchema7 } from '../components/types/CustomJSONSchema7';

/**
 * Gets the schema node for a field by following the path from root schema
 */
const getSchemaNodeForField = (
  schema: CustomJSONSchema7,
  fieldPath: string
): CustomJSONSchema7 | undefined => {
  if (!fieldPath || fieldPath === '') {
    return schema;
  }

  const pathParts = fieldPath.split('.');
  let currentSchema: CustomJSONSchema7 | undefined = schema;

  for (const part of pathParts) {
    if (
      currentSchema &&
      currentSchema.properties &&
      currentSchema.properties[part] &&
      typeof currentSchema.properties[part] === 'object' &&
      currentSchema.properties[part] !== null
    ) {
      currentSchema = currentSchema.properties[part] as CustomJSONSchema7;
    } else {
      return undefined;
    }
  }

  return currentSchema;
};

/**
 * Converts AJV error objects to react-hook-form field errors format
 */
export const convertAjvErrorsToFieldErrors = (
  errors:
    | ErrorObject<string, Record<string, unknown>, unknown>[]
    | null
    | undefined,
  schema: CustomJSONSchema7
): Record<
  string,
  {
    type: string;
    keyword: string;
    params?: Record<string, unknown>;
    message?: string;
  }
> => {
  if (!errors || errors.length === 0) {
    return {};
  }

  const fieldErrors: Record<
    string,
    {
      type: string;
      keyword: string;
      params?: Record<string, unknown>;
      message?: string;
    }
  > = {};

  errors.forEach((error) => {
    let fieldName = '';

    // Special handling for required keyword: map to the specific missing property
    if (error.keyword === 'required') {
      const basePath = (error.instancePath || '')
        .replace(/^\//, '')
        .replace(/\//g, '.');
      const missingProperty = (error.params &&
        (error.params as Record<string, unknown>).missingProperty) as
        | string
        | undefined;
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
      // Get the schema node for this field to check for custom error messages
      const fieldSchema = getSchemaNodeForField(schema, fieldName);
      const customMessage = fieldSchema?.errorMessages?.[error.keyword];

      // Debug log when error message is missing
      if (!customMessage) {
        console.debug(
          `[Form Validation] Missing error message for field '${fieldName}' with keyword '${error.keyword}'. Add errorMessages.${error.keyword} to schema for field '${fieldName}'`,
          {
            fieldName,
            keyword: error.keyword,
            instancePath: error.instancePath,
            schemaPath: error.schemaPath,
            params: error.params,
            fieldSchema: fieldSchema
              ? {
                  type: fieldSchema.type,
                  errorMessages: fieldSchema.errorMessages,
                }
              : undefined,
          }
        );
      }

      // Provide helpful fallback message if no custom message is provided
      const fallbackMessage =
        customMessage ||
        `Missing error message for ${error.keyword}. Add errorMessages.${error.keyword} to schema for field '${fieldName}'`;

      if (error.keyword === 'required') {
        // Required errors override any existing non-required errors for this field
        fieldErrors[fieldName] = {
          type: 'required',
          keyword: error.keyword,
          params: error.params,
          message: fallbackMessage,
        };
      } else {
        const existing = fieldErrors[fieldName];
        if (existing) {
          // Do not override required errors
          if (existing.type === 'required') {
            return;
          }
          // Combine messages if multiple errors for same field
          existing.message = existing.message
            ? `${existing.message}; ${fallbackMessage}`
            : fallbackMessage;
        } else {
          fieldErrors[fieldName] = {
            type: error.keyword,
            keyword: error.keyword,
            params: error.params,
            message: fallbackMessage,
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
/**
 * Strips null, undefined, and empty string values from an object
 */
const stripEmptyValues = (obj: unknown): unknown => {
  if (obj === null || obj === undefined) {
    return undefined;
  }

  if (typeof obj === 'string' && obj.trim() === '') {
    return undefined;
  }

  if (Array.isArray(obj)) {
    const filtered = obj
      .map(stripEmptyValues)
      .filter((item) => item !== undefined);
    return filtered.length > 0 ? filtered : undefined;
  }

  if (typeof obj === 'object' && obj !== null) {
    const result: Record<string, unknown> = {};
    let hasValues = false;

    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = stripEmptyValues(value);
      if (cleanedValue !== undefined) {
        result[key] = cleanedValue;
        hasValues = true;
      }
    }

    return hasValues ? result : undefined;
  }

  return obj;
};

export const ajvResolver = <T extends FieldValues>(
  schema: CustomJSONSchema7
): Resolver<T> => {
  return async (values) => {
    try {
      // Strip empty values before validation
      const cleanedValues = stripEmptyValues(values);

      // Use empty object for validation if all values were stripped
      const valuesToValidate = cleanedValues === undefined ? {} : cleanedValues;

      const { isValid, errors } = validateData(valuesToValidate, schema);

      console.debug('AJV Validation Result:', {
        isValid,
        errors,
        cleanedValues,
        valuesToValidate,
      });

      if (isValid) {
        return {
          values: (cleanedValues || {}) as T,
          errors: {},
        };
      }

      const fieldErrors = convertAjvErrorsToFieldErrors(errors, schema);
      console.debug('AJV Validation Failed:', {
        errors,
        fieldErrors,
        cleanedValues,
        valuesToValidate,
      });

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
