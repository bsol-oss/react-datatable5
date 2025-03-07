import {
  NumberInputField as ChakraNumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../../ui/field";
import { useSchemaContext } from "../../useSchemaContext";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
export interface NumberInputFieldProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const NumberInputField = ({
  schema,
  column,
  prefix,
}: NumberInputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { translate } = useSchemaContext();
  const { required, gridColumn, gridRow } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;

  return (
    <Field
      label={`${translate.t(`${colLabel}.fieldLabel`)}`}
      required={isRequired}
      {...{ gridColumn, gridRow }}
    >
      <NumberInputRoot>
        <ChakraNumberInputField
          {...register(`${colLabel}`, { required: isRequired })}
        />
      </NumberInputRoot>
      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {translate.t(`${colLabel}.fieldRequired`)}
        </Text>
      )}
    </Field>
  );
};
