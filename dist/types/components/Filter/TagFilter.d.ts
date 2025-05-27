import React from "react";
interface TagFilterProps {
    availableTags: string[];
    selectedTags: string[];
    selectOne?: boolean;
    onTagChange: (tags: string[]) => void;
}
export declare const TagFilter: React.FC<TagFilterProps>;
export {};
