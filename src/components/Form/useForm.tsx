import { useState } from 'react';
import { FieldValues, useForm as useReactHookForm } from 'react-hook-form';
import { JSONSchema7 } from 'json-schema';
import { ajvResolver } from './utils/ajvResolver';

// Simple translate interface - no i18n dependency required
export interface Translate {
  t: (key: string, options?: any) => string;
  i18n?: any;
  ready?: boolean;
}

export interface UseFormProps {
  preLoadedValues?: FieldValues | undefined;
  namespace?: string; // Deprecated: no longer used (was for i18n)
  schema?: JSONSchema7;
}
export const useForm = ({
  preLoadedValues,
  namespace: _namespace, // Deprecated: kept for backward compatibility
  schema,
}: UseFormProps) => {
  const form = useReactHookForm({
    values: preLoadedValues,
    resolver: schema ? ajvResolver(schema) : undefined,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const [idMap, setIdMap] = useState<Record<string, object>>({});
  // Fallback translate object - returns key as-is (no i18n required)
  const translate: Translate = {
    t: (key: string) => key,
    ready: true,
  };
  return {
    form,
    idMap,
    setIdMap,
    translate, // Components prefer label objects over translate
  };
};
