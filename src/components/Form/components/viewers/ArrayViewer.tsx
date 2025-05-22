import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
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
  const {
    gridColumn = "span 12",
    gridRow = "span 1",
    required,
    items,
  } = schema;
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
        {`${translate.t(removeIndex(`${colLabel}.field_label`))}`}
        {isRequired && <span>*</span>}
      </Box>
      <Flex flexFlow={"column"} gap={1}>
        {values.map((field: any, index: number) => (
          <Flex
            key={`form-${prefix}${column}.${index}`}
            flexFlow={"column"}
            bgColor={{ base: "colorPalette.100", _dark: "colorPalette.900" }}
            p={"2"}
            borderRadius={"md"}
            borderWidth={"thin"}
            borderColor={{
              base: "colorPalette.200",
              _dark: "colorPalette.800",
            }}
          >
            <Grid
              gap="4"
              gridTemplateColumns={"repeat(12, 1fr)"}
              autoFlow={"row"}
            >
              <SchemaViewer
                {...{
                  column: `${index}`,
                  prefix: `${colLabel}.`,
                  // @ts-expect-error find suitable types
                  schema: { showLabel: false, ...(items ?? {}) },
                }}
              />
            </Grid>
          </Flex>
        ))}
      </Flex>
      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {translate.t(removeIndex(`${colLabel}.field_required`))}
        </Text>
      )}
    </Box>
  );
};
