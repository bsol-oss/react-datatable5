import {
  NumberInputField as ChakraNumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../../ui/field";
import { useSchemaContext } from "../../useSchemaContext";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
import { removeIndex } from "../../utils/removeIndex";
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
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();
  const { translate } = useSchemaContext();
  const { required, gridColumn, gridRow } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const colLabel = `${prefix}${column}`;
  const value = watch(`${colLabel}`);
  return (
    <Field
      label={`${translate.t(removeIndex(`${colLabel}.fieldLabel`))}`}
      required={isRequired}
      {...{ gridColumn, gridRow }}
    >
      <NumberInputRoot>
        <ChakraNumberInputField
          required={isRequired}
          value={value}
          onChange={(event) => {
            setValue(`${colLabel}`, Number(event.target.value));
          }}
        />
      </NumberInputRoot>
      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {translate.t(removeIndex(`${colLabel}.fieldRequired`))}
        </Text>
      )}
    </Field>
  );
};
