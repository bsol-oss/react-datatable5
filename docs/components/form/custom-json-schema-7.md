# CustomJSONSchema7

Extended **JSON Schema** type used by this library: recursive `CustomJSONSchema7` properties, UI variants, label types, file picker config, and custom query hooks for pickers.

## Source

[`src/components/Form/components/types/CustomJSONSchema7.tsx`](../../../src/components/Form/components/types/CustomJSONSchema7.tsx)

## Import

```tsx
import type {
  CustomJSONSchema7,
  CustomQueryFn,
  CustomQueryFnParams,
  CustomQueryFnResponse,
  ValidationErrorType,
  DateTimePickerLabels,
  IdPickerLabels,
  EnumPickerLabels,
  FilePickerLabels,
  FormButtonLabels,
  TimePickerLabels,
  FilePickerMediaFile,
  FilePickerProps,
} from '@bsol-oss/react-datatable5';
import {
  defaultRenderDisplay,
  FilePickerMediaFileSchema,
} from '@bsol-oss/react-datatable5';
```

## Highlights

| Export                      | Role                                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `CustomJSONSchema7`         | Schema type with `variant`, `gridColumn`/`gridRow`, `errorMessage`, `renderDisplay`, `customQueryFn`, nested `properties`, etc. |
| `CustomQueryFn`             | Async search for id/enum-style pickers; returns `{ data, idMap }`.                                                              |
| Label interfaces            | Strings for date/time, id picker, enum picker, file picker, buttons, time picker.                                               |
| `FilePickerMediaFile`       | Shape for media library / file picker items.                                                                                    |
| `FilePickerMediaFileSchema` | JSON Schema snippet documenting `FilePickerMediaFile`.                                                                          |
| `defaultRenderDisplay`      | Default display string for unknown object values in pickers.                                                                    |

## Related

- [FormRoot](./form-root.md)
- [ERROR_MESSAGES_GUIDE.md](../../ERROR_MESSAGES_GUIDE.md)

## See also

- [Component index](../README.md)
