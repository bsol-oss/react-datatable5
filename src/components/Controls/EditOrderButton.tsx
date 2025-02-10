import {
  Box,
  Button,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineMoveDown } from "react-icons/md";
import { TableOrderer } from "../../index";

export interface EditOrderButtonProps {
  title?: string;
  icon?: React.ReactElement;
  text?: string;
}

export const EditOrderButton = ({
  text,
  icon = <MdOutlineMoveDown />,
  title = "Change Order",
}: EditOrderButtonProps) => {
  return (
    <>
      <DialogRoot size="cover">
        <DialogBackdrop />
        <DialogTrigger asChild>
          <Button as={Box} variant={"ghost"}>
            {icon} {text}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogCloseTrigger />
          <DialogHeader>
            <DialogTitle />
            {title}
          </DialogHeader>
          <DialogBody>
            <Flex flexFlow={"column"} gap={"0.25rem"}>
              <TableOrderer />
            </Flex>
          </DialogBody>
          <DialogFooter />
        </DialogContent>
      </DialogRoot>
    </>
  );
};
