import {
  TimeViewportRoot,
  TimeViewportBlocks,
  TimeViewportGrid,
  TimeViewportHeader,
  TimeViewportMarkerLine,
  type TimeViewportBlockItem,
} from '@/components/DatePicker/TimeRangeZoom';
import { Provider } from '@/components/ui/provider';
import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  MdCheckCircle,
  MdAccessTime,
  MdCancel,
  MdDescription,
  MdPerson,
  MdBusiness,
} from 'react-icons/md';
import { useMemo, useState } from 'react';

dayjs.extend(relativeTime);

const meta = {
  title: 'react-datatable5/DatePicker/application-timeline',
  component: Box,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof Box>;

type Story = StoryObj<typeof meta>;

export default meta;

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'rejected';
  colorPalette: 'green' | 'blue' | 'red' | 'orange' | 'purple';
  metadata?: {
    user?: string;
    department?: string;
    documentType?: string;
  };
}

const applicationEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'Application Submitted',
    description: 'Application form completed and submitted successfully',
    timestamp: dayjs().subtract(5, 'days').toDate(),
    status: 'completed',
    colorPalette: 'blue',
    metadata: {
      user: 'John Doe',
      documentType: 'Application Form',
    },
  },
  {
    id: '2',
    title: 'Initial Review',
    description: 'Application reviewed by admissions team',
    timestamp: dayjs().subtract(4, 'days').toDate(),
    status: 'completed',
    colorPalette: 'green',
    metadata: {
      department: 'Admissions',
    },
  },
  {
    id: '3',
    title: 'Document Verification',
    description: 'All required documents verified and approved',
    timestamp: dayjs().subtract(3, 'days').toDate(),
    status: 'completed',
    colorPalette: 'green',
    metadata: {
      department: 'Verification',
      documentType: 'Academic Transcripts',
    },
  },
  {
    id: '4',
    title: 'Interview Scheduled',
    description: 'Interview scheduled for next week',
    timestamp: dayjs().subtract(2, 'days').toDate(),
    status: 'completed',
    colorPalette: 'purple',
    metadata: {
      department: 'Admissions',
    },
  },
  {
    id: '5',
    title: 'Interview Completed',
    description: 'Candidate interview completed successfully',
    timestamp: dayjs().subtract(1, 'day').toDate(),
    status: 'completed',
    colorPalette: 'green',
    metadata: {
      department: 'Admissions',
    },
  },
  {
    id: '6',
    title: 'Final Review',
    description: 'Application under final review by committee',
    timestamp: dayjs().subtract(6, 'hours').toDate(),
    status: 'pending',
    colorPalette: 'orange',
    metadata: {
      department: 'Admissions Committee',
    },
  },
  {
    id: '7',
    title: 'Decision Notification',
    description: 'Decision will be sent via email',
    timestamp: dayjs().add(1, 'day').toDate(),
    status: 'pending',
    colorPalette: 'blue',
  },
];

const getStatusIcon = (status: TimelineEvent['status']) => {
  switch (status) {
    case 'completed':
      return MdCheckCircle;
    case 'pending':
      return MdAccessTime;
    case 'rejected':
      return MdCancel;
    default:
      return MdDescription;
  }
};

// Convert timeline events to viewport blocks
const convertEventsToBlocks = (
  events: TimelineEvent[],
  blockDurationHours: number = 2
): TimeViewportBlockItem[] => {
  return events.map((event) => ({
    id: event.id,
    start: event.timestamp,
    end: dayjs(event.timestamp).add(blockDurationHours, 'hours').toDate(),
    label: event.title,
    colorPalette: event.colorPalette,
    track: event.status,
  }));
};

