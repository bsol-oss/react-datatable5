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
export const useFormI18n = (
  column: string,
  prefix: string = '',
  schema: CustomJSONSchema7
) => {
  const colLabel = `${prefix}${column}`;

  return {
    /**
     * The constructed column label (prefix + column)
     */
    colLabel,

    /**
     * Get the field label from schema title property.
     * Logs a debug message if title is missing.
     */
    label: (): string => {
      if (schema.title) {
        return schema.title;
      }

      // Debug log when field title is missing
      console.debug(
        `[Form Field Label] Missing title for field '${colLabel}'. Add title property to schema for field '${colLabel}'.`,
        {
          fieldName: column,
          colLabel,
          prefix,
          schema: {
            type: schema.type,
            errorMessages: schema.errorMessages
              ? Object.keys(schema.errorMessages)
              : undefined,
          },
        }
      );

      // Return column name as fallback
      return column;
    },

    /**
     * Get the required error message from schema.errorMessages?.required.
     * Returns a helpful fallback message if not provided.
     */
    required: (): string => {
      const errorMessage = schema.errorMessages?.required;

      if (errorMessage) {
        return errorMessage;
      }

      // Debug log when error message is missing
      console.debug(
        `[Form Field Required] Missing error message for required field '${colLabel}'. Add errorMessages.required to schema for field '${colLabel}'.`,
        {
          fieldName: column,
          colLabel,
          prefix,
          schema: {
            type: schema.type,
            title: schema.title,
            required: schema.required,
            hasErrorMessages: !!schema.errorMessages,
            errorMessageKeys: schema.errorMessages
              ? Object.keys(schema.errorMessages)
              : undefined,
          },
        }
      );

      // Return helpful fallback message
      return `Missing error message for required. Add errorMessages.required to schema for field '${colLabel}'`;
    },
  };
};
