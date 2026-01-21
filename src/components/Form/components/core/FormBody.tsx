import { Button, Flex, Grid } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useSchemaContext } from '../../useSchemaContext';
import { ColumnRenderer } from '../fields/ColumnRenderer';
import { SubmitButton } from './SubmitButton';

export const FormBody = () => {
  const { schema, displayConfig, formButtonLabels } = useSchemaContext();
  const { showSubmitButton, showResetButton } = displayConfig;
  const methods = useFormContext();

  console.log(methods.formState.errors);

  const { properties } = schema;

  const ordered = Object.keys(properties as object);

  return (
    <Flex flexFlow={'column'} gap="2">
      <Grid gap="4" gridTemplateColumns={'repeat(12, 1fr)'} autoFlow={'row'}>
        {ordered.map((column) => {
          return (
            <ColumnRenderer
              // @ts-expect-error find suitable types
              properties={properties}
              prefix={``}
              key={`form-input-${column}`}
              parentRequired={schema.required as string[] | undefined}
              {...{ column }}
            />
          );
        })}
      </Grid>
      <Flex justifyContent={'end'} gap="2">
        {showResetButton && (
          <Button
            onClick={() => {
              methods.reset();
            }}
            variant={'subtle'}
          >
            {formButtonLabels?.reset ?? 'Reset'}
          </Button>
        )}
        {showSubmitButton && <SubmitButton />}
      </Flex>
    </Flex>
  );
};
