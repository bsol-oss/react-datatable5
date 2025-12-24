import { Button, Grid, Text, Box, VStack, HStack } from '@chakra-ui/react';
import { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { useDataTableContext } from '../context/useDataTableContext';
import { useCalendar, type CalendarDate } from '../../DatePicker/useCalendar';
import dayjs from 'dayjs';

export interface CalendarEvent<TData = unknown> {
  data: TData;
  date: Date;
  title?: string;
  color?: string;
}

export interface CalendarDisplayProps<TData = unknown> {
  /**
   * Column ID or accessor key that contains the date for each event
   */
  dateColumn: string;

  /**
   * Optional function to extract date from row data
   * If not provided, will use the dateColumn to get the date
   */
  getDate?: (row: TData) => Date | string | number | null | undefined;

  /**
   * Optional function to get event title from row data
   * If not provided, will use the first column's value
   */
  getEventTitle?: (row: TData) => string;

  /**
   * Optional function to get event color from row data
   */
  getEventColor?: (row: TData) => string;

  /**
   * Optional function to render event content
   */
  renderEvent?: (event: CalendarEvent<TData>) => React.ReactNode;

  /**
   * First day of week (0 = Sunday, 1 = Monday, etc.)
   */
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Show days outside the current month
   */
  showOutsideDays?: boolean;

  /**
   * Number of months to display
   */
  monthsToDisplay?: number;

  /**
   * Calendar labels
   */
  labels?: {
    monthNamesShort: string[];
    weekdayNamesShort: string[];
    backButtonLabel?: string;
    forwardButtonLabel?: string;
  };

  /**
   * Callback when a date is clicked
   */
  onDateClick?: (date: Date, events: CalendarEvent<TData>[]) => void;

  /**
   * Callback when an event is clicked
   */
  onEventClick?: (event: CalendarEvent<TData>) => void;

  /**
   * Maximum number of events to show per day before showing "+N more"
   */
  maxEventsPerDay?: number;

  /**
   * Color palette for the calendar
   */
  colorPalette?:
    | 'gray'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'blue'
    | 'cyan'
    | 'purple'
    | 'pink';

  /**
   * Fixed placeholder text to show when width is too narrow
   * @default "..."
   */
  eventPlaceholder?: string;

  /**
   * Minimum width (in pixels) before showing placeholder instead of title
   * @default 80
   */
  minEventWidth?: number;

  /**
   * Minimum number of characters to show before ellipsis
   * @default 2
   */
  minCharsBeforeEllipsis?: number;
}

// Helper function to normalize date
function normalizeDate(
  value: Date | string | number | null | undefined
): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === 'string' || typeof value === 'number') {
    const date = dayjs(value).toDate();
    return isNaN(date.getTime()) ? null : date;
  }
  return null;
}

