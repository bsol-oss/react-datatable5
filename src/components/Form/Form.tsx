import { Grid } from "@chakra-ui/react";
import { JSONSchema7 } from "json-schema";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StringInputField } from "./components/StringInputField";
import { Button } from "../ui/button";
import { SchemaFormContext } from "./SchemaFormContext";
import { IdPicker } from "./components/IdPicker";
import axios from "axios";

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

  const defaultOnSubmit: SubmitHandler<any> = async (data, serverUrl) => {
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
      const { data } = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const onFormSubmit = async (data: any) => {
    if (onSubmit === undefined) {
      defaultOnSubmit(data);
      return;
    }
    onSubmit(data);
  };

  const renderOrder = (order: string[], origin_list: string[]) => {
    const not_exist = origin_list.filter(
      (columnA) => !order.some((columnB) => columnA === columnB)
    );
    return [...order, ...not_exist];
  };

  const ordered = renderOrder(order, Object.keys(properties));

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
          <Button
            onClick={() => {
              methods.handleSubmit(onFormSubmit)();
            }}
            formNoValidate
          >
            Submit
          </Button>
        </Grid>
      </FormProvider>
    </SchemaFormContext.Provider>
  );
};

const clearEmptyString = (object: object) => {
  return Object.fromEntries(
    Object.entries(object).filter(([key, value]) => value !== "")
  );
};
