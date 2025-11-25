import { AxiosRequestConfig } from 'axios';
import { JSONSchema7 } from 'json-schema';
import { createContext, Dispatch, ReactNode, SetStateAction } from 'react';
import { FieldValues, Resolver } from 'react-hook-form';
import { UseTranslationResponse } from 'react-i18next';
import {
  DateTimePickerLabels,
  IdPickerLabels,
  EnumPickerLabels,
  FilePickerLabels,
  FormButtonLabels,
} from './components/types/CustomJSONSchema7';

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
  translate: UseTranslationResponse<string, string>;
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
  customErrorRenderer?: (error: unknown) => ReactNode;
  customSuccessRenderer?: (
    resetHandler: () => void | Promise<void>
  ) => ReactNode;
  timezone?: string;
  displayConfig: {
    showSubmitButton?: boolean;
    showResetButton?: boolean;
    showTitle?: boolean;
  };
  requireConfirmation: boolean;
  onFormSubmit: (data: TData) => Promise<void>;
  dateTimePickerLabels?: DateTimePickerLabels;
  idPickerLabels?: IdPickerLabels;
  enumPickerLabels?: EnumPickerLabels;
  filePickerLabels?: FilePickerLabels;
  formButtonLabels?: FormButtonLabels;
  ajvResolver: Resolver<FieldValues>;
  insideDialog?: boolean;
}

//@ts-expect-error TODO: find appropriate type
export const SchemaFormContext = createContext<SchemaFormContext<unknown>>({
  schema: {} as JSONSchema7,
  serverUrl: '',
  requestUrl: '',
  order: [],
  ignore: [],
  include: [],
  onSubmit: async () => {},
  rowNumber: 0,
  requestOptions: {},
  timezone: 'Asia/Hong_Kong',
  displayConfig: {
    showSubmitButton: true,
    showResetButton: true,
    showTitle: true,
  },
  requireConfirmation: false,
  onFormSubmit: async () => {},
  ajvResolver: async () => ({ values: {}, errors: {} }),
});
