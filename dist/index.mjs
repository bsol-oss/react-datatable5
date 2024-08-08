import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { makeStateUpdater, functionalUpdate, useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { createContext, useState, useEffect, useContext } from 'react';
import { rankItem } from '@tanstack/match-sorter-utils';
import axios from 'axios';
import { Box, FormLabel, Checkbox, Grid, Flex, Text, Tfoot, Tr as Tr$1, Th, Menu, MenuButton, Thead, Portal, MenuList, MenuItem, IconButton, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, InputGroup, InputLeftElement, Icon, Input, Table as Table$1, Card, CardBody, VStack, FormControl, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, WrapItem, Tag, TagLabel, TagCloseButton, Select, ButtonGroup, Switch, Tooltip } from '@chakra-ui/react';
import { Tbody, Tr, Td } from '@chakra-ui/table';
import { MdOutlineViewColumn, MdFilterListAlt, MdPushPin, MdCancel, MdClear, MdFilterAlt, MdOutlineMoveDown, MdOutlineSort, MdClose, MdSearch, MdArrowUpward, MdArrowDownward, MdFirstPage, MdArrowBack, MdArrowForward, MdLastPage, MdOutlineChecklist } from 'react-icons/md';
import { ChevronUpIcon, ChevronDownIcon, UpDownIcon, CloseIcon } from '@chakra-ui/icons';
import { GrAscend, GrDescend } from 'react-icons/gr';
import { AiOutlineColumnWidth } from 'react-icons/ai';
import { IoMdEye, IoMdCheckbox } from 'react-icons/io';
import { IoReload } from 'react-icons/io5';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaGripLinesVertical } from 'react-icons/fa';

const TableContext = createContext({
    table: {},
    refreshData: () => { },
    globalFilter: "",
    setGlobalFilter: () => { },
    loading: false,
});

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
const DataTable = ({ columns, data, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, onRowSelect = () => { }, columnOrder: defaultColumnOrder = [], columnFilters: defaultColumnFilter = [], density = "sm", globalFilter: defaultGlobalFilter = "", pagination: defaultPagination = {
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
}, sorting: defaultSorting = [], rowSelection: defaultRowSelection = {}, columnVisibility: defaultColumnVisibility = {}, children, }) => {
    const [columnOrder, setColumnOrder] = useState(defaultColumnOrder);
    const [globalFilter, setGlobalFilter] = useState(defaultGlobalFilter);
    const [densityState, setDensity] = useState(density);
    const [rowSelection, setRowSelection] = useState(defaultRowSelection);
    const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);
    const table = useReactTable({
        _features: [DensityFeature],
        data: data,
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
        state: {
            columnOrder,
            globalFilter,
            density: densityState,
            rowSelection,
            columnVisibility,
        },
        onColumnOrderChange: (state) => {
            setColumnOrder(state);
        },
        enableRowSelection: enableRowSelection,
        enableMultiRowSelection: enableMultiRowSelection,
        enableSubRowSelection: enableSubRowSelection,
        columnResizeMode: "onChange",
        // global filter start
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: "fuzzy",
        // global filter end
        onDensityChange: setDensity,
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        initialState: {
            columnFilters: defaultColumnFilter,
            sorting: defaultSorting,
            pagination: defaultPagination,
        },
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
        }, children: children }));
};

