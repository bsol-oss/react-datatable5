import {
  Button,
  Flex,
  IconButton,
  useDisclosure
} from "@chakra-ui/react";
import { MdFilterAlt } from "react-icons/md";
import { ResetFilteringButton, TableFilter } from "../../index";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
  ...props
}: EditFilterButtonProps) => {
  const filterModal = useDisclosure();
  return (
    <>
      {!!text === false && (
        <IconButton
          icon={icon}
          variant={"ghost"}
          onClick={filterModal.onOpen}
          aria-label={"filter"}
          {...props}
        />
      )}
      {!!text !== false && (
        <Button
          leftIcon={icon}
          variant={"ghost"}
          onClick={filterModal.onOpen}
          {...props}
        >
          {text}
        </Button>
      )}

      <Modal
        isOpen={filterModal.isOpen}
        onClose={filterModal.onClose}
        size={["full", "full", "md", "md"]}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexFlow={"column"} gap={"1rem"}>
              <TableFilter />
              <ResetFilteringButton text={resetText} />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button onClick={filterModal.onClose}>{closeText}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
