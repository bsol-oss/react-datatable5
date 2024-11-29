export interface TableHeaderProps {
    canResize?: boolean;
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
    showSelector?: boolean;
    isSticky?: boolean;
    alwaysShowSelector?: boolean;
}
export declare const TableHeader: ({ canResize, pinnedBgColor, showSelector, isSticky, alwaysShowSelector, }: TableHeaderProps) => import("react/jsx-runtime").JSX.Element;
