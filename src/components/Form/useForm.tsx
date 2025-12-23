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
  keyPrefix?: string; // Deprecated: no longer used (was for i18n)
  namespace?: string; // Deprecated: no longer used (was for i18n)
  schema?: JSONSchema7;
}
export const useForm = ({
  preLoadedValues,
  keyPrefix: _keyPrefix, // Deprecated: kept for backward compatibility
  namespace: _namespace, // Deprecated: kept for backward compatibility
  schema,
}: UseFormProps) => {
  const form = useReactHookForm({
    values: preLoadedValues,
    resolver: schema ? ajvResolver(schema) : undefined,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
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
