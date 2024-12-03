import { TableHeadProps } from "@chakra-ui/react";
export interface TableHeaderProps {
    canResize?: boolean;
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
    showSelector?: boolean;
    isSticky?: boolean;
    alwaysShowSelector?: boolean;
    tHeadProps?: TableHeadProps;
}
export declare const TableHeader: ({ canResize, pinnedBgColor, showSelector, isSticky, alwaysShowSelector, tHeadProps, }: TableHeaderProps) => import("react/jsx-runtime").JSX.Element;
