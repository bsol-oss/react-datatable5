/// <reference types="react" />
export interface TextCellProps {
    label?: string;
    children: string | number | JSX.Element | JSX.Element[];
}
export declare const TextCell: ({ label, children }: TextCellProps) => import("react/jsx-runtime").JSX.Element;
