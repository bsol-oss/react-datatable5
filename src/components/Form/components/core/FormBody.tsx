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
} from "@chakra-ui/react";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../../useSchemaContext";
import { clearEmptyString } from "../../utils/clearEmptyString";
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
    if (onSubmit === undefined) {
      await defaultOnSubmit(defaultSubmitPromise(data));
      return;
    }
    await defaultOnSubmit(onSubmit(data));
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
          </>
        )}
      </Flex>
    );
  }
  return (
    <Flex flexFlow={"column"} gap="2">
      <Grid
        gap="4"
        gridTemplateColumns={"repeat(12, 1fr)"}
        autoFlow={"row"}
      >
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
    </Flex>
  );
};
