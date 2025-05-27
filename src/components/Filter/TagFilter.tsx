import { Flex } from "@chakra-ui/react";
import React from "react";
import { Tag } from "@/components/ui/tag";
interface TagFilterProps {
  availableTags: {
    label?: string;
    value: string;
  }[];
  selectedTags: string[];
  selectOne?: boolean;
  onTagChange: (tags: string[]) => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({
  availableTags,
  selectedTags,
  onTagChange,
  selectOne = false,
}) => {
  const toggleTag = (tag: string) => {
    if (selectOne) {
      if (selectedTags.includes(tag)) {
        onTagChange([]);
      } else {
        onTagChange([tag]);
      }
      return;
    }
    if (selectedTags.includes(tag)) {
      onTagChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagChange([...selectedTags, tag]);
    }
  };

  return (
    <Flex flexFlow={"wrap"} p={"0.5rem"} gap={"0.5rem"}>
      {availableTags.map((tag) => {
        const { label, value } = tag;
        return (
          <Tag
            variant={selectedTags.includes(value) ? "solid" : "outline"}
            cursor="pointer"
            closable={selectedTags.includes(value) ? true : undefined}
            onClick={() => toggleTag(value)}
          >
            {label ?? value}
          </Tag>
        );
      })}
    </Flex>
  );
};
