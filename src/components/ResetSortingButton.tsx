import { useContext } from "react";
import { TableContext } from "./DataTableContext";
import { Button } from "@chakra-ui/react";

const ResetSortingButton = () => {
  const { table } = useContext(TableContext);
  return (
    <Button
      onClick={() => {
        table.resetSorting();
      }}
    >
      Reset Sorting
    </Button>
  );
};

export default ResetSortingButton;
