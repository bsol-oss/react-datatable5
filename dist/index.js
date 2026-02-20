'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('@chakra-ui/react');
var ai = require('react-icons/ai');
var React = require('react');
var lu = require('react-icons/lu');
var md = require('react-icons/md');
var fa6 = require('react-icons/fa6');
var bi = require('react-icons/bi');
var cg = require('react-icons/cg');
var hi2 = require('react-icons/hi2');
var io = require('react-icons/io');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var bindEventListener = require('bind-event-listener');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var rafSchd = require('raf-schd');
var invariant = require('tiny-invariant');
var reactQuery = require('@tanstack/react-query');
var io5 = require('react-icons/io5');
var usehooks = require('@uidotdev/usehooks');
var bs = require('react-icons/bs');
var hi = require('react-icons/hi');
var reactTable = require('@tanstack/react-table');
var gr = require('react-icons/gr');
var axios = require('axios');
var reactHookForm = require('react-hook-form');
var dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat');
var timezone = require('dayjs/plugin/timezone');
var utc = require('dayjs/plugin/utc');
var ti = require('react-icons/ti');
var ajv = require('@hookform/resolvers/ajv');
var reactVirtual = require('@tanstack/react-virtual');
var matchSorterUtils = require('@tanstack/match-sorter-utils');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const DataTableContext = React.createContext({
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
        noFiltersMatchText: 'No filters match your search',
        filterByLabel: 'Filter by',
        filterLabelsPlaceholder: 'Filter labels',
    },
});

const useDataTableContext = () => {
    return React.useContext(DataTableContext);
};

const Button = React__namespace.forwardRef(function Button(props, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props;
    return (jsxRuntime.jsx(react.Button, { disabled: loading || disabled, ref: ref, ...rest, children: loading && !loadingText ? (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(react.AbsoluteCenter, { display: "inline-flex", children: jsxRuntime.jsx(react.Spinner, { size: "inherit", color: "inherit" }) }), jsxRuntime.jsx(react.Span, { opacity: 0, children: children })] })) : loading && loadingText ? (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(react.Spinner, { size: "inherit", color: "inherit" }), loadingText] })) : (children) }));
});

const DensityToggleButton = ({ text, icon = jsxRuntime.jsx(ai.AiOutlineColumnWidth, {}), }) => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!text === false && (jsxRuntime.jsx(react.IconButton, { variant: "ghost", "aria-label": "Toggle Density", onClick: () => {
                    table.toggleDensity();
                }, children: icon })), !!text !== false && (jsxRuntime.jsxs(Button, { variant: "ghost", "aria-label": "Toggle Density", onClick: () => {
                    table.toggleDensity();
                }, children: [icon, text] }))] }));
};

const CloseButton = React__namespace.forwardRef(function CloseButton(props, ref) {
    return (jsxRuntime.jsx(react.IconButton, { variant: "ghost", "aria-label": "Close", ref: ref, ...props, children: props.children ?? jsxRuntime.jsx(lu.LuX, {}) }));
});

const DialogContent = React__namespace.forwardRef(function DialogContent(props, ref) {
    const { children, portalled = true, portalRef, backdrop = true, ...rest } = props;
    return (jsxRuntime.jsxs(react.Portal, { disabled: !portalled, container: portalRef, children: [backdrop && jsxRuntime.jsx(react.Dialog.Backdrop, {}), jsxRuntime.jsx(react.Dialog.Positioner, { children: jsxRuntime.jsx(react.Dialog.Content, { ref: ref, ...rest, asChild: false, children: children }) })] }));
});
const DialogCloseTrigger = React__namespace.forwardRef(function DialogCloseTrigger(props, ref) {
    return (jsxRuntime.jsx(react.Dialog.CloseTrigger, { position: "absolute", top: "2", insetEnd: "2", ...props, asChild: true, children: jsxRuntime.jsx(CloseButton, { size: "sm", ref: ref, children: props.children }) }));
});
const DialogRoot = react.Dialog.Root;
const DialogFooter = react.Dialog.Footer;
const DialogHeader = react.Dialog.Header;
const DialogBody = react.Dialog.Body;
react.Dialog.Backdrop;
const DialogTitle = react.Dialog.Title;
react.Dialog.Description;
const DialogTrigger = react.Dialog.Trigger;
react.Dialog.ActionTrigger;

const TableSorter = () => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: table.getHeaderGroups().map((headerGroup) => (jsxRuntime.jsx(jsxRuntime.Fragment, { children: headerGroup.headers.map((header) => {
                const displayName = header.column.columnDef.meta === undefined
                    ? header.column.id
                    : header.column.columnDef.meta.displayName;
                return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: header.column.getCanSort() && (jsxRuntime.jsxs(react.Flex, { alignItems: "center", gap: "0.5rem", padding: "0.5rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsxs(react.Button, { variant: "ghost", onClick: () => {
                                    header.column.toggleSorting();
                                }, children: [header.column.getIsSorted() === false && jsxRuntime.jsx(fa6.FaUpDown, {}), header.column.getIsSorted() === "asc" && jsxRuntime.jsx(bi.BiDownArrow, {}), header.column.getIsSorted() === "desc" && jsxRuntime.jsx(bi.BiUpArrow, {})] }), header.column.getIsSorted() && (jsxRuntime.jsx(react.Button, { onClick: () => {
                                    header.column.clearSorting();
                                }, children: jsxRuntime.jsx(cg.CgClose, {}) }))] })) }));
            }) }))) }));
};

const ResetSortingButton = () => {
    const { table } = useDataTableContext();
    const { tableLabel } = useDataTableContext();
    const { resetSorting } = tableLabel;
    return (jsxRuntime.jsx(react.Button, { onClick: () => {
            table.resetSorting();
        }, children: resetSorting }));
};

const EditSortingButton = ({ text, icon = jsxRuntime.jsx(md.MdOutlineSort, {}), title = "Edit Sorting", }) => {
    const sortingModal = react.useDisclosure();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(DialogRoot, { size: ["full", "full", "md", "md"], children: [jsxRuntime.jsx(react.DialogBackdrop, {}), jsxRuntime.jsx(DialogTrigger, { children: jsxRuntime.jsxs(react.Button, { as: "div", variant: "ghost", onClick: sortingModal.onOpen, children: [icon, " ", text] }) }), jsxRuntime.jsxs(DialogContent, { children: [jsxRuntime.jsx(DialogCloseTrigger, {}), jsxRuntime.jsxs(DialogHeader, { children: [jsxRuntime.jsx(DialogTitle, {}), title] }), jsxRuntime.jsx(DialogBody, { children: jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(TableSorter, {}), jsxRuntime.jsx(ResetSortingButton, {})] }) }), jsxRuntime.jsx(DialogFooter, {})] })] }) }));
};

