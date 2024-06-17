import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { MdOutlineViewColumn } from "react-icons/md";
import { EditFilterButton } from "./EditFilterButton";
import { EditViewButton } from "./EditViewButton";
import { GlobalFilter } from "./GlobalFilter";
import { PageSizeControl } from "./PageSizeControl";
import { RowCountText } from "./RowCountText";
import { Table } from "./Table";
import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";
import { TableHeader } from "./TableHeader";
import { TablePagination } from "./TablePagination";

export interface DefaultTableProps {
  totalText?: string;
  showFilter?: boolean;
  showFooter?: boolean;
  fitTableWidth?: boolean;
  fitTableHeight?: boolean;
  isMobile?: boolean;
}

export const DefaultTable = ({
  totalText = "Total:",
  showFilter = false,
  showFooter = false,
  fitTableWidth = false,
  fitTableHeight = false,
  isMobile = false,
}: DefaultTableProps) => {
  return (
    <Grid
      templateRows={"auto 1fr auto"}
      templateColumns={"1fr 1fr"}
      width={fitTableWidth ? "fit-content" : "100%"}
      height={fitTableHeight ? "fit-content" : "100%"}
      justifySelf={"center"}
      alignSelf={"center"}
      gap={"0.5rem"}
    >
      <Flex justifyContent={"space-between"} gridColumn={"1 / span 2"}>
        <Box>
          <EditViewButton
            text={isMobile ? undefined : "View"}
            icon={<MdOutlineViewColumn />}
          />
        </Box>
        <Flex gap={"1rem"} justifySelf={"end"}>
          {showFilter && (
            <>
              <GlobalFilter />
              <EditFilterButton
                text={isMobile ? undefined : "Advanced Filter"}
              />
            </>
          )}
        </Flex>
      </Flex>
      <Box
        overflow={"auto"}
        gridColumn={"1 / span 2"}
        width={"100%"}
        height={"100%"}
      >
        <Table variant={"striped"}>
          <TableHeader canResize />
          <TableBody />
          {showFooter && <TableFooter />}
        </Table>
      </Box>
      <Flex gap={"1rem"} alignItems={"center"}>
        <PageSizeControl />
        <Flex>
          <Text paddingRight={"0.5rem"}>{totalText}</Text>
          <RowCountText />
        </Flex>
      </Flex>
      <Box justifySelf={"end"}>
        <TablePagination />
      </Box>
    </Grid>
  );
};
