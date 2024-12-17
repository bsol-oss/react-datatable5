import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
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
      <Tooltip showArrow content="This is the tooltip content">
        <Button
          variant={"ghost"}
          onClick={() => {
            refreshData();
          }}
          aria-label={"refresh"}
        >
          <IoReload />
        </Button>
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
