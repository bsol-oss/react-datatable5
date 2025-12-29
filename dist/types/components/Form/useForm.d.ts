/// <reference types="react" />
import { FieldValues } from 'react-hook-form';
import { JSONSchema7 } from 'json-schema';
export interface Translate {
    t: (key: string, options?: any) => string;
    i18n?: any;
    ready?: boolean;
}
export interface UseFormProps {
    preLoadedValues?: FieldValues | undefined;
    keyPrefix?: string;
    namespace?: string;
    schema?: JSONSchema7;
}
export declare const useForm: ({ preLoadedValues, keyPrefix: _keyPrefix, namespace: _namespace, schema, }: UseFormProps) => {
    form: import("react-hook-form").UseFormReturn<FieldValues, any, undefined>;
    idMap: Record<string, object>;
    setIdMap: import("react").Dispatch<import("react").SetStateAction<Record<string, object>>>;
    translate: Translate;
};
