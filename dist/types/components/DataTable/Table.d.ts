import { TableRootProps } from "@chakra-ui/react";
import { ReactNode } from "react";
export interface TableProps extends TableRootProps {
    showLoading?: boolean;
    loadingComponent?: ReactNode;
    emptyComponent?: ReactNode;
    children: ReactNode;
}
export declare const Table: ({ children, emptyComponent, ...props }: TableProps) => string | number | bigint | boolean | import("react/jsx-runtime").JSX.Element | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null;
