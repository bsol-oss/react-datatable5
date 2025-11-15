import { TagFilter } from '@/components/Filter/TagFilter';
import { Provider } from '@/components/ui/provider';
import { Box, Text, VStack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta = {
  title: 'react-datatable5/Filter/TagFilter',
  component: TagFilter,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof TagFilter>;

type Story = StoryObj<typeof meta>;

export default meta;

const availableTags = [
  { label: 'Apple', value: 'apple' },
  { label: 'Samsung', value: 'samsung' },
  { label: 'Google', value: 'google' },
  { label: 'Microsoft', value: 'microsoft' },
  { label: 'Amazon', value: 'amazon' },
  { label: 'Meta', value: 'meta' },
  { label: 'Tesla', value: 'tesla' },
];

export const MultipleSelection: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    return (
      <Provider>
        <Box p={4}>
          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Multiple Selection Tag Filter
              </Text>
              <Text fontSize="sm" color="fg.muted" mb={4}>
                Click on tags to select/deselect multiple options. Uses
                CheckboxCard component.
              </Text>
            </Box>
            <TagFilter
              availableTags={availableTags}
              selectedTags={selectedTags}
              onTagChange={setSelectedTags}
            />
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Selected Tags:
              </Text>
              <Text fontSize="xs" color="fg.muted">
                {selectedTags.length > 0
                  ? selectedTags.join(', ')
                  : 'No tags selected'}
              </Text>
            </Box>
          </VStack>
        </Box>
      </Provider>
    );
  },
};

export const SingleSelection: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    return (
      <Provider>
        <Box p={4}>
          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Single Selection Tag Filter
              </Text>
              <Text fontSize="sm" color="fg.muted" mb={4}>
                Only one tag can be selected at a time. Clicking a selected tag
                will deselect it.
              </Text>
            </Box>
            <TagFilter
              availableTags={availableTags}
              selectedTags={selectedTags}
              onTagChange={setSelectedTags}
              selectOne={true}
            />
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Selected Tag:
              </Text>
              <Text fontSize="xs" color="fg.muted">
                {selectedTags.length > 0 ? selectedTags[0] : 'No tag selected'}
              </Text>
            </Box>
          </VStack>
        </Box>
      </Provider>
    );
  },
};

export const WithInitialSelection: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([
      'apple',
      'google',
    ]);

    return (
      <Provider>
        <Box p={4}>
          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Tag Filter with Initial Selection
              </Text>
              <Text fontSize="sm" color="fg.muted" mb={4}>
                Component starts with some tags pre-selected.
              </Text>
            </Box>
            <TagFilter
              availableTags={availableTags}
              selectedTags={selectedTags}
              onTagChange={setSelectedTags}
            />
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Selected Tags:
              </Text>
              <Text fontSize="xs" color="fg.muted">
                {selectedTags.length > 0
                  ? selectedTags.join(', ')
                  : 'No tags selected'}
              </Text>
            </Box>
          </VStack>
        </Box>
      </Provider>
    );
  },
};

export const CustomLabels: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const customTags = [
      { label: 'Frontend Development', value: 'frontend' },
      { label: 'Backend Development', value: 'backend' },
      { label: 'Full Stack', value: 'fullstack' },
      { label: 'DevOps', value: 'devops' },
      { label: 'Mobile Development', value: 'mobile' },
      { label: 'Data Science', value: 'data' },
    ];

    return (
      <Provider>
        <Box p={4}>
          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Tag Filter with Custom Labels
              </Text>
              <Text fontSize="sm" color="fg.muted" mb={4}>
                Tags can have custom labels that differ from their values.
              </Text>
            </Box>
            <TagFilter
              availableTags={customTags}
              selectedTags={selectedTags}
              onTagChange={setSelectedTags}
            />
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Selected Tags:
              </Text>
              <Text fontSize="xs" color="fg.muted">
                {selectedTags.length > 0
                  ? selectedTags.join(', ')
                  : 'No tags selected'}
              </Text>
            </Box>
          </VStack>
        </Box>
      </Provider>
    );
  },
};

export const WithoutLabels: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const tagsWithoutLabels = [
      { value: 'tag1' },
      { value: 'tag2' },
      { value: 'tag3' },
      { value: 'tag4' },
    ];

    return (
      <Provider>
        <Box p={4}>
          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Tag Filter without Labels
              </Text>
              <Text fontSize="sm" color="fg.muted" mb={4}>
                When labels are not provided, the value is used as the display
                text.
              </Text>
            </Box>
            <TagFilter
              availableTags={tagsWithoutLabels}
              selectedTags={selectedTags}
              onTagChange={setSelectedTags}
            />
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Selected Tags:
              </Text>
              <Text fontSize="xs" color="fg.muted">
                {selectedTags.length > 0
                  ? selectedTags.join(', ')
                  : 'No tags selected'}
              </Text>
            </Box>
          </VStack>
        </Box>
      </Provider>
    );
  },
};
