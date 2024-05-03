import type { Meta, StoryObj } from "@storybook/react";
import TableViewShowcase from "./TableViewShowcase";
import CardViewShowcase from "./CardViewShowcase";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Brararara/testt",
  component: TableViewShowcase,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof TableViewShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TableView: Story = {
  render: () => {
    return <TableViewShowcase />;
  },
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
// export const metaCard = {
//   title: "Example/Brararara/testt",
//   component: CardViewShowcase,
//   parameters: {
//     // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
//     // layout: 'centered',
//   },
//   // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
//   tags: ["autodocs"],
//   // More on argTypes: https://storybook.js.org/docs/api/argtypes
//   argTypes: {
//     // backgroundColor: { control: 'color' },
//   },
//   // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
//   // args: { onClick: fn() },
// } satisfies Meta<typeof CardViewShowcase>;

// type StoryCard = StoryObj<typeof metaCard>;
export const CardView = {
  render: () => {
    return <CardViewShowcase />;
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// export const Primary: Story = {
//   args: {
//     primary: true,
//     label: 'Button',
//   },
// };

// export const Secondary: Story = {
//   args: {
//     label: 'Button',
//   },
// };

// export const Large: Story = {
//   args: {
//     size: 'large',
//     label: 'Button',
//   },
// };

// export const Small: Story = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// };
