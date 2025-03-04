import { RecordDisplay } from "@/components/DataTable/components/RecordDisplay";
import { DataDisplay } from "@/components/DataTable/DataDisplay";
import { Provider } from "@/components/ui/provider";
import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  I18nextProvider,
  initReactI18next,
  useTranslation,
} from "react-i18next";
import i18n from "i18next";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/DisplayComponent",
  component: RecordDisplay,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof DataDisplay>;

type Story = StoryObj<typeof meta>;

export default meta;

export const ObjectDisplay1: Story = {
  render: () => {
    return <DataDisplayView />;
  },
};

const queryClient = new QueryClient();

const DataDisplayView = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RecordDisplay
          object={{
            nice: "job",
            good: "good good good",
            food: {
              fruit: "grape",
              some: {
                column: "id",
                value: "b1f00432-e623-d6d3-c262-d50f7881f8ab",
              },
            },
          }}
        />
      </Provider>
    </QueryClientProvider>
  );
};

i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export const ObjectDisplay2: Story = {
  render: () => {
    return (
      <I18nextProvider i18n={i18n} defaultNS={"translation"}>
        <Provider>
          <SomeRecord />
        </Provider>
      </I18nextProvider>
    );
  },
};

const SomeRecord = () => {
  const translate = useTranslation("", { keyPrefix: "goood" });

  return (
    <RecordDisplay
      translate={translate}
      object={{
        nice: "job",
        good: "good good good",
        food: {
          fruit: "grape",
          some: {
            column: "id",
            value: "b1f00432-e623-d6d3-c262-d50f7881f8ab",
          },
        },
      }}
    />
  );
};
