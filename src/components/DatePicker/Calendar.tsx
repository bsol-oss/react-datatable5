import { Button, Grid, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import {
  CalendarProps,
  DatePickerContext,
  GetDateColorProps,
  GetVariantProps,
} from './DatePicker';

export const Calendar = ({
  calendars,
  getBackProps,
  getForwardProps,
  getDateProps,
  firstDayOfWeek = 0,
}: CalendarProps) => {
  const { labels } = useContext(DatePickerContext);
  const {
    monthNamesShort,
    weekdayNamesShort,
    backButtonLabel,
    forwardButtonLabel,
  } = labels;
  if (calendars.length) {
    return (
      <Grid>
        <Grid templateColumns={'repeat(2, auto)'} justifyContent={'center'}>
          {calendars.map((calendar) => (
            <Grid key={`${calendar.month}${calendar.year}`} gap={2}>
              <Grid
                templateColumns={'repeat(6, auto)'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={2}
              >
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  colorPalette={'gray'}
                  {...getBackProps({ calendars })}
                >
                  {'<'}
                </Button>
                <Text textAlign={'center'}>
                  {monthNamesShort[calendar.month]}
                </Text>
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  colorPalette={'gray'}
                  {...getForwardProps({ calendars })}
                >
                  {'>'}
                </Button>
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  colorPalette={'gray'}
                  {...getBackProps({
                    calendars,
                    offset: 12,
                  })}
                >
                  {'<'}
                </Button>
                <Text textAlign={'center'}>{calendar.year}</Text>

                <Button
                  variant={'ghost'}
                  size={'sm'}
                  colorPalette={'gray'}
                  {...getForwardProps({
                    calendars,
                    offset: 12,
                  })}
                >
                  {'>'}
                </Button>
              </Grid>
              <Grid
                templateColumns={'repeat(7, auto)'}
                justifyContent={'center'}
              >
                {[0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
                  const weekday = (weekdayNum + firstDayOfWeek) % 7;
                  return (
                    <Text
                      textAlign={'center'}
                      key={`${calendar.month}${calendar.year}${weekday}`}
                    >
                      {weekdayNamesShort[weekday]}
                    </Text>
                  );
                })}
                {calendar.weeks.map((week, weekIndex) =>
                  week.map((dateObj, index) => {
                    const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                    if (!dateObj) {
                      return <Grid key={key} />;
                    }
                    const {
                      date,
                      selected,
                      selectable,
                      today,
                      isCurrentMonth,
                    } = dateObj;
                    const getDateColor = ({
                      today,
                      selected,
                      selectable,
                    }: GetDateColorProps) => {
                      if (!selectable) {
                        return 'gray';
                      }
                      if (selected) {
                        return 'blue';
                      }
                      if (today) {
                        return 'green';
                      }
                      return '';
                    };

                    const getVariant = ({
                      today,
                      selected,
                      selectable,
                    }: GetVariantProps) => {
                      if (!selectable) {
                        return 'surface';
                      }
                      if (selected) {
                        return 'surface';
                      }
                      if (today) {
                        return 'outline';
                      }
                      return 'ghost';
                    };

                    const color = getDateColor({ today, selected, selectable });
                    const variant = getVariant({ today, selected, selectable });
                    return (
                      <Button
                        variant={variant}
                        key={key}
                        colorPalette={color}
                        size={'xs'}
                        opacity={isCurrentMonth ? 1 : 0.4}
                        {...getDateProps({ dateObj })}
                      >
                        {selectable ? date.getDate() : 'X'}
                      </Button>
                    );
                  })
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
  return null;
};
