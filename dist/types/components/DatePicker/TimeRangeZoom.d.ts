import dayjs from 'dayjs';
import { type ReactNode } from 'react';
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
    onRangeChange: (range: {
        start: Date;
        end: Date;
    }) => void;
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
    getTicksByTimeUnit: (tickUnit?: TimeViewportHeaderProps['tickUnit'], tickStep?: number) => TimeViewportHeaderTick[];
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
    geometry: {
        leftPercent: number;
        widthPercent: number;
    };
    index: number;
}
export interface TimeViewportTrackRenderArgs {
    trackIndex: number;
    trackKey?: string | number;
    trackBlocks: TimeViewportBlockItem[];
    defaultContent: ReactNode;
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
    /** Custom render function for an entire track row. Receives the default rendered content so you can wrap or replace it. */
    renderTrack?: (args: TimeViewportTrackRenderArgs) => ReactNode;
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
    onViewportChange?: (range: {
        start: Date;
        end: Date;
    }) => void;
    enableDragPan?: boolean;
    enableCtrlWheelZoom?: boolean;
    wheelZoomFactor?: number;
    minDurationMs?: number;
    maxDurationMs?: number;
}
export declare function TimeViewportRoot({ viewportStart, viewportEnd, children, onViewportChange, enableDragPan, enableCtrlWheelZoom, wheelZoomFactor, minDurationMs, maxDurationMs, }: TimeViewportRootProps): import("react/jsx-runtime").JSX.Element;
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
export interface UseTimeViewportBlockGeometryResult {
    hasValidViewport: boolean;
    getGeometry: (start?: TimeInput, end?: TimeInput) => {
        valid: boolean;
        leftPercent: number;
        widthPercent: number;
    };
    toTimeMs: (value?: TimeInput) => number | null;
}
export interface UseTimeViewportDerivedResult {
    isValidViewport: boolean;
    toTimeMs: (value?: TimeInput) => number | null;
    getGeometry: (start?: TimeInput, end?: TimeInput) => {
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
    getTicksByTimeUnit: (tickUnit?: TimeViewportHeaderProps['tickUnit'], tickStep?: number) => TimeViewportHeaderTick[];
    getTicks: (options?: {
        tickStrategy?: TimeViewportHeaderProps['tickStrategy'];
        tickCount?: number;
        tickUnit?: TimeViewportHeaderProps['tickUnit'];
        tickStep?: number;
    }) => TimeViewportHeaderTick[];
}
export declare function useTimeViewport(viewportStart?: TimeInput, viewportEnd?: TimeInput, format?: string): UseTimeViewportDerivedResult;
export declare function useTimeViewportBlockGeometry(viewportStart?: TimeInput, viewportEnd?: TimeInput): UseTimeViewportBlockGeometryResult;
export declare function useTimeViewportTicks({ viewportStart, viewportEnd, format, }: Pick<TimeViewportHeaderProps, 'viewportStart' | 'viewportEnd' | 'format'>): UseTimeViewportTicksResult;
export declare const useTimeViewportHeader: typeof useTimeViewportTicks;
/**
 * A resizable timeline block based on block time range and viewport time range.
 * Width and offset are automatically derived from datetime overlap.
 */
export declare function TimeViewportBlock({ start, end, viewportStart, viewportEnd, height, minWidthPx, borderRadius, colorPalette, background, label, showLabel, hideWhenOutOfView, onClick, }: TimeViewportBlockProps): import("react/jsx-runtime").JSX.Element | null;
/**
 * Vertical marker line for a timestamp in the current viewport.
 */
export declare function TimeViewportMarkerLine({ timestamp, viewportStart, viewportEnd, height, colorPalette, color, lineWidthPx, label, showLabel, hideWhenOutOfView, }: TimeViewportMarkerLineProps): import("react/jsx-runtime").JSX.Element | null;
/**
 * Header labels for timeline viewport time scale.
 */
export declare function TimeViewportHeader({ viewportStart, viewportEnd, tickCount, tickStrategy, tickUnit, tickStep, format, height, color, borderColor, showBottomBorder, animationDurationMs, animationEasing, }: TimeViewportHeaderProps): import("react/jsx-runtime").JSX.Element | null;
/**
 * Vertical grid lines for measuring block positions in the viewport.
 * Render inside a relative container that also contains blocks.
 */
export declare function TimeViewportGrid({ viewportStart, viewportEnd, tickCount, tickStrategy, tickUnit, tickStep, format, minorDivisions, majorLineColor, minorLineColor, showMinorLines, zIndex, animationDurationMs, animationEasing, }: TimeViewportGridProps): import("react/jsx-runtime").JSX.Element | null;
export declare function TimeViewportBlocks({ blocks, viewportStart, viewportEnd, height, minWidthPx, borderRadius, defaultColorPalette, showLabel, hideWhenOutOfView, hideEmptyTracks, gap, allowOverlap, overlapOpacity, renderTrackPrefix, renderTrackSuffix, renderBlock, renderTrack, onBlockClick, virtualize, virtualHeight, overscan, }: TimeViewportBlocksProps): import("react/jsx-runtime").JSX.Element;
export declare function TimeRangeZoom({ range, onRangeChange, minDurationMs, maxDurationMs, zoomFactor, resetDurationMs, showResetButton, disabled, labels, }: TimeRangeZoomProps): import("react/jsx-runtime").JSX.Element;
export declare function useTimeRangeZoom({ range, onRangeChange, minDurationMs, maxDurationMs, zoomFactor, resetDurationMs, disabled, labels, }: TimeRangeZoomProps): UseTimeRangeZoomResult;
export {};
