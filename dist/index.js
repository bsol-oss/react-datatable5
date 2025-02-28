'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('@chakra-ui/react');
var ai = require('react-icons/ai');
var React = require('react');
var md = require('react-icons/md');
var lu = require('react-icons/lu');
var Dayzed = require('@bsol-oss/dayzed-react19');
var fa6 = require('react-icons/fa6');
var bi = require('react-icons/bi');
var cg = require('react-icons/cg');
var io = require('react-icons/io');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var bindEventListener = require('bind-event-listener');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var rafSchd = require('raf-schd');
var invariant = require('tiny-invariant');
var hi2 = require('react-icons/hi2');
var reactTable = require('@tanstack/react-table');
var matchSorterUtils = require('@tanstack/match-sorter-utils');
var bs = require('react-icons/bs');
var usehooks = require('@uidotdev/usehooks');
var reactQuery = require('@tanstack/react-query');
var io5 = require('react-icons/io5');
var gr = require('react-icons/gr');
var hi = require('react-icons/hi');
var axios = require('axios');
var reactHookForm = require('react-hook-form');
var dayjs = require('dayjs');

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
    globalFilter: "",
    setGlobalFilter: () => { },
    type: "client",
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
const DialogActionTrigger = react.Dialog.ActionTrigger;

const Radio = React__namespace.forwardRef(function Radio(props, ref) {
    const { children, inputProps, rootRef, ...rest } = props;
    return (jsxRuntime.jsxs(react.RadioGroup.Item, { ref: rootRef, ...rest, children: [jsxRuntime.jsx(react.RadioGroup.ItemHiddenInput, { ref: ref, ...inputProps }), jsxRuntime.jsx(react.RadioGroup.ItemIndicator, {}), children && (jsxRuntime.jsx(react.RadioGroup.ItemText, { children: children }))] }));
});
const RadioGroup = react.RadioGroup.Root;

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
const weekdayNamesShort$1 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function Calendar$1({ calendars, getBackProps, getForwardProps, getDateProps, selected = [], firstDayOfWeek = 0, }) {
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
        return (jsxRuntime.jsxs(react.Grid, { onMouseLeave: onMouseLeave, children: [jsxRuntime.jsxs(react.Grid, { templateColumns: "repeat(4, auto)", justifyContent: "center", children: [jsxRuntime.jsx(react.Button, { variant: "ghost", ...getBackProps({
                                calendars,
                                offset: 12,
                            }), children: "<<" }), jsxRuntime.jsx(react.Button, { variant: "ghost", ...getBackProps({ calendars }), children: "Back" }), jsxRuntime.jsx(react.Button, { variant: "ghost", ...getForwardProps({ calendars }), children: "Next" }), jsxRuntime.jsx(react.Button, { variant: "ghost", ...getForwardProps({
                                calendars,
                                offset: 12,
                            }), children: ">>" })] }), jsxRuntime.jsx(react.Grid, { templateColumns: "repeat(2, auto)", justifyContent: "center", gap: 4, children: calendars.map((calendar) => (jsxRuntime.jsxs(react.Grid, { gap: 4, children: [jsxRuntime.jsxs(react.Grid, { justifyContent: "center", children: [monthNamesFull[calendar.month], " ", calendar.year] }), jsxRuntime.jsx(react.Grid, { templateColumns: "repeat(7, auto)", justifyContent: "center", children: [0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
                                    const weekday = (weekdayNum + firstDayOfWeek) % 7;
                                    return (jsxRuntime.jsx(react.Box, { minWidth: "48px", textAlign: "center", children: weekdayNamesShort$1[weekday] }, `${calendar.month}${calendar.year}${weekday}`));
                                }) }), jsxRuntime.jsx(react.Grid, { templateColumns: "repeat(7, auto)", justifyContent: "center", children: calendar.weeks.map((week, windex) => week.map((dateObj, index) => {
                                    const key = `${calendar.month}${calendar.year}${windex}${index}`;
                                    if (!dateObj) {
                                        return jsxRuntime.jsx(react.Box, {}, key);
                                    }
                                    const { date, selected, selectable, today } = dateObj;
                                    const getStyle = ({ selected, unavailable, today, isInRange, }) => {
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
                                        }), children: selectable ? date.getDate() : "X" }, key));
                                })) })] }, `${calendar.month}${calendar.year}`))) })] }));
    }
    return null;
}
class RangeDatePicker extends React.Component {
    render() {
        return (jsxRuntime.jsx(Dayzed, { onDateSelected: this.props.onDateSelected, selected: this.props.selected, firstDayOfWeek: this.props.firstDayOfWeek, showOutsideDays: this.props.showOutsideDays, date: this.props.date, minDate: this.props.minDate, maxDate: this.props.maxDate, monthsToDisplay: this.props.monthsToDisplay, render: (dayzedData) => (jsxRuntime.jsx(Calendar$1, { ...dayzedData,
                firstDayOfWeek: this.props.firstDayOfWeek,
                selected: this.props.selected })) }));
    }
}

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

const Tag = React__namespace.forwardRef(function Tag(props, ref) {
    const { startElement, endElement, onClose, closable = !!onClose, children, ...rest } = props;
    return (jsxRuntime.jsxs(react.Tag.Root, { ref: ref, ...rest, children: [startElement && (jsxRuntime.jsx(react.Tag.StartElement, { children: startElement })), jsxRuntime.jsx(react.Tag.Label, { children: children }), endElement && (jsxRuntime.jsx(react.Tag.EndElement, { children: endElement })), closable && (jsxRuntime.jsx(react.Tag.EndElement, { children: jsxRuntime.jsx(react.Tag.CloseTrigger, { onClick: onClose }) }))] }));
});

const TagFilter = ({ availableTags, selectedTags, onTagChange, }) => {
    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            onTagChange(selectedTags.filter((t) => t !== tag));
        }
        else {
            onTagChange([...selectedTags, tag]);
        }
    };
    return (jsxRuntime.jsx(react.Flex, { flexFlow: "wrap", p: "0.5rem", gap: "0.5rem", children: availableTags.map((tag) => (jsxRuntime.jsx(Tag, { variant: selectedTags.includes(tag) ? "solid" : "outline", cursor: "pointer", closable: selectedTags.includes(tag) ? true : undefined, onClick: () => toggleTag(tag), children: tag }))) }));
};

const Filter = ({ column }) => {
    const { filterVariant } = column.columnDef.meta ?? {};
    const displayName = column.columnDef.meta?.displayName ?? column.id;
    const filterOptions = column.columnDef.meta?.filterOptions ?? [];
    if (column.columns.length > 0) {
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: 1, children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(react.Grid, { gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))", gap: 1, children: column.columns.map((column) => {
                        return jsxRuntime.jsx(Filter, { column: column }, column.id);
                    }) }, column.id)] }));
    }
    if (!column.getCanFilter()) {
        return jsxRuntime.jsx(jsxRuntime.Fragment, {});
    }
    if (filterVariant === "select") {
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(RadioGroup, { value: column.getFilterValue() ? String(column.getFilterValue()) : "", onValueChange: (details) => {
                        column.setFilterValue(details.value);
                    }, children: jsxRuntime.jsx(react.Flex, { flexFlow: "wrap", gap: "0.5rem", children: filterOptions.map((item) => (jsxRuntime.jsx(Radio, { value: item, children: item }, item))) }) })] }, column.id));
    }
    if (filterVariant === "tag") {
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(TagFilter, { availableTags: filterOptions, selectedTags: (column.getFilterValue() ?? []), onTagChange: (tags) => {
                        if (tags.length === 0) {
                            return column.setFilterValue(undefined);
                        }
                        column.setFilterValue(tags);
                    } })] }, column.id));
    }
    if (filterVariant === "boolean") {
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(TagFilter, { availableTags: ["true", "false"], selectedTags: (column.getFilterValue() ?? []), onTagChange: (tags) => {
                        if (tags.length === 0) {
                            return column.setFilterValue(undefined);
                        }
                        column.setFilterValue(tags);
                    } })] }, column.id));
    }
    if (filterVariant === "range") {
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
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(RangeFilter, { range: filterValue, setRange: function (value) {
                        // throw new Error("Function not implemented.");
                        column.setFilterValue(value);
                    }, defaultValue: defaultValue, min: min, max: max, step: step })] }, column.id));
    }
    if (filterVariant === "dateRange") {
        const filterValue = column.getFilterValue() ?? [];
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(RangeDatePicker, { selected: filterValue, onDateSelected: ({ selected, selectable, date }) => {
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
    if (filterVariant === "custom") {
        const renderFilter = column.columnDef.meta?.renderFilter;
        if (renderFilter === undefined) {
            throw new Error("renderFilter is undefined");
        }
        return jsxRuntime.jsx(jsxRuntime.Fragment, { children: renderFilter(column) });
    }
    return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(react.Input, { value: column.getFilterValue() ? String(column.getFilterValue()) : "", onChange: (e) => {
                    column.setFilterValue(e.target.value);
                } })] }, column.id));
};
const TableFilter = () => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: table.getAllColumns().map((column) => {
            return jsxRuntime.jsx(Filter, { column: column }, column.id);
        }) }));
};

const ResetFilteringButton = ({ text = "Reset Filtering", }) => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(react.Button, { onClick: () => {
            table.resetColumnFilters();
        }, children: text }));
};

const EditFilterButton = ({ text, title = "Edit Filter", closeText = "Close", resetText = "Reset", icon = jsxRuntime.jsx(md.MdFilterAlt, {}), }) => {
    const filterModal = react.useDisclosure();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(DialogRoot, { size: ["full", "full", "md", "md"], open: filterModal.open, children: jsxRuntime.jsxs(DialogRoot, { children: [jsxRuntime.jsx(DialogTrigger, { asChild: true, children: jsxRuntime.jsxs(react.Button, { as: react.Box, variant: "ghost", onClick: filterModal.onOpen, children: [icon, " ", text] }) }), jsxRuntime.jsxs(DialogContent, { children: [jsxRuntime.jsx(DialogHeader, { children: jsxRuntime.jsx(DialogTitle, { children: title }) }), jsxRuntime.jsx(DialogBody, { children: jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "1rem", children: [jsxRuntime.jsx(TableFilter, {}), jsxRuntime.jsx(ResetFilteringButton, { text: resetText })] }) }), jsxRuntime.jsxs(DialogFooter, { children: [jsxRuntime.jsx(DialogActionTrigger, { asChild: true, children: jsxRuntime.jsx(react.Button, { onClick: filterModal.onClose, children: closeText }) }), jsxRuntime.jsx(react.Button, { children: "Save" })] }), jsxRuntime.jsx(DialogCloseTrigger, {})] })] }) }) }));
};

const ColumnOrderChanger = ({ columns }) => {
    const [order, setOrder] = React.useState([]);
    const [originalOrder, setOriginalOrder] = React.useState([]);
    const { table } = useDataTableContext();
    const handleChangeOrder = (startIndex, endIndex) => {
        const newOrder = Array.from(order);
        const [removed] = newOrder.splice(startIndex, 1);
        newOrder.splice(endIndex, 0, removed);
        setOrder(newOrder);
    };
    React.useEffect(() => {
        setOrder(columns);
    }, [columns]);
    React.useEffect(() => {
        if (originalOrder.length > 0) {
            return;
        }
        if (columns.length <= 0) {
            return;
        }
        setOriginalOrder(columns);
    }, [columns]);
    return (jsxRuntime.jsxs(react.Flex, { gap: 2, flexFlow: "column", children: [jsxRuntime.jsx(react.Flex, { gap: 2, flexFlow: "column", children: order.map((columnId, index) => (jsxRuntime.jsxs(react.Flex, { gap: 2, alignItems: "center", justifyContent: "space-between", children: [jsxRuntime.jsx(react.IconButton, { onClick: () => {
                                const prevIndex = index - 1;
                                if (prevIndex >= 0) {
                                    handleChangeOrder(index, prevIndex);
                                }
                            }, disabled: index === 0, "aria-label": "", children: jsxRuntime.jsx(md.MdArrowUpward, {}) }), table
                            .getAllFlatColumns()
                            .filter((column) => {
                            return column.id === columnId;
                        })
                            .map((column) => {
                            const displayName = column.columnDef.meta === undefined
                                ? column.id
                                : column.columnDef.meta.displayName;
                            return jsxRuntime.jsx("span", { children: displayName }, column.id);
                        }), jsxRuntime.jsx(react.IconButton, { onClick: () => {
                                const nextIndex = index + 1;
                                if (nextIndex < order.length) {
                                    handleChangeOrder(index, nextIndex);
                                }
                            }, disabled: index === order.length - 1, "aria-label": "", children: jsxRuntime.jsx(md.MdArrowDownward, {}) })] }, columnId))) }), jsxRuntime.jsxs(react.Flex, { gap: "0.25rem", children: [jsxRuntime.jsx(react.Button, { onClick: () => {
                            table.setColumnOrder(order);
                        }, children: "Apply" }), jsxRuntime.jsx(react.Button, { onClick: () => {
                            table.setColumnOrder(originalOrder);
                        }, children: "Reset" })] })] }));
};
const TableOrderer = () => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(ColumnOrderChanger, { columns: table.getState().columnOrder }) }));
};

const EditOrderButton = ({ text, icon = jsxRuntime.jsx(md.MdOutlineMoveDown, {}), title = "Change Order", }) => {
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(DialogRoot, { size: "cover", children: [jsxRuntime.jsx(react.DialogBackdrop, {}), jsxRuntime.jsx(DialogTrigger, { asChild: true, children: jsxRuntime.jsxs(react.Button, { as: react.Box, variant: "ghost", children: [icon, " ", text] }) }), jsxRuntime.jsxs(DialogContent, { children: [jsxRuntime.jsx(DialogCloseTrigger, {}), jsxRuntime.jsxs(DialogHeader, { children: [jsxRuntime.jsx(DialogTitle, {}), title] }), jsxRuntime.jsx(DialogBody, { children: jsxRuntime.jsx(react.Flex, { flexFlow: "column", gap: "0.25rem", children: jsxRuntime.jsx(TableOrderer, {}) }) }), jsxRuntime.jsx(DialogFooter, {})] })] }) }));
};

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

const ResetSortingButton = ({ text = "Reset Sorting", }) => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(react.Button, { onClick: () => {
            table.resetSorting();
        }, children: text }));
};

