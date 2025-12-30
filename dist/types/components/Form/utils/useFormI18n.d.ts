import { CustomJSONSchema7 } from '../components/types/CustomJSONSchema7';
/**
 * Custom hook for form field labels.
 * Automatically handles colLabel construction.
 * Uses schema.title for labels and schema.errorMessages for error messages.
 *
 * @param column - The column name
 * @param prefix - The prefix for the field (usually empty string or parent path)
 * @param schema - Required schema object with title and errorMessages properties
 * @returns Object with label helper functions
 *
 * @example
 * ```tsx
 * const formI18n = useFormI18n(column, prefix, schema);
 *
 * // Get field label (from schema.title)
 * <Field label={formI18n.label()} />
 *
 * // Get required error message (from schema.errorMessages?.required)
 * <Text>{formI18n.required()}</Text>
 *
 * // Access the raw colLabel
 * const colLabel = formI18n.colLabel;
 * ```
 */
export declare const useFormI18n: (column: string, prefix: string | undefined, schema: CustomJSONSchema7) => {
    /**
     * The constructed column label (prefix + column)
     */
    colLabel: string;
    /**
     * Get the field label from schema title property.
     * Logs a debug message if title is missing.
     */
    label: () => string;
    /**
     * Get the required error message from schema.errorMessages?.required.
     * Returns a helpful fallback message if not provided.
     */
    required: () => string;
};
