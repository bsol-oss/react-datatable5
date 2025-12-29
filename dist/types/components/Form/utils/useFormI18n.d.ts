/**
 * Custom hook for form field labels and fallback text.
 * Automatically handles colLabel construction and removeIndex logic.
 * Uses schema.title when available, otherwise falls back to translate function.
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
 * // Get field label (prefers schema.title)
 * <Field label={formI18n.label()} />
 *
 * // Get required error message
 * <Text>{formI18n.required()}</Text>
 *
 * // Get custom text
 * <Text>{formI18n.t('add_more')}</Text>
 *
 * // Access the raw colLabel
 * const colLabel = formI18n.colLabel;
 * ```
 */
export declare const useFormI18n: (column: string, prefix?: string, schema?: {
    title?: string;
}) => {
    /**
     * The constructed column label (prefix + column)
     */
    colLabel: string;
    /**
     * Get the field label from schema title prop, or fall back to translate function
     * Uses schema.title if available, otherwise: translate.t(removeIndex(`${colLabel}.field_label`))
     */
    label: (options?: any) => string;
    /**
     * Get the required error message
     * Equivalent to: translate.t(removeIndex(`${colLabel}.field_required`))
     */
    required: (options?: any) => string;
    /**
     * Get text for any custom key relative to the field
     * Equivalent to: translate.t(removeIndex(`${colLabel}.${key}`))
     *
     * @param key - The key suffix (e.g., 'add_more', 'total', etc.)
     * @param options - Optional options (e.g., defaultValue, interpolation variables)
     */
    t: (key: string, options?: any) => string;
    /**
     * Access to the original translate object for edge cases
     */
    translate: import("../useForm").Translate;
};
