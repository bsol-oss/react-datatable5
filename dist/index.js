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

const DataTable = ({ columns, data, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, children, }) => {
    const [sorting, setSorting] = react.useState([]);
    const [columnFilters, setColumnFilters] = react.useState([]); // can set initial column filter state here
    const [pagination, setPagination] = react.useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });
    const [rowSelection, setRowSelection] = react.useState({});
    const [columnOrder, setColumnOrder] = react.useState([]);
    const table = reactTable.useReactTable({
        data: data,
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
        rowCount: data.filterCount,
    });
    react.useEffect(() => {
        setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
    }, []);
    return (jsxRuntime.jsx(TableContext.Provider, { value: {
            table: { ...table },
            refreshData: () => {
                throw new Error("not implemented");
            },
        }, children: children }));
};

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

const DataTableServer = ({ columns, url, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, children, }) => {
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
        rowCount: data.filterCount,
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
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(react$1.Menu, { children: [jsxRuntime.jsx(react$1.MenuButton, { as: react$1.Button, rightIcon: jsxRuntime.jsx(icons.ChevronDownIcon, {}), children: table.getState().pagination.pageSize }), jsxRuntime.jsx(react$1.MenuList, { children: pageSizes.map((pageSize) => (jsxRuntime.jsx(react$1.MenuItem, { onClick: () => { table.setPageSize(Number(pageSize)); }, children: pageSize }))) })] }) }));
};

const Table = ({ children }) => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(react$1.Container, { padding: '0rem', maxW: "100%", overflowX: "scroll", children: jsxRuntime.jsx(react$1.Table, { width: table.getCenterTotalSize(), variant: "simple", children: children }) }));
};

const TableBody = () => {
    const { table: table$1 } = react.useContext(TableContext);
    return (jsxRuntime.jsx(table.Tbody, { children: table$1.getRowModel().rows.map((row) => {
            return (jsxRuntime.jsxs(table.Tr, { display: "flex", _hover: { backgroundColor: "rgba(178,178,178,0.1)" }, zIndex: 1, children: [jsxRuntime.jsx(table.Td
                    // styling resize and pinning start
                    , { 
                        // styling resize and pinning start
                        padding: "0.5rem", ...(table$1.getIsSomeColumnsPinned("left")
                            ? {
                                left: `0px`,
                                backgroundColor: "gray.50",
                                position: "sticky",
                                zIndex: 1,
                                _dark: { backgroundColor: "gray.700" },
                            }
                            : {}), children: jsxRuntime.jsx(react$1.Checkbox, { isChecked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            // indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler() }) }), row.getVisibleCells().map((cell) => {
                        return (jsxRuntime.jsx(table.Td, { padding: "0rem", 
                            // styling resize and pinning start
                            maxWidth: `${cell.column.getSize()}px`, width: `${cell.column.getSize()}px`, left: cell.column.getIsPinned()
                                ? `${cell.column.getStart("left") + 32}px`
                                : undefined, backgroundColor: cell.column.getIsPinned() ? "gray.50" : undefined, position: cell.column.getIsPinned() ? "sticky" : "relative", zIndex: cell.column.getIsPinned() ? 1 : 0, _dark: {
                                backgroundColor: cell.column.getIsPinned()
                                    ? "gray.700"
                                    : undefined,
                            }, children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) }, crypto.randomUUID()));
                    })] }, crypto.randomUUID()));
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
    const SELECTION_BOX_WIDTH = 32;
    return (jsxRuntime.jsx(react$1.Tfoot, { children: table.getFooterGroups().map((footerGroup) => (jsxRuntime.jsxs(react$1.Tr, { display: "flex", children: [jsxRuntime.jsx(react$1.Th
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
                        : {}), children: jsxRuntime.jsx(react$1.Checkbox, { isChecked: table.getIsAllRowsSelected(),
                        // indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler() }) }), footerGroup.headers.map((header) => (jsxRuntime.jsx(react$1.Th, { padding: "0rem", colSpan: header.colSpan, 
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
                        : reactTable.flexRender(header.column.columnDef.footer, header.getContext()) }, crypto.randomUUID())))] }, crypto.randomUUID()))) }));
};

const TableHeader = ({ canResize }) => {
    const { table } = useDataTable();
    const SELECTION_BOX_WIDTH = 32;
    return (jsxRuntime.jsx(react$1.Thead, { children: table.getHeaderGroups().map((headerGroup) => (jsxRuntime.jsxs(react$1.Tr, { display: "flex", children: [jsxRuntime.jsx(react$1.Th
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
                        : {}), children: jsxRuntime.jsx(react$1.Checkbox, { isChecked: table.getIsAllRowsSelected(),
                        // indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler() }) }), headerGroup.headers.map((header) => {
                    const resizeProps = {
                        onClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        cursor: "col-resize",
                    };
                    return (jsxRuntime.jsxs(react$1.Th, { padding: "0rem", colSpan: header.colSpan, 
                        // styling resize and pinning start
                        maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, left: header.column.getIsPinned()
                            ? `${header.getStart("left") + SELECTION_BOX_WIDTH}px`
                            : undefined, backgroundColor: header.column.getIsPinned() ? "gray.50" : undefined, position: header.column.getIsPinned() ? "sticky" : "relative", zIndex: header.column.getIsPinned() ? 1 : undefined, _dark: {
                            backgroundColor: header.column.getIsPinned()
                                ? "gray.700"
                                : undefined,
                        }, 
                        // styling resize and pinning end
                        display: "grid", children: [jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(react$1.Menu, { children: [jsxRuntime.jsx(react$1.MenuButton, { as: react$1.Box, display: "flex", alignItems: "center", justifyContent: "start", _hover: { backgroundColor: "gray.100" }, _dark: { _hover: { backgroundColor: "gray.700" } }, children: jsxRuntime.jsxs(react$1.Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
                                                        ? null
                                                        : reactTable.flexRender(header.column.columnDef.header, header.getContext()), jsxRuntime.jsx(react$1.Box, { children: header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [header.column.getIsSorted() === false && (jsxRuntime.jsx(icons.UpDownIcon, {})), header.column.getIsSorted() === "asc" && (jsxRuntime.jsx(icons.ChevronUpIcon, {})), header.column.getIsSorted() === "desc" && (jsxRuntime.jsx(icons.ChevronDownIcon, {}))] })) })] }) }), jsxRuntime.jsx(react$1.Portal, { children: jsxRuntime.jsxs(react$1.MenuList, { children: [!header.column.getIsPinned() && (jsxRuntime.jsx(react$1.MenuItem, { icon: jsxRuntime.jsx(md.MdPushPin, {}), onClick: () => {
                                                            header.column.pin("left");
                                                        }, children: "Pin Column" })), header.column.getIsPinned() && (jsxRuntime.jsx(react$1.MenuItem, { icon: jsxRuntime.jsx(md.MdCancel, {}), onClick: () => {
                                                            header.column.pin(false);
                                                        }, children: "Cancel Pin" })), header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(react$1.MenuItem, { icon: jsxRuntime.jsx(md.MdSort, {}), onClick: () => {
                                                                    header.column.toggleSorting();
                                                                }, children: "Toggle Sorting" }), header.column.getIsSorted() && (jsxRuntime.jsx(react$1.MenuItem, { icon: jsxRuntime.jsx(io.IoMdClose, {}), onClick: () => {
                                                                    header.column.clearSorting();
                                                                }, children: "Clear Sorting" }))] }))] }) })] }) }), header.column.getIsFiltered() && jsxRuntime.jsx(md.MdFilterListAlt, {}), canResize && (jsxRuntime.jsx(react$1.Box, { borderRight: "0.2rem solid", borderRightColor: header.column.getIsResizing() ? "gray.700" : "transparent", position: "absolute", right: "0", top: "0", height: "100%", width: "5px", userSelect: "none", style: { touchAction: "none" }, _hover: {
                                    borderRightColor: header.column.getIsResizing()
                                        ? "gray.700"
                                        : "gray.400",
                                }, ...resizeProps }))] }, crypto.randomUUID()));
                })] }, crypto.randomUUID()))) }));
};

