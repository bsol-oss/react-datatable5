import { Box, Button, Grid, Popover, Portal } from '@chakra-ui/react';
import Dayzed, { Props, RenderProps } from '@bsol-oss/dayzed-react19';
import React, { createContext, useContext, useState } from 'react';
import dayjs from 'dayjs';

export interface RangeCalendarProps extends RenderProps {
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  selected?: Date[];
}

export interface GetStyleProps {
  today: boolean;
  selected: boolean;
  unavailable: boolean;
  isInRange: boolean;
}

export interface RangeDatePickerLabels {
  monthNamesFull: string[];
  weekdayNamesShort: string[];
  backButtonLabel?: string;
  forwardButtonLabel?: string;
}

const RangeDatePickerContext = createContext<{
  labels: RangeDatePickerLabels;
}>({
  labels: {
    monthNamesFull: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    weekdayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    backButtonLabel: 'Back',
    forwardButtonLabel: 'Next',
  },
});

function Calendar({
  calendars,
  getBackProps,
  getForwardProps,
  getDateProps,
  selected = [],
  firstDayOfWeek = 0,
}: RangeCalendarProps & RenderProps) {
  const { labels } = useContext(RangeDatePickerContext);
  const {
    monthNamesFull,
    weekdayNamesShort,
    backButtonLabel,
    forwardButtonLabel,
  } = labels;
  const [hoveredDate, setHoveredDate] = useState<Date>();
  const onMouseLeave = () => {
    setHoveredDate(undefined);
  };

  const onMouseEnter = (date: Date) => {
    setHoveredDate(date);
  };
  const isInRange = (date: Date): boolean => {
    if (selected.length) {
      const firstSelected = selected[0].getTime();
      if (selected.length === 2) {
        const secondSelected = selected[1].getTime();
        return (
          firstSelected < date.getTime() && secondSelected > date.getTime()
        );
      } else {
        return !!(
          hoveredDate &&
          ((firstSelected < date.getTime() &&
            hoveredDate.getTime() >= date.getTime()) ||
            (date.getTime() < firstSelected &&
              date.getTime() >= hoveredDate.getTime()))
        );
      }
    }
    return false;
  };

  if (calendars.length) {
    return (
      <Grid onMouseLeave={onMouseLeave}>
        <Grid templateColumns={'repeat(4, auto)'} justifyContent={'center'}>
          <Button
            variant={'ghost'}
            {...getBackProps({
              calendars,
              offset: 12,
            })}
          >
            {'<<'}
          </Button>
          <Button variant={'ghost'} {...getBackProps({ calendars })}>
            {backButtonLabel}
          </Button>
          <Button variant={'ghost'} {...getForwardProps({ calendars })}>
            {forwardButtonLabel}
          </Button>
          <Button
            variant={'ghost'}
            {...getForwardProps({
              calendars,
              offset: 12,
            })}
          >
            {'>>'}
          </Button>
        </Grid>
        <Grid
          templateColumns={'repeat(2, auto)'}
          justifyContent={'center'}
          gap={4}
        >
          {calendars.map(
            (calendar: {
              month: number;
              year: number;
              weeks: Array<
                Array<{
                  date: Date;
                  selected: boolean;
                  selectable: boolean;
                  today: boolean;
                } | null>
              >;
            }) => (
              <Grid key={`${calendar.month}${calendar.year}`} gap={4}>
                <Grid justifyContent={'center'}>
                  {monthNamesFull[calendar.month]} {calendar.year}
                </Grid>
                <Grid
                  templateColumns={'repeat(7, auto)'}
                  justifyContent={'center'}
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
                    const weekday = (weekdayNum + firstDayOfWeek) % 7;
                    return (
                      <Box
                        key={`${calendar.month}${calendar.year}${weekday}`}
                        minWidth={'48px'}
                        textAlign={'center'}
                      >
                        {weekdayNamesShort[weekday]}
                      </Box>
                    );
                  })}
                </Grid>
                <Grid
                  templateColumns={'repeat(7, auto)'}
                  justifyContent={'center'}
                >
                  {calendar.weeks.map(
                    (
                      week: Array<{
                        date: Date;
                        selected: boolean;
                        selectable: boolean;
                        today: boolean;
                      } | null>,
                      windex: number
                    ) =>
                      week.map(
                        (
                          dateObj: {
                            date: Date;
                            selected: boolean;
                            selectable: boolean;
                            today: boolean;
                          } | null,
                          index: number
                        ) => {
                          const key = `${calendar.month}${calendar.year}${windex}${index}`;

                          if (!dateObj) {
                            return <Box key={key} />;
                          }
                          const { date, selected, selectable, today } = dateObj;
                          const getStyle = ({
                            selected,
                            unavailable,
                            today,
                            isInRange,
                          }: GetStyleProps): {
                            colorPalette?: 'gray' | 'blue' | 'green' | 'cyan';
                            variant: 'solid' | 'ghost' | 'subtle';
                          } => {
                            if (unavailable) {
                              return {
                                colorPalette: 'gray',
                                variant: 'solid',
                              };
                            }
                            if (selected) {
                              return {
                                colorPalette: 'blue',
                                variant: 'solid',
                              };
                            }
                            if (isInRange) {
                              return {
                                colorPalette: 'blue',
                                variant: 'subtle',
                              };
                            }
                            if (today) {
                              return {
                                colorPalette: 'green',
                                variant: 'solid',
                              };
                            }
                            return { variant: 'ghost' };
                          };
                          return (
                            <Button
                              key={key}
                              {...getDateProps({
                                dateObj,
                                onMouseEnter: () => {
                                  onMouseEnter(date);
                                },
                              })}
                              {...getStyle({
                                selected,
                                unavailable: !selectable,
                                today,
                                isInRange: isInRange(date),
                              })}
                            >
                              {selectable ? date.getDate() : 'X'}
                            </Button>
                          );
                        }
                      )
                  )}
                </Grid>
              </Grid>
            )
          )}
        </Grid>
      </Grid>
    );
  }
  return null;
}

