import { Box, Button, Grid } from "@chakra-ui/react";
import Dayzed, { Props, RenderProps } from "@bsol-oss/dayzed-react19";
import React, { useState } from "react";

const monthNamesFull = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

function Calendar({
  calendars,
  getBackProps,
  getForwardProps,
  getDateProps,
  selected = [],
  firstDayOfWeek = 0,
}: RangeCalendarProps) {
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
        <Grid
          templateColumns={"repeat(2, auto)"}
          justifyContent={"center"}
          gap={4}
        >
          {calendars.map((calendar) => (
            <Grid key={`${calendar.month}${calendar.year}`} gap={4}>
              <Grid justifyContent={"center"}>
                {monthNamesFull[calendar.month]} {calendar.year}
              </Grid>
              <Grid
                templateColumns={"repeat(7, auto)"}
                justifyContent={"center"}
              >
                {[0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
                  const weekday = (weekdayNum + firstDayOfWeek) % 7;
                  return (
                    <Box
                      key={`${calendar.month}${calendar.year}${weekday}`}
                      minWidth={"48px"}
                      textAlign={"center"}
                    >
                      {weekdayNamesShort[weekday]}
                    </Box>
                  );
                })}
              </Grid>
              <Grid
                templateColumns={"repeat(7, auto)"}
                justifyContent={"center"}
              >
                {calendar.weeks.map((week, windex) =>
                  week.map((dateObj, index) => {
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
                      colorPalette?: "gray" | "blue" | "green" | "cyan";
                      variant: "solid" | "ghost" | "subtle";
                    } => {
                      if (unavailable) {
                        return {
                          colorPalette: "gray",
                          variant: "solid",
                        };
                      }
                      if (selected) {
                        return {
                          colorPalette: "blue",
                          variant: "solid",
                        };
                      }
                      if (isInRange) {
                        return {
                          colorPalette: "blue",
                          variant: "subtle",
                        };
                      }
                      if (today) {
                        return {
                          colorPalette: "green",
                          variant: "solid",
                        };
                      }
                      return { variant: "ghost" };
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
}

export interface RangeDatePickerProps extends Props, RangeCalendarProps {}

class RangeDatePicker extends React.Component<RangeDatePickerProps> {
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
        render={(dayzedData) => (
          <Calendar
            {...{
              ...dayzedData,
              firstDayOfWeek: this.props.firstDayOfWeek,
              selected: this.props.selected as Date[],
            }}
          />
        )}
      />
    );
  }
}

export default RangeDatePicker;
