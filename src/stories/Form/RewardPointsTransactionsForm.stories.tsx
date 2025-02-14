import { Form } from "@/components/Form/Form";
import { Provider } from "@/components/ui/provider";
import type { Meta, StoryObj } from "@storybook/react";
import { JSONSchema7 } from "json-schema";
import { rewardPointsTransactionsSchema } from "../schema";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/Form/Reward Points Transactions",
  component: Form,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof Form>;

type Story = StoryObj<typeof meta>;

export default meta;

export const RewardPointsTransactions: Story = {
  render: () => {
    return <MembershipForm />;
  },
};

const MembershipForm = () => {
  return (
    <Provider>
      <Form
        schema={rewardPointsTransactionsSchema as JSONSchema7}
        ignore={["id", "created_at", "updated_at"]}
        serverUrl={"http://localhost:8081"}
        order={[]}
      />
    </Provider>
  );
};
