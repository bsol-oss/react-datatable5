import { Box, Button } from "@chakra-ui/react";
import Dayzed, { DateObj, Props, useDayzed } from "dayzed";
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

function Calendar({ calendars, getBackProps, getForwardProps, getDateProps }) {
  if (calendars.length) {
    return (
      <Box style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
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
            style={{
              display: "inline-block",
              width: "50%",
              padding: "0 10px 30px",
              boxSizing: "border-box",
            }}
          >
            <Box>
              {monthNamesShort[calendar.month]} {calendar.year}
            </Box>
            {weekdayNamesShort.map((weekday) => (
              <Box
                key={`${calendar.month}${calendar.year}${weekday}`}
                style={{
                  display: "inline-block",
                  width: "calc(100% / 7)",
                  border: "none",
                  background: "transparent",
                }}
              >
                {weekday}
              </Box>
            ))}
            {calendar.weeks.map((week, weekIndex) =>
              week.map((dateObj, index) => {
                const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                if (!dateObj) {
                  return (
                    <Box
                      key={key}
                      style={{
                        display: "inline-block",
                        width: "calc(100% / 7)",
                        border: "none",
                        background: "transparent",
                      }}
                    />
                  );
                }
                const { date, selected, selectable, today } = dateObj;
                const getDateColor = ({ today, selected, selectable }) => {
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

                const getVariant = ({ today, selected, selectable }) => {
                  if (!selectable) {
                    return "solid";
                  }
                  if (selected) {
                    return "solid";
                  }
                  if (today) {
                    return "solid";
                  }
                  return "ghost";
                };

                const color = getDateColor({ today, selected, selectable });
                const variant = getVariant({ today, selected, selectable });
                return (
                  <Button
                    style={{
                      display: "inline-block",
                      width: "calc(100% / 7)",
                      border: "none",
                      //   background,
                    }}
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
          </Box>
        ))}
      </Box>
    );
  }
  return null;
}

export interface DatePickerProps extends Props {}

class DatePicker extends React.Component<DatePickerProps> {
  render() {
    return (
      <Dayzed
        onDateSelected={this.props.onDateSelected}
        selected={this.props.selected}
        firstDayOfWeek={this.props.firstDayOfWeek}
        showOutsideDays={this.props.showOutsideDays}
        render={(dayzedData) => <Calendar {...dayzedData} />}
      />
    );
  }
}

export default DatePicker;
