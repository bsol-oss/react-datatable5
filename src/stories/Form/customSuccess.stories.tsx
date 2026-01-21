import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import { Box, Button, Text, VStack, HStack } from '@chakra-ui/react';
import type { StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/Form',
  component: DefaultForm,
  parameters: {},

  argTypes: {},
};

type Story = StoryObj;

export default meta;
const queryClient = new QueryClient();

export const DefaultSuccess: Story = {
  name: 'Default Success',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <DefaultSuccessForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

export const CustomSuccess: Story = {
  name: 'Custom Success',
  args: {},
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <CustomSuccessForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

// Story 1: Default Success Behavior
const DefaultSuccessForm = () => {
  const form = useForm({
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
  };

  return (
    <DefaultForm
      formConfig={{
        schema: schema,
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
  };

  return (
    <DefaultForm
      formConfig={{
        schema: schema,
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
