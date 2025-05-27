import { BoxProps, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";
export interface TableCardContainerProps extends BoxProps {
    children: ReactNode;
    variant?: "carousel" | "";
    gap?: string;
    gridTemplateColumns?: string;
    direction?: FlexProps["direction"];
}
export declare const TableCardContainer: ({ children, variant, gap, gridTemplateColumns, direction, ...props }: TableCardContainerProps) => import("react/jsx-runtime").JSX.Element;