const Radio = React__namespace.forwardRef(function Radio(props, ref) {
    const { children, inputProps, rootRef, ...rest } = props;
    return (jsxRuntime.jsxs(react.RadioGroup.Item, { ref: rootRef, ...rest, children: [jsxRuntime.jsx(react.RadioGroup.ItemHiddenInput, { ref: ref, ...inputProps }), jsxRuntime.jsx(react.RadioGroup.ItemIndicator, {}), children && (jsxRuntime.jsx(react.RadioGroup.ItemText, { children: children }))] }));
});
const RadioGroup = react.RadioGroup.Root;

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
    const [currentDate, setCurrentDate] = React.useState(() => {
        return date ? new Date(date) : new Date();
    });
    const calendars = React.useMemo(() => {
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
    const navigate = React.useCallback((offset) => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + offset);
            return newDate;
        });
    }, []);
    const getBackProps = React.useCallback((props) => {
        return {
            onClick: () => {
                navigate(-(props?.offset || 1));
            },
        };
    }, [navigate]);
    const getForwardProps = React.useCallback((props) => {
        return {
            onClick: () => {
                navigate(props?.offset || 1);
            },
        };
    }, [navigate]);
    const getDateProps = React.useCallback((props) => {
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

const RangeDatePickerContext = React.createContext({
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
    const { labels } = React.useContext(RangeDatePickerContext);
    const { monthNamesFull, weekdayNamesShort, backButtonLabel, forwardButtonLabel, } = labels;
    const [hoveredDate, setHoveredDate] = React.useState();
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
        return (jsxRuntime.jsxs(react.Grid, { onMouseLeave: onMouseLeave, children: [jsxRuntime.jsxs(react.Grid, { templateColumns: 'repeat(4, auto)', justifyContent: 'center', children: [jsxRuntime.jsx(react.Button, { variant: 'ghost', ...getBackProps({
                                calendars,
                                offset: 12,
                            }), children: '<<' }), jsxRuntime.jsx(react.Button, { variant: 'ghost', ...getBackProps({ calendars }), children: backButtonLabel }), jsxRuntime.jsx(react.Button, { variant: 'ghost', ...getForwardProps({ calendars }), children: forwardButtonLabel }), jsxRuntime.jsx(react.Button, { variant: 'ghost', ...getForwardProps({
                                calendars,
                                offset: 12,
                            }), children: '>>' })] }), jsxRuntime.jsx(react.Grid, { templateColumns: 'repeat(2, auto)', justifyContent: 'center', gap: 4, children: calendars.map((calendar) => (
                    // month and year
                    jsxRuntime.jsxs(react.Grid, { gap: 4, alignContent: "start", children: [jsxRuntime.jsxs(react.Grid, { justifyContent: 'center', children: [monthNamesFull[calendar.month], " ", calendar.year] }), jsxRuntime.jsx(react.Grid, { templateColumns: 'repeat(7, auto)', justifyContent: 'center', children: [0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
                                    const weekday = (weekdayNum + firstDayOfWeek) % 7;
                                    return (jsxRuntime.jsx(react.Box, { minWidth: '48px', textAlign: 'center', children: weekdayNamesShort[weekday] }, `${calendar.month}${calendar.year}${weekday}`));
                                }) }), jsxRuntime.jsx(react.Grid, { templateColumns: 'repeat(7, auto)', justifyContent: 'center', children: calendar.weeks.map((week, windex) => week.map((dateObj, index) => {
                                    const key = `${calendar.month}${calendar.year}${windex}${index}`;
                                    if (!dateObj) {
                                        return jsxRuntime.jsx(react.Box, {}, key);
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
                                    return (jsxRuntime.jsx(react.Button, { ...getDateProps({
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
    return (jsxRuntime.jsx(RangeDatePickerContext.Provider, { value: { labels }, children: render ? (render(calendarData)) : (jsxRuntime.jsx(Calendar$1, { ...calendarData,
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

const Slider = React__namespace.forwardRef(function Slider(props, ref) {
    const { marks: marksProp, label, showValue, ...rest } = props;
    const value = props.defaultValue ?? props.value;
    const marks = marksProp?.map((mark) => {
        if (typeof mark === "number")
            return { value: mark, label: undefined };
        return mark;
    });
    const hasMarkLabel = !!marks?.some((mark) => mark.label);
    return (jsxRuntime.jsxs(react.Slider.Root, { ref: ref, thumbAlignment: "center", ...rest, children: [label && !showValue && (jsxRuntime.jsx(react.Slider.Label, { children: label })), label && showValue && (jsxRuntime.jsxs(react.HStack, { justify: "space-between", children: [jsxRuntime.jsx(react.Slider.Label, { children: label }), jsxRuntime.jsx(react.Slider.ValueText, {})] })), jsxRuntime.jsxs(react.Slider.Control, { "data-has-mark-label": hasMarkLabel || undefined, children: [jsxRuntime.jsx(react.Slider.Track, { children: jsxRuntime.jsx(react.Slider.Range, {}) }), jsxRuntime.jsx(SliderThumbs, { value: value }), jsxRuntime.jsx(SliderMarks, { marks: marks })] })] }));
});
function SliderThumbs(props) {
    const { value } = props;
    return (jsxRuntime.jsx(react.For, { each: value, children: (_, index) => (jsxRuntime.jsx(react.Slider.Thumb, { index: index, children: jsxRuntime.jsx(react.Slider.HiddenInput, {}) }, index)) }));
}
const SliderMarks = React__namespace.forwardRef(function SliderMarks(props, ref) {
    const { marks } = props;
    if (!marks?.length)
        return null;
    return (jsxRuntime.jsx(react.Slider.MarkerGroup, { ref: ref, children: marks.map((mark, index) => {
            const value = typeof mark === "number" ? mark : mark.value;
            const label = typeof mark === "number" ? undefined : mark.label;
            return (jsxRuntime.jsxs(react.Slider.Marker, { value: value, children: [jsxRuntime.jsx(react.Slider.MarkerIndicator, {}), label] }, index));
        }) }));
});

const RangeFilter = ({ range, setRange, defaultValue, min, max, step, }) => {
    return (jsxRuntime.jsxs(react.Flex, { p: 2, gap: 2, flexFlow: 'column', children: [jsxRuntime.jsx(react.Text, { children: `${range[0]} - ${range[1]}` }), jsxRuntime.jsx(Slider, { width: "full", min: min, max: max, defaultValue: defaultValue, step: step, name: `Selected Range: ${range[0]} - ${range[1]}`, 
                // value={field.value}
                onValueChange: (val) => setRange(val.value) })] }));
};

const CheckboxCard = React__namespace.forwardRef(function CheckboxCard(props, ref) {
    const { inputProps, label, description, icon, addon, indicator = jsxRuntime.jsx(react.CheckboxCard.Indicator, {}), indicatorPlacement = "end", ...rest } = props;
    const hasContent = label || description || icon;
    const ContentWrapper = indicator ? react.CheckboxCard.Content : React__namespace.Fragment;
    return (jsxRuntime.jsxs(react.CheckboxCard.Root, { ...rest, children: [jsxRuntime.jsx(react.CheckboxCard.HiddenInput, { ref: ref, ...inputProps }), jsxRuntime.jsxs(react.CheckboxCard.Control, { children: [indicatorPlacement === "start" && indicator, hasContent && (jsxRuntime.jsxs(ContentWrapper, { children: [icon, label && (jsxRuntime.jsx(react.CheckboxCard.Label, { children: label })), description && (jsxRuntime.jsx(react.CheckboxCard.Description, { children: description })), indicatorPlacement === "inside" && indicator] })), indicatorPlacement === "end" && indicator] }), addon && jsxRuntime.jsx(react.CheckboxCard.Addon, { children: addon })] }));
});
react.CheckboxCard.Indicator;

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
    return (jsxRuntime.jsx(react.Flex, { flexFlow: 'wrap', p: '0.5rem', gap: '0.5rem', children: availableTags.map((tag) => {
            const { label, value } = tag;
            const isChecked = selectedTags.includes(value);
            return (jsxRuntime.jsx(CheckboxCard, { checked: isChecked, label: label ?? value, size: "sm", variant: isChecked ? 'solid' : 'outline', onCheckedChange: (details) => {
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
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: 'column', gap: 1, children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(react.Grid, { gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))', gap: 1, children: column.columns.map((column) => {
                        return jsxRuntime.jsx(Filter, { column: column }, column.id);
                    }) }, column.id)] }));
    }
    if (!column.getCanFilter()) {
        return jsxRuntime.jsx(jsxRuntime.Fragment, {});
    }
    if (filterVariant === 'select') {
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: 'column', gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(RadioGroup, { value: column.getFilterValue() ? String(column.getFilterValue()) : '', onValueChange: (details) => {
                        column.setFilterValue(details.value);
                    }, children: jsxRuntime.jsxs(react.Flex, { flexFlow: 'wrap', gap: '0.5rem', children: [filterOptions.length === 0 && jsxRuntime.jsx(react.Text, { children: "No filter options" }), filterOptions.length > 0 &&
                                filterOptions.map((item) => (jsxRuntime.jsx(Radio, { value: item.value, children: item.label }, item.value)))] }) })] }, column.id));
    }
    if (filterVariant === 'tag') {
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: 'column', gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(TagFilter, { availableTags: filterOptions.map((item) => ({
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
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: 'column', gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(TagFilter, { availableTags: [
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
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: 'column', gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(RangeFilter, { range: filterValue, setRange: function (value) {
                        // throw new Error("Function not implemented.");
                        column.setFilterValue(value);
                    }, defaultValue: defaultValue, min: min, max: max, step: step })] }, column.id));
    }
    if (filterVariant === 'dateRange') {
        const filterValue = column.getFilterValue() ?? [];
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: 'column', gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(RangeDatePicker, { selected: filterValue, onDateSelected: ({ selectable, date }) => {
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
        return jsxRuntime.jsx(jsxRuntime.Fragment, { children: renderFilter(column) });
    }
    return (jsxRuntime.jsxs(react.Flex, { flexFlow: 'column', gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(react.Input, { value: column.getFilterValue() ? String(column.getFilterValue()) : '', onChange: (e) => {
                    column.setFilterValue(e.target.value);
                } })] }, column.id));
};
const TableFilter = () => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: table.getAllColumns().map((column) => {
            return jsxRuntime.jsx(Filter, { column: column }, column.id);
        }) }));
};

const ResetFilteringButton = () => {
    const { table } = useDataTableContext();
    const { tableLabel } = useDataTableContext();
    const { filterReset } = tableLabel;
    return (jsxRuntime.jsx(react.Button, { onClick: () => {
            table.resetColumnFilters();
        }, children: filterReset }));
};

const FilterDialog = ({ icon = jsxRuntime.jsx(md.MdFilterAlt, {}), }) => {
    const filterModal = react.useDisclosure();
    const { tableLabel } = useDataTableContext();
    const { filterButtonText, filterTitle, filterClose } = tableLabel;
    return (jsxRuntime.jsxs(DialogRoot, { size: ['full', 'full', 'md', 'md'], open: filterModal.open, children: [jsxRuntime.jsx(DialogTrigger, { asChild: true, children: jsxRuntime.jsxs(react.Button, { as: react.Box, variant: 'ghost', onClick: filterModal.onOpen, children: [icon, " ", filterButtonText] }) }), jsxRuntime.jsxs(DialogContent, { children: [jsxRuntime.jsx(DialogHeader, { children: jsxRuntime.jsx(DialogTitle, { children: filterTitle }) }), jsxRuntime.jsx(DialogBody, { display: 'flex', flexFlow: 'column', children: jsxRuntime.jsx(TableFilter, {}) }), jsxRuntime.jsxs(DialogFooter, { children: [jsxRuntime.jsx(ResetFilteringButton, {}), jsxRuntime.jsx(react.Button, { onClick: filterModal.onClose, variant: 'subtle', children: filterClose })] }), jsxRuntime.jsx(DialogCloseTrigger, { onClick: filterModal.onClose })] })] }));
};

const MenuContent = React__namespace.forwardRef(function MenuContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props;
    return (jsxRuntime.jsx(react.Portal, { disabled: !portalled, container: portalRef, children: jsxRuntime.jsx(react.Menu.Positioner, { children: jsxRuntime.jsx(react.Menu.Content, { ref: ref, ...rest }) }) }));
});
React__namespace.forwardRef(function MenuArrow(props, ref) {
    return (jsxRuntime.jsx(react.Menu.Arrow, { ref: ref, ...props, children: jsxRuntime.jsx(react.Menu.ArrowTip, {}) }));
});
React__namespace.forwardRef(function MenuCheckboxItem(props, ref) {
    return (jsxRuntime.jsxs(react.Menu.CheckboxItem, { ref: ref, ...props, children: [jsxRuntime.jsx(react.Menu.ItemIndicator, { hidden: false, children: jsxRuntime.jsx(lu.LuCheck, {}) }), props.children] }));
});
React__namespace.forwardRef(function MenuRadioItem(props, ref) {
    const { children, ...rest } = props;
    return (jsxRuntime.jsxs(react.Menu.RadioItem, { ps: "8", ref: ref, ...rest, children: [jsxRuntime.jsx(react.AbsoluteCenter, { axis: "horizontal", left: "4", asChild: true, children: jsxRuntime.jsx(react.Menu.ItemIndicator, { children: jsxRuntime.jsx(lu.LuCheck, {}) }) }), jsxRuntime.jsx(react.Menu.ItemText, { children: children })] }));
});
React__namespace.forwardRef(function MenuItemGroup(props, ref) {
    const { title, children, ...rest } = props;
    return (jsxRuntime.jsxs(react.Menu.ItemGroup, { ref: ref, ...rest, children: [title && (jsxRuntime.jsx(react.Menu.ItemGroupLabel, { userSelect: "none", children: title })), children] }));
});
React__namespace.forwardRef(function MenuTriggerItem(props, ref) {
    const { startIcon, children, ...rest } = props;
    return (jsxRuntime.jsxs(react.Menu.TriggerItem, { ref: ref, ...rest, children: [startIcon, children, jsxRuntime.jsx(lu.LuChevronRight, {})] }));
});
react.Menu.RadioItemGroup;
react.Menu.ContextTrigger;
const MenuRoot = react.Menu.Root;
react.Menu.Separator;
const MenuItem = react.Menu.Item;
react.Menu.ItemText;
react.Menu.ItemCommand;
const MenuTrigger = react.Menu.Trigger;

const PageSizeControl = ({ pageSizes = [10, 20, 30, 40, 50], }) => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsxs(MenuRoot, { children: [jsxRuntime.jsx(MenuTrigger, { asChild: true, children: jsxRuntime.jsx(react.Button, { variant: 'ghost', gap: '0.5rem', children: table.getState().pagination.pageSize }) }), jsxRuntime.jsx(MenuContent, { children: pageSizes.map((pageSize) => (jsxRuntime.jsx(MenuItem, { value: `chakra-table-pageSize-${pageSize}`, onClick: () => {
                        table.setPageSize(Number(pageSize));
                    }, children: pageSize }, `chakra-table-pageSize-${pageSize}`))) })] }));
};

const { withContext } = react.createRecipeContext({ key: "button" });
// Replace "a" with your framework's link component
const LinkButton = withContext("a");

const [RootPropsProvider, useRootProps] = react.createContext({
    name: 'RootPropsProvider',
});
const variantMap = {
    outline: { default: 'ghost', ellipsis: 'plain', current: 'outline' },
    solid: { default: 'outline', ellipsis: 'outline', current: 'solid' },
    subtle: { default: 'ghost', ellipsis: 'plain', current: 'subtle' },
};
const PaginationRoot = React__namespace.forwardRef(function PaginationRoot(props, ref) {
    const { size = 'sm', variant = 'outline', getHref, siblingCount, minSiblingCount = 1, maxSiblingCount, ...rest } = props;
    const containerRef = React__namespace.useRef(null);
    const [calculatedSiblingCount, setCalculatedSiblingCount] = React__namespace.useState(siblingCount);
    React__namespace.useEffect(() => {
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
    const mergedRef = React__namespace.useCallback((node) => {
        if (typeof ref === 'function') {
            ref(node);
        }
        else if (ref) {
            ref.current = node;
        }
        containerRef.current = node;
    }, [ref]);
    return (jsxRuntime.jsx(RootPropsProvider, { value: { size, variantMap: variantMap[variant], getHref }, children: jsxRuntime.jsx(react.Pagination.Root, { ref: mergedRef, type: getHref ? 'link' : 'button', siblingCount: calculatedSiblingCount, ...rest }) }));
});
const PaginationEllipsis = React__namespace.forwardRef(function PaginationEllipsis(props, ref) {
    const { size, variantMap } = useRootProps();
    return (jsxRuntime.jsx(react.Pagination.Ellipsis, { ref: ref, ...props, asChild: true, children: jsxRuntime.jsx(react.Button, { as: "span", variant: variantMap.ellipsis, size: size, children: jsxRuntime.jsx(hi2.HiMiniEllipsisHorizontal, {}) }) }));
});
const PaginationItem = React__namespace.forwardRef(function PaginationItem(props, ref) {
    const { page } = react.usePaginationContext();
    const { size, variantMap, getHref } = useRootProps();
    const current = page === props.value;
    const variant = current ? variantMap.current : variantMap.default;
    if (getHref) {
        return (jsxRuntime.jsx(LinkButton, { href: getHref(props.value), variant: variant, size: size, children: props.value }));
    }
    return (jsxRuntime.jsx(react.Pagination.Item, { ref: ref, ...props, asChild: true, children: jsxRuntime.jsx(react.Button, { variant: variant, size: size, children: props.value }) }));
});
const PaginationPrevTrigger = React__namespace.forwardRef(function PaginationPrevTrigger(props, ref) {
    const { size, variantMap, getHref } = useRootProps();
    const { previousPage } = react.usePaginationContext();
    if (getHref) {
        return (jsxRuntime.jsx(LinkButton, { href: previousPage != null ? getHref(previousPage) : undefined, variant: variantMap.default, size: size, children: jsxRuntime.jsx(hi2.HiChevronLeft, {}) }));
    }
    return (jsxRuntime.jsx(react.Pagination.PrevTrigger, { ref: ref, asChild: true, ...props, children: jsxRuntime.jsx(react.IconButton, { variant: variantMap.default, size: size, children: jsxRuntime.jsx(hi2.HiChevronLeft, {}) }) }));
});
const PaginationNextTrigger = React__namespace.forwardRef(function PaginationNextTrigger(props, ref) {
    const { size, variantMap, getHref } = useRootProps();
    const { nextPage } = react.usePaginationContext();
    if (getHref) {
        return (jsxRuntime.jsx(LinkButton, { href: nextPage != null ? getHref(nextPage) : undefined, variant: variantMap.default, size: size, children: jsxRuntime.jsx(hi2.HiChevronRight, {}) }));
    }
    return (jsxRuntime.jsx(react.Pagination.NextTrigger, { ref: ref, asChild: true, ...props, children: jsxRuntime.jsx(react.IconButton, { variant: variantMap.default, size: size, children: jsxRuntime.jsx(hi2.HiChevronRight, {}) }) }));
});
const PaginationItems = (props) => {
    return (jsxRuntime.jsx(react.Pagination.Context, { children: ({ pages }) => pages.map((page, index) => {
            return page.type === 'ellipsis' ? (jsxRuntime.jsx(PaginationEllipsis, { index: index, ...props }, index)) : (jsxRuntime.jsx(PaginationItem, { type: "page", value: page.value, ...props }, index));
        }) }));
};
React__namespace.forwardRef(function PaginationPageText(props, ref) {
    const { format = 'compact', ...rest } = props;
    const { page, totalPages, pageRange, count } = react.usePaginationContext();
    const content = React__namespace.useMemo(() => {
        if (format === 'short')
            return `${page} / ${totalPages}`;
        if (format === 'compact')
            return `${page} / ${totalPages}`;
        return `${pageRange.start + 1} - ${Math.min(pageRange.end, count)} / ${count}`;
    }, [format, page, totalPages, pageRange, count]);
    return (jsxRuntime.jsx(react.Text, { fontWeight: "medium", ref: ref, ...rest, children: content }));
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
    return (jsxRuntime.jsx(PaginationRoot, { page: table.getState().pagination.pageIndex + 1, count: getCount(), pageSize: table.getState().pagination.pageSize, onPageChange: (e) => {
            table.setPageIndex(e.page - 1);
        }, children: jsxRuntime.jsxs(react.HStack, { children: [jsxRuntime.jsx(PaginationPrevTrigger, {}), jsxRuntime.jsx(PaginationItems, {}), jsxRuntime.jsx(PaginationNextTrigger, {})] }) }));
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
function createRowToggleHandler(row, _rowSelection, setRowSelection) {
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
    return (jsxRuntime.jsx(react.Button, { onClick: () => {
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
        return jsxRuntime.jsx(react.Text, { children: "0 of 0" });
    }
    const start = pageIndex * pageSize + 1;
    const end = Math.min((pageIndex + 1) * pageSize, totalCount);
    return jsxRuntime.jsx(react.Text, { children: `${start}-${end} / ${totalCount}` });
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
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
  var unbindPointerMove = bindEventListener.bind(window, {
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
    var unbindPostDragEvents = bindEventListener.bindAll(window, [{
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
    return bindEventListener.bind(window, {
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

  bindEventListener.bindAll(window, [{
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
  var unbindEvents = bindEventListener.bindAll(window, [{
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
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper$1(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray$1(r)) || e) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: true } : { done: false, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
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

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: true } : { done: false, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = true, u = false; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = true, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
    return combine(honeyPotFix.bindEvents(), bindEventListener.bind(document, {
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
    const ref = React.useRef(null);
    const [dragging, setDragging] = React.useState(false); // NEW
    const { table } = useDataTableContext();
    const column = table.getColumn(columnId);
    invariant(column);
    const displayName = column.columnDef.meta?.displayName ?? columnId;
    React.useEffect(() => {
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
    return (jsxRuntime.jsxs(react.Grid, { ref: ref, templateColumns: "auto 1fr", gap: "0.5rem", alignItems: "center", style: dragging ? { opacity: 0.4 } : {}, children: [jsxRuntime.jsx(react.Flex, { alignItems: "center", padding: "0", cursor: 'grab', children: jsxRuntime.jsx(fa6.FaGripLinesVertical, { color: "colorPalette.400" }) }), jsxRuntime.jsx(react.Flex, { justifyContent: "space-between", alignItems: "center", children: jsxRuntime.jsx(CheckboxCard, { variant: 'surface', label: displayName, checked: column.getIsVisible(), onChange: column.getToggleVisibilityHandler() }) })] }));
}
function CardContainer({ location, children }) {
    const ref = React.useRef(null);
    const [isDraggedOver, setIsDraggedOver] = React.useState(false);
    React.useEffect(() => {
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
    return (jsxRuntime.jsx(react.Box, { ...getColor(isDraggedOver), ref: ref, children: children }));
}
const TableViewer = () => {
    const { table } = useDataTableContext();
    const order = table.getState().columnOrder.length > 0
        ? table.getState().columnOrder
        : table.getAllLeafColumns().map(({ id }) => {
            return id;
        });
    React.useEffect(() => {
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
    return (jsxRuntime.jsx(react.Flex, { flexFlow: 'column', gap: '0.25rem', children: order.map((columnId, index) => {
            return (jsxRuntime.jsx(CardContainer, { location: index, children: jsxRuntime.jsx(ColumnCard, { columnId: columnId }) }));
        }) }));
};

const ViewDialog = ({ icon = jsxRuntime.jsx(io.IoMdEye, {}) }) => {
    const viewModel = react.useDisclosure();
    const { tableLabel } = useDataTableContext();
    const { view } = tableLabel;
    return (jsxRuntime.jsxs(DialogRoot, { children: [jsxRuntime.jsx(react.DialogBackdrop, {}), jsxRuntime.jsx(DialogTrigger, { asChild: true, children: jsxRuntime.jsxs(react.Button, { as: react.Box, variant: "ghost", onClick: viewModel.onOpen, children: [icon, " ", view] }) }), jsxRuntime.jsxs(DialogContent, { children: [jsxRuntime.jsx(DialogCloseTrigger, {}), jsxRuntime.jsx(DialogHeader, { children: jsxRuntime.jsx(DialogTitle, { children: view }) }), jsxRuntime.jsx(DialogBody, { children: jsxRuntime.jsx(TableViewer, {}) }), jsxRuntime.jsx(DialogFooter, {})] })] }));
};

const Tooltip = React__namespace.forwardRef(function Tooltip(props, ref) {
    const { showArrow, children, disabled, portalled, content, contentProps, portalRef, ...rest } = props;
    if (disabled)
        return children;
    return (jsxRuntime.jsxs(react.Tooltip.Root, { ...rest, children: [jsxRuntime.jsx(react.Tooltip.Trigger, { asChild: true, children: children }), jsxRuntime.jsx(react.Portal, { disabled: !portalled, container: portalRef, children: jsxRuntime.jsx(react.Tooltip.Positioner, { children: jsxRuntime.jsxs(react.Tooltip.Content, { ref: ref, ...contentProps, children: [showArrow && (jsxRuntime.jsx(react.Tooltip.Arrow, { children: jsxRuntime.jsx(react.Tooltip.ArrowTip, {}) })), content] }) }) })] }));
});

const DataTableServerContext = React.createContext({
    url: "",
});

const useDataTableServerContext = () => {
    const context = React.useContext(DataTableServerContext);
    const { query } = context;
    const isEmpty = query ? (query.data?.count ?? 0) <= 0 : false;
    return { ...context, isEmpty };
};

const ReloadButton = ({ variant = 'icon' }) => {
    const serverContext = useDataTableServerContext();
    const { url, query } = serverContext;
    const queryClient = reactQuery.useQueryClient();
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
        return (jsxRuntime.jsx(Tooltip, { showArrow: true, content: reloadTooltip, children: jsxRuntime.jsx(Button, { variant: 'ghost', onClick: handleReload, "aria-label": 'refresh', children: jsxRuntime.jsx(io5.IoReload, {}) }) }));
    }
    return (jsxRuntime.jsxs(Button, { variant: 'ghost', onClick: handleReload, children: [jsxRuntime.jsx(io5.IoReload, {}), " ", reloadButtonText] }));
};

const InputGroup = React__namespace.forwardRef(function InputGroup(props, ref) {
    const { startElement, startElementProps, endElement, endElementProps, children, startOffset = "6px", endOffset = "6px", ...rest } = props;
    return (jsxRuntime.jsxs(react.Group, { ref: ref, ...rest, children: [startElement && (jsxRuntime.jsx(react.InputElement, { pointerEvents: "none", ...startElementProps, children: startElement })), React__namespace.cloneElement(children, {
                ...(startElement && {
                    ps: `calc(var(--input-height) - ${startOffset})`,
                }),
                ...(endElement && { pe: `calc(var(--input-height) - ${endOffset})` }),
                // @ts-expect-error chakra generated files
                ...children.props,
            }), endElement && (jsxRuntime.jsx(react.InputElement, { placement: "end", ...endElementProps, children: endElement }))] }));
});

const GlobalFilter = () => {
    const { table, tableLabel } = useDataTableContext();
    const { globalFilterPlaceholder } = tableLabel;
    const [searchTerm, setSearchTerm] = React.useState("");
    const debouncedSearchTerm = usehooks.useDebounce(searchTerm, 500);
    React.useEffect(() => {
        const searchHN = async () => {
            table.setGlobalFilter(debouncedSearchTerm);
        };
        searchHN();
    }, [debouncedSearchTerm]);
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(InputGroup, { flex: "1", startElement: jsxRuntime.jsx(md.MdSearch, {}), children: jsxRuntime.jsx(react.Input, { placeholder: globalFilterPlaceholder, variant: "outline", onChange: (e) => {
                    setSearchTerm(e.target.value);
                } }) }) }));
};

const SelectAllRowsToggle = ({ selectAllIcon = jsxRuntime.jsx(md.MdOutlineChecklist, {}), clearAllIcon = jsxRuntime.jsx(md.MdClear, {}), selectAllText = '', clearAllText = '', }) => {
    const { table, rowSelection, setRowSelection } = useDataTableContext();
    const allRowsSelected = areAllRowsSelected(table, rowSelection);
    const toggleHandler = createToggleAllRowsHandler(table, rowSelection, setRowSelection);
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!selectAllText === false && (jsxRuntime.jsx(react.IconButton, { variant: 'ghost', "aria-label": allRowsSelected ? clearAllText : selectAllText, onClick: toggleHandler, children: allRowsSelected ? clearAllIcon : selectAllIcon })), !!selectAllText !== false && (jsxRuntime.jsxs(react.Button, { variant: 'ghost', onClick: toggleHandler, children: [allRowsSelected ? clearAllIcon : selectAllIcon, allRowsSelected ? clearAllText : selectAllText] }))] }));
};

const TableSelector = () => {
    const { table, rowSelection, setRowSelection } = useDataTableContext();
    const selectedCount = getSelectedRowCount(table, rowSelection);
    const allPageRowsSelected = areAllPageRowsSelected(table, rowSelection);
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [selectedCount > 0 && (jsxRuntime.jsxs(react.Button, { onClick: () => { }, variant: 'ghost', display: 'flex', gap: "0.25rem", children: [jsxRuntime.jsx(react.Box, { fontSize: 'sm', children: `${selectedCount}` }), jsxRuntime.jsx(io.IoMdCheckbox, {})] })), !allPageRowsSelected && jsxRuntime.jsx(SelectAllRowsToggle, {}), selectedCount > 0 && (jsxRuntime.jsx(react.IconButton, { variant: 'ghost', onClick: () => {
                    resetRowSelection(setRowSelection);
                }, "aria-label": 'reset selection', children: jsxRuntime.jsx(md.MdClear, {}) }))] }));
};

const Tag = React__namespace.forwardRef(function Tag(props, ref) {
    const { startElement, endElement, onClose, closable = !!onClose, children, ...rest } = props;
    return (jsxRuntime.jsxs(react.Tag.Root, { ref: ref, ...rest, children: [startElement && (jsxRuntime.jsx(react.Tag.StartElement, { children: startElement })), jsxRuntime.jsx(react.Tag.Label, { children: children }), endElement && (jsxRuntime.jsx(react.Tag.EndElement, { children: endElement })), closable && (jsxRuntime.jsx(react.Tag.EndElement, { children: jsxRuntime.jsx(react.Tag.CloseTrigger, { onClick: onClose }) }))] }));
});

const Checkbox = React__namespace.forwardRef(function Checkbox(props, ref) {
    const { icon, children, inputProps, rootRef, ...rest } = props;
    return (jsxRuntime.jsxs(react.Checkbox.Root, { ref: rootRef, ...rest, children: [jsxRuntime.jsx(react.Checkbox.HiddenInput, { ref: ref, ...inputProps }), jsxRuntime.jsx(react.Checkbox.Control, { children: icon || jsxRuntime.jsx(react.Checkbox.Indicator, {}) }), children != null && (jsxRuntime.jsx(react.Checkbox.Label, { children: children }))] }));
});

const ColumnFilterMenu = ({ displayName, filterOptions, filterVariant, colorPalette, value: controlledValue, onChange, labels, open: controlledOpen, onOpenChange, }) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const debouncedSearchTerm = usehooks.useDebounce(searchTerm, 300);
    const [internalOpen, setInternalOpen] = React.useState(false);
    // Use controlled open state if provided, otherwise use internal state
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const handleOpenChange = (details) => {
        if (onOpenChange) {
            onOpenChange(details.open);
        }
        else {
            setInternalOpen(details.open);
        }
    };
    const [internalValue, setInternalValue] = React.useState(undefined);
    // Use controlled value if provided, otherwise use internal state
    const currentFilterValue = controlledValue !== undefined ? controlledValue : internalValue;
    const isArrayFilter = filterVariant === 'tag';
    // Default labels
    const defaultLabels = {
        filterByLabel: 'Filter by',
        filterLabelsPlaceholder: 'Filter labels',
        noFiltersMatchText: 'No filters match your search',
    };
    const finalLabels = { ...defaultLabels, ...labels };
    // Reset search term when menu closes
    React.useEffect(() => {
        if (!isOpen) {
            setSearchTerm('');
        }
    }, [isOpen]);
    // Filter update function
    const setFilterValue = (value) => {
        if (onChange) {
            onChange(value);
        }
        else {
            setInternalValue(value);
        }
    };
    // Get active count for this column
    const activeCount = React.useMemo(() => {
        if (!currentFilterValue)
            return 0;
        if (isArrayFilter) {
            return currentFilterValue.length;
        }
        return 1;
    }, [currentFilterValue, isArrayFilter]);
    // Filter options based on debounced search term
    const filteredOptions = React.useMemo(() => {
        if (!debouncedSearchTerm.trim()) {
            return filterOptions;
        }
        const searchLower = debouncedSearchTerm.toLowerCase();
        return filterOptions.filter((option) => option.label.toLowerCase().includes(searchLower));
    }, [filterOptions, debouncedSearchTerm]);
    return (jsxRuntime.jsxs(MenuRoot, { open: isOpen, onOpenChange: handleOpenChange, children: [jsxRuntime.jsx(MenuTrigger, { asChild: true, children: jsxRuntime.jsxs(react.Button, { variant: "outline", size: "sm", gap: 2, children: [jsxRuntime.jsx(react.Icon, { as: md.MdFilterList }), jsxRuntime.jsxs(react.Text, { children: [displayName, " ", activeCount > 0 && `(${activeCount})`] })] }) }), jsxRuntime.jsx(MenuContent, { maxW: "20rem", minW: "18rem", children: jsxRuntime.jsxs(react.VStack, { align: "stretch", gap: 2, p: 2, children: [jsxRuntime.jsxs(react.Heading, { size: "sm", px: 2, children: [finalLabels.filterByLabel, " ", displayName] }), jsxRuntime.jsx(InputGroup, { startElement: jsxRuntime.jsx(react.Icon, { as: md.MdSearch }), children: jsxRuntime.jsx(react.Input, { placeholder: finalLabels.filterLabelsPlaceholder, value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }) }), jsxRuntime.jsx(react.Box, { maxH: "20rem", overflowY: "auto", css: {
                                '&::-webkit-scrollbar': {
                                    width: '8px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: 'transparent',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: 'var(--chakra-colors-border-emphasized)',
                                    borderRadius: '4px',
                                },
                                '&::-webkit-scrollbar-thumb:hover': {
                                    background: 'var(--chakra-colors-border-subtle)',
                                },
                            }, children: jsxRuntime.jsx(react.VStack, { align: "stretch", gap: 1, children: filteredOptions.length === 0 ? (jsxRuntime.jsx(react.Text, { px: 2, py: 4, color: "fg.muted", textAlign: "center", children: finalLabels.noFiltersMatchText })) : (filteredOptions.map((option) => {
                                    const isActive = isArrayFilter
                                        ? currentFilterValue?.includes(option.value) ?? false
                                        : currentFilterValue === option.value;
                                    const handleToggle = () => {
                                        if (isArrayFilter) {
                                            // Handle array-based filters (tag variant)
                                            const currentArray = currentFilterValue ?? [];
                                            if (isActive) {
                                                // Remove from filter
                                                const newArray = currentArray.filter((v) => v !== option.value);
                                                if (newArray.length === 0) {
                                                    setFilterValue(undefined);
                                                }
                                                else {
                                                    setFilterValue(newArray);
                                                }
                                            }
                                            else {
                                                // Add to filter
                                                if (!currentArray.includes(option.value)) {
                                                    setFilterValue([...currentArray, option.value]);
                                                }
                                            }
                                        }
                                        else {
                                            // Handle single value filters (select variant)
                                            if (isActive) {
                                                setFilterValue(undefined);
                                            }
                                            else {
                                                setFilterValue(option.value);
                                            }
                                        }
                                    };
                                    return (jsxRuntime.jsx(react.Box, { px: 2, py: 1.5, borderRadius: "md", cursor: "pointer", _hover: {
                                            bg: 'bg.subtle',
                                        }, onClick: handleToggle, children: jsxRuntime.jsxs(react.HStack, { gap: 2, align: "start", children: [jsxRuntime.jsx(react.Box, { onClick: (e) => {
                                                        e.stopPropagation();
                                                    }, children: jsxRuntime.jsx(Checkbox, { checked: isActive, colorPalette: colorPalette, onCheckedChange: (details) => {
                                                            if (isArrayFilter) {
                                                                // Handle array-based filters (tag variant)
                                                                const currentArray = currentFilterValue ?? [];
                                                                if (details.checked) {
                                                                    // Add to filter
                                                                    if (!currentArray.includes(option.value)) {
                                                                        setFilterValue([
                                                                            ...currentArray,
                                                                            option.value,
                                                                        ]);
                                                                    }
                                                                }
                                                                else {
                                                                    // Remove from filter
                                                                    const newArray = currentArray.filter((v) => v !== option.value);
                                                                    if (newArray.length === 0) {
                                                                        setFilterValue(undefined);
                                                                    }
                                                                    else {
                                                                        setFilterValue(newArray);
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                // Handle single value filters (select variant)
                                                                if (details.checked) {
                                                                    setFilterValue(option.value);
                                                                }
                                                                else {
                                                                    setFilterValue(undefined);
                                                                }
                                                            }
                                                        } }) }), jsxRuntime.jsx(react.Box, { flex: 1, minW: 0, children: jsxRuntime.jsxs(react.HStack, { gap: 2, align: "center", children: [jsxRuntime.jsx(react.Box, { w: 3, h: 3, borderRadius: "full", bg: `${colorPalette}.500`, flexShrink: 0 }), jsxRuntime.jsx(react.Text, { fontSize: "sm", fontWeight: "medium", truncate: true, children: option.label })] }) })] }) }, option.value));
                                })) }) })] }) })] }));
};

// Generate a color based on column id for visual distinction
const getColorForColumn = (id) => {
    const colors = [
        'blue',
        'green',
        'purple',
        'orange',
        'pink',
        'cyan',
        'teal',
        'red',
    ];
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};
const TableFilterTags = ({ filterTagsOptions = [], } = {}) => {
    const { table, tableLabel } = useDataTableContext();
    // Get columns from filterTagsOptions
    const columnsWithFilters = React.useMemo(() => {
        if (filterTagsOptions.length === 0) {
            return [];
        }
        return filterTagsOptions
            .map((option) => {
            const column = table.getColumn(option.column);
            if (!column || !column.getCanFilter()) {
                return null;
            }
            const meta = column.columnDef.meta;
            const displayName = meta?.displayName ?? column.id;
            const filterVariant = meta?.filterVariant;
            if (!column) {
                return null;
            }
            return {
                columnId: option.column,
                displayName,
                filterOptions: option.options,
                filterVariant: (filterVariant === 'tag' ? 'tag' : 'select'),
                colorPalette: getColorForColumn(option.column),
                column,
            };
        })
            .filter((col) => col !== null && col.column !== null && col.column !== undefined);
    }, [table, filterTagsOptions]);
    if (columnsWithFilters.length === 0) {
        return null;
    }
    return (jsxRuntime.jsx(react.Flex, { gap: 2, flexWrap: "wrap", children: columnsWithFilters.map((column) => {
            const filterValue = column.column.getFilterValue();
            return (jsxRuntime.jsx(ColumnFilterMenu, { displayName: column.displayName, filterOptions: column.filterOptions, filterVariant: column.filterVariant, colorPalette: column.colorPalette, value: filterValue, onChange: (value) => column.column.setFilterValue(value), labels: {
                    filterByLabel: tableLabel.filterByLabel,
                    filterLabelsPlaceholder: tableLabel.filterLabelsPlaceholder,
                    noFiltersMatchText: tableLabel.noFiltersMatchText,
                } }, column.columnId));
        }) }));
};

const TableControls = ({ fitTableWidth = false, fitTableHeight = false, children = jsxRuntime.jsx(jsxRuntime.Fragment, {}), showGlobalFilter = false, showFilter = false, showReload = false, showPagination = true, showPageSizeControl = true, showPageCountText = true, showView = true, filterTagsOptions = [], extraItems = jsxRuntime.jsx(jsxRuntime.Fragment, {}), loading = false, hasError = false, gridProps = {}, }) => {
    const { tableLabel, table, columnFilters, setColumnFilters } = useDataTableContext();
    const { hasErrorText } = tableLabel;
    // Get applied filters with display information
    const appliedFilters = React.useMemo(() => {
        return columnFilters
            .map((filter) => {
            const column = table.getColumn(filter.id);
            if (!column)
                return null;
            const meta = column.columnDef.meta;
            const displayName = meta?.displayName ?? filter.id;
            const filterValue = filter.value;
            // Handle array values (tag filters)
            if (Array.isArray(filterValue)) {
                return {
                    columnId: filter.id,
                    displayName,
                    values: filterValue,
                    isArray: true,
                };
            }
            // Handle single values (select filters)
            if (filterValue !== undefined &&
                filterValue !== null &&
                filterValue !== '') {
                return {
                    columnId: filter.id,
                    displayName,
                    value: String(filterValue),
                    isArray: false,
                };
            }
            return null;
        })
            .filter((filter) => filter !== null);
    }, [columnFilters, table]);
    const handleRemoveFilter = (columnId) => {
        setColumnFilters(columnFilters.filter((f) => f.id !== columnId));
    };
    return (jsxRuntime.jsxs(react.Grid, { templateRows: 'auto 1fr', width: fitTableWidth ? 'fit-content' : '100%', height: fitTableHeight ? 'fit-content' : '100%', gap: '0.5rem', p: 1, ...gridProps, children: [jsxRuntime.jsx(react.Flex, { flexFlow: 'column', gap: 2, children: jsxRuntime.jsxs(react.Flex, { justifyContent: 'space-between', children: [jsxRuntime.jsxs(react.Flex, { gap: 2, alignItems: 'center', flexWrap: 'wrap', children: [showView && jsxRuntime.jsx(ViewDialog, { icon: jsxRuntime.jsx(md.MdOutlineViewColumn, {}) }), appliedFilters.length > 0 && (jsxRuntime.jsx(react.Flex, { gap: 1.5, alignItems: 'center', flexWrap: 'wrap', children: appliedFilters.map((filter) => {
                                        if (filter.isArray) {
                                            return filter.values.map((value, index) => (jsxRuntime.jsxs(Tag, { size: "sm", colorPalette: "blue", onClose: () => {
                                                    const column = table.getColumn(filter.columnId);
                                                    if (column) {
                                                        const currentValue = column.getFilterValue() ?? [];
                                                        const newValue = currentValue.filter((v) => v !== value);
                                                        if (newValue.length === 0) {
                                                            handleRemoveFilter(filter.columnId);
                                                        }
                                                        else {
                                                            column.setFilterValue(newValue);
                                                        }
                                                    }
                                                }, children: [filter.displayName, ": ", value] }, `${filter.columnId}-${value}-${index}`)));
                                        }
                                        return (jsxRuntime.jsxs(Tag, { size: "sm", colorPalette: "blue", onClose: () => handleRemoveFilter(filter.columnId), children: [filter.displayName, ": ", filter.value] }, filter.columnId));
                                    }) }))] }), jsxRuntime.jsxs(react.Flex, { gap: '0.5rem', alignItems: 'center', justifySelf: 'end', children: [loading && jsxRuntime.jsx(react.Spinner, { size: 'sm' }), hasError && (jsxRuntime.jsx(Tooltip, { content: hasErrorText, children: jsxRuntime.jsx(react.Icon, { as: bs.BsExclamationCircleFill, color: 'red.400' }) })), showGlobalFilter && jsxRuntime.jsx(GlobalFilter, {}), filterTagsOptions.length > 0 && (jsxRuntime.jsx(TableFilterTags, { filterTagsOptions: filterTagsOptions })), showFilter && jsxRuntime.jsx(FilterDialog, {}), showReload && jsxRuntime.jsx(ReloadButton, {}), extraItems] })] }) }), jsxRuntime.jsx(react.Grid, { children: children }), (showPageSizeControl || showPageCountText || showPagination) && (jsxRuntime.jsxs(react.Flex, { justifyContent: 'space-between', children: [jsxRuntime.jsxs(react.Flex, { gap: '1rem', alignItems: 'center', children: [showPageSizeControl && jsxRuntime.jsx(PageSizeControl, {}), showPageCountText && jsxRuntime.jsx(RowCountText, {})] }), jsxRuntime.jsx(react.Box, { justifySelf: 'end', children: showPagination && jsxRuntime.jsx(Pagination, {}) })] }))] }));
};

const EmptyState$1 = React__namespace.forwardRef(function EmptyState(props, ref) {
    const { title, description, icon, children, ...rest } = props;
    return (jsxRuntime.jsx(react.EmptyState.Root, { ref: ref, ...rest, children: jsxRuntime.jsxs(react.EmptyState.Content, { children: [icon && (jsxRuntime.jsx(react.EmptyState.Indicator, { children: icon })), description ? (jsxRuntime.jsxs(react.VStack, { textAlign: "center", children: [jsxRuntime.jsx(react.EmptyState.Title, { children: title }), jsxRuntime.jsx(react.EmptyState.Description, { children: description })] })) : (jsxRuntime.jsx(react.EmptyState.Title, { children: title })), children] }) }));
});

/**
 * Hook to automatically hide/show columns based on container width.
 * Columns are hidden based on their responsivePriority (lower = hide first).
 * Only activates when canResize={false}.
 */
const useResponsiveColumnVisibility = ({ containerRef, enabled, showSelector = false, }) => {
    const { table, setColumnVisibility } = useDataTableContext();
    const autoHiddenRef = React.useRef(new Set());
    const userBaselineRef = React.useRef(null);
    const SELECTION_BOX_WIDTH = 20;
    React.useEffect(() => {
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

const EmptyResult = (jsxRuntime.jsx(EmptyState$1, { icon: jsxRuntime.jsx(hi.HiColorSwatch, {}), title: "No results found", description: "Try adjusting your search", children: jsxRuntime.jsxs(react.List.Root, { variant: "marker", children: [jsxRuntime.jsx(react.List.Item, { children: "Try removing filters" }), jsxRuntime.jsx(react.List.Item, { children: "Try different keywords" })] }) }));
const Table = ({ children, emptyComponent = EmptyResult, canResize = true, showLoading = false, showSelector = false, ...props }) => {
    const { table } = useDataTableContext();
    const containerRef = React.useRef(null);
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
    return (jsxRuntime.jsx(react.Box, { ref: containerRef, width: "100%", overflow: "auto", children: jsxRuntime.jsx(react.Table.Root, { stickyHeader: true, width: canResize ? table.getCenterTotalSize() : undefined, display: 'grid', alignContent: 'start', ...props, children: children }) }));
};

const TableBody = ({ showSelector = false, canResize = true, }) => {
    'use no memo';
    const { table } = useDataTableContext();
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredRow, setHoveredRow] = React.useState(-1);
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
    return (jsxRuntime.jsx(react.Table.Body, { children: table.getRowModel().rows.map((row, index) => {
            return (jsxRuntime.jsxs(react.Table.Row, { display: 'flex', zIndex: 1, onMouseEnter: () => handleRowHover(index), onMouseLeave: () => handleRowHover(-1), ...getTrProps({ hoveredRow, index }), children: [showSelector && (jsxRuntime.jsx(TableRowSelector, { index: index, row: row, hoveredRow: hoveredRow })), row.getVisibleCells().map((cell, index) => {
                        return (jsxRuntime.jsx(react.Table.Cell, { padding: `${table.getDensityValue()}px`, 
                            // styling resize and pinning start
                            flex: `${canResize ? '0' : '1'} 0 ${cell.column.getSize()}px`, 
                            // this is to avoid the cell from being too wide
                            minWidth: `0`, ...getTdProps(cell), children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) }, `chakra-table-rowcell-${cell.id}-${index}`));
                    })] }, `chakra-table-row-${row.id}`));
        }) }));
};
const TableRowSelector = ({ row }) => {
    const { table, rowSelection, setRowSelection } = useDataTableContext();
    const SELECTION_BOX_WIDTH = 20;
    const isSelected = isRowSelected(row.id, rowSelection);
    const canSelect = canRowSelect(row);
    const toggleHandler = createRowToggleHandler(row, rowSelection, setRowSelection);
    return (jsxRuntime.jsx(react.Table.Cell, { padding: `${table.getDensityValue()}px`, display: 'grid', justifyItems: 'center', alignItems: 'center', children: jsxRuntime.jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, checked: isSelected,
            disabled: !canSelect,
            onCheckedChange: toggleHandler }) }));
};

const TableCardContainer = ({ children, variant = '', gap = '1rem', gridTemplateColumns = 'repeat(auto-fit, minmax(20rem, 1fr))', direction = 'row', ...props }) => {
    if (variant === 'carousel') {
        return (jsxRuntime.jsx(react.Flex, { overflow: 'auto', gap: gap, direction: direction, ...props, children: children }));
    }
    return (jsxRuntime.jsx(react.Grid, { gridTemplateColumns: gridTemplateColumns, gap: gap, ...props, children: children }));
};

const DefaultCardTitle = () => {
    return jsxRuntime.jsx(jsxRuntime.Fragment, {});
};
const TableCards = ({ isSelectable = false, showDisplayNameOnly = false, renderTitle = DefaultCardTitle, cardBodyProps = {}, }) => {
    const { table, rowSelection, setRowSelection } = useDataTableContext();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: table.getRowModel().rows.map((row) => {
            return (jsxRuntime.jsx(react.Card.Root, { flex: '1 0 20rem', children: jsxRuntime.jsxs(react.Card.Body, { display: 'flex', flexFlow: 'column', gap: '0.5rem', ...cardBodyProps, children: [isSelectable && (jsxRuntime.jsx(Checkbox, { checked: isRowSelected(row.id, rowSelection),
                            disabled: !canRowSelect(row),
                            // indeterminate: row.getIsSomeSelected(),
                            onChange: createRowToggleHandler(row, rowSelection, setRowSelection) })), renderTitle(row), jsxRuntime.jsx(react.Grid, { templateColumns: 'auto 1fr', gap: '1rem', children: row.getVisibleCells().map((cell) => {
                                return (jsxRuntime.jsxs(react.Box, { display: "contents", children: [jsxRuntime.jsxs(react.Box, { children: [showDisplayNameOnly && (jsxRuntime.jsx(react.Text, { fontWeight: 'bold', children: cell.column.columnDef.meta?.displayName ??
                                                        cell.column.id })), !showDisplayNameOnly && (jsxRuntime.jsx(jsxRuntime.Fragment, { children: reactTable.flexRender(cell.column.columnDef.header, 
                                                    // @ts-expect-error Assuming the CellContext interface is the same as HeaderContext
                                                    cell.getContext()) }))] }), jsxRuntime.jsx(react.Box, { justifySelf: 'end', children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) })] }, `chakra-table-cardcell-${cell.id}`));
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
    const [hoveredCheckBox, setHoveredCheckBox] = React.useState(false);
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
    return (jsxRuntime.jsx(react.Table.Footer, { children: table.getFooterGroups().map((footerGroup) => (jsxRuntime.jsxs(react.Table.Row, { display: 'flex', children: [showSelector && (jsxRuntime.jsx(react.Table.Cell, { padding: `${table.getDensityValue()}px`, onMouseEnter: () => handleRowHover(true), onMouseLeave: () => handleRowHover(false), display: 'grid', justifyItems: 'center', alignItems: 'center', color: {
                        base: 'colorPalette.900',
                        _dark: 'colorPalette.100',
                    },
                    bg: { base: 'colorPalette.50', _dark: 'colorPalette.950' }, children: isCheckBoxVisible() ? (jsxRuntime.jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, checked: areAllRowsSelected(table, rowSelection),
                        // indeterminate: areSomeRowsSelected(table, rowSelection),
                        onChange: createToggleAllRowsHandler(table, rowSelection, setRowSelection) })) : (jsxRuntime.jsx(react.Box, { as: "span", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` })) })), footerGroup.headers.map((header) => (jsxRuntime.jsx(react.Table.Cell, { padding: '0', columnSpan: `${header.colSpan}`, 
                    // styling resize and pinning start
                    maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, display: 'grid', children: jsxRuntime.jsx(react.MenuRoot, { children: jsxRuntime.jsx(react.MenuTrigger, { asChild: true, children: jsxRuntime.jsx(react.Box, { padding: `${table.getDensityValue()}px`, display: 'flex', alignItems: 'center', justifyContent: 'start', borderRadius: '0rem', children: jsxRuntime.jsxs(react.Flex, { gap: "0.5rem", alignItems: 'center', children: [header.isPlaceholder
                                            ? null
                                            : reactTable.flexRender(header.column.columnDef.footer, header.getContext()), jsxRuntime.jsx(react.Box, { children: header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [header.column.getIsSorted() === false && jsxRuntime.jsx(jsxRuntime.Fragment, {}), header.column.getIsSorted() === 'asc' && (jsxRuntime.jsx(bi.BiUpArrow, {})), header.column.getIsSorted() === 'desc' && (jsxRuntime.jsx(bi.BiDownArrow, {}))] })) })] }) }) }) }) }, `chakra-table-footer-${header.column.id}-${footerGroup.id}`)))] }, `chakra-table-footergroup-${footerGroup.id}`))) }));
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
    return (jsxRuntime.jsx(react.Table.Header, { ...(isSticky ? stickyProps : {}), ...tableHeaderProps, children: table.getHeaderGroups().map((headerGroup) => (jsxRuntime.jsxs(react.Table.Row, { display: 'flex', ...tableRowProps, children: [showSelector && (jsxRuntime.jsx(react.Table.ColumnHeader, { padding: `${table.getDensityValue()}px`, display: 'grid', justifyItems: 'center', alignItems: 'center', children: jsxRuntime.jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, checked: areAllRowsSelected(table, rowSelection),
                        // indeterminate: areSomeRowsSelected(table, rowSelection),
                        onChange: createToggleAllRowsHandler(table, rowSelection, setRowSelection) }) })), headerGroup.headers.map((header) => {
                    const resizeProps = {
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        cursor: 'col-resize',
                    };
                    return (jsxRuntime.jsxs(react.Table.ColumnHeader, { padding: 0, columnSpan: `${header.colSpan}`, 
                        // styling resize and pinning start
                        flex: `${canResize ? '0' : '1'} 0 ${header.column.getSize()}px`, display: 'grid', gridTemplateColumns: '1fr auto', zIndex: 1500 + header.index, children: [jsxRuntime.jsxs(MenuRoot, { children: [jsxRuntime.jsx(MenuTrigger, { asChild: true, children: jsxRuntime.jsx(react.Flex, { padding: `${table.getDensityValue()}px`, alignItems: 'center', justifyContent: 'start', borderRadius: '0rem', overflow: 'auto', children: jsxRuntime.jsxs(react.Flex, { gap: "0.5rem", alignItems: 'center', children: [header.isPlaceholder
                                                        ? null
                                                        : reactTable.flexRender(header.column.columnDef.header, header.getContext()), jsxRuntime.jsx(react.Box, { children: header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [header.column.getIsSorted() === false && jsxRuntime.jsx(jsxRuntime.Fragment, {}), header.column.getIsSorted() === 'asc' && (jsxRuntime.jsx(bi.BiUpArrow, {})), header.column.getIsSorted() === 'desc' && (jsxRuntime.jsx(bi.BiDownArrow, {}))] })) }), jsxRuntime.jsx(react.Box, { children: header.column.getIsFiltered() && jsxRuntime.jsx(md.MdFilterListAlt, {}) })] }) }) }), jsxRuntime.jsxs(MenuContent, { children: [!header.column.getIsPinned() && (jsxRuntime.jsx(MenuItem, { asChild: true, value: "pin-column", children: jsxRuntime.jsxs(Button, { variant: 'ghost', onClick: () => {
                                                        header.column.pin('left');
                                                    }, p: 1, children: [jsxRuntime.jsx(md.MdPushPin, {}), getHeaderText(header, 'pinColumn')] }) })), header.column.getIsPinned() && (jsxRuntime.jsx(MenuItem, { asChild: true, value: "cancel-pin", children: jsxRuntime.jsxs(Button, { variant: 'ghost', onClick: () => {
                                                        header.column.pin(false);
                                                    }, children: [jsxRuntime.jsx(md.MdCancel, {}), getHeaderText(header, 'cancelPin')] }) })), header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(MenuItem, { asChild: true, value: "sort-ascend", children: jsxRuntime.jsxs(Button, { variant: 'ghost', onClick: () => {
                                                                table.setSorting((state) => {
                                                                    return [
                                                                        ...state.filter((column) => {
                                                                            return column.id !== header.id;
                                                                        }),
                                                                        { id: header.id, desc: false },
                                                                    ];
                                                                });
                                                            }, children: [jsxRuntime.jsx(gr.GrAscend, {}), getHeaderText(header, 'sortAscending')] }) }), jsxRuntime.jsx(MenuItem, { asChild: true, value: "sort-descend", children: jsxRuntime.jsxs(Button, { variant: 'ghost', onClick: () => {
                                                                table.setSorting((state) => {
                                                                    return [
                                                                        ...state.filter((column) => {
                                                                            return column.id !== header.id;
                                                                        }),
                                                                        { id: header.id, desc: true },
                                                                    ];
                                                                });
                                                            }, children: [jsxRuntime.jsx(gr.GrDescend, {}), getHeaderText(header, 'sortDescending')] }) }), header.column.getIsSorted() && (jsxRuntime.jsx(MenuItem, { asChild: true, value: "clear-sorting", children: jsxRuntime.jsxs(Button, { variant: 'ghost', onClick: () => {
                                                                header.column.clearSorting();
                                                            }, children: [jsxRuntime.jsx(md.MdClear, {}), getHeaderText(header, 'clearSorting')] }) }))] }))] })] }), canResize && (jsxRuntime.jsx(react.Box, { borderRight: '0.2rem solid', borderRightColor: header.column.getIsResizing()
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
    return jsxRuntime.jsx(jsxRuntime.Fragment, { children: render(query.isLoading) });
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
        parts.push(jsxRuntime.jsx(react.Text, { as: "mark", bg: {
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
    return parts.length > 0 ? jsxRuntime.jsx(jsxRuntime.Fragment, { children: parts }) : textStr;
};
const TextWithCopy = ({ text, globalFilter, highlightedText, }) => {
    const textValue = String(text ?? '');
    const displayText = highlightedText !== undefined
        ? highlightedText
        : highlightText$1(textValue, globalFilter);
    return (jsxRuntime.jsxs(react.HStack, { gap: 2, alignItems: "center", children: [jsxRuntime.jsx(react.Text, { as: "span", children: displayText }), jsxRuntime.jsx(react.Clipboard.Root, { value: textValue, children: jsxRuntime.jsx(react.Clipboard.Trigger, { asChild: true, children: jsxRuntime.jsx(react.IconButton, { size: "2xs", variant: "ghost", "aria-label": "Copy", fontSize: "1em", children: jsxRuntime.jsx(react.Clipboard.Indicator, { copied: jsxRuntime.jsx(lu.LuCheck, {}), children: jsxRuntime.jsx(lu.LuCopy, {}) }) }) }) })] }));
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
        parts.push(jsxRuntime.jsx(react.Text, { as: "mark", bg: {
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
    return parts.length > 0 ? jsxRuntime.jsx(jsxRuntime.Fragment, { children: parts }) : textStr;
};
const RenderValue = ({ text, href, onClick, isCopyable, isBadge, badgeColor, colorPalette, globalFilter, alignEnd = false, }) => {
    const highlightedText = React.useMemo(() => highlightText(text ?? '', globalFilter), [text, globalFilter]);
    if (isBadge) {
        return (jsxRuntime.jsx(react.Badge, { colorPalette: colorPalette || badgeColor, children: highlightedText }));
    }
    // onClick takes precedence over href
    if (onClick) {
        return (jsxRuntime.jsx(react.Box, { as: "button", onClick: onClick, cursor: "pointer", textAlign: alignEnd ? 'right' : 'left', _hover: {
                textDecoration: 'underline',
                color: {
                    base: 'blue.500',
                    _dark: 'blue.400',
                },
            }, transition: "all 0.2s", children: highlightedText }));
    }
    if (href) {
        return (jsxRuntime.jsxs(react.Link, { href: href, target: "_blank", rel: "noopener noreferrer", _hover: {
                textDecoration: 'underline',
            }, children: [highlightedText, " ", jsxRuntime.jsx(react.Icon, { as: lu.LuExternalLink })] }));
    }
    if (isCopyable) {
        return (jsxRuntime.jsx(TextWithCopy, { text: text, globalFilter: globalFilter, highlightedText: highlightedText }));
    }
    return jsxRuntime.jsx(jsxRuntime.Fragment, { children: highlightedText });
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
            return (jsxRuntime.jsx(react.Flex, { alignItems: 'center', justifyContent: flexJustifyContent, height: '100%', ...containerProps, children: jsxRuntime.jsx(Tooltip, { content: jsxRuntime.jsx(react.Text, { as: "span", overflow: "hidden", textOverflow: 'ellipsis', children: label }), children: jsxRuntime.jsx(react.Text, { as: "span", overflow: "hidden", textOverflow: 'ellipsis', wordBreak: 'break-all', textAlign: textAlign, ...textProps, children: highlightedDisplayText }) }) }));
        }
        return (jsxRuntime.jsx(react.Flex, { alignItems: 'center', justifyContent: flexJustifyContent, height: '100%', ...containerProps, children: jsxRuntime.jsx(react.Text, { as: "span", overflow: "hidden", textOverflow: 'ellipsis', wordBreak: 'break-all', textAlign: textAlign, ...textProps, children: highlightedDisplayText }) }));
    }
    // New API: use text prop
    const displayValue = text ?? children;
    if (Array.isArray(displayValue)) {
        return (jsxRuntime.jsx(react.Flex, { gap: 2, flexWrap: "wrap", justifyContent: alignEnd ? 'flex-end' : undefined, children: displayValue.map((item, index) => {
                const highlightedItem = highlightText(item, globalFilter);
                return (jsxRuntime.jsx(react.Badge, { colorPalette: colorPalette || badgeColor, children: highlightedItem }, index));
            }) }));
    }
    if (!!displayValue === false) {
        return (jsxRuntime.jsx(react.Text, { textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", wordBreak: "break-all", display: "flex", alignItems: "center", justifyContent: alignEnd ? 'flex-end' : undefined, height: "100%", textAlign: alignEnd ? 'right' : undefined, children: "-" }));
    }
    return (jsxRuntime.jsx(react.Box, { textOverflow: "ellipsis", whiteSpace: "nowrap", wordBreak: "break-all", overflow: "auto", display: "flex", alignItems: "center", justifyContent: alignEnd ? 'flex-end' : undefined, height: "100%", textAlign: alignEnd ? 'right' : undefined, children: jsxRuntime.jsx(RenderValue, { text: displayValue, href: href, onClick: onClick, isCopyable: isCopyable, isBadge: isBadge, badgeColor: badgeColor, colorPalette: colorPalette, globalFilter: globalFilter, alignEnd: alignEnd }) }));
};

const CardHeader = ({ row, imageColumnId = undefined, titleColumnId = undefined, tagColumnId = undefined, tagIcon = undefined, showTag = true, imageProps = {}, }) => {
    if (!!row.original === false) {
        return jsxRuntime.jsx(jsxRuntime.Fragment, {});
    }
    const isShowFirstColumn = !!titleColumnId || showTag;
    return (jsxRuntime.jsxs(react.Grid, { templateRows: "auto auto", gap: "1rem", children: [!!imageColumnId && (jsxRuntime.jsx(react.Image, { width: "100%", src: row.original[imageColumnId], ...imageProps })), isShowFirstColumn && (jsxRuntime.jsxs(react.Flex, { gap: "0.5rem", flexFlow: "wrap", children: [!!titleColumnId && (jsxRuntime.jsx(react.Text, { fontWeight: "bold", fontSize: "large", children: row.original[titleColumnId] })), showTag && (jsxRuntime.jsx(Tag, { fontSize: "large", startElement: tagIcon && tagIcon({}), children: row.original[tagColumnId] }))] }))] }));
};

const EmptyState = ({ title = "No records", description = "Add a new events to get started or refine your search", }) => {
    const { isEmpty } = useDataTableServerContext();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: isEmpty && (jsxRuntime.jsx(react.EmptyState.Root, { children: jsxRuntime.jsxs(react.EmptyState.Content, { children: [jsxRuntime.jsx(react.EmptyState.Indicator, { children: jsxRuntime.jsx(hi.HiColorSwatch, {}) }), jsxRuntime.jsxs(react.VStack, { textAlign: "center", children: [jsxRuntime.jsx(react.EmptyState.Title, { children: title }), jsxRuntime.jsx(react.EmptyState.Description, { children: description })] })] }) })) }));
};

const ErrorAlert = ({ showMessage = true }) => {
    const { query } = useDataTableServerContext();
    const { isError, error } = query;
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: isError && (jsxRuntime.jsxs(react.Alert.Root, { status: "error", children: [jsxRuntime.jsx(react.Alert.Indicator, {}), jsxRuntime.jsxs(react.Alert.Content, { children: [jsxRuntime.jsx(react.Alert.Title, { children: error.name }), showMessage && (jsxRuntime.jsx(react.Alert.Description, { children: error.message }))] })] })) }));
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
    const [sorting, setSorting] = React.useState(defaultSorting);
    const [columnFilters, setColumnFilters] = React.useState(defaultColumnFilters); // can set initial column filter state here
    const [pagination, setPagination] = React.useState(defaultPagination);
    const [rowSelection, setRowSelection] = React.useState(defaultRowSelection);
    const [columnOrder, setColumnOrder] = React.useState(defaultColumnOrder);
    const [globalFilter, setGlobalFilter] = React.useState(defaultGlobalFilter);
    const [density, setDensity] = React.useState(defaultDensity);
    const [columnVisibility, setColumnVisibility] = React.useState(defaultColumnVisibility);
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
    const { url, default: defaultProps, placeholderData, queryFn: customQueryFn, debounce = true, debounceDelay = 1000, } = props;
    const { sorting: defaultSorting, pagination: defaultPagination, rowSelection: defaultRowSelection, columnFilters: defaultColumnFilters, columnOrder: defaultColumnOrder, columnVisibility: defaultColumnVisibility, globalFilter: defaultGlobalFilter, density: defaultDensity, } = defaultProps || {};
    const [sorting, setSorting] = React.useState(defaultSorting || []);
    const [columnFilters, setColumnFilters] = React.useState(defaultColumnFilters || []); // can set initial column filter state here
    const [pagination, setPagination] = React.useState(defaultPagination || {
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
    const [rowSelection, setRowSelection] = React.useState(defaultRowSelection || {});
    const [columnOrder, setColumnOrder] = React.useState(defaultColumnOrder || []);
    const [globalFilter, setGlobalFilter] = React.useState(defaultGlobalFilter || '');
    const [density, setDensity] = React.useState(defaultDensity || 'sm');
    const [columnVisibility, setColumnVisibility] = React.useState(defaultColumnVisibility || {});
    const { pageSize, pageIndex } = pagination;
    // Debounce params if debounce is enabled
    const paramsKey = React.useMemo(() => JSON.stringify({
        offset: pageIndex * pageSize,
        limit: pageSize,
        sorting,
        where: columnFilters,
        searching: globalFilter,
    }), [pageIndex, pageSize, sorting, columnFilters, globalFilter]);
    const debouncedParamsKey = debounce
        ? usehooks.useDebounce(paramsKey, debounceDelay)
        : paramsKey;
    // Parse debounced params key back to params object
    const params = React.useMemo(() => {
        return JSON.parse(debouncedParamsKey);
    }, [debouncedParamsKey]);
    const defaultQueryFn = async () => {
        if (!url) {
            throw new Error('url is required');
        }
        const response = await axios.get(url, {
            params,
        });
        return response.data;
    };
    const query = reactQuery.useQuery({
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

//@ts-expect-error TODO: find appropriate type
const SchemaFormContext = React.createContext({
    schema: {},
    onSubmit: async () => { },
    timezone: 'Asia/Hong_Kong',
});

const useSchemaContext = () => {
    return React.useContext(SchemaFormContext);
};

const useFormLabel = (column, prefix = '', schema) => {
    const colLabel = `${prefix}${column}`;
    return {
        /**
         * The constructed column label (prefix + column)
         */
        colLabel,
        /**
         * Get the field label from schema title property.
         * Logs a debug message if title is missing.
         */
        label: () => {
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
                    errorMessage: schema.errorMessage
                        ? Object.keys(schema.errorMessage)
                        : undefined,
                },
            });
            // Return column name as fallback
            return column;
        },
    };
};

const ArrayRenderer = ({ schema, column, prefix, }) => {
    const { gridRow, gridColumn = '1/span 12', required, items } = schema;
    const itemsSchema = Array.isArray(items) ? items[0] : items;
    const { type } = itemsSchema ?? {};
    const colLabel = `${prefix}${column}`;
    const isRequired = required?.some((columnId) => columnId === column);
    const formI18n = useFormLabel(column, prefix, schema);
    const { setValue, watch } = reactHookForm.useFormContext();
    const { formButtonLabels } = useSchemaContext();
    const fields = (watch(colLabel) ?? []);
    return (jsxRuntime.jsxs(react.Flex, { gridRow, gridColumn, flexFlow: 'column', gap: 2, children: [jsxRuntime.jsxs(react.Box, { as: "label", children: [formI18n.label(), isRequired && jsxRuntime.jsx("span", { children: "*" })] }), jsxRuntime.jsx(react.Flex, { flexFlow: 'column', gap: 2, children: fields.map((_, index) => (jsxRuntime.jsxs(react.Grid, { gridTemplateColumns: '1fr auto', gap: 2, bgColor: { base: 'colorPalette.100', _dark: 'colorPalette.900' }, p: 2, borderRadius: 4, borderWidth: 1, borderColor: {
                        base: 'colorPalette.200',
                        _dark: 'colorPalette.800',
                    }, children: [jsxRuntime.jsx(react.Grid, { gridTemplateColumns: 'repeat(12, 1fr)', autoFlow: 'row', children: jsxRuntime.jsx(SchemaRenderer, { column: `${index}`,
                                prefix: `${colLabel}.`,
                                schema: {
                                    showLabel: false,
                                    ...(Array.isArray(items) ? items[0] : items ?? {}),
                                } }) }), jsxRuntime.jsx(react.Flex, { justifyContent: 'end', children: jsxRuntime.jsx(react.Button, { variant: 'ghost', onClick: () => {
                                    setValue(colLabel, fields.filter((_, curIndex) => {
                                        return curIndex !== index;
                                    }));
                                }, children: jsxRuntime.jsx(react.Icon, { children: jsxRuntime.jsx(cg.CgTrash, {}) }) }) })] }, `${colLabel}.${index}`))) }), jsxRuntime.jsx(react.Flex, { children: jsxRuntime.jsx(react.Button, { onClick: () => {
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
                    }, children: formButtonLabels?.add ?? 'Add' }) })] }));
};

const Field = React__namespace.forwardRef(function Field(props, ref) {
    const { label, children, helperText, errorText, optionalText, ...rest } = props;
    return (jsxRuntime.jsxs(react.Field.Root, { ref: ref, ...rest, children: [label && (jsxRuntime.jsxs(react.Field.Label, { children: [label, jsxRuntime.jsx(react.Field.RequiredIndicator, { color: rest.invalid && rest.required ? 'red.500' : undefined, fallback: optionalText })] })), children, helperText && (jsxRuntime.jsx(react.Field.HelperText, { children: helperText })), !!errorText && (jsxRuntime.jsxs(react.Field.ErrorText, { children: [rest.required && rest.invalid && (jsxRuntime.jsx("span", { style: { color: 'var(--chakra-colors-red-500)' }, children: "* " })), errorText] }))] }));
});

/**
 * Get nested error message from react-hook-form errors object.
 * For nested fields like 'address.street', errors are stored as
 * errors.address.street, not errors['address.street'].
 * This utility traverses the nested structure to find the error.
 *
 * @param errors - The errors object from react-hook-form
 * @param path - The field path (e.g., 'address.street' or 'contact.info.email')
 * @returns The error message string or undefined if no error
 */
const getNestedError = (errors, path) => {
    if (!errors || !path)
        return undefined;
    const parts = path.split('.');
    let current = errors;
    for (const part of parts) {
        if (current === undefined || current === null) {
            return undefined;
        }
        current = current[part];
    }
    // Return the message if it exists
    return current?.message;
};

const BooleanPicker = ({ schema, column, prefix }) => {
    const { watch, formState: { errors }, setValue, } = reactHookForm.useFormContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const value = watch(colLabel);
    const formI18n = useFormLabel(column, prefix, schema);
    const fieldError = getNestedError(errors, colLabel);
    return (jsxRuntime.jsx(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: jsxRuntime.jsx(jsxRuntime.Fragment, { children: fieldError }), invalid: !!fieldError, children: jsxRuntime.jsx(CheckboxCard, { checked: value, variant: 'surface', onChange: () => {
                setValue(colLabel, !value);
            } }) }));
};

const CustomInput = ({ column, schema, prefix }) => {
    const formContext = reactHookForm.useFormContext();
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
    const { labels } = React.useContext(DatePickerContext);
    const { monthNamesShort, weekdayNamesShort } = labels;
    if (calendars.length) {
        return (jsxRuntime.jsx(react.Grid, { children: jsxRuntime.jsx(react.Grid, { templateColumns: 'repeat(2, auto)', justifyContent: 'center', children: calendars.map((calendar) => (jsxRuntime.jsxs(react.Grid, { gap: 2, children: [jsxRuntime.jsxs(react.Grid, { templateColumns: 'repeat(6, auto)', justifyContent: 'center', alignItems: 'center', gap: 2, children: [jsxRuntime.jsx(react.Button, { variant: 'ghost', size: 'sm', colorPalette: 'gray', ...getBackProps({ calendars }), children: '<' }), jsxRuntime.jsx(react.Text, { textAlign: 'center', children: monthNamesShort[calendar.month] }), jsxRuntime.jsx(react.Button, { variant: 'ghost', size: 'sm', colorPalette: 'gray', ...getForwardProps({ calendars }), children: '>' }), jsxRuntime.jsx(react.Button, { variant: 'ghost', size: 'sm', colorPalette: 'gray', ...getBackProps({
                                        calendars,
                                        offset: 12,
                                    }), children: '<' }), jsxRuntime.jsx(react.Text, { textAlign: 'center', children: calendar.year }), jsxRuntime.jsx(react.Button, { variant: 'ghost', size: 'sm', colorPalette: 'gray', ...getForwardProps({
                                        calendars,
                                        offset: 12,
                                    }), children: '>' })] }), jsxRuntime.jsxs(react.Grid, { templateColumns: 'repeat(7, auto)', justifyContent: 'center', children: [[0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
                                    const weekday = (weekdayNum + firstDayOfWeek) % 7;
                                    return (jsxRuntime.jsx(react.Text, { textAlign: 'center', children: weekdayNamesShort[weekday] }, `${calendar.month}${calendar.year}${weekday}`));
                                }), calendar.weeks.map((week, weekIndex) => week.map((dateObj, index) => {
                                    const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                                    if (!dateObj) {
                                        return jsxRuntime.jsx(react.Grid, {}, key);
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
                                            return 'surface';
                                        }
                                        if (today) {
                                            return 'outline';
                                        }
                                        return 'ghost';
                                    };
                                    const color = getDateColor({ today, selected, selectable });
                                    const variant = getVariant({ today, selected, selectable });
                                    return (jsxRuntime.jsx(react.Button, { variant: variant, colorPalette: color, size: 'xs', opacity: isCurrentMonth ? 1 : 0.4, ...getDateProps({ dateObj }), children: selectable ? date.getDate() : 'X' }, key));
                                }))] })] }, `${calendar.month}${calendar.year}`))) }) }));
    }
    return null;
};

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
const DatePickerContext = React.createContext({
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
        todayLabel: 'Today',
        yesterdayLabel: 'Yesterday',
        tomorrowLabel: 'Tomorrow',
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
    todayLabel: 'Today',
    yesterdayLabel: 'Yesterday',
    tomorrowLabel: 'Tomorrow',
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
    return (jsxRuntime.jsx(DatePickerContext.Provider, { value: { labels }, children: render ? (render(calendarData)) : (jsxRuntime.jsx(Calendar, { ...calendarData,
            firstDayOfWeek })) }));
};
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
    todayLabel: 'Today',
    yesterdayLabel: 'Yesterday',
    tomorrowLabel: 'Tomorrow',
}, timezone = 'Asia/Hong_Kong', minDate, maxDate, firstDayOfWeek, showOutsideDays, monthsToDisplay = 1, insideDialog = false, readOnly = false, showHelperButtons = true, }) {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const initialFocusEl = React.useRef(null);
    // Sync inputValue with value prop changes
    React.useEffect(() => {
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
    }, [value, timezone, displayFormat]);
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
        console.debug('[DatePickerInput] handleDateSelected called:', {
            date: date.toISOString(),
            timezone,
            dateFormat,
            formattedDate: dayjs(date).tz(timezone).format(dateFormat),
        });
        const formattedDate = dayjs(date).tz(timezone).format(dateFormat);
        console.debug('[DatePickerInput] Calling onChange with formatted date:', formattedDate);
        onChange?.(formattedDate);
        setOpen(false);
    };
    // Helper function to get dates in the correct timezone
    const getToday = () => dayjs().tz(timezone).startOf('day').toDate();
    const getYesterday = () => dayjs().tz(timezone).subtract(1, 'day').startOf('day').toDate();
    const getTomorrow = () => dayjs().tz(timezone).add(1, 'day').startOf('day').toDate();
    // Check if a date is within min/max constraints
    const isDateValid = (date) => {
        if (minDate) {
            const minDateStart = dayjs(minDate).tz(timezone).startOf('day').toDate();
            const dateStart = dayjs(date).tz(timezone).startOf('day').toDate();
            if (dateStart < minDateStart)
                return false;
        }
        if (maxDate) {
            const maxDateStart = dayjs(maxDate).tz(timezone).startOf('day').toDate();
            const dateStart = dayjs(date).tz(timezone).startOf('day').toDate();
            if (dateStart > maxDateStart)
                return false;
        }
        return true;
    };
    const handleHelperButtonClick = (date) => {
        if (isDateValid(date)) {
            handleDateSelected({ date });
        }
    };
    const today = getToday();
    const yesterday = getYesterday();
    const tomorrow = getTomorrow();
    const datePickerContent = (jsxRuntime.jsxs(react.Grid, { gap: 2, children: [showHelperButtons && (jsxRuntime.jsxs(react.Grid, { templateColumns: "repeat(3, 1fr)", gap: 2, children: [jsxRuntime.jsx(react.Button, { size: "sm", variant: "outline", onClick: () => handleHelperButtonClick(yesterday), disabled: !isDateValid(yesterday), children: labels.yesterdayLabel ?? 'Yesterday' }), jsxRuntime.jsx(react.Button, { size: "sm", variant: "outline", onClick: () => handleHelperButtonClick(today), disabled: !isDateValid(today), children: labels.todayLabel ?? 'Today' }), jsxRuntime.jsx(react.Button, { size: "sm", variant: "outline", onClick: () => handleHelperButtonClick(tomorrow), disabled: !isDateValid(tomorrow), children: labels.tomorrowLabel ?? 'Tomorrow' })] })), jsxRuntime.jsx(DatePicker$1, { selected: selectedDate, onDateSelected: handleDateSelected, labels: labels, minDate: minDate, maxDate: maxDate, firstDayOfWeek: firstDayOfWeek, showOutsideDays: showOutsideDays, monthsToDisplay: monthsToDisplay })] }));
    return (jsxRuntime.jsxs(react.Popover.Root, { open: open, onOpenChange: (e) => setOpen(e.open), closeOnInteractOutside: false, autoFocus: false, initialFocusEl: () => initialFocusEl.current, children: [jsxRuntime.jsx(InputGroup, { endElement: jsxRuntime.jsx(react.Popover.Trigger, { asChild: true, children: jsxRuntime.jsx(react.IconButton, { variant: "ghost", size: "2xs", "aria-label": "Open calendar", onClick: () => setOpen(true), children: jsxRuntime.jsx(react.Icon, { children: jsxRuntime.jsx(md.MdDateRange, {}) }) }) }), children: jsxRuntime.jsx(react.Input, { value: inputValue, onChange: handleInputChange, onBlur: handleInputBlur, onKeyDown: handleKeyDown, placeholder: placeholder, readOnly: readOnly, ref: initialFocusEl }) }), jsxRuntime.jsx(react.Portal, { disabled: insideDialog, children: jsxRuntime.jsx(react.Popover.Positioner, { children: jsxRuntime.jsx(react.Popover.Content, { width: "fit-content", minH: "25rem", children: jsxRuntime.jsx(react.Popover.Body, { children: datePickerContent }) }) }) })] }));
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
const DatePicker = ({ column, schema, prefix }) => {
    const { watch, formState: { errors }, setValue, } = reactHookForm.useFormContext();
    const { timezone, dateTimePickerLabels, insideDialog } = useSchemaContext();
    const formI18n = useFormLabel(column, prefix, schema);
    const { required, gridColumn = 'span 12', gridRow = 'span 1', displayDateFormat = 'YYYY-MM-DD', dateFormat = 'YYYY-MM-DD', } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = formI18n.colLabel;
    const fieldError = getNestedError(errors, colLabel);
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const selectedDate = watch(colLabel);
    const initialFocusEl = React.useRef(null);
    // Update input value when form value changes
    React.useEffect(() => {
        if (selectedDate) {
            const parsedDate = dayjs(selectedDate).tz(timezone);
            if (parsedDate.isValid()) {
                const formatted = parsedDate.format(displayDateFormat);
                setInputValue(formatted);
            }
            else {
                setInputValue('');
            }
        }
        else {
            setInputValue('');
        }
    }, [selectedDate, displayDateFormat, timezone]);
    // Format and validate existing value
    React.useEffect(() => {
        try {
            if (selectedDate) {
                // Parse the selectedDate as UTC or in a specific timezone to avoid +8 hour shift
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
    }, [selectedDate, dateFormat, colLabel, setValue, timezone]);
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
    // Convert value to Date object for DatePicker
    const selectedDateObj = selectedDate
        ? dayjs(selectedDate).tz(timezone).isValid()
            ? dayjs(selectedDate).tz(timezone).toDate()
            : new Date()
        : new Date();
    // Shared function to parse and validate input value
    const parseAndValidateInput = (inputVal) => {
        // If empty, clear the value
        if (!inputVal.trim()) {
            setValue(colLabel, undefined, {
                shouldValidate: true,
                shouldDirty: true,
            });
            setInputValue('');
            return;
        }
        // Try parsing with displayDateFormat first
        let parsedDate = dayjs(inputVal, displayDateFormat, true);
        // If that fails, try common date formats
        if (!parsedDate.isValid()) {
            parsedDate = dayjs(inputVal);
        }
        // If still invalid, try parsing with dateFormat
        if (!parsedDate.isValid()) {
            parsedDate = dayjs(inputVal, dateFormat, true);
        }
        // If valid, format and update
        if (parsedDate.isValid()) {
            const formattedDate = parsedDate.tz(timezone).format(dateFormat);
            const formattedDisplay = parsedDate
                .tz(timezone)
                .format(displayDateFormat);
            setValue(colLabel, formattedDate, {
                shouldValidate: true,
                shouldDirty: true,
            });
            setInputValue(formattedDisplay);
        }
        else {
            // Invalid date - reset to prop value
            resetToPropValue();
        }
    };
    // Helper function to reset input to prop value
    const resetToPropValue = () => {
        if (selectedDate) {
            const parsedDate = dayjs(selectedDate).tz(timezone);
            if (parsedDate.isValid()) {
                const formatted = parsedDate.format(displayDateFormat);
                setInputValue(formatted);
            }
            else {
                setInputValue('');
            }
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
        setValue(colLabel, formattedDate, {
            shouldValidate: true,
            shouldDirty: true,
        });
        setOpen(false);
    };
    const datePickerContent = (jsxRuntime.jsx(DatePicker$1, { selected: selectedDateObj, onDateSelected: handleDateSelected, labels: datePickerLabels }));
    return (jsxRuntime.jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: jsxRuntime.jsx(jsxRuntime.Fragment, { children: fieldError }), invalid: !!fieldError, children: [jsxRuntime.jsx("input", { type: "hidden", name: colLabel, value: selectedDate ?? '', readOnly: true, "aria-hidden": true }), jsxRuntime.jsxs(react.Popover.Root, { open: open, onOpenChange: (e) => setOpen(e.open), initialFocusEl: () => initialFocusEl.current, closeOnInteractOutside: false, autoFocus: false, children: [jsxRuntime.jsx(InputGroup, { endElement: jsxRuntime.jsx(react.Popover.Trigger, { asChild: true, children: jsxRuntime.jsx(react.IconButton, { variant: "ghost", size: "2xs", "aria-label": "Open calendar", onClick: () => setOpen(true), children: jsxRuntime.jsx(react.Icon, { children: jsxRuntime.jsx(md.MdDateRange, {}) }) }) }), children: jsxRuntime.jsx(react.Input, { value: inputValue, onChange: handleInputChange, onBlur: handleInputBlur, onKeyDown: handleKeyDown, placeholder: formI18n.label(), ref: initialFocusEl, size: "sm", "aria-label": formI18n.label() }) }), jsxRuntime.jsx(react.Portal, { disabled: insideDialog, children: jsxRuntime.jsx(react.Popover.Positioner, { children: jsxRuntime.jsx(react.Popover.Content, { width: "fit-content", minH: "25rem", children: jsxRuntime.jsx(react.Popover.Body, { children: datePickerContent }) }) }) })] })] }));
};

dayjs.extend(utc);
dayjs.extend(timezone);
const DateRangePicker = ({ column, schema, prefix, }) => {
    const { watch, formState: { errors }, setValue, } = reactHookForm.useFormContext();
    const { timezone, insideDialog } = useSchemaContext();
    const formI18n = useFormLabel(column, prefix, schema);
    const { required, gridColumn = 'span 12', gridRow = 'span 1', displayDateFormat = 'YYYY-MM-DD', dateFormat = 'YYYY-MM-DD', } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = formI18n.colLabel;
    const fieldError = getNestedError(errors, colLabel);
    const [open, setOpen] = React.useState(false);
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
    React.useEffect(() => {
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
    return (jsxRuntime.jsx(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: jsxRuntime.jsx(jsxRuntime.Fragment, { children: fieldError }), invalid: !!fieldError, children: jsxRuntime.jsxs(react.Popover.Root, { open: open, onOpenChange: (e) => setOpen(e.open), closeOnInteractOutside: true, children: [jsxRuntime.jsx(react.Popover.Trigger, { asChild: true, children: jsxRuntime.jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
                            setOpen(true);
                        }, justifyContent: 'start', children: [jsxRuntime.jsx(md.MdDateRange, {}), getDisplayText()] }) }), insideDialog ? (jsxRuntime.jsx(react.Popover.Positioner, { children: jsxRuntime.jsx(react.Popover.Content, { width: "fit-content", minW: "50rem", minH: "25rem", children: jsxRuntime.jsx(react.Popover.Body, { children: jsxRuntime.jsx(RangeDatePicker, { selected: selectedDates, onDateSelected: ({ selectable, date }) => {
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
                                }, monthsToDisplay: 2, withPopover: false }) }) }) })) : (jsxRuntime.jsx(react.Portal, { children: jsxRuntime.jsx(react.Popover.Positioner, { children: jsxRuntime.jsx(react.Popover.Content, { width: "fit-content", minW: "50rem", minH: "25rem", children: jsxRuntime.jsx(react.Popover.Body, { children: jsxRuntime.jsx(RangeDatePicker, { selected: selectedDates, onDateSelected: ({ selectable, date }) => {
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
    const { watch, formState: { errors }, setValue, } = reactHookForm.useFormContext();
    const { enumPickerLabels, insideDialog } = useSchemaContext();
    const formI18n = useFormLabel(column, prefix, schema);
    const { required, variant } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const { gridColumn = 'span 12', gridRow = 'span 1', renderDisplay } = schema;
    const colLabel = formI18n.colLabel;
    const fieldError = getNestedError(errors, colLabel);
    const watchEnum = watch(colLabel);
    const watchEnums = (watch(colLabel) ?? []);
    const dataList = schema.enum ?? [];
    // Helper function to render enum value (returns ReactNode)
    // If renderDisplay is provided, use it; otherwise show the enum string value directly
    const renderEnumValue = (value) => {
        if (renderDisplay) {
            return renderDisplay(value);
        }
        // If no renderDisplay provided, show the enum string value directly
        return value;
    };
    // Helper function to get string representation for input display
    // Converts ReactNode to string for combobox input display
    const getDisplayString = (value) => {
        if (renderDisplay) {
            const rendered = renderDisplay(value);
            // If renderDisplay returns a string, use it directly
            if (typeof rendered === 'string') {
                return rendered;
            }
            // If it's a React element, try to extract text content
            // For now, fallback to the raw value if we can't extract text
            // In most cases, renderDisplay should return a string or simple element
            if (typeof rendered === 'object' &&
                rendered !== null &&
                'props' in rendered) {
                const props = rendered.props;
                // Try to extract text from React element props
                if (props?.children) {
                    const children = props.children;
                    if (typeof children === 'string') {
                        return children;
                    }
                }
            }
            // Fallback: use raw value if we can't extract string
            return value;
        }
        return value;
    };
    // Debug log when renderDisplay is missing
    if (!renderDisplay) {
        console.debug(`[EnumPicker] Missing renderDisplay for field '${colLabel}'. Add renderDisplay function to schema for field '${colLabel}' to provide custom UI rendering. Currently showing enum string values directly.`, {
            fieldName: column,
            colLabel,
            prefix,
            enumValues: dataList,
        });
    }
    // Current value for combobox (array format)
    const currentValue = isMultiple
        ? watchEnums.filter((val) => val != null && val !== '')
        : watchEnum
            ? [watchEnum]
            : [];
    // Track input focus state for single selection
    const [isInputFocused, setIsInputFocused] = React.useState(false);
    // Get the selected value for single selection display
    const selectedSingleValue = !isMultiple && watchEnum ? watchEnum : null;
    const selectedSingleRendered = selectedSingleValue
        ? renderEnumValue(selectedSingleValue)
        : null;
    const isSelectedSingleValueString = typeof selectedSingleRendered === 'string';
    const comboboxItems = React.useMemo(() => {
        return dataList.map((item) => ({
            label: item, // Internal: used for search/filtering only
            value: item,
            raw: item, // Passed to renderEnumValue for UI rendering
            displayLabel: getDisplayString(item), // Used for input display when selected
        }));
    }, [dataList, renderDisplay]);
    // Use filter hook for combobox
    const { contains } = react.useFilter({ sensitivity: 'base' });
    // Create collection for combobox
    // itemToString uses displayLabel to show rendered display in input when selected
    const { collection, filter } = react.useListCollection({
        initialItems: comboboxItems,
        itemToString: (item) => item.displayLabel, // Use displayLabel for selected value display
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
        return (jsxRuntime.jsx(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
            gridRow, errorText: jsxRuntime.jsx(jsxRuntime.Fragment, { children: fieldError }), invalid: !!fieldError, children: jsxRuntime.jsx(react.RadioGroup.Root, { value: !isMultiple ? watchEnum : undefined, onValueChange: (details) => {
                    if (!isMultiple) {
                        setValue(colLabel, details.value);
                    }
                }, children: jsxRuntime.jsx(react.HStack, { gap: "6", children: dataList.map((item) => {
                        return (jsxRuntime.jsxs(react.RadioGroup.Item, { value: item, children: [jsxRuntime.jsx(react.RadioGroup.ItemHiddenInput, {}), jsxRuntime.jsx(react.RadioGroup.ItemIndicator, {}), jsxRuntime.jsx(react.RadioGroup.ItemText, { children: renderEnumValue(item) })] }, `${colLabel}-${item}`));
                    }) }) }) }));
    }
    return (jsxRuntime.jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: jsxRuntime.jsx(jsxRuntime.Fragment, { children: fieldError }), invalid: !!fieldError, children: [isMultiple && currentValue.length > 0 && (jsxRuntime.jsx(react.Flex, { flexFlow: 'wrap', gap: 1, mb: 2, children: currentValue.map((enumValue) => {
                    if (!enumValue) {
                        return null;
                    }
                    return (jsxRuntime.jsx(Tag, { size: "lg", closable: true, onClick: () => {
                            const newValue = currentValue.filter((val) => val !== enumValue);
                            setValue(colLabel, newValue);
                        }, children: renderEnumValue(enumValue) }, enumValue));
                }) })), jsxRuntime.jsxs(react.Combobox.Root, { collection: collection, value: currentValue, onValueChange: handleValueChange, onInputValueChange: handleInputValueChange, multiple: isMultiple, closeOnSelect: !isMultiple, openOnClick: true, invalid: !!fieldError, width: "100%", positioning: insideDialog
                    ? { strategy: 'fixed', hideWhenDetached: true }
                    : undefined, children: [jsxRuntime.jsxs(react.Combobox.Control, { position: "relative", children: [!isMultiple &&
                                selectedSingleValue &&
                                !isInputFocused &&
                                !isSelectedSingleValueString &&
                                selectedSingleRendered && (jsxRuntime.jsx(react.Box, { position: "absolute", left: 3, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 1, maxWidth: "calc(100% - 60px)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", children: selectedSingleRendered })), jsxRuntime.jsx(react.Combobox.Input, { placeholder: !isMultiple && selectedSingleValue && !isInputFocused
                                    ? undefined
                                    : enumPickerLabels?.typeToSearch ?? 'Type to search', onFocus: () => setIsInputFocused(true), onBlur: () => setIsInputFocused(false), style: {
                                    color: !isMultiple &&
                                        selectedSingleValue &&
                                        !isInputFocused &&
                                        !isSelectedSingleValueString
                                        ? 'transparent'
                                        : undefined,
                                    caretColor: !isMultiple &&
                                        selectedSingleValue &&
                                        !isInputFocused &&
                                        !isSelectedSingleValueString
                                        ? 'transparent'
                                        : undefined,
                                } }), jsxRuntime.jsxs(react.Combobox.IndicatorGroup, { children: [!isMultiple && currentValue.length > 0 && (jsxRuntime.jsx(react.Combobox.ClearTrigger, { onClick: () => {
                                            setValue(colLabel, '');
                                        } })), jsxRuntime.jsx(react.Combobox.Trigger, {})] })] }), jsxRuntime.jsx(react.Portal, { disabled: insideDialog, children: jsxRuntime.jsx(react.Combobox.Positioner, { children: jsxRuntime.jsxs(react.Combobox.Content, { children: [showTotalAndLimit && (jsxRuntime.jsx(react.Text, { p: 2, fontSize: "sm", color: "fg.muted", children: `${enumPickerLabels?.total ?? 'Total'}: ${collection.items.length}` })), collection.items.length === 0 ? (jsxRuntime.jsx(react.Combobox.Empty, { children: enumPickerLabels?.emptySearchResult ?? 'No results found' })) : (jsxRuntime.jsx(jsxRuntime.Fragment, { children: collection.items.map((item, index) => (jsxRuntime.jsxs(react.Combobox.Item, { item: item, children: [jsxRuntime.jsx(react.Combobox.ItemText, { children: renderEnumValue(item.raw) }), jsxRuntime.jsx(react.Combobox.ItemIndicator, {})] }, item.value ?? `item-${index}`))) }))] }) }) })] })] }));
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
    return bindEventListener.bind(window, {
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
    return bindEventListener.bindAll(window, [{
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
  bindEventListener.bind(window, {
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
    const ref = React.useRef(null);
    const [isDraggedOver, setIsDraggedOver] = React.useState(false);
    React.useEffect(() => {
        const el = ref.current;
        invariant(el);
        return dropTargetForExternal({
            element: el,
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: ({ source }) => {
                const files = getFiles({ source });
                const text = getText({ source });
                onDrop({ files, text });
            },
        });
    }, [onDrop]);
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
    const fileInput = React.useRef(null);
    const handleClick = () => {
        fileInput.current?.click();
    };
    const handleChange = (event) => {
        // @ts-expect-error find appropriate types for event target files
        const filesArray = [...event.target.files];
        onDrop({ files: filesArray });
    };
    return (jsxRuntime.jsxs(react.Grid, { ...getColor(isDraggedOver), ref: ref, cursor: 'pointer', onClick: handleClick, borderStyle: 'dashed', borderColor: 'colorPalette.400', alignContent: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 4, minH: "120px", ...gridProps, children: [children, !!children === false && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(react.Flex, { children: placeholder }), jsxRuntime.jsx(react.Input, { type: "file", multiple: true, style: { display: 'none' }, ref: fileInput, onChange: handleChange })] }))] }));
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
    const [searchTerm, setSearchTerm] = React.useState('');
    const [internalSelectedFile, setInternalSelectedFile] = React.useState(multiple ? [] : undefined);
    const [failedImageIds, setFailedImageIds] = React.useState(new Set());
    // Use controlled or internal state for selectedFile
    const selectedFile = controlledSelectedFile ?? internalSelectedFile;
    const setSelectedFile = onSelectedFileChange ?? setInternalSelectedFile;
    const { data: filesData, isLoading, isError, } = reactQuery.useQuery({
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
    return (jsxRuntime.jsxs(react.VStack, { align: "stretch", gap: 4, children: [jsxRuntime.jsxs(react.Box, { position: "relative", children: [jsxRuntime.jsx(react.Input, { placeholder: labels?.searchPlaceholder ?? 'Search files...', value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), bg: "bg.panel", border: "1px solid", borderColor: "border.default", colorPalette: "blue", _focus: {
                            borderColor: 'colorPalette.500',
                            _dark: {
                                borderColor: 'colorPalette.400',
                            },
                            boxShadow: {
                                base: '0 0 0 1px var(--chakra-colors-blue-500)',
                                _dark: '0 0 0 1px var(--chakra-colors-blue-400)',
                            },
                        }, pl: 10 }), jsxRuntime.jsx(react.Icon, { as: lu.LuSearch, position: "absolute", left: 3, top: "50%", transform: "translateY(-50%)", color: "fg.muted", boxSize: 4 })] }), isLoading && (jsxRuntime.jsxs(react.Box, { textAlign: "center", py: 8, children: [jsxRuntime.jsx(react.Spinner, { size: "lg", colorPalette: "blue" }), jsxRuntime.jsx(react.Text, { mt: 4, color: "fg.muted", children: labels?.loading ?? 'Loading files...' })] })), isError && (jsxRuntime.jsx(react.Box, { bg: { base: 'colorPalette.50', _dark: 'colorPalette.900/20' }, border: "1px solid", borderColor: {
                    base: 'colorPalette.200',
                    _dark: 'colorPalette.800',
                }, colorPalette: "red", borderRadius: "md", p: 4, children: jsxRuntime.jsx(react.Text, { color: {
                        base: 'colorPalette.600',
                        _dark: 'colorPalette.300',
                    }, children: labels?.loadingFailed ?? 'Failed to load files' }) })), !isLoading && !isError && (jsxRuntime.jsx(react.Box, { maxHeight: "400px", overflowY: "auto", children: filteredFiles.length === 0 ? (jsxRuntime.jsx(react.Box, { textAlign: "center", py: 8, children: jsxRuntime.jsx(react.Text, { color: "fg.muted", children: labels?.noFilesFound ?? 'No files found' }) })) : (jsxRuntime.jsx(react.VStack, { align: "stretch", gap: 2, children: filteredFiles.map((file) => {
                        const isImage = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(file.name);
                        const isSelected = multiple
                            ? Array.isArray(selectedFile) &&
                                selectedFile.some((f) => f.id === file.id)
                            : selectedFile?.id ===
                                file.id;
                        const imageFailed = failedImageIds.has(file.id);
                        return (jsxRuntime.jsx(react.Box, { p: 3, border: "2px solid", borderColor: isSelected
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
                            }, transition: "all 0.2s", children: jsxRuntime.jsxs(react.HStack, { gap: 3, children: [jsxRuntime.jsx(react.Box, { width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", bg: "bg.muted", borderRadius: "md", flexShrink: 0, children: isImage && file.url && !imageFailed ? (jsxRuntime.jsx(react.Image, { src: file.url, alt: file.name, boxSize: "60px", objectFit: "cover", borderRadius: "md", onError: () => handleImageError(file.id) })) : isImage && (imageFailed || !file.url) ? (jsxRuntime.jsx(react.Icon, { as: lu.LuImage, boxSize: 6, color: "fg.muted" })) : (jsxRuntime.jsx(react.Icon, { as: lu.LuFile, boxSize: 6, color: "fg.muted" })) }), jsxRuntime.jsxs(react.VStack, { align: "start", flex: 1, gap: 1, children: [jsxRuntime.jsx(react.Text, { fontSize: "sm", fontWeight: "medium", color: "fg.default", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", children: file.name }), jsxRuntime.jsxs(react.HStack, { gap: 2, children: [file.size && (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(react.Text, { fontSize: "xs", color: "fg.muted", children: typeof file.size === 'number'
                                                                ? formatBytes(file.size)
                                                                : file.size }) })), file.comment && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [file.size && (jsxRuntime.jsx(react.Text, { fontSize: "xs", color: "fg.muted", children: "\u2022" })), jsxRuntime.jsx(react.Text, { fontSize: "xs", color: "fg.muted", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", children: file.comment })] }))] })] }), isSelected && (jsxRuntime.jsx(react.Box, { width: "24px", height: "24px", borderRadius: "full", bg: {
                                            base: 'colorPalette.500',
                                            _dark: 'colorPalette.400',
                                        }, colorPalette: "blue", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, children: jsxRuntime.jsx(react.Text, { color: "white", fontSize: "xs", fontWeight: "bold", children: "\u2713" }) }))] }) }, file.id));
                    }) })) }))] }));
};

function MediaBrowserDialog({ open, onClose, onSelect, title, filterImageOnly = false, onFetchFiles, onUploadFile, enableUpload = false, labels, }) {
    const [selectedFile, setSelectedFile] = React.useState(undefined);
    const [activeTab, setActiveTab] = React.useState('browse');
    const [uploadingFiles, setUploadingFiles] = React.useState(new Set());
    const [uploadErrors, setUploadErrors] = React.useState(new Map());
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
    return (jsxRuntime.jsx(DialogRoot, { open: open, onOpenChange: (e) => !e.open && handleClose(), children: jsxRuntime.jsxs(DialogContent, { maxWidth: "800px", maxHeight: "90vh", children: [jsxRuntime.jsxs(DialogHeader, { children: [jsxRuntime.jsx(DialogTitle, { fontSize: "lg", fontWeight: "bold", children: title }), jsxRuntime.jsx(DialogCloseTrigger, {})] }), jsxRuntime.jsx(DialogBody, { children: showTabs ? (jsxRuntime.jsxs(react.Tabs.Root, { value: activeTab, onValueChange: (e) => setActiveTab(e.value ?? 'browse'), children: [jsxRuntime.jsxs(react.Tabs.List, { children: [jsxRuntime.jsx(react.Tabs.Trigger, { value: "browse", children: labels?.browseTab ?? 'Browse Library' }), jsxRuntime.jsx(react.Tabs.Trigger, { value: "upload", children: labels?.uploadTab ?? 'Upload Files' })] }), jsxRuntime.jsx(react.Tabs.Content, { value: "browse", children: onFetchFiles && (jsxRuntime.jsx(MediaLibraryBrowser, { onFetchFiles: onFetchFiles, filterImageOnly: filterImageOnly, labels: labels, enabled: open && activeTab === 'browse', selectedFile: selectedFile, onFileSelect: setSelectedFile })) }), jsxRuntime.jsx(react.Tabs.Content, { value: "upload", children: jsxRuntime.jsxs(react.VStack, { align: "stretch", gap: 4, children: [jsxRuntime.jsx(FileDropzone, { onDrop: ({ files }) => handleFileUpload(files), placeholder: labels?.fileDropzone ??
                                                'Drop files here or click to upload' }), uploadingFiles.size > 0 && (jsxRuntime.jsx(react.Box, { children: Array.from(uploadingFiles).map((fileKey) => (jsxRuntime.jsx(react.Box, { py: 2, children: jsxRuntime.jsxs(react.HStack, { gap: 2, children: [jsxRuntime.jsx(react.Spinner, { size: "sm", colorPalette: "blue" }), jsxRuntime.jsxs(react.Text, { fontSize: "sm", color: "fg.muted", children: [labels?.uploading ?? 'Uploading...', ' ', fileKey.split('-')[0]] })] }) }, fileKey))) })), uploadErrors.size > 0 && (jsxRuntime.jsx(react.VStack, { align: "stretch", gap: 2, children: Array.from(uploadErrors.entries()).map(([fileKey, error]) => (jsxRuntime.jsx(react.Box, { bg: {
                                                    base: 'colorPalette.50',
                                                    _dark: 'colorPalette.900/20',
                                                }, border: "1px solid", borderColor: {
                                                    base: 'colorPalette.200',
                                                    _dark: 'colorPalette.800',
                                                }, colorPalette: "red", borderRadius: "md", p: 3, children: jsxRuntime.jsxs(react.Text, { fontSize: "sm", color: {
                                                        base: 'colorPalette.600',
                                                        _dark: 'colorPalette.300',
                                                    }, children: [fileKey.split('-')[0], ":", ' ', labels?.uploadFailed ?? 'Upload failed', error && ` - ${error}`] }) }, fileKey))) }))] }) })] })) : onFetchFiles ? (jsxRuntime.jsx(MediaLibraryBrowser, { onFetchFiles: onFetchFiles, filterImageOnly: filterImageOnly, labels: labels, enabled: open, selectedFile: selectedFile, onFileSelect: setSelectedFile })) : null }), jsxRuntime.jsx(DialogFooter, { children: jsxRuntime.jsxs(react.HStack, { gap: 3, justify: "end", children: [jsxRuntime.jsx(react.Button, { variant: "outline", onClick: handleClose, borderColor: "border.default", bg: "bg.panel", _hover: { bg: 'bg.muted' }, children: labels?.cancel ?? 'Cancel' }), jsxRuntime.jsx(react.Button, { colorPalette: "blue", onClick: handleSelect, disabled: !selectedFile, children: labels?.select ?? 'Select' })] }) })] }) }));
}
const FilePicker = ({ column, schema, prefix }) => {
    const { setValue, formState: { errors }, watch, } = reactHookForm.useFormContext();
    const { filePickerLabels } = useSchemaContext();
    const formI18n = useFormLabel(column, prefix, schema);
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
    const fieldError = getNestedError(errors, colLabel);
    const [failedImageIds, setFailedImageIds] = React.useState(new Set());
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
    return (jsxRuntime.jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: jsxRuntime.jsx(jsxRuntime.Fragment, { children: fieldError }), invalid: !!fieldError, children: [jsxRuntime.jsx(react.VStack, { align: "stretch", gap: 2, children: jsxRuntime.jsx(FileDropzone, { onDrop: ({ files }) => {
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
                    }, placeholder: filePickerLabels?.fileDropzone ?? 'Drop files here' }) }), jsxRuntime.jsx(react.Flex, { flexFlow: 'column', gap: 1, children: currentFiles.map((file, index) => {
                    const fileIdentifier = getFileIdentifier(file, index);
                    const fileName = getFileName(file);
                    const fileSize = getFileSize(file);
                    const isImage = isImageFile(file);
                    const imageUrl = getImageUrl(file);
                    const imageFailed = failedImageIds.has(fileIdentifier);
                    // File Viewer
                    return (jsxRuntime.jsx(react.Card.Root, { variant: 'subtle', colorPalette: "blue", children: jsxRuntime.jsxs(react.Card.Body, { gap: "2", cursor: 'pointer', onClick: () => handleRemove(index), display: 'flex', flexFlow: 'row', alignItems: 'center', padding: '2', border: "2px solid", borderColor: "border.default", borderRadius: "md", _hover: {
                                borderColor: 'colorPalette.300',
                                bg: 'bg.muted',
                            }, transition: "all 0.2s", children: [jsxRuntime.jsx(react.Box, { width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", bg: "bg.muted", borderRadius: "md", flexShrink: 0, marginRight: "2", children: isImage && imageUrl && !imageFailed ? (jsxRuntime.jsx(react.Image, { src: imageUrl, alt: fileName, boxSize: "60px", objectFit: "cover", borderRadius: "md", onError: () => handleImageError(fileIdentifier) })) : isImage && (imageFailed || !imageUrl) ? (jsxRuntime.jsx(react.Icon, { as: lu.LuImage, boxSize: 6, color: "fg.muted" })) : (jsxRuntime.jsx(react.Icon, { as: lu.LuFile, boxSize: 6, color: "fg.muted" })) }), jsxRuntime.jsxs(react.VStack, { align: "start", flex: 1, gap: 1, children: [jsxRuntime.jsx(react.Text, { fontSize: "sm", fontWeight: "medium", color: "fg.default", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", children: fileName }), fileSize !== undefined && (jsxRuntime.jsx(react.Text, { fontSize: "xs", color: "fg.muted", children: formatBytes(fileSize) }))] }), jsxRuntime.jsx(react.Icon, { as: ti.TiDeleteOutline, boxSize: 5, color: "fg.muted" })] }) }, fileIdentifier));
                }) })] }));
};

const FormMediaLibraryBrowser = ({ column, schema, prefix, }) => {
    const { setValue, formState: { errors }, watch, } = reactHookForm.useFormContext();
    const { filePickerLabels } = useSchemaContext();
    const formI18n = useFormLabel(column, prefix, schema);
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
    const fieldError = getNestedError(errors, colLabel);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [failedImageIds, setFailedImageIds] = React.useState(new Set());
    // Map of file ID to FilePickerMediaFile for display
    const [fileMap, setFileMap] = React.useState(new Map());
    const { onFetchFiles, filterImageOnly = false, enableUpload = false, onUploadFile, } = filePicker || {};
    // Fetch file details for existing file IDs
    React.useEffect(() => {
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
    React.useEffect(() => {
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
        return (jsxRuntime.jsx(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
            gridRow, errorText: jsxRuntime.jsx(jsxRuntime.Fragment, { children: fieldError }), invalid: !!fieldError, children: jsxRuntime.jsx(react.Text, { color: "fg.muted", children: "Media library browser requires onFetchFiles" }) }));
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
    return (jsxRuntime.jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: jsxRuntime.jsx(jsxRuntime.Fragment, { children: fieldError }), invalid: !!fieldError, children: [jsxRuntime.jsx(react.VStack, { align: "stretch", gap: 2, children: jsxRuntime.jsx(react.Button, { variant: "outline", onClick: () => setDialogOpen(true), borderColor: "border.default", bg: "bg.panel", _hover: { bg: 'bg.muted' }, children: filePickerLabels?.browseLibrary ?? 'Browse from Library' }) }), jsxRuntime.jsx(MediaBrowserDialog, { open: dialogOpen, onClose: () => setDialogOpen(false), onSelect: handleMediaLibrarySelect, title: filePickerLabels?.dialogTitle ?? formI18n.label() ?? 'Select File', filterImageOnly: filterImageOnly, onFetchFiles: onFetchFiles, onUploadFile: onUploadFile, enableUpload: enableUpload, labels: filePickerLabels, colLabel: colLabel }), jsxRuntime.jsx(react.Flex, { flexFlow: 'column', gap: 1, children: currentFileIds.map((fileId, index) => {
                    const file = fileMap.get(fileId);
                    const isImage = file
                        ? /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(file.name)
                        : /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(fileId);
                    const imageFailed = failedImageIds.has(fileId);
                    const displayName = file?.name ?? fileId;
                    return (jsxRuntime.jsx(react.Card.Root, { variant: 'subtle', colorPalette: "blue", children: jsxRuntime.jsxs(react.Card.Body, { gap: "2", cursor: 'pointer', onClick: () => handleRemove(index), display: 'flex', flexFlow: 'row', alignItems: 'center', padding: '2', border: "2px solid", borderColor: "border.default", borderRadius: "md", _hover: {
                                borderColor: 'colorPalette.300',
                                bg: 'bg.muted',
                            }, transition: "all 0.2s", children: [jsxRuntime.jsx(react.Box, { width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", bg: "bg.muted", borderRadius: "md", flexShrink: 0, marginRight: "2", overflow: "hidden", children: isImage && file?.url && !imageFailed ? (jsxRuntime.jsx(react.Image, { src: file.url, alt: displayName, boxSize: "60px", objectFit: "cover", onError: () => handleImageError(fileId) })) : isImage && !imageFailed ? (jsxRuntime.jsx(react.Icon, { as: lu.LuImage, boxSize: 6, color: "fg.muted" })) : (jsxRuntime.jsx(react.Icon, { as: lu.LuFile, boxSize: 6, color: "fg.muted" })) }), jsxRuntime.jsxs(react.VStack, { align: "start", flex: 1, gap: 1, children: [jsxRuntime.jsx(react.Text, { fontSize: "sm", fontWeight: "medium", color: "fg.default", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", children: displayName }), file?.size && (jsxRuntime.jsx(react.Text, { fontSize: "xs", color: "fg.muted", children: typeof file.size === 'number'
                                                ? `${(file.size / 1024).toFixed(1)} KB`
                                                : file.size }))] }), jsxRuntime.jsx(react.Icon, { as: ti.TiDeleteOutline, boxSize: 5, color: "fg.muted" })] }) }, `${fileId}-${index}`));
                }) })] }));
};

// Default renderDisplay function that intelligently displays items
// If item is an object, tries to find common display fields (name, title, label, etc.)
// Otherwise falls back to JSON.stringify
const defaultRenderDisplay = (item) => {
    // Check if item is an object (not null, not array, not primitive)
    if (item !== null &&
        typeof item === 'object' &&
        !Array.isArray(item) &&
        !(item instanceof Date)) {
        const obj = item;
        // Try common display fields in order of preference
        const displayFields = [
            'name',
            'title',
            'label',
            'displayName',
            'display_name',
            'text',
            'value',
        ];
        for (const field of displayFields) {
            if (obj[field] !== undefined && obj[field] !== null) {
                const value = obj[field];
                // Return the value if it's a string or number
                if (typeof value === 'string' || typeof value === 'number') {
                    return String(value);
                }
                // If the value is an object, show warning and recommend custom renderDisplay
                if (typeof value === 'object' &&
                    !Array.isArray(value) &&
                    !(value instanceof Date)) {
                    console.warn(`[CustomJSONSchema7] Display field "${field}" contains an object value. Consider providing a custom \`renderDisplay\` function in your schema to properly render this item. Field: ${field}, Value: ${JSON.stringify(value).substring(0, 100)}${JSON.stringify(value).length > 100 ? '...' : ''}`);
                    // Still return the stringified value for now
                    return JSON.stringify(value);
                }
            }
        }
        // If no display field found, fall back to JSON.stringify
        return JSON.stringify(item);
    }
    // For strings that look like JSON, show warning and recommend custom renderDisplay
    if (typeof item === 'string' &&
        (item.trim().startsWith('{') || item.trim().startsWith('['))) {
        console.warn(`[CustomJSONSchema7] Item appears to be a JSON string. Consider providing a custom \`renderDisplay\` function in your schema to properly render this item. Current value: ${item.substring(0, 100)}${item.length > 100 ? '...' : ''}`);
        return item;
    }
    // For non-objects (primitives, arrays, dates), use JSON.stringify
    return JSON.stringify(item);
};

const useIdPickerData = ({ column, schema, prefix, isMultiple, }) => {
    const { watch, getValues, formState: { errors }, setValue, } = reactHookForm.useFormContext();
    const { idMap, setIdMap, idPickerLabels, insideDialog } = useSchemaContext();
    const { renderDisplay, itemToValue: schemaItemToValue, loadInitialValues, customQueryFn, variant, } = schema;
    // loadInitialValues should be provided in schema for id-picker fields
    // It's used to load the record of the id so the display is human-readable
    if (variant === 'id-picker' && !loadInitialValues) {
        console.warn(`loadInitialValues is recommended in schema for IdPicker field '${column}'. Please provide loadInitialValues function in the schema to load records for human-readable display.`);
    }
    const [searchText, setSearchText] = React.useState('');
    const debouncedSearchText = usehooks.useDebounce(searchText, 300);
    const [limit] = React.useState(50); // Increased limit for combobox
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
    // Find IDs that are in currentValue but missing from idMap
    const missingIds = React.useMemo(() => {
        return currentValue.filter((id) => !idMap[id]);
    }, [currentValue, idMap]);
    // Stable key for query based on sorted missing IDs
    const missingIdsKey = React.useMemo(() => {
        return JSON.stringify([...missingIds].sort());
    }, [missingIds]);
    // Include idMap state in query key to force refetch when idMap is reset (e.g., on remount from another page)
    // This ensures the query runs even if React Query has cached data for the same missing IDs
    const idMapStateKey = React.useMemo(() => {
        // Create a key based on whether the required IDs are in idMap
        const hasRequiredIds = currentValue.every((id) => idMap[id]);
        return hasRequiredIds ? 'complete' : 'incomplete';
    }, [currentValue, idMap]);
    // Query to fetch initial values that are missing from idMap
    // This query runs automatically when missingIds.length > 0 and updates idMap
    const initialValuesQuery = reactQuery.useQuery({
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
                customQueryFn: customQueryFn,
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
    const query = reactQuery.useQuery({
        queryKey: [`idpicker`, { column, searchText: debouncedSearchText, limit }],
        queryFn: async () => {
            // customQueryFn is required
            if (!customQueryFn) {
                throw new Error(`customQueryFn is required in properties of column ${column} when using id-picker.`);
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
    const currentValueKey = React.useMemo(() => JSON.stringify([...currentValue].sort()), [currentValue]);
    // Serialize the relevant part of idMap to detect when items we care about change
    const idMapKey = React.useMemo(() => {
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
    const idMapItems = React.useMemo(() => {
        return currentValue
            .map((id) => idMap[id])
            .filter((item) => item !== undefined);
        // Depend on idMapKey which only changes when items we care about change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentValueKey, idMapKey]);
    // Use schema's itemToValue if provided, otherwise throw error
    // schemaItemToValue should be provided in schema for id-picker fields
    const itemToValueFn = schemaItemToValue
        ? (item) => schemaItemToValue(item)
        : (item) => {
            console.warn(`itemToValue is required in schema for IdPicker field '${column}'. Please provide itemToValue function in the schema. Currently trying to get 'id' field as last resort`);
            // Fallback: try to get 'id' field as last resort
            return String(item?.id ?? item);
        };
    // itemToString function: convert item to readable string using renderDisplay
    // This ensures items can always be displayed as readable strings in the combobox
    const renderFn = renderDisplay || defaultRenderDisplay;
    const itemToStringFn = (item) => {
        const rendered = renderFn(item);
        // If already a string or number, return it
        if (typeof rendered === 'string')
            return rendered;
        if (typeof rendered === 'number')
            return String(rendered);
        // For ReactNode, fall back to defaultRenderDisplay which converts to string
        return String(defaultRenderDisplay(item));
    };
    // Transform data for combobox collection
    // label is used for filtering/searching (must be a string)
    // displayLabel is used for input display when selected (string representation of rendered display)
    // raw item is stored for custom rendering
    // Also include items from idMap that match currentValue (for initial values display)
    const comboboxItems = React.useMemo(() => {
        const renderFn = renderDisplay || defaultRenderDisplay;
        // Helper to convert rendered display to string for displayLabel
        // For ReactNodes (non-string/number), we can't safely stringify due to circular refs
        // So we use the label (which is already a string) as fallback
        const getDisplayString = (rendered, fallbackLabel) => {
            if (typeof rendered === 'string')
                return rendered;
            if (typeof rendered === 'number')
                return String(rendered);
            // For ReactNode, use the fallback label (which is already a string representation)
            // The actual ReactNode will be rendered in the overlay, not in the input
            return fallbackLabel;
        };
        const itemsFromDataList = dataList.map((item) => {
            const typedItem = item;
            const rendered = renderFn(typedItem);
            const label = typeof rendered === 'string' ? rendered : JSON.stringify(typedItem); // Use string for filtering
            return {
                label, // Use string for filtering
                displayLabel: getDisplayString(rendered, label), // String representation for input display
                value: itemToValueFn(typedItem),
                raw: typedItem,
            };
        });
        // Add items from idMap that match currentValue but aren't in dataList
        // This ensures initial values are displayed correctly in the combobox
        const itemsFromIdMap = idMapItems
            .map((item) => {
            // Check if this item is already in itemsFromDataList
            const alreadyIncluded = itemsFromDataList.some((i) => i.value === itemToValueFn(item));
            if (alreadyIncluded)
                return null;
            const rendered = renderFn(item);
            const label = typeof rendered === 'string' ? rendered : JSON.stringify(item);
            return {
                label,
                displayLabel: getDisplayString(rendered, label), // String representation for input display
                value: itemToValueFn(item),
                raw: item,
            };
        })
            .filter((item) => item !== null);
        return [...itemsFromIdMap, ...itemsFromDataList];
    }, [dataList, renderDisplay, idMapItems, itemToValueFn]);
    // Use filter hook for combobox
    const { contains } = react.useFilter({ sensitivity: 'base' });
    // Create collection for combobox
    // itemToString uses displayLabel to show rendered display in input when selected
    const { collection, filter, set } = react.useListCollection({
        initialItems: comboboxItems,
        itemToString: (item) => item.displayLabel, // Use displayLabel for selected value display
        itemToValue: (item) => item.value,
        filter: contains,
    });
    // Track previous comboboxItems to avoid unnecessary updates
    const prevComboboxItemsRef = React.useRef('');
    const prevSearchTextRef = React.useRef('');
    // Update collection and filter when data changes
    // This includes both search results and initial values from idMap
    React.useEffect(() => {
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
        itemToValue: itemToValueFn,
        itemToString: itemToStringFn,
        loadInitialValues: loadInitialValues ??
            (async () => ({ data: { data: [], count: 0 }, idMap: {} })), // Fallback if not provided
        errors,
        setValue,
    };
};

const IdPickerSingle = ({ column, schema, prefix, }) => {
    const formI18n = useFormLabel(column, prefix, schema);
    const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const { colLabel, currentValue, searchText, setSearchText, isLoading, isFetching, isPending, isError, isSearching, collection, filter, idMap, idPickerLabels, insideDialog, renderDisplay: renderDisplayFn, itemToString, errors, setValue, } = useIdPickerData({
        column,
        schema,
        prefix,
        isMultiple: false,
    });
    // Get the selected value for single selection display
    const selectedId = currentValue.length > 0 ? currentValue[0] : null;
    const selectedItem = selectedId
        ? idMap[selectedId]
        : undefined;
    // Use itemToValue to get the combobox value from the selected item, or use the ID directly
    const comboboxValue = selectedItem
        ? itemToString(selectedItem)
        : selectedId || '';
    // itemToString is available from the hook and can be used to get a readable string
    // representation of any item. The collection's itemToString is automatically used
    // by the combobox to display selected values.
    // Use useCombobox hook to control input value
    const combobox = react.useCombobox({
        collection,
        value: [comboboxValue],
        onInputValueChange(e) {
            setSearchText(e.inputValue);
            filter(e.inputValue);
        },
        onValueChange(e) {
            setValue(colLabel, e.value[0] || '');
            // Clear the input value after selection
            setSearchText('');
        },
        multiple: false,
        closeOnSelect: true,
        openOnClick: true,
        invalid: !!errors[colLabel],
    });
    // Use renderDisplay from hook (which comes from schema) or fallback to default
    const renderDisplayFunction = renderDisplayFn || defaultRenderDisplay;
    // Get the selected value for single selection display (already computed above)
    const selectedRendered = selectedItem
        ? renderDisplayFunction(selectedItem)
        : null;
    const fieldError = getNestedError(errors, colLabel);
    return (jsxRuntime.jsx(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: jsxRuntime.jsx(jsxRuntime.Fragment, { children: fieldError }), invalid: !!fieldError, children: jsxRuntime.jsxs(react.Combobox.RootProvider, { value: combobox, width: "100%", children: [jsxRuntime.jsx(react.Show, { when: selectedId && selectedRendered, children: jsxRuntime.jsxs(react.HStack, { justifyContent: 'space-between', children: [jsxRuntime.jsx(react.Box, { children: selectedRendered }), currentValue.length > 0 && (jsxRuntime.jsx(react.Button, { variant: "ghost", size: "sm", onClick: () => {
                                    setValue(colLabel, '');
                                }, children: jsxRuntime.jsx(react.Icon, { children: jsxRuntime.jsx(bi.BiX, {}) }) }))] }) }), jsxRuntime.jsx(react.Show, { when: !selectedId || !selectedRendered, children: jsxRuntime.jsxs(react.Combobox.Control, { position: "relative", children: [jsxRuntime.jsx(react.Combobox.Input, { placeholder: idPickerLabels?.typeToSearch ?? 'Type to search' }), jsxRuntime.jsxs(react.Combobox.IndicatorGroup, { children: [(isFetching || isLoading || isPending) && jsxRuntime.jsx(react.Spinner, { size: "xs" }), isError && (jsxRuntime.jsx(react.Icon, { color: "fg.error", children: jsxRuntime.jsx(bi.BiError, {}) })), jsxRuntime.jsx(react.Combobox.Trigger, {})] })] }) }), insideDialog ? (jsxRuntime.jsx(react.Combobox.Positioner, { children: jsxRuntime.jsx(react.Combobox.Content, { children: isError ? (jsxRuntime.jsx(react.Text, { p: 2, color: "fg.error", fontSize: "sm", children: idPickerLabels?.emptySearchResult ?? 'Loading failed' })) : isFetching || isLoading || isPending || isSearching ? (
                        // Show skeleton items to prevent UI shift
                        jsxRuntime.jsx(jsxRuntime.Fragment, { children: Array.from({ length: 5 }).map((_, index) => (jsxRuntime.jsx(react.Flex, { p: 2, align: "center", gap: 2, children: jsxRuntime.jsx(react.Skeleton, { height: "20px", flex: "1" }) }, `skeleton-${index}`))) })) : collection.items.length === 0 ? (jsxRuntime.jsx(react.Combobox.Empty, { children: searchText
                                ? idPickerLabels?.emptySearchResult ?? 'No results found'
                                : idPickerLabels?.initialResults ??
                                    'Start typing to search' })) : (jsxRuntime.jsx(jsxRuntime.Fragment, { children: collection.items.map((item, index) => (jsxRuntime.jsxs(react.Combobox.Item, { item: item, children: [renderDisplayFunction(item.raw), jsxRuntime.jsx(react.Combobox.ItemIndicator, {})] }, item.value ?? `item-${index}`))) })) }) })) : (jsxRuntime.jsx(react.Portal, { children: jsxRuntime.jsx(react.Combobox.Positioner, { children: jsxRuntime.jsx(react.Combobox.Content, { children: isError ? (jsxRuntime.jsx(react.Text, { p: 2, color: "fg.error", fontSize: "sm", children: idPickerLabels?.emptySearchResult ?? 'Loading failed' })) : isFetching || isLoading || isPending || isSearching ? (
                            // Show skeleton items to prevent UI shift
                            jsxRuntime.jsx(jsxRuntime.Fragment, { children: Array.from({ length: 5 }).map((_, index) => (jsxRuntime.jsx(react.Flex, { p: 2, align: "center", gap: 2, children: jsxRuntime.jsx(react.Skeleton, { height: "20px", flex: "1" }) }, `skeleton-${index}`))) })) : collection.items.length === 0 ? (jsxRuntime.jsx(react.Combobox.Empty, { children: searchText
                                    ? idPickerLabels?.emptySearchResult ?? 'No results found'
                                    : idPickerLabels?.initialResults ??
                                        'Start typing to search' })) : (jsxRuntime.jsx(jsxRuntime.Fragment, { children: collection.items.map((item, index) => (jsxRuntime.jsx(react.Combobox.Item, { item: item, children: renderDisplayFunction(item.raw) }, item.value ?? `item-${index}`))) })) }) }) }))] }) }));
};

const IdPickerMultiple = ({ column, schema, prefix, }) => {
    const formI18n = useFormLabel(column, prefix, schema);
    const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
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
    // Use renderDisplay from hook (which comes from schema) or fallback to default
    const renderDisplayFunction = renderDisplayFn || defaultRenderDisplay;
    const fieldError = getNestedError(errors, colLabel);
    return (jsxRuntime.jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: jsxRuntime.jsx(jsxRuntime.Fragment, { children: fieldError }), invalid: !!fieldError, children: [currentValue.length > 0 && (jsxRuntime.jsx(react.Flex, { flexFlow: 'wrap', gap: 1, mb: 2, children: currentValue.map((id) => {
                    const item = idMap[id];
                    // Show loading skeleton while fetching initial values
                    if (item === undefined &&
                        (isLoadingInitialValues || isFetchingInitialValues) &&
                        missingIds.includes(id)) {
                        return (jsxRuntime.jsx(react.Skeleton, { height: "24px", width: "100px", borderRadius: "md" }, id));
                    }
                    // Only show "not found" if we're not loading and item is still missing
                    if (item === undefined) {
                        return (jsxRuntime.jsx(react.Text, { fontSize: "sm", children: idPickerLabels?.undefined ?? 'Undefined' }, id));
                    }
                    return (jsxRuntime.jsx(Tag, { closable: true, onClick: () => {
                            const newValue = currentValue.filter((itemId) => itemId !== id);
                            setValue(colLabel, newValue);
                        }, children: renderDisplayFunction(item) }, id));
                }) })), jsxRuntime.jsxs(react.Combobox.Root, { collection: collection, value: currentValue, onValueChange: handleValueChange, onInputValueChange: handleInputValueChange, multiple: true, closeOnSelect: false, openOnClick: true, invalid: !!errors[colLabel], width: "100%", positioning: insideDialog
                    ? { strategy: 'fixed', hideWhenDetached: true }
                    : undefined, children: [jsxRuntime.jsxs(react.Combobox.Control, { children: [jsxRuntime.jsx(react.Combobox.Input, { placeholder: idPickerLabels?.typeToSearch ?? 'Type to search' }), jsxRuntime.jsxs(react.Combobox.IndicatorGroup, { children: [(isFetching || isLoading || isPending) && jsxRuntime.jsx(react.Spinner, { size: "xs" }), isError && (jsxRuntime.jsx(react.Icon, { color: "fg.error", children: jsxRuntime.jsx(bi.BiError, {}) })), jsxRuntime.jsx(react.Combobox.Trigger, {})] })] }), insideDialog ? (jsxRuntime.jsx(react.Combobox.Positioner, { children: jsxRuntime.jsx(react.Combobox.Content, { children: isError ? (jsxRuntime.jsx(react.Text, { p: 2, color: "fg.error", fontSize: "sm", children: idPickerLabels?.emptySearchResult ?? 'Loading failed' })) : isFetching || isLoading || isPending || isSearching ? (
                            // Show skeleton items to prevent UI shift
                            jsxRuntime.jsx(jsxRuntime.Fragment, { children: Array.from({ length: 5 }).map((_, index) => (jsxRuntime.jsx(react.Flex, { p: 2, align: "center", gap: 2, children: jsxRuntime.jsx(react.Skeleton, { height: "20px", flex: "1" }) }, `skeleton-${index}`))) })) : collection.items.length === 0 ? (jsxRuntime.jsx(react.Combobox.Empty, { children: searchText
                                    ? idPickerLabels?.emptySearchResult ?? 'No results found'
                                    : idPickerLabels?.initialResults ??
                                        'Start typing to search' })) : (jsxRuntime.jsx(jsxRuntime.Fragment, { children: collection.items.map((item, index) => (jsxRuntime.jsxs(react.Combobox.Item, { item: item, children: [renderDisplayFunction(item.raw), jsxRuntime.jsx(react.Combobox.ItemIndicator, {})] }, item.value ?? `item-${index}`))) })) }) })) : (jsxRuntime.jsx(react.Portal, { children: jsxRuntime.jsx(react.Combobox.Positioner, { children: jsxRuntime.jsx(react.Combobox.Content, { children: isError ? (jsxRuntime.jsx(react.Text, { p: 2, color: "fg.error", fontSize: "sm", children: idPickerLabels?.emptySearchResult ?? 'Loading failed' })) : isFetching || isLoading || isPending || isSearching ? (
                                // Show skeleton items to prevent UI shift
                                jsxRuntime.jsx(jsxRuntime.Fragment, { children: Array.from({ length: 5 }).map((_, index) => (jsxRuntime.jsx(react.Flex, { p: 2, align: "center", gap: 2, children: jsxRuntime.jsx(react.Skeleton, { height: "20px", flex: "1" }) }, `skeleton-${index}`))) })) : collection.items.length === 0 ? (jsxRuntime.jsx(react.Combobox.Empty, { children: searchText
                                        ? idPickerLabels?.emptySearchResult ?? 'No results found'
                                        : idPickerLabels?.initialResults ??
                                            'Start typing to search' })) : (jsxRuntime.jsx(jsxRuntime.Fragment, { children: collection.items.map((item, index) => (jsxRuntime.jsxs(react.Combobox.Item, { item: item, children: [renderDisplayFunction(item.raw), jsxRuntime.jsx(react.Combobox.ItemIndicator, {})] }, item.value ?? `item-${index}`))) })) }) }) }))] })] }));
};

const NumberInputField = ({ schema, column, prefix, }) => {
    const { setValue, formState: { errors }, watch, } = reactHookForm.useFormContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1', numberStorageType = 'number', } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const value = watch(`${colLabel}`);
    const fieldError = getNestedError(errors, colLabel);
    const formI18n = useFormLabel(column, prefix, schema);
    // Convert value to string for NumberInput (it uses string values internally)
    // NumberInput expects string values to preserve locale-specific formatting
    // Do not fill any default value if initial value doesn't exist
    const stringValue = value !== undefined && value !== null && value !== ''
        ? String(value)
        : undefined;
    return (jsxRuntime.jsx(Field, { label: formI18n.label(), required: isRequired, gridColumn, gridRow, errorText: fieldError, invalid: !!fieldError, children: jsxRuntime.jsxs(react.NumberInput.Root, { value: stringValue, onValueChange: (details) => {
                // Store as string or number based on configuration, default to number
                // Handle empty values properly - if value is empty string, store undefined
                if (details.value === '' || details.value === undefined) {
                    setValue(`${colLabel}`, undefined);
                    return;
                }
                const newValue = numberStorageType === 'string'
                    ? details.value
                    : details.valueAsNumber;
                setValue(`${colLabel}`, newValue);
            }, step: schema.multipleOf || 0.01, allowOverflow: false, clampValueOnBlur: true, inputMode: "decimal", formatOptions: schema.formatOptions, disabled: schema.readOnly, required: isRequired, variant: "outline", children: [jsxRuntime.jsx(react.NumberInput.Control, {}), jsxRuntime.jsx(react.NumberInput.Input, {})] }) }));
};

const ObjectInput = ({ schema, column, prefix }) => {
    const { properties, gridColumn = 'span 12', gridRow = 'span 1', required, showLabel = true, } = schema;
    const colLabel = `${prefix}${column}`;
    const isRequired = required?.some((columnId) => columnId === column);
    const formI18n = useFormLabel(column, prefix, schema);
    reactHookForm.useFormContext();
    if (properties === undefined) {
        throw new Error(`properties is undefined when using ObjectInput`);
    }
    return (jsxRuntime.jsxs(react.Box, { gridRow, gridColumn, children: [showLabel && (jsxRuntime.jsxs(react.Box, { as: "label", children: [formI18n.label(), isRequired && jsxRuntime.jsx("span", { children: "*" })] })), jsxRuntime.jsx(react.Grid, { bgColor: { base: 'colorPalette.100', _dark: 'colorPalette.900' }, p: 2, borderRadius: 4, borderWidth: 1, borderColor: {
                    base: 'colorPalette.200',
                    _dark: 'colorPalette.800',
                }, gap: "4", padding: '4', gridTemplateColumns: 'repeat(12, 1fr)', autoFlow: 'row', children: Object.keys(properties ?? {}).map((key) => {
                    return (jsxRuntime.jsx(ColumnRenderer, { column: `${key}`,
                        prefix: `${prefix}${column}.`,
                        properties: properties ?? {},
                        parentRequired: required }, `form-${colLabel}-${key}`));
                }) })] }));
};

const RecordInput = ({ column, schema, prefix }) => {
    const { formState: { errors }, setValue, getValues, } = reactHookForm.useFormContext();
    const { formButtonLabels } = useSchemaContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const entries = Object.entries(getValues(column) ?? {});
    const [showNewEntries, setShowNewEntries] = React.useState(false);
    const [newKey, setNewKey] = React.useState();
    const [newValue, setNewValue] = React.useState();
    const formI18n = useFormLabel(column, prefix, schema);
    const fieldError = errors[column]?.message;
    return (jsxRuntime.jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn, gridRow, errorText: jsxRuntime.jsx(jsxRuntime.Fragment, { children: fieldError }), invalid: !!fieldError, children: [entries.map(([key, value]) => {
                return (jsxRuntime.jsxs(react.Grid, { templateColumns: '1fr 1fr auto', gap: 1, children: [jsxRuntime.jsx(react.Input, { value: key, onChange: (e) => {
                                const filtered = entries.filter(([target]) => {
                                    return target !== key;
                                });
                                setValue(column, Object.fromEntries([...filtered, [e.target.value, value]]));
                            }, autoComplete: "off" }), jsxRuntime.jsx(react.Input, { value: value, onChange: (e) => {
                                setValue(column, {
                                    ...getValues(column),
                                    [key]: e.target.value,
                                });
                            }, autoComplete: "off" }), jsxRuntime.jsx(react.IconButton, { variant: 'ghost', onClick: () => {
                                const filtered = entries.filter(([target]) => {
                                    return target !== key;
                                });
                                setValue(column, Object.fromEntries([...filtered]));
                            }, children: jsxRuntime.jsx(cg.CgClose, {}) })] }));
            }), jsxRuntime.jsx(react.Show, { when: showNewEntries, children: jsxRuntime.jsxs(react.Card.Root, { children: [jsxRuntime.jsx(react.Card.Body, { gap: "2", children: jsxRuntime.jsxs(react.Grid, { templateColumns: '1fr 1fr auto', gap: 1, children: [jsxRuntime.jsx(react.Input, { value: newKey, onChange: (e) => {
                                            setNewKey(e.target.value);
                                        }, autoComplete: "off" }), jsxRuntime.jsx(react.Input, { value: newValue, onChange: (e) => {
                                            setNewValue(e.target.value);
                                        }, autoComplete: "off" })] }) }), jsxRuntime.jsxs(react.Card.Footer, { justifyContent: "flex-end", children: [jsxRuntime.jsx(react.IconButton, { variant: 'subtle', onClick: () => {
                                        setShowNewEntries(false);
                                        setNewKey(undefined);
                                        setNewValue(undefined);
                                    }, children: jsxRuntime.jsx(cg.CgClose, {}) }), jsxRuntime.jsx(Button, { onClick: () => {
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
                                    }, children: formButtonLabels?.save ?? 'Save' })] })] }) }), jsxRuntime.jsx(Button, { onClick: () => {
                    setShowNewEntries(true);
                    setNewKey(undefined);
                    setNewValue(undefined);
                }, children: formButtonLabels?.addNew ?? 'Add New' })] }));
};

const StringInputField = ({ column, schema, prefix, }) => {
    const { register, formState: { errors }, } = reactHookForm.useFormContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const fieldError = getNestedError(errors, colLabel);
    const formI18n = useFormLabel(column, prefix, schema);
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(Field, { label: formI18n.label(), required: isRequired, gridColumn: gridColumn, gridRow: gridRow, errorText: jsxRuntime.jsx(jsxRuntime.Fragment, { children: fieldError }), invalid: !!fieldError, children: jsxRuntime.jsx(react.Input, { ...register(`${colLabel}`, { required: isRequired }), autoComplete: "off" }) }) }));
};

const Textarea = React__namespace.forwardRef(function Textarea({ value, onChange, ...props }, ref) {
    const handleChange = React__namespace.useCallback((e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    }, [onChange]);
    return (jsxRuntime.jsx(react.Textarea, { ref: ref, value: value ?? '', onChange: handleChange, ...props }));
});

const TextAreaInput = ({ column, schema, prefix, }) => {
    const { formState: { errors }, setValue, watch, } = reactHookForm.useFormContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1' } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const fieldError = getNestedError(errors, colLabel);
    const formI18n = useFormLabel(column, prefix, schema);
    const watchValue = watch(colLabel);
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(Field, { label: formI18n.label(), required: isRequired, gridColumn: gridColumn ?? 'span 4', gridRow: gridRow ?? 'span 1', display: "grid", errorText: fieldError, invalid: !!fieldError, children: jsxRuntime.jsx(Textarea, { value: watchValue, onChange: (value) => setValue(colLabel, value) }) }) }));
};

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
const TimePicker$1 = ({ hour, setHour, minute, setMinute, meridiem, setMeridiem, onChange, format = '12h', showSeconds = false, startTime, selectedDate, timezone: tz = 'Asia/Hong_Kong', portalled: _portalled = false, // Unused - kept for API compatibility
labels, }) => {
    const is24Hour = format === '24h' || showSeconds;
    const [timeInputValue, setTimeInputValue] = React.useState('');
    // Generate time options
    const timeOptions = React.useMemo(() => {
        const options = [];
        // Get start time for comparison if provided
        let startDateTime = null;
        let shouldFilterByDate = false;
        if (startTime && selectedDate) {
            const startDateObj = dayjs(startTime).tz(tz);
            const selectedDateObj = dayjs(selectedDate).tz(tz);
            if (startDateObj.isValid() && selectedDateObj.isValid()) {
                startDateTime = startDateObj;
                shouldFilterByDate =
                    startDateObj.format('YYYY-MM-DD') ===
                        selectedDateObj.format('YYYY-MM-DD');
            }
        }
        if (is24Hour) {
            // Generate 24-hour format options
            for (let h = 0; h < 24; h++) {
                for (let m = 0; m < 60; m += 15) {
                    // Filter out times that would result in negative duration
                    if (startDateTime && selectedDate && shouldFilterByDate) {
                        const selectedDateObj = dayjs(selectedDate).tz(tz);
                        const optionDateTime = selectedDateObj
                            .hour(h)
                            .minute(m)
                            .second(0)
                            .millisecond(0);
                        if (optionDateTime.isBefore(startDateTime)) {
                            continue;
                        }
                    }
                    // Calculate duration if startTime is provided
                    let durationText;
                    if (startDateTime && selectedDate) {
                        const selectedDateObj = dayjs(selectedDate).tz(tz);
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
                    const s = showSeconds ? 0 : 0;
                    const timeDisplay = showSeconds
                        ? `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:00`
                        : `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                    options.push({
                        label: timeDisplay,
                        value: `${h}:${m}:${s}`,
                        hour: h,
                        minute: m,
                        second: s,
                        searchText: timeDisplay,
                        durationText,
                    });
                }
            }
        }
        else {
            // Generate 12-hour format options
            for (let h = 1; h <= 12; h++) {
                for (let m = 0; m < 60; m += 15) {
                    for (const mer of ['am', 'pm']) {
                        // Convert 12-hour to 24-hour for comparison
                        let hour24 = h;
                        if (mer === 'am' && h === 12)
                            hour24 = 0;
                        else if (mer === 'pm' && h < 12)
                            hour24 = h + 12;
                        // Filter out times that would result in negative duration
                        if (startDateTime && selectedDate && shouldFilterByDate) {
                            const selectedDateObj = dayjs(selectedDate).tz(tz);
                            const optionDateTime = selectedDateObj
                                .hour(hour24)
                                .minute(m)
                                .second(0)
                                .millisecond(0);
                            if (optionDateTime.isBefore(startDateTime)) {
                                continue;
                            }
                        }
                        // Calculate duration if startTime is provided
                        let durationText;
                        if (startDateTime && selectedDate) {
                            const selectedDateObj = dayjs(selectedDate).tz(tz);
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
                            searchText: timeDisplay,
                            durationText,
                        });
                    }
                }
            }
            // Sort 12-hour options by time
            options.sort((a, b) => {
                const a12 = a;
                const b12 = b;
                let hour24A = a12.hour;
                if (a12.meridiem === 'am' && a12.hour === 12)
                    hour24A = 0;
                else if (a12.meridiem === 'pm' && a12.hour < 12)
                    hour24A = a12.hour + 12;
                let hour24B = b12.hour;
                if (b12.meridiem === 'am' && b12.hour === 12)
                    hour24B = 0;
                else if (b12.meridiem === 'pm' && b12.hour < 12)
                    hour24B = b12.hour + 12;
                if (hour24A !== hour24B) {
                    return hour24A - hour24B;
                }
                return a12.minute - b12.minute;
            });
        }
        return options;
    }, [startTime, selectedDate, tz, is24Hour, showSeconds]);
    // Time picker combobox setup
    const itemToString = React.useMemo(() => {
        return (item) => {
            return item.searchText;
        };
    }, []);
    const { contains } = react.useFilter({ sensitivity: 'base' });
    const customTimeFilter = React.useMemo(() => {
        if (is24Hour) {
            return contains;
        }
        return (itemText, filterText) => {
            if (!filterText) {
                return true;
            }
            const lowerItemText = itemText.toLowerCase();
            const lowerFilterText = filterText.toLowerCase();
            if (lowerItemText.includes(lowerFilterText)) {
                return true;
            }
            const item = timeOptions.find((opt) => opt.searchText.toLowerCase() === lowerItemText);
            if (!item || !('meridiem' in item)) {
                return false;
            }
            let hour24 = item.hour;
            if (item.meridiem === 'am' && item.hour === 12)
                hour24 = 0;
            else if (item.meridiem === 'pm' && item.hour < 12)
                hour24 = item.hour + 12;
            const hour24Str = hour24.toString().padStart(2, '0');
            const minuteStr = item.minute.toString().padStart(2, '0');
            const formats = [
                `${hour24Str}:${minuteStr}`,
                `${hour24Str}${minuteStr}`,
                hour24Str,
                `${hour24}:${minuteStr}`,
                hour24.toString(),
            ];
            return formats.some((format) => format.toLowerCase().includes(lowerFilterText) ||
                lowerFilterText.includes(format.toLowerCase()));
        };
    }, [timeOptions, is24Hour, contains]);
    const { collection, filter } = react.useListCollection({
        initialItems: timeOptions,
        itemToString: itemToString,
        itemToValue: (item) => item.value,
        filter: customTimeFilter,
    });
    // Get current value string for combobox (must match option.value format)
    const currentTimeValue = React.useMemo(() => {
        if (is24Hour) {
            if (hour === null || minute === null) {
                return '';
            }
            const s = showSeconds ? 0 : 0;
            return `${hour}:${minute}:${s}`;
        }
        else {
            if (hour === null || minute === null || meridiem === null) {
                return '';
            }
            return `${hour}:${minute}:${meridiem}`;
        }
    }, [hour, minute, meridiem, is24Hour, showSeconds]);
    // Parse custom time input formats like "1400", "2pm", "14:00", "2:00 PM"
    const parseCustomTimeInput = (input) => {
        if (!input || !input.trim()) {
            return { hour: null, minute: null, second: null, meridiem: null };
        }
        const trimmed = input.trim().toLowerCase();
        // Try parsing 4-digit format without colon: "1400" -> 14:00
        const fourDigitMatch = trimmed.match(/^(\d{4})$/);
        if (fourDigitMatch) {
            const digits = fourDigitMatch[1];
            const hour = parseInt(digits.substring(0, 2), 10);
            const minute = parseInt(digits.substring(2, 4), 10);
            if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
                if (is24Hour) {
                    return { hour, minute, second: 0, meridiem: null };
                }
                else {
                    // Convert to 12-hour format
                    let hour12 = hour;
                    let meridiem;
                    if (hour === 0) {
                        hour12 = 12;
                        meridiem = 'am';
                    }
                    else if (hour === 12) {
                        hour12 = 12;
                        meridiem = 'pm';
                    }
                    else if (hour > 12) {
                        hour12 = hour - 12;
                        meridiem = 'pm';
                    }
                    else {
                        hour12 = hour;
                        meridiem = 'am';
                    }
                    return { hour: hour12, minute, second: null, meridiem };
                }
            }
        }
        // Try parsing 3-digit or 4-digit format with meridiem: "215pm", "1124pm"
        // 3 digits: first digit is hour (1-9), last 2 digits are minutes
        // 4 digits: first 2 digits are hour (10-12), last 2 digits are minutes
        const timeNoColonMeridiemMatch = trimmed.match(/^(\d{3,4})(am|pm)$/);
        if (timeNoColonMeridiemMatch && !is24Hour) {
            const digits = timeNoColonMeridiemMatch[1];
            const meridiem = timeNoColonMeridiemMatch[2];
            let hour12;
            let minute;
            if (digits.length === 3) {
                // 3 digits: "215" -> hour=2, minute=15
                hour12 = parseInt(digits.substring(0, 1), 10);
                minute = parseInt(digits.substring(1, 3), 10);
            }
            else {
                // 4 digits: "1124" -> hour=11, minute=24
                hour12 = parseInt(digits.substring(0, 2), 10);
                minute = parseInt(digits.substring(2, 4), 10);
            }
            if (hour12 >= 1 && hour12 <= 12 && minute >= 0 && minute <= 59) {
                return { hour: hour12, minute, second: null, meridiem };
            }
        }
        // Try parsing hour with meridiem: "2pm", "14pm", "2am"
        const hourMeridiemMatch = trimmed.match(/^(\d{1,2})\s*(am|pm)$/);
        if (hourMeridiemMatch && !is24Hour) {
            const hour12 = parseInt(hourMeridiemMatch[1], 10);
            const meridiem = hourMeridiemMatch[2];
            if (hour12 >= 1 && hour12 <= 12) {
                return { hour: hour12, minute: 0, second: null, meridiem };
            }
        }
        // Try parsing 24-hour format with hour only: "14" -> 14:00
        const hourOnlyMatch = trimmed.match(/^(\d{1,2})$/);
        if (hourOnlyMatch && is24Hour) {
            const hour = parseInt(hourOnlyMatch[1], 10);
            if (hour >= 0 && hour <= 23) {
                return { hour, minute: 0, second: 0, meridiem: null };
            }
        }
        // Try parsing standard formats: "14:00", "2:00 PM"
        const time24Pattern = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/;
        const match24 = trimmed.match(time24Pattern);
        if (match24) {
            const hour24 = parseInt(match24[1], 10);
            const minute = parseInt(match24[2], 10);
            const second = match24[3] ? parseInt(match24[3], 10) : 0;
            if (hour24 >= 0 &&
                hour24 <= 23 &&
                minute >= 0 &&
                minute <= 59 &&
                second >= 0 &&
                second <= 59) {
                if (is24Hour) {
                    return { hour: hour24, minute, second, meridiem: null };
                }
                else {
                    // Convert to 12-hour format
                    let hour12 = hour24;
                    let meridiem;
                    if (hour24 === 0) {
                        hour12 = 12;
                        meridiem = 'am';
                    }
                    else if (hour24 === 12) {
                        hour12 = 12;
                        meridiem = 'pm';
                    }
                    else if (hour24 > 12) {
                        hour12 = hour24 - 12;
                        meridiem = 'pm';
                    }
                    else {
                        hour12 = hour24;
                        meridiem = 'am';
                    }
                    return { hour: hour12, minute, second: null, meridiem };
                }
            }
        }
        // Try parsing 12-hour format: "2:00 PM", "2:00PM"
        const time12Pattern = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?\s*(am|pm)$/;
        const match12 = trimmed.match(time12Pattern);
        if (match12 && !is24Hour) {
            const hour12 = parseInt(match12[1], 10);
            const minute = parseInt(match12[2], 10);
            const second = match12[3] ? parseInt(match12[3], 10) : null;
            const meridiem = match12[4];
            if (hour12 >= 1 &&
                hour12 <= 12 &&
                minute >= 0 &&
                minute <= 59 &&
                (second === null || (second >= 0 && second <= 59))) {
                return { hour: hour12, minute, second, meridiem };
            }
        }
        return { hour: null, minute: null, second: null, meridiem: null };
    };
    // Handle time change
    const handleTimeChange = (newHour, newMinute, newMeridiem) => {
        setHour(newHour);
        setMinute(newMinute);
        if (!is24Hour) {
            setMeridiem(newMeridiem);
        }
        onChange?.({
            hour: newHour,
            minute: newMinute,
            meridiem: newMeridiem,
        });
    };
    const handleTimeValueChange = (details) => {
        if (details.value.length === 0) {
            handleTimeChange(null, null, null);
            filter('');
            return;
        }
        const selectedValue = details.value[0];
        const selectedOption = timeOptions.find((opt) => opt.value === selectedValue);
        if (selectedOption) {
            filter('');
            if (is24Hour) {
                const opt24 = selectedOption;
                handleTimeChange(opt24.hour, opt24.minute, null);
            }
            else {
                const opt12 = selectedOption;
                handleTimeChange(opt12.hour, opt12.minute, opt12.meridiem);
            }
        }
    };
    const handleTimeInputChange = (details) => {
        // Store the input value and filter
        setTimeInputValue(details.inputValue);
        filter(details.inputValue);
    };
    const handleTimeInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Use the stored input value
            const parsed = parseCustomTimeInput(timeInputValue);
            if (parsed.hour !== null && parsed.minute !== null) {
                if (is24Hour) {
                    handleTimeChange(parsed.hour, parsed.minute, null);
                }
                else {
                    if (parsed.meridiem !== null) {
                        handleTimeChange(parsed.hour, parsed.minute, parsed.meridiem);
                    }
                }
                // Clear the filter and input value after applying
                filter('');
                setTimeInputValue('');
            }
        }
    };
    return (jsxRuntime.jsx(react.Grid, { gap: 2, children: jsxRuntime.jsxs(react.Combobox.Root, { value: currentTimeValue ? [currentTimeValue] : [], onValueChange: handleTimeValueChange, onInputValueChange: handleTimeInputChange, collection: collection, allowCustomValue: true, children: [jsxRuntime.jsxs(react.Combobox.Control, { children: [jsxRuntime.jsx(react.InputGroup, { startElement: jsxRuntime.jsx(bs.BsClock, {}), children: jsxRuntime.jsx(react.Combobox.Input, { placeholder: labels?.placeholder ?? (is24Hour ? 'HH:mm' : 'hh:mm AM/PM'), onKeyDown: handleTimeInputKeyDown }) }), jsxRuntime.jsx(react.Combobox.IndicatorGroup, { children: jsxRuntime.jsx(react.Combobox.Trigger, {}) })] }), jsxRuntime.jsx(react.Portal, { disabled: true, children: jsxRuntime.jsx(react.Combobox.Positioner, { children: jsxRuntime.jsxs(react.Combobox.Content, { children: [jsxRuntime.jsx(react.Combobox.Empty, { children: labels?.emptyMessage ?? 'No time found' }), collection.items.map((item) => {
                                    const option = item;
                                    return (jsxRuntime.jsxs(react.Combobox.Item, { item: item, children: [jsxRuntime.jsxs(react.Flex, { justify: "space-between", align: "center", w: "100%", children: [jsxRuntime.jsx(react.Text, { children: option.label }), option.durationText && (jsxRuntime.jsx(react.Text, { fontSize: "xs", color: "gray.500", children: option.durationText }))] }), jsxRuntime.jsx(react.Combobox.ItemIndicator, {})] }, option.value));
                                })] }) }) })] }) }));
};

dayjs.extend(timezone);
const TimePicker = ({ column, schema, prefix }) => {
    const { watch, formState: { errors }, setValue, } = reactHookForm.useFormContext();
    const { timezone, insideDialog, timePickerLabels } = useSchemaContext();
    const { required, gridColumn = 'span 12', gridRow = 'span 1', timeFormat = 'HH:mm:ssZ', displayTimeFormat = 'hh:mm A', startTimeField, selectedDateField, } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const formI18n = useFormLabel(column, prefix, schema);
    const fieldError = getNestedError(errors, colLabel);
    const [open, setOpen] = React.useState(false);
    const value = watch(colLabel);
    // Watch startTime and selectedDate fields for offset calculation
    const startTimeValue = startTimeField
        ? watch(`${prefix}${startTimeField}`)
        : undefined;
    const selectedDateValue = selectedDateField
        ? watch(`${prefix}${selectedDateField}`)
        : undefined;
    // Convert to ISO string format for startTime if it's a date-time string
    const startTime = startTimeValue
        ? dayjs(startTimeValue).tz(timezone).isValid()
            ? dayjs(startTimeValue).tz(timezone).toISOString()
            : undefined
        : undefined;
    // Convert selectedDate to YYYY-MM-DD format
    const selectedDate = selectedDateValue
        ? dayjs(selectedDateValue).tz(timezone).isValid()
            ? dayjs(selectedDateValue).tz(timezone).format('YYYY-MM-DD')
            : undefined
        : undefined;
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
    const [hour, setHour] = React.useState(initialTime.hour);
    const [minute, setMinute] = React.useState(initialTime.minute);
    const [meridiem, setMeridiem] = React.useState(initialTime.meridiem);
    React.useEffect(() => {
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
    return (jsxRuntime.jsx(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: jsxRuntime.jsx(jsxRuntime.Fragment, { children: fieldError }), invalid: !!fieldError, children: jsxRuntime.jsxs(react.Popover.Root, { open: open, onOpenChange: (e) => setOpen(e.open), closeOnInteractOutside: true, children: [jsxRuntime.jsx(react.Popover.Trigger, { asChild: true, children: jsxRuntime.jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
                            setOpen(true);
                        }, justifyContent: 'start', children: [jsxRuntime.jsx(io.IoMdClock, {}), !!value ? `${displayedTime}` : ''] }) }), insideDialog ? (jsxRuntime.jsx(react.Popover.Positioner, { children: jsxRuntime.jsx(react.Popover.Content, { maxH: "70vh", overflowY: "auto", children: jsxRuntime.jsx(react.Popover.Body, { overflow: "visible", children: jsxRuntime.jsx(TimePicker$1, { hour: hour, setHour: setHour, minute: minute, setMinute: setMinute, meridiem: meridiem, setMeridiem: setMeridiem, onChange: handleTimeChange, startTime: startTime, selectedDate: selectedDate, timezone: timezone, portalled: false, labels: timePickerLabels }) }) }) })) : (jsxRuntime.jsx(react.Portal, { children: jsxRuntime.jsx(react.Popover.Positioner, { children: jsxRuntime.jsx(react.Popover.Content, { children: jsxRuntime.jsx(react.Popover.Body, { children: jsxRuntime.jsx(TimePicker$1, { format: "12h", hour: hour, setHour: setHour, minute: minute, setMinute: setMinute, meridiem: meridiem, setMeridiem: setMeridiem, onChange: handleTimeChange, startTime: startTime, selectedDate: selectedDate, timezone: timezone, portalled: false, labels: timePickerLabels }) }) }) }) }))] }) }));
};

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
function DateTimePicker$1({ value, onChange, format = 'date-time', showSeconds = false, labels = {
    monthNamesShort: [
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
    forwardButtonLabel: 'Forward',
}, timePickerLabels, timezone: tz = 'Asia/Hong_Kong', startTime, minDate, maxDate, portalled = false, defaultDate, defaultTime, quickActionLabels = {
    yesterday: 'Yesterday',
    today: 'Today',
    tomorrow: 'Tomorrow',
    plus7Days: '+7 Days',
}, showTimezoneSelector = false, timezoneOffset: controlledTimezoneOffset, onTimezoneOffsetChange, }) {
    const is24Hour = format === 'iso-date-time' || showSeconds;
    // Labels are used in calendarLabels useMemo
    // Parse value to get date and time
    const parsedValue = React.useMemo(() => {
        if (!value)
            return null;
        const dateObj = dayjs(value).tz(tz);
        if (!dateObj.isValid())
            return null;
        return dateObj;
    }, [value, tz]);
    // Initialize date state
    const [selectedDate, setSelectedDate] = React.useState(() => {
        if (parsedValue) {
            return parsedValue.toDate();
        }
        if (defaultDate) {
            const defaultDateObj = dayjs(defaultDate).tz(tz);
            return defaultDateObj.isValid()
                ? defaultDateObj.toDate()
                : dayjs().tz(tz).toDate();
        }
        return dayjs().tz(tz).toDate();
    });
    // Initialize time state
    const [hour, setHour] = React.useState(() => {
        if (parsedValue) {
            return parsedValue.hour();
        }
        if (defaultTime?.hour !== null && defaultTime?.hour !== undefined) {
            return defaultTime.hour;
        }
        return null;
    });
    const [minute, setMinute] = React.useState(() => {
        if (parsedValue) {
            return parsedValue.minute();
        }
        if (defaultTime?.minute !== null && defaultTime?.minute !== undefined) {
            return defaultTime.minute;
        }
        return null;
    });
    const [second, setSecond] = React.useState(() => {
        if (parsedValue) {
            return parsedValue.second();
        }
        if (defaultTime?.second !== null && defaultTime?.second !== undefined) {
            return defaultTime.second;
        }
        return showSeconds ? 0 : null;
    });
    const [meridiem, setMeridiem] = React.useState(() => {
        if (parsedValue) {
            const h = parsedValue.hour();
            return h < 12 ? 'am' : 'pm';
        }
        if (defaultTime?.meridiem !== null && defaultTime?.meridiem !== undefined) {
            return defaultTime.meridiem;
        }
        return is24Hour ? null : 'am';
    });
    const dateInitialFocusEl = React.useRef(null);
    // Popover state - separate for date, time, and timezone
    const [timePopoverOpen, setTimePopoverOpen] = React.useState(false);
    const [timezonePopoverOpen, setTimezonePopoverOpen] = React.useState(false);
    const [calendarPopoverOpen, setCalendarPopoverOpen] = React.useState(false);
    // Timezone offset state (controlled or uncontrolled)
    const [internalTimezoneOffset, setInternalTimezoneOffset] = React.useState(() => {
        if (controlledTimezoneOffset !== undefined) {
            return controlledTimezoneOffset;
        }
        if (parsedValue) {
            return parsedValue.format('Z');
        }
        // Default to +08:00
        return '+08:00';
    });
    // Use controlled prop if provided, otherwise use internal state
    const timezoneOffset = controlledTimezoneOffset ?? internalTimezoneOffset;
    // Update internal state when controlled prop changes
    React.useEffect(() => {
        if (controlledTimezoneOffset !== undefined) {
            setInternalTimezoneOffset(controlledTimezoneOffset);
        }
    }, [controlledTimezoneOffset]);
    // Sync timezone offset when value changes (only if uncontrolled)
    React.useEffect(() => {
        if (controlledTimezoneOffset === undefined && parsedValue) {
            const offsetFromValue = parsedValue.format('Z');
            if (offsetFromValue !== timezoneOffset) {
                setInternalTimezoneOffset(offsetFromValue);
            }
        }
    }, [parsedValue, controlledTimezoneOffset, timezoneOffset]);
    // Sync timezone offset when value changes
    // Generate timezone offset options (UTC-12 to UTC+14)
    const timezoneOffsetOptions = React.useMemo(() => {
        const options = [];
        for (let offset = -12; offset <= 14; offset++) {
            const sign = offset >= 0 ? '+' : '-';
            const hours = Math.abs(offset).toString().padStart(2, '0');
            const value = `${sign}${hours}:00`;
            const label = `UTC${sign}${hours}:00`;
            options.push({ value, label });
        }
        return options;
    }, []);
    // Create collection for Select
    const { collection: timezoneCollection } = react.useListCollection({
        initialItems: timezoneOffsetOptions,
        itemToString: (item) => item.label,
        itemToValue: (item) => item.value,
    });
    // Ensure timezoneOffset value is valid (exists in collection)
    const validTimezoneOffset = React.useMemo(() => {
        if (!timezoneOffset)
            return undefined;
        const exists = timezoneOffsetOptions.some((opt) => opt.value === timezoneOffset);
        return exists ? timezoneOffset : undefined;
    }, [timezoneOffset, timezoneOffsetOptions]);
    // Date input state
    const [dateInputValue, setDateInputValue] = React.useState('');
    // Sync date input value with selected date
    React.useEffect(() => {
        if (selectedDate) {
            const formatted = dayjs(selectedDate).tz(tz).format('YYYY-MM-DD');
            setDateInputValue(formatted);
        }
        else {
            setDateInputValue('');
        }
    }, [selectedDate, tz]);
    // Parse and validate date input
    const parseAndValidateDateInput = (inputVal) => {
        // If empty, clear the value
        if (!inputVal.trim()) {
            setSelectedDate(null);
            updateDateTime(null, hour, minute, second, meridiem);
            return;
        }
        // Try parsing with common date formats
        let parsedDate = dayjs(inputVal, 'YYYY-MM-DD', true);
        // If that fails, try other common formats
        if (!parsedDate.isValid()) {
            parsedDate = dayjs(inputVal);
        }
        // If valid, check constraints and update
        if (parsedDate.isValid()) {
            const dateObj = parsedDate.tz(tz).toDate();
            // Check min/max constraints
            if (minDate && dateObj < minDate) {
                // Invalid: before minDate, reset to current selected date
                if (selectedDate) {
                    const formatted = dayjs(selectedDate).tz(tz).format('YYYY-MM-DD');
                    setDateInputValue(formatted);
                }
                else {
                    setDateInputValue('');
                }
                return;
            }
            if (maxDate && dateObj > maxDate) {
                // Invalid: after maxDate, reset to current selected date
                if (selectedDate) {
                    const formatted = dayjs(selectedDate).tz(tz).format('YYYY-MM-DD');
                    setDateInputValue(formatted);
                }
                else {
                    setDateInputValue('');
                }
                return;
            }
            // Valid date - update selected date
            setSelectedDate(dateObj);
            updateDateTime(dateObj, hour, minute, second, meridiem);
            // Format and update input value
            const formatted = parsedDate.tz(tz).format('YYYY-MM-DD');
            setDateInputValue(formatted);
        }
        else {
            // Invalid date - reset to current selected date
            if (selectedDate) {
                const formatted = dayjs(selectedDate).tz(tz).format('YYYY-MM-DD');
                setDateInputValue(formatted);
            }
            else {
                setDateInputValue('');
            }
        }
    };
    const handleDateInputChange = (e) => {
        setDateInputValue(e.target.value);
    };
    const handleDateInputBlur = () => {
        parseAndValidateDateInput(dateInputValue);
    };
    const handleDateInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            parseAndValidateDateInput(dateInputValue);
        }
    };
    // Display text for buttons
    const timezoneDisplayText = React.useMemo(() => {
        if (!showTimezoneSelector)
            return '';
        // Show offset as is (e.g., "+08:00")
        return timezoneOffset;
    }, [timezoneOffset, showTimezoneSelector]);
    // Update selectedDate when value changes externally
    React.useEffect(() => {
        if (parsedValue) {
            setSelectedDate(parsedValue.toDate());
            setHour(parsedValue.hour());
            setMinute(parsedValue.minute());
            setSecond(parsedValue.second());
            if (!is24Hour) {
                const h = parsedValue.hour();
                setMeridiem(h < 12 ? 'am' : 'pm');
            }
        }
    }, [parsedValue, is24Hour]);
    // Combine date and time and call onChange
    const updateDateTime = (newDate, newHour, newMinute, newSecond, newMeridiem, timezoneOffsetOverride) => {
        if (!newDate || newHour === null || newMinute === null) {
            onChange?.(undefined);
            return;
        }
        // Convert 12-hour to 24-hour if needed
        let hour24 = newHour;
        if (!is24Hour && newMeridiem) {
            // In 12-hour format, hour should be 1-12
            // If hour is > 12, it might already be in 24-hour format, convert it first
            let hour12 = newHour;
            if (newHour > 12) {
                // Hour is in 24-hour format, convert to 12-hour first
                if (newHour === 12) {
                    hour12 = 12;
                }
                else {
                    hour12 = newHour - 12;
                }
            }
            // Now convert 12-hour to 24-hour format (0-23)
            if (newMeridiem === 'am') {
                if (hour12 === 12) {
                    hour24 = 0; // 12 AM = 0:00
                }
                else {
                    hour24 = hour12; // 1-11 AM = 1-11
                }
            }
            else {
                // PM
                if (hour12 === 12) {
                    hour24 = 12; // 12 PM = 12:00
                }
                else {
                    hour24 = hour12 + 12; // 1-11 PM = 13-23
                }
            }
        }
        else if (!is24Hour && !newMeridiem) {
            // If in 12-hour mode but no meridiem, assume the hour is already in 12-hour format
            // and default to AM (or keep as is if it's a valid 12-hour value)
            // This shouldn't happen in normal flow, but handle it gracefully
            hour24 = newHour;
        }
        // If timezone selector is enabled, create date-time without timezone conversion
        // to ensure the selected timestamp matches the picker values exactly
        if (showTimezoneSelector) {
            // Use override if provided, otherwise use state value
            const offsetToUse = timezoneOffsetOverride ?? timezoneOffset;
            // Create date-time from the Date object without timezone conversion
            // Extract year, month, day from the date
            const year = newDate.getFullYear();
            const month = newDate.getMonth();
            const day = newDate.getDate();
            // Create a date-time string with the exact values from the picker
            const formattedDateTime = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour24).padStart(2, '0')}:${String(newMinute).padStart(2, '0')}:${String(newSecond ?? 0).padStart(2, '0')}`;
            // Ensure offset format is correct (should be +HH:mm or -HH:mm, not ending with Z)
            const cleanOffset = offsetToUse.replace(/Z$/, '');
            onChange?.(`${formattedDateTime}${cleanOffset}`);
            return;
        }
        // Normal mode: use timezone conversion
        let dateTime = dayjs(newDate)
            .tz(tz)
            .hour(hour24)
            .minute(newMinute)
            .second(newSecond ?? 0)
            .millisecond(0);
        if (!dateTime.isValid()) {
            onChange?.(undefined);
            return;
        }
        // Format based on format prop
        if (format === 'iso-date-time') {
            onChange?.(dateTime.format('YYYY-MM-DDTHH:mm:ss'));
        }
        else {
            // date-time format with timezone
            onChange?.(dateTime.format('YYYY-MM-DDTHH:mm:ssZ'));
        }
    };
    // Handle date selection
    const handleDateSelected = ({ date, }) => {
        setSelectedDate(date);
        updateDateTime(date, hour, minute, second, meridiem);
        setCalendarPopoverOpen(false);
    };
    // Handle time change
    const handleTimeChange = (newHour, newMinute, newSecond, newMeridiem) => {
        setHour(newHour);
        setMinute(newMinute);
        if (is24Hour) {
            setSecond(newSecond);
        }
        else {
            setMeridiem(newMeridiem);
        }
        if (selectedDate) {
            updateDateTime(selectedDate, newHour, newMinute, newSecond, newMeridiem);
        }
    };
    // Calendar hook
    const calendarProps = useCalendar({
        selected: selectedDate || undefined,
        date: selectedDate || undefined,
        minDate,
        maxDate,
        monthsToDisplay: 1,
        onDateSelected: handleDateSelected,
    });
    // Convert DateTimePickerLabels to DatePickerLabels format
    const calendarLabels = React.useMemo(() => ({
        monthNamesShort: labels.monthNamesShort || [
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
        weekdayNamesShort: labels.weekdayNamesShort || [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
        ],
        backButtonLabel: labels.backButtonLabel || 'Back',
        forwardButtonLabel: labels.forwardButtonLabel || 'Forward',
        todayLabel: quickActionLabels.today || 'Today',
        yesterdayLabel: quickActionLabels.yesterday || 'Yesterday',
        tomorrowLabel: quickActionLabels.tomorrow || 'Tomorrow',
    }), [labels, quickActionLabels]);
    // Generate time options
    const timeOptions = React.useMemo(() => {
        const options = [];
        // Get start time for comparison if provided
        let startDateTime = null;
        let shouldFilterByDate = false;
        if (startTime && selectedDate) {
            const startDateObj = dayjs(startTime).tz(tz);
            const selectedDateObj = dayjs(selectedDate).tz(tz);
            if (startDateObj.isValid() && selectedDateObj.isValid()) {
                startDateTime = startDateObj;
                shouldFilterByDate =
                    startDateObj.format('YYYY-MM-DD') ===
                        selectedDateObj.format('YYYY-MM-DD');
            }
        }
        if (is24Hour) {
            // Generate 24-hour format options
            for (let h = 0; h < 24; h++) {
                for (let m = 0; m < 60; m += 15) {
                    // Filter out times that would result in negative duration
                    if (startDateTime && selectedDate && shouldFilterByDate) {
                        const selectedDateObj = dayjs(selectedDate).tz(tz);
                        const optionDateTime = selectedDateObj
                            .hour(h)
                            .minute(m)
                            .second(0)
                            .millisecond(0);
                        if (optionDateTime.isBefore(startDateTime)) {
                            continue;
                        }
                    }
                    // Calculate duration if startTime is provided
                    let durationText;
                    if (startDateTime && selectedDate) {
                        const selectedDateObj = dayjs(selectedDate).tz(tz);
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
                    const s = showSeconds ? 0 : 0;
                    const timeDisplay = showSeconds
                        ? `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:00`
                        : `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                    options.push({
                        label: timeDisplay,
                        value: `${h}:${m}:${s}`,
                        hour: h,
                        minute: m,
                        second: s,
                        searchText: timeDisplay,
                        durationText,
                    });
                }
            }
        }
        else {
            // Generate 12-hour format options
            for (let h = 1; h <= 12; h++) {
                for (let m = 0; m < 60; m += 15) {
                    for (const mer of ['am', 'pm']) {
                        // Convert 12-hour to 24-hour for comparison
                        let hour24 = h;
                        if (mer === 'am' && h === 12)
                            hour24 = 0;
                        else if (mer === 'pm' && h < 12)
                            hour24 = h + 12;
                        // Filter out times that would result in negative duration
                        if (startDateTime && selectedDate && shouldFilterByDate) {
                            const selectedDateObj = dayjs(selectedDate).tz(tz);
                            const optionDateTime = selectedDateObj
                                .hour(hour24)
                                .minute(m)
                                .second(0)
                                .millisecond(0);
                            if (optionDateTime.isBefore(startDateTime)) {
                                continue;
                            }
                        }
                        // Calculate duration if startTime is provided
                        let durationText;
                        if (startDateTime && selectedDate) {
                            const selectedDateObj = dayjs(selectedDate).tz(tz);
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
                            searchText: timeDisplay,
                            durationText,
                        });
                    }
                }
            }
            // Sort 12-hour options by time
            return options.sort((a, b) => {
                const a12 = a;
                const b12 = b;
                let hour24A = a12.hour;
                if (a12.meridiem === 'am' && a12.hour === 12)
                    hour24A = 0;
                else if (a12.meridiem === 'pm' && a12.hour < 12)
                    hour24A = a12.hour + 12;
                let hour24B = b12.hour;
                if (b12.meridiem === 'am' && b12.hour === 12)
                    hour24B = 0;
                else if (b12.meridiem === 'pm' && b12.hour < 12)
                    hour24B = b12.hour + 12;
                if (hour24A !== hour24B) {
                    return hour24A - hour24B;
                }
                return a12.minute - b12.minute;
            });
        }
        return options;
    }, [startTime, selectedDate, tz, is24Hour, showSeconds]);
    // Time picker combobox setup
    const itemToString = React.useMemo(() => {
        return (item) => {
            return item.searchText;
        };
    }, []);
    const { contains } = react.useFilter({ sensitivity: 'base' });
    const customTimeFilter = React.useMemo(() => {
        if (is24Hour) {
            return contains;
        }
        return (itemText, filterText) => {
            if (!filterText) {
                return true;
            }
            const lowerItemText = itemText.toLowerCase();
            const lowerFilterText = filterText.toLowerCase();
            if (lowerItemText.includes(lowerFilterText)) {
                return true;
            }
            const item = timeOptions.find((opt) => opt.searchText.toLowerCase() === lowerItemText);
            if (!item || !('meridiem' in item)) {
                return false;
            }
            let hour24 = item.hour;
            if (item.meridiem === 'am' && item.hour === 12)
                hour24 = 0;
            else if (item.meridiem === 'pm' && item.hour < 12)
                hour24 = item.hour + 12;
            const hour24Str = hour24.toString().padStart(2, '0');
            const minuteStr = item.minute.toString().padStart(2, '0');
            const formats = [
                `${hour24Str}:${minuteStr}`,
                `${hour24Str}${minuteStr}`,
                hour24Str,
                `${hour24}:${minuteStr}`,
                hour24.toString(),
            ];
            return formats.some((format) => format.toLowerCase().includes(lowerFilterText) ||
                lowerFilterText.includes(format.toLowerCase()));
        };
    }, [timeOptions, is24Hour, contains]);
    const { collection, filter } = react.useListCollection({
        initialItems: timeOptions,
        itemToString: itemToString,
        itemToValue: (item) => item.value,
        filter: customTimeFilter,
    });
    // Get current value string for combobox (must match option.value format)
    const currentTimeValue = React.useMemo(() => {
        if (is24Hour) {
            if (hour === null || minute === null) {
                return '';
            }
            return `${hour}:${minute}`;
        }
        else {
            if (hour === null || minute === null || meridiem === null) {
                return '';
            }
            return `${(hour % 12 || 12).toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${meridiem}`;
        }
    }, [hour, minute, second, meridiem, is24Hour]);
    // Parse custom time input formats like "1400", "2pm", "14:00", "2:00 PM"
    const parseCustomTimeInput = (input) => {
        if (!input || !input.trim()) {
            return { hour: null, minute: null, second: null, meridiem: null };
        }
        const trimmed = input.trim().toLowerCase();
        // Try parsing 4-digit format without colon: "1400" -> 14:00
        const fourDigitMatch = trimmed.match(/^(\d{4})$/);
        if (fourDigitMatch) {
            const digits = fourDigitMatch[1];
            const hour = parseInt(digits.substring(0, 2), 10);
            const minute = parseInt(digits.substring(2, 4), 10);
            if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
                if (is24Hour) {
                    return { hour, minute, second: 0, meridiem: null };
                }
                else {
                    // Convert to 12-hour format
                    let hour12 = hour;
                    let meridiem;
                    if (hour === 0) {
                        hour12 = 12;
                        meridiem = 'am';
                    }
                    else if (hour === 12) {
                        hour12 = 12;
                        meridiem = 'pm';
                    }
                    else if (hour > 12) {
                        hour12 = hour - 12;
                        meridiem = 'pm';
                    }
                    else {
                        hour12 = hour;
                        meridiem = 'am';
                    }
                    return { hour: hour12, minute, second: null, meridiem };
                }
            }
        }
        // Try parsing 3-digit or 4-digit format with meridiem: "215pm", "1124pm"
        // 3 digits: first digit is hour (1-9), last 2 digits are minutes
        // 4 digits: first 2 digits are hour (10-12), last 2 digits are minutes
        const timeNoColonMeridiemMatch = trimmed.match(/^(\d{3,4})(am|pm)$/);
        if (timeNoColonMeridiemMatch && !is24Hour) {
            const digits = timeNoColonMeridiemMatch[1];
            const meridiem = timeNoColonMeridiemMatch[2];
            let hour12;
            let minute;
            if (digits.length === 3) {
                // 3 digits: "215" -> hour=2, minute=15
                hour12 = parseInt(digits.substring(0, 1), 10);
                minute = parseInt(digits.substring(1, 3), 10);
            }
            else {
                // 4 digits: "1124" -> hour=11, minute=24
                hour12 = parseInt(digits.substring(0, 2), 10);
                minute = parseInt(digits.substring(2, 4), 10);
            }
            if (hour12 >= 1 && hour12 <= 12 && minute >= 0 && minute <= 59) {
                return { hour: hour12, minute, second: null, meridiem };
            }
        }
        // Try parsing hour with meridiem: "2pm", "14pm", "2am"
        const hourMeridiemMatch = trimmed.match(/^(\d{1,2})\s*(am|pm)$/);
        if (hourMeridiemMatch && !is24Hour) {
            const hour12 = parseInt(hourMeridiemMatch[1], 10);
            const meridiem = hourMeridiemMatch[2];
            if (hour12 >= 1 && hour12 <= 12) {
                return { hour: hour12, minute: 0, second: null, meridiem };
            }
        }
        // Try parsing 24-hour format with hour only: "14" -> 14:00
        const hourOnlyMatch = trimmed.match(/^(\d{1,2})$/);
        if (hourOnlyMatch && is24Hour) {
            const hour = parseInt(hourOnlyMatch[1], 10);
            if (hour >= 0 && hour <= 23) {
                return { hour, minute: 0, second: 0, meridiem: null };
            }
        }
        // Try parsing standard formats: "14:00", "2:00 PM"
        const time24Pattern = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/;
        const match24 = trimmed.match(time24Pattern);
        if (match24) {
            const hour24 = parseInt(match24[1], 10);
            const minute = parseInt(match24[2], 10);
            const second = match24[3] ? parseInt(match24[3], 10) : 0;
            if (hour24 >= 0 &&
                hour24 <= 23 &&
                minute >= 0 &&
                minute <= 59 &&
                second >= 0 &&
                second <= 59) {
                if (is24Hour) {
                    return { hour: hour24, minute, second, meridiem: null };
                }
                else {
                    // Convert to 12-hour format
                    let hour12 = hour24;
                    let meridiem;
                    if (hour24 === 0) {
                        hour12 = 12;
                        meridiem = 'am';
                    }
                    else if (hour24 === 12) {
                        hour12 = 12;
                        meridiem = 'pm';
                    }
                    else if (hour24 > 12) {
                        hour12 = hour24 - 12;
                        meridiem = 'pm';
                    }
                    else {
                        hour12 = hour24;
                        meridiem = 'am';
                    }
                    return { hour: hour12, minute, second: null, meridiem };
                }
            }
        }
        // Try parsing 12-hour format: "2:00 PM", "2:00PM"
        const time12Pattern = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?\s*(am|pm)$/;
        const match12 = trimmed.match(time12Pattern);
        if (match12 && !is24Hour) {
            const hour12 = parseInt(match12[1], 10);
            const minute = parseInt(match12[2], 10);
            const second = match12[3] ? parseInt(match12[3], 10) : null;
            const meridiem = match12[4];
            if (hour12 >= 1 &&
                hour12 <= 12 &&
                minute >= 0 &&
                minute <= 59 &&
                (second === null || (second >= 0 && second <= 59))) {
                return { hour: hour12, minute, second, meridiem };
            }
        }
        return { hour: null, minute: null, second: null, meridiem: null };
    };
    const handleTimeOptionSelect = (selectedValue) => {
        const selectedOption = timeOptions.find((opt) => opt.value === selectedValue);
        if (selectedOption) {
            filter('');
            if (is24Hour) {
                const opt24 = selectedOption;
                handleTimeChange(opt24.hour, opt24.minute, opt24.second, null);
            }
            else {
                const opt12 = selectedOption;
                handleTimeChange(opt12.hour, opt12.minute, null, opt12.meridiem);
            }
            setTimePopoverOpen(false);
        }
    };
    // Track the current input value for Enter key handling
    const [timeInputValue, setTimeInputValue] = React.useState('');
    const timeInitialFocusEl = React.useRef(null);
    const timeDisplayValue = timePopoverOpen ? timeInputValue : currentTimeValue;
    const handleTimeInputChange = (e) => {
        const value = e.target.value;
        setTimeInputValue(value);
        filter(value);
    };
    const handleTimeInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmed = timeInputValue.trim();
            if (trimmed === '') {
                filter('');
                setTimeInputValue('');
                setTimePopoverOpen(false);
                return;
            }
            const parsed = parseCustomTimeInput(timeInputValue);
            if (parsed.hour !== null && parsed.minute !== null) {
                if (is24Hour) {
                    handleTimeChange(parsed.hour, parsed.minute, parsed.second, null);
                }
                else {
                    if (parsed.meridiem !== null) {
                        handleTimeChange(parsed.hour, parsed.minute, parsed.second, parsed.meridiem);
                    }
                }
                filter('');
                setTimeInputValue('');
                setTimePopoverOpen(false);
            }
        }
    };
    return (jsxRuntime.jsxs(react.HStack, { justifyContent: 'start', alignItems: 'center', gap: 2, children: [jsxRuntime.jsx(react.InputGroup, { endElement: jsxRuntime.jsxs(react.Popover.Root, { open: calendarPopoverOpen, onOpenChange: (e) => setCalendarPopoverOpen(e.open), closeOnInteractOutside: false, autoFocus: false, children: [jsxRuntime.jsx(react.Popover.Trigger, { asChild: true, children: jsxRuntime.jsx(react.Button, { variant: "ghost", size: "xs", "aria-label": "Open calendar", onClick: () => setCalendarPopoverOpen(true), children: jsxRuntime.jsx(md.MdDateRange, {}) }) }), jsxRuntime.jsx(react.Portal, { disabled: portalled, children: jsxRuntime.jsx(react.Popover.Positioner, { children: jsxRuntime.jsx(react.Popover.Content, { width: "fit-content", zIndex: 1500, children: jsxRuntime.jsx(react.Popover.Body, { p: 4, children: jsxRuntime.jsx(DatePickerContext.Provider, { value: { labels: calendarLabels }, children: jsxRuntime.jsx(Calendar, { ...calendarProps, firstDayOfWeek: 0 }) }) }) }) }) })] }), children: jsxRuntime.jsx(react.Input, { value: dateInputValue, onChange: handleDateInputChange, onBlur: handleDateInputBlur, onKeyDown: handleDateInputKeyDown, placeholder: "YYYY-MM-DD", ref: dateInitialFocusEl }) }), jsxRuntime.jsxs(react.Popover.Root, { open: timePopoverOpen, onOpenChange: (e) => setTimePopoverOpen(e.open), initialFocusEl: () => timeInitialFocusEl.current, closeOnInteractOutside: true, autoFocus: false, children: [jsxRuntime.jsx(react.Popover.Trigger, { asChild: true, children: jsxRuntime.jsx(react.InputGroup, { startElement: jsxRuntime.jsx(bs.BsClock, {}), children: jsxRuntime.jsx(react.Input, { value: timeDisplayValue, onChange: handleTimeInputChange, onKeyDown: handleTimeInputKeyDown, placeholder: timePickerLabels?.placeholder ??
                                    (is24Hour ? 'HH:mm' : 'hh:mm AM/PM'), ref: timeInitialFocusEl }) }) }), jsxRuntime.jsx(react.Portal, { disabled: portalled, children: jsxRuntime.jsx(react.Popover.Positioner, { children: jsxRuntime.jsx(react.Popover.Content, { overflowY: "auto", children: jsxRuntime.jsx(react.Popover.Body, { p: 0, minH: "200px", maxH: "70vh", width: "fit-content", children: collection.items.length === 0 ? (jsxRuntime.jsx(react.Text, { px: 3, py: 2, color: "gray.500", fontSize: "sm", children: timePickerLabels?.emptyMessage ?? 'No time found' })) : (collection.items.map((item) => {
                                        const option = item;
                                        const isSelected = option.value === currentTimeValue;
                                        return (jsxRuntime.jsx(react.Button, { variant: "ghost", size: "sm", w: "100%", borderRadius: 0, fontWeight: isSelected ? 'semibold' : 'normal', onClick: () => handleTimeOptionSelect(option.value), children: jsxRuntime.jsxs(react.Flex, { justify: "space-between", align: "center", w: "100%", children: [jsxRuntime.jsx(react.Text, { children: option.label }), option.durationText && (jsxRuntime.jsx(react.Text, { fontSize: "xs", color: "gray.500", children: option.durationText }))] }) }, option.value));
                                    })) }) }) }) })] }), showTimezoneSelector && (jsxRuntime.jsxs(react.Popover.Root, { open: timezonePopoverOpen, onOpenChange: (e) => setTimezonePopoverOpen(e.open), closeOnInteractOutside: true, autoFocus: false, children: [jsxRuntime.jsx(react.Popover.Trigger, { asChild: true, children: jsxRuntime.jsx(react.Button, { size: "sm", variant: "outline", onClick: () => setTimezonePopoverOpen(true), justifyContent: "start", children: timezoneDisplayText || 'Select timezone' }) }), jsxRuntime.jsx(react.Portal, { disabled: portalled, children: jsxRuntime.jsx(react.Popover.Positioner, { children: jsxRuntime.jsx(react.Popover.Content, { width: "fit-content", minW: "250px", children: jsxRuntime.jsx(react.Popover.Body, { p: 4, children: jsxRuntime.jsx(react.Grid, { gap: 2, children: jsxRuntime.jsxs(react.Select.Root, { size: "sm", collection: timezoneCollection, value: validTimezoneOffset ? [validTimezoneOffset] : [], onValueChange: (e) => {
                                                const newOffset = e.value[0];
                                                if (newOffset) {
                                                    // Update controlled or internal state
                                                    if (onTimezoneOffsetChange) {
                                                        onTimezoneOffsetChange(newOffset);
                                                    }
                                                    else {
                                                        setInternalTimezoneOffset(newOffset);
                                                    }
                                                    // Update date-time with new offset (pass it directly to avoid stale state)
                                                    if (selectedDate &&
                                                        hour !== null &&
                                                        minute !== null) {
                                                        updateDateTime(selectedDate, hour, minute, second, meridiem, newOffset);
                                                    }
                                                    // Close popover after selection
                                                    setTimezonePopoverOpen(false);
                                                }
                                            }, children: [jsxRuntime.jsxs(react.Select.Control, { children: [jsxRuntime.jsx(react.Select.Trigger, {}), jsxRuntime.jsx(react.Select.IndicatorGroup, { children: jsxRuntime.jsx(react.Select.Indicator, {}) })] }), jsxRuntime.jsx(react.Select.Positioner, { children: jsxRuntime.jsx(react.Select.Content, { children: timezoneCollection.items.map((item) => (jsxRuntime.jsxs(react.Select.Item, { item: item, children: [jsxRuntime.jsx(react.Select.ItemText, { children: item.label }), jsxRuntime.jsx(react.Select.ItemIndicator, {})] }, item.value))) }) })] }) }) }) }) }) })] }))] }));
}

dayjs.extend(utc);
dayjs.extend(timezone);
const DateTimePicker = ({ column, schema, prefix, }) => {
    const { watch, formState: { errors }, setValue, } = reactHookForm.useFormContext();
    const { timezone, dateTimePickerLabels, timePickerLabels } = useSchemaContext();
    const formI18n = useFormLabel(column, prefix, schema);
    const { required, gridColumn = 'span 12', gridRow = 'span 1', 
    // with timezone
    dateFormat = 'YYYY-MM-DD[T]HH:mm:ssZ', dateTimePicker, } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = formI18n.colLabel;
    const fieldError = getNestedError(errors, colLabel);
    const selectedDate = watch(colLabel);
    // Set default date on mount if no value exists
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
    const dateTimePickerContent = (jsxRuntime.jsx(DateTimePicker$1, { value: selectedDate, onChange: (date) => {
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
        }, timezone: timezone, labels: dateTimePickerLabelsConfig, timePickerLabels: timePickerLabels, showQuickActions: dateTimePicker?.showQuickActions ?? false, quickActionLabels: dateTimePickerLabels?.quickActionLabels ??
            dateTimePicker?.quickActionLabels, showTimezoneSelector: dateTimePicker?.showTimezoneSelector ?? false }));
    return (jsxRuntime.jsxs(Field, { label: formI18n.label(), required: isRequired, alignItems: 'stretch', gridColumn,
        gridRow, errorText: jsxRuntime.jsx(jsxRuntime.Fragment, { children: fieldError }), invalid: !!fieldError, children: [jsxRuntime.jsx("input", { type: "hidden", name: colLabel, value: selectedDate ?? '', readOnly: true, "aria-hidden": true }), dateTimePickerContent] }));
};

const SchemaRenderer = ({ schema, prefix, column, }) => {
    const colSchema = schema;
    const { type, variant, properties: innerProperties, format, items } = schema;
    if (variant === 'custom-input') {
        return jsxRuntime.jsx(CustomInput, { schema: colSchema, prefix, column });
    }
    if (type === 'string') {
        if ((schema.enum ?? []).length > 0) {
            return jsxRuntime.jsx(EnumPicker, { schema: colSchema, prefix, column });
        }
        if (variant === 'id-picker') {
            return jsxRuntime.jsx(IdPickerSingle, { schema: colSchema, prefix, column });
        }
        if (format === 'date') {
            return jsxRuntime.jsx(DatePicker, { schema: colSchema, prefix, column });
        }
        if (format === 'time') {
            return jsxRuntime.jsx(TimePicker, { schema: colSchema, prefix, column });
        }
        if (format === 'date-time') {
            return jsxRuntime.jsx(DateTimePicker, { schema: colSchema, prefix, column });
        }
        if (variant === 'text-area') {
            return jsxRuntime.jsx(TextAreaInput, { schema: colSchema, prefix, column });
        }
        if (variant === 'media-library-browser') {
            return (jsxRuntime.jsx(FormMediaLibraryBrowser, { schema: colSchema, prefix, column }));
        }
        return jsxRuntime.jsx(StringInputField, { schema: colSchema, prefix, column });
    }
    if (type === 'number' || type === 'integer') {
        return jsxRuntime.jsx(NumberInputField, { schema: colSchema, prefix, column });
    }
    if (type === 'boolean') {
        return jsxRuntime.jsx(BooleanPicker, { schema: colSchema, prefix, column });
    }
    if (type === 'object') {
        if (innerProperties) {
            return jsxRuntime.jsx(ObjectInput, { schema: colSchema, prefix, column });
        }
        return jsxRuntime.jsx(RecordInput, { schema: colSchema, prefix, column });
    }
    if (type === 'array') {
        if (variant === 'id-picker') {
            return jsxRuntime.jsx(IdPickerMultiple, { schema: colSchema, prefix, column });
        }
        if (variant === 'file-picker') {
            return jsxRuntime.jsx(FilePicker, { schema: colSchema, prefix, column });
        }
        if (variant === 'media-library-browser') {
            return (jsxRuntime.jsx(FormMediaLibraryBrowser, { schema: colSchema, prefix, column }));
        }
        if (variant === 'date-range') {
            return jsxRuntime.jsx(DateRangePicker, { schema: colSchema, prefix, column });
        }
        if (variant === 'enum-picker') {
            const { items, title } = colSchema;
            const itemsSchema = Array.isArray(items) ? items[0] : items;
            const { enum: enumItems } = itemsSchema ?? {};
            // Use renderDisplay from parent schema only
            const renderDisplay = colSchema.renderDisplay;
            const enumSchema = {
                type: 'string',
                enum: enumItems,
                ...(renderDisplay && { renderDisplay }),
                ...(title && { title }),
            };
            return (jsxRuntime.jsx(EnumPicker, { isMultiple: true, schema: enumSchema, prefix, column }));
        }
        if (items) {
            return jsxRuntime.jsx(ArrayRenderer, { schema: colSchema, prefix, column });
        }
        return jsxRuntime.jsx(react.Text, { children: `array ${column}` });
    }
    if (type === 'null') {
        return jsxRuntime.jsx(react.Text, { children: `null ${column}` });
    }
    return jsxRuntime.jsx(react.Text, { children: "missing type" });
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
    return jsxRuntime.jsx(SchemaRenderer, { schema: schemaWithRequired, prefix, column });
};

const FormBody = () => {
    const { schema } = useSchemaContext();
    const { properties } = schema;
    const ordered = Object.keys(properties);
    return (jsxRuntime.jsx(react.Flex, { flexFlow: 'column', gap: "2", children: jsxRuntime.jsx(react.Grid, { gap: "4", gridTemplateColumns: 'repeat(12, 1fr)', autoFlow: 'row', children: ordered.map((column) => {
                if (!properties) {
                    console.error('properties is undefined when using FormBody', schema);
                    return null;
                }
                return (jsxRuntime.jsx(ColumnRenderer, { properties: properties, prefix: ``, parentRequired: schema.required, column }, `form-input-${column}`));
            }) }) }));
};

const FormRoot = ({ schema, idMap, setIdMap, form, children, dateTimePickerLabels, idPickerLabels, enumPickerLabels, filePickerLabels, formButtonLabels, timePickerLabels, insideDialog = false, }) => {
    return (jsxRuntime.jsx(SchemaFormContext.Provider, { value: {
            schema,
            idMap,
            setIdMap,
            dateTimePickerLabels,
            idPickerLabels,
            enumPickerLabels,
            filePickerLabels,
            formButtonLabels,
            timePickerLabels,
            insideDialog,
        }, children: jsxRuntime.jsx(reactHookForm.FormProvider, { ...form, children: children }) }));
};

const DefaultForm = ({ formConfig, }) => {
    return (jsxRuntime.jsx(FormRoot, { ...formConfig, children: jsxRuntime.jsx(react.Grid, { gap: "2", children: jsxRuntime.jsx(FormBody, {}) }) }));
};

function useForm({ preLoadedValues, schema, }) {
    const form = reactHookForm.useForm({
        values: preLoadedValues,
        mode: 'onSubmit',
        resolver: schema
            ? ajv.ajvResolver(schema, {
                strict: false,
            })
            : undefined,
        reValidateMode: 'onChange',
    });
    const [idMap, setIdMap] = React.useState({});
    return {
        form,
        idMap,
        setIdMap,
    };
}

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

const VIEWPORT_TRANSITION_EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
const VIEWPORT_TRANSITION_DURATION_MS = 220;
const VIEWPORT_TRANSITION = `transform ${VIEWPORT_TRANSITION_DURATION_MS}ms ${VIEWPORT_TRANSITION_EASING}, opacity ${VIEWPORT_TRANSITION_DURATION_MS}ms ${VIEWPORT_TRANSITION_EASING}`;
const TimeViewportContext = React.createContext(null);
const useResolvedViewport = (viewportStart, viewportEnd) => {
    const context = React.useContext(TimeViewportContext);
    const resolvedStart = viewportStart ?? context?.viewportStart;
    const resolvedEnd = viewportEnd ?? context?.viewportEnd;
    if (resolvedStart === undefined || resolvedEnd === undefined)
        return null;
    return {
        viewportStart: resolvedStart,
        viewportEnd: resolvedEnd,
    };
};
function TimeViewportRoot({ viewportStart, viewportEnd, children, onViewportChange, enableDragPan = false, enableCtrlWheelZoom = false, wheelZoomFactor = 1.2, minDurationMs = 60 * 1000, maxDurationMs = 365 * 24 * 60 * 60 * 1000, }) {
    const containerRef = React.useRef(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const dragRef = React.useRef(null);
    const parseViewport = React.useCallback(() => {
        const start = parseTimeInput(viewportStart);
        const end = parseTimeInput(viewportEnd);
        if (!start || !end || !end.isAfter(start))
            return null;
        return {
            startMs: start.valueOf(),
            endMs: end.valueOf(),
        };
    }, [viewportEnd, viewportStart]);
    const handlePointerDown = (e) => {
        if (!enableDragPan || !onViewportChange)
            return;
        if (e.button !== 0)
            return;
        const parsed = parseViewport();
        if (!parsed)
            return;
        dragRef.current = {
            pointerId: e.pointerId,
            startX: e.clientX,
            viewportStartMs: parsed.startMs,
            viewportEndMs: parsed.endMs,
        };
        setIsDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
    };
    const handlePointerMove = (e) => {
        if (!enableDragPan || !onViewportChange)
            return;
        const dragging = dragRef.current;
        if (!dragging || dragging.pointerId !== e.pointerId)
            return;
        const width = containerRef.current?.clientWidth ?? 0;
        if (width <= 0)
            return;
        const deltaX = e.clientX - dragging.startX;
        const durationMs = dragging.viewportEndMs - dragging.viewportStartMs;
        const shiftMs = (-deltaX / width) * durationMs;
        onViewportChange({
            start: dayjs(dragging.viewportStartMs + shiftMs).toDate(),
            end: dayjs(dragging.viewportEndMs + shiftMs).toDate(),
        });
    };
    const stopDragging = (e) => {
        const dragging = dragRef.current;
        if (!dragging || dragging.pointerId !== e.pointerId)
            return;
        dragRef.current = null;
        setIsDragging(false);
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
        }
    };
    const handleWheel = (e) => {
        if (!e.ctrlKey)
            return;
        // Prevent browser-level Ctrl/Cmd + wheel page zoom while interacting
        // with the timeline surface.
        e.preventDefault();
        if (!enableCtrlWheelZoom || !onViewportChange)
            return;
        const parsed = parseViewport();
        if (!parsed)
            return;
        const width = containerRef.current?.clientWidth ?? 0;
        if (width <= 0)
            return;
        const safeFactor = wheelZoomFactor > 1 ? wheelZoomFactor : 1.2;
        const durationMs = parsed.endMs - parsed.startMs;
        // Exponential zoom curve: each wheel "step" compounds by safeFactor.
        // This keeps zooming smooth on trackpads and predictable on mouse wheels.
        const wheelStep = e.deltaY / 100;
        const zoomMultiplier = Math.pow(safeFactor, wheelStep);
        const nextDuration = clampNumber(durationMs * (Number.isFinite(zoomMultiplier) ? zoomMultiplier : 1), minDurationMs, maxDurationMs);
        const rect = containerRef.current?.getBoundingClientRect();
        const x = rect ? e.clientX - rect.left : width / 2;
        const ratio = clampNumber(x / width, 0, 1);
        const anchorMs = parsed.startMs + durationMs * ratio;
        const nextStartMs = anchorMs - nextDuration * ratio;
        const nextEndMs = anchorMs + nextDuration * (1 - ratio);
        onViewportChange({
            start: dayjs(nextStartMs).toDate(),
            end: dayjs(nextEndMs).toDate(),
        });
    };
    return (jsxRuntime.jsx(TimeViewportContext.Provider, { value: { viewportStart, viewportEnd }, children: jsxRuntime.jsx(react.Box, { ref: containerRef, position: "relative", width: "100%", cursor: enableDragPan ? (isDragging ? 'grabbing' : 'grab') : 'default', userSelect: enableDragPan ? 'none' : undefined, onPointerDown: handlePointerDown, onPointerMove: handlePointerMove, onPointerUp: stopDragging, onPointerCancel: stopDragging, onWheel: handleWheel, children: children }) }));
}
function TimeViewportTrackRow({ trackKey, blocks, resolvedHeight, prefix, suffix, renderBlockNode, }) {
    return (jsxRuntime.jsxs(react.Box, { width: "100%", overflowX: 'hidden', position: "relative", height: resolvedHeight, children: [jsxRuntime.jsx(react.Box, { position: "relative", width: "100%", height: "100%", children: blocks.map((item, index) => renderBlockNode(item, index)) }), prefix ? (jsxRuntime.jsx(react.Box, { position: "absolute", top: 0, insetInlineStart: 0, zIndex: 2, pointerEvents: "auto", children: prefix })) : null, suffix ? (jsxRuntime.jsx(react.Box, { position: "absolute", top: 0, insetInlineEnd: 0, zIndex: 2, pointerEvents: "auto", children: suffix })) : null] }, trackKey));
}
const defaultLabels = {
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    reset: 'Reset',
    visibleRange: 'Visible range',
    duration: 'Duration',
    daysShort: 'd',
    hoursShort: 'h',
    minutesShort: 'm',
    secondsShort: 's',
    invalidRange: 'Invalid range',
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
};
const DEFAULT_MIN_DURATION_MS = 60 * 1000;
const DEFAULT_MAX_DURATION_MS = 365 * 24 * 60 * 60 * 1000;
const DEFAULT_ZOOM_FACTOR = 2;
const clampNumber = (value, min, max) => Math.min(Math.max(value, min), max);
const toValidDayjs = (value, fallback) => {
    const parsed = dayjs(value);
    return parsed.isValid() ? parsed : fallback;
};
const parseTimeInput = (value) => {
    const parsed = dayjs(value);
    return parsed.isValid() ? parsed : null;
};
const flattenTrackBlocks = (blocks, inheritedTrack) => {
    const flattened = [];
    blocks.forEach((block) => {
        const resolvedTrack = block.track ?? inheritedTrack;
        if (block.children && block.children.length > 0) {
            flattened.push(...flattenTrackBlocks(block.children, resolvedTrack));
        }
        if (block.start !== undefined && block.end !== undefined) {
            flattened.push({
                ...block,
                track: resolvedTrack,
            });
        }
    });
    return flattened;
};
function useTimeViewport(viewportStart, viewportEnd, format) {
    const viewport = useResolvedViewport(viewportStart, viewportEnd);
    const parsedViewport = React.useMemo(() => {
        if (!viewport)
            return null;
        const start = parseTimeInput(viewport.viewportStart);
        const end = parseTimeInput(viewport.viewportEnd);
        if (!start || !end || !end.isAfter(start))
            return null;
        const viewportStartMs = start.valueOf();
        const viewportEndMs = end.valueOf();
        return {
            start,
            end,
            formatString: format ?? getDefaultHeaderFormat(start, end),
            viewportStartMs,
            viewportEndMs,
            viewportDurationMs: viewportEndMs - viewportStartMs,
        };
    }, [format, viewport]);
    const toTimeMs = React.useCallback((value) => {
        if (value === undefined)
            return null;
        const parsed = parseTimeInput(value);
        return parsed ? parsed.valueOf() : null;
    }, []);
    const getGeometry = React.useCallback((start, end) => {
        if (!parsedViewport || start === undefined || end === undefined) {
            return { valid: false, leftPercent: 0, widthPercent: 0 };
        }
        const blockStartMs = toTimeMs(start);
        const blockEndMs = toTimeMs(end);
        if (blockStartMs === null ||
            blockEndMs === null ||
            blockEndMs <= blockStartMs) {
            return { valid: false, leftPercent: 0, widthPercent: 0 };
        }
        const visibleStartMs = Math.max(blockStartMs, parsedViewport.viewportStartMs);
        const visibleEndMs = Math.min(blockEndMs, parsedViewport.viewportEndMs);
        if (visibleEndMs <= visibleStartMs) {
            return { valid: true, leftPercent: 0, widthPercent: 0 };
        }
        const leftMs = visibleStartMs - parsedViewport.viewportStartMs;
        const widthMs = visibleEndMs - visibleStartMs;
        return {
            valid: true,
            leftPercent: clampNumber((leftMs / parsedViewport.viewportDurationMs) * 100, 0, 100),
            widthPercent: clampNumber((widthMs / parsedViewport.viewportDurationMs) * 100, 0, 100),
        };
    }, [parsedViewport, toTimeMs]);
    const getTimestampPercent = React.useCallback((timestamp) => {
        if (!parsedViewport || timestamp === undefined) {
            return { valid: false, percent: 0, inView: false };
        }
        const timestampMs = toTimeMs(timestamp);
        if (timestampMs === null)
            return { valid: false, percent: 0, inView: false };
        const rawPercent = ((timestampMs - parsedViewport.viewportStartMs) /
            parsedViewport.viewportDurationMs) *
            100;
        return {
            valid: true,
            percent: clampNumber(rawPercent, 0, 100),
            inView: rawPercent >= 0 && rawPercent <= 100,
        };
    }, [parsedViewport, toTimeMs]);
    const getTicksByCount = React.useCallback((tickCount = 7) => {
        if (!parsedViewport)
            return [];
        const safeTickCount = Math.max(2, tickCount);
        return Array.from({ length: safeTickCount }, (_, index) => {
            const ratio = index / (safeTickCount - 1);
            const tickTime = parsedViewport.start.add(parsedViewport.viewportDurationMs * ratio, 'millisecond');
            return {
                index,
                percent: ratio * 100,
                label: tickTime.format(parsedViewport.formatString),
            };
        });
    }, [parsedViewport]);
    const getTicksByTimeUnit = React.useCallback((tickUnit = 'hour', tickStep = 1) => {
        if (!parsedViewport)
            return [];
        const safeTickStep = Math.max(1, Math.floor(tickStep));
        const candidateTimes = [parsedViewport.start];
        let cursor = parsedViewport.start.startOf(tickUnit);
        while (cursor.isBefore(parsedViewport.start)) {
            cursor = cursor.add(safeTickStep, tickUnit);
        }
        while (cursor.isBefore(parsedViewport.end) ||
            cursor.isSame(parsedViewport.end)) {
            candidateTimes.push(cursor);
            cursor = cursor.add(safeTickStep, tickUnit);
        }
        candidateTimes.push(parsedViewport.end);
        const uniqueSortedTicks = Array.from(new Map(candidateTimes.map((time) => [time.valueOf(), time])).values()).sort((a, b) => a.valueOf() - b.valueOf());
        return uniqueSortedTicks.map((tickTime, index) => {
            const ratio = tickTime.diff(parsedViewport.start, 'millisecond') /
                parsedViewport.viewportDurationMs;
            return {
                index,
                percent: clampNumber(ratio * 100, 0, 100),
                label: tickTime.format(parsedViewport.formatString),
            };
        });
    }, [parsedViewport]);
    const getTicks = React.useCallback((options) => {
        const strategy = options?.tickStrategy ?? 'count';
        if (strategy === 'timeUnit') {
            return getTicksByTimeUnit(options?.tickUnit, options?.tickStep);
        }
        return getTicksByCount(options?.tickCount);
    }, [getTicksByCount, getTicksByTimeUnit]);
    return {
        isValidViewport: Boolean(parsedViewport),
        toTimeMs,
        getGeometry,
        getTimestampPercent,
        getTicksByCount,
        getTicksByTimeUnit,
        getTicks,
    };
}
function useTimeViewportBlockGeometry(viewportStart, viewportEnd) {
    const { isValidViewport, getGeometry, toTimeMs } = useTimeViewport(viewportStart, viewportEnd);
    return {
        hasValidViewport: isValidViewport,
        getGeometry,
        toTimeMs,
    };
}
const getDefaultHeaderFormat = (start, end) => {
    const durationHours = end.diff(start, 'hour', true);
    if (durationHours <= 24)
        return 'HH:mm';
    if (durationHours <= 24 * 7)
        return 'ddd HH:mm';
    return 'MMM D';
};
function useTimeViewportTicks({ viewportStart, viewportEnd, format, }) {
    const { isValidViewport, getTicksByCount, getTicksByTimeUnit, getTicks } = useTimeViewport(viewportStart, viewportEnd, format);
    return {
        isValidViewport,
        getTicksByCount,
        getTicksByTimeUnit,
        getTicks,
    };
}
const useTimeViewportHeader = useTimeViewportTicks;
const formatDuration = (durationMs, labels) => {
    const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const parts = [];
    if (days > 0)
        parts.push(`${days}${labels.daysShort}`);
    if (hours > 0)
        parts.push(`${hours}${labels.hoursShort}`);
    if (minutes > 0)
        parts.push(`${minutes}${labels.minutesShort}`);
    if (seconds > 0 || parts.length === 0)
        parts.push(`${seconds}${labels.secondsShort}`);
    return parts.join(' ');
};
/**
 * A resizable timeline block based on block time range and viewport time range.
 * Width and offset are automatically derived from datetime overlap.
 */
function TimeViewportBlock({ start, end, viewportStart, viewportEnd, height = '28px', minWidthPx = 2, borderRadius = 'sm', colorPalette = 'blue', background, label, showLabel = true, hideWhenOutOfView = true, onClick, }) {
    const { getGeometry } = useTimeViewportBlockGeometry(viewportStart, viewportEnd);
    const geometry = React.useMemo(() => {
        return getGeometry(start, end);
    }, [end, getGeometry, start]);
    if (!geometry.valid)
        return null;
    if (hideWhenOutOfView && geometry.widthPercent <= 0)
        return null;
    return (jsxRuntime.jsx(react.Box, { position: "relative", width: "100%", height: height, children: jsxRuntime.jsx(react.Box, { position: "absolute", inset: 0, pointerEvents: "none", children: jsxRuntime.jsx(react.Box, { width: "100%", height: "100%", transform: `translateX(${geometry.leftPercent}%)`, transition: VIEWPORT_TRANSITION, children: jsxRuntime.jsx(react.Box, { width: `max(${geometry.widthPercent}%, ${minWidthPx}px)`, height: "100%", borderRadius: borderRadius, bg: background ?? `${colorPalette}.500`, _dark: {
                        bg: background ?? `${colorPalette}.900`,
                    }, display: "flex", alignItems: "center", justifyContent: "center", px: 2, overflow: "hidden", pointerEvents: "auto", onClick: onClick, cursor: onClick ? 'pointer' : 'default', children: showLabel && label ? (jsxRuntime.jsx(react.Text, { fontSize: "xs", lineClamp: 1, color: "white", _dark: { color: 'gray.100' }, children: label })) : null }) }) }) }));
}
/**
 * Vertical marker line for a timestamp in the current viewport.
 */
function TimeViewportMarkerLine({ timestamp, viewportStart, viewportEnd, height = '100%', colorPalette = 'red', color, lineWidthPx = 2, label, showLabel = true, hideWhenOutOfView = true, }) {
    const { getTimestampPercent } = useTimeViewport(viewportStart, viewportEnd);
    const marker = React.useMemo(() => {
        return getTimestampPercent(timestamp);
    }, [getTimestampPercent, timestamp]);
    if (!marker.valid)
        return null;
    if (hideWhenOutOfView && !marker.inView)
        return null;
    return (jsxRuntime.jsx(react.Box, { position: "absolute", insetInlineStart: 0, insetInlineEnd: 0, top: 0, bottom: 0, pointerEvents: "none", zIndex: 100, height: height, children: jsxRuntime.jsxs(react.Box, { width: "100%", height: "100%", transform: `translateX(${marker.percent}%)`, transition: VIEWPORT_TRANSITION, transformOrigin: "left center", children: [jsxRuntime.jsx(react.Box, { width: `${lineWidthPx}px`, height: "100%", bg: color ?? `${colorPalette}.500`, _dark: { bg: color ?? `${colorPalette}.500` }, transform: "translateX(-50%)" }), showLabel && label ? (jsxRuntime.jsx(react.Text, { position: "absolute", insetInlineStart: 0, top: "100%", mt: 1, display: "inline-block", fontSize: "xs", whiteSpace: "nowrap", color: color ?? `${colorPalette}.700`, _dark: { color: color ?? `${colorPalette}.500` }, transform: "translateX(-50%)", children: label })) : null] }) }));
}
/**
 * Header labels for timeline viewport time scale.
 */
function TimeViewportHeader({ viewportStart, viewportEnd, tickCount = 7, tickStrategy = 'count', tickUnit = 'hour', tickStep = 1, format, height = '28px', color = 'gray.600', borderColor = 'gray.200', showBottomBorder = true, animationDurationMs = VIEWPORT_TRANSITION_DURATION_MS, animationEasing = VIEWPORT_TRANSITION_EASING, }) {
    const { isValidViewport, getTicks } = useTimeViewport(viewportStart, viewportEnd, format);
    const ticks = getTicks({ tickStrategy, tickCount, tickUnit, tickStep });
    const safeTickCount = ticks.length;
    const transitionValue = animationDurationMs > 0
        ? `transform ${animationDurationMs}ms ${animationEasing}, opacity ${animationDurationMs}ms ${animationEasing}`
        : undefined;
    if (!isValidViewport || safeTickCount < 2)
        return null;
    return (jsxRuntime.jsx(react.Box, { position: "relative", width: "100%", height: height, borderBottomWidth: showBottomBorder ? '1px' : '0px', borderColor: borderColor, _dark: { borderColor: 'gray.700' }, mb: 2, children: ticks.map((tick) => (jsxRuntime.jsx(react.Box, { position: "absolute", inset: 0, transform: `translateX(${tick.percent}%)`, transition: transitionValue, children: jsxRuntime.jsx(react.Text, { position: "absolute", insetInlineStart: 0, top: "50%", translate: "0 -50%", transform: tick.index === 0
                    ? 'translateX(0%)'
                    : tick.index === safeTickCount - 1
                        ? 'translateX(-100%)'
                        : 'translateX(-50%)', fontSize: "xs", color: color, _dark: { color: 'gray.300' }, whiteSpace: "nowrap", children: tick.label }) }, `tick-wrap-${tick.index}`))) }));
}
/**
 * Vertical grid lines for measuring block positions in the viewport.
 * Render inside a relative container that also contains blocks.
 */
function TimeViewportGrid({ viewportStart, viewportEnd, tickCount = 8, tickStrategy = 'count', tickUnit = 'hour', tickStep = 1, format, minorDivisions = 2, majorLineColor = 'gray.300', minorLineColor = 'gray.200', showMinorLines = true, zIndex = 0, animationDurationMs = VIEWPORT_TRANSITION_DURATION_MS, animationEasing = VIEWPORT_TRANSITION_EASING, }) {
    const { isValidViewport, getTicks } = useTimeViewport(viewportStart, viewportEnd, format);
    const majorTicks = getTicks({ tickStrategy, tickCount, tickUnit, tickStep });
    if (!isValidViewport || majorTicks.length < 2)
        return null;
    const safeMinorDivisions = Math.max(1, minorDivisions);
    const transitionValue = animationDurationMs > 0
        ? `transform ${animationDurationMs}ms ${animationEasing}, opacity ${animationDurationMs}ms ${animationEasing}`
        : undefined;
    const minorTicks = showMinorLines
        ? majorTicks.slice(0, -1).flatMap((tick, segmentIndex) => {
            const base = tick.percent;
            const next = majorTicks[segmentIndex + 1].percent;
            const segment = [];
            for (let step = 1; step < safeMinorDivisions; step += 1) {
                segment.push(base + ((next - base) * step) / safeMinorDivisions);
            }
            return segment;
        })
        : [];
    return (jsxRuntime.jsxs(react.Box, { position: "absolute", inset: 0, pointerEvents: "none", zIndex: zIndex, children: [minorTicks.map((percent, index) => (jsxRuntime.jsx(react.Box, { position: "absolute", inset: 0, transform: `translateX(${percent}%)`, transition: transitionValue, children: jsxRuntime.jsx(react.Box, { position: "absolute", insetInlineStart: 0, top: 0, bottom: 0, width: "1px", bg: minorLineColor, _dark: { bg: 'gray.700' } }) }, `minor-grid-${index}`))), majorTicks.map((tick) => (jsxRuntime.jsx(react.Box, { position: "absolute", inset: 0, transform: `translateX(${tick.percent}%)`, transition: transitionValue, children: jsxRuntime.jsx(react.Box, { position: "absolute", insetInlineStart: 0, top: 0, bottom: 0, width: "1px", bg: majorLineColor, _dark: { bg: 'gray.600' } }) }, `major-grid-${tick.index}`)))] }));
}
function VirtualizedTrackList({ tracks, resolvedHeight, gap, virtualHeight, overscan, renderTrackPrefix, renderTrackSuffix, renderTrack, renderBlockNode, }) {
    const parentRef = React.useRef(null);
    const rowHeightPx = parseInt(resolvedHeight, 10) || 28;
    const gapPx = gap * 4; // Chakra spacing token to px (1 unit = 4px)
    const virtualizer = reactVirtual.useVirtualizer({
        count: tracks.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => rowHeightPx + gapPx,
        overscan,
    });
    return (jsxRuntime.jsx(react.Box, { ref: parentRef, overflowY: "auto", height: `${virtualHeight}px`, children: jsxRuntime.jsx(react.Box, { height: `${virtualizer.getTotalSize()}px`, position: "relative", children: virtualizer.getVirtualItems().map((virtualRow) => {
                const track = tracks[virtualRow.index];
                const trackBlocks = track.blocks.map((item) => item.block);
                const prefix = renderTrackPrefix?.({
                    trackIndex: virtualRow.index,
                    trackBlocks,
                    trackKey: track.trackKeyRaw,
                });
                const suffix = renderTrackSuffix?.({
                    trackIndex: virtualRow.index,
                    trackBlocks,
                    trackKey: track.trackKeyRaw,
                });
                const defaultContent = (jsxRuntime.jsx(TimeViewportTrackRow, { trackKey: track.trackKey, blocks: track.blocks, resolvedHeight: resolvedHeight, prefix: prefix, suffix: suffix, renderBlockNode: renderBlockNode }));
                const trackContent = renderTrack
                    ? renderTrack({
                        trackIndex: virtualRow.index,
                        trackKey: track.trackKeyRaw,
                        trackBlocks,
                        defaultContent,
                    })
                    : defaultContent;
                return (jsxRuntime.jsx(react.Box, { position: "absolute", top: 0, left: 0, width: "100%", transform: `translateY(${virtualRow.start}px)`, children: trackContent }, track.trackKey));
            }) }) }));
}
function TimeViewportBlocks({ blocks, viewportStart, viewportEnd, height = '28px', minWidthPx = 2, borderRadius = 'sm', defaultColorPalette = 'blue', showLabel = true, hideWhenOutOfView = true, hideEmptyTracks = true, gap = 2, allowOverlap = false, overlapOpacity = 0.9, renderTrackPrefix, renderTrackSuffix, renderBlock, renderTrack, onBlockClick, virtualize = false, virtualHeight = 400, overscan = 5, }) {
    const { getGeometry, toTimeMs } = useTimeViewportBlockGeometry(viewportStart, viewportEnd);
    const resolvedHeight = typeof height === 'number' ? `${height}px` : height;
    const expandedBlocks = flattenTrackBlocks(blocks);
    const parsedBlocks = expandedBlocks
        .map((block, index) => {
        if (block.start === undefined || block.end === undefined) {
            return {
                block,
                index,
                geometry: { valid: false, leftPercent: 0, widthPercent: 0 },
                startMs: Number.NaN,
                endMs: Number.NaN,
            };
        }
        const geometry = getGeometry(block.start, block.end);
        const startMs = toTimeMs(block.start);
        const endMs = toTimeMs(block.end);
        return {
            block,
            index,
            geometry,
            startMs: startMs ?? Number.NaN,
            endMs: endMs ?? Number.NaN,
        };
    })
        .filter(({ geometry }) => geometry.valid)
        .filter(({ geometry }) => !hideWhenOutOfView || geometry.widthPercent > 0);
    const renderBlockNode = (blockItem, indexInLayer) => {
        const { block, geometry } = blockItem;
        const handleBlockClick = () => {
            block.onClick?.(block);
            onBlockClick?.(block);
        };
        const isBlockClickable = Boolean(block.onClick || onBlockClick);
        const content = renderBlock ? (renderBlock({ block, geometry, index: indexInLayer })) : (jsxRuntime.jsx(react.Box, { width: `max(${geometry.widthPercent}%, ${minWidthPx}px)`, height: "100%", borderRadius: borderRadius, bg: block.background ?? `${block.colorPalette ?? defaultColorPalette}.500`, _dark: {
                bg: block.background ??
                    `${block.colorPalette ?? defaultColorPalette}.900`,
            }, display: "flex", alignItems: "center", justifyContent: "center", px: 2, overflow: "hidden", opacity: allowOverlap ? overlapOpacity : 1, zIndex: indexInLayer + 1, pointerEvents: "auto", onClick: isBlockClickable ? handleBlockClick : undefined, cursor: isBlockClickable ? 'pointer' : 'default', children: showLabel && block.label ? (jsxRuntime.jsx(react.Text, { fontSize: "xs", lineClamp: 1, children: block.label })) : null }));
        return (jsxRuntime.jsx(react.Box, { height: "100%", position: "absolute", inset: 0, pointerEvents: "none", transform: `translateX(${geometry.leftPercent}%)`, transition: VIEWPORT_TRANSITION, children: content }, block.id));
    };
    // ---------- Resolve tracks ----------
    const explicitTrackKeys = Array.from(new Set(expandedBlocks
        .map((item) => item.track)
        .filter((track) => track !== undefined)));
    const resolvedTracks = React.useMemo(() => {
        if (explicitTrackKeys.length > 0) {
            return explicitTrackKeys
                .map((trackKey) => ({
                trackKey: `track-keyed-${String(trackKey)}`,
                trackKeyRaw: trackKey,
                blocks: parsedBlocks.filter((item) => item.block.track === trackKey),
            }))
                .filter((track) => !hideEmptyTracks || track.blocks.length > 0);
        }
        const autoPackedTracks = (() => {
            const sortedBlocks = [...parsedBlocks]
                .filter(({ startMs, endMs }) => Number.isFinite(startMs) && Number.isFinite(endMs))
                .sort((a, b) => {
                if (a.startMs === b.startMs)
                    return a.endMs - b.endMs;
                return a.startMs - b.startMs;
            });
            const trackLastEndTimes = [];
            const tracks = [];
            sortedBlocks.forEach((item) => {
                const trackIndex = trackLastEndTimes.findIndex((endMs) => item.startMs >= endMs);
                if (trackIndex === -1) {
                    trackLastEndTimes.push(item.endMs);
                    tracks.push([item]);
                }
                else {
                    trackLastEndTimes[trackIndex] = item.endMs;
                    tracks[trackIndex].push(item);
                }
            });
            return tracks;
        })();
        const packed = allowOverlap ? [parsedBlocks] : autoPackedTracks;
        return packed.map((track, trackIndex) => ({
            trackKey: `track-row-${trackIndex}`,
            trackKeyRaw: undefined,
            blocks: track,
        }));
    }, [allowOverlap, explicitTrackKeys, hideEmptyTracks, parsedBlocks]);
    // ---------- Render ----------
    if (virtualize) {
        return (jsxRuntime.jsx(VirtualizedTrackList, { tracks: resolvedTracks, resolvedHeight: resolvedHeight, gap: gap, virtualHeight: virtualHeight, overscan: overscan, renderTrackPrefix: renderTrackPrefix, renderTrackSuffix: renderTrackSuffix, renderTrack: renderTrack, renderBlockNode: renderBlockNode }));
    }
    return (jsxRuntime.jsx(react.VStack, { align: "stretch", gap: gap, children: resolvedTracks.map((track, trackIndex) => {
            const trackBlocks = track.blocks.map((item) => item.block);
            const prefix = renderTrackPrefix?.({
                trackIndex,
                trackBlocks,
                trackKey: track.trackKeyRaw,
            });
            const suffix = renderTrackSuffix?.({
                trackIndex,
                trackBlocks,
                trackKey: track.trackKeyRaw,
            });
            const defaultContent = (jsxRuntime.jsx(TimeViewportTrackRow, { trackKey: track.trackKey, blocks: track.blocks, resolvedHeight: resolvedHeight, prefix: prefix, suffix: suffix, renderBlockNode: renderBlockNode }));
            return renderTrack
                ? renderTrack({
                    trackIndex,
                    trackKey: track.trackKeyRaw,
                    trackBlocks,
                    defaultContent,
                })
                : defaultContent;
        }) }));
}
function TimeRangeZoom({ range, onRangeChange, minDurationMs = DEFAULT_MIN_DURATION_MS, maxDurationMs = DEFAULT_MAX_DURATION_MS, zoomFactor = DEFAULT_ZOOM_FACTOR, resetDurationMs, showResetButton = true, disabled = false, labels, }) {
    const { labels: mergedLabels, canZoomIn, canZoomOut, visibleRangeText, durationText, zoomIn, zoomOut, reset, } = useTimeRangeZoom({
        range,
        onRangeChange,
        minDurationMs,
        maxDurationMs,
        zoomFactor,
        resetDurationMs,
        disabled,
        labels,
    });
    return (jsxRuntime.jsxs(react.VStack, { align: "stretch", gap: 2, p: 3, children: [jsxRuntime.jsxs(react.HStack, { justify: "space-between", gap: 2, children: [jsxRuntime.jsxs(react.HStack, { gap: 2, children: [jsxRuntime.jsx(react.IconButton, { "aria-label": mergedLabels.zoomOut, onClick: zoomOut, disabled: !canZoomOut, size: "sm", variant: "outline", children: jsxRuntime.jsx(lu.LuZoomOut, {}) }), jsxRuntime.jsx(react.IconButton, { "aria-label": mergedLabels.zoomIn, onClick: zoomIn, disabled: !canZoomIn, size: "sm", variant: "outline", children: jsxRuntime.jsx(lu.LuZoomIn, {}) })] }), showResetButton ? (jsxRuntime.jsx(react.Button, { size: "sm", variant: "ghost", onClick: reset, disabled: disabled, colorPalette: "blue", children: mergedLabels.reset })) : null] }), jsxRuntime.jsxs(react.Text, { fontSize: "sm", color: "gray.700", _dark: { color: 'gray.200' }, children: [mergedLabels.visibleRange, ": ", visibleRangeText] }), jsxRuntime.jsxs(react.Text, { fontSize: "xs", color: "gray.600", _dark: { color: 'gray.400' }, children: [mergedLabels.duration, ": ", durationText] })] }));
}
function useTimeRangeZoom({ range, onRangeChange, minDurationMs = DEFAULT_MIN_DURATION_MS, maxDurationMs = DEFAULT_MAX_DURATION_MS, zoomFactor = DEFAULT_ZOOM_FACTOR, resetDurationMs, disabled = false, labels, }) {
    const mergedLabels = React.useMemo(() => ({
        ...defaultLabels,
        ...(labels ?? {}),
    }), [labels]);
    const now = dayjs();
    const start = toValidDayjs(range.start, now.subtract(1, 'hour'));
    const end = toValidDayjs(range.end, now);
    const safeMinDurationMs = Math.max(1000, minDurationMs);
    const safeMaxDurationMs = Math.max(safeMinDurationMs, maxDurationMs);
    const safeZoomFactor = zoomFactor > 1 ? zoomFactor : DEFAULT_ZOOM_FACTOR;
    const durationMs = React.useMemo(() => {
        const diff = end.diff(start, 'millisecond');
        return clampNumber(diff > 0 ? diff : safeMinDurationMs, safeMinDurationMs, safeMaxDurationMs);
    }, [end, start, safeMaxDurationMs, safeMinDurationMs]);
    const initialDurationRef = React.useRef(clampNumber(resetDurationMs ?? durationMs, safeMinDurationMs, safeMaxDurationMs));
    const hasValidDisplayRange = end.isAfter(start);
    const applyDurationAroundCenter = React.useCallback((nextDurationMs) => {
        const centerMs = start.valueOf() + durationMs / 2;
        const half = nextDurationMs / 2;
        const nextStart = dayjs(centerMs - half).toDate();
        const nextEnd = dayjs(centerMs + half).toDate();
        onRangeChange({ start: nextStart, end: nextEnd });
    }, [durationMs, onRangeChange, start]);
    const zoomIn = React.useCallback(() => {
        const nextDuration = clampNumber(durationMs / safeZoomFactor, safeMinDurationMs, safeMaxDurationMs);
        applyDurationAroundCenter(nextDuration);
    }, [
        applyDurationAroundCenter,
        durationMs,
        safeMaxDurationMs,
        safeMinDurationMs,
        safeZoomFactor,
    ]);
    const zoomOut = React.useCallback(() => {
        const nextDuration = clampNumber(durationMs * safeZoomFactor, safeMinDurationMs, safeMaxDurationMs);
        applyDurationAroundCenter(nextDuration);
    }, [
        applyDurationAroundCenter,
        durationMs,
        safeMaxDurationMs,
        safeMinDurationMs,
        safeZoomFactor,
    ]);
    const reset = React.useCallback(() => {
        applyDurationAroundCenter(initialDurationRef.current);
    }, [applyDurationAroundCenter]);
    const canZoomIn = !disabled && durationMs > safeMinDurationMs;
    const canZoomOut = !disabled && durationMs < safeMaxDurationMs;
    const visibleRangeText = hasValidDisplayRange
        ? `${start.format(mergedLabels.dateTimeFormat)} - ${end.format(mergedLabels.dateTimeFormat)}`
        : mergedLabels.invalidRange;
    const durationText = formatDuration(durationMs, mergedLabels);
    return {
        labels: mergedLabels,
        start,
        end,
        durationMs,
        canZoomIn,
        canZoomOut,
        hasValidDisplayRange,
        visibleRangeText,
        durationText,
        zoomIn,
        zoomOut,
        reset,
    };
}

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
        return jsxRuntime.jsx(jsxRuntime.Fragment, { children: "null" });
    }
    return (jsxRuntime.jsx(react.Grid, { rowGap: 1, padding: 1, overflow: 'auto', ...boxProps, children: Object.entries(object).map(([field, value], index) => {
            const uniqueKey = `${prefix}${field}-${index}`;
            return (jsxRuntime.jsxs(react.Grid, { columnGap: 2, gridTemplateColumns: 'auto 1fr', children: [jsxRuntime.jsx(react.Text, { color: 'colorPalette.400', children: getColumn({ field }) }), typeof value === 'object' && value !== null ? (jsxRuntime.jsx(RecordDisplay, { object: value, prefix: `${prefix}${field}.` })) : (jsxRuntime.jsx(react.Text, { children: JSON.stringify(value) }))] }, uniqueKey));
        }) }));
};

const TableDataDisplay = ({ colorPalette, emptyComponent, }) => {
    const { columns, data } = useDataTableContext();
    const columnsMap = Object.fromEntries(columns.map((def) => {
        const { id } = def;
        const accessorKey = def.accessorKey;
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
        return jsxRuntime.jsx(jsxRuntime.Fragment, { children: emptyComponent });
    }
    return (jsxRuntime.jsxs(react.Grid, { templateColumns: `${columnWidths}`, overflow: 'auto', borderWidth: '1px', color: { base: 'colorPalette.900', _dark: 'colorPalette.100' }, borderColor: { base: 'colorPalette.200', _dark: 'colorPalette.800' }, colorPalette, children: [jsxRuntime.jsx(react.Grid, { templateColumns: `${columnWidths}`, column: `1/span ${columns.length}`, bg: { base: 'colorPalette.200', _dark: 'colorPalette.800' }, colorPalette, children: columnHeaders.map((header) => {
                    const columnDef = columnsMap[header];
                    return (jsxRuntime.jsx(react.Box, { flex: '1 0 0%', paddingX: '2', py: '1', overflow: 'auto', textOverflow: 'ellipsis', children: columnDef?.meta?.displayName ?? header }, `chakra-table-header-${header}`));
                }) }), data.map((record, recordIndex) => {
                return (jsxRuntime.jsx(react.Box, { display: "contents", children: columnHeaders.map((header) => {
                        const { cell } = columnsMap[header];
                        const value = record[header];
                        if (!!record === false) {
                            return (jsxRuntime.jsx(react.Box, { ...cellProps }, `chakra-table-cell-${recordIndex}-${header}`));
                        }
                        if (cell) {
                            return (jsxRuntime.jsx(react.Box, { ...cellProps, children: cell({ row: { original: record } }) }, `chakra-table-cell-${recordIndex}-${header}`));
                        }
                        if (typeof value === 'object') {
                            return (jsxRuntime.jsx(react.Box, { ...cellProps, children: jsxRuntime.jsx(RecordDisplay, { object: value }) }, `chakra-table-cell-${recordIndex}-${header}`));
                        }
                        return (jsxRuntime.jsx(react.Box, { ...cellProps, children: value }, `chakra-table-cell-${recordIndex}-${header}`));
                    }) }, `chakra-table-record-${recordIndex}`));
            })] }));
};

const MobileTableControls = ({ fitTableWidth = false, fitTableHeight = false, children = jsxRuntime.jsx(jsxRuntime.Fragment, {}), showGlobalFilter = false, showFilter = false, showFilterTags = false, showReload = false, showPagination = true, showPageSizeControl = true, showPageCountText = true, showView = true, filterTagsOptions = [], extraItems = jsxRuntime.jsx(jsxRuntime.Fragment, {}), loading = false, hasError = false, gridProps = {}, }) => {
    const { tableLabel, table } = useDataTableContext();
    const { hasErrorText } = tableLabel;
    return (jsxRuntime.jsxs(react.Grid, { templateRows: 'auto 1fr auto', width: fitTableWidth ? 'fit-content' : '100%', height: fitTableHeight ? 'fit-content' : '100%', gap: 2, padding: 2, ...gridProps, children: [jsxRuntime.jsxs(react.Stack, { gap: 2, children: [jsxRuntime.jsxs(react.Flex, { justifyContent: 'space-between', alignItems: 'center', gap: 2, children: [jsxRuntime.jsxs(react.Flex, { gap: 1, alignItems: 'center', children: [showView && jsxRuntime.jsx(ViewDialog, { icon: jsxRuntime.jsx(md.MdOutlineViewColumn, {}) }), loading && jsxRuntime.jsx(react.Spinner, { size: 'sm' }), hasError && (jsxRuntime.jsx(Tooltip, { content: hasErrorText, children: jsxRuntime.jsx(react.Icon, { as: bs.BsExclamationCircleFill, color: 'red.400' }) }))] }), jsxRuntime.jsxs(react.Flex, { gap: 1, alignItems: 'center', children: [showGlobalFilter && jsxRuntime.jsx(GlobalFilter, {}), showFilter && jsxRuntime.jsx(FilterDialog, {}), showReload && jsxRuntime.jsx(ReloadButton, {}), extraItems] })] }), filterTagsOptions.length > 0 && (jsxRuntime.jsx(react.Stack, { gap: 2, children: filterTagsOptions.map((option) => {
                            const { column, options } = option;
                            const tableColumn = table.getColumn(column);
                            return (jsxRuntime.jsxs(react.Flex, { flexFlow: 'column', gap: 1, width: '100%', children: [tableColumn?.columnDef.meta?.displayName && (jsxRuntime.jsx(react.Text, { fontSize: 'sm', fontWeight: 'medium', children: tableColumn?.columnDef.meta?.displayName })), jsxRuntime.jsx(TagFilter, { availableTags: options, selectedTags: tableColumn?.getFilterValue() ?? [], selectOne: true, onTagChange: (tags) => {
                                            if (tags.length === 0) {
                                                return tableColumn?.setFilterValue(undefined);
                                            }
                                            tableColumn?.setFilterValue(tags);
                                        } })] }, column));
                        }) })), showFilterTags && (jsxRuntime.jsx(react.Box, { width: '100%', children: jsxRuntime.jsx(TableFilterTags, {}) }))] }), jsxRuntime.jsx(react.Box, { overflow: 'auto', width: '100%', bg: { base: 'colorPalette.50', _dark: 'colorPalette.950' }, borderRadius: 'md', padding: 1, children: children }), (showPageSizeControl || showPageCountText || showPagination) && (jsxRuntime.jsxs(react.Stack, { gap: 2, width: '100%', children: [(showPageSizeControl || showPageCountText) && (jsxRuntime.jsxs(react.Flex, { justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap', children: [showPageSizeControl && jsxRuntime.jsx(PageSizeControl, {}), showPageCountText && jsxRuntime.jsx(RowCountText, {})] })), showPagination && (jsxRuntime.jsx(react.Flex, { justifyContent: 'center', width: '100%', children: jsxRuntime.jsx(Pagination, {}) }))] }))] }));
};

const TableBodySkeleton = ({ showSelector = false, canResize = true, }) => {
    'use no memo';
    const { table } = useDataTableContext();
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredRow, setHoveredRow] = React.useState(-1);
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
    return (jsxRuntime.jsx(react.Table.Body, { children: Array.from({ length: pageSize }).map((_, rowIndex) => {
            return (jsxRuntime.jsxs(react.Table.Row, { display: 'flex', zIndex: 1, onMouseEnter: () => handleRowHover(rowIndex), onMouseLeave: () => handleRowHover(-1), ...getTrProps({ hoveredRow, index: rowIndex }), children: [showSelector && jsxRuntime.jsx(TableRowSelectorSkeleton, {}), visibleColumns.map((column, colIndex) => {
                        return (jsxRuntime.jsx(react.Table.Cell, { padding: `${table.getDensityValue()}px`, 
                            // styling resize and pinning start
                            flex: `${canResize ? '0' : '1'} 0 ${column.getSize()}px`, 
                            // this is to avoid the cell from being too wide
                            minWidth: `0`, color: {
                                base: 'colorPalette.900',
                                _dark: 'colorPalette.100',
                            },
                            bg: { base: 'colorPalette.50', _dark: 'colorPalette.950' }, ...getTdProps(column), children: jsxRuntime.jsx(react.Skeleton, { height: "20px", width: "80%" }) }, `chakra-table-skeleton-cell-${rowIndex}-${colIndex}`));
                    })] }, `chakra-table-skeleton-row-${rowIndex}`));
        }) }));
};
const TableRowSelectorSkeleton = () => {
    const { table } = useDataTableContext();
    const SELECTION_BOX_WIDTH = 20;
    return (jsxRuntime.jsx(react.Table.Cell, { padding: `${table.getDensityValue()}px`, display: 'grid', color: {
            base: 'colorPalette.900',
            _dark: 'colorPalette.100',
        },
        bg: { base: 'colorPalette.50', _dark: 'colorPalette.950' }, justifyItems: 'center', alignItems: 'center', children: jsxRuntime.jsx(react.Skeleton, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` }) }));
};

const MobileTableDisplay = ({ showSelector = false, isLoading = false, }) => {
    const { table, rowSelection, setRowSelection } = useDataTableContext();
    if (isLoading) {
        return jsxRuntime.jsx(MobileTableSkeleton, { showSelector: showSelector });
    }
    return (jsxRuntime.jsx(react.Stack, { gap: 4, padding: 2, children: table.getRowModel().rows.map((row) => {
            return (jsxRuntime.jsx(react.Card.Root, { width: "100%", children: jsxRuntime.jsxs(react.Card.Body, { padding: 4, children: [showSelector && (jsxRuntime.jsx(react.Flex, { marginBottom: 3, children: jsxRuntime.jsx(Checkbox, { checked: isRowSelected(row.id, rowSelection),
                                disabled: !canRowSelect(row),
                                onCheckedChange: createRowToggleHandler(row, rowSelection, setRowSelection) }) })), jsxRuntime.jsx(react.Stack, { gap: 3, children: row.getVisibleCells().map((cell) => {
                                const displayName = cell.column.columnDef.meta?.displayName ?? cell.column.id;
                                return (jsxRuntime.jsxs(react.Box, { children: [jsxRuntime.jsx(react.Text, { fontSize: "sm", fontWeight: "bold", color: { base: 'gray.600', _dark: 'gray.400' }, marginBottom: 1, children: displayName }), jsxRuntime.jsx(react.Box, { color: { base: 'gray.900', _dark: 'gray.100' }, fontSize: "sm", children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) })] }, `mobile-table-cell-${cell.id}`));
                            }) })] }) }, `mobile-table-card-${row.id}`));
        }) }));
};
const MobileTableSkeleton = ({ showSelector = false, }) => {
    const { table } = useDataTableContext();
    const pageSize = table.getState().pagination.pageSize;
    const visibleColumns = table.getVisibleLeafColumns();
    return (jsxRuntime.jsx(react.Stack, { gap: 4, padding: 2, children: Array.from({ length: pageSize }).map((_, rowIndex) => {
            return (jsxRuntime.jsx(react.Card.Root, { width: "100%", children: jsxRuntime.jsxs(react.Card.Body, { padding: 4, children: [showSelector && (jsxRuntime.jsx(react.Flex, { marginBottom: 3, children: jsxRuntime.jsx(react.Box, { width: "20px", height: "20px", bg: { base: 'gray.200', _dark: 'gray.700' }, borderRadius: "md" }) })), jsxRuntime.jsx(react.Stack, { gap: 3, children: visibleColumns.map((column) => {
                                return (jsxRuntime.jsxs(react.Box, { children: [jsxRuntime.jsx(react.Box, { width: "40%", height: "16px", bg: { base: 'gray.200', _dark: 'gray.700' }, borderRadius: "sm", marginBottom: 2 }), jsxRuntime.jsx(react.Box, { width: "80%", height: "20px", bg: { base: 'gray.200', _dark: 'gray.700' }, borderRadius: "sm" })] }, `mobile-skeleton-cell-${column.id}`));
                            }) })] }) }, `mobile-skeleton-${rowIndex}`));
        }) }));
};

/**
 * Hook to detect if the current window width is mobile (< 768px)
 * @param breakpoint - The breakpoint in pixels to consider as mobile (default: 768)
 * @returns boolean indicating if the window is mobile
 */
const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = React.useState(() => {
        if (typeof window === 'undefined')
            return false;
        return window.innerWidth < breakpoint;
    });
    React.useEffect(() => {
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
        return (jsxRuntime.jsx(MobileTableControls, { ...controlProps, children: jsxRuntime.jsx(MobileTableDisplay, { showSelector: tableHeaderProps.showSelector ??
                    tableBodyProps.showSelector ??
                    false, isLoading: isLoading }) }));
    }
    const isGreedy = variant === 'greedy';
    const canResize = !isGreedy;
    const bodyComponent = isLoading ? (jsxRuntime.jsx(TableBodySkeleton, { showSelector: tableBodyProps.showSelector, canResize: canResize })) : (jsxRuntime.jsx(TableBody, { ...tableBodyProps, canResize: canResize }));
    return (jsxRuntime.jsx(TableControls, { ...controlProps, children: jsxRuntime.jsxs(Table, { canResize,
            showLoading: isLoading,
            showSelector: tableHeaderProps.showSelector ??
                tableBodyProps.showSelector ??
                false,
            ...tableProps, children: [showHeader && jsxRuntime.jsx(TableHeader, { canResize, ...tableHeaderProps }), bodyComponent, showFooter && jsxRuntime.jsx(TableFooter, { canResize, ...tableFooterProps })] }) }));
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
    return jsxRuntime.jsx(DefaultTable, { ...props, isLoading: isLoading });
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
        return (jsxRuntime.jsx(react.Flex, { gridColumn, gridRow, children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id));
    }
    const value = cell.getValue();
    if (typeof value === 'object') {
        return (jsxRuntime.jsxs(react.Box, { gridColumn, gridRow, children: [jsxRuntime.jsx(react.Box, { children: getLabel({ columnId: cell.column.id }) }), jsxRuntime.jsx(RecordDisplay, { boxProps: {
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: 'gray.400',
                        paddingX: 4,
                        paddingY: 2,
                    }, object: value })] }, cell.id));
    }
    return (jsxRuntime.jsxs(react.Box, { gridColumn, gridRow, children: [jsxRuntime.jsx(react.Box, { color: 'colorPalette.400', children: getLabel({ columnId: cell.column.id }) }), jsxRuntime.jsx(react.Box, { wordBreak: 'break-word', textOverflow: 'ellipsis', overflow: 'hidden', children: `${formatValue(cell.getValue())}` })] }, cell.id));
};
const DataDisplay = ({}) => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(react.Flex, { flexFlow: 'column', gap: '1', children: table.getRowModel().rows.map((row) => {
            const rowId = row.id;
            return (jsxRuntime.jsx(react.Card.Root, { children: jsxRuntime.jsx(react.Card.Body, { display: 'grid', gap: 4, padding: 4, gridTemplateColumns: 'repeat(12, 1fr)', children: table.getAllColumns().map((column) => {
                        const childCell = row.getAllCells().find((cell) => {
                            return cell.id === `${rowId}_${column.id}`;
                        });
                        if (column.columns.length > 0) {
                            return (jsxRuntime.jsxs(react.Card.Root, { margin: '1', gridColumn: 'span 12', children: [jsxRuntime.jsx(react.Card.Header, { color: 'gray.400', children: column.columnDef.meta?.displayName ?? column.id }), jsxRuntime.jsx(react.Card.Body, { display: 'grid', gap: '4', gridTemplateColumns: 'repeat(12, 1fr)', children: column.columns.map((subColumn) => {
                                            if (!subColumn.getIsVisible()) {
                                                return null;
                                            }
                                            const foundCell = row
                                                .getVisibleCells()
                                                .find((cell) => {
                                                return cell.id === `${rowId}_${subColumn.id}`;
                                            });
                                            if (!foundCell)
                                                return null;
                                            return (jsxRuntime.jsx(CellRenderer, { cell: foundCell }, `chakra-table-cell-${rowId}-${subColumn.id}`));
                                        }) })] }, `chakra-table-card-${rowId}-${column.id}`));
                        }
                        if (!childCell)
                            return null;
                        return (jsxRuntime.jsx(CellRenderer, { cell: childCell }, `chakra-table-cell-${rowId}-${column.id}`));
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
    const [truncatedText, setTruncatedText] = React.useState('');
    const measureRef = React.useRef(null);
    React.useEffect(() => {
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
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("span", { ref: measureRef, style: {
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
    const events = React.useMemo(() => {
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
    const eventsByDate = React.useMemo(() => {
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
    const getEventsForDate = React.useCallback((date) => {
        const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        return eventsByDate.get(dateKey) ?? [];
    }, [eventsByDate]);
    const calendarData = useCalendar({
        firstDayOfWeek,
        showOutsideDays,
        monthsToDisplay,
    });
    const getDateProps = React.useCallback((props) => {
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
    return (jsxRuntime.jsxs(react.VStack, { gap: 4, width: "100%", children: [jsxRuntime.jsxs(react.HStack, { gap: 2, justifyContent: "center", children: [jsxRuntime.jsx(react.Button, { variant: "ghost", ...calendarData.getBackProps({
                            calendars: calendarData.calendars,
                            offset: 12,
                        }), children: '<<' }), jsxRuntime.jsx(react.Button, { variant: "ghost", ...calendarData.getBackProps({ calendars: calendarData.calendars }), children: backButtonLabel }), jsxRuntime.jsx(react.Button, { variant: "ghost", ...calendarData.getForwardProps({
                            calendars: calendarData.calendars,
                        }), children: forwardButtonLabel }), jsxRuntime.jsx(react.Button, { variant: "ghost", ...calendarData.getForwardProps({
                            calendars: calendarData.calendars,
                            offset: 12,
                        }), children: '>>' })] }), jsxRuntime.jsx(react.Grid, { templateColumns: {
                    base: '1fr',
                    md: monthsToDisplay >= 2 ? 'repeat(2, 1fr)' : '1fr',
                    lg: monthsToDisplay >= 3
                        ? 'repeat(3, 1fr)'
                        : monthsToDisplay === 2
                            ? 'repeat(2, 1fr)'
                            : '1fr',
                    xl: `repeat(${Math.min(monthsToDisplay, 4)}, 1fr)`,
                }, gap: { base: 4, md: 6 }, width: "100%", justifyContent: "center", children: calendarData.calendars.map((calendar) => (jsxRuntime.jsxs(react.VStack, { gap: 2, alignItems: "stretch", children: [jsxRuntime.jsxs(react.Text, { textAlign: "center", fontSize: { base: 'md', md: 'lg' }, fontWeight: "semibold", children: [monthNamesShort[calendar.month], " ", calendar.year] }), jsxRuntime.jsx(react.Grid, { templateColumns: "repeat(7, 1fr)", gap: { base: 0.5, md: 1 }, children: [0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
                                const weekday = (weekdayNum + firstDayOfWeek) % 7;
                                return (jsxRuntime.jsx(react.Text, { textAlign: "center", fontSize: { base: 'xs', md: 'sm' }, fontWeight: "medium", color: { base: 'gray.600', _dark: 'gray.400' }, children: weekdayNamesShort[weekday] }, `${calendar.month}${calendar.year}${weekday}`));
                            }) }), jsxRuntime.jsx(react.Grid, { templateColumns: "repeat(7, 1fr)", gap: { base: 0.5, md: 1 }, children: calendar.weeks.map((week, weekIndex) => week.map((dateObj, index) => {
                                const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                                if (!dateObj) {
                                    return jsxRuntime.jsx(react.Box, {}, key);
                                }
                                const { date, today, isCurrentMonth } = dateObj;
                                const dateEvents = getEventsForDate(date);
                                const cellRef = React.useRef(null);
                                return (jsxRuntime.jsxs(react.VStack, { ref: cellRef, gap: { base: 0.25, md: 0.5 }, alignItems: "stretch", minHeight: { base: '60px', md: '80px', lg: '100px' }, borderWidth: "1px", borderColor: {
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
                                        : {}, children: [jsxRuntime.jsx(react.Text, { fontSize: { base: 'xs', md: 'sm' }, fontWeight: today ? 'bold' : 'normal', color: {
                                                base: today ? `${colorPalette}.700` : 'gray.700',
                                                _dark: today ? `${colorPalette}.300` : 'gray.300',
                                            }, textAlign: "right", paddingRight: { base: 0.5, md: 1 }, children: date.getDate() }), jsxRuntime.jsxs(react.VStack, { gap: { base: 0.25, md: 0.5 }, alignItems: "stretch", flex: 1, overflow: "hidden", children: [dateEvents
                                                    .slice(0, maxEventsPerDay)
                                                    .map((event, eventIndex) => {
                                                    const eventContent = renderEvent ? (renderEvent(event)) : (jsxRuntime.jsx(react.Box, { fontSize: { base: '2xs', md: 'xs' }, paddingX: { base: 0.5, md: 1 }, paddingY: { base: 0.25, md: 0.5 }, borderRadius: { base: 'xs', md: 'sm' }, bgColor: {
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
                                                            : {}, children: jsxRuntime.jsx(ResponsiveEventTitle, { title: event.title, placeholder: eventPlaceholder, minWidth: minEventWidth, minChars: minCharsBeforeEllipsis, cellRef: cellRef }) }, eventIndex));
                                                    return (jsxRuntime.jsx(react.Box, { onClick: (e) => e.stopPropagation(), children: eventContent }, eventIndex));
                                                }), dateEvents.length > maxEventsPerDay && (jsxRuntime.jsxs(react.Text, { fontSize: "xs", color: {
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
            onDensityChange: reactTable.makeStateUpdater('density', table),
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
                let newState = reactTable.functionalUpdate(updater, old);
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
    const itemRank = matchSorterUtils.rankItem(row.getValue(columnId), value);
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
    noFiltersMatchText: 'No filters match your search',
    filterByLabel: 'Filter by',
    filterLabelsPlaceholder: 'Filter labels',
}, }) {
    const table = reactTable.useReactTable({
        _features: [DensityFeature],
        data: data,
        rowCount: data.length,
        columns: columns,
        getCoreRowModel: reactTable.getCoreRowModel(),
        getFilteredRowModel: reactTable.getFilteredRowModel(),
        getSortedRowModel: reactTable.getSortedRowModel(),
        getPaginationRowModel: reactTable.getPaginationRowModel(),
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
    return (jsxRuntime.jsx(DataTableContext.Provider, { value: {
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
    noFiltersMatchText: 'No filters match your search',
    filterByLabel: 'Filter by',
    filterLabelsPlaceholder: 'Filter labels',
}, }) {
    const table = reactTable.useReactTable({
        _features: [DensityFeature],
        data: (query.data?.data ?? []),
        rowCount: query.data?.count ?? 0,
        columns: columns,
        getCoreRowModel: reactTable.getCoreRowModel(),
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
    return (jsxRuntime.jsx(DataTableContext.Provider, { value: {
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
        }, children: jsxRuntime.jsx(DataTableServerContext.Provider, { value: { url: url ?? '', query }, children: children }) }));
}

exports.CalendarDisplay = CalendarDisplay;
exports.CardHeader = CardHeader;
exports.DataDisplay = DataDisplay;
exports.DataTable = DataTable;
exports.DataTableServer = DataTableServer;
exports.DatePickerContext = DatePickerContext;
exports.DatePickerInput = DatePickerInput;
exports.DefaultCardTitle = DefaultCardTitle;
exports.DefaultForm = DefaultForm;
exports.DefaultTable = DefaultTable;
exports.DefaultTableServer = DefaultTableServer;
exports.DensityToggleButton = DensityToggleButton;
exports.EditSortingButton = EditSortingButton;
exports.EmptyState = EmptyState;
exports.ErrorAlert = ErrorAlert;
exports.FilterDialog = FilterDialog;
exports.FormBody = FormBody;
exports.FormRoot = FormRoot;
exports.GlobalFilter = GlobalFilter;
exports.MediaLibraryBrowser = MediaLibraryBrowser;
exports.PageSizeControl = PageSizeControl;
exports.Pagination = Pagination;
exports.RecordDisplay = RecordDisplay;
exports.ReloadButton = ReloadButton;
exports.ResetFilteringButton = ResetFilteringButton;
exports.ResetSelectionButton = ResetSelectionButton;
exports.ResetSortingButton = ResetSortingButton;
exports.RowCountText = RowCountText;
exports.SelectAllRowsToggle = SelectAllRowsToggle;
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCardContainer = TableCardContainer;
exports.TableCards = TableCards;
exports.TableComponent = TableComponent;
exports.TableControls = TableControls;
exports.TableDataDisplay = TableDataDisplay;
exports.TableFilter = TableFilter;
exports.TableFilterTags = TableFilterTags;
exports.TableFooter = TableFooter;
exports.TableHeader = TableHeader;
exports.TableLoadingComponent = TableLoadingComponent;
exports.TableSelector = TableSelector;
exports.TableSorter = TableSorter;
exports.TableViewer = TableViewer;
exports.TextCell = TextCell;
exports.TimeRangeZoom = TimeRangeZoom;
exports.TimeViewportBlock = TimeViewportBlock;
exports.TimeViewportBlocks = TimeViewportBlocks;
exports.TimeViewportGrid = TimeViewportGrid;
exports.TimeViewportHeader = TimeViewportHeader;
exports.TimeViewportMarkerLine = TimeViewportMarkerLine;
exports.TimeViewportRoot = TimeViewportRoot;
exports.ViewDialog = ViewDialog;
exports.defaultRenderDisplay = defaultRenderDisplay;
exports.getMultiDates = getMultiDates;
exports.getRangeDates = getRangeDates;
exports.useDataTable = useDataTable;
exports.useDataTableContext = useDataTableContext;
exports.useDataTableServer = useDataTableServer;
exports.useForm = useForm;
exports.useTimeRangeZoom = useTimeRangeZoom;
exports.useTimeViewport = useTimeViewport;
exports.useTimeViewportBlockGeometry = useTimeViewportBlockGeometry;
exports.useTimeViewportHeader = useTimeViewportHeader;
exports.useTimeViewportTicks = useTimeViewportTicks;
