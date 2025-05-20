import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import { useSchemaContext } from "../../useSchemaContext";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
import { useFieldArray, useFormContext } from "react-hook-form";
import { SchemaRenderer } from "./SchemaRenderer";
import { removeIndex } from "../../utils/removeIndex";

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
  // @ts-expect-error TODO: find suitable types
  const { type } = items;

  const { translate } = useSchemaContext();
  const colLabel = `${prefix}${column}`;
  const isRequired = required?.some((columnId) => columnId === column);
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const fields = (watch(colLabel) ?? []) as any[];
  return (
    <Box {...{ gridRow, gridColumn }}>
      <Box as="label" gridColumn={"1/span12"}>
        {`${translate.t(removeIndex(`${colLabel}.field_label`))}`}
        {isRequired && <span>*</span>}
      </Box>
      {fields.map((field, index) => (
        <Flex key={`${colLabel}.${index}`} flexFlow={"column"}>
          <Grid
            padding={"4"}
            gridTemplateColumns={"repeat(12, 1fr)"}
            gridAutoRows={`repeat("auto-fit", auto)`}
          >
            {/* @ts-expect-error find suitable types*/}
            <SchemaRenderer
              {...{
                column: `${index}`,
                prefix: `${colLabel}.`,
                schema: items,
              }}
            />
          </Grid>
          <Flex justifyContent={"end"}>
            <Button
              variant={"ghost"}
              onClick={() => {
                setValue(
                  colLabel,
                  fields.filter((_, curIndex) => {
                    return curIndex === index;
                  })
                );
              }}
            >
              {translate.t(removeIndex(`${colLabel}.remove`))}
            </Button>
          </Flex>
        </Flex>
      ))}
      <Flex>
        <Button
          onClick={() => {
            if (type === "number") {
              setValue(colLabel, [...fields, 0]);
              return;
            }
            if (type === "string") {
              setValue(colLabel, [...fields, ""]);
              return;
            }
            if (type === "boolean") {
              setValue(colLabel, [...fields, false]);
              return;
            }
            setValue(colLabel, [...fields, {}]);
          }}
        >
          {translate.t(removeIndex(`${colLabel}.add`))}
        </Button>
      </Flex>

      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {translate.t(removeIndex(`${colLabel}.field_required`))}
        </Text>
      )}
    </Box>
  );
};
