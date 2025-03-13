import { Grid } from "@chakra-ui/react";
import { FormBody } from "./FormBody";
import { FormTitle } from "./FormTitle";
import { FormRoot, FormRootProps } from "./FormRoot";
import { FieldValues } from "react-hook-form";

export interface DefaultFormProps<TData extends FieldValues> {
  formConfig: Omit<FormRootProps<TData>, "children">;
  showTitle?: boolean;
}

export const DefaultForm = <TData extends FieldValues>({
  formConfig,
  showTitle = true,
}: DefaultFormProps<TData>) => {
  return (
    <FormRoot {...formConfig}>
      <Grid gap="2">
        {showTitle && <FormTitle />}
        <FormBody />
      </Grid>
    </FormRoot>
  );
};
