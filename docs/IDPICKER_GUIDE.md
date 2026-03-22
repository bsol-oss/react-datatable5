# ID Picker guide

**Id picker** fields are driven by JSON Schema properties with **`variant: 'id-picker'`** (or equivalent wiring in `CustomJSONSchema7`) and optional **`customQueryFn`** for search.

## Labels

Pass **`idPickerLabels`** into **`FormRoot`** so the picker UI uses your strings (or translation keys):

- `undefined`, `addMore`, `typeToSearch`, `total`, `showing`, `perPage`, `emptySearchResult`, `initialResults`

See `IdPickerLabels` in [CustomJSONSchema7](./components/form/custom-json-schema-7.md).

## Data loading

Use **`loadInitialValues`** / **`customQueryFn`** on the schema property to load options and populate **`idMap`** (managed by `useForm` + `FormRoot`).

## Related

- [FormRoot](./components/form/form-root.md)
- [MediaLibraryBrowser](./components/form/media-library-browser.md) (file/media selection patterns)
