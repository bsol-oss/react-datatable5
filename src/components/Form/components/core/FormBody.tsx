import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import {
  Alert,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Spinner,
} from '@chakra-ui/react';
import { ValidationError } from 'ajv';
import { useFormContext } from 'react-hook-form';
import { useSchemaContext } from '../../useSchemaContext';
import { ColumnRenderer } from '../fields/ColumnRenderer';
import { ColumnViewer } from '../viewers/ColumnViewer';
import { SubmitButton } from './SubmitButton';

export const FormBody = <TData extends object>() => {
  const {
    schema,
    order,
    ignore,
    include,
    translate,
    isSuccess,
    setIsSuccess,
    isError,
    setIsError,
    isSubmiting,
    setIsSubmiting,
    isConfirming,
    setIsConfirming,
    validatedData,
    setValidatedData,
    error,
    getUpdatedData,
    customErrorRenderer,
    customSuccessRenderer,
    displayConfig,
    onFormSubmit,
  } = useSchemaContext();
  const { showSubmitButton, showResetButton } = displayConfig;
  const methods = useFormContext();

  const { properties } = schema;

  // Custom error renderer for validation errors with i18n support
  const renderValidationErrors = (validationErrors: ValidationError[]) => {
    return (
      <Flex flexFlow={'column'} gap="2">
        {validationErrors.map((err, index) => (
          <Alert.Root
            key={index}
            status="error"
            display="flex"
            alignItems="center"
          >
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>{err.message}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        ))}
      </Flex>
    );
  };

  interface renderColumnsConfig {
    order: string[];
    keys: string[];
    ignore: string[];
    include: string[];
  }

  const renderColumns = ({
    order,
    keys,
    ignore,
    include,
  }: renderColumnsConfig) => {
    const included = include.length > 0 ? include : keys;
    const not_exist = included.filter(
      (columnA) => !order.some((columnB) => columnA === columnB)
    );
    const ordered = [...order, ...not_exist];
    const ignored = ordered.filter(
      (column) => !ignore.some((shouldIgnore) => column === shouldIgnore)
    );
    return ignored;
  };

  const ordered = renderColumns({
    order,
    keys: Object.keys(properties as object),
    ignore,
    include,
  });

  if (isSuccess) {
    const resetHandler = async () => {
      setIsError(false);
      setIsSubmiting(false);
      setIsSuccess(false);
      setIsConfirming(false);
      setValidatedData(undefined);
      const data = await getUpdatedData();
      methods.reset(data as TData);
    };

    if (customSuccessRenderer) {
      return customSuccessRenderer(resetHandler);
    }

    return (
      <Flex flexFlow={'column'} gap="2">
        <Alert.Root status="success">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{translate.t('submit_success')}</Alert.Title>
          </Alert.Content>
        </Alert.Root>
        <Flex justifyContent={'end'}>
          <Button onClick={resetHandler} formNoValidate>
            {translate.t('submit_again')}
          </Button>
        </Flex>
      </Flex>
    );
  }
  if (isConfirming) {
    return (
      <Flex flexFlow={'column'} gap="2">
        <Grid
          gap={4}
          gridTemplateColumns={'repeat(12, 1fr)'}
          gridTemplateRows={'repeat(12, max-content)'}
          autoFlow={'row'}
        >
          {ordered.map((column) => {
            return (
              <ColumnViewer
                // @ts-expect-error find suitable types
                properties={properties}
                prefix={``}
                key={`form-viewer-${column}`}
                {...{ column }}
              />
            );
          })}
        </Grid>
        <Flex justifyContent={'end'} gap={'2'}>
          <Button
            onClick={() => {
              setIsConfirming(false);
            }}
            variant={'subtle'}
          >
            {translate.t('cancel')}
          </Button>
          <Button
            onClick={() => {
              onFormSubmit(validatedData);
            }}
          >
            {translate.t('confirm')}
          </Button>
        </Flex>

        {isSubmiting && (
          <Box pos="absolute" inset="0" bg="bg/80">
            <Center h="full">
              <Spinner color="teal.500" />
            </Center>
          </Box>
        )}
        {isError && (
          <>
            {customErrorRenderer ? (
              customErrorRenderer(error)
            ) : (
              <>
                {/* Check if error is a validation error */}
                {(error as any)?.type === 'validation' &&
                (error as any)?.errors ? (
                  renderValidationErrors((error as any).errors)
                ) : (
                  <Alert.Root status="error">
                    <Alert.Indicator />
                    <Alert.Content>
                      <Alert.Title>Error</Alert.Title>
                      <Alert.Description>
                        <AccordionRoot collapsible defaultValue={[]}>
                          <AccordionItem value={'b'}>
                            <AccordionItemTrigger>
                              {`${error}`}
                            </AccordionItemTrigger>
                            <AccordionItemContent>{`${JSON.stringify(error)}`}</AccordionItemContent>
                          </AccordionItem>
                        </AccordionRoot>
                      </Alert.Description>
                    </Alert.Content>
                  </Alert.Root>
                )}
              </>
            )}
          </>
        )}
      </Flex>
    );
  }
  return (
    <Flex flexFlow={'column'} gap="2">
      <Grid gap="4" gridTemplateColumns={'repeat(12, 1fr)'} autoFlow={'row'}>
        {ordered.map((column) => {
          return (
            <ColumnRenderer
              // @ts-expect-error find suitable types
              properties={properties}
              prefix={``}
              key={`form-input-${column}`}
              {...{ column }}
            />
          );
        })}
      </Grid>
      <Flex justifyContent={'end'} gap="2">
        {showResetButton && (
          <Button
            onClick={() => {
              methods.reset();
            }}
            variant={'subtle'}
          >
            {translate.t('reset')}
          </Button>
        )}
        {showSubmitButton && <SubmitButton />}
      </Flex>
      {isError && (
        <>
          {customErrorRenderer ? (
            customErrorRenderer(error)
          ) : (
            <>
              {/* Check if error is a validation error */}
              {(error as any)?.type === 'validation' &&
              (error as any)?.errors ? (
                renderValidationErrors((error as any).errors)
              ) : (
                <Alert.Root status="error">
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>Error</Alert.Title>
                    <Alert.Description>
                      <AccordionRoot collapsible defaultValue={[]}>
                        <AccordionItem value={'b'}>
                          <AccordionItemTrigger>
                            {`${error}`}
                          </AccordionItemTrigger>
                          <AccordionItemContent>{`${JSON.stringify(error)}`}</AccordionItemContent>
                        </AccordionItem>
                      </AccordionRoot>
                    </Alert.Description>
                  </Alert.Content>
                </Alert.Root>
              )}
            </>
          )}
        </>
      )}
    </Flex>
  );
};
