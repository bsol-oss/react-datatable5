import { Form } from "@/components/Form/Form";
import type { Meta, StoryObj } from "@storybook/react";
import { JSONSchema7 } from "json-schema";
import { eventsSchema } from "../schema";
import { Provider } from "@/components/ui/provider";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/Form",
  component: Form,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof Form>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Event: Story = {
  render: () => {
    return (
      <Provider>
        <Form
          schema={eventsSchema as JSONSchema7}
          order={[]}
          ignore={["id", "created_at", "updated_at"]}
          serverUrl={"http://localhost:8081"}
          preLoadedValues={{}}
        />
      </Provider>
    );
  },
};

export const EventRow: Story = {
  render: () => {
    return (
      <Provider>
        <Form
          schema={eventsSchema as JSONSchema7}
          order={[
            "event_name",
            "parent_event_id",
            "start_date",
            "start_time",
            "end_date",
            "end_time",
            "is_recurring",
            "recurring_days",
            "recurring_type",
            "description",
          ]}
          ignore={["id", "created_at", "updated_at"]}
          serverUrl={"http://localhost:8081"}
          preLoadedValues={{
            recurring_days: ["mon"],
            remarks: "kookkook",
            start_date: "2025-02-13",
            event_name: "ckodsp",
            parent_event_id: ["98cfc50d-7fca-40da-ae7c-192f36cf766a"],
            is_recurring: true,
            end_date: "2025-02-14",
            end_time: "14:30:00Z",
            description: "dfkgjpaoskdf",
            recurring_type: ["weekly"],
            extra_info: {
              nice: "job",
            },
          }}
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
        />
      </Provider>
    );
  },
};
