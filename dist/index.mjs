import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { createContext, useState, useEffect, useContext } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import axios from 'axios';
import { Popover, PopoverTrigger, IconButton, PopoverContent, PopoverArrow, PopoverBody, Flex, FormControl, Checkbox, Button, Container, Table as Table$1, Box, Text, Input, Tfoot, Tr as Tr$1, Th, Thead, ButtonGroup, Tooltip } from '@chakra-ui/react';
import { IoMdEye } from 'react-icons/io';
import { Tbody, Tr, Td } from '@chakra-ui/table';
import { MdFilterListAlt, MdFirstPage, MdArrowBack, MdArrowForward, MdLastPage } from 'react-icons/md';
import { ChevronUpIcon, UpDownIcon, ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';

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

const DataTable = ({ columns, url, children, }) => {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]); // can set initial column filter state here
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
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
        // getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        manualSorting: true,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        columnResizeMode: "onChange",
        state: {
            pagination,
            sorting,
            columnFilters,
        },
        defaultColumn: {
            size: 10, //starting column size
            minSize: 10, //enforced during column resizing
            maxSize: 10000, //enforced during column resizing
        },
    });
    useEffect(() => {
        refreshData();
    }, [pagination, sorting, columnFilters]);
    return (jsx(TableContext.Provider, { value: { table: { ...table }, refreshData: refreshData }, children: children }));
};

const EditViewButton = () => {
    const { table } = useContext(TableContext);
    return (jsxs(Popover, { placement: "bottom-end", children: [jsx(PopoverTrigger, { children: jsx(IconButton, { "aria-label": "view", icon: jsx(IoMdEye, {}) }) }), jsxs(PopoverContent, { width: "auto", children: [jsx(PopoverArrow, {}), jsx(PopoverBody, { children: jsx(Flex, { flexFlow: "column", gap: "1rem", children: table.getAllLeafColumns().map((column) => {
                                return (jsx(FormControl, { width: "auto", children: jsx(Checkbox, { isChecked: column.getIsVisible(), onChange: column.getToggleVisibilityHandler(), children: column.id }) }, crypto.randomUUID()));
                            }) }) })] })] }));
};

const PageSizeControl = ({ pageSizes = [10, 20, 30, 40, 50], }) => {
    const { table } = useContext(TableContext);
    return (jsx("select", { value: table.getState().pagination.pageSize, onChange: (e) => {
            table.setPageSize(Number(e.target.value));
        }, children: pageSizes.map((pageSize) => (jsx("option", { value: pageSize, children: pageSize }, pageSize))) }));
};

const ResetFilteringButton = () => {
    const { table } = useContext(TableContext);
    return (jsx(Button, { onClick: () => {
            table.resetColumnFilters();
        }, children: "Reset Filtering" }));
};

const ResetSortingButton = () => {
    const { table } = useContext(TableContext);
    return (jsx(Button, { onClick: () => {
            table.resetSorting();
        }, children: "Reset Sorting" }));
};

const useDataTable = () => {
    const { table, refreshData } = useContext(TableContext);
    return { table, refreshData };
};

const Table = ({ children }) => {
    const { table } = useDataTable();
    return (jsx(Container, { maxW: "100%", overflowY: "scroll", children: jsx(Table$1, { width: table.getCenterTotalSize(), variant: "simple", children: children }) }));
};

const TableBody = () => {
    const { table } = useContext(TableContext);
    return (jsx(Tbody, { children: table.getRowModel().rows.map((row) => (jsx(Tr, { children: row.getVisibleCells().map((cell) => (jsx(Td, { width: `${cell.column.getSize()}px`, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, crypto.randomUUID()))) }, crypto.randomUUID()))) }));
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

const TableFooter = () => {
    const table = useDataTable().table;
    return (jsx(Tfoot, { children: table.getFooterGroups().map((footerGroup) => (jsx(Tr$1, { children: footerGroup.headers.map((header) => (jsx(Th, { colSpan: header.colSpan, children: header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext()) }, crypto.randomUUID()))) }, crypto.randomUUID()))) }));
};

const TableHeader = ({ canResize }) => {
    const { table } = useDataTable();
    return (jsx(Thead, { children: table.getHeaderGroups().map((headerGroup) => (jsx(Tr$1, { style: { columnSpan: "all" }, children: headerGroup.headers.map((header) => {
                const resizeProps = {
                    onClick: () => header.column.resetSize(),
                    onMouseDown: header.getResizeHandler(),
                    onTouchStart: header.getResizeHandler(),
                    cursor: "col-resize",
                };
                return (jsx(Th, { padding: "0rem", colSpan: header.colSpan, width: `${header.getSize()}px`, children: jsxs(Flex, { alignItems: "center", gap: "0.5rem", padding: "0.5rem", children: [jsx(Box, { children: header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext()) }), header.column.getCanSort() && (jsxs(Fragment, { children: [jsxs(Button, { onClick: (e) => {
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
                                    : "0.25rem solid grey", height: "5rem", width: "5px", userSelect: "none", style: { touchAction: "none" }, ...resizeProps }))] }) }, crypto.randomUUID()));
            }) }, crypto.randomUUID()))) }));
};

const TablePagination = ({}) => {
    const { firstPage, getCanPreviousPage, previousPage, getState, nextPage, getCanNextPage, lastPage, } = useDataTable().table;
    return (jsxs(ButtonGroup, { isAttached: true, children: [jsx(IconButton, { icon: jsx(MdFirstPage, {}), onClick: () => firstPage(), disabled: !getCanPreviousPage(), "aria-label": "first-page" }), jsx(IconButton, { icon: jsx(MdArrowBack, {}), onClick: () => previousPage(), disabled: !getCanPreviousPage(), "aria-label": "previous-page" }), jsx(Button, { onClick: () => { }, disabled: !getCanPreviousPage(), children: getState().pagination.pageIndex + 1 }), jsx(IconButton, { onClick: () => nextPage(), disabled: !getCanNextPage(), "aria-label": "next-page", children: jsx(MdArrowForward, {}) }), jsx(IconButton, { onClick: () => lastPage(), disabled: !getCanNextPage(), "aria-label": "last-page", children: jsx(MdLastPage, {}) })] }));
};

const TextCell = ({ label, children }) => {
    return (jsx(Tooltip, { label: label, children: jsx(Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", noOfLines: [1, 2, 3], children: children }) }));
};

export { DataTable, EditViewButton, PageSizeControl, ResetFilteringButton, ResetSortingButton, Table, TableBody, TableFilter, TableFooter, TableHeader, TablePagination, TextCell };