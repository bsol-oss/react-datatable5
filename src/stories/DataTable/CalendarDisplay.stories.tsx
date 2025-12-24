import { Box, Flex, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  DataTable,
  DataTableServer,
  CalendarDisplay,
  useDataTable,
  useDataTableServer,
  FilterDialog,
  TableFilterTags,
  useDataTableContext,
} from '../../index';
import { Provider } from '@/components/ui/provider';
import dayjs from 'dayjs';

// Event data type
interface Event {
  id: number;
  title: string;
  date: string; // ISO date string
  description: string;
  category: 'meeting' | 'deadline' | 'event' | 'reminder';
  color?: string;
}

// Generate sample event data
const generateEvents = (count: number): Event[] => {
  const events: Event[] = [];
  const categories: Event['category'][] = [
    'meeting',
    'deadline',
    'event',
    'reminder',
  ];
  const colors = ['blue', 'green', 'orange', 'purple', 'red'];

  for (let i = 1; i <= count; i++) {
    const daysOffset = Math.floor(Math.random() * 60) - 30; // Random date within ±30 days
    const date = dayjs().add(daysOffset, 'days').toISOString();
    const category = categories[Math.floor(Math.random() * categories.length)];

    events.push({
      id: i,
      title: `Event ${i}`,
      date,
      description: `Description for event ${i}`,
      category,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  return events;
};

const eventsData = generateEvents(50);

const columnHelper = createColumnHelper<Event>();

const columns: ColumnDef<Event>[] = [
  columnHelper.accessor('id', {
    header: 'ID',
    size: 50,
  }),
  columnHelper.accessor('title', {
    header: 'Title',
    size: 200,
    meta: {
      displayName: 'Title',
      filterVariant: 'text',
    },
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    size: 150,
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    size: 120,
    meta: {
      displayName: 'Category',
      filterVariant: 'select',
      filterOptions: [
        { label: 'Meeting', value: 'meeting' },
        { label: 'Deadline', value: 'deadline' },
        { label: 'Event', value: 'event' },
        { label: 'Reminder', value: 'reminder' },
      ],
    },
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    size: 300,
    meta: {
      displayName: 'Description',
      filterVariant: 'text',
    },
  }),
];

export default {
  title: 'react-datatable5/DataTable/CalendarDisplay',
  component: CalendarDisplay,
  argTypes: {
    dateColumn: { control: { type: 'text' } },
    firstDayOfWeek: {
      control: { type: 'select', options: [0, 1, 2, 3, 4, 5, 6] },
    },
    showOutsideDays: { control: { type: 'boolean' } },
    monthsToDisplay: { control: { type: 'number', min: 1, max: 3 } },
    maxEventsPerDay: { control: { type: 'number', min: 1, max: 10 } },
    colorPalette: {
      control: {
        type: 'select',
        options: [
          'gray',
          'red',
          'orange',
          'yellow',
          'green',
          'teal',
          'blue',
          'cyan',
          'purple',
          'pink',
        ],
      },
    },
  },
};

// Client-side Calendar Story
export const ClientSideCalendar = (args: any) => {
  const datatable = useDataTable({
    default: { pagination: { pageSize: 100, pageIndex: 0 } },
  });

  return (
    <Provider>
      <Box padding={4}>
        <DataTable columns={columns} data={eventsData} {...datatable}>
          <CalendarDisplay
            dateColumn="date"
            getEventTitle={(row: Event) => row.title}
            getEventColor={(row: Event) => row.color}
            onDateClick={(date, events) => {
              console.log('Date clicked:', date, events);
            }}
            onEventClick={(event) => {
              console.log('Event clicked:', event);
            }}
            {...args}
          />
        </DataTable>
      </Box>
    </Provider>
  );
};

ClientSideCalendar.args = {
  dateColumn: 'date',
  firstDayOfWeek: 0,
  showOutsideDays: true,
  monthsToDisplay: 1,
  maxEventsPerDay: 3,
  colorPalette: 'blue',
};

// QueryClient for server-side stories
const queryClient = new QueryClient();

// Server-side Calendar Story
export const ServerSideCalendar = (args: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ServerSideCalendarContent {...args} />
    </QueryClientProvider>
  );
};

const ServerSideCalendarContent = (args: any) => {
  const datatable = useDataTableServer<Event>({
    url: 'https://date.nager.at/api/v3/PublicHolidays',
    default: { pagination: { pageSize: 100, pageIndex: 0 } },
    queryFn: async () => {
      try {
        // Get current year and next year for holiday data
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;

        // Fetch holidays for US (you can change country code as needed)
        // Available country codes: US, GB, CA, AU, DE, FR, etc.
        const countryCode = 'US';

        const [currentYearHolidays, nextYearHolidays] = await Promise.all([
          fetch(
            `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/${countryCode}`
          ).then((res) => res.json()),
          fetch(
            `https://date.nager.at/api/v3/PublicHolidays/${nextYear}/${countryCode}`
          ).then((res) => res.json()),
        ]);

        // Combine and transform holidays into Event format
        const allHolidays = [...currentYearHolidays, ...nextYearHolidays];
        const transformedEvents: Event[] = allHolidays.map(
          (holiday: any, index: number) => ({
            id: index + 1,
            title: holiday.name,
            date: holiday.date, // ISO date string (YYYY-MM-DD)
            description: holiday.localName || holiday.name,
            category: 'event' as const,
            color: ['blue', 'green', 'orange', 'purple', 'red'][index % 5],
          })
        );

        return {
          data: transformedEvents,
          count: transformedEvents.length,
        };
      } catch (error) {
        console.error('Error fetching holidays:', error);
        // Fallback to mock data on error
        return {
          data: eventsData,
          count: eventsData.length,
        };
      }
    },
  });

  return (
    <Provider>
      <Box padding={4}>
        <DataTableServer columns={columns} {...datatable}>
          <CalendarDisplay
            dateColumn="date"
            getEventTitle={(row) => (row as Event).title}
            getEventColor={(row) => (row as Event).color}
            {...args}
          />
        </DataTableServer>
      </Box>
    </Provider>
  );
};

ServerSideCalendar.args = {
  dateColumn: 'date',
  firstDayOfWeek: 0,
  showOutsideDays: true,
  monthsToDisplay: 1,
  maxEventsPerDay: 3,
  colorPalette: 'blue',
};

// Custom Event Renderer Story
export const CustomEventRenderer = (args: any) => {
  const datatable = useDataTable({
    default: { pagination: { pageSize: 100, pageIndex: 0 } },
  });

  return (
    <Provider>
      <Box padding={4}>
        <DataTable columns={columns} data={eventsData} {...datatable}>
          <CalendarDisplay
            dateColumn="date"
            getEventTitle={(row: Event) => row.title}
            getEventColor={(row: Event) => row.color}
            renderEvent={(event) => (
              <Box
                fontSize="xs"
                paddingX={1}
                paddingY={0.5}
                borderRadius="sm"
                bgColor={{
                  base: `${event.color || 'blue'}.100`,
                  _dark: `${event.color || 'blue'}.900`,
                }}
                color={{
                  base: `${event.color || 'blue'}.800`,
                  _dark: `${event.color || 'blue'}.200`,
                }}
                fontWeight="semibold"
                borderLeftWidth="3px"
                borderLeftColor={{
                  base: `${event.color || 'blue'}.500`,
                  _dark: `${event.color || 'blue'}.400`,
                }}
              >
                {event.title} ({(event.data as Event).category})
              </Box>
            )}
            {...args}
          />
        </DataTable>
      </Box>
    </Provider>
  );
};

CustomEventRenderer.args = {
  dateColumn: 'date',
  firstDayOfWeek: 0,
  showOutsideDays: true,
  monthsToDisplay: 1,
  maxEventsPerDay: 3,
  colorPalette: 'blue',
};

// Multiple Months Story
export const MultipleMonths = (args: any) => {
  const datatable = useDataTable({
    default: { pagination: { pageSize: 100, pageIndex: 0 } },
  });

  return (
    <Provider>
      <Box padding={4}>
        <DataTable columns={columns} data={eventsData} {...datatable}>
          <CalendarDisplay
            dateColumn="date"
            getEventTitle={(row: Event) => row.title}
            getEventColor={(row: Event) => row.color}
            monthsToDisplay={3}
            {...args}
          />
        </DataTable>
      </Box>
    </Provider>
  );
};

MultipleMonths.args = {
  dateColumn: 'date',
  firstDayOfWeek: 0,
  showOutsideDays: true,
  monthsToDisplay: 3,
  maxEventsPerDay: 2,
  colorPalette: 'blue',
};

// Server-side Calendar with Multiple Activities Story
export const ServerSideCalendarActivities = (args: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ServerSideCalendarActivitiesContent {...args} />
    </QueryClientProvider>
  );
};

const ServerSideCalendarActivitiesContent = (args: any) => {
  const datatable = useDataTableServer<Event>({
    url: 'https://date.nager.at/api/v3/PublicHolidays',
    default: { pagination: { pageSize: 200, pageIndex: 0 } },
    queryFn: async () => {
      try {
        // Get current year and next year for holiday data
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;

        // Fetch holidays from multiple countries to show more activities
        const countries = [
          { code: 'US', name: 'United States', color: 'blue' },
          { code: 'GB', name: 'United Kingdom', color: 'red' },
          { code: 'CA', name: 'Canada', color: 'green' },
          { code: 'AU', name: 'Australia', color: 'orange' },
          { code: 'DE', name: 'Germany', color: 'purple' },
          { code: 'FR', name: 'France', color: 'cyan' },
          { code: 'JP', name: 'Japan', color: 'pink' },
          { code: 'BR', name: 'Brazil', color: 'yellow' },
        ];

        // Fetch holidays for all countries in parallel
        const holidayPromises = countries.flatMap((country) => [
          fetch(
            `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/${country.code}`
          )
            .then((res) => res.json())
            .then((holidays) =>
              holidays.map((h: any) => ({
                ...h,
                country: country.name,
                countryCode: country.code,
                color: country.color,
              }))
            ),
          fetch(
            `https://date.nager.at/api/v3/PublicHolidays/${nextYear}/${country.code}`
          )
            .then((res) => res.json())
            .then((holidays) =>
              holidays.map((h: any) => ({
                ...h,
                country: country.name,
                countryCode: country.code,
                color: country.color,
              }))
            ),
        ]);

        const allHolidayArrays = await Promise.all(holidayPromises);
        const allHolidays = allHolidayArrays.flat();

        // Transform holidays into Event format with more details
        const transformedEvents: Event[] = allHolidays.map(
          (holiday: any, index: number) => {
            // Map holiday types to categories
            const getCategory = (holidayType: string): Event['category'] => {
              if (holidayType?.toLowerCase().includes('national'))
                return 'event';
              if (holidayType?.toLowerCase().includes('religious'))
                return 'meeting';
              if (holidayType?.toLowerCase().includes('observance'))
                return 'reminder';
              return 'event';
            };

            return {
              id: index + 1,
              title: `${holiday.name} (${holiday.country})`,
              date: holiday.date, // ISO date string (YYYY-MM-DD)
              description: `${holiday.localName || holiday.name} - ${holiday.country}`,
              category: getCategory(holiday.types?.[0] || 'event'),
              color:
                holiday.color ||
                ['blue', 'green', 'orange', 'purple', 'red'][index % 5],
            };
          }
        );

        // Sort by date
        transformedEvents.sort((a, b) => a.date.localeCompare(b.date));

        return {
          data: transformedEvents,
          count: transformedEvents.length,
        };
      } catch (error) {
        console.error('Error fetching holidays:', error);
        // Fallback to mock data on error
        return {
          data: eventsData,
          count: eventsData.length,
        };
      }
    },
  });

  return (
    <Provider>
      <Box padding={4}>
        <DataTableServer columns={columns} {...datatable}>
          <CalendarDisplay
            dateColumn="date"
            getEventTitle={(row) => (row as Event).title}
            getEventColor={(row) => (row as Event).color}
            maxEventsPerDay={5}
            onEventClick={(event) => {
              console.log('Event clicked:', event);
              // You can add custom handling here, e.g., open a modal, navigate, etc.
            }}
            onDateClick={(date, events) => {
              console.log('Date clicked:', date, events);
            }}
            {...args}
          />
        </DataTableServer>
      </Box>
    </Provider>
  );
};

ServerSideCalendarActivities.args = {
  dateColumn: 'date',
  firstDayOfWeek: 0,
  showOutsideDays: true,
  monthsToDisplay: 2,
  maxEventsPerDay: 5,
  colorPalette: 'blue',
};

// Responsive Calendar Story
export const ResponsiveCalendar = (args: any) => {
  const datatable = useDataTable({
    default: { pagination: { pageSize: 100, pageIndex: 0 } },
  });

  // Determine months to display based on window width
  const [monthsToDisplay, setMonthsToDisplay] = React.useState(1);

  React.useEffect(() => {
    const updateMonths = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile: 1 month
        setMonthsToDisplay(1);
      } else if (width < 1024) {
        // Tablet: 2 months
        setMonthsToDisplay(2);
      } else {
        // Desktop: 3 months
        setMonthsToDisplay(3);
      }
    };

    updateMonths();
    window.addEventListener('resize', updateMonths);
    return () => window.removeEventListener('resize', updateMonths);
  }, []);

  return (
    <Provider>
      <Box padding={4}>
        <DataTable columns={columns} data={eventsData} {...datatable}>
          <CalendarDisplay
            dateColumn="date"
            getEventTitle={(row: Event) => row.title}
            getEventColor={(row: Event) => row.color}
            monthsToDisplay={monthsToDisplay}
            onDateClick={(date, events) => {
              console.log('Date clicked:', date, events);
            }}
            onEventClick={(event) => {
              console.log('Event clicked:', event);
            }}
            {...args}
          />
        </DataTable>
      </Box>
    </Provider>
  );
};

