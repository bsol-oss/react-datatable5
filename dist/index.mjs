import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Button as Button$1, AbsoluteCenter, Spinner, Span, IconButton, Portal, Dialog, Flex, Text, useDisclosure, DialogBackdrop, RadioGroup as RadioGroup$1, Grid, Box, Slider as Slider$1, HStack, For, Tag as Tag$1, Input, Menu, createRecipeContext, createContext as createContext$1, Pagination as Pagination$1, usePaginationContext, CheckboxCard as CheckboxCard$1, Image, EmptyState as EmptyState$2, VStack, Alert, Card, Tooltip as Tooltip$1, Group, InputElement, Icon, List, Table as Table$1, Checkbox as Checkbox$1, MenuRoot as MenuRoot$1, MenuTrigger as MenuTrigger$1, Accordion, Field as Field$1, Popover, NumberInput, Show, RadioCard, CheckboxGroup, Textarea, createListCollection, Select, Center, Heading } from '@chakra-ui/react';
import { AiOutlineColumnWidth } from 'react-icons/ai';
import * as React from 'react';
import React__default, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { LuX, LuCheck, LuChevronRight, LuChevronDown } from 'react-icons/lu';
import { MdOutlineSort, MdFilterAlt, MdSearch, MdClose, MdOutlineViewColumn, MdFilterListAlt, MdPushPin, MdCancel, MdClear, MdOutlineChecklist, MdDateRange } from 'react-icons/md';
import { FaUpDown, FaGripLinesVertical } from 'react-icons/fa6';
import { BiDownArrow, BiUpArrow, BiError } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import Dayzed from '@bsol-oss/dayzed-react19';
import { HiMiniEllipsisHorizontal, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { IoMdEye, IoMdCheckbox, IoMdClock } from 'react-icons/io';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { bind, bindAll } from 'bind-event-listener';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import rafSchd from 'raf-schd';
import invariant from 'tiny-invariant';
import { HiColorSwatch } from 'react-icons/hi';
import { flexRender, makeStateUpdater, functionalUpdate, useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, createColumnHelper } from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { useDebounce } from '@uidotdev/usehooks';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { IoReload } from 'react-icons/io5';
import { GrAscend, GrDescend } from 'react-icons/gr';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FormProvider, useFormContext, useForm as useForm$1 } from 'react-hook-form';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { TiDeleteOutline } from 'react-icons/ti';

