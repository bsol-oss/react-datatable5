import { Field } from "@/components/ui/field";
import { Box, Card, Flex, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { TiDeleteOutline } from "react-icons/ti";
import { useSchemaContext } from "../useSchemaContext";
import { FileDropzone } from "./FileDropzone";
import { CustomJSONSchema7 } from "./StringInputField";

export const FilePicker = ({ column, schema, prefix }) => {
  const {
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();
  const { translate } = useSchemaContext();
  const { required, gridColumn, gridRow } = schema as CustomJSONSchema7;
  const isRequired = required?.some((columnId) => columnId === column);

  const currentFiles = (watch(column) ?? []) as File[];
const col = `${prefix}${column}`
  return (
    <Field
      label={`${translate.t(`${col}.fieldLabel`)}`}
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
          setValue(col, [...currentFiles, ...newFiles]);
        }}
        placeholder={translate.t(`${col}.fileDropzone`)}
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
                flexFlow={"row"}
                alignItems={"center"}
                padding={"2"}
              >
                <Box>{file.name}</Box>
                <TiDeleteOutline />
              </Card.Body>
            </Card.Root>
          );
        })}
      </Flex>
      {errors[`${col}`] && (
        <Text color={"red.400"}>{translate.t(`${col}.fieldRequired`)}</Text>
      )}
    </Field>
  );
};
