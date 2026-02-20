import {
  TimeRangeZoom,
  TimeViewportRoot,
  TimeViewportBlock,
  TimeViewportBlocks,
  TimeViewportGrid,
  TimeViewportHeader,
  TimeViewportMarkerLine,
  useTimeViewport,
  useTimeViewportBlockGeometry,
  useTimeRangeZoom,
} from '@/components/DatePicker/TimeRangeZoom';
import DatePicker from '@/components/DatePicker/DatePicker';
import { Avatar, AvatarGroup } from '@/components/ui/avatar';
import { Provider } from '@/components/ui/provider';
import {
  Badge,
  Box,
  Button,
  Card,
  ChakraProvider,
  Flex,
  HStack,
  Heading,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react';
import { system } from '../theme';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

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

const HeadlessTimeRangeZoomDemo = (props: {
  minDurationMs?: number;
  maxDurationMs?: number;
  zoomFactor?: number;
  disabled?: boolean;
  labels?: React.ComponentProps<typeof TimeRangeZoom>['labels'];
}) => {
  const [range, setRange] = useState({
    start: dayjs().subtract(4, 'hour').toDate(),
    end: dayjs().toDate(),
  });

  const {
    labels,
    canZoomIn,
    canZoomOut,
    visibleRangeText,
    durationText,
    zoomIn,
    zoomOut,
    reset,
  } = useTimeRangeZoom({
    range,
    onRangeChange: setRange,
    minDurationMs: props.minDurationMs,
    maxDurationMs: props.maxDurationMs,
    zoomFactor: props.zoomFactor,
    disabled: props.disabled,
    labels: props.labels,
  });

  return (
    <Provider>
      <VStack align="stretch" gap={4} p={4}>
        <Text fontSize="lg" fontWeight="bold">
          Headless Hook Usage
        </Text>
        <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
          This story does not render the TimeRangeZoom component. The UI below
          is fully custom and powered only by useTimeRangeZoom.
        </Text>

        <HStack gap={2}>
          <Button
            size="sm"
            variant="outline"
            onClick={zoomOut}
            disabled={!canZoomOut}
          >
            {labels.zoomOut}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={zoomIn}
            disabled={!canZoomIn}
          >
            {labels.zoomIn}
          </Button>
          <Button size="sm" variant="ghost" colorPalette="blue" onClick={reset}>
            {labels.reset}
          </Button>
        </HStack>

        <Box
          p={3}
          borderWidth="1px"
          borderRadius="md"
          bg="gray.50"
          _dark={{ bg: 'gray.800' }}
        >
          <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.200' }}>
            {labels.visibleRange}: {visibleRangeText}
          </Text>
          <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.200' }}>
            {labels.duration}: {durationText}
          </Text>
        </Box>

        <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.200' }}>
          Internal range state:{' '}
          {dayjs(range.start).format('YYYY-MM-DD HH:mm:ss')} -{' '}
          {dayjs(range.end).format('YYYY-MM-DD HH:mm:ss')}
        </Text>
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

export const HeadlessHookOnly: Story = {
  name: 'Headless Hook Only',
  args: {
    ...requiredStoryArgs,
    minDurationMs: 5 * 60 * 1000,
    maxDurationMs: 7 * 24 * 60 * 60 * 1000,
    zoomFactor: 1.8,
    disabled: false,
  },
  render: (args) => (
    <HeadlessTimeRangeZoomDemo
      minDurationMs={args.minDurationMs}
      maxDurationMs={args.maxDurationMs}
      zoomFactor={args.zoomFactor}
      disabled={args.disabled}
      labels={args.labels}
    />
  ),
};

const HeadlessViewportBlockGeometryDemo = () => {
  const [viewport, setViewport] = useState({
    start: dayjs().subtract(6, 'hour').toDate(),
    end: dayjs().toDate(),
  });
  const { getGeometry, toTimeMs } = useTimeViewportBlockGeometry(
    viewport.start,
    viewport.end
  );
  const { isValidViewport, getTicks } = useTimeViewport(
    viewport.start,
    viewport.end
  );
  const headerTicks = getTicks({ tickStrategy: 'count', tickCount: 8 });
  const safeHeaderTickCount = headerTicks.length;

  const customBlocks = [
    {
      id: 'custom-ingest',
      track: 'Pipeline A',
      label: 'Ingest',
      colorPalette: 'purple',
      geometry: getGeometry(
        dayjs().subtract(5, 'hour').toDate(),
        dayjs().subtract(2, 'hour').toDate()
      ),
    },
    {
      id: 'custom-transform',
      track: 'Pipeline A',
      label: 'Transform',
      colorPalette: 'orange',
      geometry: getGeometry(
        dayjs().subtract(3, 'hour').toDate(),
        dayjs().subtract(30, 'minute').toDate()
      ),
    },
    {
      id: 'custom-publish',
      track: 'Pipeline B',
      label: 'Publish',
      colorPalette: 'green',
      geometry: getGeometry(
        dayjs().subtract(90, 'minute').toDate(),
        dayjs().add(30, 'minute').toDate()
      ),
    },
    {
      id: 'custom-validate',
      track: 'Pipeline B',
      label: 'Validate',
      colorPalette: 'blue',
      geometry: getGeometry(
        dayjs().subtract(4, 'hour').toDate(),
        dayjs().subtract(45, 'minute').toDate()
      ),
    },
  ];
  const trackNames = Array.from(
    new Set(customBlocks.map((block) => block.track))
  );
  const customMarkers = [
    {
      id: 'marker-now',
      label: 'Now',
      timestamp: dayjs().toDate(),
      colorPalette: 'red',
    },
    {
      id: 'marker-cutoff',
      label: 'Cutoff',
      timestamp: dayjs().subtract(2, 'hour').toDate(),
      colorPalette: 'blue',
    },
  ];
  const viewportStartMs = toTimeMs(viewport.start);
  const viewportEndMs = toTimeMs(viewport.end);
  const viewportDurationMs =
    viewportStartMs !== null &&
    viewportEndMs !== null &&
    viewportEndMs > viewportStartMs
      ? viewportEndMs - viewportStartMs
      : null;
  const markerPositions = customMarkers
    .map((marker) => {
      const markerMs = toTimeMs(marker.timestamp);
      if (
        markerMs === null ||
        viewportStartMs === null ||
        viewportDurationMs === null
      ) {
        return null;
      }
      const rawPercent =
        ((markerMs - viewportStartMs) / viewportDurationMs) * 100;
      if (rawPercent < 0 || rawPercent > 100) return null;
      return {
        ...marker,
        percent: Math.min(Math.max(rawPercent, 0), 100),
      };
    })
    .filter((marker): marker is NonNullable<typeof marker> => marker !== null);

  return (
    <Provider>
      <VStack align="stretch" gap={4} p={4}>
        <Heading size="md">Headless Viewport Block Geometry</Heading>
        <Text color="fg.muted" fontSize="sm">
          This timeline is rendered with plain Chakra components using
          useTimeViewport only.
        </Text>

        <TimeRangeZoom
          range={viewport}
          onRangeChange={setViewport}
          minDurationMs={5 * 60 * 1000}
          maxDurationMs={7 * 24 * 60 * 60 * 1000}
          zoomFactor={1.6}
        />

        <Card.Root variant="outline">
          <Card.Body gap={0} p={3}>
            {isValidViewport && safeHeaderTickCount >= 2 ? (
              <>
                <Box position="relative" width="100%" height="24px">
                  {headerTicks.map((tick) => (
                    <Box
                      key={`headless-header-tick-${tick.index}`}
                      position="absolute"
                      inset={0}
                      transform={`translateX(${tick.percent}%)`}
                    >
                      <Text
                        position="absolute"
                        insetInlineStart={0}
                        top="50%"
                        translate="0 -50%"
                        transform={
                          tick.index === 0
                            ? 'translateX(0%)'
                            : tick.index === safeHeaderTickCount - 1
                              ? 'translateX(-100%)'
                              : 'translateX(-50%)'
                        }
                        fontSize="xs"
                        color="fg.muted"
                        whiteSpace="nowrap"
                      >
                        {tick.label}
                      </Text>
                    </Box>
                  ))}
                </Box>
                <Separator mb={2} />
              </>
            ) : null}

            <VStack align="stretch" gap={2}>
              {trackNames.map((trackName, trackIndex) => (
                <Flex key={trackName} align="stretch" gap={2}>
                  <Badge
                    variant="outline"
                    alignSelf="center"
                    minW="88px"
                    textAlign="center"
                  >
                    {trackName}
                  </Badge>
                  <Box position="relative" flex="1" height="34px">
                    {markerPositions.map((marker) => (
                      <Box
                        key={`${trackName}-${marker.id}`}
                        position="absolute"
                        inset={0}
                        transform={`translateX(${marker.percent}%)`}
                        pointerEvents="none"
                        zIndex={5}
                        colorPalette={marker.colorPalette}
                      >
                        <Box
                          position="absolute"
                          insetInlineStart={0}
                          top={0}
                          bottom={0}
                          width="2px"
                          bg="colorPalette.500"
                          _dark={{ bg: 'colorPalette.300' }}
                          transform="translateX(-50%)"
                        />
                        {trackIndex === 0 ? (
                          <Text
                            position="absolute"
                            insetInlineStart={0}
                            top="-18px"
                            transform="translateX(-50%)"
                            fontSize="2xs"
                            color="colorPalette.600"
                            _dark={{ color: 'colorPalette.300' }}
                            whiteSpace="nowrap"
                          >
                            {marker.label}
                          </Text>
                        ) : null}
                      </Box>
                    ))}
                    {customBlocks
                      .filter((block) => block.track === trackName)
                      .map((block) =>
                        block.geometry.valid &&
                        block.geometry.widthPercent > 0 ? (
                          <Box
                            key={block.id}
                            position="absolute"
                            inset={0}
                            pointerEvents="none"
                            colorPalette={block.colorPalette}
                          >
                            <Box
                              width="100%"
                              height="100%"
                              transform={`translateX(${block.geometry.leftPercent}%)`}
                            >
                              <Box
                                width={`max(${block.geometry.widthPercent}%, 2px)`}
                                height="100%"
                                borderRadius="sm"
                                bg="colorPalette.500"
                                _dark={{ bg: 'colorPalette.300' }}
                                display="flex"
                                alignItems="center"
                                px={2}
                                overflow="hidden"
                              >
                                <Text
                                  fontSize="xs"
                                  lineClamp={1}
                                  color="white"
                                  _dark={{ color: 'gray.900' }}
                                >
                                  {block.label}
                                </Text>
                              </Box>
                            </Box>
                          </Box>
                        ) : null
                      )}
                  </Box>
                </Flex>
              ))}
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Provider>
  );
};

export const HeadlessViewportBlockHook: Story = {
  name: 'Headless Viewport Block Hook',
  args: {
    ...requiredStoryArgs,
  },
  render: () => <HeadlessViewportBlockGeometryDemo />,
};

const HeadlessClassTimetableDemo = () => {
  const [viewport, setViewport] = useState({
    start: dayjs().startOf('day').hour(8).minute(0).toDate(),
    end: dayjs().startOf('day').hour(18).minute(0).toDate(),
  });
  const [lastInteraction, setLastInteraction] = useState('None');
  const [selectedDate, setSelectedDate] = useState<Date>(dayjs().toDate());

  const {
    labels,
    canZoomIn,
    canZoomOut,
    visibleRangeText,
    durationText,
    zoomIn,
    zoomOut,
    reset,
  } = useTimeRangeZoom({
    range: viewport,
    onRangeChange: setViewport,
    minDurationMs: 15 * 60 * 1000,
    maxDurationMs: 3 * 24 * 60 * 60 * 1000,
    zoomFactor: 1.4,
    labels: {
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      reset: 'Reset Day',
      visibleRange: 'View Window',
      duration: 'Duration',
    },
  });

  const { getGeometry } = useTimeViewportBlockGeometry(
    viewport.start,
    viewport.end
  );

  const classSessions = [
    {
      id: 'math-101',
      track: 'Room 101',
      label: 'Mathematics',
      teacher: 'Ms. Nora Lee',
      students: ['Chris Wong', 'Ava Chen', 'Jay Patel', 'Ivy Lau'],
      start: dayjs().startOf('day').hour(8).minute(30).toDate(),
      end: dayjs().startOf('day').hour(10).minute(0).toDate(),
      color: 'orange.500',
      darkColor: 'orange.300',
    },
    {
      id: 'physics-101',
      track: 'Room 101',
      label: 'Physics',
      teacher: 'Mr. Noah Kim',
      students: ['Ethan Ng', 'Mia Lau', 'Ryan Cheung'],
      start: dayjs().startOf('day').hour(10).minute(30).toDate(),
      end: dayjs().startOf('day').hour(12).minute(0).toDate(),
      color: 'blue.500',
      darkColor: 'blue.300',
    },
    {
      id: 'history-204',
      track: 'Room 204',
      label: 'History',
      teacher: 'Dr. Alex Lee',
      students: ['Emma Yip', 'Olivia Wong'],
      start: dayjs().startOf('day').hour(9).minute(0).toDate(),
      end: dayjs().startOf('day').hour(10).minute(30).toDate(),
      color: 'purple.500',
      darkColor: 'purple.300',
    },
    {
      id: 'chemistry-204',
      track: 'Room 204',
      label: 'Chemistry',
      teacher: 'Ms. Samir Patel',
      students: ['Lucas Ho', 'Zoe Lim', 'Morgan Chan', 'Ava Chen'],
      start: dayjs().startOf('day').hour(13).minute(30).toDate(),
      end: dayjs().startOf('day').hour(15).minute(0).toDate(),
      color: 'green.500',
      darkColor: 'green.300',
    },
  ].map((item) => ({
    ...item,
    geometry: getGeometry(item.start, item.end),
  }));

  const tracks = Array.from(new Set(classSessions.map((item) => item.track)));
  const nowMarker = getGeometry(
    dayjs().subtract(30, 'second').toDate(),
    dayjs().add(30, 'second').toDate()
  );

  return (
    <Provider>
      <HStack align="stretch" gap={4} p={4}>
        <VStack
          align="stretch"
          gap={3}
          minW="260px"
          p={4}
          borderWidth="1px"
          borderRadius="md"
          bg="gray.50"
          _dark={{ bg: 'gray.800' }}
        >
          <Text fontSize="lg" fontWeight="bold">
            Class Timetable (Headless Hooks)
          </Text>
          <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
            Classroom lanes and student clusters powered by `useTimeRangeZoom`
            and `useTimeViewportBlockGeometry`.
          </Text>
          <Box
            p={3}
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            _dark={{ bg: 'gray.900' }}
          >
            <Text
              fontSize="xs"
              color="gray.500"
              _dark={{ color: 'gray.400' }}
              mb={2}
            >
              Navigate to Date
            </Text>
            <DatePicker
              selected={selectedDate}
              onDateSelected={({ date }) => {
                if (date) {
                  setSelectedDate(date);
                  const duration = dayjs(viewport.end).diff(
                    dayjs(viewport.start)
                  );
                  const newStart = dayjs(date)
                    .startOf('day')
                    .hour(8)
                    .minute(0)
                    .toDate();
                  const newEnd = dayjs(newStart)
                    .add(duration, 'millisecond')
                    .toDate();
                  setViewport({ start: newStart, end: newEnd });
                  setLastInteraction(
                    `Navigated to ${dayjs(date).format('MMM D, YYYY')}`
                  );
                }
              }}
              monthsToDisplay={1}
              showOutsideDays={false}
            />
          </Box>
          <HStack gap={2}>
            <Button
              size="sm"
              variant="outline"
              onClick={zoomOut}
              disabled={!canZoomOut}
            >
              {labels.zoomOut}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={zoomIn}
              disabled={!canZoomIn}
            >
              {labels.zoomIn}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              colorPalette="blue"
              onClick={reset}
            >
              {labels.reset}
            </Button>
          </HStack>
          <Box
            p={3}
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            _dark={{ bg: 'gray.900' }}
          >
            <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.400' }}>
              {labels.visibleRange}
            </Text>
            <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.200' }}>
              {visibleRangeText}
            </Text>
            <Text
              mt={2}
              fontSize="xs"
              color="gray.500"
              _dark={{ color: 'gray.400' }}
            >
              {labels.duration}
            </Text>
            <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.200' }}>
              {durationText}
            </Text>
            <Text
              mt={2}
              fontSize="xs"
              color="gray.500"
              _dark={{ color: 'gray.400' }}
            >
              Last interaction
            </Text>
            <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.200' }}>
              {lastInteraction}
            </Text>
          </Box>
        </VStack>

        <VStack
          align="stretch"
          gap={3}
          flex="1"
          p={4}
          borderWidth="1px"
          borderRadius="md"
          bg="gray.50"
          _dark={{ bg: 'gray.800' }}
        >
          <TimeViewportHeader
            viewportStart={viewport.start}
            viewportEnd={viewport.end}
            tickCount={9}
            height="24px"
          />
          {tracks.map((track) => (
            <HStack key={track} align="stretch" gap={2}>
              <Text
                minW="84px"
                fontSize="xs"
                fontWeight="semibold"
                color="gray.700"
                _dark={{ color: 'gray.200' }}
              >
                {track}
              </Text>
              <Box
                position="relative"
                flex="1"
                h="100px"
                borderWidth="1px"
                borderRadius="sm"
                bg="white"
                _dark={{ bg: 'gray.900', borderColor: 'gray.700' }}
              >
                {nowMarker.valid ? (
                  <Box
                    position="absolute"
                    inset={0}
                    transform={`translateX(${nowMarker.leftPercent}%)`}
                    pointerEvents="none"
                  >
                    <Box
                      position="absolute"
                      insetInlineStart={0}
                      top={0}
                      bottom={0}
                      width="2px"
                      bg="red.500"
                      _dark={{ bg: 'red.300' }}
                      transform="translateX(-50%)"
                    />
                  </Box>
                ) : null}
                {classSessions
                  .filter((item) => item.track === track)
                  .map((item) =>
                    item.geometry.valid && item.geometry.widthPercent > 0 ? (
                      <Box
                        key={item.id}
                        position="absolute"
                        inset={0}
                        pointerEvents="none"
                      >
                        <Box
                          width="100%"
                          height="100%"
                          transform={`translateX(${item.geometry.leftPercent}%)`}
                        >
                          <Box
                            width={`max(${item.geometry.widthPercent}%, 2px)`}
                            h="100%"
                            borderRadius="sm"
                            bg={item.color}
                            _dark={{ bg: item.darkColor }}
                            px={2}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            pointerEvents="auto"
                          >
                            <VStack align="start" gap={0} maxW="75%">
                              <Text
                                fontSize="xs"
                                lineClamp={1}
                                color="white"
                                _dark={{ color: 'gray.100' }}
                              >
                                {item.label}
                              </Text>
                              <HStack gap={1}>
                                <AvatarGroup>
                                  {item.students.slice(0, 2).map((student) => (
                                    <Avatar
                                      key={`${item.id}-${student}`}
                                      name={student}
                                      size="xs"
                                      border="1px solid"
                                      borderColor="whiteAlpha.700"
                                      cursor="pointer"
                                      onClick={() =>
                                        setLastInteraction(
                                          `${item.label}: clicked ${student}`
                                        )
                                      }
                                    />
                                  ))}
                                </AvatarGroup>
                                {item.students.length > 2 ? (
                                  <Button
                                    size="xs"
                                    variant="outline"
                                    borderColor="whiteAlpha.700"
                                    color="white"
                                    _hover={{ bg: 'whiteAlpha.200' }}
                                    _dark={{ color: 'gray.100' }}
                                    onClick={() =>
                                      setLastInteraction(
                                        `${item.label}: +${item.students.length - 2} more students`
                                      )
                                    }
                                  >
                                    + {item.students.length - 2} more
                                  </Button>
                                ) : null}
                              </HStack>
                            </VStack>
                            <Text fontSize="2xs" color="whiteAlpha.900">
                              {item.teacher}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    ) : null
                  )}
              </Box>
            </HStack>
          ))}
        </VStack>
      </HStack>
    </Provider>
  );
};

export const HeadlessHookClassTimetableLayout: Story = {
  name: 'Headless Hook Class Timetable Layout',
  args: {
    ...requiredStoryArgs,
  },
  render: () => <HeadlessClassTimetableDemo />,
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
  const [lastClickedBlock, setLastClickedBlock] = useState<string>('None');

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
            onClick={() => setLastClickedBlock('Deploy Window')}
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
          <Text
            mt={2}
            fontSize="sm"
            color="gray.700"
            _dark={{ color: 'gray.200' }}
          >
            Last clicked block: {lastClickedBlock}
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
  const [lastClickedBlock, setLastClickedBlock] = useState<string>('None');

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
            onBlockClick={(block) =>
              setLastClickedBlock(block.label ?? block.id)
            }
          />
          <TimeViewportMarkerLine
            timestamp={dayjs().subtract(100, 'minute').toDate()}
            viewportStart={viewport.start}
            viewportEnd={viewport.end}
            label="Cutoff"
            colorPalette="red"
          />
        </Box>

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
            allowOverlap={false}
            onBlockClick={(block) =>
              setLastClickedBlock(block.label ?? block.id)
            }
          />
          <TimeViewportMarkerLine
            timestamp={dayjs().subtract(100, 'minute').toDate()}
            viewportStart={viewport.start}
            viewportEnd={viewport.end}
            label="Cutoff"
            colorPalette="red"
          />
        </Box>
        <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.200' }}>
          Last clicked block: {lastClickedBlock}
        </Text>
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
  const [lastClickedBlock, setLastClickedBlock] = useState<string>('None');
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
            enableDragPan={false}
            enableCtrlWheelZoom={false}
          >
            <TimeViewportHeader tickCount={10} />
            <Box position="relative">
              <TimeViewportGrid tickCount={10} minorDivisions={2} />
              <TimeViewportBlocks
                blocks={groupedShiftBlocks}
                height="30px"
                allowOverlap={true}
                gap={2}
                onBlockClick={(block) =>
                  setLastClickedBlock(block.label ?? block.id)
                }
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
        <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.200' }}>
          Last clicked block: {lastClickedBlock}
        </Text>
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
  const [lastClickedBlock, setLastClickedBlock] = useState<string>('None');
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
                  enableDragPan={false}
                  enableCtrlWheelZoom={false}
                >
                  <TimeViewportHeader tickCount={8} />
                  <Box position="relative">
                    <TimeViewportGrid tickCount={8} minorDivisions={2} />
                    <TimeViewportBlocks
                      blocks={entry.blocks}
                      height="26px"
                      allowOverlap={true}
                      gap={1}
                      onBlockClick={(block) =>
                        setLastClickedBlock(
                          `${entry.person}: ${block.label ?? block.id}`
                        )
                      }
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
        <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.200' }}>
          Last clicked block: {lastClickedBlock}
        </Text>
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
  const [lastClickedBlock, setLastClickedBlock] = useState<string>('None');

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

        <TimeViewportRoot
          viewportStart={viewport.start}
          viewportEnd={viewport.end}
          onViewportChange={setViewport}
          enableDragPan={false}
          enableCtrlWheelZoom={false}
        >
          <TimeViewportHeader tickCount={9} />
          <TimeViewportGrid tickCount={9} minorDivisions={2} />
          <TimeViewportBlocks
            blocks={roomTracks}
            allowOverlap={true}
            overlapOpacity={0.95}
            hideEmptyTracks={hideEmptyTracks}
            height="32px"
            gap={2}
            virtualize
            virtualHeight={500}
            overscan={5}
            onBlockClick={(block) =>
              setLastClickedBlock(block.label ?? block.id)
            }
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
        </TimeViewportRoot>
        <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.200' }}>
          Last clicked block: {lastClickedBlock}
        </Text>
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

// ---------------------------------------------------------------------------
// Day View Story
// ---------------------------------------------------------------------------

type DailyEvent = {
  id: string;
  label: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  colorPalette: string;
  track: string;
};

const DAILY_EVENTS: DailyEvent[] = [
  {
    id: 'standup',
    label: 'Daily Standup',
    startHour: 9,
    startMinute: 0,
    endHour: 9,
    endMinute: 30,
    colorPalette: 'blue',
    track: 'Meetings',
  },
  {
    id: 'sprint-review',
    label: 'Sprint Review',
    startHour: 10,
    startMinute: 0,
    endHour: 11,
    endMinute: 30,
    colorPalette: 'purple',
    track: 'Meetings',
  },
  {
    id: 'lunch-sync',
    label: 'Lunch Sync',
    startHour: 12,
    startMinute: 0,
    endHour: 13,
    endMinute: 0,
    colorPalette: 'orange',
    track: 'Meetings',
  },
  {
    id: 'design-review',
    label: 'Design Review',
    startHour: 14,
    startMinute: 0,
    endHour: 15,
    endMinute: 0,
    colorPalette: 'pink',
    track: 'Meetings',
  },
  {
    id: 'retro',
    label: 'Retrospective',
    startHour: 16,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    colorPalette: 'teal',
    track: 'Meetings',
  },
  {
    id: 'coding-morning',
    label: 'Feature Development',
    startHour: 9,
    startMinute: 30,
    endHour: 12,
    endMinute: 0,
    colorPalette: 'green',
    track: 'Deep Work',
  },
  {
    id: 'coding-afternoon',
    label: 'Bug Fixes',
    startHour: 13,
    startMinute: 0,
    endHour: 14,
    endMinute: 0,
    colorPalette: 'red',
    track: 'Deep Work',
  },
  {
    id: 'code-review',
    label: 'Code Review',
    startHour: 15,
    startMinute: 0,
    endHour: 16,
    endMinute: 0,
    colorPalette: 'cyan',
    track: 'Deep Work',
  },
  {
    id: 'deploy-window',
    label: 'Deploy Window',
    startHour: 17,
    startMinute: 0,
    endHour: 18,
    endMinute: 0,
    colorPalette: 'yellow',
    track: 'Ops',
  },
  {
    id: 'monitoring',
    label: 'Post-Deploy Monitoring',
    startHour: 18,
    startMinute: 0,
    endHour: 19,
    endMinute: 30,
    colorPalette: 'orange',
    track: 'Ops',
  },
];

const DayViewDemo = () => {
  const today = dayjs().startOf('day');
  const [viewport, setViewport] = useState(() => ({
    start: today.hour(8).toDate(),
    end: today.hour(20).toDate(),
  }));

  const blocks = DAILY_EVENTS.map((event) => ({
    id: event.id,
    start: today.hour(event.startHour).minute(event.startMinute).toDate(),
    end: today.hour(event.endHour).minute(event.endMinute).toDate(),
    label: event.label,
    colorPalette: event.colorPalette,
    track: event.track,
  }));

  return (
    <Provider>
      <VStack align="stretch" gap={4} p={4}>
        <Heading size="md">Day View - Daily Schedule</Heading>
        <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
          24-hour daily view showing meetings, deep work, and ops blocks across
          tracks. Zoom in to see hourly detail or zoom out to the full day.
        </Text>

        <TimeRangeZoom
          range={viewport}
          onRangeChange={setViewport}
          minDurationMs={30 * 60 * 1000}
          maxDurationMs={24 * 60 * 60 * 1000}
          zoomFactor={1.5}
          labels={{
            dateTimeFormat: 'HH:mm',
          }}
        />

        <HStack flexWrap="wrap">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: today.hour(8).toDate(),
                end: today.hour(12).toDate(),
              })
            }
          >
            Morning (8-12)
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: today.hour(12).toDate(),
                end: today.hour(18).toDate(),
              })
            }
          >
            Afternoon (12-18)
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: today.hour(8).toDate(),
                end: today.hour(20).toDate(),
              })
            }
          >
            Business Hours (8-20)
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: today.toDate(),
                end: today.add(1, 'day').toDate(),
              })
            }
          >
            Full Day (0-24)
          </Button>
        </HStack>

        <Box
          p={3}
          borderWidth="1px"
          borderRadius="md"
          bg="gray.50"
          _dark={{ bg: 'gray.800' }}
        >
          <TimeViewportRoot
            viewportStart={viewport.start}
            viewportEnd={viewport.end}
            onViewportChange={setViewport}
            enableDragPan
            enableCtrlWheelZoom
            minDurationMs={30 * 60 * 1000}
            maxDurationMs={24 * 60 * 60 * 1000}
          >
            <TimeViewportHeader
              tickStrategy="timeUnit"
              tickUnit="hour"
              tickStep={1}
              format="HH:mm"
            />
            <Box position="relative">
              <TimeViewportGrid tickCount={13} minorDivisions={2} />
              <TimeViewportBlocks
                blocks={blocks}
                height="36px"
                gap={3}
                renderTrackPrefix={({ trackKey }) => (
                  <Text
                    minW="72px"
                    fontSize="xs"
                    fontWeight="semibold"
                    color="gray.700"
                    _dark={{ color: 'gray.200' }}
                  >
                    {String(trackKey ?? '')}
                  </Text>
                )}
              />
              <TimeViewportMarkerLine
                timestamp={today.hour(12).toDate()}
                label="Noon"
                colorPalette="orange"
              />
              <TimeViewportMarkerLine
                timestamp={dayjs().toDate()}
                label="Now"
                colorPalette="red"
              />
            </Box>
          </TimeViewportRoot>
        </Box>

        <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.400' }}>
          Drag to pan, Ctrl+scroll to zoom. Date: {today.format('YYYY-MM-DD')}
        </Text>
      </VStack>
    </Provider>
  );
};