const DataTableContext = createContext({
    table: {},
    globalFilter: "",
    setGlobalFilter: () => { },
    type: "client",
    translate: {},
    data: [],
    columns: [],
    columnOrder: [],
    columnFilters: [],
    density: "sm",
    sorting: [],
    setPagination: function () {
        throw new Error("Function not implemented.");
    },
    setSorting: function () {
        throw new Error("Function not implemented.");
    },
    setColumnFilters: function () {
        throw new Error("Function not implemented.");
    },
    setRowSelection: function () {
        throw new Error("Function not implemented.");
    },
    setColumnOrder: function () {
        throw new Error("Function not implemented.");
    },
    setDensity: function () {
        throw new Error("Function not implemented.");
    },
    setColumnVisibility: function () {
        throw new Error("Function not implemented.");
    },
    pagination: {
        pageIndex: 0,
        pageSize: 10,
    },
    rowSelection: {},
    columnVisibility: {},
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

const ResetSortingButton = ({ text = "Reset Sorting", }) => {
    const { table } = useDataTableContext();
    return (jsx(Button$1, { onClick: () => {
            table.resetSorting();
        }, children: text }));
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
        return (jsxs(Grid, { onMouseLeave: onMouseLeave, children: [jsxs(Grid, { templateColumns: "repeat(4, auto)", justifyContent: "center", children: [jsx(Button$1, { variant: "ghost", ...getBackProps({
                                calendars,
                                offset: 12,
                            }), children: "<<" }), jsx(Button$1, { variant: "ghost", ...getBackProps({ calendars }), children: "Back" }), jsx(Button$1, { variant: "ghost", ...getForwardProps({ calendars }), children: "Next" }), jsx(Button$1, { variant: "ghost", ...getForwardProps({
                                calendars,
                                offset: 12,
                            }), children: ">>" })] }), jsx(Grid, { templateColumns: "repeat(2, auto)", justifyContent: "center", gap: 4, children: calendars.map((calendar) => (jsxs(Grid, { gap: 4, children: [jsxs(Grid, { justifyContent: "center", children: [monthNamesFull[calendar.month], " ", calendar.year] }), jsx(Grid, { templateColumns: "repeat(7, auto)", justifyContent: "center", children: [0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
                                    const weekday = (weekdayNum + firstDayOfWeek) % 7;
                                    return (jsx(Box, { minWidth: "48px", textAlign: "center", children: weekdayNamesShort$1[weekday] }, `${calendar.month}${calendar.year}${weekday}`));
                                }) }), jsx(Grid, { templateColumns: "repeat(7, auto)", justifyContent: "center", children: calendar.weeks.map((week, windex) => week.map((dateObj, index) => {
                                    const key = `${calendar.month}${calendar.year}${windex}${index}`;
                                    if (!dateObj) {
                                        return jsx(Box, {}, key);
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
                                        }), children: selectable ? date.getDate() : "X" }, key));
                                })) })] }, `${calendar.month}${calendar.year}`))) })] }));
    }
    return null;
}
class RangeDatePicker extends React__default.Component {
    render() {
        return (jsx(Dayzed, { onDateSelected: this.props.onDateSelected, selected: this.props.selected, firstDayOfWeek: this.props.firstDayOfWeek, showOutsideDays: this.props.showOutsideDays, date: this.props.date, minDate: this.props.minDate, maxDate: this.props.maxDate, monthsToDisplay: this.props.monthsToDisplay, render: (dayzedData) => (jsx(Calendar$1, { ...dayzedData,
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

const Tag = React.forwardRef(function Tag(props, ref) {
    const { startElement, endElement, onClose, closable = !!onClose, children, ...rest } = props;
    return (jsxs(Tag$1.Root, { ref: ref, ...rest, children: [startElement && (jsx(Tag$1.StartElement, { children: startElement })), jsx(Tag$1.Label, { children: children }), endElement && (jsx(Tag$1.EndElement, { children: endElement })), closable && (jsx(Tag$1.EndElement, { children: jsx(Tag$1.CloseTrigger, { onClick: onClose }) }))] }));
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
    return (jsx(Flex, { flexFlow: "wrap", p: "0.5rem", gap: "0.5rem", children: availableTags.map((tag) => (jsx(Tag, { variant: selectedTags.includes(tag) ? "solid" : "outline", cursor: "pointer", closable: selectedTags.includes(tag) ? true : undefined, onClick: () => toggleTag(tag), children: tag }))) }));
};

const Filter = ({ column }) => {
    const { filterVariant } = column.columnDef.meta ?? {};
    const displayName = column.columnDef.meta?.displayName ?? column.id;
    const filterOptions = column.columnDef.meta?.filterOptions ?? [];
    if (column.columns.length > 0) {
        return (jsxs(Flex, { flexFlow: "column", gap: 1, children: [jsx(Text, { children: displayName }), jsx(Grid, { gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))", gap: 1, children: column.columns.map((column) => {
                        return jsx(Filter, { column: column }, column.id);
                    }) }, column.id)] }));
    }
    if (!column.getCanFilter()) {
        return jsx(Fragment, {});
    }
    if (filterVariant === "select") {
        return (jsxs(Flex, { flexFlow: "column", gap: "0.25rem", children: [jsx(Text, { children: displayName }), jsx(RadioGroup, { value: column.getFilterValue() ? String(column.getFilterValue()) : "", onValueChange: (details) => {
                        column.setFilterValue(details.value);
                    }, children: jsx(Flex, { flexFlow: "wrap", gap: "0.5rem", children: filterOptions.map((item) => (jsx(Radio, { value: item, children: item }, item))) }) })] }, column.id));
    }
    if (filterVariant === "tag") {
        return (jsxs(Flex, { flexFlow: "column", gap: "0.25rem", children: [jsx(Text, { children: displayName }), jsx(TagFilter, { availableTags: filterOptions, selectedTags: (column.getFilterValue() ?? []), onTagChange: (tags) => {
                        if (tags.length === 0) {
                            return column.setFilterValue(undefined);
                        }
                        column.setFilterValue(tags);
                    } })] }, column.id));
    }
    if (filterVariant === "boolean") {
        return (jsxs(Flex, { flexFlow: "column", gap: "0.25rem", children: [jsx(Text, { children: displayName }), jsx(TagFilter, { availableTags: ["true", "false"], selectedTags: (column.getFilterValue() ?? []), onTagChange: (tags) => {
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
        return (jsxs(Flex, { flexFlow: "column", gap: "0.25rem", children: [jsx(Text, { children: displayName }), jsx(RangeFilter, { range: filterValue, setRange: function (value) {
                        // throw new Error("Function not implemented.");
                        column.setFilterValue(value);
                    }, defaultValue: defaultValue, min: min, max: max, step: step })] }, column.id));
    }
    if (filterVariant === "dateRange") {
        const filterValue = column.getFilterValue() ?? [];
        return (jsxs(Flex, { flexFlow: "column", gap: "0.25rem", children: [jsx(Text, { children: displayName }), jsx(RangeDatePicker, { selected: filterValue, onDateSelected: ({ selected, selectable, date }) => {
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
        return jsx(Fragment, { children: renderFilter(column) });
    }
    return (jsxs(Flex, { flexFlow: "column", gap: "0.25rem", children: [jsx(Text, { children: displayName }), jsx(Input, { value: column.getFilterValue() ? String(column.getFilterValue()) : "", onChange: (e) => {
                    column.setFilterValue(e.target.value);
                } })] }, column.id));
};
const TableFilter = () => {
    const { table } = useDataTableContext();
    return (jsx(Fragment, { children: table.getAllColumns().map((column) => {
            return jsx(Filter, { column: column }, column.id);
        }) }));
};

const ResetFilteringButton = ({ text = "Reset Filtering", }) => {
    const { table } = useDataTableContext();
    return (jsx(Button$1, { onClick: () => {
            table.resetColumnFilters();
        }, children: text }));
};

const FilterDialog = ({ icon = jsx(MdFilterAlt, {}), }) => {
    const filterModal = useDisclosure();
    const { translate } = useDataTableContext();
    return (jsxs(DialogRoot, { size: ["full", "full", "md", "md"], open: filterModal.open, children: [jsx(DialogTrigger, { asChild: true, children: jsxs(Button$1, { as: Box, variant: "ghost", onClick: filterModal.onOpen, children: [icon, " ", translate.t("filter_dialog.button_text")] }) }), jsxs(DialogContent, { children: [jsx(DialogHeader, { children: jsx(DialogTitle, { children: translate.t("filter_dialog.title") }) }), jsx(DialogBody, { display: "flex", flexFlow: "column", children: jsx(TableFilter, {}) }), jsxs(DialogFooter, { children: [jsx(ResetFilteringButton, { text: translate.t("filter_dialog.reset") }), jsx(Button$1, { onClick: filterModal.onClose, variant: "subtle", children: translate.t("filter_dialog.close") })] }), jsx(DialogCloseTrigger, { onClick: filterModal.onClose })] })] }));
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
    return (jsxs(MenuRoot, { children: [jsx(MenuTrigger, { asChild: true, children: jsxs(Button$1, { variant: "ghost", gap: "0.5rem", children: [table.getState().pagination.pageSize, " ", jsx(BiDownArrow, {})] }) }), jsx(MenuContent, { children: pageSizes.map((pageSize) => (jsx(MenuItem, { value: `chakra-table-pageSize-${pageSize}`, onClick: () => {
                        table.setPageSize(Number(pageSize));
                    }, children: pageSize }, `chakra-table-pageSize-${pageSize}`))) })] }));
};

const { withContext } = createRecipeContext({ key: "button" });
// Replace "a" with your framework's link component
const LinkButton = withContext("a");

const [RootPropsProvider, useRootProps] = createContext$1({
    name: "RootPropsProvider",
});
const variantMap = {
    outline: { default: "ghost", ellipsis: "plain", current: "outline" },
    solid: { default: "outline", ellipsis: "outline", current: "solid" },
    subtle: { default: "ghost", ellipsis: "plain", current: "subtle" },
};
const PaginationRoot = React.forwardRef(function PaginationRoot(props, ref) {
    const { size = "sm", variant = "outline", getHref, ...rest } = props;
    return (jsx(RootPropsProvider, { value: { size, variantMap: variantMap[variant], getHref }, children: jsx(Pagination$1.Root, { ref: ref, type: getHref ? "link" : "button", ...rest }) }));
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
            return page.type === "ellipsis" ? (jsx(PaginationEllipsis, { index: index, ...props }, index)) : (jsx(PaginationItem, { type: "page", value: page.value, ...props }, index));
        }) }));
};
const PaginationPageText = React.forwardRef(function PaginationPageText(props, ref) {
    const { format = "compact", ...rest } = props;
    const { page, totalPages, pageRange, count } = usePaginationContext();
    const content = React.useMemo(() => {
        if (format === "short")
            return `${page} / ${totalPages}`;
        if (format === "compact")
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

const ResetSelectionButton = ({ text = "Reset Selection", }) => {
    const { table } = useDataTableContext();
    return (jsx(Button$1, { onClick: () => {
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
    return jsx(Text, { children: getCount() });
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

const CheckboxCard = React.forwardRef(function CheckboxCard(props, ref) {
    const { inputProps, label, description, icon, addon, indicator = jsx(CheckboxCard$1.Indicator, {}), indicatorPlacement = "end", ...rest } = props;
    const hasContent = label || description || icon;
    const ContentWrapper = indicator ? CheckboxCard$1.Content : React.Fragment;
    return (jsxs(CheckboxCard$1.Root, { ...rest, children: [jsx(CheckboxCard$1.HiddenInput, { ref: ref, ...inputProps }), jsxs(CheckboxCard$1.Control, { children: [indicatorPlacement === "start" && indicator, hasContent && (jsxs(ContentWrapper, { children: [icon, label && (jsx(CheckboxCard$1.Label, { children: label })), description && (jsx(CheckboxCard$1.Description, { children: description })), indicatorPlacement === "inside" && indicator] })), indicatorPlacement === "end" && indicator] }), addon && jsx(CheckboxCard$1.Addon, { children: addon })] }));
});
CheckboxCard$1.Indicator;

function ColumnCard({ columnId }) {
    const ref = useRef(null);
    const [dragging, setDragging] = useState(false); // NEW
    const { table, translate } = useDataTableContext();
    const displayName = translate.t(columnId);
    const column = table.getColumn(columnId);
    invariant(column);
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
    return (jsxs(Grid, { ref: ref, templateColumns: "auto 1fr", gap: "0.5rem", alignItems: "center", style: dragging ? { opacity: 0.4 } : {}, children: [jsx(Flex, { alignItems: "center", padding: "0", cursor: "grab", children: jsx(FaGripLinesVertical, { color: "colorPalette.400" }) }), jsx(Flex, { justifyContent: "space-between", alignItems: "center", children: jsx(CheckboxCard, { variant: "surface", label: displayName, checked: column.getIsVisible(), onChange: column.getToggleVisibilityHandler() }) })] }));
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
            },
        });
    }, [table]);
    return (jsx(Flex, { flexFlow: "column", gap: "0.25rem", children: order.map((columnId, index) => {
            return (jsx(CardContainer, { location: index, children: jsx(ColumnCard, { columnId: columnId }) }));
        }) }));
};

const ViewDialog = ({ icon = jsx(IoMdEye, {}) }) => {
    const viewModel = useDisclosure();
    const { translate } = useDataTableContext();
    return (jsxs(DialogRoot, { children: [jsx(DialogBackdrop, {}), jsx(DialogTrigger, { asChild: true, children: jsxs(Button$1, { as: Box, variant: "ghost", onClick: viewModel.onOpen, children: [icon, " ", translate.t("view_dialog.button_text")] }) }), jsxs(DialogContent, { children: [jsx(DialogCloseTrigger, {}), jsx(DialogHeader, { children: jsx(DialogTitle, { children: translate.t("view_dialog.title") }) }), jsx(DialogBody, { children: jsx(TableViewer, {}) }), jsx(DialogFooter, {})] })] }));
};

const CardHeader = ({ row, imageColumnId = undefined, titleColumnId = undefined, tagColumnId = undefined, tagIcon = undefined, showTag = true, imageProps = {}, }) => {
    if (!!row.original === false) {
        return jsx(Fragment, {});
    }
    const isShowFirstColumn = !!titleColumnId || showTag;
    return (jsxs(Grid, { templateRows: "auto auto", gap: "1rem", children: [!!imageColumnId && (jsx(Image, { width: "100%", src: row.original[imageColumnId], ...imageProps })), isShowFirstColumn && (jsxs(Flex, { gap: "0.5rem", flexFlow: "wrap", children: [!!titleColumnId && (jsx(Text, { fontWeight: "bold", fontSize: "large", children: row.original[titleColumnId] })), showTag && (jsx(Tag, { fontSize: "large", startElement: tagIcon && tagIcon({}), children: row.original[tagColumnId] }))] }))] }));
};

const DataTableServerContext = createContext({
    url: "",
});

const useDataTableServerContext = () => {
    const context = useContext(DataTableServerContext);
    const { query } = context;
    const isEmpty = (query.data?.count ?? 0) <= 0;
    return { ...context, isEmpty };
};

const EmptyState$1 = ({ title = "No records", description = "Add a new events to get started or refine your search", }) => {
    const { isEmpty } = useDataTableServerContext();
    return (jsx(Fragment, { children: isEmpty && (jsx(EmptyState$2.Root, { children: jsxs(EmptyState$2.Content, { children: [jsx(EmptyState$2.Indicator, { children: jsx(HiColorSwatch, {}) }), jsxs(VStack, { textAlign: "center", children: [jsx(EmptyState$2.Title, { children: title }), jsx(EmptyState$2.Description, { children: description })] })] }) })) }));
};

const ErrorAlert = ({ showMessage = true }) => {
    const { query } = useDataTableServerContext();
    const { isError, error } = query;
    return (jsx(Fragment, { children: isError && (jsxs(Alert.Root, { status: "error", children: [jsx(Alert.Indicator, {}), jsxs(Alert.Content, { children: [jsx(Alert.Title, { children: error.name }), showMessage && (jsx(Alert.Description, { children: error.message }))] })] })) }));
};

const snakeToLabel = (str) => {
    return str
        .split("_") // Split by underscore
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(" "); // Join with space
};

const RecordDisplay = ({ object, boxProps, translate, prefix = "", }) => {
    const getColumn = ({ field }) => {
        if (translate !== undefined) {
            return translate.t(`${prefix}${field}`);
        }
        return snakeToLabel(field);
    };
    if (object === null) {
        return jsx(Fragment, { children: "null" });
    }
    return (jsx(Grid, { rowGap: 1, padding: 1, overflow: "auto", ...boxProps, children: Object.entries(object).map(([field, value]) => {
            return (jsxs(Grid, { columnGap: 2, gridTemplateColumns: "auto 1fr", children: [jsx(Text, { color: "colorPalette.400", children: getColumn({ field }) }), typeof value === "object" ? (jsx(RecordDisplay, { object: value, prefix: `${prefix}${field}.`, translate: translate })) : (jsx(Text, { children: JSON.stringify(value) }))] }, field));
        }) }));
};

const CellRenderer = ({ cell }) => {
    const { translate } = useDataTableContext();
    const getLabel = ({ columnId }) => {
        if (translate !== undefined) {
            return translate.t(`${columnId}`);
        }
        return snakeToLabel(columnId);
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
            if (translate !== undefined) {
                return translate.t(`undefined`);
            }
            return `undefined`;
        }
        throw new Error(`value is unknown, ${typeof value}`);
    };
    const showCustomDataDisplay = cell.column.columnDef.meta?.showCustomDisplay ?? false;
    const gridColumn = cell.column.columnDef.meta?.gridColumn ?? [
        "span 12",
        "span 6",
        "span 3",
    ];
    const gridRow = cell.column.columnDef.meta?.gridRow ?? {};
    if (showCustomDataDisplay) {
        return (jsx(Flex, { gridColumn, gridRow, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id));
    }
    const value = cell.getValue();
    if (typeof value === "object") {
        return (jsxs(Box, { gridColumn, gridRow, children: [jsx(Box, { children: getLabel({ columnId: cell.column.id }) }), jsx(RecordDisplay, { boxProps: {
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: "gray.400",
                        paddingX: 4,
                        paddingY: 2,
                    }, object: value })] }, cell.id));
    }
    return (jsxs(Box, { gridColumn, gridRow, children: [jsx(Box, { color: "colorPalette.400", children: getLabel({ columnId: cell.column.id }) }), jsx(Box, { wordBreak: "break-word", textOverflow: "ellipsis", overflow: "hidden", children: `${formatValue(cell.getValue())}` })] }, cell.id));
};
const DataDisplay = ({ variant = "" }) => {
    const { table, translate } = useDataTableContext();
    return (jsx(Flex, { flexFlow: "column", gap: "1", children: table.getRowModel().rows.map((row) => {
            const rowId = row.id;
            return (jsx(Card.Root, { children: jsx(Card.Body, { display: "grid", gap: 4, padding: 4, gridTemplateColumns: "repeat(12, 1fr)", children: table.getAllColumns().map((column) => {
                        const childCell = row.getAllCells().find((cell) => {
                            return cell.id === `${rowId}_${column.id}`;
                        });
                        if (column.columns.length > 0) {
                            return (jsxs(Card.Root, { margin: "1", gridColumn: "span 12", children: [jsx(Card.Header, { color: "gray.400", children: translate.t(column.id) }), jsx(Card.Body, { display: "grid", gap: "4", gridTemplateColumns: "repeat(12, 1fr)", children: column.columns.map((column) => {
                                            if (!column.getIsVisible()) {
                                                return jsx(Fragment, {});
                                            }
                                            const foundCell = row
                                                .getVisibleCells()
                                                .find((cell) => {
                                                return cell.id === `${rowId}_${column.id}`;
                                            });
                                            return jsx(CellRenderer, { cell: foundCell });
                                        }) })] }, `chakra-table-card-${childCell?.id}`));
                        }
                        return jsx(CellRenderer, { cell: childCell });
                    }) }) }, `chakra-table-card-${rowId}`));
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
            onDensityChange: makeStateUpdater("density", table),
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
function DataTable({ columns, data, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, translate, children, }) {
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
    return (jsx(DataTableContext.Provider, { value: {
            table: table,
            globalFilter,
            setGlobalFilter,
            type: "client",
            translate,
            columns,
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
function DataTableServer({ columns, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, query, url, translate, children, }) {
    const table = useReactTable({
        _features: [DensityFeature],
        data: query.data?.data ?? [],
        rowCount: query.data?.count ?? 0,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
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
    return (jsx(DataTableContext.Provider, { value: {
            table: { ...table },
            globalFilter,
            setGlobalFilter,
            type: "server",
            translate,
            columns,
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
        }, children: jsx(DataTableServerContext.Provider, { value: { url, query }, children: children }) }));
}

const Tooltip = React.forwardRef(function Tooltip(props, ref) {
    const { showArrow, children, disabled, portalled, content, contentProps, portalRef, ...rest } = props;
    if (disabled)
        return children;
    return (jsxs(Tooltip$1.Root, { ...rest, children: [jsx(Tooltip$1.Trigger, { asChild: true, children: children }), jsx(Portal, { disabled: !portalled, container: portalRef, children: jsx(Tooltip$1.Positioner, { children: jsxs(Tooltip$1.Content, { ref: ref, ...contentProps, children: [showArrow && (jsx(Tooltip$1.Arrow, { children: jsx(Tooltip$1.ArrowTip, {}) })), content] }) }) })] }));
});

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
    const { table } = useDataTableContext();
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    useEffect(() => {
        const searchHN = async () => {
            table.setGlobalFilter(debouncedSearchTerm);
        };
        searchHN();
    }, [debouncedSearchTerm]);
    return (jsx(Fragment, { children: jsx(InputGroup, { flex: "1", startElement: jsx(MdSearch, {}), children: jsx(Input, { placeholder: "Outline", variant: "outline", onChange: (e) => {
                    setSearchTerm(e.target.value);
                } }) }) }));
};

const ReloadButton = ({ text = "Reload", variant = "icon", }) => {
    const { url } = useDataTableServerContext();
    const queryClient = useQueryClient();
    if (variant === "icon") {
        return (jsx(Tooltip, { showArrow: true, content: "This is the tooltip content", children: jsx(Button, { variant: "ghost", onClick: () => {
                    queryClient.invalidateQueries({ queryKey: [url] });
                }, "aria-label": "refresh", children: jsx(IoReload, {}) }) }));
    }
    return (jsxs(Button, { variant: "ghost", onClick: () => {
            queryClient.invalidateQueries({ queryKey: [url] });
        }, children: [jsx(IoReload, {}), " ", text] }));
};

const FilterOptions = ({ column }) => {
    const { table } = useDataTableContext();
    const tableColumn = table.getColumn(column);
    const options = tableColumn?.columnDef.meta?.filterOptions ?? [];
    return (jsx(Fragment, { children: options.map((option) => {
            const selected = table.getColumn(column)?.getFilterValue() === option;
            return (jsxs(Button$1, { size: "sm", onClick: () => {
                    if (selected) {
                        table.setColumnFilters((state) => {
                            return state.filter((filter) => {
                                return filter.id !== column;
                            });
                        });
                        return;
                    }
                    table.getColumn(column)?.setFilterValue(option);
                }, variant: selected ? "solid" : "outline", display: "flex", gap: "0.25rem", children: [option, selected && jsx(MdClose, {})] }, option));
        }) }));
};

const TableFilterTags = () => {
    const { table } = useDataTableContext();
    return (jsx(Flex, { gap: "0.5rem", flexFlow: "wrap", children: table.getState().columnFilters.map(({ id, value }) => {
            return (jsx(Tag, { gap: "0.5rem", closable: true, cursor: "pointer", onClick: () => {
                    table.setColumnFilters(table.getState().columnFilters.filter((filter) => {
                        return filter.value != value;
                    }));
                }, children: `${id}: ${value}` }, `${id}-${value}`));
        }) }));
};

const TableControls = ({ fitTableWidth = false, fitTableHeight = false, children = jsx(Fragment, {}), showGlobalFilter = false, showFilter = false, showFilterName = false, showFilterTags = false, showReload = false, showPagination = true, showPageSizeControl = true, showPageCountText = true, showView = true, filterOptions = [], extraItems = jsx(Fragment, {}), loading = false, hasError = false, gridProps = {}, }) => {
    const { translate } = useDataTableContext();
    return (jsxs(Grid, { templateRows: "auto 1fr", width: fitTableWidth ? "fit-content" : "100%", height: fitTableHeight ? "fit-content" : "100%", gap: "0.5rem", ...gridProps, children: [jsxs(Flex, { flexFlow: "column", gap: 2, children: [jsxs(Flex, { justifyContent: "space-between", children: [jsx(Box, { children: showView && jsx(ViewDialog, { icon: jsx(MdOutlineViewColumn, {}) }) }), jsxs(Flex, { gap: "0.5rem", alignItems: "center", justifySelf: "end", children: [loading && jsx(Spinner, { size: "sm" }), hasError && (jsx(Tooltip, { content: translate.t("has_error"), children: jsx(Icon, { as: BsExclamationCircleFill, color: "red.400" }) })), showGlobalFilter && jsx(GlobalFilter, {}), showFilter && jsx(FilterDialog, {}), showReload && jsx(ReloadButton, {}), extraItems] })] }), filterOptions.length > 0 && (jsx(Flex, { flexFlow: "column", gap: "0.5rem", children: filterOptions.map((column) => {
                            return (jsxs(Flex, { alignItems: "center", flexFlow: "wrap", gap: "0.5rem", children: [showFilterName && jsxs(Text, { children: [column, ":"] }), jsx(FilterOptions, { column: column })] }, column));
                        }) })), showFilterTags && (jsx(Flex, { children: jsx(TableFilterTags, {}) }))] }), jsx(Grid, { overflow: "auto", bg: { base: "colorPalette.50", _dark: "colorPalette.950" }, children: children }), (showPageSizeControl || showPageCountText || showPagination) && (jsxs(Flex, { justifyContent: "space-between", children: [jsxs(Flex, { gap: "1rem", alignItems: "center", children: [showPageSizeControl && jsx(PageSizeControl, {}), showPageCountText && (jsxs(Flex, { children: [jsx(Text, { paddingRight: "0.5rem", children: translate.t("rowcount.total") }), jsx(RowCountText, {})] }))] }), jsx(Box, { justifySelf: "end", children: showPagination && jsx(Pagination, {}) })] }))] }));
};

const EmptyState = React.forwardRef(function EmptyState(props, ref) {
    const { title, description, icon, children, ...rest } = props;
    return (jsx(EmptyState$2.Root, { ref: ref, ...rest, children: jsxs(EmptyState$2.Content, { children: [icon && (jsx(EmptyState$2.Indicator, { children: icon })), description ? (jsxs(VStack, { textAlign: "center", children: [jsx(EmptyState$2.Title, { children: title }), jsx(EmptyState$2.Description, { children: description })] })) : (jsx(EmptyState$2.Title, { children: title })), children] }) }));
});

const EmptyResult = (jsx(EmptyState, { icon: jsx(HiColorSwatch, {}), title: "No results found", description: "Try adjusting your search", children: jsxs(List.Root, { variant: "marker", children: [jsx(List.Item, { children: "Try removing filters" }), jsx(List.Item, { children: "Try different keywords" })] }) }));
const Table = ({ children, emptyComponent = EmptyResult, canResize = true, ...props }) => {
    const { table } = useDataTableContext();
    if (table.getRowModel().rows.length <= 0) {
        return emptyComponent;
    }
    return (jsx(Table$1.Root, { stickyHeader: true, variant: "outline", width: canResize ? table.getCenterTotalSize() : undefined, display: "grid", alignContent: "start", overflowY: "auto", bg: { base: "colorPalette.50", _dark: "colorPalette.950" }, ...props, children: children }));
};

const Checkbox = React.forwardRef(function Checkbox(props, ref) {
    const { icon, children, inputProps, rootRef, ...rest } = props;
    return (jsxs(Checkbox$1.Root, { ref: rootRef, ...rest, children: [jsx(Checkbox$1.HiddenInput, { ref: ref, ...inputProps }), jsx(Checkbox$1.Control, { children: icon || jsx(Checkbox$1.Indicator, {}) }), children != null && (jsx(Checkbox$1.Label, { children: children }))] }));
});

const TableBody = ({ showSelector = false, alwaysShowSelector = true, canResize = true, }) => {
    "use no memo";
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
                    ? `${cell.column.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
                    : `${cell.column.getStart("left")}px`,
                position: "relative",
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
    return (jsx(Table$1.Body, { children: table.getRowModel().rows.map((row, index) => {
            return (jsxs(Table$1.Row, { display: "flex", zIndex: 1, onMouseEnter: () => handleRowHover(index), onMouseLeave: () => handleRowHover(-1), ...getTrProps({ hoveredRow, index }), children: [showSelector && (jsx(TableRowSelector, { index: index, row: row, hoveredRow: hoveredRow })), row.getVisibleCells().map((cell, index) => {
                        return (jsx(Table$1.Cell, { padding: `${table.getDensityValue()}px`, 
                            // styling resize and pinning start
                            flex: `${canResize ? "0" : "1"} 0 ${cell.column.getSize()}px`, color: {
                                base: "colorPalette.900",
                                _dark: "colorPalette.100",
                            },
                            bg: { base: "colorPalette.50", _dark: "colorPalette.950" }, ...getTdProps(cell), children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, `chakra-table-rowcell-${cell.id}-${index}`));
                    })] }, `chakra-table-row-${row.id}`));
        }) }));
};
const TableRowSelector = ({ index, row, }) => {
    const { table } = useDataTableContext();
    const SELECTION_BOX_WIDTH = 20;
    return (jsx(Table$1.Cell, { padding: `${table.getDensityValue()}px`, display: "grid", color: {
            base: "colorPalette.900",
            _dark: "colorPalette.100",
        },
        bg: { base: "colorPalette.50", _dark: "colorPalette.950" }, justifyItems: "center", alignItems: "center", children: jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            onCheckedChange: row.getToggleSelectedHandler() }) }));
};

const TableFooter = ({ showSelector = false, alwaysShowSelector = true, }) => {
    const table = useDataTableContext().table;
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredCheckBox, setHoveredCheckBox] = useState(false);
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
    return (jsx(Table$1.Footer, { children: table.getFooterGroups().map((footerGroup) => (jsxs(Table$1.Row, { display: "flex", children: [showSelector && (jsxs(Table$1.Header, { padding: `${table.getDensityValue()}px`, onMouseEnter: () => handleRowHover(true), onMouseLeave: () => handleRowHover(false), display: "grid", children: [isCheckBoxVisible() && (jsx(Box, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: table.getIsAllRowsSelected(),
                                // indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler() }) })), !isCheckBoxVisible() && (jsx(Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` }))] })), footerGroup.headers.map((header) => (jsx(Table$1.Cell, { padding: "0", columnSpan: `${header.colSpan}`, 
                    // styling resize and pinning start
                    maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, display: "grid", children: jsx(MenuRoot$1, { children: jsx(MenuTrigger$1, { asChild: true, children: jsx(Box, { padding: `${table.getDensityValue()}px`, display: "flex", alignItems: "center", justifyContent: "start", borderRadius: "0rem", children: jsxs(Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.footer, header.getContext()), jsx(Box, { children: header.column.getCanSort() && (jsxs(Fragment, { children: [header.column.getIsSorted() === false && (
                                                    // <UpDownIcon />
                                                    jsx(Fragment, {})), header.column.getIsSorted() === "asc" && (jsx(BiUpArrow, {})), header.column.getIsSorted() === "desc" && (jsx(BiDownArrow, {}))] })) })] }) }) }) }) }, `chakra-table-footer-${header.column.id}-${footerGroup.id}`)))] }, `chakra-table-footergroup-${footerGroup.id}`))) }));
};

const TableHeader = ({ canResize = true, showSelector = false, isSticky = true, tableHeaderProps = {}, tableRowProps = {}, }) => {
    const { table } = useDataTableContext();
    const SELECTION_BOX_WIDTH = 20;
    const getThProps = (header) => {
        const thProps = header.column.getIsPinned()
            ? {
                left: showSelector
                    ? `${header.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
                    : `${header.getStart("left")}px`,
                position: "sticky",
                zIndex: 100 + 1,
            }
            : {};
        return thProps;
    };
    const stickyProps = {
        position: "sticky",
        top: 0,
    };
    return (jsx(Table$1.Header, { ...(isSticky ? stickyProps : {}), bgColor: "transparent", ...tableHeaderProps, children: table.getHeaderGroups().map((headerGroup) => (jsxs(Table$1.Row, { display: "flex", bgColor: "transparent", ...tableRowProps, children: [showSelector && (jsx(Table$1.ColumnHeader, { padding: `${table.getDensityValue()}px`, display: "grid", color: {
                        base: "colorPalette.900",
                        _dark: "colorPalette.100",
                    },
                    bg: { base: "colorPalette.50", _dark: "colorPalette.950" }, justifyItems: "center", alignItems: "center", children: jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, checked: table.getIsAllRowsSelected(),
                        // indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler() }) })), headerGroup.headers.map((header) => {
                    const resizeProps = {
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        cursor: "col-resize",
                    };
                    return (jsxs(Table$1.ColumnHeader, { padding: 0, columnSpan: `${header.colSpan}`, 
                        // styling resize and pinning start
                        flex: `${canResize ? "0" : "1"} 0 ${header.column.getSize()}px`, display: "grid", gridTemplateColumns: "1fr auto", zIndex: 1500 + header.index, color: {
                            base: "colorPalette.800",
                            _dark: "colorPalette.200",
                        },
                        bg: { base: "colorPalette.100", _dark: "colorPalette.900" }, ...getThProps(header), children: [jsxs(MenuRoot, { children: [jsx(MenuTrigger, { asChild: true, children: jsx(Flex, { padding: `${table.getDensityValue()}px`, alignItems: "center", justifyContent: "start", borderRadius: "0rem", overflow: "auto", color: {
                                                base: "colorPalette.800",
                                                _dark: "colorPalette.200",
                                                _hover: {
                                                    base: "colorPalette.700",
                                                    _dark: "colorPalette.300",
                                                },
                                            },
                                            bg: {
                                                base: "colorPalette.100",
                                                _dark: "colorPalette.900",
                                                _hover: {
                                                    base: "colorPalette.200",
                                                    _dark: "colorPalette.800",
                                                },
                                            }, children: jsxs(Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
                                                        ? null
                                                        : flexRender(header.column.columnDef.header, header.getContext()), jsx(Box, { children: header.column.getCanSort() && (jsxs(Fragment, { children: [header.column.getIsSorted() === false && jsx(Fragment, {}), header.column.getIsSorted() === "asc" && (jsx(BiUpArrow, {})), header.column.getIsSorted() === "desc" && (jsx(BiDownArrow, {}))] })) }), jsx(Box, { children: header.column.getIsFiltered() && jsx(MdFilterListAlt, {}) })] }) }) }), jsxs(MenuContent, { children: [!header.column.getIsPinned() && (jsx(MenuItem, { asChild: true, value: "pin-column", children: jsxs(Button, { variant: "ghost", onClick: () => {
                                                        header.column.pin("left");
                                                    }, children: [jsx(MdPushPin, {}), "Pin Column"] }) })), header.column.getIsPinned() && (jsx(MenuItem, { asChild: true, value: "cancel-pin", children: jsxs(Button, { variant: "ghost", onClick: () => {
                                                        header.column.pin(false);
                                                    }, children: [jsx(MdCancel, {}), "Cancel Pin"] }) })), header.column.getCanSort() && (jsxs(Fragment, { children: [jsx(MenuItem, { asChild: true, value: "sort-ascend", children: jsxs(Button, { variant: "ghost", onClick: () => {
                                                                table.setSorting((state) => {
                                                                    return [
                                                                        ...state.filter((column) => {
                                                                            return column.id !== header.id;
                                                                        }),
                                                                        { id: header.id, desc: false },
                                                                    ];
                                                                });
                                                            }, children: [jsx(GrAscend, {}), "Sort Ascending"] }) }), jsx(MenuItem, { asChild: true, value: "sort-descend", children: jsxs(Button, { variant: "ghost", onClick: () => {
                                                                table.setSorting((state) => {
                                                                    return [
                                                                        ...state.filter((column) => {
                                                                            return column.id !== header.id;
                                                                        }),
                                                                        { id: header.id, desc: true },
                                                                    ];
                                                                });
                                                            }, children: [jsx(GrDescend, {}), "Sort Descending"] }) }), header.column.getIsSorted() && (jsx(MenuItem, { asChild: true, value: "sort-descend", children: jsxs(Button, { variant: "ghost", onClick: () => {
                                                                header.column.clearSorting();
                                                            }, children: [jsx(MdClear, {}), "Clear Sorting"] }) }))] }))] })] }), canResize && (jsx(Box, { borderRight: "0.2rem solid", borderRightColor: header.column.getIsResizing()
                                    ? "colorPalette.700"
                                    : "transparent", position: "relative", right: "0.1rem", width: "2px", height: "100%", userSelect: "none", style: { touchAction: "none" }, _hover: {
                                    borderRightColor: header.column.getIsResizing()
                                        ? "colorPalette.700"
                                        : "colorPalette.400",
                                }, ...resizeProps }))] }, `chakra-table-header-${header.id}`));
                })] }, `chakra-table-headergroup-${headerGroup.id}`))) }));
};

const DefaultTable = ({ showFooter = false, tableProps = {}, tableHeaderProps = {}, tableBodyProps = {}, tableFooterProps = {}, controlProps = {}, variant = "", }) => {
    if (variant === "greedy") {
        return (jsx(TableControls, { ...controlProps, children: jsxs(Table, { canResize: false, ...{ ...tableProps }, children: [jsx(TableHeader, { canResize: false, ...tableHeaderProps }), jsx(TableBody, { canResize: false, ...tableBodyProps }), showFooter && (jsx(TableFooter, { canResize: false, ...tableFooterProps }))] }) }));
    }
    return (jsx(TableControls, { ...controlProps, children: jsxs(Table, { ...tableProps, children: [jsx(TableHeader, { ...tableHeaderProps }), jsx(TableBody, { ...tableBodyProps }), showFooter && jsx(TableFooter, { ...tableFooterProps })] }) }));
};

const TableCardContainer = ({ children, variant = "", ...props }) => {
    if (variant === "carousel") {
        return (jsx(Flex, { overflow: "scroll", gap: "1rem", children: children }));
    }
    return (jsx(Grid, { gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))", gap: "0.5rem", ...props, children: children }));
};

const DefaultCardTitle = () => {
    return jsx(Fragment, {});
};
const TableCards = ({ isSelectable = false, showDisplayNameOnly = false, renderTitle = DefaultCardTitle, cardBodyProps = {}, }) => {
    const { table } = useDataTableContext();
    return (jsx(Fragment, { children: table.getRowModel().rows.map((row) => {
            return (jsx(Card.Root, { flex: "1 0 20rem", children: jsxs(Card.Body, { display: "flex", flexFlow: "column", gap: "0.5rem", ...cardBodyProps, children: [isSelectable && (jsx(Checkbox, { isChecked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            // indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler() })), renderTitle(row), jsx(Grid, { templateColumns: "auto 1fr", gap: "1rem", children: row.getVisibleCells().map((cell) => {
                                return (jsxs(Fragment, { children: [jsxs(Box, { children: [showDisplayNameOnly && (jsx(Text, { fontWeight: "bold", children: cell.column.columnDef.meta?.displayName ??
                                                        cell.column.id })), !showDisplayNameOnly && (jsx(Fragment, { children: flexRender(cell.column.columnDef.header, 
                                                    // @ts-expect-error Assuming the CellContext interface is the same as HeaderContext
                                                    cell.getContext()) }))] }, `chakra-table-cardcolumnid-${row.id}`), jsx(Box, { justifySelf: "end", children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, `chakra-table-cardcolumn-${row.id}`)] }));
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
    return jsx(Fragment, { children: render(loading) });
};

const SelectAllRowsToggle = ({ selectAllIcon = jsx(MdOutlineChecklist, {}), clearAllIcon = jsx(MdClear, {}), selectAllText = "", clearAllText = "", }) => {
    const { table } = useDataTableContext();
    return (jsxs(Fragment, { children: [!!selectAllText === false && (jsx(IconButton, { variant: "ghost", "aria-label": table.getIsAllRowsSelected() ? clearAllText : selectAllText, onClick: (event) => {
                    table.getToggleAllRowsSelectedHandler()(event);
                }, children: table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon })), !!selectAllText !== false && (jsxs(Button$1, { variant: "ghost", onClick: (event) => {
                    table.getToggleAllRowsSelectedHandler()(event);
                }, children: [table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon, table.getIsAllRowsSelected() ? clearAllText : selectAllText] }))] }));
};

const TableSelector = () => {
    const { table } = useDataTableContext();
    return (jsxs(Fragment, { children: [table.getSelectedRowModel().rows.length > 0 && (jsxs(Button$1, { onClick: () => { }, variant: "ghost", display: "flex", gap: "0.25rem", children: [jsx(Box, { fontSize: "sm", children: `${table.getSelectedRowModel().rows.length}` }), jsx(IoMdCheckbox, {})] })), !table.getIsAllPageRowsSelected() && jsx(SelectAllRowsToggle, {}), table.getSelectedRowModel().rows.length > 0 && (jsx(IconButton, { variant: "ghost", onClick: () => {
                    table.resetRowSelection();
                }, "aria-label": "reset selection", children: jsx(MdClear, {}) }))] }));
};

const TextCell = ({ label, containerProps = {}, textProps = {}, children, }) => {
    if (label) {
        return (jsx(Flex, { alignItems: "center", height: "100%", ...containerProps, children: jsx(Tooltip, { content: jsx(Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", children: label }), children: jsx(Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-all", ...textProps, children: children }) }) }));
    }
    return (jsx(Flex, { alignItems: "center", height: "100%", ...containerProps, children: jsx(Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-all", ...textProps, children: children }) }));
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
}, keyPrefix = "", } = {
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
    const [sorting, setSorting] = useState(defaultSorting);
    const [columnFilters, setColumnFilters] = useState(defaultColumnFilters); // can set initial column filter state here
    const [pagination, setPagination] = useState(defaultPagination);
    const [rowSelection, setRowSelection] = useState(defaultRowSelection);
    const [columnOrder, setColumnOrder] = useState(defaultColumnOrder);
    const [globalFilter, setGlobalFilter] = useState(defaultGlobalFilter);
    const [density, setDensity] = useState(defaultDensity);
    const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);
    const translate = useTranslation("", { keyPrefix });
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
        translate,
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
}, keyPrefix, }) => {
    const [sorting, setSorting] = useState(defaultSorting);
    const [columnFilters, setColumnFilters] = useState(defaultColumnFilters); // can set initial column filter state here
    const [pagination, setPagination] = useState(defaultPagination);
    const [rowSelection, setRowSelection] = useState(defaultRowSelection);
    const [columnOrder, setColumnOrder] = useState(defaultColumnOrder);
    const [globalFilter, setGlobalFilter] = useState(defaultGlobalFilter);
    const [density, setDensity] = useState(defaultDensity);
    const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);
    const params = {
        offset: pagination.pageIndex * pagination.pageSize,
        limit: pagination.pageSize,
        sorting,
        where: columnFilters,
        searching: globalFilter,
    };
    const query = useQuery({
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
    const translate = useTranslation("", { keyPrefix });
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
        translate,
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
const getColumns = ({ schema, include = [], ignore = [], width = [], meta = {}, defaultWidth = 400, translate, }) => {
    const { properties } = schema;
    idListSanityCheck("ignore", ignore, properties);
    widthSanityCheck(width, ignore, properties);
    idListSanityCheck("meta", Object.keys(meta), properties);
    const getColumn = ({ column }) => {
        if (translate !== undefined) {
            return translate.t(`${column}`);
        }
        return snakeToLabel(column);
    };
    const keys = Object.keys(properties);
    const included = include.length > 0 ? include : keys;
    const ignored = included.filter((key) => {
        return !ignore.some((shouldIgnoreKey) => key === shouldIgnoreKey);
    });
    const columnHelper = createColumnHelper();
    // @ts-expect-error find type for unknown
    const columns = [
        ...ignored.map((column, index) => {
            return columnHelper.accessor(column, {
                cell: (props) => {
                    // @ts-expect-error find type for unknown
                    const value = props.row.original[column];
                    if (typeof value === "object") {
                        return (jsx(Grid, { overflow: "auto", children: jsx(RecordDisplay, { object: value, translate }) }));
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

const TableDataDisplay = ({ colorPalette, emptyComponent, }) => {
    const { table, columns, translate, data } = useDataTableContext();
    const columnDef = table._getColumnDefs();
    console.log(columnDef, "glp");
    console.log(columnDef, columns, table.getState().columnOrder, data, "glp");
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
        if (typeof size === "number") {
            return size;
        }
        return 0;
    })
        .reduce((previous, current) => previous + current, 0);
    const columnWidths = columns
        .map(({ size }) => {
        if (!!size === false) {
            return "1fr";
        }
        return `minmax(${size}px, ${(size / totalWidths) * 100}%)`;
    })
        .join(" ");
    console.log({ columnWidths }, "hadfg");
    const cellProps = {
        flex: "1 0 0%",
        overflow: "auto",
        paddingX: "2",
        py: "1",
        color: { base: "colorPalette.900", _dark: "colorPalette.100" },
        bgColor: { base: "colorPalette.50", _dark: "colorPalette.950" },
        borderBottomColor: { base: "colorPalette.200", _dark: "colorPalette.800" },
        borderBottomWidth: "1px",
        ...{ colorPalette },
    };
    if (data.length <= 0) {
        return jsx(Fragment, { children: emptyComponent });
    }
    return (jsxs(Grid, { templateColumns: `${columnWidths}`, overflow: "auto", borderWidth: "1px", color: { base: "colorPalette.900", _dark: "colorPalette.100" }, borderColor: { base: "colorPalette.200", _dark: "colorPalette.800" }, colorPalette, children: [jsx(Grid, { templateColumns: `${columnWidths}`, column: `1/span ${columns.length}`, bg: { base: "colorPalette.200", _dark: "colorPalette.800" }, colorPalette, children: columnHeaders.map((header) => {
                    return (jsx(Box, { flex: "1 0 0%", paddingX: "2", py: "1", overflow: "auto", textOverflow: "ellipsis", children: translate.t(`column_header.${header}`) }));
                }) }), data.map((record) => {
                return (jsx(Fragment, { children: columnHeaders.map((header) => {
                        const { cell } = columnsMap[header];
                        const value = record[header];
                        if (!!record === false) {
                            return (jsx(Box, { ...cellProps, children: translate.t(`column_cell.placeholder`) }));
                        }
                        if (cell) {
                            return (jsx(Box, { ...cellProps, children: cell({ row: { original: record } }) }));
                        }
                        if (typeof value === "object") {
                            return (jsx(Box, { ...cellProps, children: jsx(RecordDisplay, { object: value }) }));
                        }
                        return jsx(Box, { ...cellProps, children: value });
                    }) }));
            })] }));
};

const AccordionItemTrigger = React.forwardRef(function AccordionItemTrigger(props, ref) {
    const { children, indicatorPlacement = "end", ...rest } = props;
    return (jsxs(Accordion.ItemTrigger, { ...rest, ref: ref, children: [indicatorPlacement === "start" && (jsx(Accordion.ItemIndicator, { rotate: { base: "-90deg", _open: "0deg" }, children: jsx(LuChevronDown, {}) })), jsx(HStack, { gap: "4", flex: "1", textAlign: "start", width: "full", children: children }), indicatorPlacement === "end" && (jsx(Accordion.ItemIndicator, { children: jsx(LuChevronDown, {}) }))] }));
});
const AccordionItemContent = React.forwardRef(function AccordionItemContent(props, ref) {
    return (jsx(Accordion.ItemContent, { children: jsx(Accordion.ItemBody, { ...props, ref: ref }) }));
});
const AccordionRoot = Accordion.Root;
const AccordionItem = Accordion.Item;

//@ts-expect-error TODO: find appropriate type
const SchemaFormContext = createContext({
    schema: {},
    serverUrl: "",
    requestUrl: "",
    order: [],
    ignore: [],
    include: [],
    onSubmit: async () => { },
    rowNumber: 0,
    requestOptions: {},
});

const useSchemaContext = () => {
    return useContext(SchemaFormContext);
};

const clearEmptyString = (object) => {
    return Object.fromEntries(Object.entries(object).filter(([, value]) => value !== ""));
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
const FormRoot = ({ schema, idMap, setIdMap, form, serverUrl, translate, children, order = [], ignore = [], include = [], onSubmit = undefined, rowNumber = undefined, requestOptions = {}, getUpdatedData = () => { }, }) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [validatedData, setValidatedData] = useState();
    const [error, setError] = useState();
    return (jsx(SchemaFormContext.Provider, { value: {
            schema,
            serverUrl,
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
        }, children: jsx(FormProvider, { ...form, children: children }) }));
};

function removeIndex(str) {
    return str.replace(/\.\d+\./g, '.');
}

const ArrayRenderer = ({ schema, column, prefix, }) => {
    const { gridRow, gridColumn = "1/span 12", required, items } = schema;
    // @ts-expect-error TODO: find suitable types
    const { type } = items;
    const { translate } = useSchemaContext();
    const colLabel = `${prefix}${column}`;
    const isRequired = required?.some((columnId) => columnId === column);
    const { formState: { errors }, setValue, watch, } = useFormContext();
    const fields = (watch(colLabel) ?? []);
    return (jsxs(Box, { gridRow, gridColumn, children: [jsxs(Box, { as: "label", gridColumn: "1/span12", children: [`${translate.t(removeIndex(`${colLabel}.field_label`))}`, isRequired && jsx("span", { children: "*" })] }), fields.map((field, index) => (jsxs(Flex, { flexFlow: "column", children: [jsx(Grid, { gap: "4", padding: "4", gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: `repeat("auto-fit", auto)`, children: jsx(SchemaRenderer, { column: `${index}`,
                            prefix: `${colLabel}.`,
                            schema: items }) }), jsx(Flex, { justifyContent: "end", children: jsx(Button$1, { variant: "ghost", onClick: () => {
                                setValue(colLabel, fields.filter((_, curIndex) => {
                                    return curIndex === index;
                                }));
                            }, children: translate.t(removeIndex(`${colLabel}.remove`)) }) })] }, `${colLabel}.${index}`))), jsx(Flex, { children: jsx(Button$1, { onClick: () => {
                        if (type === "number") {
                            setValue(colLabel, [...fields, 0]);
                            return;
                        }
                        if (type === "string") {
                            setValue(colLabel, [...fields, ""]);
                            return;
                        }
                        if (type === "boolean") {
                            setValue(colLabel, [...fields, false]);
                            return;
                        }
                        setValue(colLabel, [...fields, {}]);
                    }, children: translate.t(removeIndex(`${colLabel}.add`)) }) }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }));
};

const Field = React.forwardRef(function Field(props, ref) {
    const { label, children, helperText, errorText, optionalText, ...rest } = props;
    return (jsxs(Field$1.Root, { ref: ref, ...rest, children: [label && (jsxs(Field$1.Label, { children: [label, jsx(Field$1.RequiredIndicator, { fallback: optionalText })] })), children, helperText && (jsx(Field$1.HelperText, { children: helperText })), errorText && (jsx(Field$1.ErrorText, { children: errorText }))] }));
});

const BooleanPicker = ({ schema, column, prefix }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
    const { translate } = useSchemaContext();
    const { required, gridColumn, gridRow } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const value = watch(colLabel);
    return (jsxs(Field, { label: `${translate.t(removeIndex(`${colLabel}.field_label`))}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [jsx(CheckboxCard, { checked: value, variant: "surface", onChange: () => {
                    setValue(colLabel, !value);
                } }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }));
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
        return (jsxs(Grid, { children: [jsxs(Grid, { templateColumns: "repeat(4, auto)", justifyContent: "center", children: [jsx(Button$1, { variant: "ghost", ...getBackProps({
                                calendars,
                                offset: 12,
                            }), children: "<<" }), jsx(Button$1, { variant: "ghost", ...getBackProps({ calendars }), children: "Back" }), jsx(Button$1, { variant: "ghost", ...getForwardProps({ calendars }), children: "Next" }), jsx(Button$1, { variant: "ghost", ...getForwardProps({
                                calendars,
                                offset: 12,
                            }), children: ">>" })] }), jsx(Grid, { templateColumns: "repeat(2, auto)", justifyContent: "center", children: calendars.map((calendar) => (jsxs(Grid, { gap: 4, children: [jsxs(Grid, { justifyContent: "center", children: [monthNamesShort[calendar.month], " ", calendar.year] }), jsxs(Grid, { templateColumns: "repeat(7, auto)", justifyContent: "center", children: [[0, 1, 2, 3, 4, 5, 6].map((weekdayNum) => {
                                        const weekday = (weekdayNum + firstDayOfWeek) % 7;
                                        return (jsx(Text, { textAlign: "center", children: weekdayNamesShort[weekday] }, `${calendar.month}${calendar.year}${weekday}`));
                                    }), calendar.weeks.map((week, weekIndex) => week.map((dateObj, index) => {
                                        const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                                        if (!dateObj) {
                                            return jsx(Grid, {}, key);
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
                                        return (jsx(Button$1, { variant: variant, colorPalette: color, ...getDateProps({ dateObj }), children: selectable ? date.getDate() : "X" }, key));
                                    }))] })] }, `${calendar.month}${calendar.year}`))) })] }));
    }
    return null;
};
let DatePicker$1 = class DatePicker extends React__default.Component {
    render() {
        return (jsx(Dayzed, { onDateSelected: this.props.onDateSelected, selected: this.props.selected, firstDayOfWeek: this.props.firstDayOfWeek, showOutsideDays: this.props.showOutsideDays, date: this.props.date, minDate: this.props.minDate, maxDate: this.props.maxDate, monthsToDisplay: this.props.monthsToDisplay, render: (dayzedData) => (jsx(Calendar, { ...dayzedData, firstDayOfWeek: this.props.firstDayOfWeek })) }));
    }
};

const PopoverContent = React.forwardRef(function PopoverContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props;
    return (jsx(Portal, { disabled: !portalled, container: portalRef, children: jsx(Popover.Positioner, { children: jsx(Popover.Content, { ref: ref, ...rest }) }) }));
});
React.forwardRef(function PopoverArrow(props, ref) {
    return (jsx(Popover.Arrow, { ...props, ref: ref, children: jsx(Popover.ArrowTip, {}) }));
});
React.forwardRef(function PopoverCloseTrigger(props, ref) {
    return (jsx(Popover.CloseTrigger, { position: "absolute", top: "1", insetEnd: "1", ...props, asChild: true, ref: ref, children: jsx(CloseButton, { size: "sm" }) }));
});
const PopoverTitle = Popover.Title;
Popover.Description;
Popover.Footer;
Popover.Header;
const PopoverRoot = Popover.Root;
const PopoverBody = Popover.Body;
const PopoverTrigger = Popover.Trigger;

dayjs.extend(utc);
const DatePicker = ({ column, schema, prefix }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
    const { translate } = useSchemaContext();
    const { required, gridColumn = "span 4", gridRow = "span 1", displayDateFormat = "YYYY-MM-DD", dateFormat = "YYYY-MM-DD[T]HH:mm:ss[Z]", } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const [open, setOpen] = useState(false);
    const selectedDate = watch(colLabel);
    const displayDate = dayjs.utc(selectedDate).format(displayDateFormat);
    useEffect(() => {
        try {
            if (selectedDate) {
                // Parse the selectedDate as UTC or in a specific timezone to avoid +8 hour shift
                // For example, parse as UTC:
                const parsedDate = dayjs.utc(selectedDate);
                // Or if you want to parse in local timezone without shifting:
                // const parsedDate = dayjs.tz(selectedDate, dayjs.tz.guess());
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
    return (jsxs(Field, { label: `${translate.t(removeIndex(`${colLabel}.field_label`))}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [jsxs(PopoverRoot, { open: open, onOpenChange: (e) => setOpen(e.open), closeOnInteractOutside: true, children: [jsx(PopoverTrigger, { asChild: true, children: jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
                                setOpen(true);
                            }, justifyContent: "start", children: [jsx(MdDateRange, {}), selectedDate !== undefined ? `${displayDate}` : ""] }) }), jsx(PopoverContent, { children: jsxs(PopoverBody, { children: [jsx(PopoverTitle, {}), jsx(DatePicker$1
                                // @ts-expect-error TODO: find appropriate types
                                , { 
                                    // @ts-expect-error TODO: find appropriate types
                                    selected: new Date(selectedDate), 
                                    // @ts-expect-error TODO: find appropriate types
                                    onDateSelected: ({ date }) => {
                                        setValue(colLabel, dayjs(date).format(dateFormat));
                                        setOpen(false);
                                    } })] }) })] }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }));
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

const EnumPicker = ({ column, isMultiple = false, schema, prefix, }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
    const { translate } = useSchemaContext();
    const { required, variant } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const { gridColumn, gridRow, renderDisplay } = schema;
    const [searchText, setSearchText] = useState();
    const [limit, setLimit] = useState(10);
    const [openSearchResult, setOpenSearchResult] = useState();
    const ref = useRef(null);
    const colLabel = `${prefix}${column}`;
    const watchEnum = watch(colLabel);
    const watchEnums = (watch(colLabel) ?? []);
    const dataList = schema.enum ?? [];
    const count = schema.enum?.length ?? 0;
    const isDirty = (searchText?.length ?? 0) > 0;
    const onSearchChange = async (event) => {
        setSearchText(event.target.value);
        setLimit(10);
    };
    if (variant === "radio") {
        return (jsx(Field, { label: `${translate.t(removeIndex(`${column}.field_label`))}`, required: isRequired, alignItems: "stretch", gridColumn,
            gridRow, children: jsx(RadioGroup$1.Root, { defaultValue: "1", children: jsx(HStack, { gap: "6", children: filterArray(dataList, searchText ?? "").map((item) => {
                        return (jsxs(RadioGroup$1.Item, { onClick: () => {
                                if (!isMultiple) {
                                    setOpenSearchResult(false);
                                    setValue(colLabel, item);
                                    return;
                                }
                                const newSet = new Set([...(watchEnums ?? []), item]);
                                setValue(colLabel, [...newSet]);
                            }, value: item, children: [jsx(RadioGroup$1.ItemHiddenInput, {}), jsx(RadioGroup$1.ItemIndicator, {}), jsx(RadioGroup$1.ItemText, { children: !!renderDisplay === true
                                        ? renderDisplay(item)
                                        : translate.t(removeIndex(`${colLabel}.${item}`)) })] }, `${colLabel}-${item}`));
                    }) }) }) }));
    }
    return (jsxs(Field, { label: `${translate.t(removeIndex(`${column}.field_label`))}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [isMultiple && (jsxs(Flex, { flexFlow: "wrap", gap: 1, children: [watchEnums.map((enumValue) => {
                        const item = enumValue;
                        if (item === undefined) {
                            return jsx(Fragment, { children: "undefined" });
                        }
                        return (jsx(Tag, { closable: true, onClick: () => {
                                setValue(column, watchEnums.filter((id) => id != item));
                            }, children: !!renderDisplay === true
                                ? renderDisplay(item)
                                : translate.t(removeIndex(`${colLabel}.${item}`)) }));
                    }), jsx(Tag, { cursor: "pointer", onClick: () => {
                            setOpenSearchResult(true);
                        }, children: translate.t(removeIndex(`${colLabel}.add_more`)) })] })), !isMultiple && (jsx(Button, { variant: "outline", onClick: () => {
                    setOpenSearchResult(true);
                }, justifyContent: "start", children: watchEnum === undefined
                    ? ""
                    : translate.t(removeIndex(`${colLabel}.${watchEnum}`)) })), jsxs(PopoverRoot, { open: openSearchResult, onOpenChange: (e) => setOpenSearchResult(e.open), closeOnInteractOutside: true, initialFocusEl: () => ref.current, positioning: { placement: "bottom-start" }, children: [jsx(PopoverTrigger, {}), jsx(PopoverContent, { children: jsxs(PopoverBody, { display: "grid", gap: 1, children: [jsx(Input, { placeholder: translate.t(`${column}.type_to_search`), onChange: (event) => {
                                        onSearchChange(event);
                                        setOpenSearchResult(true);
                                    }, autoComplete: "off", ref: ref }), jsx(PopoverTitle, {}), jsx(Text, { children: `${translate.t(`${column}.total`)}: ${count}, ${translate.t(`${column}.showing`)} ${limit}` }), jsxs(Grid, { gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", overflow: "auto", maxHeight: "50vh", children: [jsx(Flex, { flexFlow: "column wrap", children: filterArray(dataList, searchText ?? "").map((item) => {
                                                const selected = isMultiple
                                                    ? watchEnums.some((enumValue) => item === enumValue)
                                                    : watchEnum == item;
                                                return (jsx(Box, { cursor: "pointer", onClick: () => {
                                                        if (!isMultiple) {
                                                            setOpenSearchResult(false);
                                                            setValue(colLabel, item);
                                                            return;
                                                        }
                                                        const newSet = new Set([...(watchEnums ?? []), item]);
                                                        setValue(colLabel, [...newSet]);
                                                    }, ...(selected ? { color: "colorPalette.400/50" } : {}), children: !!renderDisplay === true
                                                        ? renderDisplay(item)
                                                        : translate.t(removeIndex(`${colLabel}.${item}`)) }, `${colLabel}-${item}`));
                                            }) }), isDirty && (jsx(Fragment, { children: dataList.length <= 0 && (jsx(Fragment, { children: translate.t(removeIndex(`${colLabel}.empty_search_result`)) })) }))] })] }) })] }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }));
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

const FileDropzone = ({ children = undefined, gridProps = {}, onDrop = () => { }, placeholder = "Drop files here or click to upload", }) => {
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
    const fileInput = useRef(null);
    const handleClick = () => {
        fileInput.current?.click();
    };
    const handleChange = (event) => {
        // @ts-expect-error find appropriate types for event target files
        const filesArray = [...event.target.files];
        onDrop({ files: filesArray });
    };
    return (jsxs(Grid, { ...getColor(isDraggedOver), ref: ref, cursor: "pointer", onClick: handleClick, borderStyle: "dashed", borderColor: "colorPalette.400", alignContent: "center", justifyContent: "center", borderWidth: 1, borderRadius: 4, ...gridProps, children: [children, !!children === false && (jsxs(Fragment, { children: [jsx(Flex, { children: placeholder }), jsx(Input, { type: "file", multiple: true, style: { display: "none" }, ref: fileInput, onChange: handleChange })] }))] }));
};

const FilePicker = ({ column, schema, prefix }) => {
    const { setValue, formState: { errors }, watch, } = useFormContext();
    const { translate } = useSchemaContext();
    const { required, gridColumn, gridRow } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const currentFiles = (watch(column) ?? []);
    const colLabel = `${prefix}${column}`;
    return (jsxs(Field, { label: `${translate.t(`${colLabel}.field_label`)}`, required: isRequired, gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", display: "grid", gridTemplateRows: "auto 1fr auto", alignItems: "stretch", children: [jsx(FileDropzone, { onDrop: ({ files }) => {
                    const newFiles = files.filter(({ name }) => !currentFiles.some((cur) => cur.name === name));
                    setValue(colLabel, [...currentFiles, ...newFiles]);
                }, placeholder: translate.t(removeIndex(`${colLabel}.fileDropzone`)) }), jsx(Flex, { flexFlow: "column", gap: 1, children: currentFiles.map((file) => {
                    return (jsx(Card.Root, { variant: "subtle", children: jsxs(Card.Body, { gap: "2", cursor: "pointer", onClick: () => {
                                setValue(column, currentFiles.filter(({ name }) => {
                                    return name !== file.name;
                                }));
                            }, display: "flex", flexFlow: "row", alignItems: "center", padding: "2", children: [file.type.startsWith("image/") && (jsx(Image, { src: URL.createObjectURL(file), alt: file.name, boxSize: "50px", objectFit: "cover", borderRadius: "md", marginRight: "2" })), jsx(Box, { children: file.name }), jsx(TiDeleteOutline, {})] }) }, file.name));
                }) }), errors[`${colLabel}`] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }));
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

const IdPicker = ({ column, schema, prefix, isMultiple = false, }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
    const { serverUrl, idMap, setIdMap, translate, schema: parentSchema, } = useSchemaContext();
    const { required, gridColumn, gridRow, renderDisplay, foreign_key } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const { table, column: column_ref, display_column, } = foreign_key;
    const [searchText, setSearchText] = useState();
    const [limit, setLimit] = useState(10);
    const [openSearchResult, setOpenSearchResult] = useState();
    const [page, setPage] = useState(0);
    const ref = useRef(null);
    const colLabel = `${prefix}${column}`;
    const query = useQuery({
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
    const watchId = watch(colLabel);
    const watchIds = (watch(colLabel) ?? []);
    useQuery({
        queryKey: [
            `idpicker`,
            { form: parentSchema.title, column, searchText, limit, page },
        ],
        queryFn: async () => {
            const data = await getTableData({
                serverUrl,
                searching: watchId,
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
    });
    const onSearchChange = async (event) => {
        setSearchText(event.target.value);
        setPage(0);
        setLimit(10);
    };
    const getPickedValue = () => {
        if (Object.keys(idMap).length <= 0) {
            return "";
        }
        const record = idMap[watchId];
        if (record === undefined) {
            return "";
        }
        if (!!renderDisplay === true) {
            return renderDisplay(record);
        }
        return record[display_column];
    };
    return (jsxs(Field, { label: `${translate.t(removeIndex(removeIndex(`${column}.field_label`)))}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [isMultiple && (jsxs(Flex, { flexFlow: "wrap", gap: 1, children: [watchIds.map((id) => {
                        const item = idMap[id];
                        if (item === undefined) {
                            return (jsx(Text, { children: translate.t(removeIndex(`${colLabel}.undefined`)) }, id));
                        }
                        return (jsx(Tag, { closable: true, onClick: () => {
                                setValue(column, watchIds.filter((id) => id != item[column_ref]));
                            }, children: !!renderDisplay === true
                                ? renderDisplay(item)
                                : item[display_column] }, id));
                    }), jsx(Tag, { cursor: "pointer", onClick: () => {
                            setOpenSearchResult(true);
                        }, children: translate.t(removeIndex(`${colLabel}.add_more`)) })] })), !isMultiple && (jsx(Button, { variant: "outline", onClick: () => {
                    setOpenSearchResult(true);
                }, justifyContent: "start", children: getPickedValue() })), jsxs(PopoverRoot, { open: openSearchResult, onOpenChange: (e) => setOpenSearchResult(e.open), closeOnInteractOutside: true, initialFocusEl: () => ref.current, positioning: { placement: "bottom-start", strategy: "fixed" }, children: [jsx(PopoverTrigger, {}), jsx(PopoverContent, { children: jsxs(PopoverBody, { display: "grid", gap: 1, children: [jsx(Input, { placeholder: translate.t(removeIndex(`${colLabel}.type_to_search`)), onChange: (event) => {
                                        onSearchChange(event);
                                        setOpenSearchResult(true);
                                    }, autoComplete: "off", ref: ref }), jsx(PopoverTitle, {}), (searchText?.length ?? 0) > 0 && (jsxs(Fragment, { children: [isFetching && jsx(Fragment, { children: "isFetching" }), isLoading && jsx(Fragment, { children: "isLoading" }), isPending && jsx(Fragment, { children: "isPending" }), (isFetching || isLoading || isPending) && jsx(Spinner, {}), isError && (jsx(Icon, { color: "red.400", children: jsx(BiError, {}) })), jsx(Text, { justifySelf: "center", children: `${translate.t(removeIndex(`${colLabel}.total`))} ${count}, ${translate.t(removeIndex(`${colLabel}.showing`))} ${limit}` }), jsxs(Grid, { gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", overflow: "auto", maxHeight: "50vh", children: [jsx(Flex, { flexFlow: "column wrap", children: 
                                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                    dataList.map((item) => {
                                                        const selected = isMultiple
                                                            ? watchIds.some((id) => item[column_ref] === id)
                                                            : watchId === item[column_ref];
                                                        return (jsx(Box, { cursor: "pointer", onClick: () => {
                                                                if (!isMultiple) {
                                                                    setOpenSearchResult(false);
                                                                    setValue(colLabel, item[column_ref]);
                                                                    return;
                                                                }
                                                                const newSet = new Set([
                                                                    ...(watchIds ?? []),
                                                                    item[column_ref],
                                                                ]);
                                                                setValue(colLabel, [...newSet]);
                                                            }, opacity: 0.7, _hover: { opacity: 1 }, ...(selected
                                                                ? { color: "colorPalette.400/50" }
                                                                : {}), children: !!renderDisplay === true
                                                                ? renderDisplay(item)
                                                                : item[display_column] }, item[column_ref]));
                                                    }) }), isDirty && (jsx(Fragment, { children: dataList.length <= 0 && (jsx(Text, { children: translate.t(removeIndex(`${colLabel}.empty_search_result`)) })) }))] }), jsx(PaginationRoot, { justifySelf: "center", count: count, pageSize: 10, defaultPage: 1, page: page + 1, onPageChange: (e) => setPage(e.page - 1), children: jsxs(HStack, { gap: "4", children: [jsx(PaginationPrevTrigger, {}), count > 0 && jsx(PaginationPageText, {}), jsx(PaginationNextTrigger, {})] }) })] }))] }) })] }), errors[`${colLabel}`] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }));
};

const NumberInputRoot = React.forwardRef(function NumberInput$1(props, ref) {
    const { children, ...rest } = props;
    return (jsxs(NumberInput.Root, { ref: ref, variant: "outline", ...rest, children: [children, jsxs(NumberInput.Control, { children: [jsx(NumberInput.IncrementTrigger, {}), jsx(NumberInput.DecrementTrigger, {})] })] }));
});
const NumberInputField$1 = NumberInput.Input;
NumberInput.Scrubber;
NumberInput.Label;

const NumberInputField = ({ schema, column, prefix, }) => {
    const { setValue, formState: { errors }, watch, } = useFormContext();
    const { translate } = useSchemaContext();
    const { required, gridColumn, gridRow } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const value = watch(`${colLabel}`);
    return (jsxs(Field, { label: `${translate.t(removeIndex(`${colLabel}.field_label`))}`, required: isRequired, gridColumn, gridRow, children: [jsx(NumberInputRoot, { children: jsx(NumberInputField$1, { required: isRequired, value: value, onChange: (event) => {
                        setValue(`${colLabel}`, Number(event.target.value));
                    } }) }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }));
};

const ObjectInput = ({ schema, column, prefix }) => {
    const { properties, gridRow, gridColumn = "1/span 12", required } = schema;
    const { translate } = useSchemaContext();
    const colLabel = `${prefix}${column}`;
    const isRequired = required?.some((columnId) => columnId === column);
    const { formState: { errors }, } = useFormContext();
    if (properties === undefined) {
        throw new Error(`properties is undefined when using ObjectInput`);
    }
    return (jsxs(Box, { gridRow, gridColumn, children: [jsxs(Box, { as: "label", gridColumn: "1/span12", children: [`${translate.t(removeIndex(`${colLabel}.field_label`))}`, isRequired && jsx("span", { children: "*" })] }), jsx(Grid, { gap: "4", padding: "4", gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: `repeat("auto-fit", auto)`, children: Object.keys(properties ?? {}).map((key) => {
                    return (
                    // @ts-expect-error find suitable types
                    jsx(ColumnRenderer, { column: `${key}`,
                        prefix: `${prefix}${column}.`,
                        properties }, `form-${colLabel}-${key}`));
                }) }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }));
};

const RecordInput$1 = ({ column, schema, prefix }) => {
    const { formState: { errors }, setValue, getValues, } = useFormContext();
    const { translate } = useSchemaContext();
    const { required, gridColumn, gridRow } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const entries = Object.entries(getValues(column) ?? {});
    const [showNewEntries, setShowNewEntries] = useState(false);
    const [newKey, setNewKey] = useState();
    const [newValue, setNewValue] = useState();
    return (jsxs(Field, { label: `${translate.t(`${column}.field_label`)}`, required: isRequired, alignItems: "stretch", gridColumn, gridRow, children: [entries.map(([key, value]) => {
                return (jsxs(Grid, { templateColumns: "1fr 1fr auto", gap: 1, children: [jsx(Input, { value: key, onChange: (e) => {
                                const filtered = entries.filter(([target]) => {
                                    return target !== key;
                                });
                                setValue(column, Object.fromEntries([...filtered, [e.target.value, value]]));
                            }, autoComplete: "off" }), jsx(Input, { value: value, onChange: (e) => {
                                setValue(column, {
                                    ...getValues(column),
                                    [key]: e.target.value,
                                });
                            }, autoComplete: "off" }), jsx(IconButton, { variant: "ghost", onClick: () => {
                                const filtered = entries.filter(([target]) => {
                                    return target !== key;
                                });
                                setValue(column, Object.fromEntries([...filtered]));
                            }, children: jsx(CgClose, {}) })] }));
            }), jsx(Show, { when: showNewEntries, children: jsxs(Card.Root, { children: [jsx(Card.Body, { gap: "2", children: jsxs(Grid, { templateColumns: "1fr 1fr auto", gap: 1, children: [jsx(Input, { value: newKey, onChange: (e) => {
                                            setNewKey(e.target.value);
                                        }, autoComplete: "off" }), jsx(Input, { value: newValue, onChange: (e) => {
                                            setNewValue(e.target.value);
                                        }, autoComplete: "off" })] }) }), jsxs(Card.Footer, { justifyContent: "flex-end", children: [jsx(IconButton, { variant: "subtle", onClick: () => {
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
                                    }, children: translate.t(`${column}.save`) })] })] }) }), jsx(Button, { onClick: () => {
                    setShowNewEntries(true);
                    setNewKey(undefined);
                    setNewValue(undefined);
                }, children: translate.t(`${column}.addNew`) }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: translate.t(`${column}.field_required`) }))] }));
};

const StringInputField = ({ column, schema, prefix, }) => {
    const { register, formState: { errors }, } = useFormContext();
    const { translate } = useSchemaContext();
    const { required, gridColumn, gridRow } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    return (jsx(Fragment, { children: jsxs(Field, { label: `${translate.t(removeIndex(`${colLabel}.field_label`))}`, required: isRequired, gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", children: [jsx(Input, { ...register(`${colLabel}`, { required: isRequired }), autoComplete: "off" }), errors[colLabel] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }) }));
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
    const { serverUrl } = useSchemaContext();
    if (schema.properties == undefined) {
        throw new Error("schema properties undefined when using DatePicker");
    }
    const { gridColumn, gridRow, in_table, object_id_column } = schema;
    if (in_table === undefined) {
        throw new Error("in_table is undefined when using TagPicker");
    }
    if (object_id_column === undefined) {
        throw new Error("object_id_column is undefined when using TagPicker");
    }
    const query = useQuery({
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
    const existingTagsQuery = useQuery({
        queryKey: [`existing`, { in_table, object_id_column }, object_id],
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
        return jsx(Fragment, {});
    }
    return (jsxs(Flex, { flexFlow: "column", gap: 4, gridColumn,
        gridRow, children: [isFetching && jsx(Fragment, { children: "isFetching" }), isLoading && jsx(Fragment, { children: "isLoading" }), isPending && jsx(Fragment, { children: "isPending" }), isError && jsx(Fragment, { children: "isError" }), dataList.map(({ parent_tag_name, all_tags, is_mutually_exclusive }) => {
                return (jsxs(Flex, { flexFlow: "column", gap: 2, children: [jsx(Text, { children: parent_tag_name }), is_mutually_exclusive && (jsx(RadioCardRoot, { defaultValue: "next", variant: "surface", onValueChange: (tagIds) => {
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
                            }, children: jsx(Flex, { flexFlow: "wrap", gap: 2, children: Object.entries(all_tags).map(([tagName, { id }]) => {
                                    if (existingTagList.some(({ tag_id }) => tag_id === id)) {
                                        return (jsx(RadioCardItem, { label: tagName, value: id, flex: "0 0 0%", disabled: true }, `${tagName}-${id}`));
                                    }
                                    return (jsx(RadioCardItem, { label: tagName, value: id, flex: "0 0 0%", colorPalette: "blue" }, `${tagName}-${id}`));
                                }) }) })), !is_mutually_exclusive && (jsx(CheckboxGroup, { onValueChange: (tagIds) => {
                                setValue(`${column}.${parent_tag_name}.current`, tagIds);
                            }, children: jsx(Flex, { flexFlow: "wrap", gap: 2, children: Object.entries(all_tags).map(([tagName, { id }]) => {
                                    if (existingTagList.some(({ tag_id }) => tag_id === id)) {
                                        return (jsx(CheckboxCard, { label: tagName, value: id, flex: "0 0 0%", disabled: true, colorPalette: "blue" }, `${tagName}-${id}`));
                                    }
                                    return (jsx(CheckboxCard, { label: tagName, value: id, flex: "0 0 0%" }, `${tagName}-${id}`));
                                }) }) }))] }, `tag-${parent_tag_name}`));
            }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: (errors[`${column}`]?.message ?? "No error message") }))] }));
};

const TextAreaInput = ({ column, schema, prefix, }) => {
    const { register, formState: { errors }, } = useFormContext();
    const { translate } = useSchemaContext();
    const { required, gridColumn, gridRow } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    return (jsx(Fragment, { children: jsxs(Field, { label: `${translate.t(removeIndex(`${colLabel}.field_label`))}`, required: isRequired, gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", children: [jsx(Textarea, { ...register(`${colLabel}`, { required: isRequired }), autoComplete: "off" }), errors[colLabel] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }) }));
};

function TimePicker$1({ hour, setHour, minute, setMinute, meridiem, setMeridiem, meridiemLabel = {
    am: "am",
    pm: "pm",
}, onChange = () => { }, }) {
    const hours = Array.from({ length: 12 }, (_, i) => {
        const hour = i + 1;
        return hour.toString().padStart(2, "0");
    });
    const minutes = Array.from({ length: 60 }, (_, i) => {
        return i.toString().padStart(2, "0");
    });
    const hoursCollection = createListCollection({
        items: hours.map((hour) => ({
            value: hour,
            label: hour,
        })),
    });
    const minutesCollection = createListCollection({
        items: minutes.map((hour) => ({
            value: hour,
            label: hour,
        })),
    });
    const meridiemsCollection = createListCollection({
        items: ["am", "pm"].map((hour) => ({
            value: hour,
            label: meridiemLabel[hour] ?? hour,
        })),
    });
    return (jsxs(Grid, { templateColumns: "auto  auto", gap: "4", children: [jsxs(Flex, { justifyContent: "center", alignItems: "center", gap: "2", children: [jsxs(Select.Root, { value: [`${hour.toString().padStart(2, "0")}`], onValueChange: (e) => {
                            setHour(parseInt(e.value[0]));
                            onChange({ hour: parseInt(e.value[0]), minute, meridiem });
                        }, collection: hoursCollection, positioning: { sameWidth: true, placement: "bottom" }, children: [jsx(Select.HiddenSelect, {}), jsx(Select.Control, { children: jsx(Select.Trigger, { children: jsx(Select.ValueText, { placeholder: "Hour" }) }) }), jsx(Select.Positioner, { children: jsx(Select.Content, { width: "full", children: hoursCollection.items.map(({ value: hour }) => (jsxs(Select.Item, { item: hour, children: [hour, jsx(Select.ItemIndicator, {})] }, hour))) }) })] }), jsx(Text, { children: ":" }), jsxs(Select.Root, { value: [`${minute.toString().padStart(2, "0")}`], onValueChange: (e) => {
                            setMinute(parseInt(e.value[0]));
                            onChange({ hour, minute: parseInt(e.value[0]), meridiem });
                        }, collection: minutesCollection, positioning: { sameWidth: true, placement: "bottom" }, children: [jsx(Select.HiddenSelect, {}), jsx(Select.Control, { children: jsx(Select.Trigger, { children: jsx(Select.ValueText, { placeholder: "Minute" }) }) }), jsx(Select.Positioner, { children: jsx(Select.Content, { width: "full", children: minutes.map((minute) => (jsxs(Select.Item, { item: minute, children: [minute, jsx(Select.ItemIndicator, {})] }, minute))) }) })] })] }), jsxs(Select.Root, { value: [meridiem], onValueChange: (e) => {
                    setMeridiem(e.value[0]);
                    onChange({ hour, minute, meridiem: e.value[0] });
                }, collection: meridiemsCollection, positioning: { sameWidth: true, placement: "bottom" }, children: [jsx(Select.HiddenSelect, {}), jsx(Select.Control, { children: jsx(Select.Trigger, { children: jsx(Select.ValueText, { placeholder: "am/pm" }) }) }), jsx(Select.Positioner, { children: jsx(Select.Content, { width: "full", children: meridiemsCollection.items.map(({ value: hour, label }) => (jsxs(Select.Item, { item: hour, children: [label, jsx(Select.ItemIndicator, {})] }, hour))) }) })] })] }));
}

const TimePicker = ({ column, schema, prefix }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
    const { translate } = useSchemaContext();
    const { required, gridColumn, gridRow } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const [open, setOpen] = useState(false);
    const value = watch(colLabel);
    const formatedTime = dayjs(value).format("hh:mm A");
    // Parse the initial time parts from the ISO time string (HH:mm:ss)
    const parseTime = (isoTime) => {
        if (!isoTime)
            return { hour: 12, minute: 0, meridiem: "am" };
        const parsed = dayjs(isoTime);
        if (!parsed.isValid())
            return { hour: 12, minute: 0, meridiem: "am" };
        let hour = parsed.hour();
        const minute = parsed.minute();
        const meridiem = hour >= 12 ? "pm" : "am";
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
    // Convert hour, minute, meridiem to 24-hour ISO time string
    const toIsoTime = (hour, minute, meridiem) => {
        let h = hour;
        if (meridiem === "am" && hour === 12)
            h = 0;
        else if (meridiem === "pm" && hour < 12)
            h = hour + 12;
        return dayjs().hour(h).minute(minute).second(0).toISOString();
    };
    // Handle changes to time parts
    const handleTimeChange = ({ hour: newHour, minute: newMinute, meridiem: newMeridiem, }) => {
        setHour(newHour);
        setMinute(newMinute);
        setMeridiem(newMeridiem);
        const isoTime = toIsoTime(newHour, newMinute, newMeridiem);
        setValue(colLabel, isoTime, { shouldValidate: true, shouldDirty: true });
    };
    const containerRef = useRef(null);
    return (jsxs(Field, { label: `${translate.t(removeIndex(`${colLabel}.field_label`))}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [jsxs(Popover.Root, { open: open, onOpenChange: (e) => setOpen(e.open), closeOnInteractOutside: true, children: [jsx(Popover.Trigger, { asChild: true, children: jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
                                setOpen(true);
                            }, justifyContent: "start", children: [jsx(IoMdClock, {}), value !== undefined ? `${formatedTime}` : ""] }) }), jsx(Portal, { children: jsx(Popover.Positioner, { children: jsx(Popover.Content, { ref: containerRef, children: jsx(Popover.Body, { children: jsx(TimePicker$1, { hour: hour, setHour: setHour, minute: minute, setMinute: setMinute, meridiem: meridiem, setMeridiem: setMeridiem, onChange: handleTimeChange, meridiemLabel: {
                                            am: translate.t(removeIndex(`${colLabel}.am`)),
                                            pm: translate.t(removeIndex(`${colLabel}.pm`)),
                                        } }) }) }) }) })] }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }));
};

const SchemaRenderer = ({ schema, prefix, column, }) => {
    const colSchema = schema;
    const { type, variant, properties: innerProperties, foreign_key, format, items, } = schema;
    if (variant === "custom-input") {
        return jsx(CustomInput, { schema: colSchema, prefix, column });
    }
    if (type === "string") {
        if ((schema.enum ?? []).length > 0) {
            return jsx(EnumPicker, { schema: colSchema, prefix, column });
        }
        if (variant === "id-picker") {
            idPickerSanityCheck(column, foreign_key);
            return jsx(IdPicker, { schema: colSchema, prefix, column });
        }
        if (format === "date") {
            return jsx(DatePicker, { schema: colSchema, prefix, column });
        }
        if (format === "time") {
            return jsx(TimePicker, { schema: colSchema, prefix, column });
        }
        if (variant === "text-area") {
            return jsx(TextAreaInput, { schema: colSchema, prefix, column });
        }
        return jsx(StringInputField, { schema: colSchema, prefix, column });
    }
    if (type === "number" || type === "integer") {
        return jsx(NumberInputField, { schema: colSchema, prefix, column });
    }
    if (type === "boolean") {
        return jsx(BooleanPicker, { schema: colSchema, prefix, column });
    }
    if (type === "object") {
        if (innerProperties) {
            return jsx(ObjectInput, { schema: colSchema, prefix, column });
        }
        return jsx(RecordInput$1, { schema: colSchema, prefix, column });
    }
    if (type === "array") {
        if (variant === "id-picker") {
            idPickerSanityCheck(column, foreign_key);
            return (jsx(IdPicker, { schema: colSchema, prefix, column, isMultiple: true }));
        }
        if (variant === "tag-picker") {
            return jsx(TagPicker, { schema: colSchema, prefix, column });
        }
        if (variant === "file-picker") {
            return jsx(FilePicker, { schema: colSchema, prefix, column });
        }
        if (items) {
            return jsx(ArrayRenderer, { schema: colSchema, prefix, column });
        }
        return jsx(Text, { children: `array ${column}` });
    }
    if (type === "null") {
        return jsx(Text, { children: `null ${column}` });
    }
    return jsx(Text, { children: "missing type" });
};

const ColumnRenderer = ({ column, properties, prefix, }) => {
    const colSchema = properties[column];
    const colLabel = `${prefix}${column}`;
    if (colSchema === undefined) {
        throw new Error(`${colLabel} does not exist when using ColumnRenderer`);
    }
    return jsx(SchemaRenderer, { schema: colSchema, prefix, column });
};

const ArrayViewer = ({ schema, column, prefix }) => {
    const { gridRow, gridColumn = "1/span 12", required, items } = schema;
    const { translate } = useSchemaContext();
    const colLabel = `${prefix}${column}`;
    const isRequired = required?.some((columnId) => columnId === column);
    const { watch, formState: { errors }, } = useFormContext();
    const values = watch(colLabel) ?? [];
    return (jsxs(Box, { gridRow, gridColumn, children: [jsxs(Box, { as: "label", gridColumn: "1/span12", children: [`${translate.t(removeIndex(`${colLabel}.field_label`))}`, isRequired && jsx("span", { children: "*" })] }), values.map((field, index) => (jsx(Flex, { flexFlow: "column", children: jsx(Grid, { gap: "4", padding: "4", gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: `repeat("auto-fit", auto)`, children: jsx(SchemaViewer, { column: `${index}`,
                        prefix: `${colLabel}.`,
                        schema: items }) }) }, `form-${prefix}${column}.${index}`))), errors[`${column}`] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }));
};

const BooleanViewer = ({ schema, column, prefix, }) => {
    const { watch, formState: { errors }, } = useFormContext();
    const { translate } = useSchemaContext();
    const { required, gridColumn, gridRow } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const value = watch(colLabel);
    return (jsxs(Field, { label: `${translate.t(removeIndex(`${colLabel}.field_label`))}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [jsx(Text, { children: value
                    ? translate.t(removeIndex(`${colLabel}.true`))
                    : translate.t(removeIndex(`${colLabel}.false`)) }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }));
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
    const { translate } = useSchemaContext();
    const { required, gridColumn = "span 4", gridRow = "span 1", displayDateFormat = "YYYY-MM-DD", } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const selectedDate = watch(colLabel);
    const displayDate = dayjs.utc(selectedDate).format(displayDateFormat);
    return (jsxs(Field, { label: `${translate.t(removeIndex(`${column}.field_label`))}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [jsxs(Text, { children: [" ", selectedDate !== undefined ? displayDate : ""] }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: translate.t(`${column}.field_required`) }))] }));
};

const EnumViewer = ({ column, isMultiple = false, schema, prefix, }) => {
    const { watch, formState: { errors }, } = useFormContext();
    const { translate } = useSchemaContext();
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const { gridColumn, gridRow, renderDisplay } = schema;
    const colLabel = `${prefix}${column}`;
    const watchEnum = watch(colLabel);
    const watchEnums = (watch(colLabel) ?? []);
    return (jsxs(Field, { label: `${translate.t(removeIndex(`${column}.field_label`))}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [isMultiple && (jsx(Flex, { flexFlow: "wrap", gap: 1, children: watchEnums.map((enumValue) => {
                    const item = enumValue;
                    if (item === undefined) {
                        return jsx(Fragment, { children: "undefined" });
                    }
                    return (jsx(Tag, { closable: true, children: !!renderDisplay === true
                            ? renderDisplay(item)
                            : translate.t(removeIndex(`${colLabel}.${item}`)) }));
                }) })), !isMultiple && (jsx(Text, { children: translate.t(removeIndex(`${colLabel}.${watchEnum}`)) })), errors[`${column}`] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }));
};

const FileViewer = ({ column, schema, prefix }) => {
    const { watch } = useFormContext();
    const { translate } = useSchemaContext();
    const { required, gridColumn, gridRow } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const currentFiles = (watch(column) ?? []);
    const colLabel = `${prefix}${column}`;
    return (jsx(Field, { label: `${translate.t(`${colLabel}.field_label`)}`, required: isRequired, gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", display: "grid", gridTemplateRows: "auto 1fr auto", alignItems: "stretch", children: jsx(Flex, { flexFlow: "column", gap: 1, children: currentFiles.map((file) => {
                return (jsx(Card.Root, { variant: "subtle", children: jsxs(Card.Body, { gap: "2", display: "flex", flexFlow: "row", alignItems: "center", padding: "2", children: [file.type.startsWith("image/") && (jsx(Image, { src: URL.createObjectURL(file), alt: file.name, boxSize: "50px", objectFit: "cover", borderRadius: "md", marginRight: "2" })), jsx(Box, { children: file.name })] }) }, file.name));
            }) }) }));
};

const IdViewer = ({ column, schema, prefix, isMultiple = false, }) => {
    const { watch, formState: { errors }, } = useFormContext();
    const { idMap, translate } = useSchemaContext();
    const { required, gridColumn, gridRow, renderDisplay, foreign_key } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const { display_column } = foreign_key;
    const colLabel = `${prefix}${column}`;
    const watchId = watch(colLabel);
    const watchIds = (watch(colLabel) ?? []);
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
    return (jsxs(Field, { label: `${translate.t(removeIndex(`${column}.field_label`))}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [isMultiple && (jsx(Flex, { flexFlow: "wrap", gap: 1, children: watchIds.map((id) => {
                    const item = idMap[id];
                    if (item === undefined) {
                        return (jsx(Text, { children: translate.t(removeIndex(`${colLabel}.undefined`)) }, id));
                    }
                    return (jsx(Tag, { closable: true, children: !!renderDisplay === true
                            ? renderDisplay(item)
                            : item[display_column] }, id));
                }) })), !isMultiple && jsx(Text, { children: getPickedValue() }), errors[`${colLabel}`] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }));
};

const NumberViewer = ({ schema, column, prefix, }) => {
    const { watch, formState: { errors }, } = useFormContext();
    const { translate } = useSchemaContext();
    const { required, gridColumn, gridRow } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const value = watch(colLabel);
    return (jsxs(Field, { label: `${translate.t(removeIndex(`${colLabel}.field_label`))}`, required: isRequired, gridColumn, gridRow, children: [jsx(Text, { children: value }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }));
};

const ObjectViewer = ({ schema, column, prefix }) => {
    const { properties, gridRow, gridColumn = "1/span 12", required } = schema;
    const { translate } = useSchemaContext();
    const colLabel = `${prefix}${column}`;
    const isRequired = required?.some((columnId) => columnId === column);
    const { formState: { errors }, } = useFormContext();
    if (properties === undefined) {
        throw new Error(`properties is undefined when using ObjectInput`);
    }
    return (jsxs(Box, { gridRow, gridColumn, children: [jsxs(Box, { as: "label", gridColumn: "1/span12", children: [`${translate.t(removeIndex(`${colLabel}.field_label`))}`, isRequired && jsx("span", { children: "*" })] }), jsx(Grid, { gap: "4", padding: "4", gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: `repeat("auto-fit", auto)`, children: Object.keys(properties ?? {}).map((key) => {
                    return (
                    // @ts-expect-error find suitable types
                    jsx(ColumnViewer, { column: `${key}`,
                        prefix: `${prefix}${column}.`,
                        properties }, `form-objectviewer-${colLabel}-${key}`));
                }) }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }));
};

const RecordInput = ({ column, schema, prefix }) => {
    const { formState: { errors }, setValue, getValues, } = useFormContext();
    const { translate } = useSchemaContext();
    const { required, gridColumn, gridRow } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const entries = Object.entries(getValues(column) ?? {});
    const [showNewEntries, setShowNewEntries] = useState(false);
    const [newKey, setNewKey] = useState();
    const [newValue, setNewValue] = useState();
    return (jsxs(Field, { label: `${translate.t(`${column}.field_label`)}`, required: isRequired, alignItems: "stretch", gridColumn, gridRow, children: [entries.map(([key, value]) => {
                return (jsxs(Grid, { templateColumns: "1fr 1fr auto", gap: 1, children: [jsx(Input, { value: key, onChange: (e) => {
                                const filtered = entries.filter(([target]) => {
                                    return target !== key;
                                });
                                setValue(column, Object.fromEntries([...filtered, [e.target.value, value]]));
                            }, autoComplete: "off" }), jsx(Input, { value: value, onChange: (e) => {
                                setValue(column, {
                                    ...getValues(column),
                                    [key]: e.target.value,
                                });
                            }, autoComplete: "off" }), jsx(IconButton, { variant: "ghost", onClick: () => {
                                const filtered = entries.filter(([target]) => {
                                    return target !== key;
                                });
                                setValue(column, Object.fromEntries([...filtered]));
                            }, children: jsx(CgClose, {}) })] }));
            }), jsx(Show, { when: showNewEntries, children: jsxs(Card.Root, { children: [jsx(Card.Body, { gap: "2", children: jsxs(Grid, { templateColumns: "1fr 1fr auto", gap: 1, children: [jsx(Input, { value: newKey, onChange: (e) => {
                                            setNewKey(e.target.value);
                                        }, autoComplete: "off" }), jsx(Input, { value: newValue, onChange: (e) => {
                                            setNewValue(e.target.value);
                                        }, autoComplete: "off" })] }) }), jsxs(Card.Footer, { justifyContent: "flex-end", children: [jsx(IconButton, { variant: "subtle", onClick: () => {
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
                                    }, children: translate.t(`${column}.save`) })] })] }) }), jsx(Button, { onClick: () => {
                    setShowNewEntries(true);
                    setNewKey(undefined);
                    setNewValue(undefined);
                }, children: translate.t(`${column}.addNew`) }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: translate.t(`${column}.field_required`) }))] }));
};

const StringViewer = ({ column, schema, prefix, }) => {
    const { watch, formState: { errors }, } = useFormContext();
    const { translate } = useSchemaContext();
    const { required, gridColumn, gridRow } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const value = watch(colLabel);
    return (jsx(Fragment, { children: jsxs(Field, { label: `${translate.t(removeIndex(`${colLabel}.field_label`))}`, required: isRequired, gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", children: [jsx(Text, { children: value }), errors[colLabel] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }) }));
};

const TagViewer = ({ column, schema, prefix }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
    const { serverUrl } = useSchemaContext();
    if (schema.properties == undefined) {
        throw new Error("schema properties undefined when using DatePicker");
    }
    const { gridColumn, gridRow, in_table, object_id_column } = schema;
    if (in_table === undefined) {
        throw new Error("in_table is undefined when using TagPicker");
    }
    if (object_id_column === undefined) {
        throw new Error("object_id_column is undefined when using TagPicker");
    }
    const query = useQuery({
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
    const existingTagsQuery = useQuery({
        queryKey: [`existing`, { in_table, object_id_column }, object_id],
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
        return jsx(Fragment, {});
    }
    return (jsxs(Flex, { flexFlow: "column", gap: 4, gridColumn,
        gridRow, children: [isFetching && jsx(Fragment, { children: "isFetching" }), isLoading && jsx(Fragment, { children: "isLoading" }), isPending && jsx(Fragment, { children: "isPending" }), isError && jsx(Fragment, { children: "isError" }), dataList.map(({ parent_tag_name, all_tags, is_mutually_exclusive }) => {
                return (jsxs(Flex, { flexFlow: "column", gap: 2, children: [jsx(Text, { children: parent_tag_name }), is_mutually_exclusive && (jsx(RadioCardRoot, { defaultValue: "next", variant: "surface", onValueChange: (tagIds) => {
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
                            }, children: jsx(Flex, { flexFlow: "wrap", gap: 2, children: Object.entries(all_tags).map(([tagName, { id }]) => {
                                    if (existingTagList.some(({ tag_id }) => tag_id === id)) {
                                        return (jsx(RadioCardItem, { label: tagName, value: id, flex: "0 0 0%", disabled: true }, `${tagName}-${id}`));
                                    }
                                    return (jsx(RadioCardItem, { label: tagName, value: id, flex: "0 0 0%", colorPalette: "blue" }, `${tagName}-${id}`));
                                }) }) })), !is_mutually_exclusive && (jsx(CheckboxGroup, { onValueChange: (tagIds) => {
                                setValue(`${column}.${parent_tag_name}.current`, tagIds);
                            }, children: jsx(Flex, { flexFlow: "wrap", gap: 2, children: Object.entries(all_tags).map(([tagName, { id }]) => {
                                    if (existingTagList.some(({ tag_id }) => tag_id === id)) {
                                        return (jsx(CheckboxCard, { label: tagName, value: id, flex: "0 0 0%", disabled: true, colorPalette: "blue" }, `${tagName}-${id}`));
                                    }
                                    return (jsx(CheckboxCard, { label: tagName, value: id, flex: "0 0 0%" }, `${tagName}-${id}`));
                                }) }) }))] }, `tag-${parent_tag_name}`));
            }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: (errors[`${column}`]?.message ?? "No error message") }))] }));
};

const TextAreaViewer = ({ column, schema, prefix, }) => {
    const { watch, formState: { errors }, } = useFormContext();
    const { translate } = useSchemaContext();
    const { required, gridColumn, gridRow } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const value = watch(colLabel);
    return (jsx(Fragment, { children: jsxs(Field, { label: `${translate.t(removeIndex(`${colLabel}.field_label`))}`, required: isRequired, gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", children: [jsx(Text, { whiteSpace: "pre-wrap", children: value }), " ", errors[colLabel] && (jsx(Text, { color: "red.400", children: translate.t(removeIndex(`${colLabel}.field_required`)) }))] }) }));
};

const TimeViewer = ({ column, schema, prefix }) => {
    const { watch, formState: { errors }, } = useFormContext();
    const { translate } = useSchemaContext();
    const { required, gridColumn, gridRow } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const colLabel = `${prefix}${column}`;
    const selectedDate = watch(colLabel);
    return (jsxs(Field, { label: `${translate.t(removeIndex(`${column}.field_label`))}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [jsx(Text, { children: selectedDate !== undefined
                    ? dayjs(selectedDate).format("hh:mm A")
                    : "" }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: translate.t(`${column}.field_required`) }))] }));
};

const SchemaViewer = ({ schema, prefix, column, }) => {
    const colSchema = schema;
    const { type, variant, properties: innerProperties, foreign_key, items, } = schema;
    if (variant === "custom-input") {
        return jsx(CustomViewer, { schema: colSchema, prefix, column });
    }
    if (type === "string") {
        if ((schema.enum ?? []).length > 0) {
            return jsx(EnumViewer, { schema: colSchema, prefix, column });
        }
        if (variant === "id-picker") {
            idPickerSanityCheck(column, foreign_key);
            return jsx(IdViewer, { schema: colSchema, prefix, column });
        }
        if (variant === "date-picker") {
            return jsx(DateViewer, { schema: colSchema, prefix, column });
        }
        if (variant === "time-picker") {
            return jsx(TimeViewer, { schema: colSchema, prefix, column });
        }
        if (variant === "text-area") {
            return jsx(TextAreaViewer, { schema: colSchema, prefix, column });
        }
        return jsx(StringViewer, { schema: colSchema, prefix, column });
    }
    if (type === "number" || type === "integer") {
        return jsx(NumberViewer, { schema: colSchema, prefix, column });
    }
    if (type === "boolean") {
        return jsx(BooleanViewer, { schema: colSchema, prefix, column });
    }
    if (type === "object") {
        if (innerProperties) {
            return jsx(ObjectViewer, { schema: colSchema, prefix, column });
        }
        return jsx(RecordInput, { schema: colSchema, prefix, column });
    }
    if (type === "array") {
        if (variant === "id-picker") {
            idPickerSanityCheck(column, foreign_key);
            return (jsx(IdViewer, { schema: colSchema, prefix, column, isMultiple: true }));
        }
        if (variant === "tag-picker") {
            return jsx(TagViewer, { schema: colSchema, prefix, column });
        }
        if (variant === "file-picker") {
            return jsx(FileViewer, { schema: colSchema, prefix, column });
        }
        if (items) {
            return jsx(ArrayViewer, { schema: colSchema, prefix, column });
        }
        return jsx(Text, { children: `array ${column}` });
    }
    if (type === "null") {
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
    const { translate, setValidatedData, setIsError, setIsConfirming } = useSchemaContext();
    const methods = useFormContext();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onValid = (data) => {
        setValidatedData(data);
        setIsError(false);
        setIsConfirming(true);
    };
    return (jsx(Button$1, { onClick: () => {
            methods.handleSubmit(onValid)();
        }, formNoValidate: true, children: translate.t("submit") }));
};

const FormBody = () => {
    const { schema, requestUrl, order, ignore, include, onSubmit, rowNumber, translate, requestOptions, isSuccess, setIsSuccess, isError, setIsError, isSubmiting, setIsSubmiting, isConfirming, setIsConfirming, validatedData, setValidatedData, error, setError, getUpdatedData, } = useSchemaContext();
    const methods = useFormContext();
    const { properties } = schema;
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
            onBeforeSubmit();
            await promise;
            onSubmitSuccess();
        }
        catch (error) {
            onSubmitError(error);
        }
        finally {
            onAfterSubmit();
        }
    };
    const defaultSubmitPromise = (data) => {
        const options = {
            method: "POST",
            url: `${requestUrl}`,
            data: clearEmptyString(data),
            ...requestOptions,
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
    if (isSuccess) {
        return (jsxs(Flex, { flexFlow: "column", gap: "2", children: [jsxs(Alert.Root, { status: "success", children: [jsx(Alert.Indicator, {}), jsx(Alert.Title, { children: translate.t("submit_success") })] }), jsx(Flex, { justifyContent: "end", children: jsx(Button$1, { onClick: async () => {
                            setIsError(false);
                            setIsSubmiting(false);
                            setIsSuccess(false);
                            setIsConfirming(false);
                            setValidatedData(undefined);
                            const data = await getUpdatedData();
                            methods.reset(data);
                        }, formNoValidate: true, children: translate.t("submit_again") }) })] }));
    }
    if (isConfirming) {
        return (jsxs(Flex, { flexFlow: "column", gap: "2", children: [jsx(Grid, { gap: 4, gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: `repeat(${rowNumber ?? "auto-fit"}, auto)`, children: ordered.map((column) => {
                        return (jsx(ColumnViewer
                        // @ts-expect-error find suitable types
                        , { 
                            // @ts-expect-error find suitable types
                            properties: properties, prefix: ``, column }, `form-viewer-${column}`));
                    }) }), jsxs(Flex, { justifyContent: "end", gap: "2", children: [jsx(Button$1, { onClick: () => {
                                setIsConfirming(false);
                            }, variant: "subtle", children: translate.t("cancel") }), jsx(Button$1, { onClick: () => {
                                onFormSubmit(validatedData);
                            }, children: translate.t("confirm") })] }), isSubmiting && (jsx(Box, { pos: "absolute", inset: "0", bg: "bg/80", children: jsx(Center, { h: "full", children: jsx(Spinner, { color: "teal.500" }) }) })), isError && (jsx(Fragment, { children: jsx(Alert.Root, { status: "error", children: jsx(Alert.Title, { children: jsx(AccordionRoot, { collapsible: true, defaultValue: [], children: jsxs(AccordionItem, { value: "b", children: [jsxs(AccordionItemTrigger, { children: [jsx(Alert.Indicator, {}), `${error}`] }), jsx(AccordionItemContent, { children: `${JSON.stringify(error)}` })] }) }) }) }) }))] }));
    }
    return (jsxs(Flex, { flexFlow: "column", gap: "2", children: [jsx(Grid, { gap: "4", gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: `repeat(${rowNumber ?? "auto-fit"}, auto)`, children: ordered.map((column) => {
                    return (jsx(ColumnRenderer
                    // @ts-expect-error find suitable types
                    , { 
                        // @ts-expect-error find suitable types
                        properties: properties, prefix: ``, column }, `form-input-${column}`));
                }) }), jsxs(Flex, { justifyContent: "end", gap: "2", children: [jsx(Button$1, { onClick: () => {
                            methods.reset();
                        }, variant: "subtle", children: translate.t("reset") }), jsx(SubmitButton, {})] })] }));
};

const FormTitle = () => {
    const { translate } = useSchemaContext();
    return jsx(Heading, { children: translate.t("title") });
};

const DefaultForm = ({ formConfig, showTitle = true, }) => {
    return (jsx(FormRoot, { ...formConfig, children: jsxs(Grid, { gap: "2", children: [showTitle && jsx(FormTitle, {}), jsx(FormBody, {})] }) }));
};

const useForm = ({ preLoadedValues, keyPrefix }) => {
    const form = useForm$1({
        values: preLoadedValues,
    });
    const [idMap, setIdMap] = useState({});
    const translate = useTranslation("", { keyPrefix });
    return {
        form,
        idMap,
        setIdMap,
        translate,
    };
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

export { CardHeader, DataDisplay, DataTable, DataTableServer, DefaultCardTitle, DefaultForm, DefaultTable, DensityToggleButton, EditSortingButton, EmptyState$1 as EmptyState, ErrorAlert, FilterDialog, FilterOptions, FormBody, FormRoot, FormTitle, GlobalFilter, PageSizeControl, Pagination, RecordDisplay, ReloadButton, ResetFilteringButton, ResetSelectionButton, ResetSortingButton, RowCountText, Table, TableBody, TableCardContainer, TableCards, TableComponent, TableControls, TableDataDisplay, TableFilter, TableFilterTags, TableFooter, TableHeader, TableLoadingComponent, TableSelector, TableSorter, TableViewer, TextCell, ViewDialog, getColumns, getMultiDates, getRangeDates, idPickerSanityCheck, useDataTable, useDataTableContext, useDataTableServer, useForm, widthSanityCheck };
