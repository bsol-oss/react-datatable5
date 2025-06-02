import Ajv, { ErrorObject } from "ajv";
import { JSONSchema7 } from "json-schema";
import addFormats from "ajv-formats";

// Create AJV instance with format support
const createValidator = () => {
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    removeAdditional: false,
    strict: false,
  });
  
  // Add format validation support (date, time, email, etc.)
  addFormats(ajv);
  
  return ajv;
};

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
  schemaPath?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validates data against a JSON Schema using AJV
 * @param data - The data to validate
 * @param schema - The JSON Schema to validate against
 * @returns ValidationResult containing validation status and errors
 */
export const validateData = (data: unknown, schema: JSONSchema7): ValidationResult => {
  const ajv = createValidator();
  
  try {
    const validate = ajv.compile(schema);
    const isValid = validate(data);
    
    if (isValid) {
      return {
        isValid: true,
        errors: [],
      };
    }
    
    const errors: ValidationError[] = (validate.errors || []).map((error: ErrorObject) => {
      const field = (error as any).instancePath?.replace(/^\//, '') || error.schemaPath?.split('/').pop() || 'root';
      
      let message = error.message || 'Validation error';
      
      // Enhance error messages for better UX
      switch (error.keyword) {
        case 'required':
          message = `${(error.params as any)?.missingProperty || 'Field'} is required`;
          break;
        case 'format':
          message = `Invalid ${(error.params as any)?.format} format`;
          break;
        case 'type':
          message = `Expected ${(error.params as any)?.type}, got ${typeof error.data}`;
          break;
        case 'minLength':
          message = `Must be at least ${(error.params as any)?.limit} characters`;
          break;
        case 'maxLength':
          message = `Must be no more than ${(error.params as any)?.limit} characters`;
          break;
        case 'minimum':
          message = `Must be at least ${(error.params as any)?.limit}`;
          break;
        case 'maximum':
          message = `Must be no more than ${(error.params as any)?.limit}`;
          break;
        case 'pattern':
          message = `Does not match required pattern`;
          break;
        case 'enum':
          message = `Must be one of: ${(error.params as any)?.allowedValues?.join(', ')}`;
          break;
        default:
          message = error.message || 'Validation error';
      }
      
      return {
        field: field || (error as any).instancePath || 'unknown',
        message,
        value: error.data,
        schemaPath: error.schemaPath,
      };
    });
    
    return {
      isValid: false,
      errors,
    };
  } catch (error) {
    // Handle AJV compilation errors
    return {
      isValid: false,
      errors: [
        {
          field: 'schema',
          message: `Schema validation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
    };
  }
};

/**
 * Creates a reusable validator function for a specific schema
 * @param schema - The JSON Schema to create validator for
 * @returns A function that validates data against the schema
 */
export const createSchemaValidator = (schema: JSONSchema7) => {
  const ajv = createValidator();
  const validate = ajv.compile(schema);
  
  return (data: unknown): ValidationResult => {
    const isValid = validate(data);
    
    if (isValid) {
      return {
        isValid: true,
        errors: [],
      };
    }
    
    const errors: ValidationError[] = (validate.errors || []).map((error: ErrorObject) => {
      const field = (error as any).instancePath?.replace(/^\//, '') || 'root';
      return {
        field,
        message: error.message || 'Validation error',
        value: error.data,
        schemaPath: error.schemaPath,
      };
    });
    
    return {
      isValid: false,
      errors,
    };
  };
}; 