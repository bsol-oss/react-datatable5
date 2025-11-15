import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from 'i18next';
import { JSONSchema7 } from 'json-schema';
import { I18nextProvider, initReactI18next } from 'react-i18next';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/Form',
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
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export const DefaultSuccess: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <DefaultSuccessForm />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
};

export const CustomSuccess: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <CustomSuccessForm />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
};

// Story 1: Default Success Behavior
const DefaultSuccessForm = () => {
  const form = useForm({
    keyPrefix: 'default',
    preLoadedValues: {},
  });

  const schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        title: 'Full Name',
        minLength: 2,
      },
      email: {
        type: 'string',
        title: 'Email Address',
        format: 'email',
      },
      message: {
        type: 'string',
        title: 'Message',
        variant: 'text-area',
        minLength: 10,
      },
    },
    required: ['name', 'email', 'message'],
    errorMessage: {
      required: {
        name: 'Name is required',
        email: 'Email is required',
        message: 'Message is required',
      },
      minLength: 'Please provide more details',
      format: 'Please enter a valid email address',
    },
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        serverUrl: 'http://localhost:8123',
        onSubmit: async (data) => {
          console.log('Form submitted with data:', data);
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
        },
        ...form,
      }}
    />
  );
};

// Story 2: Custom Success Component
const CustomSuccessForm = () => {
  const form = useForm({
    keyPrefix: 'custom',
    preLoadedValues: {},
  });

  const schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        title: 'Full Name',
        minLength: 2,
      },
      email: {
        type: 'string',
        title: 'Email Address',
        format: 'email',
      },
      message: {
        type: 'string',
        title: 'Message',
        variant: 'text-area',
        minLength: 10,
      },
    },
    required: ['name', 'email', 'message'],
    errorMessage: {
      required: {
        name: 'Name is required',
        email: 'Email is required',
        message: 'Message is required',
      },
      minLength: 'Please provide more details',
      format: 'Please enter a valid email address',
    },
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        serverUrl: 'http://localhost:8123',
        onSubmit: async (data) => {
          console.log('Form submitted with data:', data);
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
        },
        customSuccessRenderer: (resetHandler) => (
          <Box
            bg="green.50"
            border="2px solid"
            borderColor="green.200"
            borderRadius="lg"
            p={8}
            textAlign="center"
            boxShadow="lg"
          >
            <VStack spacing={6}>
              {/* Celebration Icon */}
              <Box fontSize="4xl">🎉</Box>

              {/* Success Message */}
              <VStack spacing={2}>
                <Text fontSize="2xl" fontWeight="bold" color="green.700">
                  Success!
                </Text>
                <Text color="green.600" fontSize="lg">
                  Your form has been submitted successfully.
                </Text>
                <Text color="gray.600" fontSize="sm">
                  Thank you for your submission. We'll get back to you soon!
                </Text>
              </VStack>

              {/* Custom Action Buttons */}
              <HStack spacing={4}>
                <Button
                  onClick={resetHandler}
                  colorScheme="green"
                  variant="solid"
                  size="lg"
                >
                  Submit Another Form
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  colorScheme="green"
                  size="lg"
                >
                  Start Over
                </Button>
              </HStack>

              {/* Additional Info */}
              <Box bg="green.100" borderRadius="md" p={3} w="full">
                <Text fontSize="sm" color="green.700">
                  💡 Tip: You can customize this success screen by providing a
                  customSuccessRenderer prop
                </Text>
              </Box>
            </VStack>
          </Box>
        ),
        ...form,
      }}
    />
  );
};