export const DayView: Story = {
  name: 'Day View',
  args: {
    ...requiredStoryArgs,
  },
  render: () => <DayViewDemo />,
};

// ---------------------------------------------------------------------------
// Month View Story
// ---------------------------------------------------------------------------

type MonthProject = {
  id: string;
  label: string;
  startDayOffset: number;
  endDayOffset: number;
  colorPalette: string;
  track: string;
};

const MONTH_PROJECTS: MonthProject[] = [
  {
    id: 'design-phase',
    label: 'Design Phase',
    startDayOffset: 0,
    endDayOffset: 8,
    colorPalette: 'purple',
    track: 'Frontend',
  },
  {
    id: 'ui-implementation',
    label: 'UI Implementation',
    startDayOffset: 6,
    endDayOffset: 18,
    colorPalette: 'blue',
    track: 'Frontend',
  },
  {
    id: 'integration-test',
    label: 'Integration Test',
    startDayOffset: 16,
    endDayOffset: 22,
    colorPalette: 'teal',
    track: 'Frontend',
  },
  {
    id: 'api-design',
    label: 'API Design',
    startDayOffset: 1,
    endDayOffset: 5,
    colorPalette: 'orange',
    track: 'Backend',
  },
  {
    id: 'api-build',
    label: 'API Build',
    startDayOffset: 5,
    endDayOffset: 15,
    colorPalette: 'green',
    track: 'Backend',
  },
  {
    id: 'perf-optimization',
    label: 'Performance Optimization',
    startDayOffset: 14,
    endDayOffset: 20,
    colorPalette: 'red',
    track: 'Backend',
  },
  {
    id: 'db-migration',
    label: 'DB Migration',
    startDayOffset: 3,
    endDayOffset: 7,
    colorPalette: 'cyan',
    track: 'Infrastructure',
  },
  {
    id: 'ci-cd',
    label: 'CI/CD Pipeline',
    startDayOffset: 8,
    endDayOffset: 13,
    colorPalette: 'pink',
    track: 'Infrastructure',
  },
  {
    id: 'staging-deploy',
    label: 'Staging Deploy',
    startDayOffset: 18,
    endDayOffset: 21,
    colorPalette: 'yellow',
    track: 'Infrastructure',
  },
  {
    id: 'prod-release',
    label: 'Production Release',
    startDayOffset: 24,
    endDayOffset: 27,
    colorPalette: 'red',
    track: 'Infrastructure',
  },
  {
    id: 'qa-round1',
    label: 'QA Round 1',
    startDayOffset: 10,
    endDayOffset: 14,
    colorPalette: 'orange',
    track: 'QA',
  },
  {
    id: 'qa-round2',
    label: 'QA Round 2',
    startDayOffset: 19,
    endDayOffset: 24,
    colorPalette: 'purple',
    track: 'QA',
  },
  {
    id: 'uat',
    label: 'UAT',
    startDayOffset: 25,
    endDayOffset: 29,
    colorPalette: 'teal',
    track: 'QA',
  },
];

