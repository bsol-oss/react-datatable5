import { Button, IconButton, Tooltip } from "@chakra-ui/react";
import { IoReload } from "react-icons/io5";
import { useDataTableContext } from "./useDataTableContext";

export interface ReloadButtonProps {
  text?: string;
  variant?: string;
}

export const ReloadButton = ({
  text = "Reload",
  variant = "icon",
}: ReloadButtonProps) => {
  const { refreshData } = useDataTableContext();
  if (variant === "icon") {
    return (
      <Tooltip label={"refresh"}>
        <IconButton
          variant={"ghost"}
          icon={<IoReload />}
          onClick={() => {
            refreshData();
          }}
          aria-label={"refresh"}
        ></IconButton>
      </Tooltip>
    );
  }
  return (
    <Button
      variant={"ghost"}
      leftIcon={<IoReload />}
      onClick={() => {
        refreshData();
      }}
    >
      {text}
    </Button>
  );
};
