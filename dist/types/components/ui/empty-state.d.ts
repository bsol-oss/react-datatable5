import { EmptyState as ChakraEmptyState } from "@chakra-ui/react";
import * as React from "react";
export interface EmptyStateProps extends ChakraEmptyState.RootProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
}
export declare const EmptyState: React.ForwardRefExoticComponent<EmptyStateProps & React.RefAttributes<HTMLDivElement>>;
