import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlineMoveDown } from "react-icons/md";
import { TableOrderer } from "./TableOrderer";
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
  const orderModal = useDisclosure();

  return (
    <>
      {!!text === false && (
        <IconButton
          icon={icon}
          variant={"ghost"}
          onClick={orderModal.onOpen}
          aria-label={"change order"}
        />
      )}
      {!!text !== false && (
        <Button leftIcon={icon} variant={"ghost"} onClick={orderModal.onOpen}>
          {text}
        </Button>
      )}
      <Modal
        isOpen={orderModal.isOpen}
        onClose={orderModal.onClose}
        size={["full", "full", "md", "md"]}
      >
        <ModalOverlay />
        <ModalContent padding={"0 0 1rem 0"}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexFlow={"column"} gap={"0.25rem"}>
              <TableOrderer />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
