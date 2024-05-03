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
import { MdFilterAlt } from "react-icons/md";
import { ResetFilteringButton } from "./ResetFilteringButton";
import TableFilter from "./TableFilter";

export const EditFilterButton = () => {
  return (
    <Popover placement="bottom-end">
      <Tooltip label="Filter">
        <PopoverTrigger>
          <IconButton aria-label="filter" icon={<MdFilterAlt />} />
        </PopoverTrigger>
      </Tooltip>

      <PopoverContent width={"auto"}>
        <PopoverArrow />
        <PopoverBody>
          <Flex flexFlow={"column"} gap={"1rem"}>
            <TableFilter />
            <ResetFilteringButton />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
