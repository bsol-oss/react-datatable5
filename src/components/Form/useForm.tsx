import { JSONSchema7 } from 'json-schema';
import { useState } from 'react';
import { FieldValues, useForm as useReactHookForm } from 'react-hook-form';
import { ajvResolver } from './utils/ajvResolver';
import { CustomJSONSchema7 } from './components/types/CustomJSONSchema7';

// Simple translate interface - no i18n dependency required
export interface Translate {
  t: (key: string, options?: any) => string;
  i18n?: any;
  ready?: boolean;
}

export interface UseFormProps {
  preLoadedValues?: FieldValues | undefined;
  schema?: JSONSchema7;
}
export const useForm = ({ preLoadedValues, schema }: UseFormProps) => {
  const form = useReactHookForm({
    values: preLoadedValues,
    mode: 'onSubmit',
    resolver: schema ? ajvResolver(schema as CustomJSONSchema7) : undefined,
    reValidateMode: 'onChange',
  });
  const [idMap, setIdMap] = useState<Record<string, object>>({});
  return {
    form,
    idMap,
    setIdMap,
  };
};
