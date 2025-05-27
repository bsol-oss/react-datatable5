import { Button } from "@chakra-ui/react";
import { useDataTableContext } from "../context/useDataTableContext";

export const ResetSelectionButton = () => {
  const { table } = useDataTableContext();
  const { tableLabel } = useDataTableContext();
  const { resetSelection } = tableLabel;
  return (
    <Button
      onClick={() => {
        table.resetRowSelection();
      }}
    >
      {resetSelection}
    </Button>
  );
};
