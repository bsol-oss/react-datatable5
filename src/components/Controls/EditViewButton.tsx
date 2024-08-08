import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { IoMdEye } from "react-icons/io";
import { TableViewer } from "./TableViewer";

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
      {!!text === false && (
        <IconButton
          icon={icon}
          variant={"ghost"}
          onClick={viewModel.onOpen}
          aria-label={"change sorting"}
        />
      )}
      {!!text !== false && (
        <Button leftIcon={icon} variant={"ghost"} onClick={viewModel.onOpen}>
          {text}
        </Button>
      )}
      <Modal
        isOpen={viewModel.isOpen}
        onClose={viewModel.onClose}
        size={["full", "full", "md", "md"]}
      >
        <ModalOverlay />
        <ModalContent padding={"0 0 1rem 0"}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableViewer />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
