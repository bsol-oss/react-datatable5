import { Input } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { useDataTableContext } from "../../index";
import { InputGroup } from "@/components/ui/input-group";

export const GlobalFilter = () => {
  const { table } = useDataTableContext();

  return (
    <>
      <InputGroup flex="1" startElement={<MdSearch />}>
        <Input
          placeholder="Outline"
          variant="outline"
          onChange={(e) => {
            table.setGlobalFilter(e.target.value);
          }}
        />
      </InputGroup>
    </>
  );
};
