import { useContext } from "react";
import { TableContext } from "./DataTableContext";
import { Button } from "@chakra-ui/react";

export interface ResetSelectionButtonProps {
  text?: string;
}

export const ResetSelectionButton = ({
  text = "Reset Selection",
}: ResetSelectionButtonProps) => {
  const { table } = useContext(TableContext);
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
