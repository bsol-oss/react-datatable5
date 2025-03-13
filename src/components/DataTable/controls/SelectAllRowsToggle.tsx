import { Button, IconButton } from "@chakra-ui/react";
import React from "react";
import { MdClear, MdOutlineChecklist } from "react-icons/md";
import { useDataTableContext } from "../context/useDataTableContext";

export interface SelectAllRowsToggleProps {
  selectAllIcon?: React.ReactElement;
  clearAllIcon?: React.ReactElement;
  selectAllText?: string;
  clearAllText?: string;
}

export const SelectAllRowsToggle = ({
  selectAllIcon = <MdOutlineChecklist />,
  clearAllIcon = <MdClear />,
  selectAllText = "",
  clearAllText = "",
}: SelectAllRowsToggleProps) => {
  const { table } = useDataTableContext();
  return (
    <>
      {!!selectAllText === false && (
        <IconButton
          variant={"ghost"}
          aria-label={
            table.getIsAllRowsSelected() ? clearAllText : selectAllText
          }
          onClick={(event) => {
            table.getToggleAllRowsSelectedHandler()(event);
          }}
        >
          {table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon}
        </IconButton>
      )}
      {!!selectAllText !== false && (
        <Button
          variant={"ghost"}
          onClick={(event) => {
            table.getToggleAllRowsSelectedHandler()(event);
          }}
        >
          {table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon}
          {table.getIsAllRowsSelected() ? clearAllText : selectAllText}
        </Button>
      )}
    </>
  );
};
