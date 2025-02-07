import {
  NumberInputField as ChakraNumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../ui/field";
import { useSchemaContext } from "../useSchemaContext";
import { snakeToLabel } from "../utils/snakeToLabel";
import { CustomJSONSchema7 } from "./StringInputField";
export interface NumberInputFieldProps {
  column: string;
}

export const NumberInputField = ({ column }: NumberInputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { schema, displayText } = useSchemaContext();
  const { fieldRequired } = displayText;
  const { required } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  if (schema.properties == undefined) {
    throw new Error("schema properties when using String Input Field");
  }
  const { gridColumn, gridRow, title } = schema.properties[
    column
  ] as CustomJSONSchema7;
  return (
    <Field
      label={`${title ?? snakeToLabel(column)}`}
      required={isRequired}
      {...{ gridColumn, gridRow }}
    >
      <NumberInputRoot>
        <ChakraNumberInputField
          {...register(column, { required: isRequired })}
        />
      </NumberInputRoot>
      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {fieldRequired ?? "The field is requried"}
        </Text>
      )}
    </Field>
  );
};
