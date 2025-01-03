import {
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
import { MdOutlineMoveDown } from "react-icons/md";
import { TableOrderer } from "../../index";
import React from "react";

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
        <DialogTrigger>
          <Button variant={"ghost"}>
            {icon}
            {text}
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
