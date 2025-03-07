import { Box, Grid,Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../useSchemaContext";
import { ColumnRenderer } from "./ColumnRenderer";
import { CustomJSONSchema7 } from "./StringInputField";

export interface ObjectInputProps {
  schema: CustomJSONSchema7;
  column: string;
  prefix: string;
}

export const ObjectInput = ({ schema, column, prefix }: ObjectInputProps) => {
  const { properties, gridRow, gridColumn = "1/span 12", required } = schema;
  const { translate } = useSchemaContext();
  const colLabel = `${prefix}${column}`;
  const isRequired = required?.some((columnId) => columnId === column);
  const {
    watch,
    formState: { errors },
    setValue,
    control,
  } = useFormContext();
  if (properties === undefined) {
    throw new Error(`properties is undefined when using ObjectInput`);
  }
  return (
    <Box {...{ gridRow, gridColumn }}>
      <Box as="label" gridColumn={"1/span12"}>
        {`${translate.t(`${colLabel}.fieldLabel`)}`}
        {isRequired && <span>*</span>}
      </Box>
      <Grid
        gap="4"
        padding={"4"}
        gridTemplateColumns={"repeat(12, 1fr)"}
        gridTemplateRows={`repeat("auto-fit", auto)`}
      >
        {Object.keys(properties ?? {}).map((key) => {
          console.log(properties, key, "gkor");
          return (
            // @ts-expect-error find suitable types
            <ColumnRenderer
              key={`form-${column}`}
              {...{
                column: `${key}`,
                prefix: `${prefix}${column}.`,
                properties,
              }}
            />
          );
        })}
      </Grid>
      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {translate.t(`${colLabel}.fieldRequired`)}
        </Text>
      )}
    </Box>
  );
};
