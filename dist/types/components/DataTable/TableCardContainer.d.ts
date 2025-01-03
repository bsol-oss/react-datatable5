import { GridProps } from "@chakra-ui/react";
import { ReactNode } from "react";
export interface TableCardContainerProps extends GridProps {
    children: ReactNode;
}
export declare const TableCardContainer: ({ children, ...props }: TableCardContainerProps) => import("react/jsx-runtime").JSX.Element;
