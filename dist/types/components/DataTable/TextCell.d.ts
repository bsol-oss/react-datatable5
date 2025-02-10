import { FlexProps, TextProps } from "@chakra-ui/react";
import { ReactNode } from "react";
export interface TextCellProps {
    label?: string;
    noOfLines?: number[];
    children: string | number | ReactNode | ReactNode[];
    containerProps?: FlexProps;
    textProps?: TextProps;
}
export declare const TextCell: ({ label, containerProps, textProps, children, }: TextCellProps) => import("react/jsx-runtime").JSX.Element;
