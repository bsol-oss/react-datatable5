import { Table } from "@tanstack/react-table";
import React from "react";
export interface TableRendererProps<TData> {
    render: (render: Table<TData>) => React.ReactElement;
}
export declare const TableComponentRenderer: <TData>({ render, }: TableRendererProps<TData>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
