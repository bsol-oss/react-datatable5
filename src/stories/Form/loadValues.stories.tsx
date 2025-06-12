import { DefaultForm } from "@/components/Form/components/core/DefaultForm";
import { useForm } from "@/components/Form/useForm";
import { Provider } from "@/components/ui/provider";
import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18n from "i18next";
import { JSONSchema7 } from "json-schema";
import { I18nextProvider, initReactI18next } from "react-i18next";

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

export const LoadValues: Story = {
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

const SomeForm = () => {
  const form = useForm({
    keyPrefix: "nice",
    preLoadedValues: {
      someDateTimes: "2025-06-10T12:12:00+08:00",
      someUtcDateTimes: "2025-06-10T12:00:00Z",
      someAfterNoonTimes: "16:12:00+08:00",
      someMorningTimes: "08:12:00+08:00",
      someMidnightTimes: "00:56:00+08:00",
      someNoonTimes: "12:24:00+08:00",
    },
  });

  const schema = {
    type: "object",
    properties: {
      someDateTimes: {
        type: "string",
        format: "date-time",
      },
      someAfterNoonTimes: {
        type: "string",
        format: "time",
      },
      someMorningTimes: {
        type: "string",
        format: "time",
      },
      someMidnightTimes: {
        type: "string",
        format: "time",
      },
      someNoonTimes: {
        type: "string",
        format: "time",
      },
    },
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
