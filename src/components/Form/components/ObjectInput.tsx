import { Box, Grid } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

import { ColumnRenderer } from "./ColumnRenderer";
import { CustomJSONSchema7 } from "./StringInputField";
import { useSchemaContext } from "../useSchemaContext";

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
    </Box>
  );
};
