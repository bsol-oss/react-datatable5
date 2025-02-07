export interface GetRangeDatesProps {
  selectable: boolean;
  date: Date;
  selectedDates: Date[];
}

export const getRangeDates = ({
  selectable,
  date,
  selectedDates,
}: GetRangeDatesProps) => {
  if (!selectable) {
    return;
  }
  const dateTime = date.getTime();
  const newDates = [...selectedDates];
  if (selectedDates.length) {
    if (selectedDates.length === 1) {
      const firstTime = selectedDates[0].getTime();
      if (firstTime < dateTime) {
        newDates.push(date);
      } else {
        newDates.unshift(date);
      }
      return newDates;
    } else if (newDates.length === 2) {
      return [date];
    }
  } else {
    newDates.push(date);
    return newDates;
  }
};
