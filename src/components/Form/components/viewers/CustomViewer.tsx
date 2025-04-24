import { useFormContext } from "react-hook-form";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";

export interface DatePickerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const CustomViewer = ({ column, schema, prefix }: DatePickerProps) => {
  const formContext = useFormContext();
  const { inputViewerRender } = schema;
  return (
    inputViewerRender &&
    inputViewerRender({
      column,
      schema,
      prefix,
      formContext,
    })
  );
};
