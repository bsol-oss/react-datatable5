import { Tooltip } from '@/components/ui/tooltip';
import {
  Badge,
  Box,
  Flex,
  FlexProps,
  Icon,
  Link,
  Text,
  TextProps,
} from '@chakra-ui/react';
import { ReactNode, useMemo } from 'react';
import { LuExternalLink } from 'react-icons/lu';
import { TextWithCopy } from './TextWithCopy';
import { useDataTableContext } from '../context/useDataTableContext';

interface RenderValueProps {
  text: string | number | null | undefined;
  href?: string;
  onClick?: () => void;
  isCopyable?: boolean;
  isBadge?: boolean;
  badgeColor?: string;
  colorPalette?: string;
  globalFilter?: string;
  alignEnd?: boolean;
}

// Helper function to highlight matching text
const highlightText = (
  text: string | number,
  searchTerm: string | undefined
): ReactNode => {
  if (!searchTerm || searchTerm.trim() === '') {
    return String(text);
  }

  const textStr = String(text);
  const searchLower = searchTerm.toLowerCase();
  const textLower = textStr.toLowerCase();
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let index = textLower.indexOf(searchLower, lastIndex);

  while (index !== -1) {
    // Add text before match
    if (index > lastIndex) {
      parts.push(textStr.substring(lastIndex, index));
    }

    // Add highlighted match
    parts.push(
      <Text
        key={index}
        as="mark"
        bg={{
          base: 'yellow.200',
          _dark: 'yellow.800',
        }}
        color={{
          base: 'gray.900',
          _dark: 'gray.100',
        }}
        px={0.5}
        borderRadius="sm"
      >
        {textStr.substring(index, index + searchTerm.length)}
      </Text>
    );

    lastIndex = index + searchTerm.length;
    index = textLower.indexOf(searchLower, lastIndex);
  }

  // Add remaining text
  if (lastIndex < textStr.length) {
    parts.push(textStr.substring(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : textStr;
};

const RenderValue = ({
  text,
  href,
  onClick,
  isCopyable,
  isBadge,
  badgeColor,
  colorPalette,
  globalFilter,
  alignEnd = false,
}: RenderValueProps) => {
  const highlightedText = useMemo(
    () => highlightText(text ?? '', globalFilter),
    [text, globalFilter]
  );

  if (isBadge) {
    return (
      <Badge colorPalette={colorPalette || badgeColor}>{highlightedText}</Badge>
    );
  }

  // onClick takes precedence over href
  if (onClick) {
    return (
      <Box
        as="button"
        onClick={onClick}
        cursor="pointer"
        textAlign={alignEnd ? 'right' : 'left'}
        _hover={{
          textDecoration: 'underline',
          color: {
            base: 'blue.500',
            _dark: 'blue.400',
          },
        }}
        transition="all 0.2s"
      >
        {highlightedText}
      </Box>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        _hover={{
          textDecoration: 'underline',
        }}
      >
        {highlightedText} <Icon as={LuExternalLink} />
      </Link>
    );
  }

  if (isCopyable) {
    return (
      <TextWithCopy
        text={text}
        globalFilter={globalFilter}
        highlightedText={highlightedText}
      />
    );
  }

  return <>{highlightedText}</>;
};

export interface TextCellProps {
  // New API
  text?: string | number | null | undefined | string[];
  href?: string;
  onClick?: () => void;
  isCopyable?: boolean;
  isBadge?: boolean;
  alignEnd?: boolean;
  badgeColor?:
    | 'gray'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'blue'
    | 'cyan'
    | 'purple'
    | 'pink';
  colorPalette?:
    | 'gray'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'blue'
    | 'cyan'
    | 'purple'
    | 'pink';
  // Legacy API (for backward compatibility)
  label?: string;
  noOfLines?: number[];
  children?: string | number | ReactNode | ReactNode[];
  containerProps?: FlexProps;
  textProps?: TextProps;
}

export const TextCell = ({
  text,
  href,
  onClick,
  isCopyable,
  isBadge,
  badgeColor,
  colorPalette,
  alignEnd = false,
  // Legacy props
  label,
  containerProps = {},
  textProps = {},
  children,
}: TextCellProps) => {
  // Get globalFilter from context
  // If not in DataTable context, will use default empty string from context
  const { globalFilter } = useDataTableContext();

  // Legacy API: if children is provided, use old behavior
  if (children !== undefined) {
    const displayText =
      typeof children === 'string' || typeof children === 'number'
        ? String(children)
        : children;

    const highlightedDisplayText =
      typeof displayText === 'string' || typeof displayText === 'number'
        ? highlightText(displayText, globalFilter)
        : displayText;

    const flexJustifyContent = alignEnd ? 'flex-end' : undefined;
    const textAlign = alignEnd ? 'right' : undefined;

    if (label) {
      return (
        <Flex
          alignItems={'center'}
          justifyContent={flexJustifyContent}
          height={'100%'}
          {...containerProps}
        >
          <Tooltip
            content={
              <Text as="span" overflow="hidden" textOverflow={'ellipsis'}>
                {label}
              </Text>
            }
          >
            <Text
              as="span"
              overflow="hidden"
              textOverflow={'ellipsis'}
              wordBreak={'break-all'}
              textAlign={textAlign}
              {...textProps}
            >
              {highlightedDisplayText}
            </Text>
          </Tooltip>
        </Flex>
      );
    }
    return (
      <Flex
        alignItems={'center'}
        justifyContent={flexJustifyContent}
        height={'100%'}
        {...containerProps}
      >
        <Text
          as="span"
          overflow="hidden"
          textOverflow={'ellipsis'}
          wordBreak={'break-all'}
          textAlign={textAlign}
          {...textProps}
        >
          {highlightedDisplayText}
        </Text>
      </Flex>
    );
  }

  // New API: use text prop
  const displayValue = text ?? children;

  if (Array.isArray(displayValue)) {
    return (
      <Flex
        gap={2}
        flexWrap="wrap"
        justifyContent={alignEnd ? 'flex-end' : undefined}
      >
        {displayValue.map((item, index) => {
          const highlightedItem = highlightText(item, globalFilter);
          return (
            <Badge key={index} colorPalette={colorPalette || badgeColor}>
              {highlightedItem}
            </Badge>
          );
        })}
      </Flex>
    );
  }

  if (!!displayValue === false) {
    return (
      <Text
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
        wordBreak="break-all"
        display="flex"
        alignItems="center"
        justifyContent={alignEnd ? 'flex-end' : undefined}
        height="100%"
        textAlign={alignEnd ? 'right' : undefined}
      >
        -
      </Text>
    );
  }

  return (
    <Box
      textOverflow="ellipsis"
      whiteSpace="nowrap"
      wordBreak="break-all"
      overflow="auto"
      display="flex"
      alignItems="center"
      justifyContent={alignEnd ? 'flex-end' : undefined}
      height="100%"
      textAlign={alignEnd ? 'right' : undefined}
    >
      <RenderValue
        text={displayValue}
        href={href}
        onClick={onClick}
        isCopyable={isCopyable}
        isBadge={isBadge}
        badgeColor={badgeColor}
        colorPalette={colorPalette}
        globalFilter={globalFilter}
        alignEnd={alignEnd}
      />
    </Box>
  );
};
