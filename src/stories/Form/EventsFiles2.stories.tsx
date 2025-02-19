import { Form } from "@/components/Form/Form";
import { Provider } from "@/components/ui/provider";
import type { Meta, StoryObj } from "@storybook/react";
import axios from "axios";
import { JSONSchema7 } from "json-schema";
import { eventsFilesSchema2 } from "../schema";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/Form",
  component: Form,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof Form>;

type Story = StoryObj<typeof meta>;

export default meta;

export const EventsFiles2: Story = {
  render: () => {
    return (
      <Provider>
        <Form
          schema={eventsFilesSchema2 as JSONSchema7}
          serverUrl={"http://localhost:8081"}
          preLoadedValues={{}}
          rowNumber={20}
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
        />
      </Provider>
    );
  },
};
