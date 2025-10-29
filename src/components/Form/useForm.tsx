import { useState } from 'react';
import { FieldValues, useForm as useReactHookForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { JSONSchema7 } from 'json-schema';
import { ajvResolver } from './utils/ajvResolver';

export interface UseFormProps {
  preLoadedValues?: FieldValues | undefined;
  keyPrefix?: string;
  namespace?: string;
  schema?: JSONSchema7;
}
export const useForm = ({
  preLoadedValues,
  keyPrefix,
  namespace,
  schema,
}: UseFormProps) => {
  const form = useReactHookForm({
    values: preLoadedValues,
    resolver: schema ? ajvResolver(schema) : undefined,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const [idMap, setIdMap] = useState<Record<string, object>>({});
  const translate = useTranslation(namespace || '', { keyPrefix });
  return {
    form,
    idMap,
    setIdMap,
    translate,
  };
};
