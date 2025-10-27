import { JSONSchema7 } from 'json-schema';
import { ReactNode } from 'react';
import { ForeignKeyProps } from '../fields/StringInputField';
import { UseFormReturn } from 'react-hook-form';

export interface DateTimePickerLabels {
  monthNamesShort?: string[]; // Array of 12 month names
  weekdayNamesShort?: string[]; // Array of 7 weekday names (starting with Sunday)
  backButtonLabel?: string;
  forwardButtonLabel?: string;
}

export interface IdPickerLabels {
  undefined?: string;
  addMore?: string;
  typeToSearch?: string;
  total?: string;
  showing?: string;
  perPage?: string;
  emptySearchResult?: string;
  initialResults?: string;
}

export interface EnumPickerLabels {
  undefined?: string;
  addMore?: string;
  typeToSearch?: string;
  total?: string;
  showing?: string;
  perPage?: string;
  emptySearchResult?: string;
  initialResults?: string;
}

export interface CustomJSONSchema7 extends JSONSchema7 {
  gridColumn?: string;
  gridRow?: string;
  foreign_key?: ForeignKeyProps;
  variant?: string;
  renderDisplay?: (item: unknown) => ReactNode;
  inputRender?: (props: {
    column: string;
    schema: CustomJSONSchema7;
    prefix: string;
    formContext: UseFormReturn;
  }) => ReactNode;
  inputViewerRender?: (props: {
    column: string;
    schema: CustomJSONSchema7;
    prefix: string;
    formContext: UseFormReturn;
  }) => ReactNode;
  dateFormat?: string;
  displayDateFormat?: string;
  timeFormat?: string;
  displayTimeFormat?: string;
  showLabel?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
}
export interface TagPickerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}
