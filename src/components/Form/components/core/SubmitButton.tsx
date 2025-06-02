import { Button } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../../useSchemaContext";
import { validateData } from "../../utils/validation";

export const SubmitButton = () => {
  const { translate, setValidatedData, setIsError, setIsConfirming, setError, schema } =
    useSchemaContext();
  const methods = useFormContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValid = (data: any) => {
    // Validate data using AJV before proceeding to confirmation
    const validationResult = validateData(data, schema);
    
    if (!validationResult.isValid) {
      // Set validation errors
      const validationErrorMessage = {
        type: 'validation',
        errors: validationResult.errors,
        message: 'Form validation failed'
      };
      setError(validationErrorMessage);
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
