/// <reference types="react" />
import { JSONSchema7 } from 'json-schema';
import { FieldValues } from 'react-hook-form';
export interface Translate {
    t: (key: string, options?: any) => string;
    i18n?: any;
    ready?: boolean;
}
export interface UseFormProps {
    preLoadedValues?: FieldValues | undefined;
    schema?: JSONSchema7;
}
export declare const useForm: ({ preLoadedValues, schema }: UseFormProps) => {
    form: import("react-hook-form").UseFormReturn<FieldValues, any, undefined>;
    idMap: Record<string, object>;
    setIdMap: import("react").Dispatch<import("react").SetStateAction<Record<string, object>>>;
};
