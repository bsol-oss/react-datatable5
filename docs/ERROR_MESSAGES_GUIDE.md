# Error messages guide

Forms in this library use **JSON Schema** with optional **`errorMessages`** on each property. Validation runs through **AJV** (via `useForm` + `@hookform/resolvers/ajv`).

## Principles

1. **Per-field messages** — Add an `errorMessages` object to the property schema with keys that match AJV keywords (`required`, `minLength`, `format`, etc.).
2. **No built-in translations** — The library does not ship default user-facing strings; your app supplies the strings (or translation keys) in the schema.
3. **Empty values** — Empty strings and missing optional fields are typically stripped before validation; see `validateData` in the codebase for form submission flows.

## Example

```json
{
  "type": "object",
  "required": ["email"],
  "properties": {
    "email": {
      "type": "string",
      "format": "email",
      "errorMessages": {
        "required": "validation.email_required",
        "format": "validation.email_invalid"
      }
    }
  }
}
```

## Related

- [CustomJSONSchema7](./components/form/custom-json-schema-7.md)
- [FormRoot](./components/form/form-root.md)
