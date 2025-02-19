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
var hi2 = require('react-icons/hi2');
var reactTable = require('@tanstack/react-table');
var matchSorterUtils = require('@tanstack/match-sorter-utils');
var bs = require('react-icons/bs');
var gr = require('react-icons/gr');
var reactQuery = require('@tanstack/react-query');
var io5 = require('react-icons/io5');
var hi = require('react-icons/hi');
var adapter = require('@atlaskit/pragmatic-drag-and-drop/element/adapter');
var invariant = require('tiny-invariant');
var axios = require('axios');
var usehooks = require('@uidotdev/usehooks');
var reactHookForm = require('react-hook-form');
var dayjs = require('dayjs');
var adapter$1 = require('@atlaskit/pragmatic-drag-and-drop/external/adapter');
var file = require('@atlaskit/pragmatic-drag-and-drop/external/file');
var text = require('@atlaskit/pragmatic-drag-and-drop/external/text');

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
React__namespace.forwardRef(function PaginationPageText(props, ref) {
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
                                return (jsxRuntime.jsxs(react.DataList.Item, { children: [jsxRuntime.jsx(react.DataList.ItemLabel, { children: snakeToLabel(cell.column.id) }), jsxRuntime.jsx(react.DataList.ItemValue, { wordBreak: "break-word", textOverflow: "ellipsis", overflow: "hidden", children: `${formatValue(cell.getValue())}` })] }, cell.id));
                            }) }) }) }, `chakra-table-card-${row.id}`));
            }) }));
    }
    if (variant == "stats") {
        return (jsxRuntime.jsx(react.Flex, { flexFlow: "column", gap: "1", children: table.getRowModel().rows.map((row) => {
                return (jsxRuntime.jsx(react.Card.Root, { children: jsxRuntime.jsx(react.Card.Body, { children: jsxRuntime.jsx(react.DataList.Root, { gap: 4, padding: 4, display: "flex", flexFlow: "row", variant: "subtle", overflow: "auto", children: row.getVisibleCells().map((cell) => {
                                return (jsxRuntime.jsxs(react.DataList.Item, { display: "flex", justifyContent: "center", alignItems: "center", flex: "1 0 0%", children: [jsxRuntime.jsx(react.DataList.ItemLabel, { children: snakeToLabel(cell.column.id) }), jsxRuntime.jsx(react.DataList.ItemValue, { wordBreak: "break-word", textOverflow: "ellipsis", overflow: "hidden", children: `${formatValue(cell.getValue())}` })] }, cell.id));
                            }) }) }) }, `chakra-table-card-${row.id}`));
            }) }));
    }
    return (jsxRuntime.jsx(react.Flex, { flexFlow: "column", gap: "1", children: table.getRowModel().rows.map((row) => {
            return (jsxRuntime.jsx(react.Card.Root, { children: jsxRuntime.jsx(react.Card.Body, { children: jsxRuntime.jsx(react.DataList.Root, { gap: 4, padding: 4, display: "grid", variant: "subtle", gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))", children: row.getVisibleCells().map((cell) => {
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
            table: { ...table },
            globalFilter: globalFilter,
            setGlobalFilter: setGlobalFilter,
            type: "client",
        }, children: children }));
}

const DataTableServerContext = React.createContext({
    url: "",
});

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

const TableControls = ({ totalText = "Total:", fitTableWidth = false, fitTableHeight = false, isMobile = false, children = jsxRuntime.jsx(jsxRuntime.Fragment, {}), showGlobalFilter = false, showFilter = false, showFilterName = false, showFilterTags = false, showReload = false, filterOptions = [], extraItems = jsxRuntime.jsx(jsxRuntime.Fragment, {}), loading = false, hasError = false, }) => {
    return (jsxRuntime.jsxs(react.Grid, { templateRows: "auto 1fr auto", width: fitTableWidth ? "fit-content" : "100%", height: fitTableHeight ? "fit-content" : "100%", justifySelf: "center", alignSelf: "center", gap: "0.5rem", children: [jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: 2, children: [jsxRuntime.jsxs(react.Flex, { justifyContent: "space-between", children: [jsxRuntime.jsx(react.Box, { children: jsxRuntime.jsx(EditViewButton, { text: isMobile ? undefined : "View", icon: jsxRuntime.jsx(md.MdOutlineViewColumn, {}) }) }), jsxRuntime.jsxs(react.Flex, { gap: "0.5rem", alignItems: "center", justifySelf: "end", children: [loading && jsxRuntime.jsx(react.Spinner, { size: "sm" }), hasError && (jsxRuntime.jsx(Tooltip, { content: "An error occurred while fetching data", children: jsxRuntime.jsx(react.Icon, { as: bs.BsExclamationCircleFill, color: "red.400" }) })), showGlobalFilter && jsxRuntime.jsx(GlobalFilter, {}), showFilter && (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(EditFilterButton, { text: isMobile ? undefined : "Advanced Filter" }) })), showReload && jsxRuntime.jsx(ReloadButton, {}), extraItems] })] }), filterOptions.length > 0 && (jsxRuntime.jsx(react.Flex, { flexFlow: "column", gap: "0.5rem", children: filterOptions.map((column) => {
                            return (jsxRuntime.jsxs(react.Flex, { alignItems: "center", flexFlow: "wrap", gap: "0.5rem", children: [showFilterName && jsxRuntime.jsxs(react.Text, { children: [column, ":"] }), jsxRuntime.jsx(FilterOptions, { column: column })] }, column));
                        }) })), showFilterTags && (jsxRuntime.jsx(react.Flex, { children: jsxRuntime.jsx(TableFilterTags, {}) }))] }), jsxRuntime.jsx(react.Box, { overflow: "auto", width: "100%", height: "100%", backgroundColor: "gray.50", _dark: {
                    backgroundColor: "gray.900",
                }, children: children }), jsxRuntime.jsxs(react.Flex, { justifyContent: "space-between", children: [jsxRuntime.jsxs(react.Flex, { gap: "1rem", alignItems: "center", children: [jsxRuntime.jsx(PageSizeControl, {}), jsxRuntime.jsxs(react.Flex, { children: [jsxRuntime.jsx(react.Text, { paddingRight: "0.5rem", children: totalText }), jsxRuntime.jsx(RowCountText, {})] })] }), jsxRuntime.jsx(react.Box, { justifySelf: "end", children: jsxRuntime.jsx(TablePagination, {}) })] })] }));
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
                zIndex: 1,
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
                        flex: `${canResize ? "0" : "1"} 0 ${header.column.getSize()}px`, display: "grid", gridTemplateColumns: "1fr auto", zIndex: header.index, ...getThProps(header), children: [jsxRuntime.jsxs(MenuRoot, { children: [jsxRuntime.jsx(MenuTrigger, { asChild: true, children: jsxRuntime.jsx(react.Flex, { padding: `${table.getDensityValue()}px`, alignItems: "center", justifyContent: "start", borderRadius: "0rem", overflow: "auto", _hover: {
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

const DefaultTable = ({ showFooter = false, tableProps = {}, tableHeaderProps = {}, tableBodyProps = {}, controlProps = {}, tableFooterProps = {}, variant = "", }) => {
    if (variant === "greedy") {
        return (jsxRuntime.jsx(TableControls, { ...controlProps, children: jsxRuntime.jsxs(Table, { canResize: false, ...tableProps, children: [jsxRuntime.jsx(TableHeader, { canResize: false, ...tableHeaderProps }), jsxRuntime.jsx(TableBody, { canResize: false, ...tableBodyProps }), showFooter && (jsxRuntime.jsx(TableFooter, { canResize: false, ...tableFooterProps }))] }) }));
    }
    return (jsxRuntime.jsx(TableControls, { ...controlProps, children: jsxRuntime.jsxs(Table, { ...tableProps, children: [jsxRuntime.jsx(TableHeader, { ...tableHeaderProps }), jsxRuntime.jsx(TableBody, { ...tableBodyProps }), showFooter && jsxRuntime.jsx(TableFooter, { ...tableFooterProps })] }) }));
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
    return (jsxRuntime.jsx(react.Table.Root, { stickyHeader: true, variant: "outline", width: canResize ? table.getCenterTotalSize() : undefined, ...props, children: children }));
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
        return adapter.draggable({
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
        return adapter.dropTargetForElements({
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
        return adapter.monitorForElements({
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
                        return jsxRuntime.jsx(TextCell, { children: JSON.stringify(value) });
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

//@ts-expect-error TODO: find appropriate type
const SchemaFormContext = React.createContext({
    schema: {},
    serverUrl: "",
    order: [],
    ignore: [],
    onSubmit: async () => { },
    preLoadedValues: {},
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
    const { schema, serverUrl, order, ignore, onSubmit, preLoadedValues, rowNumber, displayText, } = React.useContext(SchemaFormContext);
    return {
        schema,
        serverUrl,
        order,
        ignore,
        onSubmit,
        preLoadedValues,
        rowNumber,
        displayText,
    };
};

const getTableData = async ({ serverUrl, in_table, searching = "", where = [], limit = 10, }) => {
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

const IdPicker = ({ column, in_table, column_ref, display_column, isMultiple = false, }) => {
    const { watch, formState: { errors }, setValue, } = reactHookForm.useFormContext();
    const { schema, serverUrl, displayText } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using DatePicker");
    }
    const { total, showing, close, typeToSearch, showMore } = displayText;
    const { gridColumn, gridRow, title, renderDisplay } = schema.properties[column];
    const [selectedIds, setSelectedIds] = React.useState([]);
    const [searchText, setSearchText] = React.useState();
    const [limit, setLimit] = React.useState(10);
    const [openSearchResult, setOpenSearchResult] = React.useState();
    const [idMap, setIdMap] = React.useState({});
    const ref = React.useRef(null);
    const query = reactQuery.useQuery({
        queryKey: [`idpicker`, searchText, in_table, limit],
        queryFn: async () => {
            return await getTableData({
                serverUrl,
                searching: searchText ?? "",
                in_table: in_table,
                limit: limit,
            });
        },
        staleTime: 10000,
    });
    const { isLoading, isFetching, data, isPending, isError } = query;
    const dataList = data?.data ?? [];
    const count = data?.count ?? 0;
    const isDirty = (searchText?.length ?? 0) > 0;
    const onSearchChange = async (event) => {
        setSearchText(event.target.value);
        setLimit(10);
    };
    const ids = (watch(column) ?? []);
    const newIdMap = React.useMemo(() => Object.fromEntries(dataList.map((item) => {
        return [
            item[column_ref],
            {
                ...item,
            },
        ];
    })), [dataList, column_ref]);
    React.useEffect(() => {
        setIdMap((state) => {
            return { ...state, ...newIdMap };
        });
    }, [newIdMap]);
    return (jsxRuntime.jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [isMultiple && (jsxRuntime.jsxs(react.Flex, { flexFlow: "wrap", gap: 1, children: [selectedIds.map((id) => {
                        const item = idMap[id];
                        if (item === undefined) {
                            return jsxRuntime.jsx(jsxRuntime.Fragment, { children: "undefined" });
                        }
                        return (jsxRuntime.jsx(Tag, { closable: true, onClick: () => {
                                setSelectedIds((state) => state.filter((id) => id != item[column_ref]));
                                setValue(column, ids.filter((id) => id != item[column_ref]));
                            }, children: !!renderDisplay === true
                                ? renderDisplay(item)
                                : item[display_column] }));
                    }), jsxRuntime.jsx(Tag, { cursor: "pointer", onClick: () => {
                            setOpenSearchResult(true);
                        }, children: "Add" })] })), !isMultiple && (jsxRuntime.jsx(Button, { variant: "outline", onClick: (event) => {
                    setOpenSearchResult(true);
                }, children: selectedIds[0] ? idMap[selectedIds[0]][display_column] ?? "" : "" })), jsxRuntime.jsxs(PopoverRoot, { open: openSearchResult, onOpenChange: (e) => setOpenSearchResult(e.open), closeOnInteractOutside: true, initialFocusEl: () => ref.current, positioning: { placement: "bottom-start" }, children: [jsxRuntime.jsx(PopoverTrigger, {}), jsxRuntime.jsx(PopoverContent, { children: jsxRuntime.jsxs(PopoverBody, { children: [jsxRuntime.jsx(react.Input, { placeholder: typeToSearch, onChange: (event) => {
                                        onSearchChange(event);
                                        setOpenSearchResult(true);
                                    }, autoComplete: "off", ref: ref }), jsxRuntime.jsx(PopoverTitle, {}), jsxRuntime.jsxs(react.Grid, { gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", overflow: "auto", maxHeight: "50vh", children: [isFetching && jsxRuntime.jsx(jsxRuntime.Fragment, { children: "isFetching" }), isLoading && jsxRuntime.jsx(jsxRuntime.Fragment, { children: "isLoading" }), isPending && jsxRuntime.jsx(jsxRuntime.Fragment, { children: "isPending" }), isError && jsxRuntime.jsx(jsxRuntime.Fragment, { children: "isError" }), jsxRuntime.jsx(react.Text, { children: `${total ?? "Total"} ${count}, ${showing ?? "Showing"} ${limit}` }), jsxRuntime.jsx(Button, { onClick: async () => {
                                                setOpenSearchResult(false);
                                            }, children: close ?? "Close" }), jsxRuntime.jsx(react.Flex, { flexFlow: "column wrap", children: 
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            dataList.map((item) => {
                                                const selected = ids.some((id) => item[column_ref] === id);
                                                return (jsxRuntime.jsx(react.Box, { cursor: "pointer", onClick: () => {
                                                        if (!isMultiple) {
                                                            setOpenSearchResult(false);
                                                            setSelectedIds(() => [item[column_ref]]);
                                                            setValue(column, [item[column_ref]]);
                                                            return;
                                                        }
                                                        const newSet = new Set([
                                                            ...(ids ?? []),
                                                            item[column_ref],
                                                        ]);
                                                        setSelectedIds(() => [...newSet]);
                                                        setValue(column, [...newSet]);
                                                    }, opacity: 0.7, _hover: { opacity: 1 }, ...(selected ? { color: "gray.400/50" } : {}), children: !!renderDisplay === true
                                                        ? renderDisplay(item)
                                                        : item[display_column] }));
                                            }) }), isDirty && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [dataList.length <= 0 && jsxRuntime.jsx(jsxRuntime.Fragment, { children: "Empty Search Result" }), " "] })), count > dataList.length && (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(Button, { onClick: async () => {
                                                    setLimit((limit) => limit + 10);
                                                    await getTableData({
                                                        serverUrl,
                                                        searching: searchText ?? "",
                                                        in_table: in_table,
                                                        limit: limit + 10,
                                                    });
                                                }, children: showMore ?? "Show More" }) }))] })] }) })] }), errors[`${column}`] && (jsxRuntime.jsx(react.Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
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

const IdViewer = ({ value, in_table, column_ref, display_column, column, }) => {
    const { schema, serverUrl } = useSchemaContext();
    if (schema.properties == undefined) {
        throw new Error("schema properties when using DatePicker");
    }
    const { title } = schema.properties[column];
    const query = reactQuery.useQuery({
        queryKey: [`idpicker`, in_table, value],
        queryFn: async () => {
            return await getTableData({
                serverUrl,
                in_table: in_table,
                where: [
                    {
                        id: column_ref,
                        value: value,
                    },
                ],
            });
        },
        staleTime: 10000,
    });
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
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(DataListItem, { label: `${title ?? snakeToLabel(column)}`, ...getDataListProps((query.data?.data[0] ?? {})[display_column]) }) }));
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
    const { formState: { errors }, setValue, getValues, } = reactHookForm.useFormContext();
    const { schema, displayText } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using BooleanPicker");
    }
    const { gridColumn, gridRow, title } = schema.properties[column];
    return (jsxRuntime.jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [jsxRuntime.jsx(CheckboxCard
            // label={snakeToLabel(column)}
            , { 
                // label={snakeToLabel(column)}
                value: getValues(column), variant: "surface", onSelect: () => {
                    setValue(column, !getValues(column));
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
    const { formState: { errors }, setValue, getValues, } = reactHookForm.useFormContext();
    const { schema, displayText } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const [open, setOpen] = React.useState(false);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using DatePicker");
    }
    const { gridColumn, gridRow, title } = schema.properties[column];
    return (jsxRuntime.jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [jsxRuntime.jsxs(PopoverRoot, { open: open, onOpenChange: (e) => setOpen(e.open), closeOnInteractOutside: true, positioning: { sameWidth: true }, children: [jsxRuntime.jsx(PopoverTrigger, { asChild: true, children: jsxRuntime.jsx(Button, { size: "sm", variant: "outline", onClick: () => {
                                setOpen(true);
                            }, children: getValues(column) !== undefined
                                ? dayjs(getValues(column)).format("YYYY-MM-DD")
                                : "" }) }), jsxRuntime.jsx(PopoverContent, { width: "auto", children: jsxRuntime.jsxs(PopoverBody, { children: [jsxRuntime.jsx(PopoverTitle, {}), jsxRuntime.jsx(DatePicker$1, { selected: new Date(getValues(column)), onDateSelected: ({ selected, selectable, date }) => {
                                        setValue(column, dayjs(date).format("YYYY-MM-DD"));
                                        setOpen(false);
                                    } })] }) })] }), errors[`${column}`] && (jsxRuntime.jsx(react.Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
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
                                }) }) }))] }));
            }), errors[`${column}`] && (jsxRuntime.jsx(react.Text, { color: "red.400", children: (errors[`${column}`]?.message ?? "No error message") }))] }));
};

const FileDropzone = ({ children = undefined, gridProps = {}, onDrop = () => { }, placeholder = "Drop files here or click to upload", }) => {
    const ref = React.useRef(null);
    const [isDraggedOver, setIsDraggedOver] = React.useState(false);
    React.useEffect(() => {
        const el = ref.current;
        invariant(el);
        return adapter$1.dropTargetForExternal({
            element: el,
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            //   canDrop: some(containsFiles, containsText),
            onDrop: ({ source }) => {
                const files = file.getFiles({ source });
                const text$1 = text.getText({ source });
                console.log(files, text$1, "dfposa");
                onDrop({ files, text: text$1 });
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

const EnumPicker = ({ column, isMultiple = false }) => {
    const { watch, formState: { errors }, setValue, } = reactHookForm.useFormContext();
    const { schema, serverUrl, displayText } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using DatePicker");
    }
    const { gridColumn, gridRow, title, renderDisplay } = schema.properties[column];
    const [selectedEnums, setSelectedEnums] = React.useState([]);
    const [searchText, setSearchText] = React.useState();
    const [limit, setLimit] = React.useState(10);
    const [openSearchResult, setOpenSearchResult] = React.useState();
    const ref = React.useRef(null);
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
        gridRow, children: [isMultiple && (jsxRuntime.jsxs(react.Flex, { flexFlow: "wrap", gap: 1, children: [selectedEnums.map((enumValue) => {
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
                        }, children: "Add" })] })), !isMultiple && (jsxRuntime.jsx(Button, { variant: "outline", onClick: (event) => {
                    setOpenSearchResult(true);
                }, children: selectedEnums[0] })), jsxRuntime.jsxs(PopoverRoot, { open: openSearchResult, onOpenChange: (e) => setOpenSearchResult(e.open), closeOnInteractOutside: true, initialFocusEl: () => ref.current, positioning: { placement: "bottom-start" }, children: [jsxRuntime.jsx(PopoverTrigger, {}), jsxRuntime.jsx(PopoverContent, { children: jsxRuntime.jsxs(PopoverBody, { children: [jsxRuntime.jsx(react.Input, { placeholder: "Type to search", onChange: (event) => {
                                        onSearchChange(event);
                                        setOpenSearchResult(true);
                                    }, autoComplete: "off", ref: ref }), jsxRuntime.jsx(PopoverTitle, {}), jsxRuntime.jsxs(react.Grid, { gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", overflow: "auto", maxHeight: "50vh", children: [jsxRuntime.jsx(react.Text, { children: `Search Result: ${count}, Showing ${limit}` }), jsxRuntime.jsx(Button, { onClick: async () => {
                                                setOpenSearchResult(false);
                                            }, children: "close" }), jsxRuntime.jsx(react.Flex, { flexFlow: "column wrap", children: dataList.map((item) => {
                                                const selected = watchEnums.some((enumValue) => item === enumValue);
                                                return (jsxRuntime.jsx(react.Box, { cursor: "pointer", onClick: () => {
                                                        if (!isMultiple) {
                                                            setOpenSearchResult(false);
                                                            setSelectedEnums(() => [item]);
                                                            setValue(column, [item]);
                                                            return;
                                                        }
                                                        const newSet = new Set([...(watchEnums ?? []), item]);
                                                        setSelectedEnums(() => [...newSet]);
                                                        setValue(column, [...newSet]);
                                                    }, ...(selected ? { color: "gray.400/50" } : {}), children: !!renderDisplay === true ? renderDisplay(item) : item }, `${column}-${item}`));
                                            }) }), isDirty && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [dataList.length <= 0 && jsxRuntime.jsx(jsxRuntime.Fragment, { children: "Empty Search Result" }), " "] }))] })] }) })] }), errors[`${column}`] && (jsxRuntime.jsx(react.Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
};

const idPickerSanityCheck = (column, in_table, column_ref, display_column) => {
    if (!!in_table == false) {
        throw new Error(`The key in_table does not exist in properties of column ${column}.`);
    }
    if (!!column_ref == false) {
        throw new Error(`The key column_ref does not exist in properties of column ${column}.`);
    }
    if (!!display_column == false) {
        throw new Error(`The key display_column does not exist in properties of column ${column}.`);
    }
};
const FormInternal = () => {
    const { schema, serverUrl, displayText, order, ignore, onSubmit, preLoadedValues, rowNumber, } = useSchemaContext();
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
    React.useEffect(() => {
        const loadData = () => {
            Object.entries(preLoadedValues).map(([column, value]) => {
                methods.setValue(column, value);
            });
        };
        loadData();
    }, [preLoadedValues, methods]);
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
                        const { type, variant, in_table, column_ref, display_column, gridColumn, gridRow, } = values;
                        if (type === "string") {
                            if (variant === "id-picker") {
                                idPickerSanityCheck(column, in_table, column_ref, display_column);
                                return (jsxRuntime.jsx(IdViewer, { value: (validatedData ?? {})[column], in_table,
                                    column_ref,
                                    display_column,
                                    column,
                                    gridColumn,
                                    gridRow }, `form-${key}`));
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
                                        }) })] }));
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
                            const { type, variant, in_table, column_ref, display_column } = values;
                            if (type === "string") {
                                if ((values.enum ?? []).length > 0) {
                                    return jsxRuntime.jsx(EnumPicker, { column: key }, `form-${key}`);
                                }
                                if (variant === "id-picker") {
                                    idPickerSanityCheck(column, in_table, column_ref, display_column);
                                    return (jsxRuntime.jsx(IdPicker, { column: key, in_table: in_table, column_ref: column_ref, display_column: display_column }, `form-${key}`));
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
                                return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(ObjectInput, { column: key }, `form-${key}`) }));
                            }
                            if (type === "array") {
                                if (variant === "id-picker") {
                                    idPickerSanityCheck(column, in_table, column_ref, display_column);
                                    return (jsxRuntime.jsx(IdPicker, { column: key, in_table: in_table, column_ref: column_ref, display_column: display_column, isMultiple: true }, `form-${key}`));
                                }
                                if (variant === "tag-picker") {
                                    return jsxRuntime.jsx(TagPicker, { column: key }, `form-${key}`);
                                }
                                if (variant === "file-picker") {
                                    return jsxRuntime.jsx(FilePicker, { column: key }, `form-${key}`);
                                }
                                return jsxRuntime.jsx(jsxRuntime.Fragment, { children: `array ${column}` });
                            }
                            if (type === "null") {
                                return jsxRuntime.jsx(jsxRuntime.Fragment, { children: `null ${column}` });
                            }
                            return jsxRuntime.jsx(jsxRuntime.Fragment, { children: "missing type" });
                        }) }), jsxRuntime.jsx(Button, { onClick: () => {
                            methods.handleSubmit(onValid)();
                        }, formNoValidate: true, children: submit ?? "Submit" })] }), isError && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: ["isError", jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [" ", `${error}`] })] }))] }));
};
const Form = ({ schema, serverUrl, order = [], ignore = [], onSubmit = undefined, preLoadedValues = {}, rowNumber = undefined, displayText = {}, }) => {
    const queryClient = new reactQuery.QueryClient();
    const methods = reactHookForm.useForm();
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
                preLoadedValues,
                rowNumber,
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
