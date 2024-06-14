import { useContext } from "react";
import { TableContext } from "./DataTableContext";
import { Button } from "@chakra-ui/react";

export interface ResetFilteringButtonProps {
  text?: string;
}

export const ResetFilteringButton = ({
  text = "Reset Filtering",
}: ResetFilteringButtonProps) => {
  const { table } = useContext(TableContext);
  return (
    <Button
      onClick={() => {
        table.resetColumnFilters();
      }}
    >
      {text}
    </Button>
  );
};
