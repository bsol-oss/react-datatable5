import { Button } from "@chakra-ui/react";
import { useDataTableContext } from "../context/useDataTableContext";

export const ResetFilteringButton = () => {
  const { table } = useDataTableContext();
  const { tableLabel } = useDataTableContext();
  const { filterReset } = tableLabel;
  return (
    <Button
      onClick={() => {
        table.resetColumnFilters();
      }}
    >
      {filterReset}
    </Button>
  );
};
