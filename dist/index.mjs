import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Button as Button$1, AbsoluteCenter, Spinner, Span, IconButton, Portal, Dialog, RadioGroup as RadioGroup$1, Grid, Box, Slider as Slider$1, HStack, For, Flex, Text, Tag as Tag$1, Input, useDisclosure, DialogBackdrop, Menu, createRecipeContext, createContext as createContext$1, Pagination, usePaginationContext, Image, Card, DataList, Checkbox as Checkbox$1, Table as Table$1, Tooltip as Tooltip$1, Icon, MenuRoot as MenuRoot$1, MenuTrigger as MenuTrigger$1, EmptyState as EmptyState$2, VStack, List, CheckboxCard as CheckboxCard$1, Alert, Group, InputElement, Popover, Field as Field$1, NumberInput, Accordion, Show, RadioCard, CheckboxGroup, Heading, Center } from '@chakra-ui/react';
import { AiOutlineColumnWidth } from 'react-icons/ai';
import * as React from 'react';
import React__default, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { MdFilterAlt, MdArrowUpward, MdArrowDownward, MdOutlineMoveDown, MdOutlineSort, MdOutlineViewColumn, MdFilterListAlt, MdPushPin, MdCancel, MdClear, MdOutlineChecklist, MdClose, MdSearch } from 'react-icons/md';
import { LuX, LuCheck, LuChevronRight, LuChevronDown } from 'react-icons/lu';
import Dayzed from '@bsol-oss/dayzed-react19';
import { FaUpDown, FaGripLinesVertical } from 'react-icons/fa6';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { IoMdEye, IoMdCheckbox } from 'react-icons/io';
import { HiMiniEllipsisHorizontal, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { makeStateUpdater, functionalUpdate, useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, flexRender, createColumnHelper } from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { GrAscend, GrDescend } from 'react-icons/gr';
import { useQueryClient, useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IoReload } from 'react-icons/io5';
import { HiColorSwatch, HiOutlineInformationCircle } from 'react-icons/hi';
import { monitorForElements, draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import axios from 'axios';
import { useDebounce } from '@uidotdev/usehooks';
import { useFormContext, useForm, FormProvider } from 'react-hook-form';
import dayjs from 'dayjs';
import { dropTargetForExternal } from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import { getFiles } from '@atlaskit/pragmatic-drag-and-drop/external/file';
import { getText } from '@atlaskit/pragmatic-drag-and-drop/external/text';

const DataTableContext = createContext({
    table: {},
    globalFilter: "",
    setGlobalFilter: () => { },
    type: "client",
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
const DialogActionTrigger = Dialog.ActionTrigger;

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

const EditFilterButton = ({ text, title = "Edit Filter", closeText = "Close", resetText = "Reset", icon = jsx(MdFilterAlt, {}), }) => {
    const filterModal = useDisclosure();
    return (jsx(Fragment, { children: jsx(DialogRoot, { size: ["full", "full", "md", "md"], open: filterModal.open, children: jsxs(DialogRoot, { children: [jsx(DialogTrigger, { asChild: true, children: jsxs(Button$1, { as: Box, variant: "ghost", onClick: filterModal.onOpen, children: [icon, " ", text] }) }), jsxs(DialogContent, { children: [jsx(DialogHeader, { children: jsx(DialogTitle, { children: title }) }), jsx(DialogBody, { children: jsxs(Flex, { flexFlow: "column", gap: "1rem", children: [jsx(TableFilter, {}), jsx(ResetFilteringButton, { text: resetText })] }) }), jsxs(DialogFooter, { children: [jsx(DialogActionTrigger, { asChild: true, children: jsx(Button$1, { onClick: filterModal.onClose, children: closeText }) }), jsx(Button$1, { children: "Save" })] }), jsx(DialogCloseTrigger, {})] })] }) }) }));
};

const ColumnOrderChanger = ({ columns }) => {
    const [order, setOrder] = useState([]);
    const [originalOrder, setOriginalOrder] = useState([]);
    const { table } = useDataTableContext();
    const handleChangeOrder = (startIndex, endIndex) => {
        const newOrder = Array.from(order);
        const [removed] = newOrder.splice(startIndex, 1);
        newOrder.splice(endIndex, 0, removed);
        setOrder(newOrder);
    };
    useEffect(() => {
        setOrder(columns);
    }, [columns]);
    useEffect(() => {
        if (originalOrder.length > 0) {
            return;
        }
        if (columns.length <= 0) {
            return;
        }
        setOriginalOrder(columns);
    }, [columns]);
    return (jsxs(Flex, { gap: 2, flexFlow: "column", children: [jsx(Flex, { gap: 2, flexFlow: "column", children: order.map((columnId, index) => (jsxs(Flex, { gap: 2, alignItems: "center", justifyContent: "space-between", children: [jsx(IconButton, { onClick: () => {
                                const prevIndex = index - 1;
                                if (prevIndex >= 0) {
                                    handleChangeOrder(index, prevIndex);
                                }
                            }, disabled: index === 0, "aria-label": "", children: jsx(MdArrowUpward, {}) }), table
                            .getAllFlatColumns()
                            .filter((column) => {
                            return column.id === columnId;
                        })
                            .map((column) => {
                            const displayName = column.columnDef.meta === undefined
                                ? column.id
                                : column.columnDef.meta.displayName;
                            return jsx("span", { children: displayName }, column.id);
                        }), jsx(IconButton, { onClick: () => {
                                const nextIndex = index + 1;
                                if (nextIndex < order.length) {
                                    handleChangeOrder(index, nextIndex);
                                }
                            }, disabled: index === order.length - 1, "aria-label": "", children: jsx(MdArrowDownward, {}) })] }, columnId))) }), jsxs(Flex, { gap: "0.25rem", children: [jsx(Button$1, { onClick: () => {
                            table.setColumnOrder(order);
                        }, children: "Apply" }), jsx(Button$1, { onClick: () => {
                            table.setColumnOrder(originalOrder);
                        }, children: "Reset" })] })] }));
};
const TableOrderer = () => {
    const { table } = useDataTableContext();
    return (jsx(Fragment, { children: jsx(ColumnOrderChanger, { columns: table.getState().columnOrder }) }));
};

const EditOrderButton = ({ text, icon = jsx(MdOutlineMoveDown, {}), title = "Change Order", }) => {
    return (jsx(Fragment, { children: jsxs(DialogRoot, { size: "cover", children: [jsx(DialogBackdrop, {}), jsx(DialogTrigger, { asChild: true, children: jsxs(Button$1, { as: Box, variant: "ghost", children: [icon, " ", text] }) }), jsxs(DialogContent, { children: [jsx(DialogCloseTrigger, {}), jsxs(DialogHeader, { children: [jsx(DialogTitle, {}), title] }), jsx(DialogBody, { children: jsx(Flex, { flexFlow: "column", gap: "0.25rem", children: jsx(TableOrderer, {}) }) }), jsx(DialogFooter, {})] })] }) }));
};

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

const EditViewButton = ({ text, icon = jsx(IoMdEye, {}), title = "Edit View", }) => {
    const viewModel = useDisclosure();
    return (jsx(Fragment, { children: jsxs(DialogRoot, { children: [jsx(DialogBackdrop, {}), jsx(DialogTrigger, { asChild: true, children: jsxs(Button$1, { as: Box, variant: "ghost", onClick: viewModel.onOpen, children: [icon, " ", text] }) }), jsxs(DialogContent, { children: [jsx(DialogCloseTrigger, {}), jsxs(DialogHeader, { children: [jsx(DialogTitle, {}), title] }), jsx(DialogBody, { children: jsx(TableViewer, {}) }), jsx(DialogFooter, {})] })] }) }));
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
    return (jsx(Fragment, { children: jsxs(MenuRoot, { children: [jsx(MenuTrigger, { asChild: true, children: jsxs(Button$1, { variant: "ghost", gap: "0.5rem", children: [table.getState().pagination.pageSize, " ", jsx(BiDownArrow, {})] }) }), jsx(MenuContent, { children: pageSizes.map((pageSize) => (jsx(MenuItem, { value: `chakra-table-pageSize-${pageSize}`, onClick: () => {
                            table.setPageSize(Number(pageSize));
                        }, children: pageSize }, `chakra-table-pageSize-${pageSize}`))) })] }) }));
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
    return (jsx(RootPropsProvider, { value: { size, variantMap: variantMap[variant], getHref }, children: jsx(Pagination.Root, { ref: ref, type: getHref ? "link" : "button", ...rest }) }));
});
const PaginationEllipsis = React.forwardRef(function PaginationEllipsis(props, ref) {
    const { size, variantMap } = useRootProps();
    return (jsx(Pagination.Ellipsis, { ref: ref, ...props, asChild: true, children: jsx(Button$1, { as: "span", variant: variantMap.ellipsis, size: size, children: jsx(HiMiniEllipsisHorizontal, {}) }) }));
});
const PaginationItem = React.forwardRef(function PaginationItem(props, ref) {
    const { page } = usePaginationContext();
    const { size, variantMap, getHref } = useRootProps();
    const current = page === props.value;
    const variant = current ? variantMap.current : variantMap.default;
    if (getHref) {
        return (jsx(LinkButton, { href: getHref(props.value), variant: variant, size: size, children: props.value }));
    }
    return (jsx(Pagination.Item, { ref: ref, ...props, asChild: true, children: jsx(Button$1, { variant: variant, size: size, children: props.value }) }));
});
const PaginationPrevTrigger = React.forwardRef(function PaginationPrevTrigger(props, ref) {
    const { size, variantMap, getHref } = useRootProps();
    const { previousPage } = usePaginationContext();
    if (getHref) {
        return (jsx(LinkButton, { href: previousPage != null ? getHref(previousPage) : undefined, variant: variantMap.default, size: size, children: jsx(HiChevronLeft, {}) }));
    }
    return (jsx(Pagination.PrevTrigger, { ref: ref, asChild: true, ...props, children: jsx(IconButton, { variant: variantMap.default, size: size, children: jsx(HiChevronLeft, {}) }) }));
});
const PaginationNextTrigger = React.forwardRef(function PaginationNextTrigger(props, ref) {
    const { size, variantMap, getHref } = useRootProps();
    const { nextPage } = usePaginationContext();
    if (getHref) {
        return (jsx(LinkButton, { href: nextPage != null ? getHref(nextPage) : undefined, variant: variantMap.default, size: size, children: jsx(HiChevronRight, {}) }));
    }
    return (jsx(Pagination.NextTrigger, { ref: ref, asChild: true, ...props, children: jsx(IconButton, { variant: variantMap.default, size: size, children: jsx(HiChevronRight, {}) }) }));
});
const PaginationItems = (props) => {
    return (jsx(Pagination.Context, { children: ({ pages }) => pages.map((page, index) => {
            return page.type === "ellipsis" ? (jsx(PaginationEllipsis, { index: index, ...props }, index)) : (jsx(PaginationItem, { type: "page", value: page.value, ...props }, index));
        }) }));
};
React.forwardRef(function PaginationPageText(props, ref) {
    const { format = "compact", ...rest } = props;
    const { page, totalPages, pageRange, count } = usePaginationContext();
    const content = React.useMemo(() => {
        if (format === "short")
            return `${page} / ${totalPages}`;
        if (format === "compact")
            return `${page} of ${totalPages}`;
        return `${pageRange.start + 1} - ${Math.min(pageRange.end, count)} of ${count}`;
    }, [format, page, totalPages, pageRange, count]);
    return (jsx(Text, { fontWeight: "medium", ref: ref, ...rest, children: content }));
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
    return (jsx(PaginationRoot, { page: table.getState().pagination.pageIndex + 1, count: getCount(), pageSize: table.getState().pagination.pageSize, onPageChange: (e) => {
            table.setPageIndex(e.page - 1);
        }, children: jsxs(HStack, { children: [jsx(PaginationPrevTrigger, {}), jsx(PaginationItems, {}), jsx(PaginationNextTrigger, {})] }) }));
};

const CardHeader = ({ row, imageColumnId = undefined, titleColumnId = undefined, tagColumnId = undefined, tagIcon = undefined, showTag = true, imageProps = {}, }) => {
    if (!!row.original === false) {
        return jsx(Fragment, {});
    }
    const isShowFirstColumn = !!titleColumnId || showTag;
    return (jsxs(Grid, { templateRows: "auto auto", gap: "1rem", children: [!!imageColumnId && (jsx(Image, { width: "100%", src: row.original[imageColumnId], ...imageProps })), isShowFirstColumn && (jsxs(Flex, { gap: "0.5rem", flexFlow: "wrap", children: [!!titleColumnId && (jsx(Text, { fontWeight: "bold", fontSize: "large", children: row.original[titleColumnId] })), showTag && (jsx(Tag, { fontSize: "large", startElement: tagIcon && tagIcon({}), children: row.original[tagColumnId] }))] }))] }));
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
        return (jsx(Flex, { flexFlow: "column", gap: "1", children: table.getRowModel().rows.map((row) => {
                return (jsx(Card.Root, { children: jsx(Card.Body, { children: jsx(DataList.Root, { gap: 4, padding: 4, display: "grid", variant: "subtle", orientation: "horizontal", overflow: "auto", children: row.getVisibleCells().map((cell) => {
                                return (jsxs(DataList.Item, { children: [jsx(DataList.ItemLabel, { children: snakeToLabel(cell.column.id) }), jsx(DataList.ItemValue, { wordBreak: "break-word", textOverflow: "ellipsis", overflow: "hidden", children: `${formatValue(cell.getValue())}` })] }, cell.id));
                            }) }) }) }, `chakra-table-card-${row.id}`));
            }) }));
    }
    if (variant == "stats") {
        return (jsx(Flex, { flexFlow: "column", gap: "1", children: table.getRowModel().rows.map((row) => {
                return (jsx(Card.Root, { children: jsx(Card.Body, { children: jsx(DataList.Root, { gap: 4, padding: 4, display: "flex", flexFlow: "row", variant: "subtle", overflow: "auto", children: row.getVisibleCells().map((cell) => {
                                return (jsxs(DataList.Item, { display: "flex", justifyContent: "center", alignItems: "center", flex: "1 0 0%", children: [jsx(DataList.ItemLabel, { children: snakeToLabel(cell.column.id) }), jsx(DataList.ItemValue, { wordBreak: "break-word", textOverflow: "ellipsis", overflow: "hidden", children: `${formatValue(cell.getValue())}` })] }, cell.id));
                            }) }) }) }, `chakra-table-card-${row.id}`));
            }) }));
    }
    return (jsx(Flex, { flexFlow: "column", gap: "1", children: table.getRowModel().rows.map((row) => {
            return (jsx(Card.Root, { children: jsx(Card.Body, { children: jsx(DataList.Root, { gap: 4, padding: 4, display: "grid", variant: "subtle", gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))", children: row.getVisibleCells().map((cell) => {
                            return (jsxs(DataList.Item, { children: [jsx(DataList.ItemLabel, { children: snakeToLabel(cell.column.id) }), jsx(DataList.ItemValue, { wordBreak: "break-word", textOverflow: "ellipsis", overflow: "hidden", children: `${formatValue(cell.getValue())}` })] }, cell.id));
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
function DataTable({ columns, data, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, children, }) {
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
            table: { ...table },
            globalFilter: globalFilter,
            setGlobalFilter: setGlobalFilter,
            type: "client",
        }, children: children }));
}

const DataTableServerContext = createContext({
    url: "",
});

function DataTableServer({ columns, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, query, children, url, }) {
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
        }, children: jsx(DataTableServerContext.Provider, { value: { url, query }, children: children }) }));
}

const Checkbox = React.forwardRef(function Checkbox(props, ref) {
    const { icon, children, inputProps, rootRef, ...rest } = props;
    return (jsxs(Checkbox$1.Root, { ref: rootRef, ...rest, children: [jsx(Checkbox$1.HiddenInput, { ref: ref, ...inputProps }), jsx(Checkbox$1.Control, { children: icon || jsx(Checkbox$1.Indicator, {}) }), children != null && (jsx(Checkbox$1.Label, { children: children }))] }));
});

const TableBody = ({ pinnedBgColor = { light: "gray.50", dark: "gray.700" }, showSelector = false, alwaysShowSelector = true, canResize = true, }) => {
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
    return (jsx(Table$1.Body, { children: table.getRowModel().rows.map((row, index) => {
            return (jsxs(Table$1.Row, { display: "flex", zIndex: 1, onMouseEnter: () => handleRowHover(index), onMouseLeave: () => handleRowHover(-1), ...getTrProps({ hoveredRow, index }), children: [showSelector && (jsx(TableRowSelector, { index: index, row: row, hoveredRow: hoveredRow, alwaysShowSelector: alwaysShowSelector })), row.getVisibleCells().map((cell, index) => {
                        return (jsx(Table$1.Cell, { padding: `${table.getDensityValue()}px`, 
                            // styling resize and pinning start
                            flex: `${canResize ? "0" : "1"} 0 ${cell.column.getSize()}px`, backgroundColor: "white", ...getTdProps(cell), _dark: {
                                backgroundColor: "gray.950",
                            }, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, `chakra-table-rowcell-${cell.id}-${index}`));
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
    return (jsxs(Table$1.Cell, { padding: `${table.getDensityValue()}px`, ...(table.getIsSomeColumnsPinned("left")
            ? {
                left: `0px`,
                backgroundColor: pinnedBgColor.light,
                position: "sticky",
                zIndex: 1,
                _dark: { backgroundColor: pinnedBgColor.dark },
            }
            : {}), 
        // styling resize and pinning end
        display: "grid", children: [!isCheckBoxVisible(index, row) && (jsx(Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` })), isCheckBoxVisible(index, row) && (jsx(Box, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    onChange: row.getToggleSelectedHandler() }) }))] }));
};

const Tooltip = React.forwardRef(function Tooltip(props, ref) {
    const { showArrow, children, disabled, portalled, content, contentProps, portalRef, ...rest } = props;
    if (disabled)
        return children;
    return (jsxs(Tooltip$1.Root, { ...rest, children: [jsx(Tooltip$1.Trigger, { asChild: true, children: children }), jsx(Portal, { disabled: !portalled, container: portalRef, children: jsx(Tooltip$1.Positioner, { children: jsxs(Tooltip$1.Content, { ref: ref, ...contentProps, children: [showArrow && (jsx(Tooltip$1.Arrow, { children: jsx(Tooltip$1.ArrowTip, {}) })), content] }) }) })] }));
});

const TableControls = ({ totalText = "Total:", fitTableWidth = false, fitTableHeight = false, isMobile = false, children = jsx(Fragment, {}), showGlobalFilter = false, showFilter = false, showFilterName = false, showFilterTags = false, showReload = false, filterOptions = [], extraItems = jsx(Fragment, {}), loading = false, hasError = false, }) => {
    return (jsxs(Grid, { templateRows: "auto 1fr auto", width: fitTableWidth ? "fit-content" : "100%", height: fitTableHeight ? "fit-content" : "100%", justifySelf: "center", alignSelf: "center", gap: "0.5rem", children: [jsxs(Flex, { flexFlow: "column", gap: 2, children: [jsxs(Flex, { justifyContent: "space-between", children: [jsx(Box, { children: jsx(EditViewButton, { text: isMobile ? undefined : "View", icon: jsx(MdOutlineViewColumn, {}) }) }), jsxs(Flex, { gap: "0.5rem", alignItems: "center", justifySelf: "end", children: [loading && jsx(Spinner, { size: "sm" }), hasError && (jsx(Tooltip, { content: "An error occurred while fetching data", children: jsx(Icon, { as: BsExclamationCircleFill, color: "red.400" }) })), showGlobalFilter && jsx(GlobalFilter, {}), showFilter && (jsx(Fragment, { children: jsx(EditFilterButton, { text: isMobile ? undefined : "Advanced Filter" }) })), showReload && jsx(ReloadButton, {}), extraItems] })] }), filterOptions.length > 0 && (jsx(Flex, { flexFlow: "column", gap: "0.5rem", children: filterOptions.map((column) => {
                            return (jsxs(Flex, { alignItems: "center", flexFlow: "wrap", gap: "0.5rem", children: [showFilterName && jsxs(Text, { children: [column, ":"] }), jsx(FilterOptions, { column: column })] }, column));
                        }) })), showFilterTags && (jsx(Flex, { children: jsx(TableFilterTags, {}) }))] }), jsx(Box, { overflow: "auto", width: "100%", height: "100%", backgroundColor: "gray.50", _dark: {
                    backgroundColor: "gray.900",
                }, children: children }), jsxs(Flex, { justifyContent: "space-between", children: [jsxs(Flex, { gap: "1rem", alignItems: "center", children: [jsx(PageSizeControl, {}), jsxs(Flex, { children: [jsx(Text, { paddingRight: "0.5rem", children: totalText }), jsx(RowCountText, {})] })] }), jsx(Box, { justifySelf: "end", children: jsx(TablePagination, {}) })] })] }));
};

const TableFooter = ({ pinnedBgColor = { light: "gray.50", dark: "gray.700" }, showSelector = false, alwaysShowSelector = true, }) => {
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
    return (jsx(Table$1.Footer, { children: table.getFooterGroups().map((footerGroup) => (jsxs(Table$1.Row, { display: "flex", children: [showSelector && (jsxs(Table$1.Header
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
                    onMouseEnter: () => handleRowHover(true), onMouseLeave: () => handleRowHover(false), display: "grid", children: [isCheckBoxVisible() && (jsx(Box, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: table.getIsAllRowsSelected(),
                                // indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler() }) })), !isCheckBoxVisible() && (jsx(Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` }))] })), footerGroup.headers.map((header) => (jsx(Table$1.Cell, { padding: "0", columnSpan: `${header.colSpan}`, 
                    // styling resize and pinning start
                    maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, display: "grid", ...getThProps(header), children: jsx(MenuRoot$1, { children: jsx(MenuTrigger$1, { asChild: true, children: jsx(Box, { padding: `${table.getDensityValue()}px`, display: "flex", alignItems: "center", justifyContent: "start", borderRadius: "0rem", _hover: { backgroundColor: "gray.100" }, children: jsxs(Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.footer, header.getContext()), jsx(Box, { children: header.column.getCanSort() && (jsxs(Fragment, { children: [header.column.getIsSorted() === false && (
                                                    // <UpDownIcon />
                                                    jsx(Fragment, {})), header.column.getIsSorted() === "asc" && (jsx(BiUpArrow, {})), header.column.getIsSorted() === "desc" && (jsx(BiDownArrow, {}))] })) })] }) }) }) }) }, `chakra-table-footer-${header.column.id}-${footerGroup.id}`)))] }, `chakra-table-footergroup-${footerGroup.id}`))) }));
};

const TableHeader = ({ canResize = true, pinnedBgColor = { light: "gray.50", dark: "gray.700" }, showSelector = false, isSticky = true, alwaysShowSelector = true, tHeadProps = {}, }) => {
    const { table } = useDataTableContext();
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
    return (jsx(Table$1.Header, { ...(isSticky ? stickyProps : {}), ...tHeadProps, children: table.getHeaderGroups().map((headerGroup) => (jsxs(Table$1.Row, { display: "flex", children: [showSelector && (jsxs(Table$1.ColumnHeader
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
                    padding: `${table.getDensityValue()}px`, onMouseEnter: () => handleRowHover(true), onMouseLeave: () => handleRowHover(false), display: "grid", children: [isCheckBoxVisible() && (jsx(Box, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: table.getIsAllRowsSelected(),
                                // indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler() }) })), !isCheckBoxVisible() && (jsx(Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` }))] })), headerGroup.headers.map((header) => {
                    const resizeProps = {
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        cursor: "col-resize",
                    };
                    return (jsxs(Table$1.ColumnHeader, { padding: 0, columnSpan: `${header.colSpan}`, 
                        // styling resize and pinning start
                        flex: `${canResize ? "0" : "1"} 0 ${header.column.getSize()}px`, display: "grid", gridTemplateColumns: "1fr auto", zIndex: header.index, ...getThProps(header), children: [jsxs(MenuRoot, { children: [jsx(MenuTrigger, { asChild: true, children: jsx(Flex, { padding: `${table.getDensityValue()}px`, alignItems: "center", justifyContent: "start", borderRadius: "0rem", overflow: "auto", _hover: {
                                                backgroundColor: "gray.100",
                                                _dark: {
                                                    backgroundColor: "gray.700",
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
                                                            }, children: [jsx(MdClear, {}), "Clear Sorting"] }) }))] }))] })] }), canResize && (jsx(Box, { borderRight: "0.2rem solid", borderRightColor: header.column.getIsResizing() ? "gray.700" : "transparent", position: "relative", right: "0.1rem", width: "2px", height: "100%", userSelect: "none", style: { touchAction: "none" }, _hover: {
                                    borderRightColor: header.column.getIsResizing()
                                        ? "gray.700"
                                        : "gray.400",
                                }, ...resizeProps }))] }, `chakra-table-header-${header.id}`));
                })] }, `chakra-table-headergroup-${headerGroup.id}`))) }));
};

const DefaultTable = ({ showFooter = false, tableProps = {}, tableHeaderProps = {}, tableBodyProps = {}, controlProps = {}, tableFooterProps = {}, variant = "", }) => {
    if (variant === "greedy") {
        return (jsx(TableControls, { ...controlProps, children: jsxs(Table, { canResize: false, ...tableProps, children: [jsx(TableHeader, { canResize: false, ...tableHeaderProps }), jsx(TableBody, { canResize: false, ...tableBodyProps }), showFooter && (jsx(TableFooter, { canResize: false, ...tableFooterProps }))] }) }));
    }
    return (jsx(TableControls, { ...controlProps, children: jsxs(Table, { ...tableProps, children: [jsx(TableHeader, { ...tableHeaderProps }), jsx(TableBody, { ...tableBodyProps }), showFooter && jsx(TableFooter, { ...tableFooterProps })] }) }));
};

const useDataTableServerContext = () => {
    const context = useContext(DataTableServerContext);
    const { query } = context;
    const isEmpty = (query.data?.count ?? 0) <= 0;
    return { ...context, isEmpty };
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

const EmptyState$1 = React.forwardRef(function EmptyState(props, ref) {
    const { title, description, icon, children, ...rest } = props;
    return (jsx(EmptyState$2.Root, { ref: ref, ...rest, children: jsxs(EmptyState$2.Content, { children: [icon && (jsx(EmptyState$2.Indicator, { children: icon })), description ? (jsxs(VStack, { textAlign: "center", children: [jsx(EmptyState$2.Title, { children: title }), jsx(EmptyState$2.Description, { children: description })] })) : (jsx(EmptyState$2.Title, { children: title })), children] }) }));
});

const EmptyResult = (jsx(EmptyState$1, { icon: jsx(HiColorSwatch, {}), title: "No results found", description: "Try adjusting your search", children: jsxs(List.Root, { variant: "marker", children: [jsx(List.Item, { children: "Try removing filters" }), jsx(List.Item, { children: "Try different keywords" })] }) }));
const Table = ({ children, emptyComponent = EmptyResult, canResize = true, ...props }) => {
    const { table } = useDataTableContext();
    if (table.getRowModel().rows.length <= 0) {
        return emptyComponent;
    }
    return (jsx(Table$1.Root, { stickyHeader: true, variant: "outline", width: canResize ? table.getCenterTotalSize() : undefined, ...props, children: children }));
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
    const { table } = useDataTableContext();
    const displayName = columnId;
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
    return (jsxs(Grid, { ref: ref, templateColumns: "auto 1fr", gap: "0.5rem", alignItems: "center", style: dragging ? { opacity: 0.4 } : {}, children: [jsx(Flex, { alignItems: "center", padding: "0", children: jsx(FaGripLinesVertical, { color: "gray.400" }) }), jsx(Flex, { justifyContent: "space-between", alignItems: "center", children: jsx(CheckboxCard, { variant: "surface", label: displayName, checked: column.getIsVisible(), onChange: column.getToggleVisibilityHandler() }) })] }));
}
function CardContainer({ location, children }) {
    const ref = useRef(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    useEffect(() => {
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
    return (jsx(Box, { ...getColor(isDraggedOver), ref: ref, children: children }));
}
const TableViewer = () => {
    const { table } = useDataTableContext();
    const [order, setOrder] = useState(table.getAllLeafColumns().map((column) => {
        return column.id;
    }));
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
                setOrder(newOrder);
            },
        });
    }, [order, table]);
    return (jsx(Flex, { flexFlow: "column", gap: "0.25rem", children: table.getState().columnOrder.map((columnId, index) => {
            return (jsx(CardContainer, { location: index, children: jsx(ColumnCard, { columnId: columnId }) }));
        }) }));
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
    const columnHelper = createColumnHelper();
    // @ts-expect-error find type for unknown
    const columns = [
        ...ignored.map((column, index) => {
            return columnHelper.accessor(column, {
                cell: (props) => {
                    // @ts-expect-error find type for unknown
                    const value = props.row.original[column];
                    if (typeof value === "object") {
                        return jsx(TextCell, { children: JSON.stringify(value) });
                    }
                    return jsx(TextCell, { children: value });
                },
                header: (columnHeader) => {
                    const displayName = columnHeader.column.columnDef.meta?.displayName ??
                        snakeToLabel(column);
                    return jsx("span", { children: displayName });
                },
                footer: (columnFooter) => {
                    const displayName = columnFooter.column.columnDef.meta?.displayName ??
                        snakeToLabel(column);
                    return jsx("span", { children: displayName });
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
    return (jsx(Fragment, { children: isEmpty && (jsx(EmptyState$2.Root, { children: jsxs(EmptyState$2.Content, { children: [jsx(EmptyState$2.Indicator, { children: jsx(HiColorSwatch, {}) }), jsxs(VStack, { textAlign: "center", children: [jsx(EmptyState$2.Title, { children: title }), jsx(EmptyState$2.Description, { children: description })] })] }) })) }));
};

const ErrorAlert = ({ showMessage = true }) => {
    const { query } = useDataTableServerContext();
    const { isError, error } = query;
    return (jsx(Fragment, { children: isError && (jsxs(Alert.Root, { status: "error", children: [jsx(Alert.Indicator, {}), jsxs(Alert.Content, { children: [jsx(Alert.Title, { children: error.name }), showMessage && (jsx(Alert.Description, { children: error.message }))] })] })) }));
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

//@ts-expect-error TODO: find appropriate type
const SchemaFormContext = createContext({
    schema: {},
    serverUrl: "",
    order: [],
    ignore: [],
    onSubmit: async () => { },
    rowNumber: 0,
    displayText: {},
});

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

const Field = React.forwardRef(function Field(props, ref) {
    const { label, children, helperText, errorText, optionalText, ...rest } = props;
    return (jsxs(Field$1.Root, { ref: ref, ...rest, children: [label && (jsxs(Field$1.Label, { children: [label, jsx(Field$1.RequiredIndicator, { fallback: optionalText })] })), children, helperText && (jsx(Field$1.HelperText, { children: helperText })), errorText && (jsx(Field$1.ErrorText, { children: errorText }))] }));
});

const useSchemaContext = () => {
    const { schema, serverUrl, order, ignore, onSubmit, preLoadedValues, rowNumber, displayText, } = useContext(SchemaFormContext);
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
    const { watch, formState: { errors }, setValue, } = useFormContext();
    const { schema, serverUrl, displayText } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using DatePicker");
    }
    const { total, showing, close, typeToSearch, showMore } = displayText;
    const { gridColumn, gridRow, title, renderDisplay } = schema.properties[column];
    const [searchText, setSearchText] = useState();
    const [limit, setLimit] = useState(10);
    const [openSearchResult, setOpenSearchResult] = useState();
    const [idMap, setIdMap] = useState({});
    const ref = useRef(null);
    const selectedIds = watch(column) ?? [];
    const query = useQuery({
        queryKey: [`idpicker`, searchText, in_table, limit],
        queryFn: async () => {
            const data = await getTableData({
                serverUrl,
                searching: searchText ?? "",
                in_table: in_table,
                limit: limit,
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
        staleTime: 10000,
    });
    useQuery({
        queryKey: [`idpicker`, ...selectedIds],
        queryFn: async () => {
            const data = await getTableData({
                serverUrl,
                in_table: in_table,
                limit: limit,
                where: [{ id: column_ref, value: watchId }],
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
        enabled: (selectedIds ?? []).length > 0,
        staleTime: 10000,
    });
    const { isLoading, isFetching, data, isPending, isError } = query;
    const dataList = useMemo(() => data?.data ?? [], [data]);
    const count = data?.count ?? 0;
    const isDirty = (searchText?.length ?? 0) > 0;
    const onSearchChange = async (event) => {
        setSearchText(event.target.value);
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
    return (jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [isMultiple && (jsxs(Flex, { flexFlow: "wrap", gap: 1, children: [selectedIds.map((id) => {
                        const item = idMap[id];
                        if (item === undefined) {
                            return jsx(Fragment, { children: "undefined" });
                        }
                        return (jsx(Tag, { closable: true, onClick: () => {
                                setValue(column, watchIds.filter((id) => id != item[column_ref]));
                            }, children: !!renderDisplay === true
                                ? renderDisplay(item)
                                : item[display_column] }));
                    }), jsx(Tag, { cursor: "pointer", onClick: () => {
                            setOpenSearchResult(true);
                        }, children: "Add" })] })), !isMultiple && (jsx(Button, { variant: "outline", onClick: () => {
                    setOpenSearchResult(true);
                }, children: getPickedValue() })), jsxs(PopoverRoot, { open: openSearchResult, onOpenChange: (e) => setOpenSearchResult(e.open), closeOnInteractOutside: true, initialFocusEl: () => ref.current, positioning: { placement: "bottom-start" }, children: [jsx(PopoverTrigger, {}), jsx(PopoverContent, { children: jsxs(PopoverBody, { children: [jsx(Input, { placeholder: typeToSearch, onChange: (event) => {
                                        onSearchChange(event);
                                        setOpenSearchResult(true);
                                    }, autoComplete: "off", ref: ref }), jsx(PopoverTitle, {}), jsxs(Grid, { gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", overflow: "auto", maxHeight: "50vh", children: [isFetching && jsx(Fragment, { children: "isFetching" }), isLoading && jsx(Fragment, { children: "isLoading" }), isPending && jsx(Fragment, { children: "isPending" }), isError && jsx(Fragment, { children: "isError" }), jsx(Text, { children: `${total ?? "Total"} ${count}, ${showing ?? "Showing"} ${limit}` }), jsx(Button, { onClick: async () => {
                                                setOpenSearchResult(false);
                                            }, children: close ?? "Close" }), jsx(Flex, { flexFlow: "column wrap", children: 
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            dataList.map((item) => {
                                                const selected = isMultiple
                                                    ? watchIds.some((id) => item[column_ref] === id)
                                                    : watchId === item[column_ref];
                                                return (jsx(Box, { cursor: "pointer", onClick: () => {
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
                                                        : item[display_column] }));
                                            }) }), isDirty && (jsxs(Fragment, { children: [dataList.length <= 0 && jsx(Fragment, { children: "Empty Search Result" }), " "] })), count > dataList.length && (jsx(Fragment, { children: jsx(Button, { onClick: async () => {
                                                    setLimit((limit) => limit + 10);
                                                    await getTableData({
                                                        serverUrl,
                                                        searching: searchText ?? "",
                                                        in_table: in_table,
                                                        limit: limit + 10,
                                                    });
                                                }, children: showMore ?? "Show More" }) }))] })] }) })] }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
};

const ToggleTip = React.forwardRef(function ToggleTip(props, ref) {
    const { showArrow, children, portalled = true, content, portalRef, ...rest } = props;
    return (jsxs(Popover.Root, { ...rest, positioning: { ...rest.positioning, gutter: 4 }, children: [jsx(Popover.Trigger, { asChild: true, children: children }), jsx(Portal, { disabled: !portalled, container: portalRef, children: jsx(Popover.Positioner, { children: jsxs(Popover.Content, { width: "auto", px: "2", py: "1", textStyle: "xs", rounded: "sm", ref: ref, children: [showArrow && (jsx(Popover.Arrow, { children: jsx(Popover.ArrowTip, {}) })), content] }) }) })] }));
});
const InfoTip = React.forwardRef(function InfoTip(props, ref) {
    const { children, ...rest } = props;
    return (jsx(ToggleTip, { content: children, ...rest, ref: ref, children: jsx(IconButton, { variant: "ghost", "aria-label": "info", size: "2xs", colorPalette: "gray", children: jsx(HiOutlineInformationCircle, {}) }) }));
});

const DataListRoot = DataList.Root;
const DataListItem = React.forwardRef(function DataListItem(props, ref) {
    const { label, info, value, children, grow, ...rest } = props;
    return (jsxs(DataList.Item, { ref: ref, ...rest, children: [jsxs(DataList.ItemLabel, { flex: grow ? "1" : undefined, children: [label, info && jsx(InfoTip, { children: info })] }), jsx(DataList.ItemValue, { flex: grow ? "1" : undefined, children: value }), children] }));
});

const IdViewer = ({ value, in_table, column_ref, display_column, column, }) => {
    const { schema, serverUrl } = useSchemaContext();
    if (schema.properties == undefined) {
        throw new Error("schema properties when using DatePicker");
    }
    const { title } = schema.properties[column];
    const query = useQuery({
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
    return (jsx(Fragment, { children: jsx(DataListItem, { label: `${title ?? snakeToLabel(column)}`, ...getDataListProps((query.data?.data[0] ?? {})[display_column]) }) }));
};

const NumberInputRoot = React.forwardRef(function NumberInput$1(props, ref) {
    const { children, ...rest } = props;
    return (jsxs(NumberInput.Root, { ref: ref, variant: "outline", ...rest, children: [children, jsxs(NumberInput.Control, { children: [jsx(NumberInput.IncrementTrigger, {}), jsx(NumberInput.DecrementTrigger, {})] })] }));
});
const NumberInputField$1 = NumberInput.Input;
NumberInput.Scrubber;
NumberInput.Label;

const NumberInputField = ({ column }) => {
    const { register, formState: { errors }, } = useFormContext();
    const { schema, displayText } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using String Input Field");
    }
    const { gridColumn, gridRow, title } = schema.properties[column];
    return (jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, gridColumn, gridRow, children: [jsx(NumberInputRoot, { children: jsx(NumberInputField$1, { ...register(column, { required: isRequired }) }) }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
};

const StringInputField = ({ column }) => {
    const { register, formState: { errors }, } = useFormContext();
    const { schema, displayText } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using String Input Field");
    }
    const { gridColumn, gridRow, title } = schema.properties[column];
    return (jsx(Fragment, { children: jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", children: [jsx(Input, { ...register(column, { required: isRequired }), autoComplete: "off" }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }) }));
};

const clearEmptyString = (object) => {
    return Object.fromEntries(Object.entries(object).filter(([, value]) => value !== ""));
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

const BooleanPicker = ({ column }) => {
    const { watch, formState: { errors }, setValue, getValues, } = useFormContext();
    const { schema, displayText } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const value = watch(column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using BooleanPicker");
    }
    const { gridColumn, gridRow, title } = schema.properties[column];
    return (jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [jsx(CheckboxCard, { checked: value, variant: "surface", onSelect: () => {
                    setValue(column, !getValues(column));
                } }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
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

const DatePicker = ({ column }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
    const { schema, displayText } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const [open, setOpen] = useState(false);
    const selectedDate = watch(column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using DatePicker");
    }
    const { gridColumn, gridRow, title } = schema.properties[column];
    return (jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [jsxs(PopoverRoot, { open: open, onOpenChange: (e) => setOpen(e.open), closeOnInteractOutside: true, children: [jsx(PopoverTrigger, { asChild: true, children: jsx(Button, { size: "sm", variant: "outline", onClick: () => {
                                setOpen(true);
                            }, children: selectedDate !== undefined ? selectedDate : "" }) }), jsx(PopoverContent, { children: jsxs(PopoverBody, { children: [jsx(PopoverTitle, {}), jsx(DatePicker$1, { selected: new Date(selectedDate), onDateSelected: ({ selected, selectable, date }) => {
                                        setValue(column, dayjs(date).format("YYYY-MM-DD"));
                                        setOpen(false);
                                    } })] }) })] }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
};

const ObjectInput = ({ column }) => {
    const { formState: { errors }, setValue, getValues, } = useFormContext();
    const { schema, displayText } = useSchemaContext();
    const { addNew, fieldRequired, save } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    const entries = Object.entries(getValues(column) ?? {});
    const [showNewEntries, setShowNewEntries] = useState(false);
    const [newKey, setNewKey] = useState();
    const [newValue, setNewValue] = useState();
    if (schema.properties == undefined) {
        throw new Error("schema properties when using DatePicker");
    }
    const { gridColumn, gridRow, title } = schema.properties[column];
    return (jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, alignItems: "stretch", gridColumn, gridRow, children: [entries.map(([key, value]) => {
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
                                    }, children: save ?? "Save" })] })] }) }), jsx(Button, { onClick: () => {
                    setShowNewEntries(true);
                    setNewKey(undefined);
                    setNewValue(undefined);
                }, children: addNew ?? "Add New" }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
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

const TagPicker = ({ column }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
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
                                }) }) }))] }));
            }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: (errors[`${column}`]?.message ?? "No error message") }))] }));
};

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
    return (jsxs(Grid, { ...getColor(isDraggedOver), ref: ref, cursor: "pointer", onClick: handleClick, borderStyle: "dashed", borderColor: "gray.400", alignContent: "center", justifyContent: "center", borderWidth: 1, borderRadius: 4, ...gridProps, children: [children, !!children === false && (jsxs(Fragment, { children: [jsx(Flex, { children: placeholder }), jsx(Input, { type: "file", multiple: true, style: { display: "none" }, ref: fileInput, onChange: handleChange })] }))] }));
};

const FilePicker = ({ column }) => {
    const { setValue, formState: { errors }, watch, } = useFormContext();
    const { schema, displayText } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using String Input Field");
    }
    const { gridColumn, gridRow, title } = schema.properties[column];
    const currentFiles = (watch(column) ?? []);
    return (jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", display: "grid", gridTemplateRows: 'auto 1fr auto', alignItems: 'stretch', children: [jsx(FileDropzone, { onDrop: ({ files }) => {
                    const newFiles = files.filter(({ name }) => !currentFiles.some((cur) => cur.name === name));
                    setValue(column, [...currentFiles, ...newFiles]);
                } }), jsx(Flex, { flexFlow: "wrap", alignItems: "start", gap: 1, children: currentFiles.map((file) => {
                    return (jsx(Tag, { cursor: "pointer", onClick: () => {
                            setValue(column, currentFiles.filter(({ name }) => {
                                return name !== file.name;
                            }));
                        }, children: file.name }));
                }) }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
};

const EnumPicker = ({ column, isMultiple = false }) => {
    const { watch, formState: { errors }, setValue, } = useFormContext();
    const { schema, displayText } = useSchemaContext();
    const { fieldRequired } = displayText;
    const { required } = schema;
    const isRequired = required?.some((columnId) => columnId === column);
    if (schema.properties == undefined) {
        throw new Error("schema properties when using DatePicker");
    }
    const { gridColumn, gridRow, title, renderDisplay } = schema.properties[column];
    const [searchText, setSearchText] = useState();
    const [limit, setLimit] = useState(10);
    const [openSearchResult, setOpenSearchResult] = useState();
    const ref = useRef(null);
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
    return (jsxs(Field, { label: `${title ?? snakeToLabel(column)}`, required: isRequired, alignItems: "stretch", gridColumn,
        gridRow, children: [isMultiple && (jsxs(Flex, { flexFlow: "wrap", gap: 1, children: [watchEnums.map((enumValue) => {
                        const item = enumValue;
                        if (item === undefined) {
                            return jsx(Fragment, { children: "undefined" });
                        }
                        return (jsx(Tag, { closable: true, onClick: () => {
                                setSelectedEnums((state) => state.filter((id) => id != item));
                                setValue(column, watchEnums.filter((id) => id != item));
                            }, children: !!renderDisplay === true ? renderDisplay(item) : item }));
                    }), jsx(Tag, { cursor: "pointer", onClick: () => {
                            setOpenSearchResult(true);
                        }, children: "Add" })] })), !isMultiple && (jsx(Button, { variant: "outline", onClick: () => {
                    setOpenSearchResult(true);
                }, children: watchEnum })), jsxs(PopoverRoot, { open: openSearchResult, onOpenChange: (e) => setOpenSearchResult(e.open), closeOnInteractOutside: true, initialFocusEl: () => ref.current, positioning: { placement: "bottom-start" }, children: [jsx(PopoverTrigger, {}), jsx(PopoverContent, { children: jsxs(PopoverBody, { children: [jsx(Input, { placeholder: "Type to search", onChange: (event) => {
                                        onSearchChange(event);
                                        setOpenSearchResult(true);
                                    }, autoComplete: "off", ref: ref }), jsx(PopoverTitle, {}), jsxs(Grid, { gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", overflow: "auto", maxHeight: "50vh", children: [jsx(Text, { children: `Search Result: ${count}, Showing ${limit}` }), jsx(Button, { onClick: async () => {
                                                setOpenSearchResult(false);
                                            }, children: "close" }), jsx(Flex, { flexFlow: "column wrap", children: dataList.map((item) => {
                                                const selected = isMultiple
                                                    ? watchEnums.some((enumValue) => item === enumValue)
                                                    : watchEnum == item;
                                                return (jsx(Box, { cursor: "pointer", onClick: () => {
                                                        if (!isMultiple) {
                                                            setOpenSearchResult(false);
                                                            setValue(column, item);
                                                            return;
                                                        }
                                                        const newSet = new Set([...(watchEnums ?? []), item]);
                                                        setValue(column, [...newSet]);
                                                    }, ...(selected ? { color: "gray.400/50" } : {}), children: !!renderDisplay === true ? renderDisplay(item) : item }, `${column}-${item}`));
                                            }) }), isDirty && (jsxs(Fragment, { children: [dataList.length <= 0 && jsx(Fragment, { children: "Empty Search Result" }), " "] }))] })] }) })] }), errors[`${column}`] && (jsx(Text, { color: "red.400", children: fieldRequired ?? "The field is requried" }))] }));
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
    const { schema, serverUrl, displayText, order, ignore, onSubmit, rowNumber } = useSchemaContext();
    const { title, submit, empty, cancel, submitSuccess, submitAgain, confirm } = displayText;
    const methods = useFormContext();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [validatedData, setValidatedData] = useState();
    const [error, setError] = useState();
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
        return (jsxs(Grid, { gap: 2, children: [jsx(Heading, { children: title ?? snakeToLabel(schema.title ?? "") }), jsxs(Alert.Root, { status: "success", children: [jsx(Alert.Indicator, {}), jsx(Alert.Title, { children: submitSuccess ?? "Data uploaded to the server. Fire on!" })] }), jsx(Button, { onClick: () => {
                        setIsError(false);
                        setIsSubmiting(false);
                        setIsSuccess(false);
                        setIsConfirming(false);
                        setValidatedData(undefined);
                        methods.reset();
                    }, formNoValidate: true, children: submitAgain ?? "Submit Again" })] }));
    }
    if (isConfirming) {
        return (jsxs(Grid, { gap: 2, children: [jsx(Heading, { children: title ?? snakeToLabel(schema.title ?? "") }), jsx(DataListRoot, { orientation: "horizontal", gap: 4, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: `repeat(${rowNumber ?? "auto-fit"}, auto)`, children: ordered.map((column) => {
                        if (properties === undefined) {
                            return jsx(Fragment, {});
                        }
                        const key = column;
                        const values = properties[column];
                        const shouldIgnore = ignore.some((column) => {
                            return column == key;
                        });
                        if (shouldIgnore) {
                            return jsx(Fragment, {});
                        }
                        const { type, variant, in_table, column_ref, display_column, gridColumn, gridRow, } = values;
                        if (type === "string") {
                            if (variant === "id-picker") {
                                idPickerSanityCheck(column, in_table, column_ref, display_column);
                                return (jsx(IdViewer, { value: (validatedData ?? {})[column], in_table,
                                    column_ref,
                                    display_column,
                                    column,
                                    gridColumn,
                                    gridRow }, `form-${key}`));
                            }
                            if (variant === "date-picker") {
                                const value = (validatedData ?? {})[column];
                                if (!!value === false) {
                                    return (jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", label: `${snakeToLabel(column)}`, ...getDataListProps(undefined) }, `form-${key}`));
                                }
                                const date = dayjs(value).format("YYYY-MM-DD");
                                return (jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", label: `${snakeToLabel(column)}`, ...getDataListProps(date) }, `form-${key}`));
                            }
                            return (jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 4", label: `${snakeToLabel(column)}`, ...getDataListProps((validatedData ?? {})[column]) }, `form-${key}`));
                        }
                        if (type === "object") {
                            const value = (validatedData ?? {})[column];
                            if (!!value === false) {
                                return (jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", label: `${snakeToLabel(column)}`, ...getDataListProps(undefined) }, `form-${key}`));
                            }
                            return (jsxs(Flex, { flexFlow: "column", gap: 2, gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", children: [jsx(Text, { children: snakeToLabel(column) }), jsx(DataListRoot, { orientation: "horizontal", padding: 4, borderColor: "gray.200", borderWidth: 1, borderRadius: 4, children: Object.entries(value).map(([key, value]) => {
                                            return (jsx(DataListItem, { label: `${key}`, ...getDataListProps(value) }, `form-${column}-${key}`));
                                        }) })] }, `form-${key}`));
                        }
                        if (type === "boolean") {
                            return (jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 4", label: `${snakeToLabel(column)}`, ...getDataListProps((validatedData ?? {})[column]) }, `form-${key}`));
                        }
                        if (type === "number" || type === "integer") {
                            return (jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 4", label: `${snakeToLabel(column)}`, ...getDataListProps((validatedData ?? {})[column]) }, `form-${key}`));
                        }
                        if (type === "array") {
                            if (variant === "tag-picker") {
                                const value = (validatedData ?? {})[column];
                                return (jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 1", label: `${snakeToLabel(column)}`, ...getDataListProps(JSON.stringify(value)) }, `form-${key}`));
                            }
                            if (variant === "file-picker") {
                                const fileNames = ((validatedData ?? {})[column] ?? []).map((file) => {
                                    return file.name;
                                });
                                return (jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 4", label: `${snakeToLabel(column)}`, ...getDataListProps(JSON.stringify(fileNames)) }, `form-${key}`));
                            }
                            const objectString = JSON.stringify((validatedData ?? {})[column]);
                            return (jsx(DataListItem, { gridColumn: gridColumn ?? "span 4", gridRow: gridRow ?? "span 4", label: `${snakeToLabel(column)}`, ...getDataListProps(objectString) }, `form-${key}`));
                        }
                        if (type === "null") {
                            return jsx(Fragment, { children: `null ${column}` });
                        }
                        return jsx(Fragment, { children: `unknown type ${column}` });
                    }) }), jsx(Button, { onClick: () => {
                        onFormSubmit(validatedData);
                    }, children: confirm ?? "Confirm" }), jsx(Button, { onClick: () => {
                        setIsConfirming(false);
                    }, variant: "subtle", children: cancel ?? "Cancel" }), isSubmiting && (jsx(Box, { pos: "absolute", inset: "0", bg: "bg/80", children: jsx(Center, { h: "full", children: jsx(Spinner, { color: "teal.500" }) }) })), isError && (jsx(Fragment, { children: jsx(Alert.Root, { status: "error", children: jsx(Alert.Title, { children: jsx(AccordionRoot, { collapsible: true, defaultValue: ["b"], children: jsxs(AccordionItem, { value: "b", children: [jsxs(AccordionItemTrigger, { children: [jsx(Alert.Indicator, {}), `${error}`] }), jsx(AccordionItemContent, { children: `${JSON.stringify(error)}` })] }) }) }) }) }))] }));
    }
    return (jsxs(Fragment, { children: [jsxs(Grid, { gap: 2, children: [jsx(Heading, { children: title ?? snakeToLabel(schema.title ?? "") }), jsx(Grid, { gap: 4, gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: `repeat(${rowNumber ?? "auto-fit"}, auto)`, children: ordered.map((column) => {
                            if (properties === undefined) {
                                return jsx(Fragment, {});
                            }
                            const key = column;
                            const values = properties[column];
                            const shouldIgnore = ignore.some((column) => {
                                return column == key;
                            });
                            if (shouldIgnore) {
                                return jsx(Fragment, {});
                            }
                            //@ts-expect-error TODO: add more fields to support form-creation
                            const { type, variant, in_table, column_ref, display_column } = values;
                            if (type === "string") {
                                if ((values.enum ?? []).length > 0) {
                                    return jsx(EnumPicker, { column: key }, `form-${key}`);
                                }
                                if (variant === "id-picker") {
                                    idPickerSanityCheck(column, in_table, column_ref, display_column);
                                    return (jsx(IdPicker, { column: key, in_table: in_table, column_ref: column_ref, display_column: display_column }, `form-${key}`));
                                }
                                if (variant === "date-picker") {
                                    return jsx(DatePicker, { column: key }, `form-${key}`);
                                }
                                return jsx(StringInputField, { column: key }, `form-${key}`);
                            }
                            if (type === "number" || type === "integer") {
                                return jsx(NumberInputField, { column: key }, `form-${key}`);
                            }
                            if (type === "boolean") {
                                return jsx(BooleanPicker, { column: key }, `form-${key}`);
                            }
                            if (type === "object") {
                                return jsx(ObjectInput, { column: key }, `form-${key}`);
                            }
                            if (type === "array") {
                                if (variant === "id-picker") {
                                    idPickerSanityCheck(column, in_table, column_ref, display_column);
                                    return (jsx(IdPicker, { column: key, in_table: in_table, column_ref: column_ref, display_column: display_column, isMultiple: true }, `form-${key}`));
                                }
                                if (variant === "tag-picker") {
                                    return jsx(TagPicker, { column: key }, `form-${key}`);
                                }
                                if (variant === "file-picker") {
                                    return jsx(FilePicker, { column: key }, `form-${key}`);
                                }
                                return jsx(Fragment, { children: `array ${column}` });
                            }
                            if (type === "null") {
                                return jsx(Fragment, { children: `null ${column}` });
                            }
                            return jsx(Fragment, { children: "missing type" });
                        }) }), jsx(Button, { onClick: () => {
                            methods.handleSubmit(onValid)();
                        }, formNoValidate: true, children: submit ?? "Submit" })] }), isError && (jsxs(Fragment, { children: ["isError", jsxs(Fragment, { children: [" ", `${error}`] })] }))] }));
};
const Form = ({ schema, serverUrl, order = [], ignore = [], onSubmit = undefined, preLoadedValues = {}, rowNumber = undefined, displayText = {}, }) => {
    const queryClient = new QueryClient();
    const methods = useForm({ values: preLoadedValues });
    const { properties } = schema;
    idListSanityCheck("order", order, properties);
    idListSanityCheck("ignore", ignore, properties);
    idListSanityCheck("preLoadedValues", Object.keys(preLoadedValues), properties);
    return (jsx(QueryClientProvider, { client: queryClient, children: jsx(SchemaFormContext.Provider, { value: {
                schema,
                serverUrl,
                displayText,
                order,
                ignore,
                // @ts-expect-error TODO: find appropriate types
                onSubmit,
                rowNumber,
            }, children: jsx(FormProvider, { ...methods, children: jsx(FormInternal, {}) }) }) }));
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

export { CardHeader, DataDisplay, DataTable, DataTableServer, DefaultCardTitle, DefaultTable, DensityToggleButton, EditFilterButton, EditOrderButton, EditSortingButton, EditViewButton, EmptyState, ErrorAlert, FilterOptions, Form, GlobalFilter, PageSizeControl, ReloadButton, ResetFilteringButton, ResetSelectionButton, ResetSortingButton, RowCountText, Table, TableBody, TableCardContainer, TableCards, TableComponent, TableControls, TableFilter, TableFilterTags, TableFooter, TableHeader, TableLoadingComponent, TableOrderer, TablePagination, TableSelector, TableSorter, TableViewer, TextCell, getColumns, getMultiDates, getRangeDates, useDataTable, useDataTableContext, useDataTableServer, widthSanityCheck };
