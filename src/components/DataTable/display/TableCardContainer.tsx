import { Flex, Grid, GridProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface TableCardContainerProps extends GridProps {
  children: ReactNode;
  variant?: "carousel" | "";
}

export const TableCardContainer = ({
  children,
  variant = "",
  ...props
}: TableCardContainerProps) => {
  if (variant === "carousel") {
    return (
      <Flex overflow={"scroll"} gap={"1rem"}>
        {children}
      </Flex>
    );
  }
  return (
    <Grid
      gridTemplateColumns={"repeat(auto-fit, minmax(20rem, 1fr))"}
      gap={"0.5rem"}
      {...props}
    >
      {children}
    </Grid>
  );
};
