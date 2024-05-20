/// <reference types="react" />
import { TooltipProps } from "@chakra-ui/react";
export interface TextCellProps {
    label?: string;
    noOfLines?: number[];
    padding?: string;
    children: string | number | JSX.Element | JSX.Element[];
    tooltipProps?: TooltipProps;
}
export declare const TextCell: ({ label, noOfLines, padding, children, tooltipProps, ...props }: TextCellProps) => import("react/jsx-runtime").JSX.Element;
