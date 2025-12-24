import { Box, Flex } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  DataTable,
  DataTableServer,
  CalendarDisplay,
  useDataTable,
  useDataTableServer,
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
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    size: 150,
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    size: 120,
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    size: 300,
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
    default: { pageSize: 100 },
  });

  return (
    <Provider>
      <Box padding={4}>
        <DataTable columns={columns} data={eventsData} {...datatable}>
          <CalendarDisplay
            dateColumn="date"
            getEventTitle={(row) => row.title}
            getEventColor={(row) => row.color}
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
    url: 'https://jsonplaceholder.typicode.com/posts',
    default: { pageSize: 100 },
    queryFn: async (params) => {
      // Simulate server-side filtering by date
      // In a real scenario, you would send params to your API
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

      // For demo purposes, return our mock events
      return {
        data: eventsData,
        count: eventsData.length,
      };
    },
  });

  return (
    <Provider>
      <Box padding={4}>
        <DataTableServer columns={columns} {...datatable}>
          <CalendarDisplay
            dateColumn="date"
            getDate={(row) => {
              // Since we're using mock data, extract date from our events
              const event = eventsData.find((e) => e.id === (row as any).id);
              return event?.date;
            }}
            getEventTitle={(row) => {
              const event = eventsData.find((e) => e.id === (row as any).id);
              return event?.title || 'Event';
            }}
            getEventColor={(row) => {
              const event = eventsData.find((e) => e.id === (row as any).id);
              return event?.color;
            }}
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
    default: { pageSize: 100 },
  });

  return (
    <Provider>
      <Box padding={4}>
        <DataTable columns={columns} data={eventsData} {...datatable}>
          <CalendarDisplay
            dateColumn="date"
            getEventTitle={(row) => row.title}
            getEventColor={(row) => row.color}
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
                {event.title} ({event.data.category})
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
    default: { pageSize: 100 },
  });

  return (
    <Provider>
      <Box padding={4}>
        <DataTable columns={columns} data={eventsData} {...datatable}>
          <CalendarDisplay
            dateColumn="date"
            getEventTitle={(row) => row.title}
            getEventColor={(row) => row.color}
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
