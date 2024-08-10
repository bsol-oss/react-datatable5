import {
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
  WrapItem
} from "@chakra-ui/react";
import React from "react";

interface TagFilterProps {
  availableTags: string[];
  selectedTags: string[];
  onTagChange: (tags: string[]) => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({
  availableTags,
  selectedTags,
  onTagChange,
}) => {
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagChange([...selectedTags, tag]);
    }
  };

  return (
    <Flex flexFlow={"wrap"} p={"0.5rem"} gap={"0.5rem"}>
      {availableTags.map((tag) => (
        <WrapItem key={tag}>
          <Tag
            size="lg"
            variant={selectedTags.includes(tag) ? "solid" : "outline"}
            cursor="pointer"
            onClick={() => toggleTag(tag)}
          >
            <TagLabel>{tag}</TagLabel>
            {selectedTags.includes(tag) && <TagCloseButton />}
          </Tag>
        </WrapItem>
      ))}
    </Flex>
  );
};
