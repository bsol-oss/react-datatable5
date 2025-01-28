import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import {
  Alert,
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { JSONSchema7 } from "json-schema";
import { useEffect, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "../ui/button";
import { SchemaFormContext } from "./SchemaFormContext";
import { IdPicker } from "./components/IdPicker";
import { IdViewer } from "./components/IdViewer";
import { StringInputField } from "./components/StringInputField";
import { useSchemaContext } from "./useSchemaContext";
import { clearEmptyString } from "./utils/clearEmptyString";
import { snakeToLabel } from "./utils/snakeToLabel";
import { NumberInputField } from "./components/NumberInputField";

export interface FormProps<TData extends FieldValues> {
  schema: JSONSchema7;
  serverUrl: string;
  title?: string;
  order?: string[];
  ignore?: string[];
  onSubmit?: SubmitHandler<TData>;
  preLoadedValues?: object;
}

const idListSanityCheck = (
  param: string,
  idList: string[],
  properties: object
) => {
  const allKeyExists = idList.every((key) =>
    Object.keys(properties as object).some((column) => column == key)
  );

  if (!allKeyExists) {
    const wrongKey = idList.find(
      (key) =>
        !Object.keys(properties as object).some((column) => column == key)
    );
    throw new Error(
      `The key ${wrongKey} in ${param} does not exist in schema.`
    );
  }
};

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
  const { schema, serverUrl, title, order, ignore, onSubmit, preLoadedValues } =
    useSchemaContext();
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
  const defaultOnSubmit: SubmitHandler<TData> = async (data) => {
    const options = {
      method: "POST",
      url: `${serverUrl}/api/g/${schema.title}`,
      headers: {
        Apikey: "YOUR_SECRET_TOKEN",
        "Content-Type": "application/json",
      },
      data: clearEmptyString(data),
    };

    try {
      onBeforeSubmit();
      await axios.request(options);
      onSubmitSuccess();
    } catch (error) {
      setIsError(true);
      setError(error);
      onSubmitError();
    } finally {
      onAfterSubmit();
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFormSubmit = async (data: any) => {
    if (onSubmit === undefined) {
      defaultOnSubmit(data);
      return;
    }
    onSubmit(data);
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
        value: "<empty>",
        color: "gray.400",
      };
    }
    return {
      value: value,
    };
  };

  const getTitle = () => {
    if (title.length <= 0) {
      return snakeToLabel(schema.title ?? "");
    }

    return title;
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
        <Heading>{getTitle()}</Heading>
        <Alert.Root status="success">
          <Alert.Indicator />
          <Alert.Title>Data uploaded to the server. Fire on!</Alert.Title>
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
          Submit New
        </Button>
      </Grid>
    );
  }
  if (isConfirming) {
    return (
      <Grid gap={2}>
        <Heading>{getTitle()}</Heading>
        <Flex alignItems={"center"} gap={2}>
          <Button
            onClick={() => {
              setIsConfirming(false);
            }}
            variant={"ghost"}
          >
            <BiLeftArrowAlt />
          </Button>
          <Heading>Confirmation</Heading>
        </Flex>
        <DataListRoot
          orientation="horizontal"
          gap={4}
          padding={4}
          display={"grid"}
          gridTemplateColumns={"repeat(auto-fit, minmax(20rem, 1fr))"}
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
                  <IdViewer
                    key={`form-${key}`}
                    value={(validatedData ?? {})[column]}
                    {...{ in_table, column_ref, display_column, column }}
                  />
                );
              }
            }
            return (
              <DataListItem
                key={`form-${key}`}
                label={`${snakeToLabel(column)}`}
                {...getDataListProps((validatedData ?? {})[column])}
              />
            );
          })}
        </DataListRoot>
        <Button
          onClick={() => {
            onFormSubmit(validatedData);
          }}
        >
          Confirm
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
        <Heading>{getTitle()}</Heading>
        <Grid
          gap={4}
          padding={4}
          gridTemplateColumns={"repeat(auto-fit, minmax(20rem, 1fr))"}
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
              return <StringInputField key={`form-${key}`} column={key} />;
            }
            if (type === "number" || type === "integer") {
              return <NumberInputField key={`form-${key}`} column={key} />;
            }
            if (type === "boolean") {
              return <>{`boolean ${column}`}</>;
            }
            if (type === "object") {
              return <>{`object ${column}`}</>;
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
          Submit
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
  title = "",
  order = [],
  ignore = [],
  onSubmit = undefined,
  preLoadedValues = {},
}: FormProps<TData>) => {
  const queryClient = new QueryClient();
  const methods = useForm();

  const { properties } = schema;

  idListSanityCheck("order", order, properties as object);
  idListSanityCheck("ignore", ignore, properties as object);

  return (
    <QueryClientProvider client={queryClient}>
      <SchemaFormContext.Provider
        value={{
          schema,
          serverUrl,
          title,
          order,
          ignore,
          // @ts-expect-error TODO: find appropriate types
          onSubmit,
          preLoadedValues,
        }}
      >
        <FormProvider {...methods}>
          <FormInternal />
        </FormProvider>
      </SchemaFormContext.Provider>
    </QueryClientProvider>
  );
};
