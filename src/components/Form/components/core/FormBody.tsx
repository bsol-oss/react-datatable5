import { Button, Flex, Grid } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useSchemaContext } from '../../useSchemaContext';
import { ColumnRenderer } from '../fields/ColumnRenderer';
import { SubmitButton } from './SubmitButton';

export const FormBody = () => {
  const {
    schema,
    order,
    ignore,
    include,
    isError,
    error,
    customErrorRenderer,
    displayConfig,
    formButtonLabels,
  } = useSchemaContext();
  const { showSubmitButton, showResetButton } = displayConfig;
  const methods = useFormContext();

  console.log(methods.formState.errors);

  const { properties } = schema;

  interface renderColumnsConfig {
    order: string[];
    keys: string[];
    ignore: string[];
    include: string[];
  }

  const renderColumns = ({
    order,
    keys,
    ignore,
    include,
  }: renderColumnsConfig) => {
    const included = include.length > 0 ? include : keys;
    const not_exist = included.filter(
      (columnA) => !order.some((columnB) => columnA === columnB)
    );
    const ordered = [...order, ...not_exist];
    const ignored = ordered.filter(
      (column) => !ignore.some((shouldIgnore) => column === shouldIgnore)
    );
    return ignored;
  };

  const ordered = renderColumns({
    order,
    keys: Object.keys(properties as object),
    ignore,
    include,
  });

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
      {isError && customErrorRenderer && customErrorRenderer(error)}
    </Flex>
  );
};
