import { Button } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { useDataTable } from "./useDataTable";

export interface FilterOptionsProps {
  column: string;
}

export const FilterOptions = ({ column }: FilterOptionsProps) => {
  const { table } = useDataTable();
  const tableColumn = table.getColumn(column);
  const options = tableColumn?.columnDef.meta?.filterOptions ?? [];

  return (
    <>
      {options.map((option) => {
        const selected = table.getColumn(column)?.getFilterValue() === option;
        return (
          <Button
            key={option}
            size={"sm"}
            onClick={() => {
              if (selected) {
                table.setColumnFilters((state) => {
                  return state.filter((filter) => {
                    return filter.id !== column;
                  });
                });
                return;
              }
              table.getColumn(column)?.setFilterValue(option);
            }}
            variant={selected ? "solid" : "outline"}
            display={'flex'}
            gap={'0.25rem'}
          >
            {option}
            {selected && <MdClose />}
          </Button>
        );
      })}
    </>
  );
};
