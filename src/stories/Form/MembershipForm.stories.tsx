import { Form } from "@/components/Form/Form";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { membershipSchema } from "../schema";
import { JSONSchema7 } from "json-schema";
import type { Meta, StoryObj } from "@storybook/react";
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
    <ChakraProvider value={defaultSystem}>
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
    </ChakraProvider>
  );
};
