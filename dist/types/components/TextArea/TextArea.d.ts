import { Textarea as ChakraTextarea } from '@chakra-ui/react';
import * as React from 'react';
export interface TextAreaProps extends Omit<React.ComponentProps<typeof ChakraTextarea>, 'onChange' | 'value'> {
    value?: string;
    onChange?: (value: string) => void;
}
export declare const Textarea: React.ForwardRefExoticComponent<Omit<TextAreaProps, "ref"> & React.RefAttributes<HTMLTextAreaElement>>;
