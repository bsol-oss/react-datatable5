'use client';

import type { ButtonProps, TextProps } from '@chakra-ui/react';
import {
  Button,
  Pagination as ChakraPagination,
  IconButton,
  Text,
  createContext,
  usePaginationContext,
} from '@chakra-ui/react';
import * as React from 'react';
import {
  HiChevronLeft,
  HiChevronRight,
  HiMiniEllipsisHorizontal,
} from 'react-icons/hi2';
import { LinkButton } from './link-button';

interface ButtonVariantMap {
  current: ButtonProps['variant'];
  default: ButtonProps['variant'];
  ellipsis: ButtonProps['variant'];
}

type PaginationVariant = 'outline' | 'solid' | 'subtle';

interface ButtonVariantContext {
  size: ButtonProps['size'];
  variantMap: ButtonVariantMap;
  getHref?: (page: number) => string;
}

const [RootPropsProvider, useRootProps] = createContext<ButtonVariantContext>({
  name: 'RootPropsProvider',
});

export interface PaginationRootProps
  extends Omit<ChakraPagination.RootProps, 'type'> {
  size?: ButtonProps['size'];
  variant?: PaginationVariant;
  getHref?: (page: number) => string;
  siblingCount?: number;
  minSiblingCount?: number;
  maxSiblingCount?: number;
}

const variantMap: Record<PaginationVariant, ButtonVariantMap> = {
  outline: { default: 'ghost', ellipsis: 'plain', current: 'outline' },
  solid: { default: 'outline', ellipsis: 'outline', current: 'solid' },
  subtle: { default: 'ghost', ellipsis: 'plain', current: 'subtle' },
};

export const PaginationRoot = React.forwardRef<
  HTMLDivElement,
  PaginationRootProps
