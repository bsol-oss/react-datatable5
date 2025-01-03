import { TextProps } from "@chakra-ui/react";
import { ReactNode } from "react";
export interface TextCellProps extends TextProps {
    label?: string;
    noOfLines?: number[];
    padding?: string;
    children: string | number | ReactNode | ReactNode[];
}
export declare const TextCell: ({ label, padding, children, ...props }: TextCellProps) => import("react/jsx-runtime").JSX.Element;
