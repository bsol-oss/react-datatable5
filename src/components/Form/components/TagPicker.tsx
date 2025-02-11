import { CheckboxCard } from "@/components/ui/checkbox-card";
import { CheckboxGroup, Flex, Text } from "@chakra-ui/react";
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
    formState: { errors },
    setValue,
  } = useFormContext();
  const { schema, serverUrl, displayText } = useSchemaContext();
  if (schema.properties == undefined) {
    throw new Error("schema properties undefined when using DatePicker");
  }
  const { gridColumn, gridRow, in_table } = schema.properties[
    column
  ] as CustomJSONSchema7;
  if (in_table === undefined) {
    throw new Error("in_table is undefined when using TagPicker");
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
            value: in_table,
          },
        ],
        limit: 100,
      });
    },
    staleTime: 10000,
  });

  const { isLoading, isFetching, data, isPending, isError } = query;
  const dataList = data?.data ?? [];

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
      {dataList.map(({ parent_tag_name, all_tags }, tagGroupIndex) => {
        return (
          <Flex flexFlow={"column"} gap={2}>
            <Text>{parent_tag_name}</Text>
            <CheckboxGroup>
              <Flex flexFlow={"wrap"} gap={2}>
                {Object.entries(all_tags).map(([tagName, { id }]) => {
                  return (
                    <CheckboxCard
                      label={tagName}
                      key={tagName}
                      value={id}
                      flex={"0 0 0%"}
                      onChange={() => {
                        setValue(`${column}.${tagGroupIndex}.tag_id`, id);
                      }}
                    />
                  );
                })}
              </Flex>
            </CheckboxGroup>
          </Flex>
        );
      })}
      {errors[`${column}`] && (
        <Text color={"red.400"}>
          {(errors[`${column}`]?.message ?? "No error message") as string}
        </Text>
      )}
    </Flex>
  );
};
