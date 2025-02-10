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
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlineSort } from "react-icons/md";
import { ResetSortingButton, TableSorter } from "../../index";

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
      <DialogRoot size={["full", "full", "md", "md"]}>
        <DialogBackdrop />
        <DialogTrigger>
          <Button as="div" variant={"ghost"} onClick={sortingModal.onOpen}>
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
              <TableSorter />
              <ResetSortingButton />
            </Flex>
          </DialogBody>
          <DialogFooter />
        </DialogContent>
      </DialogRoot>
    </>
  );
};
