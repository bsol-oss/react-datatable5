import { useFormContext } from "react-hook-form";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";

export interface DatePickerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const CustomInput = ({ column, schema, prefix }: DatePickerProps) => {
  const formContext = useFormContext();
  const { inputRender } = schema;
  return (
    inputRender &&
    inputRender({
      column,
      schema,
      prefix,
      formContext,
    })
  );
};
