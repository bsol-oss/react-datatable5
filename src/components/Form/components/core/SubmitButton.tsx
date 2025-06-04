import { Button } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../../useSchemaContext";
import Ajv, { ValidationError } from "ajv";

export const SubmitButton = () => {
  const {
    translate,
    setValidatedData,
    setIsError,
    setIsConfirming,
    setError,
    schema,
  } = useSchemaContext();
  const methods = useFormContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValid = (data: any) => {
    // Validate data using AJV before proceeding to confirmation
    const validate = new Ajv({
      strict: false,
      allErrors: true,
    }).compile(schema);
    const validationResult = validate(data);
    // @ts-expect-error TODO: find appropriate type
    const errors = validationResult.errors as ValidationError[];

    if (errors && errors.length > 0) {
      setError(errors);
      setIsError(true);
      return;
    }

    // If validation passes, proceed to confirmation
    setValidatedData(data);
    setIsError(false);
    setIsConfirming(true);
  };

  return (
    <Button
      onClick={() => {
        methods.handleSubmit(onValid)();
      }}
      formNoValidate
    >
      {translate.t("submit")}
    </Button>
  );
};
