import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import {
  createContext,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type WheelEvent as ReactWheelEvent,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { LuZoomIn, LuZoomOut } from 'react-icons/lu';

type TimeInput = Date | string | number;
const VIEWPORT_TRANSITION_EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
const VIEWPORT_TRANSITION_DURATION_MS = 220;
const VIEWPORT_TRANSITION = `transform ${VIEWPORT_TRANSITION_DURATION_MS}ms ${VIEWPORT_TRANSITION_EASING}, opacity ${VIEWPORT_TRANSITION_DURATION_MS}ms ${VIEWPORT_TRANSITION_EASING}`;

export interface ViewableTimeRange {
  start: TimeInput;
  end: TimeInput;
}

export interface TimeRangeZoomLabels {
  zoomIn?: string;
  zoomOut?: string;
  reset?: string;
  visibleRange?: string;
  duration?: string;
  daysShort?: string;
  hoursShort?: string;
  minutesShort?: string;
  secondsShort?: string;
  invalidRange?: string;
  dateTimeFormat?: string;
}

export interface TimeRangeZoomProps {
  range: ViewableTimeRange;
  onRangeChange: (range: { start: Date; end: Date }) => void;
  minDurationMs?: number;
  maxDurationMs?: number;
  zoomFactor?: number;
  resetDurationMs?: number;
  showResetButton?: boolean;
  disabled?: boolean;
  labels?: TimeRangeZoomLabels;
}

export interface TimeViewportBlockProps {
  start: TimeInput;
  end: TimeInput;
  viewportStart?: TimeInput;
  viewportEnd?: TimeInput;
  height?: string | number;
  minWidthPx?: number;
  borderRadius?: string | number;
  colorPalette?: string;
  background?: string;
  label?: string;
  showLabel?: boolean;
  hideWhenOutOfView?: boolean;
  onClick?: () => void;
}

export interface TimeViewportBlockItem {
  id: string;
  start?: TimeInput;
  end?: TimeInput;
  label?: string;
  colorPalette?: string;
  background?: string;
  track?: string | number;
  children?: TimeViewportBlockItem[];
  onClick?: (block: TimeViewportBlockItem) => void;
}

export interface TimeViewportMarkerLineProps {
  timestamp: TimeInput;
  viewportStart?: TimeInput;
  viewportEnd?: TimeInput;
  height?: string | number;
  colorPalette?: string;
  color?: string;
  lineWidthPx?: number;
  label?: string;
  showLabel?: boolean;
  hideWhenOutOfView?: boolean;
}

export interface TimeViewportHeaderProps {
  viewportStart?: TimeInput;
  viewportEnd?: TimeInput;
  tickCount?: number;
  tickStrategy?: 'count' | 'timeUnit';
  tickUnit?: 'minute' | 'hour' | 'day';
  tickStep?: number;
  format?: string;
  height?: string | number;
  color?: string;
  borderColor?: string;
  showBottomBorder?: boolean;
  animationDurationMs?: number;
  animationEasing?: string;
}

export interface TimeViewportHeaderTick {
  index: number;
  percent: number;
  label: string;
}

export interface UseTimeViewportTicksResult {
  isValidViewport: boolean;
  getTicksByCount: (tickCount?: number) => TimeViewportHeaderTick[];
  getTicksByTimeUnit: (
    tickUnit?: TimeViewportHeaderProps['tickUnit'],
    tickStep?: number
  ) => TimeViewportHeaderTick[];
  getTicks: (options?: {
    tickStrategy?: TimeViewportHeaderProps['tickStrategy'];
    tickCount?: number;
    tickUnit?: TimeViewportHeaderProps['tickUnit'];
    tickStep?: number;
  }) => TimeViewportHeaderTick[];
}

export interface TimeViewportGridProps {
  viewportStart?: TimeInput;
  viewportEnd?: TimeInput;
  tickCount?: number;
  tickStrategy?: 'count' | 'timeUnit';
  tickUnit?: 'minute' | 'hour' | 'day';
  tickStep?: number;
  format?: string;
  minorDivisions?: number;
  majorLineColor?: string;
  minorLineColor?: string;
  showMinorLines?: boolean;
  zIndex?: number;
  animationDurationMs?: number;
  animationEasing?: string;
}

export interface TimeViewportBlockRenderArgs {
  block: TimeViewportBlockItem;
  geometry: { leftPercent: number; widthPercent: number };
  index: number;
}

export interface TimeViewportBlocksProps {
  blocks: TimeViewportBlockItem[];
  viewportStart?: TimeInput;
  viewportEnd?: TimeInput;
  height?: string | number;
  minWidthPx?: number;
  borderRadius?: string | number;
  defaultColorPalette?: string;
  showLabel?: boolean;
  hideWhenOutOfView?: boolean;
  hideEmptyTracks?: boolean;
  gap?: number;
  allowOverlap?: boolean;
  overlapOpacity?: number;
  renderTrackPrefix?: (args: {
    trackIndex: number;
    trackBlocks: TimeViewportBlockItem[];
    trackKey?: string | number;
  }) => ReactNode;
  renderTrackSuffix?: (args: {
    trackIndex: number;
    trackBlocks: TimeViewportBlockItem[];
    trackKey?: string | number;
  }) => ReactNode;
  /** Custom render function for block content. The returned node is placed inside a positioning wrapper that handles translateX and transitions. */
  renderBlock?: (args: TimeViewportBlockRenderArgs) => ReactNode;
  onBlockClick?: (block: TimeViewportBlockItem) => void;
  /** Enable virtual scrolling for large track lists. */
  virtualize?: boolean;
  /** Fixed pixel height of the scroll container when virtualize is true. Defaults to 400. */
  virtualHeight?: number;
  /** Number of off-screen rows to render above/below the visible area. Defaults to 5. */
  overscan?: number;
}

export interface TimeViewportRootProps {
  viewportStart: TimeInput;
  viewportEnd: TimeInput;
  children: ReactNode;
  onViewportChange?: (range: { start: Date; end: Date }) => void;
  enableDragPan?: boolean;
  enableCtrlWheelZoom?: boolean;
  wheelZoomFactor?: number;
  minDurationMs?: number;
  maxDurationMs?: number;
}

const TimeViewportContext = createContext<{
  viewportStart: TimeInput;
  viewportEnd: TimeInput;
} | null>(null);

const useResolvedViewport = (
  viewportStart?: TimeInput,
  viewportEnd?: TimeInput
) => {
  const context = useContext(TimeViewportContext);
  const resolvedStart = viewportStart ?? context?.viewportStart;
  const resolvedEnd = viewportEnd ?? context?.viewportEnd;

  if (resolvedStart === undefined || resolvedEnd === undefined) return null;

  return {
    viewportStart: resolvedStart,
    viewportEnd: resolvedEnd,
  };
};

export function TimeViewportRoot({
  viewportStart,
  viewportEnd,
  children,
  onViewportChange,
  enableDragPan = false,
  enableCtrlWheelZoom = false,
  wheelZoomFactor = 1.2,
  minDurationMs = 60 * 1000,
  maxDurationMs = 365 * 24 * 60 * 60 * 1000,
}: TimeViewportRootProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    viewportStartMs: number;
    viewportEndMs: number;
  } | null>(null);

  const parseViewport = useCallback(() => {
    const start = parseTimeInput(viewportStart);
    const end = parseTimeInput(viewportEnd);
    if (!start || !end || !end.isAfter(start)) return null;
    return {
      startMs: start.valueOf(),
      endMs: end.valueOf(),
    };
  }, [viewportEnd, viewportStart]);

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!enableDragPan || !onViewportChange) return;
    if (e.button !== 0) return;
    const parsed = parseViewport();
    if (!parsed) return;

    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      viewportStartMs: parsed.startMs,
      viewportEndMs: parsed.endMs,
    };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!enableDragPan || !onViewportChange) return;
    const dragging = dragRef.current;
    if (!dragging || dragging.pointerId !== e.pointerId) return;

    const width = containerRef.current?.clientWidth ?? 0;
    if (width <= 0) return;

    const deltaX = e.clientX - dragging.startX;
    const durationMs = dragging.viewportEndMs - dragging.viewportStartMs;
    const shiftMs = (-deltaX / width) * durationMs;
    onViewportChange({
      start: dayjs(dragging.viewportStartMs + shiftMs).toDate(),
      end: dayjs(dragging.viewportEndMs + shiftMs).toDate(),
    });
  };

  const stopDragging = (e: ReactPointerEvent<HTMLDivElement>) => {
    const dragging = dragRef.current;
    if (!dragging || dragging.pointerId !== e.pointerId) return;
    dragRef.current = null;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleWheel = (e: ReactWheelEvent<HTMLDivElement>) => {
    if (!e.ctrlKey) return;

    // Prevent browser-level Ctrl/Cmd + wheel page zoom while interacting
    // with the timeline surface.
    e.preventDefault();

    if (!enableCtrlWheelZoom || !onViewportChange) return;

    const parsed = parseViewport();
    if (!parsed) return;
    const width = containerRef.current?.clientWidth ?? 0;
    if (width <= 0) return;

    const safeFactor = wheelZoomFactor > 1 ? wheelZoomFactor : 1.2;
    const durationMs = parsed.endMs - parsed.startMs;

    // Exponential zoom curve: each wheel "step" compounds by safeFactor.
    // This keeps zooming smooth on trackpads and predictable on mouse wheels.
    const wheelStep = e.deltaY / 100;
    const zoomMultiplier = Math.pow(safeFactor, wheelStep);
    const nextDuration = clampNumber(
      durationMs * (Number.isFinite(zoomMultiplier) ? zoomMultiplier : 1),
      minDurationMs,
      maxDurationMs
    );

    const rect = containerRef.current?.getBoundingClientRect();
    const x = rect ? e.clientX - rect.left : width / 2;
    const ratio = clampNumber(x / width, 0, 1);
    const anchorMs = parsed.startMs + durationMs * ratio;
    const nextStartMs = anchorMs - nextDuration * ratio;
    const nextEndMs = anchorMs + nextDuration * (1 - ratio);

    onViewportChange({
      start: dayjs(nextStartMs).toDate(),
      end: dayjs(nextEndMs).toDate(),
    });
  };

  return (
    <TimeViewportContext.Provider value={{ viewportStart, viewportEnd }}>
      <Box
        ref={containerRef}
        position="relative"
        width="100%"
        cursor={enableDragPan ? (isDragging ? 'grabbing' : 'grab') : 'default'}
        userSelect={enableDragPan ? 'none' : undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onWheel={handleWheel}
      >
        {children}
      </Box>
    </TimeViewportContext.Provider>
  );
}

type ParsedTimeViewportBlock = {
  block: TimeViewportBlockItem;
  index: number;
  geometry: {
    valid: boolean;
    leftPercent: number;
    widthPercent: number;
  };
  startMs: number;
  endMs: number;
};

interface TimeViewportTrackRowProps {
  trackKey: string;
  blocks: ParsedTimeViewportBlock[];
  resolvedHeight: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  renderBlockNode: (
    blockItem: ParsedTimeViewportBlock,
    indexInLayer: number
  ) => ReactNode;
}

function TimeViewportTrackRow({
  trackKey,
  blocks,
  resolvedHeight,
  prefix,
  suffix,
  renderBlockNode,
}: TimeViewportTrackRowProps) {
  return (
    <Box
      key={trackKey}
      width="100%"
      overflowX={'hidden'}
      position="relative"
      height={resolvedHeight}
    >
      <Box position="relative" width="100%" height="100%">
        {blocks.map((item, index) => renderBlockNode(item, index))}
      </Box>
      {prefix ? (
        <Box
          position="absolute"
          top={0}
          insetInlineStart={0}
          zIndex={2}
          pointerEvents="auto"
        >
          {prefix}
        </Box>
      ) : null}
      {suffix ? (
        <Box
          position="absolute"
          top={0}
          insetInlineEnd={0}
          zIndex={2}
          pointerEvents="auto"
        >
          {suffix}
        </Box>
      ) : null}
    </Box>
  );
}

const defaultLabels: Required<TimeRangeZoomLabels> = {
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  reset: 'Reset',
  visibleRange: 'Visible range',
  duration: 'Duration',
  daysShort: 'd',
  hoursShort: 'h',
  minutesShort: 'm',
  secondsShort: 's',
  invalidRange: 'Invalid range',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
};

const DEFAULT_MIN_DURATION_MS = 60 * 1000;
const DEFAULT_MAX_DURATION_MS = 365 * 24 * 60 * 60 * 1000;
const DEFAULT_ZOOM_FACTOR = 2;

export interface UseTimeRangeZoomResult {
  labels: Required<TimeRangeZoomLabels>;
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
  durationMs: number;
  canZoomIn: boolean;
  canZoomOut: boolean;
  hasValidDisplayRange: boolean;
  visibleRangeText: string;
  durationText: string;
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
}

const clampNumber = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const toValidDayjs = (value: TimeInput, fallback: dayjs.Dayjs) => {
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed : fallback;
};

const parseTimeInput = (value: TimeInput) => {
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed : null;
};

const flattenTrackBlocks = (
  blocks: TimeViewportBlockItem[],
  inheritedTrack?: string | number
): TimeViewportBlockItem[] => {
  const flattened: TimeViewportBlockItem[] = [];

  blocks.forEach((block) => {
    const resolvedTrack = block.track ?? inheritedTrack;

    if (block.children && block.children.length > 0) {
      flattened.push(...flattenTrackBlocks(block.children, resolvedTrack));
    }

    if (block.start !== undefined && block.end !== undefined) {
      flattened.push({
        ...block,
        track: resolvedTrack,
      });
    }
  });

  return flattened;
};

export interface UseTimeViewportBlockGeometryResult {
  hasValidViewport: boolean;
  getGeometry: (
    start?: TimeInput,
    end?: TimeInput
  ) => {
    valid: boolean;
    leftPercent: number;
    widthPercent: number;
  };
  toTimeMs: (value?: TimeInput) => number | null;
}

export interface UseTimeViewportDerivedResult {
  isValidViewport: boolean;
  toTimeMs: (value?: TimeInput) => number | null;
  getGeometry: (
    start?: TimeInput,
    end?: TimeInput
  ) => {
    valid: boolean;
    leftPercent: number;
    widthPercent: number;
  };
  getTimestampPercent: (timestamp?: TimeInput) => {
    valid: boolean;
    percent: number;
    inView: boolean;
  };
  getTicksByCount: (tickCount?: number) => TimeViewportHeaderTick[];
  getTicksByTimeUnit: (
    tickUnit?: TimeViewportHeaderProps['tickUnit'],
    tickStep?: number
  ) => TimeViewportHeaderTick[];
  getTicks: (options?: {
    tickStrategy?: TimeViewportHeaderProps['tickStrategy'];
    tickCount?: number;
    tickUnit?: TimeViewportHeaderProps['tickUnit'];
    tickStep?: number;
  }) => TimeViewportHeaderTick[];
}

export function useTimeViewport(
  viewportStart?: TimeInput,
  viewportEnd?: TimeInput,
  format?: string
): UseTimeViewportDerivedResult {
  const viewport = useResolvedViewport(viewportStart, viewportEnd);
  const parsedViewport = useMemo(() => {
    if (!viewport) return null;

    const start = parseTimeInput(viewport.viewportStart);
    const end = parseTimeInput(viewport.viewportEnd);
    if (!start || !end || !end.isAfter(start)) return null;

    const viewportStartMs = start.valueOf();
    const viewportEndMs = end.valueOf();

    return {
      start,
      end,
      formatString: format ?? getDefaultHeaderFormat(start, end),
      viewportStartMs,
      viewportEndMs,
      viewportDurationMs: viewportEndMs - viewportStartMs,
    };
  }, [format, viewport]);

  const toTimeMs = useCallback((value?: TimeInput) => {
    if (value === undefined) return null;
    const parsed = parseTimeInput(value);
    return parsed ? parsed.valueOf() : null;
  }, []);

  const getGeometry = useCallback(
    (start?: TimeInput, end?: TimeInput) => {
      if (!parsedViewport || start === undefined || end === undefined) {
        return { valid: false, leftPercent: 0, widthPercent: 0 };
      }

      const blockStartMs = toTimeMs(start);
      const blockEndMs = toTimeMs(end);
      if (
        blockStartMs === null ||
        blockEndMs === null ||
        blockEndMs <= blockStartMs
      ) {
        return { valid: false, leftPercent: 0, widthPercent: 0 };
      }

      const visibleStartMs = Math.max(
        blockStartMs,
        parsedViewport.viewportStartMs
      );
      const visibleEndMs = Math.min(blockEndMs, parsedViewport.viewportEndMs);

      if (visibleEndMs <= visibleStartMs) {
        return { valid: true, leftPercent: 0, widthPercent: 0 };
      }

      const leftMs = visibleStartMs - parsedViewport.viewportStartMs;
      const widthMs = visibleEndMs - visibleStartMs;

      return {
        valid: true,
        leftPercent: clampNumber(
          (leftMs / parsedViewport.viewportDurationMs) * 100,
          0,
          100
        ),
        widthPercent: clampNumber(
          (widthMs / parsedViewport.viewportDurationMs) * 100,
          0,
          100
        ),
      };
    },
    [parsedViewport, toTimeMs]
  );

  const getTimestampPercent = useCallback(
    (timestamp?: TimeInput) => {
      if (!parsedViewport || timestamp === undefined) {
        return { valid: false, percent: 0, inView: false };
      }
      const timestampMs = toTimeMs(timestamp);
      if (timestampMs === null)
        return { valid: false, percent: 0, inView: false };

      const rawPercent =
        ((timestampMs - parsedViewport.viewportStartMs) /
          parsedViewport.viewportDurationMs) *
        100;
      return {
        valid: true,
        percent: clampNumber(rawPercent, 0, 100),
        inView: rawPercent >= 0 && rawPercent <= 100,
      };
    },
    [parsedViewport, toTimeMs]
  );

  const getTicksByCount = useCallback(
    (tickCount = 7) => {
      if (!parsedViewport) return [];
      const safeTickCount = Math.max(2, tickCount);
      return Array.from({ length: safeTickCount }, (_, index) => {
        const ratio = index / (safeTickCount - 1);
        const tickTime = parsedViewport.start.add(
          parsedViewport.viewportDurationMs * ratio,
          'millisecond'
        );
        return {
          index,
          percent: ratio * 100,
          label: tickTime.format(parsedViewport.formatString),
        };
      });
    },
    [parsedViewport]
  );

  const getTicksByTimeUnit = useCallback(
    (tickUnit: TimeViewportHeaderProps['tickUnit'] = 'hour', tickStep = 1) => {
      if (!parsedViewport) return [];
      const safeTickStep = Math.max(1, Math.floor(tickStep));
      const candidateTimes: dayjs.Dayjs[] = [parsedViewport.start];
      let cursor = parsedViewport.start.startOf(tickUnit);

      while (cursor.isBefore(parsedViewport.start)) {
        cursor = cursor.add(safeTickStep, tickUnit);
      }

      while (
        cursor.isBefore(parsedViewport.end) ||
        cursor.isSame(parsedViewport.end)
      ) {
        candidateTimes.push(cursor);
        cursor = cursor.add(safeTickStep, tickUnit);
      }

      candidateTimes.push(parsedViewport.end);

      const uniqueSortedTicks = Array.from(
        new Map(candidateTimes.map((time) => [time.valueOf(), time])).values()
      ).sort((a, b) => a.valueOf() - b.valueOf());

      return uniqueSortedTicks.map((tickTime, index) => {
        const ratio =
          tickTime.diff(parsedViewport.start, 'millisecond') /
          parsedViewport.viewportDurationMs;
        return {
          index,
          percent: clampNumber(ratio * 100, 0, 100),
          label: tickTime.format(parsedViewport.formatString),
        };
      });
    },
    [parsedViewport]
  );

  const getTicks = useCallback(
    (options?: {
      tickStrategy?: TimeViewportHeaderProps['tickStrategy'];
      tickCount?: number;
      tickUnit?: TimeViewportHeaderProps['tickUnit'];
      tickStep?: number;
    }) => {
      const strategy = options?.tickStrategy ?? 'count';
      if (strategy === 'timeUnit') {
        return getTicksByTimeUnit(options?.tickUnit, options?.tickStep);
      }
      return getTicksByCount(options?.tickCount);
    },
    [getTicksByCount, getTicksByTimeUnit]
  );

  return {
    isValidViewport: Boolean(parsedViewport),
    toTimeMs,
    getGeometry,
    getTimestampPercent,
    getTicksByCount,
    getTicksByTimeUnit,
    getTicks,
  };
}

export function useTimeViewportBlockGeometry(
  viewportStart?: TimeInput,
  viewportEnd?: TimeInput
): UseTimeViewportBlockGeometryResult {
  const { isValidViewport, getGeometry, toTimeMs } = useTimeViewport(
    viewportStart,
    viewportEnd
  );

  return {
    hasValidViewport: isValidViewport,
    getGeometry,
    toTimeMs,
  };
}

const getDefaultHeaderFormat = (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
  const durationHours = end.diff(start, 'hour', true);
  if (durationHours <= 24) return 'HH:mm';
  if (durationHours <= 24 * 7) return 'ddd HH:mm';
  return 'MMM D';
};

export function useTimeViewportTicks({
  viewportStart,
  viewportEnd,
  format,
}: Pick<
  TimeViewportHeaderProps,
  'viewportStart' | 'viewportEnd' | 'format'
>): UseTimeViewportTicksResult {
  const { isValidViewport, getTicksByCount, getTicksByTimeUnit, getTicks } =
    useTimeViewport(viewportStart, viewportEnd, format);

  return {
    isValidViewport,
    getTicksByCount,
    getTicksByTimeUnit,
    getTicks,
  };
}

export const useTimeViewportHeader = useTimeViewportTicks;

const formatDuration = (
  durationMs: number,
  labels: Required<TimeRangeZoomLabels>
): string => {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];

  if (days > 0) parts.push(`${days}${labels.daysShort}`);
  if (hours > 0) parts.push(`${hours}${labels.hoursShort}`);
  if (minutes > 0) parts.push(`${minutes}${labels.minutesShort}`);
  if (seconds > 0 || parts.length === 0)
    parts.push(`${seconds}${labels.secondsShort}`);

  return parts.join(' ');
};

