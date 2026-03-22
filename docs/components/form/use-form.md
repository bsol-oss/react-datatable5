# useForm

Wrapper around **react-hook-form** with an **AJV resolver** from the JSON schema and local **`idMap`** state for pickers.

## Source

[`src/components/Form/useForm.tsx`](../../../src/components/Form/useForm.tsx)

## Import

```tsx
import { useForm, type UseFormProps } from '@bsol-oss/react-datatable5';
```

## API

### `UseFormProps<T>`

| Name              | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `schema`          | `CustomJSONSchema7` used for AJV validation (`strict: false`). |
| `preLoadedValues` | Initial `values` for `useForm`.                                |

### Return value

| Name                 | Description                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `form`               | `UseFormReturn` from react-hook-form (`mode: 'onSubmit'`, `reValidateMode: 'onChange'`). |
| `idMap` / `setIdMap` | Pass to `FormRoot` for relation pickers.                                                 |

## Example

```tsx
const { form, idMap, setIdMap } = useForm({
  schema: mySchema,
  preLoadedValues: { name: '' },
});

<FormRoot schema={mySchema} form={form} idMap={idMap} setIdMap={setIdMap}>
  <FormBody />
</FormRoot>;
```

## Related

- [FormRoot](./form-root.md)

## See also

- [Component index](../README.md)