const EditSortingButton = ({ text, icon = jsxRuntime.jsx(md.MdOutlineSort, {}), title = "Edit Sorting", }) => {
    const sortingModal = react.useDisclosure();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(DialogRoot, { size: ["full", "full", "md", "md"], children: [jsxRuntime.jsx(react.DialogBackdrop, {}), jsxRuntime.jsx(DialogTrigger, { children: jsxRuntime.jsxs(react.Button, { as: "div", variant: "ghost", onClick: sortingModal.onOpen, children: [icon, " ", text] }) }), jsxRuntime.jsxs(DialogContent, { children: [jsxRuntime.jsx(DialogCloseTrigger, {}), jsxRuntime.jsxs(DialogHeader, { children: [jsxRuntime.jsx(DialogTitle, {}), title] }), jsxRuntime.jsx(DialogBody, { children: jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(TableSorter, {}), jsxRuntime.jsx(ResetSortingButton, {})] }) }), jsxRuntime.jsx(DialogFooter, {})] })] }) }));
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

const CheckboxCard = React__namespace.forwardRef(function CheckboxCard(props, ref) {
    const { inputProps, label, description, icon, addon, indicator = jsxRuntime.jsx(react.CheckboxCard.Indicator, {}), indicatorPlacement = "end", ...rest } = props;
    const hasContent = label || description || icon;
    const ContentWrapper = indicator ? react.CheckboxCard.Content : React__namespace.Fragment;
    return (jsxRuntime.jsxs(react.CheckboxCard.Root, { ...rest, children: [jsxRuntime.jsx(react.CheckboxCard.HiddenInput, { ref: ref, ...inputProps }), jsxRuntime.jsxs(react.CheckboxCard.Control, { children: [indicatorPlacement === "start" && indicator, hasContent && (jsxRuntime.jsxs(ContentWrapper, { children: [icon, label && (jsxRuntime.jsx(react.CheckboxCard.Label, { children: label })), description && (jsxRuntime.jsx(react.CheckboxCard.Description, { children: description })), indicatorPlacement === "inside" && indicator] })), indicatorPlacement === "end" && indicator] }), addon && jsxRuntime.jsx(react.CheckboxCard.Addon, { children: addon })] }));
});
react.CheckboxCard.Indicator;

function ColumnCard({ columnId }) {
    const ref = React.useRef(null);
    const [dragging, setDragging] = React.useState(false); // NEW
    const { table } = useDataTableContext();
    const displayName = columnId;
    const column = table.getColumn(columnId);
    invariant(column);
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
    return (jsxRuntime.jsxs(react.Grid, { ref: ref, templateColumns: "auto 1fr", gap: "0.5rem", alignItems: "center", style: dragging ? { opacity: 0.4 } : {}, children: [jsxRuntime.jsx(react.Flex, { alignItems: "center", padding: "0", children: jsxRuntime.jsx(fa6.FaGripLinesVertical, { color: "gray.400" }) }), jsxRuntime.jsx(react.Flex, { justifyContent: "space-between", alignItems: "center", children: jsxRuntime.jsx(CheckboxCard, { variant: "surface", label: displayName, checked: column.getIsVisible(), onChange: column.getToggleVisibilityHandler() }) })] }));
}
function CardContainer({ location, children }) {
    const ref = React.useRef(null);
    const [isDraggedOver, setIsDraggedOver] = React.useState(false);
    React.useEffect(() => {
        const el = ref.current;
        invariant(el);
        return dropTargetForElements({
            element: el,
            getData: () => ({ location }),
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: () => setIsDraggedOver(false),
        });
    }, [location]);
    // const isDark = (location + location) % 2 === 1;
    function getColor(isDraggedOver) {
        if (isDraggedOver) {
            return {
                backgroundColor: "blue.400",
                _dark: {
                    backgroundColor: "blue.400",
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
    return (jsxRuntime.jsx(react.Box, { ...getColor(isDraggedOver), ref: ref, children: children }));
}
const TableViewer = () => {
    const { table } = useDataTableContext();
    const [order, setOrder] = React.useState(table.getAllLeafColumns().map((column) => {
        return column.id;
    }));
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
                        return "<marker>";
                    }
                    return id;
                });
                const columnBefore = columnOrder.slice(0, destinationLocation + 1);
                const columnAfter = columnOrder.slice(destinationLocation + 1, columnOrder.length);
                const newOrder = [
                    ...columnBefore,
                    sourceColumn.id,
                    ...columnAfter,
                ].filter((id) => id != "<marker>");
                table.setColumnOrder(newOrder);
                setOrder(newOrder);
            },
        });
    }, [order, table]);
    return (jsxRuntime.jsx(react.Flex, { flexFlow: "column", gap: "0.25rem", children: table.getState().columnOrder.map((columnId, index) => {
            return (jsxRuntime.jsx(CardContainer, { location: index, children: jsxRuntime.jsx(ColumnCard, { columnId: columnId }) }));
        }) }));
};

const EditViewButton = ({ text, icon = jsxRuntime.jsx(io.IoMdEye, {}), title = "Edit View", }) => {
    const viewModel = react.useDisclosure();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(DialogRoot, { children: [jsxRuntime.jsx(react.DialogBackdrop, {}), jsxRuntime.jsx(DialogTrigger, { asChild: true, children: jsxRuntime.jsxs(react.Button, { as: react.Box, variant: "ghost", onClick: viewModel.onOpen, children: [icon, " ", text] }) }), jsxRuntime.jsxs(DialogContent, { children: [jsxRuntime.jsx(DialogCloseTrigger, {}), jsxRuntime.jsxs(DialogHeader, { children: [jsxRuntime.jsx(DialogTitle, {}), title] }), jsxRuntime.jsx(DialogBody, { children: jsxRuntime.jsx(TableViewer, {}) }), jsxRuntime.jsx(DialogFooter, {})] })] }) }));
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
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(MenuRoot, { children: [jsxRuntime.jsx(MenuTrigger, { asChild: true, children: jsxRuntime.jsxs(react.Button, { variant: "ghost", gap: "0.5rem", children: [table.getState().pagination.pageSize, " ", jsxRuntime.jsx(bi.BiDownArrow, {})] }) }), jsxRuntime.jsx(MenuContent, { children: pageSizes.map((pageSize) => (jsxRuntime.jsx(MenuItem, { value: `chakra-table-pageSize-${pageSize}`, onClick: () => {
                            table.setPageSize(Number(pageSize));
                        }, children: pageSize }, `chakra-table-pageSize-${pageSize}`))) })] }) }));
};

const ResetSelectionButton = ({ text = "Reset Selection", }) => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(react.Button, { onClick: () => {
            table.resetRowSelection();
        }, children: text }));
};

const RowCountText = () => {
    const { table, type } = useDataTableContext();
    const getCount = () => {
        if (type === "client") {
            return table.getFilteredRowModel().flatRows.length ?? 0;
        }
        return table.getRowCount();
    };
    return jsxRuntime.jsx(react.Text, { children: getCount() });
};

const { withContext } = react.createRecipeContext({ key: "button" });
// Replace "a" with your framework's link component
const LinkButton = withContext("a");

const [RootPropsProvider, useRootProps] = react.createContext({
    name: "RootPropsProvider",
});
const variantMap = {
    outline: { default: "ghost", ellipsis: "plain", current: "outline" },
    solid: { default: "outline", ellipsis: "outline", current: "solid" },
    subtle: { default: "ghost", ellipsis: "plain", current: "subtle" },
};
const PaginationRoot = React__namespace.forwardRef(function PaginationRoot(props, ref) {
    const { size = "sm", variant = "outline", getHref, ...rest } = props;
    return (jsxRuntime.jsx(RootPropsProvider, { value: { size, variantMap: variantMap[variant], getHref }, children: jsxRuntime.jsx(react.Pagination.Root, { ref: ref, type: getHref ? "link" : "button", ...rest }) }));
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
            return page.type === "ellipsis" ? (jsxRuntime.jsx(PaginationEllipsis, { index: index, ...props }, index)) : (jsxRuntime.jsx(PaginationItem, { type: "page", value: page.value, ...props }, index));
        }) }));
};
const PaginationPageText = React__namespace.forwardRef(function PaginationPageText(props, ref) {
    const { format = "compact", ...rest } = props;
    const { page, totalPages, pageRange, count } = react.usePaginationContext();
    const content = React__namespace.useMemo(() => {
        if (format === "short")
            return `${page} / ${totalPages}`;
        if (format === "compact")
            return `${page} of ${totalPages}`;
        return `${pageRange.start + 1} - ${Math.min(pageRange.end, count)} of ${count}`;
    }, [format, page, totalPages, pageRange, count]);
    return (jsxRuntime.jsx(react.Text, { fontWeight: "medium", ref: ref, ...rest, children: content }));
});

// TODO: not working in client side
const TablePagination = () => {
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

const CardHeader = ({ row, imageColumnId = undefined, titleColumnId = undefined, tagColumnId = undefined, tagIcon = undefined, showTag = true, imageProps = {}, }) => {
    if (!!row.original === false) {
        return jsxRuntime.jsx(jsxRuntime.Fragment, {});
    }
    const isShowFirstColumn = !!titleColumnId || showTag;
    return (jsxRuntime.jsxs(react.Grid, { templateRows: "auto auto", gap: "1rem", children: [!!imageColumnId && (jsxRuntime.jsx(react.Image, { width: "100%", src: row.original[imageColumnId], ...imageProps })), isShowFirstColumn && (jsxRuntime.jsxs(react.Flex, { gap: "0.5rem", flexFlow: "wrap", children: [!!titleColumnId && (jsxRuntime.jsx(react.Text, { fontWeight: "bold", fontSize: "large", children: row.original[titleColumnId] })), showTag && (jsxRuntime.jsx(Tag, { fontSize: "large", startElement: tagIcon && tagIcon({}), children: row.original[tagColumnId] }))] }))] }));
};

const snakeToLabel = (str) => {
    return str
        .split("_") // Split by underscore
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(" "); // Join with space
};

const RecordDisplay = ({ object, boxProps }) => {
    if (object === null) {
        return jsxRuntime.jsx(jsxRuntime.Fragment, { children: "null" });
    }
    return (jsxRuntime.jsx(react.Grid, { rowGap: 1, padding: 1, overflow: "auto", ...boxProps, children: Object.entries(object).map(([field, value]) => {
            return (jsxRuntime.jsxs(react.Grid, { columnGap: 2, gridTemplateColumns: "auto 1fr", children: [jsxRuntime.jsx(react.Text, { color: "gray.400", children: snakeToLabel(field) }), typeof value === "object" ? (jsxRuntime.jsx(RecordDisplay, { object: value })) : (jsxRuntime.jsx(react.Text, { children: JSON.stringify(value) }))] }, field));
        }) }));
};

const formatValue = (value) => {
    if (typeof value === "object") {
        return JSON.stringify(value);
    }
    if (typeof value === "string") {
        return value;
    }
    if (typeof value === "number" || typeof value === "boolean") {
        return `${value}`;
    }
    if (value === undefined) {
        return `undefined`;
    }
    throw new Error(`value is unknown, ${typeof value}`);
};
const DataDisplay = ({ variant = "" }) => {
    const { table } = useDataTableContext();
    if (variant == "horizontal") {
        return (jsxRuntime.jsx(react.Flex, { flexFlow: "column", gap: "1", children: table.getRowModel().rows.map((row) => {
                return (jsxRuntime.jsx(react.Card.Root, { children: jsxRuntime.jsx(react.Card.Body, { children: jsxRuntime.jsx(react.DataList.Root, { gap: 4, padding: 4, display: "grid", variant: "subtle", orientation: "horizontal", overflow: "auto", children: row.getVisibleCells().map((cell) => {
                                const showCustomDataDisplay = cell.column.columnDef.meta?.showCustomDisplay ?? false;
                                if (showCustomDataDisplay) {
                                    return (jsxRuntime.jsx(react.Flex, { children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id));
                                }
                                const value = cell.getValue();
                                if (typeof value === "object") {
                                    return (jsxRuntime.jsxs(react.DataList.Item, { children: [jsxRuntime.jsx(react.DataList.ItemLabel, { children: snakeToLabel(cell.column.id) }), jsxRuntime.jsx(RecordDisplay, { boxProps: {
                                                    borderWidth: 1,
                                                    borderRadius: 4,
                                                    borderColor: "gray.400",
                                                    paddingX: 4,
                                                    paddingY: 2,
                                                }, object: value })] }, cell.id));
                                }
                                return (jsxRuntime.jsxs(react.DataList.Item, { children: [jsxRuntime.jsx(react.DataList.ItemLabel, { children: snakeToLabel(cell.column.id) }), jsxRuntime.jsx(react.DataList.ItemValue, { wordBreak: "break-word", textOverflow: "ellipsis", overflow: "hidden", children: `${formatValue(cell.getValue())}` })] }, cell.id));
                            }) }) }) }, `chakra-table-card-${row.id}`));
            }) }));
    }
    if (variant == "stats") {
        return (jsxRuntime.jsx(react.Flex, { flexFlow: "column", gap: "1", children: table.getRowModel().rows.map((row) => {
                return (jsxRuntime.jsx(react.Card.Root, { children: jsxRuntime.jsx(react.Card.Body, { children: jsxRuntime.jsx(react.DataList.Root, { gap: 4, padding: 4, display: "flex", flexFlow: "row", variant: "subtle", overflow: "auto", children: row.getVisibleCells().map((cell) => {
                                const showCustomDataDisplay = cell.column.columnDef.meta?.showCustomDisplay ?? false;
                                if (showCustomDataDisplay) {
                                    return (jsxRuntime.jsx(react.Flex, { children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id));
                                }
                                const value = cell.getValue();
                                if (typeof value === "object") {
                                    return (jsxRuntime.jsxs(react.DataList.Item, { display: "inline-flex", flexFlow: "column", justifyContent: "center", alignItems: "center", flex: "1 0 0%", children: [jsxRuntime.jsx(react.DataList.ItemLabel, { children: snakeToLabel(cell.column.id) }), jsxRuntime.jsx(RecordDisplay, { boxProps: {
                                                    borderWidth: 1,
                                                    borderRadius: 4,
                                                    borderColor: "gray.400",
                                                    paddingX: 4,
                                                    paddingY: 2,
                                                }, object: value })] }));
                                }
                                return (jsxRuntime.jsxs(react.DataList.Item, { display: "flex", justifyContent: "center", alignItems: "center", flex: "1 0 0%", children: [jsxRuntime.jsx(react.DataList.ItemLabel, { children: snakeToLabel(cell.column.id) }), jsxRuntime.jsx(react.DataList.ItemValue, { wordBreak: "break-word", textOverflow: "ellipsis", overflow: "hidden", children: `${formatValue(cell.getValue())}` })] }, cell.id));
                            }) }) }) }, `chakra-table-card-${row.id}`));
            }) }));
    }
    return (jsxRuntime.jsx(react.Flex, { flexFlow: "column", gap: "1", children: table.getRowModel().rows.map((row) => {
            return (jsxRuntime.jsx(react.Card.Root, { children: jsxRuntime.jsx(react.Card.Body, { children: jsxRuntime.jsx(react.DataList.Root, { gap: 4, padding: 4, display: "grid", variant: "subtle", gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))", children: row.getVisibleCells().map((cell) => {
                            const showCustomDataDisplay = cell.column.columnDef.meta?.showCustomDisplay ?? false;
                            if (showCustomDataDisplay) {
                                return (jsxRuntime.jsx(react.Flex, { children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id));
                            }
                            const value = cell.getValue();
                            if (typeof value === "object") {
                                return (jsxRuntime.jsxs(react.DataList.Item, { children: [jsxRuntime.jsx(react.DataList.ItemLabel, { children: snakeToLabel(cell.column.id) }), jsxRuntime.jsx(RecordDisplay, { boxProps: {
                                                borderWidth: 1,
                                                borderRadius: 4,
                                                borderColor: "gray.400",
                                                paddingX: 4,
                                                paddingY: 2,
                                            }, object: value })] }, cell.id));
                            }
                            return (jsxRuntime.jsxs(react.DataList.Item, { children: [jsxRuntime.jsx(react.DataList.ItemLabel, { children: snakeToLabel(cell.column.id) }), jsxRuntime.jsx(react.DataList.ItemValue, { wordBreak: "break-word", textOverflow: "ellipsis", overflow: "hidden", children: `${formatValue(cell.getValue())}` })] }, cell.id));
                        }) }) }) }, `chakra-table-card-${row.id}`));
        }) }));
};

