import { IconButton, Tooltip } from "@chakra-ui/react";
import { useContext } from "react";
import { MdClear, MdOutlineChecklist } from "react-icons/md";
import { TableContext } from "./DataTableContext";

export const SelectAllRowsToggle = () => {
  const { table } = useContext(TableContext);
  return (
    <Tooltip label={table.getIsAllRowsSelected() ? "Clear All" : "Select All"}>
      <IconButton
        variant={"ghost"}
        aria-label={table.getIsAllRowsSelected() ? "Clear All" : "Select All"}
        icon={
          table.getIsAllRowsSelected() ? <MdClear /> : <MdOutlineChecklist />
        }
        onClick={(event) => {
          table.getToggleAllRowsSelectedHandler()(event);
        }}
      />
    </Tooltip>
  );
};
