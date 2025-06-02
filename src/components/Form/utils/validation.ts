import Ajv, { ErrorObject } from "ajv";
import { JSONSchema7 } from "json-schema";
import addFormats from "ajv-formats";

// AJV i18n support
const localize = {
  en: () => {}, // English is default, no localization needed
  'zh-HK': require('ajv-i18n/localize/zh-TW'), // Use zh-TW for Hong Kong Traditional Chinese
  'zh-TW': require('ajv-i18n/localize/zh-TW'), // Traditional Chinese (Taiwan)
  'zh-CN': require('ajv-i18n/localize/zh'), // Simplified Chinese
  'zh': require('ajv-i18n/localize/zh'), // Simplified Chinese (short form)
};

export type SupportedLocale = keyof typeof localize;

// Create AJV instance with format support
const createValidator = () => {
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    removeAdditional: false,
    strict: false,
    messages: false, // Disable default messages for i18n
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

export interface ValidationOptions {
  locale?: SupportedLocale;
}

/**
 * Validates data against a JSON Schema using AJV with i18n support
 * @param data - The data to validate
 * @param schema - The JSON Schema to validate against
 * @param options - Validation options including locale
 * @returns ValidationResult containing validation status and errors
 */
export const validateData = (
  data: unknown, 
  schema: JSONSchema7, 
  options: ValidationOptions = {}
): ValidationResult => {
  const { locale = 'en' } = options;
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

    // Apply localization if not English
    if (locale !== 'en' && validate.errors && localize[locale]) {
      try {
        localize[locale](validate.errors);
      } catch (error) {
        console.warn(`Failed to localize validation errors to ${locale}:`, error);
      }
    }
    
    const errors: ValidationError[] = (validate.errors || []).map((error: ErrorObject) => {
      const field = (error as any).instancePath?.replace(/^\//, '') || error.schemaPath?.split('/').pop() || 'root';
      
      let message = error.message || 'Validation error';
      
      // Enhanced error messages for better UX (only if using English or localization failed)
      if (locale === 'en' || !error.message) {
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
    const errorMessage = locale === 'zh-HK' || locale === 'zh-TW' 
      ? `架構驗證錯誤: ${error instanceof Error ? error.message : '未知錯誤'}`
      : locale === 'zh-CN' || locale === 'zh'
      ? `模式验证错误: ${error instanceof Error ? error.message : '未知错误'}`
      : `Schema validation error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      
    return {
      isValid: false,
      errors: [
        {
          field: 'schema',
          message: errorMessage,
        },
      ],
    };
  }
};

/**
 * Creates a reusable validator function for a specific schema with i18n support
 * @param schema - The JSON Schema to create validator for
 * @param locale - The locale to use for error messages
 * @returns A function that validates data against the schema
 */
export const createSchemaValidator = (schema: JSONSchema7, locale: SupportedLocale = 'en') => {
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

    // Apply localization if not English
    if (locale !== 'en' && validate.errors && localize[locale]) {
      try {
        localize[locale](validate.errors);
      } catch (error) {
        console.warn(`Failed to localize validation errors to ${locale}:`, error);
      }
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

/**
 * Get available locales for validation error messages
 * @returns Array of supported locale codes
 */
export const getSupportedLocales = (): SupportedLocale[] => {
  return Object.keys(localize) as SupportedLocale[];
};

/**
 * Check if a locale is supported
 * @param locale - The locale to check
 * @returns Boolean indicating if the locale is supported
 */
export const isLocaleSupported = (locale: string): locale is SupportedLocale => {
  return locale in localize;
}; 