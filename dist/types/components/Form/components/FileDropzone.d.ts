import { GridProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
export interface FileDropzoneProps {
    children?: ReactNode;
    onDrop?: ({ files, text }: {
        files: File[];
        text?: string | null;
    }) => void;
    gridProps?: GridProps;
    placeholder?: string;
}
export declare const FileDropzone: ({ children, gridProps, onDrop, placeholder, }: FileDropzoneProps) => import("react/jsx-runtime").JSX.Element;
