/// <reference types="react" />
import { FieldValues } from 'react-hook-form';
import { CustomJSONSchema7 } from './components/types/CustomJSONSchema7';
export interface UseFormProps<T> {
    preLoadedValues?: T | undefined;
    schema?: CustomJSONSchema7;
}
export declare function useForm<T extends FieldValues = any>({ preLoadedValues, schema, }: UseFormProps<T>): {
    form: import("react-hook-form").UseFormReturn<T, any, T>;
    idMap: Record<string, object>;
    setIdMap: import("react").Dispatch<import("react").SetStateAction<Record<string, object>>>;
};