// Component to conditionally render event title based on available width
function ResponsiveEventTitle({
  title,
  placeholder,
  minWidth,
  minChars,
  cellRef,
}: {
  title?: string;
  placeholder: string;
  minWidth: number;
  minChars: number;
  cellRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [truncatedText, setTruncatedText] = useState<string>('');
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const calculateTruncatedText = () => {
      if (!cellRef.current || !measureRef.current || !title) {
        setTruncatedText(title || 'Event');
        return;
      }

      const cellWidth = cellRef.current.clientWidth;
      // Account for padding (approximately 8px on each side)
      const availableWidth = cellWidth - 16;

      // If cell is too narrow, calculate how many characters can fit
      if (availableWidth < minWidth) {
        // Measure text width using canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          setTruncatedText(placeholder);
          return;
        }

        // Get computed font style from the element
        const computedStyle = window.getComputedStyle(measureRef.current);
        context.font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;

        const ellipsisWidth = context.measureText('...').width;
        const maxWidth = availableWidth - ellipsisWidth;

        // Try to show at least minChars characters before ellipsis
        let truncated = '';
        let charCount = 0;

        // Calculate how many characters can fit
        for (let i = 0; i < Math.min(title.length, 50); i++) {
          const testText = title.substring(0, i + 1);
          const textWidth = context.measureText(testText).width;

          if (textWidth <= maxWidth) {
            truncated = testText;
            charCount = i + 1;
          } else {
            break;
          }
        }

        // Ensure we show at least minChars characters if possible
        if (charCount < minChars && title.length >= minChars) {
          truncated = title.substring(0, minChars);
        } else if (charCount === 0 && title.length >= 1) {
          truncated = title.substring(0, 1);
        }

        // Only show ellipsis if we have at least minChars characters
        if (truncated && truncated.length >= minChars) {
          setTruncatedText(`${truncated}...`);
        } else {
          setTruncatedText(placeholder);
        }
      } else {
        // Full width available, show full title
        setTruncatedText(title);
      }
    };

    calculateTruncatedText();

    const resizeObserver = new ResizeObserver(calculateTruncatedText);
    if (cellRef.current) {
      resizeObserver.observe(cellRef.current);
    }

    // Also check on window resize
    window.addEventListener('resize', calculateTruncatedText);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateTruncatedText);
    };
  }, [cellRef, minWidth, title, placeholder]);

  return (
    <>
      <span
        ref={measureRef}
        style={{
          visibility: 'hidden',
          position: 'absolute',
          whiteSpace: 'nowrap',
        }}
      >
        {title || 'Event'}
      </span>
      {truncatedText || title || 'Event'}
    </>
  );
}