// Reference: https://tanstack.com/table/latest/docs/framework/react/examples/custom-features
// TypeScript setup for our new feature with all of the same type-safety as stock TanStack Table features
// end of TS setup!
// Here is all of the actual javascript code for our new feature
const DensityFeature = {
    // define the new feature's initial state
    getInitialState: (state) => {
        return {
            density: "sm",
            ...state,
        };
    },
    // define the new feature's default options
    getDefaultOptions: (table) => {
        return {
            enableDensity: true,
            onDensityChange: reactTable.makeStateUpdater("density", table),
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
                if (old === "sm") {
                    return "md";
                }
                if (old === "md") {
                    return "lg";
                }
                return "sm";
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
            if (density === "sm") {
                return 8;
            }
            if (density === "md") {
                return 16;
            }
            return 32;
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
function DataTable({ columns, data, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, children, }) {
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
        columnResizeMode: "onChange",
        // global filter start
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        globalFilterFn: "fuzzy",
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
            globalFilter: globalFilter,
            setGlobalFilter: setGlobalFilter,
            type: "client",
        }, children: children }));
}

const DataTableServerContext = React.createContext({
    url: "",
});

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
function DataTableServer({ columns, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, query, children, url, }) {
    const table = reactTable.useReactTable({
        _features: [DensityFeature],
        data: query.data?.data ?? [],
        rowCount: query.data?.count ?? 0,
        columns: columns,
        getCoreRowModel: reactTable.getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
        columnResizeMode: "onChange",
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
            table: { ...table },
            globalFilter,
            setGlobalFilter,
            type: "server",
        }, children: jsxRuntime.jsx(DataTableServerContext.Provider, { value: { url, query }, children: children }) }));
}

const Checkbox = React__namespace.forwardRef(function Checkbox(props, ref) {
    const { icon, children, inputProps, rootRef, ...rest } = props;
    return (jsxRuntime.jsxs(react.Checkbox.Root, { ref: rootRef, ...rest, children: [jsxRuntime.jsx(react.Checkbox.HiddenInput, { ref: ref, ...inputProps }), jsxRuntime.jsx(react.Checkbox.Control, { children: icon || jsxRuntime.jsx(react.Checkbox.Indicator, {}) }), children != null && (jsxRuntime.jsx(react.Checkbox.Label, { children: children }))] }));
});

const TableBody = ({ pinnedBgColor = { light: "gray.50", dark: "gray.700" }, showSelector = false, alwaysShowSelector = true, canResize = true, }) => {
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
                    ? `${cell.column.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
                    : `${cell.column.getStart("left")}px`,
                background: pinnedBgColor.light,
                position: "sticky",
                zIndex: -1,
                _dark: {
                    backgroundColor: pinnedBgColor.dark,
                },
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
                opacity: "1",
            };
        }
        return {
            opacity: "0.8",
        };
    };
    return (jsxRuntime.jsx(react.Table.Body, { children: table.getRowModel().rows.map((row, index) => {
            return (jsxRuntime.jsxs(react.Table.Row, { display: "flex", zIndex: 1, onMouseEnter: () => handleRowHover(index), onMouseLeave: () => handleRowHover(-1), ...getTrProps({ hoveredRow, index }), children: [showSelector && (jsxRuntime.jsx(TableRowSelector, { index: index, row: row, hoveredRow: hoveredRow, alwaysShowSelector: alwaysShowSelector })), row.getVisibleCells().map((cell, index) => {
                        return (jsxRuntime.jsx(react.Table.Cell, { padding: `${table.getDensityValue()}px`, 
                            // styling resize and pinning start
                            flex: `${canResize ? "0" : "1"} 0 ${cell.column.getSize()}px`, backgroundColor: "white", ...getTdProps(cell), _dark: {
                                backgroundColor: "gray.950",
                            }, children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) }, `chakra-table-rowcell-${cell.id}-${index}`));
                    })] }, `chakra-table-row-${row.id}`));
        }) }));
};
const TableRowSelector = ({ index, row, hoveredRow, pinnedBgColor = { light: "gray.50", dark: "gray.700" }, alwaysShowSelector = true, }) => {
    const { table } = useDataTableContext();
    const SELECTION_BOX_WIDTH = 20;
    const isCheckBoxVisible = (current_index, current_row) => {
        if (alwaysShowSelector) {
            return true;
        }
        if (current_row.getIsSelected()) {
            return true;
        }
        if (hoveredRow == current_index) {
            return true;
        }
        return false;
    };
    return (jsxRuntime.jsxs(react.Table.Cell, { padding: `${table.getDensityValue()}px`, ...(table.getIsSomeColumnsPinned("left")
            ? {
                left: `0px`,
                backgroundColor: pinnedBgColor.light,
                position: "sticky",
                zIndex: 1,
                _dark: { backgroundColor: pinnedBgColor.dark },
            }
            : {}), 
        // styling resize and pinning end
        display: "grid", children: [!isCheckBoxVisible(index, row) && (jsxRuntime.jsx(react.Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` })), isCheckBoxVisible(index, row) && (jsxRuntime.jsx(react.Box, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsxRuntime.jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    onChange: row.getToggleSelectedHandler() }) }))] }));
};

const Tooltip = React__namespace.forwardRef(function Tooltip(props, ref) {
    const { showArrow, children, disabled, portalled, content, contentProps, portalRef, ...rest } = props;
    if (disabled)
        return children;
    return (jsxRuntime.jsxs(react.Tooltip.Root, { ...rest, children: [jsxRuntime.jsx(react.Tooltip.Trigger, { asChild: true, children: children }), jsxRuntime.jsx(react.Portal, { disabled: !portalled, container: portalRef, children: jsxRuntime.jsx(react.Tooltip.Positioner, { children: jsxRuntime.jsxs(react.Tooltip.Content, { ref: ref, ...contentProps, children: [showArrow && (jsxRuntime.jsx(react.Tooltip.Arrow, { children: jsxRuntime.jsx(react.Tooltip.ArrowTip, {}) })), content] }) }) })] }));
});

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
    const { table } = useDataTableContext();
    const [searchTerm, setSearchTerm] = React.useState("");
    const debouncedSearchTerm = usehooks.useDebounce(searchTerm, 500);
    React.useEffect(() => {
        const searchHN = async () => {
            table.setGlobalFilter(debouncedSearchTerm);
        };
        searchHN();
    }, [debouncedSearchTerm]);
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(InputGroup, { flex: "1", startElement: jsxRuntime.jsx(md.MdSearch, {}), children: jsxRuntime.jsx(react.Input, { placeholder: "Outline", variant: "outline", onChange: (e) => {
                    setSearchTerm(e.target.value);
                } }) }) }));
};

const useDataTableServerContext = () => {
    const context = React.useContext(DataTableServerContext);
    const { query } = context;
    const isEmpty = (query.data?.count ?? 0) <= 0;
    return { ...context, isEmpty };
};

const ReloadButton = ({ text = "Reload", variant = "icon", }) => {
    const { url } = useDataTableServerContext();
    const queryClient = reactQuery.useQueryClient();
    if (variant === "icon") {
        return (jsxRuntime.jsx(Tooltip, { showArrow: true, content: "This is the tooltip content", children: jsxRuntime.jsx(Button, { variant: "ghost", onClick: () => {
                    queryClient.invalidateQueries({ queryKey: [url] });
                }, "aria-label": "refresh", children: jsxRuntime.jsx(io5.IoReload, {}) }) }));
    }
    return (jsxRuntime.jsxs(Button, { variant: "ghost", onClick: () => {
            queryClient.invalidateQueries({ queryKey: [url] });
        }, children: [jsxRuntime.jsx(io5.IoReload, {}), " ", text] }));
};

const FilterOptions = ({ column }) => {
    const { table } = useDataTableContext();
    const tableColumn = table.getColumn(column);
    const options = tableColumn?.columnDef.meta?.filterOptions ?? [];
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: options.map((option) => {
            const selected = table.getColumn(column)?.getFilterValue() === option;
            return (jsxRuntime.jsxs(react.Button, { size: "sm", onClick: () => {
                    if (selected) {
                        table.setColumnFilters((state) => {
                            return state.filter((filter) => {
                                return filter.id !== column;
                            });
                        });
                        return;
                    }
                    table.getColumn(column)?.setFilterValue(option);
                }, variant: selected ? "solid" : "outline", display: "flex", gap: "0.25rem", children: [option, selected && jsxRuntime.jsx(md.MdClose, {})] }, option));
        }) }));
};

const TableFilterTags = () => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(react.Flex, { gap: "0.5rem", flexFlow: "wrap", children: table.getState().columnFilters.map(({ id, value }) => {
            return (jsxRuntime.jsx(Tag, { gap: "0.5rem", closable: true, cursor: "pointer", onClick: () => {
                    table.setColumnFilters(table.getState().columnFilters.filter((filter) => {
                        return filter.value != value;
                    }));
                }, children: `${id}: ${value}` }, `${id}-${value}`));
        }) }));
};

const TableControls = ({ totalText = "Total:", fitTableWidth = false, fitTableHeight = false, isMobile = false, children = jsxRuntime.jsx(jsxRuntime.Fragment, {}), showGlobalFilter = false, showFilter = false, showFilterName = false, showFilterTags = false, showReload = false, showPagination = true, showPageSizeControl = true, showPageCountText = true, filterOptions = [], extraItems = jsxRuntime.jsx(jsxRuntime.Fragment, {}), loading = false, hasError = false, }) => {
    return (jsxRuntime.jsxs(react.Grid, { templateRows: "auto 1fr auto", width: fitTableWidth ? "fit-content" : "100%", height: fitTableHeight ? "fit-content" : "100%", gap: "0.5rem", children: [jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: 2, children: [jsxRuntime.jsxs(react.Flex, { justifyContent: "space-between", children: [jsxRuntime.jsx(react.Box, { children: jsxRuntime.jsx(EditViewButton, { text: isMobile ? undefined : "View", icon: jsxRuntime.jsx(md.MdOutlineViewColumn, {}) }) }), jsxRuntime.jsxs(react.Flex, { gap: "0.5rem", alignItems: "center", justifySelf: "end", children: [loading && jsxRuntime.jsx(react.Spinner, { size: "sm" }), hasError && (jsxRuntime.jsx(Tooltip, { content: "An error occurred while fetching data", children: jsxRuntime.jsx(react.Icon, { as: bs.BsExclamationCircleFill, color: "red.400" }) })), showGlobalFilter && jsxRuntime.jsx(GlobalFilter, {}), showFilter && (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(EditFilterButton, { text: isMobile ? undefined : "Advanced Filter" }) })), showReload && jsxRuntime.jsx(ReloadButton, {}), extraItems] })] }), filterOptions.length > 0 && (jsxRuntime.jsx(react.Flex, { flexFlow: "column", gap: "0.5rem", children: filterOptions.map((column) => {
                            return (jsxRuntime.jsxs(react.Flex, { alignItems: "center", flexFlow: "wrap", gap: "0.5rem", children: [showFilterName && jsxRuntime.jsxs(react.Text, { children: [column, ":"] }), jsxRuntime.jsx(FilterOptions, { column: column })] }, column));
                        }) })), showFilterTags && (jsxRuntime.jsx(react.Flex, { children: jsxRuntime.jsx(TableFilterTags, {}) }))] }), jsxRuntime.jsx(react.Grid, { overflow: "auto", backgroundColor: "gray.50", _dark: {
                    backgroundColor: "gray.900",
                }, children: children }), jsxRuntime.jsxs(react.Flex, { justifyContent: "space-between", children: [jsxRuntime.jsxs(react.Flex, { gap: "1rem", alignItems: "center", children: [showPageSizeControl && jsxRuntime.jsx(PageSizeControl, {}), showPageCountText && (jsxRuntime.jsxs(react.Flex, { children: [jsxRuntime.jsx(react.Text, { paddingRight: "0.5rem", children: totalText }), jsxRuntime.jsx(RowCountText, {})] }))] }), jsxRuntime.jsx(react.Box, { justifySelf: "end", children: showPagination && jsxRuntime.jsx(TablePagination, {}) })] })] }));
};

