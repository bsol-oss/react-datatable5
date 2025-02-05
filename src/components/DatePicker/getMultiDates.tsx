export interface GetMultiDatesProps {
  selected: boolean;
  selectable: boolean;
  selectedDate: Date;
  selectedDates: Date[];
}

export const getMultiDates = ({
  selected,
  selectedDate,
  selectedDates,
  selectable,
}: GetMultiDatesProps) => {
  if (!selectable) {
    return [...selectedDates];
  }
  if (selected) {
    // Remove
    return selectedDates.filter((time) => {
      return selectedDate.getTime() !== time.getTime();
    });
  } else {
    // Add
    return [...selectedDates, selectedDate];
  }
};
