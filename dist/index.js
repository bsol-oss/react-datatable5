'use strict';

var jsxRuntime = require('react/jsx-runtime');
var reactTable = require('@tanstack/react-table');
var react = require('react');
var matchSorterUtils = require('@tanstack/match-sorter-utils');
var axios = require('axios');
var react$1 = require('@chakra-ui/react');
var md = require('react-icons/md');
var io = require('react-icons/io');
var icons = require('@chakra-ui/icons');
var table = require('@chakra-ui/table');
var ai = require('react-icons/ai');

const TableContext = react.createContext({
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
const DataTable = ({ columns, data, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, onRowSelect = () => { }, columnOrder: defaultColumnOrder = [], columnFilters: defaultColumnFilter = [], density = "sm", globalFilter: defaultGlobalFilter = "", pagination: defaultPagination = {
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
}, sorting: defaultSorting = [], rowSelection: defaultRowSelection = {}, children, }) => {
    const [columnOrder, setColumnOrder] = react.useState(defaultColumnOrder);
    const [globalFilter, setGlobalFilter] = react.useState(defaultGlobalFilter);
    const [densityState, setDensity] = react.useState(density);
    const [rowSelection, setRowSelection] = react.useState(defaultRowSelection);
    const table = reactTable.useReactTable({
        _features: [DensityFeature],
        data: data,
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
        state: {
            columnOrder,
            globalFilter,
            density: densityState,
            rowSelection,
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
        initialState: {
            columnFilters: defaultColumnFilter,
            sorting: defaultSorting,
            pagination: defaultPagination,
        },
    });
    react.useEffect(() => {
        setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
    }, []);
    react.useEffect(() => {
        onRowSelect(table.getState().rowSelection);
    }, [table.getState().rowSelection]);
    return (jsxRuntime.jsx(TableContext.Provider, { value: {
            table: { ...table },
            refreshData: () => {
                throw new Error("not implemented");
            },
            globalFilter: globalFilter,
            setGlobalFilter: setGlobalFilter,
            loading: false,
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
    }, [url]);
    return { data, loading, hasError, refreshData };
};

const DataTableServer = ({ columns, url, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, onRowSelect = () => { }, columnOrder: defaultColumnOrder = [], columnFilters: defaultColumnFilter = [], density = "sm", globalFilter: defaultGlobalFilter = "", pagination: defaultPagination = {
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
}, sorting: defaultSorting = [], rowSelection: defaultRowSelection = {}, children, }) => {
    const [sorting, setSorting] = react.useState(defaultSorting);
    const [columnFilters, setColumnFilters] = react.useState(defaultColumnFilter); // can set initial column filter state here
    const [pagination, setPagination] = react.useState(defaultPagination);
    const [rowSelection, setRowSelection] = react.useState(defaultRowSelection);
    const [columnOrder, setColumnOrder] = react.useState(defaultColumnOrder);
    const [globalFilter, setGlobalFilter] = react.useState(defaultGlobalFilter);
    const [densityState, setDensity] = react.useState(density);
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
    const table = reactTable.useReactTable({
        _features: [DensityFeature],
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
            globalFilter,
            density: densityState,
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
        onDensityChange: setDensity,
    });
    react.useEffect(() => {
        refreshData();
    }, [pagination, sorting, columnFilters, globalFilter]);
    react.useEffect(() => {
        setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
    }, []);
    react.useEffect(() => {
        onRowSelect(table.getState().rowSelection);
    }, [table.getState().rowSelection]);
    return (jsxRuntime.jsx(TableContext.Provider, { value: {
            table: { ...table },
            refreshData: refreshData,
            globalFilter,
            setGlobalFilter,
            loading: loading,
        }, children: children }));
};

const useDataTable = () => {
    const { table, refreshData, globalFilter, setGlobalFilter, loading } = react.useContext(TableContext);
    return { table, refreshData, globalFilter, setGlobalFilter, loading };
};

const ResetFilteringButton = ({ text = "Reset Filtering", }) => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(react$1.Button, { onClick: () => {
            table.resetColumnFilters();
        }, children: text }));
};

const TableFilter = () => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: table.getLeafHeaders().map((header) => {
            const displayName = header.column.columnDef.meta === undefined
                ? header.column.id
                : header.column.columnDef.meta.displayName;
            return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: header.column.getCanFilter() && (jsxRuntime.jsxs(react$1.Box, { children: [jsxRuntime.jsx(react$1.Text, { children: displayName }), jsxRuntime.jsx(react$1.Input, { value: header.column.getFilterValue()
                                ? String(header.column.getFilterValue())
                                : "", onChange: (e) => {
                                header.column.setFilterValue(e.target.value);
                            } })] })) }));
        }) }));
};

