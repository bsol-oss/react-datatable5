import { Button } from "@chakra-ui/react";
import { useDataTable } from "../../index";

export interface ResetSelectionButtonProps {
  text?: string;
}

export const ResetSelectionButton = ({
  text = "Reset Selection",
}: ResetSelectionButtonProps) => {
  const { table } = useDataTable();
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
