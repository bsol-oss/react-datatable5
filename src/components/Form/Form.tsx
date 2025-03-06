import { SchemaFormContext } from "@/components/Form/SchemaFormContext";
import { IdViewer } from "@/components/Form/components/IdViewer";
import {
  CustomJSONSchema7,
  ForeignKeyProps
} from "@/components/Form/components/StringInputField";
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
import axios, { AxiosRequestConfig } from "axios";
import dayjs from "dayjs";
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
import { RecordDisplay } from "../DataTable/components/RecordDisplay";
import { ColumnRenderer } from "./components/ColumnRenderer";

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
    onSubmit,
    rowNumber,
    idMap,
    translate,
    requestOptions,
  } = useSchemaContext();

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
        value: `<${translate.t("empty") ?? "Empty"}>`,
        color: "gray.400",
      };
    }
    return {
      value: value,
    };
  };

  if (isSuccess) {
    return (
      <Grid gap={2}>
        <Heading>{translate.t("title")}</Heading>
        <Alert.Root status="success">
          <Alert.Indicator />
          <Alert.Title>{translate.t("submitSuccess")}</Alert.Title>
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
          {translate.t("submitAgain")}
        </Button>
      </Grid>
    );
  }
  if (isConfirming) {
    return (
      <Grid gap={2}>
        <Heading> {translate.t("title")}</Heading>
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

            const { type, variant, gridColumn, gridRow, foreign_key } =
              values as CustomJSONSchema7Definition;
            if (type === "string") {
              if (variant === "id-picker") {
                idPickerSanityCheck(column, foreign_key);
                return (
                  <IdViewer
                    key={`form-${key}`}
                    value={(validatedData ?? {})[column]}
                    {...{
                      column,
                      dataListItemProps: { gridColumn, gridRow },
                    }}
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
                      label={`${translate.t(`${column}.fieldLabel`)}`}
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
                    label={`${translate.t(`${column}.fieldLabel`)}`}
                    {...getDataListProps(date)}
                  />
                );
              }
              return (
                <DataListItem
                  gridColumn={gridColumn ?? "span 4"}
                  gridRow={gridRow ?? "span 4"}
                  key={`form-${key}`}
                  label={`${translate.t(`${column}.fieldLabel`)}`}
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
                    label={`${translate.t(`${column}.fieldLabel`)}`}
                    {...getDataListProps(undefined)}
                  />
                );
              }
              return (
                <Flex
                  flexFlow={"column"}
                  gap={2}
                  key={`form-${key}`}
                  gridColumn={gridColumn ?? "span 4"}
                  gridRow={gridRow ?? "span 1"}
                >
                  <Text>{translate.t(`input.${column}`)}</Text>
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
                  label={`${translate.t(`${column}.fieldLabel`)}`}
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
                  label={`${translate.t(`${column}.fieldLabel`)}`}
                  {...getDataListProps((validatedData ?? {})[column])}
                />
              );
            }
            if (type === "array") {
              if (variant === "tag-picker") {
                const value = (validatedData ?? {})[column];

                return (
                  <DataListItem
                    gridColumn={gridColumn ?? "span 4"}
                    gridRow={gridRow ?? "span 1"}
                    key={`form-${key}`}
                    label={`${translate.t(`${column}.fieldLabel`)}`}
                    {...getDataListProps(JSON.stringify(value))}
                  />
                );
              }
              if (variant === "file-picker") {
                const fileNames = (
                  ((validatedData ?? {})[column] ?? []) as File[]
                ).map((file) => {
                  return file.name;
                });
                return (
                  <DataListItem
                    gridColumn={gridColumn ?? "span 4"}
                    gridRow={gridRow ?? "span 4"}
                    key={`form-${key}`}
                    label={`${translate.t(`${column}.fieldLabel`)}`}
                    {...getDataListProps(JSON.stringify(fileNames))}
                  />
                );
              }
              if (variant === "id-picker") {
                const value = (validatedData ?? {})[
                  column
                ] as unknown as string[];

                if (schema.properties == undefined) {
                  throw new Error("schema properties when using DatePicker");
                }
                const { foreign_key } = schema.properties[
                  column
                ] as CustomJSONSchema7;
                if (foreign_key === undefined) {
                  throw new Error("foreign_key when variant is id-picker");
                }
                const { display_column } = foreign_key;
                const mapped = value.map((item) => {
                  return idMap[item][display_column];
                });
                return (
                  <Grid
                    flexFlow={"column"}
                    key={`form-${key}`}
                    {...{
                      gridColumn,
                      gridRow,
                    }}
                  >
                    <Text>{translate.t(`input.${column}`)}</Text>
                    <RecordDisplay object={mapped} />
                  </Grid>
                );
              }
              const objectString = JSON.stringify(
                (validatedData ?? {})[column]
              );
              return (
                <DataListItem
                  gridColumn={gridColumn ?? "span 4"}
                  gridRow={gridRow ?? "span 4"}
                  key={`form-${key}`}
                  label={`${translate.t(`${column}.fieldLabel`)}`}
                  {...getDataListProps(objectString)}
                />
              );
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
          {translate.t("confirm")}
        </Button>
        <Button
          onClick={() => {
            setIsConfirming(false);
          }}
          variant={"subtle"}
        >
          {translate.t("cancel")}
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
        <Heading> {translate.t("title")}</Heading>
        <Grid
          gap={4}
          gridTemplateColumns={"repeat(12, 1fr)"}
          gridTemplateRows={`repeat(${rowNumber ?? "auto-fit"}, auto)`}
        >
          {ordered.map((column) => {
            console.log(properties,column,"hkltrp")
          
            const shouldIgnore = ignore.some((column) => {
              return column == column;
            });
            if (shouldIgnore) {
              return <></>;
            }
            return <ColumnRenderer key={`form-${column}`} {...{ column }} />;
          })}
        </Grid>
        <Button
          onClick={() => {
            methods.handleSubmit(onValid)();
          }}
          formNoValidate
        >
          {translate.t("submit")}
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
  idMap,
  setIdMap,
  form,
  serverUrl,
  translate,
  order = [],
  ignore = [],
  onSubmit = undefined,
  rowNumber = undefined,
  requestOptions = {},
}: FormProps<TData>) => {
  const { properties } = schema;

  idListSanityCheck("order", order, properties as object);
  idListSanityCheck("ignore", ignore, properties as object);

  return (
    <SchemaFormContext.Provider
      value={{
        schema,
        serverUrl,
        order,
        ignore,
        // @ts-expect-error TODO: find appropriate types
        onSubmit,
        rowNumber,
        idMap,
        setIdMap,
        translate,
        requestOptions,
      }}
    >
      <FormProvider {...form}>
        <FormInternal />
      </FormProvider>
    </SchemaFormContext.Provider>
  );
};
