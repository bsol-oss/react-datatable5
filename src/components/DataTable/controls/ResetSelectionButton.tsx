import { Button } from '@chakra-ui/react';
import { useDataTableContext } from '../context/useDataTableContext';
import { resetRowSelection } from '../utils/selectors';

export const ResetSelectionButton = () => {
  const { tableLabel, setRowSelection } = useDataTableContext();
  const { resetSelection } = tableLabel;
  return (
    <Button
      onClick={() => {
        resetRowSelection(setRowSelection);
      }}
    >
      {resetSelection}
    </Button>
  );
};
