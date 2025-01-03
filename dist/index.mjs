import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { IconButton, Button as Button$1, Portal, Dialog, useDisclosure, Flex, DialogRoot as DialogRoot$1, DialogBackdrop, DialogTrigger as DialogTrigger$1, DialogContent as DialogContent$1, DialogCloseTrigger as DialogCloseTrigger$1, DialogHeader as DialogHeader$1, DialogTitle as DialogTitle$1, DialogBody as DialogBody$1, DialogFooter as DialogFooter$1, Text, Menu, AbsoluteCenter, Tag as Tag$1, Grid, Image, Checkbox as Checkbox$1, Table as Table$1, Box, Tooltip as Tooltip$1, Spinner, Icon, MenuRoot as MenuRoot$1, MenuTrigger as MenuTrigger$1, Span, EmptyState as EmptyState$1, VStack, List, Card, Input, Slider as Slider$1, HStack, For, RadioGroup as RadioGroup$1, Group, Switch as Switch$1, InputElement } from '@chakra-ui/react';
import { AiOutlineColumnWidth } from 'react-icons/ai';
import { MdFilterAlt, MdOutlineMoveDown, MdOutlineSort, MdOutlineViewColumn, MdFilterListAlt, MdPushPin, MdCancel, MdClear, MdArrowUpward, MdArrowDownward, MdFirstPage, MdArrowBack, MdArrowForward, MdLastPage, MdOutlineChecklist, MdClose, MdSearch } from 'react-icons/md';
import * as React from 'react';
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { LuX, LuCheck, LuChevronRight } from 'react-icons/lu';
import { FaUpDown, FaGripLinesVertical } from 'react-icons/fa6';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { IoMdEye, IoMdCheckbox } from 'react-icons/io';
import { makeStateUpdater, functionalUpdate, useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { GrAscend, GrDescend } from 'react-icons/gr';
import { IoReload } from 'react-icons/io5';
import { HiColorSwatch } from 'react-icons/hi';
import { monitorForElements, draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import axios from 'axios';

const DensityToggleButton = ({ text, icon = jsx(AiOutlineColumnWidth, {}), }) => {
    const { table } = useDataTableContext();
    return (jsxs(Fragment, { children: [!!text === false && (jsx(IconButton, { variant: "ghost", "aria-label": "Toggle Density", icon: icon, onClick: () => {
                    table.toggleDensity();
                } })), !!text !== false && (jsx(Button$1, { leftIcon: icon, variant: "ghost", "aria-label": "Toggle Density", onClick: () => {
                    table.toggleDensity();
                }, children: text }))] }));
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

const EditFilterButton = ({ text, title = "Edit Filter", closeText = "Close", resetText = "Reset", icon = jsx(MdFilterAlt, {}), }) => {
    const filterModal = useDisclosure();
    return (jsx(Fragment, { children: jsx(DialogRoot, { size: ["full", "full", "md", "md"], children: jsxs(DialogRoot, { children: [jsx(DialogTrigger, { children: jsxs(Button$1, { variant: "outline", children: [icon, " ", text] }) }), jsxs(DialogContent, { children: [jsx(DialogHeader, { children: jsx(DialogTitle, { children: title }) }), jsx(DialogBody, { children: jsxs(Flex, { flexFlow: "column", gap: "1rem", children: [jsx(TableFilter, {}), jsx(ResetFilteringButton, { text: resetText })] }) }), jsxs(DialogFooter, { children: [jsx(DialogActionTrigger, { asChild: true, children: jsx(Button$1, { onClick: filterModal.onClose, children: closeText }) }), jsx(Button$1, { children: "Save" })] }), jsx(DialogCloseTrigger, {})] })] }) }) }));
};

const EditOrderButton = ({ text, icon = jsx(MdOutlineMoveDown, {}), title = "Change Order", }) => {
    return (jsx(Fragment, { children: jsxs(DialogRoot$1, { size: "cover", children: [jsx(DialogBackdrop, {}), jsx(DialogTrigger$1, { children: jsxs(Button$1, { variant: "ghost", children: [icon, text] }) }), jsxs(DialogContent$1, { children: [jsx(DialogCloseTrigger$1, {}), jsxs(DialogHeader$1, { children: [jsx(DialogTitle$1, {}), title] }), jsx(DialogBody$1, { children: jsx(Flex, { flexFlow: "column", gap: "0.25rem", children: jsx(TableOrderer, {}) }) }), jsx(DialogFooter$1, {})] })] }) }));
};

const TableContext = createContext({
    table: {},
    refreshData: () => { },
    globalFilter: "",
    setGlobalFilter: () => { },
    loading: false,
    hasError: false,
});

const useDataTableContext = () => {
    const { table, refreshData, globalFilter, setGlobalFilter, loading, hasError, } = useContext(TableContext);
    return {
        table,
        refreshData,
        globalFilter,
        setGlobalFilter,
        loading,
        hasError,
    };
};

const TableSorter = () => {
    const { table } = useDataTableContext();
    return (jsx(Fragment, { children: table.getHeaderGroups().map((headerGroup) => (jsx(Fragment, { children: headerGroup.headers.map((header) => {
                const displayName = header.column.columnDef.meta === undefined
                    ? header.column.id
                    : header.column.columnDef.meta.displayName;
                return (jsx(Fragment, { children: header.column.getCanSort() && (jsxs(Flex, { alignItems: "center", gap: "0.5rem", padding: "0.5rem", children: [jsx(Text, { children: displayName }), jsxs(Button$1, { variant: "ghost", onClick: () => {
                                    header.column.toggleSorting();
                                }, children: [header.column.getIsSorted() === false && jsx(FaUpDown, {}), header.column.getIsSorted() === "asc" && (jsx(BiDownArrow, {})), header.column.getIsSorted() === "desc" && (jsx(BiUpArrow, {}))] }), header.column.getIsSorted() && (jsx(Button$1, { onClick: () => {
                                    header.column.clearSorting();
                                }, children: jsx(CgClose, {}) }))] })) }));
            }) }))) }));
};

const EditSortingButton = ({ text, icon = jsx(MdOutlineSort, {}), title = "Edit Sorting", }) => {
    const sortingModal = useDisclosure();
    return (jsx(Fragment, { children: jsxs(DialogRoot, { size: ["full", "full", "md", "md"], children: [jsx(DialogBackdrop, {}), jsx(DialogTrigger, { children: jsxs(Button$1, { variant: "ghost", onClick: sortingModal.onOpen, children: [icon, " ", text] }) }), jsxs(DialogContent, { children: [jsx(DialogCloseTrigger, {}), jsxs(DialogHeader, { children: [jsx(DialogTitle, {}), title] }), jsx(DialogBody, { children: jsxs(Flex, { flexFlow: "column", gap: "0.25rem", children: [jsx(TableSorter, {}), jsx(ResetSortingButton, {})] }) }), jsx(DialogFooter, {})] })] }) }));
};

const EditViewButton = ({ text, icon = jsx(IoMdEye, {}), title = "Edit View", }) => {
    const viewModel = useDisclosure();
    return (jsx(Fragment, { children: jsxs(DialogRoot, { children: [jsx(DialogBackdrop, {}), jsx(DialogTrigger, { children: jsxs(Button$1, { variant: "ghost", onClick: viewModel.onOpen, children: [icon, " ", text] }) }), jsxs(DialogContent, { children: [jsx(DialogCloseTrigger, {}), jsxs(DialogHeader, { children: [jsx(DialogTitle, {}), title] }), jsx(DialogBody, { children: jsx(TableViewer, {}) }), jsx(DialogFooter, {})] })] }) }));
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
                        }, children: pageSize }))) })] }) }));
};

