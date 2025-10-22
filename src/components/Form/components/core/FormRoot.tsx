import { SchemaFormContext } from '@/components/Form/SchemaFormContext';
import { ForeignKeyProps } from '@/components/Form/components/fields/StringInputField';
import { AxiosRequestConfig } from 'axios';
import { JSONSchema7 } from 'json-schema';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { UseTranslationResponse } from 'react-i18next';
import {
  CustomJSONSchema7,
  DateTimePickerLabels,
  IdPickerLabels,
  EnumPickerLabels,
} from '../types/CustomJSONSchema7';

export interface FormRootProps<TData extends FieldValues> {
  schema: CustomJSONSchema7;
  serverUrl: string;
  requestUrl?: string;
  idMap: Record<string, object>;
  setIdMap: Dispatch<SetStateAction<Record<string, object>>>;
  form: UseFormReturn;
  translate: UseTranslationResponse<any, any>;
  children: ReactNode;
  order?: string[];
  ignore?: string[];
  include?: string[];
  onSubmit?: SubmitHandler<TData>;
  rowNumber?: number | string;
  requestOptions?: AxiosRequestConfig;
  getUpdatedData?: () => TData | Promise<TData> | void;
  customErrorRenderer?: (error: unknown) => ReactNode;
  customSuccessRenderer?: (
    resetHandler: () => void | Promise<void>
  ) => ReactNode;
  displayConfig?: {
    showSubmitButton?: boolean;
    showResetButton?: boolean;
    showTitle?: boolean;
  };
  dateTimePickerLabels?: DateTimePickerLabels;
  idPickerLabels?: IdPickerLabels;
  enumPickerLabels?: EnumPickerLabels;
}

export interface CustomJSONSchema7Definition extends JSONSchema7 {
  variant: string;
  in_table: string;
  column_ref: string;
  display_column: string;
  gridColumn: string;
  gridRow: string;
  foreign_key: ForeignKeyProps;
  children: ReactNode;
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

export const FormRoot = <TData extends FieldValues>({
  schema,
  idMap,
  setIdMap,
  form,
  serverUrl,
  translate,
  children,
  order = [],
  ignore = [],
  include = [],
  onSubmit = undefined,
  rowNumber = undefined,
  requestOptions = {},
  getUpdatedData = () => {},
  customErrorRenderer,
  customSuccessRenderer,
  displayConfig = {
    showSubmitButton: true,
    showResetButton: true,
    showTitle: true,
  },
  dateTimePickerLabels,
  idPickerLabels,
  enumPickerLabels,
}: FormRootProps<TData>) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [validatedData, setValidatedData] = useState<unknown>();
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
        getUpdatedData,
        customErrorRenderer,
        customSuccessRenderer,
        displayConfig,
        dateTimePickerLabels,
        idPickerLabels,
        enumPickerLabels,
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </SchemaFormContext.Provider>
  );
};