const TableFooter = ({ pinnedBgColor = { light: "gray.50", dark: "gray.700" }, showSelector = false, alwaysShowSelector = true, }) => {
    const table = useDataTableContext().table;
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredCheckBox, setHoveredCheckBox] = React.useState(false);
    const handleRowHover = (isHovered) => {
        setHoveredCheckBox(isHovered);
    };
    const isCheckBoxVisible = () => {
        if (alwaysShowSelector) {
            return true;
        }
        if (table.getIsAllRowsSelected()) {
            return true;
        }
        if (hoveredCheckBox) {
            return true;
        }
        return false;
    };
    const getThProps = (header) => {
        const thProps = header.column.getIsPinned()
            ? {
                left: showSelector
                    ? `${header.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
                    : `${header.getStart("left") + table.getDensityValue() * 2}px`,
                background: pinnedBgColor.light,
                position: "sticky",
                zIndex: 1,
                _dark: {
                    backgroundColor: pinnedBgColor.dark,
                },
            }
            : {};
        return thProps;
    };
    return (jsxRuntime.jsx(react.Table.Footer, { children: table.getFooterGroups().map((footerGroup) => (jsxRuntime.jsxs(react.Table.Row, { display: "flex", children: [showSelector && (jsxRuntime.jsxs(react.Table.Header
                // styling resize and pinning start
                , { 
                    // styling resize and pinning start
                    padding: `${table.getDensityValue()}px`, ...(table.getIsSomeColumnsPinned("left")
                        ? {
                            left: `0px`,
                            backgroundColor: pinnedBgColor.light,
                            position: "sticky",
                            zIndex: 1,
                            _dark: { backgroundColor: pinnedBgColor.dark },
                        }
                        : {}), 
                    // styling resize and pinning end
                    onMouseEnter: () => handleRowHover(true), onMouseLeave: () => handleRowHover(false), display: "grid", children: [isCheckBoxVisible() && (jsxRuntime.jsx(react.Box, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsxRuntime.jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: table.getIsAllRowsSelected(),
                                // indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler() }) })), !isCheckBoxVisible() && (jsxRuntime.jsx(react.Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` }))] })), footerGroup.headers.map((header) => (jsxRuntime.jsx(react.Table.Cell, { padding: "0", columnSpan: `${header.colSpan}`, 
                    // styling resize and pinning start
                    maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, display: "grid", ...getThProps(header), children: jsxRuntime.jsx(react.MenuRoot, { children: jsxRuntime.jsx(react.MenuTrigger, { asChild: true, children: jsxRuntime.jsx(react.Box, { padding: `${table.getDensityValue()}px`, display: "flex", alignItems: "center", justifyContent: "start", borderRadius: "0rem", _hover: { backgroundColor: "gray.100" }, children: jsxRuntime.jsxs(react.Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
                                            ? null
                                            : reactTable.flexRender(header.column.columnDef.footer, header.getContext()), jsxRuntime.jsx(react.Box, { children: header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [header.column.getIsSorted() === false && (
                                                    // <UpDownIcon />
                                                    jsxRuntime.jsx(jsxRuntime.Fragment, {})), header.column.getIsSorted() === "asc" && (jsxRuntime.jsx(bi.BiUpArrow, {})), header.column.getIsSorted() === "desc" && (jsxRuntime.jsx(bi.BiDownArrow, {}))] })) })] }) }) }) }) }, `chakra-table-footer-${header.column.id}-${footerGroup.id}`)))] }, `chakra-table-footergroup-${footerGroup.id}`))) }));
};

const TableHeader = ({ canResize = true, pinnedBgColor = { light: "gray.50", dark: "gray.700" }, showSelector = false, isSticky = true, alwaysShowSelector = true, tHeadProps = {}, }) => {
    const { table } = useDataTableContext();
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredCheckBox, setHoveredCheckBox] = React.useState(false);
    const handleRowHover = (isHovered) => {
        setHoveredCheckBox(isHovered);
    };
    const isCheckBoxVisible = () => {
        if (alwaysShowSelector) {
            return true;
        }
        if (table.getIsAllRowsSelected()) {
            return true;
        }
        if (hoveredCheckBox) {
            return true;
        }
        return false;
    };
    const getThProps = (header) => {
        const thProps = header.column.getIsPinned()
            ? {
                left: showSelector
                    ? `${header.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
                    : `${header.getStart("left")}px`,
                background: pinnedBgColor.light,
                position: "sticky",
                zIndex: 100 + 1,
                _dark: {
                    backgroundColor: pinnedBgColor.dark,
                },
            }
            : {};
        return thProps;
    };
    const stickyProps = {
        position: "sticky",
        top: 0,
    };
    return (jsxRuntime.jsx(react.Table.Header, { ...(isSticky ? stickyProps : {}), ...tHeadProps, children: table.getHeaderGroups().map((headerGroup) => (jsxRuntime.jsxs(react.Table.Row, { display: "flex", children: [showSelector && (jsxRuntime.jsxs(react.Table.ColumnHeader
                // styling resize and pinning start
                , { ...(table.getIsSomeColumnsPinned("left")
                        ? {
                            left: `0px`,
                            backgroundColor: pinnedBgColor.light,
                            position: "sticky",
                            zIndex: 1,
                            _dark: { backgroundColor: pinnedBgColor.dark },
                        }
                        : {}), 
                    // styling resize and pinning end
                    padding: `${table.getDensityValue()}px`, onMouseEnter: () => handleRowHover(true), onMouseLeave: () => handleRowHover(false), display: "grid", children: [isCheckBoxVisible() && (jsxRuntime.jsx(react.Box, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsxRuntime.jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: table.getIsAllRowsSelected(),
                                // indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler() }) })), !isCheckBoxVisible() && (jsxRuntime.jsx(react.Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` }))] })), headerGroup.headers.map((header) => {
                    const resizeProps = {
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        cursor: "col-resize",
                    };
                    return (jsxRuntime.jsxs(react.Table.ColumnHeader, { padding: 0, columnSpan: `${header.colSpan}`, 
                        // styling resize and pinning start
                        flex: `${canResize ? "0" : "1"} 0 ${header.column.getSize()}px`, display: "grid", gridTemplateColumns: "1fr auto", zIndex: 1500 + header.index, ...getThProps(header), children: [jsxRuntime.jsxs(MenuRoot, { children: [jsxRuntime.jsx(MenuTrigger, { asChild: true, children: jsxRuntime.jsx(react.Flex, { padding: `${table.getDensityValue()}px`, alignItems: "center", justifyContent: "start", borderRadius: "0rem", overflow: "auto", _hover: {
                                                backgroundColor: "gray.100",
                                                _dark: {
                                                    backgroundColor: "gray.700",
                                                },
                                            }, children: jsxRuntime.jsxs(react.Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
                                                        ? null
                                                        : reactTable.flexRender(header.column.columnDef.header, header.getContext()), jsxRuntime.jsx(react.Box, { children: header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [header.column.getIsSorted() === false && jsxRuntime.jsx(jsxRuntime.Fragment, {}), header.column.getIsSorted() === "asc" && (jsxRuntime.jsx(bi.BiUpArrow, {})), header.column.getIsSorted() === "desc" && (jsxRuntime.jsx(bi.BiDownArrow, {}))] })) }), jsxRuntime.jsx(react.Box, { children: header.column.getIsFiltered() && jsxRuntime.jsx(md.MdFilterListAlt, {}) })] }) }) }), jsxRuntime.jsxs(MenuContent, { children: [!header.column.getIsPinned() && (jsxRuntime.jsx(MenuItem, { asChild: true, value: "pin-column", children: jsxRuntime.jsxs(Button, { variant: "ghost", onClick: () => {
                                                        header.column.pin("left");
                                                    }, children: [jsxRuntime.jsx(md.MdPushPin, {}), "Pin Column"] }) })), header.column.getIsPinned() && (jsxRuntime.jsx(MenuItem, { asChild: true, value: "cancel-pin", children: jsxRuntime.jsxs(Button, { variant: "ghost", onClick: () => {
                                                        header.column.pin(false);
                                                    }, children: [jsxRuntime.jsx(md.MdCancel, {}), "Cancel Pin"] }) })), header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(MenuItem, { asChild: true, value: "sort-ascend", children: jsxRuntime.jsxs(Button, { variant: "ghost", onClick: () => {
                                                                table.setSorting((state) => {
                                                                    return [
                                                                        ...state.filter((column) => {
                                                                            return column.id !== header.id;
                                                                        }),
                                                                        { id: header.id, desc: false },
                                                                    ];
                                                                });
                                                            }, children: [jsxRuntime.jsx(gr.GrAscend, {}), "Sort Ascending"] }) }), jsxRuntime.jsx(MenuItem, { asChild: true, value: "sort-descend", children: jsxRuntime.jsxs(Button, { variant: "ghost", onClick: () => {
                                                                table.setSorting((state) => {
                                                                    return [
                                                                        ...state.filter((column) => {
                                                                            return column.id !== header.id;
                                                                        }),
                                                                        { id: header.id, desc: true },
                                                                    ];
                                                                });
                                                            }, children: [jsxRuntime.jsx(gr.GrDescend, {}), "Sort Descending"] }) }), header.column.getIsSorted() && (jsxRuntime.jsx(MenuItem, { asChild: true, value: "sort-descend", children: jsxRuntime.jsxs(Button, { variant: "ghost", onClick: () => {
                                                                header.column.clearSorting();
                                                            }, children: [jsxRuntime.jsx(md.MdClear, {}), "Clear Sorting"] }) }))] }))] })] }), canResize && (jsxRuntime.jsx(react.Box, { borderRight: "0.2rem solid", borderRightColor: header.column.getIsResizing() ? "gray.700" : "transparent", position: "relative", right: "0.1rem", width: "2px", height: "100%", userSelect: "none", style: { touchAction: "none" }, _hover: {
                                    borderRightColor: header.column.getIsResizing()
                                        ? "gray.700"
                                        : "gray.400",
                                }, ...resizeProps }))] }, `chakra-table-header-${header.id}`));
                })] }, `chakra-table-headergroup-${headerGroup.id}`))) }));
};

const EmptyState$1 = React__namespace.forwardRef(function EmptyState(props, ref) {
    const { title, description, icon, children, ...rest } = props;
    return (jsxRuntime.jsx(react.EmptyState.Root, { ref: ref, ...rest, children: jsxRuntime.jsxs(react.EmptyState.Content, { children: [icon && (jsxRuntime.jsx(react.EmptyState.Indicator, { children: icon })), description ? (jsxRuntime.jsxs(react.VStack, { textAlign: "center", children: [jsxRuntime.jsx(react.EmptyState.Title, { children: title }), jsxRuntime.jsx(react.EmptyState.Description, { children: description })] })) : (jsxRuntime.jsx(react.EmptyState.Title, { children: title })), children] }) }));
});

const EmptyResult = (jsxRuntime.jsx(EmptyState$1, { icon: jsxRuntime.jsx(hi.HiColorSwatch, {}), title: "No results found", description: "Try adjusting your search", children: jsxRuntime.jsxs(react.List.Root, { variant: "marker", children: [jsxRuntime.jsx(react.List.Item, { children: "Try removing filters" }), jsxRuntime.jsx(react.List.Item, { children: "Try different keywords" })] }) }));
const Table = ({ children, emptyComponent = EmptyResult, canResize = true, ...props }) => {
    const { table } = useDataTableContext();
    if (table.getRowModel().rows.length <= 0) {
        return emptyComponent;
    }
    return (jsxRuntime.jsx(react.Table.Root, { stickyHeader: true, variant: "outline", width: canResize ? table.getCenterTotalSize() : undefined, display: "grid", alignContent: "start", overflowY: "auto", ...props, children: children }));
};

const DefaultTable = ({ showFooter = false, tableProps = {}, tableHeaderProps = {}, tableBodyProps = {}, controlProps = {}, tableFooterProps = {}, variant = "", }) => {
    if (variant === "greedy") {
        return (jsxRuntime.jsx(TableControls, { ...controlProps, children: jsxRuntime.jsxs(Table, { canResize: false, ...{ ...tableProps }, children: [jsxRuntime.jsx(TableHeader, { canResize: false, ...tableHeaderProps }), jsxRuntime.jsx(TableBody, { canResize: false, ...tableBodyProps }), showFooter && (jsxRuntime.jsx(TableFooter, { canResize: false, ...tableFooterProps }))] }) }));
    }
    return (jsxRuntime.jsx(TableControls, { ...controlProps, children: jsxRuntime.jsxs(Table, { ...tableProps, children: [jsxRuntime.jsx(TableHeader, { ...tableHeaderProps }), jsxRuntime.jsx(TableBody, { ...tableBodyProps }), showFooter && jsxRuntime.jsx(TableFooter, { ...tableFooterProps })] }) }));
};

const TableCardContainer = ({ children, variant = "", ...props }) => {
    if (variant === "carousel") {
        return (jsxRuntime.jsx(react.Flex, { overflow: "scroll", gap: "1rem", children: children }));
    }
    return (jsxRuntime.jsx(react.Grid, { gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))", gap: "0.5rem", ...props, children: children }));
};

const DefaultCardTitle = () => {
    return jsxRuntime.jsx(jsxRuntime.Fragment, {});
};
const TableCards = ({ isSelectable = false, showDisplayNameOnly = false, renderTitle = DefaultCardTitle, cardBodyProps = {}, }) => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: table.getRowModel().rows.map((row) => {
            return (jsxRuntime.jsx(react.Card.Root, { flex: "1 0 20rem", children: jsxRuntime.jsxs(react.Card.Body, { display: "flex", flexFlow: "column", gap: "0.5rem", ...cardBodyProps, children: [isSelectable && (jsxRuntime.jsx(Checkbox, { isChecked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            // indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler() })), renderTitle(row), jsxRuntime.jsx(react.Grid, { templateColumns: "auto 1fr", gap: "1rem", children: row.getVisibleCells().map((cell) => {
                                return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs(react.Box, { children: [showDisplayNameOnly && (jsxRuntime.jsx(react.Text, { fontWeight: "bold", children: cell.column.columnDef.meta?.displayName ??
                                                        cell.column.id })), !showDisplayNameOnly && (jsxRuntime.jsx(jsxRuntime.Fragment, { children: reactTable.flexRender(cell.column.columnDef.header, 
                                                    // @ts-expect-error Assuming the CellContext interface is the same as HeaderContext
                                                    cell.getContext()) }))] }, `chakra-table-cardcolumnid-${row.id}`), jsxRuntime.jsx(react.Box, { justifySelf: "end", children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) }, `chakra-table-cardcolumn-${row.id}`)] }));
                            }) })] }) }, `chakra-table-card-${row.id}`));
        }) }));
};

