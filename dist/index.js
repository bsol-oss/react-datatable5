'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var reactTable = require('@tanstack/react-table');
var axios = require('axios');
var react$1 = require('@chakra-ui/react');
var io = require('react-icons/io');
var md = require('react-icons/md');
var icons = require('@chakra-ui/icons');
var table = require('@chakra-ui/table');

const TableContext = react.createContext({
    table: {},
    refreshData: () => { },
});

const useDataFromUrl = ({ url, params = {}, defaultData, }) => {
    const [loading, setLoading] = react.useState(true);
    const [hasError, setHasError] = react.useState(false);
    const [data, setData] = react.useState(defaultData);
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
    react.useEffect(() => {
        getData().catch((e) => {
            console.error(e);
        });
    }, []);
    return { data, loading, hasError, refreshData };
};

const DataTable = ({ columns, url, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, children, }) => {
    const [sorting, setSorting] = react.useState([]);
    const [columnFilters, setColumnFilters] = react.useState([]); // can set initial column filter state here
    const [pagination, setPagination] = react.useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
    const [rowSelection, setRowSelection] = react.useState({});
    const [columnOrder, setColumnOrder] = react.useState([]);
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
    const table = reactTable.useReactTable({
        data: data.results,
        columns: columns,
        getCoreRowModel: reactTable.getCoreRowModel(),
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
            size: 10, //starting column size
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
    react.useEffect(() => {
        refreshData();
    }, [pagination, sorting, columnFilters]);
    react.useEffect(() => {
        setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
    }, []);
    return (jsxRuntime.jsx(TableContext.Provider, { value: { table: { ...table }, refreshData: refreshData }, children: children }));
};

const EditViewButton = () => {
    const { table } = react.useContext(TableContext);
    return (jsxRuntime.jsxs(react$1.Popover, { placement: "auto", children: [jsxRuntime.jsx(react$1.PopoverTrigger, { children: jsxRuntime.jsx(react$1.IconButton, { "aria-label": "view", icon: jsxRuntime.jsx(io.IoMdEye, {}) }) }), jsxRuntime.jsxs(react$1.PopoverContent, { width: "auto", children: [jsxRuntime.jsx(react$1.PopoverArrow, {}), jsxRuntime.jsx(react$1.PopoverBody, { children: jsxRuntime.jsx(react$1.Flex, { flexFlow: "column", gap: "1rem", children: table.getAllLeafColumns().map((column) => {
                                return (jsxRuntime.jsx(react$1.FormControl, { width: "auto", children: jsxRuntime.jsx(react$1.Checkbox, { isChecked: column.getIsVisible(), onChange: column.getToggleVisibilityHandler(), children: column.id }) }, crypto.randomUUID()));
                            }) }) })] })] }));
};

const ResetFilteringButton = () => {
    const { table } = react.useContext(TableContext);
    return (jsxRuntime.jsx(react$1.Button, { onClick: () => {
            table.resetColumnFilters();
        }, children: "Reset Filtering" }));
};

const useDataTable = () => {
    const { table, refreshData } = react.useContext(TableContext);
    return { table, refreshData };
};

const TableFilter = () => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: table.getLeafHeaders().map((header) => {
            return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: header.column.getCanFilter() && (jsxRuntime.jsxs(react$1.Box, { children: [jsxRuntime.jsx(react$1.Text, { children: header.column.id }), jsxRuntime.jsx(react$1.Input, { value: header.column.getFilterValue()
                                ? String(header.column.getFilterValue())
                                : "", onChange: (e) => {
                                header.column.setFilterValue(e.target.value);
                            } })] })) }));
        }) }));
};

const EditFilterButton = () => {
    return (jsxRuntime.jsxs(react$1.Popover, { placement: "auto", children: [jsxRuntime.jsx(react$1.Tooltip, { label: "Filter", children: jsxRuntime.jsx(react$1.PopoverTrigger, { children: jsxRuntime.jsx(react$1.IconButton, { "aria-label": "filter", icon: jsxRuntime.jsx(md.MdFilterAlt, {}) }) }) }), jsxRuntime.jsxs(react$1.PopoverContent, { width: "auto", children: [jsxRuntime.jsx(react$1.PopoverArrow, {}), jsxRuntime.jsx(react$1.PopoverBody, { children: jsxRuntime.jsxs(react$1.Flex, { flexFlow: "column", gap: "1rem", children: [jsxRuntime.jsx(TableFilter, {}), jsxRuntime.jsx(ResetFilteringButton, {})] }) })] })] }));
};

const ResetSortingButton = () => {
    const { table } = react.useContext(TableContext);
    return (jsxRuntime.jsx(react$1.Button, { onClick: () => {
            table.resetSorting();
        }, children: "Reset Sorting" }));
};

