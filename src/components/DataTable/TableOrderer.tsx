import { Button, Flex, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { useDataTableContext } from "./context/useDataTableContext";interface ColumnOrderChangerProps {
  columns: string[];
}

const ColumnOrderChanger = ({ columns }: ColumnOrderChangerProps) => {
  const [order, setOrder] = useState<string[]>([]);
  const [originalOrder, setOriginalOrder] = useState<string[]>([]);
  const { table } = useDataTableContext();

  const handleChangeOrder = (startIndex: number, endIndex: number) => {
    const newOrder = Array.from(order);
    const [removed] = newOrder.splice(startIndex, 1);
    newOrder.splice(endIndex, 0, removed);
    setOrder(newOrder);
  };

  useEffect(() => {
    setOrder(columns);
  }, [columns]);

  useEffect(() => {
    if (originalOrder.length > 0) {
      return;
    }
    if (columns.length <= 0) {
      return;
    }
    setOriginalOrder(columns);
  }, [columns]);

  return (
    <Flex gap={2} flexFlow={"column"}>
      <Flex gap={2} flexFlow={"column"}>
        {order.map((columnId, index) => (
          <Flex
            key={columnId}
            gap={2}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <IconButton
              onClick={() => {
                const prevIndex = index - 1;
                if (prevIndex >= 0) {
                  handleChangeOrder(index, prevIndex);
                }
              }}
              disabled={index === 0}
              aria-label={""}
            >
              <MdArrowUpward />
            </IconButton>
            {table
              .getAllFlatColumns()
              .filter((column) => {
                return column.id === columnId;
              })
              .map((column) => {
                const displayName =
                  column.columnDef.meta === undefined
                    ? column.id
                    : column.columnDef.meta.displayName;
                return <span key={column.id}>{displayName}</span>;
              })}
            <IconButton
              onClick={() => {
                const nextIndex = index + 1;
                if (nextIndex < order.length) {
                  handleChangeOrder(index, nextIndex);
                }
              }}
              disabled={index === order.length - 1}
              aria-label={""}
            >
              <MdArrowDownward />
            </IconButton>
          </Flex>
        ))}
      </Flex>
      <Flex gap={"0.25rem"}>
        <Button
          onClick={() => {
            table.setColumnOrder(order);
          }}
        >
          {"Apply"}
        </Button>
        <Button
          onClick={() => {
            table.setColumnOrder(originalOrder);
          }}
        >
          {"Reset"}
        </Button>
      </Flex>
    </Flex>
  );
};

export const TableOrderer = () => {
  const { table } = useDataTableContext();

  return (
    <>
      <ColumnOrderChanger columns={table.getState().columnOrder} />
    </>
  );
};
