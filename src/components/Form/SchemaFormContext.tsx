import { createContext, Dispatch, SetStateAction } from 'react';
import { FieldValues } from 'react-hook-form';
import {
  CustomJSONSchema7,
  DateTimePickerLabels,
  EnumPickerLabels,
  FilePickerLabels,
  FormButtonLabels,
  IdPickerLabels,
  TimePickerLabels,
} from './components/types/CustomJSONSchema7';

export interface SchemaFormContext<TData extends FieldValues> {
  schema: CustomJSONSchema7;
  onSubmit?: (data: TData) => Promise<void>;
  idMap: Record<string, unknown>;
  setIdMap: Dispatch<SetStateAction<Record<string, unknown>>>;
  timezone?: string;
  displayConfig: {
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

//@ts-expect-error TODO: find appropriate type
export const SchemaFormContext = createContext<SchemaFormContext<unknown>>({
  schema: {} as CustomJSONSchema7,
  onSubmit: async () => {},
  timezone: 'Asia/Hong_Kong',
  displayConfig: {
    showSubmitButton: true,
    showResetButton: true,
    showTitle: true,
  },
});
