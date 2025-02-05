import { Box, Button, Flex } from "@chakra-ui/react";
import Dayzed, { Props } from "dayzed";
import React, { useState } from "react";

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

function Calendar({
  calendars,
  getBackProps,
  getForwardProps,
  getDateProps,
  firstDayOfWeek,
  selected,
}) {
  const [hoveredDate, setHoveredDate] = useState();
  const onMouseLeave = () => {
    setHoveredDate(undefined);
  };

  const onMouseEnter = (date) => {
    setHoveredDate(date);
  };
  const isInRange = (date) => {
    if (selected.length) {
      const firstSelected = selected[0].getTime();
      if (selected.length === 2) {
        const secondSelected = selected[1].getTime();
        return firstSelected < date && secondSelected > date;
      } else {
        return (
          hoveredDate &&
          ((firstSelected < date && hoveredDate >= date) ||
            (date < firstSelected && date >= hoveredDate))
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
          <button
            {...getBackProps({
              calendars,
              offset: 12,
            })}
          >
            {"<<"}
          </button>
          <button {...getBackProps({ calendars })}>Back</button>
          <button {...getForwardProps({ calendars })}>Next</button>
          <button
            {...getForwardProps({
              calendars,
              offset: 12,
            })}
          >
            {">>"}
          </button>
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
            {weekdayNamesShort.map((weekday) => (
              <Box
                {...dayOfMonthStyle}
                key={`${calendar.month}${calendar.year}${weekday}`}
              >
                {weekday}
              </Box>
            ))}

            {calendar.weeks.map((week, windex) =>
              week.map((dateObj, index) => {
                const key = `${calendar.month}${calendar.year}${windex}${index}`;

                if (!dateObj) {
                  return <Box key={key} {...dayOfMonthStyle} />;
                }
                const { date, selected, selectable, today } = dateObj;
                const getBackground = ({
                  selected,
                  unavailable,
                  today,
                  isInRange,
                }) => {
                  let background = today ? "cornflowerblue" : "";
                  background = selected || isInRange ? "purple" : background;
                  background = unavailable ? "teal" : background;
                  return { background };
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
                    selected={selected}
                    unavailable={!selectable}
                    today={today}
                    isInRange={isInRange(date)}
                    {...dayOfMonthStyle}
                    {...getBackground({
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
              selected: this.props.selected,
            }}
          />
        )}
      />
    );
  }
}

export default RangeDatePicker;
