import { Input } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { useDataTableContext } from "../DataTable/context/useDataTableContext";
import { InputGroup } from "@/components/ui/input-group";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export const GlobalFilter = () => {
  const { table, tableLabel } = useDataTableContext();
  const { globalFilterPlaceholder } = tableLabel;
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
          placeholder={globalFilterPlaceholder}
          variant="outline"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </InputGroup>
    </>
  );
};
