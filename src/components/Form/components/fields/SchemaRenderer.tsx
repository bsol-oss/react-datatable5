import { Text } from '@chakra-ui/react';
import { idPickerSanityCheck } from '../core/FormRoot';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { ArrayRenderer } from './ArrayRenderer';
import { BooleanPicker } from './BooleanPicker';
import { CustomInput } from './CustomInput';
import { DatePicker } from './DatePicker';
import { DateRangePicker } from './DateRangePicker';
import { EnumPicker } from './EnumPicker';
import { FilePicker } from './FilePicker';
import { FormMediaLibraryBrowser } from './FormMediaLibraryBrowser';
import { IdPickerSingle, IdPickerMultiple } from './IdPicker';
import { NumberInputField } from './NumberInputField';
import { ObjectInput } from './ObjectInput';
import { RecordInput } from './RecordInput';
import { StringInputField } from './StringInputField';
import { TagPicker } from './TagPicker';
import { TextAreaInput } from './TextAreaInput';
import { TimePicker } from './TimePicker';
import { DateTimePicker } from './DateTimePicker';
import { JSONSchema7 } from 'json-schema';

export interface SchemaRendererProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const SchemaRenderer = ({
  schema,
  prefix,
  column,
}: SchemaRendererProps) => {
  const colSchema = schema;
  const {
    type,
    variant,
    properties: innerProperties,
    foreign_key,
    format,
    items,
  } = schema;
  if (variant === 'custom-input') {
    return <CustomInput schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === 'string') {
    if ((schema.enum ?? []).length > 0) {
      return <EnumPicker schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === 'id-picker') {
      idPickerSanityCheck(column, foreign_key);
      return <IdPickerSingle schema={colSchema} {...{ prefix, column }} />;
    }
    if (format === 'date') {
      return <DatePicker schema={colSchema} {...{ prefix, column }} />;
    }
    if (format === 'time') {
      return <TimePicker schema={colSchema} {...{ prefix, column }} />;
    }
    if (format === 'date-time') {
      return <DateTimePicker schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === 'text-area') {
      return <TextAreaInput schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === 'media-library-browser') {
      return (
        <FormMediaLibraryBrowser schema={colSchema} {...{ prefix, column }} />
      );
    }
    return <StringInputField schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === 'number' || type === 'integer') {
    return <NumberInputField schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === 'boolean') {
    return <BooleanPicker schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === 'object') {
    if (innerProperties) {
      return <ObjectInput schema={colSchema} {...{ prefix, column }} />;
    }
    return <RecordInput schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === 'array') {
    if (variant === 'id-picker') {
      idPickerSanityCheck(column, foreign_key);
      return <IdPickerMultiple schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === 'tag-picker') {
      return <TagPicker schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === 'file-picker') {
      return <FilePicker schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === 'media-library-browser') {
      return (
        <FormMediaLibraryBrowser schema={colSchema} {...{ prefix, column }} />
      );
    }
    if (variant === 'date-range') {
      return <DateRangePicker schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === 'enum-picker') {
      const { items } = colSchema;
      const { enum: enumItems } = items as JSONSchema7;
      const enumSchema = {
        type: 'string' as const,
        enum: enumItems,
      };
      return (
        <EnumPicker
          isMultiple={true}
          schema={enumSchema}
          {...{ prefix, column }}
        />
      );
    }
    if (items) {
      return <ArrayRenderer schema={colSchema} {...{ prefix, column }} />;
    }
    return <Text>{`array ${column}`}</Text>;
  }
  if (type === 'null') {
    return <Text>{`null ${column}`}</Text>;
  }

  return <Text>missing type</Text>;
};
