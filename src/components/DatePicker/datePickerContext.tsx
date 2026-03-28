import { createContext } from 'react';
import type { DatePickerLabels } from './datePickerTypes';

const defaultLabels: DatePickerLabels = {
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
  todayLabel: 'Today',
  yesterdayLabel: 'Yesterday',
  tomorrowLabel: 'Tomorrow',
};

export const DatePickerContext = createContext<{
  labels: DatePickerLabels;
}>({
  labels: defaultLabels,
});