/**
 * A resizable timeline block based on block time range and viewport time range.
 * Width and offset are automatically derived from datetime overlap.
 */
export function TimeViewportBlock({
  start,
  end,
  viewportStart,
  viewportEnd,
  height = '28px',
  minWidthPx = 2,
  borderRadius = 'sm',
  colorPalette = 'blue',
  background,
  label,
  showLabel = true,
  hideWhenOutOfView = true,
  onClick,
}: TimeViewportBlockProps) {
  const { getGeometry } = useTimeViewportBlockGeometry(
    viewportStart,
    viewportEnd
  );
  const geometry = useMemo(() => {
    return getGeometry(start, end);
  }, [end, getGeometry, start]);

  if (!geometry.valid) return null;
  if (hideWhenOutOfView && geometry.widthPercent <= 0) return null;

  return (
    <Box position="relative" width="100%" height={height}>
      <Box position="absolute" inset={0} pointerEvents="none">
        <Box
          width="100%"
          height="100%"
          transform={`translateX(${geometry.leftPercent}%)`}
          transition={VIEWPORT_TRANSITION}
        >
          <Box
            width={`max(${geometry.widthPercent}%, ${minWidthPx}px)`}
            height="100%"
            borderRadius={borderRadius}
            bg={background ?? `${colorPalette}.500`}
            _dark={{
              bg: background ?? `${colorPalette}.900`,
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={2}
            overflow="hidden"
            pointerEvents="auto"
            onClick={onClick}
            cursor={onClick ? 'pointer' : 'default'}
          >
            {showLabel && label ? (
              <Text
                fontSize="xs"
                lineClamp={1}
                color="white"
                _dark={{ color: 'gray.100' }}
              >
                {label}
              </Text>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/**
 * Vertical marker line for a timestamp in the current viewport.
 */
export function TimeViewportMarkerLine({
  timestamp,
  viewportStart,
  viewportEnd,
  height = '100%',
  colorPalette = 'red',
  color,
  lineWidthPx = 2,
  label,
  showLabel = true,
  hideWhenOutOfView = true,
}: TimeViewportMarkerLineProps) {
  const { getTimestampPercent } = useTimeViewport(viewportStart, viewportEnd);
  const marker = useMemo(() => {
    return getTimestampPercent(timestamp);
  }, [getTimestampPercent, timestamp]);

  if (!marker.valid) return null;
  if (hideWhenOutOfView && !marker.inView) return null;

  return (
    <Box
      position="absolute"
      insetInlineStart={0}
      insetInlineEnd={0}
      top={0}
      bottom={0}
      pointerEvents="none"
      zIndex={100}
      height={height}
    >
      <Box
        width="100%"
        height="100%"
        transform={`translateX(${marker.percent}%)`}
        transition={VIEWPORT_TRANSITION}
        transformOrigin="left center"
      >
        <Box
          width={`${lineWidthPx}px`}
          height="100%"
          bg={color ?? `${colorPalette}.500`}
          _dark={{ bg: color ?? `${colorPalette}.500` }}
          transform="translateX(-50%)"
        />
        {showLabel && label ? (
          <Text
            position="absolute"
            insetInlineStart={0}
            top="100%"
            mt={1}
            display="inline-block"
            fontSize="xs"
            whiteSpace="nowrap"
            color={color ?? `${colorPalette}.700`}
            _dark={{ color: color ?? `${colorPalette}.500` }}
            transform="translateX(-50%)"
          >
            {label}
          </Text>
        ) : null}
      </Box>
    </Box>
  );
}

/**
 * Header labels for timeline viewport time scale.
 */
export function TimeViewportHeader({
  viewportStart,
  viewportEnd,
  tickCount = 7,
  tickStrategy = 'count',
  tickUnit = 'hour',
  tickStep = 1,
  format,
  height = '28px',
  color = 'gray.600',
  borderColor = 'gray.200',
  showBottomBorder = true,
  animationDurationMs = VIEWPORT_TRANSITION_DURATION_MS,
  animationEasing = VIEWPORT_TRANSITION_EASING,
}: TimeViewportHeaderProps) {
  const { isValidViewport, getTicks } = useTimeViewport(
    viewportStart,
    viewportEnd,
    format
  );
  const ticks = getTicks({ tickStrategy, tickCount, tickUnit, tickStep });
  const safeTickCount = ticks.length;
  const transitionValue =
    animationDurationMs > 0
      ? `transform ${animationDurationMs}ms ${animationEasing}, opacity ${animationDurationMs}ms ${animationEasing}`
      : undefined;

  if (!isValidViewport || safeTickCount < 2) return null;

  return (
    <Box
      position="relative"
      width="100%"
      height={height}
      borderBottomWidth={showBottomBorder ? '1px' : '0px'}
      borderColor={borderColor}
      _dark={{ borderColor: 'gray.700' }}
      mb={2}
    >
      {ticks.map((tick) => (
        <Box
          key={`tick-wrap-${tick.index}`}
          position="absolute"
          inset={0}
          transform={`translateX(${tick.percent}%)`}
          transition={transitionValue}
        >
          <Text
            position="absolute"
            insetInlineStart={0}
            top="50%"
            translate="0 -50%"
            transform={
              tick.index === 0
                ? 'translateX(0%)'
                : tick.index === safeTickCount - 1
                  ? 'translateX(-100%)'
                  : 'translateX(-50%)'
            }
            fontSize="xs"
            color={color}
            _dark={{ color: 'gray.300' }}
            whiteSpace="nowrap"
          >
            {tick.label}
          </Text>
        </Box>
      ))}
    </Box>
  );
}

/**
 * Vertical grid lines for measuring block positions in the viewport.
 * Render inside a relative container that also contains blocks.
 */
export function TimeViewportGrid({
  viewportStart,
  viewportEnd,
  tickCount = 8,
  tickStrategy = 'count',
  tickUnit = 'hour',
  tickStep = 1,
  format,
  minorDivisions = 2,
  majorLineColor = 'gray.300',
  minorLineColor = 'gray.200',
  showMinorLines = true,
  zIndex = 0,
  animationDurationMs = VIEWPORT_TRANSITION_DURATION_MS,
  animationEasing = VIEWPORT_TRANSITION_EASING,
}: TimeViewportGridProps) {
  const { isValidViewport, getTicks } = useTimeViewport(
    viewportStart,
    viewportEnd,
    format
  );
  const majorTicks = getTicks({ tickStrategy, tickCount, tickUnit, tickStep });

  if (!isValidViewport || majorTicks.length < 2) return null;

  const safeMinorDivisions = Math.max(1, minorDivisions);
  const transitionValue =
    animationDurationMs > 0
      ? `transform ${animationDurationMs}ms ${animationEasing}, opacity ${animationDurationMs}ms ${animationEasing}`
      : undefined;

  const minorTicks = showMinorLines
    ? majorTicks.slice(0, -1).flatMap((tick, segmentIndex) => {
        const base = tick.percent;
        const next = majorTicks[segmentIndex + 1].percent;
        const segment: number[] = [];
        for (let step = 1; step < safeMinorDivisions; step += 1) {
          segment.push(base + ((next - base) * step) / safeMinorDivisions);
        }
        return segment;
      })
    : [];

  return (
    <Box position="absolute" inset={0} pointerEvents="none" zIndex={zIndex}>
      {minorTicks.map((percent, index) => (
        <Box
          key={`minor-grid-${index}`}
          position="absolute"
          inset={0}
          transform={`translateX(${percent}%)`}
          transition={transitionValue}
        >
          <Box
            position="absolute"
            insetInlineStart={0}
            top={0}
            bottom={0}
            width="1px"
            bg={minorLineColor}
            _dark={{ bg: 'gray.700' }}
          />
        </Box>
      ))}
      {majorTicks.map((tick) => (
        <Box
          key={`major-grid-${tick.index}`}
          position="absolute"
          inset={0}
          transform={`translateX(${tick.percent}%)`}
          transition={transitionValue}
        >
          <Box
            position="absolute"
            insetInlineStart={0}
            top={0}
            bottom={0}
            width="1px"
            bg={majorLineColor}
            _dark={{ bg: 'gray.600' }}
          />
        </Box>
      ))}
    </Box>
  );
}

interface ResolvedTrack {
  trackKey: string;
  trackKeyRaw?: string | number;
  blocks: ParsedTimeViewportBlock[];
}

interface VirtualizedTrackListProps {
  tracks: ResolvedTrack[];
  resolvedHeight: string;
  gap: number;
  virtualHeight: number;
  overscan: number;
  renderTrackPrefix?: TimeViewportBlocksProps['renderTrackPrefix'];
  renderTrackSuffix?: TimeViewportBlocksProps['renderTrackSuffix'];
  renderBlockNode: (
    blockItem: ParsedTimeViewportBlock,
    indexInLayer: number
  ) => ReactNode;
}

function VirtualizedTrackList({
  tracks,
  resolvedHeight,
  gap,
  virtualHeight,
  overscan,
  renderTrackPrefix,
  renderTrackSuffix,
  renderBlockNode,
}: VirtualizedTrackListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const rowHeightPx = parseInt(resolvedHeight, 10) || 28;
  const gapPx = gap * 4; // Chakra spacing token to px (1 unit = 4px)

  const virtualizer = useVirtualizer({
    count: tracks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeightPx + gapPx,
    overscan,
  });

  return (
    <Box ref={parentRef} overflowY="auto" height={`${virtualHeight}px`}>
      <Box height={`${virtualizer.getTotalSize()}px`} position="relative">
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const track = tracks[virtualRow.index];
          const trackBlocks = track.blocks.map((item) => item.block);
          const prefix = renderTrackPrefix?.({
            trackIndex: virtualRow.index,
            trackBlocks,
            trackKey: track.trackKeyRaw,
          });
          const suffix = renderTrackSuffix?.({
            trackIndex: virtualRow.index,
            trackBlocks,
            trackKey: track.trackKeyRaw,
          });

          return (
            <Box
              key={track.trackKey}
              position="absolute"
              top={0}
              left={0}
              width="100%"
              transform={`translateY(${virtualRow.start}px)`}
            >
              <TimeViewportTrackRow
                trackKey={track.trackKey}
                blocks={track.blocks}
                resolvedHeight={resolvedHeight}
                prefix={prefix}
                suffix={suffix}
                renderBlockNode={renderBlockNode}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export function TimeViewportBlocks({
  blocks,
  viewportStart,
  viewportEnd,
  height = '28px',
  minWidthPx = 2,
  borderRadius = 'sm',
  defaultColorPalette = 'blue',
  showLabel = true,
  hideWhenOutOfView = true,
  hideEmptyTracks = true,
  gap = 2,
  allowOverlap = false,
  overlapOpacity = 0.9,
  renderTrackPrefix,
  renderTrackSuffix,
  renderBlock,
  onBlockClick,
  virtualize = false,
  virtualHeight = 400,
  overscan = 5,
}: TimeViewportBlocksProps) {
  const { getGeometry, toTimeMs } = useTimeViewportBlockGeometry(
    viewportStart,
    viewportEnd
  );
  const resolvedHeight = typeof height === 'number' ? `${height}px` : height;
  const expandedBlocks = flattenTrackBlocks(blocks);
  const parsedBlocks: ParsedTimeViewportBlock[] = expandedBlocks
    .map((block, index) => {
      if (block.start === undefined || block.end === undefined) {
        return {
          block,
          index,
          geometry: { valid: false, leftPercent: 0, widthPercent: 0 },
          startMs: Number.NaN,
          endMs: Number.NaN,
        };
      }
      const geometry = getGeometry(block.start, block.end);
      const startMs = toTimeMs(block.start);
      const endMs = toTimeMs(block.end);

      return {
        block,
        index,
        geometry,
        startMs: startMs ?? Number.NaN,
        endMs: endMs ?? Number.NaN,
      };
    })
    .filter(({ geometry }) => geometry.valid)
    .filter(({ geometry }) => !hideWhenOutOfView || geometry.widthPercent > 0);

  const renderBlockNode = (
    blockItem: ParsedTimeViewportBlock,
    indexInLayer: number
  ) => {
    const { block, geometry } = blockItem;
    const handleBlockClick = () => {
      block.onClick?.(block);
      onBlockClick?.(block);
    };
    const isBlockClickable = Boolean(block.onClick || onBlockClick);

    const content = renderBlock ? (
      renderBlock({ block, geometry, index: indexInLayer })
    ) : (
      <Box
        width={`max(${geometry.widthPercent}%, ${minWidthPx}px)`}
        height="100%"
        borderRadius={borderRadius}
        bg={
          block.background ?? `${block.colorPalette ?? defaultColorPalette}.500`
        }
        _dark={{
          bg:
            block.background ??
            `${block.colorPalette ?? defaultColorPalette}.900`,
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={2}
        overflow="hidden"
        opacity={allowOverlap ? overlapOpacity : 1}
        zIndex={indexInLayer + 1}
        pointerEvents="auto"
        onClick={isBlockClickable ? handleBlockClick : undefined}
        cursor={isBlockClickable ? 'pointer' : 'default'}
      >
        {showLabel && block.label ? (
          <Text fontSize="xs" lineClamp={1}>
            {block.label}
          </Text>
        ) : null}
      </Box>
    );

    return (
      <Box
        height="100%"
        key={block.id}
        position="absolute"
        inset={0}
        pointerEvents="none"
        transform={`translateX(${geometry.leftPercent}%)`}
        transition={VIEWPORT_TRANSITION}
      >
        {content}
      </Box>
    );
  };

  // ---------- Resolve tracks ----------

  const explicitTrackKeys = Array.from(
    new Set(
      expandedBlocks
        .map((item) => item.track)
        .filter((track): track is string | number => track !== undefined)
    )
  );

  const resolvedTracks: ResolvedTrack[] = useMemo(() => {
    if (explicitTrackKeys.length > 0) {
      return explicitTrackKeys
        .map((trackKey) => ({
          trackKey: `track-keyed-${String(trackKey)}`,
          trackKeyRaw: trackKey,
          blocks: parsedBlocks.filter((item) => item.block.track === trackKey),
        }))
        .filter((track) => !hideEmptyTracks || track.blocks.length > 0);
    }

    const autoPackedTracks = (() => {
      const sortedBlocks = [...parsedBlocks]
        .filter(
          ({ startMs, endMs }) =>
            Number.isFinite(startMs) && Number.isFinite(endMs)
        )
        .sort((a, b) => {
          if (a.startMs === b.startMs) return a.endMs - b.endMs;
          return a.startMs - b.startMs;
        });

      const trackLastEndTimes: number[] = [];
      const tracks: Array<typeof sortedBlocks> = [];

      sortedBlocks.forEach((item) => {
        const trackIndex = trackLastEndTimes.findIndex(
          (endMs) => item.startMs >= endMs
        );
        if (trackIndex === -1) {
          trackLastEndTimes.push(item.endMs);
          tracks.push([item]);
        } else {
          trackLastEndTimes[trackIndex] = item.endMs;
          tracks[trackIndex].push(item);
        }
      });

      return tracks;
    })();

    const packed = allowOverlap ? [parsedBlocks] : autoPackedTracks;
    return packed.map((track, trackIndex) => ({
      trackKey: `track-row-${trackIndex}`,
      trackKeyRaw: undefined,
      blocks: track,
    }));
  }, [allowOverlap, explicitTrackKeys, hideEmptyTracks, parsedBlocks]);

  // ---------- Render ----------

  if (virtualize) {
    return (
      <VirtualizedTrackList
        tracks={resolvedTracks}
        resolvedHeight={resolvedHeight}
        gap={gap}
        virtualHeight={virtualHeight}
        overscan={overscan}
        renderTrackPrefix={renderTrackPrefix}
        renderTrackSuffix={renderTrackSuffix}
        renderBlockNode={renderBlockNode}
      />
    );
  }

  return (
    <VStack align="stretch" gap={gap}>
      {resolvedTracks.map((track, trackIndex) => {
        const trackBlocks = track.blocks.map((item) => item.block);
        const prefix = renderTrackPrefix?.({
          trackIndex,
          trackBlocks,
          trackKey: track.trackKeyRaw,
        });
        const suffix = renderTrackSuffix?.({
          trackIndex,
          trackBlocks,
          trackKey: track.trackKeyRaw,
        });

        return (
          <TimeViewportTrackRow
            trackKey={track.trackKey}
            blocks={track.blocks}
            resolvedHeight={resolvedHeight}
            prefix={prefix}
            suffix={suffix}
            renderBlockNode={renderBlockNode}
          />
        );
      })}
    </VStack>
  );
}

export function TimeRangeZoom({
  range,
  onRangeChange,
  minDurationMs = DEFAULT_MIN_DURATION_MS,
  maxDurationMs = DEFAULT_MAX_DURATION_MS,
  zoomFactor = DEFAULT_ZOOM_FACTOR,
  resetDurationMs,
  showResetButton = true,
  disabled = false,
  labels,
}: TimeRangeZoomProps) {
  const {
    labels: mergedLabels,
    canZoomIn,
    canZoomOut,
    visibleRangeText,
    durationText,
    zoomIn,
    zoomOut,
    reset,
  } = useTimeRangeZoom({
    range,
    onRangeChange,
    minDurationMs,
    maxDurationMs,
    zoomFactor,
    resetDurationMs,
    disabled,
    labels,
  });

  return (
    <VStack align="stretch" gap={2} p={3}>
      <HStack justify="space-between" gap={2}>
        <HStack gap={2}>
          <IconButton
            aria-label={mergedLabels.zoomOut}
            onClick={zoomOut}
            disabled={!canZoomOut}
            size="sm"
            variant="outline"
          >
            <LuZoomOut />
          </IconButton>
          <IconButton
            aria-label={mergedLabels.zoomIn}
            onClick={zoomIn}
            disabled={!canZoomIn}
            size="sm"
            variant="outline"
          >
            <LuZoomIn />
          </IconButton>
        </HStack>
        {showResetButton ? (
          <Button
            size="sm"
            variant="ghost"
            onClick={reset}
            disabled={disabled}
            colorPalette="blue"
          >
            {mergedLabels.reset}
          </Button>
        ) : null}
      </HStack>

      <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.200' }}>
        {mergedLabels.visibleRange}: {visibleRangeText}
      </Text>

      <Text fontSize="xs" color="gray.600" _dark={{ color: 'gray.400' }}>
        {mergedLabels.duration}: {durationText}
      </Text>
    </VStack>
  );
}

export function useTimeRangeZoom({
  range,
  onRangeChange,
  minDurationMs = DEFAULT_MIN_DURATION_MS,
  maxDurationMs = DEFAULT_MAX_DURATION_MS,
  zoomFactor = DEFAULT_ZOOM_FACTOR,
  resetDurationMs,
  disabled = false,
  labels,
}: TimeRangeZoomProps): UseTimeRangeZoomResult {
  const mergedLabels = useMemo(
    () => ({
      ...defaultLabels,
      ...(labels ?? {}),
    }),
    [labels]
  );

  const now = dayjs();
  const start = toValidDayjs(range.start, now.subtract(1, 'hour'));
  const end = toValidDayjs(range.end, now);

  const safeMinDurationMs = Math.max(1000, minDurationMs);
  const safeMaxDurationMs = Math.max(safeMinDurationMs, maxDurationMs);
  const safeZoomFactor = zoomFactor > 1 ? zoomFactor : DEFAULT_ZOOM_FACTOR;

  const durationMs = useMemo(() => {
    const diff = end.diff(start, 'millisecond');
    return clampNumber(
      diff > 0 ? diff : safeMinDurationMs,
      safeMinDurationMs,
      safeMaxDurationMs
    );
  }, [end, start, safeMaxDurationMs, safeMinDurationMs]);

  const initialDurationRef = useRef(
    clampNumber(
      resetDurationMs ?? durationMs,
      safeMinDurationMs,
      safeMaxDurationMs
    )
  );

  const hasValidDisplayRange = end.isAfter(start);

  const applyDurationAroundCenter = useCallback(
    (nextDurationMs: number) => {
      const centerMs = start.valueOf() + durationMs / 2;
      const half = nextDurationMs / 2;
      const nextStart = dayjs(centerMs - half).toDate();
      const nextEnd = dayjs(centerMs + half).toDate();
      onRangeChange({ start: nextStart, end: nextEnd });
    },
    [durationMs, onRangeChange, start]
  );

  const zoomIn = useCallback(() => {
    const nextDuration = clampNumber(
      durationMs / safeZoomFactor,
      safeMinDurationMs,
      safeMaxDurationMs
    );
    applyDurationAroundCenter(nextDuration);
  }, [
    applyDurationAroundCenter,
    durationMs,
    safeMaxDurationMs,
    safeMinDurationMs,
    safeZoomFactor,
  ]);

  const zoomOut = useCallback(() => {
    const nextDuration = clampNumber(
      durationMs * safeZoomFactor,
      safeMinDurationMs,
      safeMaxDurationMs
    );
    applyDurationAroundCenter(nextDuration);
  }, [
    applyDurationAroundCenter,
    durationMs,
    safeMaxDurationMs,
    safeMinDurationMs,
    safeZoomFactor,
  ]);

  const reset = useCallback(() => {
    applyDurationAroundCenter(initialDurationRef.current);
  }, [applyDurationAroundCenter]);

  const canZoomIn = !disabled && durationMs > safeMinDurationMs;
  const canZoomOut = !disabled && durationMs < safeMaxDurationMs;
  const visibleRangeText = hasValidDisplayRange
    ? `${start.format(mergedLabels.dateTimeFormat)} - ${end.format(mergedLabels.dateTimeFormat)}`
    : mergedLabels.invalidRange;
  const durationText = formatDuration(durationMs, mergedLabels);

  return {
    labels: mergedLabels,
    start,
    end,
    durationMs,
    canZoomIn,
    canZoomOut,
    hasValidDisplayRange,
    visibleRangeText,
    durationText,
    zoomIn,
    zoomOut,
    reset,
  };
}
