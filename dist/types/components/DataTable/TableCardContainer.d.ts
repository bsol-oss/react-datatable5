import { GridProps } from "@chakra-ui/react";
import { ReactNode } from "react";
export interface TableCardContainerProps extends GridProps {
    children: ReactNode;
    variant?: "carousel" | "";
}
export declare const TableCardContainer: ({ children, variant, ...props }: TableCardContainerProps) => import("react/jsx-runtime").JSX.Element;
