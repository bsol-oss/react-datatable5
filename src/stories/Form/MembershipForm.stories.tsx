import { Form } from "@/components/Form/Form";
import { Provider } from "@/components/ui/provider";
import type { Meta, StoryObj } from "@storybook/react";
import { JSONSchema7 } from "json-schema";
import { membershipSchema } from "../schema";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/Form/Membership",
  component: Form,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof Form>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Membership: Story = {
  render: () => {
    return <MembershipForm />;
  },
};

const MembershipForm = () => {
  return (
    <Provider>
      <Form
        schema={membershipSchema as JSONSchema7}
        ignore={["id", "created_at", "updated_at"]}
        serverUrl={"http://localhost:8081"}
        order={[
          "membership_id",
          "person_id",
          "region_id",
          "expire_date",
          "person_in_charge_id",
        ]}
      />
    </Provider>
  );
};
