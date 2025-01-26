import { Alert, Grid } from "@chakra-ui/react";
import { JSONSchema7 } from "json-schema";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StringInputField } from "./components/StringInputField";
import { Button } from "../ui/button";
import { SchemaFormContext } from "./SchemaFormContext";
import { IdPicker } from "./components/IdPicker";
import axios from "axios";
import { useState } from "react";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { snakeToLabel } from "./utils/snakeToLabel";
import { ImStarEmpty } from "react-icons/im";
export interface FormProps<TData> {
  schema: JSONSchema7;
  serverUrl: string;
  order?: string[];
  ignore?: string[];
  onSubmit?: SubmitHandler<TData>;
}

export const Form = <TData,>({
  schema,
  serverUrl,
  order = [],
  ignore = [],
  onSubmit = undefined,
}: FormProps<TData>) => {
  const { properties } = schema;
  const methods = useForm();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [validatedData, setValidatedData] = useState<boolean>(false);

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
  const defaultOnSubmit: SubmitHandler<any> = async (data) => {
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
      const { data } = await axios.request(options);
      onSubmitSuccess();
    } catch (error) {
      setIsError(true);
      console.error(error);
      onSubmitError();
    } finally {
      onAfterSubmit();
    }
  };
  const onFormSubmit = async (data: any) => {
    if (onSubmit === undefined) {
      defaultOnSubmit(data);
      return;
    }
    onSubmit(data);
  };

  const onValid = (data) => {
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

  const ordered = renderOrder(order, Object.keys(properties));
  const isEmpty = (value: string | undefined) => {
    if (value) {
      return value.length <= 0;
    }
    return true;
  };

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
  if (isConfirming) {
    return (
      <>
        isConfirming
        <DataListRoot orientation="horizontal">
          {ordered.map((column) => {
            const key = column;

            return (
              <DataListItem
                key={`form-${key}`}
                label={`${snakeToLabel(column)}`}
                {...getDataListProps(validatedData[column])}
              />
            );
          })}
          <Button
            onClick={() => {
              onFormSubmit(validatedData);
            }}
          >
            Confirm
          </Button>
        </DataListRoot>
      </>
    );
  }

  if (isSubmiting) {
    return <>isSubmiting</>;
  }

  if (isSuccess) {
    return <>isSuccess</>;
  }

  return (
    <SchemaFormContext.Provider value={{ schema, serverUrl }}>
      <FormProvider {...methods}>
        <Grid gap={2}>
          {ordered.map((column) => {
            const key = column;
            const values = properties[column];
            if (
              ignore.some((column) => {
                return column == key;
              })
            ) {
              return <></>;
            }
            const { type, variant, in_table, column_ref } = values;
            if (type === "string") {
              if (variant === "id-picker") {
                return (
                  <IdPicker
                    key={`form-${key}`}
                    column={key}
                    in_table={in_table}
                    column_ref={column_ref}
                  />
                );
              }
              return <StringInputField key={`form-${key}`} column={key} />;
            }

            return <></>;
          })}
          v
        </Grid>
        {isError && <>isError</>}
      </FormProvider>
    </SchemaFormContext.Provider>
  );
};

const clearEmptyString = (object: object) => {
  return Object.fromEntries(
    Object.entries(object).filter(([key, value]) => value !== "")
  );
};
