import { useMemo, useState, useCallback } from 'react';

export interface CalendarDate {
  date: Date;
  selected: boolean;
  selectable: boolean;
  today: boolean;
}

export interface Calendar {
  month: number;
  year: number;
  weeks: Array<Array<CalendarDate | null>>;
}

export interface UseCalendarProps {
  selected?: Date | Date[];
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showOutsideDays?: boolean;
  date?: Date;
  minDate?: Date;
  maxDate?: Date;
  monthsToDisplay?: number;
  onDateSelected?: (obj: { date: Date; selected: Date | Date[] }) => void;
}

export interface CalendarRenderProps {
  calendars: Calendar[];
  getBackProps: (props?: { calendars?: Calendar[]; offset?: number }) => {
    onClick: () => void;
  };
  getForwardProps: (props?: { calendars?: Calendar[]; offset?: number }) => {
    onClick: () => void;
  };
  getDateProps: (props: {
    dateObj: CalendarDate;
    onMouseEnter?: () => void;
  }) => {
    onClick: () => void;
    onMouseEnter?: () => void;
  };
}

// Helper function to check if two dates are the same day
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// Helper function to check if a date is today
function isToday(date: Date): boolean {
  const today = new Date();
  return isSameDay(date, today);
}

// Helper function to check if a date is selected
function isSelected(date: Date, selected?: Date | Date[]): boolean {
  if (!selected) return false;
  if (Array.isArray(selected)) {
    return selected.some((d) => isSameDay(d, date));
  }
  return isSameDay(selected, date);
}

// Helper function to check if a date is selectable
function isSelectable(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (minDate) {
    // Normalize to start of day for comparison
    const minDateStart = new Date(minDate);
    minDateStart.setHours(0, 0, 0, 0);
    const dateStart = new Date(date);
    dateStart.setHours(0, 0, 0, 0);
    if (dateStart < minDateStart) return false;
  }
  if (maxDate) {
    // Normalize to start of day for comparison
    const maxDateStart = new Date(maxDate);
    maxDateStart.setHours(0, 0, 0, 0);
    const dateStart = new Date(date);
    dateStart.setHours(0, 0, 0, 0);
    if (dateStart > maxDateStart) return false;
  }
  return true;
}

// Generate calendar weeks for a given month
function generateCalendarWeeks(
  year: number,
  month: number,
  firstDayOfWeek: number,
  showOutsideDays: boolean,
  selected?: Date | Date[],
  minDate?: Date,
  maxDate?: Date
): Array<Array<CalendarDate | null>> {
  const weeks: Array<Array<CalendarDate | null>> = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Get the first day of the week for the first day of the month
  let firstDayWeekday = firstDay.getDay();
  // Adjust for firstDayOfWeek
  firstDayWeekday = (firstDayWeekday - firstDayOfWeek + 7) % 7;

  // Start from the first day of the week that contains the first day of the month
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDayWeekday);

  let currentDate = new Date(startDate);
  const endDate = new Date(lastDay);
  // Find the last day of the week that contains the last day of the month
  let lastDayWeekday = lastDay.getDay();
  lastDayWeekday = (lastDayWeekday - firstDayOfWeek + 7) % 7;
  endDate.setDate(endDate.getDate() + (6 - lastDayWeekday));

  while (currentDate <= endDate) {
    const week: Array<CalendarDate | null> = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      const isCurrentMonth = date.getMonth() === month;

      if (!showOutsideDays && !isCurrentMonth) {
        week.push(null);
      } else {
        const calendarDate: CalendarDate = {
          date,
          selected: isSelected(date, selected),
          selectable:
            isSelectable(date, minDate, maxDate) &&
            (showOutsideDays || isCurrentMonth),
          today: isToday(date),
        };
        week.push(calendarDate);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

// Generate calendars for the given months
function generateCalendars(
  startDate: Date,
  monthsToDisplay: number,
  firstDayOfWeek: number,
  showOutsideDays: boolean,
  selected?: Date | Date[],
  minDate?: Date,
  maxDate?: Date
): Calendar[] {
  const calendars: Calendar[] = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < monthsToDisplay; i++) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const weeks = generateCalendarWeeks(
      year,
      month,
      firstDayOfWeek,
      showOutsideDays,
      selected,
      minDate,
      maxDate
    );

    calendars.push({
      month,
      year,
      weeks,
    });

    // Move to next month
    currentDate.setMonth(month + 1);
  }

  return calendars;
}

export function useCalendar({
  selected,
  firstDayOfWeek = 0,
  showOutsideDays = false,
  date,
  minDate,
  maxDate,
  monthsToDisplay = 1,
  onDateSelected,
}: UseCalendarProps): CalendarRenderProps {
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    return date ? new Date(date) : new Date();
  });

  const calendars = useMemo(() => {
    return generateCalendars(
      currentDate,
      monthsToDisplay,
      firstDayOfWeek,
      showOutsideDays,
      selected,
      minDate,
      maxDate
    );
  }, [
    currentDate,
    monthsToDisplay,
    firstDayOfWeek,
    showOutsideDays,
    selected,
    minDate,
    maxDate,
  ]);

  const navigate = useCallback((offset: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + offset);
      return newDate;
    });
  }, []);

  const getBackProps = useCallback(
    (props?: { calendars?: Calendar[]; offset?: number }) => {
      return {
        onClick: () => {
          navigate(-(props?.offset || 1));
        },
      };
    },
    [navigate]
  );

  const getForwardProps = useCallback(
    (props?: { calendars?: Calendar[]; offset?: number }) => {
      return {
        onClick: () => {
          navigate(props?.offset || 1);
        },
      };
    },
    [navigate]
  );

  const getDateProps = useCallback(
    (props: { dateObj: CalendarDate; onMouseEnter?: () => void }) => {
      return {
        onClick: () => {
          if (props.dateObj.selectable && onDateSelected) {
            onDateSelected({
              date: props.dateObj.date,
              selected: selected || props.dateObj.date,
            });
          }
        },
        onMouseEnter: props.onMouseEnter,
      };
    },
    [onDateSelected, selected]
  );

  return {
    calendars,
    getBackProps,
    getForwardProps,
    getDateProps,
  };
}
