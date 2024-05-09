import { Grid } from "@chakra-ui/react";

export interface TableCardContainerProps {
  children: JSX.Element;
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
