import { Button } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";

export interface ResetFilteringButtonProps {
  text?: string;
}

export const ResetFilteringButton = ({
  text = "Reset Filtering",
}: ResetFilteringButtonProps) => {
  const { table } = useDataTable();
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