export const Basic: Story = {
  name: 'Basic Application Timeline',
  args: {},
  render: () => {
    const earliestEvent = applicationEvents[0];
    const latestEvent = applicationEvents[applicationEvents.length - 1];
    const [viewport, setViewport] = useState(() => ({
      start: dayjs(earliestEvent.timestamp).subtract(1, 'day').toDate(),
      end: dayjs(latestEvent.timestamp).add(2, 'days').toDate(),
    }));
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

    const blocks = useMemo(
      () => convertEventsToBlocks(applicationEvents, 4),
      []
    );

    const selectedEventData = applicationEvents.find(
      (e) => e.id === selectedEvent
    );

    return (
      <Provider>
        <VStack gap={6} align="stretch" p={6} maxW="1200px" mx="auto">
          <Heading size="lg">Application Timeline</Heading>
          <Card.Root>
            <Card.Body>
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
                  maxDurationMs={30 * 24 * 60 * 60 * 1000}
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
                      height="40px"
                      gap={2}
                      onBlockClick={(block) => setSelectedEvent(block.id)}
                      renderTrackPrefix={({ trackKey }) => (
                        <Text
                          minW="120px"
                          fontSize="xs"
                          fontWeight="semibold"
                          color="gray.700"
                          _dark={{ color: 'gray.200' }}
                        >
                          {String(trackKey ?? '').toUpperCase()}
                        </Text>
                      )}
                      renderBlock={({ block, geometry }) => {
                        const event = applicationEvents.find(
                          (e) => e.id === block.id
                        );
                        const Icon = event ? getStatusIcon(event.status) : null;
                        return (
                          <Box
                            width={`max(${geometry.widthPercent}%, 2px)`}
                            height="100%"
                            borderRadius="sm"
                            bg={`${block.colorPalette}.500`}
                            _dark={{ bg: `${block.colorPalette}.600` }}
                            display="flex"
                            alignItems="center"
                            gap={2}
                            px={2}
                            cursor="pointer"
                            _hover={{ opacity: 0.8 }}
                            position="relative"
                          >
                            {Icon && <Icon size={16} />}
                            <Text
                              fontSize="xs"
                              fontWeight="medium"
                              whiteSpace="nowrap"
                              overflow="hidden"
                              textOverflow="ellipsis"
                            >
                              {block.label}
                            </Text>
                          </Box>
                        );
                      }}
                    />
                    {applicationEvents.map((event) => (
                      <TimeViewportMarkerLine
                        key={`marker-${event.id}`}
                        timestamp={event.timestamp}
                        label={event.title}
                        colorPalette={event.colorPalette}
                        lineWidthPx={2}
                      />
                    ))}
                    <TimeViewportMarkerLine
                      timestamp={dayjs().toDate()}
                      label="Today"
                      colorPalette="green"
                      lineWidthPx={2}
                    />
                  </Box>
                </TimeViewportRoot>
              </Box>
              {selectedEventData && (
                <Box mt={4} p={4} bg="bg.subtle" borderRadius="md">
                  <HStack gap={2} mb={2} flexWrap="wrap">
                    <Text fontWeight="semibold">{selectedEventData.title}</Text>
                    <Badge
                      colorPalette={
                        selectedEventData.status === 'completed'
                          ? 'green'
                          : selectedEventData.status === 'pending'
                            ? 'orange'
                            : 'red'
                      }
                      variant="subtle"
                    >
                      {selectedEventData.status}
                    </Badge>
                  </HStack>
                  <Text fontSize="sm" color="fg.muted" mb={2}>
                    {selectedEventData.description}
                  </Text>
                  <HStack gap={4} fontSize="xs" color="fg.muted">
                    <Text>
                      {dayjs(selectedEventData.timestamp).format(
                        'MMM D, YYYY h:mm A'
                      )}
                    </Text>
                    <Text>•</Text>
                    <Text>{dayjs(selectedEventData.timestamp).fromNow()}</Text>
                  </HStack>
                  {selectedEventData.metadata && (
                    <HStack gap={3} mt={3} flexWrap="wrap">
                      {selectedEventData.metadata.user && (
                        <HStack gap={1}>
                          <MdPerson size={12} />
                          <Text fontSize="xs" color="fg.muted">
                            {selectedEventData.metadata.user}
                          </Text>
                        </HStack>
                      )}
                      {selectedEventData.metadata.department && (
                        <HStack gap={1}>
                          <MdBusiness size={12} />
                          <Text fontSize="xs" color="fg.muted">
                            {selectedEventData.metadata.department}
                          </Text>
                        </HStack>
                      )}
                      {selectedEventData.metadata.documentType && (
                        <HStack gap={1}>
                          <MdDescription size={12} />
                          <Text fontSize="xs" color="fg.muted">
                            {selectedEventData.metadata.documentType}
                          </Text>
                        </HStack>
                      )}
                    </HStack>
                  )}
                </Box>
              )}
            </Card.Body>
          </Card.Root>
        </VStack>
      </Provider>
    );
  },
};

