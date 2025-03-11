import { SchemaFormContext } from "@/components/Form/SchemaFormContext";
import { ForeignKeyProps } from "@/components/Form/components/fields/StringInputField";
import { Grid } from "@chakra-ui/react";
import { AxiosRequestConfig } from "axios";
import { JSONSchema7 } from "json-schema";
import { Dispatch, SetStateAction, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { UseTranslationResponse } from "react-i18next";
import { FormTitle } from "./components/core/FormTitle";
import { FormBody } from "./components/core/FormBody";

export interface FormProps<TData extends FieldValues> {
  schema: JSONSchema7;
  serverUrl: string;
  requestUrl?: string;
  idMap: Record<string, object>;
  setIdMap: Dispatch<SetStateAction<Record<string, object>>>;
  form: UseFormReturn;
  translate: UseTranslationResponse<any, any>;
  order?: string[];
  ignore?: string[];
  include?: string[];
  onSubmit?: SubmitHandler<TData>;
  rowNumber?: number | string;
  requestOptions?: AxiosRequestConfig;
}

export interface CustomJSONSchema7Definition extends JSONSchema7 {
  variant: string;
  in_table: string;
  column_ref: string;
  display_column: string;
  gridColumn: string;
  gridRow: string;
  foreign_key: ForeignKeyProps;
}

export const idPickerSanityCheck = (
  column: string,
  foreign_key?: {
    table?: string;
    column?: string;
    display_column?: string;
  }
) => {
  if (!!foreign_key == false) {
    throw new Error(
      `The key foreign_key does not exist in properties of column ${column} when using id-picker.`
    );
  }
  const { table, column: foreignKeyColumn, display_column } = foreign_key;

  if (!!table == false) {
    throw new Error(
      `The key table does not exist in properties of column ${table} when using id-picker.`
    );
  }
  if (!!display_column == false) {
    throw new Error(
      `The key display_column does not exist in properties of column ${column} when using id-picker.`
    );
  }
  if (!!foreignKeyColumn == false) {
    throw new Error(
      `The key column does not exist in properties of column ${column} when using id-picker.`
    );
  }
};

const FormInternal = <TData extends FieldValues>() => {
  return (
    <>
      <Grid gap="2">
        <FormTitle />
        <FormBody />
      </Grid>
    </>
  );
};

export const Form = <TData extends FieldValues>({
  schema,
  idMap,
  setIdMap,
  form,
  serverUrl,
  translate,
  order = [],
  ignore = [],
  include = [],
  onSubmit = undefined,
  rowNumber = undefined,
  requestOptions = {},
}: FormProps<TData>) => {
  // const { properties } = schema;

  // idListSanityCheck("order", order, properties as object);
  // idListSanityCheck("ignore", ignore, properties as object);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [validatedData, setValidatedData] = useState();
  const [error, setError] = useState<unknown>();

  return (
    <SchemaFormContext.Provider
      value={{
        schema,
        serverUrl,
        order,
        ignore,
        include,
        // @ts-expect-error TODO: find appropriate types
        onSubmit,
        rowNumber,
        idMap,
        setIdMap,
        translate,
        requestOptions,
        isSuccess,
        setIsSuccess,
        isError,
        setIsError,
        isSubmiting,
        setIsSubmiting,
        isConfirming,
        setIsConfirming,
        validatedData,
        setValidatedData,
        error,
        setError,
      }}
    >
      <FormProvider {...form}>
        <FormInternal />
      </FormProvider>
    </SchemaFormContext.Provider>
  );
};
