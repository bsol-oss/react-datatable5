import { DefaultForm } from "@/components/Form/components/core/DefaultForm";
import { useForm } from "@/components/Form/useForm";
import { Provider } from "@/components/ui/provider";
import { Box, Flex } from "@chakra-ui/react";
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

export const EventsGeolocations: Story = {
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

const eventsGeolocationsSchema = {
  title: "events_geolocations",
  required: ["someNumbers", "parent_id", "geolocations"],
  errorMessage: {
    required: {
      someNumbers: "Some Numbers is required goood",
    },
  },
  properties: {
    someNumbers: {
      type: "number",
    },
    someDateTimes: {
      type: "string",
      format: "date-time",
    },
    parent_id: {
      type: "string",
      format: "uuid",
    },
    geolocations: {
      type: "object",
      properties: {
        latitude: {
          type: "number",
          description:
            "Missing description. Database type: double precision. Default value: null",
        },
        longitude: {
          type: "number",
        },
        address: {
          type: "object",
          properties: {
            district: {
              type: "string",
            },
          },
        },
      },
    },
    child_records: {
      type: "array",
      items: {
        $id: "core_geolocations",
        type: "object",
        title: "core_geolocations",
        $schema: "http://json-schema.org/draft-07/schema#",
        example: {
          name: "Excepteur",
        },
        required: ["name"],
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description:
              "Missing description. Database type: uuid. Default value: uuid_generate_v4()",
          },
          city: {
            type: "string",
            maxLength: 255,
            description:
              "Missing description. Database type: character varying. Default value: null",
          },
          name: {
            type: "string",
            maxLength: 255,
            description:
              "Missing description. Database type: character varying. Default value: null",
          },
          region: {
            type: "string",
            maxLength: 255,
            description:
              "Missing description. Database type: character varying. Default value: null",
          },
          street: {
            type: "string",
            maxLength: 255,
            description:
              "Missing description. Database type: character varying. Default value: null",
          },
          country: {
            type: "string",
            maxLength: 255,
            description:
              "Missing description. Database type: character varying. Default value: null",
          },
          district: {
            type: "string",
            maxLength: 255,
            description:
              "Missing description. Database type: character varying. Default value: null",
          },
          latitude: {
            type: "number",
            description:
              "Missing description. Database type: double precision. Default value: null",
          },
          longitude: {
            type: "number",
            description:
              "Missing description. Database type: double precision. Default value: null",
          },
          created_at: {
            type: "string",
            format: "date-time",
            description:
              "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
          },
          deleted_at: {
            type: "string",
            format: "date-time",
            description:
              "Missing description. Database type: timestamp with time zone. Default value: null",
          },
          extra_info: {
            type: "object",
            properties: {},
            description:
              "Missing description. Database type: jsonb. Default value: null",
          },
          updated_at: {
            type: "string",
            format: "date-time",
            description:
              "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
          },
          description: {
            type: "string",
            description:
              "Missing description. Database type: text. Default value: null",
          },
        },
        description: "Missing description",
        searchingColumns: ["name"],
        additionalProperties: false,
      },
    },
    child_events: {
      type: "object",
      properties: {
        id: {
          type: "string",
          format: "uuid",
          description:
            "Missing description. Database type: uuid. Default value: uuid_generate_v4()",
        },
        remarks: {
          type: "string",
          description:
            "Missing description. Database type: text. Default value: null",
          gridColumn: "1/span 12",
          gridRow: "8/span 1",
        },
        end_date: {
          type: "string",
          variant: "date-picker",
          format: "date",
          gridColumn: "7/span 3",
          gridRow: "4/span 1",
          description:
            "Missing description. Database type: date. Default value: null",
        },
        end_time: {
          type: "string",
          format: "time",
          gridColumn: "10/span 3",
          gridRow: "4/span 1",
          description:
            "Missing description. Database type: time without time zone. Default value: null",
        },
        created_at: {
          type: "string",
          format: "date-time",
          description:
            "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
        },
        event_name: {
          type: "string",
          maxLength: 255,
          description:
            "Missing description. Database type: character varying. Default value: null",
          gridColumn: "1/span 12",
          gridRow: "1/span 1",
        },
        extra_info: {
          type: "object",
          properties: {},
          description:
            "Missing description. Database type: jsonb. Default value: null",
          gridColumn: "1/span 4",
          gridRow: "9/span 1",
        },
        start_date: {
          type: "string",
          variant: "date-picker",
          gridColumn: "1/span 3",
          gridRow: "4/span 1",
          format: "date",
          description:
            "Missing description. Database type: date. Default value: null",
        },
        start_time: {
          type: "string",
          format: "time",
          gridColumn: "4/span 3",
          gridRow: "4/span 1",
          description:
            "Missing description. Database type: time without time zone. Default value: null",
        },
        updated_at: {
          type: "string",
          format: "date-time",
          description:
            "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
        },
        description: {
          type: "string",
          description:
            "Missing description. Database type: text. Default value: null",
          gridColumn: "1/span 12",
          gridRow: "6/span 1",
        },
        is_recurring: {
          type: "boolean",
          description:
            "Missing description. Database type: boolean. Default value: false",
          gridColumn: "1/span 3",
          gridRow: "5/span 1",
        },
        recurring_days: {
          type: "string",
          description:
            "Missing description. Database type: text. Default value: null",
          gridColumn: "7/span 3",
          gridRow: "5/span 1",
          enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        },
        recurring_type: {
          type: "string",
          description:
            "Missing description. Database type: text. Default value: null",
          gridColumn: "4/span 3",
          gridRow: "5/span 1",
          enum: ["daily", "weekly", "biweekly", "monthly"],
        },
        parent_event_id: {
          type: "string",
          format: "uuid",
          description:
            "Missing description. Database type: uuid. Default value: null",
          gridColumn: "1/span 6",
          gridRow: "2/span 1",
          variant: "id-picker",
          foreign_key: {
            display_column: "name",
            table: "core_activities",
            column: "id",
          },
        },
      },
    },
    more_events: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description:
              "Missing description. Database type: uuid. Default value: uuid_generate_v4()",
          },
          remarks: {
            type: "string",
            description:
              "Missing description. Database type: text. Default value: null",
            gridColumn: "1/span 12",
            gridRow: "8/span 1",
          },
          end_date: {
            type: "string",
            variant: "date-picker",
            format: "date",
            gridColumn: "7/span 3",
            gridRow: "4/span 1",
            description:
              "Missing description. Database type: date. Default value: null",
          },
          end_time: {
            type: "string",
            format: "time",
            gridColumn: "10/span 3",
            gridRow: "4/span 1",
            description:
              "Missing description. Database type: time without time zone. Default value: null",
          },
          created_at: {
            type: "string",
            format: "date-time",
            description:
              "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
          },
          event_name: {
            type: "string",
            maxLength: 255,
            description:
              "Missing description. Database type: character varying. Default value: null",
            gridColumn: "1/span 12",
            gridRow: "1/span 1",
          },
          extra_info: {
            type: "object",
            properties: {},
            description:
              "Missing description. Database type: jsonb. Default value: null",
            gridColumn: "1/span 4",
            gridRow: "9/span 1",
          },
          start_date: {
            type: "string",
            variant: "date-picker",
            gridColumn: "1/span 3",
            gridRow: "4/span 1",
            format: "date",
            description:
              "Missing description. Database type: date. Default value: null",
          },
          start_time: {
            type: "string",
            format: "time",
            gridColumn: "4/span 3",
            gridRow: "4/span 1",
            description:
              "Missing description. Database type: time without time zone. Default value: null",
          },
          updated_at: {
            type: "string",
            format: "date-time",
            description:
              "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
          },
          description: {
            type: "string",
            description:
              "Missing description. Database type: text. Default value: null",
            gridColumn: "1/span 12",
            gridRow: "6/span 1",
          },
          is_recurring: {
            type: "boolean",
            description:
              "Missing description. Database type: boolean. Default value: false",
            gridColumn: "1/span 3",
            gridRow: "5/span 1",
          },
          recurring_days: {
            type: "string",
            description:
              "Missing description. Database type: text. Default value: null",
            gridColumn: "7/span 3",
            gridRow: "5/span 1",
            enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
          },
          recurring_type: {
            type: "string",
            description:
              "Missing description. Database type: text. Default value: null",
            gridColumn: "4/span 3",
            gridRow: "5/span 1",
            enum: ["daily", "weekly", "biweekly", "monthly"],
          },
          parent_event_id: {
            type: "string",
            format: "uuid",
            description:
              "Missing description. Database type: uuid. Default value: null",
            gridColumn: "1/span 6",
            gridRow: "2/span 1",
            variant: "id-picker",
            foreign_key: {
              display_column: "name",
              table: "core_activities",
              column: "id",
            },
          },
          child_events: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  format: "uuid",
                  description:
                    "Missing description. Database type: uuid. Default value: uuid_generate_v4()",
                },
                remarks: {
                  type: "string",
                  description:
                    "Missing description. Database type: text. Default value: null",
                  gridColumn: "1/span 12",
                  gridRow: "8/span 1",
                },
                end_date: {
                  type: "string",
                  variant: "date-picker",
                  format: "date",
                  gridColumn: "7/span 3",
                  gridRow: "4/span 1",
                  description:
                    "Missing description. Database type: date. Default value: null",
                },
                end_time: {
                  type: "string",
                  format: "time",
                  gridColumn: "10/span 3",
                  gridRow: "4/span 1",
                  description:
                    "Missing description. Database type: time without time zone. Default value: null",
                },
                created_at: {
                  type: "string",
                  format: "date-time",
                  description:
                    "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
                },
                event_name: {
                  type: "string",
                  maxLength: 255,
                  description:
                    "Missing description. Database type: character varying. Default value: null",
                  gridColumn: "1/span 12",
                  gridRow: "1/span 1",
                },
                extra_info: {
                  type: "object",
                  properties: {},
                  description:
                    "Missing description. Database type: jsonb. Default value: null",
                  gridColumn: "1/span 4",
                  gridRow: "9/span 1",
                },
                start_date: {
                  type: "string",
                  variant: "date-picker",
                  gridColumn: "1/span 3",
                  gridRow: "4/span 1",
                  format: "date",
                  description:
                    "Missing description. Database type: date. Default value: null",
                },
                start_time: {
                  type: "string",
                  format: "time",
                  gridColumn: "4/span 3",
                  gridRow: "4/span 1",
                  description:
                    "Missing description. Database type: time without time zone. Default value: null",
                },
                updated_at: {
                  type: "string",
                  format: "date-time",
                  description:
                    "Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP",
                },
                description: {
                  type: "string",
                  description:
                    "Missing description. Database type: text. Default value: null",
                  gridColumn: "1/span 12",
                  gridRow: "6/span 1",
                },
                is_recurring: {
                  type: "boolean",
                  description:
                    "Missing description. Database type: boolean. Default value: false",
                  gridColumn: "1/span 3",
                  gridRow: "5/span 1",
                },
                recurring_days: {
                  type: "string",
                  description:
                    "Missing description. Database type: text. Default value: null",
                  gridColumn: "7/span 3",
                  gridRow: "5/span 1",
                  enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
                },
                recurring_type: {
                  type: "string",
                  description:
                    "Missing description. Database type: text. Default value: null",
                  gridColumn: "4/span 3",
                  gridRow: "5/span 1",
                  enum: ["daily", "weekly", "biweekly", "monthly"],
                },
                parent_event_id: {
                  type: "string",
                  format: "uuid",
                  description:
                    "Missing description. Database type: uuid. Default value: null",
                  gridColumn: "1/span 6",
                  gridRow: "2/span 1",
                  variant: "id-picker",
                  foreign_key: {
                    display_column: "event_name",
                    table: "core_events",
                    column: "id",
                  },
                },
              },
            },
          },
          numbers: {
            type: "array",
            items: {
              type: "number",
            },
          },
          strings: {
            type: "array",
            items: {
              type: "string",
            },
          },
          booleans: {
            type: "array",
            items: {
              type: "boolean",
            },
          },
        },
      },
    },
    some_events: {
      type: "array",
      items: {
        type: "string",
      },
      variant: "id-picker",
      foreign_key: {
        display_column: "name",
        table: "core_activities",
        column: "id",
      },
    },
  },
};

const SomeForm = () => {
  const form = useForm({
    keyPrefix: "nice",
    preLoadedValues: { parent_id: "nice" },
  });

  return (
    <Flex>
      <DefaultForm
        formConfig={{
        schema: eventsGeolocationsSchema as JSONSchema7,
        serverUrl: "http://localhost:8123",
        onSubmit: (data) => {
          console.log("nice", data, "onSubmit-gkrp");
        },
        ...form,
        }}
      />
    </Flex>
  );
};