const EditFilterButton = ({ text, title = "Edit Filter", closeText = "Close", resetText = "Reset", icon = jsxRuntime.jsx(md.MdFilterAlt, {}), ...props }) => {
    const filterModal = react$1.useDisclosure();
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!text === false && (jsxRuntime.jsx(react$1.IconButton, { icon: icon, variant: "ghost", onClick: filterModal.onOpen, "aria-label": "filter", ...props })), !!text !== false && (jsxRuntime.jsx(react$1.Button, { leftIcon: icon, variant: "ghost", onClick: filterModal.onOpen, ...props, children: text })), jsxRuntime.jsxs(react$1.Modal, { isOpen: filterModal.isOpen, onClose: filterModal.onClose, size: ["full", "full", "md", "md"], children: [jsxRuntime.jsx(react$1.ModalOverlay, {}), jsxRuntime.jsxs(react$1.ModalContent, { children: [jsxRuntime.jsx(react$1.ModalHeader, { children: title }), jsxRuntime.jsx(react$1.ModalCloseButton, {}), jsxRuntime.jsx(react$1.ModalBody, { children: jsxRuntime.jsxs(react$1.Flex, { flexFlow: "column", gap: "1rem", children: [jsxRuntime.jsx(TableFilter, {}), jsxRuntime.jsx(ResetFilteringButton, { text: resetText })] }) }), jsxRuntime.jsx(react$1.ModalFooter, { children: jsxRuntime.jsx(react$1.Button, { onClick: filterModal.onClose, children: closeText }) })] })] })] }));
};

const TableViewer = () => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(react$1.Flex, { flexFlow: "column", gap: "1rem", children: table.getAllLeafColumns().map((column) => {
            const displayName = column.columnDef.meta === undefined
                ? column.id
                : column.columnDef.meta.displayName;
            return (jsxRuntime.jsxs(react$1.Flex, { flexFlow: "row", gap: "0.5rem", alignItems: "center", children: [jsxRuntime.jsx(react$1.Switch, { isChecked: column.getIsVisible(), onChange: column.getToggleVisibilityHandler() }), displayName] }));
        }) }));
};

const EditViewButton = ({ text, icon = jsxRuntime.jsx(io.IoMdEye, {}), title = "Edit View", }) => {
    const viewModel = react$1.useDisclosure();
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!text === false && (jsxRuntime.jsx(react$1.IconButton, { icon: icon, variant: "ghost", onClick: viewModel.onOpen, "aria-label": "change sorting" })), !!text !== false && (jsxRuntime.jsx(react$1.Button, { leftIcon: icon, variant: "ghost", onClick: viewModel.onOpen, children: text })), jsxRuntime.jsxs(react$1.Modal, { isOpen: viewModel.isOpen, onClose: viewModel.onClose, size: ["full", "full", "md", "md"], children: [jsxRuntime.jsx(react$1.ModalOverlay, {}), jsxRuntime.jsxs(react$1.ModalContent, { padding: "0 0 1rem 0", children: [jsxRuntime.jsx(react$1.ModalHeader, { children: title }), jsxRuntime.jsx(react$1.ModalCloseButton, {}), jsxRuntime.jsx(react$1.ModalBody, { children: jsxRuntime.jsx(TableViewer, {}) })] })] })] }));
};

const GlobalFilter = ({ icon = md.MdSearch }) => {
    const { globalFilter, setGlobalFilter } = useDataTable();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(react$1.Box, { children: jsxRuntime.jsxs(react$1.InputGroup, { children: [jsxRuntime.jsx(react$1.InputLeftElement, { pointerEvents: "none", children: jsxRuntime.jsx(react$1.Icon, { as: icon, color: "gray.300" }) }), jsxRuntime.jsx(react$1.Input, { value: globalFilter, onChange: (e) => {
                            setGlobalFilter(e.target.value);
                        } })] }) }) }));
};

