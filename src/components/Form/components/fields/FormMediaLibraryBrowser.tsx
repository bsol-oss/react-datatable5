import { Field } from '@/components/ui/field';
import { Box, Button, Card, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { TiDeleteOutline } from 'react-icons/ti';
import { LuFile, LuImage } from 'react-icons/lu';
import { useState } from 'react';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { useFormI18n } from '../../utils/useFormI18n';
import { useSchemaContext } from '../../useSchemaContext';
import { InputDefaultProps } from './types';
import { FilePickerDialog } from './FilePicker';

export const FormMediaLibraryBrowser = ({
  column,
  schema,
  prefix,
}: InputDefaultProps) => {
  const {
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();
  const { filePickerLabels } = useSchemaContext();
  const formI18n = useFormI18n(column, prefix);
  const {
    required,
    gridColumn = 'span 12',
    gridRow = 'span 1',
    filePicker,
    type,
  } = schema as CustomJSONSchema7;
  const isRequired = required?.some((columnId) => columnId === column);

  const isSingleSelect = type === 'string';

  const currentValue = watch(column) ?? (isSingleSelect ? '' : []);

  // Handle string IDs only
  const currentFileIds: string[] = isSingleSelect
    ? currentValue
      ? [currentValue as string]
      : []
    : Array.isArray(currentValue)
      ? (currentValue as string[])
      : [];

  const colLabel = formI18n.colLabel;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [failedImageIds, setFailedImageIds] = useState<Set<string>>(new Set());

  const {
    onFetchFiles,
    filterImageOnly = false,
    enableUpload = false,
    onUploadFile,
  } = filePicker || {};

  if (!onFetchFiles) {
    return (
      <Field
        label={formI18n.label()}
        required={isRequired}
        alignItems={'stretch'}
        {...{
          gridColumn,
          gridRow,
        }}
        errorText={errors[`${colLabel}`] ? formI18n.required() : undefined}
        invalid={!!errors[colLabel]}
      >
        <Text color="fg.muted">
          Media library browser requires onFetchFiles
        </Text>
      </Field>
    );
  }

  const handleImageError = (fileIdentifier: string) => {
    setFailedImageIds((prev) => new Set(prev).add(fileIdentifier));
  };

  const handleMediaLibrarySelect = (fileId: string) => {
    if (isSingleSelect) {
      setValue(colLabel, fileId);
    } else {
      const newFileIds = [...currentFileIds, fileId];
      setValue(colLabel, newFileIds);
    }
  };

  const handleRemove = (index: number) => {
    if (isSingleSelect) {
      setValue(colLabel, '');
    } else {
      const newFileIds = currentFileIds.filter((_, i) => i !== index);
      setValue(colLabel, newFileIds);
    }
  };

  const isImageId = (fileId: string): boolean => {
    return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(fileId);
  };

  return (
    <Field
      label={formI18n.label()}
      required={isRequired}
      alignItems={'stretch'}
      {...{
        gridColumn,
        gridRow,
      }}
      errorText={errors[`${colLabel}`] ? formI18n.required() : undefined}
      invalid={!!errors[colLabel]}
    >
      <VStack align="stretch" gap={2}>
        <Button
          variant="outline"
          onClick={() => setDialogOpen(true)}
          borderColor="border.default"
          bg="bg.panel"
          _hover={{ bg: 'bg.muted' }}
        >
          {filePickerLabels?.browseLibrary ??
            formI18n.t('browse_library') ??
            'Browse from Library'}
        </Button>
      </VStack>

      <FilePickerDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSelect={handleMediaLibrarySelect}
        title={
          filePickerLabels?.dialogTitle ??
          formI18n.t('dialog_title') ??
          'Select File'
        }
        filterImageOnly={filterImageOnly}
        onFetchFiles={onFetchFiles}
        onUploadFile={onUploadFile}
        enableUpload={enableUpload}
        labels={filePickerLabels}
        translate={formI18n.t}
        colLabel={colLabel}
      />

      <Flex flexFlow={'column'} gap={1}>
        {currentFileIds.map((fileId, index) => {
          const isImage = isImageId(fileId);
          const imageFailed = failedImageIds.has(fileId);

          return (
            <Card.Root
              variant={'subtle'}
              colorPalette="blue"
              key={`${fileId}-${index}`}
            >
              <Card.Body
                gap="2"
                cursor={'pointer'}
                onClick={() => handleRemove(index)}
                display={'flex'}
                flexFlow={'row'}
                alignItems={'center'}
                padding={'2'}
                border="2px solid"
                borderColor="border.default"
                borderRadius="md"
                _hover={{
                  borderColor: 'colorPalette.300',
                  bg: 'bg.muted',
                }}
                transition="all 0.2s"
              >
                <Box
                  width="60px"
                  height="60px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="bg.muted"
                  borderRadius="md"
                  flexShrink={0}
                  marginRight="2"
                >
                  {isImage && !imageFailed ? (
                    <Icon as={LuImage} boxSize={6} color="fg.muted" />
                  ) : (
                    <Icon as={LuFile} boxSize={6} color="fg.muted" />
                  )}
                </Box>
                <VStack align="start" flex={1} gap={1}>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color="fg.default"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {fileId}
                  </Text>
                </VStack>
                <Icon as={TiDeleteOutline} boxSize={5} color="fg.muted" />
              </Card.Body>
            </Card.Root>
          );
        })}
      </Flex>
    </Field>
  );
};
