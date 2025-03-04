import { useState } from "react";
import { FieldValues, useForm as useReactHookForm } from "react-hook-form";

export interface UseFormProps {
  preLoadedValues?: FieldValues | undefined;
}
export const useForm = ({ preLoadedValues }: UseFormProps) => {
  const form = useReactHookForm({ values: preLoadedValues });
  const [idMap, setIdMap] = useState<Record<string, object>>({});
  return {
    form,
    idMap,
    setIdMap,
  };
};
