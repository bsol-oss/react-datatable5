import { Form } from "@/components/Form/Form";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { membershipSchema } from "../schema";
import { JSONSchema7 } from "json-schema";
import axios from "axios";
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
const clearEmptyString = (object) => {
  return Object.fromEntries(
    Object.entries(object).filter(([key, value]) => value !== "")
  );
};

const MembershipForm = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Form
        schema={membershipSchema as JSONSchema7}
        ignore={["id", "created_at", "updated_at"]}
        onSubmit={async (data) => {
          const options = {
            method: "POST",
            url: "http://localhost:8081/api/g/core_memberships",
            headers: {
              Apikey: "YOUR_SECRET_TOKEN",
              "Content-Type": "application/json",
            },
            data: clearEmptyString(data),
          };

          try {
            const { data } = await axios.request(options);
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        }}
      />
    </ChakraProvider>
  );
};

