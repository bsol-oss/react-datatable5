import {
  Box,
  HStack,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { InputGroup } from '@/components/ui/input-group';
import { CheckboxCard } from '@/components/ui/checkbox-card';
import { LuFile, LuImage, LuSearch } from 'react-icons/lu';
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  FilePickerMediaFile,
  FilePickerLabels,
} from './types/CustomJSONSchema7';
import { formatBytes } from '../utils/formatBytes';

type MediaLibraryBrowserPropsBase = {
  onFetchFiles?: (search: string) => Promise<FilePickerMediaFile[]>;
  filterImageOnly?: boolean;
  labels?: FilePickerLabels;
  enabled?: boolean;
};

type MediaLibraryBrowserPropsSingle = MediaLibraryBrowserPropsBase & {
  multiple?: false;
  onFileSelect?: (file: FilePickerMediaFile) => void;
  selectedFile?: FilePickerMediaFile;
  onSelectedFileChange?: (file: FilePickerMediaFile | undefined) => void;
};

type MediaLibraryBrowserPropsMultiple = MediaLibraryBrowserPropsBase & {
  multiple: true;
  onFileSelect?: (files: FilePickerMediaFile[]) => void;
  selectedFile?: FilePickerMediaFile[];
  onSelectedFileChange?: (files: FilePickerMediaFile[]) => void;
};

export type MediaLibraryBrowserProps =
  | MediaLibraryBrowserPropsSingle
  | MediaLibraryBrowserPropsMultiple;

const IMAGE_EXT = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;

function filterImageFiles(files: FilePickerMediaFile[]): FilePickerMediaFile[] {
  return files.filter((f) => IMAGE_EXT.test(f.name));
}