const MonthViewDemo = () => {
  const monthStart = dayjs().startOf('month');
  const monthEnd = monthStart.endOf('month');
  const [viewport, setViewport] = useState(() => ({
    start: monthStart.toDate(),
    end: monthEnd.toDate(),
  }));
  const [lastClicked, setLastClicked] = useState<string>('None');

  const blocks = MONTH_PROJECTS.map((project) => ({
    id: project.id,
    start: monthStart.add(project.startDayOffset, 'day').toDate(),
    end: monthStart.add(project.endDayOffset, 'day').toDate(),
    label: project.label,
    colorPalette: project.colorPalette,
    track: project.track,
  }));

  const milestones = [
    {
      id: 'sprint-1-end',
      label: 'Sprint 1 End',
      timestamp: monthStart.add(14, 'day').toDate(),
      colorPalette: 'blue',
    },
    {
      id: 'sprint-2-end',
      label: 'Sprint 2 End',
      timestamp: monthStart.add(28, 'day').toDate(),
      colorPalette: 'blue',
    },
    {
      id: 'release-date',
      label: 'Release Date',
      timestamp: monthStart.add(26, 'day').toDate(),
      colorPalette: 'red',
    },
  ];

  return (
    <Provider>
      <VStack align="stretch" gap={4} p={4}>
        <Heading size="md">
          Month View - Project Timeline ({monthStart.format('MMMM YYYY')})
        </Heading>
        <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
          Month-level Gantt chart showing project phases across teams. Zoom into
          specific weeks, drag to pan, or use quick-select buttons.
        </Text>

        <TimeRangeZoom
          range={viewport}
          onRangeChange={setViewport}
          minDurationMs={24 * 60 * 60 * 1000}
          maxDurationMs={60 * 24 * 60 * 60 * 1000}
          zoomFactor={2}
          labels={{
            dateTimeFormat: 'MMM D',
          }}
        />

        <HStack flexWrap="wrap">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: monthStart.toDate(),
                end: monthStart.add(7, 'day').toDate(),
              })
            }
          >
            Week 1
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: monthStart.add(7, 'day').toDate(),
                end: monthStart.add(14, 'day').toDate(),
              })
            }
          >
            Week 2
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: monthStart.add(14, 'day').toDate(),
                end: monthStart.add(21, 'day').toDate(),
              })
            }
          >
            Week 3
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: monthStart.add(21, 'day').toDate(),
                end: monthEnd.toDate(),
              })
            }
          >
            Week 4+
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: monthStart.toDate(),
                end: monthEnd.toDate(),
              })
            }
          >
            Full Month
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport((prev) => ({
                start: dayjs(prev.start).subtract(7, 'day').toDate(),
                end: dayjs(prev.end).subtract(7, 'day').toDate(),
              }))
            }
          >
            Shift Left 1w
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport((prev) => ({
                start: dayjs(prev.start).add(7, 'day').toDate(),
                end: dayjs(prev.end).add(7, 'day').toDate(),
              }))
            }
          >
            Shift Right 1w
          </Button>
        </HStack>

        <Box
          p={3}
          borderWidth="1px"
          borderRadius="md"
          bg="gray.50"
          _dark={{ bg: 'gray.800' }}
        >
          <TimeViewportRoot
            viewportStart={viewport.start}
            viewportEnd={viewport.end}
            onViewportChange={setViewport}
            enableDragPan
            enableCtrlWheelZoom
            minDurationMs={24 * 60 * 60 * 1000}
            maxDurationMs={60 * 24 * 60 * 60 * 1000}
          >
            <TimeViewportHeader
              tickStrategy="timeUnit"
              tickUnit="day"
              tickStep={1}
              format="MMM D"
            />
            <Box position="relative">
              <TimeViewportGrid tickCount={10} minorDivisions={1} />
              <TimeViewportBlocks
                blocks={blocks}
                height="32px"
                gap={3}
                onBlockClick={(block) =>
                  setLastClicked(block.label ?? block.id)
                }
                renderTrackPrefix={({ trackKey }) => (
                  <Text
                    minW="100px"
                    fontSize="xs"
                    fontWeight="semibold"
                    color="gray.700"
                    _dark={{ color: 'gray.200' }}
                  >
                    {String(trackKey ?? '')}
                  </Text>
                )}
              />
              {milestones.map((milestone) => (
                <TimeViewportMarkerLine
                  key={milestone.id}
                  timestamp={milestone.timestamp}
                  label={milestone.label}
                  colorPalette={milestone.colorPalette}
                />
              ))}
              <TimeViewportMarkerLine
                timestamp={dayjs().toDate()}
                label="Today"
                colorPalette="green"
              />
            </Box>
          </TimeViewportRoot>
        </Box>

        <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.200' }}>
          Last clicked: {lastClicked}
        </Text>
        <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.400' }}>
          Drag to pan, Ctrl+scroll to zoom. Month:{' '}
          {monthStart.format('MMMM YYYY')}
        </Text>
      </VStack>
    </Provider>
  );
};

export const MonthView: Story = {
  name: 'Month View',
  args: {
    ...requiredStoryArgs,
  },
  render: () => <MonthViewDemo />,
};

// ---------------------------------------------------------------------------
// Week View Story
// ---------------------------------------------------------------------------

type WeeklyTask = {
  id: string;
  label: string;
  dayOfWeek: number; // 0 = Sun, 1 = Mon, ...
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  colorPalette: string;
  track: string;
};

