/// <reference types="react" />
import { TextProps } from "@chakra-ui/react";
export interface TextCellProps extends TextProps {
    label?: string;
    noOfLines?: number[];
    padding?: string;
    children: string | number | JSX.Element | JSX.Element[];
}
export declare const TextCell: ({ label, padding, children, ...props }: TextCellProps) => import("react/jsx-runtime").JSX.Element;
