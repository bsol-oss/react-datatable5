import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertRoot,
  AlertTitle,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../../useSchemaContext";
import { clearEmptyString } from "../../utils/clearEmptyString";
import { ColumnRenderer } from "../fields/ColumnRenderer";
import { ColumnViewer } from "../viewers/ColumnViewer";
import { SubmitButton } from "./SubmitButton";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { ValidationError } from "ajv";

export const FormBody = <TData extends object>() => {
  const {
    schema,
    requestUrl,
    order,
    ignore,
    include,
    onSubmit,
    rowNumber,
    translate,
    requestOptions,
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
    setError,
    getUpdatedData,
    customErrorRenderer,
  } = useSchemaContext();

  const methods = useFormContext();

  const { properties } = schema;

  const onBeforeSubmit = () => {
    setIsSubmiting(true);
  };
  const onAfterSubmit = () => {
    setIsSubmiting(false);
  };
  const onSubmitError = (error: unknown) => {
    setIsError(true);
    setError(error);
  };
  const onSubmitSuccess = () => {
    setIsSuccess(true);
  };

  // Enhanced validation function using AJV with i18n support
  const validateFormData = (data: TData) => {
    try {
      const ajv = new Ajv({
        strict: false,
        allErrors: true,
      });
      addFormats(ajv);
      addErrors(ajv);
      const validate = ajv.compile(schema);
      const validationResult = validate(data);

      const errors = validate.errors;

      console.log(
        {
          isValid: validationResult,
          errors,
        },
        "plkdfs"
      );
      return {
        isValid: validationResult,
        errors,
      };
    } catch (error) {
      return {
        isValid: false,
        errors: [
          {
            field: "validation",
            message: error instanceof Error ? error.message : "Unknown error",
          },
        ],
      };
    }
  };

  const defaultOnSubmit = async (promise: Promise<unknown>) => {
    try {
      onBeforeSubmit();
      await promise;
      onSubmitSuccess();
    } catch (error) {
      onSubmitError(error);
    } finally {
      onAfterSubmit();
    }
  };
  const defaultSubmitPromise = (data: TData) => {
    const options = {
      method: "POST",
      url: `${requestUrl}`,
      data: clearEmptyString(data),
      ...requestOptions,
    };
    return axios.request(options);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFormSubmit = async (data: any) => {
    // Validate data using AJV before submission
    const validationResult = validateFormData(data);

    if (!validationResult.isValid) {
      // Set validation errors
      const validationErrorMessage = {
        type: "validation",
        errors: validationResult.errors,
        message: translate.t("validation_error"),
      };
      onSubmitError(validationErrorMessage);
      return;
    }

    if (onSubmit === undefined) {
      await defaultOnSubmit(defaultSubmitPromise(data));
      return;
    }
    await defaultOnSubmit(onSubmit(data));
  };

  // Custom error renderer for validation errors with i18n support
  const renderValidationErrors = (validationErrors: ValidationError[]) => {
    return (
      <AccordionRoot
        backgroundColor={{
          base: "red.50",
          _dark: "red.950",
        }}
        p="4"
        colorPalette="red"
        collapsible
        defaultValue={[]}
      >
        <AccordionItem value="validation-errors">
          <AccordionItemTrigger>
            {translate.t("validation_error")}
          </AccordionItemTrigger>
          <AccordionItemContent display="flex" flexFlow="column" gap="2">
            {validationErrors.map((err, index) => (
              <AlertRoot status="error" display="flex" alignItems="center">
                <AlertIndicator />
                <AlertContent>
                  <AlertDescription>{err.message}</AlertDescription>
                </AlertContent>
              </AlertRoot>
            ))}
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
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
    return (
      <Flex flexFlow={"column"} gap="2">
        <Alert.Root status="success">
          <Alert.Indicator />
          <Alert.Title>{translate.t("submit_success")}</Alert.Title>
        </Alert.Root>
        <Flex justifyContent={"end"}>
          <Button
            onClick={async () => {
              setIsError(false);
              setIsSubmiting(false);
              setIsSuccess(false);
              setIsConfirming(false);
              setValidatedData(undefined);
              const data = await getUpdatedData();
              methods.reset(data as TData);
            }}
            formNoValidate
          >
            {translate.t("submit_again")}
          </Button>
        </Flex>
      </Flex>
    );
  }
  if (isConfirming) {
    return (
      <Flex flexFlow={"column"} gap="2">
        <Grid
          gap={4}
          gridTemplateColumns={"repeat(12, 1fr)"}
          gridTemplateRows={"repeat(12, max-content)"}
          autoFlow={"row"}
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
        <Flex justifyContent={"end"} gap={"2"}>
          <Button
            onClick={() => {
              setIsConfirming(false);
            }}
            variant={"subtle"}
          >
            {translate.t("cancel")}
          </Button>
          <Button
            onClick={() => {
              onFormSubmit(validatedData);
            }}
          >
            {translate.t("confirm")}
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
                {(error as any)?.type === "validation" &&
                (error as any)?.errors ? (
                  renderValidationErrors((error as any).errors)
                ) : (
                  <Alert.Root status="error">
                    <Alert.Title>
                      <AccordionRoot collapsible defaultValue={[]}>
                        <AccordionItem value={"b"}>
                          <AccordionItemTrigger>
                            <Alert.Indicator />
                            {`${error}`}
                          </AccordionItemTrigger>
                          <AccordionItemContent>{`${JSON.stringify(error)}`}</AccordionItemContent>
                        </AccordionItem>
                      </AccordionRoot>
                    </Alert.Title>
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
    <Flex flexFlow={"column"} gap="2">
      <Grid gap="4" gridTemplateColumns={"repeat(12, 1fr)"} autoFlow={"row"}>
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
      <Flex justifyContent={"end"} gap="2">
        <Button
          onClick={() => {
            methods.reset();
          }}
          variant={"subtle"}
        >
          {translate.t("reset")}
        </Button>
        <SubmitButton />
      </Flex>

      {/* Display validation errors if form has been submitted with errors */}
      {isError && (error as any)?.type === "validation" && (
        <Box mt={4}>
          {(error as any)?.errors &&
            renderValidationErrors((error as any).errors)}
        </Box>
      )}
    </Flex>
  );
};
