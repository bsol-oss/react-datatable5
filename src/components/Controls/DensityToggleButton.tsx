import { IconButton } from "@chakra-ui/react";
import React from "react";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { useDataTableContext } from "@/components/DataTable/context/useDataTableContext";

import { Button } from "@/components/ui/button";

export interface DensityToggleButtonProps {
  icon?: React.ReactElement;
  text?: string;
}

export const DensityToggleButton = ({
  text,
  icon = <AiOutlineColumnWidth />,
}: DensityToggleButtonProps) => {
  const { table } = useDataTableContext();
  return (
    <>
      {!!text === false && (
        <IconButton
          variant={"ghost"}
          aria-label={"Toggle Density"}
          onClick={() => {
            table.toggleDensity();
          }}
        >
          {icon}
        </IconButton>
      )}
      {!!text !== false && (
        <Button
          variant={"ghost"}
          aria-label={"Toggle Density"}
          onClick={() => {
            table.toggleDensity();
          }}
        >
          {icon}
          {text}
        </Button>
      )}
    </>
  );
};
