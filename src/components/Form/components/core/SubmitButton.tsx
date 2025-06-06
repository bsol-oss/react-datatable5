import { Button } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../../useSchemaContext";

import { validateData } from "../../utils/validateData";
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
    const { isValid, errors } = validateData(data, schema);

    if (!isValid) {
      setError({
        type: "validation",
        errors,
      });
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
