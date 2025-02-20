import { snakeToLabel } from "@/components/Form/utils/snakeToLabel";
import { Box, BoxProps, Text } from "@chakra-ui/react";

export interface RecordDisplayProps {
  object: object | null;
  boxProps?: BoxProps;
}

export const RecordDisplay = ({ object, boxProps }: RecordDisplayProps) => {
  if (object === null) {
    return <>null</>;
  }
  return (
    <Box
      rowGap={1}
      columnGap={2}
      display={"grid"}
      gridTemplateColumns={"auto 1fr"}
      overflow={"auto"}
      {...boxProps}
    >
      {Object.entries(object).map(([field, value]) => {
        return (
          <>
            <Text color={"gray.400"}>{snakeToLabel(field)}</Text>
            <Text>
              {typeof value === "object" ? JSON.stringify(value) : value}
            </Text>
          </>
        );
      })}
    </Box>
  );
};
