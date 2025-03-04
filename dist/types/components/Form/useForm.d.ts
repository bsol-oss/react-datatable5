/// <reference types="react" />
import { FieldValues } from "react-hook-form";
export interface UseFormProps {
    preLoadedValues?: FieldValues | undefined;
    keyPrefix?: string;
}
export declare const useForm: ({ preLoadedValues, keyPrefix }: UseFormProps) => {
    form: import("react-hook-form").UseFormReturn<FieldValues, any, undefined>;
    idMap: Record<string, object>;
    setIdMap: import("react").Dispatch<import("react").SetStateAction<Record<string, object>>>;
    translate: import("react-i18next").UseTranslationResponse<"", string>;
};
