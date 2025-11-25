import { Field } from '@/components/ui/field';
import { Box, Card, Flex, Image } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useSchemaContext } from '../../useSchemaContext';
import { useFormI18n } from '../../utils/useFormI18n';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';

export const FileViewer = ({ column, schema, prefix }) => {
  const { watch } = useFormContext();
  const {
    required,
    gridColumn = 'span 12',
    gridRow = 'span 1',
  } = schema as CustomJSONSchema7;
  const isRequired = required?.some((columnId) => columnId === column);

  const currentFiles = (watch(column) ?? []) as File[];
  const colLabel = `${prefix}${column}`;
  const formI18n = useFormI18n(column, prefix, schema);
  return (
    <Field
      label={formI18n.label()}
      required={isRequired}
      gridColumn={gridColumn}
      gridRow={gridRow}
      display={'grid'}
      gridTemplateRows={'auto 1fr auto'}
      alignItems={'stretch'}
    >
      <Flex flexFlow={'column'} gap={1}>
        {currentFiles.map((file) => {
          return (
            <Card.Root variant={'subtle'} key={file.name}>
              <Card.Body
                gap="2"
                display={'flex'}
                flexFlow={'row'}
                alignItems={'center'}
                padding={'2'}
              >
                {file.type.startsWith('image/') && (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    boxSize="50px"
                    objectFit="cover"
                    borderRadius="md"
                    marginRight="2"
                  />
                )}
                <Box>{file.name}</Box>
              </Card.Body>
            </Card.Root>
          );
        })}
      </Flex>
    </Field>
  );
};
