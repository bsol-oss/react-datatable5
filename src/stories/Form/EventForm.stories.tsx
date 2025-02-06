import { Form } from "@/components/Form/Form";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { JSONSchema7 } from "json-schema";
import { eventsSchema } from "../schema";

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
      <ChakraProvider value={defaultSystem}>
        <Form
          schema={eventsSchema as JSONSchema7}
          order={[
          
          ]}
          ignore={["id", "created_at", "updated_at"]}
          serverUrl={"http://localhost:8081"}
          preLoadedValues={{
            street_number: "nice",
          }}
        />
      </ChakraProvider>
    );
  },
};
