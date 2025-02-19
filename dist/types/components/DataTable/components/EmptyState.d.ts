import { UseQueryResult } from "@tanstack/react-query";
export interface EmptyStateProps {
    query: UseQueryResult;
    title?: string;
    description?: string;
}
export declare const EmptyState: ({ title, description, }: EmptyStateProps) => import("react/jsx-runtime").JSX.Element;
