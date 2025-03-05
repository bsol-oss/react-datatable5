import { Form } from "@/components/Form/Form";
import { Provider } from "@/components/ui/provider";
import type { Meta, StoryObj } from "@storybook/react";
import axios from "axios";
import { JSONSchema7 } from "json-schema";
import { eventsTagsSchema } from "../schema";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/Form",
  component: Form,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof Form>;

type Story = StoryObj<typeof meta>;

export default meta;

export const EventsTags: Story = {
  render: () => {
    return (
      <Provider>
        <Form
          schema={eventsTagsSchema as JSONSchema7}
          serverUrl={"http://localhost:8081"}
          preLoadedValues={{}}
          rowNumber={9}
          onSubmit={async (data) => {
            const newRecords = Object.values(data["tag_id"])
              .map(({ current }: any) => {
                return current;
              })
              .reduce((previous, current) => {
                return [...previous, ...current];
              }, [])
              .filter((record) => record != null)
              .map((tag_id: string) => {
                return {
                  tag_id,
                  event_id: data["event_id"][0],
                };
              });

            const options = {
              method: "POST",
              url: `http://localhost:8081/api/g/events_tags/many`,
              headers: {
                Apikey: "YOUR_SECRET_TOKEN",
                "Content-Type": "application/json",
              },
              data: {
                data: newRecords,
              },
            };
            await axios.request(options);

            const oldRecords = Object.values(data["tag_id"])
              .map(({ old }: any) => {
                return old;
              })
              .reduce((previous, current) => {
                return [...previous, ...current];
              }, [])
              .map((tag_id: string) => {
                return {
                  tag_id,
                  event_id: data["event_id"][0],
                };
              });

            await axios.request({
              method: "DELETE",
              url: `http://localhost:8081/api/g/events_tags/many`,
              headers: {
                Apikey: "YOUR_SECRET_TOKEN",
                "Content-Type": "application/json",
              },
              data: {
                data: oldRecords,
              },
            });
          }}
        />
      </Provider>
    );
  },
};
