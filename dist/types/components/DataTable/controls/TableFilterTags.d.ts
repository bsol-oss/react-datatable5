export interface TableFilterTagsProps {
    filterTagsOptions?: {
        column: string;
        options: {
            label: string;
            value: string;
        }[];
    }[];
}
export declare const TableFilterTags: ({ filterTagsOptions, }?: TableFilterTagsProps) => import("react/jsx-runtime").JSX.Element | null;
