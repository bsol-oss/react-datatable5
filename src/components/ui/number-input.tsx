import { NumberInput as ChakraNumberInput } from '@chakra-ui/react';
import * as React from 'react';

export interface NumberInputProps extends ChakraNumberInput.RootProps {}

export const NumberInputRoot = React.forwardRef<
  HTMLDivElement,
  NumberInputProps
>(function NumberInput(props, ref) {
  const { children, value, onValueChange, ...rest } = props;

  // Convert NaN to undefined for incoming value
  // Handle both number NaN and string "NaN" cases
  const normalizedValue = React.useMemo(() => {
    if (value === undefined || value === null) return undefined;
    if (typeof value === 'number' && isNaN(value)) return undefined;
    if (typeof value === 'string' && value === 'NaN') return undefined;
    // Convert number to string for Chakra UI (expects string)
    if (typeof value === 'number') return String(value);
    return value;
  }, [value]);

  // Wrap onValueChange to convert NaN to undefined
  const handleValueChange = React.useCallback(
    (details: { value: string; valueAsNumber: number }) => {
      if (onValueChange) {
        const normalizedDetails = {
          ...details,
          valueAsNumber: isNaN(details.valueAsNumber)
            ? undefined
            : details.valueAsNumber,
        };
        onValueChange(normalizedDetails as any);
      }
    },
    [onValueChange]
  );

  return (
    <ChakraNumberInput.Root
      ref={ref}
      variant="outline"
      value={normalizedValue}
      onValueChange={handleValueChange}
      {...rest}
    >
      {children}
    </ChakraNumberInput.Root>
  );
});

export const NumberInputField = ChakraNumberInput.Input;
export const NumberInputScrubber = ChakraNumberInput.Scrubber;
export const NumberInputLabel = ChakraNumberInput.Label;