ResponsiveCalendar.args = {
  dateColumn: 'date',
  firstDayOfWeek: 0,
  showOutsideDays: true,
  monthsToDisplay: 1, // Will be overridden by responsive logic
  maxEventsPerDay: 3,
  colorPalette: 'blue',
};

// Helper component to display filtered row count
const FilteredRowCount = () => {
  const { table } = useDataTableContext<Event>();
  const filteredCount = table.getFilteredRowModel().rows.length;
  const totalCount = table.getRowModel().rows.length;
  return (
    <Text fontSize="sm" color="fg.muted">
      Showing {filteredCount} of {totalCount} events
    </Text>
  );
};

// Calendar with Filters Story
export const CalendarWithFilters = (args: any) => {
  const datatable = useDataTable({
    default: { pagination: { pageSize: 100, pageIndex: 0 } },
  });

  return (
    <Provider>
      <Box padding={4}>
        <DataTable columns={columns} data={eventsData} {...datatable}>
          <Flex direction="column" gap={4}>
            <Flex gap={2} alignItems="center" flexWrap="wrap">
              <FilterDialog />
              <FilteredRowCount />
            </Flex>
            <TableFilterTags />
            <CalendarDisplay<Event>
              dateColumn="date"
              getEventTitle={(row: Event) => row.title}
              getEventColor={(row: Event) => row.color}
              onDateClick={(date, events) => {
                console.log('Date clicked:', date, events);
              }}
              onEventClick={(event) => {
                console.log('Event clicked:', event);
              }}
              {...args}
            />
          </Flex>
        </DataTable>
      </Box>
    </Provider>
  );
};

