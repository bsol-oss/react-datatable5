import {
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@chakra-ui/react";
import { ResetSortingButton } from "./ResetSortingButton";
import { TableSorter } from "./TableSorter";
import { MdOutlineMoveDown } from "react-icons/md";
import { TableOrderer } from "./TableOrderer";

export const EditOrderButton = () => {
  return (
    <Popover placement="auto">
      <Tooltip label="Change Order">
        <PopoverTrigger>
          <IconButton aria-label="filter" icon={<MdOutlineMoveDown />} />
        </PopoverTrigger>
      </Tooltip>

      <PopoverContent width={"auto"}>
        <PopoverArrow />
        <PopoverBody>
          <Flex flexFlow={"column"} gap={"0.25rem"}>
            <TableOrderer />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
