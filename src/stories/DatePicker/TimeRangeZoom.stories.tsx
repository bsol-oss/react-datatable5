import {
  TimeRangeZoom,
  TimeViewportRoot,
  TimeViewportBlock,
  TimeViewportBlocks,
  TimeViewportGrid,
  TimeViewportHeader,
  TimeViewportMarkerLine,
} from '@/components/DatePicker/TimeRangeZoom';
import { Provider } from '@/components/ui/provider';
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useState } from 'react';

const meta = {
  title: 'react-datatable5/DatePicker/time-range-zoom',
  component: TimeRangeZoom,
  parameters: {},
  argTypes: {
    minDurationMs: {
      control: { type: 'number' },
    },
    maxDurationMs: {
      control: { type: 'number' },
    },
    zoomFactor: {
      control: { type: 'number' },
    },
    showResetButton: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof TimeRangeZoom>;

type Story = StoryObj<typeof meta>;

export default meta;

const requiredStoryArgs = {
  range: {
    start: dayjs().subtract(1, 'hour').toDate(),
    end: dayjs().toDate(),
  },
  onRangeChange: () => undefined,
};

type ShiftTemplate = {
  person: string;
  shift: string;
  startHour: number;
  endHour: number;
  color: string;
};

const SHIFT_TEMPLATES: ShiftTemplate[] = [
  { person: 'Alpha', shift: 'Day', startHour: 7, endHour: 15, color: 'blue' },
  { person: 'Bravo', shift: 'Day', startHour: 8, endHour: 16, color: 'teal' },
  {
    person: 'Charlie',
    shift: 'Evening',
    startHour: 15,
    endHour: 23,
    color: 'orange',
  },
  {
    person: 'Delta',
    shift: 'Night',
    startHour: 22,
    endHour: 30,
    color: 'purple',
  },
  {
    person: 'Echo',
    shift: 'Night',
    startHour: 23,
    endHour: 31,
    color: 'pink',
  },
  { person: 'Foxtrot', shift: 'Day', startHour: 6, endHour: 14, color: 'cyan' },
  {
    person: 'Golf',
    shift: 'Evening',
    startHour: 14,
    endHour: 22,
    color: 'yellow',
  },
  {
    person: 'Hotel',
    shift: 'Support',
    startHour: 10,
    endHour: 18,
    color: 'green',
  },
];

const stableHash = (input: string) =>
  Array.from(input).reduce((acc, char) => acc + char.charCodeAt(0), 0);

const seededRange = (seed: string, min: number, max: number) => {
  const value = stableHash(seed) % (max - min + 1);
  return min + value;
};

const buildShiftBlocksForTemplate = (
  weekStart: dayjs.Dayjs,
  template: ShiftTemplate,
  includePersonInLabel: boolean
) =>
  Array.from({ length: 7 }, (_, dayOffset) => dayOffset).flatMap(
    (dayOffset) => {
      const daySeed = weekStart.add(dayOffset, 'day').format('YYYY-MM-DD');
      const seedBase = `${daySeed}-${template.person}`;
      const isWeekend = dayOffset === 0 || dayOffset === 6;
      const isOffDay =
        seededRange(`${seedBase}-off`, 0, 9) < (isWeekend ? 4 : 2);
      if (isOffDay) return [];

      const startMinuteJitter = seededRange(`${seedBase}-start`, -30, 30);
      const endMinuteJitter = seededRange(`${seedBase}-end`, -45, 45);
      const shiftStart = weekStart
        .add(dayOffset, 'day')
        .add(template.startHour, 'hour')
        .add(startMinuteJitter, 'minute');
      const shiftEnd = weekStart
        .add(dayOffset, 'day')
        .add(template.endHour, 'hour')
        .add(endMinuteJitter, 'minute');

      const minEnd = shiftStart.add(6, 'hour');
      const normalizedEnd = shiftEnd.isAfter(minEnd) ? shiftEnd : minEnd;
      const dayLabel = shiftStart.format('ddd');
      const baseLabel = includePersonInLabel
        ? `${template.person} ${template.shift} ${dayLabel}`
        : `${template.shift} ${dayLabel}`;
      const baseBlock = {
        id: `${template.person.toLowerCase()}-${template.shift.toLowerCase()}-${dayOffset}`,
        start: shiftStart.toDate(),
        end: normalizedEnd.toDate(),
        label: baseLabel,
        colorPalette: template.color,
      };

      const hasOvertime = seededRange(`${seedBase}-ot`, 0, 9) > 7;
      if (!hasOvertime) return [baseBlock];

      const overtimeEnd = normalizedEnd.add(
        seededRange(`${seedBase}-otlen`, 30, 120),
        'minute'
      );
      return [
        baseBlock,
        {
          id: `${baseBlock.id}-ot`,
          start: normalizedEnd.toDate(),
          end: overtimeEnd.toDate(),
          label: includePersonInLabel
            ? `${template.person} OT ${dayLabel}`
            : `OT ${dayLabel}`,
          colorPalette: 'red',
        },
      ];
    }
  );

const buildWeeklyShiftBlocks = (weekStart: dayjs.Dayjs) =>
  SHIFT_TEMPLATES.flatMap((template) =>
    buildShiftBlocksForTemplate(weekStart, template, true)
  );

const buildWeeklyShiftBlocksByPerson = (weekStart: dayjs.Dayjs) =>
  SHIFT_TEMPLATES.map((template) => ({
    person: template.person,
    blocks: buildShiftBlocksForTemplate(weekStart, template, false),
  }));

const TimeRangeZoomDemo = (props: {
  minDurationMs?: number;
  maxDurationMs?: number;
  zoomFactor?: number;
  showResetButton?: boolean;
  disabled?: boolean;
  labels?: React.ComponentProps<typeof TimeRangeZoom>['labels'];
}) => {
  const [range, setRange] = useState({
    start: dayjs().subtract(6, 'hour').toDate(),
    end: dayjs().toDate(),
  });

  return (
    <Provider>
      <VStack align="stretch" gap={4} p={4}>
        <Text fontSize="lg" fontWeight="bold">
          Time Range Zoom
        </Text>
        <Text fontSize="sm">
          Use the zoom buttons to adjust the viewable time range around the
          current center.
        </Text>

        <TimeRangeZoom range={range} onRangeChange={setRange} {...props} />

        <Box p={3} borderWidth="1px" borderRadius="md">
          <Text fontSize="sm" fontWeight="semibold">
            Current Range
          </Text>
          <Text fontSize="sm" fontFamily="mono">
            Start: {dayjs(range.start).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
          <Text fontSize="sm" fontFamily="mono">
            End: {dayjs(range.end).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
          <Text fontSize="sm" fontFamily="mono">
            Duration:{' '}
            {Math.floor(dayjs(range.end).diff(dayjs(range.start), 'minute'))}{' '}
            minutes
          </Text>
        </Box>

        <HStack>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setRange({
                start: dayjs().subtract(1, 'hour').toDate(),
                end: dayjs().toDate(),
              })
            }
          >
            Last 1 hour
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setRange({
                start: dayjs().subtract(24, 'hour').toDate(),
                end: dayjs().toDate(),
              })
            }
          >
            Last 24 hours
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setRange({
                start: dayjs().subtract(7, 'day').toDate(),
                end: dayjs().toDate(),
              })
            }
          >
            Last 7 days
          </Button>
        </HStack>
      </VStack>
    </Provider>
  );
};

export const Basic: Story = {
  name: 'Basic',
  args: {
    ...requiredStoryArgs,
    minDurationMs: 5 * 60 * 1000,
    maxDurationMs: 14 * 24 * 60 * 60 * 1000,
    zoomFactor: 2,
    showResetButton: true,
    disabled: false,
  },
  render: (args) => <TimeRangeZoomDemo {...args} />,
};

export const WithI18nLabels: Story = {
  name: 'With I18n Labels',
  args: {
    ...requiredStoryArgs,
    minDurationMs: 10 * 60 * 1000,
    maxDurationMs: 30 * 24 * 60 * 60 * 1000,
    zoomFactor: 1.5,
    showResetButton: true,
    labels: {
      zoomIn: 'Agrandir',
      zoomOut: 'Reduire',
      reset: 'Reinitialiser',
      visibleRange: 'Plage visible',
      duration: 'Duree',
      invalidRange: 'Plage invalide',
    },
  },
  render: (args) => <TimeRangeZoomDemo {...args} />,
};

const TimeViewportBlockDemo = () => {
  const [viewport, setViewport] = useState({
    start: dayjs().subtract(6, 'hour').toDate(),
    end: dayjs().toDate(),
  });

  const block = {
    start: dayjs().subtract(4, 'hour').toDate(),
    end: dayjs().subtract(1, 'hour').toDate(),
  };

  return (
    <Provider>
      <VStack align="stretch" gap={4} p={4}>
        <Text fontSize="lg" fontWeight="bold">
          Viewport Block Resize
        </Text>
        <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
          The block resizes based on overlap between block time and viewport
          time.
        </Text>

        <TimeRangeZoom
          range={viewport}
          onRangeChange={setViewport}
          minDurationMs={5 * 60 * 1000}
          maxDurationMs={7 * 24 * 60 * 60 * 1000}
          zoomFactor={1.5}
        />

        <Box
          p={3}
          borderWidth="1px"
          borderRadius="md"
          bg="gray.50"
          _dark={{ bg: 'gray.800' }}
          position="relative"
        >
          <TimeViewportBlock
            start={block.start}
            end={block.end}
            viewportStart={viewport.start}
            viewportEnd={viewport.end}
            label="Deploy Window"
            colorPalette="teal"
            height="32px"
          />
          <TimeViewportMarkerLine
            timestamp={dayjs().subtract(2, 'hour').toDate()}
            viewportStart={viewport.start}
            viewportEnd={viewport.end}
            label="Now -2h"
            colorPalette="red"
          />
        </Box>

        <Box p={3} borderWidth="1px" borderRadius="md">
          <Text fontSize="sm" fontWeight="semibold">
            Block Time
          </Text>
          <Text fontSize="sm" fontFamily="mono">
            {dayjs(block.start).format('YYYY-MM-DD HH:mm:ss')} -{' '}
            {dayjs(block.end).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
          <Text mt={2} fontSize="sm" fontWeight="semibold">
            Viewport Time
          </Text>
          <Text fontSize="sm" fontFamily="mono">
            {dayjs(viewport.start).format('YYYY-MM-DD HH:mm:ss')} -{' '}
            {dayjs(viewport.end).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
        </Box>

        <HStack>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: dayjs().subtract(2, 'hour').toDate(),
                end: dayjs().toDate(),
              })
            }
          >
            Narrow viewport
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: dayjs().subtract(12, 'hour').toDate(),
                end: dayjs().toDate(),
              })
            }
          >
            Wide viewport
          </Button>
        </HStack>
      </VStack>
    </Provider>
  );
};

