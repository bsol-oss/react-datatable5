# DefaultForm

Convenience wrapper: **`FormRoot` + `FormBody`** in a simple grid layout.

## Source

[`src/components/Form/components/core/DefaultForm.tsx`](../../../src/components/Form/components/core/DefaultForm.tsx)

## Import

```tsx
import { DefaultForm, type DefaultFormProps } from '@bsol-oss/react-datatable5';
```

## API

### `DefaultFormProps<TData>`

| Name         | Description                                                             |
| ------------ | ----------------------------------------------------------------------- |
| `formConfig` | `FormRootProps` without `children` (schema, form, idMap, labels, etc.). |

## Example

```tsx
<DefaultForm
  formConfig={{
    schema,
    form,
    idMap,
    setIdMap,
    dateTimePickerLabels: { ... },
  }}
/>
```

## Related

- [FormRoot](./form-root.md)
- [FormBody](./form-body.md)

## See also

- [Component index](../README.md)
