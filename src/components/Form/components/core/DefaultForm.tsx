import { Grid } from '@chakra-ui/react';
import { FormBody } from './FormBody';
import { FormRoot, FormRootProps } from './FormRoot';
import { FieldValues } from 'react-hook-form';

export interface DefaultFormProps<TData extends FieldValues> {
  formConfig: Omit<FormRootProps<TData>, 'children'>;
}

export const DefaultForm = <TData extends FieldValues>({
  formConfig,
}: DefaultFormProps<TData>) => {
  return (
    <FormRoot {...formConfig}>
      <Grid gap="2">
        <FormBody />
      </Grid>
    </FormRoot>
  );
};
