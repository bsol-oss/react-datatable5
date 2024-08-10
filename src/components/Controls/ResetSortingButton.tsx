import { Button } from "@chakra-ui/react";
import { useDataTableContext } from "../../index";

export interface ResetSortingButtonProps {
  text?: string;
}

export const ResetSortingButton = ({
  text = "Reset Sorting",
}: ResetSortingButtonProps) => {
  const { table } = useDataTableContext();
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
