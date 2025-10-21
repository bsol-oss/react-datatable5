import { useState } from "react";
import { FieldValues, useForm as useReactHookForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface UseFormProps {
  preLoadedValues?: FieldValues | undefined;
  keyPrefix?: string;
  namespace?: string;
}
export const useForm = ({ preLoadedValues, keyPrefix, namespace }: UseFormProps) => {
  const form = useReactHookForm({
    values: preLoadedValues,
  });
  const [idMap, setIdMap] = useState<Record<string, object>>({});
  const translate = useTranslation(namespace || "", { keyPrefix });
  return {
    form,
    idMap,
    setIdMap,
    translate,
  };
};
