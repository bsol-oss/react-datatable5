import { Box, Button, DialogBackdrop, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { IoMdEye } from "react-icons/io";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { useDataTableContext } from "../context/useDataTableContext";
import { TableViewer } from "./TableViewer";

export interface EditViewButtonProps {
  icon?: React.ReactElement;
}

export const ViewDialog = ({ icon = <IoMdEye /> }: EditViewButtonProps) => {
  const viewModel = useDisclosure();
  const { tableLabel } = useDataTableContext();
  const { view } = tableLabel;
  return (
    <DialogRoot>
      <DialogBackdrop />
      <DialogTrigger asChild>
        <Button as={Box} variant={"ghost"} onClick={viewModel.onOpen}>
          {icon} {view}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>{view}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <TableViewer />
        </DialogBody>
        <DialogFooter />
      </DialogContent>
    </DialogRoot>
  );
};
