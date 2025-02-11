import { Form } from "@/components/Form/Form";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { JSONSchema7 } from "json-schema";
import { eventsSchema, eventsTagsSchema } from "../schema";
import axios from "axios";

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
      <ChakraProvider value={defaultSystem}>
        <Form
          schema={eventsTagsSchema as JSONSchema7}
          serverUrl={"http://localhost:8081"}
          preLoadedValues={{}}
          rowNumber={9}
          displayText={{
            title: "標題",
            addNew: "新增",
            submit: "提交",
            confirm: "確定",
            save: "儲存",
            empty: "空",
            cancel: "取消",
            submitSuccess: "提交成功",
            submitAgain: "提交",
            fieldRequired: "必填項目",
          }}
          onSubmit={async (data) => {
            const options = {
              method: "POST",
              url: `http://localhost:8081/api/g/events_tags/many`,
              headers: {
                Apikey: "YOUR_SECRET_TOKEN",
                "Content-Type": "application/json",
              },
              data: {
                data: data["tag_id"]
                  .filter((tag: Record<string, unknown>) => tag != null)
                  .map((tag: Record<string, unknown>) => {
                    return {
                      ...tag,
                      event_id: data["event_id"],
                    };
                  }),
              },
            };
            await axios.request(options);
          }}
        />
      </ChakraProvider>
    );
  },
};
