import { Text } from '@chakra-ui/react';
import { useDataTableContext } from '../context/useDataTableContext';

export const RowCountText = () => {
  const { table, type } = useDataTableContext();
  const getCount = () => {
    if (type === 'client') {
      return table.getFilteredRowModel().flatRows.length ?? 0;
    }
    return table.getRowCount();
  };

  const totalCount = getCount();
  const { pageIndex, pageSize } = table.getState().pagination;

  if (totalCount === 0) {
    return <Text>0 of 0</Text>;
  }

  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, totalCount);

  return <Text>{`${start}-${end} / ${totalCount}`}</Text>;
};
