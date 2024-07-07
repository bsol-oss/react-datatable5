/// <reference types="react" />
import { GridProps } from "@chakra-ui/react";
export interface TableCardContainerProps extends GridProps {
    children: JSX.Element;
}
export declare const TableCardContainer: ({ children, ...props }: TableCardContainerProps) => import("react/jsx-runtime").JSX.Element;
