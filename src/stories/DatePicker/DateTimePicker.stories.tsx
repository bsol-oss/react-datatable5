import { DateTimePicker } from '@/components/DatePicker/DateTimePicker';
import { Provider } from '@/components/ui/provider';
import { Box, Text, VStack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useState } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/DatePicker/date-time-picker',
  component: DateTimePicker,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof DateTimePicker>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Basic: Story = {
  name: 'Basic',
  render: () => {
    const [value, setValue] = useState<string>();
    return (
      <Provider>
        <VStack gap={4} align="stretch" p={4}>
          <Text fontSize="lg" fontWeight="bold">
            Basic DateTimePicker
          </Text>
          <DateTimePicker value={value} onChange={setValue} />
          {value && (
            <Box p={2} bg="bg.subtle" borderRadius="md">
              <Text fontSize="sm">Selected: {value}</Text>
            </Box>
          )}
        </VStack>
      </Provider>
    );
  },
};

export const WithStartTime: Story = {
  name: 'With Start Time',
  render: () => {
    const [value, setValue] = useState<string>();
    // Set start time to 2 hours from now
    const startTime = dayjs().add(2, 'hours').toISOString();

    return (
      <Provider>
        <VStack gap={4} align="stretch" p={4}>
          <Text fontSize="lg" fontWeight="bold">
            DateTimePicker with Start Time
          </Text>
          <Text fontSize="sm" color="gray.600">
            Start Time: {dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
          <Text fontSize="sm" color="gray.600">
            The time picker will hide times before the start time and show
            duration differences.
          </Text>
          <DateTimePicker
            value={value}
            onChange={setValue}
            startTime={startTime}
          />
          {value && (
            <Box p={2} bg="bg.subtle" borderRadius="md">
              <Text fontSize="sm">Selected: {value}</Text>
              <Text fontSize="sm">
                Duration: {dayjs(value).diff(dayjs(startTime), 'minute')}{' '}
                minutes
              </Text>
            </Box>
          )}
        </VStack>
      </Provider>
    );
  },
};

export const WithStartTimeISO: Story = {
  name: 'With Start Time ISO',
  render: () => {
    const [value, setValue] = useState<string>();
    // Set start time to 1 hour 30 minutes from now
    const startTime = dayjs().add(1, 'hour').add(30, 'minute').toISOString();

    return (
      <Provider>
        <VStack gap={4} align="stretch" p={4}>
          <Text fontSize="lg" fontWeight="bold">
            ISO DateTimePicker with Start Time
          </Text>
          <Text fontSize="sm" color="gray.600">
            Start Time: {dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Using ISO format (24-hour) with seconds. Times before start time are
            hidden.
          </Text>
          <DateTimePicker
            value={value}
            onChange={setValue}
            format="iso-date-time"
            showSeconds={true}
            startTime={startTime}
          />
          {value && (
            <Box p={2} bg="bg.subtle" borderRadius="md">
              <Text fontSize="sm">Selected: {value}</Text>
              <Text fontSize="sm">
                Duration: {dayjs(value).diff(dayjs(startTime), 'second')}{' '}
                seconds
              </Text>
            </Box>
          )}
        </VStack>
      </Provider>
    );
  },
};

export const WithStartTimeSameDay: Story = {
  name: 'With Start Time Same Day',
  render: () => {
    const [value, setValue] = useState<string>();
    // Set start time to 9:00 AM today
    const startTime = dayjs().hour(9).minute(0).second(0).toISOString();

    return (
      <Provider>
        <VStack gap={4} align="stretch" p={4}>
          <Text fontSize="lg" fontWeight="bold">
            Start Time on Same Day (9:00 AM)
          </Text>
          <Text fontSize="sm" color="gray.600">
            Start Time: {dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
          <Text fontSize="sm" color="gray.600">
            When selecting the same date, only times after 9:00 AM will be
            available. The duration difference is shown in the time picker.
          </Text>
          <DateTimePicker
            value={value}
            onChange={setValue}
            startTime={startTime}
          />
          {value && (
            <Box p={2} bg="bg.subtle" borderRadius="md">
              <Text fontSize="sm">Selected: {value}</Text>
              <Text fontSize="sm">
                Duration: {dayjs(value).diff(dayjs(startTime), 'hour')} hours{' '}
                {dayjs(value).diff(dayjs(startTime), 'minute') % 60} minutes
              </Text>
            </Box>
          )}
        </VStack>
      </Provider>
    );
  },
};

export const WithStartTimeDifferentDay: Story = {
  name: 'With Start Time Different Day',
  render: () => {
    const [value, setValue] = useState<string>();
    // Set start time to yesterday at 3:00 PM
    const startTime = dayjs()
      .subtract(1, 'day')
      .hour(15)
      .minute(0)
      .second(0)
      .toISOString();

    return (
      <Provider>
        <VStack gap={4} align="stretch" p={4}>
          <Text fontSize="lg" fontWeight="bold">
            Start Time on Different Day (Yesterday 3:00 PM)
          </Text>
          <Text fontSize="sm" color="gray.600">
            Start Time: {dayjs(startTime).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
          <Text fontSize="sm" color="gray.600">
            When selecting a different date, all times are available since the
            date difference ensures positive duration.
          </Text>
          <DateTimePicker
            value={value}
            onChange={setValue}
            startTime={startTime}
          />
          {value && (
            <Box p={2} bg="bg.subtle" borderRadius="md">
              <Text fontSize="sm">Selected: {value}</Text>
              <Text fontSize="sm">
                Duration: {dayjs(value).diff(dayjs(startTime), 'day')} days{' '}
                {dayjs(value).diff(dayjs(startTime), 'hour') % 24} hours
              </Text>
            </Box>
          )}
        </VStack>
      </Provider>
    );
  },
};