const ResetFilteringButton = ({ text = "Reset Filtering", }) => {
    const { table } = useDataTableContext();
    return (jsx(Button$1, { onClick: () => {
            table.resetColumnFilters();
        }, children: text }));
};

const ResetSelectionButton = ({ text = "Reset Selection", }) => {
    const { table } = useDataTableContext();
    return (jsx(Button$1, { onClick: () => {
            table.resetRowSelection();
        }, children: text }));
};

const ResetSortingButton = ({ text = "Reset Sorting", }) => {
    const { table } = useDataTableContext();
    return (jsx(Button$1, { onClick: () => {
            table.resetSorting();
        }, children: text }));
};

const RowCountText = () => {
    const { table } = useDataTableContext();
    return jsx(Text, { children: table.getRowCount() });
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
const DataTable = ({ columns, data, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, onRowSelect = () => { }, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, children, }) => {
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
    useEffect(() => {
        setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
    }, []);
    useEffect(() => {
        onRowSelect(table.getState().rowSelection, data);
    }, [table.getState().rowSelection]);
    return (jsx(TableContext.Provider, { value: {
            table: { ...table },
            refreshData: () => {
                throw new Error("not implemented");
            },
            globalFilter: globalFilter,
            setGlobalFilter: setGlobalFilter,
            loading: false,
            hasError: false,
        }, children: children }));
};

const DataTableServer = ({ columns, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, onRowSelect = () => { }, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, data, loading, hasError, refreshData, children, }) => {
    const table = useReactTable({
        _features: [DensityFeature],
        data: data.results,
        rowCount: data.count ?? 0,
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
    useEffect(() => {
        setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
    }, []);
    useEffect(() => {
        onRowSelect(table.getState().rowSelection, data.results);
    }, [table.getState().rowSelection]);
    useEffect(() => {
        table.resetPagination();
    }, [sorting, columnFilters, globalFilter]);
    return (jsx(TableContext.Provider, { value: {
            table: { ...table },
            refreshData: refreshData,
            globalFilter,
            setGlobalFilter,
            loading: loading,
            hasError: hasError,
        }, children: children }));
};

const Tag = React.forwardRef(function Tag(props, ref) {
    const { startElement, endElement, onClose, closable = !!onClose, children, ...rest } = props;
    return (jsxs(Tag$1.Root, { ref: ref, ...rest, children: [startElement && (jsx(Tag$1.StartElement, { children: startElement })), jsx(Tag$1.Label, { children: children }), endElement && (jsx(Tag$1.EndElement, { children: endElement })), closable && (jsx(Tag$1.EndElement, { children: jsx(Tag$1.CloseTrigger, { onClick: onClose }) }))] }));
});

const DefaultCard = ({ row, imageColumnId = undefined, titleColumnId = undefined, tagColumnId = undefined, tagIcon = undefined, showTag = true, }) => {
    if (!!row.original === false) {
        return jsx(Fragment, {});
    }
    //   const imageIdExists = Object.keys(row.original).some((key) => {
    //     return key === imageColumnId;
    //   });
    //   const titleIdExists = Object.keys(row.original).some((key) => {
    //     return key === titleColumnId;
    //   });
    //   const tagIdExists = Object.keys(row.original).some((key) => {
    //     return key === tagColumnId;
    //   });
    return (jsxs(Grid, { templateRows: "auto auto", gap: "1rem", children: [jsx(Flex, { justifyContent: "center", alignItems: "center", children: jsx(Image, { src: row.original[imageColumnId] }) }), jsxs(Flex, { gap: "0.5rem", flexFlow: "wrap", children: [jsx(Text, { fontWeight: "bold", fontSize: "large", children: row.original[titleColumnId] }), showTag && (jsx(Tag, { fontSize: "large", startElement: tagIcon && tagIcon({}), children: row.original[tagColumnId] }))] })] }));
};

const Checkbox = React.forwardRef(function Checkbox(props, ref) {
    const { icon, children, inputProps, rootRef, ...rest } = props;
    return (jsxs(Checkbox$1.Root, { ref: rootRef, ...rest, children: [jsx(Checkbox$1.HiddenInput, { ref: ref, ...inputProps }), jsx(Checkbox$1.Control, { children: icon || jsx(Checkbox$1.Indicator, {}) }), children != null && (jsx(Checkbox$1.Label, { children: children }))] }));
});

const TableBody = ({ pinnedBgColor = { light: "gray.50", dark: "gray.700" }, showSelector = false, alwaysShowSelector = true, }) => {
    const { table } = useContext(TableContext);
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
    return (jsx(Table$1.Body, { children: table.getRowModel().rows.map((row, index) => {
            return (jsxs(Table$1.Row, { display: "flex", _hover: { backgroundColor: "rgba(178,178,178,0.1)" }, zIndex: 1, onMouseEnter: () => handleRowHover(index), onMouseLeave: () => handleRowHover(-1), children: [showSelector && (jsx(TableRowSelector, { index: index, row: row, hoveredRow: hoveredRow, alwaysShowSelector: alwaysShowSelector })), row.getVisibleCells().map((cell, index) => {
                        return (jsx(Table$1.Cell, { padding: `${table.getDensityValue()}px`, 
                            // styling resize and pinning start
                            maxWidth: `${cell.column.getSize()}px`, width: `${cell.column.getSize()}px`, ...getTdProps(cell), children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, `chakra-table-rowcell-${cell.id}-${index}`));
                    })] }, `chakra-table-row-${row.id}`));
        }) }));
};
const TableRowSelector = ({ index, row, hoveredRow, pinnedBgColor = { light: "gray.50", dark: "gray.700" }, alwaysShowSelector = true, }) => {
    const { table } = useContext(TableContext);
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
                    // indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler() }) }))] }));
};

const Tooltip = React.forwardRef(function Tooltip(props, ref) {
    const { showArrow, children, disabled, portalled, content, contentProps, portalRef, ...rest } = props;
    if (disabled)
        return children;
    return (jsxs(Tooltip$1.Root, { ...rest, children: [jsx(Tooltip$1.Trigger, { asChild: true, children: children }), jsx(Portal, { disabled: !portalled, container: portalRef, children: jsx(Tooltip$1.Positioner, { children: jsxs(Tooltip$1.Content, { ref: ref, ...contentProps, children: [showArrow && (jsx(Tooltip$1.Arrow, { children: jsx(Tooltip$1.ArrowTip, {}) })), content] }) }) })] }));
});

const TableControls = ({ totalText = "Total:", showFilter = false, fitTableWidth = false, fitTableHeight = false, isMobile = false, children = jsx(Fragment, {}), showFilterName = false, showFilterTags = false, showReload = false, filterOptions = [], extraItems = jsx(Fragment, {}), }) => {
    const { loading, hasError } = useDataTableContext();
    return (jsxs(Grid, { templateRows: "auto auto auto 1fr auto", templateColumns: "1fr 1fr", width: fitTableWidth ? "fit-content" : "100%", height: fitTableHeight ? "fit-content" : "100%", justifySelf: "center", alignSelf: "center", gap: "0.5rem", children: [jsxs(Flex, { justifyContent: "space-between", gridColumn: "1 / span 2", children: [jsx(Box, { children: jsx(EditViewButton, { text: isMobile ? undefined : "View", icon: jsx(MdOutlineViewColumn, {}) }) }), jsxs(Flex, { gap: "0.5rem", alignItems: "center", justifySelf: "end", children: [loading && jsx(Spinner, { size: "sm" }), hasError && (jsx(Tooltip, { content: "An error occurred while fetching data", children: jsx(Icon, { as: BsExclamationCircleFill, color: "red.400" }) })), showFilter && (jsxs(Fragment, { children: [jsx(GlobalFilter, {}), jsx(EditFilterButton, { text: isMobile ? undefined : "Advanced Filter" })] })), showReload && jsx(ReloadButton, {}), extraItems] })] }), jsx(Flex, { gridColumn: "1 / span 2", flexFlow: "column", gap: "0.5rem", children: filterOptions.map((column) => {
                    return (jsxs(Flex, { alignItems: "center", flexFlow: "wrap", gap: "0.5rem", children: [showFilterName && jsxs(Text, { children: [column, ":"] }), jsx(FilterOptions, { column: column })] }, column));
                }) }), jsx(Flex, { gridColumn: "1 / span 2", children: showFilterTags && jsx(TableFilterTags, {}) }), jsx(Box, { overflow: "auto", gridColumn: "1 / span 2", width: "100%", height: "100%", children: children }), jsxs(Flex, { gap: "1rem", alignItems: "center", children: [jsx(PageSizeControl, {}), jsxs(Flex, { children: [jsx(Text, { paddingRight: "0.5rem", children: totalText }), jsx(RowCountText, {})] })] }), jsx(Box, { justifySelf: "end", children: jsx(TablePagination, {}) })] }));
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
                                onChange: table.getToggleAllRowsSelectedHandler() }) })), !isCheckBoxVisible() && (jsx(Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` }))] })), footerGroup.headers.map((header) => (jsx(Table$1.Header, { padding: "0", columnSpan: `${header.colSpan}`, 
                    // styling resize and pinning start
                    maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, display: "grid", ...getThProps(header), children: jsx(MenuRoot$1, { children: jsx(MenuTrigger$1, { asChild: true, children: jsx(Box, { padding: `${table.getDensityValue()}px`, display: "flex", alignItems: "center", justifyContent: "start", borderRadius: "0rem", _hover: { backgroundColor: "gray.100" }, children: jsxs(Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.footer, header.getContext()), jsx(Box, { children: header.column.getCanSort() && (jsxs(Fragment, { children: [header.column.getIsSorted() === false && (
                                                    // <UpDownIcon />
                                                    jsx(Fragment, {})), header.column.getIsSorted() === "asc" && (jsx(BiUpArrow, {})), header.column.getIsSorted() === "desc" && (jsx(BiDownArrow, {}))] })) })] }) }) }) }) }, `chakra-table-footer-${footerGroup.id}`)))] }, `chakra-table-footergroup-${footerGroup.id}`))) }));
};

const Button = React.forwardRef(function Button(props, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props;
    return (jsx(Button$1, { disabled: loading || disabled, ref: ref, ...rest, children: loading && !loadingText ? (jsxs(Fragment, { children: [jsx(AbsoluteCenter, { display: "inline-flex", children: jsx(Spinner, { size: "inherit", color: "inherit" }) }), jsx(Span, { opacity: 0, children: children })] })) : loading && loadingText ? (jsxs(Fragment, { children: [jsx(Spinner, { size: "inherit", color: "inherit" }), loadingText] })) : (children) }));
});

const TableHeader = ({ canResize, pinnedBgColor = { light: "gray.50", dark: "gray.700" }, showSelector = false, isSticky = true, alwaysShowSelector = true, tHeadProps = {}, }) => {
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
                    return (jsxs(Table$1.ColumnHeader, { padding: "0rem", columnSpan: `${header.colSpan}`, 
                        // styling resize and pinning start
                        width: `${header.getSize()}px`, display: "grid", gridTemplateColumns: "1fr auto", zIndex: header.index, ...getThProps(header), children: [jsxs(MenuRoot, { children: [jsx(MenuTrigger, { asChild: true, children: jsx(Grid, { padding: `${table.getDensityValue()}px`, display: "flex", alignItems: "center", justifyContent: "start", borderRadius: "0rem", overflow: "auto", _hover: { backgroundColor: "gray.100" }, children: jsxs(Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
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

const DefaultTable = ({ totalText = "Total:", showFilter = false, showFooter = false, fitTableWidth = false, fitTableHeight = false, isMobile = false, filterOptions = [], showFilterTags = false, showFilterName = false, showReload = false, showSelector = false, extraItems = jsx(Fragment, {}), tableProps = {}, tHeadProps = {}, }) => {
    return (jsx(TableControls, { totalText: totalText, showFilter: showFilter, fitTableWidth: fitTableWidth, fitTableHeight: fitTableHeight, isMobile: isMobile, filterOptions: filterOptions, showFilterName: showFilterName, showFilterTags: showFilterTags, showReload: showReload, extraItems: extraItems, children: jsxs(Table, { ...tableProps, children: [jsx(TableHeader, { canResize: true, showSelector: showSelector, tHeadProps: tHeadProps }), jsx(TableBody, { showSelector: showSelector }), showFooter && jsx(TableFooter, { showSelector: showSelector })] }) }));
};

const ReloadButton = ({ text = "Reload", variant = "icon", }) => {
    const { refreshData } = useDataTableContext();
    if (variant === "icon") {
        return (jsx(Tooltip, { showArrow: true, content: "This is the tooltip content", children: jsx(Button, { variant: "ghost", onClick: () => {
                    refreshData();
                }, "aria-label": "refresh", children: jsx(IoReload, {}) }) }));
    }
    return (jsx(Button, { variant: "ghost", leftIcon: jsx(IoReload, {}), onClick: () => {
            refreshData();
        }, children: text }));
};

const EmptyState = React.forwardRef(function EmptyState(props, ref) {
    const { title, description, icon, children, ...rest } = props;
    return (jsx(EmptyState$1.Root, { ref: ref, ...rest, children: jsxs(EmptyState$1.Content, { children: [icon && (jsx(EmptyState$1.Indicator, { children: icon })), description ? (jsxs(VStack, { textAlign: "center", children: [jsx(EmptyState$1.Title, { children: title }), jsx(EmptyState$1.Description, { children: description })] })) : (jsx(EmptyState$1.Title, { children: title })), children] }) }));
});

const EmptyResult = (jsx(EmptyState, { icon: jsx(HiColorSwatch, {}), title: "No results found", description: "Try adjusting your search", children: jsxs(List.Root, { variant: "marker", children: [jsx(List.Item, { children: "Try removing filters" }), jsx(List.Item, { children: "Try different keywords" })] }) }));
const Table = ({ children, emptyComponent = EmptyResult, ...props }) => {
    const { table } = useDataTableContext();
    if (table.getRowModel().rows.length <= 0) {
        return emptyComponent;
    }
    return (jsx(Table$1.Root, { stickyHeader: true, variant: "outline", width: table.getCenterTotalSize(), ...props, children: children }));
};

const TableCardContainer = ({ children, ...props }) => {
    return (jsx(Grid, { gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr 1fr"], gap: "0.5rem", ...props, children: children }));
};

const DefaultCardTitle = () => {
    return jsx(Fragment, {});
};
const TableCards = ({ isSelectable = false, showDisplayNameOnly = false, renderTitle = DefaultCardTitle, cardBodyProps = {} }) => {
    const { table } = useContext(TableContext);
    return (jsx(Fragment, { children: table.getRowModel().rows.map((row) => {
            return (jsx(Card.Root, { children: jsxs(Card.Body, { display: "flex", flexFlow: "column", gap: "0.5rem", ...cardBodyProps, children: [isSelectable && (jsx(Checkbox, { isChecked: row.getIsSelected(),
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

const DateRangeFilter = ({ startDate, endDate, setStartDate, setEndDate, }) => {
    console.log(startDate, endDate, "dflp");
    return (jsx(Box, { p: "1rem", children: jsxs(VStack, { children: [jsxs(Box, { children: [jsx(Box, { children: "Start Date" }), jsx(Input, { id: "start-date", type: "date", value: startDate, onChange: (e) => setStartDate(e.target.value) })] }), jsxs(Box, { children: [jsx(Box, { children: "End Date" }), jsx(Input, { id: "end-date", type: "date", value: endDate, onChange: (e) => setEndDate(e.target.value) })] })] }) }));
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
    return (jsx(Box, { p: 8, children: jsx(Slider, { width: "full", min: min, max: max, defaultValue: defaultValue, step: step, name: `Selected Range: ${range[0]} - ${range[1]}`, 
            // value={field.value}
            onValueChange: (val) => setRange(val.value) }) }));
};

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

const Radio = React.forwardRef(function Radio(props, ref) {
    const { children, inputProps, rootRef, ...rest } = props;
    return (jsxs(RadioGroup$1.Item, { ref: rootRef, ...rest, children: [jsx(RadioGroup$1.ItemHiddenInput, { ref: ref, ...inputProps }), jsx(RadioGroup$1.ItemIndicator, {}), children && (jsx(RadioGroup$1.ItemText, { children: children }))] }));
});
const RadioGroup = RadioGroup$1.Root;

const Filter = ({ column }) => {
    const { filterVariant } = column.columnDef.meta ?? {};
    const displayName = column.columnDef.meta?.displayName ?? column.id;
    const filterOptions = column.columnDef.meta?.filterOptions ?? [];
    // const collection = createListCollection({
    //   items: filterOptions,
    // });
    if (column.columns.length > 0) {
        return (jsxs(Flex, { flexFlow: "column", gap: "0.25rem", children: [jsx(Text, { children: displayName }), column.columns.map((column) => {
                    return jsx(Filter, { column: column }, column.id);
                })] }, column.id));
    }
    if (!column.getCanFilter()) {
        return jsx(Fragment, {});
    }
    if (filterVariant === "select") {
        return (jsxs(Flex, { flexFlow: "column", gap: "0.25rem", children: [jsx(Text, { children: displayName }), jsx(RadioGroup, { value: column.getFilterValue() ? String(column.getFilterValue()) : "", onValueChange: (details) => {
                        column.setFilterValue(details.value);
                    }, children: jsx(Flex, { flexFlow: 'wrap', gap: '0.5rem', children: filterOptions.map((item) => (jsx(Radio, { value: item, children: item }, item))) }) })] }, column.id));
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
        return (jsx(RangeFilter, { range: filterValue, setRange: function (value) {
                // throw new Error("Function not implemented.");
                column.setFilterValue(value);
            }, defaultValue: defaultValue, min: min, max: max, step: step }));
    }
    if (filterVariant === "dateRange") {
        const [start, end] = column.getFilterValue() ?? [
            "",
            "",
        ];
        return (jsxs(Flex, { flexFlow: "column", gap: "0.25rem", children: [jsx(Text, { children: displayName }), jsx(DateRangeFilter, { startDate: start, endDate: end, setStartDate: function (value) {
                        column.setFilterValue((state) => {
                            return [value, (state ?? ["", ""])[1]];
                        });
                    }, setEndDate: function (value) {
                        column.setFilterValue((state) => {
                            return [(state ?? ["", ""])[0], value];
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

const TableFilterTags = () => {
    const { table } = useDataTableContext();
    return (jsx(Flex, { gap: "0.5rem", flexFlow: "wrap", children: table.getState().columnFilters.map(({ id, value }) => {
            return (jsxs(Tag, { gap: "0.5rem", children: [`${id}: ${value}`, jsx(IconButton, { variant: "ghost", "aria-label": "remove filter", onClick: () => {
                            table.setColumnFilters(table.getState().columnFilters.filter((filter) => {
                                return filter.value != value;
                            }));
                        }, children: jsx(CgClose, {}) })] }, `${id}-${value}`));
        }) }));
};

const TableLoadingComponent = ({ render, }) => {
    const { loading } = useDataTableContext();
    return jsx(Fragment, { children: render(loading) });
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
    return (jsxs(Flex, { gap: "0.5rem", flexFlow: "column", children: [jsx(Flex, { gap: "0.5rem", flexFlow: "column", children: order.map((columnId, index) => (jsxs(Flex, { gap: "0.5rem", alignItems: "center", justifyContent: "space-between", children: [jsx(IconButton, { onClick: () => {
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

const TablePagination = () => {
    const { firstPage, getCanPreviousPage, previousPage, getState, nextPage, getCanNextPage, lastPage, } = useDataTableContext().table;
    return (jsxs(Group, { attached: true, children: [jsx(IconButton, { onClick: () => firstPage(), disabled: !getCanPreviousPage(), "aria-label": "first-page", variant: "ghost", children: jsx(MdFirstPage, {}) }), jsx(IconButton, { onClick: () => previousPage(), disabled: !getCanPreviousPage(), "aria-label": "previous-page", variant: "ghost", children: jsx(MdArrowBack, {}) }), jsx(Button, { variant: "ghost", onClick: () => { }, disabled: !getCanPreviousPage(), children: getState().pagination.pageIndex + 1 }), jsx(IconButton, { onClick: () => nextPage(), disabled: !getCanNextPage(), "aria-label": "next-page", variant: "ghost", children: jsx(MdArrowForward, {}) }), jsx(IconButton, { onClick: () => lastPage(), disabled: !getCanNextPage(), "aria-label": "last-page", variant: "ghost", children: jsx(MdLastPage, {}) })] }));
};

const SelectAllRowsToggle = ({ selectAllIcon = jsx(MdOutlineChecklist, {}), clearAllIcon = jsx(MdClear, {}), selectAllText = "", clearAllText = "", }) => {
    const { table } = useDataTableContext();
    return (jsxs(Fragment, { children: [!!selectAllText === false && (jsx(IconButton, { icon: table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon, variant: "ghost", "aria-label": table.getIsAllRowsSelected() ? clearAllText : selectAllText, onClick: (event) => {
                    table.getToggleAllRowsSelectedHandler()(event);
                } })), !!selectAllText !== false && (jsx(Button$1, { leftIcon: table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon, variant: "ghost", onClick: (event) => {
                    table.getToggleAllRowsSelectedHandler()(event);
                }, children: table.getIsAllRowsSelected() ? clearAllText : selectAllText }))] }));
};

const TableSelector = () => {
    const { table } = useContext(TableContext);
    return (jsxs(Fragment, { children: [table.getSelectedRowModel().rows.length > 0 && (jsxs(Button$1, { onClick: () => { }, variant: "ghost", display: "flex", gap: "0.25rem", children: [jsx(Box, { fontSize: "sm", children: `${table.getSelectedRowModel().rows.length}` }), jsx(Icon, { as: IoMdCheckbox })] })), !table.getIsAllPageRowsSelected() && jsx(SelectAllRowsToggle, {}), table.getSelectedRowModel().rows.length > 0 && (jsx(IconButton, { variant: "ghost", icon: jsx(Icon, { as: MdClear }), onClick: () => {
                    table.resetRowSelection();
                }, "aria-label": "reset selection" }))] }));
};

const Switch = React.forwardRef(function Switch(props, ref) {
    const { inputProps, children, rootRef, trackLabel, thumbLabel, ...rest } = props;
    return (jsxs(Switch$1.Root, { ref: rootRef, ...rest, children: [jsx(Switch$1.HiddenInput, { ref: ref, ...inputProps }), jsxs(Switch$1.Control, { children: [jsx(Switch$1.Thumb, { children: thumbLabel && (jsx(Switch$1.ThumbIndicator, { fallback: thumbLabel?.off, children: thumbLabel?.on })) }), trackLabel && (jsx(Switch$1.Indicator, { fallback: trackLabel.off, children: trackLabel.on }))] }), children != null && (jsx(Switch$1.Label, { children: children }))] }));
});

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
    return (jsxs(Grid, { ref: ref, templateColumns: "auto 1fr", gap: "0.5rem", alignItems: "center", style: dragging ? { opacity: 0.4 } : {}, children: [jsx(Flex, { alignItems: "center", padding: "0", children: jsx(FaGripLinesVertical, { color: "gray.400" }) }), jsxs(Flex, { justifyContent: "space-between", alignItems: "center", children: [jsx(Box, { children: displayName }), jsx(Switch, { checked: column.getIsVisible(), onChange: column.getToggleVisibilityHandler() })] })] }));
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
            return "skyblue";
        }
        // return isDark ? "lightgrey" : "white";
        return "white";
    }
    return (jsx(Box, { backgroundColor: getColor(isDraggedOver), ref: ref, children: children }));
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

const TextCell = ({ label, padding = "0rem", children, ...props }) => {
    if (label) {
        return (jsx(Flex, { alignItems: "center", height: "100%", padding: padding, children: jsx(Tooltip, { content: jsx(Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", children: label }), children: jsx(Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-all", ...props, children: children }) }) }));
    }
    return (jsx(Flex, { alignItems: "center", height: "100%", padding: padding, children: jsx(Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-all", ...props, children: children }) }));
};

const useDataFromUrl = ({ url, params = {}, disableFirstFetch = false, onFetchSuccess = () => { }, defaultData, }) => {
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [data, setData] = useState(defaultData);
    const [timer, setTimer] = useState();
    const refreshData = async ({ debounce, delay } = { debounce: false, delay: 1000 }) => {
        if (debounce) {
            await debouncedGetData(delay);
            return;
        }
        await getData();
    };
    const getData = async () => {
        try {
            setHasError(false);
            setLoading(true);
            const { data } = await axios.get(url, { params: params });
            console.debug("get DataFromUrl success", data);
            onFetchSuccess(data);
            setLoading(false);
            setData(data);
        }
        catch (e) {
            console.log("Error", e);
            setLoading(false);
            setHasError(true);
        }
    };
    const debouncedGetData = async (delay = 1000) => {
        if (timer) {
            clearTimeout(timer); // Clear the previous timer
        }
        setTimer(setTimeout(async () => {
            await getData();
        }, delay));
    };
    useEffect(() => {
        if (disableFirstFetch) {
            return;
        }
        getData().catch((e) => {
            console.error(e);
        });
    }, [url]);
    return { data, loading, hasError, refreshData };
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

const useDataTableServer = ({ url, onFetchSuccess = () => { }, default: { sorting: defaultSorting = [], pagination: defaultPagination = {
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
}, debounce = true, debounceDelay = 1000, }) => {
    const [sorting, setSorting] = useState(defaultSorting);
    const [columnFilters, setColumnFilters] = useState(defaultColumnFilters); // can set initial column filter state here
    const [pagination, setPagination] = useState(defaultPagination);
    const [rowSelection, setRowSelection] = useState(defaultRowSelection);
    const [columnOrder, setColumnOrder] = useState(defaultColumnOrder);
    const [globalFilter, setGlobalFilter] = useState(defaultGlobalFilter);
    const [density, setDensity] = useState(defaultDensity);
    const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);
    const { data, loading, hasError, refreshData } = useDataFromUrl({
        url: url,
        defaultData: {
            success: false,
            results: [],
            count: 0,
        },
        params: {
            pagination: JSON.stringify({
                offset: pagination.pageIndex * pagination.pageSize,
                rows: pagination.pageSize,
            }),
            sorting: JSON.stringify(sorting.length > 0
                ? { field: sorting[0].id, sort: sorting[0].desc ? "desc" : "asc" }
                : {}),
            where: JSON.stringify(columnFilters.reduce((accumulator, filter) => {
                const obj = {};
                obj[filter.id] = filter.value;
                return { ...accumulator, ...obj };
            }, {})),
            searching: globalFilter,
        },
        disableFirstFetch: true,
        onFetchSuccess: onFetchSuccess,
    });
    useEffect(() => {
        refreshData({ debounce, debounceDelay });
    }, [pagination, sorting, columnFilters, globalFilter, url]);
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
        data,
        loading,
        hasError,
        refreshData,
    };
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
                ...children.props,
            }), endElement && (jsx(InputElement, { placement: "end", ...endElementProps, children: endElement }))] }));
});

const GlobalFilter = () => {
    const { table } = useDataTableContext();
    return (jsx(Fragment, { children: jsx(InputGroup, { flex: "1", startElement: jsx(MdSearch, {}), children: jsx(Input, { placeholder: "Outline", variant: "outline", onChange: (e) => {
                    table.setGlobalFilter(e.target.value);
                } }) }) }));
};

export { DataTable, DataTableServer, DefaultCard, DefaultCardTitle, DefaultTable, DensityToggleButton, EditFilterButton, EditOrderButton, EditSortingButton, EditViewButton, FilterOptions, GlobalFilter, PageSizeControl, ReloadButton, ResetFilteringButton, ResetSelectionButton, ResetSortingButton, RowCountText, Table, TableBody, TableCardContainer, TableCards, TableComponent, TableControls, TableFilter, TableFilterTags, TableFooter, TableHeader, TableLoadingComponent, TableOrderer, TablePagination, TableSelector, TableSorter, TableViewer, TextCell, useDataFromUrl, useDataTable, useDataTableContext, useDataTableServer };
