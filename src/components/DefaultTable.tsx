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

export const DefaultTable = ({ totalText = "Total:", showFilter = false }) => {
  return (
    <Grid
      templateRows={"auto 1fr auto"}
      templateColumns={"1fr 1fr"}
      width={"100%"}
      height={"100%"}
    >
      <Flex justifyContent={"space-between"} gridColumn={"1 / span 2"}>
        <Box>
          <EditViewButton text={"View"} icon={<MdOutlineViewColumn />} />
        </Box>
        <Flex gap={"1rem"} justifySelf={"end"}>
          {showFilter && (
            <>
              <GlobalFilter />
              <EditFilterButton text={"Advanced Filter"} />
            </>
          )}
        </Flex>
      </Flex>
      <Grid
        overflow={"auto"}
        gridColumn={"1 / span 2"}
        margin={"0 auto 0 auto"}
        width={"100%"}
        height={"100%"}
      >
        <Table variant={"striped"} justifySelf={"center"} alignSelf={"center"}>
          <TableHeader canResize />
          <TableBody />
          <TableFooter />
        </Table>
      </Grid>
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