const WEEKLY_TASKS: WeeklyTask[] = [
  // Marketing
  {
    id: 'content-plan',
    label: 'Content Planning',
    dayOfWeek: 1,
    startHour: 9,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    colorPalette: 'purple',
    track: 'Marketing',
  },
  {
    id: 'social-media',
    label: 'Social Media Campaign',
    dayOfWeek: 2,
    startHour: 10,
    startMinute: 0,
    endHour: 16,
    endMinute: 0,
    colorPalette: 'pink',
    track: 'Marketing',
  },
  {
    id: 'newsletter',
    label: 'Newsletter Draft',
    dayOfWeek: 3,
    startHour: 13,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    colorPalette: 'orange',
    track: 'Marketing',
  },
  {
    id: 'analytics-review',
    label: 'Analytics Review',
    dayOfWeek: 5,
    startHour: 9,
    startMinute: 0,
    endHour: 11,
    endMinute: 30,
    colorPalette: 'teal',
    track: 'Marketing',
  },
  // Engineering
  {
    id: 'sprint-planning',
    label: 'Sprint Planning',
    dayOfWeek: 1,
    startHour: 10,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    colorPalette: 'blue',
    track: 'Engineering',
  },
  {
    id: 'feature-dev-tue',
    label: 'Feature Dev',
    dayOfWeek: 2,
    startHour: 9,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    colorPalette: 'green',
    track: 'Engineering',
  },
  {
    id: 'feature-dev-wed',
    label: 'Feature Dev',
    dayOfWeek: 3,
    startHour: 9,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    colorPalette: 'green',
    track: 'Engineering',
  },
  {
    id: 'code-review-thu',
    label: 'Code Review',
    dayOfWeek: 4,
    startHour: 9,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    colorPalette: 'cyan',
    track: 'Engineering',
  },
  {
    id: 'bugfix-thu',
    label: 'Bug Fixes',
    dayOfWeek: 4,
    startHour: 13,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    colorPalette: 'red',
    track: 'Engineering',
  },
  {
    id: 'deploy-fri',
    label: 'Release & Deploy',
    dayOfWeek: 5,
    startHour: 14,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    colorPalette: 'yellow',
    track: 'Engineering',
  },
  // Design
  {
    id: 'wireframes',
    label: 'Wireframes',
    dayOfWeek: 1,
    startHour: 13,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    colorPalette: 'purple',
    track: 'Design',
  },
  {
    id: 'mockups',
    label: 'Hi-Fi Mockups',
    dayOfWeek: 2,
    startHour: 9,
    startMinute: 0,
    endHour: 15,
    endMinute: 0,
    colorPalette: 'pink',
    track: 'Design',
  },
  {
    id: 'usability-test',
    label: 'Usability Testing',
    dayOfWeek: 3,
    startHour: 10,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    colorPalette: 'orange',
    track: 'Design',
  },
  {
    id: 'design-handoff',
    label: 'Design Handoff',
    dayOfWeek: 4,
    startHour: 14,
    startMinute: 0,
    endHour: 16,
    endMinute: 0,
    colorPalette: 'teal',
    track: 'Design',
  },
  // Standup across the week (Mon-Fri)
  ...[1, 2, 3, 4, 5].map((dow) => ({
    id: `standup-${dow}`,
    label: 'Standup',
    dayOfWeek: dow,
    startHour: 9,
    startMinute: 0,
    endHour: 9,
    endMinute: 30,
    colorPalette: 'blue' as const,
    track: 'Team',
  })),
  {
    id: 'weekly-sync',
    label: 'Weekly Sync',
    dayOfWeek: 3,
    startHour: 15,
    startMinute: 0,
    endHour: 16,
    endMinute: 0,
    colorPalette: 'purple',
    track: 'Team',
  },
  {
    id: 'retro-fri',
    label: 'Retrospective',
    dayOfWeek: 5,
    startHour: 11,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    colorPalette: 'teal',
    track: 'Team',
  },
];

const WeekViewDemo = () => {
  const weekStart = dayjs().startOf('week');
  const weekEnd = weekStart.add(7, 'day');
  const [viewport, setViewport] = useState(() => ({
    start: weekStart.toDate(),
    end: weekEnd.toDate(),
  }));
  const [lastClicked, setLastClicked] = useState<string>('None');

  const blocks = WEEKLY_TASKS.map((task) => ({
    id: task.id,
    start: weekStart
      .add(task.dayOfWeek, 'day')
      .hour(task.startHour)
      .minute(task.startMinute)
      .toDate(),
    end: weekStart
      .add(task.dayOfWeek, 'day')
      .hour(task.endHour)
      .minute(task.endMinute)
      .toDate(),
    label: task.label,
    colorPalette: task.colorPalette,
    track: task.track,
  }));

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Provider>
      <VStack align="stretch" gap={4} p={4}>
        <Heading size="md">
          Week View - Team Schedule ({weekStart.format('MMM D')} -{' '}
          {weekEnd.subtract(1, 'day').format('MMM D, YYYY')})
        </Heading>
        <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
          Weekly team schedule showing Marketing, Engineering, Design, and Team
          tracks. Zoom into individual days or pan across the week.
        </Text>

        <TimeRangeZoom
          range={viewport}
          onRangeChange={setViewport}
          minDurationMs={4 * 60 * 60 * 1000}
          maxDurationMs={14 * 24 * 60 * 60 * 1000}
          zoomFactor={2}
          labels={{
            dateTimeFormat: 'ddd MMM D HH:mm',
          }}
        />

        <HStack flexWrap="wrap">
          {dayNames.map((name, index) => (
            <Button
              key={name}
              size="sm"
              variant="outline"
              onClick={() =>
                setViewport({
                  start: weekStart.add(index, 'day').toDate(),
                  end: weekStart.add(index + 1, 'day').toDate(),
                })
              }
            >
              {name}
            </Button>
          ))}
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: weekStart.add(1, 'day').toDate(),
                end: weekStart.add(6, 'day').toDate(),
              })
            }
          >
            Mon-Fri
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: weekStart.toDate(),
                end: weekEnd.toDate(),
              })
            }
          >
            Full Week
          </Button>
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
        </HStack>

        <Box
          p={3}
          borderWidth="1px"
          borderRadius="md"
          bg="gray.50"
          _dark={{ bg: 'gray.800' }}
        >
          <TimeViewportRoot
            viewportStart={viewport.start}
            viewportEnd={viewport.end}
            onViewportChange={setViewport}
            enableDragPan
            enableCtrlWheelZoom
            minDurationMs={4 * 60 * 60 * 1000}
            maxDurationMs={14 * 24 * 60 * 60 * 1000}
          >
            <TimeViewportHeader
              tickStrategy="timeUnit"
              tickUnit="day"
              tickStep={1}
              format="ddd D"
            />
            <Box position="relative">
              <TimeViewportGrid tickCount={8} minorDivisions={4} />
              <TimeViewportBlocks
                blocks={blocks}
                height="32px"
                gap={3}
                onBlockClick={(block) =>
                  setLastClicked(block.label ?? block.id)
                }
                renderTrackPrefix={({ trackKey }) => (
                  <Text
                    minW="88px"
                    fontSize="xs"
                    fontWeight="semibold"
                    color="gray.700"
                    _dark={{ color: 'gray.200' }}
                  >
                    {String(trackKey ?? '')}
                  </Text>
                )}
              />
              <TimeViewportMarkerLine
                timestamp={dayjs().toDate()}
                label="Now"
                colorPalette="red"
              />
              {/* Weekend separator lines */}
              <TimeViewportMarkerLine
                timestamp={weekStart.add(6, 'day').toDate()}
                label="Sat"
                colorPalette="gray"
              />
              <TimeViewportMarkerLine
                timestamp={weekStart.add(0, 'day').toDate()}
                label="Sun"
                colorPalette="gray"
              />
            </Box>
          </TimeViewportRoot>
        </Box>

        <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.200' }}>
          Last clicked: {lastClicked}
        </Text>
        <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.400' }}>
          Drag to pan, Ctrl+scroll to zoom. Week of{' '}
          {weekStart.format('MMMM D, YYYY')}
        </Text>
      </VStack>
    </Provider>
  );
};

export const WeekView: Story = {
  name: 'Week View',
  args: {
    ...requiredStoryArgs,
  },
  render: () => <WeekViewDemo />,
};

// ---------------------------------------------------------------------------
// Community Centre Activity Story
// ---------------------------------------------------------------------------

type CentreActivity = {
  id: string;
  label: string;
  room: string;
  dayOfWeek: number;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  colorPalette: string;
  instructor?: string;
  capacity?: number;
};

const CENTRE_ACTIVITIES: CentreActivity[] = [
  // Main Hall
  {
    id: 'yoga-mon',
    label: 'Morning Yoga',
    room: 'Main Hall',
    dayOfWeek: 1,
    startHour: 7,
    startMinute: 0,
    endHour: 8,
    endMinute: 30,
    colorPalette: 'teal',
    instructor: 'Sarah Lin',
    capacity: 30,
  },
  {
    id: 'tai-chi-mon',
    label: 'Tai Chi',
    room: 'Main Hall',
    dayOfWeek: 1,
    startHour: 9,
    startMinute: 0,
    endHour: 10,
    endMinute: 0,
    colorPalette: 'green',
    instructor: 'Mr. Wong',
    capacity: 25,
  },
  {
    id: 'dance-mon',
    label: 'Line Dancing',
    room: 'Main Hall',
    dayOfWeek: 1,
    startHour: 14,
    startMinute: 0,
    endHour: 15,
    endMinute: 30,
    colorPalette: 'pink',
    instructor: 'Amy Cheung',
    capacity: 40,
  },
  {
    id: 'yoga-wed',
    label: 'Morning Yoga',
    room: 'Main Hall',
    dayOfWeek: 3,
    startHour: 7,
    startMinute: 0,
    endHour: 8,
    endMinute: 30,
    colorPalette: 'teal',
    instructor: 'Sarah Lin',
    capacity: 30,
  },
  {
    id: 'zumba-wed',
    label: 'Zumba',
    room: 'Main Hall',
    dayOfWeek: 3,
    startHour: 10,
    startMinute: 0,
    endHour: 11,
    endMinute: 0,
    colorPalette: 'orange',
    instructor: 'Maria Santos',
    capacity: 35,
  },
  {
    id: 'badminton-wed',
    label: 'Badminton',
    room: 'Main Hall',
    dayOfWeek: 3,
    startHour: 14,
    startMinute: 0,
    endHour: 16,
    endMinute: 0,
    colorPalette: 'blue',
    capacity: 16,
  },
  {
    id: 'yoga-fri',
    label: 'Morning Yoga',
    room: 'Main Hall',
    dayOfWeek: 5,
    startHour: 7,
    startMinute: 0,
    endHour: 8,
    endMinute: 30,
    colorPalette: 'teal',
    instructor: 'Sarah Lin',
    capacity: 30,
  },
  {
    id: 'dance-fri',
    label: 'Social Dance',
    room: 'Main Hall',
    dayOfWeek: 5,
    startHour: 19,
    startMinute: 0,
    endHour: 21,
    endMinute: 30,
    colorPalette: 'purple',
    capacity: 50,
  },
  {
    id: 'tai-chi-sat',
    label: 'Tai Chi',
    room: 'Main Hall',
    dayOfWeek: 6,
    startHour: 8,
    startMinute: 0,
    endHour: 9,
    endMinute: 30,
    colorPalette: 'green',
    instructor: 'Mr. Wong',
    capacity: 25,
  },
  // Room A
  {
    id: 'painting-mon',
    label: 'Watercolour Painting',
    room: 'Room A',
    dayOfWeek: 1,
    startHour: 10,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    colorPalette: 'purple',
    instructor: 'David Lau',
    capacity: 15,
  },
  {
    id: 'calligraphy-tue',
    label: 'Calligraphy',
    room: 'Room A',
    dayOfWeek: 2,
    startHour: 10,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    colorPalette: 'gray',
    instructor: 'Prof. Chan',
    capacity: 12,
  },
  {
    id: 'pottery-tue',
    label: 'Pottery Workshop',
    room: 'Room A',
    dayOfWeek: 2,
    startHour: 14,
    startMinute: 0,
    endHour: 16,
    endMinute: 30,
    colorPalette: 'orange',
    instructor: 'Kelly Ho',
    capacity: 10,
  },
  {
    id: 'painting-thu',
    label: 'Oil Painting',
    room: 'Room A',
    dayOfWeek: 4,
    startHour: 10,
    startMinute: 0,
    endHour: 12,
    endMinute: 30,
    colorPalette: 'purple',
    instructor: 'David Lau',
    capacity: 12,
  },
  {
    id: 'craft-sat',
    label: 'Kids Craft',
    room: 'Room A',
    dayOfWeek: 6,
    startHour: 10,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    colorPalette: 'yellow',
    capacity: 20,
  },
  // Room B
  {
    id: 'piano-mon',
    label: 'Piano Class',
    room: 'Room B',
    dayOfWeek: 1,
    startHour: 15,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    colorPalette: 'blue',
    instructor: 'Ms. Tam',
    capacity: 8,
  },
  {
    id: 'guitar-tue',
    label: 'Guitar Class',
    room: 'Room B',
    dayOfWeek: 2,
    startHour: 18,
    startMinute: 0,
    endHour: 19,
    endMinute: 30,
    colorPalette: 'red',
    instructor: 'Jake Ng',
    capacity: 10,
  },
  {
    id: 'choir-wed',
    label: 'Community Choir',
    room: 'Room B',
    dayOfWeek: 3,
    startHour: 19,
    startMinute: 0,
    endHour: 21,
    endMinute: 0,
    colorPalette: 'cyan',
    instructor: 'Ms. Lee',
    capacity: 30,
  },
  {
    id: 'piano-thu',
    label: 'Piano Class',
    room: 'Room B',
    dayOfWeek: 4,
    startHour: 15,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    colorPalette: 'blue',
    instructor: 'Ms. Tam',
    capacity: 8,
  },
  {
    id: 'band-sat',
    label: 'Youth Band',
    room: 'Room B',
    dayOfWeek: 6,
    startHour: 14,
    startMinute: 0,
    endHour: 17,
    endMinute: 0,
    colorPalette: 'red',
    capacity: 15,
  },
  // Kitchen
  {
    id: 'cooking-tue',
    label: 'Cooking Class',
    room: 'Kitchen',
    dayOfWeek: 2,
    startHour: 10,
    startMinute: 0,
    endHour: 12,
    endMinute: 30,
    colorPalette: 'orange',
    instructor: 'Chef Ho',
    capacity: 12,
  },
  {
    id: 'baking-thu',
    label: 'Baking Workshop',
    room: 'Kitchen',
    dayOfWeek: 4,
    startHour: 10,
    startMinute: 0,
    endHour: 13,
    endMinute: 0,
    colorPalette: 'yellow',
    instructor: 'Chef Ho',
    capacity: 10,
  },
  {
    id: 'cooking-sat',
    label: 'Kids Cooking',
    room: 'Kitchen',
    dayOfWeek: 6,
    startHour: 10,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    colorPalette: 'orange',
    capacity: 8,
  },
  // Computer Room
  {
    id: 'computer-mon',
    label: 'Computer Basics',
    room: 'Computer Room',
    dayOfWeek: 1,
    startHour: 10,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    colorPalette: 'blue',
    instructor: 'Tom Yip',
    capacity: 20,
  },
  {
    id: 'smartphone-wed',
    label: 'Smartphone Workshop',
    room: 'Computer Room',
    dayOfWeek: 3,
    startHour: 10,
    startMinute: 0,
    endHour: 11,
    endMinute: 30,
    colorPalette: 'teal',
    instructor: 'Tom Yip',
    capacity: 15,
  },
  {
    id: 'coding-fri',
    label: 'Kids Coding',
    room: 'Computer Room',
    dayOfWeek: 5,
    startHour: 16,
    startMinute: 0,
    endHour: 17,
    endMinute: 30,
    colorPalette: 'green',
    capacity: 15,
  },
  // Outdoor Area
  {
    id: 'gardening-tue',
    label: 'Community Garden',
    room: 'Outdoor Area',
    dayOfWeek: 2,
    startHour: 8,
    startMinute: 0,
    endHour: 10,
    endMinute: 0,
    colorPalette: 'green',
    capacity: 20,
  },
  {
    id: 'fitness-wed',
    label: 'Outdoor Fitness',
    room: 'Outdoor Area',
    dayOfWeek: 3,
    startHour: 7,
    startMinute: 0,
    endHour: 8,
    endMinute: 0,
    colorPalette: 'red',
    instructor: 'Coach Lee',
    capacity: 25,
  },
  {
    id: 'fitness-fri',
    label: 'Outdoor Fitness',
    room: 'Outdoor Area',
    dayOfWeek: 5,
    startHour: 7,
    startMinute: 0,
    endHour: 8,
    endMinute: 0,
    colorPalette: 'red',
    instructor: 'Coach Lee',
    capacity: 25,
  },
  {
    id: 'market-sat',
    label: 'Weekend Market',
    room: 'Outdoor Area',
    dayOfWeek: 6,
    startHour: 9,
    startMinute: 0,
    endHour: 14,
    endMinute: 0,
    colorPalette: 'yellow',
    capacity: 100,
  },
];

