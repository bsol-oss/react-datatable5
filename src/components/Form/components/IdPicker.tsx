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
  table_ref: string;
}

const getTableData = async ({ searching, table_ref }) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `http://localhost:8081/api/g/${table_ref}`,
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

export const IdPicker = ({ column, table_ref }: IdPickerProps) => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext();
  const { schema } = useSchemaContext();
  const { required } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const [data, setData] = useState();
  const [selectedId, setSelectedId] = useState();

  const onSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const data = await getTableData({
      searching: event.target.value,
      table_ref: table_ref,
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
        {(data?.data ?? []).map((item) => {
          return (
            <Button
              onClick={() => {
                setSelectedId(item["id"]);
                setValue(column, item["id"]);
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
