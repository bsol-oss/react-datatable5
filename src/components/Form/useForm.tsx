import { useState } from 'react';
import { FieldValues, useForm as useReactHookForm } from 'react-hook-form';
import { CustomJSONSchema7 } from './components/types/CustomJSONSchema7';
import { ajvResolver } from './utils/ajvResolver';

// Simple translate interface - no i18n dependency required
export interface Translate {
  t: (key: string, options?: any) => string;
  i18n?: any;
  ready?: boolean;
}

export interface UseFormProps {
  preLoadedValues?: FieldValues | undefined;
  schema?: CustomJSONSchema7;
}
export const useForm = ({ preLoadedValues, schema }: UseFormProps) => {
  const form = useReactHookForm({
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
};
