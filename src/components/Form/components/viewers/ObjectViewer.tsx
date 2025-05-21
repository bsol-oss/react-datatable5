import { Box, Grid, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../../useSchemaContext";
import { ColumnViewer } from "./ColumnViewer";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
import { removeIndex } from "../../utils/removeIndex";

export interface ObjectViewerProps {
  schema: CustomJSONSchema7;
  column: string;
  prefix: string;
}

export const ObjectViewer = ({ schema, column, prefix }: ObjectViewerProps) => {
  const {
    properties,
    gridColumn = "span 12",
    gridRow = "span 1",
    required,
  } = schema;
  const { translate } = useSchemaContext();
  const colLabel = `${prefix}${column}`;
  const isRequired = required?.some((columnId) => columnId === column);
  const {
    formState: { errors },
  } = useFormContext();
  if (properties === undefined) {
    throw new Error(`properties is undefined when using ObjectInput`);
  }
  return (
    <Box {...{ gridRow, gridColumn }}>
      <Box as="label">
        {`${translate.t(removeIndex(`${colLabel}.field_label`))}`}
        {isRequired && <span>*</span>}
      </Box>
      <Grid
        gap="4"
        padding={"4"}
        gridTemplateColumns={"repeat(12, 1fr)"}
        autoFlow={"row"}
      >
        {Object.keys(properties ?? {}).map((key) => {
          return (
            // @ts-expect-error find suitable types
            <ColumnViewer
              key={`form-objectviewer-${colLabel}-${key}`}
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
          {translate.t(removeIndex(`${colLabel}.field_required`))}
        </Text>
      )}
    </Box>
  );
};