const useDataFromUrl = ({ url, params = {}, disableFirstFetch = false, onFetchSuccess = () => { }, defaultData, }) => {
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [data, setData] = useState(defaultData);
    const refreshData = async () => {
        await getData();
    };
    const getData = async () => {
        try {
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

const DataTableServer = ({ columns, url, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, onRowSelect = () => { }, columnOrder: defaultColumnOrder = [], columnFilters: defaultColumnFilter = [], density = "sm", globalFilter: defaultGlobalFilter = "", pagination: defaultPagination = {
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
}, sorting: defaultSorting = [], rowSelection: defaultRowSelection = {}, columnVisibility: defaultColumnVisibility = {}, children, }) => {
    const [sorting, setSorting] = useState(defaultSorting);
    const [columnFilters, setColumnFilters] = useState(defaultColumnFilter); // can set initial column filter state here
    const [pagination, setPagination] = useState(defaultPagination);
    const [rowSelection, setRowSelection] = useState(defaultRowSelection);
    const [columnOrder, setColumnOrder] = useState(defaultColumnOrder);
    const [globalFilter, setGlobalFilter] = useState(defaultGlobalFilter);
    const [densityState, setDensity] = useState(density);
    const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);
    const { data, loading, hasError, refreshData } = useDataFromUrl({
        url: url,
        defaultData: {
            success: false,
            results: [],
            count: 0,
            filterCount: 0,
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
    });
    const table = useReactTable({
        _features: [DensityFeature],
        data: data.results,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        columnResizeMode: "onChange",
        onRowSelectionChange: setRowSelection,
        state: {
            pagination,
            sorting,
            columnFilters,
            rowSelection,
            columnOrder,
            globalFilter,
            density: densityState,
            columnVisibility,
        },
        defaultColumn: {
            size: 150, //starting column size
            minSize: 10, //enforced during column resizing
            maxSize: 10000, //enforced during column resizing
        },
        enableRowSelection: enableRowSelection,
        enableMultiRowSelection: enableMultiRowSelection,
        enableSubRowSelection: enableSubRowSelection,
        onColumnOrderChange: (state) => {
            setColumnOrder(state);
        },
        onGlobalFilterChange: (state) => {
            setGlobalFilter(state);
        },
        rowCount: data.count,
        // for tanstack-table ts bug start
        filterFns: {
            fuzzy: () => {
                return false;
            },
        },
        // for tanstack-table ts bug end
        onDensityChange: setDensity,
        onColumnVisibilityChange: setColumnVisibility,
    });
    useEffect(() => {
        refreshData();
    }, [pagination, sorting, columnFilters, globalFilter]);
    useEffect(() => {
        setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
    }, []);
    useEffect(() => {
        onRowSelect(table.getState().rowSelection, data.results);
    }, [table.getState().rowSelection]);
    return (jsx(TableContext.Provider, { value: {
            table: { ...table },
            refreshData: refreshData,
            globalFilter,
            setGlobalFilter,
            loading: loading,
        }, children: children }));
};

const TableBody = ({ pinnedBgColor = { light: "gray.50", dark: "gray.700" }, }) => {
    const { table } = useContext(TableContext);
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredRow, setHoveredRow] = useState(-1);
    const handleRowHover = (index) => {
        setHoveredRow(index);
    };
    return (jsx(Tbody, { children: table.getRowModel().rows.map((row, index) => {
            return (jsxs(Tr, { display: "flex", _hover: { backgroundColor: "rgba(178,178,178,0.1)" }, zIndex: 1, onMouseEnter: () => handleRowHover(index), onMouseLeave: () => handleRowHover(-1), children: [jsx(TableRowSelector, { index: index, row: row, hoveredRow: hoveredRow }), row.getVisibleCells().map((cell) => {
                        return (jsx(Td, { padding: `${table.getDensityValue()}px`, 
                            // styling resize and pinning start
                            maxWidth: `${cell.column.getSize()}px`, width: `${cell.column.getSize()}px`, left: cell.column.getIsPinned()
                                ? `${cell.column.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
                                : undefined, backgroundColor: cell.column.getIsPinned() ? pinnedBgColor.light : undefined, position: cell.column.getIsPinned() ? "sticky" : "relative", zIndex: cell.column.getIsPinned() ? 1 : 0, _dark: {
                                backgroundColor: cell.column.getIsPinned()
                                    ? pinnedBgColor.dark
                                    : undefined,
                            }, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, crypto.randomUUID()));
                    })] }, crypto.randomUUID()));
        }) }));
};
const TableRowSelector = ({ index, row, hoveredRow, pinnedBgColor = { light: "gray.50", dark: "gray.700" }, }) => {
    const { table } = useContext(TableContext);
    const SELECTION_BOX_WIDTH = 20;
    const isCheckBoxVisible = (current_index, current_row) => {
        if (current_row.getIsSelected()) {
            return true;
        }
        if (hoveredRow == current_index) {
            return true;
        }
        return false;
    };
    return (jsxs(Td, { padding: `${table.getDensityValue()}px`, ...(table.getIsSomeColumnsPinned("left")
            ? {
                left: `0px`,
                backgroundColor: pinnedBgColor.light,
                position: "sticky",
                zIndex: 1,
                _dark: { backgroundColor: pinnedBgColor.dark },
            }
            : {}), 
        // styling resize and pinning end
        display: "grid", children: [!isCheckBoxVisible(index, row) && (jsx(Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` })), isCheckBoxVisible(index, row) && (jsx(FormLabel, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    // indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler() }) }))] }));
};

const TableControls = ({ totalText = "Total:", showFilter = false, fitTableWidth = false, fitTableHeight = false, isMobile = false, children = jsx(Fragment, {}), showFilterName = false, showFilterTags = false, filterOptions = [], }) => {
    return (jsxs(Grid, { templateRows: "auto auto auto 1fr auto", templateColumns: "1fr 1fr", width: fitTableWidth ? "fit-content" : "100%", height: fitTableHeight ? "fit-content" : "100%", justifySelf: "center", alignSelf: "center", gap: "0.5rem", children: [jsxs(Flex, { justifyContent: "space-between", gridColumn: "1 / span 2", children: [jsx(Box, { children: jsx(EditViewButton, { text: isMobile ? undefined : "View", icon: jsx(MdOutlineViewColumn, {}) }) }), jsx(Flex, { gap: "1rem", justifySelf: "end", children: showFilter && (jsxs(Fragment, { children: [jsx(GlobalFilter, {}), jsx(EditFilterButton, { text: isMobile ? undefined : "Advanced Filter" })] })) })] }), jsx(Flex, { gridColumn: "1 / span 2", flexFlow: "column", gap: "0.5rem", children: filterOptions.map((column) => {
                    return (jsxs(Flex, { alignItems: "center", flexFlow: "wrap", gap: "0.5rem", children: [showFilterName && jsxs(Text, { children: [column, ":"] }), jsx(FilterOptions, { column: column })] }));
                }) }), jsx(Flex, { gridColumn: "1 / span 2", children: showFilterTags && jsx(TableFilterTags, {}) }), jsx(Box, { overflow: "auto", gridColumn: "1 / span 2", width: "100%", height: "100%", children: children }), jsxs(Flex, { gap: "1rem", alignItems: "center", children: [jsx(PageSizeControl, {}), jsxs(Flex, { children: [jsx(Text, { paddingRight: "0.5rem", children: totalText }), jsx(RowCountText, {})] })] }), jsx(Box, { justifySelf: "end", children: jsx(TablePagination, {}) })] }));
};

const useDataTable = () => {
    const { table, refreshData, globalFilter, setGlobalFilter, loading } = useContext(TableContext);
    return { table, refreshData, globalFilter, setGlobalFilter, loading };
};

const TableFooter = ({ pinnedBgColor = { light: "gray.50", dark: "gray.700" }, }) => {
    const table = useDataTable().table;
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredCheckBox, setHoveredCheckBox] = useState(false);
    const handleRowHover = (isHovered) => {
        setHoveredCheckBox(isHovered);
    };
    const isCheckBoxVisible = () => {
        if (table.getIsAllRowsSelected()) {
            return true;
        }
        if (hoveredCheckBox) {
            return true;
        }
        return false;
    };
    return (jsx(Tfoot, { children: table.getFooterGroups().map((footerGroup) => (jsxs(Tr$1, { display: "flex", children: [jsxs(Th
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
                    onMouseEnter: () => handleRowHover(true), onMouseLeave: () => handleRowHover(false), display: "grid", children: [isCheckBoxVisible() && (jsx(FormLabel, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: table.getIsAllRowsSelected(),
                                // indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler() }) })), !isCheckBoxVisible() && (jsx(Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` }))] }), footerGroup.headers.map((header) => (jsx(Th, { padding: "0", colSpan: header.colSpan, 
                    // styling resize and pinning start
                    maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, left: header.column.getIsPinned()
                        ? `${header.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
                        : undefined, backgroundColor: header.column.getIsPinned() ? pinnedBgColor.light : undefined, position: header.column.getIsPinned() ? "sticky" : "relative", zIndex: header.column.getIsPinned() ? 1 : undefined, _dark: {
                        backgroundColor: header.column.getIsPinned()
                            ? pinnedBgColor.dark
                            : undefined,
                    }, 
                    // styling resize and pinning end
                    display: "grid", children: jsx(Menu, { children: jsx(MenuButton, { as: Box, padding: `${table.getDensityValue()}px`, display: "flex", alignItems: "center", justifyContent: "start", borderRadius: "0rem", _hover: { backgroundColor: "gray.100" }, children: jsxs(Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.footer, header.getContext()), jsx(Box, { children: header.column.getCanSort() && (jsxs(Fragment, { children: [header.column.getIsSorted() === false && (
                                                // <UpDownIcon />
                                                jsx(Fragment, {})), header.column.getIsSorted() === "asc" && (jsx(ChevronUpIcon, {})), header.column.getIsSorted() === "desc" && (jsx(ChevronDownIcon, {}))] })) })] }) }) }) }, crypto.randomUUID())))] }, crypto.randomUUID()))) }));
};

const TableHeader = ({ canResize, pinnedBgColor = { light: "gray.50", dark: "gray.700" }, }) => {
    const { table } = useDataTable();
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredCheckBox, setHoveredCheckBox] = useState(false);
    const handleRowHover = (isHovered) => {
        setHoveredCheckBox(isHovered);
    };
    const isCheckBoxVisible = () => {
        if (table.getIsAllRowsSelected()) {
            return true;
        }
        if (hoveredCheckBox) {
            return true;
        }
        return false;
    };
    return (jsx(Thead, { children: table.getHeaderGroups().map((headerGroup) => (jsxs(Tr$1, { display: "flex", children: [jsxs(Th
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
                    padding: `${table.getDensityValue()}px`, onMouseEnter: () => handleRowHover(true), onMouseLeave: () => handleRowHover(false), display: "grid", children: [isCheckBoxVisible() && (jsx(FormLabel, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: table.getIsAllRowsSelected(),
                                // indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler() }) })), !isCheckBoxVisible() && (jsx(Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` }))] }), headerGroup.headers.map((header) => {
                    const resizeProps = {
                        onClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        cursor: "col-resize",
                    };
                    return (jsxs(Th, { padding: "0rem", colSpan: header.colSpan, 
                        // styling resize and pinning start
                        maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, left: header.column.getIsPinned()
                            ? `${header.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
                            : undefined, backgroundColor: header.column.getIsPinned() ? pinnedBgColor.light : undefined, position: header.column.getIsPinned() ? "sticky" : "relative", zIndex: header.column.getIsPinned() ? 1 : undefined, _dark: {
                            backgroundColor: header.column.getIsPinned()
                                ? pinnedBgColor.dark
                                : undefined,
                        }, 
                        // styling resize and pinning end
                        display: "grid", children: [jsxs(Menu, { children: [jsx(MenuButton, { as: Box, padding: `${table.getDensityValue()}px`, display: "flex", alignItems: "center", justifyContent: "start", borderRadius: "0rem", _hover: { backgroundColor: "gray.100" }, children: jsxs(Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext()), jsx(Box, { children: header.column.getCanSort() && (jsxs(Fragment, { children: [header.column.getIsSorted() === false && jsx(Fragment, {}), header.column.getIsSorted() === "asc" && (jsx(ChevronUpIcon, {})), header.column.getIsSorted() === "desc" && (jsx(ChevronDownIcon, {}))] })) }), jsx(Box, { children: header.column.getIsFiltered() && jsx(MdFilterListAlt, {}) })] }) }), jsx(Portal, { children: jsxs(MenuList, { children: [!header.column.getIsPinned() && (jsx(MenuItem, { icon: jsx(MdPushPin, {}), onClick: () => {
                                                        header.column.pin("left");
                                                    }, children: "Pin Column" })), header.column.getIsPinned() && (jsx(MenuItem, { icon: jsx(MdCancel, {}), onClick: () => {
                                                        header.column.pin(false);
                                                    }, children: "Cancel Pin" })), header.column.getCanSort() && (jsxs(Fragment, { children: [jsx(MenuItem, { icon: jsx(GrAscend, {}), onClick: () => {
                                                                table.setSorting((state) => {
                                                                    return [
                                                                        ...state.filter((column) => {
                                                                            return column.id !== header.id;
                                                                        }),
                                                                        { id: header.id, desc: false },
                                                                    ];
                                                                });
                                                            }, children: "Sort Ascending" }), jsx(MenuItem, { icon: jsx(GrDescend, {}), onClick: () => {
                                                                table.setSorting((state) => {
                                                                    return [
                                                                        ...state.filter((column) => {
                                                                            return column.id !== header.id;
                                                                        }),
                                                                        { id: header.id, desc: true },
                                                                    ];
                                                                });
                                                            }, children: "Sort Descending" }), header.column.getIsSorted() && (jsx(MenuItem, { icon: jsx(MdClear, {}), onClick: () => {
                                                                header.column.clearSorting();
                                                            }, children: "Clear Sorting" }))] }))] }) })] }), canResize && (jsx(Box, { borderRight: "0.2rem solid", borderRightColor: header.column.getIsResizing() ? "gray.700" : "transparent", position: "absolute", right: "0", top: "0", height: "100%", width: "5px", userSelect: "none", style: { touchAction: "none" }, _hover: {
                                    borderRightColor: header.column.getIsResizing()
                                        ? "gray.700"
                                        : "gray.400",
                                }, ...resizeProps }))] }, crypto.randomUUID()));
                })] }, crypto.randomUUID()))) }));
};

const DefaultTable = ({ totalText = "Total:", showFilter = false, showFooter = false, fitTableWidth = false, fitTableHeight = false, isMobile = false, filterOptions = [], showFilterTags = false, showFilterName = false, }) => {
    return (jsx(TableControls, { totalText: totalText, showFilter: showFilter, fitTableWidth: fitTableWidth, fitTableHeight: fitTableHeight, isMobile: isMobile, filterOptions: filterOptions, showFilterName: showFilterName, showFilterTags: showFilterTags, children: jsxs(Table, { variant: "striped", children: [jsx(TableHeader, { canResize: true }), jsx(TableBody, {}), showFooter && jsx(TableFooter, {})] }) }));
};

const DensityToggleButton = ({ text, icon = jsx(AiOutlineColumnWidth, {}), }) => {
    const { table } = useDataTable();
    return (jsxs(Fragment, { children: [!!text === false && (jsx(IconButton, { variant: "ghost", "aria-label": "Toggle Density", icon: icon, onClick: () => {
                    table.toggleDensity();
                } })), !!text !== false && (jsx(Button, { leftIcon: icon, variant: "ghost", "aria-label": "Toggle Density", onClick: () => {
                    table.toggleDensity();
                }, children: text }))] }));
};

const EditFilterButton = ({ text, title = "Edit Filter", closeText = "Close", resetText = "Reset", icon = jsx(MdFilterAlt, {}), ...props }) => {
    const filterModal = useDisclosure();
    return (jsxs(Fragment, { children: [!!text === false && (jsx(IconButton, { icon: icon, variant: "ghost", onClick: filterModal.onOpen, "aria-label": "filter", ...props })), !!text !== false && (jsx(Button, { leftIcon: icon, variant: "ghost", onClick: filterModal.onOpen, ...props, children: text })), jsxs(Modal, { isOpen: filterModal.isOpen, onClose: filterModal.onClose, size: ["full", "full", "md", "md"], children: [jsx(ModalOverlay, {}), jsxs(ModalContent, { children: [jsx(ModalHeader, { children: title }), jsx(ModalCloseButton, {}), jsx(ModalBody, { children: jsxs(Flex, { flexFlow: "column", gap: "1rem", children: [jsx(TableFilter, {}), jsx(ResetFilteringButton, { text: resetText })] }) }), jsx(ModalFooter, { children: jsx(Button, { onClick: filterModal.onClose, children: closeText }) })] })] })] }));
};

const EditOrderButton = ({ text, icon = jsx(MdOutlineMoveDown, {}), title = "Change Order", }) => {
    const orderModal = useDisclosure();
    return (jsxs(Fragment, { children: [!!text === false && (jsx(IconButton, { icon: icon, variant: "ghost", onClick: orderModal.onOpen, "aria-label": "change order" })), !!text !== false && (jsx(Button, { leftIcon: icon, variant: "ghost", onClick: orderModal.onOpen, children: text })), jsxs(Modal, { isOpen: orderModal.isOpen, onClose: orderModal.onClose, size: ["full", "full", "md", "md"], children: [jsx(ModalOverlay, {}), jsxs(ModalContent, { padding: "0 0 1rem 0", children: [jsx(ModalHeader, { children: title }), jsx(ModalCloseButton, {}), jsx(ModalBody, { children: jsx(Flex, { flexFlow: "column", gap: "0.25rem", children: jsx(TableOrderer, {}) }) })] })] })] }));
};

const TableSorter = () => {
    const { table } = useDataTable();
    return (jsx(Fragment, { children: table.getHeaderGroups().map((headerGroup) => (jsx(Fragment, { children: headerGroup.headers.map((header) => {
                const displayName = header.column.columnDef.meta === undefined
                    ? header.column.id
                    : header.column.columnDef.meta.displayName;
                return (jsx(Fragment, { children: header.column.getCanSort() && (jsxs(Flex, { alignItems: "center", gap: "0.5rem", padding: "0.5rem", children: [jsx(Text, { children: displayName }), jsxs(Button, { variant: "ghost", onClick: (e) => {
                                    header.column.toggleSorting();
                                }, children: [header.column.getIsSorted() === false && (
                                    // <Text>To No sort</Text>
                                    jsx(UpDownIcon, {})), header.column.getIsSorted() === "asc" && (
                                    // <Text>To asc</Text>
                                    jsx(ChevronDownIcon, {})), header.column.getIsSorted() === "desc" && (
                                    // <Text>To desc</Text>
                                    jsx(ChevronUpIcon, {}))] }), header.column.getIsSorted() && (jsx(Button, { onClick: (e) => {
                                    header.column.clearSorting();
                                }, children: jsx(CloseIcon, {}) }))] })) }));
            }) }))) }));
};

const EditSortingButton = ({ text, icon = jsx(MdOutlineSort, {}), title = "Edit Sorting", }) => {
    const sortingModal = useDisclosure();
    return (jsxs(Fragment, { children: [!!text === false && (jsx(IconButton, { icon: icon, variant: "ghost", onClick: sortingModal.onOpen, "aria-label": "change sorting" })), !!text !== false && (jsx(Button, { leftIcon: icon, variant: "ghost", onClick: sortingModal.onOpen, children: text })), jsxs(Modal, { isOpen: sortingModal.isOpen, onClose: sortingModal.onClose, size: ["full", "full", "md", "md"], children: [jsx(ModalOverlay, {}), jsxs(ModalContent, { padding: "0 0 1rem 0", children: [jsx(ModalHeader, { children: title }), jsx(ModalCloseButton, {}), jsx(ModalBody, { children: jsxs(Flex, { flexFlow: "column", gap: "0.25rem", children: [jsx(TableSorter, {}), jsx(ResetSortingButton, {})] }) })] })] })] }));
};

const EditViewButton = ({ text, icon = jsx(IoMdEye, {}), title = "Edit View", }) => {
    const viewModel = useDisclosure();
    return (jsxs(Fragment, { children: [!!text === false && (jsx(IconButton, { icon: icon, variant: "ghost", onClick: viewModel.onOpen, "aria-label": "change sorting" })), !!text !== false && (jsx(Button, { leftIcon: icon, variant: "ghost", onClick: viewModel.onOpen, children: text })), jsxs(Modal, { isOpen: viewModel.isOpen, onClose: viewModel.onClose, size: ["full", "full", "md", "md"], children: [jsx(ModalOverlay, {}), jsxs(ModalContent, { padding: "0 0 1rem 0", children: [jsx(ModalHeader, { children: title }), jsx(ModalCloseButton, {}), jsx(ModalBody, { children: jsx(TableViewer, {}) })] })] })] }));
};

const FilterOptions = ({ column }) => {
    const { table } = useDataTable();
    const tableColumn = table.getColumn(column);
    const options = tableColumn?.columnDef.meta?.filterOptions ?? [];
    return (jsx(Fragment, { children: options.map((option) => {
            const selected = table.getColumn(column)?.getFilterValue() === option;
            return (jsxs(Button, { size: "sm", onClick: () => {
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

const GlobalFilter = ({ icon = MdSearch }) => {
    const { globalFilter, setGlobalFilter } = useDataTable();
    return (jsx(Fragment, { children: jsx(Box, { children: jsxs(InputGroup, { children: [jsx(InputLeftElement, { pointerEvents: "none", children: jsx(Icon, { as: icon, color: "gray.300" }) }), jsx(Input, { value: globalFilter, onChange: (e) => {
                            setGlobalFilter(e.target.value);
                        } })] }) }) }));
};

const PageSizeControl = ({ pageSizes = [10, 20, 30, 40, 50], }) => {
    const { table } = useDataTable();
    return (jsx(Fragment, { children: jsxs(Menu, { children: [jsx(MenuButton, { as: Button, variant: "ghost", rightIcon: jsx(ChevronDownIcon, {}), gap: "0.5rem", children: table.getState().pagination.pageSize }), jsx(MenuList, { children: pageSizes.map((pageSize) => (jsx(MenuItem, { onClick: () => {
                            table.setPageSize(Number(pageSize));
                        }, children: pageSize }, crypto.randomUUID()))) })] }) }));
};

const ResetFilteringButton = ({ text = "Reset Filtering", }) => {
    const { table } = useDataTable();
    return (jsx(Button, { onClick: () => {
            table.resetColumnFilters();
        }, children: text }));
};

const ResetSelectionButton = ({ text = "Reset Selection", }) => {
    const { table } = useDataTable();
    return (jsx(Button, { onClick: () => {
            table.resetRowSelection();
        }, children: text }));
};

const ResetSortingButton = ({ text = "Reset Sorting", }) => {
    const { table } = useDataTable();
    return (jsx(Button, { onClick: () => {
            table.resetSorting();
        }, children: text }));
};

const RowCountText = () => {
    const { table } = useDataTable();
    return jsx(Text, { children: table.getRowCount() });
};

const Table = ({ children, showLoading = false, loadingComponent = jsx(Fragment, { children: "Loading..." }), ...props }) => {
    const { table, loading } = useDataTable();
    if (showLoading) {
        return (jsxs(Fragment, { children: [loading && loadingComponent, !loading && (jsx(Table$1, { width: table.getCenterTotalSize(), overflow: "auto", ...props, children: children }))] }));
    }
    return (jsx(Fragment, { children: jsx(Table$1, { width: table.getCenterTotalSize(), overflowX: "auto", ...props, children: children }) }));
};

const TableCardContainer = ({ children, ...props }) => {
    return (jsx(Grid, { gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr 1fr"], gap: "0.5rem", ...props, children: children }));
};

const TableCards = ({ isSelectable = false }) => {
    const { table } = useContext(TableContext);
    return (jsx(Fragment, { children: table.getRowModel().rows.map((row) => {
            return (jsx(Card, { children: jsxs(CardBody, { display: "flex", flexFlow: "column", gap: "0.5rem", children: [isSelectable && (jsx(Checkbox, { isChecked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            // indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler() })), row.getVisibleCells().map((cell) => {
                            return (jsx(Box, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, crypto.randomUUID()));
                        })] }) }, crypto.randomUUID()));
        }) }));
};

const TableComponent = ({ render = () => {
    throw Error("Not Implemented");
}, }) => {
    const { table } = useDataTable();
    return render(table);
};

const DateRangeFilter = ({ startDate, endDate, setStartDate, setEndDate, }) => {
    console.log(startDate, endDate, "dflp");
    return (jsx(Box, { p: '1rem', children: jsxs(VStack, { spacing: 4, children: [jsxs(FormControl, { children: [jsx(FormLabel, { htmlFor: "start-date", children: "Start Date" }), jsx(Input, { id: "start-date", type: "date", value: startDate, onChange: (e) => setStartDate(e.target.value) })] }), jsxs(FormControl, { children: [jsx(FormLabel, { htmlFor: "end-date", children: "End Date" }), jsx(Input, { id: "end-date", type: "date", value: endDate, onChange: (e) => setEndDate(e.target.value) })] })] }) }));
};

const RangeFilter = ({ range, setRange, defaultValue, min, max, step, }) => {
    return (jsx(Box, { p: 8, children: jsxs(VStack, { spacing: 4, children: [jsxs(Text, { children: ["Selected Range: ", range[0], " - ", range[1]] }), jsxs(RangeSlider, { "aria-label": ["min", "max"], defaultValue: defaultValue, min: min, max: max, step: step, onChangeEnd: (val) => setRange(val), children: [jsx(RangeSliderTrack, { children: jsx(RangeSliderFilledTrack, {}) }), jsx(RangeSliderThumb, { index: 0 }), jsx(RangeSliderThumb, { index: 1 })] })] }) }));
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
    return (jsx(Flex, { flexFlow: "wrap", p: "0.5rem", gap: "0.5rem", children: availableTags.map((tag) => (jsx(WrapItem, { children: jsxs(Tag, { size: "lg", variant: selectedTags.includes(tag) ? "solid" : "outline", cursor: "pointer", onClick: () => toggleTag(tag), children: [jsx(TagLabel, { children: tag }), selectedTags.includes(tag) && jsx(TagCloseButton, {})] }) }, tag))) }));
};

function Filter({ column }) {
    const { filterVariant } = column.columnDef.meta ?? {};
    const displayName = column.columnDef.meta?.displayName ?? column.id;
    const filterOptions = column.columnDef.meta?.filterOptions ?? [];
    if (column.columns.length > 0) {
        return (jsxs(Flex, { flexFlow: "column", gap: "0.25rem", children: [jsx(Text, { children: displayName }), column.columns.map((column) => {
                    return jsx(Filter, { column: column }, column.id);
                })] }, column.id));
    }
    if (!column.getCanFilter()) {
        return jsx(Fragment, {});
    }
    if (filterVariant === "select") {
        return (jsxs(Flex, { flexFlow: "column", gap: "0.25rem", children: [jsx(Text, { children: displayName }), jsx(Select, { value: column.getFilterValue() ? String(column.getFilterValue()) : "", placeholder: "Select option", onChange: (e) => {
                        column.setFilterValue(e.target.value);
                    }, children: filterOptions.map((option) => {
                        return (jsx("option", { value: option, children: option }, `${option}`));
                    }) })] }, column.id));
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
}
const TableFilter = () => {
    const { table } = useDataTable();
    return (jsx(Fragment, { children: table.getAllColumns().map((column) => {
            return jsx(Filter, { column: column }, column.id);
        }) }));
};

const TableFilterTags = () => {
    const { table } = useDataTable();
    return (jsx(Flex, { gap: "0.5rem", flexFlow: "wrap", children: table.getState().columnFilters.map(({ id, value }, index) => {
            return (jsxs(Tag, { display: "flex", gap: "0.5rem", alignItems: "center", children: [jsx(Text, { children: `${id}: ${value}` }), jsx(IconButton, { size: "xs", variant: "ghost", icon: jsx(CloseIcon, {}), onClick: () => {
                            table.setColumnFilters(table.getState().columnFilters.filter((value, curIndex) => {
                                return curIndex != index;
                            }));
                        }, "aria-label": "remove filter" })] }, `${id}-${value}`));
        }) }));
};

const TableLoadingComponent = ({ render, }) => {
    const { loading } = useDataTable();
    return jsx(Fragment, { children: render(loading) });
};

const ColumnOrderChanger = ({ columns }) => {
    const [order, setOrder] = useState([]);
    const [originalOrder, setOriginalOrder] = useState([]);
    const { table } = useDataTable();
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
                            }, disabled: index === order.length - 1, "aria-label": "", children: jsx(MdArrowDownward, {}) })] }, columnId))) }), jsxs(Flex, { gap: "0.25rem", children: [jsx(Button, { onClick: () => {
                            table.setColumnOrder(order);
                        }, children: "Apply" }), jsx(Button, { onClick: () => {
                            table.setColumnOrder(originalOrder);
                        }, children: "Reset" })] })] }));
};
const TableOrderer = () => {
    const { table } = useDataTable();
    return (jsx(Fragment, { children: jsx(ColumnOrderChanger, { columns: table.getState().columnOrder }) }));
};

const TablePagination = ({}) => {
    const { firstPage, getCanPreviousPage, previousPage, getState, nextPage, getCanNextPage, lastPage, } = useDataTable().table;
    return (jsxs(ButtonGroup, { isAttached: true, children: [jsx(IconButton, { icon: jsx(MdFirstPage, {}), onClick: () => firstPage(), isDisabled: !getCanPreviousPage(), "aria-label": "first-page", variant: "ghost" }), jsx(IconButton, { icon: jsx(MdArrowBack, {}), onClick: () => previousPage(), isDisabled: !getCanPreviousPage(), "aria-label": "previous-page", variant: "ghost" }), jsx(Button, { variant: "ghost", onClick: () => { }, disabled: !getCanPreviousPage(), children: getState().pagination.pageIndex + 1 }), jsx(IconButton, { onClick: () => nextPage(), isDisabled: !getCanNextPage(), "aria-label": "next-page", variant: "ghost", children: jsx(MdArrowForward, {}) }), jsx(IconButton, { onClick: () => lastPage(), isDisabled: !getCanNextPage(), "aria-label": "last-page", variant: "ghost", children: jsx(MdLastPage, {}) })] }));
};

const ReloadButton = ({ text = "Reload" }) => {
    const { refreshData } = useDataTable();
    return (jsx(Button, { leftIcon: jsx(IoReload, {}), onClick: () => {
            refreshData();
        }, children: text }));
};

const SelectAllRowsToggle = ({ selectAllIcon = jsx(MdOutlineChecklist, {}), clearAllIcon = jsx(MdClear, {}), selectAllText, clearAllText, }) => {
    const { table } = useDataTable();
    return (jsxs(Fragment, { children: [!!selectAllText === false && (jsx(IconButton, { icon: table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon, variant: "ghost", "aria-label": table.getIsAllRowsSelected() ? clearAllText : selectAllText, onClick: (event) => {
                    table.getToggleAllRowsSelectedHandler()(event);
                } })), !!selectAllText !== false && (jsx(Button, { leftIcon: table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon, variant: "ghost", onClick: (event) => {
                    table.getToggleAllRowsSelectedHandler()(event);
                }, children: table.getIsAllRowsSelected() ? clearAllText : selectAllText }))] }));
};

const TableSelector = () => {
    const { table } = useContext(TableContext);
    return (jsxs(Fragment, { children: [table.getSelectedRowModel().rows.length > 0 && (jsxs(Button, { onClick: () => { }, variant: "ghost", display: "flex", gap: "0.25rem", children: [jsx(Box, { fontSize: "sm", children: `${table.getSelectedRowModel().rows.length}` }), jsx(Icon, { as: IoMdCheckbox })] })), !table.getIsAllPageRowsSelected() && jsx(SelectAllRowsToggle, {}), table.getSelectedRowModel().rows.length > 0 && (jsx(IconButton, { variant: "ghost", icon: jsx(Icon, { as: MdClear }), onClick: () => {
                    table.resetRowSelection();
                }, "aria-label": "reset selection" }))] }));
};

const TableViewer = () => {
    const { table } = useDataTable();
    const columns = table.getAllLeafColumns();
    const [columnOrder, setColumnOrder] = useState(columns.map((column, index) => {
        return column.id;
    }));
    const handleDragEnd = (result) => {
        if (!result.destination)
            return;
        const newColumnOrder = Array.from(columnOrder);
        const [removed] = newColumnOrder.splice(result.source.index, 1);
        newColumnOrder.splice(result.destination.index, 0, removed);
        setColumnOrder(newColumnOrder);
        table.setColumnOrder(newColumnOrder);
    };
    return (jsx(Fragment, { children: jsx(DragDropContext, { onDragEnd: handleDragEnd, children: jsx(Droppable, { droppableId: "columns", children: (provided) => (jsxs(Flex, { flexFlow: "column", gap: "0.5rem", ref: provided.innerRef, ...provided.droppableProps, children: [columns.map((column, i) => {
                            const displayName = column.columnDef.meta === undefined
                                ? column.id
                                : column.columnDef.meta.displayName;
                            return (jsx(Draggable, { draggableId: column.id, index: i, children: (provided) => (jsxs(Grid, { ref: provided.innerRef, ...provided.draggableProps, templateColumns: "auto 1fr", gap: "0.5rem", alignItems: "center", children: [jsx(Flex, { ...provided.dragHandleProps, alignItems: "center", padding: "auto 0 auto 0", children: jsx(Icon, { as: FaGripLinesVertical, color: "gray.400" }) }), jsxs(Flex, { justifyContent: "space-between", alignItems: "center", children: [jsxs(Box, { children: [" ", displayName] }), jsx(Switch, { isChecked: column.getIsVisible(), onChange: column.getToggleVisibilityHandler() })] })] }, column.id)) }, column.id));
                        }), provided.placeholder] })) }) }) }));
};

const TextCell = ({ label, noOfLines = [1], padding = "0rem", children, tooltipProps, ...props }) => {
    if (label) {
        return (jsx(Flex, { alignItems: "center", height: "100%", padding: padding, children: jsx(Tooltip, { label: jsx(Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", noOfLines: [5], children: label }), placement: "auto", ...tooltipProps, children: jsx(Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-all", noOfLines: noOfLines, ...props, children: children }) }) }));
    }
    return (jsx(Flex, { alignItems: "center", height: "100%", padding: padding, children: jsx(Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-all", noOfLines: noOfLines, ...props, children: children }) }));
};

export { DataTable, DataTableServer, DefaultTable, DensityToggleButton, EditFilterButton, EditOrderButton, EditSortingButton, EditViewButton, FilterOptions, GlobalFilter, PageSizeControl, ReloadButton, ResetFilteringButton, ResetSelectionButton, ResetSortingButton, RowCountText, Table, TableBody, TableCardContainer, TableCards, TableComponent, TableControls, TableFilter, TableFilterTags, TableFooter, TableHeader, TableLoadingComponent, TableOrderer, TablePagination, TableSelector, TableSorter, TableViewer, TextCell, useDataFromUrl, useDataTable };
