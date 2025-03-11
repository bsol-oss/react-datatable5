import { FormRoot } from "@/components/Form/components/core/FormRoot";
import type { Meta, StoryObj } from "@storybook/react";
import { JSONSchema7 } from "json-schema";
import { eventsSchema } from "../schema";
import { Provider } from "@/components/ui/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useForm } from "@/components/Form/useForm";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";
import { DefaultForm } from "@/components/Form/components/core/DefaultForm";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/Form",
  component: FormRoot,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof FormRoot>;

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

export const Event: Story = {
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
  const form = useForm({ keyPrefix: "nice" });

  return (
    <DefaultForm
      formConfig={{
        schema: eventsSchema as JSONSchema7,
        ignore: ["id", "created_at", "updated_at"],
        serverUrl: "http://localhost:8081",
        ...form,
      }}
    />
  );
};