export const ViewportBlockResize: Story = {
  name: 'Viewport Block Resize',
  args: {
    ...requiredStoryArgs,
  },
  render: () => <TimeViewportBlockDemo />,
};

const MultiViewportBlocksDemo = () => {
  const [viewport, setViewport] = useState({
    start: dayjs().subtract(8, 'hour').toDate(),
    end: dayjs().toDate(),
  });

  const blocks = [
    {
      id: 'ingest',
      start: dayjs().subtract(7, 'hour').toDate(),
      end: dayjs().subtract(3, 'hour').toDate(),
      label: 'Ingest',
      colorPalette: 'purple',
    },
    {
      id: 'transform',
      start: dayjs().subtract(5, 'hour').toDate(),
      end: dayjs().subtract(90, 'minute').toDate(),
      label: 'Transform',
      colorPalette: 'orange',
    },
    {
      id: 'publish',
      start: dayjs().subtract(2, 'hour').toDate(),
      end: dayjs().subtract(10, 'minute').toDate(),
      label: 'Publish',
      colorPalette: 'green',
    },
  ];

  return (
    <Provider>
      <VStack align="stretch" gap={4} p={4}>
        <Text fontSize="lg" fontWeight="bold">
          Multi Viewport Blocks
        </Text>
        <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
          Multiple blocks resize independently, support overlap, and are packed
          into multiple tracks.
        </Text>

        <TimeRangeZoom
          range={viewport}
          onRangeChange={setViewport}
          minDurationMs={10 * 60 * 1000}
          maxDurationMs={7 * 24 * 60 * 60 * 1000}
          zoomFactor={1.5}
        />

        <Box
          p={3}
          borderWidth="1px"
          borderRadius="md"
          bg="gray.50"
          _dark={{ bg: 'gray.800' }}
          position="relative"
        >
          <TimeViewportBlocks
            blocks={blocks}
            viewportStart={viewport.start}
            viewportEnd={viewport.end}
            height="28px"
            allowOverlap={true}
          />
          <TimeViewportMarkerLine
            timestamp={dayjs().subtract(100, 'minute').toDate()}
            viewportStart={viewport.start}
            viewportEnd={viewport.end}
            label="Cutoff"
            colorPalette="red"
          />
        </Box>
      </VStack>
    </Provider>
  );
};

