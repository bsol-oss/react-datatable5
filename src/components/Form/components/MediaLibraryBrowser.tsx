import {
  Box,
  HStack,
  Icon,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LuFile, LuImage, LuSearch } from 'react-icons/lu';
import { useState } from 'react';
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
  onFileSelect?: (fileId: string) => void;
  selectedFileId?: string;
  onSelectedFileIdChange?: (fileId: string) => void;
};

type MediaLibraryBrowserPropsMultiple = MediaLibraryBrowserPropsBase & {
  multiple: true;
  onFileSelect?: (fileId: string[]) => void;
  selectedFileId?: string[];
  onSelectedFileIdChange?: (fileId: string[]) => void;
};

export type MediaLibraryBrowserProps =
  | MediaLibraryBrowserPropsSingle
  | MediaLibraryBrowserPropsMultiple;

export const MediaLibraryBrowser = ({
  onFetchFiles,
  filterImageOnly = false,
  labels,
  enabled = true,
  multiple = false,
  onFileSelect,
  selectedFileId: controlledSelectedFileId,
  onSelectedFileIdChange,
}: MediaLibraryBrowserProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [internalSelectedFileId, setInternalSelectedFileId] = useState<
    string | string[]
  >(multiple ? [] : '');
  const [failedImageIds, setFailedImageIds] = useState<Set<string>>(new Set());

  // Use controlled or internal state for selectedFileId
  const selectedFileId = controlledSelectedFileId ?? internalSelectedFileId;
  const setSelectedFileId = onSelectedFileIdChange ?? setInternalSelectedFileId;

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
    enabled: enabled && !!onFetchFiles,
  });

  const files = (filesData?.data || []) as FilePickerMediaFile[];

  const filteredFiles = filterImageOnly
    ? files.filter((file) =>
        /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(file.name)
      )
    : files;

  const handleFileClick = (fileId: string) => {
    if (multiple) {
      const currentSelection = Array.isArray(selectedFileId)
        ? selectedFileId
        : [];
      const newSelection = currentSelection.includes(fileId)
        ? currentSelection.filter((id) => id !== fileId)
        : [...currentSelection, fileId];
      (setSelectedFileId as (value: string[]) => void)(newSelection);
      if (onFileSelect) {
        (onFileSelect as (fileId: string[]) => void)(newSelection);
      }
    } else {
      (setSelectedFileId as (value: string) => void)(fileId);
      if (onFileSelect) {
        (onFileSelect as (fileId: string) => void)(fileId);
      }
    }
  };

  const handleImageError = (fileId: string) => {
    setFailedImageIds((prev) => new Set(prev).add(fileId));
  };

  if (!onFetchFiles) return null;

  return (
    <VStack align="stretch" gap={4}>
      {/* Search Input */}
      <Box position="relative">
        <Input
          placeholder={labels?.searchPlaceholder ?? 'Search files...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg="bg.panel"
          border="1px solid"
          borderColor="border.default"
          colorPalette="blue"
          _focus={{
            borderColor: 'colorPalette.500',
            _dark: {
              borderColor: 'colorPalette.400',
            },
            boxShadow: {
              base: '0 0 0 1px var(--chakra-colors-blue-500)',
              _dark: '0 0 0 1px var(--chakra-colors-blue-400)',
            },
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
            {labels?.loading ?? 'Loading files...'}
          </Text>
        </Box>
      )}

      {/* Error State */}
      {isError && (
        <Box
          bg={{ base: 'colorPalette.50', _dark: 'colorPalette.900/20' }}
          border="1px solid"
          borderColor={{
            base: 'colorPalette.200',
            _dark: 'colorPalette.800',
          }}
          colorPalette="red"
          borderRadius="md"
          p={4}
        >
          <Text
            color={{
              base: 'colorPalette.600',
              _dark: 'colorPalette.300',
            }}
          >
            {labels?.loadingFailed ?? 'Failed to load files'}
          </Text>
        </Box>
      )}

      {/* Files Grid */}
      {!isLoading && !isError && (
        <Box maxHeight="400px" overflowY="auto">
          {filteredFiles.length === 0 ? (
            <Box textAlign="center" py={8}>
              <Text color="fg.muted">
                {labels?.noFilesFound ?? 'No files found'}
              </Text>
            </Box>
          ) : (
            <VStack align="stretch" gap={2}>
              {filteredFiles.map((file) => {
                const isImage = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(
                  file.name
                );
                const isSelected = multiple
                  ? Array.isArray(selectedFileId) &&
                    selectedFileId.includes(file.id)
                  : selectedFileId === file.id;
                const imageFailed = failedImageIds.has(file.id);

                return (
                  <Box
                    key={file.id}
                    p={3}
                    border="2px solid"
                    borderColor={
                      isSelected
                        ? {
                            base: 'colorPalette.500',
                            _dark: 'colorPalette.400',
                          }
                        : 'border.default'
                    }
                    borderRadius="md"
                    bg={
                      isSelected
                        ? {
                            base: 'colorPalette.50',
                            _dark: 'colorPalette.900/20',
                          }
                        : 'bg.panel'
                    }
                    colorPalette="blue"
                    cursor="pointer"
                    onClick={() => handleFileClick(file.id)}
                    _hover={{
                      borderColor: isSelected
                        ? {
                            base: 'colorPalette.600',
                            _dark: 'colorPalette.400',
                          }
                        : {
                            base: 'colorPalette.300',
                            _dark: 'colorPalette.400',
                          },
                      bg: isSelected
                        ? {
                            base: 'colorPalette.100',
                            _dark: 'colorPalette.800/30',
                          }
                        : 'bg.muted',
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
                        {isImage && file.url && !imageFailed ? (
                          <Image
                            src={file.url}
                            alt={file.name}
                            boxSize="60px"
                            objectFit="cover"
                            borderRadius="md"
                            onError={() => handleImageError(file.id)}
                          />
                        ) : isImage && (imageFailed || !file.url) ? (
                          <Icon as={LuImage} boxSize={6} color="fg.muted" />
                        ) : (
                          <Icon as={LuFile} boxSize={6} color="fg.muted" />
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
                          bg={{
                            base: 'colorPalette.500',
                            _dark: 'colorPalette.400',
                          }}
                          colorPalette="blue"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexShrink={0}
                        >
                          <Text color="white" fontSize="xs" fontWeight="bold">
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
  );
};
