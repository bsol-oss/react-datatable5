import type { Meta, StoryObj } from "@storybook/react";
import FormShowcase from "./FormShowcase";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/Form",
  component: FormShowcase,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof FormShowcase>;

type Story = StoryObj<typeof meta>;


export const Form: Story = {
  render: () => {
    return <FormShowcase />;
  },
};


export default meta;
