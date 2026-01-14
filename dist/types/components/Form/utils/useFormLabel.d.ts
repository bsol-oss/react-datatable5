import { CustomJSONSchema7 } from '../components/types/CustomJSONSchema7';
export declare const useFormLabel: (column: string, prefix: string | undefined, schema: CustomJSONSchema7) => {
    /**
     * The constructed column label (prefix + column)
     */
    colLabel: string;
    /**
     * Get the field label from schema title property.
     * Logs a debug message if title is missing.
     */
    label: () => string;
};
