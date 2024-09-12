export interface TableHeaderProps {
    canResize?: boolean;
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
    showSelector?: boolean;
}
export declare const TableHeader: ({ canResize, pinnedBgColor, showSelector, }: TableHeaderProps) => import("react/jsx-runtime").JSX.Element;
