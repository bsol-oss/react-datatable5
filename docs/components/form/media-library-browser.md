# MediaLibraryBrowser

Standalone **media library** UI: search, grid of files, optional image-only filter, single or multi select. Used by file-picker flows and exportable on its own.

## Source

[`src/components/Form/components/MediaLibraryBrowser.tsx`](../../../src/components/Form/components/MediaLibraryBrowser.tsx)

## Import

```tsx
import {
  MediaLibraryBrowser,
  type MediaLibraryBrowserProps,
} from '@bsol-oss/react-datatable5';
```

## API

### `MediaLibraryBrowserProps`

Discriminated by `multiple`:

- `multiple?: false` — single selection; `onFileSelect` / `onSelectedFileChange` for one file.
- `multiple: true` — multi selection; handlers use arrays.

Common props:

| Name              | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `onFetchFiles`    | `(search: string) => Promise<FilePickerMediaFile[]>` |
| `filterImageOnly` | Restrict to image extensions.                        |
| `labels`          | `FilePickerLabels` from schema context pattern.      |
| `enabled`         | Disable query when false.                            |

## Example

```tsx
<MediaLibraryBrowser
  onFetchFiles={async (q) => fetch(`/api/media?q=${q}`).then((r) => r.json())}
  selectedFile={file}
  onSelectedFileChange={setFile}
/>
```

## Related

- [CustomJSONSchema7](./custom-json-schema-7.md)

## See also

- [IDPICKER_GUIDE.md](../../IDPICKER_GUIDE.md) (related picker patterns)
- [Component index](../README.md)
