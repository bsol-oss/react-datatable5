import { GridProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
export interface MobileTableControlsProps {
    totalText?: string;
    fitTableWidth?: boolean;
    fitTableHeight?: boolean;
    children?: ReactNode;
    showGlobalFilter?: boolean;
    showFilter?: boolean;
    showFilterName?: boolean;
    showFilterTags?: boolean;
    showReload?: boolean;
    showPagination?: boolean;
    showPageSizeControl?: boolean;
    showPageCountText?: boolean;
    showView?: boolean;
    filterTagsOptions?: {
        column: string;
        options: {
            label: string;
            value: string;
        }[];
    }[];
    extraItems?: ReactNode;
    loading?: boolean;
    hasError?: boolean;
    gridProps?: GridProps;
}
export declare const MobileTableControls: ({ fitTableWidth, fitTableHeight, children, showGlobalFilter, showFilter, showFilterName, showFilterTags, showReload, showPagination, showPageSizeControl, showPageCountText, showView, filterTagsOptions, extraItems, loading, hasError, gridProps, }: MobileTableControlsProps) => import("react/jsx-runtime").JSX.Element;
