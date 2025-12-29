import { CustomJSONSchema7 } from '../types/CustomJSONSchema7';
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
export declare const IdPicker: ({ column, schema, prefix, isMultiple, }: IdPickerProps) => import("react/jsx-runtime").JSX.Element;
export { IdPickerSingle } from './IdPickerSingle';
export { IdPickerMultiple } from './IdPickerMultiple';
