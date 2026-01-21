import { Text } from '@chakra-ui/react';
import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { ArrayViewer } from './ArrayViewer';
import { BooleanViewer } from './BooleanViewer';
import { CustomViewer } from './CustomViewer';
import { DateViewer } from './DateViewer';
import { EnumViewer } from './EnumViewer';
import { FileViewer } from './FileViewer';
import { IdViewer } from './IdViewer';
import { NumberViewer } from './NumberViewer';
import { ObjectViewer } from './ObjectViewer';
import { RecordViewer } from './RecordViewer';
import { StringViewer } from './StringViewer';
import { TagViewer } from './TagViewer';
import { TextAreaViewer } from './TextAreaViewer';
import { TimeViewer } from './TimeViewer';
import { DateTimeViewer } from './DateTimeViewer';

export interface SchemaRendererProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
}

export const SchemaViewer = ({
  schema,
  prefix,
  column,
}: SchemaRendererProps) => {
  const colSchema = schema;
  const { type, variant, properties: innerProperties, items, format } = schema;
  if (variant === 'custom-input') {
    return <CustomViewer schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === 'string') {
    if ((schema.enum ?? []).length > 0) {
      return <EnumViewer schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === 'id-picker') {
      return <IdViewer schema={colSchema} {...{ prefix, column }} />;
    }
    if (format === 'time') {
      return <TimeViewer schema={colSchema} {...{ prefix, column }} />;
    }
    if (format === 'date') {
      return <DateViewer schema={colSchema} {...{ prefix, column }} />;
    }
    if (format === 'date-time') {
      return <DateTimeViewer schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === 'text-area') {
      return <TextAreaViewer schema={colSchema} {...{ prefix, column }} />;
    }

    return <StringViewer schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === 'number' || type === 'integer') {
    return <NumberViewer schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === 'boolean') {
    return <BooleanViewer schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === 'object') {
    if (innerProperties) {
      return <ObjectViewer schema={colSchema} {...{ prefix, column }} />;
    }
    return <RecordViewer schema={colSchema} {...{ prefix, column }} />;
  }
  if (type === 'array') {
    if (variant === 'id-picker') {
      return (
        <IdViewer
          schema={colSchema}
          {...{ prefix, column, isMultiple: true }}
        />
      );
    }
    if (variant === 'tag-picker') {
      return <TagViewer schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === 'file-picker') {
      return <FileViewer schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === 'media-library-browser') {
      return <FileViewer schema={colSchema} {...{ prefix, column }} />;
    }
    if (variant === 'enum-picker') {
      const { items } = schema;
      const itemsSchema = Array.isArray(items) ? items[0] : items;
      const { enum: enumItems } = itemsSchema ?? {};
      // Use renderDisplay from parent schema only
      const renderDisplay = schema.renderDisplay;
      const enumSchema = {
        type: 'string' as const,
        enum: enumItems,
        ...(renderDisplay && { renderDisplay }),
      };
      return (
        <EnumViewer
          isMultiple={true}
          schema={enumSchema}
          {...{ prefix, column }}
        />
      );
    }
    if (items) {
      return <ArrayViewer schema={colSchema} {...{ prefix, column }} />;
    }
    return <Text>{`array ${column}`}</Text>;
  }
  if (type === 'null') {
    return <Text>{`null ${column}`}</Text>;
  }
  return <Text>missing type</Text>;
};
