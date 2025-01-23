import { Grid, Input } from "@chakra-ui/react";
import { Field } from "../ui/field";

const snakeToLabel = (str: string): string => {
  return str
    .split("_") // Split by underscore
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" "); // Join with space
};

export const StringInputField = ({ column, values }) => {
  return (
    <>
      <Field label={`${snakeToLabel(column)}`}>
        <Input />
      </Field>
    </>
  );
};

export interface FormProps {
  schema: object;
  ignore?: string[];
}

export const Form = ({ schema, ignore = [] }: FormProps) => {
  const { properties } = schema;

  const fields = Object.entries(properties);

  return (
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
        console.log(type, values, key, "osdkap");
        if (type === "string") {
          return <StringInputField column={key} values={values} />;
        }
        return <></>;
      })}
    </Grid>
  );
};
