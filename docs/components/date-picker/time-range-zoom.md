# TimeRangeZoom module

Large set of **time viewport** primitives: zoom/pan controls, virtualized block tracks, grid lines, markers, and hooks (`useTimeRangeZoom`, `useTimeViewport*`).

## Source

[`src/components/DatePicker/TimeRangeZoom.tsx`](../../../src/components/DatePicker/TimeRangeZoom.tsx)

## Import

```tsx
import {
  TimeRangeZoom,
  TimeViewportRoot,
  TimeViewportBlocks,
  TimeViewportGrid,
  TimeViewportHeader,
  TimeViewportMarkerLine,
  TimeViewportBlock,
  useTimeRangeZoom,
  useTimeViewport,
  useTimeViewportTicks,
  type TimeRangeZoomProps,
  type ViewableTimeRange,
} from '@bsol-oss/react-datatable5';
```

## Main pieces

| Symbol                                     | Role                                                           |
| ------------------------------------------ | -------------------------------------------------------------- |
| `TimeRangeZoom`                            | High-level zoom + duration controls for a `ViewableTimeRange`. |
| `TimeViewportRoot`                         | Viewport bounds + optional drag pan and Ctrl+wheel zoom.       |
| `TimeViewportBlocks`                       | Renders scheduled blocks on tracks; optional virtualization.   |
| `TimeViewportGrid` / `TimeViewportHeader`  | Grid lines and time axis labels.                               |
| `TimeViewportMarkerLine`                   | Vertical marker at a timestamp.                                |
| `useTimeRangeZoom`                         | State for zoom factor and clamped range.                       |
| `useTimeViewport` / `useTimeViewportTicks` | Helpers for layout and tick generation.                        |

## Example

```tsx
<TimeRangeZoom
  range={{ start, end }}
  onRangeChange={({ start, end }) => setRange({ start, end })}
/>
```

For custom timelines, compose `TimeViewportRoot` with `TimeViewportBlocks` and see the source for prop details.

## See also

- [Component index](../README.md)
