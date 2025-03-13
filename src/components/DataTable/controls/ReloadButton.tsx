import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { useQueryClient } from "@tanstack/react-query";
import { IoReload } from "react-icons/io5";
import { useDataTableServerContext } from "../context/useDataTableServerContext";

export interface ReloadButtonProps {
  text?: string;
  variant?: string;
}

export const ReloadButton = ({
  text = "Reload",
  variant = "icon",
}: ReloadButtonProps) => {
  const { url } = useDataTableServerContext();
  const queryClient = useQueryClient();
  if (variant === "icon") {
    return (
      <Tooltip showArrow content="This is the tooltip content">
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
      <IoReload /> {text}
    </Button>
  );
};
