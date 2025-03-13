import { Box, Button, IconButton } from "@chakra-ui/react";
import { IoMdCheckbox } from "react-icons/io";
import { SelectAllRowsToggle } from "./SelectAllRowsToggle";
import { useDataTableContext } from "../context/useDataTableContext";
import { MdClear } from "react-icons/md";
export const TableSelector = () => {
  const { table } = useDataTableContext();
  return (
    <>
      {table.getSelectedRowModel().rows.length > 0 && (
        <Button
          onClick={() => {}}
          variant={"ghost"}
          display={"flex"}
          gap="0.25rem"
        >
          <Box
            fontSize={"sm"}
          >{`${table.getSelectedRowModel().rows.length}`}</Box>
          <IoMdCheckbox />
        </Button>
      )}
      {!table.getIsAllPageRowsSelected() && <SelectAllRowsToggle />}
      {table.getSelectedRowModel().rows.length > 0 && (
        <IconButton
          variant={"ghost"}
          onClick={() => {
            table.resetRowSelection();
          }}
          aria-label={"reset selection"}
        >
          <MdClear />
        </IconButton>
      )}
    </>
  );
};
