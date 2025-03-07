import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useSchemaContext } from "../../useSchemaContext";
import { removeIndex } from "../../utils/removeIndex";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
import { SchemaViewer } from "./SchemaViewer";

export interface ArrayViewerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const ArrayViewer = ({ schema, column, prefix }: ArrayViewerProps) => {
  const { gridRow, gridColumn = "1/span 12", required, items } = schema;
  const { translate } = useSchemaContext();
  const colLabel = `${prefix}${column}`;
  const isRequired = required?.some((columnId) => columnId === column);
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const values = watch(colLabel) ?? [];

  return (
    <Box {...{ gridRow, gridColumn }}>
      <Box as="label" gridColumn={"1/span12"}>
        {`${translate.t(removeIndex(`${colLabel}.fieldLabel`))}`}
        {isRequired && <span>*</span>}
      </Box>
      {values.map((field, index) => (
        <Flex key={`form-${prefix}${column}.${index}`} flexFlow={"column"}>
          <Grid
            gap="4"
            padding={"4"}
            gridTemplateColumns={"repeat(12, 1fr)"}
            gridTemplateRows={`repeat("auto-fit", auto)`}
          >
            {/* @ts-expect-error find suitable types*/}
            <SchemaViewer
              {...{
                column: `${index}`,
                prefix: `${colLabel}.`,
                schema: items,
              }}
            />
          </Grid>
        </Flex>
      ))}
      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {translate.t(removeIndex(`${colLabel}.fieldRequired`))}
        </Text>
      )}
    </Box>
  );
};
