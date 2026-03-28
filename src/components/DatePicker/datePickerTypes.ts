import type { CalendarRenderProps } from './useCalendar';

export interface CalendarProps extends CalendarRenderProps {
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export interface GetDateColorProps {
  today: boolean;
  selected: boolean;
  selectable: boolean;
}

export interface GetVariantProps {
  today: boolean;
  selected: boolean;
  selectable: boolean;
}

export interface DatePickerLabels {
  monthNamesShort: string[];
  weekdayNamesShort: string[];
  backButtonLabel?: string;
  forwardButtonLabel?: string;
  todayLabel?: string;
  yesterdayLabel?: string;
  tomorrowLabel?: string;
}

export interface DatePickerProps {
  onDateSelected?: (obj: { date: Date; selected: Date | Date[] }) => void;
  selected: Date | Date[];
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** @deprecated No-op; kept for story compatibility */
  showOutsideDays?: boolean;
  /** @deprecated No-op; kept for story compatibility */
  date?: Date;
  minDate?: Date;
  maxDate?: Date;
  monthsToDisplay?: number;
  labels?: DatePickerLabels;
}
