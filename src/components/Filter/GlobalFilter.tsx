import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { useDataTable } from "../../index";

export const GlobalFilter = ({ icon = MdSearch }) => {
  const { globalFilter, setGlobalFilter } = useDataTable();

  return (
    <>
      <Box>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={icon} color="gray.300" />
          </InputLeftElement>
          <Input
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
            }}
          />
        </InputGroup>
      </Box>
    </>
  );
};
