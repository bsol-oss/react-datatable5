import { Field } from "@/components/ui/field";
import { Box, Card, Flex, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { TiDeleteOutline } from "react-icons/ti";
import { useSchemaContext } from "../useSchemaContext";
import { FileDropzone } from "./FileDropzone";
import { CustomJSONSchema7 } from "./StringInputField";

export const FilePicker = ({ column }) => {
  const {
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();
  const { schema, translate } = useSchemaContext();
  const { required } = schema as CustomJSONSchema7;
  const isRequired = required?.some((columnId) => columnId === column);
  if (schema.properties == undefined) {
    throw new Error("schema properties when using String Input Field");
  }
  const { gridColumn, gridRow } = schema.properties[
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
      <Flex flexFlow={"column"} gap={1}>
        {currentFiles.map((file) => {
          return (
            <Card.Root variant={"subtle"} key={file.name}>
              <Card.Body
                gap="2"
                cursor={"pointer"}
                onClick={() => {
                  setValue(
                    column,
                    currentFiles.filter(({ name }) => {
                      return name !== file.name;
                    })
                  );
                }}
                display={"flex"}
                flexFlow={'row'}
                alignItems={'center'}
                padding={'2'}
              >
                <Box>{file.name}</Box>
                <TiDeleteOutline />
              </Card.Body>
            </Card.Root>
          );
        })}
      </Flex>
      {errors[`${column}`] && (
        <Text color={"red.400"}>{translate.t(`${column}.fieldRequired`)}</Text>
      )}
    </Field>
  );
};
