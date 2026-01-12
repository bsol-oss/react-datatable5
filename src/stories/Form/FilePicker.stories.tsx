import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
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
  name: 'Basic File Upload',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <BasicFileUploadForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

const BasicFileUploadForm = () => {
  const form = useForm({});

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
        onSubmit: async (data) => {
          console.log('Form submitted:', data);
        },
        ...form,
      }}
    />
  );
};

export const WithMediaLibrary: Story = {
  name: 'With Media Library',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <WithMediaLibraryForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

const WithMediaLibraryForm = () => {
  const form = useForm({});

  const schema = {
    type: 'object',
    properties: {
      file_upload: {
        title: 'File Upload',
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
  name: 'Image Only With Library',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <ImageOnlyForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

const ImageOnlyForm = () => {
  const form = useForm({});

  const schema = {
    type: 'object',
    properties: {
      file_upload: {
        type: 'array',
        variant: 'media-library-browser',
        gridColumn: '1/span 12',
        gridRow: '1/span 1',
        filePicker: {
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
  name: 'Required Files',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <RequiredFilesForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

const RequiredFilesForm = () => {
  const form = useForm({});

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
        onSubmit: async (data) => {
          console.log('Form submitted:', data);
        },
        ...form,
      }}
    />
  );
};

export const MultipleFilePickers: Story = {
  name: 'Multiple File Pickers',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <MultipleFilePickersForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

const MultipleFilePickersForm = () => {
  const form = useForm({});

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
  name: 'With Custom Labels',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <WithCustomLabelsForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

const WithCustomLabelsForm = () => {
  const form = useForm({});

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
          enableUpload: true,
          onUploadFile: async (file: File) => {
            // Simulate file upload and return file ID
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return `uploaded-${file.name}-${Date.now()}`;
          },
        },
      },
    },
    required: [],
  } as JSONSchema7;

  // Custom labels that override i18n translations - showing all available labels
  const customFilePickerLabels = {
    // Dropzone label (shown in the main file picker dropzone)
    fileDropzone: '🎬 Drag and drop your files here, or click to browse',
    // Media Library Browser labels
    browseLibrary: '📚 Open Media Library',
    dialogTitle: 'Media Library - Select Your File',
    searchPlaceholder: 'Type to search files...',
    loading: '⏳ Please wait, loading files...',
    loadingFailed: '❌ Oops! Failed to load files. Please try again.',
    noFilesFound: '🔍 No files match your search',
    // Dialog action buttons
    cancel: '✖️ Cancel',
    select: '✓ Choose This File',
    // Tab labels (shown when enableUpload is true)
    browseTab: '📂 Browse Library',
    uploadTab: '⬆️ Upload Files',
    // Upload status labels
    uploading: '⏳ Uploading file...',
    uploadFailed: '❌ Upload failed. Please try again.',
  };

  return (
    <DefaultForm
      formConfig={{
        schema: schema,
        onSubmit: async (data) => {
          console.log('Form submitted:', data);
        },
        filePickerLabels: customFilePickerLabels,
        ...form,
      }}
    />
  );
};

export const SingleSelect: Story = {
  name: 'Single Select',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <SingleSelectForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

const SingleSelectForm = () => {
  const form = useForm({});

  const schema = {
    type: 'object',
    properties: {
      single_file: {
        type: 'string',
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
        onSubmit: async (data) => {
          console.log('Form submitted:', data);
          console.log('Single file (ID or File object):', data.single_file);
        },
        ...form,
      }}
    />
  );
};

export const FilePickerAndMediaLibrary: Story = {
  name: 'File Picker And Media Library',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <FilePickerAndMediaLibraryForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

const FilePickerAndMediaLibraryForm = () => {
  const form = useForm({});

  const schema = {
    type: 'object',
    properties: {
      file_picker: {
        type: 'array',
        variant: 'file-picker',
        gridColumn: '1/span 6',
        gridRow: '1/span 1',
      },
      media_library: {
        type: 'array',
        variant: 'media-library-browser',
        gridColumn: '7/span 6',
        gridRow: '1/span 1',
        filePicker: {
          onFetchFiles: mockFetchFiles,
          filterImageOnly: false,
          enableUpload: true,
          onUploadFile: async (file: File) => {
            // Simulate file upload and return file ID
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return `uploaded-${file.name}-${Date.now()}`;
          },
        },
      },
      single_file_picker: {
        type: 'string',
        variant: 'file-picker',
        gridColumn: '1/span 6',
        gridRow: '2/span 1',
      },
      single_media_library: {
        type: 'string',
        variant: 'media-library-browser',
        gridColumn: '7/span 6',
        gridRow: '2/span 1',
        filePicker: {
          onFetchFiles: mockFetchFiles,
          filterImageOnly: true,
          enableUpload: true,
          onUploadFile: async (file: File) => {
            // Simulate file upload and return file ID
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return `uploaded-${file.name}-${Date.now()}`;
          },
        },
      },
    },
    required: [],
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema: schema,
        onSubmit: async (data) => {
          console.log('Form submitted:', data);
          console.log('File Picker (File objects):', data.file_picker);
          console.log('Media Library (String IDs):', data.media_library);
          console.log(
            'Single File Picker (File object):',
            data.single_file_picker
          );
          console.log(
            'Single Media Library (String ID):',
            data.single_media_library
          );
        },
        ...form,
      }}
    />
  );
};
