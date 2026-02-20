import { Button, Flex, Grid } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useSchemaContext } from '../../useSchemaContext';
import { ColumnRenderer } from '../fields/ColumnRenderer';
import { SubmitButton } from './SubmitButton';

export const FormBody = () => {
  const { schema, displayConfig, formButtonLabels } = useSchemaContext();
  const { showSubmitButton, showResetButton } = displayConfig;
  const methods = useFormContext();

  console.log('errors', methods.formState.errors);

  const { properties } = schema;

  const ordered = Object.keys(properties as object);

  return (
    <Flex flexFlow={'column'} gap="2">
      <Grid gap="4" gridTemplateColumns={'repeat(12, 1fr)'} autoFlow={'row'}>
        {ordered.map((column) => {
          if (!properties) {
            console.error(
              'properties is undefined when using FormBody',
              schema
            );
            return null;
          }
          return (
            <ColumnRenderer
              properties={properties}
              prefix={``}
              key={`form-input-${column}`}
              parentRequired={schema.required as string[] | undefined}
              {...{ column }}
            />
          );
        })}
      </Grid>
      {(showResetButton || showSubmitButton) && (
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
      )}
    </Flex>
  );
};
