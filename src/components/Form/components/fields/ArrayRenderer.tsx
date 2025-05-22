import { Box, Button, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import { useSchemaContext } from "../../useSchemaContext";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
import { useFieldArray, useFormContext } from "react-hook-form";
import { SchemaRenderer } from "./SchemaRenderer";
import { removeIndex } from "../../utils/removeIndex";
import { TiTrash } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import { CgTrash } from "react-icons/cg";

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
    <Flex {...{ gridRow, gridColumn }} flexFlow={"column"} gap={2}>
      <Box as="label">
        {`${translate.t(removeIndex(`${colLabel}.field_label`))}`}
        {isRequired && <span>*</span>}
      </Box>
      <Flex flexFlow={"column"} gap={2} >
        {fields.map((field, index) => (
          <Grid
            key={`${colLabel}.${index}`}
            gridTemplateColumns={'1fr auto'}
            gap={2}
            bgColor={{ base: "colorPalette.100", _dark: "colorPalette.900" }}
            p={2}
            borderRadius={4}
            borderWidth={1}
            borderColor={{
              base: "colorPalette.200",
              _dark: "colorPalette.800",
            }}
          >
            <Grid gridTemplateColumns={"repeat(12, 1fr)"} autoFlow={"row"}>
              <SchemaRenderer
                {...{
                  column: `${index}`,
                  prefix: `${colLabel}.`,
                  // @ts-expect-error find suitable types
                  schema: { showTitle: false, ...(items ?? {}) },
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
                      return curIndex !== index;
                    })
                  );
                }}
              >
                <Icon>
                  <CgTrash />
                </Icon>
              </Button>
            </Flex>
          </Grid>
        ))}
      </Flex>
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
    </Flex>
  );
};
