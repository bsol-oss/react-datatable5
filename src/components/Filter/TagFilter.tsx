import { Flex } from '@chakra-ui/react';
import React from 'react';
import { CheckboxCard } from '@/components/ui/checkbox-card';

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
  const handleTagChange = (tag: string, checked: boolean) => {
    if (selectOne) {
      if (checked) {
        onTagChange([tag]);
      } else {
        onTagChange([]);
      }
      return;
    }
    if (checked) {
      onTagChange([...selectedTags, tag]);
    } else {
      onTagChange(selectedTags.filter((t) => t !== tag));
    }
  };

  return (
    <Flex flexFlow={'wrap'} p={'0.5rem'} gap={'0.5rem'}>
      {availableTags.map((tag) => {
        const { label, value } = tag;
        const isChecked = selectedTags.includes(value);
        return (
          <CheckboxCard
            key={value}
            checked={isChecked}
            label={label ?? value}
            size="sm"
            variant={isChecked ? 'solid' : 'outline'}
            onCheckedChange={(details) => {
              handleTagChange(value, Boolean(details.checked));
            }}
          />
        );
      })}
    </Flex>
  );
};
