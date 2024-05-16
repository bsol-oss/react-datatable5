import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { createContext, useState, useEffect, useContext } from 'react';
import { rankItem } from '@tanstack/match-sorter-utils';
import axios from 'axios';
import { Button, Box, Text, Input, Popover, Tooltip, PopoverTrigger, IconButton, PopoverContent, PopoverArrow, PopoverBody, Flex, Switch, Menu, MenuButton, MenuList, MenuItem, Container, Table as Table$1, Checkbox, Grid, Card, CardBody, Tfoot, Tr as Tr$1, Th, Thead, Portal, ButtonGroup, Icon } from '@chakra-ui/react';
import { MdFilterAlt, MdArrowUpward, MdArrowDownward, MdOutlineMoveDown, MdOutlineSort, MdPushPin, MdCancel, MdSort, MdFilterListAlt, MdFirstPage, MdArrowBack, MdArrowForward, MdLastPage, MdClear, MdOutlineChecklist } from 'react-icons/md';
import { UpDownIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import { IoMdEye, IoMdClose, IoMdCheckbox } from 'react-icons/io';
import { Tbody, Tr, Td } from '@chakra-ui/table';

const TableContext = createContext({
    table: {},
    refreshData: () => { },
    globalFilter: "",
    setGlobalFilter: () => { },
});

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
const DataTable = ({ columns, data, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, children, }) => {
    const [columnOrder, setColumnOrder] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const table = useReactTable({
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
        },
        onColumnOrderChange: (state) => {
            setColumnOrder(state);
        },
        enableRowSelection: enableRowSelection,
        enableMultiRowSelection: enableMultiRowSelection,
        enableSubRowSelection: enableSubRowSelection,
        columnResizeMode: "onChange",
        filterFns: {
            fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: 'fuzzy', //apply fuzzy filter to the global filter (most common use case for fuzzy filter)
    });
    useEffect(() => {
        setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
    }, []);
    return (jsx(TableContext.Provider, { value: {
            table: { ...table },
            refreshData: () => {
                throw new Error("not implemented");
            },
            globalFilter: globalFilter,
            setGlobalFilter: setGlobalFilter,
        }, children: children }));
};

const useDataFromUrl = ({ url, params = {}, defaultData, }) => {
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
            console.log("get DataFromUrl success", data);
            setLoading(false);
            setData(data);
        }
        catch (e) {
            console.log(e);
            setLoading(false);
            setHasError(true);
        }
    };
    useEffect(() => {
        getData().catch((e) => {
            console.error(e);
        });
    }, []);
    return { data, loading, hasError, refreshData };
};

const DataTableServer = ({ columns, url, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, children, }) => {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]); // can set initial column filter state here
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
    const [rowSelection, setRowSelection] = useState({});
    const [columnOrder, setColumnOrder] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
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
    });
    const table = useReactTable({
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
        rowCount: data.filterCount,
        // for tanstack-table ts bug start
        filterFns: {
            fuzzy: () => {
                return false;
            },
        },
        // for tanstack-table ts bug end
    });
    useEffect(() => {
        refreshData();
    }, [pagination, sorting, columnFilters, globalFilter]);
    useEffect(() => {
        setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
    }, []);
    return (jsx(TableContext.Provider, { value: {
            table: { ...table },
            refreshData: refreshData,
            globalFilter,
            setGlobalFilter,
        }, children: children }));
};

const ResetFilteringButton = () => {
    const { table } = useContext(TableContext);
    return (jsx(Button, { onClick: () => {
            table.resetColumnFilters();
        }, children: "Reset Filtering" }));
};

const useDataTable = () => {
    const { table, refreshData, globalFilter, setGlobalFilter } = useContext(TableContext);
    return { table, refreshData, globalFilter, setGlobalFilter };
};

