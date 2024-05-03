import { useContext } from "react";
import { TableContext } from "./DataTableContext";
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
import { IoMdEye } from "react-icons/io";

const EditViewButton = () => {
  const { table } = useContext(TableContext);
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <IconButton aria-label="view" icon={<IoMdEye />} />
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

export default EditViewButton;
