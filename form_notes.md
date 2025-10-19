
# Form

Form component can help create a object to submit an network request.

- Wrap form with confirmation, submit success and error handling ui by default
- Use `i18next` by default to display `column_id` and text in form in multiple language.
- Use `axios` by default to submit a request.


## Usage

```tsx
<Form
  schema={someSchema as JSONSchema7}
  serverUrl={"http://localhost:8081"}
/>
```

## Set up

### Providers

You MUST provide all three provider from packages `i18next`, `@tanstack/react-query`, and `@chakra-ui/react`

```tsx
<Provider>
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <SomeForm />
    </I18nextProvider>
  </QueryClientProvider>
</Provider>
```

### Schema

You MUST provide a `schema` props to specify the inputs in a form. You MUST specify the keyword `type` as `object`.

Currently, The `Form` component provide LIMITED json schema attributes in this release. Please check the below list to acknowledge the supported Keywords, and the intended keywords to support future releases.

The example of a valid `schema` object

```tsx
const schema = {
  type: "object",
  title: "core_memberships",
  required: ["id"],
  properties: {
    id: {
      type: "string",
    },
    remarks: {
      type: "string",
    },
  }
}
const SomeForm = () => {
  return (
    <Form
      schema={schema as JSONSchema7}
      serverUrl={"http://localhost:8081"}
    />
  )
}
```

### Important: Avoid `as const` with Schemas

❌ **DO NOT** use `as const` when defining schemas:

```tsx
// WRONG - This will cause TypeScript errors
const schema = {
  type: "object",
  required: ["name"],
  properties: { 
    name: { type: "string" }
  }
} as const;  // ❌ Causes readonly tuple error
```

✅ **DO** use `as JSONSchema7` or no type assertion:

```tsx
// CORRECT - Option 1: Use JSONSchema7 type assertion
const schema = {
  type: "object",
  required: ["name"],
  properties: { 
    name: { type: "string" }
  }
} as JSONSchema7;  // ✅ Works correctly

// CORRECT - Option 2: No type assertion
const schema = {
  type: "object",
  required: ["name"],
  properties: { 
    name: { type: "string" }
  }
};  // ✅ Works correctly
```

**Why?** Using `as const` makes the `required` array a readonly tuple (e.g., `readonly ["name"]`), but the `CustomJSONSchema7` type (which extends `JSONSchema7`) expects a mutable `string[]` array. This incompatibility causes TypeScript errors like:

```
Type 'readonly ["name"]' is 'readonly' and cannot be assigned to the mutable type 'string[]'
```

## Supported Keywords

### `title`

You MUST provide the `title` keyword to specifies the string id that will be used in `i18n` translate.

The value must be in type `string`.

### `required`

You MAY provide the `required` keyword to specifies the input that are required to fill before confirmation.

The value must be in type `array` of `string`.

### `properties`

You MUST provide the `properties` keywords to specifies the fields that the form should appear.

The value must be in type `object`. The keys in this object specifies the column id and the values its related properties. Check the sections **Column Keywords** show the supported column keywords.


## Column Keywords

### `type`

You MUST provide the `type` keywords to specifies the value type that the column should create. Some value types may include different inputs by specify the `variant` keywords.

Check the sections **Value types** show the supported keywords and input variants for each value type.

Supported value types: `array`, `string`, `number`, `boolean`, `integer`, `object`;

## Value types 

This sections show the supported keywords and input variants for each value type.

### `string`

For input types `string`, it will generate a string input by default.

If you specify the `variant` keyword, it will render a picker to fill a string that requires a format.

Supported variants in `string`: `id-picker`, `date_picker`

#### `id-picker`

For string input variant `id-picker`, it will generate a selector that can pop up a search to help the selection. After the user select a options, the input will show the selected record, and save its correspond string value in the form object.

You MUST include the keyword `foreign_key` and a object with keys `display_column`, `table`, `column`. The `display_column` key is the column that show the label for that value to user, and `column` key is the column that its value should set in this input.

You MUST include a `/api/g` api that could accept the following request in order to search for a record. 

```ts
const requestConfig = {
  method: "GET",
  url: `${serverUrl}/api/g/${table}`,
  params: {
    searching,
    where,
    limit,
    offset
  },
}
```

The example valid schema that use `id=picker` variant.

```tsx
const eventsFilesSchema = {
  type: "object",
  title: "events_files",
  required: ["event_id", "file_id"],
  properties: {
    file_id: {
      type: "array",
      variant: "file-picker",
    },
    event_id: {
      type: "string",
      variant: "id-picker",
      foreign_key: {
        display_column: "event_name",
        table: "core_events",
        column: "id",
      },
    },
  },
}
```

### `number`

For value type `number`, it will generate a number input by default.

Currently no supported variants.

### `boolean`

For value type `boolean`, it will generate a checkbox by default.

Currently no supported variants.


### `array`

For value type `array`, by default it will generate NO input. 

You MUST specify the `variant` keyword to display a relevant input.

Supported variant in `array`: `id-picker`, `file-picker`

### `object`

For value type `object`, by default it will generate a input that can input key value pairs. 

It is NOT RECOMMENDED to use the default input, Later release may include a json editor by default.

### Intented Support Keywords in Future Release 

(TBC)