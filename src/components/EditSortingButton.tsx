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
import { MdOutlineSort } from "react-icons/md";
import { ResetSortingButton } from "./ResetSortingButton";
import { TableSorter } from "./TableSorter";

export interface EditSortingButtonProps {
  title?: string;
  icon?: React.ReactElement;
  text?: string;
}

export const EditSortingButton = ({
  text,
  icon = <MdOutlineSort />,
  title = "Edit Sorting",
}: EditSortingButtonProps) => {
  const sortingModal = useDisclosure();
  return (
    <>
      {!!text === false && (
        <IconButton
          icon={icon}
          variant={"ghost"}
          onClick={sortingModal.onOpen}
          aria-label={"change sorting"}
        />
      )}
      {!!text !== false && (
        <Button leftIcon={icon} variant={"ghost"} onClick={sortingModal.onOpen}>
          {text}
        </Button>
      )}
      <Modal
        isOpen={sortingModal.isOpen}
        onClose={sortingModal.onClose}
        size={["full", "full", "md", "md"]}
      >
        <ModalOverlay />
        <ModalContent padding={"0 0 1rem 0"}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexFlow={"column"} gap={"0.25rem"}>
              <TableSorter />
              <ResetSortingButton />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
