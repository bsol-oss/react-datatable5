import Ajv, { ErrorObject, ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
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
  const validate = ajv.compile(schema);
  const validationResult = validate(data);
  const errors = validate.errors;
  console.log(errors, data);
  return {
    isValid: validationResult,
    validate,
    errors,
  };
};