CalendarWithFilters.args = {
  dateColumn: 'date',
  firstDayOfWeek: 0,
  showOutsideDays: true,
  monthsToDisplay: 1,
  maxEventsPerDay: 3,
  colorPalette: 'blue',
};

// Calendar with Pre-applied Filters Story
export const CalendarWithPreAppliedFilters = (args: any) => {
  const datatable = useDataTable({
    default: {
      pagination: { pageSize: 100, pageIndex: 0 },
      columnFilters: [
        { id: 'category', value: 'meeting' },
        { id: 'title', value: 'Event' },
      ],
    },
  });

  return (
    <Provider>
      <Box padding={4}>
        <DataTable columns={columns} data={eventsData} {...datatable}>
          <Flex direction="column" gap={4}>
            <Flex gap={2} alignItems="center" flexWrap="wrap">
              <FilterDialog />
              <FilteredRowCount />
            </Flex>
            <TableFilterTags />
            <Text fontSize="sm" color="fg.muted">
              This calendar shows only events filtered by category "meeting" and
              title containing "Event"
            </Text>
            <CalendarDisplay<Event>
              dateColumn="date"
              getEventTitle={(row: Event) => row.title}
              getEventColor={(row: Event) => row.color}
              onDateClick={(date, events) => {
                console.log('Date clicked:', date, events);
              }}
              onEventClick={(event) => {
                console.log('Event clicked:', event);
              }}
              {...args}
            />
          </Flex>
        </DataTable>
      </Box>
    </Provider>
  );
};

CalendarWithPreAppliedFilters.args = {
  dateColumn: 'date',
  firstDayOfWeek: 0,
  showOutsideDays: true,
  monthsToDisplay: 1,
  maxEventsPerDay: 3,
  colorPalette: 'blue',
};
