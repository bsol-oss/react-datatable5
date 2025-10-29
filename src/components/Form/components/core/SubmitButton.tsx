import { Button } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useSchemaContext } from '../../useSchemaContext';
export const SubmitButton = () => {
  const {
    translate,
    setValidatedData,
    setIsError,
    setIsConfirming,
    setError,
    schema,
    requireConfirmation,
    onFormSubmit,
  } = useSchemaContext();
  const methods = useFormContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValid = (data: any) => {
    // const { isValid, errors } = validateData(data, schema);

    // if (!isValid) {
    //   setError({
    //     type: 'validation',
    //     errors,
    //   });
    //   setIsError(true);
    //   return;
    // }

    // If validation passes, check if confirmation is required
    if (requireConfirmation) {
      // Show confirmation (existing behavior)
      setValidatedData(data);
      setIsError(false);
      setIsConfirming(true);
    } else {
      // Skip confirmation and submit directly
      setValidatedData(data);
      setIsError(false);
      onFormSubmit(data);
    }
  };

  return (
    <Button
      onClick={() => {
        methods.handleSubmit(onValid)();
      }}
      formNoValidate
    >
      {translate.t('submit')}
    </Button>
  );
};
