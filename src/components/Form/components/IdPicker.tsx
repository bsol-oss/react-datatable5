import { RadioCardItem, RadioCardRoot } from "@/components/ui/radio-card";
import { Tag } from "@/components/ui/tag";
import { Box, HStack, Input, Text } from "@chakra-ui/react";
import axios, { AxiosRequestConfig } from "axios";
import { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../ui/field";
import { useSchemaContext } from "../useSchemaContext";

const snakeToLabel = (str: string): string => {
  return str
    .split("_") // Split by underscore
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" "); // Join with space
};

export interface IdPickerProps {
  column: string;
  in_table: string;
  column_ref: string;
  display_column: string;
}

export interface GetTableDataConfig {
  serverUrl: string;
  searching: string;
  in_table: string;
}

const getTableData = async ({
  serverUrl = "http://localhost:8081",
  searching,
  in_table,
}: GetTableDataConfig) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `${serverUrl}/api/g/${in_table}`,
    headers: {
      Apikey: "YOUR_SECRET_TOKEN",
      "Content-Type": "application/json",
    },
    params: {
      searching: searching,
    },
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export interface GetTableResponse {
  data?: object[];
  count: number;
}

export const IdPicker = ({
  column,
  in_table,
  column_ref,
  display_column,
}: IdPickerProps) => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext();
  const { schema, serverUrl } = useSchemaContext();
  const { required } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const [data, setData] = useState<GetTableResponse>();
  const [selectedId, setSelectedId] = useState();
  const [searchText, setSearchText] = useState<string>();
  const dataList = data?.data ?? [];
  const onSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    const data = await getTableData({
      serverUrl,
      searching: event.target.value,
      in_table: in_table,
    });

    setData(data);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getItemList = (data: any[]) => {
    return data.map((item) => {
      return {
        label: item[display_column],
        key: item[column_ref],
        value: item[column_ref],
      };
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getIdMap = (data: any[]) => {
    return Object.fromEntries(
      data.map((item) => {
        return [
          item[column_ref],
          {
            ...item,
          },
        ];
      })
    );
  };

  const getSelectedName = () => {
    const selectedItem = getIdMap(dataList)[selectedId ?? ""];
    if (selectedItem == undefined) {
      return "";
    }
    return selectedItem[display_column];
  };
  if (selectedId != undefined) {
    return (
      <Field label={`${snakeToLabel(column)}`} required={isRequired}>
        <Box>
          <Tag
            closable
            onClick={() => {
              setSelectedId(undefined);
              setValue(column, "");
            }}
          >
            {getSelectedName()}
          </Tag>
        </Box>
      </Field>
    );
  }
  return (
    <>
      <Field label={`${snakeToLabel(column)}`} required={isRequired}>
        <Input
          placeholder="Type to search"
          onChange={(event) => {
            onSearchChange(event);
          }}
        />
        <RadioCardRoot>
          <HStack align="stretch">
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              getItemList(dataList).map((item: any) => (
                <RadioCardItem
                  label={item.label}
                  description={item.description}
                  key={item.key}
                  value={item.value}
                  onClick={() => {
                    setSelectedId(item.key);
                    setValue(column, item.key);
                  }}
                  indicator={false}
                />
              ))
            }
            {dataList.length <= 0 && (searchText?.length ?? 0) > 0 && (
              <>Empty Search Result</>
            )}
          </HStack>
        </RadioCardRoot>
        {/* <>{JSON.stringify(data ?? {})}</>; */}
        {errors[`${column}`] && <Text>This field is required</Text>}
      </Field>{" "}
    </>
  );
};