const TablePagination = ({}) => {
    const { firstPage, getCanPreviousPage, previousPage, getState, nextPage, getCanNextPage, lastPage, } = useDataTable().table;
    return (jsxRuntime.jsxs(react$1.ButtonGroup, { isAttached: true, children: [jsxRuntime.jsx(react$1.IconButton, { icon: jsxRuntime.jsx(md.MdFirstPage, {}), onClick: () => firstPage(), isDisabled: !getCanPreviousPage(), "aria-label": "first-page" }), jsxRuntime.jsx(react$1.IconButton, { icon: jsxRuntime.jsx(md.MdArrowBack, {}), onClick: () => previousPage(), isDisabled: !getCanPreviousPage(), "aria-label": "previous-page" }), jsxRuntime.jsx(react$1.Button, { onClick: () => { }, disabled: !getCanPreviousPage(), children: getState().pagination.pageIndex + 1 }), jsxRuntime.jsx(react$1.IconButton, { onClick: () => nextPage(), isDisabled: !getCanNextPage(), "aria-label": "next-page", children: jsxRuntime.jsx(md.MdArrowForward, {}) }), jsxRuntime.jsx(react$1.IconButton, { onClick: () => lastPage(), isDisabled: !getCanNextPage(), "aria-label": "last-page", children: jsxRuntime.jsx(md.MdLastPage, {}) })] }));
};

const TextCell = ({ label, children }) => {
    if (label) {
        return (jsxRuntime.jsx(react$1.Tooltip, { label: jsxRuntime.jsx(react$1.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", noOfLines: [5], children: label }), placement: "auto", children: jsxRuntime.jsx(react$1.Text, { as: "span", textOverflow: "ellipsis", noOfLines: [1, 2, 3], children: children }) }));
    }
    return (jsxRuntime.jsx(react$1.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", noOfLines: [1, 2, 3], children: children }));
};

exports.DataTable = DataTable;
exports.DataTableServer = DataTableServer;
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
