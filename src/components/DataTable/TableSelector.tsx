import { Box, Button, Icon, IconButton } from "@chakra-ui/react";
import { useContext } from "react";
import { IoMdCheckbox } from "react-icons/io";
import { MdClear } from "react-icons/md";
import { SelectAllRowsToggle } from "../Controls/SelectAllRowsToggle";
import { TableContext } from "./DataTableContext";
export const TableSelector = () => {
  const { table } = useContext(TableContext);
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
          <Icon as={IoMdCheckbox} />
        </Button>
      )}
      {!table.getIsAllPageRowsSelected() && <SelectAllRowsToggle />}
      {table.getSelectedRowModel().rows.length > 0 && (
        <IconButton
          variant={"ghost"}
          icon={<Icon as={MdClear} />}
          onClick={() => {
            table.resetRowSelection();
          }}
          aria-label={"reset selection"}
        ></IconButton>
      )}
    </>
  );
};
