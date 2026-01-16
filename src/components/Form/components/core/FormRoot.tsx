import { SchemaFormContext } from '@/components/Form/SchemaFormContext';
import axios, { AxiosRequestConfig } from 'axios';
import { JSONSchema7 } from 'json-schema';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { clearEmptyString } from '../../utils/clearEmptyString';
import {
  CustomJSONSchema7,
  DateTimePickerLabels,
  EnumPickerLabels,
  FilePickerLabels,
  FormButtonLabels,
  IdPickerLabels,
  TimePickerLabels,
} from '../types/CustomJSONSchema7';

export interface FormRootProps<TData extends FieldValues> {
  /**
   * JSON Schema with support for errorMessages in properties.
   * Each property can define errorMessages object with keys like:
   * - required: Error message when field is required but missing
   * - minLength, maxLength: Error messages for string length validation
   * - minimum, maximum: Error messages for number range validation
   * - format: Error message for format validation (email, date, etc.)
   * - pattern: Error message for pattern validation
   * - type: Error message for type validation
   *
   * @example
   * {
   *   type: 'object',
   *   properties: {
   *     username: {
   *       type: 'string',
   *       minLength: 3,
   *       errorMessages: {
   *         required: 'Username is required',
   *         minLength: 'Username must be at least 3 characters'
   *       }
   *     }
   *   }
   * }
   */
  schema: CustomJSONSchema7;
  requestUrl?: string;
  idMap: Record<string, object>;
  setIdMap: Dispatch<SetStateAction<Record<string, object>>>;
  form: UseFormReturn<TData, any, TData>;
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
  filePickerLabels?: FilePickerLabels;
  formButtonLabels?: FormButtonLabels;
  timePickerLabels?: TimePickerLabels;
  insideDialog?: boolean;
}

export interface CustomJSONSchema7Definition extends JSONSchema7 {
  variant: string;
  gridColumn: string;
  gridRow: string;
  customQueryFn: any;
  children: ReactNode;
}

export const FormRoot = <TData extends FieldValues>({
  schema,
  idMap,
  setIdMap,
  form,
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
  filePickerLabels,
  formButtonLabels,
  timePickerLabels,
  insideDialog = false,
}: FormRootProps<TData>) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [validatedData, setValidatedData] = useState<unknown>();
  const [error, setError] = useState<unknown>();

  const onBeforeSubmit = () => {
    setIsSubmiting(true);
  };
  const onAfterSubmit = () => {
    setIsSubmiting(false);
  };
  const onSubmitError = (error: unknown) => {
    setIsError(true);
    setError(error);
  };
  const onSubmitSuccess = () => {
    setIsSuccess(true);
  };

  const defaultOnSubmit = async (promise: Promise<unknown>) => {
    try {
      console.log('onBeforeSubmit');
      onBeforeSubmit();
      await promise;
      console.log('onSubmitSuccess');
      onSubmitSuccess();
    } catch (error) {
      console.log('onSubmitError', error);
      onSubmitError(error);
    } finally {
      onAfterSubmit();
    }
  };
  const defaultSubmitPromise = (data: TData) => {
    if (!requestOptions.url) {
      throw new Error(
        'requestOptions.url is required when onSubmit is not provided'
      );
    }
    const options = {
      method: 'POST',
      data: clearEmptyString(data),
      ...requestOptions,
    };
    return axios.request(options);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFormSubmit = async (data: any) => {
    // Validation is handled by react-hook-form
    // This function will only be called if validation passes
    if (onSubmit === undefined) {
      await defaultOnSubmit(Promise.resolve(defaultSubmitPromise(data)));
      return;
    }
    await defaultOnSubmit(Promise.resolve(onSubmit(data)));
  };

  return (
    <SchemaFormContext.Provider
      value={{
        schema,
        order,
        ignore,
        include,
        // @ts-expect-error TODO: find appropriate types
        onSubmit,
        rowNumber,
        idMap,
        setIdMap,
        requestOptions,
        isSuccess,
        setIsSuccess,
        isError,
        setIsError,
        isSubmiting,
        setIsSubmiting,
        validatedData,
        setValidatedData,
        error,
        setError,
        getUpdatedData,
        customErrorRenderer,
        customSuccessRenderer,
        displayConfig,
        onFormSubmit,
        dateTimePickerLabels,
        idPickerLabels,
        enumPickerLabels,
        filePickerLabels,
        formButtonLabels,
        timePickerLabels,
        insideDialog,
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </SchemaFormContext.Provider>
  );
};