const PageSizeControl = ({ pageSizes = [10, 20, 30, 40, 50], }) => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(react$1.Menu, { children: [jsxRuntime.jsx(react$1.MenuButton, { as: react$1.Button, variant: "ghost", rightIcon: jsxRuntime.jsx(icons.ChevronDownIcon, {}), gap: "0.5rem", children: table.getState().pagination.pageSize }), jsxRuntime.jsx(react$1.MenuList, { children: pageSizes.map((pageSize) => (jsxRuntime.jsx(react$1.MenuItem, { onClick: () => {
                            table.setPageSize(Number(pageSize));
                        }, children: pageSize }, crypto.randomUUID()))) })] }) }));
};

const RowCountText = () => {
    const { table } = react.useContext(TableContext);
    return jsxRuntime.jsx(react$1.Text, { children: table.getRowCount() });
};

const Table = ({ children, showLoading = false, loadingComponent = jsxRuntime.jsx(jsxRuntime.Fragment, { children: "Loading..." }), ...props }) => {
    const { table, loading } = useDataTable();
    if (showLoading) {
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [loading && loadingComponent, !loading && (jsxRuntime.jsx(react$1.Table, { width: table.getCenterTotalSize(), overflow: "auto", ...props, children: children }))] }));
    }
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(react$1.Table, { width: table.getCenterTotalSize(), overflowX: "auto", ...props, children: children }) }));
};

