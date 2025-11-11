import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18next from 'i18next';
import { JSONSchema7 } from 'json-schema';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { FilePickerMediaFile } from '@/components/Form/components/types/CustomJSONSchema7';

const meta = {
  title: 'react-datatable5/Form/MediaLibraryBrowser',
  component: DefaultForm,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof DefaultForm>;

type Story = StoryObj<typeof meta>;

export default meta;

const queryClient = new QueryClient();

const mediaLibraryI18n = i18next.createInstance();

mediaLibraryI18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        files: {
          media_library: {
            field_label: 'Media Library Browser',
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
          single_media_library: {
            field_label: 'Single Media Library Selection',
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
        },
      },
    },
  },
});

const mockFetchFiles = async (
  search: string
): Promise<FilePickerMediaFile[]> => {
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

const mockUploadFile = async (file: File) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return `uploaded-${file.name}-${Date.now()}`;
};

export const MediaLibraryBrowser: Story = {
  render: () => (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={mediaLibraryI18n} defaultNS={'translation'}>
          <MediaLibraryBrowserForm />
        </I18nextProvider>
      </QueryClientProvider>
    </Provider>
  ),
};

const MediaLibraryBrowserForm = () => {
  const form = useForm({ keyPrefix: 'files' });

  const schema = {
    type: 'object',
    properties: {
      media_library: {
        type: 'array',
        variant: 'media-library-browser',
        gridColumn: '1/span 6',
        gridRow: '1/span 1',
        filePicker: {
          onFetchFiles: mockFetchFiles,
          filterImageOnly: false,
          enableUpload: true,
          onUploadFile: mockUploadFile,
        },
      },
      single_media_library: {
        type: 'string',
        variant: 'media-library-browser',
        gridColumn: '7/span 6',
        gridRow: '1/span 1',
        filePicker: {
          onFetchFiles: mockFetchFiles,
          filterImageOnly: true,
          enableUpload: true,
          onUploadFile: mockUploadFile,
        },
      },
    },
    required: [],
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema,
        serverUrl: 'http://localhost:8081',
        onSubmit: async (data) => {
          console.log('Form submitted:', data);
          console.log('Media Library (String IDs):', data.media_library);
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
