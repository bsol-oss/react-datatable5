import { ReactNode } from 'react';
interface TextWithCopyProps {
    text: string | number | null | undefined;
    globalFilter?: string;
    highlightedText?: ReactNode;
}
export declare const TextWithCopy: ({ text, globalFilter, highlightedText, }: TextWithCopyProps) => import("react/jsx-runtime").JSX.Element;
export {};
