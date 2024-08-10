import { Button } from "@chakra-ui/react";
import { useDataTableContext } from "../../index";

export interface ResetSelectionButtonProps {
  text?: string;
}

export const ResetSelectionButton = ({
  text = "Reset Selection",
}: ResetSelectionButtonProps) => {
  const { table } = useDataTableContext();
  return (
    <Button
      onClick={() => {
        table.resetRowSelection();
      }}
    >
      {text}
    </Button>
  );
};
