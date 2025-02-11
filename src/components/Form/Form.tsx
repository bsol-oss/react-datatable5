import { SchemaFormContext } from "@/components/Form/SchemaFormContext";
import { IdPicker } from "@/components/Form/components/IdPicker";
import { IdViewer } from "@/components/Form/components/IdViewer";
import { NumberInputField } from "@/components/Form/components/NumberInputField";
import { StringInputField } from "@/components/Form/components/StringInputField";
import { useSchemaContext } from "@/components/Form/useSchemaContext";
import { clearEmptyString } from "@/components/Form/utils/clearEmptyString";
import { idListSanityCheck } from "@/components/Form/utils/idListSanityCheck";
import { snakeToLabel } from "@/components/Form/utils/snakeToLabel";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import {
  Alert,
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { JSONSchema7 } from "json-schema";
import { useEffect, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { BooleanPicker } from "./components/BooleanPicker";
import { DatePicker } from "./components/DatePicker";
import { ObjectInput } from "./components/ObjectInput";
import { TagPicker } from "./components/TagPicker";

export interface DisplayTextProps {
  title?: string;
  addNew?: string;
  submit?: string;
  confirm?: string;
  save?: string;
  empty?: string;
  cancel?: string;
  submitSuccess?: string;
  submitAgain?: string;
  fieldRequired?: string;
}

export interface FormProps<TData extends FieldValues> {
  schema: JSONSchema7;
  serverUrl: string;
  order?: string[];
  ignore?: string[];
  onSubmit?: SubmitHandler<TData>;
  preLoadedValues?: object;
  rowNumber?: number | string;
  displayText?: DisplayTextProps;
}

export interface CustomJSONSchema7Definition extends JSONSchema7 {
  variant: string;
  in_table: string;
  column_ref: string;
  display_column: string;
  gridColumn: string;
  gridRow: string;
}

const idPickerSanityCheck = (
  column: string,
  in_table?: string,
  column_ref?: string,
  display_column?: string
) => {
  console.log(!!in_table, "okgsd");
  if (!!in_table == false) {
    throw new Error(
      `The key in_table does not exist in properties of column ${column}.`
    );
  }
  if (!!column_ref == false) {
    throw new Error(
      `The key column_ref does not exist in properties of column ${column}.`
    );
  }
  if (!!display_column == false) {
    throw new Error(
      `The key display_column does not exist in properties of column ${column}.`
    );
  }
};

const FormInternal = <TData extends FieldValues>() => {
  const {
    schema,
    serverUrl,
    displayText,
    order,
    ignore,
    onSubmit,
    preLoadedValues,
    rowNumber,
  } = useSchemaContext();
  const { title, submit, empty, cancel, submitSuccess, submitAgain, confirm } =
    displayText;
  const methods = useFormContext();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [validatedData, setValidatedData] = useState();
  const [error, setError] = useState<unknown>();

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
  const defaultOnSubmit = async (promise: Promise<any>) => {
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
      url: `${serverUrl}/api/g/${schema.title}`,
      headers: {
        Apikey: "YOUR_SECRET_TOKEN",
        "Content-Type": "application/json",
      },
      data: clearEmptyString(data),
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onValid = (data: any) => {
    setValidatedData(data);
    setIsError(false);
    setIsConfirming(true);
  };

  const renderOrder = (order: string[], origin_list: string[]) => {
    const not_exist = origin_list.filter(
      (columnA) => !order.some((columnB) => columnA === columnB)
    );
    return [...order, ...not_exist];
  };

  const ordered = renderOrder(order, Object.keys(properties as object));

  const getDataListProps = (value: string | undefined) => {
    if (value == undefined || value.length <= 0) {
      return {
        value: `<${empty ?? "Empty"}>`,
        color: "gray.400",
      };
    }
    return {
      value: value,
    };
  };

  useEffect(() => {
    const loadData = () => {
      Object.entries(preLoadedValues).map(([column, value]) => {
        methods.setValue(column, value);
      });
    };
    loadData();
  }, [preLoadedValues, methods]);

  if (isSuccess) {
    return (
      <Grid gap={2}>
        <Heading>{title ?? snakeToLabel(schema.title ?? "")}</Heading>
        <Alert.Root status="success">
          <Alert.Indicator />
          <Alert.Title>
            {submitSuccess ?? "Data uploaded to the server. Fire on!"}
          </Alert.Title>
        </Alert.Root>
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
          {submitAgain ?? "Submit Again"}
        </Button>
      </Grid>
    );
  }
  if (isConfirming) {
    return (
      <Grid gap={2}>
        <Heading>{title ?? snakeToLabel(schema.title ?? "")}</Heading>
        <DataListRoot
          orientation="horizontal"
          gap={4}
          display={"grid"}
          gridTemplateColumns={"repeat(12, 1fr)"}
          gridTemplateRows={`repeat(${rowNumber ?? "auto-fit"}, auto)`}
        >
          {ordered.map((column) => {
            if (properties === undefined) {
              return <></>;
            }
            const key = column;
            const values = properties[column];
            const shouldIgnore = ignore.some((column) => {
              return column == key;
            });
            if (shouldIgnore) {
              return <></>;
            }

            const {
              type,
              variant,
              in_table,
              column_ref,
              display_column,
              gridColumn,
              gridRow,
            } = values as CustomJSONSchema7Definition;
            if (type === "string") {
              if (variant === "id-picker") {
                idPickerSanityCheck(
                  column,
                  in_table,
                  column_ref,
                  display_column
                );
                return (
                  <IdViewer
                    key={`form-${key}`}
                    value={(validatedData ?? {})[column]}
                    {...{
                      in_table,
                      column_ref,
                      display_column,
                      column,
                      gridColumn,
                      gridRow,
                    }}
                  />
                );
              }
              if (variant === "tag-picker") {
                const value = (validatedData ?? {})[column];
                return (
                  <DataListItem
                    gridColumn={gridColumn ?? "span 4"}
                    gridRow={gridRow ?? "span 1"}
                    key={`form-${key}`}
                    label={`${snakeToLabel(column)}`}
                    {...getDataListProps(JSON.stringify(value))}
                  />
                );
              }
              if (variant === "date-picker") {
                const value = (validatedData ?? {})[column];
                if (!!value === false) {
                  return (
                    <DataListItem
                      gridColumn={gridColumn ?? "span 4"}
                      gridRow={gridRow ?? "span 1"}
                      key={`form-${key}`}
                      label={`${snakeToLabel(column)}`}
                      {...getDataListProps(undefined)}
                    />
                  );
                }
                const date = dayjs(value).format("YYYY-MM-DD");
                return (
                  <DataListItem
                    gridColumn={gridColumn ?? "span 4"}
                    gridRow={gridRow ?? "span 1"}
                    key={`form-${key}`}
                    label={`${snakeToLabel(column)}`}
                    {...getDataListProps(date)}
                  />
                );
              }
              return (
                <DataListItem
                  gridColumn={gridColumn ?? "span 4"}
                  gridRow={gridRow ?? "span 4"}
                  key={`form-${key}`}
                  label={`${snakeToLabel(column)}`}
                  {...getDataListProps((validatedData ?? {})[column])}
                />
              );
            }
            if (type === "object") {
              const value = (validatedData ?? {})[column];
              if (!!value === false) {
                return (
                  <DataListItem
                    gridColumn={gridColumn ?? "span 4"}
                    gridRow={gridRow ?? "span 1"}
                    key={`form-${key}`}
                    label={`${snakeToLabel(column)}`}
                    {...getDataListProps(undefined)}
                  />
                );
              }
              return (
                <Flex
                  flexFlow={"column"}
                  gap={2}
                  gridColumn={gridColumn ?? "span 4"}
                  gridRow={gridRow ?? "span 1"}
                >
                  <Text>{snakeToLabel(column)}</Text>
                  <DataListRoot
                    orientation={"horizontal"}
                    padding={4}
                    borderColor={"gray.200"}
                    borderWidth={1}
                    borderRadius={4}
                  >
                    {Object.entries(value).map(([key, value]) => {
                      return (
                        <DataListItem
                          key={`form-${column}-${key}`}
                          label={`${key}`}
                          {...getDataListProps(value as string | undefined)}
                        />
                      );
                    })}
                  </DataListRoot>
                </Flex>
              );
            }
            if (type === "boolean") {
              return (
                <DataListItem
                  gridColumn={gridColumn ?? "span 4"}
                  gridRow={gridRow ?? "span 4"}
                  key={`form-${key}`}
                  label={`${snakeToLabel(column)}`}
                  {...getDataListProps((validatedData ?? {})[column])}
                />
              );
            }
            if (type === "number" || type === "integer") {
              return (
                <DataListItem
                  gridColumn={gridColumn ?? "span 4"}
                  gridRow={gridRow ?? "span 4"}
                  key={`form-${key}`}
                  label={`${snakeToLabel(column)}`}
                  {...getDataListProps((validatedData ?? {})[column])}
                />
              );
            }
            if (type === "array") {
              return <>{`array ${column}`}</>;
            }
            if (type === "null") {
              return <>{`null ${column}`}</>;
            }
            return <>{`unknown type ${column}`}</>;
          })}
        </DataListRoot>
        <Button
          onClick={() => {
            onFormSubmit(validatedData);
          }}
        >
          {confirm ?? "Confirm"}
        </Button>
        <Button
          onClick={() => {
            setIsConfirming(false);
          }}
          variant={"subtle"}
        >
          {cancel ?? "Cancel"}
        </Button>

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
      <Grid gap={2}>
        <Heading>{title ?? snakeToLabel(schema.title ?? "")}</Heading>
        <Grid
          gap={4}
          gridTemplateColumns={"repeat(12, 1fr)"}
          gridTemplateRows={`repeat(${rowNumber ?? "auto-fit"}, auto)`}
        >
          {ordered.map((column) => {
            if (properties === undefined) {
              return <></>;
            }
            const key = column;
            const values = properties[column];
            const shouldIgnore = ignore.some((column) => {
              return column == key;
            });
            if (shouldIgnore) {
              return <></>;
            }
            //@ts-expect-error TODO: add more fields to support form-creation
            const { type, variant, in_table, column_ref, display_column } =
              values;
            if (type === "string") {
              if (variant === "id-picker") {
                idPickerSanityCheck(
                  column,
                  in_table,
                  column_ref,
                  display_column
                );
                return (
                  <IdPicker
                    key={`form-${key}`}
                    column={key}
                    in_table={in_table}
                    column_ref={column_ref}
                    display_column={display_column}
                  />
                );
              }
              if (variant === "tag-picker") {
                return <TagPicker key={`form-${key}`} column={key} />;
              }
              if (variant === "date-picker") {
                return <DatePicker key={`form-${key}`} column={key} />;
              }
              return <StringInputField key={`form-${key}`} column={key} />;
            }
            if (type === "number" || type === "integer") {
              return <NumberInputField key={`form-${key}`} column={key} />;
            }
            if (type === "boolean") {
              return <BooleanPicker key={`form-${key}`} column={key} />;
            }
            if (type === "object") {
              return (
                <>
                  <ObjectInput key={`form-${key}`} column={key} />
                </>
              );
            }
            if (type === "array") {
              return <>{`array ${column}`}</>;
            }
            if (type === "null") {
              return <>{`null ${column}`}</>;
            }
            return <>missing type</>;
          })}
        </Grid>
        <Button
          onClick={() => {
            methods.handleSubmit(onValid)();
          }}
          formNoValidate
        >
          {submit ?? "Submit"}
        </Button>
      </Grid>
      {isError && (
        <>
          isError<> {`${error}`}</>
        </>
      )}
    </>
  );
};

export const Form = <TData extends FieldValues>({
  schema,
  serverUrl,
  order = [],
  ignore = [],
  onSubmit = undefined,
  preLoadedValues = {},
  rowNumber = undefined,
  displayText = {},
}: FormProps<TData>) => {
  const queryClient = new QueryClient();
  const methods = useForm();

  const { properties } = schema;

  idListSanityCheck("order", order, properties as object);
  idListSanityCheck("ignore", ignore, properties as object);
  idListSanityCheck(
    "preLoadedValues",
    Object.keys(preLoadedValues),
    properties as object
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SchemaFormContext.Provider
        value={{
          schema,
          serverUrl,
          displayText,
          order,
          ignore,
          // @ts-expect-error TODO: find appropriate types
          onSubmit,
          preLoadedValues,
          rowNumber,
        }}
      >
        <FormProvider {...methods}>
          <FormInternal />
        </FormProvider>
      </SchemaFormContext.Provider>
    </QueryClientProvider>
  );
};
