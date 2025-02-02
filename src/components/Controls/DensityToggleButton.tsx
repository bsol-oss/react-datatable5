import { Button, IconButton } from "@chakra-ui/react";
import React from "react";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { useDataTableContext } from "../../index";

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
          icon={icon}
          onClick={() => {
            table.toggleDensity();
          }}
        />
      )}
      {!!text !== false && (
        <Button
          leftIcon={icon}
          variant={"ghost"}
          aria-label={"Toggle Density"}
          onClick={() => {
            table.toggleDensity();
          }}
        >
          {text}
        </Button>
      )}
    </>
  );
};
