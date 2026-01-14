import { RefObject } from 'react';
interface UseResponsiveColumnVisibilityOptions {
    containerRef: RefObject<HTMLElement | null>;
    enabled: boolean;
    showSelector?: boolean;
}
/**
 * Hook to automatically hide/show columns based on container width.
 * Columns are hidden based on their responsivePriority (lower = hide first).
 * Only activates when canResize={false}.
 */
export declare const useResponsiveColumnVisibility: ({ containerRef, enabled, showSelector, }: UseResponsiveColumnVisibilityOptions) => void;
export {};
