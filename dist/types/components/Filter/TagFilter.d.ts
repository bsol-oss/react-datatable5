import React from "react";
interface TagFilterProps {
    availableTags: string[];
    selectedTags: string[];
    onTagChange: (tags: string[]) => void;
}
export declare const TagFilter: React.FC<TagFilterProps>;
export {};
