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
import { LuZoomIn, LuZoomOut } from 'react-icons/lu';

type TimeInput = Date | string | number;

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
  format?: string;
  height?: string | number;
  color?: string;
  borderColor?: string;
  showBottomBorder?: boolean;
  animationDurationMs?: number;
  animationEasing?: string;
}

export interface TimeViewportGridProps {
  viewportStart?: TimeInput;
  viewportEnd?: TimeInput;
  tickCount?: number;
  minorDivisions?: number;
  majorLineColor?: string;
  minorLineColor?: string;
  showMinorLines?: boolean;
  zIndex?: number;
  animationDurationMs?: number;
  animationEasing?: string;
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
    <HStack key={trackKey} align="stretch" gap={2}>
      {prefix ? (
        <Box minW="fit-content" display="flex" alignItems="center">
          {prefix}
        </Box>
      ) : null}
      <Box position="relative" width="100%" height={resolvedHeight}>
        {blocks.map((item, index) => renderBlockNode(item, index))}
      </Box>
      {suffix ? (
        <Box minW="fit-content" display="flex" alignItems="center">
          {suffix}
        </Box>
      ) : null}
    </HStack>
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

const getBlockGeometry = ({
  start,
  end,
  viewportStart,
  viewportEnd,
}: {
  start: TimeInput;
  end: TimeInput;
  viewportStart: TimeInput;
  viewportEnd: TimeInput;
}) => {
  const blockStart = parseTimeInput(start);
  const blockEnd = parseTimeInput(end);
  const vpStart = parseTimeInput(viewportStart);
  const vpEnd = parseTimeInput(viewportEnd);

  if (!blockStart || !blockEnd || !vpStart || !vpEnd) {
    return { valid: false, leftPercent: 0, widthPercent: 0 };
  }

  if (!vpEnd.isAfter(vpStart) || !blockEnd.isAfter(blockStart)) {
    return { valid: false, leftPercent: 0, widthPercent: 0 };
  }

  const viewportMs = vpEnd.diff(vpStart, 'millisecond');
  const visibleStart =
    blockStart.valueOf() > vpStart.valueOf() ? blockStart : vpStart;
  const visibleEnd = blockEnd.valueOf() < vpEnd.valueOf() ? blockEnd : vpEnd;

  if (!visibleEnd.isAfter(visibleStart)) {
    return { valid: true, leftPercent: 0, widthPercent: 0 };
  }

  const leftMs = visibleStart.diff(vpStart, 'millisecond');
  const widthMs = visibleEnd.diff(visibleStart, 'millisecond');

  return {
    valid: true,
    leftPercent: clampNumber((leftMs / viewportMs) * 100, 0, 100),
    widthPercent: clampNumber((widthMs / viewportMs) * 100, 0, 100),
  };
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

const getTimestampPercent = ({
  timestamp,
  viewportStart,
  viewportEnd,
}: {
  timestamp: TimeInput;
  viewportStart: TimeInput;
  viewportEnd: TimeInput;
}) => {
  const time = parseTimeInput(timestamp);
  const vpStart = parseTimeInput(viewportStart);
  const vpEnd = parseTimeInput(viewportEnd);

  if (!time || !vpStart || !vpEnd || !vpEnd.isAfter(vpStart)) {
    return { valid: false, percent: 0, inView: false };
  }

  const totalMs = vpEnd.diff(vpStart, 'millisecond');
  const offsetMs = time.diff(vpStart, 'millisecond');
  const rawPercent = (offsetMs / totalMs) * 100;
  const inView = rawPercent >= 0 && rawPercent <= 100;

  return {
    valid: true,
    percent: clampNumber(rawPercent, 0, 100),
    inView,
  };
};

const getDefaultHeaderFormat = (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
  const durationHours = end.diff(start, 'hour', true);
  if (durationHours <= 24) return 'HH:mm';
  if (durationHours <= 24 * 7) return 'ddd HH:mm';
  return 'MMM D';
};

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
 * Width and left position are automatically derived from datetime overlap.
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
}: TimeViewportBlockProps) {
  const viewport = useResolvedViewport(viewportStart, viewportEnd);
  const geometry = useMemo(() => {
    if (!viewport) return { valid: false, leftPercent: 0, widthPercent: 0 };
    return getBlockGeometry({
      start,
      end,
      viewportStart: viewport.viewportStart,
      viewportEnd: viewport.viewportEnd,
    });
  }, [end, start, viewport]);

  if (!geometry.valid) return null;
  if (hideWhenOutOfView && geometry.widthPercent <= 0) return null;

  return (
    <Box position="relative" width="100%" height={height}>
      <Box
        position="absolute"
        left={`${geometry.leftPercent}%`}
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
  const viewport = useResolvedViewport(viewportStart, viewportEnd);
  const marker = useMemo(() => {
    if (!viewport) return { valid: false, percent: 0, inView: false };
    return getTimestampPercent({
      timestamp,
      viewportStart: viewport.viewportStart,
      viewportEnd: viewport.viewportEnd,
    });
  }, [timestamp, viewport]);

  if (!marker.valid) return null;
  if (hideWhenOutOfView && !marker.inView) return null;

  return (
    <Box
      position="absolute"
      left={`${marker.percent}%`}
      top={0}
      bottom={0}
      transform="translateX(-50%)"
      pointerEvents="none"
      zIndex={100}
      height={height}
    >
      <Box
        width={`${lineWidthPx}px`}
        height="100%"
        bg={color ?? `${colorPalette}.500`}
        _dark={{ bg: color ?? `${colorPalette}.300` }}
      />
      {showLabel && label ? (
        <Text
          mt={1}
          fontSize="xs"
          whiteSpace="nowrap"
          color={color ?? `${colorPalette}.700`}
          _dark={{ color: color ?? `${colorPalette}.200` }}
          transform="translateX(-50%)"
        >
          {label}
        </Text>
      ) : null}
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
  format,
  height = '28px',
  color = 'gray.600',
  borderColor = 'gray.200',
  showBottomBorder = true,
  animationDurationMs = 220,
  animationEasing = 'ease-out',
}: TimeViewportHeaderProps) {
  const viewport = useResolvedViewport(viewportStart, viewportEnd);
  const start = viewport ? parseTimeInput(viewport.viewportStart) : null;
  const end = viewport ? parseTimeInput(viewport.viewportEnd) : null;

  if (!start || !end || !end.isAfter(start)) return null;

  const safeTickCount = Math.max(2, tickCount);
  const formatString = format ?? getDefaultHeaderFormat(start, end);
  const totalMs = end.diff(start, 'millisecond');
  const transitionValue =
    animationDurationMs > 0
      ? `left ${animationDurationMs}ms ${animationEasing}`
      : undefined;
  const ticks = Array.from({ length: safeTickCount }, (_, index) => {
    const ratio = index / (safeTickCount - 1);
    const tickTime = start.add(totalMs * ratio, 'millisecond');
    return {
      index,
      percent: ratio * 100,
      label: tickTime.format(formatString),
    };
  });

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
        <Text
          key={`tick-${tick.index}`}
          position="absolute"
          left={`${tick.percent}%`}
          transition={transitionValue}
          transform={
            tick.index === 0
              ? 'translateX(0%)'
              : tick.index === safeTickCount - 1
                ? 'translateX(-100%)'
                : 'translateX(-50%)'
          }
          top="50%"
          translate="0 -50%"
          fontSize="xs"
          color={color}
          _dark={{ color: 'gray.300' }}
          whiteSpace="nowrap"
        >
          {tick.label}
        </Text>
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
  minorDivisions = 2,
  majorLineColor = 'gray.300',
  minorLineColor = 'gray.200',
  showMinorLines = true,
  zIndex = 0,
  animationDurationMs = 220,
  animationEasing = 'ease-out',
}: TimeViewportGridProps) {
  const viewport = useResolvedViewport(viewportStart, viewportEnd);
  const start = viewport ? parseTimeInput(viewport.viewportStart) : null;
  const end = viewport ? parseTimeInput(viewport.viewportEnd) : null;
  if (!start || !end || !end.isAfter(start)) return null;

  const safeTickCount = Math.max(2, tickCount);
  const majorTicks = Array.from({ length: safeTickCount }, (_, index) => ({
    index,
    percent: (index / (safeTickCount - 1)) * 100,
  }));

  const safeMinorDivisions = Math.max(1, minorDivisions);
  const transitionValue =
    animationDurationMs > 0
      ? `left ${animationDurationMs}ms ${animationEasing}`
      : undefined;
  const minorTicks = showMinorLines
    ? Array.from({ length: safeTickCount - 1 }, (_, segmentIndex) => {
        const base = (segmentIndex / (safeTickCount - 1)) * 100;
        const next = ((segmentIndex + 1) / (safeTickCount - 1)) * 100;
        const segment: number[] = [];
        for (let step = 1; step < safeMinorDivisions; step += 1) {
          segment.push(base + ((next - base) * step) / safeMinorDivisions);
        }
        return segment;
      }).flat()
    : [];

  return (
    <Box position="absolute" inset={0} pointerEvents="none" zIndex={zIndex}>
      {minorTicks.map((percent, index) => (
        <Box
          key={`minor-grid-${index}`}
          position="absolute"
          left={`${percent}%`}
          transition={transitionValue}
          top={0}
          bottom={0}
          width="1px"
          bg={minorLineColor}
          _dark={{ bg: 'gray.700' }}
        />
      ))}
      {majorTicks.map((tick) => (
        <Box
          key={`major-grid-${tick.index}`}
          position="absolute"
          left={`${tick.percent}%`}
          transition={transitionValue}
          top={0}
          bottom={0}
          width="1px"
          bg={majorLineColor}
          _dark={{ bg: 'gray.600' }}
        />
      ))}
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
}: TimeViewportBlocksProps) {
  const viewport = useResolvedViewport(viewportStart, viewportEnd);
  const resolvedHeight = typeof height === 'number' ? `${height}px` : height;
  const expandedBlocks = flattenTrackBlocks(blocks);
  const parsedBlocks: ParsedTimeViewportBlock[] = expandedBlocks
    .map((block, index) => {
      if (!viewport) {
        return {
          block,
          index,
          geometry: { valid: false, leftPercent: 0, widthPercent: 0 },
          startMs: Number.NaN,
          endMs: Number.NaN,
        };
      }
      if (block.start === undefined || block.end === undefined) {
        return {
          block,
          index,
          geometry: { valid: false, leftPercent: 0, widthPercent: 0 },
          startMs: Number.NaN,
          endMs: Number.NaN,
        };
      }
      const geometry = getBlockGeometry({
        start: block.start,
        end: block.end,
        viewportStart: viewport.viewportStart,
        viewportEnd: viewport.viewportEnd,
      });
      const startParsed = parseTimeInput(block.start);
      const endParsed = parseTimeInput(block.end);

      return {
        block,
        index,
        geometry,
        startMs: startParsed?.valueOf() ?? Number.NaN,
        endMs: endParsed?.valueOf() ?? Number.NaN,
      };
    })
    .filter(({ geometry }) => geometry.valid)
    .filter(({ geometry }) => !hideWhenOutOfView || geometry.widthPercent > 0);

  const renderBlockNode = (
    blockItem: ParsedTimeViewportBlock,
    indexInLayer: number
  ) => {
    const { block, geometry } = blockItem;
    return (
      <Box
        key={block.id}
        position="absolute"
        left={`${geometry.leftPercent}%`}
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
      >
        {showLabel && block.label ? (
          <Text
            fontSize="xs"
            lineClamp={1}
            color="white"
            _dark={{ color: 'gray.100' }}
          >
            {block.label}
          </Text>
        ) : null}
      </Box>
    );
  };

  const explicitTrackKeys = Array.from(
    new Set(
      expandedBlocks
        .map((item) => item.track)
        .filter((track): track is string | number => track !== undefined)
    )
  );

  if (explicitTrackKeys.length > 0) {
    const tracks = explicitTrackKeys
      .map((trackKey) => ({
        trackKey,
        blocks: parsedBlocks.filter((item) => item.block.track === trackKey),
      }))
      .filter((track) => !hideEmptyTracks || track.blocks.length > 0);

    return (
      <VStack align="stretch" gap={gap}>
        {tracks.map((track, trackIndex) => {
          const trackBlocks = track.blocks.map((item) => item.block);
          const prefix = renderTrackPrefix?.({
            trackIndex,
            trackBlocks,
            trackKey: track.trackKey,
          });
          const suffix = renderTrackSuffix?.({
            trackIndex,
            trackBlocks,
            trackKey: track.trackKey,
          });

          return (
            <TimeViewportTrackRow
              trackKey={`track-keyed-${String(track.trackKey)}`}
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

  const tracks = allowOverlap ? [parsedBlocks] : autoPackedTracks;

  return (
    <VStack align="stretch" gap={gap}>
      {tracks.map((track, trackIndex) => {
        const trackBlocks = track.map((item) => item.block);
        const prefix = renderTrackPrefix?.({
          trackIndex,
          trackBlocks,
          trackKey: undefined,
        });
        const suffix = renderTrackSuffix?.({
          trackIndex,
          trackBlocks,
          trackKey: undefined,
        });

        return (
          <TimeViewportTrackRow
            trackKey={`track-row-${trackIndex}`}
            blocks={track}
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
  const mergedLabels = {
    ...defaultLabels,
    ...(labels ?? {}),
  };

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

  const applyDurationAroundCenter = (nextDurationMs: number) => {
    const centerMs = start.valueOf() + durationMs / 2;
    const half = nextDurationMs / 2;
    const nextStart = dayjs(centerMs - half).toDate();
    const nextEnd = dayjs(centerMs + half).toDate();
    onRangeChange({ start: nextStart, end: nextEnd });
  };

  const handleZoomIn = () => {
    const nextDuration = clampNumber(
      durationMs / safeZoomFactor,
      safeMinDurationMs,
      safeMaxDurationMs
    );
    applyDurationAroundCenter(nextDuration);
  };

  const handleZoomOut = () => {
    const nextDuration = clampNumber(
      durationMs * safeZoomFactor,
      safeMinDurationMs,
      safeMaxDurationMs
    );
    applyDurationAroundCenter(nextDuration);
  };

  const handleReset = () => {
    applyDurationAroundCenter(initialDurationRef.current);
  };

  const canZoomIn = !disabled && durationMs > safeMinDurationMs;
  const canZoomOut = !disabled && durationMs < safeMaxDurationMs;
  const hasValidDisplayRange = end.isAfter(start);

  return (
    <VStack align="stretch" gap={2} p={3}>
      <HStack justify="space-between" gap={2}>
        <HStack gap={2}>
          <IconButton
            aria-label={mergedLabels.zoomOut}
            onClick={handleZoomOut}
            disabled={!canZoomOut}
            size="sm"
            variant="outline"
          >
            <LuZoomOut />
          </IconButton>
          <IconButton
            aria-label={mergedLabels.zoomIn}
            onClick={handleZoomIn}
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
            onClick={handleReset}
            disabled={disabled}
            colorPalette="blue"
          >
            {mergedLabels.reset}
          </Button>
        ) : null}
      </HStack>

      <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.200' }}>
        {mergedLabels.visibleRange}:{' '}
        {hasValidDisplayRange
          ? `${start.format(mergedLabels.dateTimeFormat)} - ${end.format(mergedLabels.dateTimeFormat)}`
          : mergedLabels.invalidRange}
      </Text>

      <Text fontSize="xs" color="gray.600" _dark={{ color: 'gray.400' }}>
        {mergedLabels.duration}: {formatDuration(durationMs, mergedLabels)}
      </Text>
    </VStack>
  );
}
