import { Button, Grid, Text } from "@chakra-ui/react";
import Dayzed, { Props, RenderProps } from "@bsol-oss/dayzed-react19";
import React from "react";

const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const weekdayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export interface CalendarProps extends RenderProps {
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

const Calendar = ({
  calendars,
  getBackProps,
  getForwardProps,
  getDateProps,
  firstDayOfWeek = 0,
}: CalendarProps) => {
  if (calendars.length) {
    return (
      <Grid>
        <Grid templateColumns={"repeat(4, auto)"} justifyContent={"center"}>
          <Button
            variant={"ghost"}
            {...getBackProps({
              calendars,
              offset: 12,
            })}
          >
            {"<<"}
          </Button>
          <Button variant={"ghost"} {...getBackProps({ calendars })}>
            Back
          </Button>
          <Button variant={"ghost"} {...getForwardProps({ calendars })}>
            Next
          </Button>
          <Button
            variant={"ghost"}
            {...getForwardProps({
              calendars,
              offset: 12,
            })}
          >
            {">>"}
          </Button>
        </Grid>
        <Grid templateColumns={"repeat(2, auto)"} justifyContent={"center"}>
          {calendars.map((calendar) => (
            <Grid key={`${calendar.month}${calendar.year}`} gap={4}>
              <Grid justifyContent={"center"}>
                {monthNamesShort[calendar.month]} {calendar.year}
              </Grid>
              <Grid
                templateColumns={"repeat(7, auto)"}
                justifyContent={"center"}
              >
                {[0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
                  const weekday = (weekdayNum + firstDayOfWeek) % 7;
                  return (
                    <Text
                      textAlign={"center"}
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
                    const { date, selected, selectable, today } = dateObj;
                    const getDateColor = ({
                      today,
                      selected,
                      selectable,
                    }: GetDateColorProps) => {
                      if (!selectable) {
                        return "gray";
                      }
                      if (selected) {
                        return "blue";
                      }
                      if (today) {
                        return "green";
                      }
                      return "";
                    };

                    const getVariant = ({
                      today,
                      selected,
                      selectable,
                    }: GetVariantProps) => {
                      if (!selectable) {
                        return "surface";
                      }
                      if (selected) {
                        return "solid";
                      }
                      if (today) {
                        return "surface";
                      }
                      return "ghost";
                    };

                    const color = getDateColor({ today, selected, selectable });
                    const variant = getVariant({ today, selected, selectable });
                    return (
                      <Button
                        variant={variant}
                        key={key}
                        colorPalette={color}
                        {...getDateProps({ dateObj })}
                      >
                        {selectable ? date.getDate() : "X"}
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

export interface DatePickerProps extends Props {
  onDateSelected?: (obj: { date: Date }) => void;
  selected: Date | Date[];
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showOutsideDays?: boolean;
  date?: Date;
  minDate?: Date;
  maxDate?: Date;
  monthsToDisplay?: number;
  render?: (dayzedData: any) => React.ReactNode;
}

class DatePicker extends React.Component<DatePickerProps> {
  render() {
    return (
      <Dayzed
        onDateSelected={this.props.onDateSelected}
        selected={this.props.selected}
        firstDayOfWeek={this.props.firstDayOfWeek}
        showOutsideDays={this.props.showOutsideDays}
        date={this.props.date}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        monthsToDisplay={this.props.monthsToDisplay}
        render={
          // @ts-expect-error - Dayzed types need to be fixed
          (dayzedData) => (
          <Calendar
            {...{ ...dayzedData, firstDayOfWeek: this.props.firstDayOfWeek }}
          />
        )}
      />
    );
  }
}

export default DatePicker;