const CommunityActivityDemo = () => {
  const weekStart = dayjs().startOf('week');
  const weekEnd = weekStart.add(7, 'day');
  const [viewport, setViewport] = useState(() => ({
    start: weekStart.add(1, 'day').toDate(),
    end: weekStart.add(6, 'day').toDate(),
  }));
  const [selectedActivity, setSelectedActivity] =
    useState<string>('Select an activity');

  const blocks = CENTRE_ACTIVITIES.map((activity) => ({
    id: activity.id,
    start: weekStart
      .add(activity.dayOfWeek, 'day')
      .hour(activity.startHour)
      .minute(activity.startMinute)
      .toDate(),
    end: weekStart
      .add(activity.dayOfWeek, 'day')
      .hour(activity.endHour)
      .minute(activity.endMinute)
      .toDate(),
    label: activity.label,
    colorPalette: activity.colorPalette,
    track: activity.room,
  }));

  const activityMap = new Map(CENTRE_ACTIVITIES.map((a) => [a.id, a]));

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Provider>
      <VStack align="stretch" gap={4} p={4}>
        <Heading size="md">Community Centre - Weekly Activities</Heading>
        <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
          Weekly timetable for a community centre showing activities across
          rooms. Click an activity to see details, zoom into a single day, or
          pan through the week.
        </Text>

        <TimeRangeZoom
          range={viewport}
          onRangeChange={setViewport}
          minDurationMs={4 * 60 * 60 * 1000}
          maxDurationMs={14 * 24 * 60 * 60 * 1000}
          zoomFactor={2}
          labels={{
            dateTimeFormat: 'ddd MMM D HH:mm',
          }}
        />

        <HStack flexWrap="wrap">
          {dayNames.map((name, index) => (
            <Button
              key={name}
              size="sm"
              variant="outline"
              onClick={() =>
                setViewport({
                  start: weekStart.add(index + 1, 'day').toDate(),
                  end: weekStart.add(index + 2, 'day').toDate(),
                })
              }
            >
              {name}
            </Button>
          ))}
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: weekStart.add(1, 'day').toDate(),
                end: weekStart.add(6, 'day').toDate(),
              })
            }
          >
            Weekdays
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: weekStart.toDate(),
                end: weekEnd.toDate(),
              })
            }
          >
            Full Week
          </Button>
        </HStack>

        <Box
          p={3}
          borderWidth="1px"
          borderRadius="md"
          bg="gray.50"
          _dark={{ bg: 'gray.800' }}
        >
          <TimeViewportRoot
            viewportStart={viewport.start}
            viewportEnd={viewport.end}
            onViewportChange={setViewport}
            minDurationMs={4 * 60 * 60 * 1000}
            maxDurationMs={14 * 24 * 60 * 60 * 1000}
          >
            <TimeViewportHeader
              tickStrategy="timeUnit"
              tickUnit="day"
              tickStep={1}
              format="ddd D"
            />
            <Box position="relative">
              <TimeViewportGrid
                tickStrategy="timeUnit"
                tickUnit="day"
                tickStep={1}
                minorDivisions={4}
              />
              <TimeViewportBlocks
                blocks={blocks}
                height="36px"
                gap={3}
                onBlockClick={(block) => {
                  const activity = activityMap.get(block.id);
                  if (activity) {
                    const day = dayNames[activity.dayOfWeek - 1] ?? '';
                    const time = `${String(activity.startHour).padStart(2, '0')}:${String(activity.startMinute).padStart(2, '0')} - ${String(activity.endHour).padStart(2, '0')}:${String(activity.endMinute).padStart(2, '0')}`;
                    setSelectedActivity(
                      `${activity.label} (${day} ${time}, ${activity.room}${activity.instructor ? `, ${activity.instructor}` : ''}, cap: ${activity.capacity ?? '—'})`
                    );
                  }
                }}
                renderTrackPrefix={({ trackKey }) => (
                  <Badge
                    variant="outline"
                    alignSelf="center"
                    minW="110px"
                    textAlign="center"
                  >
                    {String(trackKey ?? '')}
                  </Badge>
                )}
              />
              <TimeViewportMarkerLine
                timestamp={dayjs().toDate()}
                label="Now"
                colorPalette="red"
              />
            </Box>
          </TimeViewportRoot>
        </Box>

        <Box
          p={3}
          borderWidth="1px"
          borderRadius="md"
          bg="white"
          _dark={{ bg: 'gray.900' }}
        >
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color="gray.500"
            _dark={{ color: 'gray.400' }}
            mb={1}
          >
            Selected Activity
          </Text>
          <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.200' }}>
            {selectedActivity}
          </Text>
        </Box>

        <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.400' }}>
          Drag to pan, Ctrl+scroll to zoom. Week of{' '}
          {weekStart.format('MMMM D, YYYY')}
        </Text>
      </VStack>
    </Provider>
  );
};

export const CommunityActivity: Story = {
  name: 'Community Centre Activity',
  args: {
    ...requiredStoryArgs,
  },
  render: () => <CommunityActivityDemo />,
};

// ---------------------------------------------------------------------------
// Community Centre Activity – People-Based Tracks
// ---------------------------------------------------------------------------

const CommunityActivityByPersonDemo = () => {
  const weekStart = dayjs().startOf('week');
  const weekEnd = weekStart.add(7, 'day');
  const [viewport, setViewport] = useState(() => ({
    start: weekStart.add(1, 'day').toDate(),
    end: weekStart.add(6, 'day').toDate(),
  }));
  const [selectedActivity, setSelectedActivity] =
    useState<string>('Select an activity');

  // Group activities by instructor / "Open" for those without one
  const instructorMap = new Map<string, CentreActivity[]>();
  CENTRE_ACTIVITIES.forEach((activity) => {
    const person = activity.instructor ?? 'Open Session';
    const list = instructorMap.get(person) ?? [];
    list.push(activity);
    instructorMap.set(person, list);
  });

  const blocks = CENTRE_ACTIVITIES.map((activity) => ({
    id: activity.id,
    start: weekStart
      .add(activity.dayOfWeek, 'day')
      .hour(activity.startHour)
      .minute(activity.startMinute)
      .toDate(),
    end: weekStart
      .add(activity.dayOfWeek, 'day')
      .hour(activity.endHour)
      .minute(activity.endMinute)
      .toDate(),
    label: `${activity.label} (${activity.room})`,
    colorPalette: activity.colorPalette,
    track: activity.instructor ?? 'Open Session',
  }));

  const activityMap = new Map(CENTRE_ACTIVITIES.map((a) => [a.id, a]));

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Provider>
      <VStack align="stretch" gap={4} p={4}>
        <Heading size="md">Community Centre - By Instructor</Heading>
        <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
          Same activities as the room-based view, but tracks are grouped by
          instructor. Activities without an instructor appear under "Open
          Session".
        </Text>

        <TimeRangeZoom
          range={viewport}
          onRangeChange={setViewport}
          minDurationMs={4 * 60 * 60 * 1000}
          maxDurationMs={14 * 24 * 60 * 60 * 1000}
          zoomFactor={2}
          labels={{
            dateTimeFormat: 'ddd MMM D HH:mm',
          }}
        />

        <HStack flexWrap="wrap">
          {dayNames.map((name, index) => (
            <Button
              key={name}
              size="sm"
              variant="outline"
              onClick={() =>
                setViewport({
                  start: weekStart.add(index + 1, 'day').toDate(),
                  end: weekStart.add(index + 2, 'day').toDate(),
                })
              }
            >
              {name}
            </Button>
          ))}
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: weekStart.add(1, 'day').toDate(),
                end: weekStart.add(6, 'day').toDate(),
              })
            }
          >
            Weekdays
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewport({
                start: weekStart.toDate(),
                end: weekEnd.toDate(),
              })
            }
          >
            Full Week
          </Button>
        </HStack>

        <Box
          p={3}
          borderWidth="1px"
          borderRadius="md"
          bg="gray.50"
          _dark={{ bg: 'gray.800' }}
        >
          <TimeViewportRoot
            viewportStart={viewport.start}
            viewportEnd={viewport.end}
            onViewportChange={setViewport}
            minDurationMs={4 * 60 * 60 * 1000}
            maxDurationMs={14 * 24 * 60 * 60 * 1000}
          >
            <TimeViewportHeader
              tickStrategy="timeUnit"
              tickUnit="day"
              tickStep={1}
              format="ddd D"
            />
            <Box position="relative">
              <TimeViewportGrid
                tickStrategy="timeUnit"
                tickUnit="day"
                tickStep={1}
                minorDivisions={4}
              />
              <TimeViewportBlocks
                blocks={blocks}
                height="36px"
                gap={3}
                onBlockClick={(block) => {
                  const activity = activityMap.get(block.id);
                  if (activity) {
                    const day = dayNames[activity.dayOfWeek - 1] ?? '';
                    const time = `${String(activity.startHour).padStart(2, '0')}:${String(activity.startMinute).padStart(2, '0')} - ${String(activity.endHour).padStart(2, '0')}:${String(activity.endMinute).padStart(2, '0')}`;
                    setSelectedActivity(
                      `${activity.label} (${day} ${time}, ${activity.room}${activity.instructor ? `, ${activity.instructor}` : ''}, cap: ${activity.capacity ?? '—'})`
                    );
                  }
                }}
                renderTrackPrefix={({ trackKey }) => (
                  <Badge
                    variant="outline"
                    alignSelf="center"
                    minW="110px"
                    textAlign="center"
                  >
                    {String(trackKey ?? '')}
                  </Badge>
                )}
                renderTrackSuffix={({ trackBlocks }) => (
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    _dark={{ color: 'gray.400' }}
                    minW="60px"
                    textAlign="end"
                  >
                    {trackBlocks.length} class
                    {trackBlocks.length !== 1 ? 'es' : ''}
                  </Text>
                )}
              />
              <TimeViewportMarkerLine
                timestamp={dayjs().toDate()}
                label="Now"
                colorPalette="red"
              />
            </Box>
          </TimeViewportRoot>
        </Box>

        <Box
          p={3}
          borderWidth="1px"
          borderRadius="md"
          bg="white"
          _dark={{ bg: 'gray.900' }}
        >
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color="gray.500"
            _dark={{ color: 'gray.400' }}
            mb={1}
          >
            Selected Activity
          </Text>
          <Text fontSize="sm" color="gray.700" _dark={{ color: 'gray.200' }}>
            {selectedActivity}
          </Text>
        </Box>

        <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.400' }}>
          Drag to pan, Ctrl+scroll to zoom. Week of{' '}
          {weekStart.format('MMMM D, YYYY')}
        </Text>
      </VStack>
    </Provider>
  );
};

