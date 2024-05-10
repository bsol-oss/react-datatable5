import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { createContext, useState, useEffect, useContext } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import axios from 'axios';
import { Popover, PopoverTrigger, IconButton, PopoverContent, PopoverArrow, PopoverBody, Flex, FormControl, Checkbox, Button, Box, Text, Input, Tooltip, Select, Container, Table as Table$1, Grid, Card, CardBody, Tfoot, Tr as Tr$1, Th, Thead, ButtonGroup } from '@chakra-ui/react';
import { IoMdEye } from 'react-icons/io';
import { MdFilterAlt, MdOutlineSort, MdFilterListAlt, MdFirstPage, MdArrowBack, MdArrowForward, MdLastPage } from 'react-icons/md';
import { ChevronUpIcon, UpDownIcon, ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import { Tbody, Tr, Td } from '@chakra-ui/table';

const TableContext = createContext({
    table: {},
    refreshData: () => { },
});

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

const DataTable = ({ columns, url, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, children, }) => {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]); // can set initial column filter state here
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
    const [rowSelection, setRowSelection] = useState({});
    const [columnOrder, setColumnOrder] = useState([]);
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
        },
        defaultColumn: {
            size: 100, //starting column size
            minSize: 10, //enforced during column resizing
            maxSize: 10000, //enforced during column resizing
        },
        enableRowSelection: enableRowSelection,
        enableMultiRowSelection: enableMultiRowSelection,
        enableSubRowSelection: enableSubRowSelection,
        onColumnOrderChange: (state) => {
            setColumnOrder(state);
        },
    });
    useEffect(() => {
        refreshData();
    }, [pagination, sorting, columnFilters]);
    useEffect(() => {
        setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
    }, []);
    return (jsx(TableContext.Provider, { value: { table: { ...table }, refreshData: refreshData }, children: children }));
};

const EditViewButton = () => {
    const { table } = useContext(TableContext);
    return (jsxs(Popover, { placement: "auto", children: [jsx(PopoverTrigger, { children: jsx(IconButton, { "aria-label": "view", icon: jsx(IoMdEye, {}) }) }), jsxs(PopoverContent, { width: "auto", children: [jsx(PopoverArrow, {}), jsx(PopoverBody, { children: jsx(Flex, { flexFlow: "column", gap: "1rem", children: table.getAllLeafColumns().map((column) => {
                                return (jsx(FormControl, { width: "auto", children: jsx(Checkbox, { isChecked: column.getIsVisible(), onChange: column.getToggleVisibilityHandler(), children: column.id }) }, crypto.randomUUID()));
                            }) }) })] })] }));
};

const ResetFilteringButton = () => {
    const { table } = useContext(TableContext);
    return (jsx(Button, { onClick: () => {
            table.resetColumnFilters();
        }, children: "Reset Filtering" }));
};

const useDataTable = () => {
    const { table, refreshData } = useContext(TableContext);
    return { table, refreshData };
};

const TableFilter = () => {
    const { table } = useDataTable();
    return (jsx(Fragment, { children: table.getLeafHeaders().map((header) => {
            return (jsx(Fragment, { children: header.column.getCanFilter() && (jsxs(Box, { children: [jsx(Text, { children: header.column.id }), jsx(Input, { value: header.column.getFilterValue()
                                ? String(header.column.getFilterValue())
                                : "", onChange: (e) => {
                                header.column.setFilterValue(e.target.value);
                            } })] })) }));
        }) }));
};