export const GroupedByStatus: Story = {
  name: 'Grouped by Status',
  args: {},
  render: () => {
    const earliestEvent = applicationEvents[0];
    const latestEvent = applicationEvents[applicationEvents.length - 1];
    const [viewport, setViewport] = useState(() => ({
      start: dayjs(earliestEvent.timestamp).subtract(1, 'day').toDate(),
      end: dayjs(latestEvent.timestamp).add(2, 'days').toDate(),
    }));

    // Group blocks by status
    const blocksByStatus = useMemo(() => {
      const grouped: Record<string, TimeViewportBlockItem[]> = {};
      applicationEvents.forEach((event) => {
        if (!grouped[event.status]) {
          grouped[event.status] = [];
        }
        grouped[event.status].push({
          id: event.id,
          start: event.timestamp,
          end: dayjs(event.timestamp).add(4, 'hours').toDate(),
          label: event.title,
          colorPalette: event.colorPalette,
          track: event.status,
        });
      });
      return grouped;
    }, []);

    const allBlocks = Object.values(blocksByStatus).flat();

    return (
      <Provider>
        <VStack gap={6} align="stretch" p={6} maxW="1200px" mx="auto">
          <Heading size="lg">Application Timeline - Grouped by Status</Heading>
          <Card.Root>
            <Card.Body>
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
                  maxDurationMs={30 * 24 * 60 * 60 * 1000}
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
                      blocks={allBlocks}
                      height="40px"
                      gap={2}
                      renderTrackPrefix={({ trackKey }) => (
                        <Text
                          minW="120px"
                          fontSize="xs"
                          fontWeight="semibold"
                          color="gray.700"
                          _dark={{ color: 'gray.200' }}
                        >
                          {String(trackKey ?? '').toUpperCase()}
                        </Text>
                      )}
                      renderBlock={({ block, geometry }) => {
                        const event = applicationEvents.find(
                          (e) => e.id === block.id
                        );
                        const Icon = event ? getStatusIcon(event.status) : null;
                        return (
                          <Box
                            width={`max(${geometry.widthPercent}%, 2px)`}
                            height="100%"
                            borderRadius="sm"
                            bg={`${block.colorPalette}.500`}
                            _dark={{ bg: `${block.colorPalette}.600` }}
                            display="flex"
                            alignItems="center"
                            gap={2}
                            px={2}
                            cursor="pointer"
                            _hover={{ opacity: 0.8 }}
                          >
                            {Icon && <Icon size={16} />}
                            <Text
                              fontSize="xs"
                              fontWeight="medium"
                              whiteSpace="nowrap"
                              overflow="hidden"
                              textOverflow="ellipsis"
                            >
                              {block.label}
                            </Text>
                          </Box>
                        );
                      }}
                    />
                    <TimeViewportMarkerLine
                      timestamp={dayjs().toDate()}
                      label="Today"
                      colorPalette="green"
                      lineWidthPx={2}
                    />
                  </Box>
                </TimeViewportRoot>
              </Box>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Provider>
    );
  },
};

