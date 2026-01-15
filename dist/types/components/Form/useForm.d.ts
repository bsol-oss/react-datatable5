/// <reference types="react" />
import { FieldValues } from 'react-hook-form';
import { CustomJSONSchema7 } from './components/types/CustomJSONSchema7';
export interface Translate {
    t: (key: string, options?: any) => string;
    i18n?: any;
    ready?: boolean;
}
export interface UseFormProps {
    preLoadedValues?: FieldValues | undefined;
    schema?: CustomJSONSchema7;
}
export declare const useForm: ({ preLoadedValues, schema }: UseFormProps) => {
    form: import("react-hook-form").UseFormReturn<FieldValues, any, undefined>;
    idMap: Record<string, object>;
    setIdMap: import("react").Dispatch<import("react").SetStateAction<Record<string, object>>>;
};