export const CommunityActivityByPerson: Story = {
  name: 'Community Centre Activity By Person',
  args: {
    ...requiredStoryArgs,
  },
  render: () => <CommunityActivityByPersonDemo />,
};

// ---------------------------------------------------------------------------
// Amusement Park Story
// ---------------------------------------------------------------------------

type ParkShow = {
  id: string;
  label: string;
  zone: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  colorPalette: string;
  type: 'show' | 'parade' | 'fireworks' | 'meet' | 'ride-maintenance';
  description?: string;
};

const PARK_SHOWS: ParkShow[] = [
  // Adventure Land
  {
    id: 'jungle-show-1',
    label: 'Jungle Explorer Show',
    zone: 'Adventure Land',
    startHour: 10,
    startMinute: 0,
    endHour: 10,
    endMinute: 45,
    colorPalette: 'green',
    type: 'show',
    description: 'Interactive jungle adventure for all ages',
  },
  {
    id: 'jungle-show-2',
    label: 'Jungle Explorer Show',
    zone: 'Adventure Land',
    startHour: 14,
    startMinute: 0,
    endHour: 14,
    endMinute: 45,
    colorPalette: 'green',
    type: 'show',
    description: 'Interactive jungle adventure for all ages',
  },
  {
    id: 'pirate-meet-1',
    label: 'Meet Captain Jack',
    zone: 'Adventure Land',
    startHour: 11,
    startMinute: 0,
    endHour: 12,
    endMinute: 0,
    colorPalette: 'orange',
    type: 'meet',
    description: 'Photo opportunity with Captain Jack',
  },
  {
    id: 'pirate-meet-2',
    label: 'Meet Captain Jack',
    zone: 'Adventure Land',
    startHour: 15,
    startMinute: 0,
    endHour: 16,
    endMinute: 0,
    colorPalette: 'orange',
    type: 'meet',
    description: 'Photo opportunity with Captain Jack',
  },
  {
    id: 'rapids-maint',
    label: 'River Rapids Maintenance',
    zone: 'Adventure Land',
    startHour: 8,
    startMinute: 0,
    endHour: 9,
    endMinute: 30,
    colorPalette: 'gray',
    type: 'ride-maintenance',
    description: 'Daily safety inspection',
  },
  // Fantasy Kingdom
  {
    id: 'princess-show-1',
    label: 'Royal Princess Ball',
    zone: 'Fantasy Kingdom',
    startHour: 11,
    startMinute: 0,
    endHour: 11,
    endMinute: 45,
    colorPalette: 'pink',
    type: 'show',
    description: 'Magical dance show with princesses',
  },
  {
    id: 'princess-show-2',
    label: 'Royal Princess Ball',
    zone: 'Fantasy Kingdom',
    startHour: 15,
    startMinute: 30,
    endHour: 16,
    endMinute: 15,
    colorPalette: 'pink',
    type: 'show',
    description: 'Magical dance show with princesses',
  },
  {
    id: 'fairy-meet',
    label: 'Meet the Fairy Queen',
    zone: 'Fantasy Kingdom',
    startHour: 12,
    startMinute: 0,
    endHour: 13,
    endMinute: 0,
    colorPalette: 'purple',
    type: 'meet',
    description: 'Enchanted photo spot',
  },
  {
    id: 'castle-light',
    label: 'Castle Light-Up',
    zone: 'Fantasy Kingdom',
    startHour: 19,
    startMinute: 0,
    endHour: 19,
    endMinute: 20,
    colorPalette: 'yellow',
    type: 'show',
    description: 'Projection mapping on the castle',
  },
  {
    id: 'carousel-maint',
    label: 'Carousel Maintenance',
    zone: 'Fantasy Kingdom',
    startHour: 8,
    startMinute: 30,
    endHour: 9,
    endMinute: 30,
    colorPalette: 'gray',
    type: 'ride-maintenance',
    description: 'Daily mechanical check',
  },
  // Sci-Fi Zone
  {
    id: 'robot-show-1',
    label: 'Robot Revolution',
    zone: 'Sci-Fi Zone',
    startHour: 10,
    startMinute: 30,
    endHour: 11,
    endMinute: 15,
    colorPalette: 'cyan',
    type: 'show',
    description: 'High-tech animatronic show',
  },
  {
    id: 'robot-show-2',
    label: 'Robot Revolution',
    zone: 'Sci-Fi Zone',
    startHour: 14,
    startMinute: 30,
    endHour: 15,
    endMinute: 15,
    colorPalette: 'cyan',
    type: 'show',
    description: 'High-tech animatronic show',
  },
  {
    id: 'space-meet',
    label: 'Meet the Astronaut',
    zone: 'Sci-Fi Zone',
    startHour: 13,
    startMinute: 0,
    endHour: 14,
    endMinute: 0,
    colorPalette: 'blue',
    type: 'meet',
    description: 'Interactive space Q&A',
  },
  {
    id: 'laser-show',
    label: 'Laser Light Spectacular',
    zone: 'Sci-Fi Zone',
    startHour: 20,
    startMinute: 0,
    endHour: 20,
    endMinute: 30,
    colorPalette: 'teal',
    type: 'show',
    description: 'Outdoor laser and music show',
  },
  {
    id: 'coaster-maint',
    label: 'Hypercoaster Maintenance',
    zone: 'Sci-Fi Zone',
    startHour: 7,
    startMinute: 30,
    endHour: 9,
    endMinute: 0,
    colorPalette: 'gray',
    type: 'ride-maintenance',
    description: 'Morning track inspection',
  },
  // Water World
  {
    id: 'dolphin-show-1',
    label: 'Dolphin Splash Show',
    zone: 'Water World',
    startHour: 11,
    startMinute: 0,
    endHour: 11,
    endMinute: 40,
    colorPalette: 'blue',
    type: 'show',
    description: 'Dolphin acrobatics and splashes',
  },
  {
    id: 'dolphin-show-2',
    label: 'Dolphin Splash Show',
    zone: 'Water World',
    startHour: 15,
    startMinute: 0,
    endHour: 15,
    endMinute: 40,
    colorPalette: 'blue',
    type: 'show',
    description: 'Dolphin acrobatics and splashes',
  },
  {
    id: 'mermaid-meet',
    label: 'Meet the Mermaids',
    zone: 'Water World',
    startHour: 12,
    startMinute: 30,
    endHour: 13,
    endMinute: 30,
    colorPalette: 'teal',
    type: 'meet',
    description: 'Poolside photo with performers',
  },
  {
    id: 'wave-pool-maint',
    label: 'Wave Pool Maintenance',
    zone: 'Water World',
    startHour: 7,
    startMinute: 0,
    endHour: 9,
    endMinute: 0,
    colorPalette: 'gray',
    type: 'ride-maintenance',
    description: 'Water quality and equipment check',
  },
  // Main Street
  {
    id: 'morning-parade',
    label: 'Morning Character Parade',
    zone: 'Main Street',
    startHour: 10,
    startMinute: 0,
    endHour: 10,
    endMinute: 30,
    colorPalette: 'orange',
    type: 'parade',
    description: 'All your favourite characters march down Main Street',
  },
  {
    id: 'afternoon-parade',
    label: 'Grand Afternoon Parade',
    zone: 'Main Street',
    startHour: 15,
    startMinute: 0,
    endHour: 15,
    endMinute: 45,
    colorPalette: 'red',
    type: 'parade',
    description: 'Floats, dancers, and music spectacular',
  },
  {
    id: 'evening-parade',
    label: 'Light-Up Night Parade',
    zone: 'Main Street',
    startHour: 19,
    startMinute: 30,
    endHour: 20,
    endMinute: 15,
    colorPalette: 'purple',
    type: 'parade',
    description: 'Illuminated floats after dark',
  },
  {
    id: 'fireworks',
    label: 'Grand Fireworks Finale',
    zone: 'Main Street',
    startHour: 20,
    startMinute: 30,
    endHour: 21,
    endMinute: 0,
    colorPalette: 'red',
    type: 'fireworks',
    description: 'Spectacular fireworks display to end the day',
  },
  {
    id: 'street-band-1',
    label: 'Street Band',
    zone: 'Main Street',
    startHour: 12,
    startMinute: 0,
    endHour: 12,
    endMinute: 45,
    colorPalette: 'yellow',
    type: 'show',
    description: 'Live marching band performance',
  },
  {
    id: 'street-band-2',
    label: 'Street Band',
    zone: 'Main Street',
    startHour: 17,
    startMinute: 0,
    endHour: 17,
    endMinute: 45,
    colorPalette: 'yellow',
    type: 'show',
    description: 'Live marching band performance',
  },
];

const PARK_TYPE_ICONS: Record<ParkShow['type'], string> = {
  show: '🎭',
  parade: '🎪',
  fireworks: '🎆',
  meet: '📸',
  'ride-maintenance': '🔧',
};

const PARK_ZONE_THEMES: Record<
  string,
  { gradient: string; icon: string; accent: string; accentDark: string }
> = {
  'Adventure Land': {
    gradient: 'linear-gradient(135deg, #2d6a4f, #40916c)',
    icon: '🌴',
    accent: 'green.600',
    accentDark: 'green.300',
  },
  'Fantasy Kingdom': {
    gradient: 'linear-gradient(135deg, #7b2d8e, #c77dff)',
    icon: '🏰',
    accent: 'purple.600',
    accentDark: 'purple.300',
  },
  'Sci-Fi Zone': {
    gradient: 'linear-gradient(135deg, #0077b6, #00b4d8)',
    icon: '🚀',
    accent: 'cyan.600',
    accentDark: 'cyan.300',
  },
  'Water World': {
    gradient: 'linear-gradient(135deg, #0096c7, #48cae4)',
    icon: '🌊',
    accent: 'blue.600',
    accentDark: 'blue.300',
  },
  'Main Street': {
    gradient: 'linear-gradient(135deg, #e85d04, #f48c06)',
    icon: '🎠',
    accent: 'orange.600',
    accentDark: 'orange.300',
  },
};

