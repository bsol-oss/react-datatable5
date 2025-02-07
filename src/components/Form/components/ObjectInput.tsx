import { snakeToLabel } from "@/components/Form/utils/snakeToLabel";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  Box,
  Card,
  Grid,
  IconButton,
  Input,
  Show,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import { useSchemaContext } from "../useSchemaContext";
import { CustomJSONSchema7 } from "./StringInputField";

export interface DatePickerProps {
  column: string;
}

export const ObjectInput = ({ column }: DatePickerProps) => {
  const {
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();
  const { schema } = useSchemaContext();
  const { required } = schema;
  const isRequired = required?.some((columnId) => columnId === column);
  const entries = Object.entries(getValues(column) ?? {});
  const [showNewEntries, setShowNewEntries] = useState<boolean>(false);
  const [newKey, setNewKey] = useState<string>();
  const [newValue, setNewValue] = useState<string>();
  if (schema.properties == undefined) {
    throw new Error("schema properties when using DatePicker");
  }
  const { gridColumn, gridRow, title } = schema.properties[
    column
  ] as CustomJSONSchema7;
  return (
    <Field
      label={`${title ?? snakeToLabel(column)}`}
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
            <Card.Title mb="2">New Entries</Card.Title>
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
              Save
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
        add new
      </Button>
      {errors[`${column}`] && <Text>This field is required</Text>}
    </Field>
  );
};
