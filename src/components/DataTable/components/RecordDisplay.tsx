import { snakeToLabel } from "@/components/Form/utils/snakeToLabel";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { DataListRootProps } from "@chakra-ui/react";

export interface RecordDisplayProps {
  object: object | null;
  dataListProps?: DataListRootProps;
}

export const RecordDisplay = ({
  object,
  dataListProps,
}: RecordDisplayProps) => {
  if (object === null) {
    return <>null</>;
  }
  return (
    <DataListRoot
      gap={4}
      padding={4}
      display={"grid"}
      variant={"subtle"}
      orientation={"horizontal"}
      overflow={"auto"}
      {...dataListProps}
    >
      {Object.entries(object).map(([field, value]) => {
        return (
          <DataListItem
            key={field}
            label={snakeToLabel(field)}
            value={JSON.stringify(value)}
          ></DataListItem>
        );
      })}
    </DataListRoot>
  );
};
