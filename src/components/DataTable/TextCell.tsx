import { Tooltip } from "@/components/ui/tooltip";
import { Flex, Text, TextProps } from "@chakra-ui/react";
import { ReactNode } from "react";
export interface TextCellProps extends TextProps {
  label?: string;
  noOfLines?: number[];
  padding?: string;
  children: string | number | ReactNode | ReactNode[];
}

export const TextCell = ({
  label,
  padding = "0rem",
  children,
  ...props
}: TextCellProps) => {
  if (label) {
    return (
      <Flex alignItems={"center"} height={"100%"} padding={padding}>
        <Tooltip
          content={
            <Text as="span" overflow="hidden" textOverflow={"ellipsis"}>
              {label}
            </Text>
          }
        >
          <Text
            as="span"
            overflow="hidden"
            textOverflow={"ellipsis"}
            wordBreak={"break-all"}
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
        {...props}
      >
        {children}
      </Text>
    </Flex>
  );
};
