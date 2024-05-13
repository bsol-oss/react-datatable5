import { Button, Checkbox, Tfoot, Th, Tr } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";
import { useDataTable } from "./useDataTable";

export const TableFooter = () => {
  const table = useDataTable().table;
  const SELECTION_BOX_WIDTH = 32;
  return (
    <Tfoot>
      {table.getFooterGroups().map((footerGroup) => (
        <Tr display={"flex"} key={crypto.randomUUID()}>
          <Th
            // styling resize and pinning start
            padding={"0.5rem"}
            {...(table.getIsSomeColumnsPinned("left")
              ? {
                  left: `0px`,
                  backgroundColor: "gray.50",
                  position: "sticky",
                  zIndex: 1,
                  _dark: { backgroundColor: "gray.700" },
                }
              : {})}
            // styling resize and pinning end
          >
            <Checkbox
              {...{
                isChecked: table.getIsAllRowsSelected(),
                // indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            ></Checkbox>
          </Th>
          {footerGroup.headers.map((header) => (
            <Th
              padding="0rem"
              key={crypto.randomUUID()}
              colSpan={header.colSpan}
              // styling resize and pinning start
              maxWidth={`${header.getSize()}px`}
              width={`${header.getSize()}px`}
              left={
                header.column.getIsPinned()
                  ? `${header.getStart("left") + SELECTION_BOX_WIDTH}px`
                  : undefined
              }
              backgroundColor={
                header.column.getIsPinned() ? "gray.50" : undefined
              }
              position={header.column.getIsPinned() ? "sticky" : "relative"}
              zIndex={header.column.getIsPinned() ? 1 : undefined}
              _dark={{
                backgroundColor: header.column.getIsPinned()
                  ? "gray.700"
                  : undefined,
              }}
              // styling resize and pinning end
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
            </Th>
          ))}
        </Tr>
      ))}
    </Tfoot>
  );
};
