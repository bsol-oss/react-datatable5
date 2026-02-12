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
import { Avatar, AvatarGroup } from '@/components/ui/avatar';
import { Provider } from '@/components/ui/provider';
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Heading,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react';
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
