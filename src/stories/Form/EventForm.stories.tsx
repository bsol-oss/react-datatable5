import { Form } from "@/components/Form/Form";
import type { Meta, StoryObj } from "@storybook/react";
import { JSONSchema7 } from "json-schema";
import { eventsSchema } from "../schema";
import { Provider } from "@/components/ui/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useForm } from "@/components/Form/useForm";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";

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
    <Form
      schema={eventsSchema as JSONSchema7}
      order={[]}
      ignore={["id", "created_at", "updated_at"]}
      serverUrl={"http://localhost:8081"}
      {...form}
    />
  );
};

// export const EventRow: Story = {
//   render: () => {
//     return (
//       <Provider>
//         <Form
//           requestUrl={"http://localhost:8081/api"}
//           schema={eventsSchema as JSONSchema7}
//           order={[
//             "event_name",
//             "parent_event_id",
//             "start_date",
//             "start_time",
//             "end_date",
//             "end_time",
//             "is_recurring",
//             "recurring_days",
//             "recurring_type",
//             "description",
//           ]}
//           ignore={["id", "created_at", "updated_at"]}
//           serverUrl={"http://localhost:8081"}
//           preLoadedValues={{
//             recurring_days: ["mon"],
//             remarks: "kookkook",
//             start_date: "2025-02-13",
//             event_name: "ckodsp",
//             parent_event_id: ["98cfc50d-7fca-40da-ae7c-192f36cf766a"],
//             is_recurring: true,
//             end_date: "2025-02-14",
//             end_time: "14:30:00Z",
//             description: "dfkgjpaoskdf",
//             recurring_type: ["weekly"],
//             extra_info: {
//               nice: "job",
//             },
//           }}
//           rowNumber={9}
//         />
//       </Provider>
//     );
//   },
// };
