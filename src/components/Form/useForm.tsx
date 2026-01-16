import { useState } from 'react';
import { FieldValues, useForm as useReactHookForm } from 'react-hook-form';
import { CustomJSONSchema7 } from './components/types/CustomJSONSchema7';
import { ajvResolver } from './utils/ajvResolver';

export interface UseFormProps<T> {
  preLoadedValues?: T | undefined;
  schema?: CustomJSONSchema7;
}
export function useForm<T extends FieldValues = any>({
  preLoadedValues,
  schema,
}: UseFormProps<T>) {
  const form = useReactHookForm<T, any, T>({
    values: preLoadedValues,
    mode: 'onSubmit',
    resolver: schema ? ajvResolver(schema) : undefined,
    reValidateMode: 'onChange',
  });
  const [idMap, setIdMap] = useState<Record<string, object>>({});
  return {
    form,
    idMap,
    setIdMap,
  };
}
