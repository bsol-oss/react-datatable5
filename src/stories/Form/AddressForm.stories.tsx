import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "@/components/Form/Form";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { addressSchema } from "../schema";
import { JSONSchema7 } from "json-schema";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/Form",
  component: Form,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof Form>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Address: Story = {
  render: () => {
    return <AddressForm />;
  },
};

const AddressForm = () => {
  return (
    <Provider>
      <Form
        schema={addressSchema as JSONSchema7}
        order={[
          "flat_number",
          "floor_number",
          "building_name",
          "street_name",
          "street_number",
          "village_name",
          "region",
          "district",
        ]}
        ignore={["id", "created_at", "updated_at"]}
        serverUrl={"http://localhost:8081"} 
        preLoadedValues={{
          "street_number": "nice"
        }}
      />
    </Provider>
  );
};
