import { Flex } from "@chakra-ui/react";
import React from "react";
import { Tag } from "@/components/ui/tag";
interface TagFilterProps {
  availableTags: string[];
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
      {availableTags.map((tag) => (
        <Tag
          variant={selectedTags.includes(tag) ? "solid" : "outline"}
          cursor="pointer"
          closable={selectedTags.includes(tag) ? true : undefined}
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </Tag>
      ))}
    </Flex>
  );
};
