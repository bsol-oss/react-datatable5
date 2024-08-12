import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { useDataTableContext } from "../../index";

export const GlobalFilter = ({ icon = MdSearch }) => {
  const { table } = useDataTableContext();

  return (
    <>
      <Box>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={icon} color="gray.300" />
          </InputLeftElement>
          <Input
            value={table.getState().globalFilter.globalFilter}
            onChange={(e) => {
              if (!!e.target.value) {
                table.setGlobalFilter(undefined);
              }
              table.setGlobalFilter(e.target.value);
            }}
          />
        </InputGroup>
      </Box>
    </>
  );
};
