import { Button } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../../useSchemaContext";

export const SubmitButton = () => {
  const { translate, setValidatedData, setIsError, setIsConfirming } =
    useSchemaContext();
  const methods = useFormContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValid = (data: any) => {
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
