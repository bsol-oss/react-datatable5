import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { useQueryClient } from "@tanstack/react-query";
import { IoReload } from "react-icons/io5";
import { useDataTableContext } from "../context/useDataTableContext";
import { useDataTableServerContext } from "../context/useDataTableServerContext";

export interface ReloadButtonProps {
  variant?: string;
}

export const ReloadButton = ({
  variant = "icon",
}: ReloadButtonProps) => {
  const { url } = useDataTableServerContext();
  const queryClient = useQueryClient();
  const { tableLabel } = useDataTableContext();
  const { reloadTooltip, reloadButtonText } = tableLabel;
  if (variant === "icon") {
    return (
      <Tooltip showArrow content={reloadTooltip}>
        <Button
          variant={"ghost"}
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: [url] });
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
      onClick={() => {
        queryClient.invalidateQueries({ queryKey: [url] });
      }}
    >
      <IoReload /> {reloadButtonText}
    </Button>
  );
};
