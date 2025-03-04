import { Field } from "@/components/ui/field";
import { Flex, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../useSchemaContext";
import { snakeToLabel } from "../utils/snakeToLabel";
import { FileDropzone } from "./FileDropzone";
import { CustomJSONSchema7 } from "./StringInputField";
import { Tag } from "@/components/ui/tag";

export const FilePicker = ({ column }) => {
  const {
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();
  const { schema, translate } = useSchemaContext();
  const { fieldRequired } = displayText;
  const { required } = schema as CustomJSONSchema7;
  const isRequired = required?.some((columnId) => columnId === column);
  if (schema.properties == undefined) {
    throw new Error("schema properties when using String Input Field");
  }
  const { gridColumn, gridRow, title } = schema.properties[
    column
  ] as CustomJSONSchema7;
  const currentFiles = (watch(column) ?? []) as File[];

  return (
    <Field
      label={`${translate.t(`${column}.fieldLabel`)}`}
      required={isRequired}
      gridColumn={gridColumn ?? "span 4"}
      gridRow={gridRow ?? "span 1"}
      display={"grid"}
      gridTemplateRows={"auto 1fr auto"}
      alignItems={"stretch"}
    >
      <FileDropzone
        onDrop={({ files }) => {
          const newFiles = files.filter(
            ({ name }) => !currentFiles.some((cur) => cur.name === name)
          );
          setValue(column, [...currentFiles, ...newFiles]);
        }}
        placeholder={translate.t(`${column}.fileDropzone`)}
      />
      <Flex flexFlow={"wrap"} alignItems={"start"} gap={1}>
        {currentFiles.map((file) => {
          return (
            <Tag
              cursor={"pointer"}
              onClick={() => {
                setValue(
                  column,
                  currentFiles.filter(({ name }) => {
                    return name !== file.name;
                  })
                );
              }}
            >
              {file.name}
            </Tag>
          );
        })}
      </Flex>
      {errors[`${column}`] && (
        <Text color={"red.400"}>{translate.t(`${column}.fieldRequired`)}</Text>
      )}
    </Field>
  );
};
