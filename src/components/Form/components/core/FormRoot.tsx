import { SchemaFormContext } from '@/components/Form/SchemaFormContext';
import { JSONSchema7 } from 'json-schema';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
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
  idMap: Record<string, object>;
  setIdMap: Dispatch<SetStateAction<Record<string, object>>>;
  form: UseFormReturn<TData, any, TData>;
  children: ReactNode;
  onSubmit?: SubmitHandler<TData>;
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
  onSubmit = undefined,
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
  return (
    <SchemaFormContext.Provider
      value={{
        schema,
        // @ts-expect-error TODO: find appropriate types
        onSubmit,
        idMap,
        setIdMap,
        displayConfig,
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
