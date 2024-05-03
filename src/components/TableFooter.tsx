import { Tfoot, Th, Tr } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";
import { flexRender } from "@tanstack/react-table";

export const TableFooter = () => {
  const table = useDataTable().table;
  return (
    <Tfoot>
      {table.getFooterGroups().map((footerGroup) => (
        <Tr key={crypto.randomUUID()}>
          {footerGroup.headers.map((header) => (
            <Th key={crypto.randomUUID()} colSpan={header.colSpan}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.footer,
                    header.getContext(),
                  )}
            </Th>
          ))}
        </Tr>
      ))}
    </Tfoot>
  );
};

export default TableFooter;
