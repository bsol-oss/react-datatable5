import { Grid, Flex, Image, Text, ImageProps } from "@chakra-ui/react";
import { Row } from "@tanstack/react-table";
import { IconType } from "react-icons";
import { Tag } from "@/components/ui/tag";
export interface CardHeaderProps<TData> {
  row: Row<TData>;
  imageColumnId?: keyof TData;
  titleColumnId?: keyof TData;
  tagColumnId?: keyof TData;
  tagIcon?: IconType;
  showTag?: boolean;
  imageProps?: ImageProps;
}

export const CardHeader = <TData,>({
  row,
  imageColumnId = undefined,
  titleColumnId = undefined,
  tagColumnId = undefined,
  tagIcon = undefined,
  showTag = true,
  imageProps = {},
}: CardHeaderProps<TData>) => {
  if (!!row.original === false) {
    return <></>;
  }

  const isShowFirstColumn = !!titleColumnId || showTag;

  return (
    <Grid templateRows={"auto auto"} gap={"1rem"}>
      {!!imageColumnId && (
        <Image
          src={row.original[imageColumnId!] as string}
          {...imageProps}
          objectFit={"contain"}
        />
      )}
      {isShowFirstColumn && (
        <Flex gap={"0.5rem"} flexFlow={"wrap"}>
          {!!titleColumnId && (
            <Text fontWeight={"bold"} fontSize={"large"}>
              {row.original[titleColumnId!] as string}
            </Text>
          )}
          {showTag && (
            <Tag fontSize={"large"} startElement={tagIcon && tagIcon({})}>
              {row.original[tagColumnId!] as string}
            </Tag>
          )}
        </Flex>
      )}
    </Grid>
  );
};
