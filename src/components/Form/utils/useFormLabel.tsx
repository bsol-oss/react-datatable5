import { CustomJSONSchema7 } from '../components/types/CustomJSONSchema7';

export const useFormLabel = (
  column: string,
  prefix: string | undefined = '',
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
    label: () => {
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
            errorMessage: schema.errorMessage
              ? Object.keys(schema.errorMessage)
              : undefined,
          },
        }
      );
      // Return column name as fallback
      return column;
    },
  };
};
