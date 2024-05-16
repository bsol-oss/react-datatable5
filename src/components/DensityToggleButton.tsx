import { IconButton, Tooltip } from "@chakra-ui/react";
import { useContext } from "react";
import { TableContext } from "./DataTableContext";
import { AiOutlineColumnWidth } from "react-icons/ai";
export const DensityToggleButton = () => {
  const { table } = useContext(TableContext);
  return (
    <Tooltip label={"Toggle Density"}>
      <IconButton
        variant={"ghost"}
        aria-label={"Toggle Density"}
        icon={<AiOutlineColumnWidth />}
        onClick={(event) => {
          table.toggleDensity();
        }}
      />
    </Tooltip>
  );
};
