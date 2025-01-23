import { Grid, Input } from "@chakra-ui/react";
import { JSONSchema7 } from "json-schema";
import { FormProvider, useForm } from "react-hook-form";
import { StringInputField } from "./components/StringInputField";
import { Button } from "../ui/button";
import axios from "axios";
import { SchemaContext } from "./SchemaContext";

export interface FormProps {
  schema: JSONSchema7;
  ignore?: string[];
}

export const Form = ({ schema, ignore = [] }: FormProps) => {
  const { properties } = schema;
  const methods = useForm();
  const onSubmit = async (data: any) => {
    console.log(data);
    const options = {
      method: "POST",
      url: "http://localhost:8081/api/g/core_addresses",
      headers: {
        Apikey: "YOUR_SECRET_TOKEN",
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fields = Object.entries(properties);

  return (
    <SchemaContext.Provider value={{schema}}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid templateColumns={"1fr 1fr"} gap={2}>
            {fields.map(([key, values]) => {
              if (
                ignore.some((column) => {
                  return column == key;
                })
              ) {
                return <></>;
              }
              const { type } = values;
              if (type === "string") {
                return <StringInputField column={key} />;
              }
              return <></>;
            })}
            <Button as={Input} type="submit" />
          </Grid>
        </form>
      </FormProvider>
    </SchemaContext.Provider>
  );
};
