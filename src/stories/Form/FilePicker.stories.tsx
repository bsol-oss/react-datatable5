import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from 'i18next';
import { JSONSchema7 } from 'json-schema';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { FilePickerMediaFile } from '@/components/Form/components/types/CustomJSONSchema7';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/Form/FilePicker',
  component: DefaultForm,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof DefaultForm>;

type Story = StoryObj<typeof meta>;

export default meta;

const queryClient = new QueryClient();

i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    resources: {
      en: {
        translation: {
          files: {
            file_upload: {
              field_label: 'Upload Files',
              fileDropzone: 'Drop files here or click to upload',
              browse_library: 'Browse from Library',
              dialog_title: 'Select File',
              search_placeholder: 'Search files...',
              loading: 'Loading files...',
              cancel: 'Cancel',
              select: 'Select',
              no_files_found: 'No files found',
              error: {
                loading_failed: 'Failed to load files',
              },
            },
            image_upload: {
              field_label: 'Upload Images Only',
              fileDropzone: 'Drop images here or click to upload',
              browse_library: 'Browse Images',
              dialog_title: 'Select Image',
              search_placeholder: 'Search images...',
              loading: 'Loading images...',
              cancel: 'Cancel',
              select: 'Select',
              no_files_found: 'No images found',
              error: {
                loading_failed: 'Failed to load images',
              },
            },
            with_media_library: {
              field_label: 'Files with Media Library',
              fileDropzone: 'Drop files here or click to upload',
              browse_library: 'Browse from Library',
              dialog_title: 'Select File',
              search_placeholder: 'Search files...',
              loading: 'Loading files...',
              cancel: 'Cancel',
              select: 'Select',
              no_files_found: 'No files found',
              error: {
                loading_failed: 'Failed to load files',
              },
            },
            basic_files: {
              field_label: 'Basic File Upload',
              fileDropzone: 'Drop files here or click to upload',
            },
          },
        },
      },
    },
  });

// Mock function to simulate fetching files from media library
const mockFetchFiles = async (
  search: string
): Promise<FilePickerMediaFile[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockFiles: FilePickerMediaFile[] = [
    {
      id: 'file-1',
      name: 'sample-image.jpg',
      url: 'https://via.placeholder.com/150',
      size: 102400,
      comment: 'Sample image file',
      type: 'image/jpeg',
    },
    {
      id: 'file-2',
      name: 'document.pdf',
      url: undefined,
      size: 512000,
      comment: 'Important document',
      type: 'application/pdf',
    },
    {
      id: 'file-3',
      name: 'photo.png',
      url: 'https://via.placeholder.com/150/0000FF/808080',
      size: 204800,
      comment: 'Photo file',
      type: 'image/png',
    },
    {
      id: 'file-4',
      name: 'presentation.pptx',
      url: undefined,
      size: 1048576,
      comment: 'Business presentation',
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    },
    {
      id: 'file-5',
      name: 'logo.svg',
      url: 'https://via.placeholder.com/150/FF0000/FFFFFF',
      size: 15360,
      comment: 'Company logo',
      type: 'image/svg+xml',
    },
    {
      id: 'file-6',
      name: 'spreadsheet.xlsx',
      url: undefined,
      size: 307200,
      comment: 'Financial data',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
  ];

  // Filter by search term if provided
  if (search.trim()) {
    return mockFiles.filter(
      (file) =>
        file.name.toLowerCase().includes(search.toLowerCase()) ||
        (file.comment &&
          file.comment.toLowerCase().includes(search.toLowerCase()))
    );
  }

  return mockFiles;
};

export const BasicFileUpload: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <BasicFileUploadForm />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
};

const BasicFileUploadForm = () => {
  const form = useForm({ keyPrefix: 'files.basic_files' });

  const schema = {
    type: 'object',
    properties: {
      file_upload: {
        type: 'array',
        variant: 'file-picker',
        gridColumn: '1/span 12',
        gridRow: '1/span 1',
      },
    },
    required: [],
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema: schema,
        serverUrl: 'http://localhost:8081',
        onSubmit: async (data) => {
          console.log('Form submitted:', data);
        },
        ...form,
      }}
    />
  );
};

export const WithMediaLibrary: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <WithMediaLibraryForm />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
};

