import { useContext } from "react";
import { TableContext } from "./DataTableContext";
import { Button } from "@chakra-ui/react";

export interface ResetSortingButtonProps {
  text?: string;
}

export const ResetSortingButton = ({
  text = "Reset Sorting",
}: ResetSortingButtonProps) => {
  const { table } = useContext(TableContext);
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
