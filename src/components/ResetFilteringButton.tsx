import { useContext } from "react";
import { TableContext } from "./DataTableContext";
import { Button } from "@chakra-ui/react";

export const ResetFilteringButton = () => {
  const { table } = useContext(TableContext);
  return (
    <Button
      onClick={() => {
        table.resetColumnFilters();
      }}
    >
      Reset Filtering
    </Button>
  );
};