const EditFilterButton = () => {
    return (jsxs(Popover, { placement: "auto", children: [jsx(Tooltip, { label: "Filter", children: jsx(PopoverTrigger, { children: jsx(IconButton, { "aria-label": "filter", icon: jsx(MdFilterAlt, {}) }) }) }), jsxs(PopoverContent, { width: "auto", children: [jsx(PopoverArrow, {}), jsx(PopoverBody, { children: jsxs(Flex, { flexFlow: "column", gap: "1rem", children: [jsx(TableFilter, {}), jsx(ResetFilteringButton, {})] }) })] })] }));
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
                return (jsx(Fragment, { children: header.column.getCanSort() && (jsxs(Flex, { alignItems: "center", gap: "0.5rem", padding: "0.5rem", children: [jsx(Text, { children: header.column.id }), jsxs(Button, { onClick: (e) => {
                                    header.column.toggleSorting();
                                }, children: [header.column.getNextSortingOrder() === false && (
                                    // <Text>To No sort</Text>
                                    jsx(ChevronUpIcon, {})), header.column.getNextSortingOrder() === "asc" && (
                                    // <Text>To asc</Text>
                                    jsx(UpDownIcon, {})), header.column.getNextSortingOrder() === "desc" && (
                                    // <Text>To desc</Text>
                                    jsx(ChevronDownIcon, {}))] }), header.column.getIsSorted() && (jsx(Button, { onClick: (e) => {
                                    header.column.clearSorting();
                                }, children: jsx(CloseIcon, {}) }))] })) }));
            }) }))) }));
};

const EditSortingButton = () => {
    return (jsxs(Popover, { placement: "auto", children: [jsx(Tooltip, { label: "Filter", children: jsx(PopoverTrigger, { children: jsx(IconButton, { "aria-label": "filter", icon: jsx(MdOutlineSort, {}) }) }) }), jsxs(PopoverContent, { width: "auto", children: [jsx(PopoverArrow, {}), jsx(PopoverBody, { children: jsxs(Flex, { flexFlow: "column", gap: "0.25rem", children: [jsx(TableSorter, {}), jsx(ResetSortingButton, {})] }) })] })] }));
};

const PageSizeControl = ({ pageSizes = [10, 20, 30, 40, 50], }) => {
    const { table } = useContext(TableContext);
    return (jsx(Select, { value: table.getState().pagination.pageSize, onChange: (e) => {
            table.setPageSize(Number(e.target.value));
        }, children: pageSizes.map((pageSize) => (jsx("option", { value: pageSize, children: pageSize }, pageSize))) }));
};

const Table = ({ children }) => {
    const { table } = useDataTable();
    return (jsx(Container, { padding: '0rem', maxW: "100%", overflowX: "scroll", children: jsx(Table$1, { width: table.getCenterTotalSize(), variant: "simple", children: children }) }));
};

