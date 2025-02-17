import { Input } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { useDataTableContext } from "../../index";
import { InputGroup } from "@/components/ui/input-group";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export const GlobalFilter = () => {
  const { table } = useDataTableContext();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const searchHN = async () => {
      table.setGlobalFilter(debouncedSearchTerm);
    };

    searchHN();
  }, [debouncedSearchTerm]);

  return (
    <>
      <InputGroup flex="1" startElement={<MdSearch />}>
        <Input
          placeholder="Outline"
          variant="outline"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </InputGroup>
    </>
  );
};
