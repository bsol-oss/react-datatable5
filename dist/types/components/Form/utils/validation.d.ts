import { JSONSchema7 } from "json-schema";
declare const errorMessages: {
    en: {
        required: (field: string) => string;
        format: (format: string) => string;
        type: (expectedType: string, actualType: string) => string;
        minLength: (limit: number) => string;
        maxLength: (limit: number) => string;
        minimum: (limit: number) => string;
        maximum: (limit: number) => string;
        pattern: () => string;
        enum: (allowedValues: string[]) => string;
        default: () => string;
    };
    'zh-HK': {
        required: (field: string) => string;
        format: (format: string) => string;
        type: (expectedType: string, actualType: string) => string;
        minLength: (limit: number) => string;
        maxLength: (limit: number) => string;
        minimum: (limit: number) => string;
        maximum: (limit: number) => string;
        pattern: () => string;
        enum: (allowedValues: string[]) => string;
        default: () => string;
    };
    'zh-TW': {
        required: (field: string) => string;
        format: (format: string) => string;
        type: (expectedType: string, actualType: string) => string;
        minLength: (limit: number) => string;
        maxLength: (limit: number) => string;
        minimum: (limit: number) => string;
        maximum: (limit: number) => string;
        pattern: () => string;
        enum: (allowedValues: string[]) => string;
        default: () => string;
    };
    'zh-CN': {
        required: (field: string) => string;
        format: (format: string) => string;
        type: (expectedType: string, actualType: string) => string;
        minLength: (limit: number) => string;
        maxLength: (limit: number) => string;
        minimum: (limit: number) => string;
        maximum: (limit: number) => string;
        pattern: () => string;
        enum: (allowedValues: string[]) => string;
        default: () => string;
    };
    zh: {
        required: (field: string) => string;
        format: (format: string) => string;
        type: (expectedType: string, actualType: string) => string;
        minLength: (limit: number) => string;
        maxLength: (limit: number) => string;
        minimum: (limit: number) => string;
        maximum: (limit: number) => string;
        pattern: () => string;
        enum: (allowedValues: string[]) => string;
        default: () => string;
    };
};
export type SupportedLocale = keyof typeof errorMessages;
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
export declare const validateData: (data: unknown, schema: JSONSchema7, options?: ValidationOptions) => ValidationResult;
/**
 * Creates a reusable validator function for a specific schema with i18n support
 * @param schema - The JSON Schema to create validator for
 * @param locale - The locale to use for error messages
 * @returns A function that validates data against the schema
 */
export declare const createSchemaValidator: (schema: JSONSchema7, locale?: SupportedLocale) => (data: unknown) => ValidationResult;
/**
 * Get available locales for validation error messages
 * @returns Array of supported locale codes
 */
export declare const getSupportedLocales: () => SupportedLocale[];
/**
 * Check if a locale is supported
 * @param locale - The locale to check
 * @returns Boolean indicating if the locale is supported
 */
export declare const isLocaleSupported: (locale: string) => locale is "en" | "zh-HK" | "zh-TW" | "zh-CN" | "zh";
export {};
