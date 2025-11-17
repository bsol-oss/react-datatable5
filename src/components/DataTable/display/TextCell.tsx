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
import { ReactNode } from 'react';
import { LuExternalLink } from 'react-icons/lu';
import { TextWithCopy } from './TextWithCopy';

interface RenderValueProps {
  text: string | number | null | undefined;
  href?: string;
  onClick?: () => void;
  isCopyable?: boolean;
  isBadge?: boolean;
  badgeColor?: string;
  colorPalette?: string;
}

const RenderValue = ({
  text,
  href,
  onClick,
  isCopyable,
  isBadge,
  badgeColor,
  colorPalette,
}: RenderValueProps) => {
  if (isBadge) {
    return <Badge colorPalette={colorPalette || badgeColor}>{text}</Badge>;
  }

  // onClick takes precedence over href
  if (onClick) {
    return (
      <Box
        as="button"
        onClick={onClick}
        cursor="pointer"
        textAlign="left"
        _hover={{
          textDecoration: 'underline',
          color: {
            base: 'blue.500',
            _dark: 'blue.400',
          },
        }}
        transition="all 0.2s"
      >
        {text}
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
        {text} <Icon as={LuExternalLink} />
      </Link>
    );
  }

  if (isCopyable) {
    return <TextWithCopy text={text} />;
  }

  return <>{text}</>;
};

export interface TextCellProps {
  // New API
  text?: string | number | null | undefined | string[];
  href?: string;
  onClick?: () => void;
  isCopyable?: boolean;
  isBadge?: boolean;
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
  // Legacy props
  label,
  containerProps = {},
  textProps = {},
  children,
}: TextCellProps) => {
  // Legacy API: if children is provided, use old behavior
  if (children !== undefined) {
    const displayText =
      typeof children === 'string' || typeof children === 'number'
        ? String(children)
        : children;

    if (label) {
      return (
        <Flex alignItems={'center'} height={'100%'} {...containerProps}>
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
              {...textProps}
            >
              {displayText}
            </Text>
          </Tooltip>
        </Flex>
      );
    }
    return (
      <Flex alignItems={'center'} height={'100%'} {...containerProps}>
        <Text
          as="span"
          overflow="hidden"
          textOverflow={'ellipsis'}
          wordBreak={'break-all'}
          {...textProps}
        >
          {displayText}
        </Text>
      </Flex>
    );
  }

  // New API: use text prop
  const displayValue = text ?? children;

  if (Array.isArray(displayValue)) {
    return (
      <Flex gap={2} flexWrap="wrap">
        {displayValue.map((item, index) => (
          <Badge key={index} colorPalette={colorPalette || badgeColor}>
            {item}
          </Badge>
        ))}
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
        height="100%"
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
      height="100%"
    >
      <RenderValue
        text={displayValue}
        href={href}
        onClick={onClick}
        isCopyable={isCopyable}
        isBadge={isBadge}
        badgeColor={badgeColor}
        colorPalette={colorPalette}
      />
    </Box>
  );
};