>(function PaginationRoot(props, ref) {
  const {
    size = 'sm',
    variant = 'outline',
    getHref,
    siblingCount,
    minSiblingCount = 1,
    maxSiblingCount,
    ...rest
  } = props;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [calculatedSiblingCount, setCalculatedSiblingCount] = React.useState<
    number | undefined
  >(siblingCount);

  React.useEffect(() => {
    if (siblingCount !== undefined || !containerRef.current) {
      setCalculatedSiblingCount(siblingCount);
      return;
    }

    const container = containerRef.current;
    let rafId: number | null = null;
    let timeoutId: number | null = null;

    const measureButtonWidth = (): number => {
      // Try to measure actual rendered buttons for accuracy
      // Look for page number buttons (they contain numeric text)
      const allButtons = container.querySelectorAll('button');
      const pageButtons: HTMLElement[] = [];

      allButtons.forEach((button) => {
        const text = button.textContent?.trim();
        // Page buttons contain numbers, prev/next buttons contain icons
        if (text && /^\d+$/.test(text)) {
          pageButtons.push(button as HTMLElement);
        }
      });

      if (pageButtons.length > 0) {
        // Measure multiple buttons and take the average for accuracy
        let totalWidth = 0;
        let count = 0;
        pageButtons.forEach((button) => {
          const width = button.offsetWidth;
          if (width > 0) {
            totalWidth += width;
            count++;
          }
        });

        if (count > 0) {
          return Math.ceil(totalWidth / count);
        }
      }

      // Fallback to estimated widths based on size
      const buttonWidthMap: Record<string, number> = {
        xs: 28,
        sm: 36,
        md: 40,
        lg: 44,
      };
      return buttonWidthMap[size as string] || 36;
    };

    const measurePrevNextWidth = (): number => {
      const allButtons = container.querySelectorAll('button');
      let prevWidth = 0;
      let nextWidth = 0;

      allButtons.forEach((button) => {
        const html = button.innerHTML;
        // Check if it's a prev/next button by looking for chevron icons or SVG
        if (
          html.includes('chevron') ||
          html.includes('Chevron') ||
          button.querySelector('svg')
        ) {
          const width = (button as HTMLElement).offsetWidth;
          if (width > 0) {
            // First icon button is likely prev, last is next
            if (prevWidth === 0) {
              prevWidth = width;
            } else {
              nextWidth = width;
            }
          }
        }
      });

      if (prevWidth > 0 && nextWidth > 0) {
        return prevWidth + nextWidth;
      }

      // Fallback: use page button width estimate
      return measureButtonWidth() * 2;
    };

    const calculateSiblingCount = () => {
      if (!container) return;

      const width = container.offsetWidth;
      if (width === 0) return;

      // Measure actual button widths
      const pageButtonWidth = measureButtonWidth();
      const prevNextWidth = measurePrevNextWidth();

      // Get computed gap from container (HStack gap)
      const containerStyles = window.getComputedStyle(container);
      const gap = parseFloat(containerStyles.gap) || 8;

      // Account for gaps: prev button + gap + page buttons + gap + next button
      // We need at least 2 gaps (before and after page buttons)
      const availableWidth = Math.max(0, width - prevNextWidth - gap * 2);

      // Each page button takes buttonWidth + gap
      const buttonWithGap = pageButtonWidth + gap;
      const maxPageButtons = Math.floor(availableWidth / buttonWithGap);

      // Calculate sibling count based on pagination structure
      // Structure: [prev] [first] [ellipsis?] [siblings] [current] [siblings] [ellipsis?] [last] [next]
      // Minimum: prev(1) + first(1) + current(1) + last(1) + next(1) = 5 buttons
      // With siblings and ellipsis: 5 + siblings*2 + ellipsis*2

      const minRequired = 5; // prev, first, current, last, next
      const extraButtons = Math.max(0, maxPageButtons - minRequired);

      let calculated = minSiblingCount;

      if (extraButtons >= 4) {
        // Enough space for ellipsis (2 buttons) + siblings on both sides
        // Structure: [prev] [1] [...] [siblings] [current] [siblings] [...] [last] [next]
        // Extra buttons = ellipsis(2) + siblings*2
        calculated = Math.floor((extraButtons - 2) / 2);
      } else if (extraButtons >= 2) {
        // Space for some siblings but not ellipsis
        // Structure: [prev] [1] [siblings] [current] [siblings] [last] [next]
        calculated = Math.floor(extraButtons / 2);
      }

      // Apply max limit if provided
      if (maxSiblingCount !== undefined) {
        calculated = Math.min(calculated, maxSiblingCount);
      }

      const finalSiblingCount = Math.max(minSiblingCount, calculated);

      // Only update if value changed to avoid unnecessary re-renders
      setCalculatedSiblingCount((prev) => {
        if (prev !== finalSiblingCount) {
          return finalSiblingCount;
        }
        return prev;
      });
    };

    const scheduleCalculation = () => {
      // Cancel any pending calculations
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      // Use requestAnimationFrame for smooth updates
      rafId = requestAnimationFrame(() => {
        // Small delay to ensure DOM is fully rendered
        timeoutId = setTimeout(calculateSiblingCount, 50);
      });
    };

    const resizeObserver = new ResizeObserver(scheduleCalculation);
    resizeObserver.observe(container);

    // Initial calculation - try multiple times to ensure buttons are rendered
    scheduleCalculation();

    // Also try after a longer delay as fallback
    const fallbackTimeout = setTimeout(calculateSiblingCount, 200);

    return () => {
      resizeObserver.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      clearTimeout(fallbackTimeout);
    };
  }, [size, siblingCount, minSiblingCount, maxSiblingCount]);

  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
      containerRef.current = node;
    },
    [ref]
  );

  return (
    <RootPropsProvider
      value={{ size, variantMap: variantMap[variant], getHref }}
    >
      <ChakraPagination.Root
        ref={mergedRef}
        type={getHref ? 'link' : 'button'}
        siblingCount={calculatedSiblingCount}
        {...rest}
      />
    </RootPropsProvider>
  );
});

