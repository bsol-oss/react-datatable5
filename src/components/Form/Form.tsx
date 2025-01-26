import { Grid, Input } from "@chakra-ui/react";
import { JSONSchema7 } from "json-schema";
import { FormProvider, useForm } from "react-hook-form";
import { StringInputField } from "./components/StringInputField";
import { Button } from "../ui/button";
import { SchemaContext } from "./SchemaContext";
import { IdPicker } from "./components/IdPicker";

export interface FormProps {
  schema: JSONSchema7;
  ignore?: string[];
  onSubmit?: (data: any) => void;
}

export const Form = ({
  schema,
  ignore = [],
  onSubmit = () => {},
}: FormProps) => {
  const { properties } = schema;
  const methods = useForm();
  const onFormSubmit = async (data: any) => {
    onSubmit(data);
  };

  const fields = Object.entries(properties);

  return (
    <SchemaContext.Provider value={{ schema }}>
      <FormProvider {...methods}>
        <Grid gap={2}>
          {fields.map(([key, values]) => {
            if (
              ignore.some((column) => {
                return column == key;
              })
            ) {
              return <></>;
            }
            const { type, variant, table_ref } = values;
            if (type === "string") {
              if (variant === "id-picker") {
                return (
                  <IdPicker
                    key={`form-${key}`}
                    column={key}
                    table_ref={table_ref}
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
    </SchemaContext.Provider>
  );
};