const TableSorter = () => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: table.getHeaderGroups().map((headerGroup) => (jsxRuntime.jsx(jsxRuntime.Fragment, { children: headerGroup.headers.map((header) => {
                return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: header.column.getCanSort() && (jsxRuntime.jsxs(react$1.Flex, { alignItems: "center", gap: "0.5rem", padding: "0.5rem", children: [jsxRuntime.jsx(react$1.Text, { children: header.column.id }), jsxRuntime.jsxs(react$1.Button, { onClick: (e) => {
                                    header.column.toggleSorting();
                                }, children: [header.column.getNextSortingOrder() === false && (
                                    // <Text>To No sort</Text>
                                    jsxRuntime.jsx(icons.ChevronUpIcon, {})), header.column.getNextSortingOrder() === "asc" && (
                                    // <Text>To asc</Text>
                                    jsxRuntime.jsx(icons.UpDownIcon, {})), header.column.getNextSortingOrder() === "desc" && (
                                    // <Text>To desc</Text>
                                    jsxRuntime.jsx(icons.ChevronDownIcon, {}))] }), header.column.getIsSorted() && (jsxRuntime.jsx(react$1.Button, { onClick: (e) => {
                                    header.column.clearSorting();
                                }, children: jsxRuntime.jsx(icons.CloseIcon, {}) }))] })) }));
            }) }))) }));
};

const EditSortingButton = () => {
    return (jsxRuntime.jsxs(react$1.Popover, { placement: "auto", children: [jsxRuntime.jsx(react$1.Tooltip, { label: "Filter", children: jsxRuntime.jsx(react$1.PopoverTrigger, { children: jsxRuntime.jsx(react$1.IconButton, { "aria-label": "filter", icon: jsxRuntime.jsx(md.MdOutlineSort, {}) }) }) }), jsxRuntime.jsxs(react$1.PopoverContent, { width: "auto", children: [jsxRuntime.jsx(react$1.PopoverArrow, {}), jsxRuntime.jsx(react$1.PopoverBody, { children: jsxRuntime.jsxs(react$1.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(TableSorter, {}), jsxRuntime.jsx(ResetSortingButton, {})] }) })] })] }));
};

const PageSizeControl = ({ pageSizes = [10, 20, 30, 40, 50], }) => {
    const { table } = react.useContext(TableContext);
    return (jsxRuntime.jsx(react$1.Select, { value: table.getState().pagination.pageSize, onChange: (e) => {
            table.setPageSize(Number(e.target.value));
        }, children: pageSizes.map((pageSize) => (jsxRuntime.jsx("option", { value: pageSize, children: pageSize }, pageSize))) }));
};

const Table = ({ children }) => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(react$1.Container, { maxW: "100%", overflowY: "scroll", children: jsxRuntime.jsx(react$1.Table, { width: table.getCenterTotalSize(), variant: "simple", children: children }) }));
};

