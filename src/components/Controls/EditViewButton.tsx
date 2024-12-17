import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Button,
  DialogBackdrop,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { IoMdEye } from "react-icons/io";
import { TableViewer } from "../../index";

export interface EditViewButtonProps {
  text?: string;
  icon?: React.ReactElement;
  title?: string;
}

export const EditViewButton = ({
  text,
  icon = <IoMdEye />,
  title = "Edit View",
}: EditViewButtonProps) => {
  const viewModel = useDisclosure();
  return (
    <>
      <DialogRoot>
        <DialogBackdrop />
        <DialogTrigger>
          <Button variant={"ghost"} onClick={viewModel.onOpen}>
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
            <TableViewer />
          </DialogBody>
          <DialogFooter />
        </DialogContent>
      </DialogRoot>

    </>
  );
};
