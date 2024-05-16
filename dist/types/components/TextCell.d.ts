/// <reference types="react" />
export interface TextCellProps {
    label?: string;
    noOfLines?: number[];
    padding?: string;
    children: string | number | JSX.Element | JSX.Element[];
}
export declare const TextCell: ({ label, noOfLines, padding, children, }: TextCellProps) => import("react/jsx-runtime").JSX.Element;