export interface RangeDatePickerProps extends Props {
  onDateSelected?: (obj: {
    selected: Date[];
    selectable: boolean;
    date: Date;
  }) => void;
  selected?: Date[];
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showOutsideDays?: boolean;
  date?: Date;
  minDate?: Date;
  maxDate?: Date;
  monthsToDisplay?: number;
  labels?: RangeDatePickerLabels;
  /**
   * Whether to render the calendar in a popover with a trigger button.
   * @default true
   */
  withPopover?: boolean;
  /**
   * Controlled open state for the popover.
   */
  open?: boolean;
  /**
   * Callback when the popover open state changes.
   */
  onOpenChange?: (details: { open: boolean }) => void;
  /**
   * The trigger button element. If not provided, a default button will be rendered.
   */
  trigger?: React.ReactNode;
  /**
   * Format string for displaying the selected date range in the trigger button.
   * @default "YYYY-MM-DD"
   */
  displayFormat?: string;
  /**
   * Placeholder text for the trigger button when no dates are selected.
   */
  placeholder?: string;
  /**
   * Whether to close the popover when clicking outside.
   * @default true
   */
  closeOnInteractOutside?: boolean;
  /**
   * Whether to portal the popover content.
   * @default true
   */
  portalled?: boolean;
  render?: (dayzedData: RenderProps) => React.ReactNode;
}

const RangeDatePicker: React.FC<RangeDatePickerProps> = ({
  labels = {
    monthNamesFull: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    weekdayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    backButtonLabel: 'Back',
    forwardButtonLabel: 'Next',
  },
  selected = [],
  onDateSelected,
  firstDayOfWeek,
  showOutsideDays,
  date,
  minDate,
  maxDate,
  monthsToDisplay,
  ...rest
}) => {
  return (
    <RangeDatePickerContext.Provider value={{ labels }}>
      <Dayzed
        onDateSelected={onDateSelected}
        selected={selected}
        firstDayOfWeek={firstDayOfWeek}
        showOutsideDays={showOutsideDays}
        date={date}
        minDate={minDate}
        maxDate={maxDate}
        monthsToDisplay={monthsToDisplay}
        {...rest}
        render={(dayzedData: RenderProps) => (
          <Calendar
            {...{
              ...dayzedData,
              firstDayOfWeek,
              selected: selected as Date[],
            }}
          />
        )}
      />
    </RangeDatePickerContext.Provider>
  );
};

export default RangeDatePicker;