const TableBody = ({ pinnedBgColor = { light: "gray.50", dark: "gray.700" }, }) => {
    const { table: table$1 } = react.useContext(TableContext);
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredRow, setHoveredRow] = react.useState(-1);
    const handleRowHover = (index) => {
        setHoveredRow(index);
    };
    return (jsxRuntime.jsx(table.Tbody, { children: table$1.getRowModel().rows.map((row, index) => {
            return (jsxRuntime.jsxs(table.Tr, { display: "flex", _hover: { backgroundColor: "rgba(178,178,178,0.1)" }, zIndex: 1, onMouseEnter: () => handleRowHover(index), onMouseLeave: () => handleRowHover(-1), children: [jsxRuntime.jsx(TableRowSelector, { index: index, row: row, hoveredRow: hoveredRow }), row.getVisibleCells().map((cell) => {
                        return (jsxRuntime.jsx(table.Td, { padding: `${table$1.getDensityValue()}px`, 
                            // styling resize and pinning start
                            maxWidth: `${cell.column.getSize()}px`, width: `${cell.column.getSize()}px`, left: cell.column.getIsPinned()
                                ? `${cell.column.getStart("left") + SELECTION_BOX_WIDTH + table$1.getDensityValue() * 2}px`
                                : undefined, backgroundColor: cell.column.getIsPinned() ? pinnedBgColor.light : undefined, position: cell.column.getIsPinned() ? "sticky" : "relative", zIndex: cell.column.getIsPinned() ? 1 : 0, _dark: {
                                backgroundColor: cell.column.getIsPinned()
                                    ? pinnedBgColor.dark
                                    : undefined,
                            }, children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) }, crypto.randomUUID()));
                    })] }, crypto.randomUUID()));
        }) }));
};
const TableRowSelector = ({ index, row, hoveredRow, pinnedBgColor = { light: "gray.50", dark: "gray.700" }, }) => {
    const { table: table$1 } = react.useContext(TableContext);
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
    return (jsxRuntime.jsxs(table.Td, { padding: `${table$1.getDensityValue()}px`, ...(table$1.getIsSomeColumnsPinned("left")
            ? {
                left: `0px`,
                backgroundColor: pinnedBgColor.light,
                position: "sticky",
                zIndex: 1,
                _dark: { backgroundColor: pinnedBgColor.dark },
            }
            : {}), 
        // styling resize and pinning end
        display: "grid", children: [!isCheckBoxVisible(index, row) && (jsxRuntime.jsx(react$1.FormLabel, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsxRuntime.jsx(react$1.Box, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, children: jsxRuntime.jsx("span", { children: index + 1 }) }) })), isCheckBoxVisible(index, row) && (jsxRuntime.jsx(react$1.FormLabel, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsxRuntime.jsx(react$1.Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    // indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler() }) }))] }));
};

const TableFooter = ({ pinnedBgColor = { light: "gray.50", dark: "gray.700" }, }) => {
    const table = useDataTable().table;
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredCheckBox, setHoveredCheckBox] = react.useState(false);
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
    return (jsxRuntime.jsx(react$1.Tfoot, { children: table.getFooterGroups().map((footerGroup) => (jsxRuntime.jsxs(react$1.Tr, { display: "flex", children: [jsxRuntime.jsxs(react$1.Th
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
                    onMouseEnter: () => handleRowHover(true), onMouseLeave: () => handleRowHover(false), display: "grid", children: [isCheckBoxVisible() && (jsxRuntime.jsx(react$1.FormLabel, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsxRuntime.jsx(react$1.Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: table.getIsAllRowsSelected(),
                                // indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler() }) })), !isCheckBoxVisible() && (jsxRuntime.jsx(react$1.FormLabel, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsxRuntime.jsx(react$1.Box, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` }) }))] }), footerGroup.headers.map((header) => (jsxRuntime.jsx(react$1.Th, { padding: "0", colSpan: header.colSpan, 
                    // styling resize and pinning start
                    maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, left: header.column.getIsPinned()
                        ? `${header.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
                        : undefined, backgroundColor: header.column.getIsPinned() ? pinnedBgColor.light : undefined, position: header.column.getIsPinned() ? "sticky" : "relative", zIndex: header.column.getIsPinned() ? 1 : undefined, _dark: {
                        backgroundColor: header.column.getIsPinned()
                            ? pinnedBgColor.dark
                            : undefined,
                    }, 
                    // styling resize and pinning end
                    display: "grid", children: jsxRuntime.jsx(react$1.Menu, { children: jsxRuntime.jsx(react$1.MenuButton, { as: react$1.Box, padding: `${table.getDensityValue()}px`, display: "flex", alignItems: "center", justifyContent: "start", borderRadius: "0rem", _hover: { backgroundColor: "gray.100" }, children: jsxRuntime.jsxs(react$1.Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
                                        ? null
                                        : reactTable.flexRender(header.column.columnDef.footer, header.getContext()), jsxRuntime.jsx(react$1.Box, { children: header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [header.column.getIsSorted() === false && (
                                                // <UpDownIcon />
                                                jsxRuntime.jsx(jsxRuntime.Fragment, {})), header.column.getIsSorted() === "asc" && (jsxRuntime.jsx(icons.ChevronUpIcon, {})), header.column.getIsSorted() === "desc" && (jsxRuntime.jsx(icons.ChevronDownIcon, {}))] })) })] }) }) }) }, crypto.randomUUID())))] }, crypto.randomUUID()))) }));
};

const TableHeader = ({ canResize, pinnedBgColor = { light: "gray.50", dark: "gray.700" }, }) => {
    const { table } = useDataTable();
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredCheckBox, setHoveredCheckBox] = react.useState(false);
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
    return (jsxRuntime.jsx(react$1.Thead, { children: table.getHeaderGroups().map((headerGroup) => (jsxRuntime.jsxs(react$1.Tr, { display: "flex", children: [jsxRuntime.jsxs(react$1.Th
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
                    padding: `${table.getDensityValue()}px`, onMouseEnter: () => handleRowHover(true), onMouseLeave: () => handleRowHover(false), display: "grid", children: [isCheckBoxVisible() && (jsxRuntime.jsx(react$1.FormLabel, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsxRuntime.jsx(react$1.Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: table.getIsAllRowsSelected(),
                                // indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler() }) })), !isCheckBoxVisible() && (jsxRuntime.jsx(react$1.FormLabel, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsxRuntime.jsx(react$1.Box, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` }) }))] }), headerGroup.headers.map((header) => {
                    const resizeProps = {
                        onClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        cursor: "col-resize",
                    };
                    return (jsxRuntime.jsxs(react$1.Th, { padding: "0rem", colSpan: header.colSpan, 
                        // styling resize and pinning start
                        maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, left: header.column.getIsPinned()
                            ? `${header.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
                            : undefined, backgroundColor: header.column.getIsPinned() ? pinnedBgColor.light : undefined, position: header.column.getIsPinned() ? "sticky" : "relative", zIndex: header.column.getIsPinned() ? 1 : undefined, _dark: {
                            backgroundColor: header.column.getIsPinned()
                                ? pinnedBgColor.dark
                                : undefined,
                        }, 
                        // styling resize and pinning end
                        display: "grid", children: [jsxRuntime.jsxs(react$1.Menu, { children: [jsxRuntime.jsx(react$1.MenuButton, { as: react$1.Box, padding: `${table.getDensityValue()}px`, display: "flex", alignItems: "center", justifyContent: "start", borderRadius: "0rem", _hover: { backgroundColor: "gray.100" }, children: jsxRuntime.jsxs(react$1.Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
                                                    ? null
                                                    : reactTable.flexRender(header.column.columnDef.header, header.getContext()), jsxRuntime.jsx(react$1.Box, { children: header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [header.column.getIsSorted() === false && (jsxRuntime.jsx(jsxRuntime.Fragment, {})), header.column.getIsSorted() === "asc" && (jsxRuntime.jsx(icons.ChevronUpIcon, {})), header.column.getIsSorted() === "desc" && (jsxRuntime.jsx(icons.ChevronDownIcon, {}))] })) }), jsxRuntime.jsx(react$1.Box, { children: header.column.getIsFiltered() && jsxRuntime.jsx(md.MdFilterListAlt, {}) })] }) }), jsxRuntime.jsx(react$1.Portal, { children: jsxRuntime.jsxs(react$1.MenuList, { children: [!header.column.getIsPinned() && (jsxRuntime.jsx(react$1.MenuItem, { icon: jsxRuntime.jsx(md.MdPushPin, {}), onClick: () => {
                                                        header.column.pin("left");
                                                    }, children: "Pin Column" })), header.column.getIsPinned() && (jsxRuntime.jsx(react$1.MenuItem, { icon: jsxRuntime.jsx(md.MdCancel, {}), onClick: () => {
                                                        header.column.pin(false);
                                                    }, children: "Cancel Pin" })), header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(react$1.MenuItem, { icon: jsxRuntime.jsx(md.MdSort, {}), onClick: () => {
                                                                header.column.toggleSorting();
                                                            }, children: "Toggle Sorting" }), header.column.getIsSorted() && (jsxRuntime.jsx(react$1.MenuItem, { icon: jsxRuntime.jsx(io.IoMdClose, {}), onClick: () => {
                                                                header.column.clearSorting();
                                                            }, children: "Clear Sorting" }))] }))] }) })] }), canResize && (jsxRuntime.jsx(react$1.Box, { borderRight: "0.2rem solid", borderRightColor: header.column.getIsResizing() ? "gray.700" : "transparent", position: "absolute", right: "0", top: "0", height: "100%", width: "5px", userSelect: "none", style: { touchAction: "none" }, _hover: {
                                    borderRightColor: header.column.getIsResizing()
                                        ? "gray.700"
                                        : "gray.400",
                                }, ...resizeProps }))] }, crypto.randomUUID()));
                })] }, crypto.randomUUID()))) }));
};

const TablePagination = ({}) => {
    const { firstPage, getCanPreviousPage, previousPage, getState, nextPage, getCanNextPage, lastPage, } = useDataTable().table;
    return (jsxRuntime.jsxs(react$1.ButtonGroup, { isAttached: true, children: [jsxRuntime.jsx(react$1.IconButton, { icon: jsxRuntime.jsx(md.MdFirstPage, {}), onClick: () => firstPage(), isDisabled: !getCanPreviousPage(), "aria-label": "first-page", variant: "ghost" }), jsxRuntime.jsx(react$1.IconButton, { icon: jsxRuntime.jsx(md.MdArrowBack, {}), onClick: () => previousPage(), isDisabled: !getCanPreviousPage(), "aria-label": "previous-page", variant: "ghost" }), jsxRuntime.jsx(react$1.Button, { variant: "ghost", onClick: () => { }, disabled: !getCanPreviousPage(), children: getState().pagination.pageIndex + 1 }), jsxRuntime.jsx(react$1.IconButton, { onClick: () => nextPage(), isDisabled: !getCanNextPage(), "aria-label": "next-page", variant: "ghost", children: jsxRuntime.jsx(md.MdArrowForward, {}) }), jsxRuntime.jsx(react$1.IconButton, { onClick: () => lastPage(), isDisabled: !getCanNextPage(), "aria-label": "last-page", variant: "ghost", children: jsxRuntime.jsx(md.MdLastPage, {}) })] }));
};

const DefaultTable = ({ totalText = "Total:", showFilter = false, fitTableWidth = false, fitTableHeight = false, isMobile = false, }) => {
    return (jsxRuntime.jsxs(react$1.Grid, { templateRows: "auto 1fr auto", templateColumns: "1fr 1fr", width: fitTableWidth ? "fit-content" : "100%", height: fitTableHeight ? "fit-content" : "100%", justifySelf: "center", alignSelf: "center", children: [jsxRuntime.jsxs(react$1.Flex, { justifyContent: "space-between", gridColumn: "1 / span 2", children: [jsxRuntime.jsx(react$1.Box, { children: jsxRuntime.jsx(EditViewButton, { text: isMobile ? "View" : undefined, icon: jsxRuntime.jsx(md.MdOutlineViewColumn, {}) }) }), jsxRuntime.jsx(react$1.Flex, { gap: "1rem", justifySelf: "end", children: showFilter && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(GlobalFilter, {}), jsxRuntime.jsx(EditFilterButton, { text: isMobile ? "Advanced Filter" : undefined })] })) })] }), jsxRuntime.jsx(react$1.Box, { overflow: "auto", gridColumn: "1 / span 2", width: "100%", height: "100%", children: jsxRuntime.jsxs(Table, { variant: "striped", children: [jsxRuntime.jsx(TableHeader, { canResize: true }), jsxRuntime.jsx(TableBody, {}), jsxRuntime.jsx(TableFooter, {})] }) }), jsxRuntime.jsxs(react$1.Flex, { gap: "1rem", alignItems: "center", children: [jsxRuntime.jsx(PageSizeControl, {}), jsxRuntime.jsxs(react$1.Flex, { children: [jsxRuntime.jsx(react$1.Text, { paddingRight: "0.5rem", children: totalText }), jsxRuntime.jsx(RowCountText, {})] })] }), jsxRuntime.jsx(react$1.Box, { justifySelf: "end", children: jsxRuntime.jsx(TablePagination, {}) })] }));
};

const DensityToggleButton = ({ text, icon = jsxRuntime.jsx(ai.AiOutlineColumnWidth, {}), }) => {
    const { table } = useDataTable();
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!text === false && (jsxRuntime.jsx(react$1.IconButton, { variant: "ghost", "aria-label": "Toggle Density", icon: icon, onClick: () => {
                    table.toggleDensity();
                } })), !!text !== false && (jsxRuntime.jsx(react$1.Button, { leftIcon: icon, variant: "ghost", "aria-label": "Toggle Density", onClick: () => {
                    table.toggleDensity();
                }, children: text }))] }));
};

const ColumnOrderChanger = ({ columns }) => {
    const [order, setOrder] = react.useState([]);
    const [originalOrder, setOriginalOrder] = react.useState([]);
    const { table } = useDataTable();
    const handleChangeOrder = (startIndex, endIndex) => {
        const newOrder = Array.from(order);
        const [removed] = newOrder.splice(startIndex, 1);
        newOrder.splice(endIndex, 0, removed);
        setOrder(newOrder);
    };
    react.useEffect(() => {
        setOrder(columns);
    }, [columns]);
    react.useEffect(() => {
        if (originalOrder.length > 0) {
            return;
        }
        if (columns.length <= 0) {
            return;
        }
        setOriginalOrder(columns);
    }, [columns]);
    return (jsxRuntime.jsxs(react$1.Flex, { gap: "0.5rem", flexFlow: "column", children: [jsxRuntime.jsx(react$1.Flex, { gap: "0.5rem", flexFlow: "column", children: order.map((columnId, index) => (jsxRuntime.jsxs(react$1.Flex, { gap: "0.5rem", alignItems: "center", justifyContent: "space-between", children: [jsxRuntime.jsx(react$1.IconButton, { onClick: () => {
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
                            return jsxRuntime.jsx(jsxRuntime.Fragment, { children: displayName });
                        }), jsxRuntime.jsx(react$1.IconButton, { onClick: () => {
                                const nextIndex = index + 1;
                                if (nextIndex < order.length) {
                                    handleChangeOrder(index, nextIndex);
                                }
                            }, disabled: index === order.length - 1, "aria-label": "", children: jsxRuntime.jsx(md.MdArrowDownward, {}) })] }, columnId))) }), jsxRuntime.jsxs(react$1.Flex, { gap: "0.25rem", children: [jsxRuntime.jsx(react$1.Button, { onClick: () => {
                            table.setColumnOrder(order);
                        }, children: "Apply" }), jsxRuntime.jsx(react$1.Button, { onClick: () => {
                            table.setColumnOrder(originalOrder);
                        }, children: "Reset" })] })] }));
};
const TableOrderer = () => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(ColumnOrderChanger, { columns: table.getState().columnOrder }) }));
};

const EditOrderButton = ({ text, icon = jsxRuntime.jsx(md.MdOutlineMoveDown, {}), title = "Change Order", }) => {
    const orderModal = react$1.useDisclosure();
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!text === false && (jsxRuntime.jsx(react$1.IconButton, { icon: icon, variant: "ghost", onClick: orderModal.onOpen, "aria-label": "change order" })), !!text !== false && (jsxRuntime.jsx(react$1.Button, { leftIcon: icon, variant: "ghost", onClick: orderModal.onOpen, children: text })), jsxRuntime.jsxs(react$1.Modal, { isOpen: orderModal.isOpen, onClose: orderModal.onClose, size: ["full", "full", "md", "md"], children: [jsxRuntime.jsx(react$1.ModalOverlay, {}), jsxRuntime.jsxs(react$1.ModalContent, { padding: "0 0 1rem 0", children: [jsxRuntime.jsx(react$1.ModalHeader, { children: title }), jsxRuntime.jsx(react$1.ModalCloseButton, {}), jsxRuntime.jsx(react$1.ModalBody, { children: jsxRuntime.jsx(react$1.Flex, { flexFlow: "column", gap: "0.25rem", children: jsxRuntime.jsx(TableOrderer, {}) }) })] })] })] }));
};

const ResetSortingButton = ({ text = "Reset Sorting", }) => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(react$1.Button, { onClick: () => {
            table.resetSorting();
        }, children: text }));
};

const TableSorter = () => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: table.getHeaderGroups().map((headerGroup) => (jsxRuntime.jsx(jsxRuntime.Fragment, { children: headerGroup.headers.map((header) => {
                const displayName = header.column.columnDef.meta === undefined
                    ? header.column.id
                    : header.column.columnDef.meta.displayName;
                return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: header.column.getCanSort() && (jsxRuntime.jsxs(react$1.Flex, { alignItems: "center", gap: "0.5rem", padding: "0.5rem", children: [jsxRuntime.jsx(react$1.Text, { children: displayName }), jsxRuntime.jsxs(react$1.Button, { variant: "ghost", onClick: (e) => {
                                    header.column.toggleSorting();
                                }, children: [header.column.getIsSorted() === false && (
                                    // <Text>To No sort</Text>
                                    jsxRuntime.jsx(icons.UpDownIcon, {})), header.column.getIsSorted() === "asc" && (
                                    // <Text>To asc</Text>
                                    jsxRuntime.jsx(icons.ChevronDownIcon, {})), header.column.getIsSorted() === "desc" && (
                                    // <Text>To desc</Text>
                                    jsxRuntime.jsx(icons.ChevronUpIcon, {}))] }), header.column.getIsSorted() && (jsxRuntime.jsx(react$1.Button, { onClick: (e) => {
                                    header.column.clearSorting();
                                }, children: jsxRuntime.jsx(icons.CloseIcon, {}) }))] })) }));
            }) }))) }));
};

const EditSortingButton = ({ text, icon = jsxRuntime.jsx(md.MdOutlineSort, {}), title = "Edit Sorting", }) => {
    const sortingModal = react$1.useDisclosure();
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!text === false && (jsxRuntime.jsx(react$1.IconButton, { icon: icon, variant: "ghost", onClick: sortingModal.onOpen, "aria-label": "change sorting" })), !!text !== false && (jsxRuntime.jsx(react$1.Button, { leftIcon: icon, variant: "ghost", onClick: sortingModal.onOpen, children: text })), jsxRuntime.jsxs(react$1.Modal, { isOpen: sortingModal.isOpen, onClose: sortingModal.onClose, size: ["full", "full", "md", "md"], children: [jsxRuntime.jsx(react$1.ModalOverlay, {}), jsxRuntime.jsxs(react$1.ModalContent, { padding: "0 0 1rem 0", children: [jsxRuntime.jsx(react$1.ModalHeader, { children: title }), jsxRuntime.jsx(react$1.ModalCloseButton, {}), jsxRuntime.jsx(react$1.ModalBody, { children: jsxRuntime.jsxs(react$1.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(TableSorter, {}), jsxRuntime.jsx(ResetSortingButton, {})] }) })] })] })] }));
};

const ResetSelectionButton = ({ text = "Reset Selection", }) => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(react$1.Button, { onClick: () => {
            table.resetRowSelection();
        }, children: text }));
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

const TableComponent = ({ render = () => {
    throw Error("Not Implemented");
}, }) => {
    const { table } = useDataTable();
    return render(table);
};

const SelectAllRowsToggle = ({ selectAllIcon = jsxRuntime.jsx(md.MdOutlineChecklist, {}), clearAllIcon = jsxRuntime.jsx(md.MdClear, {}), selectAllText, clearAllText, }) => {
    const { table } = react.useContext(TableContext);
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!selectAllText === false && (jsxRuntime.jsx(react$1.IconButton, { icon: table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon, variant: "ghost", "aria-label": table.getIsAllRowsSelected() ? clearAllText : selectAllText, onClick: (event) => {
                    table.getToggleAllRowsSelectedHandler()(event);
                } })), !!selectAllText !== false && (jsxRuntime.jsx(react$1.Button, { leftIcon: table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon, variant: "ghost", onClick: (event) => {
                    table.getToggleAllRowsSelectedHandler()(event);
                }, children: table.getIsAllRowsSelected() ? clearAllText : selectAllText }))] }));
};

const TableSelector = () => {
    const { table } = react.useContext(TableContext);
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [table.getSelectedRowModel().rows.length > 0 && (jsxRuntime.jsxs(react$1.Button, { onClick: () => { }, variant: "ghost", display: "flex", gap: "0.25rem", children: [jsxRuntime.jsx(react$1.Box, { fontSize: "sm", children: `${table.getSelectedRowModel().rows.length}` }), jsxRuntime.jsx(react$1.Icon, { as: io.IoMdCheckbox })] })), !table.getIsAllPageRowsSelected() && jsxRuntime.jsx(SelectAllRowsToggle, {}), table.getSelectedRowModel().rows.length > 0 && (jsxRuntime.jsx(react$1.IconButton, { variant: "ghost", icon: jsxRuntime.jsx(react$1.Icon, { as: md.MdClear }), onClick: () => {
                    table.resetRowSelection();
                }, "aria-label": "reset selection" }))] }));
};

const TextCell = ({ label, noOfLines = [1], padding = "0rem", children, tooltipProps, ...props }) => {
    if (label) {
        return (jsxRuntime.jsx(react$1.Box, { padding: padding, children: jsxRuntime.jsx(react$1.Tooltip, { label: jsxRuntime.jsx(react$1.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", noOfLines: [5], children: label }), placement: "auto", ...tooltipProps, children: jsxRuntime.jsx(react$1.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-all", noOfLines: noOfLines, ...props, children: children }) }) }));
    }
    return (jsxRuntime.jsx(react$1.Box, { padding: padding, children: jsxRuntime.jsx(react$1.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-all", noOfLines: noOfLines, ...props, children: children }) }));
};

exports.DataTable = DataTable;
exports.DataTableServer = DataTableServer;
exports.DefaultTable = DefaultTable;
exports.DensityToggleButton = DensityToggleButton;
exports.EditFilterButton = EditFilterButton;
exports.EditOrderButton = EditOrderButton;
exports.EditSortingButton = EditSortingButton;
exports.EditViewButton = EditViewButton;
exports.GlobalFilter = GlobalFilter;
exports.PageSizeControl = PageSizeControl;
exports.ResetFilteringButton = ResetFilteringButton;
exports.ResetSelectionButton = ResetSelectionButton;
exports.ResetSortingButton = ResetSortingButton;
exports.RowCountText = RowCountText;
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCardContainer = TableCardContainer;
exports.TableCards = TableCards;
exports.TableComponent = TableComponent;
exports.TableFilter = TableFilter;
exports.TableFooter = TableFooter;
exports.TableHeader = TableHeader;
exports.TableOrderer = TableOrderer;
exports.TablePagination = TablePagination;
exports.TableSelector = TableSelector;
exports.TableSorter = TableSorter;
exports.TableViewer = TableViewer;
exports.TextCell = TextCell;
exports.useDataFromUrl = useDataFromUrl;
exports.useDataTable = useDataTable;
