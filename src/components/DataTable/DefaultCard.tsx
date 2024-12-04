import { Grid, Flex, Image, Text } from "@chakra-ui/react";
import { Row } from "@tanstack/react-table";
import { IconType } from "react-icons";
import { Tag } from "@/components/ui/tag";
export interface DefaultCardProps<TData> {
  row: Row<TData>;
  imageColumnId?: keyof TData;
  titleColumnId?: keyof TData;
  tagColumnId?: keyof TData;
  tagIcon?: IconType;
  showTag?: boolean;
}

export const DefaultCard = <TData,>({
  row,
  imageColumnId = undefined,
  titleColumnId = undefined,
  tagColumnId = undefined,
  tagIcon = undefined,
  showTag = true,
}: DefaultCardProps<TData>) => {
  if (!!row.original === false) {
    return <></>;
  }
  //   const imageIdExists = Object.keys(row.original).some((key) => {
  //     return key === imageColumnId;
  //   });
  //   const titleIdExists = Object.keys(row.original).some((key) => {
  //     return key === titleColumnId;
  //   });
  //   const tagIdExists = Object.keys(row.original).some((key) => {
  //     return key === tagColumnId;
  //   });

  return (
    <Grid templateRows={"auto auto"} gap={"1rem"}>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Image src={row.original[imageColumnId!] as string} />
      </Flex>

      <Flex gap={"0.5rem"} flexFlow={"wrap"}>
        <Text fontWeight={"bold"} fontSize={"large"}>
          {row.original[titleColumnId!] as string}
        </Text>
        {showTag && (
          <Tag fontSize={"large"}>
            {tagIcon ?? ''}
            {row.original[tagColumnId!] as string}
          </Tag>
        )}
      </Flex>
    </Grid>
  );
};
