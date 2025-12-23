import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
import { IdPickerSingle } from './IdPickerSingle';
import { IdPickerMultiple } from './IdPickerMultiple';

export interface IdPickerProps {
  column: string;
  schema: CustomJSONSchema7;
  prefix: string;
  isMultiple?: boolean;
}

/**
 * IdPicker component - supports both single and multiple selection
 *
 * @deprecated For better type safety and clarity, use IdPickerSingle or IdPickerMultiple directly
 * This component is kept for backward compatibility
 */
export const IdPicker = ({
  column,
  schema,
  prefix,
  isMultiple = false,
}: IdPickerProps) => {
  if (isMultiple) {
    return <IdPickerMultiple column={column} schema={schema} prefix={prefix} />;
  }
  return <IdPickerSingle column={column} schema={schema} prefix={prefix} />;
};

// Export the separate components for direct use
export { IdPickerSingle } from './IdPickerSingle';
export { IdPickerMultiple } from './IdPickerMultiple';
