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

    const calculateSiblingCount = () => {
      if (!container) return;

      const width = container.offsetWidth;
      if (width === 0) return;

      // Estimate button width based on size
      // These are approximate widths including padding for different button sizes
      const buttonWidthMap: Record<string, number> = {
        xs: 28,
        sm: 36,
        md: 40,
        lg: 44,
      };
      let buttonWidth = buttonWidthMap[size as string] || 36;

      // Try to measure actual button if available (for more accuracy)
      const buttons = container.querySelectorAll('button');
      if (buttons.length > 0) {
        const firstButton = buttons[0] as HTMLElement;
        if (firstButton.offsetWidth > 0) {
          // Use measured width, but account for text content variation
          const measuredWidth = firstButton.offsetWidth;
          // Page number buttons might be slightly wider due to text, use measured width
          buttonWidth = Math.max(buttonWidth, measuredWidth);
        }
      }

      // Account for prev/next buttons and gaps
      // HStack gap is typically 8px in Chakra UI
      const gap = 8;
      const prevNextWidth = buttonWidth * 2 + gap;
      const availableWidth = Math.max(0, width - prevNextWidth);

      // Each page button takes buttonWidth + gap
      const buttonWithGap = buttonWidth + gap;
      const maxButtons = Math.floor(availableWidth / buttonWithGap);

      // Calculate sibling count
      // Minimum structure: [prev] [1] [current] [last] [next] = 5 buttons
      // With siblings: [prev] [1] [...] [current-N] ... [current] ... [current+N] [...] [last] [next]
      // We need: prev(1) + first(1) + ellipsis(1) + siblings*2 + current(1) + ellipsis(1) + last(1) + next(1)
      // Minimum: 5 buttons (prev, first, current, last, next)
      // With siblings: 5 + siblings*2 + ellipsis*2 (if needed)
      const minRequired = 5;
      const extraButtons = Math.max(0, maxButtons - minRequired);

      // Calculate sibling count
      // If we have enough space for ellipsis (2 buttons), account for that
      let calculated = minSiblingCount;
      if (extraButtons >= 4) {
        // Space for ellipsis (2) + siblings
        calculated = Math.floor((extraButtons - 2) / 2);
      } else if (extraButtons >= 2) {
        // Space for some siblings but not ellipsis
        calculated = Math.floor(extraButtons / 2);
      }

      // Apply max limit if provided
      if (maxSiblingCount !== undefined) {
        calculated = Math.min(calculated, maxSiblingCount);
      }

      setCalculatedSiblingCount(Math.max(minSiblingCount, calculated));
    };

    const resizeObserver = new ResizeObserver(() => {
      // Use requestAnimationFrame to debounce and ensure DOM is updated
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(calculateSiblingCount);
    });

    resizeObserver.observe(container);

    // Initial calculation after a short delay to ensure buttons are rendered
    const timeoutId = setTimeout(calculateSiblingCount, 100);

    return () => {
      resizeObserver.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      clearTimeout(timeoutId);
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
