import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import {
  Alert,
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
import { validateData, ValidationError } from "../../utils/validation";
import { ColumnRenderer } from "../fields/ColumnRenderer";
import { ColumnViewer } from "../viewers/ColumnViewer";
import { SubmitButton } from "./SubmitButton";

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
    validationLocale,
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
  const validateFormData = (
    data: TData
  ): { isValid: boolean; errors: ValidationError[] } => {
    try {
      const validationResult = validateData(data, schema, {
        locale: validationLocale,
      });
      return validationResult;
    } catch (error) {
      const errorMessage =
        validationLocale === "zh-HK" || validationLocale === "zh-TW"
          ? `驗證錯誤: ${error instanceof Error ? error.message : "未知驗證錯誤"}`
          : validationLocale === "zh-CN" || validationLocale === "zh"
            ? `验证错误: ${error instanceof Error ? error.message : "未知验证错误"}`
            : `Validation error: ${error instanceof Error ? error.message : "Unknown validation error"}`;

      return {
        isValid: false,
        errors: [
          {
            field: "validation",
            message: errorMessage,
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
        message:
          validationLocale === "zh-HK" || validationLocale === "zh-TW"
            ? "表單驗證失敗"
            : validationLocale === "zh-CN" || validationLocale === "zh"
              ? "表单验证失败"
              : "Form validation failed",
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
    const title =
      validationLocale === "zh-HK" || validationLocale === "zh-TW"
        ? `表單驗證失敗 (${validationErrors.length} 個錯誤${validationErrors.length > 1 ? "" : ""})`
        : validationLocale === "zh-CN" || validationLocale === "zh"
          ? `表单验证失败 (${validationErrors.length} 个错误${validationErrors.length > 1 ? "" : ""})`
          : `Form Validation Failed (${validationErrors.length} error${validationErrors.length > 1 ? "s" : ""})`;

    const formLabel =
      validationLocale === "zh-HK" || validationLocale === "zh-TW"
        ? "表單"
        : validationLocale === "zh-CN" || validationLocale === "zh"
          ? "表单"
          : "Form";

    const currentValueLabel =
      validationLocale === "zh-HK" || validationLocale === "zh-TW"
        ? "目前值:"
        : validationLocale === "zh-CN" || validationLocale === "zh"
          ? "当前值:"
          : "Current value:";

    return (
      <AccordionRoot collapsible defaultValue={[]}>
        <AccordionItem value="validation-errors">
          <AccordionItemTrigger>{title}</AccordionItemTrigger>
          <AccordionItemContent>
            {validationErrors.map((err, index) => (
              <Box
                key={index}
                mb={2}
                p={2}
                bg="red.50"
                borderLeft="4px solid"
                borderColor="red.500"
              >
                <Text fontWeight="bold" color="red.700">
                  {err.field === "root" ? formLabel : err.field}:
                </Text>
                <Text color="red.600">{err.message}</Text>
                {err.value !== undefined && (
                  <Text
                    fontSize="sm"
                    color="red.500"
                    mt={1}
                    whiteSpace="pre-wrap"
                    wordBreak="break-all"
                  >
                    {currentValueLabel} {JSON.stringify(err.value, null, 2)}
                  </Text>
                )}
              </Box>
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
