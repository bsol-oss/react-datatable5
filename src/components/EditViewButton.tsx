import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger
} from "@chakra-ui/react";
import { IoMdEye } from "react-icons/io";
import { TableViewer } from "./TableViewer";

export const EditViewButton = () => {
  return (
    <Popover placement="auto">
      <PopoverTrigger>
        <IconButton aria-label="view" variant={"ghost"} icon={<IoMdEye />} />
      </PopoverTrigger>
      <PopoverContent width={"auto"}>
        <PopoverArrow />
        <PopoverBody>
          <TableViewer />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
