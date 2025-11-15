import React from 'react';
interface TagFilterProps {
    availableTags: {
        label?: string;
        value: string;
    }[];
    selectedTags: string[];
    selectOne?: boolean;
    onTagChange: (tags: string[]) => void;
}
export declare const TagFilter: React.FC<TagFilterProps>;
export {};
