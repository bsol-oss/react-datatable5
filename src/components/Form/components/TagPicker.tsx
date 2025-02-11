import { CheckboxCard } from "@/components/ui/checkbox-card";
import { CheckboxGroup, DataList, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { useSchemaContext } from "../useSchemaContext";
import { getTableData } from "../utils/getTableData";
import { CustomJSONSchema7 } from "./StringInputField";

export interface TagPickerProps {
  column: string;
}

export interface Tag {
  id: string;
  name: string;
  comment: string | null;
  extra_info: string | null;
  created_at: string; // Assuming ISO 8601 format
  updated_at: string; // Assuming ISO 8601 format
  table_id: string | null;
  parent_id: string;
}

export interface AllTags {
  [tagName: string]: Tag;
}

export interface TagData {
  table_name: string;
  parent_tag_name: string;
  parent_tag_id: string;
  all_tags: AllTags;
}

export interface TagResponse {
  data: TagData[];
}

export const TagPicker = ({ column }: TagPickerProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();

  const { schema, serverUrl } = useSchemaContext();
  if (schema.properties == undefined) {
    throw new Error("schema properties undefined when using DatePicker");
  }
  const { gridColumn, gridRow, in_table, object_id_column } = schema.properties[
    column
  ] as CustomJSONSchema7;
  if (in_table === undefined) {
    throw new Error("in_table is undefined when using TagPicker");
  }
  if (object_id_column === undefined) {
    throw new Error("object_id_column is undefined when using TagPicker");
  }

  const query = useQuery<TagResponse>({
    queryKey: [`tagpicker`, in_table],
    queryFn: async () => {
      return await getTableData({
        serverUrl,
        in_table: "tables_tags_view",
        where: [
          {
            id: "table_name",
            value: [in_table],
          },
        ],
        limit: 100,
      });
    },
    staleTime: 10000,
  });
  const object_id = watch(object_id_column);
  console.log(object_id_column, object_id, "fdkps");
  const existingTagsQuery = useQuery({
    queryKey: [`existing`, in_table, object_id_column, object_id],
    queryFn: async () => {
      return await getTableData({
        serverUrl,
        in_table: in_table,
        where: [
          {
            id: object_id_column,
            value: [object_id],
          },
        ],
        limit: 100,
      });
    },
    enabled: object_id != undefined,
    staleTime: 10000,
  });

  const { isLoading, isFetching, data, isPending, isError } = query;
  const dataList = data?.data ?? [];
  const existingTagList = existingTagsQuery.data?.data ?? [];
  const tagIdMap = Object.fromEntries(
    dataList
      .map(({ parent_tag_name, all_tags }) => {
        return Object.entries(all_tags).map(([, tagRecord]) => {
          return { ...tagRecord, parent_tag_name };
        });
      })
      .reduce((previous, current) => {
        return [...previous, ...current];
      }, [])
      .map((tag) => [tag.id, tag])
  );
  if (!!object_id === false) {
    return <></>;
  }

  return (
    <Flex
      flexFlow={"column"}
      gap={4}
      {...{
        gridColumn,
        gridRow,
      }}
    >
      {isFetching && <>isFetching</>}
      {isLoading && <>isLoading</>}
      {isPending && <>isPending</>}
      {isError && <>isError</>}
      <DataList.Root orientation="horizontal">
        {existingTagList.map(({ tag_id }) => {
          return (
            <DataList.Item key={tagIdMap[tag_id].name} pt="4">
              <DataList.ItemLabel>
                {tagIdMap[tag_id].parent_tag_name}
              </DataList.ItemLabel>
              <DataList.ItemValue>{tagIdMap[tag_id].name}</DataList.ItemValue>
            </DataList.Item>
          );
        })}
      </DataList.Root>
      <CheckboxGroup
        onValueChange={(tagIds) => {
          console.log(tagIds, ":goskp");
          setValue(column, tagIds);
        }}
      >
        {dataList.map(({ parent_tag_name, all_tags }) => {
          return (
            <Flex flexFlow={"column"} gap={2}>
              <Text>{parent_tag_name}</Text>

              <Flex flexFlow={"wrap"} gap={2}>
                {Object.entries(all_tags).map(([tagName, { id }]) => {
                  if (existingTagList.some(({ tag_id }) => tag_id === id)) {
                    return <></>;
                  }
                  return (
                    <CheckboxCard
                      label={tagName}
                      key={tagName}
                      value={id}
                      flex={"0 0 0%"}
                      onChange={() => {
                        // const tags = watch(column);
                        // if (tags.some(({ tag_id }) => tag_id === id)) {
                        //   setValue(
                        //     column,
                        //     tags.filter(({ tag_id }) => tag_id === id)
                        //   );
                        //   return;
                        // }
                        // append({ tag_id: id });
                      }}
                    />
                  );
                })}
              </Flex>
            </Flex>
          );
        })}
      </CheckboxGroup>
      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {(errors[`${column}`]?.message ?? "No error message") as string}
        </Text>
      )}
    </Flex>
  );
};
