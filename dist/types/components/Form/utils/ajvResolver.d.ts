import { FieldValues, Resolver } from 'react-hook-form';
import { ErrorObject } from 'ajv';
import { CustomJSONSchema7 } from '../components/types/CustomJSONSchema7';
/**
 * Converts AJV error objects to react-hook-form field errors format
 */
export declare const convertAjvErrorsToFieldErrors: (errors: ErrorObject<string, Record<string, unknown>, unknown>[] | null | undefined, schema: CustomJSONSchema7) => Record<string, {
    type: string;
    keyword: string;
    params?: Record<string, unknown>;
    message?: string;
}>;
/**
 * AJV resolver for react-hook-form
 * Integrates AJV validation with react-hook-form's validation system
 */
export declare const ajvResolver: <T extends FieldValues>(schema: CustomJSONSchema7) => Resolver<T>;
