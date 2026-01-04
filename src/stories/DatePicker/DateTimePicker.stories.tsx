import { DateTimePicker } from '@/components/DatePicker/DateTimePicker';
import { Provider } from '@/components/ui/provider';
import { Box, Button, Text, VStack, HStack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

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
    // Set start time to 2 hours from now (with milliseconds set to 0)
    const startTime = dayjs()
      .add(2, 'hours')
      .second(0)
      .millisecond(0)
      .toISOString();

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
                Duration:{' '}
                {(() => {
                  const selected = dayjs(value);
                  const start = dayjs(startTime);
                  const diffMs = selected.diff(start);
                  const diffMinutes = Math.floor(diffMs / (1000 * 60));
                  return `${diffMinutes} minutes`;
                })()}
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
    // Set start time to 1 hour 30 minutes from now (with milliseconds set to 0)
    const startTime = dayjs()
      .add(1, 'hour')
      .add(30, 'minute')
      .second(0)
      .millisecond(0)
      .toISOString();

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
                Duration:{' '}
                {(() => {
                  const selected = dayjs(value);
                  const start = dayjs(startTime);
                  const diffMs = selected.diff(start);
                  const diffSeconds = Math.floor(diffMs / 1000);
                  return `${diffSeconds} seconds`;
                })()}
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
    // Set start time to 9:00 AM today (with milliseconds set to 0)
    const startTime = dayjs()
      .hour(9)
      .minute(0)
      .second(0)
      .millisecond(0)
      .toISOString();

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
                Duration:{' '}
                {(() => {
                  const selected = dayjs(value);
                  const start = dayjs(startTime);
                  const diffMs = selected.diff(start);
                  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                  const diffMinutes = Math.floor(
                    (diffMs % (1000 * 60 * 60)) / (1000 * 60)
                  );
                  return `${diffHours} hours ${diffMinutes} minutes`;
                })()}
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
    // Set start time to yesterday at 3:00 PM (with milliseconds set to 0)
    const startTime = dayjs()
      .subtract(1, 'day')
      .hour(15)
      .minute(0)
      .second(0)
      .millisecond(0)
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
                Duration:{' '}
                {(() => {
                  const selected = dayjs(value);
                  const start = dayjs(startTime);
                  const diffMs = selected.diff(start);
                  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                  const diffHours = Math.floor(
                    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                  );
                  return `${diffDays} days ${diffHours} hours`;
                })()}
              </Text>
            </Box>
          )}
        </VStack>
      </Provider>
    );
  },
};

export const WithQuickActions: Story = {
  name: 'With Quick Action Buttons',
  render: () => {
    const [value, setValue] = useState<string>();

    return (
      <Provider>
        <VStack gap={4} align="stretch" p={4}>
          <Text fontSize="lg" fontWeight="bold">
            DateTimePicker with Quick Action Buttons
          </Text>
          <Text fontSize="sm" color="gray.600">
            This example shows the quick action buttons (Yesterday, Today,
            Tomorrow, +7 Days) in the date picker popover. Click the date button
            to see the helper buttons.
          </Text>
          <DateTimePicker
            value={value}
            onChange={setValue}
            showQuickActions={true}
          />
          {value && (
            <Box p={2} bg="bg.subtle" borderRadius="md">
              <Text fontSize="sm">Selected: {value}</Text>
              <Text fontSize="sm">
                Formatted: {dayjs(value).format('YYYY-MM-DD HH:mm:ss')}
              </Text>
            </Box>
          )}
        </VStack>
      </Provider>
    );
  },
};

export const WithQuickActionsCustomLabels: Story = {
  name: 'With Quick Actions (Custom Labels)',
  render: () => {
    const [value, setValue] = useState<string>();

    return (
      <Provider>
        <VStack gap={4} align="stretch" p={4}>
          <Text fontSize="lg" fontWeight="bold">
            DateTimePicker with Custom Quick Action Labels
          </Text>
          <Text fontSize="sm" color="gray.600">
            This example shows the quick action buttons with custom labels.
            Click the date button to see the helper buttons with custom text.
          </Text>
          <DateTimePicker
            value={value}
            onChange={setValue}
            showQuickActions={true}
            quickActionLabels={{
              yesterday: 'Yesterday',
              today: 'Today',
              tomorrow: 'Tomorrow',
              plus7Days: '+7 Days',
            }}
          />
          {value && (
            <Box p={2} bg="bg.subtle" borderRadius="md">
              <Text fontSize="sm">Selected: {value}</Text>
              <Text fontSize="sm">
                Formatted: {dayjs(value).format('YYYY-MM-DD HH:mm:ss')}
              </Text>
            </Box>
          )}
        </VStack>
      </Provider>
    );
  },
};

