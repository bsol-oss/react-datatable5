import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { EditFilterButton } from "./EditFilterButton";
import { EditViewButton } from "./EditViewButton";
import { GlobalFilter } from "./GlobalFilter";
import { PageSizeControl } from "./PageSizeControl";
import { RowCountText } from "./RowCountText";
import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";
import { TableHeader } from "./TableHeader";
import { TablePagination } from "./TablePagination";
import { Table } from "./Table";

export const DefaultTable = ({ totalText = "Total:" }) => {
  return (
    <Grid templateRows={"auto 1fr auto"} templateColumns={"1fr 1fr"}>
      <Flex justifyContent={"space-between"} gridColumn={"1 / span 2"}>
        <Box>
          <EditViewButton text={"View"} />
        </Box>
        <Flex gap={"1rem"} justifySelf={"end"}>
          <GlobalFilter />
          <EditFilterButton text={"Advanced Filter"} />
        </Flex>
      </Flex>

      <Flex
        overflow={"auto"}
        gridColumn={"1 / span 2"}
        justifyContent={"center"}
      >
        <Table variant={"striped"} alignSelf={"center"}>
          <TableHeader canResize />
          <TableBody />
          <TableFooter />
        </Table>
      </Flex>

      <Flex gap={"1rem"} alignItems={"center"}>
        <PageSizeControl pageSizes={[25, 50]} />
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
