import { Button } from "@/components/ui/button";
import { Input, Text } from "@chakra-ui/react";
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

export const IdPicker = ({ column, in_table, column_ref }: IdPickerProps) => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext();
  const { schema, serverUrl } = useSchemaContext();
  const { required } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const [data, setData] = useState();
  const [selectedId, setSelectedId] = useState();

  const onSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const data = await getTableData({
      serverUrl,
      searching: event.target.value,
      in_table: in_table,
    });

    setData(data);
  };
  return (
    <>
      <Field label={`${snakeToLabel(column)}`} required={isRequired}>
        <Input
          onChange={(event) => {
            onSearchChange(event);
          }}
        />
        <>{selectedId}</>
        {(data?.data ?? []).map((item: any) => {
          return (
            <Button
              onClick={() => {
                setSelectedId(item[column_ref]);
                setValue(column, item[column_ref]);
              }}
            >
              {item.first_name}
            </Button>
          );
        })}
        <>{JSON.stringify(data ?? {})}</>;
        {errors[`${column}`] && <Text>This field is required</Text>}
      </Field>
    </>
  );
};
