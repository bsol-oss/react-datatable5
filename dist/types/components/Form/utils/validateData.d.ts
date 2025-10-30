import { ErrorObject, ValidateFunction } from 'ajv';
import { JSONSchema7 } from 'json-schema';
type ValidateDataResult = {
    isValid: boolean;
    validate: ValidateFunction;
    errors: ErrorObject<string, Record<string, any>, unknown>[] | null | undefined;
};
export declare const validateData: (data: unknown, schema: JSONSchema7) => ValidateDataResult;
export {};
