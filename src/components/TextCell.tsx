import { Box, Text, Tooltip, TooltipProps } from "@chakra-ui/react";

export interface TextCellProps {
  label?: string;
  noOfLines?: number[];
  padding?: string;
  children: string | number | JSX.Element | JSX.Element[];
  tooltipProps?: TooltipProps;
}

export const TextCell = ({
  label,
  noOfLines = [1],
  padding = "0rem",
  children,
  tooltipProps,
  ...props
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
          {...tooltipProps}
        >
          <Text
            as="span"
            overflow="hidden"
            textOverflow={"ellipsis"}
            wordBreak={"break-all"}
            noOfLines={noOfLines}
            {...props}
          >
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
        wordBreak={"break-all"}
        noOfLines={noOfLines}
      >
        {children}
      </Text>
    </Box>
  );
};
