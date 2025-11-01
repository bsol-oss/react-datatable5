import { Field } from '@/components/ui/field';
import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { TiDeleteOutline } from 'react-icons/ti';
import { LuFile, LuSearch } from 'react-icons/lu';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FileDropzone } from '../FileDropzone';
import {
  CustomJSONSchema7,
  FilePickerMediaFile,
  FilePickerLabels,
} from '../types/CustomJSONSchema7';
import { removeIndex } from '../../utils/removeIndex';
import { formatBytes } from '../../utils/formatBytes';
import { useFormI18n } from '../../utils/useFormI18n';
import { useSchemaContext } from '../../useSchemaContext';
import { InputDefaultProps } from './types';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';

type FileValue = File | string;

interface FilePickerDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (fileId: string) => void;
  title: string;
  filterImageOnly?: boolean;
  onFetchFiles?: (search: string) => Promise<FilePickerMediaFile[]>;
  labels?: FilePickerLabels;
  translate: (key: string) => string;
  colLabel: string;
}

function FilePickerDialog({
  open,
  onClose,
  onSelect,
  title,
  filterImageOnly = false,
  onFetchFiles,
  labels,
  translate,
  colLabel,
}: FilePickerDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFileId, setSelectedFileId] = useState<string>('');

  const {
    data: filesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['file-picker-library', searchTerm],
    queryFn: async () => {
      if (!onFetchFiles) return { data: [] };
      const files = await onFetchFiles(searchTerm.trim() || '');
      return { data: files };
    },
    enabled: open && !!onFetchFiles,
  });

  const files = (filesData?.data || []) as FilePickerMediaFile[];

  const filteredFiles = filterImageOnly
    ? files.filter((file) =>
        /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(file.name)
      )
    : files;

  const handleSelect = () => {
    if (selectedFileId) {
      onSelect(selectedFileId);
      onClose();
      setSelectedFileId('');
      setSearchTerm('');
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedFileId('');
    setSearchTerm('');
  };

  if (!onFetchFiles) return null;

  return (
    <DialogRoot open={open} onOpenChange={(e) => !e.open && handleClose()}>
      <DialogContent maxWidth="800px" maxHeight="90vh">
        <DialogHeader>
          <DialogTitle fontSize="lg" fontWeight="bold">
            {title}
          </DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <VStack align="stretch" gap={4}>
            {/* Search Input */}
            <Box position="relative">
              <Input
                placeholder={
                  labels?.searchPlaceholder ??
                  translate(removeIndex(`${colLabel}.search_placeholder`)) ??
                  'Search files...'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg="bg.panel"
                border="1px solid"
                borderColor="border.default"
                _focus={{
                  borderColor: 'blue.500',
                  boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
                }}
                pl={10}
              />
              <Icon
                as={LuSearch}
                position="absolute"
                left={3}
                top="50%"
                transform="translateY(-50%)"
                color="fg.muted"
                boxSize={4}
              />
            </Box>

            {/* Loading State */}
            {isLoading && (
              <Box textAlign="center" py={8}>
                <Spinner size="lg" colorPalette="blue" />
                <Text mt={4} color="fg.muted">
                  {labels?.loading ??
                    translate(removeIndex(`${colLabel}.loading`)) ??
                    'Loading files...'}
                </Text>
              </Box>
            )}

            {/* Error State */}
            {isError && (
              <Box
                bg="red.50"
                _dark={{ bg: 'red.900/20' }}
                border="1px solid"
                borderColor="red.200"
                borderRadius="md"
                p={4}
              >
                <Text color="red.600" _dark={{ color: 'red.300' }}>
                  {labels?.loadingFailed ??
                    translate(
                      removeIndex(`${colLabel}.error.loading_failed`)
                    ) ??
                    'Failed to load files'}
                </Text>
              </Box>
            )}

            {/* Files Grid */}
            {!isLoading && !isError && (
              <Box maxHeight="400px" overflowY="auto">
                {filteredFiles.length === 0 ? (
                  <Box textAlign="center" py={8}>
                    <Text color="fg.muted">
                      {labels?.noFilesFound ??
                        translate(removeIndex(`${colLabel}.no_files_found`)) ??
                        'No files found'}
                    </Text>
                  </Box>
                ) : (
                  <VStack align="stretch" gap={2}>
                    {filteredFiles.map((file) => {
                      const isImage =
                        /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(file.name);
                      const isSelected = selectedFileId === file.id;

                      return (
                        <Box
                          key={file.id}
                          p={3}
                          border="2px solid"
                          borderColor={
                            isSelected ? 'blue.500' : 'border.default'
                          }
                          borderRadius="md"
                          bg={isSelected ? 'blue.50' : 'bg.panel'}
                          _dark={{
                            bg: isSelected ? 'blue.900/20' : 'bg.panel',
                          }}
                          cursor="pointer"
                          onClick={() => setSelectedFileId(file.id)}
                          _hover={{
                            borderColor: isSelected ? 'blue.600' : 'blue.300',
                            bg: isSelected ? 'blue.100' : 'bg.muted',
                          }}
                          transition="all 0.2s"
                        >
                          <HStack gap={3}>
                            {/* Preview */}
                            <Box
                              width="60px"
                              height="60px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              bg="bg.muted"
                              borderRadius="md"
                              flexShrink={0}
                            >
                              {isImage && file.url ? (
                                <Image
                                  src={file.url}
                                  alt={file.name}
                                  boxSize="60px"
                                  objectFit="cover"
                                  borderRadius="md"
                                />
                              ) : (
                                <Icon
                                  as={LuFile}
                                  boxSize={6}
                                  color="fg.muted"
                                />
                              )}
                            </Box>

                            {/* File Info */}
                            <VStack align="start" flex={1} gap={1}>
                              <Text
                                fontSize="sm"
                                fontWeight="medium"
                                color="fg.default"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                              >
                                {file.name}
                              </Text>
                              <HStack gap={2}>
                                {file.size && (
                                  <>
                                    <Text fontSize="xs" color="fg.muted">
                                      {typeof file.size === 'number'
                                        ? formatBytes(file.size)
                                        : file.size}
                                    </Text>
                                  </>
                                )}
                                {file.comment && (
                                  <>
                                    {file.size && (
                                      <Text fontSize="xs" color="fg.muted">
                                        •
                                      </Text>
                                    )}
                                    <Text
                                      fontSize="xs"
                                      color="fg.muted"
                                      overflow="hidden"
                                      textOverflow="ellipsis"
                                      whiteSpace="nowrap"
                                    >
                                      {file.comment}
                                    </Text>
                                  </>
                                )}
                              </HStack>
                            </VStack>

                            {/* Selected Indicator */}
                            {isSelected && (
                              <Box
                                width="24px"
                                height="24px"
                                borderRadius="full"
                                bg="blue.500"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                flexShrink={0}
                              >
                                <Text
                                  color="white"
                                  fontSize="xs"
                                  fontWeight="bold"
                                >
                                  ✓
                                </Text>
                              </Box>
                            )}
                          </HStack>
                        </Box>
                      );
                    })}
                  </VStack>
                )}
              </Box>
            )}
          </VStack>
        </DialogBody>
        <DialogFooter>
          <HStack gap={3} justify="end">
            <Button
              variant="outline"
              onClick={handleClose}
              borderColor="border.default"
              bg="bg.panel"
              _hover={{ bg: 'bg.muted' }}
            >
              {labels?.cancel ??
                translate(removeIndex(`${colLabel}.cancel`)) ??
                'Cancel'}
            </Button>
            <Button
              colorPalette="blue"
              onClick={handleSelect}
              disabled={!selectedFileId}
            >
              {labels?.select ??
                translate(removeIndex(`${colLabel}.select`)) ??
                'Select'}
            </Button>
          </HStack>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export const FilePicker = ({ column, schema, prefix }: InputDefaultProps) => {
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
  } = schema as CustomJSONSchema7;
  const isRequired = required?.some((columnId) => columnId === column);

  const currentValue = watch(column) ?? [];
  const currentFiles = Array.isArray(currentValue)
    ? (currentValue as FileValue[])
    : [];

  const colLabel = formI18n.colLabel;
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    onFetchFiles,
    enableMediaLibrary = false,
    filterImageOnly = false,
  } = filePicker || {};

  const showMediaLibrary = enableMediaLibrary && !!onFetchFiles;

  const handleMediaLibrarySelect = (fileId: string) => {
    const newFiles = [...currentFiles, fileId];
    setValue(colLabel, newFiles);
  };

  const handleRemove = (index: number) => {
    const newFiles = currentFiles.filter((_, i) => i !== index);
    setValue(colLabel, newFiles);
  };

  const isFileObject = (value: FileValue): value is File => {
    return value instanceof File;
  };

  const getFileIdentifier = (file: FileValue, index: number): string => {
    if (isFileObject(file)) {
      return `${file.name}-${file.size}-${index}`;
    }
    return file;
  };

  const getFileName = (file: FileValue): string => {
    if (isFileObject(file)) {
      return file.name;
    }
    return typeof file === 'string' ? file : 'Unknown file';
  };

  const getFileSize = (file: FileValue): number | undefined => {
    if (isFileObject(file)) {
      return file.size;
    }
    return undefined;
  };

  const isImageFile = (file: FileValue): boolean => {
    if (isFileObject(file)) {
      return file.type.startsWith('image/');
    }
    if (typeof file === 'string') {
      return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(file);
    }
    return false;
  };

  const getImageUrl = (file: FileValue): string | undefined => {
    if (isFileObject(file)) {
      return URL.createObjectURL(file);
    }
    return undefined;
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
        <FileDropzone
          onDrop={({ files }) => {
            const newFiles = files.filter(
              ({ name }) =>
                !currentFiles.some((cur) => {
                  if (isFileObject(cur)) {
                    return cur.name === name;
                  }
                  return false;
                })
            );
            setValue(colLabel, [...currentFiles, ...newFiles]);
          }}
          placeholder={
            filePickerLabels?.fileDropzone ?? formI18n.t('fileDropzone')
          }
        />
        {showMediaLibrary && (
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
        )}
      </VStack>

      {showMediaLibrary && (
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
          labels={filePickerLabels}
          translate={formI18n.t}
          colLabel={colLabel}
        />
      )}

      <Flex flexFlow={'column'} gap={1}>
        {currentFiles.map((file, index) => {
          const fileIdentifier = getFileIdentifier(file, index);
          const fileName = getFileName(file);
          const fileSize = getFileSize(file);
          const isImage = isImageFile(file);
          const imageUrl = getImageUrl(file);

          return (
            <Card.Root variant={'subtle'} key={fileIdentifier}>
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
                  borderColor: 'blue.300',
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
                  {isImage && imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={fileName}
                      boxSize="60px"
                      objectFit="cover"
                      borderRadius="md"
                    />
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
                    {fileName}
                  </Text>
                  {fileSize !== undefined && (
                    <Text fontSize="xs" color="fg.muted">
                      {formatBytes(fileSize)}
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
