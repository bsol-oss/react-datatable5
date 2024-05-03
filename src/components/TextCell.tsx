import { Tooltip, Text } from "@chakra-ui/react";

export const TextCell = ({ label, children }: any) => {
  return (
    <Tooltip label={label}>
      <Text
        as="span"
        overflow="hidden"
        textOverflow={"ellipsis"}
        noOfLines={[1, 2, 3]}
      >
        {children}
      </Text>
    </Tooltip>
  );
};