import { Tooltip } from "@/components/ui/tooltip";
import { Flex, FlexProps, Text, TextProps } from "@chakra-ui/react";
import { ReactNode } from "react";
export interface TextCellProps {
  label?: string;
  noOfLines?: number[];
  children: string | number | ReactNode | ReactNode[];
  containerProps?: FlexProps;
  textProps?: TextProps;
}

export const TextCell = ({
  label,
  containerProps = {},
  textProps = {},
  children,
}: TextCellProps) => {
  if (label) {
    return (
      <Flex
        alignItems={"center"}
        height={"100%"}
        {...containerProps}
      >
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
            {...textProps}
          >
            {children}
          </Text>
        </Tooltip>
      </Flex>
    );
  }
  return (
    <Flex
      alignItems={"center"}
      height={"100%"}
      {...containerProps}
    >
      <Text
        as="span"
        overflow="hidden"
        textOverflow={"ellipsis"}
        wordBreak={"break-all"}
        {...textProps}
      >
        {children}
      </Text>
    </Flex>
  );
};