export const PaginationEllipsis = React.forwardRef<
  HTMLDivElement,
  ChakraPagination.EllipsisProps
>(function PaginationEllipsis(props, ref) {
  const { size, variantMap } = useRootProps();
  return (
    <ChakraPagination.Ellipsis ref={ref} {...props} asChild>
      <Button as="span" variant={variantMap.ellipsis} size={size}>
        <HiMiniEllipsisHorizontal />
      </Button>
    </ChakraPagination.Ellipsis>
  );
});

export const PaginationItem = React.forwardRef<
  HTMLButtonElement,
  ChakraPagination.ItemProps
>(function PaginationItem(props, ref) {
  const { page } = usePaginationContext();
  const { size, variantMap, getHref } = useRootProps();

  const current = page === props.value;
  const variant = current ? variantMap.current : variantMap.default;

  if (getHref) {
    return (
      <LinkButton href={getHref(props.value)} variant={variant} size={size}>
        {props.value}
      </LinkButton>
    );
  }

  return (
    <ChakraPagination.Item ref={ref} {...props} asChild>
      <Button variant={variant} size={size}>
        {props.value}
      </Button>
    </ChakraPagination.Item>
  );
});

export const PaginationPrevTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraPagination.PrevTriggerProps
>(function PaginationPrevTrigger(props, ref) {
  const { size, variantMap, getHref } = useRootProps();
  const { previousPage } = usePaginationContext();

  if (getHref) {
    return (
      <LinkButton
        href={previousPage != null ? getHref(previousPage) : undefined}
        variant={variantMap.default}
        size={size}
      >
        <HiChevronLeft />
      </LinkButton>
    );
  }

  return (
    <ChakraPagination.PrevTrigger ref={ref} asChild {...props}>
      <IconButton variant={variantMap.default} size={size}>
        <HiChevronLeft />
      </IconButton>
    </ChakraPagination.PrevTrigger>
  );
});

export const PaginationNextTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraPagination.NextTriggerProps
>(function PaginationNextTrigger(props, ref) {
  const { size, variantMap, getHref } = useRootProps();
  const { nextPage } = usePaginationContext();

  if (getHref) {
    return (
      <LinkButton
        href={nextPage != null ? getHref(nextPage) : undefined}
        variant={variantMap.default}
        size={size}
      >
        <HiChevronRight />
      </LinkButton>
    );
  }

  return (
    <ChakraPagination.NextTrigger ref={ref} asChild {...props}>
      <IconButton variant={variantMap.default} size={size}>
        <HiChevronRight />
      </IconButton>
    </ChakraPagination.NextTrigger>
  );
});

export const PaginationItems = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <ChakraPagination.Context>
      {({ pages }) =>
        pages.map((page, index) => {
          return page.type === 'ellipsis' ? (
            <PaginationEllipsis key={index} index={index} {...props} />
          ) : (
            <PaginationItem
              key={index}
              type="page"
              value={page.value}
              {...props}
            />
          );
        })
      }
    </ChakraPagination.Context>
  );
};

interface PageTextProps extends TextProps {
  format?: 'short' | 'compact' | 'long';
}

export const PaginationPageText = React.forwardRef<
  HTMLParagraphElement,
  PageTextProps
>(function PaginationPageText(props, ref) {
  const { format = 'compact', ...rest } = props;
  const { page, totalPages, pageRange, count } = usePaginationContext();
  const content = React.useMemo(() => {
    if (format === 'short') return `${page} / ${totalPages}`;
    if (format === 'compact') return `${page} / ${totalPages}`;
    return `${pageRange.start + 1} - ${Math.min(pageRange.end, count)} / ${count}`;
  }, [format, page, totalPages, pageRange, count]);

  return (
    <Text fontWeight="medium" ref={ref} {...rest}>
      {content}
    </Text>
  );
});
