import { Flex, FlexProps, Grid, GridProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface TableCardContainerProps extends Omit<GridProps, 'direction'> {
  children: ReactNode;
  variant?: 'carousel' | '';
  gap?: string;
  gridTemplateColumns?: string;
  direction?: FlexProps['direction'];
}

export const TableCardContainer = ({
  children,
  variant = '',
  gap = '1rem',
  gridTemplateColumns = 'repeat(auto-fit, minmax(20rem, 1fr))',
  direction = 'row',
  ...props
}: TableCardContainerProps) => {
  if (variant === 'carousel') {
    return (
      <Flex overflow={'auto'} gap={gap} direction={direction} {...props}>
        {children}
      </Flex>
    );
  }
  return (
    <Grid gridTemplateColumns={gridTemplateColumns} gap={gap} {...props}>
      {children}
    </Grid>
  );
};
