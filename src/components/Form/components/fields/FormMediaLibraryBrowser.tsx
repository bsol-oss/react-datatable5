import { Field } from '@/components/ui/field';
import {
  Box,
  Button,
  Card,
  Flex,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { TiDeleteOutline } from 'react-icons/ti';
import { LuFile, LuImage } from 'react-icons/lu';
import { useState, useEffect } from 'react';
import {
  CustomJSONSchema7,
  FilePickerMediaFile,
} from '../types/CustomJSONSchema7';
import { useFormLabel } from '../../utils/useFormLabel';
import { getNestedError } from '../../utils/getNestedError';
import { useSchemaContext } from '../../useSchemaContext';
import { InputDefaultProps } from './types';
import { MediaBrowserDialog } from './FilePicker';

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
  const formI18n = useFormLabel(column, prefix, schema);
  const {
    required,
    gridColumn = 'span 12',
    gridRow = 'span 1',
    filePicker,
    type,
  } = schema as CustomJSONSchema7;
  const isRequired = required?.some((columnId) => columnId === column);

  const isSingleSelect = type === 'string';
  const colLabel = formI18n.colLabel;

  const currentValue = watch(colLabel) ?? (isSingleSelect ? '' : []);

  // Handle string IDs only
  const currentFileIds: string[] = isSingleSelect
    ? currentValue
      ? [currentValue as string]
      : []
    : Array.isArray(currentValue)
      ? (currentValue as string[])
      : [];

  const fieldError = getNestedError(errors, colLabel);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [failedImageIds, setFailedImageIds] = useState<Set<string>>(new Set());
  // Map of file ID to FilePickerMediaFile for display
  const [fileMap, setFileMap] = useState<Map<string, FilePickerMediaFile>>(
    new Map()
  );

  const {
    onFetchFiles,
    filterImageOnly = false,
    enableUpload = false,
    onUploadFile,
  } = filePicker || {};

  // Fetch file details for existing file IDs
  useEffect(() => {
    if (!onFetchFiles || currentFileIds.length === 0) return;

    const fetchFileDetails = async () => {
      setFileMap((prevMap) => {
        const filesToFetch = currentFileIds.filter((id) => !prevMap.has(id));
        if (filesToFetch.length === 0) return prevMap;

        // Fetch all files and filter for the ones we need
        onFetchFiles('')
          .then((allFiles) => {
            setFileMap((currentMap) => {
              const newFileMap = new Map(currentMap);
              filesToFetch.forEach((id) => {
                const file = allFiles.find((f) => f.id === id);
                if (file) {
                  newFileMap.set(id, file);
                }
              });
              return newFileMap;
            });
          })
          .catch((error) => {
            console.error('Failed to fetch file details:', error);
          });
        return prevMap;
      });
    };

    fetchFileDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFileIds.join(','), onFetchFiles]);

  // Clean up fileMap when files are removed
  useEffect(() => {
    setFileMap((prevMap) => {
      const currentIds = new Set(currentFileIds);
      const newFileMap = new Map();
      prevMap.forEach((file, id) => {
        if (currentIds.has(id)) {
          newFileMap.set(id, file);
        }
      });
      return newFileMap.size !== prevMap.size ? newFileMap : prevMap;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFileIds.join(',')]);

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
        errorText={<>{fieldError}</>}
        invalid={!!fieldError}
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

  const handleMediaLibrarySelect = (file: FilePickerMediaFile) => {
    // Store the file in the map for display
    setFileMap((prev) => new Map(prev).set(file.id, file));

    if (isSingleSelect) {
      setValue(colLabel, file.id);
    } else {
      const newFileIds = [...currentFileIds, file.id];
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

  return (
    <Field
      label={formI18n.label()}
      required={isRequired}
      alignItems={'stretch'}
      {...{
        gridColumn,
        gridRow,
      }}
      errorText={<>{fieldError}</>}
      invalid={!!fieldError}
    >
      <VStack align="stretch" gap={2}>
        <Button
          variant="outline"
          onClick={() => setDialogOpen(true)}
          borderColor="border.default"
          bg="bg.panel"
          _hover={{ bg: 'bg.muted' }}
        >
          {filePickerLabels?.browseLibrary ?? 'Browse from Library'}
        </Button>
      </VStack>

      <MediaBrowserDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSelect={handleMediaLibrarySelect}
        title={
          filePickerLabels?.dialogTitle ?? formI18n.label() ?? 'Select File'
        }
        filterImageOnly={filterImageOnly}
        onFetchFiles={onFetchFiles}
        onUploadFile={onUploadFile}
        enableUpload={enableUpload}
        labels={filePickerLabels}
        colLabel={colLabel}
      />

      <Flex flexFlow={'column'} gap={1}>
        {currentFileIds.map((fileId, index) => {
          const file = fileMap.get(fileId);
          const isImage = file
            ? /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(file.name)
            : /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(fileId);
          const imageFailed = failedImageIds.has(fileId);
          const displayName = file?.name ?? fileId;

          return (
            <Card.Root variant={'subtle'} key={`${fileId}-${index}`}>
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
                  overflow="hidden"
                >
                  {isImage && file?.url && !imageFailed ? (
                    <Image
                      src={file.url}
                      alt={displayName}
                      boxSize="60px"
                      objectFit="cover"
                      onError={() => handleImageError(fileId)}
                    />
                  ) : isImage && !imageFailed ? (
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
                    {displayName}
                  </Text>
                  {file?.size && (
                    <Text fontSize="xs" color="fg.muted">
                      {typeof file.size === 'number'
                        ? `${(file.size / 1024).toFixed(1)} KB`
                        : file.size}
                    </Text>
                  )}
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
