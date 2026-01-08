import { JSONSchema7 } from 'json-schema';
import { ReactNode } from 'react';
import { ForeignKeyProps } from '../fields/StringInputField';
import { UseFormReturn } from 'react-hook-form';
import { ValidationErrorType } from '../../utils/buildErrorMessages';
import React from 'react';

export interface DateTimePickerLabels {
  monthNamesShort?: string[]; // Array of 12 month names
  weekdayNamesShort?: string[]; // Array of 7 weekday names (starting with Sunday)
  backButtonLabel?: string;
  forwardButtonLabel?: string;
  quickActionLabels?: {
    yesterday?: string;
    today?: string;
    tomorrow?: string;
    plus7Days?: string;
  };
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

export interface FilePickerLabels {
  fileDropzone?: string;
  browseLibrary?: string;
  dialogTitle?: string;
  searchPlaceholder?: string;
  loading?: string;
  loadingFailed?: string;
  noFilesFound?: string;
  cancel?: string;
  select?: string;
  uploadTab?: string;
  browseTab?: string;
  uploading?: string;
  uploadFailed?: string;
}

export interface FormButtonLabels {
  submit?: string;
  reset?: string;
  cancel?: string;
  confirm?: string;
  submitAgain?: string;
  submitSuccess?: string;
  add?: string;
  save?: string;
  addNew?: string;
  fieldRequired?: string;
}

export interface TimePickerLabels {
  placeholder?: string;
  emptyMessage?: string;
}

export interface LoadInitialValuesParams {
  ids: string[];
  foreign_key: ForeignKeyProps;
  setIdMap: React.Dispatch<React.SetStateAction<Record<string, object>>>;
}

export interface LoadInitialValuesResult {
  data: { data: Record<string, any>[]; count: number };
  idMap: Record<string, object>;
}

export interface CustomJSONSchema7 extends JSONSchema7 {
  gridColumn?: string;
  gridRow?: string;
  foreign_key?: ForeignKeyProps;
  variant?: string;
  renderDisplay?: (item: unknown) => ReactNode;
  itemToValue?: (item: unknown) => string;
  loadInitialValues?: (
    params: LoadInitialValuesParams
  ) => Promise<LoadInitialValuesResult>;
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
  numberStorageType?: 'string' | 'number';
  errorMessages?: Partial<Record<ValidationErrorType | string, string>>;
  filePicker?: FilePickerProps;
  tagPicker?: {
    queryFn?: (params: {
      in_table: string;
      where?: { id: string; value: string[] }[];
      limit?: number;
      offset?: number;
      searching?: string;
    }) => Promise<{
      data: { data: any[]; count: number };
      idMap?: Record<string, object>;
    }>;
  };
  dateTimePicker?: {
    showQuickActions?: boolean;
    quickActionLabels?: {
      yesterday?: string;
      today?: string;
      tomorrow?: string;
      plus7Days?: string;
    };
    showTimezoneSelector?: boolean;
  };
}

// Default renderDisplay function that intelligently displays items
// If item is an object, tries to find common display fields (name, title, label, etc.)
// Otherwise falls back to JSON.stringify
export const defaultRenderDisplay = (item: unknown): ReactNode => {
  // Check if item is an object (not null, not array, not primitive)
  if (
    item !== null &&
    typeof item === 'object' &&
    !Array.isArray(item) &&
    !(item instanceof Date)
  ) {
    const obj = item as Record<string, unknown>;

    // Try common display fields in order of preference
    const displayFields = [
      'name',
      'title',
      'label',
      'displayName',
      'display_name',
      'text',
      'value',
    ];

    for (const field of displayFields) {
      if (obj[field] !== undefined && obj[field] !== null) {
        const value = obj[field];
        // Return the value if it's a string or number
        if (typeof value === 'string' || typeof value === 'number') {
          return String(value);
        }
        // If the value is an object, show warning and recommend custom renderDisplay
        if (
          typeof value === 'object' &&
          !Array.isArray(value) &&
          !(value instanceof Date)
        ) {
          console.warn(
            `[CustomJSONSchema7] Display field "${field}" contains an object value. Consider providing a custom \`renderDisplay\` function in your schema to properly render this item. Field: ${field}, Value: ${JSON.stringify(value).substring(0, 100)}${JSON.stringify(value).length > 100 ? '...' : ''}`
          );
          // Still return the stringified value for now
          return JSON.stringify(value);
        }
      }
    }

    // If no display field found, fall back to JSON.stringify
    return JSON.stringify(item);
  }

  // For strings that look like JSON, show warning and recommend custom renderDisplay
  if (
    typeof item === 'string' &&
    (item.trim().startsWith('{') || item.trim().startsWith('['))
  ) {
    console.warn(
      `[CustomJSONSchema7] Item appears to be a JSON string. Consider providing a custom \`renderDisplay\` function in your schema to properly render this item. Current value: ${item.substring(0, 100)}${item.length > 100 ? '...' : ''}`
    );
    return item;
  }

  // For non-objects (primitives, arrays, dates), use JSON.stringify
  return JSON.stringify(item);
};
export interface TagPickerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export interface FilePickerMediaFile {
  id: string;
  name: string;
  url?: string;
  size?: string | number;
  comment?: string;
  type?: string;
}

export interface FilePickerProps {
  onFetchFiles?: (search: string) => Promise<FilePickerMediaFile[]>;
  enableMediaLibrary?: boolean;
  filterImageOnly?: boolean;
  enableUpload?: boolean;
  onUploadFile?: (file: File) => Promise<string>;
}