export function CalendarDisplay<TData = unknown>({
  dateColumn,
  getDate,
  getEventTitle,
  getEventColor,
  renderEvent,
  firstDayOfWeek = 0,
  showOutsideDays = true,
  monthsToDisplay = 1,
  labels = {
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    weekdayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    backButtonLabel: 'Back',
    forwardButtonLabel: 'Next',
  },
  onDateClick,
  onEventClick,
  maxEventsPerDay = 3,
  colorPalette = 'blue',
  eventPlaceholder = '...',
  minEventWidth = 80,
  minCharsBeforeEllipsis = 2,
}: CalendarDisplayProps<TData>) {
  const { data, table } = useDataTableContext<TData>();

  // Map table data to events
  const events = useMemo<CalendarEvent<TData>[]>(() => {
    return (data as TData[])
      .map((row) => {
        let dateValue: Date | string | number | null | undefined;

        if (getDate) {
          dateValue = getDate(row);
        } else {
          // Try to get date from column
          const rowData = table
            .getRowModel()
            .rows.find((r) => r.original === row);
          if (rowData) {
            const cell = rowData.getAllCells().find((c) => {
              const colId = c.column.id;
              const accessorKey = (c.column.columnDef as any).accessorKey;
              return colId === dateColumn || accessorKey === dateColumn;
            });
            dateValue = cell?.getValue() as
              | Date
              | string
              | number
              | null
              | undefined;
          }
        }

        const date = normalizeDate(dateValue);
        if (!date) return null;

        let title: string | undefined;
        if (getEventTitle) {
          title = getEventTitle(row);
        } else {
          // Use first column's value as title
          const rowData = table
            .getRowModel()
            .rows.find((r) => r.original === row);
          if (rowData) {
            const firstCell = rowData.getAllCells()[0];
            title = String(firstCell?.getValue() ?? '');
          }
        }

        const color = getEventColor?.(row);

        return {
          data: row,
          date,
          title,
          color,
        } as CalendarEvent<TData>;
      })
      .filter((event): event is CalendarEvent<TData> => event !== null);
  }, [data, table, dateColumn, getDate, getEventTitle, getEventColor]);

  // Group events by date
  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent<TData>[]>();
    events.forEach((event) => {
      const dateKey = `${event.date.getFullYear()}-${event.date.getMonth()}-${event.date.getDate()}`;
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(event);
    });
    return map;
  }, [events]);

  // Get events for a specific date
  const getEventsForDate = useCallback(
    (date: Date): CalendarEvent<TData>[] => {
      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      return eventsByDate.get(dateKey) ?? [];
    },
    [eventsByDate]
  );

  const calendarData = useCalendar({
    firstDayOfWeek,
    showOutsideDays,
    monthsToDisplay,
  });

  const getDateProps = useCallback(
    (props: { dateObj: CalendarDate }) => {
      const dateEvents = getEventsForDate(props.dateObj.date);
      const baseProps = calendarData.getDateProps({ dateObj: props.dateObj });
      return {
        ...baseProps,
        onClick: () => {
          baseProps.onClick?.();
          if (onDateClick) {
            onDateClick(props.dateObj.date, dateEvents);
          }
        },
      };
    },
    [calendarData, getEventsForDate, onDateClick]
  );

  const {
    monthNamesShort,
    weekdayNamesShort,
    backButtonLabel,
    forwardButtonLabel,
  } = labels;

  if (!calendarData.calendars.length) {
    return null;
  }

  return (
    <VStack gap={4} width="100%">
      {/* Navigation */}
      <HStack gap={2} justifyContent="center">
        <Button
          variant="ghost"
          {...calendarData.getBackProps({
            calendars: calendarData.calendars,
            offset: 12,
          })}
        >
          {'<<'}
        </Button>
        <Button
          variant="ghost"
          {...calendarData.getBackProps({ calendars: calendarData.calendars })}
        >
          {backButtonLabel}
        </Button>
        <Button
          variant="ghost"
          {...calendarData.getForwardProps({
            calendars: calendarData.calendars,
          })}
        >
          {forwardButtonLabel}
        </Button>
        <Button
          variant="ghost"
          {...calendarData.getForwardProps({
            calendars: calendarData.calendars,
            offset: 12,
          })}
        >
          {'>>'}
        </Button>
      </HStack>

      {/* Calendar Grid */}
      <Grid
        templateColumns={{
          base: '1fr',
          md: monthsToDisplay >= 2 ? 'repeat(2, 1fr)' : '1fr',
          lg:
            monthsToDisplay >= 3
              ? 'repeat(3, 1fr)'
              : monthsToDisplay === 2
                ? 'repeat(2, 1fr)'
                : '1fr',
          xl: `repeat(${Math.min(monthsToDisplay, 4)}, 1fr)`,
        }}
        gap={{ base: 4, md: 6 }}
        width="100%"
        justifyContent="center"
      >
        {calendarData.calendars.map((calendar) => (
          <VStack
            key={`${calendar.month}${calendar.year}`}
            gap={2}
            alignItems="stretch"
          >
            {/* Month Header */}
            <Text
              textAlign="center"
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight="semibold"
            >
              {monthNamesShort[calendar.month]} {calendar.year}
            </Text>

            {/* Weekday Headers */}
            <Grid templateColumns="repeat(7, 1fr)" gap={{ base: 0.5, md: 1 }}>
              {[0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
                const weekday = (weekdayNum + firstDayOfWeek) % 7;
                return (
                  <Text
                    textAlign="center"
                    key={`${calendar.month}${calendar.year}${weekday}`}
                    fontSize={{ base: 'xs', md: 'sm' }}
                    fontWeight="medium"
                    color={{ base: 'gray.600', _dark: 'gray.400' }}
                  >
                    {weekdayNamesShort[weekday]}
                  </Text>
                );
              })}
            </Grid>

            {/* Calendar Days */}
            <Grid templateColumns="repeat(7, 1fr)" gap={{ base: 0.5, md: 1 }}>
              {calendar.weeks.map((week, weekIndex) =>
                week.map((dateObj, index) => {
                  const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                  if (!dateObj) {
                    return <Box key={key} />;
                  }

                  const { date, today, isCurrentMonth } = dateObj;
                  const dateEvents = getEventsForDate(date);
                  const cellRef = useRef<HTMLDivElement>(null);

                  return (
                    <VStack
                      ref={cellRef}
                      key={key}
                      gap={{ base: 0.25, md: 0.5 }}
                      alignItems="stretch"
                      minHeight={{ base: '60px', md: '80px', lg: '100px' }}
                      borderWidth="1px"
                      borderColor={{
                        base: today ? `${colorPalette}.300` : 'gray.200',
                        _dark: today ? `${colorPalette}.700` : 'gray.700',
                      }}
                      borderRadius={{ base: 'sm', md: 'md' }}
                      padding={{ base: 0.5, md: 1 }}
                      bgColor={{
                        base: today ? `${colorPalette}.50` : 'white',
                        _dark: today ? `${colorPalette}.950` : 'gray.900',
                      }}
                      opacity={isCurrentMonth ? 1 : 0.5}
                      {...getDateProps({ dateObj })}
                      cursor={onDateClick ? 'pointer' : 'default'}
                      _hover={
                        onDateClick
                          ? {
                              bgColor: {
                                base: `${colorPalette}.100`,
                                _dark: `${colorPalette}.900`,
                              },
                            }
                          : {}
                      }
                    >
                      {/* Date Number */}
                      <Text
                        fontSize={{ base: 'xs', md: 'sm' }}
                        fontWeight={today ? 'bold' : 'normal'}
                        color={{
                          base: today ? `${colorPalette}.700` : 'gray.700',
                          _dark: today ? `${colorPalette}.300` : 'gray.300',
                        }}
                        textAlign="right"
                        paddingRight={{ base: 0.5, md: 1 }}
                      >
                        {date.getDate()}
                      </Text>

                      {/* Events */}
                      <VStack
                        gap={{ base: 0.25, md: 0.5 }}
                        alignItems="stretch"
                        flex={1}
                        overflow="hidden"
                      >
                        {dateEvents
                          .slice(0, maxEventsPerDay)
                          .map((event, eventIndex) => {
                            const eventContent = renderEvent ? (
                              renderEvent(event)
                            ) : (
                              <Box
                                key={eventIndex}
                                fontSize={{ base: '2xs', md: 'xs' }}
                                paddingX={{ base: 0.5, md: 1 }}
                                paddingY={{ base: 0.25, md: 0.5 }}
                                borderRadius={{ base: 'xs', md: 'sm' }}
                                bgColor={{
                                  base: event.color
                                    ? `${event.color}.100`
                                    : `${colorPalette}.100`,
                                  _dark: event.color
                                    ? `${event.color}.900`
                                    : `${colorPalette}.900`,
                                }}
                                color={{
                                  base: event.color
                                    ? `${event.color}.800`
                                    : `${colorPalette}.800`,
                                  _dark: event.color
                                    ? `${event.color}.200`
                                    : `${colorPalette}.200`,
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onEventClick) {
                                    onEventClick(event);
                                  }
                                }}
                                cursor={onEventClick ? 'pointer' : 'default'}
                                _hover={
                                  onEventClick
                                    ? {
                                        opacity: 0.8,
                                      }
                                    : {}
                                }
                              >
                                <ResponsiveEventTitle
                                  title={event.title}
                                  placeholder={eventPlaceholder}
                                  minWidth={minEventWidth}
                                  minChars={minCharsBeforeEllipsis}
                                  cellRef={cellRef}
                                />
                              </Box>
                            );

                            return (
                              <Box
                                key={eventIndex}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {eventContent}
                              </Box>
                            );
                          })}
                        {dateEvents.length > maxEventsPerDay && (
                          <Text
                            fontSize="xs"
                            color={{
                              base: `${colorPalette}.600`,
                              _dark: `${colorPalette}.400`,
                            }}
                            paddingX={1}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onDateClick) {
                                onDateClick(date, dateEvents);
                              }
                            }}
                            cursor={onDateClick ? 'pointer' : 'default'}
                          >
                            +{dateEvents.length - maxEventsPerDay} more
                          </Text>
                        )}
                      </VStack>
                    </VStack>
                  );
                })
              )}
            </Grid>
          </VStack>
        ))}
      </Grid>
    </VStack>
  );
}
