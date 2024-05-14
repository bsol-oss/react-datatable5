import {
  Checkbox,
  Flex,
  FormControl,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useContext } from "react";
import { IoMdEye } from "react-icons/io";
import { TableContext } from "./DataTableContext";

export const EditViewButton = () => {
  const { table } = useContext(TableContext);
  return (
    <Popover placement="auto">
      <PopoverTrigger>
        <IconButton aria-label="view" variant={"ghost"} icon={<IoMdEye />} />
      </PopoverTrigger>
      <PopoverContent width={"auto"}>
        <PopoverArrow />
        <PopoverBody>
          <Flex flexFlow={"column"} gap={"1rem"}>
            {table.getAllLeafColumns().map((column) => {
              return (
                <FormControl key={crypto.randomUUID()} width={"auto"}>
                  <Checkbox
                    isChecked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                  >
                    {column.id}
                  </Checkbox>
                </FormControl>
              );
            })}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