const TableBody = () => {
    const { table: table$1 } = react.useContext(TableContext);
    console.log(table$1.getSelectedRowModel().rows, "jfaisodij");
    return (jsxRuntime.jsx(table.Tbody, { children: table$1.getRowModel().rows.map((row) => {
            console.log(row.getIsSelected(), row, "lghrpl");
            return (jsxRuntime.jsxs(table.Tr, { children: [jsxRuntime.jsx(table.Td, { padding: "0.5rem", children: jsxRuntime.jsx(react$1.Checkbox, { isChecked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            // indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler() }) }), row.getVisibleCells().map((cell) => (jsxRuntime.jsx(table.Td, { padding: "0.5rem", width: `${cell.column.getSize()}px`, children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) }, crypto.randomUUID())))] }, crypto.randomUUID()));
        }) }));
};

const TableCardContainer = ({ children, ...props }) => {
    return (jsxRuntime.jsx(react$1.Grid, { gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr 1fr"], gap: "0.5rem", ...props, children: children }));
};

const TableCards = ({}) => {
    const { table } = react.useContext(TableContext);
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: table.getRowModel().rows.map((row) => {
            return (jsxRuntime.jsx(react$1.Card, { children: jsxRuntime.jsxs(react$1.CardBody, { display: "flex", flexFlow: "column", gap: "0.5rem", children: [jsxRuntime.jsx(react$1.Checkbox, { isChecked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            // indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler() }), row.getVisibleCells().map((cell) => {
                            return (jsxRuntime.jsx(react$1.Box, { children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) }));
                        })] }) }, crypto.randomUUID()));
        }) }));
};

const TableFooter = () => {
    const table = useDataTable().table;
    return (jsxRuntime.jsx(react$1.Tfoot, { children: table.getFooterGroups().map((footerGroup) => (jsxRuntime.jsxs(react$1.Tr, { children: [jsxRuntime.jsx(react$1.Th, { padding: "0.5rem", children: jsxRuntime.jsx(react$1.Checkbox, { isChecked: table.getIsAllRowsSelected(),
                        // indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler() }) }), footerGroup.headers.map((header) => (jsxRuntime.jsx(react$1.Th, { colSpan: header.colSpan, children: header.isPlaceholder
                        ? null
                        : reactTable.flexRender(header.column.columnDef.footer, header.getContext()) }, crypto.randomUUID())))] }, crypto.randomUUID()))) }));
};

const TableHeader = ({ canResize }) => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(react$1.Thead, { children: table.getHeaderGroups().map((headerGroup) => (jsxRuntime.jsxs(react$1.Tr, { style: { columnSpan: "all" }, children: [jsxRuntime.jsx(react$1.Th, { padding: "0.5rem", children: jsxRuntime.jsx(react$1.Checkbox, { isChecked: table.getIsAllRowsSelected(),
                        // indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler() }) }), headerGroup.headers.map((header) => {
                    const resizeProps = {
                        onClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        cursor: "col-resize",
                    };
                    return (jsxRuntime.jsx(react$1.Th, { padding: "0rem", colSpan: header.colSpan, width: `${header.getSize()}px`, children: jsxRuntime.jsxs(react$1.Flex, { alignItems: "center", gap: "0.5rem", padding: "0.5rem", children: [jsxRuntime.jsx(react$1.Box, { children: header.isPlaceholder
                                        ? null
                                        : reactTable.flexRender(header.column.columnDef.header, header.getContext()) }), header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs(react$1.Button, { onClick: (e) => {
                                                header.column.toggleSorting();
                                            }, children: [header.column.getNextSortingOrder() === false && (
                                                // <Text>To No sort</Text>
                                                jsxRuntime.jsx(icons.ChevronUpIcon, {})), header.column.getNextSortingOrder() === "asc" && (
                                                // <Text>To asc</Text>
                                                jsxRuntime.jsx(icons.UpDownIcon, {})), header.column.getNextSortingOrder() === "desc" && (
                                                // <Text>To desc</Text>
                                                jsxRuntime.jsx(icons.ChevronDownIcon, {}))] }), header.column.getIsSorted() && (jsxRuntime.jsx(react$1.Button, { onClick: (e) => {
                                                header.column.clearSorting();
                                            }, children: jsxRuntime.jsx(icons.CloseIcon, {}) }))] })), header.column.getIsFiltered() && jsxRuntime.jsx(md.MdFilterListAlt, {}), canResize && (jsxRuntime.jsx(react$1.Box, { borderRight: header.column.getIsResizing()
                                        ? "0.25rem solid black"
                                        : "0.25rem solid grey", height: "5rem", width: "5px", userSelect: "none", style: { touchAction: "none" }, ...resizeProps }))] }) }, crypto.randomUUID()));
                })] }, crypto.randomUUID()))) }));
};

const TablePagination = ({}) => {
    const { firstPage, getCanPreviousPage, previousPage, getState, nextPage, getCanNextPage, lastPage, } = useDataTable().table;
    return (jsxRuntime.jsxs(react$1.ButtonGroup, { isAttached: true, children: [jsxRuntime.jsx(react$1.IconButton, { icon: jsxRuntime.jsx(md.MdFirstPage, {}), onClick: () => firstPage(), disabled: !getCanPreviousPage(), "aria-label": "first-page" }), jsxRuntime.jsx(react$1.IconButton, { icon: jsxRuntime.jsx(md.MdArrowBack, {}), onClick: () => previousPage(), disabled: !getCanPreviousPage(), "aria-label": "previous-page" }), jsxRuntime.jsx(react$1.Button, { onClick: () => { }, disabled: !getCanPreviousPage(), children: getState().pagination.pageIndex + 1 }), jsxRuntime.jsx(react$1.IconButton, { onClick: () => nextPage(), disabled: !getCanNextPage(), "aria-label": "next-page", children: jsxRuntime.jsx(md.MdArrowForward, {}) }), jsxRuntime.jsx(react$1.IconButton, { onClick: () => lastPage(), disabled: !getCanNextPage(), "aria-label": "last-page", children: jsxRuntime.jsx(md.MdLastPage, {}) })] }));
};

const TextCell = ({ label, children }) => {
    if (label) {
        return (jsxRuntime.jsx(react$1.Tooltip, { label: jsxRuntime.jsx(react$1.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", noOfLines: [5], children: label }), placement: "auto", children: jsxRuntime.jsx(react$1.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", noOfLines: [1, 2, 3], children: children }) }));
    }
    return (jsxRuntime.jsx(react$1.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", noOfLines: [1, 2, 3], children: children }));
};

exports.DataTable = DataTable;
exports.EditFilterButton = EditFilterButton;
exports.EditSortingButton = EditSortingButton;
exports.EditViewButton = EditViewButton;
exports.PageSizeControl = PageSizeControl;
exports.ResetFilteringButton = ResetFilteringButton;
exports.ResetSortingButton = ResetSortingButton;
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCardContainer = TableCardContainer;
exports.TableCards = TableCards;
exports.TableFilter = TableFilter;
exports.TableFooter = TableFooter;
exports.TableHeader = TableHeader;
exports.TablePagination = TablePagination;
exports.TableSorter = TableSorter;
exports.TextCell = TextCell;
exports.useDataFromUrl = useDataFromUrl;
exports.useDataTable = useDataTable;