export const WithFilters: Story = {
  name: 'With Status Filters',
  args: {},
  render: () => {
    const earliestEvent = applicationEvents[0];
    const latestEvent = applicationEvents[applicationEvents.length - 1];
    const [viewport, setViewport] = useState(() => ({
      start: dayjs(earliestEvent.timestamp).subtract(1, 'day').toDate(),
      end: dayjs(latestEvent.timestamp).add(2, 'days').toDate(),
    }));
    const [filter, setFilter] = useState<
      'all' | 'completed' | 'pending' | 'rejected'
    >('all');

    const filteredEvents =
      filter === 'all'
        ? applicationEvents
        : applicationEvents.filter((e) => e.status === filter);

    const blocks = useMemo(
      () => convertEventsToBlocks(filteredEvents, 4),
      [filteredEvents]
    );

    return (
      <Provider>
        <VStack gap={6} align="stretch" p={6} maxW="1200px" mx="auto">
          <HStack justify="space-between" align="center" flexWrap="wrap">
            <Heading size="lg">Application Timeline</Heading>
            <HStack gap={2}>
              {(['all', 'completed', 'pending', 'rejected'] as const).map(
                (status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={filter === status ? 'solid' : 'outline'}
                    onClick={() => setFilter(status)}
                    textTransform="capitalize"
                  >
                    {status}
                  </Button>
                )
              )}
            </HStack>
          </HStack>
          <Card.Root>
            <Card.Body>
              <Box
                p={3}
                borderWidth="1px"
                borderRadius="md"
                bg="gray.50"
                _dark={{ bg: 'gray.800' }}
              >
                {blocks.length > 0 ? (
                  <TimeViewportRoot
                    viewportStart={viewport.start}
                    viewportEnd={viewport.end}
                    onViewportChange={setViewport}
                    enableDragPan
                    enableCtrlWheelZoom
                    minDurationMs={24 * 60 * 60 * 1000}
                    maxDurationMs={30 * 24 * 60 * 60 * 1000}
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
                        height="40px"
                        gap={2}
                        renderTrackPrefix={({ trackKey }) => (
                          <Text
                            minW="120px"
                            fontSize="xs"
                            fontWeight="semibold"
                            color="gray.700"
                            _dark={{ color: 'gray.200' }}
                          >
                            {String(trackKey ?? '').toUpperCase()}
                          </Text>
                        )}
                        renderBlock={({ block }) => {
                          const event = applicationEvents.find(
                            (e) => e.id === block.id
                          );
                          const Icon = event
                            ? getStatusIcon(event.status)
                            : null;
                          return (
                            <Box
                              width="100%"
                              height="100%"
                              borderRadius="sm"
                              bg={`${block.colorPalette}.500`}
                              _dark={{ bg: `${block.colorPalette}.600` }}
                              display="flex"
                              alignItems="center"
                              gap={2}
                              px={2}
                              cursor="pointer"
                              _hover={{ opacity: 0.8 }}
                            >
                              {Icon && <Icon size={16} />}
                              <Text
                                fontSize="xs"
                                fontWeight="medium"
                                whiteSpace="nowrap"
                                overflow="hidden"
                                textOverflow="ellipsis"
                              >
                                {block.label}
                              </Text>
                            </Box>
                          );
                        }}
                      />
                      {filteredEvents.map((event) => (
                        <TimeViewportMarkerLine
                          key={`marker-${event.id}`}
                          timestamp={event.timestamp}
                          label={event.title}
                          colorPalette={event.colorPalette}
                          lineWidthPx={2}
                        />
                      ))}
                      <TimeViewportMarkerLine
                        timestamp={dayjs().toDate()}
                        label="Today"
                        colorPalette="green"
                        lineWidthPx={2}
                      />
                    </Box>
                  </TimeViewportRoot>
                ) : (
                  <Text color="fg.muted" textAlign="center" py={8}>
                    No events found for this filter
                  </Text>
                )}
              </Box>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Provider>
    );
  },
};

export const CompactView: Story = {
  name: 'Compact View',
  args: {},
  render: () => {
    const earliestEvent = applicationEvents[0];
    const latestEvent = applicationEvents[applicationEvents.length - 1];
    const [viewport, setViewport] = useState(() => ({
      start: dayjs(earliestEvent.timestamp).subtract(1, 'day').toDate(),
      end: dayjs(latestEvent.timestamp).add(2, 'days').toDate(),
    }));

    const blocks = useMemo(
      () => convertEventsToBlocks(applicationEvents, 2),
      []
    );

    return (
      <Provider>
        <VStack gap={6} align="stretch" p={6} maxW="1200px" mx="auto">
          <Heading size="md">Compact Application Timeline</Heading>
          <Card.Root>
            <Card.Body>
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
                  maxDurationMs={30 * 24 * 60 * 60 * 1000}
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
                      height="28px"
                      gap={1}
                      renderTrackPrefix={({ trackKey }) => (
                        <Text
                          minW="100px"
                          fontSize="xs"
                          fontWeight="semibold"
                          color="gray.700"
                          _dark={{ color: 'gray.200' }}
                        >
                          {String(trackKey ?? '').toUpperCase()}
                        </Text>
                      )}
                      renderBlock={({ block }) => {
                        const event = applicationEvents.find(
                          (e) => e.id === block.id
                        );
                        const Icon = event ? getStatusIcon(event.status) : null;
                        return (
                          <Box
                            width="100%"
                            height="100%"
                            borderRadius="sm"
                            bg={`${block.colorPalette}.500`}
                            _dark={{ bg: `${block.colorPalette}.600` }}
                            display="flex"
                            alignItems="center"
                            gap={1}
                            px={1}
                            cursor="pointer"
                            _hover={{ opacity: 0.8 }}
                          >
                            {Icon && <Icon size={12} />}
                            <Text
                              fontSize="2xs"
                              fontWeight="medium"
                              whiteSpace="nowrap"
                              overflow="hidden"
                              textOverflow="ellipsis"
                            >
                              {block.label}
                            </Text>
                          </Box>
                        );
                      }}
                    />
                    <TimeViewportMarkerLine
                      timestamp={dayjs().toDate()}
                      label="Today"
                      colorPalette="green"
                      lineWidthPx={2}
                    />
                  </Box>
                </TimeViewportRoot>
              </Box>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Provider>
    );
  },
};
