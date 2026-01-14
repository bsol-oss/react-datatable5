import { Field } from '@/components/ui/field';
import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Icon,
  Image,
  Spinner,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { TiDeleteOutline } from 'react-icons/ti';
import { LuFile, LuImage } from 'react-icons/lu';
import { useState } from 'react';
import { FileDropzone } from '../FileDropzone';
import {
  CustomJSONSchema7,
  FilePickerMediaFile,
  FilePickerLabels,
} from '../types/CustomJSONSchema7';
import { formatBytes } from '../../utils/formatBytes';
import { useFormLabel } from '../../utils/useFormLabel';
import { useSchemaContext } from '../../useSchemaContext';
import { InputDefaultProps } from './types';
import { MediaLibraryBrowser } from '../MediaLibraryBrowser';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';

// FileValue is File for file-picker variant
type FileValue = File;

interface MediaBrowserDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (file: FilePickerMediaFile) => void;
  title: string;
  filterImageOnly?: boolean;
  onFetchFiles?: (search: string) => Promise<FilePickerMediaFile[]>;
  onUploadFile?: (file: File) => Promise<string>;
  enableUpload?: boolean;
  labels?: FilePickerLabels;
  colLabel: string;
}

export function MediaBrowserDialog({
  open,
  onClose,
  onSelect,
  title,
  filterImageOnly = false,
  onFetchFiles,
  onUploadFile,
  enableUpload = false,
  labels,
}: MediaBrowserDialogProps) {
  const [selectedFile, setSelectedFile] = useState<
    FilePickerMediaFile | undefined
  >(undefined);
  const [activeTab, setActiveTab] = useState<string>('browse');
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const [uploadErrors, setUploadErrors] = useState<Map<string, string>>(
    new Map()
  );

  const handleSelect = () => {
    if (selectedFile) {
      onSelect(selectedFile);
      onClose();
      setSelectedFile(undefined);
      setActiveTab('browse');
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedFile(undefined);
    setActiveTab('browse');
    setUploadingFiles(new Set());
    setUploadErrors(new Map());
  };

  const handleFileUpload = async (files: File[]) => {
    if (!onUploadFile) return;

    for (const file of files) {
      const fileKey = `${file.name}-${file.size}`;
      setUploadingFiles((prev) => new Set(prev).add(fileKey));
      setUploadErrors((prev) => {
        const newMap = new Map(prev);
        newMap.delete(fileKey);
        return newMap;
      });

      try {
        const fileId = await onUploadFile(file);
        // Create a minimal FilePickerMediaFile object from the uploaded file
        const uploadedFile: FilePickerMediaFile = {
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
        };
        setSelectedFile(uploadedFile);
        setUploadingFiles((prev) => {
          const newSet = new Set(prev);
          newSet.delete(fileKey);
          return newSet;
        });
        // Auto-select and close in single-select mode
        onSelect(uploadedFile);
        onClose();
        setSelectedFile(undefined);
        setActiveTab('browse');
      } catch (error) {
        setUploadingFiles((prev) => {
          const newSet = new Set(prev);
          newSet.delete(fileKey);
          return newSet;
        });
        setUploadErrors((prev) => {
          const newMap = new Map(prev);
          newMap.set(
            fileKey,
            error instanceof Error ? error.message : 'Upload failed'
          );
          return newMap;
        });
      }
    }
  };

  const showTabs = enableUpload && !!onUploadFile && !!onFetchFiles;

  if (!onFetchFiles && !onUploadFile) return null;

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
          {showTabs ? (
            <Tabs.Root
              value={activeTab}
              onValueChange={(e) => setActiveTab(e.value ?? 'browse')}
            >
              <Tabs.List>
                <Tabs.Trigger value="browse">
                  {labels?.browseTab ?? 'Browse Library'}
                </Tabs.Trigger>
                <Tabs.Trigger value="upload">
                  {labels?.uploadTab ?? 'Upload Files'}
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="browse">
                {onFetchFiles && (
                  <MediaLibraryBrowser
                    onFetchFiles={onFetchFiles}
                    filterImageOnly={filterImageOnly}
                    labels={labels}
                    enabled={open && activeTab === 'browse'}
                    selectedFile={selectedFile}
                    onFileSelect={setSelectedFile}
                  />
                )}
              </Tabs.Content>
              <Tabs.Content value="upload">
                <VStack align="stretch" gap={4}>
                  <FileDropzone
                    onDrop={({ files }) => handleFileUpload(files)}
                    placeholder={
                      labels?.fileDropzone ??
                      'Drop files here or click to upload'
                    }
                  />
                  {uploadingFiles.size > 0 && (
                    <Box>
                      {Array.from(uploadingFiles).map((fileKey) => (
                        <Box key={fileKey} py={2}>
                          <HStack gap={2}>
                            <Spinner size="sm" colorPalette="blue" />
                            <Text fontSize="sm" color="fg.muted">
                              {labels?.uploading ?? 'Uploading...'}{' '}
                              {fileKey.split('-')[0]}
                            </Text>
                          </HStack>
                        </Box>
                      ))}
                    </Box>
                  )}
                  {uploadErrors.size > 0 && (
                    <VStack align="stretch" gap={2}>
                      {Array.from(uploadErrors.entries()).map(
                        ([fileKey, error]) => (
                          <Box
                            key={fileKey}
                            bg={{
                              base: 'colorPalette.50',
                              _dark: 'colorPalette.900/20',
                            }}
                            border="1px solid"
                            borderColor={{
                              base: 'colorPalette.200',
                              _dark: 'colorPalette.800',
                            }}
                            colorPalette="red"
                            borderRadius="md"
                            p={3}
                          >
                            <Text
                              fontSize="sm"
                              color={{
                                base: 'colorPalette.600',
                                _dark: 'colorPalette.300',
                              }}
                            >
                              {fileKey.split('-')[0]}:{' '}
                              {labels?.uploadFailed ?? 'Upload failed'}
                              {error && ` - ${error}`}
                            </Text>
                          </Box>
                        )
                      )}
                    </VStack>
                  )}
                </VStack>
              </Tabs.Content>
            </Tabs.Root>
          ) : onFetchFiles ? (
            <MediaLibraryBrowser
              onFetchFiles={onFetchFiles}
              filterImageOnly={filterImageOnly}
              labels={labels}
              enabled={open}
              selectedFile={selectedFile}
              onFileSelect={setSelectedFile}
            />
          ) : null}
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
              {labels?.cancel ?? 'Cancel'}
            </Button>
            <Button
              colorPalette="blue"
              onClick={handleSelect}
              disabled={!selectedFile}
            >
              {labels?.select ?? 'Select'}
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
  const formI18n = useFormLabel(column, prefix, schema);
  const {
    required,
    gridColumn = 'span 12',
    gridRow = 'span 1',
    type,
  } = schema as CustomJSONSchema7;
  const isRequired = required?.some((columnId) => columnId === column);

  const isSingleSelect = type === 'string';

  const currentValue = watch(column) ?? (isSingleSelect ? '' : []);

  // Handle File objects only
  const currentFiles: FileValue[] = isSingleSelect
    ? currentValue && currentValue instanceof File
      ? [currentValue]
      : []
    : Array.isArray(currentValue)
      ? (currentValue as FileValue[]).filter((f) => f instanceof File)
      : [];

  const colLabel = formI18n.colLabel;
  const [failedImageIds, setFailedImageIds] = useState<Set<string>>(new Set());

  // FilePicker variant: Only handle File objects, no media library browser

  const handleImageError = (fileIdentifier: string) => {
    setFailedImageIds((prev) => new Set(prev).add(fileIdentifier));
  };

  const handleRemove = (index: number) => {
    if (isSingleSelect) {
      setValue(colLabel, '');
    } else {
      const newFiles = currentFiles.filter((_, i) => i !== index);
      setValue(colLabel, newFiles);
    }
  };

  const getFileIdentifier = (file: FileValue, index: number): string => {
    // file-picker: file is a File object, create identifier from name and size
    return `${file.name}-${file.size}-${index}`;
  };

  const getFileName = (file: FileValue): string => {
    return file.name;
  };

  const getFileSize = (file: FileValue): number | undefined => {
    return file.size;
  };

  const isImageFile = (file: FileValue): boolean => {
    return file.type.startsWith('image/');
  };

  const getImageUrl = (file: FileValue): string | undefined => {
    return URL.createObjectURL(file);
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
            // file-picker variant: Store File objects directly (no ID conversion)
            if (isSingleSelect) {
              // In single-select mode, use the first file and replace any existing file
              if (files.length > 0) {
                setValue(colLabel, files[0]);
              }
            } else {
              // In multi-select mode, filter duplicates and append
              const newFiles = files.filter(
                ({ name }) => !currentFiles.some((cur) => cur.name === name)
              );
              setValue(colLabel, [...currentFiles, ...newFiles]);
            }
          }}
          placeholder={filePickerLabels?.fileDropzone ?? 'Drop files here'}
        />
      </VStack>

      <Flex flexFlow={'column'} gap={1}>
        {currentFiles.map((file, index) => {
          const fileIdentifier = getFileIdentifier(file, index);
          const fileName = getFileName(file);
          const fileSize = getFileSize(file);
          const isImage = isImageFile(file);
          const imageUrl = getImageUrl(file);
          const imageFailed = failedImageIds.has(fileIdentifier);

          // File Viewer
          return (
            <Card.Root
              variant={'subtle'}
              colorPalette="blue"
              key={fileIdentifier}
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
                  {isImage && imageUrl && !imageFailed ? (
                    <Image
                      src={imageUrl}
                      alt={fileName}
                      boxSize="60px"
                      objectFit="cover"
                      borderRadius="md"
                      onError={() => handleImageError(fileIdentifier)}
                    />
                  ) : isImage && (imageFailed || !imageUrl) ? (
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
