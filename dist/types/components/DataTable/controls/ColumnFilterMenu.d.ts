export interface ColumnFilterMenuLabels {
    filterByLabel?: string;
    filterLabelsPlaceholder?: string;
    noFiltersMatchText?: string;
}
export interface ColumnFilterMenuProps {
    displayName: string;
    filterOptions: {
        label: string;
        value: string;
    }[];
    filterVariant?: 'select' | 'tag';
    colorPalette: string;
    value?: string[] | string | undefined;
    onChange?: (value: string[] | string | undefined) => void;
    labels?: ColumnFilterMenuLabels;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export declare const ColumnFilterMenu: ({ displayName, filterOptions, filterVariant, colorPalette, value: controlledValue, onChange, labels, open: controlledOpen, onOpenChange, }: ColumnFilterMenuProps) => import("react/jsx-runtime").JSX.Element;
