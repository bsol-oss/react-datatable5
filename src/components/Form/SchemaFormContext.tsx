import { AxiosRequestConfig } from "axios";
import { JSONSchema7 } from "json-schema";
import { createContext, Dispatch, SetStateAction } from "react";
import { FieldValues } from "react-hook-form";
import { UseTranslationResponse } from "react-i18next";

export interface SchemaFormContext<TData extends FieldValues> {
  schema: JSONSchema7;
  serverUrl: string;
  requestUrl: string;
  order: string[];
  ignore: string[];
  include: string[];
  onSubmit?: (data: TData) => Promise<void>;
  rowNumber?: number | string;
  idMap: Record<string, object>;
  setIdMap: Dispatch<SetStateAction<Record<string, object>>>;
  translate: UseTranslationResponse<any, any>;
  requestOptions: AxiosRequestConfig;
  isSuccess: boolean;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  isSubmiting: boolean;
  setIsSubmiting: Dispatch<SetStateAction<boolean>>;
  isConfirming: boolean;
  setIsConfirming: Dispatch<SetStateAction<boolean>>;
  validatedData: TData | undefined;
  setValidatedData: Dispatch<SetStateAction<TData>>;
  error: unknown;
  setError: Dispatch<SetStateAction<unknown>>;
  getUpdatedData: () => TData | Promise<TData>;
}

//@ts-expect-error TODO: find appropriate type
export const SchemaFormContext = createContext<SchemaFormContext<unknown>>({
  schema: {} as JSONSchema7,
  serverUrl: "",
  requestUrl: "",
  order: [],
  ignore: [],
  include: [],
  onSubmit: async () => {},
  rowNumber: 0,
  requestOptions: {},
});
