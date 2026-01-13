import Ajv, { ErrorObject, ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import AjvErrors from 'ajv-errors';
import { JSONSchema7 } from 'json-schema';

type ValidateDataResult = {
  isValid: boolean;
  validate: ValidateFunction;
  errors:
    | ErrorObject<string, Record<string, any>, unknown>[]
    | null
    | undefined;
};

export const validateData = (
  data: unknown,
  schema: JSONSchema7
): ValidateDataResult => {
  const ajv = new Ajv({
    strict: false,
    allErrors: true,
  });
  addFormats(ajv);
  AjvErrors(ajv); // Load ajv-errors plugin to process errorMessage format
  const validate = ajv.compile(schema);
  const validationResult = validate(data);
  const errors = validate.errors;
  return {
    isValid: validationResult,
    validate,
    errors,
  };
};
