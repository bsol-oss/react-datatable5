import type { StoryObj } from "@storybook/react";
declare const meta: {
    title: string;
    component: () => import("react/jsx-runtime").JSX.Element;
    parameters: {};
    argTypes: {};
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const TableView: Story;
export declare const TablePinningView: Story;
export declare const CardView: {
    render: () => import("react/jsx-runtime").JSX.Element;
};