const AmusementParkDemo = () => {
  const today = dayjs().startOf('day');
  const [viewport, setViewport] = useState(() => ({
    start: today.hour(8).toDate(),
    end: today.hour(22).toDate(),
  }));
  const [selectedShow, setSelectedShow] = useState<{
    show: ParkShow;
    zone: (typeof PARK_ZONE_THEMES)[string];
  } | null>(null);

  const showMap = new Map(PARK_SHOWS.map((s) => [s.id, s]));

  const blocks = PARK_SHOWS.map((show) => ({
    id: show.id,
    start: today.hour(show.startHour).minute(show.startMinute).toDate(),
    end: today.hour(show.endHour).minute(show.endMinute).toDate(),
    label: `${PARK_TYPE_ICONS[show.type]} ${show.label}`,
    colorPalette: show.colorPalette,
    track: show.zone,
  }));

  return (
    <ChakraProvider value={system}>
      <VStack align="stretch" gap={0}>
        {/* Park header banner */}
        <Box px={6} py={5}>
          <Heading size="lg" letterSpacing="wide">
            🎢 Wonderland Park — Today's Schedule
          </Heading>
          <Text fontSize="sm" color="parkBannerSub" mt={1}>
            {today.format('dddd, MMMM D, YYYY')} · Park hours 08:00 – 21:30
          </Text>
        </Box>

        <VStack align="stretch" gap={4} p={5} bg="parkSurface">
          <TimeRangeZoom
            range={viewport}
            onRangeChange={setViewport}
            minDurationMs={60 * 60 * 1000}
            maxDurationMs={18 * 60 * 60 * 1000}
            zoomFactor={1.5}
            labels={{
              dateTimeFormat: 'HH:mm',
            }}
          />

          <HStack flexWrap="wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setViewport({
                  start: today.hour(8).toDate(),
                  end: today.hour(12).toDate(),
                })
              }
            >
              Morning (8-12)
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setViewport({
                  start: today.hour(12).toDate(),
                  end: today.hour(17).toDate(),
                })
              }
            >
              Afternoon (12-17)
            </Button>
            <Button
              size="sm"
              variant="outline"
              colorPalette="parkGold"
              onClick={() =>
                setViewport({
                  start: today.hour(17).toDate(),
                  end: today.hour(22).toDate(),
                })
              }
            >
              Evening (17-22)
            </Button>
            <Button
              size="sm"
              variant="outline"
              colorPalette="parkGold"
              onClick={() =>
                setViewport({
                  start: today.hour(8).toDate(),
                  end: today.hour(22).toDate(),
                })
              }
            >
              Full Day
            </Button>
          </HStack>

          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="parkCard"
            borderColor="parkCardBorder"
          >
            <Box p={3}>
              <TimeViewportRoot
                viewportStart={viewport.start}
                viewportEnd={viewport.end}
                onViewportChange={setViewport}
                minDurationMs={60 * 60 * 1000}
                maxDurationMs={18 * 60 * 60 * 1000}
              >
                <TimeViewportHeader
                  tickStrategy="timeUnit"
                  tickUnit="hour"
                  tickStep={1}
                  format="HH:mm"
                />
                <Box position="relative">
                  <TimeViewportGrid
                    tickStrategy="timeUnit"
                    tickUnit="hour"
                    tickStep={1}
                    minorDivisions={2}
                    zIndex={-1}
                  />
                  <TimeViewportBlocks
                    blocks={blocks}
                    height="100px"
                    gap={3}
                    onBlockClick={(block) => {
                      const show = showMap.get(block.id);
                      if (show) {
                        setSelectedShow({
                          show,
                          zone:
                            PARK_ZONE_THEMES[show.zone] ??
                            PARK_ZONE_THEMES['Main Street'],
                        });
                      }
                    }}
                    renderTrackPrefix={({ trackKey }) => {
                      const theme =
                        PARK_ZONE_THEMES[String(trackKey ?? '')] ??
                        PARK_ZONE_THEMES['Main Street'];
                      return (
                        <Box
                          minW="140px"
                          px={3}
                          py={1}
                          borderRadius="md"
                          bg={theme.gradient}
                          display="flex"
                          alignItems="center"
                          gap={2}
                        >
                          <Text fontSize="md">{theme.icon}</Text>
                          <Text
                            fontSize="xs"
                            fontWeight="bold"
                            color="white"
                            lineClamp={1}
                          >
                            {String(trackKey ?? '')}
                          </Text>
                        </Box>
                      );
                    }}
                    renderTrack={({ trackKey, defaultContent }) => {
                      const theme =
                        PARK_ZONE_THEMES[String(trackKey ?? '')] ??
                        PARK_ZONE_THEMES['Main Street'];
                      return (
                        <Box
                          borderRadius="md"
                          bg={{
                            base: `${theme.accent}/20`,
                            _dark: `${theme.accentDark}/20`,
                          }}
                          p={1}
                        >
                          {defaultContent}
                        </Box>
                      );
                    }}
                  />
                  <TimeViewportMarkerLine
                    timestamp={dayjs().toDate()}
                    label="Now"
                    colorPalette="red"
                  />
                </Box>
              </TimeViewportRoot>
            </Box>
          </Box>

          {/* Selected show detail card */}
          {selectedShow ? (
            <Card.Root
              variant="outline"
              overflow="hidden"
              bg="parkCard"
              borderColor="parkCardBorder"
            >
              <Box h="4px" bg={selectedShow.zone.gradient} />
              <Card.Body p={4}>
                <HStack gap={3} align="start">
                  <Text fontSize="2xl">
                    {PARK_TYPE_ICONS[selectedShow.show.type]}
                  </Text>
                  <VStack align="start" gap={1} flex="1">
                    <Heading size="sm">{selectedShow.show.label}</Heading>
                    <HStack gap={2} flexWrap="wrap">
                      <Badge
                        colorPalette={selectedShow.show.colorPalette}
                        variant="solid"
                      >
                        {selectedShow.show.zone}
                      </Badge>
                      <Badge variant="outline">
                        {selectedShow.show.type.replace('-', ' ')}
                      </Badge>
                      <Text fontSize="sm" color="parkMuted">
                        {String(selectedShow.show.startHour).padStart(2, '0')}:
                        {String(selectedShow.show.startMinute).padStart(2, '0')}
                        {' – '}
                        {String(selectedShow.show.endHour).padStart(2, '0')}:
                        {String(selectedShow.show.endMinute).padStart(2, '0')}
                      </Text>
                    </HStack>
                    {selectedShow.show.description ? (
                      <Text fontSize="sm" color="parkMuted">
                        {selectedShow.show.description}
                      </Text>
                    ) : null}
                  </VStack>
                </HStack>
              </Card.Body>
            </Card.Root>
          ) : (
            <Box
              p={3}
              borderWidth="1px"
              borderRadius="md"
              bg="parkCard"
              borderColor="parkCardBorder"
            >
              <Text fontSize="sm" color="parkMuted">
                Click on a show or activity to see details
              </Text>
            </Box>
          )}

          {/* Legend */}
          <HStack flexWrap="wrap" gap={3}>
            {Object.entries(PARK_TYPE_ICONS).map(([type, icon]) => (
              <HStack key={type} gap={1}>
                <Text fontSize="sm">{icon}</Text>
                <Text
                  fontSize="xs"
                  color="parkMuted"
                  textTransform="capitalize"
                >
                  {type.replace('-', ' ')}
                </Text>
              </HStack>
            ))}
          </HStack>

          <Text fontSize="xs" color="parkMuted">
            Drag to pan, Ctrl+scroll to zoom
          </Text>
        </VStack>
      </VStack>
    </ChakraProvider>
  );
};

export const AmusementPark: Story = {
  name: 'Amusement Park',
  args: {
    ...requiredStoryArgs,
  },
  render: () => <AmusementParkDemo />,
};

// ---------------------------------------------------------------------------
// Tracker Heatmap Story
// ---------------------------------------------------------------------------

type TrackerEventType =
  | 'geofence_enter'
  | 'geofence_exit'
  | 'speeding'
  | 'hard_brake'
  | 'idle_start'
  | 'idle_end'
  | 'ignition_on'
  | 'ignition_off'
  | 'sos'
  | 'low_battery';

interface TrackerEvent {
  id: string;
  trackerId: string;
  type: TrackerEventType;
  timestamp: Date;
  label: string;
}

interface TrackerActivitySegment {
  id: string;
  trackerId: string;
  start: Date;
  end: Date;
  /** 0–1 intensity for heatmap coloring */
  intensity: number;
  label: string;
}

interface TrackerDevice {
  id: string;
  name: string;
  icon: string;
  colorPalette: string;
}

const TRACKER_DEVICES: TrackerDevice[] = [
  {
    id: 'truck-01',
    name: 'Truck A-01',
    icon: '\uD83D\uDE9A',
    colorPalette: 'blue',
  },
  {
    id: 'truck-02',
    name: 'Truck A-02',
    icon: '\uD83D\uDE9B',
    colorPalette: 'teal',
  },
  {
    id: 'van-01',
    name: 'Van B-01',
    icon: '\uD83D\uDE90',
    colorPalette: 'orange',
  },
  {
    id: 'car-01',
    name: 'Car C-01',
    icon: '\uD83D\uDE97',
    colorPalette: 'purple',
  },
  {
    id: 'bike-01',
    name: 'Bike D-01',
    icon: '\uD83C\uDFCD\uFE0F',
    colorPalette: 'green',
  },
  {
    id: 'drone-01',
    name: 'Drone E-01',
    icon: '\uD83D\uDEE9\uFE0F',
    colorPalette: 'cyan',
  },
];

const TRACKER_EVENT_CONFIG: Record<
  TrackerEventType,
  { label: string; colorPalette: string; icon: string }
> = {
  geofence_enter: {
    label: 'Geofence Enter',
    colorPalette: 'green',
    icon: '\uD83D\uDFE2',
  },
  geofence_exit: {
    label: 'Geofence Exit',
    colorPalette: 'orange',
    icon: '\uD83D\uDFE0',
  },
  speeding: { label: 'Speeding', colorPalette: 'red', icon: '\u26A0\uFE0F' },
  hard_brake: {
    label: 'Hard Brake',
    colorPalette: 'red',
    icon: '\uD83D\uDED1',
  },
  idle_start: {
    label: 'Idle Start',
    colorPalette: 'yellow',
    icon: '\u23F8\uFE0F',
  },
  idle_end: { label: 'Idle End', colorPalette: 'blue', icon: '\u25B6\uFE0F' },
  ignition_on: {
    label: 'Ignition On',
    colorPalette: 'green',
    icon: '\uD83D\uDD11',
  },
  ignition_off: {
    label: 'Ignition Off',
    colorPalette: 'gray',
    icon: '\uD83D\uDD12',
  },
  sos: { label: 'SOS Alert', colorPalette: 'red', icon: '\uD83C\uDD98' },
  low_battery: {
    label: 'Low Battery',
    colorPalette: 'orange',
    icon: '\uD83D\uDD0B',
  },
};

const trackerStableHash = (input: string) =>
  Array.from(input).reduce(
    (acc, char, i) => acc + char.charCodeAt(0) * (i + 1),
    0
  );

const trackerSeeded = (seed: string, min: number, max: number) => {
  const value = trackerStableHash(seed) % (max - min + 1);
  return min + value;
};

const buildTrackerActivity = (
  baseDate: dayjs.Dayjs,
  device: TrackerDevice
): TrackerActivitySegment[] => {
  const segments: TrackerActivitySegment[] = [];
  // Generate activity segments across 24 hours
  let cursor = baseDate.startOf('day').add(5, 'hour'); // start at 05:00
  let segIndex = 0;

  while (cursor.isBefore(baseDate.startOf('day').add(23, 'hour'))) {
    const seed = `${device.id}-seg-${segIndex}`;
    const isActive = trackerSeeded(seed, 0, 9) > 2; // 70% chance active

    if (isActive) {
      const durationMinutes = trackerSeeded(`${seed}-dur`, 15, 120);
      const intensity = trackerSeeded(`${seed}-int`, 20, 100) / 100;
      const segEnd = cursor.add(durationMinutes, 'minute');

      segments.push({
        id: `${device.id}-activity-${segIndex}`,
        trackerId: device.id,
        start: cursor.toDate(),
        end: segEnd.toDate(),
        intensity,
        label: intensity > 0.7 ? 'High' : intensity > 0.4 ? 'Medium' : 'Low',
      });

      cursor = segEnd.add(trackerSeeded(`${seed}-gap`, 5, 45), 'minute');
    } else {
      cursor = cursor.add(trackerSeeded(`${seed}-idle`, 30, 90), 'minute');
    }
    segIndex++;
  }
  return segments;
};

