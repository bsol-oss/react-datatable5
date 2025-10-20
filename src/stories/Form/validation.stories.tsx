import { DefaultForm } from "@/components/Form/components/core/DefaultForm";
import { useForm } from "@/components/Form/useForm";
import { Provider } from "@/components/ui/provider";
import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18n from "i18next";
import { JSONSchema7 } from "json-schema";
import { I18nextProvider, initReactI18next } from "react-i18next";
import {
  buildErrorMessages,
  buildRequiredErrors,
  createErrorMessage,
} from "@/components/Form/utils/buildErrorMessages";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/Form",
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
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export const Validation: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={"translation"}>
            <SomeForm />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
};

export const ValidationWithHelpers: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={"translation"}>
            <FormWithHelpers />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
};

export const ValidationWithI18n: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={"translation"}>
            <FormWithI18n />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
};

// Example 1: Using buildErrorMessages with full control
const SomeForm = () => {
  const form = useForm({
    keyPrefix: "nice",
    preLoadedValues: { parent_id: "nice" },
  });

  const errorMessage = buildErrorMessages({
    // Required field errors
    required: {
      someTextarea: "it is required someTextarea <type-some-textarea>",
      someNumber: "it is required someNumber <type-some-number>",
    },
    // Field-specific validation errors
    properties: {
      someTextarea: {
        minLength: "Please longer text someTextarea",
      },
      someNumber: {
        minimum: "Please greater number someNumber",
      },
    },
    // Global fallback errors
    minLength: "Please longer text",
    minimum: "Please greater number",
  });

  const schema = {
    type: "object",
    properties: {
      someTextarea: {
        type: "string",
        variant: "text-area",
        minLength: 10,
      },
      someNumber: {
        type: "number",
        minimum: 10,
      },
      someTime: {
        type: "string",
        format: "time",
      },
    },
    required: ["someTextarea", "someNumber"],
    errorMessage,
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        serverUrl: "http://localhost:8123",
        onSubmit: (data) => {
          console.log("nice", data, "onSubmit-gkrp");
        },
        ...form,
      }}
    />
  );
};

// Example 2: Using buildRequiredErrors helper
const FormWithHelpers = () => {
  const form = useForm({
    keyPrefix: "user",
    preLoadedValues: {},
  });

  // Use buildRequiredErrors to simplify required field errors
  const requiredFields = ["username", "email", "password"];
  const errorMessage = buildErrorMessages({
    required: buildRequiredErrors(
      requiredFields,
      (field) => `${field} is required`
    ),
    properties: {
      username: {
        minLength: "Username must be at least 3 characters",
        maxLength: "Username cannot exceed 20 characters",
        pattern: "Username can only contain letters and numbers",
      },
      email: {
        format: "Please enter a valid email address",
      },
      password: {
        minLength: "Password must be at least 8 characters",
        pattern: "Password must contain letters, numbers and special characters",
      },
    },
  });

  const schema = {
    type: "object",
    properties: {
      username: {
        type: "string",
        minLength: 3,
        maxLength: 20,
        pattern: "^[a-zA-Z0-9]+$",
      },
      email: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
        minLength: 8,
        pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]",
      },
      age: {
        type: "number",
        minimum: 18,
        maximum: 120,
      },
    },
    required: requiredFields,
    errorMessage,
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        serverUrl: "http://localhost:8123",
        onSubmit: (data) => {
          console.log("User registration:", data);
        },
        ...form,
      }}
    />
  );
};

// Example 3: Using createErrorMessage wrapper with i18n keys
const FormWithI18n = () => {
  const form = useForm({
    keyPrefix: "product",
    preLoadedValues: {},
  });

  // Using createErrorMessage for cleaner syntax
  const errorMessage = createErrorMessage(
    // Required fields with i18n keys
    buildRequiredErrors(
      ["name", "price", "category"],
      (field) => `${field}.field_required`, // i18n pattern
      "product" // prefix
    ),
    // Field-specific validation errors
    {
      name: {
        minLength: "product.name.too_short",
        maxLength: "product.name.too_long",
      },
      price: {
        minimum: "product.price.too_low",
        maximum: "product.price.too_high",
      },
      description: {
        maxLength: "product.description.too_long",
      },
    },
    // Global fallbacks
    {
      minLength: "validation.minLength",
      maximum: "validation.maximum",
      format: "validation.format",
    }
  );

  const schema = {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 3,
        maxLength: 100,
      },
      price: {
        type: "number",
        minimum: 0.01,
        maximum: 999999.99,
      },
      category: {
        type: "string",
        enum: ["electronics", "clothing", "food", "books"],
      },
      description: {
        type: "string",
        maxLength: 500,
      },
      releaseDate: {
        type: "string",
        format: "date",
      },
    },
    required: ["name", "price", "category"],
    errorMessage,
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        serverUrl: "http://localhost:8123",
        onSubmit: (data) => {
          console.log("Product data:", data);
        },
        ...form,
      }}
    />
  );
};
