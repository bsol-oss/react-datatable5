import { Button } from "@chakra-ui/react";
import { useDataTable } from "../../index";

export interface ResetSortingButtonProps {
  text?: string;
}

export const ResetSortingButton = ({
  text = "Reset Sorting",
}: ResetSortingButtonProps) => {
  const { table } = useDataTable();
  return (
    <Button
      onClick={() => {
        table.resetSorting();
      }}
    >
      {text}
    </Button>
  );
};
