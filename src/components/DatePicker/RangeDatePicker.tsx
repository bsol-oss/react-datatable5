import { Box, Button } from "@chakra-ui/react";
import Dayzed, { Props, RenderProps } from "dayzed";
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

const dayOfMonthStyle = {
  display: "inline-block",
  width: "calc((100% / 7) - 4px)", // make allowance for active border
  border: "none",
  margin: "2px", // make allowance for active border
};

export interface CalendarProps extends RenderProps {
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
}: CalendarProps) {
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
      <Box
        onMouseLeave={onMouseLeave}
        {...{
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Box>
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
        </Box>
        {calendars.map((calendar) => (
          <Box
            key={`${calendar.month}${calendar.year}`}
            {...{
              display: "inline-block",
              width: "50%",
              padding: "0 10px 30px",
              boxSizing: "border-box",
            }}
          >
            <Box>
              {monthNamesFull[calendar.month]} {calendar.year}
            </Box>
            {[0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
              const weekday = (weekdayNum + firstDayOfWeek) % 7;
              return (
                <Box
                  {...dayOfMonthStyle}
                  key={`${calendar.month}${calendar.year}${weekday}`}
                >
                  {weekdayNamesShort[weekday]}
                </Box>
              );
            })}

            {calendar.weeks.map((week, windex) =>
              week.map((dateObj, index) => {
                const key = `${calendar.month}${calendar.year}${windex}${index}`;

                if (!dateObj) {
                  return <Box key={key} {...dayOfMonthStyle} />;
                }
                const { date, selected, selectable, today } = dateObj;
                const getStyle = ({
                  selected,
                  unavailable,
                  today,
                  isInRange,
                }: GetStyleProps): {
                  colorPalette?: "gray" | "blue" | "green";
                  variant: "solid" | "ghost";
                } => {
                  if (unavailable) {
                    return {
                      colorPalette: "gray",
                      variant: "solid",
                    };
                  }
                  if (selected || isInRange) {
                    return {
                      colorPalette: "blue",
                      variant: "solid",
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
                    // selected={selected}
                    // unavailable={!selectable}
                    // today={today}
                    // isInRange={isInRange(date)}
                    {...dayOfMonthStyle}
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
          </Box>
        ))}
      </Box>
    );
  }
  return null;
}

export interface DatePickerProps extends Props {}

class RangeDatePicker extends React.Component<DatePickerProps> {
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
