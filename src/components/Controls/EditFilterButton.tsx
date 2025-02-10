import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { MdFilterAlt } from "react-icons/md";
import { ResetFilteringButton, TableFilter } from "../../index";

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface EditFilterButtonProps {
  text?: string;
  title?: string;
  closeText?: string;
  resetText?: string;
  icon?: React.ReactElement;
}

export const EditFilterButton = ({
  text,
  title = "Edit Filter",
  closeText = "Close",
  resetText = "Reset",
  icon = <MdFilterAlt />,
}: EditFilterButtonProps) => {
  const filterModal = useDisclosure();
  return (
    <>
      <DialogRoot size={["full", "full", "md", "md"]} open={filterModal.open}>
        <DialogRoot>
          <DialogTrigger asChild>
            <Button as={Box} variant={'ghost'} onClick={filterModal.onOpen}>
              {icon} {text}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Flex flexFlow={"column"} gap={"1rem"}>
                <TableFilter />
                <ResetFilteringButton text={resetText} />
              </Flex>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button onClick={filterModal.onClose}>{closeText}</Button>
              </DialogActionTrigger>
              <Button>Save</Button>
            </DialogFooter>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogRoot>
      </DialogRoot>
    </>
  );
};
