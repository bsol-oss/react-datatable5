import { Field } from '@/components/ui/field';
import {
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Icon,
  Image,
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
import { removeIndex } from '../../utils/removeIndex';
import { formatBytes } from '../../utils/formatBytes';
import { useFormI18n } from '../../utils/useFormI18n';
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
  const [selectedFileId, setSelectedFileId] = useState<string>('');

  const handleSelect = () => {
    if (selectedFileId) {
      onSelect(selectedFileId);
      onClose();
      setSelectedFileId('');
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedFileId('');
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
          <MediaLibraryBrowser
            onFetchFiles={onFetchFiles}
            filterImageOnly={filterImageOnly}
            labels={labels}
            enabled={open}
            selectedFileId={selectedFileId}
            onSelectedFileIdChange={setSelectedFileId}
          />
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
    type,
  } = schema as CustomJSONSchema7;
  const isRequired = required?.some((columnId) => columnId === column);

  const isSingleSelect = type === 'string';

  const currentValue = watch(column) ?? (isSingleSelect ? '' : []);

  // Convert single value to array for rendering, or use array directly
  const currentFiles: FileValue[] = isSingleSelect
    ? currentValue
      ? [currentValue as FileValue]
      : []
    : Array.isArray(currentValue)
      ? (currentValue as FileValue[])
      : [];

  const colLabel = formI18n.colLabel;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [failedImageIds, setFailedImageIds] = useState<Set<string>>(new Set());

  const {
    onFetchFiles,
    enableMediaLibrary = false,
    filterImageOnly = false,
  } = filePicker || {};

  const showMediaLibrary = enableMediaLibrary && !!onFetchFiles;

  const handleImageError = (fileIdentifier: string) => {
    setFailedImageIds((prev) => new Set(prev).add(fileIdentifier));
  };

  const handleMediaLibrarySelect = (fileId: string) => {
    if (isSingleSelect) {
      setValue(colLabel, fileId);
    } else {
      const newFiles = [...currentFiles, fileId];
      setValue(colLabel, newFiles);
    }
  };

  const handleRemove = (index: number) => {
    if (isSingleSelect) {
      setValue(colLabel, '');
    } else {
      const newFiles = currentFiles.filter((_, i) => i !== index);
      setValue(colLabel, newFiles);
    }
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
            if (isSingleSelect) {
              // In single-select mode, use the first file and replace any existing file
              if (files.length > 0) {
                setValue(colLabel, files[0]);
              }
            } else {
              // In multi-select mode, filter duplicates and append
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
            }
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