const TableComponent = ({ render = () => {
    throw Error("Not Implemented");
}, }) => {
    const { table } = useDataTableContext();
    return render(table);
};

const TableLoadingComponent = ({ render, }) => {
    const { loading } = useDataTableContext();
    return jsxRuntime.jsx(jsxRuntime.Fragment, { children: render(loading) });
};

const SelectAllRowsToggle = ({ selectAllIcon = jsxRuntime.jsx(md.MdOutlineChecklist, {}), clearAllIcon = jsxRuntime.jsx(md.MdClear, {}), selectAllText = "", clearAllText = "", }) => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!selectAllText === false && (jsxRuntime.jsx(react.IconButton, { variant: "ghost", "aria-label": table.getIsAllRowsSelected() ? clearAllText : selectAllText, onClick: (event) => {
                    table.getToggleAllRowsSelectedHandler()(event);
                }, children: table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon })), !!selectAllText !== false && (jsxRuntime.jsxs(react.Button, { variant: "ghost", onClick: (event) => {
                    table.getToggleAllRowsSelectedHandler()(event);
                }, children: [table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon, table.getIsAllRowsSelected() ? clearAllText : selectAllText] }))] }));
};

const TableSelector = () => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [table.getSelectedRowModel().rows.length > 0 && (jsxRuntime.jsxs(react.Button, { onClick: () => { }, variant: "ghost", display: "flex", gap: "0.25rem", children: [jsxRuntime.jsx(react.Box, { fontSize: "sm", children: `${table.getSelectedRowModel().rows.length}` }), jsxRuntime.jsx(io.IoMdCheckbox, {})] })), !table.getIsAllPageRowsSelected() && jsxRuntime.jsx(SelectAllRowsToggle, {}), table.getSelectedRowModel().rows.length > 0 && (jsxRuntime.jsx(react.IconButton, { variant: "ghost", onClick: () => {
                    table.resetRowSelection();
                }, "aria-label": "reset selection", children: jsxRuntime.jsx(md.MdClear, {}) }))] }));
};

