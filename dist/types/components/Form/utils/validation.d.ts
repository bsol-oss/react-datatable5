import { JSONSchema7 } from "json-schema";
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
export declare const validateData: (data: unknown, schema: JSONSchema7) => ValidationResult;
/**
 * Creates a reusable validator function for a specific schema
 * @param schema - The JSON Schema to create validator for
 * @returns A function that validates data against the schema
 */
export declare const createSchemaValidator: (schema: JSONSchema7) => (data: unknown) => ValidationResult;
