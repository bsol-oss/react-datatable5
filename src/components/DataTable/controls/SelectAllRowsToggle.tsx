import { Button, IconButton } from '@chakra-ui/react';
import React from 'react';
import { MdClear, MdOutlineChecklist } from 'react-icons/md';
import { useDataTableContext } from '../context/useDataTableContext';
import {
  areAllRowsSelected,
  createToggleAllRowsHandler,
} from '../utils/selectors';

export interface SelectAllRowsToggleProps {
  selectAllIcon?: React.ReactElement;
  clearAllIcon?: React.ReactElement;
  selectAllText?: string;
  clearAllText?: string;
}

export const SelectAllRowsToggle = ({
  selectAllIcon = <MdOutlineChecklist />,
  clearAllIcon = <MdClear />,
  selectAllText = '',
  clearAllText = '',
}: SelectAllRowsToggleProps) => {
  const { table, rowSelection, setRowSelection } = useDataTableContext();
  const allRowsSelected = areAllRowsSelected(table, rowSelection);
  const toggleHandler = createToggleAllRowsHandler(
    table,
    rowSelection,
    setRowSelection
  );

  return (
    <>
      {!!selectAllText === false && (
        <IconButton
          variant={'ghost'}
          aria-label={allRowsSelected ? clearAllText : selectAllText}
          onClick={toggleHandler}
        >
          {allRowsSelected ? clearAllIcon : selectAllIcon}
        </IconButton>
      )}
      {!!selectAllText !== false && (
        <Button variant={'ghost'} onClick={toggleHandler}>
          {allRowsSelected ? clearAllIcon : selectAllIcon}
          {allRowsSelected ? clearAllText : selectAllText}
        </Button>
      )}
    </>
  );
};
