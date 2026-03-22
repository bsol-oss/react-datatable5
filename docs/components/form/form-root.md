# FormRoot

Provides **SchemaFormContext** and **React Hook Form** `FormProvider` for JSON Schema–driven forms.

## Source

[`src/components/Form/components/core/FormRoot.tsx`](../../../src/components/Form/components/core/FormRoot.tsx)

## Import

```tsx
import {
  FormRoot,
  type FormRootProps,
  type CustomJSONSchema7Definition,
} from '@bsol-oss/react-datatable5';
```

## API

### `FormRootProps<TData>`

| Name                                                                                                                     | Description                                                             |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `schema`                                                                                                                 | `CustomJSONSchema7` with optional `errorMessages` per property.         |
| `form`                                                                                                                   | `UseFormReturn` from `useForm`.                                         |
| `idMap` / `setIdMap`                                                                                                     | ID → record cache for relation pickers.                                 |
| `dateTimePickerLabels`, `idPickerLabels`, `enumPickerLabels`, `filePickerLabels`, `formButtonLabels`, `timePickerLabels` | Optional UI strings (i18n without coupling to a specific i18n library). |
| `insideDialog`                                                                                                           | Layout hint when the form is inside a dialog.                           |
| `children`                                                                                                               | Usually `FormBody` or custom layout.                                    |

## Example

```tsx
const { form, idMap, setIdMap } = useForm({ schema });

<FormRoot schema={schema} form={form} idMap={idMap} setIdMap={setIdMap}>
  <FormBody />
</FormRoot>;
```

## Related

- [useForm](./use-form.md)
- [CustomJSONSchema7](./custom-json-schema-7.md)

## See also

- Stories: `src/stories/Form/`
- [Component index](../README.md)