const buildTrackerEvents = (
  baseDate: dayjs.Dayjs,
  device: TrackerDevice,
  segments: TrackerActivitySegment[]
): TrackerEvent[] => {
  const events: TrackerEvent[] = [];
  const eventTypes: TrackerEventType[] = Object.keys(
    TRACKER_EVENT_CONFIG
  ) as TrackerEventType[];

  // Generate ignition events at start/end of activity
  segments.forEach((seg, index) => {
    events.push({
      id: `${device.id}-ign-on-${index}`,
      trackerId: device.id,
      type: 'ignition_on',
      timestamp: seg.start,
      label: `${device.name} Ignition On`,
    });
    events.push({
      id: `${device.id}-ign-off-${index}`,
      trackerId: device.id,
      type: 'ignition_off',
      timestamp: seg.end,
      label: `${device.name} Ignition Off`,
    });

    // Random mid-segment events
    const segSeed = `${device.id}-evt-${index}`;
    const numEvents = trackerSeeded(segSeed, 0, 3);
    for (let i = 0; i < numEvents; i++) {
      const eventSeed = `${segSeed}-${i}`;
      const offsetMinutes = trackerSeeded(
        `${eventSeed}-off`,
        0,
        dayjs(seg.end).diff(dayjs(seg.start), 'minute')
      );
      const eventTypeIndex = trackerSeeded(
        `${eventSeed}-type`,
        0,
        eventTypes.length - 1
      );
      const eventType = eventTypes[eventTypeIndex];
      const config = TRACKER_EVENT_CONFIG[eventType];

      events.push({
        id: `${device.id}-mid-${index}-${i}`,
        trackerId: device.id,
        type: eventType,
        timestamp: dayjs(seg.start).add(offsetMinutes, 'minute').toDate(),
        label: `${device.name} ${config.label}`,
      });
    }
  });

  // Add a few random geofence events through the day
  const geofenceSeed = `${device.id}-geo`;
  const numGeo = trackerSeeded(geofenceSeed, 1, 4);
  for (let i = 0; i < numGeo; i++) {
    const geoHour = trackerSeeded(`${geofenceSeed}-h-${i}`, 6, 21);
    const geoMinute = trackerSeeded(`${geofenceSeed}-m-${i}`, 0, 59);
    events.push({
      id: `${device.id}-geo-enter-${i}`,
      trackerId: device.id,
      type: 'geofence_enter',
      timestamp: baseDate
        .startOf('day')
        .add(geoHour, 'hour')
        .add(geoMinute, 'minute')
        .toDate(),
      label: `${device.name} entered Zone ${i + 1}`,
    });
    events.push({
      id: `${device.id}-geo-exit-${i}`,
      trackerId: device.id,
      type: 'geofence_exit',
      timestamp: baseDate
        .startOf('day')
        .add(geoHour, 'hour')
        .add(
          geoMinute + trackerSeeded(`${geofenceSeed}-d-${i}`, 10, 60),
          'minute'
        )
        .toDate(),
      label: `${device.name} exited Zone ${i + 1}`,
    });
  }

  return events.sort(
    (a, b) => dayjs(a.timestamp).valueOf() - dayjs(b.timestamp).valueOf()
  );
};

/** Map intensity (0-1) to a heatmap background color */
const intensityToColor = (intensity: number, _dark: boolean) => {
  if (intensity > 0.8)
    return _dark ? 'rgba(239, 68, 68, 0.85)' : 'rgba(220, 38, 38, 0.8)';
  if (intensity > 0.6)
    return _dark ? 'rgba(249, 115, 22, 0.8)' : 'rgba(234, 88, 12, 0.75)';
  if (intensity > 0.4)
    return _dark ? 'rgba(234, 179, 8, 0.7)' : 'rgba(202, 138, 4, 0.65)';
  if (intensity > 0.2)
    return _dark ? 'rgba(34, 197, 94, 0.6)' : 'rgba(22, 163, 74, 0.55)';
  return _dark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(37, 99, 235, 0.45)';
};

const TrackerHeatmapDemo = () => {
  const baseDate = dayjs();
  const initialStart = baseDate.startOf('day').add(5, 'hour');
  const initialEnd = baseDate.startOf('day').add(23, 'hour');

  const [range, setRange] = useState({
    start: initialStart.toDate(),
    end: initialEnd.toDate(),
  });

  const [selectedEvent, setSelectedEvent] = useState<TrackerEvent | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<TrackerEventType>>(
    new Set()
  );

  // Build all tracker data
  const trackerData = useMemo(() => {
    return TRACKER_DEVICES.map((device) => {
      const activity = buildTrackerActivity(baseDate, device);
      const events = buildTrackerEvents(baseDate, device, activity);
      return { device, activity, events };
    });
  }, []);

  // Build heatmap blocks
  const heatmapBlocks = useMemo(() => {
    return trackerData.flatMap(({ device, activity }) =>
      activity.map((seg) => ({
        id: seg.id,
        start: seg.start,
        end: seg.end,
        label: `${seg.label} activity`,
        track: device.id,
        colorPalette: device.colorPalette,
        background: intensityToColor(seg.intensity, false),
      }))
    );
  }, [trackerData]);

  // Collect filtered events
  const filteredEvents = useMemo(() => {
    const allEvents = trackerData.flatMap(({ events }) => events);
    if (activeFilters.size === 0) return allEvents;
    return allEvents.filter((evt) => activeFilters.has(evt.type));
  }, [trackerData, activeFilters]);

  const toggleFilter = (type: TrackerEventType) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  // Count events by type
  const eventCounts = useMemo(() => {
    const counts: Partial<Record<TrackerEventType, number>> = {};
    const allEvents = trackerData.flatMap(({ events }) => events);
    allEvents.forEach((evt) => {
      counts[evt.type] = (counts[evt.type] ?? 0) + 1;
    });
    return counts;
  }, [trackerData]);

  return (
    <Provider>
      <VStack align="stretch" gap={4} p={4}>
        <VStack align="start" gap={1}>
          <Heading size="lg">Tracker Heatmap</Heading>
          <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
            Fleet activity heatmap with tracker events displayed as markers.
            Activity intensity is color-coded from cool (low) to hot (high).
          </Text>
        </VStack>

        {/* Zoom controls */}
        <TimeRangeZoom range={range} onRangeChange={setRange} />

        {/* Event type filter */}
        <VStack align="stretch" gap={2}>
          <Text fontSize="sm" fontWeight="semibold">
            Event Filters
          </Text>
          <Flex flexWrap="wrap" gap={2}>
            {(
              Object.entries(TRACKER_EVENT_CONFIG) as [
                TrackerEventType,
                (typeof TRACKER_EVENT_CONFIG)[TrackerEventType],
              ][]
            ).map(([type, config]) => {
              const isActive =
                activeFilters.size === 0 || activeFilters.has(type);
              return (
                <Button
                  key={type}
                  size="xs"
                  variant={isActive ? 'solid' : 'outline'}
                  colorPalette={config.colorPalette}
                  onClick={() => toggleFilter(type)}
                  opacity={isActive ? 1 : 0.5}
                >
                  {config.icon} {config.label}
                  {eventCounts[type] != null ? ` (${eventCounts[type]})` : ''}
                </Button>
              );
            })}
          </Flex>
        </VStack>

        {/* Heatmap timeline */}
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          bg="white"
          _dark={{ bg: 'gray.900', borderColor: 'gray.700' }}
        >
          <TimeViewportRoot
            viewportStart={range.start}
            viewportEnd={range.end}
            onViewportChange={setRange}
            enableDragPan
            enableCtrlWheelZoom
          >
            <Box px={4} pt={3}>
              <TimeViewportHeader
                tickStrategy="timeUnit"
                tickUnit="hour"
                tickStep={1}
              />
            </Box>
            <Box position="relative" px={4} pb={3}>
              <TimeViewportGrid
                tickStrategy="timeUnit"
                tickUnit="hour"
                tickStep={1}
                minorDivisions={4}
                zIndex={-1}
              />
              <TimeViewportBlocks
                blocks={heatmapBlocks}
                height="36px"
                gap={2}
                showLabel={false}
                renderTrackPrefix={({ trackKey }) => {
                  const device = TRACKER_DEVICES.find(
                    (d) => d.id === String(trackKey ?? '')
                  );
                  if (!device) return null;
                  return (
                    <Box
                      minW="120px"
                      px={2}
                      py={1}
                      borderRadius="md"
                      bg={`${device.colorPalette}.100`}
                      _dark={{ bg: `${device.colorPalette}.900` }}
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >
                      <Text fontSize="md">{device.icon}</Text>
                      <Text
                        fontSize="xs"
                        fontWeight="bold"
                        color={`${device.colorPalette}.800`}
                        _dark={{ color: `${device.colorPalette}.100` }}
                        lineClamp={1}
                      >
                        {device.name}
                      </Text>
                    </Box>
                  );
                }}
                renderBlock={({ block, geometry }) => {
                  const seg = trackerData
                    .flatMap(({ activity }) => activity)
                    .find((a) => a.id === block.id);
                  const intensity = seg?.intensity ?? 0.5;
                  return (
                    <Box
                      width={`max(${geometry.widthPercent}%, 2px)`}
                      height="100%"
                      borderRadius="sm"
                      bg={intensityToColor(intensity, false)}
                      _dark={{
                        bg: intensityToColor(intensity, true),
                      }}
                      opacity={0.9}
                    />
                  );
                }}
              />

              {/* Event markers */}
              {filteredEvents.map((evt) => {
                const config = TRACKER_EVENT_CONFIG[evt.type];
                return (
                  <TimeViewportMarkerLine
                    key={evt.id}
                    timestamp={evt.timestamp}
                    colorPalette={config.colorPalette}
                    lineWidthPx={evt.type === 'sos' ? 3 : 1}
                    label={`${config.icon} ${dayjs(evt.timestamp).format('HH:mm')}`}
                    showLabel={false}
                    hideWhenOutOfView
                  />
                );
              })}

              {/* Now line */}
              <TimeViewportMarkerLine
                timestamp={dayjs().toDate()}
                colorPalette="red"
                label="Now"
                lineWidthPx={2}
              />
            </Box>
          </TimeViewportRoot>
        </Box>

        {/* Heatmap legend */}
        <HStack gap={4} flexWrap="wrap">
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color="gray.600"
            _dark={{ color: 'gray.400' }}
          >
            Intensity:
          </Text>
          {[
            { label: 'Low', color: 'rgba(37, 99, 235, 0.45)' },
            { label: 'Light', color: 'rgba(22, 163, 74, 0.55)' },
            { label: 'Medium', color: 'rgba(202, 138, 4, 0.65)' },
            { label: 'High', color: 'rgba(234, 88, 12, 0.75)' },
            { label: 'Critical', color: 'rgba(220, 38, 38, 0.8)' },
          ].map((item) => (
            <HStack key={item.label} gap={1}>
              <Box w="16px" h="12px" borderRadius="sm" bg={item.color} />
              <Text
                fontSize="xs"
                color="gray.600"
                _dark={{ color: 'gray.400' }}
              >
                {item.label}
              </Text>
            </HStack>
          ))}
        </HStack>

        {/* Event details on marker click area */}
        <VStack align="stretch" gap={2}>
          <Text fontSize="sm" fontWeight="semibold">
            Recent Events ({filteredEvents.length})
          </Text>
          <Box
            maxH="200px"
            overflowY="auto"
            borderWidth="1px"
            borderRadius="md"
            bg="gray.50"
            _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
          >
            {filteredEvents.slice(0, 30).map((evt) => {
              const config = TRACKER_EVENT_CONFIG[evt.type];
              const device = TRACKER_DEVICES.find(
                (d) => d.id === evt.trackerId
              );
              const isSelected = selectedEvent?.id === evt.id;
              return (
                <Box
                  key={evt.id}
                  px={3}
                  py={2}
                  cursor="pointer"
                  bg={isSelected ? `${config.colorPalette}.50` : 'transparent'}
                  _dark={{
                    bg: isSelected
                      ? `${config.colorPalette}.900`
                      : 'transparent',
                  }}
                  _hover={{
                    bg: `${config.colorPalette}.50`,
                    _dark: { bg: `${config.colorPalette}.900` },
                  }}
                  borderBottomWidth="1px"
                  borderColor="gray.100"
                  _last={{ borderBottomWidth: 0 }}
                  onClick={() => {
                    setSelectedEvent(isSelected ? null : evt);
                    // Pan to event time
                    const evtTime = dayjs(evt.timestamp);
                    const currentDuration = dayjs(range.end).diff(
                      dayjs(range.start),
                      'millisecond'
                    );
                    setRange({
                      start: evtTime
                        .subtract(currentDuration / 2, 'millisecond')
                        .toDate(),
                      end: evtTime
                        .add(currentDuration / 2, 'millisecond')
                        .toDate(),
                    });
                  }}
                >
                  <HStack gap={2}>
                    <Text fontSize="sm">{config.icon}</Text>
                    <Text fontSize="xs" fontWeight="semibold" flex="1">
                      {device?.icon} {device?.name}
                    </Text>
                    <Badge
                      size="sm"
                      colorPalette={config.colorPalette}
                      variant="subtle"
                    >
                      {config.label}
                    </Badge>
                    <Text
                      fontSize="xs"
                      color="gray.500"
                      _dark={{ color: 'gray.400' }}
                      fontFamily="mono"
                    >
                      {dayjs(evt.timestamp).format('HH:mm:ss')}
                    </Text>
                  </HStack>
                </Box>
              );
            })}
          </Box>
        </VStack>

        <Text fontSize="xs" color="gray.500" _dark={{ color: 'gray.400' }}>
          Drag to pan, Ctrl+scroll to zoom. Click an event to center the
          viewport.
        </Text>
      </VStack>
    </Provider>
  );
};

export const TrackerHeatmap: Story = {
  name: 'Tracker Heatmap',
  args: {
    ...requiredStoryArgs,
  },
  render: () => <TrackerHeatmapDemo />,
};