const TableFilter = () => {
    const { table } = useDataTable();
    return (jsx(Fragment, { children: table.getLeafHeaders().map((header) => {
            const displayName = header.column.columnDef.meta === undefined
                ? header.column.id
                : header.column.columnDef.meta.displayName;
            return (jsx(Fragment, { children: header.column.getCanFilter() && (jsxs(Box, { children: [jsx(Text, { children: displayName }), jsx(Input, { value: header.column.getFilterValue()
                                ? String(header.column.getFilterValue())
                                : "", onChange: (e) => {
                                header.column.setFilterValue(e.target.value);
                            } })] })) }));
        }) }));
};

const EditFilterButton = () => {
    return (jsxs(Popover, { placement: "auto", children: [jsx(Tooltip, { label: "Filter", children: jsx(PopoverTrigger, { children: jsx(IconButton, { "aria-label": "filter", variant: "ghost", icon: jsx(MdFilterAlt, {}) }) }) }), jsxs(PopoverContent, { width: "auto", children: [jsx(PopoverArrow, {}), jsx(PopoverBody, { children: jsxs(Flex, { flexFlow: "column", gap: "1rem", children: [jsx(TableFilter, {}), jsx(ResetFilteringButton, {})] }) })] })] }));
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
                            return jsx(Fragment, { children: displayName });
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

const EditOrderButton = () => {
    return (jsxs(Popover, { placement: "auto", children: [jsx(Tooltip, { label: "Change Order", children: jsx(PopoverTrigger, { children: jsx(IconButton, { "aria-label": "filter", variant: "ghost", icon: jsx(MdOutlineMoveDown, {}) }) }) }), jsxs(PopoverContent, { width: "auto", children: [jsx(PopoverArrow, {}), jsx(PopoverBody, { children: jsx(Flex, { flexFlow: "column", gap: "0.25rem", children: jsx(TableOrderer, {}) }) })] })] }));
};

const ResetSortingButton = () => {
    const { table } = useContext(TableContext);
    return (jsx(Button, { onClick: () => {
            table.resetSorting();
        }, children: "Reset Sorting" }));
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

const EditSortingButton = () => {
    return (jsxs(Popover, { placement: "auto", children: [jsx(Tooltip, { label: "Filter", children: jsx(PopoverTrigger, { children: jsx(IconButton, { "aria-label": "filter", variant: "ghost", icon: jsx(MdOutlineSort, {}) }) }) }), jsxs(PopoverContent, { width: "auto", children: [jsx(PopoverArrow, {}), jsx(PopoverBody, { children: jsxs(Flex, { flexFlow: "column", gap: "0.25rem", children: [jsx(TableSorter, {}), jsx(ResetSortingButton, {})] }) })] })] }));
};

const TableViewer = () => {
    const { table } = useDataTable();
    return (jsx(Flex, { flexFlow: "column", gap: "1rem", children: table.getAllLeafColumns().map((column) => {
            console.log(column.columnDef.meta, "gokspo");
            const displayName = column.columnDef.meta === undefined
                ? column.id
                : column.columnDef.meta.displayName;
            return (jsxs(Flex, { flexFlow: "row", gap: "0.5rem", alignItems: "center", children: [jsx(Switch, { isChecked: column.getIsVisible(), onChange: column.getToggleVisibilityHandler() }), displayName] }));
        }) }));
};

const EditViewButton = () => {
    return (jsxs(Popover, { placement: "auto", children: [jsx(PopoverTrigger, { children: jsx(IconButton, { "aria-label": "view", variant: "ghost", icon: jsx(IoMdEye, {}) }) }), jsxs(PopoverContent, { width: "auto", children: [jsx(PopoverArrow, {}), jsx(PopoverBody, { children: jsx(TableViewer, {}) })] })] }));
};

const GlobalFilter = () => {
    const { globalFilter, setGlobalFilter } = useDataTable();
    return (jsx(Input, { value: globalFilter, onChange: (e) => {
            setGlobalFilter(e.target.value);
        } }));
};

const PageSizeControl = ({ pageSizes = [10, 20, 30, 40, 50], }) => {
    const { table } = useContext(TableContext);
    return (jsx(Fragment, { children: jsxs(Menu, { children: [jsx(MenuButton, { as: Button, variant: "ghost", rightIcon: jsx(ChevronDownIcon, {}), gap: "0.5rem", children: table.getState().pagination.pageSize }), jsx(MenuList, { children: pageSizes.map((pageSize) => (jsx(MenuItem, { onClick: () => {
                            table.setPageSize(Number(pageSize));
                        }, children: pageSize }))) })] }) }));
};

const ResetSelectionButton = () => {
    const { table } = useContext(TableContext);
    return (jsx(Button, { onClick: () => {
            table.resetRowSelection();
        }, children: "Reset Selection" }));
};

const Table = ({ children }) => {
    const { table } = useDataTable();
    return (jsx(Container, { padding: '0rem', maxW: "100%", overflowX: "scroll", children: jsx(Table$1, { width: table.getCenterTotalSize(), variant: "unstyled", children: children }) }));
};

const TableBody = () => {
    const { table } = useContext(TableContext);
    return (jsx(Tbody, { children: table.getRowModel().rows.map((row) => {
            return (jsxs(Tr, { display: "flex", _hover: { backgroundColor: "rgba(178,178,178,0.1)" }, zIndex: 1, children: [jsx(Td
                    // styling resize and pinning start
                    , { 
                        // styling resize and pinning start
                        padding: "0.5rem", ...(table.getIsSomeColumnsPinned("left")
                            ? {
                                left: `0px`,
                                backgroundColor: "gray.50",
                                position: "sticky",
                                zIndex: 1,
                                _dark: { backgroundColor: "gray.700" },
                            }
                            : {}), children: jsx(Checkbox, { isChecked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            // indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler() }) }), row.getVisibleCells().map((cell) => {
                        return (jsx(Td, { padding: "0rem", 
                            // styling resize and pinning start
                            maxWidth: `${cell.column.getSize()}px`, width: `${cell.column.getSize()}px`, left: cell.column.getIsPinned()
                                ? `${cell.column.getStart("left") + 32}px`
                                : undefined, backgroundColor: cell.column.getIsPinned() ? "gray.50" : undefined, position: cell.column.getIsPinned() ? "sticky" : "relative", zIndex: cell.column.getIsPinned() ? 1 : 0, _dark: {
                                backgroundColor: cell.column.getIsPinned()
                                    ? "gray.700"
                                    : undefined,
                            }, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, crypto.randomUUID()));
                    })] }, crypto.randomUUID()));
        }) }));
};

const TableCardContainer = ({ children, ...props }) => {
    return (jsx(Grid, { gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr 1fr"], gap: "0.5rem", ...props, children: children }));
};

const TableCards = ({}) => {
    const { table } = useContext(TableContext);
    return (jsx(Fragment, { children: table.getRowModel().rows.map((row) => {
            return (jsx(Card, { children: jsxs(CardBody, { display: "flex", flexFlow: "column", gap: "0.5rem", children: [jsx(Checkbox, { isChecked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            // indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler() }), row.getVisibleCells().map((cell) => {
                            return (jsx(Box, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }));
                        })] }) }, crypto.randomUUID()));
        }) }));
};

const TableFooter = () => {
    const table = useDataTable().table;
    const SELECTION_BOX_WIDTH = 32;
    return (jsx(Tfoot, { children: table.getFooterGroups().map((footerGroup) => (jsxs(Tr$1, { display: "flex", children: [jsx(Th
                // styling resize and pinning start
                , { 
                    // styling resize and pinning start
                    padding: "0.5rem", ...(table.getIsSomeColumnsPinned("left")
                        ? {
                            left: `0px`,
                            backgroundColor: "gray.50",
                            position: "sticky",
                            zIndex: 1,
                            _dark: { backgroundColor: "gray.700" },
                        }
                        : {}), children: jsx(Checkbox, { isChecked: table.getIsAllRowsSelected(),
                        // indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler() }) }), footerGroup.headers.map((header) => (jsx(Th, { padding: "0rem", colSpan: header.colSpan, 
                    // styling resize and pinning start
                    maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, left: header.column.getIsPinned()
                        ? `${header.getStart("left") + SELECTION_BOX_WIDTH}px`
                        : undefined, backgroundColor: header.column.getIsPinned() ? "gray.50" : undefined, position: header.column.getIsPinned() ? "sticky" : "relative", zIndex: header.column.getIsPinned() ? 1 : undefined, _dark: {
                        backgroundColor: header.column.getIsPinned()
                            ? "gray.700"
                            : undefined,
                    }, 
                    // styling resize and pinning end
                    display: "flex", alignItems: "center", children: header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.footer, header.getContext()) }, crypto.randomUUID())))] }, crypto.randomUUID()))) }));
};

const TableHeader = ({ canResize }) => {
    const { table } = useDataTable();
    const SELECTION_BOX_WIDTH = 32;
    return (jsx(Thead, { children: table.getHeaderGroups().map((headerGroup) => (jsxs(Tr$1, { display: "flex", children: [jsx(Th
                // styling resize and pinning start
                , { 
                    // styling resize and pinning start
                    padding: "0.5rem", ...(table.getIsSomeColumnsPinned("left")
                        ? {
                            left: `0px`,
                            backgroundColor: "gray.50",
                            position: "sticky",
                            zIndex: 1,
                            _dark: { backgroundColor: "gray.700" },
                        }
                        : {}), children: jsx(Checkbox, { isChecked: table.getIsAllRowsSelected(),
                        // indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler() }) }), headerGroup.headers.map((header) => {
                    const resizeProps = {
                        onClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        cursor: "col-resize",
                    };
                    return (jsxs(Th, { padding: "0rem", colSpan: header.colSpan, 
                        // styling resize and pinning start
                        maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, left: header.column.getIsPinned()
                            ? `${header.getStart("left") + SELECTION_BOX_WIDTH}px`
                            : undefined, backgroundColor: header.column.getIsPinned() ? "gray.50" : undefined, position: header.column.getIsPinned() ? "sticky" : "relative", zIndex: header.column.getIsPinned() ? 1 : undefined, _dark: {
                            backgroundColor: header.column.getIsPinned()
                                ? "gray.700"
                                : undefined,
                        }, 
                        // styling resize and pinning end
                        display: "grid", children: [jsx(Fragment, { children: jsxs(Menu, { children: [jsx(MenuButton, { as: Box, display: "flex", alignItems: "center", justifyContent: "start", _hover: { backgroundColor: "gray.100" }, _dark: { _hover: { backgroundColor: "gray.700" } }, children: jsxs(Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
                                                        ? null
                                                        : flexRender(header.column.columnDef.header, header.getContext()), jsx(Box, { children: header.column.getCanSort() && (jsxs(Fragment, { children: [header.column.getIsSorted() === false && (jsx(UpDownIcon, {})), header.column.getIsSorted() === "asc" && (jsx(ChevronUpIcon, {})), header.column.getIsSorted() === "desc" && (jsx(ChevronDownIcon, {}))] })) })] }) }), jsx(Portal, { children: jsxs(MenuList, { children: [!header.column.getIsPinned() && (jsx(MenuItem, { icon: jsx(MdPushPin, {}), onClick: () => {
                                                            header.column.pin("left");
                                                        }, children: "Pin Column" })), header.column.getIsPinned() && (jsx(MenuItem, { icon: jsx(MdCancel, {}), onClick: () => {
                                                            header.column.pin(false);
                                                        }, children: "Cancel Pin" })), header.column.getCanSort() && (jsxs(Fragment, { children: [jsx(MenuItem, { icon: jsx(MdSort, {}), onClick: () => {
                                                                    header.column.toggleSorting();
                                                                }, children: "Toggle Sorting" }), header.column.getIsSorted() && (jsx(MenuItem, { icon: jsx(IoMdClose, {}), onClick: () => {
                                                                    header.column.clearSorting();
                                                                }, children: "Clear Sorting" }))] }))] }) })] }) }), header.column.getIsFiltered() && jsx(MdFilterListAlt, {}), canResize && (jsx(Box, { borderRight: "0.2rem solid", borderRightColor: header.column.getIsResizing() ? "gray.700" : "transparent", position: "absolute", right: "0", top: "0", height: "100%", width: "5px", userSelect: "none", style: { touchAction: "none" }, _hover: {
                                    borderRightColor: header.column.getIsResizing()
                                        ? "gray.700"
                                        : "gray.400",
                                }, ...resizeProps }))] }, crypto.randomUUID()));
                })] }, crypto.randomUUID()))) }));
};

const TablePagination = ({}) => {
    const { firstPage, getCanPreviousPage, previousPage, getState, nextPage, getCanNextPage, lastPage, } = useDataTable().table;
    return (jsxs(ButtonGroup, { isAttached: true, children: [jsx(IconButton, { icon: jsx(MdFirstPage, {}), onClick: () => firstPage(), isDisabled: !getCanPreviousPage(), "aria-label": "first-page", variant: "ghost" }), jsx(IconButton, { icon: jsx(MdArrowBack, {}), onClick: () => previousPage(), isDisabled: !getCanPreviousPage(), "aria-label": "previous-page", variant: "ghost" }), jsx(Button, { variant: "ghost", onClick: () => { }, disabled: !getCanPreviousPage(), children: getState().pagination.pageIndex + 1 }), jsx(IconButton, { onClick: () => nextPage(), isDisabled: !getCanNextPage(), "aria-label": "next-page", variant: "ghost", children: jsx(MdArrowForward, {}) }), jsx(IconButton, { onClick: () => lastPage(), isDisabled: !getCanNextPage(), "aria-label": "last-page", variant: "ghost", children: jsx(MdLastPage, {}) })] }));
};

const SelectAllRowsToggle = () => {
    const { table } = useContext(TableContext);
    return (jsx(Tooltip, { label: table.getIsAllRowsSelected() ? "Clear All" : "Select All", children: jsx(IconButton, { variant: "ghost", "aria-label": table.getIsAllRowsSelected() ? "Clear All" : "Select All", icon: table.getIsAllRowsSelected() ? jsx(MdClear, {}) : jsx(MdOutlineChecklist, {}), onClick: (event) => {
                table.getToggleAllRowsSelectedHandler()(event);
            } }) }));
};

const TableSelector = () => {
    const { table } = useContext(TableContext);
    return (jsxs(Fragment, { children: [table.getSelectedRowModel().rows.length > 0 && (jsxs(Button, { onClick: () => { }, variant: "ghost", display: "flex", gap: "0.25rem", children: [jsx(Box, { fontSize: "sm", children: `${table.getSelectedRowModel().rows.length}` }), jsx(Icon, { as: IoMdCheckbox })] })), !table.getIsAllPageRowsSelected() && jsx(SelectAllRowsToggle, {}), table.getSelectedRowModel().rows.length > 0 && (jsx(IconButton, { variant: "ghost", icon: jsx(Icon, { as: MdClear }), onClick: () => {
                    table.resetRowSelection();
                }, "aria-label": "reset selection" }))] }));
};

const TextCell = ({ label, noOfLines = [1], padding = "0rem", children, }) => {
    if (label) {
        return (jsx(Box, { padding: padding, children: jsx(Tooltip, { label: jsx(Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", noOfLines: [5], children: label }), placement: "auto", children: jsx(Text, { as: "span", textOverflow: "ellipsis", noOfLines: noOfLines, children: children }) }) }));
    }
    return (jsx(Box, { padding: padding, children: jsx(Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", noOfLines: noOfLines, children: children }) }));
};

export { DataTable, DataTableServer, EditFilterButton, EditOrderButton, EditSortingButton, EditViewButton, GlobalFilter, PageSizeControl, ResetFilteringButton, ResetSelectionButton, ResetSortingButton, Table, TableBody, TableCardContainer, TableCards, TableFilter, TableFooter, TableHeader, TableOrderer, TablePagination, TableSelector, TableSorter, TableViewer, TextCell, useDataFromUrl, useDataTable };
