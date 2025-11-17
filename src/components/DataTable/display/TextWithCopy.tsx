import { Clipboard, HStack, IconButton, Text } from '@chakra-ui/react';
import { LuCheck, LuCopy } from 'react-icons/lu';

interface TextWithCopyProps {
  text: string | number | null | undefined;
}

export const TextWithCopy = ({ text }: TextWithCopyProps) => {
  const textValue = String(text ?? '');

  return (
    <HStack gap={2} alignItems="center">
      <Text as="span">{textValue}</Text>
      <Clipboard.Root value={textValue}>
        <Clipboard.Trigger asChild>
          <IconButton size="xs" variant="ghost" aria-label="Copy">
            <Clipboard.Indicator copied={<LuCheck />}>
              <LuCopy />
            </Clipboard.Indicator>
          </IconButton>
        </Clipboard.Trigger>
      </Clipboard.Root>
    </HStack>
  );
};
