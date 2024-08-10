import { Button } from "@chakra-ui/react";
import { useDataTableContext } from "../../index";

export interface ResetFilteringButtonProps {
  text?: string;
}

export const ResetFilteringButton = ({
  text = "Reset Filtering",
}: ResetFilteringButtonProps) => {
  const { table } = useDataTableContext();
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
