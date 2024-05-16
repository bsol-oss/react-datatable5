import { Box, Text, Tooltip } from "@chakra-ui/react";

export interface TextCellProps {
  label?: string;
  noOfLines?: number[];
  padding?: string;
  children: string | number | JSX.Element | JSX.Element[];
}

export const TextCell = ({
  label,
  noOfLines = [1],
  padding = "0rem",
  children,
}: TextCellProps) => {
  if (label) {
    return (
      <Box padding={padding}>
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
          <Text as="span" textOverflow={"ellipsis"} noOfLines={noOfLines}>
            {children}
          </Text>
        </Tooltip>
      </Box>
    );
  }
  return (
    <Box padding={padding}>
      <Text
        as="span"
        overflow="hidden"
        textOverflow={"ellipsis"}
        noOfLines={noOfLines}
      >
        {children}
      </Text>
    </Box>
  );
};
