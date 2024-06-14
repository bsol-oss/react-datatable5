import { Button, IconButton } from "@chakra-ui/react";
import React, { useContext } from "react";
import { MdClear, MdOutlineChecklist } from "react-icons/md";
import { TableContext } from "./DataTableContext";

export interface SelectAllRowsToggleProps {
  selectAllIcon: React.ReactElement;
  clearAllIcon: React.ReactElement;
  selectAllText: string;
  clearAllText: string;
}

export const SelectAllRowsToggle = ({
  selectAllIcon = <MdOutlineChecklist />,
  clearAllIcon = <MdClear />,
  selectAllText,
  clearAllText,
}: SelectAllRowsToggleProps) => {
  const { table } = useContext(TableContext);
  return (
    <>
      {!!selectAllText === false && (
        <IconButton
          icon={table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon}
          variant={"ghost"}
          aria-label={
            table.getIsAllRowsSelected() ? clearAllText : selectAllText
          }
          onClick={(event) => {
            table.getToggleAllRowsSelectedHandler()(event);
          }}
        />
      )}
      {!!selectAllText !== false && (
        <Button
          leftIcon={table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon}
          variant={"ghost"}
          onClick={(event) => {
            table.getToggleAllRowsSelectedHandler()(event);
          }}
        >
          {table.getIsAllRowsSelected() ? clearAllText : selectAllText}
        </Button>
      )}
    </>
  );
};
