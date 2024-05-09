import { Tooltip, Text } from "@chakra-ui/react";

export interface TextCellProps {
  label?: string;
  children: string | number | JSX.Element | JSX.Element[];
}

export const TextCell = ({ label, children }: TextCellProps) => {
  if (label) {
    return (
      <Tooltip
        label={
          <Text
            as="span"
            overflow="hidden"
            textOverflow={"ellipsis"}
            noOfLines={[5]}
          >
            {label}
          </Text>
        }
        placement="auto"
      >
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
  }
  return (
    <Text
      as="span"
      overflow="hidden"
      textOverflow={"ellipsis"}
      noOfLines={[1, 2, 3]}
    >
      {children}
    </Text>
  );
};
