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
import { MdOutlineSort } from "react-icons/md";
import { ResetSortingButton } from "./ResetSortingButton";
import TableSorter from "./TableSorter";

export const EditSortingButton = () => {
  return (
    <Popover placement="bottom-end">
      <Tooltip label="Filter">
        <PopoverTrigger>
          <IconButton aria-label="filter" icon={<MdOutlineSort />} />
        </PopoverTrigger>
      </Tooltip>

      <PopoverContent width={"auto"}>
        <PopoverArrow />
        <PopoverBody>
          <Flex flexFlow={"column"} gap={"1rem"}>
            <TableSorter />
            <ResetSortingButton />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
