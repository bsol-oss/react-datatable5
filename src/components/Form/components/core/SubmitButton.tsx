import { Button } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useSchemaContext } from '../../useSchemaContext';
export const SubmitButton = () => {
  const { setValidatedData, setIsError, onFormSubmit, formButtonLabels } =
    useSchemaContext();
  const methods = useFormContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValid = (data: any) => {
    // Validation is handled by react-hook-form
    // This function will only be called if validation passes
    setValidatedData(data);
    setIsError(false);
    onFormSubmit(data);
  };

  return (
    <Button
      onClick={() => {
        methods.handleSubmit(onValid)();
      }}
      formNoValidate
    >
      {formButtonLabels?.submit ?? 'Submit'}
    </Button>
  );
};