export const MultiBlocks: Story = {
  name: 'Multi Blocks',
  args: {
    ...requiredStoryArgs,
  },
  render: () => <MultiViewportBlocksDemo />,
};

const ShiftManagementViewportDemo = () => {
  const weekStart = dayjs().startOf('week');
  const [viewport, setViewport] = useState(() => ({
    start: weekStart.toDate(),
    end: weekStart.add(7, 'day').toDate(),
  }));
  const shiftBlocks = buildWeeklyShiftBlocks(weekStart);
  const groupedShiftBlocks = [
    {
      id: 'track-day',
      track: 'day',
      children: shiftBlocks.filter(
        (block) =>
          block.label?.includes(' Day ') ||
          block.label?.includes(' Support ') ||
          block.label?.includes(' OT ')
      ),
    },
    {
      id: 'track-evening',
      track: 'evening',
      children: shiftBlocks.filter((block) =>
        block.label?.includes(' Evening ')
      ),
    },
    {
      id: 'track-night',
      track: 'night',
      children: shiftBlocks.filter((block) => block.label?.includes(' Night ')),
    },
  ];

  return (
    <Provider>
      <VStack align="stretch" gap={4} p={4}>
        <Text fontSize="lg" fontWeight="bold">
          Shift Management Viewport
        </Text>
        <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
          Weekly shift planning with jittered start/end times, day-off gaps, OT
          extensions, overlap, and multi-track packing.
        </Text>

        <TimeRangeZoom
          range={viewport}
          onRangeChange={setViewport}
          minDurationMs={30 * 60 * 1000}
          maxDurationMs={14 * 24 * 60 * 60 * 1000}
          zoomFactor={2}
        />

        <HStack>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport((prev) => ({
                start: dayjs(prev.start).subtract(1, 'day').toDate(),
                end: dayjs(prev.end).subtract(1, 'day').toDate(),
              }))
            }
          >
            Shift Left 1d
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport((prev) => ({
                start: dayjs(prev.start).add(1, 'day').toDate(),
                end: dayjs(prev.end).add(1, 'day').toDate(),
              }))
            }
          >
            Shift Right 1d
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: weekStart.toDate(),
                end: weekStart.add(7, 'day').toDate(),
              })
            }
          >
            Full Week
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: dayjs().startOf('day').toDate(),
                end: dayjs().startOf('day').add(1, 'day').toDate(),
              })
            }
          >
            Today 24h
          </Button>
        </HStack>

        <Box
          p={3}
          borderWidth="1px"
          borderRadius="md"
          bg="gray.50"
          _dark={{ bg: 'gray.800' }}
          position="relative"
        >
          <TimeViewportRoot
            viewportStart={viewport.start}
            viewportEnd={viewport.end}
            onViewportChange={setViewport}
            enableDragPan={true}
            enableCtrlWheelZoom={true}
          >
            <TimeViewportHeader tickCount={8} />
            <Box position="relative">
              <TimeViewportGrid tickCount={8} minorDivisions={2} />
              <TimeViewportBlocks
                blocks={groupedShiftBlocks}
                height="30px"
                allowOverlap={true}
                gap={2}
                renderTrackPrefix={({ trackBlocks }) => (
                  <Text
                    fontSize="xs"
                    color="gray.600"
                    _dark={{ color: 'gray.300' }}
                  >
                    {String(trackBlocks[0]?.track ?? '').toUpperCase()}
                  </Text>
                )}
              />
              <TimeViewportMarkerLine
                timestamp={weekStart.add(2, 'day').add(15, 'hour').toDate()}
                label="Wed Handover 15:00"
                colorPalette="red"
              />
              <TimeViewportMarkerLine
                timestamp={dayjs().toDate()}
                label="Now"
                colorPalette="green"
              />
            </Box>
          </TimeViewportRoot>
        </Box>
      </VStack>
    </Provider>
  );
};

