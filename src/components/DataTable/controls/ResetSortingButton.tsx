import { Button } from "@chakra-ui/react";
import { useDataTableContext } from "../context/useDataTableContext";

export const ResetSortingButton = () => {
  const { table } = useDataTableContext();
  const { tableLabel } = useDataTableContext();
  const { resetSorting } = tableLabel;
  return (
    <Button
      onClick={() => {
        table.resetSorting();
      }}
    >
      {resetSorting}
    </Button>
  );
};
