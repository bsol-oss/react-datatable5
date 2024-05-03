import { Grid } from "@chakra-ui/react";

interface TableCardContainerProps {
  children: JSX.Element;
}

const TableCardContainer = ({
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

export default TableCardContainer;
