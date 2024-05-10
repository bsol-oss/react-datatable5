import {
  ChevronUpIcon,
  UpDownIcon,
  ChevronDownIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { Flex, Button, Box, Select, Tag, IconButton } from "@chakra-ui/react";
import { useDataTable } from "./useDataTable";
import { useEffect, useState } from "react";
import { MdArrowDownward } from "react-icons/md";
import { MdArrowUpward } from "react-icons/md";
interface ColumnOrderChangerProps {
  columns: string[];
}

const ColumnOrderChanger = ({ columns }: ColumnOrderChangerProps) => {
  const [order, setOrder] = useState<string[]>([]);
  const [originalOrder, setOriginalOrder] = useState<string[]>([]);
  const { table } = useDataTable();
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
    <Flex gap={"0.5rem"} flexFlow={"column"}>
      <Flex gap={"0.5rem"} flexFlow={"column"}>
        {order.map((column, index) => (
          <Flex
            key={column}
            gap={"0.25rem"}
            alignItems={"center"}
            justifyContent={"center"}
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
            {column}
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
      <Box>
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
      </Box>
    </Flex>
  );
};

export const TableOrderer = () => {
  const { table } = useDataTable();
  return (
    <>
      <ColumnOrderChanger columns={table.getState().columnOrder} />
    </>
  );
};
