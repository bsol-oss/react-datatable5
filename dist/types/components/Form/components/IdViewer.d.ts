import { DataListItemProps } from "@chakra-ui/react";
export interface IdViewerProps {
    value: string | undefined;
    column: string;
    dataListItemProps?: DataListItemProps;
}
export declare const IdViewer: ({ value, column, dataListItemProps, }: IdViewerProps) => import("react/jsx-runtime").JSX.Element;
