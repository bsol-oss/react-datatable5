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
import { Box, Button, DialogBackdrop, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { IoMdEye } from "react-icons/io";
import { TableViewer } from "./TableViewer";
import { useDataTableContext } from "../context/useDataTableContext";

export interface EditViewButtonProps {
  icon?: React.ReactElement;
}

export const ViewDialog = ({ icon = <IoMdEye /> }: EditViewButtonProps) => {
  const viewModel = useDisclosure();
  const { translate } = useDataTableContext();

  return (
    <DialogRoot>
      <DialogBackdrop />
      <DialogTrigger asChild>
        <Button as={Box} variant={"ghost"} onClick={viewModel.onOpen}>
          {icon} {translate.t("viewDialog.buttonText")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>{translate.t("viewDialog.title")}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <TableViewer />
        </DialogBody>
        <DialogFooter />
      </DialogContent>
    </DialogRoot>
  );
};
