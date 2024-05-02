import { useContext } from "react";
import { TableContext } from "./DataTableContext";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

export const EditViewButton = () => {
  const { table } = useContext(TableContext);
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button>Edit View</Button>
      </PopoverTrigger>
      <PopoverContent width={"auto"}>
        <PopoverArrow />
        <PopoverBody>
          <Flex flexFlow={"column"} gap={"1rem"}>
            {table.getAllLeafColumns().map((column) => {
              console.log(column, "dsfjsaidfijo");
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