const WithMediaLibraryForm = () => {
  const form = useForm({ keyPrefix: 'files.with_media_library' });

  const schema = {
    type: 'object',
    properties: {
      file_upload: {
        type: 'array',
        variant: 'file-picker',
        gridColumn: '1/span 12',
        gridRow: '1/span 1',
        filePicker: {
          enableMediaLibrary: true,
          onFetchFiles: mockFetchFiles,
          filterImageOnly: false,
        },
      },
    },
    required: [],
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema: schema,
        serverUrl: 'http://localhost:8081',
        onSubmit: async (data) => {
          console.log('Form submitted:', data);
          console.log('Files:', data.file_upload);
        },
        ...form,
      }}
    />
  );
};

export const ImageOnlyWithLibrary: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <ImageOnlyForm />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
};

const ImageOnlyForm = () => {
  const form = useForm({ keyPrefix: 'files.image_upload' });

  const schema = {
    type: 'object',
    properties: {
      file_upload: {
        type: 'array',
        variant: 'file-picker',
        gridColumn: '1/span 12',
        gridRow: '1/span 1',
        filePicker: {
          enableMediaLibrary: true,
          onFetchFiles: mockFetchFiles,
          filterImageOnly: true,
        },
      },
    },
    required: [],
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema: schema,
        serverUrl: 'http://localhost:8081',
        onSubmit: async (data) => {
          console.log('Form submitted:', data);
          console.log('Images:', data.file_upload);
        },
        ...form,
      }}
    />
  );
};

export const RequiredFiles: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <RequiredFilesForm />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
};

const RequiredFilesForm = () => {
  const form = useForm({ keyPrefix: 'files.file_upload' });

  const schema = {
    type: 'object',
    properties: {
      file_upload: {
        type: 'array',
        variant: 'file-picker',
        gridColumn: '1/span 12',
        gridRow: '1/span 1',
        filePicker: {
          enableMediaLibrary: true,
          onFetchFiles: mockFetchFiles,
        },
      },
    },
    required: ['file_upload'],
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema: schema,
        serverUrl: 'http://localhost:8081',
        onSubmit: async (data) => {
          console.log('Form submitted:', data);
        },
        ...form,
      }}
    />
  );
};

export const MultipleFilePickers: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <MultipleFilePickersForm />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
};

const MultipleFilePickersForm = () => {
  const form = useForm({ keyPrefix: 'files' });

  const schema = {
    type: 'object',
    properties: {
      basic_files: {
        type: 'array',
        variant: 'file-picker',
        gridColumn: '1/span 6',
        gridRow: '1/span 1',
      },
      files_with_library: {
        type: 'array',
        variant: 'file-picker',
        gridColumn: '7/span 6',
        gridRow: '1/span 1',
        filePicker: {
          enableMediaLibrary: true,
          onFetchFiles: mockFetchFiles,
        },
      },
      images_only: {
        type: 'array',
        variant: 'file-picker',
        gridColumn: '1/span 12',
        gridRow: '2/span 1',
        filePicker: {
          enableMediaLibrary: true,
          onFetchFiles: mockFetchFiles,
          filterImageOnly: true,
        },
      },
    },
    required: [],
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema: schema,
        serverUrl: 'http://localhost:8081',
        onSubmit: async (data) => {
          console.log('Form submitted:', data);
          console.log('Basic files:', data.basic_files);
          console.log('Files with library:', data.files_with_library);
          console.log('Images only:', data.images_only);
        },
        ...form,
      }}
    />
  );
};

export const WithCustomLabels: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <WithCustomLabelsForm />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
};

const WithCustomLabelsForm = () => {
  const form = useForm({ keyPrefix: 'files.file_upload' });

  const schema = {
    type: 'object',
    properties: {
      file_upload: {
        type: 'array',
        variant: 'file-picker',
        gridColumn: '1/span 12',
        gridRow: '1/span 1',
        filePicker: {
          enableMediaLibrary: true,
          onFetchFiles: mockFetchFiles,
        },
      },
    },
    required: [],
  } as JSONSchema7;

  // Custom labels that override i18n translations
  const customFilePickerLabels = {
    fileDropzone: '🎬 Drag and drop your files here, or click to browse',
    browseLibrary: '📚 Open Media Library',
    dialogTitle: 'Media Library - Select Your File',
    searchPlaceholder: 'Type to search files...',
    loading: '⏳ Please wait, loading files...',
    loadingFailed: '❌ Oops! Failed to load files. Please try again.',
    noFilesFound: '🔍 No files match your search',
    cancel: '✖️ Cancel',
    select: '✓ Choose This File',
  };

  return (
    <DefaultForm
      formConfig={{
        schema: schema,
        serverUrl: 'http://localhost:8081',
        onSubmit: async (data) => {
          console.log('Form submitted:', data);
        },
        filePickerLabels: customFilePickerLabels,
        ...form,
      }}
    />
  );
};
