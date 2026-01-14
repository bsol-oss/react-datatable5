import { CheckboxCard } from '@/components/ui/checkbox-card';
import { RadioCardItem, RadioCardRoot } from '@/components/ui/radio-card';
import { CheckboxGroup, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { useSchemaContext } from '../../useSchemaContext';
import { TagPickerProps } from '../types/CustomJSONSchema7';
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
  is_mutually_exclusive: boolean;
}

export interface TagResponse {
  data: TagData[];
}

export const TagPicker = ({ column, schema, prefix }: TagPickerProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();

  if (schema.properties == undefined) {
    throw new Error('schema properties undefined when using DatePicker');
  }
  const { gridColumn, gridRow, tagPicker } = schema;
  if (!tagPicker?.queryFn) {
    throw new Error(
      'tagPicker.queryFn is required in schema. serverUrl has been removed.'
    );
  }

  const query = useQuery<TagResponse>({
    queryKey: [`tagpicker`],
    queryFn: async () => {
      const result = await tagPicker.queryFn!({
        where: [],
        limit: 100,
        offset: 0,
        searching: '',
      });
      return result.data || { data: [] };
    },
    staleTime: 10000,
  });
  const object_id = watch(column);
  const existingTagsQuery = useQuery({
    queryKey: [`existing`, object_id],
    queryFn: async () => {
      const result = await tagPicker.queryFn!({
        where: [
          {
            id: column,
            value: [object_id[0]],
          },
        ],
        limit: 100,
        offset: 0,
        searching: '',
      });
      return result.data || { data: [] };
    },
    enabled: object_id != undefined,
    staleTime: 10000,
  });

  const { isLoading, isFetching, data, isPending, isError } = query;
  const dataList = data?.data ?? [];
  const existingTagList = existingTagsQuery.data?.data ?? [];

  if (!!object_id === false) {
    return <></>;
  }

  return (
    <Flex
      flexFlow={'column'}
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
      {dataList.map(({ parent_tag_name, all_tags, is_mutually_exclusive }) => {
        return (
          <Flex key={`tag-${parent_tag_name}`} flexFlow={'column'} gap={2}>
            <Text>{parent_tag_name}</Text>
            {is_mutually_exclusive && (
              <RadioCardRoot
                defaultValue="next"
                variant={'surface'}
                onValueChange={(tagIds) => {
                  const existedTags = Object.values(all_tags)
                    .filter(({ id }) => {
                      return existingTagList.some(
                        ({ tag_id }) => tag_id === id
                      );
                    })
                    .map(({ id }) => {
                      return id;
                    });
                  setValue(`${column}.${parent_tag_name}.current`, [
                    tagIds.value,
                  ]);
                  setValue(`${column}.${parent_tag_name}.old`, existedTags);
                }}
              >
                <Flex flexFlow={'wrap'} gap={2}>
                  {Object.entries(all_tags).map(([tagName, { id }]) => {
                    if (existingTagList.some(({ tag_id }) => tag_id === id)) {
                      return (
                        <RadioCardItem
                          label={tagName}
                          key={`${tagName}-${id}`}
                          value={id}
                          flex={'0 0 0%'}
                          disabled
                        />
                      );
                    }
                    return (
                      <RadioCardItem
                        label={tagName}
                        key={`${tagName}-${id}`}
                        value={id}
                        flex={'0 0 0%'}
                        colorPalette={'blue'}
                      />
                    );
                  })}
                </Flex>
              </RadioCardRoot>
            )}
            {!is_mutually_exclusive && (
              <CheckboxGroup
                onValueChange={(tagIds) => {
                  setValue(`${column}.${parent_tag_name}.current`, tagIds);
                }}
              >
                <Flex flexFlow={'wrap'} gap={2}>
                  {Object.entries(all_tags).map(([tagName, { id }]) => {
                    if (existingTagList.some(({ tag_id }) => tag_id === id)) {
                      return (
                        <CheckboxCard
                          label={tagName}
                          key={`${tagName}-${id}`}
                          value={id}
                          flex={'0 0 0%'}
                          disabled
                          colorPalette={'blue'}
                        />
                      );
                    }
                    return (
                      <CheckboxCard
                        label={tagName}
                        key={`${tagName}-${id}`}
                        value={id}
                        flex={'0 0 0%'}
                      />
                    );
                  })}
                </Flex>
              </CheckboxGroup>
            )}
          </Flex>
        );
      })}

      {errors[`${column}`] && (
        <Text color={'red.400'}>
          {(errors[`${column}`]?.message ?? 'No error message') as string}
        </Text>
      )}
    </Flex>
  );
};
