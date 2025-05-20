import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Card, Grid, IconButton, Input, Show, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import { useSchemaContext } from "../../useSchemaContext";
import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";

export interface DatePickerProps {
  schema: CustomJSONSchema7;
  column: string;
  prefix: string;
}

export const RecordInput = ({ column, schema, prefix }: DatePickerProps) => {
  const {
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();
  const { translate } = useSchemaContext();
  const { required, gridColumn = "span 12", gridRow = "span 1" } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const entries = Object.entries(getValues(column) ?? {});
  const [showNewEntries, setShowNewEntries] = useState<boolean>(false);
  const [newKey, setNewKey] = useState<string>();
  const [newValue, setNewValue] = useState<string>();

  return (
    <Field
      label={`${translate.t(`${column}.field_label`)}`}
      required={isRequired}
      alignItems={"stretch"}
      {...{ gridColumn, gridRow }}
    >
      {entries.map(([key, value]) => {
        return (
          <Grid templateColumns={"1fr 1fr auto"} gap={1}>
            <Input
              value={key}
              onChange={(e) => {
                const filtered = entries.filter(([target]) => {
                  return target !== key;
                });
                setValue(
                  column,
                  Object.fromEntries([...filtered, [e.target.value, value]])
                );
              }}
              autoComplete="off"
            />
            <Input
              value={value as string}
              onChange={(e) => {
                setValue(column, {
                  ...getValues(column),
                  [key]: e.target.value,
                });
              }}
              autoComplete="off"
            />
            <IconButton
              variant={"ghost"}
              onClick={() => {
                const filtered = entries.filter(([target]) => {
                  return target !== key;
                });
                setValue(column, Object.fromEntries([...filtered]));
              }}
            >
              <CgClose />
            </IconButton>
          </Grid>
        );
      })}
      <Show when={showNewEntries}>
        <Card.Root>
          <Card.Body gap="2">
            <Grid templateColumns={"1fr 1fr auto"} gap={1}>
              <Input
                value={newKey}
                onChange={(e) => {
                  setNewKey(e.target.value);
                }}
                autoComplete="off"
              />
              <Input
                value={newValue}
                onChange={(e) => {
                  setNewValue(e.target.value);
                }}
                autoComplete="off"
              />
            </Grid>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <IconButton
              variant={"subtle"}
              onClick={() => {
                setShowNewEntries(false);
                setNewKey(undefined);
                setNewValue(undefined);
              }}
            >
              <CgClose />
            </IconButton>
            <Button
              onClick={() => {
                if (!!newKey === false) {
                  setShowNewEntries(false);
                  setNewKey(undefined);
                  setNewValue(undefined);
                  return;
                }
                setValue(
                  column,
                  Object.fromEntries([...entries, [newKey, newValue]])
                );
                setShowNewEntries(false);
                setNewKey(undefined);
                setNewValue(undefined);
              }}
            >
              {translate.t(`${column}.save`)}
            </Button>
          </Card.Footer>
        </Card.Root>
      </Show>
      <Button
        onClick={() => {
          setShowNewEntries(true);
          setNewKey(undefined);
          setNewValue(undefined);
        }}
      >
        {translate.t(`${column}.addNew`)}
      </Button>
      {errors[`${column}`] && (
        <Text color={"red.400"}>{translate.t(`${column}.field_required`)}</Text>
      )}
    </Field>
  );
};