const TextCell = ({ label, containerProps = {}, textProps = {}, children, }) => {
    if (label) {
        return (jsxRuntime.jsx(react.Flex, { alignItems: "center", height: "100%", ...containerProps, children: jsxRuntime.jsx(Tooltip, { content: jsxRuntime.jsx(react.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", children: label }), children: jsxRuntime.jsx(react.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-all", ...textProps, children: children }) }) }));
    }
    return (jsxRuntime.jsx(react.Flex, { alignItems: "center", height: "100%", ...containerProps, children: jsxRuntime.jsx(react.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-all", ...textProps, children: children }) }));
};

const useDataTable = ({ default: { sorting: defaultSorting = [], pagination: defaultPagination = {
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
}, rowSelection: defaultRowSelection = {}, columnFilters: defaultColumnFilters = [], columnOrder: defaultColumnOrder = [], columnVisibility: defaultColumnVisibility = {}, globalFilter: defaultGlobalFilter = "", density: defaultDensity = "sm", } = {
    sorting: [],
    pagination: {
        pageIndex: 0, //initial page index
        pageSize: 10, //age size
    },
    rowSelection: {},
    columnFilters: [],
    columnOrder: [],
    columnVisibility: {},
    globalFilter: "",
    density: "sm",
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
        globalFilter: "",
        density: "sm",
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

const useDataTableServer = ({ url, default: { sorting: defaultSorting = [], pagination: defaultPagination = {
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
}, rowSelection: defaultRowSelection = {}, columnFilters: defaultColumnFilters = [], columnOrder: defaultColumnOrder = [], columnVisibility: defaultColumnVisibility = {}, globalFilter: defaultGlobalFilter = "", density: defaultDensity = "sm", } = {
    sorting: [],
    pagination: {
        pageIndex: 0, //initial page index
        pageSize: 10, //age size
    },
    rowSelection: {},
    columnFilters: [],
    columnOrder: [],
    columnVisibility: {},
    globalFilter: "",
    density: "sm",
},
// debounce = true,
// debounceDelay = 1000,
 }) => {
    const [sorting, setSorting] = React.useState(defaultSorting);
    const [columnFilters, setColumnFilters] = React.useState(defaultColumnFilters); // can set initial column filter state here
    const [pagination, setPagination] = React.useState(defaultPagination);
    const [rowSelection, setRowSelection] = React.useState(defaultRowSelection);
    const [columnOrder, setColumnOrder] = React.useState(defaultColumnOrder);
    const [globalFilter, setGlobalFilter] = React.useState(defaultGlobalFilter);
    const [density, setDensity] = React.useState(defaultDensity);
    const [columnVisibility, setColumnVisibility] = React.useState(defaultColumnVisibility);
    const params = {
        offset: pagination.pageIndex * pagination.pageSize,
        limit: pagination.pageSize,
        sorting,
        where: columnFilters,
        searching: globalFilter,
    };
    const query = reactQuery.useQuery({
        queryKey: [url, JSON.stringify(params)],
        queryFn: () => {
            return axios
                .get(url, {
                params,
            })
                .then((res) => res.data);
        },
        placeholderData: {
            count: 0,
            data: [],
        },
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
const getColumns = ({ schema, ignore = [], width = [], meta = {}, defaultWidth = 400, }) => {
    const { properties } = schema;
    idListSanityCheck("ignore", ignore, properties);
    widthSanityCheck(width, ignore, properties);
    idListSanityCheck("meta", Object.keys(meta), properties);
    const keys = Object.keys(properties);
    const ignored = keys.filter((key) => {
        return !ignore.some((shouldIgnoreKey) => key === shouldIgnoreKey);
    });
    const columnHelper = reactTable.createColumnHelper();
    // @ts-expect-error find type for unknown
    const columns = [
        ...ignored.map((column, index) => {
            return columnHelper.accessor(column, {
                cell: (props) => {
                    // @ts-expect-error find type for unknown
                    const value = props.row.original[column];
                    if (typeof value === "object") {
                        return (jsxRuntime.jsx(react.Grid, { overflow: "auto", children: jsxRuntime.jsx(RecordDisplay, { object: value }) }));
                    }
                    return jsxRuntime.jsx(TextCell, { children: value });
                },
                header: (columnHeader) => {
                    const displayName = columnHeader.column.columnDef.meta?.displayName ??
                        snakeToLabel(column);
                    return jsxRuntime.jsx("span", { children: displayName });
                },
                footer: (columnFooter) => {
                    const displayName = columnFooter.column.columnDef.meta?.displayName ??
                        snakeToLabel(column);
                    return jsxRuntime.jsx("span", { children: displayName });
                },
                size: width[index] ?? defaultWidth,
                meta: Object.keys(meta).length > 0 ? meta[column] : {},
            });
        }),
    ];
    return columns;
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

//@ts-expect-error TODO: find appropriate type
const SchemaFormContext = React.createContext({
    schema: {},
    serverUrl: "",
    order: [],
    ignore: [],
    onSubmit: async () => { },
    rowNumber: 0,
    displayText: {},
});

const PopoverContent = React__namespace.forwardRef(function PopoverContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props;
    return (jsxRuntime.jsx(react.Portal, { disabled: !portalled, container: portalRef, children: jsxRuntime.jsx(react.Popover.Positioner, { children: jsxRuntime.jsx(react.Popover.Content, { ref: ref, ...rest }) }) }));
});
React__namespace.forwardRef(function PopoverArrow(props, ref) {
    return (jsxRuntime.jsx(react.Popover.Arrow, { ...props, ref: ref, children: jsxRuntime.jsx(react.Popover.ArrowTip, {}) }));
});
React__namespace.forwardRef(function PopoverCloseTrigger(props, ref) {
    return (jsxRuntime.jsx(react.Popover.CloseTrigger, { position: "absolute", top: "1", insetEnd: "1", ...props, asChild: true, ref: ref, children: jsxRuntime.jsx(CloseButton, { size: "sm" }) }));
});
const PopoverTitle = react.Popover.Title;
react.Popover.Description;
react.Popover.Footer;
react.Popover.Header;
const PopoverRoot = react.Popover.Root;
const PopoverBody = react.Popover.Body;
const PopoverTrigger = react.Popover.Trigger;

const Field = React__namespace.forwardRef(function Field(props, ref) {
    const { label, children, helperText, errorText, optionalText, ...rest } = props;
    return (jsxRuntime.jsxs(react.Field.Root, { ref: ref, ...rest, children: [label && (jsxRuntime.jsxs(react.Field.Label, { children: [label, jsxRuntime.jsx(react.Field.RequiredIndicator, { fallback: optionalText })] })), children, helperText && (jsxRuntime.jsx(react.Field.HelperText, { children: helperText })), errorText && (jsxRuntime.jsx(react.Field.ErrorText, { children: errorText }))] }));
});

const useSchemaContext = () => {
    const { schema, serverUrl, order, ignore, onSubmit, rowNumber, displayText, idMap, setIdMap, } = React.useContext(SchemaFormContext);
    return {
        schema,
        serverUrl,
        order,
        ignore,
        onSubmit,
        rowNumber,
        displayText,
        idMap,
        setIdMap,
    };
};

const getTableData = async ({ serverUrl, in_table, searching = "", where = [], limit = 10, offset = 0, }) => {
    if (serverUrl === undefined || serverUrl.length == 0) {
        throw new Error("The serverUrl is missing");
    }
    if (in_table === undefined || in_table.length == 0) {
        throw new Error("The in_table is missing");
    }
    const options = {
        method: "GET",
        url: `${serverUrl}/api/g/${in_table}`,
        headers: {
            Apikey: "YOUR_SECRET_TOKEN",
            "Content-Type": "application/json",
        },
        params: {
            searching,
            where,
            limit,
            offset
        },
    };
    try {
        const { data } = await axios.request(options);
        console.log(data);
        return data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

const IdPicker = ({ column, isMultiple = false }) => {
    const { watch, formState: { errors }, setValue, } = reactHookForm.useFormContext();
    const { schema, serverUrl, displayText, idMap, setIdMap } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using DatePicker");
    }
    const { total, showing, typeToSearch } = displayText;
    const { gridColumn, gridRow, title, renderDisplay, foreign_key } = schema
        .properties[column];
    const { table, column: column_ref, display_column, } = foreign_key;
    const [searchText, setSearchText] = React.useState();
    const [limit, setLimit] = React.useState(10);
    const [openSearchResult, setOpenSearchResult] = React.useState();
    const [page, setPage] = React.useState(0);
    const ref = React.useRef(null);
    const selectedIds = watch(column) ?? [];
    const query = reactQuery.useQuery({
        queryKey: [`idpicker`, { column, searchText, limit, page }],
        queryFn: async () => {
            const data = await getTableData({
                serverUrl,
                searching: searchText ?? "",
                in_table: table,
                limit: limit,
                offset: page * 10,
            });
            const newMap = Object.fromEntries((data ?? { data: [] }).data.map((item) => {
                return [
                    item[column_ref],
                    {
                        ...item,
                    },
                ];
            }));
            setIdMap((state) => {
                return { ...state, ...newMap };
            });
            return data;
        },
        enabled: (searchText ?? "")?.length > 0,
        staleTime: 300000,
    });
    const { isLoading, isFetching, data, isPending, isError } = query;
    const dataList = data?.data ?? [];
    const count = data?.count ?? 0;
    const isDirty = (searchText?.length ?? 0) > 0;
    const onSearchChange = async (event) => {
        setSearchText(event.target.value);
        setPage(0);
        setLimit(10);
    };
    const watchId = watch(column);
    const watchIds = (watch(column) ?? []);
    const getPickedValue = () => {
        if (Object.keys(idMap).length <= 0) {
            return "";
        }
        const record = idMap[watchId];
        if (record === undefined) {
            return "";
        }
        return record[display_column];
    };
    return (jsxRuntime.jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [isMultiple && (jsxRuntime.jsxs(react.Flex, { flexFlow: "wrap", gap: 1, children: [selectedIds.map((id) => {
                        const item = idMap[id];
                        if (item === undefined) {
                            return jsxRuntime.jsx(react.Text, { children: "undefined" }, id);
                        }
                        return (jsxRuntime.jsx(Tag, { closable: true, onClick: () => {
                                setValue(column, watchIds.filter((id) => id != item[column_ref]));
                            }, children: !!renderDisplay === true
                                ? renderDisplay(item)
                                : item[display_column] }, id));
                    }), jsxRuntime.jsx(Tag, { cursor: "pointer", onClick: () => {
                            setOpenSearchResult(true);
                        }, children: "Add" })] })), !isMultiple && (jsxRuntime.jsx(Button, { variant: "outline", onClick: () => {
                    setOpenSearchResult(true);
                }, children: getPickedValue() })), jsxRuntime.jsxs(PopoverRoot, { open: openSearchResult, onOpenChange: (e) => setOpenSearchResult(e.open), closeOnInteractOutside: true, initialFocusEl: () => ref.current, positioning: { placement: "bottom-start", strategy: "fixed" }, children: [jsxRuntime.jsx(PopoverTrigger, {}), jsxRuntime.jsx(PopoverContent, { children: jsxRuntime.jsxs(PopoverBody, { display: "grid", gap: 1, children: [jsxRuntime.jsx(react.Input, { placeholder: typeToSearch ?? "Type To Search", onChange: (event) => {
                                        onSearchChange(event);
                                        setOpenSearchResult(true);
                                    }, autoComplete: "off", ref: ref }), jsxRuntime.jsx(PopoverTitle, {}), (searchText?.length ?? 0) > 0 && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [isFetching && jsxRuntime.jsx(jsxRuntime.Fragment, { children: "isFetching" }), isLoading && jsxRuntime.jsx(jsxRuntime.Fragment, { children: "isLoading" }), isPending && jsxRuntime.jsx(jsxRuntime.Fragment, { children: "isPending" }), isError && jsxRuntime.jsx(jsxRuntime.Fragment, { children: "isError" }), jsxRuntime.jsx(react.Text, { justifySelf: "center", children: `${total ?? "Total"} ${count}, ${showing ?? "Showing"} ${limit}` }), jsxRuntime.jsxs(react.Grid, { gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", overflow: "auto", maxHeight: "50vh", children: [jsxRuntime.jsx(react.Flex, { flexFlow: "column wrap", children: 
                                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                    dataList.map((item) => {
                                                        const selected = isMultiple
                                                            ? watchIds.some((id) => item[column_ref] === id)
                                                            : watchId === item[column_ref];
                                                        return (jsxRuntime.jsx(react.Box, { cursor: "pointer", onClick: () => {
                                                                if (!isMultiple) {
                                                                    setOpenSearchResult(false);
                                                                    setValue(column, item[column_ref]);
                                                                    return;
                                                                }
                                                                const newSet = new Set([
                                                                    ...(watchIds ?? []),
                                                                    item[column_ref],
                                                                ]);
                                                                setValue(column, [...newSet]);
                                                            }, opacity: 0.7, _hover: { opacity: 1 }, ...(selected ? { color: "gray.400/50" } : {}), children: !!renderDisplay === true
                                                                ? renderDisplay(item)
                                                                : item[display_column] }, item[column_ref]));
                                                    }) }), isDirty && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [dataList.length <= 0 && jsxRuntime.jsx(react.Text, { children: "Empty Search Result" }), " "] }))] }), jsxRuntime.jsx(PaginationRoot, { justifySelf: "center", count: query?.data?.count ?? 0, pageSize: 10, defaultPage: 1, page: page + 1, onPageChange: (e) => setPage(e.page - 1), children: jsxRuntime.jsxs(react.HStack, { gap: "4", children: [jsxRuntime.jsx(PaginationPrevTrigger, {}), jsxRuntime.jsx(PaginationPageText, {}), jsxRuntime.jsx(PaginationNextTrigger, {})] }) })] }))] }) })] }), errors[`${column}`] && (jsxRuntime.jsx(react.Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
};

const ToggleTip = React__namespace.forwardRef(function ToggleTip(props, ref) {
    const { showArrow, children, portalled = true, content, portalRef, ...rest } = props;
    return (jsxRuntime.jsxs(react.Popover.Root, { ...rest, positioning: { ...rest.positioning, gutter: 4 }, children: [jsxRuntime.jsx(react.Popover.Trigger, { asChild: true, children: children }), jsxRuntime.jsx(react.Portal, { disabled: !portalled, container: portalRef, children: jsxRuntime.jsx(react.Popover.Positioner, { children: jsxRuntime.jsxs(react.Popover.Content, { width: "auto", px: "2", py: "1", textStyle: "xs", rounded: "sm", ref: ref, children: [showArrow && (jsxRuntime.jsx(react.Popover.Arrow, { children: jsxRuntime.jsx(react.Popover.ArrowTip, {}) })), content] }) }) })] }));
});
const InfoTip = React__namespace.forwardRef(function InfoTip(props, ref) {
    const { children, ...rest } = props;
    return (jsxRuntime.jsx(ToggleTip, { content: children, ...rest, ref: ref, children: jsxRuntime.jsx(react.IconButton, { variant: "ghost", "aria-label": "info", size: "2xs", colorPalette: "gray", children: jsxRuntime.jsx(hi.HiOutlineInformationCircle, {}) }) }));
});

const DataListRoot = react.DataList.Root;
const DataListItem = React__namespace.forwardRef(function DataListItem(props, ref) {
    const { label, info, value, children, grow, ...rest } = props;
    return (jsxRuntime.jsxs(react.DataList.Item, { ref: ref, ...rest, children: [jsxRuntime.jsxs(react.DataList.ItemLabel, { flex: grow ? "1" : undefined, children: [label, info && jsxRuntime.jsx(InfoTip, { children: info })] }), jsxRuntime.jsx(react.DataList.ItemValue, { flex: grow ? "1" : undefined, children: value }), children] }));
});

const IdViewer = ({ value, column, dataListItemProps, }) => {
    const { schema, idMap } = useSchemaContext();
    if (schema.properties == undefined) {
        throw new Error("schema properties when using DatePicker");
    }
    const { title, foreign_key } = schema.properties[column];
    if (foreign_key === undefined) {
        throw new Error("foreign_key when variant is id-picker");
    }
    const { display_column } = foreign_key;
    const getDataListProps = (value) => {
        if (value == undefined || value.length <= 0) {
            return {
                value: "<empty>",
                color: "gray.400",
            };
        }
        return {
            value: value,
        };
    };
    if (value === undefined) {
        return jsxRuntime.jsx(jsxRuntime.Fragment, { children: "undefined" });
    }
    return (jsxRuntime.jsx(DataListItem, { label: `${title ?? snakeToLabel(column)}`, ...getDataListProps(idMap[value][display_column]), ...dataListItemProps }));
};

const NumberInputRoot = React__namespace.forwardRef(function NumberInput(props, ref) {
    const { children, ...rest } = props;
    return (jsxRuntime.jsxs(react.NumberInput.Root, { ref: ref, variant: "outline", ...rest, children: [children, jsxRuntime.jsxs(react.NumberInput.Control, { children: [jsxRuntime.jsx(react.NumberInput.IncrementTrigger, {}), jsxRuntime.jsx(react.NumberInput.DecrementTrigger, {})] })] }));
});
const NumberInputField$1 = react.NumberInput.Input;
react.NumberInput.Scrubber;
react.NumberInput.Label;

const NumberInputField = ({ column }) => {
    const { register, formState: { errors }, } = reactHookForm.useFormContext();
    const { schema, displayText } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using String Input Field");
    }
    const { gridColumn, gridRow, title } = schema.properties[column];
    return (jsxRuntime.jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, gridColumn, gridRow, children: [jsxRuntime.jsx(NumberInputRoot, { children: jsxRuntime.jsx(NumberInputField$1, { ...register(column, { required: isRequired }) }) }), errors[`${column}`] && (jsxRuntime.jsx(react.Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
};

const StringInputField = ({ column }) => {
    const { register, formState: { errors }, } = reactHookForm.useFormContext();
    const { schema, displayText } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using String Input Field");
    }
    const { gridColumn, gridRow, title } = schema.properties[column];
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", children: [jsxRuntime.jsx(react.Input, { ...register(column, { required: isRequired }), autoComplete: "off" }), errors[`${column}`] && (jsxRuntime.jsx(react.Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }) }));
};

const clearEmptyString = (object) => {
    return Object.fromEntries(Object.entries(object).filter(([, value]) => value !== ""));
};

const AccordionItemTrigger = React__namespace.forwardRef(function AccordionItemTrigger(props, ref) {
    const { children, indicatorPlacement = "end", ...rest } = props;
    return (jsxRuntime.jsxs(react.Accordion.ItemTrigger, { ...rest, ref: ref, children: [indicatorPlacement === "start" && (jsxRuntime.jsx(react.Accordion.ItemIndicator, { rotate: { base: "-90deg", _open: "0deg" }, children: jsxRuntime.jsx(lu.LuChevronDown, {}) })), jsxRuntime.jsx(react.HStack, { gap: "4", flex: "1", textAlign: "start", width: "full", children: children }), indicatorPlacement === "end" && (jsxRuntime.jsx(react.Accordion.ItemIndicator, { children: jsxRuntime.jsx(lu.LuChevronDown, {}) }))] }));
});
const AccordionItemContent = React__namespace.forwardRef(function AccordionItemContent(props, ref) {
    return (jsxRuntime.jsx(react.Accordion.ItemContent, { children: jsxRuntime.jsx(react.Accordion.ItemBody, { ...props, ref: ref }) }));
});
const AccordionRoot = react.Accordion.Root;
const AccordionItem = react.Accordion.Item;

const BooleanPicker = ({ column }) => {
    const { watch, formState: { errors }, setValue, getValues, } = reactHookForm.useFormContext();
    const { schema, displayText } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const value = watch(column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using BooleanPicker");
    }
    const { gridColumn, gridRow, title } = schema.properties[column];
    return (jsxRuntime.jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [jsxRuntime.jsx(CheckboxCard, { checked: value, variant: "surface", onSelect: () => {
                    setValue(column, !value);
                } }), errors[`${column}`] && (jsxRuntime.jsx(react.Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
};

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
const Calendar = ({ calendars, getBackProps, getForwardProps, getDateProps, firstDayOfWeek = 0, }) => {
    if (calendars.length) {
        return (jsxRuntime.jsxs(react.Grid, { children: [jsxRuntime.jsxs(react.Grid, { templateColumns: "repeat(4, auto)", justifyContent: "center", children: [jsxRuntime.jsx(react.Button, { variant: "ghost", ...getBackProps({
                                calendars,
                                offset: 12,
                            }), children: "<<" }), jsxRuntime.jsx(react.Button, { variant: "ghost", ...getBackProps({ calendars }), children: "Back" }), jsxRuntime.jsx(react.Button, { variant: "ghost", ...getForwardProps({ calendars }), children: "Next" }), jsxRuntime.jsx(react.Button, { variant: "ghost", ...getForwardProps({
                                calendars,
                                offset: 12,
                            }), children: ">>" })] }), jsxRuntime.jsx(react.Grid, { templateColumns: "repeat(2, auto)", justifyContent: "center", children: calendars.map((calendar) => (jsxRuntime.jsxs(react.Grid, { gap: 4, children: [jsxRuntime.jsxs(react.Grid, { justifyContent: "center", children: [monthNamesShort[calendar.month], " ", calendar.year] }), jsxRuntime.jsxs(react.Grid, { templateColumns: "repeat(7, auto)", justifyContent: "center", children: [[0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
                                        const weekday = (weekdayNum + firstDayOfWeek) % 7;
                                        return (jsxRuntime.jsx(react.Text, { textAlign: "center", children: weekdayNamesShort[weekday] }, `${calendar.month}${calendar.year}${weekday}`));
                                    }), calendar.weeks.map((week, weekIndex) => week.map((dateObj, index) => {
                                        const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                                        if (!dateObj) {
                                            return jsxRuntime.jsx(react.Grid, {}, key);
                                        }
                                        const { date, selected, selectable, today } = dateObj;
                                        const getDateColor = ({ today, selected, selectable, }) => {
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
                                        const getVariant = ({ today, selected, selectable, }) => {
                                            if (!selectable) {
                                                return "surface";
                                            }
                                            if (selected) {
                                                return "solid";
                                            }
                                            if (today) {
                                                return "surface";
                                            }
                                            return "ghost";
                                        };
                                        const color = getDateColor({ today, selected, selectable });
                                        const variant = getVariant({ today, selected, selectable });
                                        return (jsxRuntime.jsx(react.Button, { variant: variant, colorPalette: color, ...getDateProps({ dateObj }), children: selectable ? date.getDate() : "X" }, key));
                                    }))] })] }, `${calendar.month}${calendar.year}`))) })] }));
    }
    return null;
};
let DatePicker$1 = class DatePicker extends React.Component {
    render() {
        return (jsxRuntime.jsx(Dayzed, { onDateSelected: this.props.onDateSelected, selected: this.props.selected, firstDayOfWeek: this.props.firstDayOfWeek, showOutsideDays: this.props.showOutsideDays, date: this.props.date, minDate: this.props.minDate, maxDate: this.props.maxDate, monthsToDisplay: this.props.monthsToDisplay, render: (dayzedData) => (jsxRuntime.jsx(Calendar, { ...dayzedData, firstDayOfWeek: this.props.firstDayOfWeek })) }));
    }
};

const DatePicker = ({ column }) => {
    const { watch, formState: { errors }, setValue, } = reactHookForm.useFormContext();
    const { schema, displayText } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const [open, setOpen] = React.useState(false);
    const selectedDate = watch(column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using DatePicker");
    }
    const { gridColumn, gridRow, title } = schema.properties[column];
    return (jsxRuntime.jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [jsxRuntime.jsxs(PopoverRoot, { open: open, onOpenChange: (e) => setOpen(e.open), closeOnInteractOutside: true, children: [jsxRuntime.jsx(PopoverTrigger, { asChild: true, children: jsxRuntime.jsx(Button, { size: "sm", variant: "outline", onClick: () => {
                                setOpen(true);
                            }, children: selectedDate !== undefined ? selectedDate : "" }) }), jsxRuntime.jsx(PopoverContent, { children: jsxRuntime.jsxs(PopoverBody, { children: [jsxRuntime.jsx(PopoverTitle, {}), jsxRuntime.jsx(DatePicker$1, { selected: new Date(selectedDate), onDateSelected: ({ selected, selectable, date }) => {
                                        setValue(column, dayjs(date).format("YYYY-MM-DD"));
                                        setOpen(false);
                                    } })] }) })] }), errors[`${column}`] && (jsxRuntime.jsx(react.Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
};

function filterArray(array, searchTerm) {
    // Convert the search term to lower case for case-insensitive comparison
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    // Use the filter method to return an array of matching items
    return array.filter((item) => {
        // Convert each item to a string and check if it includes the search term
        return item.toString().toLowerCase().includes(lowerCaseSearchTerm);
    });
}

const EnumPicker = ({ column, isMultiple = false }) => {
    const { watch, formState: { errors }, setValue, } = reactHookForm.useFormContext();
    const { schema, displayText } = useSchemaContext();
    const { fieldRequired, total, showing, typeToSearch } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using DatePicker");
    }
    const { gridColumn, gridRow, title, renderDisplay } = schema.properties[column];
    const [searchText, setSearchText] = React.useState();
    const [limit, setLimit] = React.useState(10);
    const [openSearchResult, setOpenSearchResult] = React.useState();
    const ref = React.useRef(null);
    const watchEnum = watch(column);
    const watchEnums = (watch(column) ?? []);
    const properties = (schema.properties[column] ?? {});
    const dataList = properties.enum ?? [];
    const count = properties.enum?.length ?? 0;
    const isDirty = (searchText?.length ?? 0) > 0;
    const onSearchChange = async (event) => {
        setSearchText(event.target.value);
        setLimit(10);
    };
    return (jsxRuntime.jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [isMultiple && (jsxRuntime.jsxs(react.Flex, { flexFlow: "wrap", gap: 1, children: [watchEnums.map((enumValue) => {
                        const item = enumValue;
                        if (item === undefined) {
                            return jsxRuntime.jsx(jsxRuntime.Fragment, { children: "undefined" });
                        }
                        return (jsxRuntime.jsx(Tag, { closable: true, onClick: () => {
                                setSelectedEnums((state) => state.filter((id) => id != item));
                                setValue(column, watchEnums.filter((id) => id != item));
                            }, children: !!renderDisplay === true ? renderDisplay(item) : item }));
                    }), jsxRuntime.jsx(Tag, { cursor: "pointer", onClick: () => {
                            setOpenSearchResult(true);
                        }, children: "Add" })] })), !isMultiple && (jsxRuntime.jsx(Button, { variant: "outline", onClick: () => {
                    setOpenSearchResult(true);
                }, children: watchEnum })), jsxRuntime.jsxs(PopoverRoot, { open: openSearchResult, onOpenChange: (e) => setOpenSearchResult(e.open), closeOnInteractOutside: true, initialFocusEl: () => ref.current, positioning: { placement: "bottom-start" }, children: [jsxRuntime.jsx(PopoverTrigger, {}), jsxRuntime.jsx(PopoverContent, { children: jsxRuntime.jsxs(PopoverBody, { display: "grid", gap: 1, children: [jsxRuntime.jsx(react.Input, { placeholder: typeToSearch ?? "Type to search", onChange: (event) => {
                                        onSearchChange(event);
                                        setOpenSearchResult(true);
                                    }, autoComplete: "off", ref: ref }), jsxRuntime.jsx(PopoverTitle, {}), jsxRuntime.jsx(react.Text, { children: `${total ?? "Total"}: ${count}, ${showing ?? "Showing"} ${limit}` }), jsxRuntime.jsxs(react.Grid, { gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", overflow: "auto", maxHeight: "50vh", children: [jsxRuntime.jsx(react.Flex, { flexFlow: "column wrap", children: filterArray(dataList, searchText ?? "").map((item) => {
                                                const selected = isMultiple
                                                    ? watchEnums.some((enumValue) => item === enumValue)
                                                    : watchEnum == item;
                                                return (jsxRuntime.jsx(react.Box, { cursor: "pointer", onClick: () => {
                                                        if (!isMultiple) {
                                                            setOpenSearchResult(false);
                                                            setValue(column, item);
                                                            return;
                                                        }
                                                        const newSet = new Set([...(watchEnums ?? []), item]);
                                                        setValue(column, [...newSet]);
                                                    }, ...(selected ? { color: "gray.400/50" } : {}), children: !!renderDisplay === true ? renderDisplay(item) : item }, `${column}-${item}`));
                                            }) }), isDirty && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [dataList.length <= 0 && jsxRuntime.jsx(jsxRuntime.Fragment, { children: "Empty Search Result" }), " "] }))] })] }) })] }), errors[`${column}`] && (jsxRuntime.jsx(react.Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
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

const FileDropzone = ({ children = undefined, gridProps = {}, onDrop = () => { }, placeholder = "Drop files here or click to upload", }) => {
    const ref = React.useRef(null);
    const [isDraggedOver, setIsDraggedOver] = React.useState(false);
    React.useEffect(() => {
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
                console.log(files, text, "dfposa");
                onDrop({ files, text });
            },
        });
    }, [onDrop]);
    // const isDark = (location + location) % 2 === 1;
    function getColor(isDraggedOver) {
        if (isDraggedOver) {
            return {
                backgroundColor: "blue.400",
                _dark: {
                    backgroundColor: "blue.400",
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
    const fileInput = React.useRef(null);
    const handleClick = () => {
        fileInput.current?.click();
    };
    const handleChange = (event) => {
        // @ts-expect-error find appropriate types for event target files
        const filesArray = [...event.target.files];
        onDrop({ files: filesArray });
    };
    return (jsxRuntime.jsxs(react.Grid, { ...getColor(isDraggedOver), ref: ref, cursor: "pointer", onClick: handleClick, borderStyle: "dashed", borderColor: "gray.400", alignContent: "center", justifyContent: "center", borderWidth: 1, borderRadius: 4, ...gridProps, children: [children, !!children === false && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(react.Flex, { children: placeholder }), jsxRuntime.jsx(react.Input, { type: "file", multiple: true, style: { display: "none" }, ref: fileInput, onChange: handleChange })] }))] }));
};

const FilePicker = ({ column }) => {
    const { setValue, formState: { errors }, watch, } = reactHookForm.useFormContext();
    const { schema, displayText } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using String Input Field");
    }
    const { gridColumn, gridRow, title } = schema.properties[column];
    const currentFiles = (watch(column) ?? []);
    return (jsxRuntime.jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", display: "grid", gridTemplateRows: 'auto 1fr auto', alignItems: 'stretch', children: [jsxRuntime.jsx(FileDropzone, { onDrop: ({ files }) => {
                    const newFiles = files.filter(({ name }) => !currentFiles.some((cur) => cur.name === name));
                    setValue(column, [...currentFiles, ...newFiles]);
                } }), jsxRuntime.jsx(react.Flex, { flexFlow: "wrap", alignItems: "start", gap: 1, children: currentFiles.map((file) => {
                    return (jsxRuntime.jsx(Tag, { cursor: "pointer", onClick: () => {
                            setValue(column, currentFiles.filter(({ name }) => {
                                return name !== file.name;
                            }));
                        }, children: file.name }));
                }) }), errors[`${column}`] && (jsxRuntime.jsx(react.Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
};

const ObjectInput = ({ column }) => {
    const { formState: { errors }, setValue, getValues, } = reactHookForm.useFormContext();
    const { schema, displayText } = useSchemaContext();
    const { addNew, fieldRequired, save } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const entries = Object.entries(getValues(column) ?? {});
    const [showNewEntries, setShowNewEntries] = React.useState(false);
    const [newKey, setNewKey] = React.useState();
    const [newValue, setNewValue] = React.useState();
    if (schema.properties == undefined) {
        throw new Error("schema properties when using DatePicker");
    }
    const { gridColumn, gridRow, title } = schema.properties[column];
    return (jsxRuntime.jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, alignItems: "stretch", gridColumn, gridRow, children: [entries.map(([key, value]) => {
                return (jsxRuntime.jsxs(react.Grid, { templateColumns: "1fr 1fr auto", gap: 1, children: [jsxRuntime.jsx(react.Input, { value: key, onChange: (e) => {
                                const filtered = entries.filter(([target]) => {
                                    return target !== key;
                                });
                                setValue(column, Object.fromEntries([...filtered, [e.target.value, value]]));
                            }, autoComplete: "off" }), jsxRuntime.jsx(react.Input, { value: value, onChange: (e) => {
                                setValue(column, {
                                    ...getValues(column),
                                    [key]: e.target.value,
                                });
                            }, autoComplete: "off" }), jsxRuntime.jsx(react.IconButton, { variant: "ghost", onClick: () => {
                                const filtered = entries.filter(([target]) => {
                                    return target !== key;
                                });
                                setValue(column, Object.fromEntries([...filtered]));
                            }, children: jsxRuntime.jsx(cg.CgClose, {}) })] }));
            }), jsxRuntime.jsx(react.Show, { when: showNewEntries, children: jsxRuntime.jsxs(react.Card.Root, { children: [jsxRuntime.jsx(react.Card.Body, { gap: "2", children: jsxRuntime.jsxs(react.Grid, { templateColumns: "1fr 1fr auto", gap: 1, children: [jsxRuntime.jsx(react.Input, { value: newKey, onChange: (e) => {
                                            setNewKey(e.target.value);
                                        }, autoComplete: "off" }), jsxRuntime.jsx(react.Input, { value: newValue, onChange: (e) => {
                                            setNewValue(e.target.value);
                                        }, autoComplete: "off" })] }) }), jsxRuntime.jsxs(react.Card.Footer, { justifyContent: "flex-end", children: [jsxRuntime.jsx(react.IconButton, { variant: "subtle", onClick: () => {
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
                                    }, children: save ?? "Save" })] })] }) }), jsxRuntime.jsx(Button, { onClick: () => {
                    setShowNewEntries(true);
                    setNewKey(undefined);
                    setNewValue(undefined);
                }, children: addNew ?? "Add New" }), errors[`${column}`] && (jsxRuntime.jsx(react.Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
};

const RadioCardItem = React__namespace.forwardRef(function RadioCardItem(props, ref) {
    const { inputProps, label, description, addon, icon, indicator = jsxRuntime.jsx(react.RadioCard.ItemIndicator, {}), indicatorPlacement = "end", ...rest } = props;
    const hasContent = label || description || icon;
    const ContentWrapper = indicator ? react.RadioCard.ItemContent : React__namespace.Fragment;
    return (jsxRuntime.jsxs(react.RadioCard.Item, { ...rest, children: [jsxRuntime.jsx(react.RadioCard.ItemHiddenInput, { ref: ref, ...inputProps }), jsxRuntime.jsxs(react.RadioCard.ItemControl, { children: [indicatorPlacement === "start" && indicator, hasContent && (jsxRuntime.jsxs(ContentWrapper, { children: [icon, label && jsxRuntime.jsx(react.RadioCard.ItemText, { children: label }), description && (jsxRuntime.jsx(react.RadioCard.ItemDescription, { children: description })), indicatorPlacement === "inside" && indicator] })), indicatorPlacement === "end" && indicator] }), addon && jsxRuntime.jsx(react.RadioCard.ItemAddon, { children: addon })] }));
});
const RadioCardRoot = react.RadioCard.Root;
react.RadioCard.Label;
react.RadioCard.ItemIndicator;

const TagPicker = ({ column }) => {
    const { watch, formState: { errors }, setValue, } = reactHookForm.useFormContext();
    const { schema, serverUrl } = useSchemaContext();
    if (schema.properties == undefined) {
        throw new Error("schema properties undefined when using DatePicker");
    }
    const { gridColumn, gridRow, in_table, object_id_column } = schema.properties[column];
    if (in_table === undefined) {
        throw new Error("in_table is undefined when using TagPicker");
    }
    if (object_id_column === undefined) {
        throw new Error("object_id_column is undefined when using TagPicker");
    }
    const query = reactQuery.useQuery({
        queryKey: [`tagpicker`, in_table],
        queryFn: async () => {
            return await getTableData({
                serverUrl,
                in_table: "tables_tags_view",
                where: [
                    {
                        id: "table_name",
                        value: [in_table],
                    },
                ],
                limit: 100,
            });
        },
        staleTime: 10000,
    });
    const object_id = watch(object_id_column);
    const existingTagsQuery = reactQuery.useQuery({
        queryKey: [`existing`, in_table, object_id_column, object_id],
        queryFn: async () => {
            return await getTableData({
                serverUrl,
                in_table: in_table,
                where: [
                    {
                        id: object_id_column,
                        value: object_id[0],
                    },
                ],
                limit: 100,
            });
        },
        enabled: object_id != undefined,
        staleTime: 10000,
    });
    const { isLoading, isFetching, data, isPending, isError } = query;
    const dataList = data?.data ?? [];
    const existingTagList = existingTagsQuery.data?.data ?? [];
    if (!!object_id === false) {
        return jsxRuntime.jsx(jsxRuntime.Fragment, {});
    }
    return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: 4, gridColumn,
        gridRow, children: [isFetching && jsxRuntime.jsx(jsxRuntime.Fragment, { children: "isFetching" }), isLoading && jsxRuntime.jsx(jsxRuntime.Fragment, { children: "isLoading" }), isPending && jsxRuntime.jsx(jsxRuntime.Fragment, { children: "isPending" }), isError && jsxRuntime.jsx(jsxRuntime.Fragment, { children: "isError" }), dataList.map(({ parent_tag_name, all_tags, is_mutually_exclusive }) => {
                return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: 2, children: [jsxRuntime.jsx(react.Text, { children: parent_tag_name }), is_mutually_exclusive && (jsxRuntime.jsx(RadioCardRoot, { defaultValue: "next", variant: "surface", onValueChange: (tagIds) => {
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
                            }, children: jsxRuntime.jsx(react.Flex, { flexFlow: "wrap", gap: 2, children: Object.entries(all_tags).map(([tagName, { id }]) => {
                                    if (existingTagList.some(({ tag_id }) => tag_id === id)) {
                                        return (jsxRuntime.jsx(RadioCardItem, { label: tagName, value: id, flex: "0 0 0%", disabled: true }, `${tagName}-${id}`));
                                    }
                                    return (jsxRuntime.jsx(RadioCardItem, { label: tagName, value: id, flex: "0 0 0%", colorPalette: "blue" }, `${tagName}-${id}`));
                                }) }) })), !is_mutually_exclusive && (jsxRuntime.jsx(react.CheckboxGroup, { onValueChange: (tagIds) => {
                                setValue(`${column}.${parent_tag_name}.current`, tagIds);
                            }, children: jsxRuntime.jsx(react.Flex, { flexFlow: "wrap", gap: 2, children: Object.entries(all_tags).map(([tagName, { id }]) => {
                                    if (existingTagList.some(({ tag_id }) => tag_id === id)) {
                                        return (jsxRuntime.jsx(CheckboxCard, { label: tagName, value: id, flex: "0 0 0%", disabled: true, colorPalette: "blue" }, `${tagName}-${id}`));
                                    }
                                    return (jsxRuntime.jsx(CheckboxCard, { label: tagName, value: id, flex: "0 0 0%" }, `${tagName}-${id}`));
                                }) }) }))] }, `tag-${parent_tag_name}`));
            }), errors[`${column}`] && (jsxRuntime.jsx(react.Text, { color: "red.400", children: (errors[`${column}`]?.message ?? "No error message") }))] }));
};

const idPickerSanityCheck = (column, foreign_key) => {
    if (!!foreign_key == false) {
        throw new Error(`The key foreign_key does not exist in properties of column ${column} when using id-picker.`);
    }
    const { table, column: foreignKeyColumn, display_column } = foreign_key;
    if (!!table == false) {
        throw new Error(`The key table does not exist in properties of column ${table} when using id-picker.`);
    }
    if (!!display_column == false) {
        throw new Error(`The key display_column does not exist in properties of column ${column} when using id-picker.`);
    }
    if (!!foreignKeyColumn == false) {
        throw new Error(`The key column does not exist in properties of column ${column} when using id-picker.`);
    }
};
const FormInternal = () => {
    const { schema, serverUrl, displayText, order, ignore, onSubmit, rowNumber, idMap, } = useSchemaContext();
    const { title, submit, empty, cancel, submitSuccess, submitAgain, confirm } = displayText;
    const methods = reactHookForm.useFormContext();
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isSubmiting, setIsSubmiting] = React.useState(false);
    const [isConfirming, setIsConfirming] = React.useState(false);
    const [validatedData, setValidatedData] = React.useState();
    const [error, setError] = React.useState();
    const { properties } = schema;
    const onBeforeSubmit = () => {
        setIsSubmiting(true);
    };
    const onAfterSubmit = () => {
        setIsSubmiting(false);
    };
    const onSubmitError = () => {
        setIsError(true);
    };
    const onSubmitSuccess = () => {
        setIsSuccess(true);
    };
    const defaultOnSubmit = async (promise) => {
        try {
            onBeforeSubmit();
            await promise;
            onSubmitSuccess();
        }
        catch (error) {
            setIsError(true);
            setError(error);
            onSubmitError();
        }
        finally {
            onAfterSubmit();
        }
    };
    const defaultSubmitPromise = (data) => {
        const options = {
            method: "POST",
            url: `${serverUrl}/api/g/${schema.title}`,
            headers: {
                Apikey: "YOUR_SECRET_TOKEN",
                "Content-Type": "application/json",
            },
            data: clearEmptyString(data),
        };
        return axios.request(options);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFormSubmit = async (data) => {
        if (onSubmit === undefined) {
            await defaultOnSubmit(defaultSubmitPromise(data));
            return;
        }
        await defaultOnSubmit(onSubmit(data));
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onValid = (data) => {
        setValidatedData(data);
        setIsError(false);
        setIsConfirming(true);
    };
    const renderOrder = (order, origin_list) => {
        const not_exist = origin_list.filter((columnA) => !order.some((columnB) => columnA === columnB));
        return [...order, ...not_exist];
    };
    const ordered = renderOrder(order, Object.keys(properties));
    const getDataListProps = (value) => {
        if (value == undefined || value.length <= 0) {
            return {
                value: `<${empty ?? "Empty"}>`,
                color: "gray.400",
            };
        }
        return {
            value: value,
        };
    };
    if (isSuccess) {
        return (jsxRuntime.jsxs(react.Grid, { gap: 2, children: [jsxRuntime.jsx(react.Heading, { children: title ?? snakeToLabel(schema.title ?? "") }), jsxRuntime.jsxs(react.Alert.Root, { status: "success", children: [jsxRuntime.jsx(react.Alert.Indicator, {}), jsxRuntime.jsx(react.Alert.Title, { children: submitSuccess ?? "Data uploaded to the server. Fire on!" })] }), jsxRuntime.jsx(Button, { onClick: () => {
                        setIsError(false);
                        setIsSubmiting(false);
                        setIsSuccess(false);
                        setIsConfirming(false);
                        setValidatedData(undefined);
                        methods.reset();
                    }, formNoValidate: true, children: submitAgain ?? "Submit Again" })] }));
    }
    if (isConfirming) {
        return (jsxRuntime.jsxs(react.Grid, { gap: 2, children: [jsxRuntime.jsx(react.Heading, { children: title ?? snakeToLabel(schema.title ?? "") }), jsxRuntime.jsx(DataListRoot, { orientation: "horizontal", gap: 4, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: `repeat(${rowNumber ?? "auto-fit"}, auto)`, children: ordered.map((column) => {
                        if (properties === undefined) {
                            return jsxRuntime.jsx(jsxRuntime.Fragment, {});
                        }
                        const key = column;
                        const values = properties[column];
                        const shouldIgnore = ignore.some((column) => {
                            return column == key;
                        });
                        if (shouldIgnore) {
                            return jsxRuntime.jsx(jsxRuntime.Fragment, {});
                        }
                        const { type, variant, gridColumn, gridRow, foreign_key } = values;
                        if (type === "string") {
                            if (variant === "id-picker") {
                                idPickerSanityCheck(column, foreign_key);
                                return (jsxRuntime.jsx(IdViewer, { value: (validatedData ?? {})[column], column,
                                    dataListItemProps: { gridColumn, gridRow } }, `form-${key}`));
                            }
                            if (variant === "date-picker") {
                                const value = (validatedData ?? {})[column];
                                if (!!value === false) {
                                    return (jsxRuntime.jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", label: `${snakeToLabel(column)}`, ...getDataListProps(undefined) }, `form-${key}`));
                                }
                                const date = dayjs(value).format("YYYY-MM-DD");
                                return (jsxRuntime.jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", label: `${snakeToLabel(column)}`, ...getDataListProps(date) }, `form-${key}`));
                            }
                            return (jsxRuntime.jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 4", label: `${snakeToLabel(column)}`, ...getDataListProps((validatedData ?? {})[column]) }, `form-${key}`));
                        }
                        if (type === "object") {
                            const value = (validatedData ?? {})[column];
                            if (!!value === false) {
                                return (jsxRuntime.jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", label: `${snakeToLabel(column)}`, ...getDataListProps(undefined) }, `form-${key}`));
                            }
                            return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: 2, gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", children: [jsxRuntime.jsx(react.Text, { children: snakeToLabel(column) }), jsxRuntime.jsx(DataListRoot, { orientation: "horizontal", padding: 4, borderColor: "gray.200", borderWidth: 1, borderRadius: 4, children: Object.entries(value).map(([key, value]) => {
                                            return (jsxRuntime.jsx(DataListItem, { label: `${key}`, ...getDataListProps(value) }, `form-${column}-${key}`));
                                        }) })] }, `form-${key}`));
                        }
                        if (type === "boolean") {
                            return (jsxRuntime.jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 4", label: `${snakeToLabel(column)}`, ...getDataListProps((validatedData ?? {})[column]) }, `form-${key}`));
                        }
                        if (type === "number" || type === "integer") {
                            return (jsxRuntime.jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 4", label: `${snakeToLabel(column)}`, ...getDataListProps((validatedData ?? {})[column]) }, `form-${key}`));
                        }
                        if (type === "array") {
                            if (variant === "tag-picker") {
                                const value = (validatedData ?? {})[column];
                                return (jsxRuntime.jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", label: `${snakeToLabel(column)}`, ...getDataListProps(JSON.stringify(value)) }, `form-${key}`));
                            }
                            if (variant === "file-picker") {
                                const fileNames = ((validatedData ?? {})[column] ?? []).map((file) => {
                                    return file.name;
                                });
                                return (jsxRuntime.jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 4", label: `${snakeToLabel(column)}`, ...getDataListProps(JSON.stringify(fileNames)) }, `form-${key}`));
                            }
                            if (variant === "id-picker") {
                                const value = (validatedData ?? {})[column];
                                if (schema.properties == undefined) {
                                    throw new Error("schema properties when using DatePicker");
                                }
                                const { foreign_key } = schema.properties[column];
                                if (foreign_key === undefined) {
                                    throw new Error("foreign_key when variant is id-picker");
                                }
                                const { display_column } = foreign_key;
                                const mapped = value.map((item) => {
                                    return idMap[item][display_column];
                                });
                                return (jsxRuntime.jsxs(react.Grid, { flexFlow: "column", gridColumn,
                                    gridRow, children: [jsxRuntime.jsx(react.Text, { children: snakeToLabel(column) }), jsxRuntime.jsx(RecordDisplay, { object: mapped })] }, `form-${key}`));
                            }
                            const objectString = JSON.stringify((validatedData ?? {})[column]);
                            return (jsxRuntime.jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 4", label: `${snakeToLabel(column)}`, ...getDataListProps(objectString) }, `form-${key}`));
                        }
                        if (type === "null") {
                            return jsxRuntime.jsx(jsxRuntime.Fragment, { children: `null ${column}` });
                        }
                        return jsxRuntime.jsx(jsxRuntime.Fragment, { children: `unknown type ${column}` });
                    }) }), jsxRuntime.jsx(Button, { onClick: () => {
                        onFormSubmit(validatedData);
                    }, children: confirm ?? "Confirm" }), jsxRuntime.jsx(Button, { onClick: () => {
                        setIsConfirming(false);
                    }, variant: "subtle", children: cancel ?? "Cancel" }), isSubmiting && (jsxRuntime.jsx(react.Box, { pos: "absolute", inset: "0", bg: "bg/80", children: jsxRuntime.jsx(react.Center, { h: "full", children: jsxRuntime.jsx(react.Spinner, { color: "teal.500" }) }) })), isError && (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(react.Alert.Root, { status: "error", children: jsxRuntime.jsx(react.Alert.Title, { children: jsxRuntime.jsx(AccordionRoot, { collapsible: true, defaultValue: ["b"], children: jsxRuntime.jsxs(AccordionItem, { value: "b", children: [jsxRuntime.jsxs(AccordionItemTrigger, { children: [jsxRuntime.jsx(react.Alert.Indicator, {}), `${error}`] }), jsxRuntime.jsx(AccordionItemContent, { children: `${JSON.stringify(error)}` })] }) }) }) }) }))] }));
    }
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs(react.Grid, { gap: 2, children: [jsxRuntime.jsx(react.Heading, { children: title ?? snakeToLabel(schema.title ?? "") }), jsxRuntime.jsx(react.Grid, { gap: 4, gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: `repeat(${rowNumber ?? "auto-fit"}, auto)`, children: ordered.map((column) => {
                            if (properties === undefined) {
                                return jsxRuntime.jsx(jsxRuntime.Fragment, {});
                            }
                            const key = column;
                            const values = properties[column];
                            const shouldIgnore = ignore.some((column) => {
                                return column == key;
                            });
                            if (shouldIgnore) {
                                return jsxRuntime.jsx(jsxRuntime.Fragment, {});
                            }
                            //@ts-expect-error TODO: add more fields to support form-creation
                            const { type, variant, foreign_key } = values;
                            if (type === "string") {
                                // @ts-expect-error enum should exists
                                if ((values.enum ?? []).length > 0) {
                                    return jsxRuntime.jsx(EnumPicker, { column: key }, `form-${key}`);
                                }
                                if (variant === "id-picker") {
                                    idPickerSanityCheck(column, foreign_key);
                                    return jsxRuntime.jsx(IdPicker, { column: key }, `form-${key}`);
                                }
                                if (variant === "date-picker") {
                                    return jsxRuntime.jsx(DatePicker, { column: key }, `form-${key}`);
                                }
                                return jsxRuntime.jsx(StringInputField, { column: key }, `form-${key}`);
                            }
                            if (type === "number" || type === "integer") {
                                return jsxRuntime.jsx(NumberInputField, { column: key }, `form-${key}`);
                            }
                            if (type === "boolean") {
                                return jsxRuntime.jsx(BooleanPicker, { column: key }, `form-${key}`);
                            }
                            if (type === "object") {
                                return jsxRuntime.jsx(ObjectInput, { column: key }, `form-${key}`);
                            }
                            if (type === "array") {
                                if (variant === "id-picker") {
                                    idPickerSanityCheck(column, foreign_key);
                                    return jsxRuntime.jsx(IdPicker, { column: key, isMultiple: true }, `form-${key}`);
                                }
                                if (variant === "tag-picker") {
                                    return jsxRuntime.jsx(TagPicker, { column: key }, `form-${key}`);
                                }
                                if (variant === "file-picker") {
                                    return jsxRuntime.jsx(FilePicker, { column: key }, `form-${key}`);
                                }
                                return jsxRuntime.jsx(react.Text, { children: `array ${column}` }, `form-${key}`);
                            }
                            if (type === "null") {
                                return jsxRuntime.jsx(react.Text, { children: `null ${column}` }, `form-${key}`);
                            }
                            return jsxRuntime.jsx(react.Text, { children: "missing type" }, `form-${key}`);
                        }) }), jsxRuntime.jsx(Button, { onClick: () => {
                            methods.handleSubmit(onValid)();
                        }, formNoValidate: true, children: submit ?? "Submit" })] }), isError && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: ["isError", jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [" ", `${error}`] })] }))] }));
};
const Form = ({ schema, serverUrl, order = [], ignore = [], onSubmit = undefined, preLoadedValues = {}, rowNumber = undefined, displayText = {}, }) => {
    const queryClient = new reactQuery.QueryClient();
    const methods = reactHookForm.useForm({ values: preLoadedValues });
    const [idMap, setIdMap] = React.useState({});
    const { properties } = schema;
    idListSanityCheck("order", order, properties);
    idListSanityCheck("ignore", ignore, properties);
    idListSanityCheck("preLoadedValues", Object.keys(preLoadedValues), properties);
    return (jsxRuntime.jsx(reactQuery.QueryClientProvider, { client: queryClient, children: jsxRuntime.jsx(SchemaFormContext.Provider, { value: {
                schema,
                serverUrl,
                displayText,
                order,
                ignore,
                // @ts-expect-error TODO: find appropriate types
                onSubmit,
                rowNumber,
                idMap,
                setIdMap,
            }, children: jsxRuntime.jsx(reactHookForm.FormProvider, { ...methods, children: jsxRuntime.jsx(FormInternal, {}) }) }) }));
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

exports.CardHeader = CardHeader;
exports.DataDisplay = DataDisplay;
exports.DataTable = DataTable;
exports.DataTableServer = DataTableServer;
exports.DefaultCardTitle = DefaultCardTitle;
exports.DefaultTable = DefaultTable;
exports.DensityToggleButton = DensityToggleButton;
exports.EditFilterButton = EditFilterButton;
exports.EditOrderButton = EditOrderButton;
exports.EditSortingButton = EditSortingButton;
exports.EditViewButton = EditViewButton;
exports.EmptyState = EmptyState;
exports.ErrorAlert = ErrorAlert;
exports.FilterOptions = FilterOptions;
exports.Form = Form;
exports.GlobalFilter = GlobalFilter;
exports.PageSizeControl = PageSizeControl;
exports.RecordDisplay = RecordDisplay;
exports.ReloadButton = ReloadButton;
exports.ResetFilteringButton = ResetFilteringButton;
exports.ResetSelectionButton = ResetSelectionButton;
exports.ResetSortingButton = ResetSortingButton;
exports.RowCountText = RowCountText;
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCardContainer = TableCardContainer;
exports.TableCards = TableCards;
exports.TableComponent = TableComponent;
exports.TableControls = TableControls;
exports.TableFilter = TableFilter;
exports.TableFilterTags = TableFilterTags;
exports.TableFooter = TableFooter;
exports.TableHeader = TableHeader;
exports.TableLoadingComponent = TableLoadingComponent;
exports.TableOrderer = TableOrderer;
exports.TablePagination = TablePagination;
exports.TableSelector = TableSelector;
exports.TableSorter = TableSorter;
exports.TableViewer = TableViewer;
exports.TextCell = TextCell;
exports.getColumns = getColumns;
exports.getMultiDates = getMultiDates;
exports.getRangeDates = getRangeDates;
exports.useDataTable = useDataTable;
exports.useDataTableContext = useDataTableContext;
exports.useDataTableServer = useDataTableServer;
exports.widthSanityCheck = widthSanityCheck;
