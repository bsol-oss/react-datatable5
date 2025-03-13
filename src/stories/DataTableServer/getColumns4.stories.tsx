import { DataDisplay } from "@/components/DataTable/display/DataDisplay";
import { DataTableServer } from "@/components/DataTable/DataTableServer";
import { DefaultTable } from "@/components/DataTable/DefaultTable";
import { TableComponent } from "@/components/DataTable/display/TableComponent";
import { useDataTableServer } from "@/components/DataTable/useDataTableServer";
import { getColumns } from "@/components/DataTable/utils/getColumns";
import { FilterOptions } from "@/components/Filter/FilterOptions";
import { Provider } from "@/components/ui/provider";
import { Box, Text } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JSONSchema7 } from "json-schema";
import { peopleSchema } from "../schema";
import {
  I18nextProvider,
  initReactI18next,
  useTranslation,
} from "react-i18next";
import i18n from "i18next";
import { TableDataDisplay } from "@/components/DataTable/display/TableDataDisplay";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/DataTableServer/getColumns",
  component: DataDisplay,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof DataDisplay>;

type Story = StoryObj<typeof meta>;

export default meta;

i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export const GetColumns4Story: Story = {
  render: () => {
    return (
      <I18nextProvider i18n={i18n} defaultNS={"translation"}>
        <QueryClientProvider client={queryClient}>
          <DataDisplayView />
        </QueryClientProvider>
      </I18nextProvider>
    );
  },
};

const queryClient = new QueryClient();

const DataDisplayView = () => {
  return <AddressApp />;
};

const AddressApp = () => {
  const datatable = useDataTableServer({
    url: "http://localhost:8081/api/g/core_people",
    default: { sorting: [{ id: "id", desc: false }] },
  });
  const translate = useTranslation("", { keyPrefix: "excell" });

  const columns = getColumns<string>({
    schema: peopleSchema as JSONSchema7,
    // ignore: ["building_name"],
    width: [400, 80, 100],
    meta: {
      // created_at: {
      //   displayName: "Created at",
      //   filterVariant: "select",
      //   filterOptions: ["Apple", "Huawei"],
      // },
    },
    translate,
  });

  const columnsInclude = getColumns<string>({
    schema: peopleSchema as JSONSchema7,
    // ignore: ["building_name"],
    // include: ["first_name","last_name"],
    // width: [400, 80, 100],
    meta: {},
    translate,
  });

  return (
    <Provider>
      <DataTableServer
        url="http://localhost:8081/api/g/core_people"
        columns={columnsInclude}
        {...datatable}
      >
        <TableDataDisplay />
      </DataTableServer>
    </Provider>
  );
};
