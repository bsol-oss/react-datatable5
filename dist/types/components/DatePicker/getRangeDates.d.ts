export interface GetRangeDatesProps {
    selectable: boolean;
    date: Date;
    selectedDates: Date[];
}
export declare const getRangeDates: ({ selectable, date, selectedDates, }: GetRangeDatesProps) => Date[] | undefined;
