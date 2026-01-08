import { Textarea as ChakraTextarea } from '@chakra-ui/react';
import * as React from 'react';

export interface TextAreaProps
  extends Omit<
    React.ComponentProps<typeof ChakraTextarea>,
    'onChange' | 'value'
  > {
  value?: string;
  onChange?: (value: string) => void;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function Textarea({ value, onChange, ...props }, ref) {
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
          onChange(e.target.value);
        }
      },
      [onChange]
    );

    return (
      <ChakraTextarea
        ref={ref}
        value={value ?? ''}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