const TableBody = () => {
    const { table } = useContext(TableContext);
    return (jsx(Tbody, { children: table.getRowModel().rows.map((row) => {
            return (jsxs(Tr, { display: "flex", children: [jsx(Td
                    // styling resize and pinning start
                    , { 
                        // styling resize and pinning start
                        padding: "0.5rem", left: `0px`, backgroundColor: "gray.50", position: "sticky", zIndex: 1, children: jsx(Checkbox, { isChecked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            // indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler() }) }), row.getVisibleCells().map((cell) => {
                        return (jsx(Td, { padding: "0rem", 
                            // styling resize and pinning start
                            maxWidth: `${cell.column.getSize()}px`, width: `${cell.column.getSize()}px`, left: cell.column.getIsPinned()
                                ? `${cell.column.getStart("left") + 32}px`
                                : undefined, backgroundColor: cell.column.getIsPinned() ? "gray.50" : "whitealpha.900", position: cell.column.getIsPinned() ? "sticky" : "relative", zIndex: cell.column.getIsPinned() ? 1 : -1, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, crypto.randomUUID()));
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
                    padding: "0.5rem", left: `0px`, backgroundColor: "gray.50", position: "sticky", zIndex: 1, children: jsx(Checkbox, { isChecked: table.getIsAllRowsSelected(),
                        // indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler() }) }), footerGroup.headers.map((header) => (jsx(Th, { padding: "0rem", colSpan: header.colSpan, 
                    // styling resize and pinning start
                    maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, left: header.column.getIsPinned()
                        ? `${header.getStart("left") + SELECTION_BOX_WIDTH}px`
                        : undefined, backgroundColor: header.column.getIsPinned() ? "gray.50" : undefined, position: header.column.getIsPinned() ? "sticky" : "relative", zIndex: header.column.getIsPinned() ? 1 : 0, children: header.isPlaceholder
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
                    padding: "0.5rem", left: `0px`, backgroundColor: "gray.50", position: "sticky", zIndex: 1, children: jsx(Checkbox, { isChecked: table.getIsAllRowsSelected(),
                        // indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler() }) }), headerGroup.headers.map((header) => {
                    const resizeProps = {
                        onClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        cursor: "col-resize",
                    };
                    return (jsx(Th, { padding: "0rem", colSpan: header.colSpan, 
                        // styling resize and pinning start
                        maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, left: header.column.getIsPinned()
                            ? `${header.getStart("left") + SELECTION_BOX_WIDTH}px`
                            : undefined, backgroundColor: header.column.getIsPinned() ? "gray.50" : undefined, position: header.column.getIsPinned() ? "sticky" : "relative", zIndex: header.column.getIsPinned() ? 1 : 0, children: jsxs(Flex, { alignItems: "center", gap: "0.5rem", padding: "0.5rem", overflow: "scroll", children: [jsx(Box, { children: header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext()) }), jsx(Button, { onClick: () => {
                                        header.column.pin("left");
                                    }, children: "<=" }), jsx(Button, { onClick: () => {
                                        header.column.pin(false);
                                    }, children: "X" }), header.column.getCanSort() && (jsxs(Fragment, { children: [jsxs(Button, { onClick: (e) => {
                                                header.column.toggleSorting();
                                            }, children: [header.column.getNextSortingOrder() === false && (
                                                // <Text>To No sort</Text>
                                                jsx(ChevronUpIcon, {})), header.column.getNextSortingOrder() === "asc" && (
                                                // <Text>To asc</Text>
                                                jsx(UpDownIcon, {})), header.column.getNextSortingOrder() === "desc" && (
                                                // <Text>To desc</Text>
                                                jsx(ChevronDownIcon, {}))] }), header.column.getIsSorted() && (jsx(Button, { onClick: (e) => {
                                                header.column.clearSorting();
                                            }, children: jsx(CloseIcon, {}) }))] })), header.column.getIsFiltered() && jsx(MdFilterListAlt, {}), canResize && (jsx(Box, { borderRight: header.column.getIsResizing()
                                        ? "0.25rem solid black"
                                        : "0.25rem solid grey", position: "absolute", right: "0", top: "0", height: "100%", width: "5px", userSelect: "none", style: { touchAction: "none" }, ...resizeProps }))] }) }, crypto.randomUUID()));
                })] }, crypto.randomUUID()))) }));
};

const TablePagination = ({}) => {
    const { firstPage, getCanPreviousPage, previousPage, getState, nextPage, getCanNextPage, lastPage, } = useDataTable().table;
    return (jsxs(ButtonGroup, { isAttached: true, children: [jsx(IconButton, { icon: jsx(MdFirstPage, {}), onClick: () => firstPage(), disabled: !getCanPreviousPage(), "aria-label": "first-page" }), jsx(IconButton, { icon: jsx(MdArrowBack, {}), onClick: () => previousPage(), disabled: !getCanPreviousPage(), "aria-label": "previous-page" }), jsx(Button, { onClick: () => { }, disabled: !getCanPreviousPage(), children: getState().pagination.pageIndex + 1 }), jsx(IconButton, { onClick: () => nextPage(), disabled: !getCanNextPage(), "aria-label": "next-page", children: jsx(MdArrowForward, {}) }), jsx(IconButton, { onClick: () => lastPage(), disabled: !getCanNextPage(), "aria-label": "last-page", children: jsx(MdLastPage, {}) })] }));
};

const TextCell = ({ label, children }) => {
    if (label) {
        return (jsx(Tooltip, { label: jsx(Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", noOfLines: [5], children: label }), placement: "auto", children: jsx(Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", noOfLines: [1, 2, 3], children: children }) }));
    }
    return (jsx(Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", noOfLines: [1, 2, 3], children: children }));
};

export { DataTable, EditFilterButton, EditSortingButton, EditViewButton, PageSizeControl, ResetFilteringButton, ResetSortingButton, Table, TableBody, TableCardContainer, TableCards, TableFilter, TableFooter, TableHeader, TablePagination, TableSorter, TextCell, useDataFromUrl, useDataTable };