export const ShiftManagementViewport: Story = {
  name: 'Shift Management Viewport',
  args: {
    ...requiredStoryArgs,
  },
  render: () => <ShiftManagementViewportDemo />,
};

const ShiftManagementByPersonViewportDemo = () => {
  const weekStart = dayjs().startOf('week');
  const [viewport, setViewport] = useState(() => ({
    start: weekStart.toDate(),
    end: weekStart.add(7, 'day').toDate(),
  }));
  const shiftsByPerson = buildWeeklyShiftBlocksByPerson(weekStart);

  return (
    <Provider>
      <VStack align="stretch" gap={4} p={4}>
        <Text fontSize="lg" fontWeight="bold">
          Shift Management by Person Viewport
        </Text>
        <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
          Per-person rows using one shared viewport for weekly shift planning.
        </Text>

        <TimeRangeZoom
          range={viewport}
          onRangeChange={setViewport}
          minDurationMs={30 * 60 * 1000}
          maxDurationMs={14 * 24 * 60 * 60 * 1000}
          zoomFactor={2}
        />

        <HStack>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport((prev) => ({
                start: dayjs(prev.start).subtract(1, 'day').toDate(),
                end: dayjs(prev.end).subtract(1, 'day').toDate(),
              }))
            }
          >
            Shift Left 1d
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport((prev) => ({
                start: dayjs(prev.start).add(1, 'day').toDate(),
                end: dayjs(prev.end).add(1, 'day').toDate(),
              }))
            }
          >
            Shift Right 1d
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: weekStart.toDate(),
                end: weekStart.add(7, 'day').toDate(),
              })
            }
          >
            Full Week
          </Button>
        </HStack>

        <VStack align="stretch" gap={2}>
          {shiftsByPerson.map((entry) => (
            <Box
              key={entry.person}
              p={2}
              borderWidth="1px"
              borderRadius="md"
              bg="gray.50"
              _dark={{ bg: 'gray.800' }}
            >
              <Text fontSize="sm" fontWeight="semibold" mb={2}>
                {entry.person}
              </Text>
              <Box position="relative">
                <TimeViewportRoot
                  viewportStart={viewport.start}
                  viewportEnd={viewport.end}
                  onViewportChange={setViewport}
                  enableDragPan={true}
                  enableCtrlWheelZoom={true}
                >
                  <TimeViewportHeader tickCount={8} />
                  <Box position="relative">
                    <TimeViewportGrid tickCount={8} minorDivisions={2} />
                    <TimeViewportBlocks
                      blocks={entry.blocks}
                      height="26px"
                      allowOverlap={true}
                      gap={1}
                      renderTrackPrefix={({ trackIndex }) => (
                        <Text
                          fontSize="xs"
                          color="gray.600"
                          _dark={{ color: 'gray.300' }}
                        >
                          T{trackIndex + 1}
                        </Text>
                      )}
                      renderTrackSuffix={({ trackBlocks }) => (
                        <Text
                          fontSize="xs"
                          color="gray.600"
                          _dark={{ color: 'gray.300' }}
                        >
                          {trackBlocks.length} blocks
                        </Text>
                      )}
                    />
                    <TimeViewportMarkerLine
                      timestamp={dayjs().toDate()}
                      label="Now"
                      colorPalette="green"
                    />
                  </Box>
                </TimeViewportRoot>
              </Box>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Provider>
  );
};

export const ShiftManagementByPersonViewport: Story = {
  name: 'Shift Management By Person Viewport',
  args: {
    ...requiredStoryArgs,
  },
  render: () => <ShiftManagementByPersonViewportDemo />,
};

const RoomBookingViewportDemo = () => {
  const dayStart = dayjs().startOf('day');
  const [viewport, setViewport] = useState(() => ({
    start: dayStart.hour(8).toDate(),
    end: dayStart.hour(20).toDate(),
  }));
  const [hideEmptyTracks, setHideEmptyTracks] = useState(true);

  const ROOM_COUNT = 120;
  const palettes = [
    'blue',
    'teal',
    'cyan',
    'purple',
    'pink',
    'orange',
    'green',
    'red',
  ] as const;
  const residentNames = [
    'Alex Lee',
    'Morgan Chan',
    'Samir Patel',
    'Olivia Wong',
    'Noah Kim',
    'Ava Chen',
    'Ethan Ng',
    'Mia Lau',
    'Lucas Ho',
    'Zoe Lim',
    'Ryan Cheung',
    'Emma Yip',
  ] as const;
  const roomTracks = Array.from({ length: ROOM_COUNT }, (_, roomIndex) => {
    const roomNo = String(roomIndex + 1).padStart(3, '0');
    const bookingCount = 3 + (roomIndex % 4); // 3-6 bookings
    const children = Array.from({ length: bookingCount }, (_, bookingIndex) => {
      const startMinute = 8 * 60 + bookingIndex * 95 + (roomIndex % 5) * 10;
      const durationMin = 45 + ((roomIndex + bookingIndex) % 5) * 15;
      const overlapOffset = bookingIndex % 2 === 0 ? 0 : (roomIndex % 3) * 10;
      const start = dayStart
        .hour(0)
        .minute(0)
        .add(startMinute - overlapOffset, 'minute');
      const end = start.add(durationMin, 'minute');

      return {
        id: `room-${roomNo}-booking-${bookingIndex + 1}`,
        start: start.toDate(),
        end: end.toDate(),
        label:
          residentNames[(roomIndex * 3 + bookingIndex) % residentNames.length],
        colorPalette: palettes[(roomIndex + bookingIndex) % palettes.length],
      };
    });

    return {
      id: `room-${roomNo}`,
      track: `Room ${roomNo}`,
      children,
    };
  });

  return (
    <Provider>
      <VStack align="stretch" gap={4} p={4}>
        <Text fontSize="lg" fontWeight="bold">
          Room Booking Viewport
        </Text>
        <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
          Booking board grouped by room with overlap, markers, shared viewport
          controls, and 120 generated hotel rooms.
        </Text>

        <TimeRangeZoom
          range={viewport}
          onRangeChange={setViewport}
          minDurationMs={15 * 60 * 1000}
          maxDurationMs={24 * 60 * 60 * 1000}
          zoomFactor={1.5}
        />

        <HStack>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport((prev) => ({
                start: dayjs(prev.start).subtract(1, 'hour').toDate(),
                end: dayjs(prev.end).subtract(1, 'hour').toDate(),
              }))
            }
          >
            Shift Left 1h
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport((prev) => ({
                start: dayjs(prev.start).add(1, 'hour').toDate(),
                end: dayjs(prev.end).add(1, 'hour').toDate(),
              }))
            }
          >
            Shift Right 1h
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: dayStart.hour(8).toDate(),
                end: dayStart.hour(20).toDate(),
              })
            }
          >
            Business Hours
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setHideEmptyTracks((prev) => !prev)}
          >
            Hide Empty Tracks: {hideEmptyTracks ? 'On' : 'Off'}
          </Button>
        </HStack>

        <Box
          p={3}
          borderWidth="1px"
          borderRadius="md"
          bg="gray.50"
          _dark={{ bg: 'gray.800' }}
          position="relative"
        >
          <TimeViewportRoot
            viewportStart={viewport.start}
            viewportEnd={viewport.end}
            onViewportChange={setViewport}
            enableDragPan={true}
            enableCtrlWheelZoom={true}
          >
            <TimeViewportHeader tickCount={9} />
            <Box position="relative">
              <TimeViewportGrid tickCount={9} minorDivisions={2} />
              <TimeViewportBlocks
                blocks={roomTracks}
                allowOverlap={true}
                overlapOpacity={0.95}
                hideEmptyTracks={hideEmptyTracks}
                height="32px"
                gap={2}
                renderTrackPrefix={({ trackBlocks, trackKey }) => (
                  <Text
                    minW="56px"
                    fontSize="xs"
                    fontWeight="semibold"
                    color="gray.700"
                    _dark={{ color: 'gray.200' }}
                  >
                    {String(trackKey ?? trackBlocks[0]?.track ?? '')}
                  </Text>
                )}
              />
              <TimeViewportMarkerLine
                timestamp={dayStart.hour(12).toDate()}
                label="Noon"
                colorPalette="red"
              />
              <TimeViewportMarkerLine
                timestamp={dayjs().toDate()}
                label="Now"
                colorPalette="green"
              />
            </Box>
          </TimeViewportRoot>
        </Box>
      </VStack>
    </Provider>
  );
};

export const RoomBookingViewport: Story = {
  name: 'Room Booking Viewport',
  args: {
    ...requiredStoryArgs,
  },
  render: () => <RoomBookingViewportDemo />,
};
