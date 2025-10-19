import { useSchemaContext } from "../useSchemaContext";
import { removeIndex } from "./removeIndex";

/**
 * Custom hook to simplify i18n translation for form fields.
 * Automatically handles colLabel construction and removeIndex logic.
 *
 * @param column - The column name
 * @param prefix - The prefix for the field (usually empty string or parent path)
 * @returns Object with translation helper functions
 *
 * @example
 * ```tsx
 * const formI18n = useFormI18n(column, prefix);
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
export const useFormI18n = (column: string, prefix: string = "") => {
  const { translate } = useSchemaContext();
  const colLabel = `${prefix}${column}`;

  return {
    /**
     * The constructed column label (prefix + column)
     */
    colLabel,

    /**
     * Get the field label translation
     * Equivalent to: translate.t(removeIndex(`${colLabel}.field_label`))
     */
    label: (options?: any): string => {
      return translate.t(removeIndex(`${colLabel}.field_label`), options) as string;
    },

    /**
     * Get the required error message translation
     * Equivalent to: translate.t(removeIndex(`${colLabel}.field_required`))
     */
    required: (options?: any): string => {
      return translate.t(removeIndex(`${colLabel}.field_required`), options) as string;
    },

    /**
     * Get a translation for any custom key relative to the field
     * Equivalent to: translate.t(removeIndex(`${colLabel}.${key}`))
     *
     * @param key - The translation key suffix (e.g., 'add_more', 'total', etc.)
     * @param options - Optional translation options (e.g., defaultValue, interpolation variables)
     */
    t: (key: string, options?: any): string => {
      return translate.t(removeIndex(`${colLabel}.${key}`), options) as string;
    },

    /**
     * Access to the original translate object for edge cases
     */
    translate,
  };
};
