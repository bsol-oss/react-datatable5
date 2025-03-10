import { SchemaFormContext } from "@/components/Form/SchemaFormContext";
import { ForeignKeyProps } from "@/components/Form/components/fields/StringInputField";
import { useSchemaContext } from "@/components/Form/useSchemaContext";
import { clearEmptyString } from "@/components/Form/utils/clearEmptyString";
import { idListSanityCheck } from "@/components/Form/utils/idListSanityCheck";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Alert,
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import axios, { AxiosRequestConfig } from "axios";
import { JSONSchema7 } from "json-schema";
import { Dispatch, SetStateAction, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import { UseTranslationResponse } from "react-i18next";
import { ColumnRenderer } from "./components/fields/ColumnRenderer";
import { ColumnViewer } from "./components/viewers/ColumnViewer";
import { SubmitButton } from "./components/core/SubmitButton";

export interface FormProps<TData extends FieldValues> {
  schema: JSONSchema7;
  serverUrl: string;
  requestUrl?: string;
  idMap: Record<string, object>;
  setIdMap: Dispatch<SetStateAction<Record<string, object>>>;
  form: UseFormReturn;
  translate: UseTranslationResponse<any, any>;
  order?: string[];
  ignore?: string[];
  include?: string[];
  onSubmit?: SubmitHandler<TData>;
  rowNumber?: number | string;
  requestOptions?: AxiosRequestConfig;
}

export interface CustomJSONSchema7Definition extends JSONSchema7 {
  variant: string;
  in_table: string;
  column_ref: string;
  display_column: string;
  gridColumn: string;
  gridRow: string;
  foreign_key: ForeignKeyProps;
}

export const idPickerSanityCheck = (
  column: string,
  foreign_key?: {
    table?: string;
    column?: string;
    display_column?: string;
  }
) => {
  if (!!foreign_key == false) {
    throw new Error(
      `The key foreign_key does not exist in properties of column ${column} when using id-picker.`
    );
  }
  const { table, column: foreignKeyColumn, display_column } = foreign_key;

  if (!!table == false) {
    throw new Error(
      `The key table does not exist in properties of column ${table} when using id-picker.`
    );
  }
  if (!!display_column == false) {
    throw new Error(
      `The key display_column does not exist in properties of column ${column} when using id-picker.`
    );
  }
  if (!!foreignKeyColumn == false) {
    throw new Error(
      `The key column does not exist in properties of column ${column} when using id-picker.`
    );
  }
};

const FormInternal = <TData extends FieldValues>() => {
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
  } = useSchemaContext();

  const methods = useFormContext();

  const { properties } = schema;

  const onBeforeSubmit = () => {
    setIsSubmiting(true);
  };
  const onAfterSubmit = () => {
    setIsSubmiting(false);
  };
  const onSubmitError = () => {
    setIsError(true);
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
      setIsError(true);
      setError(error);
      onSubmitError();
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
      <Grid gap={2}>
        <Heading>{translate.t("title")}</Heading>
        <Alert.Root status="success">
          <Alert.Indicator />
          <Alert.Title>{translate.t("submitSuccess")}</Alert.Title>
        </Alert.Root>
        <Flex justifyContent={"end"}>
          <Button
            onClick={() => {
              setIsError(false);
              setIsSubmiting(false);
              setIsSuccess(false);
              setIsConfirming(false);
              setValidatedData(undefined);
              methods.reset();
            }}
            formNoValidate
          >
            {translate.t("submitAgain")}
          </Button>
        </Flex>
      </Grid>
    );
  }
  if (isConfirming) {
    return (
      <Grid gap={2}>
        <Heading> {translate.t("title")}</Heading>
        <Grid
          gap={4}
          gridTemplateColumns={"repeat(12, 1fr)"}
          gridTemplateRows={`repeat(${rowNumber ?? "auto-fit"}, auto)`}
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
                <AccordionRoot collapsible defaultValue={["b"]}>
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
      </Grid>
    );
  }

  return (
    <>
      <Grid gap="2">
        <Heading> {translate.t("title")}</Heading>
        <Grid
          gap="4"
          gridTemplateColumns={"repeat(12, 1fr)"}
          gridTemplateRows={`repeat(${rowNumber ?? "auto-fit"}, auto)`}
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
      </Grid>
    </>
  );
};

export const Form = <TData extends FieldValues>({
  schema,
  idMap,
  setIdMap,
  form,
  serverUrl,
  translate,
  order = [],
  ignore = [],
  include = [],
  onSubmit = undefined,
  rowNumber = undefined,
  requestOptions = {},
}: FormProps<TData>) => {
  // const { properties } = schema;

  // idListSanityCheck("order", order, properties as object);
  // idListSanityCheck("ignore", ignore, properties as object);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [validatedData, setValidatedData] = useState();
  const [error, setError] = useState<unknown>();

  return (
    <SchemaFormContext.Provider
      value={{
        schema,
        serverUrl,
        order,
        ignore,
        include,
        // @ts-expect-error TODO: find appropriate types
        onSubmit,
        rowNumber,
        idMap,
        setIdMap,
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
      }}
    >
      <FormProvider {...form}>
        <FormInternal />
      </FormProvider>
    </SchemaFormContext.Provider>
  );
};
