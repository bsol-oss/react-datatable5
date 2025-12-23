import { useState } from 'react';
import { FieldValues, useForm as useReactHookForm } from 'react-hook-form';
import { JSONSchema7 } from 'json-schema';
import { ajvResolver } from './utils/ajvResolver';

export interface UseFormProps {
  preLoadedValues?: FieldValues | undefined;
  schema?: JSONSchema7;
}
export const useForm = ({ preLoadedValues, schema }: UseFormProps) => {
  const form = useReactHookForm({
    values: preLoadedValues,
    resolver: schema ? ajvResolver(schema) : undefined,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const [idMap, setIdMap] = useState<Record<string, object>>({});
  return {
    form,
    idMap,
    setIdMap,
  };
};
