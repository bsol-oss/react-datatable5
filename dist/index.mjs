import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Button as Button$1, AbsoluteCenter, Spinner, Span, IconButton, Portal, Dialog, Flex, Text, useDisclosure, DialogBackdrop, RadioGroup as RadioGroup$1, Grid, Box, Slider as Slider$1, HStack, For, CheckboxCard as CheckboxCard$1, Input, Menu, createRecipeContext, createContext as createContext$1, Pagination as Pagination$1, usePaginationContext, Tooltip as Tooltip$1, Group, InputElement, Icon, EmptyState as EmptyState$2, VStack, List, Table as Table$1, Checkbox as Checkbox$1, Card, MenuRoot as MenuRoot$1, MenuTrigger as MenuTrigger$1, Clipboard, Badge, Link, Tag as Tag$1, Image, Alert, Field as Field$1, Popover, useFilter, useListCollection, Combobox, Tabs, Skeleton, NumberInput, Show, RadioCard, CheckboxGroup, InputGroup as InputGroup$1, Center, Heading, Stack } from '@chakra-ui/react';
import { AiOutlineColumnWidth } from 'react-icons/ai';
import * as React from 'react';
import { createContext, useContext, useState, useMemo, useCallback, useEffect, useRef, forwardRef } from 'react';
import { LuX, LuCheck, LuChevronRight, LuCopy, LuExternalLink, LuSearch, LuImage, LuFile } from 'react-icons/lu';
import { MdOutlineSort, MdFilterAlt, MdSearch, MdOutlineChecklist, MdClear, MdOutlineViewColumn, MdFilterListAlt, MdPushPin, MdCancel, MdDateRange } from 'react-icons/md';
import { FaUpDown, FaGripLinesVertical, FaTrash } from 'react-icons/fa6';
import { BiDownArrow, BiUpArrow, BiError } from 'react-icons/bi';
import { CgClose, CgTrash } from 'react-icons/cg';
import { HiMiniEllipsisHorizontal, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { IoMdEye, IoMdCheckbox, IoMdClock } from 'react-icons/io';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { bind, bindAll } from 'bind-event-listener';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import rafSchd from 'raf-schd';
import invariant from 'tiny-invariant';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { IoReload } from 'react-icons/io5';
import { useDebounce } from '@uidotdev/usehooks';
import { BsExclamationCircleFill, BsClock } from 'react-icons/bs';
import { HiColorSwatch } from 'react-icons/hi';
import { flexRender, createColumnHelper, makeStateUpdater, functionalUpdate, useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { GrAscend, GrDescend } from 'react-icons/gr';
import axios from 'axios';
import { FormProvider, useFormContext, useForm as useForm$1 } from 'react-hook-form';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { TiDeleteOutline } from 'react-icons/ti';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { rankItem } from '@tanstack/match-sorter-utils';

const DataTableContext = createContext({
    table: {},
    globalFilter: '',
    setGlobalFilter: () => { },
    type: 'client',
    data: [],
    columns: [],
    columnOrder: [],
    columnFilters: [],
    density: 'sm',
    sorting: [],
    setPagination: function () {
        throw new Error('Function not implemented.');
    },
    setSorting: function () {
        throw new Error('Function not implemented.');
    },
    setColumnFilters: function () {
        throw new Error('Function not implemented.');
    },
    setRowSelection: function () {
        throw new Error('Function not implemented.');
    },
    setColumnOrder: function () {
        throw new Error('Function not implemented.');
    },
    setDensity: function () {
        throw new Error('Function not implemented.');
    },
    setColumnVisibility: function () {
        throw new Error('Function not implemented.');
    },
    pagination: {
        pageIndex: 0,
        pageSize: 10,
    },
    rowSelection: {},
    columnVisibility: {},
    tableLabel: {
        view: 'View',
        edit: 'Edit',
        filterButtonText: 'Filter',
        filterTitle: 'Filter',
        filterReset: 'Reset',
        filterClose: 'Close',
        reloadTooltip: 'Reload',
        reloadButtonText: 'Reload',
        resetSelection: 'Reset Selection',
        resetSorting: 'Reset Sorting',
        rowCountText: '',
        hasErrorText: 'Has Error',
        globalFilterPlaceholder: 'Search',
        trueLabel: 'True',
        falseLabel: 'False',
    },
});

const useDataTableContext = () => {
    return useContext(DataTableContext);
};

const Button = React.forwardRef(function Button(props, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props;
    return (jsx(Button$1, { disabled: loading || disabled, ref: ref, ...rest, children: loading && !loadingText ? (jsxs(Fragment, { children: [jsx(AbsoluteCenter, { display: "inline-flex", children: jsx(Spinner, { size: "inherit", color: "inherit" }) }), jsx(Span, { opacity: 0, children: children })] })) : loading && loadingText ? (jsxs(Fragment, { children: [jsx(Spinner, { size: "inherit", color: "inherit" }), loadingText] })) : (children) }));
});

const DensityToggleButton = ({ text, icon = jsx(AiOutlineColumnWidth, {}), }) => {
    const { table } = useDataTableContext();
    return (jsxs(Fragment, { children: [!!text === false && (jsx(IconButton, { variant: "ghost", "aria-label": "Toggle Density", onClick: () => {
                    table.toggleDensity();
                }, children: icon })), !!text !== false && (jsxs(Button, { variant: "ghost", "aria-label": "Toggle Density", onClick: () => {
                    table.toggleDensity();
                }, children: [icon, text] }))] }));
};

const CloseButton = React.forwardRef(function CloseButton(props, ref) {
    return (jsx(IconButton, { variant: "ghost", "aria-label": "Close", ref: ref, ...props, children: props.children ?? jsx(LuX, {}) }));
});

const DialogContent = React.forwardRef(function DialogContent(props, ref) {
    const { children, portalled = true, portalRef, backdrop = true, ...rest } = props;
    return (jsxs(Portal, { disabled: !portalled, container: portalRef, children: [backdrop && jsx(Dialog.Backdrop, {}), jsx(Dialog.Positioner, { children: jsx(Dialog.Content, { ref: ref, ...rest, asChild: false, children: children }) })] }));
});
const DialogCloseTrigger = React.forwardRef(function DialogCloseTrigger(props, ref) {
    return (jsx(Dialog.CloseTrigger, { position: "absolute", top: "2", insetEnd: "2", ...props, asChild: true, children: jsx(CloseButton, { size: "sm", ref: ref, children: props.children }) }));
});
const DialogRoot = Dialog.Root;
const DialogFooter = Dialog.Footer;
const DialogHeader = Dialog.Header;
const DialogBody = Dialog.Body;
Dialog.Backdrop;
const DialogTitle = Dialog.Title;
Dialog.Description;
const DialogTrigger = Dialog.Trigger;
Dialog.ActionTrigger;

const TableSorter = () => {
    const { table } = useDataTableContext();
    return (jsx(Fragment, { children: table.getHeaderGroups().map((headerGroup) => (jsx(Fragment, { children: headerGroup.headers.map((header) => {
                const displayName = header.column.columnDef.meta === undefined
                    ? header.column.id
                    : header.column.columnDef.meta.displayName;
                return (jsx(Fragment, { children: header.column.getCanSort() && (jsxs(Flex, { alignItems: "center", gap: "0.5rem", padding: "0.5rem", children: [jsx(Text, { children: displayName }), jsxs(Button$1, { variant: "ghost", onClick: () => {
                                    header.column.toggleSorting();
                                }, children: [header.column.getIsSorted() === false && jsx(FaUpDown, {}), header.column.getIsSorted() === "asc" && jsx(BiDownArrow, {}), header.column.getIsSorted() === "desc" && jsx(BiUpArrow, {})] }), header.column.getIsSorted() && (jsx(Button$1, { onClick: () => {
                                    header.column.clearSorting();
                                }, children: jsx(CgClose, {}) }))] })) }));
            }) }))) }));
};

const ResetSortingButton = () => {
    const { table } = useDataTableContext();
    const { tableLabel } = useDataTableContext();
    const { resetSorting } = tableLabel;
    return (jsx(Button$1, { onClick: () => {
            table.resetSorting();
        }, children: resetSorting }));
};

const EditSortingButton = ({ text, icon = jsx(MdOutlineSort, {}), title = "Edit Sorting", }) => {
    const sortingModal = useDisclosure();
    return (jsx(Fragment, { children: jsxs(DialogRoot, { size: ["full", "full", "md", "md"], children: [jsx(DialogBackdrop, {}), jsx(DialogTrigger, { children: jsxs(Button$1, { as: "div", variant: "ghost", onClick: sortingModal.onOpen, children: [icon, " ", text] }) }), jsxs(DialogContent, { children: [jsx(DialogCloseTrigger, {}), jsxs(DialogHeader, { children: [jsx(DialogTitle, {}), title] }), jsx(DialogBody, { children: jsxs(Flex, { flexFlow: "column", gap: "0.25rem", children: [jsx(TableSorter, {}), jsx(ResetSortingButton, {})] }) }), jsx(DialogFooter, {})] })] }) }));
};

const Radio = React.forwardRef(function Radio(props, ref) {
    const { children, inputProps, rootRef, ...rest } = props;
    return (jsxs(RadioGroup$1.Item, { ref: rootRef, ...rest, children: [jsx(RadioGroup$1.ItemHiddenInput, { ref: ref, ...inputProps }), jsx(RadioGroup$1.ItemIndicator, {}), children && (jsx(RadioGroup$1.ItemText, { children: children }))] }));
});
const RadioGroup = RadioGroup$1.Root;

// Helper function to check if two dates are the same day
function isSameDay(date1, date2) {
    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate());
}
// Helper function to check if a date is today
function isToday(date) {
    const today = new Date();
    return isSameDay(date, today);
}
// Helper function to check if a date is selected
function isSelected(date, selected) {
    if (!selected)
        return false;
    if (Array.isArray(selected)) {
        return selected.some((d) => isSameDay(d, date));
    }
    return isSameDay(selected, date);
}
// Helper function to check if a date is selectable
function isSelectable(date, minDate, maxDate) {
    if (minDate) {
        // Normalize to start of day for comparison
        const minDateStart = new Date(minDate);
        minDateStart.setHours(0, 0, 0, 0);
        const dateStart = new Date(date);
        dateStart.setHours(0, 0, 0, 0);
        if (dateStart < minDateStart)
            return false;
    }
    if (maxDate) {
        // Normalize to start of day for comparison
        const maxDateStart = new Date(maxDate);
        maxDateStart.setHours(0, 0, 0, 0);
        const dateStart = new Date(date);
        dateStart.setHours(0, 0, 0, 0);
        if (dateStart > maxDateStart)
            return false;
    }
    return true;
}
// Generate calendar weeks for a given month
function generateCalendarWeeks(year, month, firstDayOfWeek, showOutsideDays, selected, minDate, maxDate) {
    const weeks = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    // Get the first day of the week for the first day of the month
    let firstDayWeekday = firstDay.getDay();
    // Adjust for firstDayOfWeek
    firstDayWeekday = (firstDayWeekday - firstDayOfWeek + 7) % 7;
    // Start from the first day of the week that contains the first day of the month
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDayWeekday);
    let currentDate = new Date(startDate);
    const endDate = new Date(lastDay);
    // Find the last day of the week that contains the last day of the month
    let lastDayWeekday = lastDay.getDay();
    lastDayWeekday = (lastDayWeekday - firstDayOfWeek + 7) % 7;
    endDate.setDate(endDate.getDate() + (6 - lastDayWeekday));
    while (currentDate <= endDate) {
        const week = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentDate);
            const isCurrentMonth = date.getMonth() === month;
            if (!showOutsideDays && !isCurrentMonth) {
                week.push(null);
            }
            else {
                const calendarDate = {
                    date,
                    selected: isSelected(date, selected),
                    selectable: isSelectable(date, minDate, maxDate) &&
                        (showOutsideDays || isCurrentMonth),
                    today: isToday(date),
                    isCurrentMonth,
                };
                week.push(calendarDate);
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        weeks.push(week);
    }
    return weeks;
}
// Generate calendars for the given months
function generateCalendars(startDate, monthsToDisplay, firstDayOfWeek, showOutsideDays, selected, minDate, maxDate) {
    const calendars = [];
    const currentDate = new Date(startDate);
    for (let i = 0; i < monthsToDisplay; i++) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const weeks = generateCalendarWeeks(year, month, firstDayOfWeek, showOutsideDays, selected, minDate, maxDate);
        calendars.push({
            month,
            year,
            weeks,
        });
        // Move to next month
        currentDate.setMonth(month + 1);
    }
    return calendars;
}
function useCalendar({ selected, firstDayOfWeek = 0, showOutsideDays = true, date, minDate, maxDate, monthsToDisplay = 1, onDateSelected, }) {
    const [currentDate, setCurrentDate] = useState(() => {
        return date ? new Date(date) : new Date();
    });
    const calendars = useMemo(() => {
        return generateCalendars(currentDate, monthsToDisplay, firstDayOfWeek, showOutsideDays, selected, minDate, maxDate);
    }, [
        currentDate,
        monthsToDisplay,
        firstDayOfWeek,
        showOutsideDays,
        selected,
        minDate,
        maxDate,
    ]);
    const navigate = useCallback((offset) => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + offset);
            return newDate;
        });
    }, []);
    const getBackProps = useCallback((props) => {
        return {
            onClick: () => {
                navigate(-(props?.offset || 1));
            },
        };
    }, [navigate]);
    const getForwardProps = useCallback((props) => {
        return {
            onClick: () => {
                navigate(props?.offset || 1);
            },
        };
    }, [navigate]);
    const getDateProps = useCallback((props) => {
        return {
            onClick: () => {
                if (props.dateObj.selectable && onDateSelected) {
                    onDateSelected({
                        date: props.dateObj.date,
                        selected: selected || props.dateObj.date,
                    });
                }
            },
            onMouseEnter: props.onMouseEnter,
        };
    }, [onDateSelected, selected]);
    return {
        calendars,
        getBackProps,
        getForwardProps,
        getDateProps,
    };
}

const RangeDatePickerContext = createContext({
    labels: {
        monthNamesFull: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        weekdayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        backButtonLabel: 'Back',
        forwardButtonLabel: 'Next',
    },
});
function Calendar$1({ calendars, getBackProps, getForwardProps, getDateProps, selected = [], firstDayOfWeek = 0, }) {
    const { labels } = useContext(RangeDatePickerContext);
    const { monthNamesFull, weekdayNamesShort, backButtonLabel, forwardButtonLabel, } = labels;
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
                return (firstSelected < date.getTime() && secondSelected > date.getTime());
            }
            else {
                return !!(hoveredDate &&
                    ((firstSelected < date.getTime() &&
                        hoveredDate.getTime() >= date.getTime()) ||
                        (date.getTime() < firstSelected &&
                            date.getTime() >= hoveredDate.getTime())));
            }
        }
        return false;
    };
    if (calendars.length) {
        return (jsxs(Grid, { onMouseLeave: onMouseLeave, children: [jsxs(Grid, { templateColumns: 'repeat(4, auto)', justifyContent: 'center', children: [jsx(Button$1, { variant: 'ghost', ...getBackProps({
                                calendars,
                                offset: 12,
                            }), children: '<<' }), jsx(Button$1, { variant: 'ghost', ...getBackProps({ calendars }), children: backButtonLabel }), jsx(Button$1, { variant: 'ghost', ...getForwardProps({ calendars }), children: forwardButtonLabel }), jsx(Button$1, { variant: 'ghost', ...getForwardProps({
                                calendars,
                                offset: 12,
                            }), children: '>>' })] }), jsx(Grid, { templateColumns: 'repeat(2, auto)', justifyContent: 'center', gap: 4, children: calendars.map((calendar) => (
                    // month and year
                    jsxs(Grid, { gap: 4, alignContent: "start", children: [jsxs(Grid, { justifyContent: 'center', children: [monthNamesFull[calendar.month], " ", calendar.year] }), jsx(Grid, { templateColumns: 'repeat(7, auto)', justifyContent: 'center', children: [0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
                                    const weekday = (weekdayNum + firstDayOfWeek) % 7;
                                    return (jsx(Box, { minWidth: '48px', textAlign: 'center', children: weekdayNamesShort[weekday] }, `${calendar.month}${calendar.year}${weekday}`));
                                }) }), jsx(Grid, { templateColumns: 'repeat(7, auto)', justifyContent: 'center', children: calendar.weeks.map((week, windex) => week.map((dateObj, index) => {
                                    const key = `${calendar.month}${calendar.year}${windex}${index}`;
                                    if (!dateObj) {
                                        return jsx(Box, {}, key);
                                    }
                                    const { date, selected, selectable, today, isCurrentMonth, } = dateObj;
                                    const getStyle = ({ selected, unavailable, today, isInRange, }) => {
                                        if (unavailable) {
                                            return {
                                                colorPalette: 'gray',
                                                variant: 'solid',
                                            };
                                        }
                                        if (selected) {
                                            return {
                                                colorPalette: 'blue',
                                                variant: 'solid',
                                            };
                                        }
                                        if (isInRange) {
                                            return {
                                                colorPalette: 'blue',
                                                variant: 'subtle',
                                            };
                                        }
                                        if (today) {
                                            return {
                                                colorPalette: 'green',
                                                variant: 'solid',
                                            };
                                        }
                                        return { variant: 'ghost' };
                                    };
                                    return (jsx(Button$1, { ...getDateProps({
                                            dateObj,
                                            onMouseEnter: () => {
                                                onMouseEnter(date);
                                            },
                                        }), ...getStyle({
                                            selected,
                                            unavailable: !selectable,
                                            today,
                                            isInRange: isInRange(date),
                                        }), opacity: isCurrentMonth ? 1 : 0.4, children: selectable ? date.getDate() : 'X' }, key));
                                })) })] }, `${calendar.month}${calendar.year}`))) })] }));
    }
    return null;
}
const RangeDatePicker = ({ labels = {
    monthNamesFull: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    weekdayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    backButtonLabel: 'Back',
    forwardButtonLabel: 'Next',
}, selected = [], onDateSelected, firstDayOfWeek, showOutsideDays, date, minDate, maxDate, monthsToDisplay, render, }) => {
    const handleDateSelected = (obj) => {
        if (onDateSelected) {
            const dateObj = obj.date;
            const currentSelected = Array.isArray(obj.selected)
                ? obj.selected
                : [obj.selected];
            // Range selection logic: if one date selected, add second; if two selected, replace with new date
            let newSelected;
            if (currentSelected.length === 0) {
                newSelected = [dateObj];
            }
            else if (currentSelected.length === 1) {
                const firstDate = currentSelected[0];
                if (dateObj < firstDate) {
                    newSelected = [dateObj, firstDate];
                }
                else {
                    newSelected = [firstDate, dateObj];
                }
            }
            else {
                newSelected = [dateObj];
            }
            // Check if date is selectable
            const selectable = !minDate || dateObj >= minDate;
            if (maxDate) {
                const isSelectable = dateObj <= maxDate;
                if (!isSelectable)
                    return;
            }
            onDateSelected({
                selected: newSelected,
                selectable,
                date: dateObj,
            });
        }
    };
    const calendarData = useCalendar({
        onDateSelected: handleDateSelected,
        selected,
        firstDayOfWeek,
        showOutsideDays,
        date,
        minDate,
        maxDate,
        monthsToDisplay,
    });
    return (jsx(RangeDatePickerContext.Provider, { value: { labels }, children: render ? (render(calendarData)) : (jsx(Calendar$1, { ...calendarData,
            firstDayOfWeek,
            selected: selected })) }));
};

const getRangeDates = ({ selectable, date, selectedDates, }) => {
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
            }
            else {
                newDates.unshift(date);
            }
            return newDates;
        }
        else if (newDates.length === 2) {
            return [date];
        }
    }
    else {
        newDates.push(date);
        return newDates;
    }
};

const Slider = React.forwardRef(function Slider(props, ref) {
    const { marks: marksProp, label, showValue, ...rest } = props;
    const value = props.defaultValue ?? props.value;
    const marks = marksProp?.map((mark) => {
        if (typeof mark === "number")
            return { value: mark, label: undefined };
        return mark;
    });
    const hasMarkLabel = !!marks?.some((mark) => mark.label);
    return (jsxs(Slider$1.Root, { ref: ref, thumbAlignment: "center", ...rest, children: [label && !showValue && (jsx(Slider$1.Label, { children: label })), label && showValue && (jsxs(HStack, { justify: "space-between", children: [jsx(Slider$1.Label, { children: label }), jsx(Slider$1.ValueText, {})] })), jsxs(Slider$1.Control, { "data-has-mark-label": hasMarkLabel || undefined, children: [jsx(Slider$1.Track, { children: jsx(Slider$1.Range, {}) }), jsx(SliderThumbs, { value: value }), jsx(SliderMarks, { marks: marks })] })] }));
});
function SliderThumbs(props) {
    const { value } = props;
    return (jsx(For, { each: value, children: (_, index) => (jsx(Slider$1.Thumb, { index: index, children: jsx(Slider$1.HiddenInput, {}) }, index)) }));
}
const SliderMarks = React.forwardRef(function SliderMarks(props, ref) {
    const { marks } = props;
    if (!marks?.length)
        return null;
    return (jsx(Slider$1.MarkerGroup, { ref: ref, children: marks.map((mark, index) => {
            const value = typeof mark === "number" ? mark : mark.value;
            const label = typeof mark === "number" ? undefined : mark.label;
            return (jsxs(Slider$1.Marker, { value: value, children: [jsx(Slider$1.MarkerIndicator, {}), label] }, index));
        }) }));
});

const RangeFilter = ({ range, setRange, defaultValue, min, max, step, }) => {
    return (jsxs(Flex, { p: 2, gap: 2, flexFlow: 'column', children: [jsx(Text, { children: `${range[0]} - ${range[1]}` }), jsx(Slider, { width: "full", min: min, max: max, defaultValue: defaultValue, step: step, name: `Selected Range: ${range[0]} - ${range[1]}`, 
                // value={field.value}
                onValueChange: (val) => setRange(val.value) })] }));
};

const CheckboxCard = React.forwardRef(function CheckboxCard(props, ref) {
    const { inputProps, label, description, icon, addon, indicator = jsx(CheckboxCard$1.Indicator, {}), indicatorPlacement = "end", ...rest } = props;
    const hasContent = label || description || icon;
    const ContentWrapper = indicator ? CheckboxCard$1.Content : React.Fragment;
    return (jsxs(CheckboxCard$1.Root, { ...rest, children: [jsx(CheckboxCard$1.HiddenInput, { ref: ref, ...inputProps }), jsxs(CheckboxCard$1.Control, { children: [indicatorPlacement === "start" && indicator, hasContent && (jsxs(ContentWrapper, { children: [icon, label && (jsx(CheckboxCard$1.Label, { children: label })), description && (jsx(CheckboxCard$1.Description, { children: description })), indicatorPlacement === "inside" && indicator] })), indicatorPlacement === "end" && indicator] }), addon && jsx(CheckboxCard$1.Addon, { children: addon })] }));
});
CheckboxCard$1.Indicator;

const TagFilter = ({ availableTags, selectedTags, onTagChange, selectOne = false, }) => {
    const handleTagChange = (tag, checked) => {
        if (selectOne) {
            if (checked) {
                onTagChange([tag]);
            }
            else {
                onTagChange([]);
            }
            return;
        }
        if (checked) {
            onTagChange([...selectedTags, tag]);
        }
        else {
            onTagChange(selectedTags.filter((t) => t !== tag));
        }
    };
    return (jsx(Flex, { flexFlow: 'wrap', p: '0.5rem', gap: '0.5rem', children: availableTags.map((tag) => {
            const { label, value } = tag;
            const isChecked = selectedTags.includes(value);
            return (jsx(CheckboxCard, { checked: isChecked, label: label ?? value, size: "sm", variant: isChecked ? 'solid' : 'outline', onCheckedChange: (details) => {
                    handleTagChange(value, Boolean(details.checked));
                } }, value));
        }) }));
};

const Filter = ({ column }) => {
    const { tableLabel } = useDataTableContext();
    const { filterVariant } = column.columnDef.meta ?? {};
    const displayName = column.columnDef.meta?.displayName ?? column.id;
    const filterOptions = column.columnDef.meta?.filterOptions ?? [];
    if (column.columns.length > 0) {
        return (jsxs(Flex, { flexFlow: 'column', gap: 1, children: [jsx(Text, { children: displayName }), jsx(Grid, { gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))', gap: 1, children: column.columns.map((column) => {
                        return jsx(Filter, { column: column }, column.id);
                    }) }, column.id)] }));
    }
    if (!column.getCanFilter()) {
        return jsx(Fragment, {});
    }
    if (filterVariant === 'select') {
        return (jsxs(Flex, { flexFlow: 'column', gap: "0.25rem", children: [jsx(Text, { children: displayName }), jsx(RadioGroup, { value: column.getFilterValue() ? String(column.getFilterValue()) : '', onValueChange: (details) => {
                        column.setFilterValue(details.value);
                    }, children: jsxs(Flex, { flexFlow: 'wrap', gap: '0.5rem', children: [filterOptions.length === 0 && jsx(Text, { children: "No filter options" }), filterOptions.length > 0 &&
                                filterOptions.map((item) => (jsx(Radio, { value: item.value, children: item.label }, item.value)))] }) })] }, column.id));
    }
    if (filterVariant === 'tag') {
        return (jsxs(Flex, { flexFlow: 'column', gap: "0.25rem", children: [jsx(Text, { children: displayName }), jsx(TagFilter, { availableTags: filterOptions.map((item) => ({
                        label: item.label,
                        value: item.value,
                    })), selectedTags: (column.getFilterValue() ?? []), onTagChange: (tags) => {
                        if (tags.length === 0) {
                            return column.setFilterValue(undefined);
                        }
                        column.setFilterValue(tags);
                    } })] }, column.id));
    }
    if (filterVariant === 'boolean') {
        const { trueLabel, falseLabel } = tableLabel;
        return (jsxs(Flex, { flexFlow: 'column', gap: "0.25rem", children: [jsx(Text, { children: displayName }), jsx(TagFilter, { availableTags: [
                        { label: trueLabel, value: 'true' },
                        { label: falseLabel, value: 'false' },
                    ], selectedTags: (column.getFilterValue() ?? []), onTagChange: (tags) => {
                        if (tags.length === 0) {
                            return column.setFilterValue(undefined);
                        }
                        column.setFilterValue(tags);
                    } })] }, column.id));
    }
    if (filterVariant === 'range') {
        const filterValue = column.getFilterValue() ?? [
            undefined,
            undefined,
        ];
        const { min, max, step, defaultValue } = column.columnDef.meta
            ?.filterRangeConfig ?? {
            min: 0,
            max: 100,
            step: 1,
            defaultValue: [4, 50],
        };
        return (jsxs(Flex, { flexFlow: 'column', gap: "0.25rem", children: [jsx(Text, { children: displayName }), jsx(RangeFilter, { range: filterValue, setRange: function (value) {
                        // throw new Error("Function not implemented.");
                        column.setFilterValue(value);
                    }, defaultValue: defaultValue, min: min, max: max, step: step })] }, column.id));
    }
    if (filterVariant === 'dateRange') {
        const filterValue = column.getFilterValue() ?? [];
        return (jsxs(Flex, { flexFlow: 'column', gap: "0.25rem", children: [jsx(Text, { children: displayName }), jsx(RangeDatePicker, { selected: filterValue, onDateSelected: ({ selected, selectable, date }) => {
                        const newDates = getRangeDates({
                            selectable,
                            date,
                            selectedDates: filterValue,
                        }) ?? [];
                        column.setFilterValue(() => {
                            return newDates;
                        });
                    } })] }, column.id));
    }
    if (filterVariant === 'custom') {
        const renderFilter = column.columnDef.meta?.renderFilter;
        if (renderFilter === undefined) {
            throw new Error('renderFilter is undefined');
        }
        return jsx(Fragment, { children: renderFilter(column) });
    }
    return (jsxs(Flex, { flexFlow: 'column', gap: "0.25rem", children: [jsx(Text, { children: displayName }), jsx(Input, { value: column.getFilterValue() ? String(column.getFilterValue()) : '', onChange: (e) => {
                    column.setFilterValue(e.target.value);
                } })] }, column.id));
};
const TableFilter = () => {
    const { table } = useDataTableContext();
    return (jsx(Fragment, { children: table.getAllColumns().map((column) => {
            return jsx(Filter, { column: column }, column.id);
        }) }));
};

const ResetFilteringButton = () => {
    const { table } = useDataTableContext();
    const { tableLabel } = useDataTableContext();
    const { filterReset } = tableLabel;
    return (jsx(Button$1, { onClick: () => {
            table.resetColumnFilters();
        }, children: filterReset }));
};

const FilterDialog = ({ icon = jsx(MdFilterAlt, {}), }) => {
    const filterModal = useDisclosure();
    const { tableLabel } = useDataTableContext();
    const { filterButtonText, filterTitle, filterClose } = tableLabel;
    return (jsxs(DialogRoot, { size: ["full", "full", "md", "md"], open: filterModal.open, children: [jsx(DialogTrigger, { asChild: true, children: jsxs(Button$1, { as: Box, variant: "ghost", onClick: filterModal.onOpen, children: [icon, " ", filterButtonText] }) }), jsxs(DialogContent, { children: [jsx(DialogHeader, { children: jsx(DialogTitle, { children: filterTitle }) }), jsx(DialogBody, { display: "flex", flexFlow: "column", children: jsx(TableFilter, {}) }), jsxs(DialogFooter, { children: [jsx(ResetFilteringButton, {}), jsx(Button$1, { onClick: filterModal.onClose, variant: "subtle", children: filterClose })] }), jsx(DialogCloseTrigger, { onClick: filterModal.onClose })] })] }));
};

const MenuContent = React.forwardRef(function MenuContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props;
    return (jsx(Portal, { disabled: !portalled, container: portalRef, children: jsx(Menu.Positioner, { children: jsx(Menu.Content, { ref: ref, ...rest }) }) }));
});
React.forwardRef(function MenuArrow(props, ref) {
    return (jsx(Menu.Arrow, { ref: ref, ...props, children: jsx(Menu.ArrowTip, {}) }));
});
React.forwardRef(function MenuCheckboxItem(props, ref) {
    return (jsxs(Menu.CheckboxItem, { ref: ref, ...props, children: [jsx(Menu.ItemIndicator, { hidden: false, children: jsx(LuCheck, {}) }), props.children] }));
});
React.forwardRef(function MenuRadioItem(props, ref) {
    const { children, ...rest } = props;
    return (jsxs(Menu.RadioItem, { ps: "8", ref: ref, ...rest, children: [jsx(AbsoluteCenter, { axis: "horizontal", left: "4", asChild: true, children: jsx(Menu.ItemIndicator, { children: jsx(LuCheck, {}) }) }), jsx(Menu.ItemText, { children: children })] }));
});
React.forwardRef(function MenuItemGroup(props, ref) {
    const { title, children, ...rest } = props;
    return (jsxs(Menu.ItemGroup, { ref: ref, ...rest, children: [title && (jsx(Menu.ItemGroupLabel, { userSelect: "none", children: title })), children] }));
});
React.forwardRef(function MenuTriggerItem(props, ref) {
    const { startIcon, children, ...rest } = props;
    return (jsxs(Menu.TriggerItem, { ref: ref, ...rest, children: [startIcon, children, jsx(LuChevronRight, {})] }));
});
Menu.RadioItemGroup;
Menu.ContextTrigger;
const MenuRoot = Menu.Root;
Menu.Separator;
const MenuItem = Menu.Item;
Menu.ItemText;
Menu.ItemCommand;
const MenuTrigger = Menu.Trigger;

const PageSizeControl = ({ pageSizes = [10, 20, 30, 40, 50], }) => {
    const { table } = useDataTableContext();
    return (jsxs(MenuRoot, { children: [jsx(MenuTrigger, { asChild: true, children: jsx(Button$1, { variant: 'ghost', gap: '0.5rem', children: table.getState().pagination.pageSize }) }), jsx(MenuContent, { children: pageSizes.map((pageSize) => (jsx(MenuItem, { value: `chakra-table-pageSize-${pageSize}`, onClick: () => {
                        table.setPageSize(Number(pageSize));
                    }, children: pageSize }, `chakra-table-pageSize-${pageSize}`))) })] }));
};

const { withContext } = createRecipeContext({ key: "button" });
// Replace "a" with your framework's link component
const LinkButton = withContext("a");

const [RootPropsProvider, useRootProps] = createContext$1({
    name: 'RootPropsProvider',
});
const variantMap = {
    outline: { default: 'ghost', ellipsis: 'plain', current: 'outline' },
    solid: { default: 'outline', ellipsis: 'outline', current: 'solid' },
    subtle: { default: 'ghost', ellipsis: 'plain', current: 'subtle' },
};
const PaginationRoot = React.forwardRef(function PaginationRoot(props, ref) {
    const { size = 'sm', variant = 'outline', getHref, siblingCount, minSiblingCount = 1, maxSiblingCount, ...rest } = props;
    const containerRef = React.useRef(null);
    const [calculatedSiblingCount, setCalculatedSiblingCount] = React.useState(siblingCount);
    React.useEffect(() => {
        if (siblingCount !== undefined || !containerRef.current) {
            setCalculatedSiblingCount(siblingCount);
            return;
        }
        const container = containerRef.current;
        let rafId = null;
        let timeoutId = null;
        const measureButtonWidth = () => {
            // Try to measure actual rendered buttons for accuracy
            // Look for page number buttons (they contain numeric text)
            const allButtons = container.querySelectorAll('button');
            const pageButtons = [];
            allButtons.forEach((button) => {
                const text = button.textContent?.trim();
                // Page buttons contain numbers, prev/next buttons contain icons
                if (text && /^\d+$/.test(text)) {
                    pageButtons.push(button);
                }
            });
            if (pageButtons.length > 0) {
                // Measure multiple buttons and take the average for accuracy
                let totalWidth = 0;
                let count = 0;
                pageButtons.forEach((button) => {
                    const width = button.offsetWidth;
                    if (width > 0) {
                        totalWidth += width;
                        count++;
                    }
                });
                if (count > 0) {
                    return Math.ceil(totalWidth / count);
                }
            }
            // Fallback to estimated widths based on size
            const buttonWidthMap = {
                xs: 28,
                sm: 36,
                md: 40,
                lg: 44,
            };
            return buttonWidthMap[size] || 36;
        };
        const measurePrevNextWidth = () => {
            const allButtons = container.querySelectorAll('button');
            let prevWidth = 0;
            let nextWidth = 0;
            allButtons.forEach((button) => {
                const html = button.innerHTML;
                // Check if it's a prev/next button by looking for chevron icons or SVG
                if (html.includes('chevron') ||
                    html.includes('Chevron') ||
                    button.querySelector('svg')) {
                    const width = button.offsetWidth;
                    if (width > 0) {
                        // First icon button is likely prev, last is next
                        if (prevWidth === 0) {
                            prevWidth = width;
                        }
                        else {
                            nextWidth = width;
                        }
                    }
                }
            });
            if (prevWidth > 0 && nextWidth > 0) {
                return prevWidth + nextWidth;
            }
            // Fallback: use page button width estimate
            return measureButtonWidth() * 2;
        };
        const calculateSiblingCount = () => {
            if (!container)
                return;
            const width = container.offsetWidth;
            if (width === 0)
                return;
            // Measure actual button widths
            const pageButtonWidth = measureButtonWidth();
            const prevNextWidth = measurePrevNextWidth();
            // Get computed gap from container (HStack gap)
            const containerStyles = window.getComputedStyle(container);
            const gap = parseFloat(containerStyles.gap) || 8;
            // Account for gaps: prev button + gap + page buttons + gap + next button
            // We need at least 2 gaps (before and after page buttons)
            const availableWidth = Math.max(0, width - prevNextWidth - gap * 2);
            // Each page button takes buttonWidth + gap
            const buttonWithGap = pageButtonWidth + gap;
            const maxPageButtons = Math.floor(availableWidth / buttonWithGap);
            // Calculate sibling count based on pagination structure
            // Structure: [prev] [first] [ellipsis?] [siblings] [current] [siblings] [ellipsis?] [last] [next]
            // Minimum: prev(1) + first(1) + current(1) + last(1) + next(1) = 5 buttons
            // With siblings and ellipsis: 5 + siblings*2 + ellipsis*2
            const minRequired = 5; // prev, first, current, last, next
            const extraButtons = Math.max(0, maxPageButtons - minRequired);
            let calculated = minSiblingCount;
            if (extraButtons >= 4) {
                // Enough space for ellipsis (2 buttons) + siblings on both sides
                // Structure: [prev] [1] [...] [siblings] [current] [siblings] [...] [last] [next]
                // Extra buttons = ellipsis(2) + siblings*2
                calculated = Math.floor((extraButtons - 2) / 2);
            }
            else if (extraButtons >= 2) {
                // Space for some siblings but not ellipsis
                // Structure: [prev] [1] [siblings] [current] [siblings] [last] [next]
                calculated = Math.floor(extraButtons / 2);
            }
            // Apply max limit if provided
            if (maxSiblingCount !== undefined) {
                calculated = Math.min(calculated, maxSiblingCount);
            }
            const finalSiblingCount = Math.max(minSiblingCount, calculated);
            // Only update if value changed to avoid unnecessary re-renders
            setCalculatedSiblingCount((prev) => {
                if (prev !== finalSiblingCount) {
                    return finalSiblingCount;
                }
                return prev;
            });
        };
        const scheduleCalculation = () => {
            // Cancel any pending calculations
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
            // Use requestAnimationFrame for smooth updates
            rafId = requestAnimationFrame(() => {
                // Small delay to ensure DOM is fully rendered
                timeoutId = setTimeout(calculateSiblingCount, 50);
            });
        };
        const resizeObserver = new ResizeObserver(scheduleCalculation);
        resizeObserver.observe(container);
        // Initial calculation - try multiple times to ensure buttons are rendered
        scheduleCalculation();
        // Also try after a longer delay as fallback
        const fallbackTimeout = setTimeout(calculateSiblingCount, 200);
        return () => {
            resizeObserver.disconnect();
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
            clearTimeout(fallbackTimeout);
        };
    }, [size, siblingCount, minSiblingCount, maxSiblingCount]);
    const mergedRef = React.useCallback((node) => {
        if (typeof ref === 'function') {
            ref(node);
        }
        else if (ref) {
            ref.current = node;
        }
        containerRef.current = node;
    }, [ref]);
    return (jsx(RootPropsProvider, { value: { size, variantMap: variantMap[variant], getHref }, children: jsx(Pagination$1.Root, { ref: mergedRef, type: getHref ? 'link' : 'button', siblingCount: calculatedSiblingCount, ...rest }) }));
});
const PaginationEllipsis = React.forwardRef(function PaginationEllipsis(props, ref) {
    const { size, variantMap } = useRootProps();
    return (jsx(Pagination$1.Ellipsis, { ref: ref, ...props, asChild: true, children: jsx(Button$1, { as: "span", variant: variantMap.ellipsis, size: size, children: jsx(HiMiniEllipsisHorizontal, {}) }) }));
});
const PaginationItem = React.forwardRef(function PaginationItem(props, ref) {
    const { page } = usePaginationContext();
    const { size, variantMap, getHref } = useRootProps();
    const current = page === props.value;
    const variant = current ? variantMap.current : variantMap.default;
    if (getHref) {
        return (jsx(LinkButton, { href: getHref(props.value), variant: variant, size: size, children: props.value }));
    }
    return (jsx(Pagination$1.Item, { ref: ref, ...props, asChild: true, children: jsx(Button$1, { variant: variant, size: size, children: props.value }) }));
});
const PaginationPrevTrigger = React.forwardRef(function PaginationPrevTrigger(props, ref) {
    const { size, variantMap, getHref } = useRootProps();
    const { previousPage } = usePaginationContext();
    if (getHref) {
        return (jsx(LinkButton, { href: previousPage != null ? getHref(previousPage) : undefined, variant: variantMap.default, size: size, children: jsx(HiChevronLeft, {}) }));
    }
    return (jsx(Pagination$1.PrevTrigger, { ref: ref, asChild: true, ...props, children: jsx(IconButton, { variant: variantMap.default, size: size, children: jsx(HiChevronLeft, {}) }) }));
});
const PaginationNextTrigger = React.forwardRef(function PaginationNextTrigger(props, ref) {
    const { size, variantMap, getHref } = useRootProps();
    const { nextPage } = usePaginationContext();
    if (getHref) {
        return (jsx(LinkButton, { href: nextPage != null ? getHref(nextPage) : undefined, variant: variantMap.default, size: size, children: jsx(HiChevronRight, {}) }));
    }
    return (jsx(Pagination$1.NextTrigger, { ref: ref, asChild: true, ...props, children: jsx(IconButton, { variant: variantMap.default, size: size, children: jsx(HiChevronRight, {}) }) }));
});
const PaginationItems = (props) => {
    return (jsx(Pagination$1.Context, { children: ({ pages }) => pages.map((page, index) => {
            return page.type === 'ellipsis' ? (jsx(PaginationEllipsis, { index: index, ...props }, index)) : (jsx(PaginationItem, { type: "page", value: page.value, ...props }, index));
        }) }));
};
React.forwardRef(function PaginationPageText(props, ref) {
    const { format = 'compact', ...rest } = props;
    const { page, totalPages, pageRange, count } = usePaginationContext();
    const content = React.useMemo(() => {
        if (format === 'short')
            return `${page} / ${totalPages}`;
        if (format === 'compact')
            return `${page} / ${totalPages}`;
        return `${pageRange.start + 1} - ${Math.min(pageRange.end, count)} / ${count}`;
    }, [format, page, totalPages, pageRange, count]);
    return (jsx(Text, { fontWeight: "medium", ref: ref, ...rest, children: content }));
});

// TODO: not working in client side
const Pagination = () => {
    const { table, type } = useDataTableContext();
    const getCount = () => {
        if (type === "client") {
            return table.getFilteredRowModel().flatRows.length ?? 0;
        }
        return table.getRowCount();
    };
    return (jsx(PaginationRoot, { page: table.getState().pagination.pageIndex + 1, count: getCount(), pageSize: table.getState().pagination.pageSize, onPageChange: (e) => {
            table.setPageIndex(e.page - 1);
        }, children: jsxs(HStack, { children: [jsx(PaginationPrevTrigger, {}), jsx(PaginationItems, {}), jsx(PaginationNextTrigger, {})] }) }));
};

/**
 * Custom selector utilities to replace TanStack table selector primitives.
 * These work directly with rowSelection state instead of using table's built-in selectors.
 */
/**
 * Get all selected rows from the table based on rowSelection state
 */
function getSelectedRows(table, rowSelection) {
    const selectedRowIds = Object.keys(rowSelection).filter((id) => rowSelection[id] === true);
    return table
        .getRowModel()
        .rows.filter((row) => selectedRowIds.includes(row.id));
}
/**
 * Get the count of selected rows
 */
function getSelectedRowCount(table, rowSelection) {
    return getSelectedRows(table, rowSelection).length;
}
/**
 * Check if a specific row is selected
 */
function isRowSelected(rowId, rowSelection) {
    return rowSelection[rowId] === true;
}
/**
 * Check if all rows in the table are selected
 */
function areAllRowsSelected(table, rowSelection) {
    const rows = table.getRowModel().rows;
    if (rows.length === 0)
        return false;
    return rows.every((row) => isRowSelected(row.id, rowSelection));
}
/**
 * Check if all rows on the current page are selected
 */
function areAllPageRowsSelected(table, rowSelection) {
    const pageRows = table.getRowModel().rows;
    if (pageRows.length === 0)
        return false;
    return pageRows.every((row) => isRowSelected(row.id, rowSelection));
}
/**
 * Create a toggle handler for a specific row
 */
function createRowToggleHandler(row, rowSelection, setRowSelection) {
    return () => {
        setRowSelection((old) => {
            const newSelection = { ...old };
            if (newSelection[row.id]) {
                delete newSelection[row.id];
            }
            else {
                newSelection[row.id] = true;
            }
            return newSelection;
        });
    };
}
/**
 * Create a toggle handler for all rows
 */
function createToggleAllRowsHandler(table, rowSelection, setRowSelection) {
    return () => {
        const allSelected = areAllRowsSelected(table, rowSelection);
        if (allSelected) {
            // Deselect all
            setRowSelection({});
        }
        else {
            // Select all
            const newSelection = {};
            table.getRowModel().rows.forEach((row) => {
                newSelection[row.id] = true;
            });
            setRowSelection(newSelection);
        }
    };
}
/**
 * Reset row selection (clear all selections)
 */
function resetRowSelection(setRowSelection) {
    setRowSelection({});
}
/**
 * Check if a row can be selected (always true for now, can be extended)
 */
function canRowSelect(row) {
    return row.getCanSelect?.() ?? true;
}

const ResetSelectionButton = () => {
    const { tableLabel, setRowSelection } = useDataTableContext();
    const { resetSelection } = tableLabel;
    return (jsx(Button$1, { onClick: () => {
            resetRowSelection(setRowSelection);
        }, children: resetSelection }));
};

const RowCountText = () => {
    const { table, type } = useDataTableContext();
    const getCount = () => {
        if (type === 'client') {
            return table.getFilteredRowModel().flatRows.length ?? 0;
        }
        return table.getRowCount();
    };
    const totalCount = getCount();
    const { pageIndex, pageSize } = table.getState().pagination;
    if (totalCount === 0) {
        return jsx(Text, { children: "0 of 0" });
    }
    const start = pageIndex * pageSize + 1;
    const end = Math.min((pageIndex + 1) * pageSize, totalCount);
    return jsx(Text, { children: `${start}-${end} / ${totalCount}` });
};

// pulling this into a separate file so adapter(s) that don't
// need the honey pot can pay as little as possible for it.
var honeyPotDataAttribute = 'data-pdnd-honey-pot';

function isHoneyPotElement(target) {
  return target instanceof Element && target.hasAttribute(honeyPotDataAttribute);
}

function getElementFromPointWithoutHoneypot(client) {
  // eslint-disable-next-line no-restricted-syntax
  var _document$elementsFro = document.elementsFromPoint(client.x, client.y),
    _document$elementsFro2 = _slicedToArray(_document$elementsFro, 2),
    top = _document$elementsFro2[0],
    second = _document$elementsFro2[1];
  if (!top) {
    return null;
  }
  if (isHoneyPotElement(top)) {
    return second !== null && second !== void 0 ? second : null;
  }
  return top;
}

// Maximum possible z-index
// https://stackoverflow.com/questions/491052/minimum-and-maximum-value-of-z-index
var maxZIndex = 2147483647;

function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var honeyPotSize = 2;
var halfHoneyPotSize = honeyPotSize / 2;

/**
 * `clientX` and `clientY` can be in sub pixels (eg `2.332`)
 * However, browser hitbox testing is commonly do to the closest pixel.
 *
 * → https://issues.chromium.org/issues/40940531
 *
 * To be sure that the honey pot will be over the `client` position,
 * we `.floor()` `clientX` and`clientY` and then make it `2px` in size.
 **/
function floorToClosestPixel(point) {
  return {
    x: Math.floor(point.x),
    y: Math.floor(point.y)
  };
}

/**
 * We want to make sure the honey pot sits around the users position.
 * This seemed to be the most resilient while testing.
 */
function pullBackByHalfHoneyPotSize(point) {
  return {
    x: point.x - halfHoneyPotSize,
    y: point.y - halfHoneyPotSize
  };
}

/**
 * Prevent the honey pot from changing the window size.
 * This is super unlikely to occur, but just being safe.
 */
function preventGoingBackwardsOffScreen(point) {
  return {
    x: Math.max(point.x, 0),
    y: Math.max(point.y, 0)
  };
}

/**
 * Prevent the honey pot from changing the window size.
 * This is super unlikely to occur, but just being safe.
 */
function preventGoingForwardsOffScreen(point) {
  return {
    x: Math.min(point.x, window.innerWidth - honeyPotSize),
    y: Math.min(point.y, window.innerHeight - honeyPotSize)
  };
}

/**
 * Create a `2x2` `DOMRect` around the `client` position
 */
function getHoneyPotRectFor(_ref) {
  var client = _ref.client;
  var point = preventGoingForwardsOffScreen(preventGoingBackwardsOffScreen(pullBackByHalfHoneyPotSize(floorToClosestPixel(client))));

  // When debugging, it is helpful to
  // make this element a bit bigger
  return DOMRect.fromRect({
    x: point.x,
    y: point.y,
    width: honeyPotSize,
    height: honeyPotSize
  });
}
function getRectStyles(_ref2) {
  var clientRect = _ref2.clientRect;
  return {
    left: "".concat(clientRect.left, "px"),
    top: "".concat(clientRect.top, "px"),
    width: "".concat(clientRect.width, "px"),
    height: "".concat(clientRect.height, "px")
  };
}
function isWithin(_ref3) {
  var client = _ref3.client,
    clientRect = _ref3.clientRect;
  return (
    // is within horizontal bounds
    client.x >= clientRect.x && client.x <= clientRect.x + clientRect.width &&
    // is within vertical bounds
    client.y >= clientRect.y && client.y <= clientRect.y + clientRect.height
  );
}
/**
 * The honey pot fix is designed to get around a painful bug in all browsers.
 *
 * [Overview](https://www.youtube.com/watch?v=udE9qbFTeQg)
 *
 * **Background**
 *
 * When a drag starts, browsers incorrectly think that the users pointer is
 * still depressed where the drag started. Any element that goes under this position
 * will be entered into, causing `"mouseenter"` events and `":hover"` styles to be applied.
 *
 * _This is a violation of the spec_
 *
 * > "From the moment that the user agent is to initiate the drag-and-drop operation,
 * > until the end 	of the drag-and-drop operation, device input events
 * > (e.g. mouse and keyboard events) must be suppressed."
 * >
 * > - https://html.spec.whatwg.org/multipage/dnd.html#drag-and-drop-processing-model
 *
 * _Some impacts_
 *
 * - `":hover"` styles being applied where they shouldn't (looks messy)
 * - components such as tooltips responding to `"mouseenter"` can show during a drag,
 *   and on an element the user isn't even over
 *
 * Bug: https://issues.chromium.org/issues/41129937
 *
 * **Honey pot fix**
 *
 * 1. Create an element where the browser thinks the depressed pointer is
 *    to absorb the incorrect pointer events
 * 2. Remove that element when it is no longer needed
 */
function mountHoneyPot(_ref4) {
  var initial = _ref4.initial;
  var element = document.createElement('div');
  element.setAttribute(honeyPotDataAttribute, 'true');

  // can shift during the drag thanks to Firefox
  var clientRect = getHoneyPotRectFor({
    client: initial
  });
  Object.assign(element.style, _objectSpread$2(_objectSpread$2({
    // Setting a background color explicitly to avoid any inherited styles.
    // Looks like this could be `opacity: 0`, but worried that _might_
    // cause the element to be ignored on some platforms.
    // When debugging, set backgroundColor to something like "red".
    backgroundColor: 'transparent',
    position: 'fixed',
    // Being explicit to avoid inheriting styles
    padding: 0,
    margin: 0,
    boxSizing: 'border-box'
  }, getRectStyles({
    clientRect: clientRect
  })), {}, {
    // We want this element to absorb pointer events,
    // it's kind of the whole point 😉
    pointerEvents: 'auto',
    // Want to make sure the honey pot is top of everything else.
    // Don't need to worry about native drag previews, as they will
    // have been rendered (and removed) before the honey pot is rendered
    zIndex: maxZIndex
  }));
  document.body.appendChild(element);

  /**
   *  🦊 In firefox we can get `"pointermove"` events after the drag
   * has started, which is a spec violation.
   * The final `"pointermove"` will reveal where the "depressed" position
   * is for our honey pot fix.
   */
  var unbindPointerMove = bind(window, {
    type: 'pointermove',
    listener: function listener(event) {
      var client = {
        x: event.clientX,
        y: event.clientY
      };
      clientRect = getHoneyPotRectFor({
        client: client
      });
      Object.assign(element.style, getRectStyles({
        clientRect: clientRect
      }));
    },
    // using capture so we are less likely to be impacted by event stopping
    options: {
      capture: true
    }
  });
  return function finish(_ref5) {
    var current = _ref5.current;
    // Don't need this any more
    unbindPointerMove();

    // If the user is hover the honey pot, we remove it
    // so that the user can continue to interact with the page normally.
    if (isWithin({
      client: current,
      clientRect: clientRect
    })) {
      element.remove();
      return;
    }
    function cleanup() {
      unbindPostDragEvents();
      element.remove();
    }
    var unbindPostDragEvents = bindAll(window, [{
      type: 'pointerdown',
      listener: cleanup
    }, {
      type: 'pointermove',
      listener: cleanup
    }, {
      type: 'focusin',
      listener: cleanup
    }, {
      type: 'focusout',
      listener: cleanup
    },
    // a 'pointerdown' should happen before 'dragstart', but just being super safe
    {
      type: 'dragstart',
      listener: cleanup
    },
    // if the user has dragged something out of the window
    // and then is dragging something back into the window
    // the first events we will see are "dragenter" (and then "dragover").
    // So if we see any of these we need to clear the post drag fix.
    {
      type: 'dragenter',
      listener: cleanup
    }, {
      type: 'dragover',
      listener: cleanup
    }

    // Not adding a "wheel" event listener, as "wheel" by itself does not
    // resolve the bug.
    ], {
      // Using `capture` so less likely to be impacted by other code stopping events
      capture: true
    });
  };
}
function makeHoneyPotFix() {
  var latestPointerMove = null;
  function bindEvents() {
    // For sanity, only collecting this value from when events are first bound.
    // This prevents the case where a super old "pointermove" could be used
    // from a prior interaction.
    latestPointerMove = null;
    return bind(window, {
      type: 'pointermove',
      listener: function listener(event) {
        latestPointerMove = {
          x: event.clientX,
          y: event.clientY
        };
      },
      // listening for pointer move in capture phase
      // so we are less likely to be impacted by events being stopped.
      options: {
        capture: true
      }
    });
  }
  function getOnPostDispatch() {
    var finish = null;
    return function onPostEvent(_ref6) {
      var eventName = _ref6.eventName,
        payload = _ref6.payload;
      // We are adding the honey pot `onDragStart` so we don't
      // impact the creation of the native drag preview.
      if (eventName === 'onDragStart') {
        var _latestPointerMove;
        var input = payload.location.initial.input;

        // Sometimes there will be no latest "pointermove" (eg iOS).
        // In which case, we use the start position of the drag.
        var initial = (_latestPointerMove = latestPointerMove) !== null && _latestPointerMove !== void 0 ? _latestPointerMove : {
          x: input.clientX,
          y: input.clientY
        };

        // Don't need to defensively call `finish()` as `onDrop` from
        // one interaction is guaranteed to be called before `onDragStart`
        // of the next.
        finish = mountHoneyPot({
          initial: initial
        });
      }
      if (eventName === 'onDrop') {
        var _finish;
        var _input = payload.location.current.input;
        (_finish = finish) === null || _finish === void 0 || _finish({
          current: {
            x: _input.clientX,
            y: _input.clientY
          }
        });
        finish = null;
        // this interaction is finished, we want to use
        // the latest "pointermove" for each interaction
        latestPointerMove = null;
      }
    };
  }
  return {
    bindEvents: bindEvents,
    getOnPostDispatch: getOnPostDispatch
  };
}

/** Provide a function that you only ever want to be called a single time */
function once(fn) {
  var cache = null;
  return function wrapped() {
    if (!cache) {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var result = fn.apply(this, args);
      cache = {
        result: result
      };
    }
    return cache.result;
  };
}

// using `cache` as our `isFirefox()` result will not change in a browser

/**
 * Returns `true` if a `Firefox` browser
 * */
var isFirefox = once(function isFirefox() {
  if (process.env.NODE_ENV === 'test') {
    return false;
  }
  return navigator.userAgent.includes('Firefox');
});

// using `cache` as our `isSafari()` result will not change in a browser

/**
 * Returns `true` if a `Safari` browser.
 * Returns `true` if the browser is running on iOS (they are all Safari).
 * */
var isSafari = once(function isSafari() {
  if (process.env.NODE_ENV === 'test') {
    return false;
  }
  var _navigator = navigator,
    userAgent = _navigator.userAgent;
  return userAgent.includes('AppleWebKit') && !userAgent.includes('Chrome');
});

/* For "dragenter" events, the browser should set `relatedTarget` to the previous element.
 * For external drag operations, our first "dragenter" event should have a `event.relatedTarget` of `null`.
 *
 *  Unfortunately in Safari `event.relatedTarget` is *always* set to `null`
 *  Safari bug: https://bugs.webkit.org/show_bug.cgi?id=242627
 *  To work around this we count "dragenter" and "dragleave" events */

// Using symbols for event properties so we don't clash with
// anything on the `event` object
var symbols = {
  isLeavingWindow: Symbol('leaving'),
  isEnteringWindow: Symbol('entering')
};
function isEnteringWindowInSafari(_ref) {
  var dragEnter = _ref.dragEnter;
  if (!isSafari()) {
    return false;
  }
  return dragEnter.hasOwnProperty(symbols.isEnteringWindow);
}
function isLeavingWindowInSafari(_ref2) {
  var dragLeave = _ref2.dragLeave;
  if (!isSafari()) {
    return false;
  }
  return dragLeave.hasOwnProperty(symbols.isLeavingWindow);
}
(function fixSafari() {
  // Don't do anything when server side rendering
  if (typeof window === 'undefined') {
    return;
  }

  // rather than checking the userAgent for "jsdom" we can do this check
  // so that the check will be removed completely in production code
  if (process.env.NODE_ENV === 'test') {
    return;
  }
  if (!isSafari()) {
    return;
  }
  function getInitialState() {
    return {
      enterCount: 0,
      isOverWindow: false
    };
  }
  var state = getInitialState();
  function resetState() {
    state = getInitialState();
  }

  // These event listeners are bound _forever_ and _never_ removed
  // We don't bother cleaning up these event listeners (for now)
  // as this workaround is only for Safari

  // This is how the event count works:
  //
  // lift (+1 enterCount)
  // - dragstart(draggable) [enterCount: 0]
  // - dragenter(draggable) [enterCount: 1]
  // leaving draggable (+0 enterCount)
  // - dragenter(document.body) [enterCount: 2]
  // - dragleave(draggable) [enterCount: 1]
  // leaving window (-1 enterCount)
  // - dragleave(document.body) [enterCount: 0] {leaving the window}

  // Things to note:
  // - dragenter and dragleave bubble
  // - the first dragenter when entering a window might not be on `window`
  //   - it could be on an element that is pressed up against the window
  //   - (so we cannot rely on `event.target` values)

  bindAll(window, [{
    type: 'dragstart',
    listener: function listener() {
      state.enterCount = 0;
      // drag start occurs in the source window
      state.isOverWindow = true;
      // When a drag first starts it will also trigger a "dragenter" on the draggable element
    }
  }, {
    type: 'drop',
    listener: resetState
  }, {
    type: 'dragend',
    listener: resetState
  }, {
    type: 'dragenter',
    listener: function listener(event) {
      if (!state.isOverWindow && state.enterCount === 0) {
        // Patching the `event` object
        // The `event` object is shared with all event listeners for the event
        // @ts-expect-error: adding property to the event object
        event[symbols.isEnteringWindow] = true;
      }
      state.isOverWindow = true;
      state.enterCount++;
    }
  }, {
    type: 'dragleave',
    listener: function listener(event) {
      state.enterCount--;
      if (state.isOverWindow && state.enterCount === 0) {
        // Patching the `event` object as it is shared with all event listeners
        // The `event` object is shared with all event listeners for the event
        // @ts-expect-error: adding property to the event object
        event[symbols.isLeavingWindow] = true;
        state.isOverWindow = false;
      }
    }
  }],
  // using `capture: true` so that adding event listeners
  // in bubble phase will have the correct symbols
  {
    capture: true
  });
})();

/**
 * Does the `EventTarget` look like a `Node` based on "duck typing".
 *
 * Helpful when the `Node` might be outside of the current document
 * so we cannot to an `target instanceof Node` check.
 */
function isNodeLike(target) {
  return 'nodeName' in target;
}

/**
 * Is an `EventTarget` a `Node` from another `window`?
 */
function isFromAnotherWindow(eventTarget) {
  return isNodeLike(eventTarget) && eventTarget.ownerDocument !== document;
}

function isLeavingWindow(_ref) {
  var dragLeave = _ref.dragLeave;
  var type = dragLeave.type,
    relatedTarget = dragLeave.relatedTarget;
  if (type !== 'dragleave') {
    return false;
  }
  if (isSafari()) {
    return isLeavingWindowInSafari({
      dragLeave: dragLeave
    });
  }

  // Standard check: if going to `null` we are leaving the `window`
  if (relatedTarget == null) {
    return true;
  }

  /**
   * 🦊 Exception: `iframe` in Firefox (`125.0`)
   *
   * Case 1: parent `window` → child `iframe`
   * `dragLeave.relatedTarget` is element _inside_ the child `iframe`
   * (foreign element)
   *
   * Case 2: child `iframe` → parent `window`
   * `dragLeave.relatedTarget` is the `iframe` in the parent `window`
   * (foreign element)
   */

  if (isFirefox()) {
    return isFromAnotherWindow(relatedTarget);
  }

  /**
   * 🌏 Exception: `iframe` in Chrome (`124.0`)
   *
   * Case 1: parent `window` → child `iframe`
   * `dragLeave.relatedTarget` is the `iframe` in the parent `window`
   *
   * Case 2: child `iframe` → parent `window`
   * `dragLeave.relatedTarget` is `null` *(standard check)*
   */

  // Case 2
  // Using `instanceof` check as the element will be in the same `window`
  return relatedTarget instanceof HTMLIFrameElement;
}

function getBindingsForBrokenDrags(_ref) {
  var onDragEnd = _ref.onDragEnd;
  return [
  // ## Detecting drag ending for removed draggables
  //
  // If a draggable element is removed during a drag and the user drops:
  // 1. if over a valid drop target: we get a "drop" event to know the drag is finished
  // 2. if not over a valid drop target (or cancelled): we get nothing
  // The "dragend" event will not fire on the source draggable if it has been
  // removed from the DOM.
  // So we need to figure out if a drag operation has finished by looking at other events
  // We can do this by looking at other events

  // ### First detection: "pointermove" events

  // 1. "pointermove" events cannot fire during a drag and drop operation
  // according to the spec. So if we get a "pointermove" it means that
  // the drag and drop operations has finished. So if we get a "pointermove"
  // we know that the drag is over
  // 2. 🦊😤 Drag and drop operations are _supposed_ to suppress
  // other pointer events. However, firefox will allow a few
  // pointer event to get through after a drag starts.
  // The most I've seen is 3
  {
    type: 'pointermove',
    listener: function () {
      var callCount = 0;
      return function listener() {
        // Using 20 as it is far bigger than the most observed (3)
        if (callCount < 20) {
          callCount++;
          return;
        }
        onDragEnd();
      };
    }()
  },
  // ### Second detection: "pointerdown" events

  // If we receive this event then we know that a drag operation has finished
  // and potentially another one is about to start.
  // Note: `pointerdown` fires on all browsers / platforms before "dragstart"
  {
    type: 'pointerdown',
    listener: onDragEnd
  }];
}

function getInput(event) {
  return {
    altKey: event.altKey,
    button: event.button,
    buttons: event.buttons,
    ctrlKey: event.ctrlKey,
    metaKey: event.metaKey,
    shiftKey: event.shiftKey,
    clientX: event.clientX,
    clientY: event.clientY,
    pageX: event.pageX,
    pageY: event.pageY
  };
}

var scheduleOnDrag = rafSchd(function (fn) {
  return fn();
});
var dragStart = function () {
  var scheduled = null;
  function schedule(fn) {
    var frameId = requestAnimationFrame(function () {
      scheduled = null;
      fn();
    });
    scheduled = {
      frameId: frameId,
      fn: fn
    };
  }
  function flush() {
    if (scheduled) {
      cancelAnimationFrame(scheduled.frameId);
      scheduled.fn();
      scheduled = null;
    }
  }
  return {
    schedule: schedule,
    flush: flush
  };
}();
function makeDispatch(_ref) {
  var source = _ref.source,
    initial = _ref.initial,
    dispatchEvent = _ref.dispatchEvent;
  var previous = {
    dropTargets: []
  };
  function safeDispatch(args) {
    dispatchEvent(args);
    previous = {
      dropTargets: args.payload.location.current.dropTargets
    };
  }
  var dispatch = {
    start: function start(_ref2) {
      var nativeSetDragImage = _ref2.nativeSetDragImage;
      // Ensuring that both `onGenerateDragPreview` and `onDragStart` get the same location.
      // We do this so that `previous` is`[]` in `onDragStart` (which is logical)
      var location = {
        current: initial,
        previous: previous,
        initial: initial
      };
      // a `onGenerateDragPreview` does _not_ add another entry for `previous`
      // onDragPreview
      safeDispatch({
        eventName: 'onGenerateDragPreview',
        payload: {
          source: source,
          location: location,
          nativeSetDragImage: nativeSetDragImage
        }
      });
      dragStart.schedule(function () {
        safeDispatch({
          eventName: 'onDragStart',
          payload: {
            source: source,
            location: location
          }
        });
      });
    },
    dragUpdate: function dragUpdate(_ref3) {
      var current = _ref3.current;
      dragStart.flush();
      scheduleOnDrag.cancel();
      safeDispatch({
        eventName: 'onDropTargetChange',
        payload: {
          source: source,
          location: {
            initial: initial,
            previous: previous,
            current: current
          }
        }
      });
    },
    drag: function drag(_ref4) {
      var current = _ref4.current;
      scheduleOnDrag(function () {
        dragStart.flush();
        var location = {
          initial: initial,
          previous: previous,
          current: current
        };
        safeDispatch({
          eventName: 'onDrag',
          payload: {
            source: source,
            location: location
          }
        });
      });
    },
    drop: function drop(_ref5) {
      var current = _ref5.current,
        updatedSourcePayload = _ref5.updatedSourcePayload;
      dragStart.flush();
      scheduleOnDrag.cancel();
      safeDispatch({
        eventName: 'onDrop',
        payload: {
          source: updatedSourcePayload !== null && updatedSourcePayload !== void 0 ? updatedSourcePayload : source,
          location: {
            current: current,
            previous: previous,
            initial: initial
          }
        }
      });
    }
  };
  return dispatch;
}

var globalState = {
  isActive: false
};
function canStart() {
  return !globalState.isActive;
}
function getNativeSetDragImage(event) {
  if (event.dataTransfer) {
    // need to use `.bind` as `setDragImage` is required
    // to be run with `event.dataTransfer` as the "this" context
    return event.dataTransfer.setDragImage.bind(event.dataTransfer);
  }
  return null;
}
function hasHierarchyChanged(_ref) {
  var current = _ref.current,
    next = _ref.next;
  if (current.length !== next.length) {
    return true;
  }
  // not checking stickiness, data or dropEffect,
  // just whether the hierarchy has changed
  for (var i = 0; i < current.length; i++) {
    if (current[i].element !== next[i].element) {
      return true;
    }
  }
  return false;
}
function start(_ref2) {
  var event = _ref2.event,
    dragType = _ref2.dragType,
    getDropTargetsOver = _ref2.getDropTargetsOver,
    dispatchEvent = _ref2.dispatchEvent;
  if (!canStart()) {
    return;
  }
  var initial = getStartLocation({
    event: event,
    dragType: dragType,
    getDropTargetsOver: getDropTargetsOver
  });
  globalState.isActive = true;
  var state = {
    current: initial
  };

  // Setting initial drop effect for the drag
  setDropEffectOnEvent({
    event: event,
    current: initial.dropTargets
  });
  var dispatch = makeDispatch({
    source: dragType.payload,
    dispatchEvent: dispatchEvent,
    initial: initial
  });
  function updateState(next) {
    // only looking at whether hierarchy has changed to determine whether something as 'changed'
    var hasChanged = hasHierarchyChanged({
      current: state.current.dropTargets,
      next: next.dropTargets
    });

    // Always updating the state to include latest data, dropEffect and stickiness
    // Only updating consumers if the hierarchy has changed in some way
    // Consumers can get the latest data by using `onDrag`
    state.current = next;
    if (hasChanged) {
      dispatch.dragUpdate({
        current: state.current
      });
    }
  }
  function onUpdateEvent(event) {
    var input = getInput(event);

    // If we are over the honey pot, we need to get the element
    // that the user would have been over if not for the honey pot
    var target = isHoneyPotElement(event.target) ? getElementFromPointWithoutHoneypot({
      x: input.clientX,
      y: input.clientY
    }) : event.target;
    var nextDropTargets = getDropTargetsOver({
      target: target,
      input: input,
      source: dragType.payload,
      current: state.current.dropTargets
    });
    if (nextDropTargets.length) {
      // 🩸 must call `event.preventDefault()` to allow a browser drop to occur
      event.preventDefault();
      setDropEffectOnEvent({
        event: event,
        current: nextDropTargets
      });
    }
    updateState({
      dropTargets: nextDropTargets,
      input: input
    });
  }
  function cancel() {
    // The spec behaviour is that when a drag is cancelled, or when dropping on no drop targets,
    // a "dragleave" event is fired on the active drop target before a "dragend" event.
    // We are replicating that behaviour in `cancel` if there are any active drop targets to
    // ensure consistent behaviour.
    //
    // Note: When cancelling, or dropping on no drop targets, a "dragleave" event
    // will have already cleared the dropTargets to `[]` (as that particular "dragleave" has a `relatedTarget` of `null`)

    if (state.current.dropTargets.length) {
      updateState({
        dropTargets: [],
        input: state.current.input
      });
    }
    dispatch.drop({
      current: state.current,
      updatedSourcePayload: null
    });
    finish();
  }
  function finish() {
    globalState.isActive = false;
    unbindEvents();
  }
  var unbindEvents = bindAll(window, [{
    // 👋 Note: we are repurposing the `dragover` event as our `drag` event
    // this is because firefox does not publish pointer coordinates during
    // a `drag` event, but does for every other type of drag event
    // `dragover` fires on all elements that are being dragged over
    // Because we are binding to `window` - our `dragover` is effectively the same as a `drag`
    // 🦊😤
    type: 'dragover',
    listener: function listener(event) {
      // We need to regularly calculate the drop targets in order to allow:
      //  - dynamic `canDrop()` checks
      //  - rapid updating `getData()` calls to attach data in response to user input (eg for edge detection)
      // Sadly we cannot schedule inspecting changes resulting from this event
      // we need to be able to conditionally cancel the event with `event.preventDefault()`
      // to enable the correct native drop experience.

      // 1. check to see if anything has changed
      onUpdateEvent(event);

      // 2. let consumers know a move has occurred
      // This will include the latest 'input' values
      dispatch.drag({
        current: state.current
      });
    }
  }, {
    type: 'dragenter',
    listener: onUpdateEvent
  }, {
    type: 'dragleave',
    listener: function listener(event) {
      if (!isLeavingWindow({
        dragLeave: event
      })) {
        return;
      }

      /**
       * At this point we don't know if a drag is being cancelled,
       * or if a drag is leaving the `window`.
       *
       * Both have:
       *   1. "dragleave" (with `relatedTarget: null`)
       *   2. "dragend" (a "dragend" can occur when outside the `window`)
       *
       * **Clearing drop targets**
       *
       * For either case we are clearing the the drop targets
       *
       * - cancelling: we clear drop targets in `"dragend"` anyway
       * - leaving the `window`: we clear the drop targets (to clear stickiness)
       *
       * **Leaving the window and finishing the drag**
       *
       * _internal drags_
       *
       * - The drag continues when the user is outside the `window`
       *   and can resume if the user drags back over the `window`,
       *   or end when the user drops in an external `window`.
       * - We will get a `"dragend"`, or we can listen for other
       *   events to determine the drag is finished when the user re-enters the `window`).
       *
       * _external drags_
       *
       * - We conclude the drag operation.
       * - We have no idea if the user will drag back over the `window`,
       *   or if the drag ends elsewhere.
       * - We will create a new drag if the user re-enters the `window`.
       *
       * **Not updating `input`**
       *
       * 🐛 Bug[Chrome] the final `"dragleave"` has default input values (eg `clientX == 0`)
       * Workaround: intentionally not updating `input` in "dragleave"
       * rather than the users current input values
       * - [Conversation](https://twitter.com/alexandereardon/status/1642697633864241152)
       * - [Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1429937)
       **/

      updateState({
        input: state.current.input,
        dropTargets: []
      });
      if (dragType.startedFrom === 'external') {
        cancel();
      }
    }
  }, {
    // A "drop" can only happen if the browser allowed the drop
    type: 'drop',
    listener: function listener(event) {
      // Capture the final input.
      // We are capturing the final `input` for the
      // most accurate honey pot experience
      state.current = {
        dropTargets: state.current.dropTargets,
        input: getInput(event)
      };

      /** If there are no drop targets, then we will get
       * a "drop" event if:
       * - `preventUnhandled()` is being used
       * - there is an unmanaged drop target (eg another library)
       * In these cases, it's up to the consumer
       * to handle the drop if it's not over one of our drop targets
       * - `preventUnhandled()` will cancel the "drop"
       * - unmanaged drop targets can handle the "drop" how they want to
       * We won't call `event.preventDefault()` in this call path */

      if (!state.current.dropTargets.length) {
        cancel();
        return;
      }
      event.preventDefault();

      // applying the latest drop effect to the event
      setDropEffectOnEvent({
        event: event,
        current: state.current.dropTargets
      });
      dispatch.drop({
        current: state.current,
        // When dropping something native, we need to extract the latest
        // `.items` from the "drop" event as it is now accessible
        updatedSourcePayload: dragType.type === 'external' ? dragType.getDropPayload(event) : null
      });
      finish();
    }
  }, {
    // "dragend" fires when on the drag source (eg a draggable element)
    // when the drag is finished.
    // "dragend" will fire after "drop" (if there was a successful drop)
    // "dragend" does not fire if the draggable source has been removed during the drag
    // or for external drag sources (eg files)

    // This "dragend" listener will not fire if there was a successful drop
    // as we will have already removed the event listener

    type: 'dragend',
    listener: function listener(event) {
      // In firefox, the position of the "dragend" event can
      // be a bit different to the last "dragover" event.
      // Updating the input so we can get the best possible
      // information for the honey pot.
      state.current = {
        dropTargets: state.current.dropTargets,
        input: getInput(event)
      };
      cancel();
    }
  }].concat(_toConsumableArray(getBindingsForBrokenDrags({
    onDragEnd: cancel
  }))),
  // Once we have started a managed drag operation it is important that we see / own all drag events
  // We got one adoption bug pop up where some code was stopping (`event.stopPropagation()`)
  // all "drop" events in the bubble phase on the `document.body`.
  // This meant that we never saw the "drop" event.
  {
    capture: true
  });
  dispatch.start({
    nativeSetDragImage: getNativeSetDragImage(event)
  });
}
function setDropEffectOnEvent(_ref3) {
  var _current$;
  var event = _ref3.event,
    current = _ref3.current;
  // setting the `dropEffect` to be the innerMost drop targets dropEffect
  var innerMost = (_current$ = current[0]) === null || _current$ === void 0 ? void 0 : _current$.dropEffect;
  if (innerMost != null && event.dataTransfer) {
    event.dataTransfer.dropEffect = innerMost;
  }
}
function getStartLocation(_ref4) {
  var event = _ref4.event,
    dragType = _ref4.dragType,
    getDropTargetsOver = _ref4.getDropTargetsOver;
  var input = getInput(event);

  // When dragging from outside of the browser,
  // the drag is not being sourced from any local drop targets
  if (dragType.startedFrom === 'external') {
    return {
      input: input,
      dropTargets: []
    };
  }
  var dropTargets = getDropTargetsOver({
    input: input,
    source: dragType.payload,
    target: event.target,
    current: []
  });
  return {
    input: input,
    dropTargets: dropTargets
  };
}
var lifecycle = {
  canStart: canStart,
  start: start
};

// Extending `Map` to allow us to link Key and Values together

var ledger = new Map();
function registerUsage(_ref) {
  var typeKey = _ref.typeKey,
    mount = _ref.mount;
  var entry = ledger.get(typeKey);
  if (entry) {
    entry.usageCount++;
    return entry;
  }
  var initial = {
    typeKey: typeKey,
    unmount: mount(),
    usageCount: 1
  };
  ledger.set(typeKey, initial);
  return initial;
}
function register(args) {
  var entry = registerUsage(args);
  return function unregister() {
    entry.usageCount--;
    if (entry.usageCount > 0) {
      return;
    }
    // Only a single usage left, remove it
    entry.unmount();
    ledger.delete(args.typeKey);
  };
}

/** Create a new combined function that will call all the provided functions */
function combine() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function cleanup() {
    fns.forEach(function (fn) {
      return fn();
    });
  };
}

function addAttribute(element, _ref) {
  var attribute = _ref.attribute,
    value = _ref.value;
  element.setAttribute(attribute, value);
  return function () {
    return element.removeAttribute(attribute);
  };
}

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper$1(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray$1(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray$1(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray$1(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0; } }
function _arrayLikeToArray$1(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function copyReverse(array) {
  return array.slice(0).reverse();
}
function makeDropTarget(_ref) {
  var typeKey = _ref.typeKey,
    defaultDropEffect = _ref.defaultDropEffect;
  var registry = new WeakMap();
  var dropTargetDataAtt = "data-drop-target-for-".concat(typeKey);
  var dropTargetSelector = "[".concat(dropTargetDataAtt, "]");
  function addToRegistry(args) {
    registry.set(args.element, args);
    return function () {
      return registry.delete(args.element);
    };
  }
  function dropTargetForConsumers(args) {
    // Guardrail: warn if the draggable element is already registered
    if (process.env.NODE_ENV !== 'production') {
      var existing = registry.get(args.element);
      if (existing) {
        // eslint-disable-next-line no-console
        console.warn("You have already registered a [".concat(typeKey, "] dropTarget on the same element"), {
          existing: existing,
          proposed: args
        });
      }
      if (args.element instanceof HTMLIFrameElement) {
        // eslint-disable-next-line no-console
        console.warn("\n            We recommend not registering <iframe> elements as drop targets\n            as it can result in some strange browser event ordering.\n          " // Removing newlines and excessive whitespace
        .replace(/\s{2,}/g, ' ').trim());
      }
    }
    return combine(addAttribute(args.element, {
      attribute: dropTargetDataAtt,
      value: 'true'
    }), addToRegistry(args));
  }
  function getActualDropTargets(_ref2) {
    var _args$getData, _args$getData2, _args$getDropEffect, _args$getDropEffect2;
    var source = _ref2.source,
      target = _ref2.target,
      input = _ref2.input,
      _ref2$result = _ref2.result,
      result = _ref2$result === void 0 ? [] : _ref2$result;
    if (target == null) {
      return result;
    }
    if (!(target instanceof Element)) {
      // For "text-selection" drags, the original `target`
      // is not an `Element`, so we need to start looking from
      // the parent element
      if (target instanceof Node) {
        return getActualDropTargets({
          source: source,
          target: target.parentElement,
          input: input,
          result: result
        });
      }

      // not sure what we are working with,
      // so we can exit.
      return result;
    }
    var closest = target.closest(dropTargetSelector);

    // Cannot find anything else
    if (closest == null) {
      return result;
    }
    var args = registry.get(closest);

    // error: something had a dropTargetSelector but we could not
    // find a match. For now, failing silently
    if (args == null) {
      return result;
    }
    var feedback = {
      input: input,
      source: source,
      element: args.element
    };

    // if dropping is not allowed, skip this drop target
    // and continue looking up the DOM tree
    if (args.canDrop && !args.canDrop(feedback)) {
      return getActualDropTargets({
        source: source,
        target: args.element.parentElement,
        input: input,
        result: result
      });
    }

    // calculate our new record
    var data = (_args$getData = (_args$getData2 = args.getData) === null || _args$getData2 === void 0 ? void 0 : _args$getData2.call(args, feedback)) !== null && _args$getData !== void 0 ? _args$getData : {};
    var dropEffect = (_args$getDropEffect = (_args$getDropEffect2 = args.getDropEffect) === null || _args$getDropEffect2 === void 0 ? void 0 : _args$getDropEffect2.call(args, feedback)) !== null && _args$getDropEffect !== void 0 ? _args$getDropEffect : defaultDropEffect;
    var record = {
      data: data,
      element: args.element,
      dropEffect: dropEffect,
      // we are collecting _actual_ drop targets, so these are
      // being applied _not_ due to stickiness
      isActiveDueToStickiness: false
    };
    return getActualDropTargets({
      source: source,
      target: args.element.parentElement,
      input: input,
      // Using bubble ordering. Same ordering as `event.getPath()`
      result: [].concat(_toConsumableArray(result), [record])
    });
  }
  function notifyCurrent(_ref3) {
    var eventName = _ref3.eventName,
      payload = _ref3.payload;
    var _iterator = _createForOfIteratorHelper$1(payload.location.current.dropTargets),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _entry$eventName;
        var record = _step.value;
        var entry = registry.get(record.element);
        var args = _objectSpread$1(_objectSpread$1({}, payload), {}, {
          self: record
        });
        entry === null || entry === void 0 || (_entry$eventName = entry[eventName]) === null || _entry$eventName === void 0 || _entry$eventName.call(entry,
        // I cannot seem to get the types right here.
        // TS doesn't seem to like that one event can need `nativeSetDragImage`
        // @ts-expect-error
        args);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  var actions = {
    onGenerateDragPreview: notifyCurrent,
    onDrag: notifyCurrent,
    onDragStart: notifyCurrent,
    onDrop: notifyCurrent,
    onDropTargetChange: function onDropTargetChange(_ref4) {
      var payload = _ref4.payload;
      var isCurrent = new Set(payload.location.current.dropTargets.map(function (record) {
        return record.element;
      }));
      var visited = new Set();
      var _iterator2 = _createForOfIteratorHelper$1(payload.location.previous.dropTargets),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _entry$onDropTargetCh;
          var record = _step2.value;
          visited.add(record.element);
          var entry = registry.get(record.element);
          var isOver = isCurrent.has(record.element);
          var args = _objectSpread$1(_objectSpread$1({}, payload), {}, {
            self: record
          });
          entry === null || entry === void 0 || (_entry$onDropTargetCh = entry.onDropTargetChange) === null || _entry$onDropTargetCh === void 0 || _entry$onDropTargetCh.call(entry, args);

          // if we cannot find the drop target in the current array, then it has been left
          if (!isOver) {
            var _entry$onDragLeave;
            entry === null || entry === void 0 || (_entry$onDragLeave = entry.onDragLeave) === null || _entry$onDragLeave === void 0 || _entry$onDragLeave.call(entry, args);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var _iterator3 = _createForOfIteratorHelper$1(payload.location.current.dropTargets),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _entry$onDropTargetCh2, _entry$onDragEnter;
          var _record = _step3.value;
          // already published an update to this drop target
          if (visited.has(_record.element)) {
            continue;
          }
          // at this point we have a new drop target that is being entered into
          var _args = _objectSpread$1(_objectSpread$1({}, payload), {}, {
            self: _record
          });
          var _entry = registry.get(_record.element);
          _entry === null || _entry === void 0 || (_entry$onDropTargetCh2 = _entry.onDropTargetChange) === null || _entry$onDropTargetCh2 === void 0 || _entry$onDropTargetCh2.call(_entry, _args);
          _entry === null || _entry === void 0 || (_entry$onDragEnter = _entry.onDragEnter) === null || _entry$onDragEnter === void 0 || _entry$onDragEnter.call(_entry, _args);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  };
  function dispatchEvent(args) {
    actions[args.eventName](args);
  }
  function getIsOver(_ref5) {
    var source = _ref5.source,
      target = _ref5.target,
      input = _ref5.input,
      current = _ref5.current;
    var actual = getActualDropTargets({
      source: source,
      target: target,
      input: input
    });

    // stickiness is only relevant when we have less
    // drop targets than we did before
    if (actual.length >= current.length) {
      return actual;
    }

    // less 'actual' drop targets than before,
    // we need to see if 'stickiness' applies

    // An old drop target will continue to be dropped on if:
    // 1. it has the same parent
    // 2. nothing exists in it's previous index

    var lastCaptureOrdered = copyReverse(current);
    var actualCaptureOrdered = copyReverse(actual);
    var resultCaptureOrdered = [];
    for (var index = 0; index < lastCaptureOrdered.length; index++) {
      var _argsForLast$getIsSti;
      var last = lastCaptureOrdered[index];
      var fresh = actualCaptureOrdered[index];

      // if a record is in the new index -> use that
      // it will have the latest data + dropEffect
      if (fresh != null) {
        resultCaptureOrdered.push(fresh);
        continue;
      }

      // At this point we have no drop target in the old spot
      // Check to see if we can use a previous sticky drop target

      // The "parent" is the one inside of `resultCaptureOrdered`
      // (the parent might be a drop target that was sticky)
      var parent = resultCaptureOrdered[index - 1];
      var lastParent = lastCaptureOrdered[index - 1];

      // Stickiness is based on parent relationships, so if the parent relationship has change
      // then we can stop our search
      if ((parent === null || parent === void 0 ? void 0 : parent.element) !== (lastParent === null || lastParent === void 0 ? void 0 : lastParent.element)) {
        break;
      }

      // We need to check whether the old drop target can still be dropped on

      var argsForLast = registry.get(last.element);

      // We cannot drop on a drop target that is no longer mounted
      if (!argsForLast) {
        break;
      }
      var feedback = {
        input: input,
        source: source,
        element: argsForLast.element
      };

      // We cannot drop on a drop target that no longer allows being dropped on
      if (argsForLast.canDrop && !argsForLast.canDrop(feedback)) {
        break;
      }

      // We cannot drop on a drop target that is no longer sticky
      if (!((_argsForLast$getIsSti = argsForLast.getIsSticky) !== null && _argsForLast$getIsSti !== void 0 && _argsForLast$getIsSti.call(argsForLast, feedback))) {
        break;
      }

      // Note: intentionally not recollecting `getData()` or `getDropEffect()`
      // Previous values for `data` and `dropEffect` will be borrowed
      // This is to prevent things like the 'closest edge' changing when
      // no longer over a drop target.
      // We could change our mind on this behaviour in the future

      resultCaptureOrdered.push(_objectSpread$1(_objectSpread$1({}, last), {}, {
        // making it clear to consumers this drop target is active due to stickiness
        isActiveDueToStickiness: true
      }));
    }

    // return bubble ordered result
    return copyReverse(resultCaptureOrdered);
  }
  return {
    dropTargetForConsumers: dropTargetForConsumers,
    getIsOver: getIsOver,
    dispatchEvent: dispatchEvent
  };
}

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function makeMonitor() {
  var registry = new Set();
  var dragging = null;
  function tryAddToActive(monitor) {
    if (!dragging) {
      return;
    }
    // Monitor is allowed to monitor events if:
    // 1. It has no `canMonitor` function (default is that a monitor can listen to everything)
    // 2. `canMonitor` returns true
    if (!monitor.canMonitor || monitor.canMonitor(dragging.canMonitorArgs)) {
      dragging.active.add(monitor);
    }
  }
  function monitorForConsumers(args) {
    // We are giving each `args` a new reference so that you
    // can create multiple monitors with the same `args`.
    var entry = _objectSpread({}, args);
    registry.add(entry);

    // if there is an active drag we need to see if this new monitor is relevant
    tryAddToActive(entry);
    return function cleanup() {
      registry.delete(entry);

      // We need to stop publishing events during a drag to this monitor!
      if (dragging) {
        dragging.active.delete(entry);
      }
    };
  }
  function dispatchEvent(_ref) {
    var eventName = _ref.eventName,
      payload = _ref.payload;
    if (eventName === 'onGenerateDragPreview') {
      dragging = {
        canMonitorArgs: {
          initial: payload.location.initial,
          source: payload.source
        },
        active: new Set()
      };
      var _iterator = _createForOfIteratorHelper(registry),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var monitor = _step.value;
          tryAddToActive(monitor);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    // This should never happen.
    if (!dragging) {
      return;
    }

    // Creating an array from the set _before_ iterating
    // This is so that monitors added during the current event will not be called.
    // This behaviour matches native EventTargets where an event listener
    // cannot add another event listener during an active event to the same
    // event target in the same event (for us we have a single global event target)
    var active = Array.from(dragging.active);
    for (var _i = 0, _active = active; _i < _active.length; _i++) {
      var _monitor = _active[_i];
      // A monitor can be removed by another monitor during an event.
      // We need to check that the monitor is still registered before calling it
      if (dragging.active.has(_monitor)) {
        var _monitor$eventName;
        // @ts-expect-error: I cannot get this type working!
        (_monitor$eventName = _monitor[eventName]) === null || _monitor$eventName === void 0 || _monitor$eventName.call(_monitor, payload);
      }
    }
    if (eventName === 'onDrop') {
      dragging.active.clear();
      dragging = null;
    }
  }
  return {
    dispatchEvent: dispatchEvent,
    monitorForConsumers: monitorForConsumers
  };
}

function makeAdapter(_ref) {
  var typeKey = _ref.typeKey,
    mount = _ref.mount,
    dispatchEventToSource = _ref.dispatchEventToSource,
    onPostDispatch = _ref.onPostDispatch,
    defaultDropEffect = _ref.defaultDropEffect;
  var monitorAPI = makeMonitor();
  var dropTargetAPI = makeDropTarget({
    typeKey: typeKey,
    defaultDropEffect: defaultDropEffect
  });
  function dispatchEvent(args) {
    // 1. forward the event to source
    dispatchEventToSource === null || dispatchEventToSource === void 0 || dispatchEventToSource(args);

    // 2. forward the event to relevant dropTargets
    dropTargetAPI.dispatchEvent(args);

    // 3. forward event to monitors
    monitorAPI.dispatchEvent(args);

    // 4. post consumer dispatch (used for honey pot fix)
    onPostDispatch === null || onPostDispatch === void 0 || onPostDispatch(args);
  }
  function start(_ref2) {
    var event = _ref2.event,
      dragType = _ref2.dragType;
    lifecycle.start({
      event: event,
      dragType: dragType,
      getDropTargetsOver: dropTargetAPI.getIsOver,
      dispatchEvent: dispatchEvent
    });
  }
  function registerUsage() {
    function mountAdapter() {
      var api = {
        canStart: lifecycle.canStart,
        start: start
      };
      return mount(api);
    }
    return register({
      typeKey: typeKey,
      mount: mountAdapter
    });
  }
  return {
    registerUsage: registerUsage,
    dropTarget: dropTargetAPI.dropTargetForConsumers,
    monitor: monitorAPI.monitorForConsumers
  };
}

// using `cache` as our `isAndroid()` result will not change in a browser
var isAndroid = once(function isAndroid() {
  return navigator.userAgent.toLocaleLowerCase().includes('android');
});
var androidFallbackText = 'pdnd:android-fallback';

// Why we put the media types in their own files:
//
// - we are not putting them all in one file as not all adapters need all types
// - we are not putting them in the external helpers as some things just need the
//   types and not the external functions code
var textMediaType = 'text/plain';

// Why we put the media types in their own files:
//
// - we are not putting them all in one file as not all adapters need all types
// - we are not putting them in the external helpers as some things just need the
//   types and not the external functions code
var URLMediaType = 'text/uri-list';

/**
 * This key has been pulled into a separate module
 * so that the external adapter does not need to import
 * the element adapter
 */
var elementAdapterNativeDataKey = 'application/vnd.pdnd';

var draggableRegistry = new WeakMap();
function addToRegistry(args) {
  draggableRegistry.set(args.element, args);
  return function cleanup() {
    draggableRegistry.delete(args.element);
  };
}
var honeyPotFix = makeHoneyPotFix();
var adapter$1 = makeAdapter({
  typeKey: 'element',
  defaultDropEffect: 'move',
  mount: function mount(api) {
    /**  Binding event listeners the `document` rather than `window` so that
     * this adapter always gets preference over the text adapter.
     * `document` is the first `EventTarget` under `window`
     * https://twitter.com/alexandereardon/status/1604658588311465985
     */
    return combine(honeyPotFix.bindEvents(), bind(document, {
      type: 'dragstart',
      listener: function listener(event) {
        var _entry$dragHandle, _entry$getInitialData, _entry$getInitialData2, _entry$dragHandle2, _entry$getInitialData3, _entry$getInitialData4;
        if (!api.canStart(event)) {
          return;
        }

        // If the "dragstart" event is cancelled, then a drag won't start
        // There will be no further drag operation events (eg no "dragend" event)
        if (event.defaultPrevented) {
          return;
        }

        // Technically `dataTransfer` can be `null` according to the types
        // But that behaviour does not seem to appear in the spec.
        // If there is not `dataTransfer`, we can assume something is wrong and not
        // start a drag
        if (!event.dataTransfer) {
          // Including this code on "test" and "development" environments:
          // - Browser tests commonly run against "development" builds
          // - Unit tests commonly run in "test"
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.warn("\n              It appears as though you have are not testing DragEvents correctly.\n\n              - If you are unit testing, ensure you have polyfilled DragEvent.\n              - If you are browser testing, ensure you are dispatching drag events correctly.\n\n              Please see our testing guides for more information:\n              https://atlassian.design/components/pragmatic-drag-and-drop/core-package/testing\n            ".replace(/ {2}/g, ''));
          }
          return;
        }

        // the closest parent that is a draggable element will be marked as
        // the `event.target` for the event
        var target = event.target;

        // this source is only for elements
        // Note: only HTMLElements can have the "draggable" attribute
        if (!(target instanceof HTMLElement)) {
          return null;
        }

        // see if the thing being dragged is owned by us
        var entry = draggableRegistry.get(target);

        // no matching element found
        // → dragging an element with `draggable="true"` that is not controlled by us
        if (!entry) {
          return null;
        }

        /**
         * A text selection drag _can_ have the `draggable` element be
         * the `event.target` if the user is dragging the text selection
         * from the `draggable`.
         *
         * To know if the `draggable` is being dragged, we look at whether any
         * `"text/plain"` data is being dragged. If it is, then a text selection
         * drag is occurring.
         *
         * This behaviour has been validated on:
         *
         * - Chrome@128 on Android@14
         * - Chrome@128 on iOS@17.6.1
         * - Chrome@128 on Windows@11
         * - Chrome@128 on MacOS@14.6.1
         * - Firefox@129 on Windows@11 (not possible for user to select text in a draggable)
         * - Firefox@129 on MacOS@14.6.1 (not possible for user to select text in a draggable)
         *
         * Note: Could usually just use: `event.dataTransfer.types.includes(textMediaType)`
         * but unfortunately ProseMirror is always setting `""` as the dragged text
         *
         * Note: Unfortunately editor is (heavily) leaning on the current functionality today
         * and unwinding it will be a decent amount of effort. So for now, a text selection
         * where the `event.target` is a `draggable` element will still trigger the
         * element adapter.
         *
         * // Future state:
         * if(event.dataTransfer.getData(textMediaType)) {
         * 	return;
         * }
         *
         */

        var input = getInput(event);
        var feedback = {
          element: entry.element,
          dragHandle: (_entry$dragHandle = entry.dragHandle) !== null && _entry$dragHandle !== void 0 ? _entry$dragHandle : null,
          input: input
        };

        // Check: does the draggable want to allow dragging?
        if (entry.canDrag && !entry.canDrag(feedback)) {
          // cancel drag operation if we cannot drag
          event.preventDefault();
          return null;
        }

        // Check: is there a drag handle and is the user using it?
        if (entry.dragHandle) {
          // technically don't need this util, but just being
          // consistent with how we look up what is under the users
          // cursor.
          var over = getElementFromPointWithoutHoneypot({
            x: input.clientX,
            y: input.clientY
          });

          // if we are not dragging from the drag handle (or something inside the drag handle)
          // then we will cancel the active drag
          if (!entry.dragHandle.contains(over)) {
            event.preventDefault();
            return null;
          }
        }

        /**
         *  **Goal**
         *  Pass information to other applications
         *
         * **Approach**
         *  Put data into the native data store
         *
         *  **What about the native adapter?**
         *  When the element adapter puts native data into the native data store
         *  the native adapter is not triggered in the current window,
         *  but a native adapter in an external window _can_ be triggered
         *
         *  **Why bake this into core?**
         *  This functionality could be pulled out and exposed inside of
         *  `onGenerateDragPreview`. But decided to make it a part of the
         *  base API as it felt like a common enough use case and ended
         *  up being a similar amount of code to include this function as
         *  it was to expose the hook for it
         */
        var nativeData = (_entry$getInitialData = (_entry$getInitialData2 = entry.getInitialDataForExternal) === null || _entry$getInitialData2 === void 0 ? void 0 : _entry$getInitialData2.call(entry, feedback)) !== null && _entry$getInitialData !== void 0 ? _entry$getInitialData : null;
        if (nativeData) {
          for (var _i = 0, _Object$entries = Object.entries(nativeData); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              data = _Object$entries$_i[1];
            event.dataTransfer.setData(key, data !== null && data !== void 0 ? data : '');
          }
        }

        /**
         *  📱 For Android devices, a drag operation will not start unless
         * "text/plain" or "text/uri-list" data exists in the native data store
         * https://twitter.com/alexandereardon/status/1732189803754713424
         *
         * Tested on:
         * Device: Google Pixel 5
         * Android version: 14 (November 5, 2023)
         * Chrome version: 120.0
         */
        if (isAndroid() && !event.dataTransfer.types.includes(textMediaType) && !event.dataTransfer.types.includes(URLMediaType)) {
          event.dataTransfer.setData(textMediaType, androidFallbackText);
        }

        /**
         * 1. Must set any media type for `iOS15` to work
         * 2. We are also doing adding data so that the native adapter
         * can know that the element adapter has handled this drag
         *
         * We used to wrap this `setData()` in a `try/catch` for Firefox,
         * but it looks like that was not needed.
         *
         * Tested using: https://codesandbox.io/s/checking-firefox-throw-behaviour-on-dragstart-qt8h4f
         *
         * - ✅ Firefox@70.0 (Oct 2019) on macOS Sonoma
         * - ✅ Firefox@70.0 (Oct 2019) on macOS Big Sur
         * - ✅ Firefox@70.0 (Oct 2019) on Windows 10
         *
         * // just checking a few more combinations to be super safe
         *
         * - ✅ Chrome@78 (Oct 2019) on macOS Big Sur
         * - ✅ Chrome@78 (Oct 2019) on Windows 10
         * - ✅ Safari@14.1 on macOS Big Sur
         */
        event.dataTransfer.setData(elementAdapterNativeDataKey, '');
        var payload = {
          element: entry.element,
          dragHandle: (_entry$dragHandle2 = entry.dragHandle) !== null && _entry$dragHandle2 !== void 0 ? _entry$dragHandle2 : null,
          data: (_entry$getInitialData3 = (_entry$getInitialData4 = entry.getInitialData) === null || _entry$getInitialData4 === void 0 ? void 0 : _entry$getInitialData4.call(entry, feedback)) !== null && _entry$getInitialData3 !== void 0 ? _entry$getInitialData3 : {}
        };
        var dragType = {
          type: 'element',
          payload: payload,
          startedFrom: 'internal'
        };
        api.start({
          event: event,
          dragType: dragType
        });
      }
    }));
  },
  dispatchEventToSource: function dispatchEventToSource(_ref) {
    var _draggableRegistry$ge, _draggableRegistry$ge2;
    var eventName = _ref.eventName,
      payload = _ref.payload;
    // During a drag operation, a draggable can be:
    // - remounted with different functions
    // - removed completely
    // So we need to get the latest entry from the registry in order
    // to call the latest event functions

    (_draggableRegistry$ge = draggableRegistry.get(payload.source.element)) === null || _draggableRegistry$ge === void 0 || (_draggableRegistry$ge2 = _draggableRegistry$ge[eventName]) === null || _draggableRegistry$ge2 === void 0 || _draggableRegistry$ge2.call(_draggableRegistry$ge,
    // I cannot seem to get the types right here.
    // TS doesn't seem to like that one event can need `nativeSetDragImage`
    // @ts-expect-error
    payload);
  },
  onPostDispatch: honeyPotFix.getOnPostDispatch()
});
var dropTargetForElements = adapter$1.dropTarget;
var monitorForElements = adapter$1.monitor;
function draggable(args) {
  // Guardrail: warn if the drag handle is not contained in draggable element
  if (process.env.NODE_ENV !== 'production') {
    if (args.dragHandle && !args.element.contains(args.dragHandle)) {
      // eslint-disable-next-line no-console
      console.warn('Drag handle element must be contained in draggable element', {
        element: args.element,
        dragHandle: args.dragHandle
      });
    }
  }
  // Guardrail: warn if the draggable element is already registered
  if (process.env.NODE_ENV !== 'production') {
    var existing = draggableRegistry.get(args.element);
    if (existing) {
      // eslint-disable-next-line no-console
      console.warn('You have already registered a `draggable` on the same element', {
        existing: existing,
        proposed: args
      });
    }
  }
  return combine(
  // making the draggable register the adapter rather than drop targets
  // this is because you *must* have a draggable element to start a drag
  // but you _might_ not have any drop targets immediately
  // (You might create drop targets async)
  adapter$1.registerUsage(), addToRegistry(args), addAttribute(args.element, {
    attribute: 'draggable',
    value: 'true'
  }));
}

/** Common event payload for all events */

/** A map containing payloads for all events */

/** Common event payload for all drop target events */

/** A map containing payloads for all events on drop targets */

/** Arguments given to all feedback functions (eg `canDrag()`) on for a `draggable()` */

/** Arguments given to all feedback functions (eg `canDrop()`) on a `dropTargetForElements()` */

/** Arguments given to all monitor feedback functions (eg `canMonitor()`) for a `monitorForElements` */

function ColumnCard({ columnId }) {
    const ref = useRef(null);
    const [dragging, setDragging] = useState(false); // NEW
    const { table } = useDataTableContext();
    const column = table.getColumn(columnId);
    invariant(column);
    const displayName = column.columnDef.meta?.displayName ?? columnId;
    useEffect(() => {
        const el = ref.current;
        invariant(el);
        return draggable({
            element: el,
            getInitialData: () => {
                return { column: table.getColumn(columnId) };
            },
            onDragStart: () => setDragging(true), // NEW
            onDrop: () => setDragging(false), // NEW
        });
    }, [columnId, table]);
    return (jsxs(Grid, { ref: ref, templateColumns: "auto 1fr", gap: "0.5rem", alignItems: "center", style: dragging ? { opacity: 0.4 } : {}, children: [jsx(Flex, { alignItems: "center", padding: "0", cursor: 'grab', children: jsx(FaGripLinesVertical, { color: "colorPalette.400" }) }), jsx(Flex, { justifyContent: "space-between", alignItems: "center", children: jsx(CheckboxCard, { variant: 'surface', label: displayName, checked: column.getIsVisible(), onChange: column.getToggleVisibilityHandler() }) })] }));
}
function CardContainer({ location, children }) {
    const ref = useRef(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (el === null) {
            return;
        }
        invariant(el);
        return dropTargetForElements({
            element: el,
            getData: () => ({ location }),
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: () => setIsDraggedOver(false),
        });
    }, [location]);
    function getColor(isDraggedOver) {
        if (isDraggedOver) {
            return {
                backgroundColor: 'blue.400',
                _dark: {
                    backgroundColor: 'blue.400',
                },
            };
        }
        return {
            backgroundColor: undefined,
            _dark: {
                backgroundColor: undefined,
            },
        };
    }
    return (jsx(Box, { ...getColor(isDraggedOver), ref: ref, children: children }));
}
const TableViewer = () => {
    const { table } = useDataTableContext();
    const order = table.getState().columnOrder.length > 0
        ? table.getState().columnOrder
        : table.getAllLeafColumns().map(({ id }) => {
            return id;
        });
    useEffect(() => {
        return monitorForElements({
            onDrop({ source, location }) {
                const destination = location.current.dropTargets[0];
                if (!destination) {
                    return;
                }
                const destinationLocation = destination.data.location;
                // const sourceLocation = source.data.location;
                const sourceColumn = source.data.column;
                const columnOrder = order.map((id) => {
                    if (id == sourceColumn.id) {
                        return '<marker>';
                    }
                    return id;
                });
                const columnBefore = columnOrder.slice(0, destinationLocation + 1);
                const columnAfter = columnOrder.slice(destinationLocation + 1, columnOrder.length);
                const newOrder = [
                    ...columnBefore,
                    sourceColumn.id,
                    ...columnAfter,
                ].filter((id) => id != '<marker>');
                table.setColumnOrder(newOrder);
            },
        });
    }, [table]);
    return (jsx(Flex, { flexFlow: 'column', gap: '0.25rem', children: order.map((columnId, index) => {
            return (jsx(CardContainer, { location: index, children: jsx(ColumnCard, { columnId: columnId }) }));
        }) }));
};

const ViewDialog = ({ icon = jsx(IoMdEye, {}) }) => {
    const viewModel = useDisclosure();
    const { tableLabel } = useDataTableContext();
    const { view } = tableLabel;
    return (jsxs(DialogRoot, { children: [jsx(DialogBackdrop, {}), jsx(DialogTrigger, { asChild: true, children: jsxs(Button$1, { as: Box, variant: "ghost", onClick: viewModel.onOpen, children: [icon, " ", view] }) }), jsxs(DialogContent, { children: [jsx(DialogCloseTrigger, {}), jsx(DialogHeader, { children: jsx(DialogTitle, { children: view }) }), jsx(DialogBody, { children: jsx(TableViewer, {}) }), jsx(DialogFooter, {})] })] }));
};

const Tooltip = React.forwardRef(function Tooltip(props, ref) {
    const { showArrow, children, disabled, portalled, content, contentProps, portalRef, ...rest } = props;
    if (disabled)
        return children;
    return (jsxs(Tooltip$1.Root, { ...rest, children: [jsx(Tooltip$1.Trigger, { asChild: true, children: children }), jsx(Portal, { disabled: !portalled, container: portalRef, children: jsx(Tooltip$1.Positioner, { children: jsxs(Tooltip$1.Content, { ref: ref, ...contentProps, children: [showArrow && (jsx(Tooltip$1.Arrow, { children: jsx(Tooltip$1.ArrowTip, {}) })), content] }) }) })] }));
});

const DataTableServerContext = createContext({
    url: "",
});

const useDataTableServerContext = () => {
    const context = useContext(DataTableServerContext);
    const { query } = context;
    const isEmpty = query ? (query.data?.count ?? 0) <= 0 : false;
    return { ...context, isEmpty };
};

const ReloadButton = ({ variant = 'icon' }) => {
    const serverContext = useDataTableServerContext();
    const { url, query } = serverContext;
    const queryClient = useQueryClient();
    const { tableLabel } = useDataTableContext();
    const { reloadTooltip, reloadButtonText } = tableLabel;
    const handleReload = () => {
        // Only invalidate queries for server-side tables (when query exists)
        if (query && url) {
            queryClient.invalidateQueries({ queryKey: [url] });
        }
        // For client-side tables, reload button doesn't need to do anything
        // as the data is already in memory
    };
    if (variant === 'icon') {
        return (jsx(Tooltip, { showArrow: true, content: reloadTooltip, children: jsx(Button, { variant: 'ghost', onClick: handleReload, "aria-label": 'refresh', children: jsx(IoReload, {}) }) }));
    }
    return (jsxs(Button, { variant: 'ghost', onClick: handleReload, children: [jsx(IoReload, {}), " ", reloadButtonText] }));
};

const InputGroup = React.forwardRef(function InputGroup(props, ref) {
    const { startElement, startElementProps, endElement, endElementProps, children, startOffset = "6px", endOffset = "6px", ...rest } = props;
    return (jsxs(Group, { ref: ref, ...rest, children: [startElement && (jsx(InputElement, { pointerEvents: "none", ...startElementProps, children: startElement })), React.cloneElement(children, {
                ...(startElement && {
                    ps: `calc(var(--input-height) - ${startOffset})`,
                }),
                ...(endElement && { pe: `calc(var(--input-height) - ${endOffset})` }),
                // @ts-expect-error chakra generated files
                ...children.props,
            }), endElement && (jsx(InputElement, { placement: "end", ...endElementProps, children: endElement }))] }));
});

const GlobalFilter = () => {
    const { table, tableLabel } = useDataTableContext();
    const { globalFilterPlaceholder } = tableLabel;
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    useEffect(() => {
        const searchHN = async () => {
            table.setGlobalFilter(debouncedSearchTerm);
        };
        searchHN();
    }, [debouncedSearchTerm]);
    return (jsx(Fragment, { children: jsx(InputGroup, { flex: "1", startElement: jsx(MdSearch, {}), children: jsx(Input, { placeholder: globalFilterPlaceholder, variant: "outline", onChange: (e) => {
                    setSearchTerm(e.target.value);
                } }) }) }));
};

const SelectAllRowsToggle = ({ selectAllIcon = jsx(MdOutlineChecklist, {}), clearAllIcon = jsx(MdClear, {}), selectAllText = '', clearAllText = '', }) => {
    const { table, rowSelection, setRowSelection } = useDataTableContext();
    const allRowsSelected = areAllRowsSelected(table, rowSelection);
    const toggleHandler = createToggleAllRowsHandler(table, rowSelection, setRowSelection);
    return (jsxs(Fragment, { children: [!!selectAllText === false && (jsx(IconButton, { variant: 'ghost', "aria-label": allRowsSelected ? clearAllText : selectAllText, onClick: toggleHandler, children: allRowsSelected ? clearAllIcon : selectAllIcon })), !!selectAllText !== false && (jsxs(Button$1, { variant: 'ghost', onClick: toggleHandler, children: [allRowsSelected ? clearAllIcon : selectAllIcon, allRowsSelected ? clearAllText : selectAllText] }))] }));
};

const TableSelector = () => {
    const { table, rowSelection, setRowSelection } = useDataTableContext();
    const selectedCount = getSelectedRowCount(table, rowSelection);
    const allPageRowsSelected = areAllPageRowsSelected(table, rowSelection);
    return (jsxs(Fragment, { children: [selectedCount > 0 && (jsxs(Button$1, { onClick: () => { }, variant: 'ghost', display: 'flex', gap: "0.25rem", children: [jsx(Box, { fontSize: 'sm', children: `${selectedCount}` }), jsx(IoMdCheckbox, {})] })), !allPageRowsSelected && jsx(SelectAllRowsToggle, {}), selectedCount > 0 && (jsx(IconButton, { variant: 'ghost', onClick: () => {
                    resetRowSelection(setRowSelection);
                }, "aria-label": 'reset selection', children: jsx(MdClear, {}) }))] }));
};

const TableFilterTags = () => {
    const { table } = useDataTableContext();
    return (jsx(Flex, { gap: '0.5rem', flexFlow: 'wrap', children: table.getState().columnFilters.map(({ id, value }) => {
            const column = table.getColumn(id);
            const displayName = column?.columnDef.meta?.displayName ?? id;
            // Format the value for display
            const formatValue = (val) => {
                if (Array.isArray(val)) {
                    return val.join(', ');
                }
                if (val === null || val === undefined) {
                    return '';
                }
                return String(val);
            };
            const displayValue = formatValue(value);
            const label = displayValue
                ? `${displayName}: ${displayValue}`
                : displayName;
            return (jsx(CheckboxCard, { checked: true, label: label, size: "sm", variant: "outline", colorPalette: "blue", onCheckedChange: (details) => {
                    if (!details.checked) {
                        table.setColumnFilters(table.getState().columnFilters.filter((filter) => {
                            return (filter.id !== id ||
                                JSON.stringify(filter.value) !== JSON.stringify(value));
                        }));
                    }
                } }, `${id}-${JSON.stringify(value)}`));
        }) }));
};

const TableControls = ({ fitTableWidth = false, fitTableHeight = false, children = jsx(Fragment, {}), showGlobalFilter = false, showFilter = false, showFilterName = false, showFilterTags = false, showReload = false, showPagination = true, showPageSizeControl = true, showPageCountText = true, showView = true, filterTagsOptions = [], extraItems = jsx(Fragment, {}), loading = false, hasError = false, gridProps = {}, }) => {
    const { tableLabel, table } = useDataTableContext();
    const { hasErrorText } = tableLabel;
    return (jsxs(Grid, { templateRows: 'auto 1fr', width: fitTableWidth ? 'fit-content' : '100%', height: fitTableHeight ? 'fit-content' : '100%', gap: '0.5rem', p: 1, ...gridProps, children: [jsxs(Flex, { flexFlow: 'column', gap: 2, children: [jsxs(Flex, { justifyContent: 'space-between', children: [jsx(Box, { children: showView && jsx(ViewDialog, { icon: jsx(MdOutlineViewColumn, {}) }) }), jsxs(Flex, { gap: '0.5rem', alignItems: 'center', justifySelf: 'end', children: [loading && jsx(Spinner, { size: 'sm' }), hasError && (jsx(Tooltip, { content: hasErrorText, children: jsx(Icon, { as: BsExclamationCircleFill, color: 'red.400' }) })), showGlobalFilter && jsx(GlobalFilter, {}), showFilter && jsx(FilterDialog, {}), showReload && jsx(ReloadButton, {}), extraItems] })] }), filterTagsOptions.length > 0 && (jsx(Flex, { flexFlow: 'column', gap: '0.5rem', children: filterTagsOptions.map((option) => {
                            const { column, options } = option;
                            const tableColumn = table.getColumn(column);
                            return (jsxs(Flex, { alignItems: 'center', flexFlow: 'wrap', gap: '0.5rem', children: [tableColumn?.columnDef.meta?.displayName && (jsx(Text, { children: tableColumn?.columnDef.meta?.displayName })), jsx(TagFilter, { availableTags: options, selectedTags: tableColumn?.getFilterValue() ?? [], selectOne: true, onTagChange: (tags) => {
                                            if (tags.length === 0) {
                                                return tableColumn?.setFilterValue(undefined);
                                            }
                                            tableColumn?.setFilterValue(tags);
                                        } })] }, column));
                        }) })), showFilterTags && (jsx(Flex, { children: jsx(TableFilterTags, {}) }))] }), jsx(Grid, { children: children }), (showPageSizeControl || showPageCountText || showPagination) && (jsxs(Flex, { justifyContent: 'space-between', children: [jsxs(Flex, { gap: '1rem', alignItems: 'center', children: [showPageSizeControl && jsx(PageSizeControl, {}), showPageCountText && jsx(RowCountText, {})] }), jsx(Box, { justifySelf: 'end', children: showPagination && jsx(Pagination, {}) })] }))] }));
};

const EmptyState$1 = React.forwardRef(function EmptyState(props, ref) {
    const { title, description, icon, children, ...rest } = props;
    return (jsx(EmptyState$2.Root, { ref: ref, ...rest, children: jsxs(EmptyState$2.Content, { children: [icon && (jsx(EmptyState$2.Indicator, { children: icon })), description ? (jsxs(VStack, { textAlign: "center", children: [jsx(EmptyState$2.Title, { children: title }), jsx(EmptyState$2.Description, { children: description })] })) : (jsx(EmptyState$2.Title, { children: title })), children] }) }));
});

/**
 * Hook to automatically hide/show columns based on container width.
 * Columns are hidden based on their responsivePriority (lower = hide first).
 * Only activates when canResize={false}.
 */
const useResponsiveColumnVisibility = ({ containerRef, enabled, showSelector = false, }) => {
    const { table, setColumnVisibility } = useDataTableContext();
    const autoHiddenRef = useRef(new Set());
    const userBaselineRef = useRef(null);
    const SELECTION_BOX_WIDTH = 20;
    useEffect(() => {
        if (!enabled || !containerRef.current) {
            // Reset when disabled
            if (!enabled) {
                userBaselineRef.current = null;
                autoHiddenRef.current = new Set();
            }
            return;
        }
        // Capture baseline visibility when hook is first enabled
        if (userBaselineRef.current === null) {
            userBaselineRef.current = { ...table.getState().columnVisibility };
        }
        const updateColumnVisibility = () => {
            const container = containerRef.current;
            if (!container || !userBaselineRef.current)
                return;
            const containerWidth = container.clientWidth;
            // Get all columns
            const allColumns = table.getAllLeafColumns();
            // Get current visibility state
            const currentVisibility = table.getState().columnVisibility;
            // Determine user-hidden columns based on baseline
            // Columns that are hidden in baseline are considered user-hidden
            const userBaseline = userBaselineRef.current;
            const userHiddenColumns = new Set();
            for (const col of allColumns) {
                // If column was hidden in baseline, it's user-hidden
                if (userBaseline[col.id] === false) {
                    userHiddenColumns.add(col.id);
                }
            }
            // Consider all columns except those hidden by user in baseline
            const columnsToConsider = allColumns.filter((col) => {
                return !userHiddenColumns.has(col.id);
            });
            // Calculate priority for each column
            // Lower priority = hide first, Infinity = never auto-hide
            const columnsWithPriority = columnsToConsider.map((col, index) => {
                const priority = col.columnDef.meta?.responsivePriority ?? Infinity;
                return {
                    column: col,
                    priority,
                    size: col.getSize(),
                    index,
                };
            });
            // Sort by priority (ascending), then by index for stable ordering
            columnsWithPriority.sort((a, b) => {
                if (a.priority !== b.priority) {
                    return a.priority - b.priority;
                }
                return a.index - b.index;
            });
            // Calculate available width (account for selector column if present)
            const availableWidth = showSelector
                ? containerWidth - SELECTION_BOX_WIDTH
                : containerWidth;
            // Calculate which columns can fit
            let totalWidth = 0;
            const columnsToShow = new Set();
            // Always keep at least one column visible
            let minColumnsShown = 0;
            for (const { column, priority } of columnsWithPriority) {
                // If this is the first column and we haven't shown any, always show it
                if (minColumnsShown === 0) {
                    columnsToShow.add(column.id);
                    totalWidth += column.getSize();
                    minColumnsShown = 1;
                    continue;
                }
                // Check if adding this column would exceed available width
                const newTotalWidth = totalWidth + column.getSize();
                // If priority is Infinity, always show (never auto-hide)
                if (priority === Infinity) {
                    columnsToShow.add(column.id);
                    totalWidth = newTotalWidth;
                }
                else if (newTotalWidth <= availableWidth) {
                    // Column fits, show it
                    columnsToShow.add(column.id);
                    totalWidth = newTotalWidth;
                }
                else ;
            }
            // Update auto-hidden columns
            const newAutoHidden = new Set();
            const newVisibility = { ...currentVisibility };
            // Update visibility for all columns
            for (const col of allColumns) {
                const isUserHidden = userHiddenColumns.has(col.id);
                if (isUserHidden) {
                    // Respect user preference to hide
                    newVisibility[col.id] = false;
                }
                else {
                    const shouldBeVisible = columnsToShow.has(col.id);
                    if (!shouldBeVisible) {
                        // Column should be auto-hidden
                        newAutoHidden.add(col.id);
                        newVisibility[col.id] = false;
                    }
                    else {
                        // Column should be visible
                        newVisibility[col.id] = true;
                    }
                }
            }
            // Update auto-hidden ref
            autoHiddenRef.current = newAutoHidden;
            // Only update if visibility actually changed
            const visibilityChanged = Object.keys(newVisibility).some((key) => newVisibility[key] !== currentVisibility[key]) ||
                Object.keys(currentVisibility).some((key) => newVisibility[key] !== currentVisibility[key]);
            if (visibilityChanged) {
                setColumnVisibility(newVisibility);
            }
        };
        // Initial calculation
        updateColumnVisibility();
        // Set up ResizeObserver
        const resizeObserver = new ResizeObserver(() => {
            updateColumnVisibility();
        });
        resizeObserver.observe(containerRef.current);
        return () => {
            resizeObserver.disconnect();
        };
    }, [enabled, containerRef, table, setColumnVisibility, showSelector]);
};

const EmptyResult = (jsx(EmptyState$1, { icon: jsx(HiColorSwatch, {}), title: "No results found", description: "Try adjusting your search", children: jsxs(List.Root, { variant: "marker", children: [jsx(List.Item, { children: "Try removing filters" }), jsx(List.Item, { children: "Try different keywords" })] }) }));
const Table = ({ children, emptyComponent = EmptyResult, canResize = true, showLoading = false, showSelector = false, ...props }) => {
    const { table } = useDataTableContext();
    const containerRef = useRef(null);
    // Enable responsive column hiding when canResize is false
    useResponsiveColumnVisibility({
        containerRef,
        enabled: !canResize,
        showSelector,
    });
    // Skip empty check when loading to allow skeleton to render
    if (!showLoading && table.getRowModel().rows.length <= 0) {
        return emptyComponent;
    }
    return (jsx(Box, { ref: containerRef, width: "100%", overflow: "auto", children: jsx(Table$1.Root, { stickyHeader: true, width: canResize ? table.getCenterTotalSize() : undefined, display: 'grid', alignContent: 'start', ...props, children: children }) }));
};

const Checkbox = React.forwardRef(function Checkbox(props, ref) {
    const { icon, children, inputProps, rootRef, ...rest } = props;
    return (jsxs(Checkbox$1.Root, { ref: rootRef, ...rest, children: [jsx(Checkbox$1.HiddenInput, { ref: ref, ...inputProps }), jsx(Checkbox$1.Control, { children: icon || jsx(Checkbox$1.Indicator, {}) }), children != null && (jsx(Checkbox$1.Label, { children: children }))] }));
});

const TableBody = ({ showSelector = false, canResize = true, }) => {
    'use no memo';
    const { table } = useDataTableContext();
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredRow, setHoveredRow] = useState(-1);
    const handleRowHover = (index) => {
        setHoveredRow(index);
    };
    const getTdProps = (cell) => {
        const tdProps = cell.column.getIsPinned()
            ? {
                left: showSelector
                    ? `${cell.column.getStart('left') + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
                    : `${cell.column.getStart('left')}px`,
                position: 'relative',
            }
            : {};
        return tdProps;
    };
    const getTrProps = ({ hoveredRow, index, }) => {
        if (hoveredRow === -1) {
            return {};
        }
        if (hoveredRow === index) {
            return {
                opacity: '1',
            };
        }
        return {
            opacity: '0.8',
        };
    };
    return (jsx(Table$1.Body, { children: table.getRowModel().rows.map((row, index) => {
            return (jsxs(Table$1.Row, { display: 'flex', zIndex: 1, onMouseEnter: () => handleRowHover(index), onMouseLeave: () => handleRowHover(-1), ...getTrProps({ hoveredRow, index }), children: [showSelector && (jsx(TableRowSelector, { index: index, row: row, hoveredRow: hoveredRow })), row.getVisibleCells().map((cell, index) => {
                        return (jsx(Table$1.Cell, { padding: `${table.getDensityValue()}px`, 
                            // styling resize and pinning start
                            flex: `${canResize ? '0' : '1'} 0 ${cell.column.getSize()}px`, 
                            // this is to avoid the cell from being too wide
                            minWidth: `0`, ...getTdProps(cell), children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, `chakra-table-rowcell-${cell.id}-${index}`));
                    })] }, `chakra-table-row-${row.id}`));
        }) }));
};
const TableRowSelector = ({ row }) => {
    const { table, rowSelection, setRowSelection } = useDataTableContext();
    const SELECTION_BOX_WIDTH = 20;
    const isSelected = isRowSelected(row.id, rowSelection);
    const canSelect = canRowSelect(row);
    const toggleHandler = createRowToggleHandler(row, rowSelection, setRowSelection);
    return (jsx(Table$1.Cell, { padding: `${table.getDensityValue()}px`, display: 'grid', justifyItems: 'center', alignItems: 'center', children: jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, checked: isSelected,
            disabled: !canSelect,
            onCheckedChange: toggleHandler }) }));
};

const TableCardContainer = ({ children, variant = "", gap = "1rem", gridTemplateColumns = "repeat(auto-fit, minmax(20rem, 1fr))", direction = "row", ...props }) => {
    if (variant === "carousel") {
        return (jsx(Flex, { overflow: "auto", gap: gap, direction: direction, ...props, children: children }));
    }
    return (jsx(Grid, { gridTemplateColumns: gridTemplateColumns, gap: gap, ...props, children: children }));
};

const DefaultCardTitle = () => {
    return jsx(Fragment, {});
};
const TableCards = ({ isSelectable = false, showDisplayNameOnly = false, renderTitle = DefaultCardTitle, cardBodyProps = {}, }) => {
    const { table, rowSelection, setRowSelection } = useDataTableContext();
    return (jsx(Fragment, { children: table.getRowModel().rows.map((row) => {
            return (jsx(Card.Root, { flex: '1 0 20rem', children: jsxs(Card.Body, { display: 'flex', flexFlow: 'column', gap: '0.5rem', ...cardBodyProps, children: [isSelectable && (jsx(Checkbox, { checked: isRowSelected(row.id, rowSelection),
                            disabled: !canRowSelect(row),
                            // indeterminate: row.getIsSomeSelected(),
                            onChange: createRowToggleHandler(row, rowSelection, setRowSelection) })), renderTitle(row), jsx(Grid, { templateColumns: 'auto 1fr', gap: '1rem', children: row.getVisibleCells().map((cell) => {
                                return (jsxs(Box, { display: "contents", children: [jsxs(Box, { children: [showDisplayNameOnly && (jsx(Text, { fontWeight: 'bold', children: cell.column.columnDef.meta?.displayName ??
                                                        cell.column.id })), !showDisplayNameOnly && (jsx(Fragment, { children: flexRender(cell.column.columnDef.header, 
                                                    // @ts-expect-error Assuming the CellContext interface is the same as HeaderContext
                                                    cell.getContext()) }))] }), jsx(Box, { justifySelf: 'end', children: flexRender(cell.column.columnDef.cell, cell.getContext()) })] }, `chakra-table-cardcell-${cell.id}`));
                            }) })] }) }, `chakra-table-card-${row.id}`));
        }) }));
};

const TableComponent = ({ render = () => {
    throw Error("Not Implemented");
}, }) => {
    const { table } = useDataTableContext();
    return render(table);
};

const TableFooter = ({ showSelector = false, alwaysShowSelector = true, }) => {
    const { table, rowSelection, setRowSelection } = useDataTableContext();
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredCheckBox, setHoveredCheckBox] = useState(false);
    const handleRowHover = (isHovered) => {
        setHoveredCheckBox(isHovered);
    };
    const isCheckBoxVisible = () => {
        if (alwaysShowSelector) {
            return true;
        }
        if (areAllRowsSelected(table, rowSelection)) {
            return true;
        }
        if (hoveredCheckBox) {
            return true;
        }
        return false;
    };
    return (jsx(Table$1.Footer, { children: table.getFooterGroups().map((footerGroup) => (jsxs(Table$1.Row, { display: 'flex', children: [showSelector && (jsx(Table$1.Cell, { padding: `${table.getDensityValue()}px`, onMouseEnter: () => handleRowHover(true), onMouseLeave: () => handleRowHover(false), display: 'grid', justifyItems: 'center', alignItems: 'center', color: {
                        base: 'colorPalette.900',
                        _dark: 'colorPalette.100',
                    },
                    bg: { base: 'colorPalette.50', _dark: 'colorPalette.950' }, children: isCheckBoxVisible() ? (jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, checked: areAllRowsSelected(table, rowSelection),
                        // indeterminate: areSomeRowsSelected(table, rowSelection),
                        onChange: createToggleAllRowsHandler(table, rowSelection, setRowSelection) })) : (jsx(Box, { as: "span", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` })) })), footerGroup.headers.map((header) => (jsx(Table$1.Cell, { padding: '0', columnSpan: `${header.colSpan}`, 
                    // styling resize and pinning start
                    maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, display: 'grid', children: jsx(MenuRoot$1, { children: jsx(MenuTrigger$1, { asChild: true, children: jsx(Box, { padding: `${table.getDensityValue()}px`, display: 'flex', alignItems: 'center', justifyContent: 'start', borderRadius: '0rem', children: jsxs(Flex, { gap: "0.5rem", alignItems: 'center', children: [header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.footer, header.getContext()), jsx(Box, { children: header.column.getCanSort() && (jsxs(Fragment, { children: [header.column.getIsSorted() === false && jsx(Fragment, {}), header.column.getIsSorted() === 'asc' && (jsx(BiUpArrow, {})), header.column.getIsSorted() === 'desc' && (jsx(BiDownArrow, {}))] })) })] }) }) }) }) }, `chakra-table-footer-${header.column.id}-${footerGroup.id}`)))] }, `chakra-table-footergroup-${footerGroup.id}`))) }));
};

// Default text values
const DEFAULT_HEADER_TEXTS = {
    pinColumn: 'Pin Column',
    cancelPin: 'Cancel Pin',
    sortAscending: 'Sort Ascending',
    sortDescending: 'Sort Descending',
    clearSorting: 'Clear Sorting',
};
/**
 * TableHeader component with configurable text strings.
 *
 * @example
 * // Using default texts
 * <TableHeader />
 *
 * @example
 * // Customizing default texts for all columns
 * <TableHeader
 *   defaultTexts={{
 *     pinColumn: "Pin This Column",
 *     sortAscending: "Sort A-Z"
 *   }}
 * />
 *
 * @example
 * // Customizing texts per column via meta
 * const columns = [
 *   columnHelper.accessor("name", {
 *     header: "Name",
 *     meta: {
 *       headerTexts: {
 *         pinColumn: "Pin Name Column",
 *         sortAscending: "Sort Names A-Z"
 *       }
 *     }
 *   })
 * ];
 */
const TableHeader = ({ canResize = true, showSelector = false, isSticky = true, tableHeaderProps = {}, tableRowProps = {}, defaultTexts = {}, }) => {
    const { table, rowSelection, setRowSelection } = useDataTableContext();
    const SELECTION_BOX_WIDTH = 20;
    // Merge default texts with provided defaults
    const mergedDefaultTexts = { ...DEFAULT_HEADER_TEXTS, ...defaultTexts };
    // Helper function to get text for a specific header
    const getHeaderText = (header, key) => {
        const columnMeta = header.column.columnDef.meta;
        return columnMeta?.headerTexts?.[key] || mergedDefaultTexts[key];
    };
    const stickyProps = {
        position: 'sticky',
        top: 0,
    };
    const handleAutoSize = (header, event) => {
        const headerElement = event.currentTarget.closest('th');
        if (!headerElement)
            return;
        // Find the table container
        const tableContainer = headerElement.closest('[role="table"]') ||
            headerElement.closest('table') ||
            headerElement.closest('div');
        if (!tableContainer)
            return;
        // Calculate the actual column index accounting for selector column
        const columnIndex = header.index;
        const actualColumnIndex = showSelector ? columnIndex + 1 : columnIndex;
        // Get all rows (header and body) - Chakra UI Table uses flex layout
        const rows = Array.from(tableContainer.querySelectorAll('[role="row"], tr'));
        let maxWidth = 0;
        // Measure all cells in this column
        rows.forEach((row) => {
            // Get all cells in the row (td, th, or Chakra Table.Cell/Table.ColumnHeader)
            const cells = Array.from(row.children);
            const cell = cells[actualColumnIndex];
            if (cell) {
                // Create a temporary clone to measure content without constraints
                const clone = cell.cloneNode(true);
                clone.style.position = 'absolute';
                clone.style.visibility = 'hidden';
                clone.style.width = 'auto';
                clone.style.maxWidth = 'none';
                clone.style.whiteSpace = 'nowrap';
                clone.style.flex = 'none';
                document.body.appendChild(clone);
                const width = clone.scrollWidth;
                maxWidth = Math.max(maxWidth, width);
                document.body.removeChild(clone);
            }
        });
        // Add padding for better UX (density padding + some extra space)
        const padding = table.getDensityValue() * 2 + 4;
        const minSize = header.column.columnDef.minSize || 10;
        const finalWidth = Math.max(maxWidth + padding, minSize);
        // Set the column size - setSize exists on column but may not be fully typed in @tanstack/react-table
        console.log('finalWidth', finalWidth);
        table.setColumnSizing((current) => ({
            ...current,
            [header.id]: finalWidth,
        }));
    };
    return (jsx(Table$1.Header, { ...(isSticky ? stickyProps : {}), ...tableHeaderProps, children: table.getHeaderGroups().map((headerGroup) => (jsxs(Table$1.Row, { display: 'flex', ...tableRowProps, children: [showSelector && (jsx(Table$1.ColumnHeader, { padding: `${table.getDensityValue()}px`, display: 'grid', justifyItems: 'center', alignItems: 'center', children: jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, checked: areAllRowsSelected(table, rowSelection),
                        // indeterminate: areSomeRowsSelected(table, rowSelection),
                        onChange: createToggleAllRowsHandler(table, rowSelection, setRowSelection) }) })), headerGroup.headers.map((header) => {
                    const resizeProps = {
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        cursor: 'col-resize',
                    };
                    return (jsxs(Table$1.ColumnHeader, { padding: 0, columnSpan: `${header.colSpan}`, 
                        // styling resize and pinning start
                        flex: `${canResize ? '0' : '1'} 0 ${header.column.getSize()}px`, display: 'grid', gridTemplateColumns: '1fr auto', zIndex: 1500 + header.index, children: [jsxs(MenuRoot, { children: [jsx(MenuTrigger, { asChild: true, children: jsx(Flex, { padding: `${table.getDensityValue()}px`, alignItems: 'center', justifyContent: 'start', borderRadius: '0rem', overflow: 'auto', children: jsxs(Flex, { gap: "0.5rem", alignItems: 'center', children: [header.isPlaceholder
                                                        ? null
                                                        : flexRender(header.column.columnDef.header, header.getContext()), jsx(Box, { children: header.column.getCanSort() && (jsxs(Fragment, { children: [header.column.getIsSorted() === false && jsx(Fragment, {}), header.column.getIsSorted() === 'asc' && (jsx(BiUpArrow, {})), header.column.getIsSorted() === 'desc' && (jsx(BiDownArrow, {}))] })) }), jsx(Box, { children: header.column.getIsFiltered() && jsx(MdFilterListAlt, {}) })] }) }) }), jsxs(MenuContent, { children: [!header.column.getIsPinned() && (jsx(MenuItem, { asChild: true, value: "pin-column", children: jsxs(Button, { variant: 'ghost', onClick: () => {
                                                        header.column.pin('left');
                                                    }, p: 1, children: [jsx(MdPushPin, {}), getHeaderText(header, 'pinColumn')] }) })), header.column.getIsPinned() && (jsx(MenuItem, { asChild: true, value: "cancel-pin", children: jsxs(Button, { variant: 'ghost', onClick: () => {
                                                        header.column.pin(false);
                                                    }, children: [jsx(MdCancel, {}), getHeaderText(header, 'cancelPin')] }) })), header.column.getCanSort() && (jsxs(Fragment, { children: [jsx(MenuItem, { asChild: true, value: "sort-ascend", children: jsxs(Button, { variant: 'ghost', onClick: () => {
                                                                table.setSorting((state) => {
                                                                    return [
                                                                        ...state.filter((column) => {
                                                                            return column.id !== header.id;
                                                                        }),
                                                                        { id: header.id, desc: false },
                                                                    ];
                                                                });
                                                            }, children: [jsx(GrAscend, {}), getHeaderText(header, 'sortAscending')] }) }), jsx(MenuItem, { asChild: true, value: "sort-descend", children: jsxs(Button, { variant: 'ghost', onClick: () => {
                                                                table.setSorting((state) => {
                                                                    return [
                                                                        ...state.filter((column) => {
                                                                            return column.id !== header.id;
                                                                        }),
                                                                        { id: header.id, desc: true },
                                                                    ];
                                                                });
                                                            }, children: [jsx(GrDescend, {}), getHeaderText(header, 'sortDescending')] }) }), header.column.getIsSorted() && (jsx(MenuItem, { asChild: true, value: "clear-sorting", children: jsxs(Button, { variant: 'ghost', onClick: () => {
                                                                header.column.clearSorting();
                                                            }, children: [jsx(MdClear, {}), getHeaderText(header, 'clearSorting')] }) }))] }))] })] }), canResize && (jsx(Box, { borderRight: '0.2rem solid', borderRightColor: header.column.getIsResizing()
                                    ? 'colorPalette.700'
                                    : 'transparent', position: 'relative', right: '0.1rem', width: '2px', height: '100%', userSelect: 'none', style: { touchAction: 'none' }, _hover: {
                                    borderRightColor: header.column.getIsResizing()
                                        ? 'colorPalette.700'
                                        : 'colorPalette.400',
                                }, onDoubleClick: (e) => {
                                    handleAutoSize(header, e);
                                }, ...resizeProps }))] }, `chakra-table-header-${header.id}`));
                })] }, `chakra-table-headergroup-${headerGroup.id}`))) }));
};

const TableLoadingComponent = ({ render, }) => {
    const { query } = useDataTableServerContext();
    return jsx(Fragment, { children: render(query.isLoading) });
};

// Helper function to highlight matching text
const highlightText$1 = (text, searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
        return String(text);
    }
    const textStr = String(text);
    const searchLower = searchTerm.toLowerCase();
    const textLower = textStr.toLowerCase();
    const parts = [];
    let lastIndex = 0;
    let index = textLower.indexOf(searchLower, lastIndex);
    while (index !== -1) {
        // Add text before match
        if (index > lastIndex) {
            parts.push(textStr.substring(lastIndex, index));
        }
        // Add highlighted match
        parts.push(jsx(Text, { as: "mark", bg: {
                base: 'yellow.200',
                _dark: 'yellow.800',
            }, color: {
                base: 'gray.900',
                _dark: 'gray.100',
            }, px: 0.5, borderRadius: "sm", children: textStr.substring(index, index + searchTerm.length) }, index));
        lastIndex = index + searchTerm.length;
        index = textLower.indexOf(searchLower, lastIndex);
    }
    // Add remaining text
    if (lastIndex < textStr.length) {
        parts.push(textStr.substring(lastIndex));
    }
    return parts.length > 0 ? jsx(Fragment, { children: parts }) : textStr;
};
const TextWithCopy = ({ text, globalFilter, highlightedText, }) => {
    const textValue = String(text ?? '');
    const displayText = highlightedText !== undefined
        ? highlightedText
        : highlightText$1(textValue, globalFilter);
    return (jsxs(HStack, { gap: 2, alignItems: "center", children: [jsx(Text, { as: "span", children: displayText }), jsx(Clipboard.Root, { value: textValue, children: jsx(Clipboard.Trigger, { asChild: true, children: jsx(IconButton, { size: "2xs", variant: "ghost", "aria-label": "Copy", fontSize: "1em", children: jsx(Clipboard.Indicator, { copied: jsx(LuCheck, {}), children: jsx(LuCopy, {}) }) }) }) })] }));
};

// Helper function to highlight matching text
const highlightText = (text, searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
        return String(text);
    }
    const textStr = String(text);
    const searchLower = searchTerm.toLowerCase();
    const textLower = textStr.toLowerCase();
    const parts = [];
    let lastIndex = 0;
    let index = textLower.indexOf(searchLower, lastIndex);
    while (index !== -1) {
        // Add text before match
        if (index > lastIndex) {
            parts.push(textStr.substring(lastIndex, index));
        }
        // Add highlighted match
        parts.push(jsx(Text, { as: "mark", bg: {
                base: 'yellow.200',
                _dark: 'yellow.800',
            }, color: {
                base: 'gray.900',
                _dark: 'gray.100',
            }, px: 0.5, borderRadius: "sm", children: textStr.substring(index, index + searchTerm.length) }, index));
        lastIndex = index + searchTerm.length;
        index = textLower.indexOf(searchLower, lastIndex);
    }
    // Add remaining text
    if (lastIndex < textStr.length) {
        parts.push(textStr.substring(lastIndex));
    }
    return parts.length > 0 ? jsx(Fragment, { children: parts }) : textStr;
};
const RenderValue = ({ text, href, onClick, isCopyable, isBadge, badgeColor, colorPalette, globalFilter, alignEnd = false, }) => {
    const highlightedText = useMemo(() => highlightText(text ?? '', globalFilter), [text, globalFilter]);
    if (isBadge) {
        return (jsx(Badge, { colorPalette: colorPalette || badgeColor, children: highlightedText }));
    }
    // onClick takes precedence over href
    if (onClick) {
        return (jsx(Box, { as: "button", onClick: onClick, cursor: "pointer", textAlign: alignEnd ? 'right' : 'left', _hover: {
                textDecoration: 'underline',
                color: {
                    base: 'blue.500',
                    _dark: 'blue.400',
                },
            }, transition: "all 0.2s", children: highlightedText }));
    }
    if (href) {
        return (jsxs(Link, { href: href, target: "_blank", rel: "noopener noreferrer", _hover: {
                textDecoration: 'underline',
            }, children: [highlightedText, " ", jsx(Icon, { as: LuExternalLink })] }));
    }
    if (isCopyable) {
        return (jsx(TextWithCopy, { text: text, globalFilter: globalFilter, highlightedText: highlightedText }));
    }
    return jsx(Fragment, { children: highlightedText });
};
const TextCell = ({ text, href, onClick, isCopyable, isBadge, badgeColor, colorPalette, alignEnd = false, 
// Legacy props
label, containerProps = {}, textProps = {}, children, }) => {
    // Get globalFilter from context
    // If not in DataTable context, will use default empty string from context
    const { globalFilter } = useDataTableContext();
    // Legacy API: if children is provided, use old behavior
    if (children !== undefined) {
        const displayText = typeof children === 'string' || typeof children === 'number'
            ? String(children)
            : children;
        const highlightedDisplayText = typeof displayText === 'string' || typeof displayText === 'number'
            ? highlightText(displayText, globalFilter)
            : displayText;
        const flexJustifyContent = alignEnd ? 'flex-end' : undefined;
        const textAlign = alignEnd ? 'right' : undefined;
        if (label) {
            return (jsx(Flex, { alignItems: 'center', justifyContent: flexJustifyContent, height: '100%', ...containerProps, children: jsx(Tooltip, { content: jsx(Text, { as: "span", overflow: "hidden", textOverflow: 'ellipsis', children: label }), children: jsx(Text, { as: "span", overflow: "hidden", textOverflow: 'ellipsis', wordBreak: 'break-all', textAlign: textAlign, ...textProps, children: highlightedDisplayText }) }) }));
        }
        return (jsx(Flex, { alignItems: 'center', justifyContent: flexJustifyContent, height: '100%', ...containerProps, children: jsx(Text, { as: "span", overflow: "hidden", textOverflow: 'ellipsis', wordBreak: 'break-all', textAlign: textAlign, ...textProps, children: highlightedDisplayText }) }));
    }
    // New API: use text prop
    const displayValue = text ?? children;
    if (Array.isArray(displayValue)) {
        return (jsx(Flex, { gap: 2, flexWrap: "wrap", justifyContent: alignEnd ? 'flex-end' : undefined, children: displayValue.map((item, index) => {
                const highlightedItem = highlightText(item, globalFilter);
                return (jsx(Badge, { colorPalette: colorPalette || badgeColor, children: highlightedItem }, index));
            }) }));
    }
    if (!!displayValue === false) {
        return (jsx(Text, { textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", wordBreak: "break-all", display: "flex", alignItems: "center", justifyContent: alignEnd ? 'flex-end' : undefined, height: "100%", textAlign: alignEnd ? 'right' : undefined, children: "-" }));
    }
    return (jsx(Box, { textOverflow: "ellipsis", whiteSpace: "nowrap", wordBreak: "break-all", overflow: "auto", display: "flex", alignItems: "center", justifyContent: alignEnd ? 'flex-end' : undefined, height: "100%", textAlign: alignEnd ? 'right' : undefined, children: jsx(RenderValue, { text: displayValue, href: href, onClick: onClick, isCopyable: isCopyable, isBadge: isBadge, badgeColor: badgeColor, colorPalette: colorPalette, globalFilter: globalFilter, alignEnd: alignEnd }) }));
};

const Tag = React.forwardRef(function Tag(props, ref) {
    const { startElement, endElement, onClose, closable = !!onClose, children, ...rest } = props;
    return (jsxs(Tag$1.Root, { ref: ref, ...rest, children: [startElement && (jsx(Tag$1.StartElement, { children: startElement })), jsx(Tag$1.Label, { children: children }), endElement && (jsx(Tag$1.EndElement, { children: endElement })), closable && (jsx(Tag$1.EndElement, { children: jsx(Tag$1.CloseTrigger, { onClick: onClose }) }))] }));
});

const CardHeader = ({ row, imageColumnId = undefined, titleColumnId = undefined, tagColumnId = undefined, tagIcon = undefined, showTag = true, imageProps = {}, }) => {
    if (!!row.original === false) {
        return jsx(Fragment, {});
    }
    const isShowFirstColumn = !!titleColumnId || showTag;
    return (jsxs(Grid, { templateRows: "auto auto", gap: "1rem", children: [!!imageColumnId && (jsx(Image, { width: "100%", src: row.original[imageColumnId], ...imageProps })), isShowFirstColumn && (jsxs(Flex, { gap: "0.5rem", flexFlow: "wrap", children: [!!titleColumnId && (jsx(Text, { fontWeight: "bold", fontSize: "large", children: row.original[titleColumnId] })), showTag && (jsx(Tag, { fontSize: "large", startElement: tagIcon && tagIcon({}), children: row.original[tagColumnId] }))] }))] }));
};

const EmptyState = ({ title = "No records", description = "Add a new events to get started or refine your search", }) => {
    const { isEmpty } = useDataTableServerContext();
    return (jsx(Fragment, { children: isEmpty && (jsx(EmptyState$2.Root, { children: jsxs(EmptyState$2.Content, { children: [jsx(EmptyState$2.Indicator, { children: jsx(HiColorSwatch, {}) }), jsxs(VStack, { textAlign: "center", children: [jsx(EmptyState$2.Title, { children: title }), jsx(EmptyState$2.Description, { children: description })] })] }) })) }));
};

const ErrorAlert = ({ showMessage = true }) => {
    const { query } = useDataTableServerContext();
    const { isError, error } = query;
    return (jsx(Fragment, { children: isError && (jsxs(Alert.Root, { status: "error", children: [jsx(Alert.Indicator, {}), jsxs(Alert.Content, { children: [jsx(Alert.Title, { children: error.name }), showMessage && (jsx(Alert.Description, { children: error.message }))] })] })) }));
};

const useDataTable = ({ default: { sorting: defaultSorting = [], pagination: defaultPagination = {
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
}, rowSelection: defaultRowSelection = {}, columnFilters: defaultColumnFilters = [], columnOrder: defaultColumnOrder = [], columnVisibility: defaultColumnVisibility = {}, globalFilter: defaultGlobalFilter = '', density: defaultDensity = 'sm', } = {
    sorting: [],
    pagination: {
        pageIndex: 0, //initial page index
        pageSize: 10, //age size
    },
    rowSelection: {},
    columnFilters: [],
    columnOrder: [],
    columnVisibility: {},
    globalFilter: '',
    density: 'sm',
}, } = {
    default: {
        sorting: [],
        pagination: {
            pageIndex: 0, //initial page index
            pageSize: 10, //age size
        },
        rowSelection: {},
        columnFilters: [],
        columnOrder: [],
        columnVisibility: {},
        globalFilter: '',
        density: 'sm',
    },
}) => {
    const [sorting, setSorting] = useState(defaultSorting);
    const [columnFilters, setColumnFilters] = useState(defaultColumnFilters); // can set initial column filter state here
    const [pagination, setPagination] = useState(defaultPagination);
    const [rowSelection, setRowSelection] = useState(defaultRowSelection);
    const [columnOrder, setColumnOrder] = useState(defaultColumnOrder);
    const [globalFilter, setGlobalFilter] = useState(defaultGlobalFilter);
    const [density, setDensity] = useState(defaultDensity);
    const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);
    return {
        sorting,
        setSorting,
        columnFilters,
        setColumnFilters,
        pagination,
        setPagination,
        rowSelection,
        setRowSelection,
        columnOrder,
        setColumnOrder,
        globalFilter,
        setGlobalFilter,
        density,
        setDensity,
        columnVisibility,
        setColumnVisibility,
    };
};

const useDataTableServer = (props) => {
    const { url, default: defaultProps, placeholderData, queryFn: customQueryFn, } = props;
    const { sorting: defaultSorting, pagination: defaultPagination, rowSelection: defaultRowSelection, columnFilters: defaultColumnFilters, columnOrder: defaultColumnOrder, columnVisibility: defaultColumnVisibility, globalFilter: defaultGlobalFilter, density: defaultDensity, } = defaultProps || {};
    const [sorting, setSorting] = useState(defaultSorting || []);
    const [columnFilters, setColumnFilters] = useState(defaultColumnFilters || []); // can set initial column filter state here
    const [pagination, setPagination] = useState(defaultPagination || {
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
    const [rowSelection, setRowSelection] = useState(defaultRowSelection || {});
    const [columnOrder, setColumnOrder] = useState(defaultColumnOrder || []);
    const [globalFilter, setGlobalFilter] = useState(defaultGlobalFilter || '');
    const [density, setDensity] = useState(defaultDensity || 'sm');
    const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility || {});
    const { pageSize, pageIndex } = pagination;
    const params = {
        offset: pageIndex * pageSize,
        limit: pageSize,
        sorting,
        where: columnFilters,
        searching: globalFilter,
    };
    const defaultQueryFn = async () => {
        if (!url) {
            throw new Error('url is required');
        }
        const response = await axios.get(url, {
            params,
        });
        return response.data;
    };
    const query = useQuery({
        queryKey: [url, JSON.stringify(params)],
        queryFn: customQueryFn !== undefined
            ? () => customQueryFn(params)
            : defaultQueryFn,
        placeholderData,
    });
    return {
        sorting,
        setSorting,
        columnFilters,
        setColumnFilters,
        pagination,
        setPagination,
        rowSelection,
        setRowSelection,
        columnOrder,
        setColumnOrder,
        globalFilter,
        setGlobalFilter,
        density,
        setDensity,
        columnVisibility,
        setColumnVisibility,
        query,
    };
};

const idListSanityCheck = (param, idList, properties) => {
    const allKeyExists = idList.every((key) => Object.keys(properties).some((column) => column == key));
    if (!allKeyExists) {
        const wrongKey = idList.find((key) => !Object.keys(properties).some((column) => column == key));
        throw new Error(`The key ${wrongKey} in ${param} does not exist in schema.`);
    }
};

const snakeToLabel = (str) => {
    return str
        .split("_") // Split by underscore
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(" "); // Join with space
};

const RecordDisplay = ({ object, boxProps, prefix = '', }) => {
    const getColumn = ({ field }) => {
        return snakeToLabel(field);
    };
    if (object === null) {
        return jsx(Fragment, { children: "null" });
    }
    return (jsx(Grid, { rowGap: 1, padding: 1, overflow: 'auto', ...boxProps, children: Object.entries(object).map(([field, value], index) => {
            const uniqueKey = `${prefix}${field}-${index}`;
            return (jsxs(Grid, { columnGap: 2, gridTemplateColumns: 'auto 1fr', children: [jsx(Text, { color: 'colorPalette.400', children: getColumn({ field }) }), typeof value === 'object' && value !== null ? (jsx(RecordDisplay, { object: value, prefix: `${prefix}${field}.` })) : (jsx(Text, { children: JSON.stringify(value) }))] }, uniqueKey));
        }) }));
};

const widthSanityCheck = (widthList, ignoreList, properties) => {
    const widthListToolong = widthList.length > Object.keys(properties).length;
    if (widthListToolong) {
        throw new Error(`The width list is too long given from the number of properties.`);
    }
    const widthListToolongWithIgnore = widthList.length > Object.keys(properties).length - ignoreList.length;
    if (widthListToolongWithIgnore) {
        throw new Error(`The width list is too long given from the number of remaining properties after ignore some.`);
    }
};
const getColumns = ({ schema, include = [], ignore = [], width = [], meta = {}, defaultWidth = 400, }) => {
    const { properties } = schema;
    idListSanityCheck('ignore', ignore, properties);
    widthSanityCheck(width, ignore, properties);
    idListSanityCheck('meta', Object.keys(meta), properties);
    const getColumn = ({ column }) => {
        return snakeToLabel(column);
    };
    const keys = Object.keys(properties);
    const included = include.length > 0 ? include : keys;
    const ignored = included.filter((key) => {
        return !ignore.some((shouldIgnoreKey) => key === shouldIgnoreKey);
    });
    const columnHelper = createColumnHelper();
    const columns = [
        ...ignored.map((column, index) => {
            // @ts-expect-error column accessor type issue with generic TData
            return columnHelper.accessor(column, {
                cell: (props) => {
                    // @ts-expect-error find type for unknown
                    const value = props.row.original[column];
                    if (typeof value === 'object') {
                        return (jsx(Grid, { overflow: 'auto', children: jsx(RecordDisplay, { object: value }) }));
                    }
                    return jsx(TextCell, { children: value });
                },
                header: (columnHeader) => {
                    const displayName = columnHeader.column.columnDef.meta?.displayName ??
                        getColumn({ column });
                    return jsx("span", { children: displayName });
                },
                footer: (columnFooter) => {
                    const displayName = columnFooter.column.columnDef.meta?.displayName ??
                        getColumn({ column });
                    return jsx("span", { children: displayName });
                },
                size: width[index] ?? defaultWidth,
                meta: Object.keys(meta).length > 0 ? meta[column] : {},
            });
        }),
    ];
    return columns;
};

//@ts-expect-error TODO: find appropriate type
const SchemaFormContext = createContext({
    schema: {},
    requestUrl: '',
    order: [],
    ignore: [],
    include: [],
    onSubmit: async () => { },
    rowNumber: 0,
    /** Default translate fallback - returns key as-is */
    translate: {
        t: (key) => key,
        ready: true,
    },
    requestOptions: {},
    timezone: 'Asia/Hong_Kong',
    displayConfig: {
        showSubmitButton: true,
        showResetButton: true,
        showTitle: true,
    },
    requireConfirmation: false,
    onFormSubmit: async () => { },
    ajvResolver: async () => ({ values: {}, errors: {} }),
});

const useSchemaContext = () => {
    return useContext(SchemaFormContext);
};

const clearEmptyString = (object) => {
    return Object.fromEntries(Object.entries(object).filter(([, value]) => value !== ""));
};

const validateData = (data, schema) => {
    const ajv = new Ajv({
        strict: false,
        allErrors: true,
    });
    addFormats(ajv);
    const validate = ajv.compile(schema);
    const validationResult = validate(data);
    const errors = validate.errors;
    console.log(errors, data);
    return {
        isValid: validationResult,
        validate,
        errors,
    };
};

/**
 * Gets the schema node for a field by following the path from root schema
 */
const getSchemaNodeForField = (schema, fieldPath) => {
    if (!fieldPath || fieldPath === '') {
        return schema;
    }
    const pathParts = fieldPath.split('.');
    let currentSchema = schema;
    for (const part of pathParts) {
        if (currentSchema &&
            currentSchema.properties &&
            currentSchema.properties[part] &&
            typeof currentSchema.properties[part] === 'object' &&
            currentSchema.properties[part] !== null) {
            currentSchema = currentSchema.properties[part];
        }
        else {
            return undefined;
        }
    }
    return currentSchema;
};
/**
 * Converts AJV error objects to react-hook-form field errors format
 */
const convertAjvErrorsToFieldErrors = (errors, schema) => {
    if (!errors || errors.length === 0) {
        return {};
    }
    const fieldErrors = {};
    errors.forEach((error) => {
        let fieldName = '';
        // Special handling for required keyword: map to the specific missing property
        if (error.keyword === 'required') {
            const basePath = (error.instancePath || '')
                .replace(/^\//, '')
                .replace(/\//g, '.');
            const missingProperty = (error.params &&
                error.params.missingProperty);
            if (missingProperty) {
                fieldName = basePath
                    ? `${basePath}.${missingProperty}`
                    : missingProperty;
            }
            else {
                // Fallback to schemaPath conversion if missingProperty is unavailable
                fieldName = (error.schemaPath || '')
                    .replace(/^#\//, '#.')
                    .replace(/\//g, '.');
            }
        }
        else {
            const fieldPath = error.instancePath || error.schemaPath;
            if (fieldPath) {
                fieldName = fieldPath.replace(/^\//, '').replace(/\//g, '.');
            }
        }
        if (fieldName) {
            // Get the schema node for this field to check for custom error messages
            const fieldSchema = getSchemaNodeForField(schema, fieldName);
            const customMessage = fieldSchema?.errorMessages?.[error.keyword];
            // Debug log when error message is missing
            if (!customMessage) {
                console.debug(`[Form Validation] Missing error message for field '${fieldName}' with keyword '${error.keyword}'. Add errorMessages.${error.keyword} to schema for field '${fieldName}'`, {
                    fieldName,
                    keyword: error.keyword,
                    instancePath: error.instancePath,
                    schemaPath: error.schemaPath,
                    params: error.params,
                    fieldSchema: fieldSchema
                        ? {
                            type: fieldSchema.type,
                            errorMessages: fieldSchema.errorMessages,
                        }
                        : undefined,
                });
            }
            // Provide helpful fallback message if no custom message is provided
            const fallbackMessage = customMessage ||
                `Missing error message for ${error.keyword}. Add errorMessages.${error.keyword} to schema for field '${fieldName}'`;
            if (error.keyword === 'required') {
                // Required errors override any existing non-required errors for this field
                fieldErrors[fieldName] = {
                    type: 'required',
                    keyword: error.keyword,
                    params: error.params,
                    message: fallbackMessage,
                };
            }
            else {
                const existing = fieldErrors[fieldName];
                if (existing) {
                    // Do not override required errors
                    if (existing.type === 'required') {
                        return;
                    }
                    // Combine messages if multiple errors for same field
                    existing.message = existing.message
                        ? `${existing.message}; ${fallbackMessage}`
                        : fallbackMessage;
                }
                else {
                    fieldErrors[fieldName] = {
                        type: error.keyword,
                        keyword: error.keyword,
                        params: error.params,
                        message: fallbackMessage,
                    };
                }
            }
        }
    });
    return fieldErrors;
};
/**
 * AJV resolver for react-hook-form
 * Integrates AJV validation with react-hook-form's validation system
 */
/**
 * Strips null, undefined, and empty string values from an object
 */
const stripEmptyValues = (obj) => {
    if (obj === null || obj === undefined) {
        return undefined;
    }
    if (typeof obj === 'string' && obj.trim() === '') {
        return undefined;
    }
    if (Array.isArray(obj)) {
        const filtered = obj
            .map(stripEmptyValues)
            .filter((item) => item !== undefined);
        return filtered.length > 0 ? filtered : undefined;
    }
    if (typeof obj === 'object' && obj !== null) {
        const result = {};
        let hasValues = false;
        for (const [key, value] of Object.entries(obj)) {
            const cleanedValue = stripEmptyValues(value);
            if (cleanedValue !== undefined) {
                result[key] = cleanedValue;
                hasValues = true;
            }
        }
        return hasValues ? result : undefined;
    }
    return obj;
};
const ajvResolver = (schema) => {
    return async (values) => {
        try {
            // Strip empty values before validation
            const cleanedValues = stripEmptyValues(values);
            // Use empty object for validation if all values were stripped
            const valuesToValidate = cleanedValues === undefined ? {} : cleanedValues;
            const { isValid, errors } = validateData(valuesToValidate, schema);
            console.debug('AJV Validation Result:', {
                isValid,
                errors,
                cleanedValues,
                valuesToValidate,
            });
            if (isValid) {
                return {
                    values: (cleanedValues || {}),
                    errors: {},
                };
            }
            const fieldErrors = convertAjvErrorsToFieldErrors(errors, schema);
            console.debug('AJV Validation Failed:', {
                errors,
                fieldErrors,
                cleanedValues,
                valuesToValidate,
            });
            return {
                values: {},
                errors: fieldErrors,
            };
        }
        catch (error) {
            return {
                values: {},
                errors: {
                    root: {
                        type: 'validation',
                        message: error instanceof Error ? error.message : 'Validation failed',
                    },
                },
            };
        }
    };
};

const idPickerSanityCheck = (column, foreign_key) => {
    if (!!foreign_key == false) {
        throw new Error(`The key foreign_key does not exist in properties of column ${column} when using id-picker.`);
    }
    const { table, column: foreignKeyColumn } = foreign_key;
    if (!!table == false) {
        throw new Error(`The key table does not exist in properties of column ${table} when using id-picker.`);
    }
    if (!!foreignKeyColumn == false) {
        throw new Error(`The key column does not exist in properties of column ${column} when using id-picker.`);
    }
};
const FormRoot = ({ schema, idMap, setIdMap, form, translate, children, order = [], ignore = [], include = [], onSubmit = undefined, rowNumber = undefined, requestOptions = {}, getUpdatedData = () => { }, customErrorRenderer, customSuccessRenderer, displayConfig = {
    showSubmitButton: true,
    showResetButton: true,
    showTitle: true,
}, requireConfirmation = false, dateTimePickerLabels, idPickerLabels, enumPickerLabels, filePickerLabels, formButtonLabels, timePickerLabels, insideDialog = false, }) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [validatedData, setValidatedData] = useState();
    const [error, setError] = useState();
    const onBeforeSubmit = () => {
        setIsSubmiting(true);
    };
    const onAfterSubmit = () => {
        setIsSubmiting(false);
    };
    const onSubmitError = (error) => {
        setIsError(true);
        setError(error);
    };
    const onSubmitSuccess = () => {
        setIsSuccess(true);
    };
    const defaultOnSubmit = async (promise) => {
        try {
            console.log('onBeforeSubmit');
            onBeforeSubmit();
            await promise;
            console.log('onSubmitSuccess');
            onSubmitSuccess();
        }
        catch (error) {
            console.log('onSubmitError', error);
            onSubmitError(error);
        }
        finally {
            onAfterSubmit();
        }
    };
    const defaultSubmitPromise = (data) => {
        if (!requestOptions.url) {
            throw new Error('requestOptions.url is required when onSubmit is not provided');
        }
        const options = {
            method: 'POST',
            data: clearEmptyString(data),
            ...requestOptions,
        };
        return axios.request(options);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFormSubmit = async (data) => {
        // AJV validation is now handled by react-hook-form resolver
        // This function will only be called if validation passes
        if (onSubmit === undefined) {
            await defaultOnSubmit(Promise.resolve(defaultSubmitPromise(data)));
            return;
        }
        await defaultOnSubmit(Promise.resolve(onSubmit(data)));
    };
    return (jsx(SchemaFormContext.Provider, { value: {
            schema,
            order,
            ignore,
            include,
            // @ts-expect-error TODO: find appropriate types
            onSubmit,
            rowNumber,
            idMap,
            setIdMap,
            translate,
            requestOptions,
            isSuccess,
            setIsSuccess,
            isError,
            setIsError,
            isSubmiting,
            setIsSubmiting,
            isConfirming,
            setIsConfirming,
            validatedData,
            setValidatedData,
            error,
            setError,
            getUpdatedData,
            customErrorRenderer,
            customSuccessRenderer,
            displayConfig,
            requireConfirmation,
            onFormSubmit,
            dateTimePickerLabels,
            idPickerLabels,
            enumPickerLabels,
            filePickerLabels,
            formButtonLabels,
            timePickerLabels,
            ajvResolver: ajvResolver(schema),
            insideDialog,
        }, children: jsx(FormProvider, { ...form, children: children }) }));
};

function removeIndex(str) {
    return str.replace(/\.\d+\./g, ".");
}

/**
 * Custom hook for form field labels and fallback text.
 * Automatically handles colLabel construction and removeIndex logic.
 * Uses schema.title when available, otherwise falls back to translate function.
 *
 * @param column - The column name
 * @param prefix - The prefix for the field (usually empty string or parent path)
 * @param schema - Required schema object with title property
 * @returns Object with label helper functions
 *
 * @example
 * ```tsx
 * const formI18n = useFormI18n(column, prefix, schema);
 *
 * // Get field label (prefers schema.title)
 * <Field label={formI18n.label()} />
 *
 * // Get required error message
 * <Text>{formI18n.required()}</Text>
 *
 * // Get custom text
 * <Text>{formI18n.t('add_more')}</Text>
 *
 * // Access the raw colLabel
 * const colLabel = formI18n.colLabel;
 * ```
 */
const useFormI18n = (column, prefix = '', schema) => {
    const { translate } = useSchemaContext();
    const colLabel = `${prefix}${column}`;
    return {
        /**
         * The constructed column label (prefix + column)
         */
        colLabel,
        /**
         * Get the field label from schema title prop, or fall back to translate function
         * Uses schema.title if available, otherwise: translate.t(removeIndex(`${colLabel}.field_label`))
         */
        label: (options) => {
            if (schema.title) {
                return schema.title;
            }
            // Debug log when field title is missing
            console.debug(`[Form Field Label] Missing title for field '${colLabel}'. Add title property to schema for field '${colLabel}'.`, {
                fieldName: column,
                colLabel,
                prefix,
                schema: {
                    type: schema.type,
                    errorMessages: schema.errorMessages
                        ? Object.keys(schema.errorMessages)
                        : undefined,
                },
            });
            return translate.t(removeIndex(`${colLabel}.field_label`), options);
        },
        /**
         * Get the required error message
         * Equivalent to: translate.t(removeIndex(`${colLabel}.field_required`))
         */
        required: (options) => {
            return translate.t(removeIndex(`${colLabel}.field_required`), options);
        },
        /**
         * Get text for any custom key relative to the field
         * Equivalent to: translate.t(removeIndex(`${colLabel}.${key}`))
         *
         * @param key - The key suffix (e.g., 'add_more', 'total', etc.)
         * @param options - Optional options (e.g., defaultValue, interpolation variables)
         */
        t: (key, options) => {
            return translate.t(removeIndex(`${colLabel}.${key}`), options);
        },
        /**
         * Access to the original translate object for edge cases
         */
        translate,
    };
};

const ArrayRenderer = ({ schema, column, prefix, }) => {
    const { gridRow, gridColumn = '1/span 12', required, items } = schema;
    // @ts-expect-error TODO: find suitable types
    const { type } = items;
    const colLabel = `${prefix}${column}`;
    const isRequired = required?.some((columnId) => columnId === column);
    const formI18n = useFormI18n(column, prefix, schema);
    const { formState: { errors }, setValue, watch, } = useFormContext();
    const { formButtonLabels } = useSchemaContext();
    const fields = (watch(colLabel) ?? []);
    return (jsxs(Flex, { gridRow, gridColumn, flexFlow: 'column', gap: 2, children: [jsxs(Box, { as: "label", children: [formI18n.label(), isRequired && jsx("span", { children: "*" })] }), jsx(Flex, { flexFlow: 'column', gap: 2, children: fields.map((field, index) => (jsxs(Grid, { gridTemplateColumns: '1fr auto', gap: 2, bgColor: { base: 'colorPalette.100', _dark: 'colorPalette.900' }, p: 2, borderRadius: 4, borderWidth: 1, borderColor: {
                        base: 'colorPalette.200',
                        _dark: 'colorPalette.800',
                    }, children: [jsx(Grid, { gridTemplateColumns: 'repeat(12, 1fr)', autoFlow: 'row', children: jsx(SchemaRenderer, { column: `${index}`,
                                prefix: `${colLabel}.`,
                                // @ts-expect-error find suitable types
                                schema: { showLabel: false, ...(items ?? {}) } }) }), jsx(Flex, { justifyContent: 'end', children: jsx(Button$1, { variant: 'ghost', onClick: () => {
                                    setValue(colLabel, fields.filter((_, curIndex) => {
                                        return curIndex !== index;
                                    }));
                                }, children: jsx(Icon, { children: jsx(CgTrash, {}) }) }) })] }, `${colLabel}.${index}`))) }), jsx(Flex, { children: jsx(Button$1, { onClick: () => {
                        if (type === 'number') {
                            setValue(colLabel, [...fields, 0]);
                            return;
                        }
                        if (type === 'string') {
                            setValue(colLabel, [...fields, '']);
                            return;
                        }
                        if (type === 'boolean') {
                            setValue(colLabel, [...fields, false]);
                            return;
                        }
                        setValue(colLabel, [...fields, {}]);
                    }, children: formButtonLabels?.add ?? 'Add' }) }), errors[`${column}`] && (jsx(Text, { color: 'red.400', children: formI18n.required() }))] }));
};

const Field = React.forwardRef(function Field(props, ref) {
    const { label, children, helperText, errorText, optionalText, ...rest } = props;
    return (jsxs(Field$1.Root, { ref: ref, ...rest, children: [label && (jsxs(Field$1.Label, { children: [label, jsx(Field$1.RequiredIndicator, { color: rest.invalid && rest.required ? 'red.500' : undefined, fallback: optionalText })] })), children, helperText && (jsx(Field$1.HelperText, { children: helperText })), !!errorText && (jsxs(Field$1.ErrorText, { children: [rest.required && rest.invalid && (jsx("span", { style: { color: 'var(--chakra-colors-red-500)' }, children: "* " })), errorText] }))] }));
});

const BooleanPicker = ({ schema, column, prefix }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const value = watch(colLabel);
    const formI18n = useFormI18n(column, prefix, schema);
    return (jsx(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: errors[`${colLabel}`] ? formI18n.required() : undefined, invalid: !!errors[colLabel], children: jsx(CheckboxCard, { checked: value, variant: 'surface', onChange: () => {
                setValue(colLabel, !value);
            } }) }));
};

const CustomInput = ({ column, schema, prefix }) => {
    const formContext = useFormContext();
    const { inputRender } = schema;
    return (inputRender &&
        inputRender({
            column,
            schema,
            prefix,
            formContext,
        }));
};

const Calendar = ({ calendars, getBackProps, getForwardProps, getDateProps, firstDayOfWeek = 0, }) => {
    const { labels } = useContext(DatePickerContext);
    const { monthNamesShort, weekdayNamesShort, backButtonLabel, forwardButtonLabel, } = labels;
    if (calendars.length) {
        return (jsxs(Grid, { children: [jsxs(Grid, { templateColumns: 'repeat(4, auto)', justifyContent: 'center', children: [jsx(Button$1, { variant: 'ghost', ...getBackProps({
                                calendars,
                                offset: 12,
                            }), children: '<<' }), jsx(Button$1, { variant: 'ghost', ...getBackProps({ calendars }), children: backButtonLabel }), jsx(Button$1, { variant: 'ghost', ...getForwardProps({ calendars }), children: forwardButtonLabel }), jsx(Button$1, { variant: 'ghost', ...getForwardProps({
                                calendars,
                                offset: 12,
                            }), children: '>>' })] }), jsx(Grid, { templateColumns: 'repeat(2, auto)', justifyContent: 'center', children: calendars.map((calendar) => (jsxs(Grid, { gap: 4, children: [jsxs(Grid, { justifyContent: 'center', children: [monthNamesShort[calendar.month], " ", calendar.year] }), jsxs(Grid, { templateColumns: 'repeat(7, auto)', justifyContent: 'center', children: [[0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
                                        const weekday = (weekdayNum + firstDayOfWeek) % 7;
                                        return (jsx(Text, { textAlign: 'center', children: weekdayNamesShort[weekday] }, `${calendar.month}${calendar.year}${weekday}`));
                                    }), calendar.weeks.map((week, weekIndex) => week.map((dateObj, index) => {
                                        const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                                        if (!dateObj) {
                                            return jsx(Grid, {}, key);
                                        }
                                        const { date, selected, selectable, today, isCurrentMonth, } = dateObj;
                                        const getDateColor = ({ today, selected, selectable, }) => {
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
                                        const getVariant = ({ today, selected, selectable, }) => {
                                            if (!selectable) {
                                                return 'surface';
                                            }
                                            if (selected) {
                                                return 'solid';
                                            }
                                            if (today) {
                                                return 'surface';
                                            }
                                            return 'ghost';
                                        };
                                        const color = getDateColor({ today, selected, selectable });
                                        const variant = getVariant({ today, selected, selectable });
                                        return (jsx(Button$1, { variant: variant, colorPalette: color, opacity: isCurrentMonth ? 1 : 0.4, ...getDateProps({ dateObj }), children: selectable ? date.getDate() : 'X' }, key));
                                    }))] })] }, `${calendar.month}${calendar.year}`))) })] }));
    }
    return null;
};
const DatePickerContext = createContext({
    labels: {
        monthNamesShort: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        weekdayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        backButtonLabel: 'Back',
        forwardButtonLabel: 'Next',
    },
});
const DatePicker$1 = ({ labels = {
    monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ],
    weekdayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    backButtonLabel: 'Back',
    forwardButtonLabel: 'Next',
}, onDateSelected, selected, firstDayOfWeek, showOutsideDays, date, minDate, maxDate, monthsToDisplay, render, }) => {
    const calendarData = useCalendar({
        onDateSelected,
        selected,
        firstDayOfWeek,
        showOutsideDays,
        date,
        minDate,
        maxDate,
        monthsToDisplay,
    });
    return (jsx(DatePickerContext.Provider, { value: { labels }, children: render ? (render(calendarData)) : (jsx(Calendar, { ...calendarData,
            firstDayOfWeek })) }));
};

dayjs.extend(utc);
dayjs.extend(timezone);
const DatePicker = ({ column, schema, prefix }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
    const { timezone, dateTimePickerLabels, insideDialog } = useSchemaContext();
    const formI18n = useFormI18n(column, prefix, schema);
    const { required, gridColumn = 'span 12', gridRow = 'span 1', displayDateFormat = 'YYYY-MM-DD', dateFormat = 'YYYY-MM-DD', } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = formI18n.colLabel;
    const [open, setOpen] = useState(false);
    const selectedDate = watch(colLabel);
    const displayDate = dayjs(selectedDate)
        .tz(timezone)
        .format(displayDateFormat);
    useEffect(() => {
        try {
            if (selectedDate) {
                // Parse the selectedDate as UTC or in a specific timezone to avoid +8 hour shift
                // For example, parse as UTC:
                const parsedDate = dayjs(selectedDate).tz(timezone);
                if (!parsedDate.isValid())
                    return;
                // Format according to dateFormat from schema
                const formatted = parsedDate.format(dateFormat);
                // Update the form value only if different to avoid loops
                if (formatted !== selectedDate) {
                    setValue(colLabel, formatted, {
                        shouldValidate: true,
                        shouldDirty: true,
                    });
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    }, [selectedDate, dateFormat, colLabel, setValue]);
    const datePickerLabels = {
        monthNamesShort: dateTimePickerLabels?.monthNamesShort ?? [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        weekdayNamesShort: dateTimePickerLabels?.weekdayNamesShort ?? [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
        ],
        backButtonLabel: dateTimePickerLabels?.backButtonLabel ?? 'Back',
        forwardButtonLabel: dateTimePickerLabels?.forwardButtonLabel ?? 'Forward',
    };
    const datePickerContent = (jsx(DatePicker$1, { selected: new Date(selectedDate), onDateSelected: ({ date }) => {
            setValue(colLabel, dayjs(date).format(dateFormat));
            setOpen(false);
        }, labels: datePickerLabels }));
    return (jsx(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: errors[`${colLabel}`] ? formI18n.required() : undefined, invalid: !!errors[colLabel], children: jsxs(Popover.Root, { open: open, onOpenChange: (e) => setOpen(e.open), closeOnInteractOutside: true, children: [jsx(Popover.Trigger, { asChild: true, children: jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
                            setOpen(true);
                        }, justifyContent: 'start', children: [jsx(MdDateRange, {}), selectedDate !== undefined ? `${displayDate}` : ''] }) }), insideDialog ? (jsx(Popover.Positioner, { children: jsx(Popover.Content, { width: "fit-content", minH: "25rem", children: jsx(Popover.Body, { children: datePickerContent }) }) })) : (jsx(Portal, { children: jsx(Popover.Positioner, { children: jsx(Popover.Content, { width: "fit-content", minH: "25rem", children: jsx(Popover.Body, { children: datePickerContent }) }) }) }))] }) }));
};

dayjs.extend(utc);
dayjs.extend(timezone);
const DateRangePicker = ({ column, schema, prefix, }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
    const { timezone, insideDialog } = useSchemaContext();
    const formI18n = useFormI18n(column, prefix, schema);
    const { required, gridColumn = 'span 12', gridRow = 'span 1', displayDateFormat = 'YYYY-MM-DD', dateFormat = 'YYYY-MM-DD', } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = formI18n.colLabel;
    const [open, setOpen] = useState(false);
    const selectedDateRange = watch(colLabel);
    // Convert string[] to Date[] for the picker
    const selectedDates = (selectedDateRange ?? [])
        .map((dateStr) => {
        if (!dateStr)
            return null;
        const parsed = dayjs(dateStr).tz(timezone);
        return parsed.isValid() ? parsed.toDate() : null;
    })
        .filter((date) => date !== null);
    // Format display string
    const getDisplayText = () => {
        if (!selectedDateRange || selectedDateRange.length === 0) {
            return '';
        }
        if (selectedDateRange.length === 1) {
            const date = dayjs(selectedDateRange[0]).tz(timezone);
            return date.isValid() ? date.format(displayDateFormat) : '';
        }
        if (selectedDateRange.length === 2) {
            const startDate = dayjs(selectedDateRange[0]).tz(timezone);
            const endDate = dayjs(selectedDateRange[1]).tz(timezone);
            if (startDate.isValid() && endDate.isValid()) {
                return `${startDate.format(displayDateFormat)} - ${endDate.format(displayDateFormat)}`;
            }
        }
        return '';
    };
    useEffect(() => {
        try {
            if (selectedDateRange && selectedDateRange.length > 0) {
                // Format dates according to dateFormat from schema
                const formatted = selectedDateRange
                    .map((dateStr) => {
                    if (!dateStr)
                        return null;
                    const parsed = dayjs(dateStr).tz(timezone);
                    return parsed.isValid() ? parsed.format(dateFormat) : null;
                })
                    .filter((date) => date !== null);
                // Update the form value only if different to avoid loops
                // Compare arrays element by element
                const needsUpdate = formatted.length !== selectedDateRange.length ||
                    formatted.some((val, idx) => val !== selectedDateRange[idx]);
                if (needsUpdate && formatted.length > 0) {
                    setValue(colLabel, formatted, {
                        shouldValidate: true,
                        shouldDirty: true,
                    });
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    }, [selectedDateRange, dateFormat, colLabel, setValue, timezone]);
    return (jsx(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: errors[`${colLabel}`] ? formI18n.required() : undefined, invalid: !!errors[colLabel], children: jsxs(Popover.Root, { open: open, onOpenChange: (e) => setOpen(e.open), closeOnInteractOutside: true, children: [jsx(Popover.Trigger, { asChild: true, children: jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
                            setOpen(true);
                        }, justifyContent: 'start', children: [jsx(MdDateRange, {}), getDisplayText()] }) }), insideDialog ? (jsx(Popover.Positioner, { children: jsx(Popover.Content, { width: "fit-content", minW: "50rem", minH: "25rem", children: jsx(Popover.Body, { children: jsx(RangeDatePicker, { selected: selectedDates, onDateSelected: ({ selectable, date }) => {
                                    const newDates = getRangeDates({
                                        selectable,
                                        date,
                                        selectedDates,
                                    }) ?? [];
                                    // Convert Date[] to string[]
                                    const formattedDates = newDates
                                        .map((dateObj) => dayjs(dateObj).tz(timezone).format(dateFormat))
                                        .filter((dateStr) => dateStr);
                                    setValue(colLabel, formattedDates, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    });
                                }, monthsToDisplay: 2, withPopover: false }) }) }) })) : (jsx(Portal, { children: jsx(Popover.Positioner, { children: jsx(Popover.Content, { width: "fit-content", minW: "50rem", minH: "25rem", children: jsx(Popover.Body, { children: jsx(RangeDatePicker, { selected: selectedDates, onDateSelected: ({ selectable, date }) => {
                                        const newDates = getRangeDates({
                                            selectable,
                                            date,
                                            selectedDates,
                                        }) ?? [];
                                        // Convert Date[] to string[]
                                        const formattedDates = newDates
                                            .map((dateObj) => dayjs(dateObj).tz(timezone).format(dateFormat))
                                            .filter((dateStr) => dateStr);
                                        setValue(colLabel, formattedDates, {
                                            shouldValidate: true,
                                            shouldDirty: true,
                                        });
                                    }, monthsToDisplay: 2, withPopover: false }) }) }) }) }))] }) }));
};

const EnumPicker = ({ column, isMultiple = false, schema, prefix, showTotalAndLimit = false, }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
    const { enumPickerLabels, insideDialog } = useSchemaContext();
    const formI18n = useFormI18n(column, prefix, schema);
    const { required, variant } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const { gridColumn = 'span 12', gridRow = 'span 1', renderDisplay } = schema;
    const colLabel = formI18n.colLabel;
    const watchEnum = watch(colLabel);
    const watchEnums = (watch(colLabel) ?? []);
    const dataList = schema.enum ?? [];
    // Current value for combobox (array format)
    const currentValue = isMultiple
        ? watchEnums.filter((val) => val != null && val !== '')
        : watchEnum
            ? [watchEnum]
            : [];
    // Transform enum data for combobox collection
    const comboboxItems = useMemo(() => {
        return dataList.map((item) => ({
            label: !!renderDisplay === true
                ? String(renderDisplay(item))
                : formI18n.t(item),
            value: item,
        }));
    }, [dataList, renderDisplay, formI18n]);
    // Use filter hook for combobox
    const { contains } = useFilter({ sensitivity: 'base' });
    // Create collection for combobox
    const { collection, filter } = useListCollection({
        initialItems: comboboxItems,
        itemToString: (item) => item.label,
        itemToValue: (item) => item.value,
        filter: contains,
    });
    // Handle input value change (search)
    const handleInputValueChange = (details) => {
        filter(details.inputValue);
    };
    // Handle value change
    const handleValueChange = (details) => {
        if (isMultiple) {
            setValue(colLabel, details.value);
        }
        else {
            setValue(colLabel, details.value[0] || '');
        }
    };
    if (variant === 'radio') {
        return (jsx(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
            gridRow, errorText: errors[`${colLabel}`] ? formI18n.required() : undefined, invalid: !!errors[colLabel], children: jsx(RadioGroup$1.Root, { value: !isMultiple ? watchEnum : undefined, onValueChange: (details) => {
                    if (!isMultiple) {
                        setValue(colLabel, details.value);
                    }
                }, children: jsx(HStack, { gap: "6", children: dataList.map((item) => {
                        return (jsxs(RadioGroup$1.Item, { value: item, children: [jsx(RadioGroup$1.ItemHiddenInput, {}), jsx(RadioGroup$1.ItemIndicator, {}), jsx(RadioGroup$1.ItemText, { children: !!renderDisplay === true
                                        ? renderDisplay(item)
                                        : formI18n.t(item) })] }, `${colLabel}-${item}`));
                    }) }) }) }));
    }
    return (jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: errors[`${colLabel}`] ? formI18n.required() : undefined, invalid: !!errors[colLabel], children: [isMultiple && currentValue.length > 0 && (jsx(Flex, { flexFlow: 'wrap', gap: 1, mb: 2, children: currentValue.map((enumValue) => {
                    if (!enumValue) {
                        return null;
                    }
                    return (jsx(Tag, { size: "lg", closable: true, onClick: () => {
                            const newValue = currentValue.filter((val) => val !== enumValue);
                            setValue(colLabel, newValue);
                        }, children: !!renderDisplay === true
                            ? renderDisplay(enumValue)
                            : formI18n.t(enumValue) }, enumValue));
                }) })), jsxs(Combobox.Root, { collection: collection, value: currentValue, onValueChange: handleValueChange, onInputValueChange: handleInputValueChange, multiple: isMultiple, closeOnSelect: !isMultiple, openOnClick: true, invalid: !!errors[colLabel], width: "100%", positioning: insideDialog
                    ? { strategy: 'fixed', hideWhenDetached: true }
                    : undefined, children: [jsxs(Combobox.Control, { children: [jsx(Combobox.Input, { placeholder: enumPickerLabels?.typeToSearch ?? formI18n.t('type_to_search') }), jsxs(Combobox.IndicatorGroup, { children: [!isMultiple && currentValue.length > 0 && (jsx(Combobox.ClearTrigger, { onClick: () => {
                                            setValue(colLabel, '');
                                        } })), jsx(Combobox.Trigger, {})] })] }), insideDialog ? (jsx(Combobox.Positioner, { children: jsxs(Combobox.Content, { children: [showTotalAndLimit && (jsx(Text, { p: 2, fontSize: "sm", color: "fg.muted", children: `${enumPickerLabels?.total ?? formI18n.t('total')}: ${collection.items.length}` })), collection.items.length === 0 ? (jsx(Combobox.Empty, { children: enumPickerLabels?.emptySearchResult ??
                                        formI18n.t('empty_search_result') })) : (jsx(Fragment, { children: collection.items.map((item, index) => (jsxs(Combobox.Item, { item: item, children: [jsx(Combobox.ItemText, { children: item.label }), jsx(Combobox.ItemIndicator, {})] }, item.value ?? `item-${index}`))) }))] }) })) : (jsx(Portal, { children: jsx(Combobox.Positioner, { children: jsxs(Combobox.Content, { children: [showTotalAndLimit && (jsx(Text, { p: 2, fontSize: "sm", color: "fg.muted", children: `${enumPickerLabels?.total ?? formI18n.t('total')}: ${collection.items.length}` })), collection.items.length === 0 ? (jsx(Combobox.Empty, { children: enumPickerLabels?.emptySearchResult ??
                                            formI18n.t('empty_search_result') })) : (jsx(Fragment, { children: collection.items.map((item, index) => (jsxs(Combobox.Item, { item: item, children: [jsx(Combobox.ItemText, { children: item.label }), jsx(Combobox.ItemIndicator, {})] }, item.value ?? `item-${index}`))) }))] }) }) }))] })] }));
};

function isEnteringWindow(_ref) {
  var dragEnter = _ref.dragEnter;
  var type = dragEnter.type,
    relatedTarget = dragEnter.relatedTarget;
  if (type !== 'dragenter') {
    return false;
  }
  if (isSafari()) {
    return isEnteringWindowInSafari({
      dragEnter: dragEnter
    });
  }

  // standard check
  if (relatedTarget == null) {
    return true;
  }

  /**
   * 🦊 Exception: `iframe` in Firefox (`125.0`)
   *
   * Case 1: parent `window` → child `iframe`
   * `relatedTarget` is the `iframe` element in the parent `window`
   * (foreign element)
   *
   * Case 2: child `iframe` → parent `window`
   * `relatedTarget` is an element inside the child `iframe`
   * (foreign element)
   */

  if (isFirefox()) {
    return isFromAnotherWindow(relatedTarget);
  }

  /**
   * 🌏 Exception: `iframe` in Chrome (`124.0`)
   *
   * Case 1: parent `window` → child `iframe`
   * `relatedTarget` is `null` *(standard check)*
   *
   * Case 2: child `iframe` → parent `window`
   * `relatedTarget` is the `iframe` element in the parent `window`
   */

  // Case 2
  // Using `instanceof` check as the element will be in the same `window`
  return relatedTarget instanceof HTMLIFrameElement;
}

function isAnAvailableType(_ref) {
  var type = _ref.type,
    value = _ref.value;
  // We don't want to expose our private elementAdapter key / value
  if (type === elementAdapterNativeDataKey) {
    return false;
  }
  // Not exposing "text/plain" if it contains the android fallback text
  // We _could_ add an `isAndroid()` check, but it's probably safest
  // to trim this data out, regardless of what OS we see it on.
  if (type === textMediaType && value === androidFallbackText) {
    return false;
  }
  return true;
}
function getAvailableTypes(transfer) {
  return Array.from(transfer.types).filter(function (type) {
    return isAnAvailableType({
      type: type,
      value: transfer.getData(type)
    });
  });
}
function getAvailableItems(dataTransfer) {
  // item.kind is 'string' | 'file'
  // For 'string' item.type is the mimeType (eg 'text/plain')
  // For 'file' item.type is the file type (eg 'image/jpg')

  return Array.from(dataTransfer.items).filter(function (item) {
    return item.kind === 'file' || isAnAvailableType({
      type: item.type,
      value: dataTransfer.getData(item.type)
    });
  });
}
var didDragStartLocally = false;
var adapter = makeAdapter({
  typeKey: 'external',
  // for external drags, we are generally making a copy of something that is being dragged
  defaultDropEffect: 'copy',
  mount: function mount(api) {
    // Binding to the `window` so that the element adapter
    // has a chance to get in first on the`document`.
    // We are giving preference to the element adapter.
    return bind(window, {
      type: 'dragenter',
      listener: function listener(event) {
        // drag operation was started within the document, it won't be an "external" drag
        if (didDragStartLocally) {
          return;
        }

        // Note: not checking if event was cancelled (`event.defaultPrevented`) as
        // cancelling a "dragenter" accepts the drag operation (not prevent it)

        // Something has gone wrong with our drag event
        if (!event.dataTransfer) {
          // Including this code on "test" and "development" environments:
          // - Browser tests commonly run against "development" builds
          // - Unit tests commonly run in "test"
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.warn("\n              It appears as though you have are not testing DragEvents correctly.\n\n              - If you are unit testing, ensure you have polyfilled DragEvent.\n              - If you are browser testing, ensure you are dispatching drag events correctly.\n\n              Please see our testing guides for more information:\n              https://atlassian.design/components/pragmatic-drag-and-drop/core-package/testing\n            ".replace(/ {2}/g, ''));
          }
          return;
        }
        if (!api.canStart(event)) {
          return;
        }
        if (!isEnteringWindow({
          dragEnter: event
        })) {
          return;
        }

        // Note: not checking types for `elementAdapterNativeDataKey` as we expect to see that
        // key when pdnd started the drag in another document
        var types = getAvailableTypes(event.dataTransfer);
        if (!types.length) {
          return;
        }
        var locked = {
          types: types,
          items: [],
          getStringData: function getStringData() {
            return null;
          }
        };
        api.start({
          event: event,
          dragType: {
            type: 'external',
            startedFrom: 'external',
            payload: locked,
            getDropPayload: function getDropPayload(event) {
              // this would be a platform error
              // trying to handle it gracefully rather than throwing (for now)
              if (!event.dataTransfer) {
                return locked;
              }
              var items = getAvailableItems(event.dataTransfer);
              // need to use `.bind` as `getData` is required
              // to be run with `event.dataTransfer` as the "this" context
              var nativeGetData = event.dataTransfer.getData.bind(event.dataTransfer);
              return {
                types: types,
                items: items,
                // return `null` if there is no result, otherwise string
                getStringData: function getStringData(mediaType) {
                  // not dragging the requested type
                  // return `null` (no result)
                  if (!types.includes(mediaType)) {
                    return null;
                  }

                  // nativeGetData will return `""` when there is no value,
                  // but at this point we know we will only get explicitly set
                  // values back as we have checked the `types`.
                  // `""` can be an explicitly set value.
                  var value = nativeGetData(mediaType);

                  // not exposing data for unavailable types
                  if (!isAnAvailableType({
                    type: mediaType,
                    value: value
                  })) {
                    return null;
                  }
                  return value;
                }
              };
            }
          }
        });
      }
    });
  }
});

/**
 * Some events don't make sense for the external adapter
 *
 * `onGenerateDragPreview`
 * The browser creates the drag preview for external drags, so we don't
 * need an event to generate the preview for _monitors_ or the _dropTarget_
 *
 * `onDragStart`
 * An external drag can never start from in the `window`, so _dropTarget_'s
 * don't need `onDragStart`
 */

function dropTargetForExternal(args) {
  // not removing unused events, just leaning on the type system
  return adapter.dropTarget(args);
}
(function startup() {
  // server side rendering check
  if (typeof window === 'undefined') {
    return;
  }

  // A shared single usage registration as we want to capture
  // all external drag operations, even if there are no drop targets
  // on the page yet
  adapter.registerUsage();
  // independent of pdnd, we need to keep track of
  // all drag operations so that we can know if a drag operation
  // has started locally

  var idle = {
    type: 'idle'
  };
  var state = idle;
  function clear() {
    if (state.type !== 'dragging') {
      return;
    }
    didDragStartLocally = false;
    state.cleanup();
    state = idle;
  }
  function bindEndEvents() {
    return bindAll(window, [{
      type: 'dragend',
      listener: clear
    }].concat(_toConsumableArray(getBindingsForBrokenDrags({
      onDragEnd: clear
    }))),
    // we want to make sure we get all the events,
    // and this helps avoid not seeing events when folks stop
    // them later on the event path
    {
      capture: true
    });
  }

  // we always keep this event listener active
  bind(window, {
    type: 'dragstart',
    listener: function listener() {
      // something bad has happened if this is true!
      if (state.type !== 'idle') {
        return;
      }
      // set our global flag
      didDragStartLocally = true;
      state = {
        type: 'dragging',
        cleanup: bindEndEvents()
      };
    },
    // binding in the capture phase so these listeners are called
    // before our listeners in the adapters `mount` function
    options: {
      capture: true
    }
  });
})();

/** Common event payload for all events */

/** A map containing payloads for all events */

/** Common event payload for all drop target events */

/** A map containing payloads for all events on drop targets */

/** Arguments given to all feedback functions (eg `canDrop()`) on a `dropTargetForExternal` */

/** Arguments given to all monitor feedback functions (eg `canMonitor()`) for a `monitorForExternal` */

/** Obtain an array of the dragged `File`s */
function getFiles(_ref2) {
  var source = _ref2.source;
  return source.items
  // unlike other media types, for files:
  // item.kind is 'file'
  // item.type is the type of file eg 'image/jpg'
  // for other media types, item.type is the mime format
  .filter(function (item) {
    return item.kind === 'file';
  }).map(function (item) {
    return item.getAsFile();
  }).filter(function (file) {
    return file != null;
  });
}

/* Get the plain text that a user is dragging */
function getText(_ref2) {
  var source = _ref2.source;
  return source.getStringData(textMediaType);
}

const FileDropzone = ({ children = undefined, gridProps = {}, onDrop = () => { }, placeholder = 'Drop files here or click to upload', }) => {
    const ref = useRef(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    useEffect(() => {
        const el = ref.current;
        invariant(el);
        return dropTargetForExternal({
            element: el,
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            //   canDrop: some(containsFiles, containsText),
            onDrop: ({ source }) => {
                const files = getFiles({ source });
                const text = getText({ source });
                console.log(files, text, 'dfposa');
                onDrop({ files, text });
            },
        });
    }, [onDrop]);
    // const isDark = (location + location) % 2 === 1;
    function getColor(isDraggedOver) {
        if (isDraggedOver) {
            return {
                backgroundColor: 'blue.400',
                _dark: {
                    backgroundColor: 'blue.400',
                },
            };
        }
        // return isDark ? "lightgrey" : "white";
        return {
            backgroundColor: undefined,
            _dark: {
                backgroundColor: undefined,
            },
        };
    }
    const fileInput = useRef(null);
    const handleClick = () => {
        fileInput.current?.click();
    };
    const handleChange = (event) => {
        // @ts-expect-error find appropriate types for event target files
        const filesArray = [...event.target.files];
        onDrop({ files: filesArray });
    };
    return (jsxs(Grid, { ...getColor(isDraggedOver), ref: ref, cursor: 'pointer', onClick: handleClick, borderStyle: 'dashed', borderColor: 'colorPalette.400', alignContent: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 4, minH: "120px", ...gridProps, children: [children, !!children === false && (jsxs(Fragment, { children: [jsx(Flex, { children: placeholder }), jsx(Input, { type: "file", multiple: true, style: { display: 'none' }, ref: fileInput, onChange: handleChange })] }))] }));
};

/**
 * Format bytes to human-readable string
 * @param bytes - The number of bytes to format
 * @returns Formatted string (e.g., "1.5 KB", "2.3 MB")
 */
function formatBytes(bytes) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

const MediaLibraryBrowser = ({ onFetchFiles, filterImageOnly = false, labels, enabled = true, multiple = false, onFileSelect, selectedFile: controlledSelectedFile, onSelectedFileChange, }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [internalSelectedFile, setInternalSelectedFile] = useState(multiple ? [] : undefined);
    const [failedImageIds, setFailedImageIds] = useState(new Set());
    // Use controlled or internal state for selectedFile
    const selectedFile = controlledSelectedFile ?? internalSelectedFile;
    const setSelectedFile = onSelectedFileChange ?? setInternalSelectedFile;
    const { data: filesData, isLoading, isError, } = useQuery({
        queryKey: ['file-picker-library', searchTerm],
        queryFn: async () => {
            if (!onFetchFiles)
                return { data: [] };
            const files = await onFetchFiles(searchTerm.trim() || '');
            return { data: files };
        },
        enabled: enabled && !!onFetchFiles,
    });
    const files = (filesData?.data || []);
    const filteredFiles = filterImageOnly
        ? files.filter((file) => /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(file.name))
        : files;
    const handleFileClick = (file) => {
        if (multiple) {
            const currentSelection = Array.isArray(selectedFile) ? selectedFile : [];
            const isAlreadySelected = currentSelection.some((f) => f.id === file.id);
            const newSelection = isAlreadySelected
                ? currentSelection.filter((f) => f.id !== file.id)
                : [...currentSelection, file];
            setSelectedFile(newSelection);
            if (onFileSelect) {
                onFileSelect(newSelection);
            }
        }
        else {
            const newFile = selectedFile === file ? undefined : file;
            setSelectedFile(newFile);
            if (onFileSelect && newFile) {
                onFileSelect(newFile);
            }
        }
    };
    const handleImageError = (fileId) => {
        setFailedImageIds((prev) => new Set(prev).add(fileId));
    };
    if (!onFetchFiles)
        return null;
    return (jsxs(VStack, { align: "stretch", gap: 4, children: [jsxs(Box, { position: "relative", children: [jsx(Input, { placeholder: labels?.searchPlaceholder ?? 'Search files...', value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), bg: "bg.panel", border: "1px solid", borderColor: "border.default", colorPalette: "blue", _focus: {
                            borderColor: 'colorPalette.500',
                            _dark: {
                                borderColor: 'colorPalette.400',
                            },
                            boxShadow: {
                                base: '0 0 0 1px var(--chakra-colors-blue-500)',
                                _dark: '0 0 0 1px var(--chakra-colors-blue-400)',
                            },
                        }, pl: 10 }), jsx(Icon, { as: LuSearch, position: "absolute", left: 3, top: "50%", transform: "translateY(-50%)", color: "fg.muted", boxSize: 4 })] }), isLoading && (jsxs(Box, { textAlign: "center", py: 8, children: [jsx(Spinner, { size: "lg", colorPalette: "blue" }), jsx(Text, { mt: 4, color: "fg.muted", children: labels?.loading ?? 'Loading files...' })] })), isError && (jsx(Box, { bg: { base: 'colorPalette.50', _dark: 'colorPalette.900/20' }, border: "1px solid", borderColor: {
                    base: 'colorPalette.200',
                    _dark: 'colorPalette.800',
                }, colorPalette: "red", borderRadius: "md", p: 4, children: jsx(Text, { color: {
                        base: 'colorPalette.600',
                        _dark: 'colorPalette.300',
                    }, children: labels?.loadingFailed ?? 'Failed to load files' }) })), !isLoading && !isError && (jsx(Box, { maxHeight: "400px", overflowY: "auto", children: filteredFiles.length === 0 ? (jsx(Box, { textAlign: "center", py: 8, children: jsx(Text, { color: "fg.muted", children: labels?.noFilesFound ?? 'No files found' }) })) : (jsx(VStack, { align: "stretch", gap: 2, children: filteredFiles.map((file) => {
                        const isImage = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(file.name);
                        const isSelected = multiple
                            ? Array.isArray(selectedFile) &&
                                selectedFile.some((f) => f.id === file.id)
                            : selectedFile?.id ===
                                file.id;
                        const imageFailed = failedImageIds.has(file.id);
                        return (jsx(Box, { p: 3, border: "2px solid", borderColor: isSelected
                                ? {
                                    base: 'colorPalette.500',
                                    _dark: 'colorPalette.400',
                                }
                                : 'border.default', borderRadius: "md", bg: isSelected
                                ? {
                                    base: 'colorPalette.50',
                                    _dark: 'colorPalette.900/20',
                                }
                                : 'bg.panel', colorPalette: "blue", cursor: "pointer", onClick: () => handleFileClick(file), _hover: {
                                borderColor: isSelected
                                    ? {
                                        base: 'colorPalette.600',
                                        _dark: 'colorPalette.400',
                                    }
                                    : {
                                        base: 'colorPalette.300',
                                        _dark: 'colorPalette.400',
                                    },
                                bg: isSelected
                                    ? {
                                        base: 'colorPalette.100',
                                        _dark: 'colorPalette.800/30',
                                    }
                                    : 'bg.muted',
                            }, transition: "all 0.2s", children: jsxs(HStack, { gap: 3, children: [jsx(Box, { width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", bg: "bg.muted", borderRadius: "md", flexShrink: 0, children: isImage && file.url && !imageFailed ? (jsx(Image, { src: file.url, alt: file.name, boxSize: "60px", objectFit: "cover", borderRadius: "md", onError: () => handleImageError(file.id) })) : isImage && (imageFailed || !file.url) ? (jsx(Icon, { as: LuImage, boxSize: 6, color: "fg.muted" })) : (jsx(Icon, { as: LuFile, boxSize: 6, color: "fg.muted" })) }), jsxs(VStack, { align: "start", flex: 1, gap: 1, children: [jsx(Text, { fontSize: "sm", fontWeight: "medium", color: "fg.default", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", children: file.name }), jsxs(HStack, { gap: 2, children: [file.size && (jsx(Fragment, { children: jsx(Text, { fontSize: "xs", color: "fg.muted", children: typeof file.size === 'number'
                                                                ? formatBytes(file.size)
                                                                : file.size }) })), file.comment && (jsxs(Fragment, { children: [file.size && (jsx(Text, { fontSize: "xs", color: "fg.muted", children: "\u2022" })), jsx(Text, { fontSize: "xs", color: "fg.muted", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", children: file.comment })] }))] })] }), isSelected && (jsx(Box, { width: "24px", height: "24px", borderRadius: "full", bg: {
                                            base: 'colorPalette.500',
                                            _dark: 'colorPalette.400',
                                        }, colorPalette: "blue", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, children: jsx(Text, { color: "white", fontSize: "xs", fontWeight: "bold", children: "\u2713" }) }))] }) }, file.id));
                    }) })) }))] }));
};

function MediaBrowserDialog({ open, onClose, onSelect, title, filterImageOnly = false, onFetchFiles, onUploadFile, enableUpload = false, labels, }) {
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [activeTab, setActiveTab] = useState('browse');
    const [uploadingFiles, setUploadingFiles] = useState(new Set());
    const [uploadErrors, setUploadErrors] = useState(new Map());
    const handleSelect = () => {
        if (selectedFile) {
            onSelect(selectedFile);
            onClose();
            setSelectedFile(undefined);
            setActiveTab('browse');
        }
    };
    const handleClose = () => {
        onClose();
        setSelectedFile(undefined);
        setActiveTab('browse');
        setUploadingFiles(new Set());
        setUploadErrors(new Map());
    };
    const handleFileUpload = async (files) => {
        if (!onUploadFile)
            return;
        for (const file of files) {
            const fileKey = `${file.name}-${file.size}`;
            setUploadingFiles((prev) => new Set(prev).add(fileKey));
            setUploadErrors((prev) => {
                const newMap = new Map(prev);
                newMap.delete(fileKey);
                return newMap;
            });
            try {
                const fileId = await onUploadFile(file);
                // Create a minimal FilePickerMediaFile object from the uploaded file
                const uploadedFile = {
                    id: fileId,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                };
                setSelectedFile(uploadedFile);
                setUploadingFiles((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(fileKey);
                    return newSet;
                });
                // Auto-select and close in single-select mode
                onSelect(uploadedFile);
                onClose();
                setSelectedFile(undefined);
                setActiveTab('browse');
            }
            catch (error) {
                setUploadingFiles((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(fileKey);
                    return newSet;
                });
                setUploadErrors((prev) => {
                    const newMap = new Map(prev);
                    newMap.set(fileKey, error instanceof Error ? error.message : 'Upload failed');
                    return newMap;
                });
            }
        }
    };
    const showTabs = enableUpload && !!onUploadFile && !!onFetchFiles;
    if (!onFetchFiles && !onUploadFile)
        return null;
    return (jsx(DialogRoot, { open: open, onOpenChange: (e) => !e.open && handleClose(), children: jsxs(DialogContent, { maxWidth: "800px", maxHeight: "90vh", children: [jsxs(DialogHeader, { children: [jsx(DialogTitle, { fontSize: "lg", fontWeight: "bold", children: title }), jsx(DialogCloseTrigger, {})] }), jsx(DialogBody, { children: showTabs ? (jsxs(Tabs.Root, { value: activeTab, onValueChange: (e) => setActiveTab(e.value ?? 'browse'), children: [jsxs(Tabs.List, { children: [jsx(Tabs.Trigger, { value: "browse", children: labels?.browseTab ?? 'Browse Library' }), jsx(Tabs.Trigger, { value: "upload", children: labels?.uploadTab ?? 'Upload Files' })] }), jsx(Tabs.Content, { value: "browse", children: onFetchFiles && (jsx(MediaLibraryBrowser, { onFetchFiles: onFetchFiles, filterImageOnly: filterImageOnly, labels: labels, enabled: open && activeTab === 'browse', selectedFile: selectedFile, onFileSelect: setSelectedFile })) }), jsx(Tabs.Content, { value: "upload", children: jsxs(VStack, { align: "stretch", gap: 4, children: [jsx(FileDropzone, { onDrop: ({ files }) => handleFileUpload(files), placeholder: labels?.fileDropzone ??
                                                'Drop files here or click to upload' }), uploadingFiles.size > 0 && (jsx(Box, { children: Array.from(uploadingFiles).map((fileKey) => (jsx(Box, { py: 2, children: jsxs(HStack, { gap: 2, children: [jsx(Spinner, { size: "sm", colorPalette: "blue" }), jsxs(Text, { fontSize: "sm", color: "fg.muted", children: [labels?.uploading ?? 'Uploading...', ' ', fileKey.split('-')[0]] })] }) }, fileKey))) })), uploadErrors.size > 0 && (jsx(VStack, { align: "stretch", gap: 2, children: Array.from(uploadErrors.entries()).map(([fileKey, error]) => (jsx(Box, { bg: {
                                                    base: 'colorPalette.50',
                                                    _dark: 'colorPalette.900/20',
                                                }, border: "1px solid", borderColor: {
                                                    base: 'colorPalette.200',
                                                    _dark: 'colorPalette.800',
                                                }, colorPalette: "red", borderRadius: "md", p: 3, children: jsxs(Text, { fontSize: "sm", color: {
                                                        base: 'colorPalette.600',
                                                        _dark: 'colorPalette.300',
                                                    }, children: [fileKey.split('-')[0], ":", ' ', labels?.uploadFailed ?? 'Upload failed', error && ` - ${error}`] }) }, fileKey))) }))] }) })] })) : onFetchFiles ? (jsx(MediaLibraryBrowser, { onFetchFiles: onFetchFiles, filterImageOnly: filterImageOnly, labels: labels, enabled: open, selectedFile: selectedFile, onFileSelect: setSelectedFile })) : null }), jsx(DialogFooter, { children: jsxs(HStack, { gap: 3, justify: "end", children: [jsx(Button$1, { variant: "outline", onClick: handleClose, borderColor: "border.default", bg: "bg.panel", _hover: { bg: 'bg.muted' }, children: labels?.cancel ?? 'Cancel' }), jsx(Button$1, { colorPalette: "blue", onClick: handleSelect, disabled: !selectedFile, children: labels?.select ?? 'Select' })] }) })] }) }));
}
const FilePicker = ({ column, schema, prefix }) => {
    const { setValue, formState: { errors }, watch, } = useFormContext();
    const { filePickerLabels } = useSchemaContext();
    const formI18n = useFormI18n(column, prefix, schema);
    const { required, gridColumn = 'span 12', gridRow = 'span 1', type, } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const isSingleSelect = type === 'string';
    const currentValue = watch(column) ?? (isSingleSelect ? '' : []);
    // Handle File objects only
    const currentFiles = isSingleSelect
        ? currentValue && currentValue instanceof File
            ? [currentValue]
            : []
        : Array.isArray(currentValue)
            ? currentValue.filter((f) => f instanceof File)
            : [];
    const colLabel = formI18n.colLabel;
    const [failedImageIds, setFailedImageIds] = useState(new Set());
    // FilePicker variant: Only handle File objects, no media library browser
    const handleImageError = (fileIdentifier) => {
        setFailedImageIds((prev) => new Set(prev).add(fileIdentifier));
    };
    const handleRemove = (index) => {
        if (isSingleSelect) {
            setValue(colLabel, '');
        }
        else {
            const newFiles = currentFiles.filter((_, i) => i !== index);
            setValue(colLabel, newFiles);
        }
    };
    const getFileIdentifier = (file, index) => {
        // file-picker: file is a File object, create identifier from name and size
        return `${file.name}-${file.size}-${index}`;
    };
    const getFileName = (file) => {
        return file.name;
    };
    const getFileSize = (file) => {
        return file.size;
    };
    const isImageFile = (file) => {
        return file.type.startsWith('image/');
    };
    const getImageUrl = (file) => {
        return URL.createObjectURL(file);
    };
    return (jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: errors[`${colLabel}`] ? formI18n.required() : undefined, invalid: !!errors[colLabel], children: [jsx(VStack, { align: "stretch", gap: 2, children: jsx(FileDropzone, { onDrop: ({ files }) => {
                        // file-picker variant: Store File objects directly (no ID conversion)
                        if (isSingleSelect) {
                            // In single-select mode, use the first file and replace any existing file
                            if (files.length > 0) {
                                setValue(colLabel, files[0]);
                            }
                        }
                        else {
                            // In multi-select mode, filter duplicates and append
                            const newFiles = files.filter(({ name }) => !currentFiles.some((cur) => cur.name === name));
                            setValue(colLabel, [...currentFiles, ...newFiles]);
                        }
                    }, placeholder: filePickerLabels?.fileDropzone ?? formI18n.t('fileDropzone') }) }), jsx(Flex, { flexFlow: 'column', gap: 1, children: currentFiles.map((file, index) => {
                    const fileIdentifier = getFileIdentifier(file, index);
                    const fileName = getFileName(file);
                    const fileSize = getFileSize(file);
                    const isImage = isImageFile(file);
                    const imageUrl = getImageUrl(file);
                    const imageFailed = failedImageIds.has(fileIdentifier);
                    // File Viewer
                    return (jsx(Card.Root, { variant: 'subtle', colorPalette: "blue", children: jsxs(Card.Body, { gap: "2", cursor: 'pointer', onClick: () => handleRemove(index), display: 'flex', flexFlow: 'row', alignItems: 'center', padding: '2', border: "2px solid", borderColor: "border.default", borderRadius: "md", _hover: {
                                borderColor: 'colorPalette.300',
                                bg: 'bg.muted',
                            }, transition: "all 0.2s", children: [jsx(Box, { width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", bg: "bg.muted", borderRadius: "md", flexShrink: 0, marginRight: "2", children: isImage && imageUrl && !imageFailed ? (jsx(Image, { src: imageUrl, alt: fileName, boxSize: "60px", objectFit: "cover", borderRadius: "md", onError: () => handleImageError(fileIdentifier) })) : isImage && (imageFailed || !imageUrl) ? (jsx(Icon, { as: LuImage, boxSize: 6, color: "fg.muted" })) : (jsx(Icon, { as: LuFile, boxSize: 6, color: "fg.muted" })) }), jsxs(VStack, { align: "start", flex: 1, gap: 1, children: [jsx(Text, { fontSize: "sm", fontWeight: "medium", color: "fg.default", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", children: fileName }), fileSize !== undefined && (jsx(Text, { fontSize: "xs", color: "fg.muted", children: formatBytes(fileSize) }))] }), jsx(Icon, { as: TiDeleteOutline, boxSize: 5, color: "fg.muted" })] }) }, fileIdentifier));
                }) })] }));
};

const FormMediaLibraryBrowser = ({ column, schema, prefix, }) => {
    const { setValue, formState: { errors }, watch, } = useFormContext();
    const { filePickerLabels } = useSchemaContext();
    const formI18n = useFormI18n(column, prefix, schema);
    const { required, gridColumn = 'span 12', gridRow = 'span 1', filePicker, type, } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const isSingleSelect = type === 'string';
    const currentValue = watch(column) ?? (isSingleSelect ? '' : []);
    // Handle string IDs only
    const currentFileIds = isSingleSelect
        ? currentValue
            ? [currentValue]
            : []
        : Array.isArray(currentValue)
            ? currentValue
            : [];
    const colLabel = formI18n.colLabel;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [failedImageIds, setFailedImageIds] = useState(new Set());
    // Map of file ID to FilePickerMediaFile for display
    const [fileMap, setFileMap] = useState(new Map());
    const { onFetchFiles, filterImageOnly = false, enableUpload = false, onUploadFile, } = filePicker || {};
    // Fetch file details for existing file IDs
    useEffect(() => {
        if (!onFetchFiles || currentFileIds.length === 0)
            return;
        const fetchFileDetails = async () => {
            setFileMap((prevMap) => {
                const filesToFetch = currentFileIds.filter((id) => !prevMap.has(id));
                if (filesToFetch.length === 0)
                    return prevMap;
                // Fetch all files and filter for the ones we need
                onFetchFiles('')
                    .then((allFiles) => {
                    setFileMap((currentMap) => {
                        const newFileMap = new Map(currentMap);
                        filesToFetch.forEach((id) => {
                            const file = allFiles.find((f) => f.id === id);
                            if (file) {
                                newFileMap.set(id, file);
                            }
                        });
                        return newFileMap;
                    });
                })
                    .catch((error) => {
                    console.error('Failed to fetch file details:', error);
                });
                return prevMap;
            });
        };
        fetchFileDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFileIds.join(','), onFetchFiles]);
    // Clean up fileMap when files are removed
    useEffect(() => {
        setFileMap((prevMap) => {
            const currentIds = new Set(currentFileIds);
            const newFileMap = new Map();
            prevMap.forEach((file, id) => {
                if (currentIds.has(id)) {
                    newFileMap.set(id, file);
                }
            });
            return newFileMap.size !== prevMap.size ? newFileMap : prevMap;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFileIds.join(',')]);
    if (!onFetchFiles) {
        return (jsx(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
            gridRow, errorText: errors[`${colLabel}`] ? formI18n.required() : undefined, invalid: !!errors[colLabel], children: jsx(Text, { color: "fg.muted", children: "Media library browser requires onFetchFiles" }) }));
    }
    const handleImageError = (fileIdentifier) => {
        setFailedImageIds((prev) => new Set(prev).add(fileIdentifier));
    };
    const handleMediaLibrarySelect = (file) => {
        // Store the file in the map for display
        setFileMap((prev) => new Map(prev).set(file.id, file));
        if (isSingleSelect) {
            setValue(colLabel, file.id);
        }
        else {
            const newFileIds = [...currentFileIds, file.id];
            setValue(colLabel, newFileIds);
        }
    };
    const handleRemove = (index) => {
        if (isSingleSelect) {
            setValue(colLabel, '');
        }
        else {
            const newFileIds = currentFileIds.filter((_, i) => i !== index);
            setValue(colLabel, newFileIds);
        }
    };
    return (jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: errors[`${colLabel}`] ? formI18n.required() : undefined, invalid: !!errors[colLabel], children: [jsx(VStack, { align: "stretch", gap: 2, children: jsx(Button$1, { variant: "outline", onClick: () => setDialogOpen(true), borderColor: "border.default", bg: "bg.panel", _hover: { bg: 'bg.muted' }, children: filePickerLabels?.browseLibrary ??
                        formI18n.t('browse_library') ??
                        'Browse from Library' }) }), jsx(MediaBrowserDialog, { open: dialogOpen, onClose: () => setDialogOpen(false), onSelect: handleMediaLibrarySelect, title: filePickerLabels?.dialogTitle ?? formI18n.label() ?? 'Select File', filterImageOnly: filterImageOnly, onFetchFiles: onFetchFiles, onUploadFile: onUploadFile, enableUpload: enableUpload, labels: filePickerLabels, colLabel: colLabel }), jsx(Flex, { flexFlow: 'column', gap: 1, children: currentFileIds.map((fileId, index) => {
                    const file = fileMap.get(fileId);
                    const isImage = file
                        ? /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(file.name)
                        : /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(fileId);
                    const imageFailed = failedImageIds.has(fileId);
                    const displayName = file?.name ?? fileId;
                    return (jsx(Card.Root, { variant: 'subtle', colorPalette: "blue", children: jsxs(Card.Body, { gap: "2", cursor: 'pointer', onClick: () => handleRemove(index), display: 'flex', flexFlow: 'row', alignItems: 'center', padding: '2', border: "2px solid", borderColor: "border.default", borderRadius: "md", _hover: {
                                borderColor: 'colorPalette.300',
                                bg: 'bg.muted',
                            }, transition: "all 0.2s", children: [jsx(Box, { width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", bg: "bg.muted", borderRadius: "md", flexShrink: 0, marginRight: "2", overflow: "hidden", children: isImage && file?.url && !imageFailed ? (jsx(Image, { src: file.url, alt: displayName, boxSize: "60px", objectFit: "cover", onError: () => handleImageError(fileId) })) : isImage && !imageFailed ? (jsx(Icon, { as: LuImage, boxSize: 6, color: "fg.muted" })) : (jsx(Icon, { as: LuFile, boxSize: 6, color: "fg.muted" })) }), jsxs(VStack, { align: "start", flex: 1, gap: 1, children: [jsx(Text, { fontSize: "sm", fontWeight: "medium", color: "fg.default", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", children: displayName }), file?.size && (jsx(Text, { fontSize: "xs", color: "fg.muted", children: typeof file.size === 'number'
                                                ? `${(file.size / 1024).toFixed(1)} KB`
                                                : file.size }))] }), jsx(Icon, { as: TiDeleteOutline, boxSize: 5, color: "fg.muted" })] }) }, `${fileId}-${index}`));
                }) })] }));
};

// Default renderDisplay function that stringifies JSON
const defaultRenderDisplay = (item) => {
    return JSON.stringify(item);
};

const useIdPickerData = ({ column, schema, prefix, isMultiple, }) => {
    const { watch, getValues, formState: { errors }, setValue, } = useFormContext();
    const { idMap, setIdMap, idPickerLabels, insideDialog } = useSchemaContext();
    const { renderDisplay, loadInitialValues, foreign_key, variant } = schema;
    // loadInitialValues must be provided in schema for id-picker fields
    // It's used to load the record of the id so the display is human-readable
    if (variant === 'id-picker' && !loadInitialValues) {
        throw new Error(`loadInitialValues is required in schema for IdPicker field '${column}'. Please provide loadInitialValues function in the schema to load records for human-readable display.`);
    }
    const { table, column: column_ref, customQueryFn, } = foreign_key;
    const [searchText, setSearchText] = useState('');
    const [debouncedSearchText, setDebouncedSearchText] = useState('');
    const [limit] = useState(50); // Increased limit for combobox
    // Get colLabel from schema context (we'll compute it here)
    const colLabel = `${prefix}${column}`;
    const watchedValue = watch(colLabel);
    const watchId = !isMultiple ? watchedValue : undefined;
    const watchIds = isMultiple
        ? (Array.isArray(watchedValue) ? watchedValue : [])
        : [];
    // Get initial values immediately to ensure query can trigger on mount
    const initialValue = getValues(colLabel);
    const initialId = !isMultiple ? initialValue : undefined;
    const initialIds = isMultiple
        ? (Array.isArray(initialValue) ? initialValue : [])
        : [];
    // Use watched values if they exist (including empty string for single select),
    // otherwise fall back to initial values from getValues()
    const currentId = watchId !== undefined && watchId !== null ? watchId : initialId;
    const currentIds = watchedValue !== undefined && watchedValue !== null && isMultiple
        ? watchIds
        : initialIds;
    // Current value for combobox (array format)
    const currentValue = isMultiple
        ? currentIds.filter((id) => id != null && id !== '')
        : currentId
            ? [currentId]
            : [];
    // Debounce search text to avoid too many API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchText(searchText);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchText]);
    // Find IDs that are in currentValue but missing from idMap
    const missingIds = useMemo(() => {
        return currentValue.filter((id) => !idMap[id]);
    }, [currentValue, idMap]);
    // Stable key for query based on sorted missing IDs
    const missingIdsKey = useMemo(() => {
        return JSON.stringify([...missingIds].sort());
    }, [missingIds]);
    // Include idMap state in query key to force refetch when idMap is reset (e.g., on remount from another page)
    // This ensures the query runs even if React Query has cached data for the same missing IDs
    const idMapStateKey = useMemo(() => {
        // Create a key based on whether the required IDs are in idMap
        const hasRequiredIds = currentValue.every((id) => idMap[id]);
        return hasRequiredIds ? 'complete' : 'incomplete';
    }, [currentValue, idMap]);
    // Query to fetch initial values that are missing from idMap
    // This query runs automatically when missingIds.length > 0 and updates idMap
    const initialValuesQuery = useQuery({
        queryKey: [`idpicker-initial`, column, missingIdsKey, idMapStateKey],
        queryFn: async () => {
            if (missingIds.length === 0) {
                return { data: [], count: 0 };
            }
            // Use schema's loadInitialValues (required for id-picker)
            if (!loadInitialValues) {
                console.warn(`loadInitialValues is required in schema for IdPicker field '${column}'. Returning empty idMap.`);
                return { data: [], count: 0 };
            }
            const result = await loadInitialValues({
                ids: missingIds,
                foreign_key: foreign_key,
                setIdMap,
            });
            return result.data;
        },
        enabled: missingIds.length > 0, // Only fetch if there are missing IDs
        staleTime: 0, // Always consider data stale to refetch on remount
        refetchOnMount: true, // Always refetch when component remounts (e.g., from another page)
        refetchOnWindowFocus: false, // Don't refetch on window focus
    });
    const { isLoading: isLoadingInitialValues, isFetching: isFetchingInitialValues, } = initialValuesQuery;
    // Query for search results (async loading)
    const query = useQuery({
        queryKey: [`idpicker`, { column, searchText: debouncedSearchText, limit }],
        queryFn: async () => {
            // customQueryFn is required when serverUrl is not available
            if (!customQueryFn) {
                throw new Error(`customQueryFn is required in foreign_key for table ${table}. serverUrl has been removed.`);
            }
            const { data, idMap } = await customQueryFn({
                searching: debouncedSearchText ?? '',
                limit: limit,
                offset: 0,
            });
            // Update idMap with returned values
            if (idMap && Object.keys(idMap).length > 0) {
                setIdMap((state) => {
                    return { ...state, ...idMap };
                });
            }
            return data;
        },
        enabled: true, // Always enabled for combobox
        staleTime: 300000,
    });
    const { isLoading, isFetching, data, isPending, isError } = query;
    const dataList = data?.data ?? [];
    // Check if we're currently searching (user typed but debounce hasn't fired yet)
    const isSearching = searchText !== debouncedSearchText;
    // Extract items from idMap for currentValue IDs
    // Use useMemo with a stable dependency to minimize recalculations
    const currentValueKey = useMemo(() => JSON.stringify([...currentValue].sort()), [currentValue]);
    // Serialize the relevant part of idMap to detect when items we care about change
    const idMapKey = useMemo(() => {
        const relevantItems = currentValue
            .map((id) => {
            const item = idMap[id];
            return item ? JSON.stringify({ id, hasItem: true }) : null;
        })
            .filter(Boolean)
            .sort()
            .join('|');
        return relevantItems;
    }, [currentValue, idMap]);
    const idMapItems = useMemo(() => {
        return currentValue
            .map((id) => idMap[id])
            .filter((item) => item !== undefined);
        // Depend on idMapKey which only changes when items we care about change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentValueKey, idMapKey]);
    // Transform data for combobox collection
    // label is used for filtering/searching (must be a string)
    // raw item is stored for custom rendering
    // Also include items from idMap that match currentValue (for initial values display)
    const comboboxItems = useMemo(() => {
        const renderFn = renderDisplay || defaultRenderDisplay;
        const itemsFromDataList = dataList.map((item) => {
            const rendered = renderFn(item);
            return {
                label: typeof rendered === 'string' ? rendered : JSON.stringify(item), // Use string for filtering
                value: String(item[column_ref]),
                raw: item,
            };
        });
        // Add items from idMap that match currentValue but aren't in dataList
        // This ensures initial values are displayed correctly in the combobox
        const itemsFromIdMap = idMapItems
            .map((item) => {
            // Check if this item is already in itemsFromDataList
            const alreadyIncluded = itemsFromDataList.some((i) => i.value === String(item[column_ref]));
            if (alreadyIncluded)
                return null;
            const rendered = renderFn(item);
            return {
                label: typeof rendered === 'string' ? rendered : JSON.stringify(item),
                value: String(item[column_ref]),
                raw: item,
            };
        })
            .filter((item) => item !== null);
        return [...itemsFromIdMap, ...itemsFromDataList];
    }, [dataList, column_ref, renderDisplay, idMapItems]);
    // Use filter hook for combobox
    const { contains } = useFilter({ sensitivity: 'base' });
    // Create collection for combobox
    const { collection, filter, set } = useListCollection({
        initialItems: comboboxItems,
        itemToString: (item) => item.label,
        itemToValue: (item) => item.value,
        filter: contains,
    });
    // Track previous comboboxItems to avoid unnecessary updates
    const prevComboboxItemsRef = useRef('');
    const prevSearchTextRef = useRef('');
    // Update collection and filter when data changes
    // This includes both search results and initial values from idMap
    useEffect(() => {
        // Create a stable string representation to compare (only value and label, not raw)
        const currentItemsKey = JSON.stringify(comboboxItems.map((item) => ({ value: item.value, label: item.label })));
        const itemsChanged = prevComboboxItemsRef.current !== currentItemsKey;
        const searchChanged = prevSearchTextRef.current !== searchText;
        // Only update if items or search actually changed
        if (!itemsChanged && !searchChanged) {
            return;
        }
        if (comboboxItems.length > 0 && itemsChanged) {
            set(comboboxItems);
            prevComboboxItemsRef.current = currentItemsKey;
        }
        // Apply filter to the collection using the immediate searchText for UI responsiveness
        if (searchChanged) {
            if (searchText) {
                filter(searchText);
            }
            prevSearchTextRef.current = searchText;
        }
        // set and filter are stable functions from useListCollection
        // comboboxItems and searchText are the only dependencies we care about
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comboboxItems, searchText]);
    return {
        colLabel,
        currentValue,
        searchText,
        setSearchText,
        debouncedSearchText,
        isLoading,
        isFetching,
        isPending,
        isError,
        isSearching,
        isLoadingInitialValues,
        isFetchingInitialValues,
        missingIds,
        comboboxItems,
        collection,
        filter,
        set,
        idMap,
        idPickerLabels,
        insideDialog: insideDialog ?? false,
        renderDisplay,
        loadInitialValues: loadInitialValues, // Required for id-picker, checked above
        column_ref,
        errors,
        setValue,
    };
};

const IdPickerSingle = ({ column, schema, prefix, }) => {
    const formI18n = useFormI18n(column, prefix, schema);
    const { required, gridColumn = 'span 12', gridRow = 'span 1', renderDisplay, } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const { colLabel, currentValue, searchText, setSearchText, isLoading, isFetching, isPending, isError, isSearching, isLoadingInitialValues, isFetchingInitialValues, missingIds, collection, idMap, idPickerLabels, insideDialog, renderDisplay: renderDisplayFn, errors, setValue, } = useIdPickerData({
        column,
        schema,
        prefix,
        isMultiple: false,
    });
    const handleInputValueChange = (details) => {
        setSearchText(details.inputValue);
    };
    const handleValueChange = (details) => {
        setValue(colLabel, details.value[0] || '');
    };
    const renderDisplayFunction = renderDisplayFn || renderDisplay || defaultRenderDisplay;
    return (jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: errors[`${colLabel}`] ? formI18n.required() : undefined, invalid: !!errors[colLabel], children: [currentValue.length > 0 && (jsx(Flex, { mb: 2, children: (() => {
                    const id = currentValue[0];
                    const item = idMap[id];
                    // Show loading skeleton while fetching initial values
                    if (item === undefined &&
                        (isLoadingInitialValues || isFetchingInitialValues) &&
                        missingIds.includes(id)) {
                        return jsx(Skeleton, { height: "24px", width: "100px", borderRadius: "md" });
                    }
                    // Only show "not found" if we're not loading and item is still missing
                    if (item === undefined) {
                        return (jsx(Text, { fontSize: "sm", children: idPickerLabels?.undefined ?? 'Undefined' }));
                    }
                    return jsx(Text, { fontSize: "sm", children: renderDisplayFunction(item) });
                })() })), jsxs(Combobox.Root, { collection: collection, value: currentValue, onValueChange: handleValueChange, onInputValueChange: handleInputValueChange, multiple: false, closeOnSelect: true, openOnClick: true, invalid: !!errors[colLabel], width: "100%", positioning: insideDialog
                    ? { strategy: 'fixed', hideWhenDetached: true }
                    : undefined, children: [jsxs(Combobox.Control, { children: [jsx(Combobox.Input, { placeholder: idPickerLabels?.typeToSearch ?? 'Type to search' }), jsxs(Combobox.IndicatorGroup, { children: [(isFetching || isLoading || isPending) && jsx(Spinner, { size: "xs" }), isError && (jsx(Icon, { color: "fg.error", children: jsx(BiError, {}) })), currentValue.length > 0 && (jsx(Combobox.ClearTrigger, { onClick: () => {
                                            setValue(colLabel, '');
                                        } })), jsx(Combobox.Trigger, {})] })] }), insideDialog ? (jsx(Combobox.Positioner, { children: jsx(Combobox.Content, { children: isError ? (jsx(Text, { p: 2, color: "fg.error", fontSize: "sm", children: idPickerLabels?.emptySearchResult ?? 'Loading failed' })) : isFetching || isLoading || isPending || isSearching ? (
                            // Show skeleton items to prevent UI shift
                            jsx(Fragment, { children: Array.from({ length: 5 }).map((_, index) => (jsx(Flex, { p: 2, align: "center", gap: 2, children: jsx(Skeleton, { height: "20px", flex: "1" }) }, `skeleton-${index}`))) })) : collection.items.length === 0 ? (jsx(Combobox.Empty, { children: searchText
                                    ? idPickerLabels?.emptySearchResult ?? 'No results found'
                                    : idPickerLabels?.initialResults ??
                                        'Start typing to search' })) : (jsx(Fragment, { children: collection.items.map((item, index) => (jsxs(Combobox.Item, { item: item, children: [jsx(Combobox.ItemText, { children: !!renderDisplayFunction === true
                                                ? renderDisplayFunction(item.raw)
                                                : item.label }), jsx(Combobox.ItemIndicator, {})] }, item.value ?? `item-${index}`))) })) }) })) : (jsx(Portal, { children: jsx(Combobox.Positioner, { children: jsx(Combobox.Content, { children: isError ? (jsx(Text, { p: 2, color: "fg.error", fontSize: "sm", children: idPickerLabels?.emptySearchResult ?? 'Loading failed' })) : isFetching || isLoading || isPending || isSearching ? (
                                // Show skeleton items to prevent UI shift
                                jsx(Fragment, { children: Array.from({ length: 5 }).map((_, index) => (jsx(Flex, { p: 2, align: "center", gap: 2, children: jsx(Skeleton, { height: "20px", flex: "1" }) }, `skeleton-${index}`))) })) : collection.items.length === 0 ? (jsx(Combobox.Empty, { children: searchText
                                        ? idPickerLabels?.emptySearchResult ?? 'No results found'
                                        : idPickerLabels?.initialResults ??
                                            'Start typing to search' })) : (jsx(Fragment, { children: collection.items.map((item, index) => (jsxs(Combobox.Item, { item: item, children: [jsx(Combobox.ItemText, { children: !!renderDisplayFunction === true
                                                    ? renderDisplayFunction(item.raw)
                                                    : item.label }), jsx(Combobox.ItemIndicator, {})] }, item.value ?? `item-${index}`))) })) }) }) }))] })] }));
};

const IdPickerMultiple = ({ column, schema, prefix, }) => {
    const formI18n = useFormI18n(column, prefix, schema);
    const { required, gridColumn = 'span 12', gridRow = 'span 1', renderDisplay, } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const { colLabel, currentValue, searchText, setSearchText, isLoading, isFetching, isPending, isError, isSearching, isLoadingInitialValues, isFetchingInitialValues, missingIds, collection, idMap, idPickerLabels, insideDialog, renderDisplay: renderDisplayFn, errors, setValue, } = useIdPickerData({
        column,
        schema,
        prefix,
        isMultiple: true,
    });
    const handleInputValueChange = (details) => {
        setSearchText(details.inputValue);
    };
    const handleValueChange = (details) => {
        setValue(colLabel, details.value);
    };
    const renderDisplayFunction = renderDisplayFn || renderDisplay || defaultRenderDisplay;
    return (jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: errors[`${colLabel}`] ? formI18n.required() : undefined, invalid: !!errors[colLabel], children: [currentValue.length > 0 && (jsx(Flex, { flexFlow: 'wrap', gap: 1, mb: 2, children: currentValue.map((id) => {
                    const item = idMap[id];
                    // Show loading skeleton while fetching initial values
                    if (item === undefined &&
                        (isLoadingInitialValues || isFetchingInitialValues) &&
                        missingIds.includes(id)) {
                        return (jsx(Skeleton, { height: "24px", width: "100px", borderRadius: "md" }, id));
                    }
                    // Only show "not found" if we're not loading and item is still missing
                    if (item === undefined) {
                        return (jsx(Text, { fontSize: "sm", children: idPickerLabels?.undefined ?? 'Undefined' }, id));
                    }
                    return (jsx(Tag, { closable: true, onClick: () => {
                            const newValue = currentValue.filter((itemId) => itemId !== id);
                            setValue(colLabel, newValue);
                        }, children: renderDisplayFunction(item) }, id));
                }) })), jsxs(Combobox.Root, { collection: collection, value: currentValue, onValueChange: handleValueChange, onInputValueChange: handleInputValueChange, multiple: true, closeOnSelect: false, openOnClick: true, invalid: !!errors[colLabel], width: "100%", positioning: insideDialog
                    ? { strategy: 'fixed', hideWhenDetached: true }
                    : undefined, children: [jsxs(Combobox.Control, { children: [jsx(Combobox.Input, { placeholder: idPickerLabels?.typeToSearch ?? 'Type to search' }), jsxs(Combobox.IndicatorGroup, { children: [(isFetching || isLoading || isPending) && jsx(Spinner, { size: "xs" }), isError && (jsx(Icon, { color: "fg.error", children: jsx(BiError, {}) })), jsx(Combobox.Trigger, {})] })] }), insideDialog ? (jsx(Combobox.Positioner, { children: jsx(Combobox.Content, { children: isError ? (jsx(Text, { p: 2, color: "fg.error", fontSize: "sm", children: idPickerLabels?.emptySearchResult ?? 'Loading failed' })) : isFetching || isLoading || isPending || isSearching ? (
                            // Show skeleton items to prevent UI shift
                            jsx(Fragment, { children: Array.from({ length: 5 }).map((_, index) => (jsx(Flex, { p: 2, align: "center", gap: 2, children: jsx(Skeleton, { height: "20px", flex: "1" }) }, `skeleton-${index}`))) })) : collection.items.length === 0 ? (jsx(Combobox.Empty, { children: searchText
                                    ? idPickerLabels?.emptySearchResult ?? 'No results found'
                                    : idPickerLabels?.initialResults ??
                                        'Start typing to search' })) : (jsx(Fragment, { children: collection.items.map((item, index) => (jsxs(Combobox.Item, { item: item, children: [jsx(Combobox.ItemText, { children: !!renderDisplayFunction === true
                                                ? renderDisplayFunction(item.raw)
                                                : item.label }), jsx(Combobox.ItemIndicator, {})] }, item.value ?? `item-${index}`))) })) }) })) : (jsx(Portal, { children: jsx(Combobox.Positioner, { children: jsx(Combobox.Content, { children: isError ? (jsx(Text, { p: 2, color: "fg.error", fontSize: "sm", children: idPickerLabels?.emptySearchResult ?? 'Loading failed' })) : isFetching || isLoading || isPending || isSearching ? (
                                // Show skeleton items to prevent UI shift
                                jsx(Fragment, { children: Array.from({ length: 5 }).map((_, index) => (jsx(Flex, { p: 2, align: "center", gap: 2, children: jsx(Skeleton, { height: "20px", flex: "1" }) }, `skeleton-${index}`))) })) : collection.items.length === 0 ? (jsx(Combobox.Empty, { children: searchText
                                        ? idPickerLabels?.emptySearchResult ?? 'No results found'
                                        : idPickerLabels?.initialResults ??
                                            'Start typing to search' })) : (jsx(Fragment, { children: collection.items.map((item, index) => (jsxs(Combobox.Item, { item: item, children: [jsx(Combobox.ItemText, { children: !!renderDisplayFunction === true
                                                    ? renderDisplayFunction(item.raw)
                                                    : item.label }), jsx(Combobox.ItemIndicator, {})] }, item.value ?? `item-${index}`))) })) }) }) }))] })] }));
};

const NumberInputRoot = React.forwardRef(function NumberInput$1(props, ref) {
    const { children, ...rest } = props;
    return (jsx(NumberInput.Root, { ref: ref, variant: "outline", ...rest, children: children }));
});
const NumberInputField$1 = NumberInput.Input;
NumberInput.Scrubber;
NumberInput.Label;

/**
 * Gets the error message for a specific field from react-hook-form errors
 * Prioritizes required errors (#.required) over field-specific validation errors
 */
const getFieldError = (errors, fieldName) => {
    // Check for form-level required errors first (highest priority)
    const requiredError = errors['#.required'];
    if (requiredError) {
        const requiredErrorMessage = extractErrorMessage(requiredError);
        if (requiredErrorMessage) {
            return requiredErrorMessage;
        }
    }
    // If no required errors, return field-specific error
    const fieldError = errors[fieldName];
    if (fieldError) {
        const fieldErrorMessage = extractErrorMessage(fieldError);
        if (fieldErrorMessage) {
            return fieldErrorMessage;
        }
    }
    return undefined;
};
/**
 * Helper function to extract error message from various error formats
 * Only returns message if explicitly provided, no fallback text
 */
const extractErrorMessage = (error) => {
    if (!error) {
        return undefined;
    }
    // If it's a simple string error
    if (typeof error === 'string') {
        return error;
    }
    // If it's an error object with a message property
    if (error && typeof error === 'object' && 'message' in error) {
        return error.message;
    }
    // If it's an array of errors, get the first one
    if (Array.isArray(error) && error.length > 0) {
        const firstError = error[0];
        if (typeof firstError === 'string') {
            return firstError;
        }
        if (firstError &&
            typeof firstError === 'object' &&
            'message' in firstError) {
            return firstError.message;
        }
    }
    // No fallback - return undefined if no message provided
    return undefined;
};

const NumberInputField = ({ schema, column, prefix, }) => {
    const { setValue, formState: { errors }, watch, } = useFormContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1', numberStorageType = 'number', } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const value = watch(`${colLabel}`);
    const fieldError = getFieldError(errors, colLabel);
    const formI18n = useFormI18n(column, prefix, schema);
    return (jsx(Field, { label: formI18n.label(), required: isRequired, gridColumn, gridRow, errorText: fieldError
            ? fieldError.includes('required')
                ? formI18n.required()
                : fieldError
            : undefined, invalid: !!fieldError, children: jsx(NumberInputRoot, { value: value, onValueChange: (details) => {
                // Store as string or number based on configuration, default to number
                const value = numberStorageType === 'string'
                    ? details.value
                    : details.valueAsNumber;
                setValue(`${colLabel}`, value);
            }, min: schema.minimum, max: schema.maximum, step: schema.multipleOf || 0.01, allowOverflow: false, clampValueOnBlur: false, inputMode: "decimal", formatOptions: schema.formatOptions, children: jsx(NumberInputField$1, { required: isRequired }) }) }));
};

const ObjectInput = ({ schema, column, prefix }) => {
    const { properties, gridColumn = 'span 12', gridRow = 'span 1', required, showLabel = true, } = schema;
    const colLabel = `${prefix}${column}`;
    const isRequired = required?.some((columnId) => columnId === column);
    const formI18n = useFormI18n(column, prefix, schema);
    const { formState: { errors }, } = useFormContext();
    if (properties === undefined) {
        throw new Error(`properties is undefined when using ObjectInput`);
    }
    return (jsxs(Box, { gridRow, gridColumn, children: [showLabel && (jsxs(Box, { as: "label", children: [formI18n.label(), isRequired && jsx("span", { children: "*" })] })), jsx(Grid, { bgColor: { base: 'colorPalette.100', _dark: 'colorPalette.900' }, p: 2, borderRadius: 4, borderWidth: 1, borderColor: {
                    base: 'colorPalette.200',
                    _dark: 'colorPalette.800',
                }, gap: "4", padding: '4', gridTemplateColumns: 'repeat(12, 1fr)', autoFlow: 'row', children: Object.keys(properties ?? {}).map((key) => {
                    return (
                    // @ts-expect-error find suitable types
                    jsx(ColumnRenderer, { column: `${key}`,
                        prefix: `${prefix}${column}.`,
                        properties,
                        parentRequired: required }, `form-${colLabel}-${key}`));
                }) }), errors[`${column}`] && (jsx(Text, { color: 'red.400', children: formI18n.required() }))] }));
};

const RecordInput = ({ column, schema, prefix }) => {
    const { formState: { errors }, setValue, getValues, } = useFormContext();
    const { formButtonLabels } = useSchemaContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const entries = Object.entries(getValues(column) ?? {});
    const [showNewEntries, setShowNewEntries] = useState(false);
    const [newKey, setNewKey] = useState();
    const [newValue, setNewValue] = useState();
    const formI18n = useFormI18n(column, prefix, schema);
    return (jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn, gridRow, errorText: errors[`${column}`] ? formI18n.required() : undefined, invalid: !!errors[column], children: [entries.map(([key, value]) => {
                return (jsxs(Grid, { templateColumns: '1fr 1fr auto', gap: 1, children: [jsx(Input, { value: key, onChange: (e) => {
                                const filtered = entries.filter(([target]) => {
                                    return target !== key;
                                });
                                setValue(column, Object.fromEntries([...filtered, [e.target.value, value]]));
                            }, autoComplete: "off" }), jsx(Input, { value: value, onChange: (e) => {
                                setValue(column, {
                                    ...getValues(column),
                                    [key]: e.target.value,
                                });
                            }, autoComplete: "off" }), jsx(IconButton, { variant: 'ghost', onClick: () => {
                                const filtered = entries.filter(([target]) => {
                                    return target !== key;
                                });
                                setValue(column, Object.fromEntries([...filtered]));
                            }, children: jsx(CgClose, {}) })] }));
            }), jsx(Show, { when: showNewEntries, children: jsxs(Card.Root, { children: [jsx(Card.Body, { gap: "2", children: jsxs(Grid, { templateColumns: '1fr 1fr auto', gap: 1, children: [jsx(Input, { value: newKey, onChange: (e) => {
                                            setNewKey(e.target.value);
                                        }, autoComplete: "off" }), jsx(Input, { value: newValue, onChange: (e) => {
                                            setNewValue(e.target.value);
                                        }, autoComplete: "off" })] }) }), jsxs(Card.Footer, { justifyContent: "flex-end", children: [jsx(IconButton, { variant: 'subtle', onClick: () => {
                                        setShowNewEntries(false);
                                        setNewKey(undefined);
                                        setNewValue(undefined);
                                    }, children: jsx(CgClose, {}) }), jsx(Button, { onClick: () => {
                                        if (!!newKey === false) {
                                            setShowNewEntries(false);
                                            setNewKey(undefined);
                                            setNewValue(undefined);
                                            return;
                                        }
                                        setValue(column, Object.fromEntries([...entries, [newKey, newValue]]));
                                        setShowNewEntries(false);
                                        setNewKey(undefined);
                                        setNewValue(undefined);
                                    }, children: formButtonLabels?.save ?? 'Save' })] })] }) }), jsx(Button, { onClick: () => {
                    setShowNewEntries(true);
                    setNewKey(undefined);
                    setNewValue(undefined);
                }, children: formButtonLabels?.addNew ?? 'Add New' })] }));
};

const StringInputField = ({ column, schema, prefix, }) => {
    const { register, formState: { errors }, } = useFormContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const fieldError = getFieldError(errors, colLabel);
    const formI18n = useFormI18n(column, prefix, schema);
    return (jsx(Fragment, { children: jsx(Field, { label: formI18n.label(), required: isRequired, gridColumn: gridColumn, gridRow: gridRow, errorText: fieldError, invalid: !!fieldError, children: jsx(Input, { ...register(`${colLabel}`, { required: isRequired }), autoComplete: "off" }) }) }));
};

const RadioCardItem = React.forwardRef(function RadioCardItem(props, ref) {
    const { inputProps, label, description, addon, icon, indicator = jsx(RadioCard.ItemIndicator, {}), indicatorPlacement = "end", ...rest } = props;
    const hasContent = label || description || icon;
    const ContentWrapper = indicator ? RadioCard.ItemContent : React.Fragment;
    return (jsxs(RadioCard.Item, { ...rest, children: [jsx(RadioCard.ItemHiddenInput, { ref: ref, ...inputProps }), jsxs(RadioCard.ItemControl, { children: [indicatorPlacement === "start" && indicator, hasContent && (jsxs(ContentWrapper, { children: [icon, label && jsx(RadioCard.ItemText, { children: label }), description && (jsx(RadioCard.ItemDescription, { children: description })), indicatorPlacement === "inside" && indicator] })), indicatorPlacement === "end" && indicator] }), addon && jsx(RadioCard.ItemAddon, { children: addon })] }));
});
const RadioCardRoot = RadioCard.Root;
RadioCard.Label;
RadioCard.ItemIndicator;

const TagPicker = ({ column, schema, prefix }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
    if (schema.properties == undefined) {
        throw new Error('schema properties undefined when using DatePicker');
    }
    const { gridColumn, gridRow, in_table, object_id_column, tagPicker } = schema;
    if (in_table === undefined) {
        throw new Error('in_table is undefined when using TagPicker');
    }
    if (object_id_column === undefined) {
        throw new Error('object_id_column is undefined when using TagPicker');
    }
    if (!tagPicker?.queryFn) {
        throw new Error('tagPicker.queryFn is required in schema. serverUrl has been removed.');
    }
    const query = useQuery({
        queryKey: [`tagpicker`, in_table],
        queryFn: async () => {
            const result = await tagPicker.queryFn({
                in_table: 'tables_tags_view',
                where: [
                    {
                        id: 'table_name',
                        value: [in_table],
                    },
                ],
                limit: 100,
                offset: 0,
                searching: '',
            });
            return result.data || { data: [] };
        },
        staleTime: 10000,
    });
    const object_id = watch(object_id_column);
    const existingTagsQuery = useQuery({
        queryKey: [`existing`, { in_table, object_id_column }, object_id],
        queryFn: async () => {
            const result = await tagPicker.queryFn({
                in_table: in_table,
                where: [
                    {
                        id: object_id_column,
                        value: [object_id[0]],
                    },
                ],
                limit: 100,
                offset: 0,
                searching: '',
            });
            return result.data || { data: [] };
        },
        enabled: object_id != undefined,
        staleTime: 10000,
    });
    const { isLoading, isFetching, data, isPending, isError } = query;
    const dataList = data?.data ?? [];
    const existingTagList = existingTagsQuery.data?.data ?? [];
    if (!!object_id === false) {
        return jsx(Fragment, {});
    }
    return (jsxs(Flex, { flexFlow: 'column', gap: 4, gridColumn,
        gridRow, children: [isFetching && jsx(Fragment, { children: "isFetching" }), isLoading && jsx(Fragment, { children: "isLoading" }), isPending && jsx(Fragment, { children: "isPending" }), isError && jsx(Fragment, { children: "isError" }), dataList.map(({ parent_tag_name, all_tags, is_mutually_exclusive }) => {
                return (jsxs(Flex, { flexFlow: 'column', gap: 2, children: [jsx(Text, { children: parent_tag_name }), is_mutually_exclusive && (jsx(RadioCardRoot, { defaultValue: "next", variant: 'surface', onValueChange: (tagIds) => {
                                const existedTags = Object.values(all_tags)
                                    .filter(({ id }) => {
                                    return existingTagList.some(({ tag_id }) => tag_id === id);
                                })
                                    .map(({ id }) => {
                                    return id;
                                });
                                setValue(`${column}.${parent_tag_name}.current`, [
                                    tagIds.value,
                                ]);
                                setValue(`${column}.${parent_tag_name}.old`, existedTags);
                            }, children: jsx(Flex, { flexFlow: 'wrap', gap: 2, children: Object.entries(all_tags).map(([tagName, { id }]) => {
                                    if (existingTagList.some(({ tag_id }) => tag_id === id)) {
                                        return (jsx(RadioCardItem, { label: tagName, value: id, flex: '0 0 0%', disabled: true }, `${tagName}-${id}`));
                                    }
                                    return (jsx(RadioCardItem, { label: tagName, value: id, flex: '0 0 0%', colorPalette: 'blue' }, `${tagName}-${id}`));
                                }) }) })), !is_mutually_exclusive && (jsx(CheckboxGroup, { onValueChange: (tagIds) => {
                                setValue(`${column}.${parent_tag_name}.current`, tagIds);
                            }, children: jsx(Flex, { flexFlow: 'wrap', gap: 2, children: Object.entries(all_tags).map(([tagName, { id }]) => {
                                    if (existingTagList.some(({ tag_id }) => tag_id === id)) {
                                        return (jsx(CheckboxCard, { label: tagName, value: id, flex: '0 0 0%', disabled: true, colorPalette: 'blue' }, `${tagName}-${id}`));
                                    }
                                    return (jsx(CheckboxCard, { label: tagName, value: id, flex: '0 0 0%' }, `${tagName}-${id}`));
                                }) }) }))] }, `tag-${parent_tag_name}`));
            }), errors[`${column}`] && (jsx(Text, { color: 'red.400', children: (errors[`${column}`]?.message ?? 'No error message') }))] }));
};

const Textarea = forwardRef(({ value, defaultValue, placeholder, onChange, onFocus, onBlur, disabled = false, readOnly = false, className, rows = 4, maxLength, autoFocus = false, invalid = false, required = false, label, helperText, errorText, ...props }, ref) => {
    const contentEditableRef = useRef(null);
    const isControlled = value !== undefined;
    // Handle input changes
    const handleInput = (e) => {
        const text = e.currentTarget.textContent || "";
        // Check maxLength if specified
        if (maxLength && text.length > maxLength) {
            e.currentTarget.textContent = text.slice(0, maxLength);
            // Move cursor to end
            const selection = window.getSelection();
            if (selection) {
                selection.selectAllChildren(e.currentTarget);
                selection.collapseToEnd();
            }
            return;
        }
        onChange?.(text);
    };
    // Handle paste events to strip formatting and respect maxLength
    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        const currentText = e.currentTarget.textContent || "";
        let pasteText = text;
        if (maxLength) {
            const remainingLength = maxLength - currentText.length;
            pasteText = text.slice(0, remainingLength);
        }
        document.execCommand('insertText', false, pasteText);
    };
    // Set initial content
    useEffect(() => {
        if (contentEditableRef.current && !isControlled) {
            const initialValue = defaultValue || "";
            if (contentEditableRef.current.textContent !== initialValue) {
                contentEditableRef.current.textContent = initialValue;
            }
        }
    }, [defaultValue, isControlled]);
    // Update content when value changes (controlled mode)
    useEffect(() => {
        if (contentEditableRef.current && isControlled && value !== undefined) {
            if (contentEditableRef.current.textContent !== value) {
                contentEditableRef.current.textContent = value;
            }
        }
    }, [value, isControlled]);
    // Auto focus
    useEffect(() => {
        if (autoFocus && contentEditableRef.current) {
            contentEditableRef.current.focus();
        }
    }, [autoFocus]);
    // Forward ref
    useEffect(() => {
        if (typeof ref === 'function') {
            ref(contentEditableRef.current);
        }
        else if (ref) {
            ref.current = contentEditableRef.current;
        }
    }, [ref]);
    const textareaElement = (jsx(Box, { ref: contentEditableRef, contentEditable: !disabled && !readOnly, onInput: handleInput, onPaste: handlePaste, onFocus: onFocus, onBlur: onBlur, className: className, minHeight: `${rows * 1.5}em`, padding: "2", border: "1px solid", borderColor: invalid ? "red.500" : "gray.200", borderRadius: "md", outline: "none", _focus: {
            borderColor: invalid ? "red.500" : "blue.500",
            boxShadow: `0 0 0 1px ${invalid ? "red.500" : "blue.500"}`,
        }, _disabled: {
            opacity: 0.6,
            cursor: "not-allowed",
            bg: "gray.50",
        }, _empty: {
            _before: {
                content: placeholder ? `"${placeholder}"` : undefined,
                color: "gray.400",
                pointerEvents: "none",
            }
        }, whiteSpace: "pre-wrap", overflowWrap: "break-word", overflow: "auto", maxHeight: `${rows * 4}em`, suppressContentEditableWarning: true, ...props }));
    // If we have additional field props, wrap in Field component
    if (label || helperText || errorText || required) {
        return (jsxs(Field$1.Root, { invalid: invalid, required: required, children: [label && (jsxs(Field$1.Label, { children: [label, required && jsx(Field$1.RequiredIndicator, {})] })), textareaElement, helperText && jsx(Field$1.HelperText, { children: helperText }), errorText && jsx(Field$1.ErrorText, { children: errorText })] }));
    }
    return textareaElement;
});
Textarea.displayName = "Textarea";

const TextAreaInput = ({ column, schema, prefix, }) => {
    const { register, formState: { errors }, } = useFormContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const form = useFormContext();
    const { setValue, watch } = form;
    const fieldError = getFieldError(errors, colLabel);
    const formI18n = useFormI18n(column, prefix, schema);
    const watchValue = watch(colLabel);
    return (jsx(Fragment, { children: jsx(Field, { label: formI18n.label(), required: isRequired, gridColumn: gridColumn ?? 'span 4', gridRow: gridRow ?? 'span 1', display: "grid", errorText: fieldError
                ? fieldError.includes('required')
                    ? formI18n.required()
                    : fieldError
                : undefined, invalid: !!fieldError, children: jsx(Textarea, { value: watchValue, onChange: (value) => setValue(colLabel, value) }) }) }));
};

dayjs.extend(utc);
dayjs.extend(timezone);
const TimePicker$1 = ({ hour, setHour, minute, setMinute, meridiem, setMeridiem, onChange = () => { }, startTime, selectedDate, timezone = 'Asia/Hong_Kong', portalled = true, labels = {
    placeholder: 'hh:mm AM/PM',
    emptyMessage: 'No time found',
}, }) => {
    // Generate time options (every 15 minutes in 12-hour format)
    const timeOptions = useMemo(() => {
        const options = [];
        // Get start time for comparison if provided
        let startDateTime = null;
        let shouldFilterByDate = false;
        if (startTime && selectedDate) {
            const startDateObj = dayjs(startTime).tz(timezone);
            const selectedDateObj = dayjs(selectedDate).tz(timezone);
            if (startDateObj.isValid() && selectedDateObj.isValid()) {
                startDateTime = startDateObj;
                // Only filter if dates are the same
                shouldFilterByDate =
                    startDateObj.format('YYYY-MM-DD') ===
                        selectedDateObj.format('YYYY-MM-DD');
            }
        }
        // Generate 12-hour format options (1-12 for hours, AM/PM)
        for (let h = 1; h <= 12; h++) {
            for (let m = 0; m < 60; m += 15) {
                for (const mer of ['am', 'pm']) {
                    // Convert 12-hour to 24-hour for comparison
                    let hour24 = h;
                    if (mer === 'am' && h === 12)
                        hour24 = 0;
                    else if (mer === 'pm' && h < 12)
                        hour24 = h + 12;
                    // Filter out times that would result in negative duration (only when dates are the same)
                    if (startDateTime && selectedDate && shouldFilterByDate) {
                        const selectedDateObj = dayjs(selectedDate).tz(timezone);
                        const optionDateTime = selectedDateObj
                            .hour(hour24)
                            .minute(m)
                            .second(0)
                            .millisecond(0);
                        if (optionDateTime.isBefore(startDateTime)) {
                            continue; // Skip this option as it would result in negative duration
                        }
                    }
                    // Calculate duration if startTime is provided
                    let durationText;
                    if (startDateTime && selectedDate) {
                        const selectedDateObj = dayjs(selectedDate).tz(timezone);
                        const optionDateTime = selectedDateObj
                            .hour(hour24)
                            .minute(m)
                            .second(0)
                            .millisecond(0);
                        if (optionDateTime.isValid() &&
                            optionDateTime.isAfter(startDateTime)) {
                            const diffMs = optionDateTime.diff(startDateTime);
                            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                            const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                            const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
                            if (diffHours > 0 || diffMinutes > 0 || diffSeconds > 0) {
                                let diffText = '';
                                if (diffHours > 0) {
                                    diffText = `${diffHours}h ${diffMinutes}m`;
                                }
                                else if (diffMinutes > 0) {
                                    diffText = `${diffMinutes}m ${diffSeconds}s`;
                                }
                                else {
                                    diffText = `${diffSeconds}s`;
                                }
                                durationText = `+${diffText}`;
                            }
                        }
                    }
                    const hourDisplay = h.toString();
                    const minuteDisplay = m.toString().padStart(2, '0');
                    const timeDisplay = `${hourDisplay}:${minuteDisplay} ${mer.toUpperCase()}`;
                    options.push({
                        label: timeDisplay,
                        value: `${h}:${m}:${mer}`,
                        hour: h,
                        minute: m,
                        meridiem: mer,
                        searchText: timeDisplay, // Use base time without duration for searching
                        durationText,
                    });
                }
            }
        }
        return options;
    }, [startTime, selectedDate, timezone]);
    const { contains } = useFilter({ sensitivity: 'base' });
    const { collection, filter } = useListCollection({
        initialItems: timeOptions,
        itemToString: (item) => item.searchText, // Use searchText (without duration) for filtering
        itemToValue: (item) => item.value,
        filter: contains,
    });
    // Get current value string for combobox
    const currentValue = useMemo(() => {
        if (hour === null || minute === null || meridiem === null) {
            return '';
        }
        return `${hour}:${minute}:${meridiem}`;
    }, [hour, minute, meridiem]);
    // Calculate duration difference
    const durationDiff = useMemo(() => {
        if (!startTime ||
            !selectedDate ||
            hour === null ||
            minute === null ||
            meridiem === null) {
            return null;
        }
        const startDateObj = dayjs(startTime).tz(timezone);
        const selectedDateObj = dayjs(selectedDate).tz(timezone);
        // Convert 12-hour to 24-hour format
        let hour24 = hour;
        if (meridiem === 'am' && hour === 12)
            hour24 = 0;
        else if (meridiem === 'pm' && hour < 12)
            hour24 = hour + 12;
        const currentDateTime = selectedDateObj
            .hour(hour24)
            .minute(minute)
            .second(0)
            .millisecond(0);
        if (!startDateObj.isValid() || !currentDateTime.isValid()) {
            return null;
        }
        const diffMs = currentDateTime.diff(startDateObj);
        if (diffMs < 0) {
            return null;
        }
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
        if (diffHours > 0 || diffMinutes > 0 || diffSeconds > 0) {
            let diffText = '';
            if (diffHours > 0) {
                diffText = `${diffHours}h ${diffMinutes}m`;
            }
            else if (diffMinutes > 0) {
                diffText = `${diffMinutes}m ${diffSeconds}s`;
            }
            else {
                diffText = `${diffSeconds}s`;
            }
            return `+${diffText}`;
        }
        return null;
    }, [hour, minute, meridiem, startTime, selectedDate, timezone]);
    const handleClear = () => {
        setHour(null);
        setMinute(null);
        setMeridiem(null);
        filter(''); // Reset filter to show all options
        onChange({ hour: null, minute: null, meridiem: null });
    };
    const handleValueChange = (details) => {
        if (details.value.length === 0) {
            handleClear();
            return;
        }
        const selectedValue = details.value[0];
        const selectedOption = timeOptions.find((opt) => opt.value === selectedValue);
        if (selectedOption) {
            setHour(selectedOption.hour);
            setMinute(selectedOption.minute);
            setMeridiem(selectedOption.meridiem);
            filter(''); // Reset filter after selection
            onChange({
                hour: selectedOption.hour,
                minute: selectedOption.minute,
                meridiem: selectedOption.meridiem,
            });
        }
    };
    // Parse input value and update state
    const parseAndCommitInput = (value) => {
        const trimmedValue = value.trim();
        // Filter the collection based on input
        filter(trimmedValue);
        if (!trimmedValue) {
            return;
        }
        // Parse formats like "1:30 PM", "1:30PM", "1:30 pm", "1:30pm"
        const timePattern12Hour = /^(\d{1,2}):(\d{1,2})\s*(am|pm|AM|PM)$/i;
        const match12Hour = trimmedValue.match(timePattern12Hour);
        if (match12Hour) {
            const parsedHour = parseInt(match12Hour[1], 10);
            const parsedMinute = parseInt(match12Hour[2], 10);
            const parsedMeridiem = match12Hour[3].toLowerCase();
            // Validate ranges
            if (parsedHour >= 1 &&
                parsedHour <= 12 &&
                parsedMinute >= 0 &&
                parsedMinute <= 59) {
                setHour(parsedHour);
                setMinute(parsedMinute);
                setMeridiem(parsedMeridiem);
                onChange({
                    hour: parsedHour,
                    minute: parsedMinute,
                    meridiem: parsedMeridiem,
                });
                return;
            }
        }
        // Try to parse formats like "130pm" or "130 pm" (without colon)
        const timePatternNoColon = /^(\d{1,4})\s*(am|pm|AM|PM)$/i;
        const matchNoColon = trimmedValue.match(timePatternNoColon);
        if (matchNoColon) {
            const numbersOnly = matchNoColon[1];
            const parsedMeridiem = matchNoColon[2].toLowerCase();
            if (numbersOnly.length >= 3) {
                const parsedHour = parseInt(numbersOnly.slice(0, -2), 10);
                const parsedMinute = parseInt(numbersOnly.slice(-2), 10);
                // Validate ranges
                if (parsedHour >= 1 &&
                    parsedHour <= 12 &&
                    parsedMinute >= 0 &&
                    parsedMinute <= 59) {
                    setHour(parsedHour);
                    setMinute(parsedMinute);
                    setMeridiem(parsedMeridiem);
                    onChange({
                        hour: parsedHour,
                        minute: parsedMinute,
                        meridiem: parsedMeridiem,
                    });
                    return;
                }
            }
        }
        // Parse failed, select first result
        selectFirstResult();
    };
    // Select first result from filtered collection
    const selectFirstResult = () => {
        if (collection.items.length > 0) {
            const firstItem = collection.items[0];
            setHour(firstItem.hour);
            setMinute(firstItem.minute);
            setMeridiem(firstItem.meridiem);
            filter(''); // Reset filter after selection
            onChange({
                hour: firstItem.hour,
                minute: firstItem.minute,
                meridiem: firstItem.meridiem,
            });
        }
    };
    const handleInputValueChange = (details) => {
        // Filter the collection based on input, but don't parse yet
        filter(details.inputValue);
    };
    const handleFocus = (e) => {
        // Select all text when focusing
        e.target.select();
    };
    const handleBlur = (e) => {
        // Parse and commit the input value when losing focus
        const inputValue = e.target.value;
        if (inputValue) {
            parseAndCommitInput(inputValue);
        }
    };
    const handleKeyDown = (e) => {
        // Commit input on Enter key
        if (e.key === 'Enter') {
            e.preventDefault();
            const inputValue = e.currentTarget.value;
            if (inputValue) {
                parseAndCommitInput(inputValue);
            }
            // Blur the input
            e.currentTarget?.blur();
        }
    };
    return (jsx(Flex, { direction: "column", gap: 3, children: jsxs(Flex, { alignItems: "center", gap: "2", width: "auto", minWidth: "300px", children: [jsxs(Combobox.Root, { collection: collection, value: currentValue ? [currentValue] : [], onValueChange: handleValueChange, onInputValueChange: handleInputValueChange, allowCustomValue: true, selectionBehavior: "replace", openOnClick: true, flex: 1, children: [jsxs(Combobox.Control, { children: [jsx(InputGroup$1, { startElement: jsx(BsClock, {}), children: jsx(Combobox.Input, { placeholder: labels?.placeholder ?? 'hh:mm AM/PM', onFocus: handleFocus, onBlur: handleBlur, onKeyDown: handleKeyDown }) }), jsx(Combobox.IndicatorGroup, { children: jsx(Combobox.Trigger, {}) })] }), jsx(Portal, { disabled: !portalled, children: jsx(Combobox.Positioner, { children: jsxs(Combobox.Content, { children: [jsx(Combobox.Empty, { children: labels?.emptyMessage ?? 'No time found' }), collection.items.map((item) => (jsxs(Combobox.Item, { item: item, children: [jsxs(Flex, { alignItems: "center", gap: 2, width: "100%", children: [jsx(Text, { flex: 1, children: item.label }), item.durationText && (jsx(Tag$1.Root, { size: "sm", children: jsx(Tag$1.Label, { children: item.durationText }) }))] }), jsx(Combobox.ItemIndicator, {})] }, item.value)))] }) }) })] }), durationDiff && (jsx(Tag$1.Root, { size: "sm", children: jsx(Tag$1.Label, { children: durationDiff }) })), jsx(Button$1, { onClick: handleClear, size: "sm", variant: "ghost", children: jsx(Icon, { children: jsx(MdCancel, {}) }) })] }) }));
};

dayjs.extend(timezone);
const TimePicker = ({ column, schema, prefix }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
    const { timezone, insideDialog, timePickerLabels } = useSchemaContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1', timeFormat = 'HH:mm:ssZ', displayTimeFormat = 'hh:mm A', } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const formI18n = useFormI18n(column, prefix, schema);
    const [open, setOpen] = useState(false);
    const value = watch(colLabel);
    const displayedTime = dayjs(`1970-01-01T${value}`).tz(timezone).isValid()
        ? dayjs(`1970-01-01T${value}`).tz(timezone).format(displayTimeFormat)
        : '';
    // Parse the initial time parts from the  time string (HH:mm:ssZ)
    const parseTime = (time) => {
        if (!time)
            return { hour: 12, minute: 0, meridiem: 'am' };
        const parsed = dayjs(`1970-01-01T${time}`).tz(timezone);
        if (!parsed.isValid()) {
            return { hour: 12, minute: 0, meridiem: 'am' };
        }
        let hour = parsed.hour();
        const minute = parsed.minute();
        const meridiem = hour >= 12 ? 'pm' : 'am';
        if (hour === 0)
            hour = 12;
        else if (hour > 12)
            hour -= 12;
        return { hour, minute, meridiem };
    };
    const initialTime = parseTime(value);
    const [hour, setHour] = useState(initialTime.hour);
    const [minute, setMinute] = useState(initialTime.minute);
    const [meridiem, setMeridiem] = useState(initialTime.meridiem);
    useEffect(() => {
        const { hour, minute, meridiem } = parseTime(value);
        setHour(hour);
        setMinute(minute);
        setMeridiem(meridiem);
    }, [value]);
    const getTimeString = (hour, minute, meridiem) => {
        if (hour === null || minute === null || meridiem === null)
            return null;
        let newHour = hour;
        if (meridiem === 'pm' && hour !== 12) {
            newHour = hour + 12;
        }
        return dayjs()
            .tz(timezone)
            .hour(newHour)
            .minute(minute)
            .second(0)
            .format(timeFormat);
    };
    // Handle changes to time parts
    const handleTimeChange = ({ hour: newHour, minute: newMinute, meridiem: newMeridiem, }) => {
        setHour(newHour);
        setMinute(newMinute);
        setMeridiem(newMeridiem);
        const timeString = getTimeString(newHour, newMinute, newMeridiem);
        setValue(colLabel, timeString, { shouldValidate: true, shouldDirty: true });
    };
    return (jsx(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: errors[`${colLabel}`] ? formI18n.required() : undefined, invalid: !!errors[colLabel], children: jsxs(Popover.Root, { open: open, onOpenChange: (e) => setOpen(e.open), closeOnInteractOutside: true, children: [jsx(Popover.Trigger, { asChild: true, children: jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
                            setOpen(true);
                        }, justifyContent: 'start', children: [jsx(IoMdClock, {}), !!value ? `${displayedTime}` : ''] }) }), insideDialog ? (jsx(Popover.Positioner, { children: jsx(Popover.Content, { maxH: "70vh", overflowY: "auto", children: jsx(Popover.Body, { overflow: "visible", children: jsx(TimePicker$1, { hour: hour, setHour: setHour, minute: minute, setMinute: setMinute, meridiem: meridiem, setMeridiem: setMeridiem, onChange: handleTimeChange, labels: timePickerLabels }) }) }) })) : (jsx(Portal, { children: jsx(Popover.Positioner, { children: jsx(Popover.Content, { children: jsx(Popover.Body, { children: jsx(TimePicker$1, { hour: hour, setHour: setHour, minute: minute, setMinute: setMinute, meridiem: meridiem, setMeridiem: setMeridiem, onChange: handleTimeChange, labels: timePickerLabels }) }) }) }) }))] }) }));
};

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
function DatePickerInput({ value, onChange, placeholder = 'Select a date', dateFormat = 'YYYY-MM-DD', displayFormat = 'YYYY-MM-DD', labels = {
    monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ],
    weekdayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    backButtonLabel: 'Back',
    forwardButtonLabel: 'Next',
}, timezone = 'Asia/Hong_Kong', minDate, maxDate, firstDayOfWeek, showOutsideDays, monthsToDisplay = 1, insideDialog = false, readOnly = false, }) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    // Update input value when prop value changes
    useEffect(() => {
        if (value) {
            const formatted = typeof value === 'string'
                ? dayjs(value).tz(timezone).isValid()
                    ? dayjs(value).tz(timezone).format(displayFormat)
                    : ''
                : dayjs(value).tz(timezone).format(displayFormat);
            setInputValue(formatted);
        }
        else {
            setInputValue('');
        }
    }, [value, displayFormat, timezone]);
    // Convert value to Date object for DatePicker
    const selectedDate = value
        ? typeof value === 'string'
            ? dayjs(value).tz(timezone).isValid()
                ? dayjs(value).tz(timezone).toDate()
                : new Date()
            : value
        : new Date();
    // Shared function to parse and validate input value
    const parseAndValidateInput = (inputVal) => {
        // If empty, clear the value
        if (!inputVal.trim()) {
            onChange?.(undefined);
            setInputValue('');
            return;
        }
        // Try parsing with displayFormat first
        let parsedDate = dayjs(inputVal, displayFormat, true);
        // If that fails, try common date formats
        if (!parsedDate.isValid()) {
            parsedDate = dayjs(inputVal);
        }
        // If still invalid, try parsing with dateFormat
        if (!parsedDate.isValid()) {
            parsedDate = dayjs(inputVal, dateFormat, true);
        }
        // If valid, check constraints and update
        if (parsedDate.isValid()) {
            const dateObj = parsedDate.tz(timezone).toDate();
            // Check min/max constraints
            if (minDate && dateObj < minDate) {
                // Invalid: before minDate, reset to prop value
                resetToPropValue();
                return;
            }
            if (maxDate && dateObj > maxDate) {
                // Invalid: after maxDate, reset to prop value
                resetToPropValue();
                return;
            }
            // Valid date - format and update
            const formattedDate = parsedDate.tz(timezone).format(dateFormat);
            const formattedDisplay = parsedDate.tz(timezone).format(displayFormat);
            onChange?.(formattedDate);
            setInputValue(formattedDisplay);
        }
        else {
            // Invalid date - reset to prop value
            resetToPropValue();
        }
    };
    // Helper function to reset input to prop value
    const resetToPropValue = () => {
        if (value) {
            const formatted = typeof value === 'string'
                ? dayjs(value).tz(timezone).isValid()
                    ? dayjs(value).tz(timezone).format(displayFormat)
                    : ''
                : dayjs(value).tz(timezone).format(displayFormat);
            setInputValue(formatted);
        }
        else {
            setInputValue('');
        }
    };
    const handleInputChange = (e) => {
        // Only update the input value, don't parse yet
        setInputValue(e.target.value);
    };
    const handleInputBlur = () => {
        // Parse and validate when input loses focus
        parseAndValidateInput(inputValue);
    };
    const handleKeyDown = (e) => {
        // Parse and validate when Enter is pressed
        if (e.key === 'Enter') {
            e.preventDefault();
            parseAndValidateInput(inputValue);
        }
    };
    const handleDateSelected = ({ date }) => {
        const formattedDate = dayjs(date).tz(timezone).format(dateFormat);
        onChange?.(formattedDate);
        setOpen(false);
    };
    const datePickerContent = (jsx(DatePicker$1, { selected: selectedDate, onDateSelected: handleDateSelected, labels: labels, minDate: minDate, maxDate: maxDate, firstDayOfWeek: firstDayOfWeek, showOutsideDays: showOutsideDays, monthsToDisplay: monthsToDisplay }));
    return (jsxs(Popover.Root, { open: open, onOpenChange: (e) => setOpen(e.open), closeOnInteractOutside: true, autoFocus: false, children: [jsx(InputGroup, { endElement: jsx(Popover.Trigger, { asChild: true, children: jsx(IconButton, { variant: "ghost", size: "2xs", "aria-label": "Open calendar", onClick: () => setOpen(true), children: jsx(Icon, { children: jsx(MdDateRange, {}) }) }) }), children: jsx(Input, { value: inputValue, onChange: handleInputChange, onBlur: handleInputBlur, onKeyDown: handleKeyDown, placeholder: placeholder, readOnly: readOnly }) }), insideDialog ? (jsx(Popover.Positioner, { children: jsx(Popover.Content, { width: "fit-content", minH: "25rem", children: jsx(Popover.Body, { children: datePickerContent }) }) })) : (jsx(Portal, { children: jsx(Popover.Positioner, { children: jsx(Popover.Content, { width: "fit-content", minH: "25rem", children: jsx(Popover.Body, { children: datePickerContent }) }) }) }))] }));
}

dayjs.extend(utc);
dayjs.extend(timezone);
function IsoTimePicker({ hour, setHour, minute, setMinute, second, setSecond, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
onChange = (_newValue) => { }, startTime, selectedDate, timezone = 'Asia/Hong_Kong', portalled = true, labels = {
    placeholder: 'HH:mm:ss',
    emptyMessage: 'No time found',
}, }) {
    // Generate time options (every 15 minutes, seconds always 0)
    const timeOptions = useMemo(() => {
        const options = [];
        // Get start time for comparison if provided
        let startDateTime = null;
        let shouldFilterByDate = false;
        if (startTime && selectedDate) {
            const startDateObj = dayjs(startTime).tz(timezone);
            const selectedDateObj = dayjs(selectedDate).tz(timezone);
            if (startDateObj.isValid() && selectedDateObj.isValid()) {
                startDateTime = startDateObj;
                // Only filter if dates are the same
                shouldFilterByDate =
                    startDateObj.format('YYYY-MM-DD') ===
                        selectedDateObj.format('YYYY-MM-DD');
            }
        }
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 15) {
                const timeDisplay = `${h.toString().padStart(2, '0')}:${m
                    .toString()
                    .padStart(2, '0')}:00`;
                // Filter out times that would result in negative duration (only when dates are the same)
                if (startDateTime && selectedDate && shouldFilterByDate) {
                    const selectedDateObj = dayjs(selectedDate).tz(timezone);
                    const optionDateTime = selectedDateObj
                        .hour(h)
                        .minute(m)
                        .second(0)
                        .millisecond(0);
                    if (optionDateTime.isBefore(startDateTime)) {
                        continue; // Skip this option as it would result in negative duration
                    }
                }
                // Calculate duration if startTime is provided
                let durationText;
                if (startDateTime && selectedDate) {
                    const selectedDateObj = dayjs(selectedDate).tz(timezone);
                    const optionDateTime = selectedDateObj
                        .hour(h)
                        .minute(m)
                        .second(0)
                        .millisecond(0);
                    if (optionDateTime.isValid() &&
                        optionDateTime.isAfter(startDateTime)) {
                        const diffMs = optionDateTime.diff(startDateTime);
                        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                        const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
                        if (diffHours > 0 || diffMinutes > 0 || diffSeconds > 0) {
                            let diffText = '';
                            if (diffHours > 0) {
                                diffText = `${diffHours}h ${diffMinutes}m`;
                            }
                            else if (diffMinutes > 0) {
                                diffText = `${diffMinutes}m ${diffSeconds}s`;
                            }
                            else {
                                diffText = `${diffSeconds}s`;
                            }
                            durationText = `+${diffText}`;
                        }
                    }
                }
                options.push({
                    label: timeDisplay,
                    value: `${h}:${m}:0`,
                    hour: h,
                    minute: m,
                    second: 0,
                    searchText: timeDisplay, // Use base time without duration for searching
                    durationText,
                });
            }
        }
        return options;
    }, [startTime, selectedDate, timezone]);
    const { contains } = useFilter({ sensitivity: 'base' });
    const { collection, filter } = useListCollection({
        initialItems: timeOptions,
        itemToString: (item) => item.searchText, // Use searchText (without duration) for filtering
        itemToValue: (item) => item.value,
        filter: contains,
    });
    // Get current value string for combobox
    const currentValue = useMemo(() => {
        if (hour === null || minute === null || second === null) {
            return '';
        }
        return `${hour}:${minute}:${second}`;
    }, [hour, minute, second]);
    // Calculate duration difference
    const durationDiff = useMemo(() => {
        if (!startTime ||
            !selectedDate ||
            hour === null ||
            minute === null ||
            second === null) {
            return null;
        }
        const startDateObj = dayjs(startTime).tz(timezone);
        const selectedDateObj = dayjs(selectedDate).tz(timezone);
        const currentDateTime = selectedDateObj
            .hour(hour)
            .minute(minute)
            .second(second ?? 0)
            .millisecond(0);
        if (!startDateObj.isValid() || !currentDateTime.isValid()) {
            return null;
        }
        const diffMs = currentDateTime.diff(startDateObj);
        if (diffMs < 0) {
            return null;
        }
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
        if (diffHours > 0 || diffMinutes > 0 || diffSeconds > 0) {
            let diffText = '';
            if (diffHours > 0) {
                diffText = `${diffHours}h ${diffMinutes}m`;
            }
            else if (diffMinutes > 0) {
                diffText = `${diffMinutes}m ${diffSeconds}s`;
            }
            else {
                diffText = `${diffSeconds}s`;
            }
            return `+${diffText}`;
        }
        return null;
    }, [hour, minute, second, startTime, selectedDate, timezone]);
    const handleClear = () => {
        setHour(null);
        setMinute(null);
        setSecond(null);
        filter(''); // Reset filter to show all options
        onChange({ hour: null, minute: null, second: null });
    };
    const handleValueChange = (details) => {
        if (details.value.length === 0) {
            handleClear();
            return;
        }
        const selectedValue = details.value[0];
        const selectedOption = timeOptions.find((opt) => opt.value === selectedValue);
        if (selectedOption) {
            setHour(selectedOption.hour);
            setMinute(selectedOption.minute);
            setSecond(selectedOption.second);
            filter(''); // Reset filter after selection
            onChange({
                hour: selectedOption.hour,
                minute: selectedOption.minute,
                second: selectedOption.second,
            });
        }
    };
    // Parse input value and update state
    const parseAndCommitInput = (value) => {
        const trimmedValue = value.trim();
        // Filter the collection based on input
        filter(trimmedValue);
        if (!trimmedValue) {
            return;
        }
        // Parse HH:mm:ss or HH:mm format
        const timePattern = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/;
        const match = trimmedValue.match(timePattern);
        if (match) {
            const parsedHour = parseInt(match[1], 10);
            const parsedMinute = parseInt(match[2], 10);
            const parsedSecond = match[3] ? parseInt(match[3], 10) : 0;
            // Validate ranges
            if (parsedHour >= 0 &&
                parsedHour <= 23 &&
                parsedMinute >= 0 &&
                parsedMinute <= 59 &&
                parsedSecond >= 0 &&
                parsedSecond <= 59) {
                setHour(parsedHour);
                setMinute(parsedMinute);
                setSecond(parsedSecond);
                onChange({
                    hour: parsedHour,
                    minute: parsedMinute,
                    second: parsedSecond,
                });
                return;
            }
        }
        else {
            // Try to parse formats like "123045" (HHmmss) or "1230" (HHmm)
            const numbersOnly = trimmedValue.replace(/[^0-9]/g, '');
            if (numbersOnly.length >= 4) {
                const parsedHour = parseInt(numbersOnly.slice(0, 2), 10);
                const parsedMinute = parseInt(numbersOnly.slice(2, 4), 10);
                const parsedSecond = numbersOnly.length >= 6 ? parseInt(numbersOnly.slice(4, 6), 10) : 0;
                // Validate ranges
                if (parsedHour >= 0 &&
                    parsedHour <= 23 &&
                    parsedMinute >= 0 &&
                    parsedMinute <= 59 &&
                    parsedSecond >= 0 &&
                    parsedSecond <= 59) {
                    setHour(parsedHour);
                    setMinute(parsedMinute);
                    setSecond(parsedSecond);
                    onChange({
                        hour: parsedHour,
                        minute: parsedMinute,
                        second: parsedSecond,
                    });
                    return;
                }
            }
        }
        // Parse failed, select first result
        selectFirstResult();
    };
    // Select first result from filtered collection
    const selectFirstResult = () => {
        if (collection.items.length > 0) {
            const firstItem = collection.items[0];
            setHour(firstItem.hour);
            setMinute(firstItem.minute);
            setSecond(firstItem.second);
            filter(''); // Reset filter after selection
            onChange({
                hour: firstItem.hour,
                minute: firstItem.minute,
                second: firstItem.second,
            });
        }
    };
    const handleInputValueChange = (details) => {
        // Filter the collection based on input, but don't parse yet
        filter(details.inputValue);
    };
    const handleFocus = (e) => {
        // Select all text when focusing
        e.target.select();
    };
    const handleBlur = (e) => {
        // Parse and commit the input value when losing focus
        const inputValue = e.target.value;
        if (inputValue) {
            parseAndCommitInput(inputValue);
        }
    };
    const handleKeyDown = (e) => {
        // Commit input on Enter key
        if (e.key === 'Enter') {
            e.preventDefault();
            const inputValue = e.currentTarget.value;
            if (inputValue) {
                parseAndCommitInput(inputValue);
            }
            // Blur the input
            e.currentTarget?.blur();
        }
    };
    return (jsx(Flex, { direction: "column", gap: 3, children: jsxs(Flex, { alignItems: "center", gap: "2", width: "auto", minWidth: "300px", children: [jsxs(Combobox.Root, { collection: collection, value: currentValue ? [currentValue] : [], onValueChange: handleValueChange, onInputValueChange: handleInputValueChange, allowCustomValue: true, selectionBehavior: "replace", openOnClick: true, flex: 1, children: [jsxs(Combobox.Control, { children: [jsx(InputGroup$1, { startElement: jsx(BsClock, {}), children: jsx(Combobox.Input, { placeholder: labels.placeholder, onFocus: handleFocus, onBlur: handleBlur, onKeyDown: handleKeyDown }) }), jsx(Combobox.IndicatorGroup, { children: jsx(Combobox.Trigger, {}) })] }), jsx(Portal, { disabled: !portalled, children: jsx(Combobox.Positioner, { children: jsxs(Combobox.Content, { children: [jsx(Combobox.Empty, { children: labels.emptyMessage }), collection.items.map((item) => (jsxs(Combobox.Item, { item: item, children: [jsxs(Flex, { alignItems: "center", gap: 2, width: "100%", children: [jsx(Text, { flex: 1, children: item.label }), item.durationText && (jsx(Tag$1.Root, { size: "sm", children: jsx(Tag$1.Label, { children: item.durationText }) }))] }), jsx(Combobox.ItemIndicator, {})] }, item.value)))] }) }) })] }), durationDiff && (jsx(Tag$1.Root, { size: "sm", children: jsx(Tag$1.Label, { children: durationDiff }) })), jsx(Button$1, { onClick: handleClear, size: "sm", variant: "ghost", children: jsx(Icon, { children: jsx(MdCancel, {}) }) })] }) }));
}

dayjs.extend(utc);
dayjs.extend(timezone);
function DateTimePicker$1({ value, onChange, format = 'date-time', showSeconds = false, labels = {
    monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ],
    weekdayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    backButtonLabel: 'Back',
    forwardButtonLabel: 'Next',
}, timePickerLabels, timezone = 'Asia/Hong_Kong', startTime, minDate, maxDate, portalled = false, }) {
    console.log('[DateTimePicker] Component initialized with props:', {
        value,
        format,
        showSeconds,
        timezone,
        startTime,
        minDate,
        maxDate,
    });
    // Initialize selectedDate from value prop, converting ISO to YYYY-MM-DD format
    const getDateString = useCallback((val) => {
        if (!val)
            return '';
        const dateObj = dayjs(val).tz(timezone);
        return dateObj.isValid() ? dateObj.format('YYYY-MM-DD') : '';
    }, [timezone]);
    const [selectedDate, setSelectedDate] = useState(getDateString(value));
    // Helper to get time values from value prop with timezone
    const getTimeFromValue = useCallback((val) => {
        console.log('[DateTimePicker] getTimeFromValue called:', {
            val,
            timezone,
            showSeconds,
        });
        if (!val) {
            console.log('[DateTimePicker] No value provided, returning nulls');
            return {
                hour12: null,
                minute: null,
                meridiem: null,
                hour24: null,
                second: null,
            };
        }
        const dateObj = dayjs(val).tz(timezone);
        console.log('[DateTimePicker] Parsed date object:', {
            original: val,
            timezone,
            isValid: dateObj.isValid(),
            formatted: dateObj.format('YYYY-MM-DD HH:mm:ss Z'),
            hour24: dateObj.hour(),
            minute: dateObj.minute(),
            second: dateObj.second(),
        });
        if (!dateObj.isValid()) {
            console.log('[DateTimePicker] Invalid date object, returning nulls');
            return {
                hour12: null,
                minute: null,
                meridiem: null,
                hour24: null,
                second: null,
            };
        }
        const hour24Value = dateObj.hour();
        const hour12Value = hour24Value % 12 || 12;
        const minuteValue = dateObj.minute();
        const meridiemValue = hour24Value >= 12 ? 'pm' : 'am';
        const secondValue = showSeconds ? dateObj.second() : null;
        const result = {
            hour12: hour12Value,
            minute: minuteValue,
            meridiem: meridiemValue,
            hour24: hour24Value,
            second: secondValue,
        };
        console.log('[DateTimePicker] Extracted time values:', result);
        return result;
    }, [timezone, showSeconds]);
    const initialTime = getTimeFromValue(value);
    console.log('[DateTimePicker] Initial time from value:', {
        value,
        initialTime,
    });
    // Time state for 12-hour format
    const [hour12, setHour12] = useState(initialTime.hour12);
    const [minute, setMinute] = useState(initialTime.minute);
    const [meridiem, setMeridiem] = useState(initialTime.meridiem);
    // Time state for 24-hour format
    const [hour24, setHour24] = useState(initialTime.hour24);
    const [second, setSecond] = useState(initialTime.second);
    // Sync selectedDate and time states when value prop changes
    useEffect(() => {
        console.log('[DateTimePicker] useEffect triggered - value changed:', {
            value,
            timezone,
            format,
        });
        // If value is null, undefined, or invalid, clear all fields
        if (!value || value === null || value === undefined) {
            console.log('[DateTimePicker] Value is null/undefined, clearing all fields');
            setSelectedDate('');
            setHour12(null);
            setMinute(null);
            setMeridiem(null);
            setHour24(null);
            setSecond(null);
            return;
        }
        // Check if value is valid
        const dateObj = dayjs(value).tz(timezone);
        if (!dateObj.isValid()) {
            console.log('[DateTimePicker] Invalid value, clearing all fields');
            setSelectedDate('');
            setHour12(null);
            setMinute(null);
            setMeridiem(null);
            setHour24(null);
            setSecond(null);
            return;
        }
        const dateString = getDateString(value);
        console.log('[DateTimePicker] Setting selectedDate:', dateString);
        setSelectedDate(dateString);
        const timeData = getTimeFromValue(value);
        console.log('[DateTimePicker] Updating time states:', {
            timeData,
        });
        setHour12(timeData.hour12);
        setMinute(timeData.minute);
        setMeridiem(timeData.meridiem);
        setHour24(timeData.hour24);
        setSecond(timeData.second);
    }, [value, getTimeFromValue, getDateString, timezone]);
    const handleDateChange = (date) => {
        console.log('[DateTimePicker] handleDateChange called:', {
            date,
            timezone,
            showSeconds,
            currentTimeStates: { hour12, minute, meridiem, hour24, second },
        });
        // If date is empty or invalid, clear all fields
        if (!date || date === '') {
            console.log('[DateTimePicker] Empty date, clearing all fields');
            setSelectedDate('');
            setHour12(null);
            setMinute(null);
            setMeridiem(null);
            setHour24(null);
            setSecond(null);
            onChange?.(undefined);
            return;
        }
        setSelectedDate(date);
        // Parse the date string (YYYY-MM-DD) in the specified timezone
        const dateObj = dayjs.tz(date, timezone);
        console.log('[DateTimePicker] Parsed date object:', {
            date,
            timezone,
            isValid: dateObj.isValid(),
            isoString: dateObj.toISOString(),
            formatted: dateObj.format('YYYY-MM-DD HH:mm:ss Z'),
        });
        if (!dateObj.isValid()) {
            console.warn('[DateTimePicker] Invalid date object in handleDateChange, clearing fields');
            setSelectedDate('');
            setHour12(null);
            setMinute(null);
            setMeridiem(null);
            setHour24(null);
            setSecond(null);
            onChange?.(undefined);
            return;
        }
        // When showSeconds is false, ignore seconds from the date
        if (!showSeconds) {
            const dateWithoutSeconds = dateObj.second(0).millisecond(0).toISOString();
            console.log('[DateTimePicker] Updating date without seconds:', dateWithoutSeconds);
            updateDateTime(dateWithoutSeconds);
        }
        else {
            const dateWithSeconds = dateObj.toISOString();
            console.log('[DateTimePicker] Updating date with seconds:', dateWithSeconds);
            updateDateTime(dateWithSeconds);
        }
    };
    const handleTimeChange = (timeData) => {
        console.log('[DateTimePicker] handleTimeChange called:', {
            timeData,
            format,
            selectedDate,
            timezone,
        });
        if (format === 'iso-date-time') {
            const data = timeData;
            console.log('[DateTimePicker] ISO format - setting 24-hour time:', data);
            setHour24(data.hour);
            setMinute(data.minute);
            if (showSeconds) {
                setSecond(data.second ?? null);
            }
            else {
                // Ignore seconds - always set to null when showSeconds is false
                setSecond(null);
            }
        }
        else {
            const data = timeData;
            console.log('[DateTimePicker] 12-hour format - setting time:', data);
            setHour12(data.hour);
            setMinute(data.minute);
            setMeridiem(data.meridiem);
        }
        // Use selectedDate if valid, otherwise clear all fields
        if (!selectedDate || !dayjs(selectedDate).isValid()) {
            console.log('[DateTimePicker] No valid selectedDate, clearing all fields');
            setSelectedDate('');
            setHour12(null);
            setMinute(null);
            setMeridiem(null);
            setHour24(null);
            setSecond(null);
            onChange?.(undefined);
            return;
        }
        const dateObj = dayjs(selectedDate).tz(timezone);
        if (dateObj.isValid()) {
            updateDateTime(dateObj.toISOString(), timeData);
        }
        else {
            console.warn('[DateTimePicker] Invalid date object in handleTimeChange, clearing fields');
            setSelectedDate('');
            setHour12(null);
            setMinute(null);
            setMeridiem(null);
            setHour24(null);
            setSecond(null);
            onChange?.(undefined);
        }
    };
    const updateDateTime = (date, timeData) => {
        console.log('[DateTimePicker] updateDateTime called:', {
            date,
            timeData,
            format,
            currentStates: { hour12, minute, meridiem, hour24, second },
        });
        if (!date || date === null || date === undefined) {
            console.log('[DateTimePicker] No date provided, clearing all fields and calling onChange(undefined)');
            setSelectedDate('');
            setHour12(null);
            setMinute(null);
            setMeridiem(null);
            setHour24(null);
            setSecond(null);
            onChange?.(undefined);
            return;
        }
        // use dayjs to convert the date to the timezone
        const dateObj = dayjs(date).tz(timezone);
        if (!dateObj.isValid()) {
            console.warn('[DateTimePicker] Invalid date object in updateDateTime, clearing fields:', date);
            setSelectedDate('');
            setHour12(null);
            setMinute(null);
            setMeridiem(null);
            setHour24(null);
            setSecond(null);
            onChange?.(undefined);
            return;
        }
        const newDate = dateObj.toDate();
        if (format === 'iso-date-time') {
            const data = timeData;
            // Use timeData values if provided, otherwise fall back to current state
            // But if timeData is explicitly provided with nulls, we need to check if all are null
            const h = data !== undefined ? data.hour : hour24;
            const m = data !== undefined ? data.minute : minute;
            // Always ignore seconds when showSeconds is false - set to 0
            const s = showSeconds
                ? data !== undefined
                    ? data.second ?? null
                    : second ?? 0
                : 0;
            // If all time values are null, clear the value
            if (h === null && m === null && (showSeconds ? s === null : true)) {
                console.log('[DateTimePicker] All time values are null, clearing value');
                onChange?.(undefined);
                return;
            }
            console.log('[DateTimePicker] ISO format - setting time on date:', {
                h,
                m,
                s,
                showSeconds,
            });
            if (h !== null)
                newDate.setHours(h);
            if (m !== null)
                newDate.setMinutes(m);
            newDate.setSeconds(s ?? 0);
        }
        else {
            const data = timeData;
            console.log('[DateTimePicker] Processing 12-hour format:', {
                'data !== undefined': data !== undefined,
                'data?.hour': data?.hour,
                'data?.minute': data?.minute,
                'data?.meridiem': data?.meridiem,
                'current hour12': hour12,
                'current minute': minute,
                'current meridiem': meridiem,
            });
            // Use timeData values if provided, otherwise fall back to current state
            const h = data !== undefined ? data.hour : hour12;
            const m = data !== undefined ? data.minute : minute;
            const mer = data !== undefined ? data.meridiem : meridiem;
            console.log('[DateTimePicker] Resolved time values:', { h, m, mer });
            // If all time values are null, clear the value
            if (h === null && m === null && mer === null) {
                console.log('[DateTimePicker] All time values are null, clearing value');
                onChange?.(undefined);
                return;
            }
            console.log('[DateTimePicker] 12-hour format - converting time:', {
                h,
                m,
                mer,
            });
            if (h !== null && mer !== null) {
                let hour24 = h;
                if (mer === 'am' && h === 12)
                    hour24 = 0;
                else if (mer === 'pm' && h < 12)
                    hour24 = h + 12;
                console.log('[DateTimePicker] Converted to 24-hour:', {
                    h,
                    mer,
                    hour24,
                });
                newDate.setHours(hour24);
            }
            else {
                console.log('[DateTimePicker] Skipping hour update - h or mer is null:', {
                    h,
                    mer,
                });
            }
            if (m !== null) {
                newDate.setMinutes(m);
            }
            else {
                console.log('[DateTimePicker] Skipping minute update - m is null');
            }
            newDate.setSeconds(0);
        }
        const finalISO = dayjs(newDate).tz(timezone).toISOString();
        console.log('[DateTimePicker] Final ISO string to emit:', {
            newDate: newDate.toISOString(),
            timezone,
            finalISO,
        });
        onChange?.(finalISO);
    };
    const handleClear = () => {
        setSelectedDate('');
        setHour12(null);
        setHour24(null);
        setMinute(null);
        setSecond(null);
        setMeridiem(null);
        onChange?.(undefined);
    };
    const isISO = format === 'iso-date-time';
    // Normalize startTime to ignore milliseconds
    const normalizedStartTime = startTime
        ? dayjs(startTime).tz(timezone).millisecond(0).toISOString()
        : undefined;
    // Determine minDate: prioritize explicit minDate prop, then fall back to startTime
    const effectiveMinDate = minDate
        ? minDate
        : normalizedStartTime && dayjs(normalizedStartTime).tz(timezone).isValid()
            ? dayjs(normalizedStartTime).tz(timezone).startOf('day').toDate()
            : undefined;
    // Log current state before render
    useEffect(() => {
        console.log('[DateTimePicker] Current state before render:', {
            isISO,
            hour12,
            minute,
            meridiem,
            hour24,
            second,
            selectedDate,
            normalizedStartTime,
            timezone,
        });
    }, [
        isISO,
        hour12,
        minute,
        meridiem,
        hour24,
        second,
        selectedDate,
        normalizedStartTime,
        timezone,
    ]);
    // Compute display text from current state
    const displayText = useMemo(() => {
        if (!selectedDate)
            return null;
        const dateObj = dayjs.tz(selectedDate, timezone);
        if (!dateObj.isValid())
            return null;
        if (isISO) {
            // For ISO format, use hour24, minute, second
            if (hour24 === null || minute === null)
                return null;
            const dateTimeObj = dateObj
                .hour(hour24)
                .minute(minute)
                .second(second ?? 0);
            return dateTimeObj.format(showSeconds ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm');
        }
        else {
            // For 12-hour format, use hour12, minute, meridiem
            if (hour12 === null || minute === null || meridiem === null)
                return null;
            // Convert to 24-hour format for dayjs
            let hour24Value = hour12;
            if (meridiem === 'am' && hour12 === 12)
                hour24Value = 0;
            else if (meridiem === 'pm' && hour12 < 12)
                hour24Value = hour12 + 12;
            const dateTimeObj = dateObj.hour(hour24Value).minute(minute).second(0);
            return dateTimeObj.format('YYYY-MM-DD hh:mm A');
        }
    }, [
        selectedDate,
        isISO,
        hour12,
        minute,
        meridiem,
        hour24,
        second,
        showSeconds,
        timezone,
    ]);
    const timezoneOffset = useMemo(() => {
        if (!selectedDate)
            return null;
        const dateObj = dayjs.tz(selectedDate, timezone);
        return dateObj.isValid() ? dateObj.format('Z') : null;
    }, [selectedDate, timezone]);
    return (jsxs(Flex, { direction: "column", gap: 4, children: [jsx(DatePickerInput, { value: selectedDate || undefined, onChange: (date) => {
                    if (date) {
                        handleDateChange(date);
                    }
                    else {
                        setSelectedDate('');
                        onChange?.(undefined);
                    }
                }, placeholder: "Select a date", dateFormat: "YYYY-MM-DD", displayFormat: "YYYY-MM-DD", labels: labels, timezone: timezone, minDate: effectiveMinDate, maxDate: maxDate, monthsToDisplay: 1, readOnly: true }), jsxs(Grid, { templateColumns: "1fr auto", alignItems: "center", gap: 4, children: [isISO ? (jsx(IsoTimePicker, { hour: hour24, setHour: setHour24, minute: minute, setMinute: setMinute, second: showSeconds ? second : null, setSecond: showSeconds ? setSecond : () => { }, onChange: handleTimeChange, startTime: normalizedStartTime, selectedDate: selectedDate, timezone: timezone, portalled: portalled, labels: timePickerLabels })) : (jsx(TimePicker$1, { hour: hour12, setHour: setHour12, minute: minute, setMinute: setMinute, meridiem: meridiem, setMeridiem: setMeridiem, onChange: handleTimeChange, startTime: normalizedStartTime, selectedDate: selectedDate, timezone: timezone, portalled: portalled, labels: timePickerLabels })), jsx(Button$1, { onClick: handleClear, size: "sm", variant: "outline", colorScheme: "red", children: jsx(Icon, { as: FaTrash }) })] }), displayText && (jsxs(Flex, { gap: 2, children: [jsx(Text, { fontSize: "sm", color: { base: 'gray.600', _dark: 'gray.600' }, children: displayText }), timezoneOffset && (jsx(Text, { fontSize: "sm", color: { base: 'gray.600', _dark: 'gray.600' }, children: timezoneOffset })), jsx(Text, { fontSize: "sm", color: { base: 'gray.600', _dark: 'gray.600' }, children: timezone })] }))] }));
}

dayjs.extend(utc);
dayjs.extend(timezone);
const DateTimePicker = ({ column, schema, prefix, }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
    const { timezone, dateTimePickerLabels, timePickerLabels, insideDialog } = useSchemaContext();
    const formI18n = useFormI18n(column, prefix, schema);
    const { required, gridColumn = 'span 12', gridRow = 'span 1', displayDateFormat = 'YYYY-MM-DD HH:mm:ss', 
    // with timezone
    dateFormat = 'YYYY-MM-DD[T]HH:mm:ssZ', } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = formI18n.colLabel;
    const [open, setOpen] = useState(false);
    const selectedDate = watch(colLabel);
    const displayDate = selectedDate && dayjs(selectedDate).tz(timezone).isValid()
        ? dayjs(selectedDate).tz(timezone).format(displayDateFormat)
        : '';
    const dateTimePickerLabelsConfig = {
        monthNamesShort: dateTimePickerLabels?.monthNamesShort ?? [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        weekdayNamesShort: dateTimePickerLabels?.weekdayNamesShort ?? [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
        ],
        backButtonLabel: dateTimePickerLabels?.backButtonLabel ?? 'Back',
        forwardButtonLabel: dateTimePickerLabels?.forwardButtonLabel ?? 'Forward',
    };
    const dateTimePickerContent = (jsx(DateTimePicker$1, { value: selectedDate, onChange: (date) => {
            if (!date || date === null || date === undefined) {
                setValue(colLabel, undefined);
                return;
            }
            const dateObj = dayjs(date).tz(timezone);
            if (dateObj.isValid()) {
                setValue(colLabel, dateObj.format(dateFormat));
            }
            else {
                setValue(colLabel, undefined);
            }
        }, timezone: timezone, labels: dateTimePickerLabelsConfig, timePickerLabels: timePickerLabels }));
    return (jsx(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: errors[`${colLabel}`] ? formI18n.required() : undefined, invalid: !!errors[colLabel], children: jsxs(Popover.Root, { open: open, onOpenChange: (e) => setOpen(e.open), closeOnInteractOutside: true, autoFocus: false, children: [jsx(Popover.Trigger, { asChild: true, children: jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
                            setOpen(true);
                        }, justifyContent: 'start', children: [jsx(MdDateRange, {}), displayDate || ''] }) }), insideDialog ? (jsx(Popover.Positioner, { children: jsx(Popover.Content, { width: "fit-content", minW: "450px", minH: "25rem", children: jsx(Popover.Body, { children: dateTimePickerContent }) }) })) : (jsx(Portal, { children: jsx(Popover.Positioner, { children: jsx(Popover.Content, { width: "fit-content", minW: "450px", minH: "25rem", children: jsx(Popover.Body, { children: dateTimePickerContent }) }) }) }))] }) }));
};

const SchemaRenderer = ({ schema, prefix, column, }) => {
    const colSchema = schema;
    const { type, variant, properties: innerProperties, foreign_key, format, items, } = schema;
    if (variant === 'custom-input') {
        return jsx(CustomInput, { schema: colSchema, prefix, column });
    }
    if (type === 'string') {
        if ((schema.enum ?? []).length > 0) {
            return jsx(EnumPicker, { schema: colSchema, prefix, column });
        }
        if (variant === 'id-picker') {
            idPickerSanityCheck(column, foreign_key);
            return jsx(IdPickerSingle, { schema: colSchema, prefix, column });
        }
        if (format === 'date') {
            return jsx(DatePicker, { schema: colSchema, prefix, column });
        }
        if (format === 'time') {
            return jsx(TimePicker, { schema: colSchema, prefix, column });
        }
        if (format === 'date-time') {
            return jsx(DateTimePicker, { schema: colSchema, prefix, column });
        }
        if (variant === 'text-area') {
            return jsx(TextAreaInput, { schema: colSchema, prefix, column });
        }
        if (variant === 'media-library-browser') {
            return (jsx(FormMediaLibraryBrowser, { schema: colSchema, prefix, column }));
        }
        return jsx(StringInputField, { schema: colSchema, prefix, column });
    }
    if (type === 'number' || type === 'integer') {
        return jsx(NumberInputField, { schema: colSchema, prefix, column });
    }
    if (type === 'boolean') {
        return jsx(BooleanPicker, { schema: colSchema, prefix, column });
    }
    if (type === 'object') {
        if (innerProperties) {
            return jsx(ObjectInput, { schema: colSchema, prefix, column });
        }
        return jsx(RecordInput, { schema: colSchema, prefix, column });
    }
    if (type === 'array') {
        if (variant === 'id-picker') {
            idPickerSanityCheck(column, foreign_key);
            return jsx(IdPickerMultiple, { schema: colSchema, prefix, column });
        }
        if (variant === 'tag-picker') {
            return jsx(TagPicker, { schema: colSchema, prefix, column });
        }
        if (variant === 'file-picker') {
            return jsx(FilePicker, { schema: colSchema, prefix, column });
        }
        if (variant === 'media-library-browser') {
            return (jsx(FormMediaLibraryBrowser, { schema: colSchema, prefix, column }));
        }
        if (variant === 'date-range') {
            return jsx(DateRangePicker, { schema: colSchema, prefix, column });
        }
        if (variant === 'enum-picker') {
            const { items } = colSchema;
            const { enum: enumItems } = items;
            const enumSchema = {
                type: 'string',
                enum: enumItems,
            };
            return (jsx(EnumPicker, { isMultiple: true, schema: enumSchema, prefix, column }));
        }
        if (items) {
            return jsx(ArrayRenderer, { schema: colSchema, prefix, column });
        }
        return jsx(Text, { children: `array ${column}` });
    }
    if (type === 'null') {
        return jsx(Text, { children: `null ${column}` });
    }
    return jsx(Text, { children: "missing type" });
};

const ColumnRenderer = ({ column, properties, prefix, parentRequired, }) => {
    const colSchema = properties[column];
    const colLabel = `${prefix}${column}`;
    if (colSchema === undefined) {
        throw new Error(`${colLabel} does not exist when using ColumnRenderer`);
    }
    // Merge parent's required array with the schema's required array
    const schemaWithRequired = {
        ...colSchema,
        required: parentRequired || colSchema.required,
    };
    return jsx(SchemaRenderer, { schema: schemaWithRequired, prefix, column });
};

const ArrayViewer = ({ schema, column, prefix }) => {
    const { gridColumn = 'span 12', gridRow = 'span 1', required, items, } = schema;
    const colLabel = `${prefix}${column}`;
    const isRequired = required?.some((columnId) => columnId === column);
    const formI18n = useFormI18n(column, prefix, schema);
    const { watch, formState: { errors }, } = useFormContext();
    const values = watch(colLabel) ?? [];
    return (jsxs(Box, { gridRow, gridColumn, children: [jsxs(Box, { as: "label", gridColumn: '1/span12', children: [formI18n.label(), isRequired && jsx("span", { children: "*" })] }), jsx(Flex, { flexFlow: 'column', gap: 1, children: values.map((field, index) => (jsx(Flex, { flexFlow: 'column', bgColor: { base: 'colorPalette.100', _dark: 'colorPalette.900' }, p: '2', borderRadius: 'md', borderWidth: 'thin', borderColor: {
                        base: 'colorPalette.200',
                        _dark: 'colorPalette.800',
                    }, children: jsx(Grid, { gap: "4", gridTemplateColumns: 'repeat(12, 1fr)', autoFlow: 'row', children: jsx(SchemaViewer, { column: `${index}`,
                            prefix: `${colLabel}.`,
                            // @ts-expect-error find suitable types
                            schema: { showLabel: false, ...(items ?? {}) } }) }) }, `form-${prefix}${column}.${index}`))) }), errors[`${column}`] && (jsx(Text, { color: 'red.400', children: formI18n.required() }))] }));
};

const BooleanViewer = ({ schema, column, prefix, }) => {
    const { watch, formState: { errors }, } = useFormContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const value = watch(colLabel);
    const formI18n = useFormI18n(column, prefix, schema);
    return (jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, children: [jsx(Text, { children: value ? formI18n.t('true') : formI18n.t('false') }), errors[`${column}`] && (jsx(Text, { color: 'red.400', children: formI18n.required() }))] }));
};

const CustomViewer = ({ column, schema, prefix }) => {
    const formContext = useFormContext();
    const { inputViewerRender } = schema;
    return (inputViewerRender &&
        inputViewerRender({
            column,
            schema,
            prefix,
            formContext,
        }));
};

const DateViewer = ({ column, schema, prefix }) => {
    const { watch, formState: { errors }, } = useFormContext();
    const { timezone } = useSchemaContext();
    const { required, gridColumn = 'span 4', gridRow = 'span 1', displayDateFormat = 'YYYY-MM-DD', } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const selectedDate = watch(colLabel);
    const formI18n = useFormI18n(column, prefix, schema);
    const displayDate = dayjs(selectedDate)
        .tz(timezone)
        .format(displayDateFormat);
    return (jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, children: [jsxs(Text, { children: [" ", selectedDate !== undefined ? displayDate : ''] }), errors[`${column}`] && (jsx(Text, { color: 'red.400', children: formI18n.required() }))] }));
};

const EnumViewer = ({ column, isMultiple = false, schema, prefix, }) => {
    const { watch, formState: { errors }, } = useFormContext();
    const formI18n = useFormI18n(column, prefix, schema);
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const { gridColumn = 'span 12', gridRow = 'span 1', renderDisplay } = schema;
    const colLabel = formI18n.colLabel;
    const watchEnum = watch(colLabel);
    const watchEnums = (watch(colLabel) ?? []);
    return (jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, children: [isMultiple && (jsx(Flex, { flexFlow: 'wrap', gap: 1, children: watchEnums.map((enumValue) => {
                    const item = enumValue;
                    if (item === undefined) {
                        return jsx(Fragment, { children: "undefined" });
                    }
                    return (jsx(Tag, { size: "lg", children: !!renderDisplay === true
                            ? renderDisplay(item)
                            : formI18n.t(item) }, item));
                }) })), !isMultiple && jsx(Text, { children: formI18n.t(watchEnum) }), errors[`${column}`] && (jsx(Text, { color: 'red.400', children: formI18n.required() }))] }));
};

const FileViewer = ({ column, schema, prefix }) => {
    const { watch } = useFormContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1', } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const currentFiles = (watch(column) ?? []);
    const formI18n = useFormI18n(column, prefix, schema);
    return (jsx(Field, { label: formI18n.label(), required: isRequired, gridColumn: gridColumn, gridRow: gridRow, display: 'grid', gridTemplateRows: 'auto 1fr auto', alignItems: 'stretch', children: jsx(Flex, { flexFlow: 'column', gap: 1, children: currentFiles.map((file) => {
                return (jsx(Card.Root, { variant: 'subtle', children: jsxs(Card.Body, { gap: "2", display: 'flex', flexFlow: 'row', alignItems: 'center', padding: '2', children: [file.type.startsWith('image/') && (jsx(Image, { src: URL.createObjectURL(file), alt: file.name, boxSize: "50px", objectFit: "cover", borderRadius: "md", marginRight: "2" })), jsx(Box, { children: file.name })] }) }, file.name));
            }) }) }));
};

const IdViewer = ({ column, schema, prefix, isMultiple = false, }) => {
    const { watch, formState: { errors }, } = useFormContext();
    const { idMap, idPickerLabels, formButtonLabels } = useSchemaContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1', renderDisplay, foreign_key, } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const formI18n = useFormI18n(column, prefix, schema);
    const colLabel = `${prefix}${column}`;
    const watchId = watch(colLabel);
    const watchIds = (watch(colLabel) ?? []);
    const getPickedValue = () => {
        if (Object.keys(idMap).length <= 0) {
            return '';
        }
        const record = idMap[watchId];
        if (record === undefined) {
            return '';
        }
        const rendered = renderDisplay
            ? renderDisplay(record)
            : defaultRenderDisplay(record);
        return typeof rendered === 'string' ? rendered : JSON.stringify(record);
    };
    return (jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, children: [isMultiple && (jsx(Flex, { flexFlow: 'wrap', gap: 1, children: watchIds.map((id) => {
                    const item = idMap[id];
                    if (item === undefined) {
                        return (jsx(Text, { children: idPickerLabels?.undefined ?? 'Undefined' }, id));
                    }
                    return (jsx(Tag, { closable: true, children: renderDisplay
                            ? renderDisplay(item)
                            : defaultRenderDisplay(item) }, id));
                }) })), !isMultiple && jsx(Text, { children: getPickedValue() }), errors[`${colLabel}`] && (jsx(Text, { color: 'red.400', children: formButtonLabels?.fieldRequired ?? formI18n.required() }))] }));
};

const NumberViewer = ({ schema, column, prefix, }) => {
    const { watch, formState: { errors }, } = useFormContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const value = watch(colLabel);
    const formI18n = useFormI18n(column, prefix, schema);
    // Format the value for display if formatOptions are provided
    const formatValue = (val) => {
        if (val === undefined || val === null || val === '')
            return '';
        const numValue = typeof val === 'string' ? parseFloat(val) : val;
        if (isNaN(numValue))
            return String(val);
        // Use formatOptions if available, otherwise display as-is
        if (schema.formatOptions) {
            try {
                return new Intl.NumberFormat(undefined, schema.formatOptions).format(numValue);
            }
            catch {
                return String(val);
            }
        }
        return String(val);
    };
    return (jsxs(Field, { label: formI18n.label(), required: isRequired, gridColumn, gridRow, children: [jsx(Text, { children: formatValue(value) }), errors[`${column}`] && (jsx(Text, { color: 'red.400', children: formI18n.required() }))] }));
};

const ObjectViewer = ({ schema, column, prefix }) => {
    const { properties, gridColumn = 'span 12', gridRow = 'span 1', required, showLabel = true, } = schema;
    const colLabel = `${prefix}${column}`;
    const isRequired = required?.some((columnId) => columnId === column);
    const formI18n = useFormI18n(column, prefix, schema);
    const { formState: { errors }, } = useFormContext();
    if (properties === undefined) {
        throw new Error(`properties is undefined when using ObjectInput`);
    }
    return (jsxs(Box, { gridRow, gridColumn, children: [showLabel && (jsxs(Box, { as: "label", children: [formI18n.label(), isRequired && jsx("span", { children: "*" })] })), jsx(Grid, { gap: "4", padding: '4', gridTemplateColumns: 'repeat(12, 1fr)', autoFlow: 'row', bgColor: { base: 'colorPalette.100', _dark: 'colorPalette.900' }, p: '1', borderRadius: 'md', borderWidth: 'thin', borderColor: {
                    base: 'colorPalette.200',
                    _dark: 'colorPalette.800',
                }, children: Object.keys(properties ?? {}).map((key) => {
                    return (
                    // @ts-expect-error find suitable types
                    jsx(ColumnViewer, { column: `${key}`,
                        prefix: `${prefix}${column}.`,
                        properties }, `form-objectviewer-${colLabel}-${key}`));
                }) }), errors[`${column}`] && (jsx(Text, { color: 'red.400', children: formI18n.required() }))] }));
};

const RecordViewer = ({ column, schema, prefix }) => {
    const { formState: { errors }, getValues, } = useFormContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const entries = Object.entries(getValues(column) ?? {});
    const formI18n = useFormI18n(column, prefix, schema);
    return (jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn, gridRow, children: [entries.length === 0 ? (jsx(Text, { color: "gray.500", children: "No entries" })) : (jsx(Grid, { templateColumns: '1fr 1fr', gap: 2, children: entries.map(([key, value]) => {
                    return (jsxs(Grid, { templateColumns: '1fr 1fr', gap: 2, children: [jsxs(Text, { fontWeight: "medium", children: [key, ":"] }), jsx(Text, { children: String(value ?? '') })] }, key));
                }) })), errors[`${column}`] && (jsx(Text, { color: 'red.400', children: formI18n.required() }))] }));
};

const StringViewer = ({ column, schema, prefix, }) => {
    const { watch, formState: { errors }, } = useFormContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const value = watch(colLabel);
    const formI18n = useFormI18n(column, prefix, schema);
    return (jsx(Fragment, { children: jsxs(Field, { label: formI18n.label(), required: isRequired, gridColumn: gridColumn ?? 'span 4', gridRow: gridRow ?? 'span 1', children: [jsx(Text, { children: value }), errors[colLabel] && (jsx(Text, { color: 'red.400', children: formI18n.required() }))] }) }));
};

const TagViewer = ({ column, schema, prefix }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
    if (schema.properties == undefined) {
        throw new Error('schema properties undefined when using DatePicker');
    }
    const { gridColumn, gridRow, in_table, object_id_column, tagPicker } = schema;
    if (in_table === undefined) {
        throw new Error('in_table is undefined when using TagPicker');
    }
    if (object_id_column === undefined) {
        throw new Error('object_id_column is undefined when using TagPicker');
    }
    if (!tagPicker?.queryFn) {
        throw new Error('tagPicker.queryFn is required in schema. serverUrl has been removed.');
    }
    const query = useQuery({
        queryKey: [`tagpicker`, in_table],
        queryFn: async () => {
            const result = await tagPicker.queryFn({
                in_table: 'tables_tags_view',
                where: [
                    {
                        id: 'table_name',
                        value: [in_table],
                    },
                ],
                limit: 100,
                offset: 0,
                searching: '',
            });
            return result.data || { data: [] };
        },
        staleTime: 10000,
    });
    const object_id = watch(object_id_column);
    const existingTagsQuery = useQuery({
        queryKey: [`existing`, { in_table, object_id_column }, object_id],
        queryFn: async () => {
            const result = await tagPicker.queryFn({
                in_table: in_table,
                where: [
                    {
                        id: object_id_column,
                        value: [object_id[0]],
                    },
                ],
                limit: 100,
                offset: 0,
                searching: '',
            });
            return result.data || { data: [] };
        },
        enabled: object_id != undefined,
        staleTime: 10000,
    });
    const { isLoading, isFetching, data, isPending, isError } = query;
    const dataList = data?.data ?? [];
    const existingTagList = existingTagsQuery.data?.data ?? [];
    if (!!object_id === false) {
        return jsx(Fragment, {});
    }
    return (jsxs(Flex, { flexFlow: 'column', gap: 4, gridColumn,
        gridRow, children: [isFetching && jsx(Fragment, { children: "isFetching" }), isLoading && jsx(Fragment, { children: "isLoading" }), isPending && jsx(Fragment, { children: "isPending" }), isError && jsx(Fragment, { children: "isError" }), dataList.map(({ parent_tag_name, all_tags, is_mutually_exclusive }) => {
                return (jsxs(Flex, { flexFlow: 'column', gap: 2, children: [jsx(Text, { children: parent_tag_name }), is_mutually_exclusive && (jsx(RadioCardRoot, { defaultValue: "next", variant: 'surface', onValueChange: (tagIds) => {
                                const existedTags = Object.values(all_tags)
                                    .filter(({ id }) => {
                                    return existingTagList.some(({ tag_id }) => tag_id === id);
                                })
                                    .map(({ id }) => {
                                    return id;
                                });
                                setValue(`${column}.${parent_tag_name}.current`, [
                                    tagIds.value,
                                ]);
                                setValue(`${column}.${parent_tag_name}.old`, existedTags);
                            }, children: jsx(Flex, { flexFlow: 'wrap', gap: 2, children: Object.entries(all_tags).map(([tagName, { id }]) => {
                                    if (existingTagList.some(({ tag_id }) => tag_id === id)) {
                                        return (jsx(RadioCardItem, { label: tagName, value: id, flex: '0 0 0%', disabled: true }, `${tagName}-${id}`));
                                    }
                                    return (jsx(RadioCardItem, { label: tagName, value: id, flex: '0 0 0%', colorPalette: 'blue' }, `${tagName}-${id}`));
                                }) }) })), !is_mutually_exclusive && (jsx(CheckboxGroup, { onValueChange: (tagIds) => {
                                setValue(`${column}.${parent_tag_name}.current`, tagIds);
                            }, children: jsx(Flex, { flexFlow: 'wrap', gap: 2, children: Object.entries(all_tags).map(([tagName, { id }]) => {
                                    if (existingTagList.some(({ tag_id }) => tag_id === id)) {
                                        return (jsx(CheckboxCard, { label: tagName, value: id, flex: '0 0 0%', disabled: true, colorPalette: 'blue' }, `${tagName}-${id}`));
                                    }
                                    return (jsx(CheckboxCard, { label: tagName, value: id, flex: '0 0 0%' }, `${tagName}-${id}`));
                                }) }) }))] }, `tag-${parent_tag_name}`));
            }), errors[`${column}`] && (jsx(Text, { color: 'red.400', children: (errors[`${column}`]?.message ?? 'No error message') }))] }));
};

const TextAreaViewer = ({ column, schema, prefix, }) => {
    const { watch, formState: { errors }, } = useFormContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const value = watch(colLabel);
    const formI18n = useFormI18n(column, prefix, schema);
    return (jsx(Fragment, { children: jsxs(Field, { label: formI18n.label(), required: isRequired, gridColumn: gridColumn, gridRow: gridRow, children: [jsx(Text, { whiteSpace: "pre-wrap", children: value }), ' ', errors[colLabel] && (jsx(Text, { color: 'red.400', children: formI18n.required() }))] }) }));
};

const TimeViewer = ({ column, schema, prefix }) => {
    const { watch, formState: { errors }, } = useFormContext();
    const { timezone } = useSchemaContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1', displayTimeFormat = 'hh:mm A', } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const selectedDate = watch(colLabel);
    const formI18n = useFormI18n(column, prefix, schema);
    const displayedTime = dayjs(`1970-01-01T${selectedDate}`)
        .tz(timezone)
        .isValid()
        ? dayjs(`1970-01-01T${selectedDate}`).tz(timezone).format(displayTimeFormat)
        : '';
    return (jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, children: [jsx(Text, { children: displayedTime }), errors[`${column}`] && (jsx(Text, { color: 'red.400', children: formI18n.required() }))] }));
};

const DateTimeViewer = ({ column, schema, prefix }) => {
    const { watch, formState: { errors }, } = useFormContext();
    const { timezone } = useSchemaContext();
    const { required, gridColumn = 'span 4', gridRow = 'span 1', displayDateFormat = 'YYYY-MM-DD HH:mm:ss', } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const selectedDate = watch(colLabel);
    const formI18n = useFormI18n(column, prefix, schema);
    const displayDate = dayjs(selectedDate)
        .tz(timezone)
        .format(displayDateFormat);
    return (jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, children: [jsxs(Text, { children: [" ", selectedDate !== undefined ? displayDate : ''] }), errors[`${column}`] && (jsx(Text, { color: 'red.400', children: formI18n.required() }))] }));
};

const SchemaViewer = ({ schema, prefix, column, }) => {
    const colSchema = schema;
    const { type, variant, properties: innerProperties, foreign_key, items, format, } = schema;
    if (variant === 'custom-input') {
        return jsx(CustomViewer, { schema: colSchema, prefix, column });
    }
    if (type === 'string') {
        if ((schema.enum ?? []).length > 0) {
            return jsx(EnumViewer, { schema: colSchema, prefix, column });
        }
        if (variant === 'id-picker') {
            idPickerSanityCheck(column, foreign_key);
            return jsx(IdViewer, { schema: colSchema, prefix, column });
        }
        if (format === 'time') {
            return jsx(TimeViewer, { schema: colSchema, prefix, column });
        }
        if (format === 'date') {
            return jsx(DateViewer, { schema: colSchema, prefix, column });
        }
        if (format === 'date-time') {
            return jsx(DateTimeViewer, { schema: colSchema, prefix, column });
        }
        if (variant === 'text-area') {
            return jsx(TextAreaViewer, { schema: colSchema, prefix, column });
        }
        return jsx(StringViewer, { schema: colSchema, prefix, column });
    }
    if (type === 'number' || type === 'integer') {
        return jsx(NumberViewer, { schema: colSchema, prefix, column });
    }
    if (type === 'boolean') {
        return jsx(BooleanViewer, { schema: colSchema, prefix, column });
    }
    if (type === 'object') {
        if (innerProperties) {
            return jsx(ObjectViewer, { schema: colSchema, prefix, column });
        }
        return jsx(RecordViewer, { schema: colSchema, prefix, column });
    }
    if (type === 'array') {
        if (variant === 'id-picker') {
            idPickerSanityCheck(column, foreign_key);
            return (jsx(IdViewer, { schema: colSchema, prefix, column, isMultiple: true }));
        }
        if (variant === 'tag-picker') {
            return jsx(TagViewer, { schema: colSchema, prefix, column });
        }
        if (variant === 'file-picker') {
            return jsx(FileViewer, { schema: colSchema, prefix, column });
        }
        if (variant === 'media-library-browser') {
            return jsx(FileViewer, { schema: colSchema, prefix, column });
        }
        if (variant === 'enum-picker') {
            const { items } = schema;
            const { enum: enumItems } = items;
            const enumSchema = {
                type: 'string',
                enum: enumItems,
            };
            return (jsx(EnumViewer, { isMultiple: true, schema: enumSchema, prefix, column }));
        }
        if (items) {
            return jsx(ArrayViewer, { schema: colSchema, prefix, column });
        }
        return jsx(Text, { children: `array ${column}` });
    }
    if (type === 'null') {
        return jsx(Text, { children: `null ${column}` });
    }
    return jsx(Text, { children: "missing type" });
};

const ColumnViewer = ({ column, properties, prefix, }) => {
    if (properties === undefined) {
        return jsx(Fragment, {});
    }
    const colSchema = properties[column];
    if (colSchema === undefined) {
        throw new Error(`${column} does not exist when using ColumnRenderer`);
    }
    return jsx(SchemaViewer, { schema: colSchema, prefix, column });
};

const SubmitButton = () => {
    const { setValidatedData, setIsError, setIsConfirming, requireConfirmation, onFormSubmit, formButtonLabels, } = useSchemaContext();
    const methods = useFormContext();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onValid = (data) => {
        // const { isValid, errors } = validateData(data, schema);
        // if (!isValid) {
        //   setError({
        //     type: 'validation',
        //     errors,
        //   });
        //   setIsError(true);
        //   return;
        // }
        // If validation passes, check if confirmation is required
        if (requireConfirmation) {
            // Show confirmation (existing behavior)
            setValidatedData(data);
            setIsError(false);
            setIsConfirming(true);
        }
        else {
            // Skip confirmation and submit directly
            setValidatedData(data);
            setIsError(false);
            onFormSubmit(data);
        }
    };
    return (jsx(Button$1, { onClick: () => {
            methods.handleSubmit(onValid)();
        }, formNoValidate: true, children: formButtonLabels?.submit ?? 'Submit' }));
};

const FormBody = () => {
    const { schema, order, ignore, include, isError, isSubmiting, isConfirming, setIsConfirming, validatedData, error, customErrorRenderer, displayConfig, onFormSubmit, formButtonLabels, } = useSchemaContext();
    const { showSubmitButton, showResetButton } = displayConfig;
    const methods = useFormContext();
    const { properties } = schema;
    const renderColumns = ({ order, keys, ignore, include, }) => {
        const included = include.length > 0 ? include : keys;
        const not_exist = included.filter((columnA) => !order.some((columnB) => columnA === columnB));
        const ordered = [...order, ...not_exist];
        const ignored = ordered.filter((column) => !ignore.some((shouldIgnore) => column === shouldIgnore));
        return ignored;
    };
    const ordered = renderColumns({
        order,
        keys: Object.keys(properties),
        ignore,
        include,
    });
    if (isConfirming) {
        return (jsxs(Flex, { flexFlow: 'column', gap: "2", children: [jsx(Grid, { gap: 4, gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'repeat(12, max-content)', autoFlow: 'row', children: ordered.map((column) => {
                        return (jsx(ColumnViewer
                        // @ts-expect-error find suitable types
                        , { 
                            // @ts-expect-error find suitable types
                            properties: properties, prefix: ``, column }, `form-viewer-${column}`));
                    }) }), jsxs(Flex, { justifyContent: 'end', gap: '2', children: [jsx(Button$1, { onClick: () => {
                                setIsConfirming(false);
                            }, variant: 'subtle', children: formButtonLabels?.cancel ?? 'Cancel' }), jsx(Button$1, { onClick: () => {
                                onFormSubmit(validatedData);
                            }, children: formButtonLabels?.confirm ?? 'Confirm' })] }), isSubmiting && (jsx(Box, { pos: "absolute", inset: "0", bg: "bg/80", children: jsx(Center, { h: "full", children: jsx(Spinner, { color: "teal.500" }) }) })), isError && customErrorRenderer && customErrorRenderer(error)] }));
    }
    return (jsxs(Flex, { flexFlow: 'column', gap: "2", children: [jsx(Grid, { gap: "4", gridTemplateColumns: 'repeat(12, 1fr)', autoFlow: 'row', children: ordered.map((column) => {
                    return (jsx(ColumnRenderer
                    // @ts-expect-error find suitable types
                    , { 
                        // @ts-expect-error find suitable types
                        properties: properties, prefix: ``, parentRequired: schema.required, column }, `form-input-${column}`));
                }) }), jsxs(Flex, { justifyContent: 'end', gap: "2", children: [showResetButton && (jsx(Button$1, { onClick: () => {
                            methods.reset();
                        }, variant: 'subtle', children: formButtonLabels?.reset ?? 'Reset' })), showSubmitButton && jsx(SubmitButton, {})] }), isError && customErrorRenderer && customErrorRenderer(error)] }));
};

const FormTitle = () => {
    const { schema } = useSchemaContext();
    // Debug log when form title is missing
    if (!schema.title) {
        console.debug('[Form Title] Missing title in root schema. Add title property to schema.', {
            schema: {
                type: schema.type,
                properties: schema.properties
                    ? Object.keys(schema.properties)
                    : undefined,
            },
        });
    }
    return jsx(Heading, { children: schema.title ?? 'Form' });
};

const DefaultForm = ({ formConfig, }) => {
    const { showTitle } = formConfig.displayConfig ?? {};
    return (jsx(FormRoot, { ...formConfig, children: jsxs(Grid, { gap: "2", children: [showTitle && jsx(FormTitle, {}), jsx(FormBody, {})] }) }));
};

const useForm = ({ preLoadedValues, keyPrefix: _keyPrefix, // Deprecated: kept for backward compatibility
namespace: _namespace, // Deprecated: kept for backward compatibility
schema, }) => {
    const form = useForm$1({
        values: preLoadedValues,
        resolver: schema ? ajvResolver(schema) : undefined,
        mode: 'onBlur',
        reValidateMode: 'onBlur',
    });
    const [idMap, setIdMap] = useState({});
    // Fallback translate object - returns key as-is (no i18n required)
    const translate = {
        t: (key) => key,
        ready: true,
    };
    return {
        form,
        idMap,
        setIdMap,
        translate, // Components prefer label objects over translate
    };
};

/**
 * Type definitions for error message configuration
 */
/**
 * Schema-level error message builder
 *
 * Builds a complete errorMessage object compatible with ajv-errors plugin.
 * Supports both i18n translation keys and plain string messages.
 *
 * @param config - Error message configuration
 * @returns Complete errorMessage object for JSON Schema
 *
 * @example
 * ```typescript
 * // Simple required field errors
 * const errorMessage = buildErrorMessages({
 *   required: {
 *     username: "Username is required",
 *     email: "user.email.field_required" // i18n key
 *   }
 * });
 *
 * // With validation rules
 * const errorMessage = buildErrorMessages({
 *   required: {
 *     password: "Password is required"
 *   },
 *   properties: {
 *     password: {
 *       minLength: "Password must be at least 8 characters",
 *       pattern: "Password must contain letters and numbers"
 *     },
 *     age: {
 *       minimum: "Must be 18 or older",
 *       maximum: "Must be under 120"
 *     }
 *   }
 * });
 *
 * // With global fallbacks
 * const errorMessage = buildErrorMessages({
 *   required: {
 *     email: "Email is required"
 *   },
 *   minLength: "This field is too short", // applies to all fields
 *   minimum: "Value is too small"
 * });
 * ```
 */
const buildErrorMessages = (config) => {
    const result = {};
    // Add required field errors
    if (config.required && Object.keys(config.required).length > 0) {
        result.required = config.required;
    }
    // Add field-specific validation errors
    if (config.properties && Object.keys(config.properties).length > 0) {
        result.properties = config.properties;
    }
    // Add global fallback error messages
    const globalKeys = [
        'minLength',
        'maxLength',
        'pattern',
        'minimum',
        'maximum',
        'multipleOf',
        'format',
        'type',
        'enum',
    ];
    globalKeys.forEach((key) => {
        if (config[key]) {
            result[key] = config[key];
        }
    });
    return result;
};
/**
 * Converts buildErrorMessages result to ajv-errors compatible format
 */
const convertToAjvErrorsFormat = (errorMessages) => {
    const result = {};
    // Convert required field errors
    if (errorMessages.required) {
        result.required = errorMessages.required;
    }
    // Convert properties errors to ajv-errors format
    if (errorMessages.properties) {
        result.properties = {};
        Object.keys(errorMessages.properties).forEach((fieldName) => {
            const fieldErrors = errorMessages.properties[fieldName];
            result.properties[fieldName] = {};
            Object.keys(fieldErrors).forEach((keyword) => {
                result.properties[fieldName][keyword] =
                    fieldErrors[keyword];
            });
        });
    }
    // Add global fallback errors
    const globalKeys = [
        'minLength',
        'maxLength',
        'pattern',
        'minimum',
        'maximum',
        'multipleOf',
        'format',
        'type',
        'enum',
    ];
    globalKeys.forEach((key) => {
        if (errorMessages[key]) {
            result[key] = errorMessages[key];
        }
    });
    return result;
};
/**
 * Helper function to build required field errors
 *
 * Simplifies creating required field error messages, especially useful
 * for generating i18n translation keys following a pattern.
 *
 * @param fields - Array of required field names
 * @param messageOrGenerator - Either a string template or function to generate messages
 * @returns Required field error configuration
 *
 * @example
 * ```typescript
 * // Plain string messages
 * const required = buildRequiredErrors(
 *   ["username", "email", "password"],
 *   (field) => `${field} is required`
 * );
 * // Result: { username: "username is required", email: "email is required", ... }
 *
 * // i18n translation keys
 * const required = buildRequiredErrors(
 *   ["username", "email"],
 *   (field) => `user.${field}.field_required`
 * );
 * // Result: { username: "user.username.field_required", email: "user.email.field_required" }
 *
 * // Same message for all fields
 * const required = buildRequiredErrors(
 *   ["username", "email"],
 *   "This field is required"
 * );
 * // Result: { username: "This field is required", email: "This field is required" }
 *
 * // With keyPrefix for i18n
 * const required = buildRequiredErrors(
 *   ["username", "email"],
 *   (field) => `${field}.field_required`,
 *   "user"
 * );
 * // Result: { username: "user.username.field_required", email: "user.email.field_required" }
 * ```
 */
const buildRequiredErrors = (fields, messageOrGenerator, keyPrefix = '') => {
    const result = {};
    fields.forEach((field) => {
        if (typeof messageOrGenerator === 'function') {
            const message = messageOrGenerator(field);
            result[field] = keyPrefix ? `${keyPrefix}.${message}` : message;
        }
        else {
            result[field] = messageOrGenerator;
        }
    });
    return result;
};
/**
 * Helper function to build field-specific validation errors
 *
 * Creates property-specific error messages for multiple fields at once.
 *
 * @param config - Maps field names to their validation error configurations
 * @returns Properties error configuration
 *
 * @example
 * ```typescript
 * const properties = buildFieldErrors({
 *   username: {
 *     minLength: "Username must be at least 3 characters",
 *     pattern: "Username can only contain letters and numbers"
 *   },
 *   age: {
 *     minimum: "Must be 18 or older",
 *     maximum: "Must be under 120"
 *   },
 *   email: {
 *     format: "Please enter a valid email address"
 *   }
 * });
 * ```
 */
const buildFieldErrors = (config) => {
    return config;
};
/**
 * Helper function to create a complete error message configuration in one call
 *
 * Convenient wrapper that combines required and validation errors.
 *
 * @param required - Required field error messages
 * @param properties - Field-specific validation error messages
 * @param globalFallbacks - Global fallback error messages
 * @returns Complete error message configuration
 *
 * @example
 * ```typescript
 * const errorMessage = createErrorMessage(
 *   {
 *     username: "Username is required",
 *     email: "Email is required"
 *   },
 *   {
 *     username: {
 *       minLength: "Username must be at least 3 characters"
 *     },
 *     email: {
 *       format: "Please enter a valid email"
 *     }
 *   },
 *   {
 *     minLength: "This field is too short",
 *     format: "Invalid format"
 *   }
 * );
 * ```
 */
const createErrorMessage = (required, properties, globalFallbacks) => {
    const config = {
        required,
        properties,
    };
    if (globalFallbacks) {
        Object.assign(config, globalFallbacks);
    }
    return buildErrorMessages(config);
};

const getMultiDates = ({ selected, selectedDate, selectedDates, selectable, }) => {
    if (!selectable) {
        return [...selectedDates];
    }
    if (selected) {
        // Remove
        return selectedDates.filter((time) => {
            return selectedDate.getTime() !== time.getTime();
        });
    }
    else {
        // Add
        return [...selectedDates, selectedDate];
    }
};

const TableDataDisplay = ({ colorPalette, emptyComponent, }) => {
    const { columns, data } = useDataTableContext();
    const columnsMap = Object.fromEntries(columns.map((def) => {
        const { accessorKey, id } = def;
        if (accessorKey) {
            return [accessorKey, def];
        }
        return [id, def];
    }));
    const columnHeaders = Object.keys(columnsMap);
    const totalWidths = columns
        .map(({ size }) => {
        if (!!size === false) {
            return 0;
        }
        if (typeof size === 'number') {
            return size;
        }
        return 0;
    })
        .reduce((previous, current) => previous + current, 0);
    const columnWidths = columns
        .map(({ size }) => {
        if (!!size === false) {
            return '1fr';
        }
        return `minmax(${size}px, ${(size / totalWidths) * 100}%)`;
    })
        .join(' ');
    const cellProps = {
        flex: '1 0 0%',
        overflow: 'auto',
        paddingX: '2',
        py: '1',
        color: { base: 'colorPalette.900', _dark: 'colorPalette.100' },
        bgColor: { base: 'colorPalette.50', _dark: 'colorPalette.950' },
        borderBottomColor: { base: 'colorPalette.200', _dark: 'colorPalette.800' },
        borderBottomWidth: '1px',
        ...{ colorPalette },
    };
    if (data.length <= 0) {
        return jsx(Fragment, { children: emptyComponent });
    }
    return (jsxs(Grid, { templateColumns: `${columnWidths}`, overflow: 'auto', borderWidth: '1px', color: { base: 'colorPalette.900', _dark: 'colorPalette.100' }, borderColor: { base: 'colorPalette.200', _dark: 'colorPalette.800' }, colorPalette, children: [jsx(Grid, { templateColumns: `${columnWidths}`, column: `1/span ${columns.length}`, bg: { base: 'colorPalette.200', _dark: 'colorPalette.800' }, colorPalette, children: columnHeaders.map((header) => {
                    const columnDef = columnsMap[header];
                    return (jsx(Box, { flex: '1 0 0%', paddingX: '2', py: '1', overflow: 'auto', textOverflow: 'ellipsis', children: columnDef?.meta?.displayName ?? header }, `chakra-table-header-${header}`));
                }) }), data.map((record, recordIndex) => {
                return (jsx(Box, { display: "contents", children: columnHeaders.map((header) => {
                        const { cell } = columnsMap[header];
                        const value = record[header];
                        if (!!record === false) {
                            return (jsx(Box, { ...cellProps }, `chakra-table-cell-${recordIndex}-${header}`));
                        }
                        if (cell) {
                            return (jsx(Box, { ...cellProps, children: cell({ row: { original: record } }) }, `chakra-table-cell-${recordIndex}-${header}`));
                        }
                        if (typeof value === 'object') {
                            return (jsx(Box, { ...cellProps, children: jsx(RecordDisplay, { object: value }) }, `chakra-table-cell-${recordIndex}-${header}`));
                        }
                        return (jsx(Box, { ...cellProps, children: value }, `chakra-table-cell-${recordIndex}-${header}`));
                    }) }, `chakra-table-record-${recordIndex}`));
            })] }));
};

const MobileTableControls = ({ fitTableWidth = false, fitTableHeight = false, children = jsx(Fragment, {}), showGlobalFilter = false, showFilter = false, showFilterName = false, showFilterTags = false, showReload = false, showPagination = true, showPageSizeControl = true, showPageCountText = true, showView = true, filterTagsOptions = [], extraItems = jsx(Fragment, {}), loading = false, hasError = false, gridProps = {}, }) => {
    const { tableLabel, table } = useDataTableContext();
    const { hasErrorText } = tableLabel;
    return (jsxs(Grid, { templateRows: 'auto 1fr auto', width: fitTableWidth ? 'fit-content' : '100%', height: fitTableHeight ? 'fit-content' : '100%', gap: 2, padding: 2, ...gridProps, children: [jsxs(Stack, { gap: 2, children: [jsxs(Flex, { justifyContent: 'space-between', alignItems: 'center', gap: 2, children: [jsxs(Flex, { gap: 1, alignItems: 'center', children: [showView && jsx(ViewDialog, { icon: jsx(MdOutlineViewColumn, {}) }), loading && jsx(Spinner, { size: 'sm' }), hasError && (jsx(Tooltip, { content: hasErrorText, children: jsx(Icon, { as: BsExclamationCircleFill, color: 'red.400' }) }))] }), jsxs(Flex, { gap: 1, alignItems: 'center', children: [showGlobalFilter && jsx(GlobalFilter, {}), showFilter && jsx(FilterDialog, {}), showReload && jsx(ReloadButton, {}), extraItems] })] }), filterTagsOptions.length > 0 && (jsx(Stack, { gap: 2, children: filterTagsOptions.map((option) => {
                            const { column, options } = option;
                            const tableColumn = table.getColumn(column);
                            return (jsxs(Flex, { flexFlow: 'column', gap: 1, width: '100%', children: [tableColumn?.columnDef.meta?.displayName && (jsx(Text, { fontSize: 'sm', fontWeight: 'medium', children: tableColumn?.columnDef.meta?.displayName })), jsx(TagFilter, { availableTags: options, selectedTags: tableColumn?.getFilterValue() ?? [], selectOne: true, onTagChange: (tags) => {
                                            if (tags.length === 0) {
                                                return tableColumn?.setFilterValue(undefined);
                                            }
                                            tableColumn?.setFilterValue(tags);
                                        } })] }, column));
                        }) })), showFilterTags && (jsx(Box, { width: '100%', children: jsx(TableFilterTags, {}) }))] }), jsx(Box, { overflow: 'auto', width: '100%', bg: { base: 'colorPalette.50', _dark: 'colorPalette.950' }, borderRadius: 'md', padding: 1, children: children }), (showPageSizeControl || showPageCountText || showPagination) && (jsxs(Stack, { gap: 2, width: '100%', children: [(showPageSizeControl || showPageCountText) && (jsxs(Flex, { justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap', children: [showPageSizeControl && jsx(PageSizeControl, {}), showPageCountText && jsx(RowCountText, {})] })), showPagination && (jsx(Flex, { justifyContent: 'center', width: '100%', children: jsx(Pagination, {}) }))] }))] }));
};

const TableBodySkeleton = ({ showSelector = false, canResize = true, }) => {
    'use no memo';
    const { table } = useDataTableContext();
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredRow, setHoveredRow] = useState(-1);
    const handleRowHover = (index) => {
        setHoveredRow(index);
    };
    const getTdProps = (column) => {
        const tdProps = column.getIsPinned()
            ? {
                left: showSelector
                    ? `${column.getStart('left') + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
                    : `${column.getStart('left')}px`,
                position: 'relative',
            }
            : {};
        return tdProps;
    };
    const getTrProps = ({ hoveredRow, index, }) => {
        if (hoveredRow === -1) {
            return {};
        }
        if (hoveredRow === index) {
            return {
                opacity: '1',
            };
        }
        return {
            opacity: '0.8',
        };
    };
    // Get the number of skeleton rows based on current pageSize
    const pageSize = table.getState().pagination.pageSize;
    const visibleColumns = table.getVisibleLeafColumns();
    return (jsx(Table$1.Body, { children: Array.from({ length: pageSize }).map((_, rowIndex) => {
            return (jsxs(Table$1.Row, { display: 'flex', zIndex: 1, onMouseEnter: () => handleRowHover(rowIndex), onMouseLeave: () => handleRowHover(-1), ...getTrProps({ hoveredRow, index: rowIndex }), children: [showSelector && jsx(TableRowSelectorSkeleton, {}), visibleColumns.map((column, colIndex) => {
                        return (jsx(Table$1.Cell, { padding: `${table.getDensityValue()}px`, 
                            // styling resize and pinning start
                            flex: `${canResize ? '0' : '1'} 0 ${column.getSize()}px`, 
                            // this is to avoid the cell from being too wide
                            minWidth: `0`, color: {
                                base: 'colorPalette.900',
                                _dark: 'colorPalette.100',
                            },
                            bg: { base: 'colorPalette.50', _dark: 'colorPalette.950' }, ...getTdProps(column), children: jsx(Skeleton, { height: "20px", width: "80%" }) }, `chakra-table-skeleton-cell-${rowIndex}-${colIndex}`));
                    })] }, `chakra-table-skeleton-row-${rowIndex}`));
        }) }));
};
const TableRowSelectorSkeleton = () => {
    const { table } = useDataTableContext();
    const SELECTION_BOX_WIDTH = 20;
    return (jsx(Table$1.Cell, { padding: `${table.getDensityValue()}px`, display: 'grid', color: {
            base: 'colorPalette.900',
            _dark: 'colorPalette.100',
        },
        bg: { base: 'colorPalette.50', _dark: 'colorPalette.950' }, justifyItems: 'center', alignItems: 'center', children: jsx(Skeleton, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` }) }));
};

const MobileTableDisplay = ({ showSelector = false, isLoading = false, }) => {
    const { table, rowSelection, setRowSelection } = useDataTableContext();
    if (isLoading) {
        return jsx(MobileTableSkeleton, { showSelector: showSelector });
    }
    return (jsx(Stack, { gap: 4, padding: 2, children: table.getRowModel().rows.map((row) => {
            return (jsx(Card.Root, { width: "100%", children: jsxs(Card.Body, { padding: 4, children: [showSelector && (jsx(Flex, { marginBottom: 3, children: jsx(Checkbox, { checked: isRowSelected(row.id, rowSelection),
                                disabled: !canRowSelect(row),
                                onCheckedChange: createRowToggleHandler(row, rowSelection, setRowSelection) }) })), jsx(Stack, { gap: 3, children: row.getVisibleCells().map((cell) => {
                                const displayName = cell.column.columnDef.meta?.displayName ?? cell.column.id;
                                return (jsxs(Box, { children: [jsx(Text, { fontSize: "sm", fontWeight: "bold", color: { base: 'gray.600', _dark: 'gray.400' }, marginBottom: 1, children: displayName }), jsx(Box, { color: { base: 'gray.900', _dark: 'gray.100' }, fontSize: "sm", children: flexRender(cell.column.columnDef.cell, cell.getContext()) })] }, `mobile-table-cell-${cell.id}`));
                            }) })] }) }, `mobile-table-card-${row.id}`));
        }) }));
};
const MobileTableSkeleton = ({ showSelector = false, }) => {
    const { table } = useDataTableContext();
    const pageSize = table.getState().pagination.pageSize;
    const visibleColumns = table.getVisibleLeafColumns();
    return (jsx(Stack, { gap: 4, padding: 2, children: Array.from({ length: pageSize }).map((_, rowIndex) => {
            return (jsx(Card.Root, { width: "100%", children: jsxs(Card.Body, { padding: 4, children: [showSelector && (jsx(Flex, { marginBottom: 3, children: jsx(Box, { width: "20px", height: "20px", bg: { base: 'gray.200', _dark: 'gray.700' }, borderRadius: "md" }) })), jsx(Stack, { gap: 3, children: visibleColumns.map((column) => {
                                return (jsxs(Box, { children: [jsx(Box, { width: "40%", height: "16px", bg: { base: 'gray.200', _dark: 'gray.700' }, borderRadius: "sm", marginBottom: 2 }), jsx(Box, { width: "80%", height: "20px", bg: { base: 'gray.200', _dark: 'gray.700' }, borderRadius: "sm" })] }, `mobile-skeleton-cell-${column.id}`));
                            }) })] }) }, `mobile-skeleton-${rowIndex}`));
        }) }));
};

/**
 * Hook to detect if the current window width is mobile (< 768px)
 * @param breakpoint - The breakpoint in pixels to consider as mobile (default: 768)
 * @returns boolean indicating if the window is mobile
 */
const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined')
            return false;
        return window.innerWidth < breakpoint;
    });
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const handleResize = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };
        // Set initial value
        handleResize();
        // Add event listener
        window.addEventListener('resize', handleResize);
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint]);
    return isMobile;
};

const DefaultTable = ({ showFooter = false, showHeader = true, tableProps = {}, tableHeaderProps = {}, tableBodyProps = {}, tableFooterProps = {}, controlProps = {}, variant = 'greedy', isLoading = false, }) => {
    const isMobile = useIsMobile();
    // Early return for mobile display
    if (isMobile) {
        return (jsx(MobileTableControls, { ...controlProps, children: jsx(MobileTableDisplay, { showSelector: tableHeaderProps.showSelector ??
                    tableBodyProps.showSelector ??
                    false, isLoading: isLoading }) }));
    }
    const isGreedy = variant === 'greedy';
    const canResize = !isGreedy;
    const bodyComponent = isLoading ? (jsx(TableBodySkeleton, { showSelector: tableBodyProps.showSelector, canResize: canResize })) : (jsx(TableBody, { ...tableBodyProps, canResize: canResize }));
    return (jsx(TableControls, { ...controlProps, children: jsxs(Table, { canResize,
            showLoading: isLoading,
            showSelector: tableHeaderProps.showSelector ??
                tableBodyProps.showSelector ??
                false,
            ...tableProps, children: [showHeader && jsx(TableHeader, { canResize, ...tableHeaderProps }), bodyComponent, showFooter && jsx(TableFooter, { canResize, ...tableFooterProps })] }) }));
};

/**
 * DefaultTableServer is a wrapper around DefaultTable that automatically
 * detects server-side loading state from DataTableServerContext.
 *
 * Use this component when working with DataTableServer to automatically
 * show skeleton loading state during data fetching.
 *
 * @example
 * ```tsx
 * <DataTableServer columns={columns} {...datatableServer}>
 *   <DefaultTableServer />
 * </DataTableServer>
 * ```
 */
const DefaultTableServer = ({ isLoading: isLoadingOverride, ...props }) => {
    // Automatically detect loading state from server context
    const serverContext = useDataTableServerContext();
    const isLoading = isLoadingOverride ?? serverContext?.query?.isLoading ?? false;
    return jsx(DefaultTable, { ...props, isLoading: isLoading });
};

const CellRenderer = ({ cell }) => {
    const getLabel = ({ columnId }) => {
        const column = cell.column;
        return column.columnDef.meta?.displayName ?? snakeToLabel(columnId);
    };
    const formatValue = (value) => {
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'number' || typeof value === 'boolean') {
            return `${value}`;
        }
        if (value === undefined) {
            return `undefined`;
        }
        throw new Error(`value is unknown, ${typeof value}`);
    };
    const showCustomDataDisplay = cell.column.columnDef.meta?.showCustomDisplay ?? false;
    const gridColumn = cell.column.columnDef.meta?.gridColumn ?? [
        'span 12',
        'span 6',
        'span 3',
    ];
    const gridRow = cell.column.columnDef.meta?.gridRow ?? {};
    if (showCustomDataDisplay) {
        return (jsx(Flex, { gridColumn, gridRow, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id));
    }
    const value = cell.getValue();
    if (typeof value === 'object') {
        return (jsxs(Box, { gridColumn, gridRow, children: [jsx(Box, { children: getLabel({ columnId: cell.column.id }) }), jsx(RecordDisplay, { boxProps: {
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: 'gray.400',
                        paddingX: 4,
                        paddingY: 2,
                    }, object: value })] }, cell.id));
    }
    return (jsxs(Box, { gridColumn, gridRow, children: [jsx(Box, { color: 'colorPalette.400', children: getLabel({ columnId: cell.column.id }) }), jsx(Box, { wordBreak: 'break-word', textOverflow: 'ellipsis', overflow: 'hidden', children: `${formatValue(cell.getValue())}` })] }, cell.id));
};
const DataDisplay = ({ variant = '' }) => {
    const { table } = useDataTableContext();
    return (jsx(Flex, { flexFlow: 'column', gap: '1', children: table.getRowModel().rows.map((row) => {
            const rowId = row.id;
            return (jsx(Card.Root, { children: jsx(Card.Body, { display: 'grid', gap: 4, padding: 4, gridTemplateColumns: 'repeat(12, 1fr)', children: table.getAllColumns().map((column) => {
                        const childCell = row.getAllCells().find((cell) => {
                            return cell.id === `${rowId}_${column.id}`;
                        });
                        if (column.columns.length > 0) {
                            return (jsxs(Card.Root, { margin: '1', gridColumn: 'span 12', children: [jsx(Card.Header, { color: 'gray.400', children: column.columnDef.meta?.displayName ?? column.id }), jsx(Card.Body, { display: 'grid', gap: '4', gridTemplateColumns: 'repeat(12, 1fr)', children: column.columns.map((subColumn) => {
                                            if (!subColumn.getIsVisible()) {
                                                return null;
                                            }
                                            const foundCell = row
                                                .getVisibleCells()
                                                .find((cell) => {
                                                return cell.id === `${rowId}_${subColumn.id}`;
                                            });
                                            return (jsx(CellRenderer, { cell: foundCell }, `chakra-table-cell-${rowId}-${subColumn.id}`));
                                        }) })] }, `chakra-table-card-${rowId}-${column.id}`));
                        }
                        return (jsx(CellRenderer, { cell: childCell }, `chakra-table-cell-${rowId}-${column.id}`));
                    }) }) }, `chakra-table-card-${rowId}`));
        }) }));
};

// Helper function to normalize date
function normalizeDate(value) {
    if (!value)
        return null;
    if (value instanceof Date)
        return value;
    if (typeof value === 'string' || typeof value === 'number') {
        const date = dayjs(value).toDate();
        return isNaN(date.getTime()) ? null : date;
    }
    return null;
}
// Component to conditionally render event title based on available width
function ResponsiveEventTitle({ title, placeholder, minWidth, minChars, cellRef, }) {
    const [truncatedText, setTruncatedText] = useState('');
    const measureRef = useRef(null);
    useEffect(() => {
        const calculateTruncatedText = () => {
            if (!cellRef.current || !measureRef.current || !title) {
                setTruncatedText(title || 'Event');
                return;
            }
            const cellWidth = cellRef.current.clientWidth;
            // Account for padding (approximately 8px on each side)
            const availableWidth = cellWidth - 16;
            // If cell is too narrow, calculate how many characters can fit
            if (availableWidth < minWidth) {
                // Measure text width using canvas
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                if (!context) {
                    setTruncatedText(placeholder);
                    return;
                }
                // Get computed font style from the element
                const computedStyle = window.getComputedStyle(measureRef.current);
                context.font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;
                const ellipsisWidth = context.measureText('...').width;
                const maxWidth = availableWidth - ellipsisWidth;
                // Try to show at least minChars characters before ellipsis
                let truncated = '';
                let charCount = 0;
                // Calculate how many characters can fit
                for (let i = 0; i < Math.min(title.length, 50); i++) {
                    const testText = title.substring(0, i + 1);
                    const textWidth = context.measureText(testText).width;
                    if (textWidth <= maxWidth) {
                        truncated = testText;
                        charCount = i + 1;
                    }
                    else {
                        break;
                    }
                }
                // Ensure we show at least minChars characters if possible
                if (charCount < minChars && title.length >= minChars) {
                    truncated = title.substring(0, minChars);
                }
                else if (charCount === 0 && title.length >= 1) {
                    truncated = title.substring(0, 1);
                }
                // Only show ellipsis if we have at least minChars characters
                if (truncated && truncated.length >= minChars) {
                    setTruncatedText(`${truncated}...`);
                }
                else {
                    setTruncatedText(placeholder);
                }
            }
            else {
                // Full width available, show full title
                setTruncatedText(title);
            }
        };
        calculateTruncatedText();
        const resizeObserver = new ResizeObserver(calculateTruncatedText);
        if (cellRef.current) {
            resizeObserver.observe(cellRef.current);
        }
        // Also check on window resize
        window.addEventListener('resize', calculateTruncatedText);
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', calculateTruncatedText);
        };
    }, [cellRef, minWidth, title, placeholder]);
    return (jsxs(Fragment, { children: [jsx("span", { ref: measureRef, style: {
                    visibility: 'hidden',
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                }, children: title || 'Event' }), truncatedText || title || 'Event'] }));
}
function CalendarDisplay({ dateColumn, getDate, getEventTitle, getEventColor, renderEvent, firstDayOfWeek = 0, showOutsideDays = true, monthsToDisplay = 1, labels = {
    monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ],
    weekdayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    backButtonLabel: 'Back',
    forwardButtonLabel: 'Next',
}, onDateClick, onEventClick, maxEventsPerDay = 3, colorPalette = 'blue', eventPlaceholder = '...', minEventWidth = 80, minCharsBeforeEllipsis = 2, }) {
    const { data, table } = useDataTableContext();
    // Map table data to events
    const events = useMemo(() => {
        return data
            .map((row) => {
            let dateValue;
            if (getDate) {
                dateValue = getDate(row);
            }
            else {
                // Try to get date from column
                const rowData = table
                    .getRowModel()
                    .rows.find((r) => r.original === row);
                if (rowData) {
                    const cell = rowData.getAllCells().find((c) => {
                        const colId = c.column.id;
                        const accessorKey = c.column.columnDef.accessorKey;
                        return colId === dateColumn || accessorKey === dateColumn;
                    });
                    dateValue = cell?.getValue();
                }
            }
            const date = normalizeDate(dateValue);
            if (!date)
                return null;
            let title;
            if (getEventTitle) {
                title = getEventTitle(row);
            }
            else {
                // Use first column's value as title
                const rowData = table
                    .getRowModel()
                    .rows.find((r) => r.original === row);
                if (rowData) {
                    const firstCell = rowData.getAllCells()[0];
                    title = String(firstCell?.getValue() ?? '');
                }
            }
            const color = getEventColor?.(row);
            return {
                data: row,
                date,
                title,
                color,
            };
        })
            .filter((event) => event !== null);
    }, [data, table, dateColumn, getDate, getEventTitle, getEventColor]);
    // Group events by date
    const eventsByDate = useMemo(() => {
        const map = new Map();
        events.forEach((event) => {
            const dateKey = `${event.date.getFullYear()}-${event.date.getMonth()}-${event.date.getDate()}`;
            if (!map.has(dateKey)) {
                map.set(dateKey, []);
            }
            map.get(dateKey).push(event);
        });
        return map;
    }, [events]);
    // Get events for a specific date
    const getEventsForDate = useCallback((date) => {
        const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        return eventsByDate.get(dateKey) ?? [];
    }, [eventsByDate]);
    const calendarData = useCalendar({
        firstDayOfWeek,
        showOutsideDays,
        monthsToDisplay,
    });
    const getDateProps = useCallback((props) => {
        const dateEvents = getEventsForDate(props.dateObj.date);
        const baseProps = calendarData.getDateProps({ dateObj: props.dateObj });
        return {
            ...baseProps,
            onClick: () => {
                baseProps.onClick?.();
                if (onDateClick) {
                    onDateClick(props.dateObj.date, dateEvents);
                }
            },
        };
    }, [calendarData, getEventsForDate, onDateClick]);
    const { monthNamesShort, weekdayNamesShort, backButtonLabel, forwardButtonLabel, } = labels;
    if (!calendarData.calendars.length) {
        return null;
    }
    return (jsxs(VStack, { gap: 4, width: "100%", children: [jsxs(HStack, { gap: 2, justifyContent: "center", children: [jsx(Button$1, { variant: "ghost", ...calendarData.getBackProps({
                            calendars: calendarData.calendars,
                            offset: 12,
                        }), children: '<<' }), jsx(Button$1, { variant: "ghost", ...calendarData.getBackProps({ calendars: calendarData.calendars }), children: backButtonLabel }), jsx(Button$1, { variant: "ghost", ...calendarData.getForwardProps({
                            calendars: calendarData.calendars,
                        }), children: forwardButtonLabel }), jsx(Button$1, { variant: "ghost", ...calendarData.getForwardProps({
                            calendars: calendarData.calendars,
                            offset: 12,
                        }), children: '>>' })] }), jsx(Grid, { templateColumns: {
                    base: '1fr',
                    md: monthsToDisplay >= 2 ? 'repeat(2, 1fr)' : '1fr',
                    lg: monthsToDisplay >= 3
                        ? 'repeat(3, 1fr)'
                        : monthsToDisplay === 2
                            ? 'repeat(2, 1fr)'
                            : '1fr',
                    xl: `repeat(${Math.min(monthsToDisplay, 4)}, 1fr)`,
                }, gap: { base: 4, md: 6 }, width: "100%", justifyContent: "center", children: calendarData.calendars.map((calendar) => (jsxs(VStack, { gap: 2, alignItems: "stretch", children: [jsxs(Text, { textAlign: "center", fontSize: { base: 'md', md: 'lg' }, fontWeight: "semibold", children: [monthNamesShort[calendar.month], " ", calendar.year] }), jsx(Grid, { templateColumns: "repeat(7, 1fr)", gap: { base: 0.5, md: 1 }, children: [0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
                                const weekday = (weekdayNum + firstDayOfWeek) % 7;
                                return (jsx(Text, { textAlign: "center", fontSize: { base: 'xs', md: 'sm' }, fontWeight: "medium", color: { base: 'gray.600', _dark: 'gray.400' }, children: weekdayNamesShort[weekday] }, `${calendar.month}${calendar.year}${weekday}`));
                            }) }), jsx(Grid, { templateColumns: "repeat(7, 1fr)", gap: { base: 0.5, md: 1 }, children: calendar.weeks.map((week, weekIndex) => week.map((dateObj, index) => {
                                const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                                if (!dateObj) {
                                    return jsx(Box, {}, key);
                                }
                                const { date, today, isCurrentMonth } = dateObj;
                                const dateEvents = getEventsForDate(date);
                                const cellRef = useRef(null);
                                return (jsxs(VStack, { ref: cellRef, gap: { base: 0.25, md: 0.5 }, alignItems: "stretch", minHeight: { base: '60px', md: '80px', lg: '100px' }, borderWidth: "1px", borderColor: {
                                        base: today ? `${colorPalette}.300` : 'gray.200',
                                        _dark: today ? `${colorPalette}.700` : 'gray.700',
                                    }, borderRadius: { base: 'sm', md: 'md' }, padding: { base: 0.5, md: 1 }, bgColor: {
                                        base: today ? `${colorPalette}.50` : 'white',
                                        _dark: today ? `${colorPalette}.950` : 'gray.900',
                                    }, opacity: isCurrentMonth ? 1 : 0.5, ...getDateProps({ dateObj }), cursor: onDateClick ? 'pointer' : 'default', _hover: onDateClick
                                        ? {
                                            bgColor: {
                                                base: `${colorPalette}.100`,
                                                _dark: `${colorPalette}.900`,
                                            },
                                        }
                                        : {}, children: [jsx(Text, { fontSize: { base: 'xs', md: 'sm' }, fontWeight: today ? 'bold' : 'normal', color: {
                                                base: today ? `${colorPalette}.700` : 'gray.700',
                                                _dark: today ? `${colorPalette}.300` : 'gray.300',
                                            }, textAlign: "right", paddingRight: { base: 0.5, md: 1 }, children: date.getDate() }), jsxs(VStack, { gap: { base: 0.25, md: 0.5 }, alignItems: "stretch", flex: 1, overflow: "hidden", children: [dateEvents
                                                    .slice(0, maxEventsPerDay)
                                                    .map((event, eventIndex) => {
                                                    const eventContent = renderEvent ? (renderEvent(event)) : (jsx(Box, { fontSize: { base: '2xs', md: 'xs' }, paddingX: { base: 0.5, md: 1 }, paddingY: { base: 0.25, md: 0.5 }, borderRadius: { base: 'xs', md: 'sm' }, bgColor: {
                                                            base: event.color
                                                                ? `${event.color}.100`
                                                                : `${colorPalette}.100`,
                                                            _dark: event.color
                                                                ? `${event.color}.900`
                                                                : `${colorPalette}.900`,
                                                        }, color: {
                                                            base: event.color
                                                                ? `${event.color}.800`
                                                                : `${colorPalette}.800`,
                                                            _dark: event.color
                                                                ? `${event.color}.200`
                                                                : `${colorPalette}.200`,
                                                        }, onClick: (e) => {
                                                            e.stopPropagation();
                                                            if (onEventClick) {
                                                                onEventClick(event);
                                                            }
                                                        }, cursor: onEventClick ? 'pointer' : 'default', _hover: onEventClick
                                                            ? {
                                                                opacity: 0.8,
                                                            }
                                                            : {}, children: jsx(ResponsiveEventTitle, { title: event.title, placeholder: eventPlaceholder, minWidth: minEventWidth, minChars: minCharsBeforeEllipsis, cellRef: cellRef }) }, eventIndex));
                                                    return (jsx(Box, { onClick: (e) => e.stopPropagation(), children: eventContent }, eventIndex));
                                                }), dateEvents.length > maxEventsPerDay && (jsxs(Text, { fontSize: "xs", color: {
                                                        base: `${colorPalette}.600`,
                                                        _dark: `${colorPalette}.400`,
                                                    }, paddingX: 1, onClick: (e) => {
                                                        e.stopPropagation();
                                                        if (onDateClick) {
                                                            onDateClick(date, dateEvents);
                                                        }
                                                    }, cursor: onDateClick ? 'pointer' : 'default', children: ["+", dateEvents.length - maxEventsPerDay, " more"] }))] })] }, key));
                            })) })] }, `${calendar.month}${calendar.year}`))) })] }));
}

// Reference: https://tanstack.com/table/latest/docs/framework/react/examples/custom-features
// TypeScript setup for our new feature with all of the same type-safety as stock TanStack Table features
// end of TS setup!
// Here is all of the actual javascript code for our new feature
const DensityFeature = {
    // define the new feature's initial state
    getInitialState: (state) => {
        return {
            density: 'sm',
            ...state,
        };
    },
    // define the new feature's default options
    getDefaultOptions: (table) => {
        return {
            enableDensity: true,
            onDensityChange: makeStateUpdater('density', table),
        };
    },
    // if you need to add a default column definition...
    // getDefaultColumnDef: <TData extends RowData>(): Partial<ColumnDef<TData>> => {
    //   return { meta: {} } //use meta instead of directly adding to the columnDef to avoid typescript stuff that's hard to workaround
    // },
    // define the new feature's table instance methods
    createTable: (table) => {
        table.setDensity = (updater) => {
            const safeUpdater = (old) => {
                let newState = functionalUpdate(updater, old);
                return newState;
            };
            return table.options.onDensityChange?.(safeUpdater);
        };
        table.toggleDensity = (value) => {
            table.setDensity((old) => {
                if (value)
                    return value;
                if (old === 'xs') {
                    return 'sm';
                }
                if (old === 'sm') {
                    return 'md';
                }
                if (old === 'md') {
                    return 'lg';
                }
                return 'xs';
            });
        };
        table.getDensityValue = (value) => {
            let density;
            if (value) {
                density = value;
            }
            else {
                density = table.getState().density;
            }
            if (density === 'xs') {
                return 2;
            }
            if (density === 'sm') {
                return 4;
            }
            if (density === 'md') {
                return 8;
            }
            return 12;
        };
    },
    // if you need to add row instance APIs...
    // createRow: <TData extends RowData>(row, table): void => {},
    // if you need to add cell instance APIs...
    // createCell: <TData extends RowData>(cell, column, row, table): void => {},
    // if you need to add column instance APIs...
    // createColumn: <TData extends RowData>(column, table): void => {},
    // if you need to add header instance APIs...
    // createHeader: <TData extends RowData>(header, table): void => {},
};
//end of custom feature code

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
const fuzzyFilter = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);
    // Store the itemRank info
    addMeta({
        itemRank,
    });
    // Return if the item should be filtered in/out
    return itemRank.passed;
};
/**
 * DataTable will create a context to hold all values to
 * help the render of the DataTable in serverside
 *
 *
 * The query is required to be a GET request that can receive
 * specified params and return a specified response
 *
 * @link https://tanstack.com/table/latest/docs/guide/column-defs
 */
function DataTable({ columns, data, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, children, tableLabel = {
    view: 'View',
    edit: 'Edit',
    filterButtonText: 'Filter',
    filterTitle: 'Filter',
    filterReset: 'Reset',
    filterClose: 'Close',
    reloadTooltip: 'Reload',
    reloadButtonText: 'Reload',
    resetSelection: 'Reset Selection',
    resetSorting: 'Reset Sorting',
    rowCountText: '',
    hasErrorText: 'Has Error',
    globalFilterPlaceholder: 'Search',
    trueLabel: 'True',
    falseLabel: 'False',
}, }) {
    const table = useReactTable({
        _features: [DensityFeature],
        data: data,
        rowCount: data.length,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        defaultColumn: {
            size: 150, //starting column size
            minSize: 10, //enforced during column resizing
            maxSize: 10000, //enforced during column resizing
        },
        enableRowSelection: enableRowSelection,
        enableMultiRowSelection: enableMultiRowSelection,
        enableSubRowSelection: enableSubRowSelection,
        columnResizeMode: 'onChange',
        // global filter start
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        globalFilterFn: 'fuzzy',
        state: {
            pagination,
            sorting,
            columnFilters,
            rowSelection,
            columnOrder,
            globalFilter,
            density,
            columnVisibility,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: setRowSelection,
        onColumnOrderChange: (state) => {
            setColumnOrder(state);
        },
        onGlobalFilterChange: (state) => {
            setGlobalFilter(state);
        },
        onDensityChange: setDensity,
        onColumnVisibilityChange: setColumnVisibility,
    });
    return (jsx(DataTableContext.Provider, { value: {
            table: table,
            globalFilter,
            setGlobalFilter,
            type: 'client',
            columns: columns,
            sorting,
            setSorting,
            columnFilters,
            setColumnFilters,
            pagination,
            setPagination,
            rowSelection,
            setRowSelection,
            columnOrder,
            setColumnOrder,
            density,
            setDensity,
            columnVisibility,
            setColumnVisibility,
            data,
            tableLabel,
        }, children: children }));
}

/**
 * DataTableServer will create a context to hold all values to
 * help the render of the DataTable in serverside
 *
 * The query is required to be a GET request that can receive
 * specified params and return a specified response
 *
 * The `useDataTableServer` can help to create the specified request and response
 *
 * @link https://tanstack.com/table/latest/docs/guide/column-defs
 */
function DataTableServer({ columns, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, query, url, children, tableLabel = {
    view: 'View',
    edit: 'Edit',
    filterButtonText: 'Filter',
    filterTitle: 'Filter',
    filterReset: 'Reset',
    filterClose: 'Close',
    reloadTooltip: 'Reload',
    reloadButtonText: 'Reload',
    resetSelection: 'Reset Selection',
    resetSorting: 'Reset Sorting',
    rowCountText: '',
    hasErrorText: 'Has Error',
    globalFilterPlaceholder: 'Search',
    trueLabel: 'True',
    falseLabel: 'False',
}, }) {
    const table = useReactTable({
        _features: [DensityFeature],
        data: (query.data?.data ?? []),
        rowCount: query.data?.count ?? 0,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
        columnResizeMode: 'onChange',
        defaultColumn: {
            size: 150, //starting column size
            minSize: 10, //enforced during column resizing
            maxSize: 10000, //enforced during column resizing
        },
        enableRowSelection: enableRowSelection,
        enableMultiRowSelection: enableMultiRowSelection,
        enableSubRowSelection: enableSubRowSelection,
        state: {
            pagination,
            sorting,
            columnFilters,
            rowSelection,
            columnOrder,
            globalFilter,
            density,
            columnVisibility,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: setRowSelection,
        onColumnOrderChange: (state) => {
            setColumnOrder(state);
        },
        onGlobalFilterChange: (state) => {
            setGlobalFilter(state);
        },
        onDensityChange: setDensity,
        onColumnVisibilityChange: setColumnVisibility,
        // for tanstack-table ts bug start
        filterFns: {
            fuzzy: () => {
                return false;
            },
        },
        // for tanstack-table ts bug end
    });
    return (jsx(DataTableContext.Provider, { value: {
            table: table,
            globalFilter,
            setGlobalFilter,
            type: 'server',
            columns: columns,
            sorting,
            setSorting,
            columnFilters,
            setColumnFilters,
            pagination,
            setPagination,
            rowSelection,
            setRowSelection,
            columnOrder,
            setColumnOrder,
            density,
            setDensity,
            columnVisibility,
            setColumnVisibility,
            data: query.data?.data ?? [],
            tableLabel,
        }, children: jsx(DataTableServerContext.Provider, { value: { url: url ?? '', query }, children: children }) }));
}

export { CalendarDisplay, CardHeader, DataDisplay, DataTable, DataTableServer, DatePickerInput, DefaultCardTitle, DefaultForm, DefaultTable, DefaultTableServer, DensityToggleButton, EditSortingButton, EmptyState, ErrorAlert, FilterDialog, FormBody, FormRoot, FormTitle, GlobalFilter, MediaLibraryBrowser, PageSizeControl, Pagination, RecordDisplay, ReloadButton, ResetFilteringButton, ResetSelectionButton, ResetSortingButton, RowCountText, SelectAllRowsToggle, Table, TableBody, TableCardContainer, TableCards, TableComponent, TableControls, TableDataDisplay, TableFilter, TableFilterTags, TableFooter, TableHeader, TableLoadingComponent, TableSelector, TableSorter, TableViewer, TextCell, ViewDialog, buildErrorMessages, buildFieldErrors, buildRequiredErrors, convertToAjvErrorsFormat, createErrorMessage, defaultRenderDisplay, getColumns, getMultiDates, getRangeDates, idPickerSanityCheck, useDataTable, useDataTableContext, useDataTableServer, useForm, widthSanityCheck };
