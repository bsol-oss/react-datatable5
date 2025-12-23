import { snakeToLabel } from './snakeToLabel';

/**
 * Custom hook to simplify label handling for form fields.
 * Uses schema title prop or falls back to snakeToLabel.
 *
 * @param column - The column name
 * @param prefix - The prefix for the field (usually empty string or parent path)
 * @param schema - Optional schema object with title property
 * @returns Object with label helper functions
 *
 * @example
 * ```tsx
 * const formI18n = useFormI18n(column, prefix, schema);
 *
 * // Get field label
 * <Field label={formI18n.label()} />
 *
 * // Get error message (uses formButtonLabels.fieldRequired or fallback)
 * <Text>{formI18n.required()}</Text>
 *
 * // Access the raw colLabel
 * const colLabel = formI18n.colLabel;
 * ```
 */
export const useFormI18n = (
  column: string,
  prefix: string = '',
  schema?: { title?: string }
) => {
  const colLabel = `${prefix}${column}`;

  return {
    /**
     * The constructed column label (prefix + column)
     */
    colLabel,

    /**
     * Get the field label from schema title prop, or fall back to snakeToLabel
     * Uses schema.title if available, otherwise: snakeToLabel(column)
     */
    label: (): string => {
      if (schema?.title) {
        return schema.title;
      }
      return snakeToLabel(column);
    },

    /**
     * Get the required error message
     * Returns a fallback message - should be overridden by formButtonLabels.fieldRequired
     */
    required: (): string => {
      return 'This field is required';
    },
  };
};
