import { Button } from "@chakra-ui/react";
import { IoReload } from "react-icons/io5";
import { useDataTable } from "./useDataTable";

export interface ReloadButtonProps {
  text?: string;
}

export const ReloadButton = ({ text = "Reload" }: ReloadButtonProps) => {
  const { refreshData } = useDataTable();
  return (
    <Button
      leftIcon={<IoReload />}
      onClick={() => {
        refreshData();
      }}
    >
      {text}
    </Button>
  );
};
