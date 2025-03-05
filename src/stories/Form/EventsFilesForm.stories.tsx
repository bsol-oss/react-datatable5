import { Form } from "@/components/Form/Form";
import { useForm } from "@/components/Form/useForm";
import { Provider } from "@/components/ui/provider";
import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import i18n from "i18next";
import { JSONSchema7 } from "json-schema";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { eventsFilesSchema } from "../schema";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/Form",
  component: Form,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof Form>;

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

export const EventsFiles: Story = {
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
  const { form, idMap, setIdMap, translate } = useForm({ keyPrefix: "nice" });

  return (
    <Form
      schema={eventsFilesSchema as JSONSchema7}
      serverUrl={"http://localhost:8081"}
      rowNumber={20}
      onSubmit={async (data) => {
        const formData = new FormData();
        for (const currentFile of data.file_id) {
          formData.append(currentFile.name, currentFile);
        }
        const response = await axios.post(
          "http://localhost:8081/api/upload",
          formData
        );
        console.log(response, "fksdap");
      }}
      {...{ form, idMap, setIdMap, translate }}
    />
  );
};
