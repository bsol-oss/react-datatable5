import { CardBodyProps } from "@chakra-ui/react";
import { Row } from "@tanstack/react-table";
import { ReactNode } from "react";
export interface TableCardsProps<TData> {
    isSelectable?: boolean;
    showDisplayNameOnly?: boolean;
    renderTitle?: (row: Row<TData>) => ReactNode | undefined;
    cardBodyProps?: CardBodyProps;
}
export declare const DefaultCardTitle: () => import("react/jsx-runtime").JSX.Element;
export declare const TableCards: <TData>({ isSelectable, showDisplayNameOnly, renderTitle, cardBodyProps }: TableCardsProps<TData>) => import("react/jsx-runtime").JSX.Element;
