import { Box, Button, IconButton } from '@chakra-ui/react';
import { IoMdCheckbox } from 'react-icons/io';
import { SelectAllRowsToggle } from './SelectAllRowsToggle';
import { useDataTableContext } from '../context/useDataTableContext';
import { MdClear } from 'react-icons/md';
import {
  getSelectedRowCount,
  areAllPageRowsSelected,
  resetRowSelection,
} from '../utils/selectors';

export const TableSelector = () => {
  const { table, rowSelection, setRowSelection } = useDataTableContext();
  const selectedCount = getSelectedRowCount(table, rowSelection);
  const allPageRowsSelected = areAllPageRowsSelected(table, rowSelection);

  return (
    <>
      {selectedCount > 0 && (
        <Button
          onClick={() => {}}
          variant={'ghost'}
          display={'flex'}
          gap="0.25rem"
        >
          <Box fontSize={'sm'}>{`${selectedCount}`}</Box>
          <IoMdCheckbox />
        </Button>
      )}
      {!allPageRowsSelected && <SelectAllRowsToggle />}
      {selectedCount > 0 && (
        <IconButton
          variant={'ghost'}
          onClick={() => {
            resetRowSelection(setRowSelection);
          }}
          aria-label={'reset selection'}
        >
          <MdClear />
        </IconButton>
      )}
    </>
  );
};
