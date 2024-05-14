import { useContext } from "react";
import { TableContext } from "./DataTableContext";
import { Button } from "@chakra-ui/react";

export const ResetSelectionButton = () => {
  const { table } = useContext(TableContext);
  return (
    <Button
      onClick={() => {
        table.resetRowSelection();
      }}
    >
      Reset Selection
    </Button>
  );
};
