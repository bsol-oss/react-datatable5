import { Form } from "@/components/Form/Form";
import { Provider } from "@/components/ui/provider";
import type { Meta, StoryObj } from "@storybook/react";
import axios from "axios";
import { JSONSchema7 } from "json-schema";
import { eventsFilesSchema2 } from "../schema";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useForm } from "@/components/Form/useForm";

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

export const EventsFiles2: Story = {
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
      schema={eventsFilesSchema2 as JSONSchema7}
      serverUrl={"http://localhost:8081"}
      preLoadedValues={{}}
      rowNumber={20}
      onSubmit={async (data) => {
        console.log(data, "dskfop");
        const body = data["file_id"].map((file_id: string) => {
          return {
            file_id,
            event_id: data["event_id"],
          };
        });

        await axios.post("http://localhost:8081/api/g/events_files/many", {
          data: body,
        });
      }}
      {...{ form, idMap, setIdMap, translate }}
    />
  );
};