export const MediaLibraryBrowser = ({
  onFetchFiles,
  filterImageOnly = false,
  labels,
  enabled = true,
  multiple = false,
  onFileSelect,
  selectedFile: controlledSelectedFile,
  onSelectedFileChange,
}: MediaLibraryBrowserProps) => {
  const [search, setSearch] = useState('');

  const query = useQuery({
    queryKey: ['media-library', search, filterImageOnly],
    queryFn: async () => {
      if (!onFetchFiles) return [];
      const list = await onFetchFiles(search);
      return filterImageOnly ? filterImageFiles(list) : list;
    },
    enabled: enabled && !!onFetchFiles,
  });

  const files = useMemo(
    () => (query.data ?? []) as FilePickerMediaFile[],
    [query.data]
  );

  const selectedIds = useMemo(() => {
    if (multiple && Array.isArray(controlledSelectedFile)) {
      return new Set(controlledSelectedFile.map((f) => f.id));
    }
    if (
      !multiple &&
      controlledSelectedFile &&
      !Array.isArray(controlledSelectedFile)
    ) {
      return new Set([controlledSelectedFile.id]);
    }
    return new Set<string>();
  }, [multiple, controlledSelectedFile]);

  const handleSingleSelect = (file: FilePickerMediaFile) => {
    if (!multiple) {
      (
        onSelectedFileChange as (file: FilePickerMediaFile | undefined) => void
      )?.(file);
      (onFileSelect as (file: FilePickerMediaFile) => void)?.(file);
    }
  };

  const handleMultipleToggle = (
    file: FilePickerMediaFile,
    checked: boolean
  ) => {
    const current =
      multiple && Array.isArray(controlledSelectedFile)
        ? [...controlledSelectedFile]
        : [];
    const next = checked
      ? [...current, file]
      : current.filter((f) => f.id !== file.id);
    (onSelectedFileChange as (files: FilePickerMediaFile[]) => void)?.(next);
    (onFileSelect as (files: FilePickerMediaFile[]) => void)?.(next);
  };

  const isLoading = query.isPending;
  const isError = query.isError;
  const searchPlaceholder = labels?.searchPlaceholder ?? 'Search files...';
  const loadingText = labels?.loading ?? 'Loading...';
  const errorText = labels?.loadingFailed ?? 'Failed to load files';
  const emptyText = labels?.noFilesFound ?? 'No files found';

  return (
    <VStack align="stretch" gap={4}>
      <InputGroup startElement={<Icon as={LuSearch} color="fg.muted" />}>
        <Input
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          bg="bg.panel"
          borderColor="border.default"
        />
      </InputGroup>

      {isLoading && (
        <HStack gap={2} py={6} justify="center">
          <Spinner size="sm" colorPalette="blue" />
          <Text fontSize="sm" color="fg.muted">
            {loadingText}
          </Text>
        </HStack>
      )}

      {isError && (
        <Box
          py={4}
          px={3}
          borderRadius="md"
          bg={{ base: 'red.50', _dark: 'red.900/20' }}
          borderWidth="1px"
          borderColor={{ base: 'red.200', _dark: 'red.800' }}
        >
          <Text fontSize="sm" color={{ base: 'red.600', _dark: 'red.300' }}>
            {errorText}
          </Text>
        </Box>
      )}

      {!isLoading && !isError && files.length === 0 && (
        <Box py={6} textAlign="center">
          <Text fontSize="sm" color="fg.muted">
            {emptyText}
          </Text>
        </Box>
      )}

      {!isLoading && !isError && files.length > 0 && (
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} gap={3}>
          {files.map((file) => {
            const isImage = IMAGE_EXT.test(file.name);
            const isSelected = selectedIds.has(file.id);
            const fileSize =
              typeof file.size === 'number'
                ? formatBytes(file.size)
                : file.size ?? null;

            if (multiple) {
              return (
                <CheckboxCard
                  key={file.id}
                  checked={isSelected}
                  onCheckedChange={(e) =>
                    handleMultipleToggle(file, e.checked === true)
                  }
                  variant="outline"
                  borderColor="border.default"
                  _hover={{ borderColor: 'border.emphasized', bg: 'bg.muted' }}
                  cursor="pointer"
                >
                  <Box
                    width="100%"
                    aspectRatio={1}
                    bg="bg.muted"
                    borderRadius="md"
                    overflow="hidden"
                    mb={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {isImage && file.url ? (
                      <Image
                        src={file.url}
                        alt={file.name}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                      />
                    ) : isImage ? (
                      <Icon as={LuImage} boxSize={8} color="fg.muted" />
                    ) : (
                      <Icon as={LuFile} boxSize={8} color="fg.muted" />
                    )}
                  </Box>
                  <Text
                    fontSize="xs"
                    fontWeight="medium"
                    color="fg.default"
                    lineClamp={2}
                  >
                    {file.name}
                  </Text>
                  {fileSize && (
                    <Text fontSize="xs" color="fg.muted">
                      {fileSize}
                    </Text>
                  )}
                </CheckboxCard>
              );
            }

            return (
              <Box
                key={file.id}
                role="button"
                tabIndex={0}
                onClick={() => handleSingleSelect(file)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSingleSelect(file);
                  }
                }}
                padding={3}
                borderRadius="md"
                borderWidth="2px"
                borderColor={isSelected ? 'colorPalette.500' : 'border.default'}
                bg={
                  isSelected
                    ? { base: 'colorPalette.50', _dark: 'colorPalette.900/20' }
                    : 'bg.panel'
                }
                _hover={{
                  borderColor: isSelected
                    ? 'colorPalette.500'
                    : 'border.emphasized',
                  bg: isSelected
                    ? { base: 'colorPalette.50', _dark: 'colorPalette.900/20' }
                    : 'bg.muted',
                }}
                cursor="pointer"
                transition="all 0.2s"
              >
                <Box
                  width="100%"
                  aspectRatio={1}
                  bg="bg.muted"
                  borderRadius="md"
                  overflow="hidden"
                  mb={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {isImage && file.url ? (
                    <Image
                      src={file.url}
                      alt={file.name}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  ) : isImage ? (
                    <Icon as={LuImage} boxSize={8} color="fg.muted" />
                  ) : (
                    <Icon as={LuFile} boxSize={8} color="fg.muted" />
                  )}
                </Box>
                <Text
                  fontSize="xs"
                  fontWeight="medium"
                  color="fg.default"
                  lineClamp={2}
                >
                  {file.name}
                </Text>
                {fileSize && (
                  <Text fontSize="xs" color="fg.muted">
                    {fileSize}
                  </Text>
                )}
              </Box>
            );
          })}
        </SimpleGrid>
      )}
    </VStack>
  );
};
