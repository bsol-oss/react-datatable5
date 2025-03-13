import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { MdFilterAlt } from "react-icons/md";

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
import { TableFilter } from "./TableFilters";
import { ResetFilteringButton } from "./ResetFilteringButton";
import { useDataTableContext } from "../context/useDataTableContext";

export interface EditFilterButtonProps {
  icon?: React.ReactElement;
}

export const FilterDialog = ({
  icon = <MdFilterAlt />,
}: EditFilterButtonProps) => {
  const filterModal = useDisclosure();
  const { translate } = useDataTableContext();

  return (
    <DialogRoot size={["full", "full", "md", "md"]} open={filterModal.open}>
      <DialogTrigger asChild>
        <Button as={Box} variant={"ghost"} onClick={filterModal.onOpen}>
          {icon} {translate.t("filterDialog.buttonText")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{translate.t("filterDialog.title")}</DialogTitle>
        </DialogHeader>
        <DialogBody display={"flex"} flexFlow={"column"}>
          <TableFilter />
        </DialogBody>
        <DialogFooter>
          <ResetFilteringButton text={translate.t("filterDialog.reset")} />
          <Button onClick={filterModal.onClose} variant={"subtle"}>
            {translate.t("filterDialog.close")}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={filterModal.onClose}/>
      </DialogContent>
    </DialogRoot>
  );
};
