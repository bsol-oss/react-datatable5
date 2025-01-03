import { Grid, GridProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface TableCardContainerProps extends GridProps {
  children: ReactNode;
}

export const TableCardContainer = ({
  children,
  ...props
}: TableCardContainerProps) => {
  return (
    <Grid
      gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
      gap={"0.5rem"}
      {...props}
    >
      {children}
    </Grid>
  );
};
