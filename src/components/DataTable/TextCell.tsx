import {
  Flex,
  Text,
  TextProps,
  Tooltip,
  TooltipProps
} from "@chakra-ui/react";

export interface TextCellProps extends TextProps {
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
      <Flex alignItems={"center"} height={"100%"} padding={padding}>
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
      </Flex>
    );
  }
  return (
    <Flex alignItems={"center"} height={"100%"} padding={padding}>
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
    </Flex>
  );
};
