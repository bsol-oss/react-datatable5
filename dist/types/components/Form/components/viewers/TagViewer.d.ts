import { CustomJSONSchema7 } from "../types/CustomJSONSchema7";
export interface Tag {
    id: string;
    name: string;
    comment: string | null;
    extra_info: string | null;
    created_at: string;
    updated_at: string;
    table_id: string | null;
    parent_id: string;
}
export interface AllTags {
    [tagName: string]: Tag;
}
export interface TagData {
    table_name: string;
    parent_tag_name: string;
    parent_tag_id: string;
    all_tags: AllTags;
    is_mutually_exclusive: boolean;
}
export interface TagResponse {
    data: TagData[];
}
export interface TagViewerProps {
    column: string;
    schema: CustomJSONSchema7;
    prefix: string;
}
export declare const TagViewer: ({ column, schema, prefix }: TagViewerProps) => import("react/jsx-runtime").JSX.Element;
