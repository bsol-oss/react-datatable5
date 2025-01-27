import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { Box, Center, Grid, Heading, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { JSONSchema7 } from "json-schema";
import { useEffect, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Button } from "../ui/button";
import { SchemaFormContext } from "./SchemaFormContext";
import { IdPicker } from "./components/IdPicker";
import { StringInputField } from "./components/StringInputField";
import { snakeToLabel } from "./utils/snakeToLabel";
import { clearEmptyString } from "./utils/clearEmptyString";

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

export const Form = <TData extends FieldValues>({
  schema,
  serverUrl,
  title = "",
  order = [],
  ignore = [],
  onSubmit = undefined,
  preLoadedValues = {},
}: FormProps<TData>) => {
  const { properties } = schema;
  idListSanityCheck("order", order, properties as object);
  idListSanityCheck("ignore", ignore, properties as object);

  const methods = useForm();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [validatedData, setValidatedData] = useState();
  const [error, setError] = useState<unknown>();

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
      <>
        isSuccess
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
      </>
    );
  }
  if (isConfirming) {
    return (
      <Grid>
        <Heading>Confirmation</Heading>
        <DataListRoot orientation="horizontal">
          {ordered.map((column) => {
            const key = column;

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
        <Button
          onClick={() => {
            setIsConfirming(false);
          }}
        >
          Back
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
            isError<> {`${error}`}</>
          </>
        )}
      </Grid>
    );
  }
  console.log(properties, ordered);

  return (
    <SchemaFormContext.Provider value={{ schema, serverUrl }}>
      <FormProvider {...methods}>
        <Grid gap={2}>
          <Heading>{getTitle()}</Heading>
          {ordered.map((column) => {
            if (properties === undefined) {
              return <></>;
            }
            const key = column;
            const values = properties[column];
            if (
              ignore.some((column) => {
                return column == key;
              })
            ) {
              return <></>;
            }
            //@ts-expect-error TODO: add more fields to support form-creation
            const { type, variant, in_table, column_ref, display_column } =
              values;
            if (type === "string") {
              if (variant === "id-picker") {
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

            return <></>;
          })}
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
      </FormProvider>
    </SchemaFormContext.Provider>
  );
};
