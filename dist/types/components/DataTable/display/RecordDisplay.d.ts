import { BoxProps } from '@chakra-ui/react';
export interface RecordDisplayProps {
    object: object | null;
    boxProps?: BoxProps;
    prefix?: string;
}
export declare const RecordDisplay: ({ object, boxProps, prefix, }: RecordDisplayProps) => import("react/jsx-runtime").JSX.Element;