export const WithQuickActionsAndMinMax: Story = {
  name: 'With Quick Actions (Min/Max Date)',
  render: () => {
    const [value, setValue] = useState<string>();
    const minDate = dayjs().subtract(7, 'days').toDate();
    const maxDate = dayjs().add(30, 'days').toDate();

    return (
      <Provider>
        <VStack gap={4} align="stretch" p={4}>
          <Text fontSize="lg" fontWeight="bold">
            DateTimePicker with Quick Actions and Date Constraints
          </Text>
          <Text fontSize="sm" color="gray.600">
            This example shows quick action buttons with min/max date
            constraints. Buttons for dates outside the allowed range will be
            disabled.
          </Text>
          <Text fontSize="sm" color="gray.600">
            Min Date: {dayjs(minDate).format('YYYY-MM-DD')} | Max Date:{' '}
            {dayjs(maxDate).format('YYYY-MM-DD')}
          </Text>
          <DateTimePicker
            value={value}
            onChange={setValue}
            showQuickActions={true}
            minDate={minDate}
            maxDate={maxDate}
          />
          {value && (
            <Box p={2} bg="bg.subtle" borderRadius="md">
              <Text fontSize="sm">Selected: {value}</Text>
              <Text fontSize="sm">
                Formatted: {dayjs(value).format('YYYY-MM-DD HH:mm:ss')}
              </Text>
            </Box>
          )}
        </VStack>
      </Provider>
    );
  },
};

export const Controlled: Story = {
  name: 'Controlled',
  render: () => {
    const [value, setValue] = useState<string | undefined>(
      dayjs()
        .hour(14)
        .minute(30)
        .second(0)
        .millisecond(0)
        .format('YYYY-MM-DDTHH:mm:ssZ')
    );

    const setToNow = () => {
      setValue(dayjs().format('YYYY-MM-DDTHH:mm:ssZ'));
    };

    const setToTomorrow = () => {
      setValue(
        dayjs()
          .add(1, 'day')
          .hour(9)
          .minute(0)
          .second(0)
          .millisecond(0)
          .format('YYYY-MM-DDTHH:mm:ssZ')
      );
    };

    const setToNextWeek = () => {
      setValue(
        dayjs()
          .add(7, 'days')
          .hour(12)
          .minute(0)
          .second(0)
          .millisecond(0)
          .format('YYYY-MM-DDTHH:mm:ssZ')
      );
    };

    const clearValue = () => {
      setValue(undefined);
    };

    return (
      <Provider>
        <VStack gap={4} align="stretch" p={4}>
          <Text fontSize="lg" fontWeight="bold">
            Controlled DateTimePicker
          </Text>
          <Text fontSize="sm" color="gray.600">
            This example demonstrates a controlled DateTimePicker where the
            value is managed externally. You can set the value programmatically
            using the buttons below, or change it through the picker itself.
          </Text>
          <DateTimePicker value={value} onChange={(date) => setValue(date)} />
          <HStack gap={2} flexWrap="wrap">
            <Button size="sm" onClick={setToNow}>
              Set to Now
            </Button>
            <Button size="sm" onClick={setToTomorrow}>
              Set to Tomorrow 9:00 AM
            </Button>
            <Button size="sm" onClick={setToNextWeek}>
              Set to Next Week 12:00 PM
            </Button>
            <Button size="sm" variant="outline" onClick={clearValue}>
              Clear
            </Button>
          </HStack>
          {value ? (
            <Box p={2} bg="bg.subtle" borderRadius="md">
              <Text fontSize="sm" fontWeight="semibold">
                Current Value (Controlled):
              </Text>
              <Text fontSize="sm">Selected: {value}</Text>
              <Text fontSize="sm">
                Formatted: {dayjs(value).format('YYYY-MM-DD HH:mm:ss Z')}
              </Text>
              <Text fontSize="sm">Relative: {dayjs(value).fromNow()}</Text>
            </Box>
          ) : (
            <Box p={2} bg="bg.subtle" borderRadius="md">
              <Text fontSize="sm" color="gray.500">
                No value selected (controlled state is undefined)
              </Text>
            </Box>
          )}
        </VStack>
      </Provider>
    );
  },
};

export const WithTimezoneSelector: Story = {
  name: 'With Timezone Selector',
  render: () => {
    const [value, setValue] = useState<string>();

    return (
      <Provider>
        <VStack gap={4} align="stretch" p={4}>
          <Text fontSize="lg" fontWeight="bold">
            DateTimePicker with Timezone Selector
          </Text>
          <Text fontSize="sm" color="gray.600">
            This example shows the timezone offset selector. You can select a
            timezone offset from UTC-12:00 to UTC+14:00. The selected date-time
            will be formatted with the chosen timezone offset.
          </Text>
          <DateTimePicker
            value={value}
            onChange={setValue}
            showTimezoneSelector={true}
          />
          {value && (
            <Box p={2} bg="bg.subtle" borderRadius="md">
              <Text fontSize="sm">Selected: {value}</Text>
              <Text fontSize="sm">
                Parsed: {dayjs(value).format('YYYY-MM-DD HH:mm:ss Z')}
              </Text>
            </Box>
          )}
        </VStack>
      </Provider>
    );
  },
};
