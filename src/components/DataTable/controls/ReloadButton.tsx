import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { useQueryClient } from '@tanstack/react-query';
import { IoReload } from 'react-icons/io5';
import { useDataTableContext } from '../context/useDataTableContext';
import { useDataTableServerContext } from '../context/useDataTableServerContext';

export interface ReloadButtonProps {
  variant?: string;
}

export const ReloadButton = ({ variant = 'icon' }: ReloadButtonProps) => {
  const serverContext = useDataTableServerContext();
  const { url, query } = serverContext;
  const queryClient = useQueryClient();
  const { tableLabel } = useDataTableContext();
  const { reloadTooltip, reloadButtonText } = tableLabel;

  const handleReload = () => {
    // Only invalidate queries for server-side tables (when query exists)
    if (query && url) {
      queryClient.invalidateQueries({ queryKey: [url] });
    }
    // For client-side tables, reload button doesn't need to do anything
    // as the data is already in memory
  };

  if (variant === 'icon') {
    return (
      <Tooltip showArrow content={reloadTooltip}>
        <Button variant={'ghost'} onClick={handleReload} aria-label={'refresh'}>
          <IoReload />
        </Button>
      </Tooltip>
    );
  }
  return (
    <Button variant={'ghost'} onClick={handleReload}>
      <IoReload /> {reloadButtonText}
    </Button>
  );
};
