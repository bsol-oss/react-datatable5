import { Clipboard, HStack, IconButton, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { LuCheck, LuCopy } from 'react-icons/lu';

interface TextWithCopyProps {
  text: string | number | null | undefined;
  globalFilter?: string;
  highlightedText?: ReactNode;
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

export const TextWithCopy = ({
  text,
  globalFilter,
  highlightedText,
}: TextWithCopyProps) => {
  const textValue = String(text ?? '');
  const displayText =
    highlightedText !== undefined
      ? highlightedText
      : highlightText(textValue, globalFilter);

  return (
    <HStack gap={2} alignItems="center">
      <Text as="span">{displayText}</Text>
      <Clipboard.Root value={textValue}>
        <Clipboard.Trigger asChild>
          <IconButton
            size="xs"
            variant="ghost"
            aria-label="Copy"
            fontSize="1em"
          >
            <Clipboard.Indicator copied={<LuCheck />}>
              <LuCopy />
            </Clipboard.Indicator>
          </IconButton>
        </Clipboard.Trigger>
      </Clipboard.Root>
    </HStack>
  );
};
