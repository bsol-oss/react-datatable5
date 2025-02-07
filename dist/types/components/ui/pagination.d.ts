import type { ButtonProps, TextProps } from "@chakra-ui/react";
import { Pagination as ChakraPagination } from "@chakra-ui/react";
import * as React from "react";
type PaginationVariant = "outline" | "solid" | "subtle";
export interface PaginationRootProps extends Omit<ChakraPagination.RootProps, "type"> {
    size?: ButtonProps["size"];
    variant?: PaginationVariant;
    getHref?: (page: number) => string;
}
export declare const PaginationRoot: React.ForwardRefExoticComponent<PaginationRootProps & React.RefAttributes<HTMLDivElement>>;
export declare const PaginationEllipsis: React.ForwardRefExoticComponent<ChakraPagination.EllipsisProps & React.RefAttributes<HTMLDivElement>>;
export declare const PaginationItem: React.ForwardRefExoticComponent<ChakraPagination.ItemProps & React.RefAttributes<HTMLButtonElement>>;
export declare const PaginationPrevTrigger: React.ForwardRefExoticComponent<ChakraPagination.PrevTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export declare const PaginationNextTrigger: React.ForwardRefExoticComponent<ChakraPagination.NextTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export declare const PaginationItems: (props: React.HTMLAttributes<HTMLElement>) => import("react/jsx-runtime").JSX.Element;
interface PageTextProps extends TextProps {
    format?: "short" | "compact" | "long";
}
export declare const PaginationPageText: React.ForwardRefExoticComponent<PageTextProps & React.RefAttributes<HTMLParagraphElement>>;
export {};
