import { Box, Grid, GridProps } from "@chakra-ui/react";
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
      <Box overflow={"scroll"} display={"flex"} gap={"1rem"}>
        {children}
      </Box>
    );
  }
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
