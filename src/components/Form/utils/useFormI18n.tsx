import { useSchemaContext } from '../useSchemaContext';
import { removeIndex } from './removeIndex';

/**
 * Custom hook to simplify i18n translation for form fields.
 * Automatically handles colLabel construction and removeIndex logic.
 *
 * @param column - The column name
 * @param prefix - The prefix for the field (usually empty string or parent path)
 * @param schema - Optional schema object with title property
 * @returns Object with translation helper functions
 *
 * @example
 * ```tsx
 * const formI18n = useFormI18n(column, prefix, schema);
 *
 * // Get field label
 * <Field label={formI18n.label()} />
 *
 * // Get error message
 * <Text>{formI18n.required()}</Text>
 *
 * // Get custom translation key
 * <Text>{formI18n.t('add_more')}</Text>
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
  const { translate } = useSchemaContext();
  const colLabel = `${prefix}${column}`;

  return {
    /**
     * The constructed column label (prefix + column)
     */
    colLabel,

    /**
     * Get the field label from schema title prop, or fall back to translation
     * Uses schema.title if available, otherwise: translate.t(removeIndex(`${colLabel}.field_label`))
     */
    label: (options?: any): string => {
      if (schema?.title) {
        return schema.title;
      }
      return translate.t(removeIndex(`${colLabel}.field_label`), options);
    },

    /**
     * Get the required error message translation
     * Equivalent to: translate.t(removeIndex(`${colLabel}.field_required`))
     */
    required: (options?: any): string => {
      return translate.t(removeIndex(`${colLabel}.field_required`), options);
    },

    /**
     * Get a translation for any custom key relative to the field
     * Equivalent to: translate.t(removeIndex(`${colLabel}.${key}`))
     *
     * @param key - The translation key suffix (e.g., 'add_more', 'total', etc.)
     * @param options - Optional translation options (e.g., defaultValue, interpolation variables)
     */
    t: (key: string, options?: any): string => {
      return translate.t(removeIndex(`${colLabel}.${key}`), options);
    },

    /**
     * Access to the original translate object for edge cases
     */
    translate,
  };
};
