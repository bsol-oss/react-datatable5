export interface GetMultiDatesProps {
    selected: boolean;
    selectable: boolean;
    selectedDate: Date;
    selectedDates: Date[];
}
export declare const getMultiDates: ({ selected, selectedDate, selectedDates, selectable, }: GetMultiDatesProps) => Date[];
