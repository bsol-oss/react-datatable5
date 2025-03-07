import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { useSchemaContext } from "../useSchemaContext";
import { CustomJSONSchema7 } from "./StringInputField";
import { useFieldArray, useFormContext } from "react-hook-form";
import { SchemaRenderer } from "./SchemaRenderer";

export interface ArrayRendererProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const ArrayRenderer = ({
  schema,
  column,
  prefix,
}: ArrayRendererProps) => {
  const { gridRow, gridColumn = "1/span 12", required, items } = schema;
  const { translate } = useSchemaContext();
  const colLabel = `${prefix}${column}`;
  const isRequired = required?.some((columnId) => columnId === column);
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "test", // unique name for your Field Array
    }
  );

  return (
    <Box {...{ gridRow, gridColumn }}>
      <Box as="label" gridColumn={"1/span12"}>
        {`${translate.t(`${colLabel}.fieldLabel`)}`}
        {isRequired && <span>*</span>}
      </Box>
      {fields.map((field, index) => (
        <Grid
          gap="4"
          padding={"4"}
          gridTemplateColumns={"repeat(12, 1fr)"}
          gridTemplateRows={`repeat("auto-fit", auto)`}
        >
          {/* @ts-expect-error find suitable types*/}
          <SchemaRenderer
            key={`form-${column}`}
            {...{
              column: `${column}.${index}`,
              prefix: `${prefix}`,
              schema: items,
            }}
          />
        </Grid>
      ))}
      <Button
        onClick={() => {
          append({});
        }}
      >
        {translate.t(`${colLabel}.add`)}
      </Button>

      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {translate.t(`${colLabel}.fieldRequired`)}
        </Text>
      )}
    </Box>
  );
};
