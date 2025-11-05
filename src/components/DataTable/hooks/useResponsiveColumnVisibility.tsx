import { useEffect, useRef, RefObject } from 'react';
import { Table, VisibilityState } from '@tanstack/react-table';
import { useDataTableContext } from '../context/useDataTableContext';

interface UseResponsiveColumnVisibilityOptions {
  containerRef: RefObject<HTMLElement>;
  enabled: boolean;
  showSelector?: boolean;
}

/**
 * Hook to automatically hide/show columns based on container width.
 * Columns are hidden based on their responsivePriority (lower = hide first).
 * Only activates when canResize={false}.
 */
export const useResponsiveColumnVisibility = ({
  containerRef,
  enabled,
  showSelector = false,
}: UseResponsiveColumnVisibilityOptions) => {
  const { table, setColumnVisibility } = useDataTableContext();
  const autoHiddenRef = useRef<Set<string>>(new Set());
  const userBaselineRef = useRef<VisibilityState | null>(null);
  const SELECTION_BOX_WIDTH = 20;

  useEffect(() => {
    if (!enabled || !containerRef.current) {
      // Reset when disabled
      if (!enabled) {
        userBaselineRef.current = null;
        autoHiddenRef.current = new Set();
      }
      return;
    }

    // Capture baseline visibility when hook is first enabled
    if (userBaselineRef.current === null) {
      userBaselineRef.current = { ...table.getState().columnVisibility };
    }

    const updateColumnVisibility = () => {
      const container = containerRef.current;
      if (!container || !userBaselineRef.current) return;

      const containerWidth = container.clientWidth;

      // Get all columns
      const allColumns = table.getAllLeafColumns();

      // Get current visibility state
      const currentVisibility = table.getState().columnVisibility;

      // Determine user-hidden columns based on baseline
      // Columns that are hidden in baseline are considered user-hidden
      const userBaseline = userBaselineRef.current;
      const userHiddenColumns = new Set<string>();
      for (const col of allColumns) {
        // If column was hidden in baseline, it's user-hidden
        if (userBaseline[col.id] === false) {
          userHiddenColumns.add(col.id);
        }
      }

      // Consider all columns except those hidden by user in baseline
      const columnsToConsider = allColumns.filter((col) => {
        return !userHiddenColumns.has(col.id);
      });

      // Calculate priority for each column
      // Lower priority = hide first, Infinity = never auto-hide
      const columnsWithPriority = columnsToConsider.map((col, index) => {
        const priority = col.columnDef.meta?.responsivePriority ?? Infinity;
        return {
          column: col,
          priority,
          size: col.getSize(),
          index,
        };
      });

      // Sort by priority (ascending), then by index for stable ordering
      columnsWithPriority.sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return a.index - b.index;
      });

      // Calculate available width (account for selector column if present)
      const availableWidth = showSelector
        ? containerWidth - SELECTION_BOX_WIDTH
        : containerWidth;

      // Calculate which columns can fit
      let totalWidth = 0;
      const columnsToShow = new Set<string>();

      // Always keep at least one column visible
      let minColumnsShown = 0;

      for (const { column, priority } of columnsWithPriority) {
        // If this is the first column and we haven't shown any, always show it
        if (minColumnsShown === 0) {
          columnsToShow.add(column.id);
          totalWidth += column.getSize();
          minColumnsShown = 1;
          continue;
        }

        // Check if adding this column would exceed available width
        const newTotalWidth = totalWidth + column.getSize();

        // If priority is Infinity, always show (never auto-hide)
        if (priority === Infinity) {
          columnsToShow.add(column.id);
          totalWidth = newTotalWidth;
        } else if (newTotalWidth <= availableWidth) {
          // Column fits, show it
          columnsToShow.add(column.id);
          totalWidth = newTotalWidth;
        } else {
          // Column doesn't fit, hide it
          // Don't add to columnsToShow
        }
      }

      // Update auto-hidden columns
      const newAutoHidden = new Set<string>();
      const newVisibility: VisibilityState = { ...currentVisibility };

      // Update visibility for all columns
      for (const col of allColumns) {
        const isUserHidden = userHiddenColumns.has(col.id);

        if (isUserHidden) {
          // Respect user preference to hide
          newVisibility[col.id] = false;
        } else {
          const shouldBeVisible = columnsToShow.has(col.id);

          if (!shouldBeVisible) {
            // Column should be auto-hidden
            newAutoHidden.add(col.id);
            newVisibility[col.id] = false;
          } else {
            // Column should be visible
            newVisibility[col.id] = true;
          }
        }
      }

      // Update auto-hidden ref
      autoHiddenRef.current = newAutoHidden;

      // Only update if visibility actually changed
      const visibilityChanged =
        Object.keys(newVisibility).some(
          (key) => newVisibility[key] !== currentVisibility[key]
        ) ||
        Object.keys(currentVisibility).some(
          (key) => newVisibility[key] !== currentVisibility[key]
        );

      if (visibilityChanged) {
        setColumnVisibility(newVisibility);
      }
    };

    // Initial calculation
    updateColumnVisibility();

    // Set up ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      updateColumnVisibility();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [enabled, containerRef, table, setColumnVisibility, showSelector]);
};
