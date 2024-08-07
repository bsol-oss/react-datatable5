'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('@chakra-ui/react');
var ai = require('react-icons/ai');
var md = require('react-icons/md');
var icons = require('@chakra-ui/icons');
var react$1 = require('react');
var io = require('react-icons/io');
var reactTable = require('@tanstack/react-table');
var matchSorterUtils = require('@tanstack/match-sorter-utils');
var axios = require('axios');
var table = require('@chakra-ui/table');
var bs = require('react-icons/bs');
var gr = require('react-icons/gr');
var io5 = require('react-icons/io5');
var reactBeautifulDnd = require('react-beautiful-dnd');
var fa = require('react-icons/fa');

const DensityToggleButton = ({ text, icon = jsxRuntime.jsx(ai.AiOutlineColumnWidth, {}), }) => {
    const { table } = useDataTable();
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!text === false && (jsxRuntime.jsx(react.IconButton, { variant: "ghost", "aria-label": "Toggle Density", icon: icon, onClick: () => {
                    table.toggleDensity();
                } })), !!text !== false && (jsxRuntime.jsx(react.Button, { leftIcon: icon, variant: "ghost", "aria-label": "Toggle Density", onClick: () => {
                    table.toggleDensity();
                }, children: text }))] }));
};

const EditFilterButton = ({ text, title = "Edit Filter", closeText = "Close", resetText = "Reset", icon = jsxRuntime.jsx(md.MdFilterAlt, {}), ...props }) => {
    const filterModal = react.useDisclosure();
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!text === false && (jsxRuntime.jsx(react.IconButton, { icon: icon, variant: "ghost", onClick: filterModal.onOpen, "aria-label": "filter", ...props })), !!text !== false && (jsxRuntime.jsx(react.Button, { leftIcon: icon, variant: "ghost", onClick: filterModal.onOpen, ...props, children: text })), jsxRuntime.jsxs(react.Modal, { isOpen: filterModal.isOpen, onClose: filterModal.onClose, size: ["full", "full", "md", "md"], children: [jsxRuntime.jsx(react.ModalOverlay, {}), jsxRuntime.jsxs(react.ModalContent, { children: [jsxRuntime.jsx(react.ModalHeader, { children: title }), jsxRuntime.jsx(react.ModalCloseButton, {}), jsxRuntime.jsx(react.ModalBody, { children: jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "1rem", children: [jsxRuntime.jsx(TableFilter, {}), jsxRuntime.jsx(ResetFilteringButton, { text: resetText })] }) }), jsxRuntime.jsx(react.ModalFooter, { children: jsxRuntime.jsx(react.Button, { onClick: filterModal.onClose, children: closeText }) })] })] })] }));
};

const EditOrderButton = ({ text, icon = jsxRuntime.jsx(md.MdOutlineMoveDown, {}), title = "Change Order", }) => {
    const orderModal = react.useDisclosure();
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!text === false && (jsxRuntime.jsx(react.IconButton, { icon: icon, variant: "ghost", onClick: orderModal.onOpen, "aria-label": "change order" })), !!text !== false && (jsxRuntime.jsx(react.Button, { leftIcon: icon, variant: "ghost", onClick: orderModal.onOpen, children: text })), jsxRuntime.jsxs(react.Modal, { isOpen: orderModal.isOpen, onClose: orderModal.onClose, size: ["full", "full", "md", "md"], children: [jsxRuntime.jsx(react.ModalOverlay, {}), jsxRuntime.jsxs(react.ModalContent, { padding: "0 0 1rem 0", children: [jsxRuntime.jsx(react.ModalHeader, { children: title }), jsxRuntime.jsx(react.ModalCloseButton, {}), jsxRuntime.jsx(react.ModalBody, { children: jsxRuntime.jsx(react.Flex, { flexFlow: "column", gap: "0.25rem", children: jsxRuntime.jsx(TableOrderer, {}) }) })] })] })] }));
};

const TableContext = react$1.createContext({
    table: {},
    refreshData: () => { },
    globalFilter: "",
    setGlobalFilter: () => { },
    loading: false,
    hasError: false,
});

const useDataTable = () => {
    const { table, refreshData, globalFilter, setGlobalFilter, loading, hasError, } = react$1.useContext(TableContext);
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
    const { table } = useDataTable();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: table.getHeaderGroups().map((headerGroup) => (jsxRuntime.jsx(jsxRuntime.Fragment, { children: headerGroup.headers.map((header) => {
                const displayName = header.column.columnDef.meta === undefined
                    ? header.column.id
                    : header.column.columnDef.meta.displayName;
                return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: header.column.getCanSort() && (jsxRuntime.jsxs(react.Flex, { alignItems: "center", gap: "0.5rem", padding: "0.5rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsxs(react.Button, { variant: "ghost", onClick: (e) => {
                                    header.column.toggleSorting();
                                }, children: [header.column.getIsSorted() === false && (
                                    // <Text>To No sort</Text>
                                    jsxRuntime.jsx(icons.UpDownIcon, {})), header.column.getIsSorted() === "asc" && (
                                    // <Text>To asc</Text>
                                    jsxRuntime.jsx(icons.ChevronDownIcon, {})), header.column.getIsSorted() === "desc" && (
                                    // <Text>To desc</Text>
                                    jsxRuntime.jsx(icons.ChevronUpIcon, {}))] }), header.column.getIsSorted() && (jsxRuntime.jsx(react.Button, { onClick: (e) => {
                                    header.column.clearSorting();
                                }, children: jsxRuntime.jsx(icons.CloseIcon, {}) }))] })) }));
            }) }))) }));
};

const EditSortingButton = ({ text, icon = jsxRuntime.jsx(md.MdOutlineSort, {}), title = "Edit Sorting", }) => {
    const sortingModal = react.useDisclosure();
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!text === false && (jsxRuntime.jsx(react.IconButton, { icon: icon, variant: "ghost", onClick: sortingModal.onOpen, "aria-label": "change sorting" })), !!text !== false && (jsxRuntime.jsx(react.Button, { leftIcon: icon, variant: "ghost", onClick: sortingModal.onOpen, children: text })), jsxRuntime.jsxs(react.Modal, { isOpen: sortingModal.isOpen, onClose: sortingModal.onClose, size: ["full", "full", "md", "md"], children: [jsxRuntime.jsx(react.ModalOverlay, {}), jsxRuntime.jsxs(react.ModalContent, { padding: "0 0 1rem 0", children: [jsxRuntime.jsx(react.ModalHeader, { children: title }), jsxRuntime.jsx(react.ModalCloseButton, {}), jsxRuntime.jsx(react.ModalBody, { children: jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(TableSorter, {}), jsxRuntime.jsx(ResetSortingButton, {})] }) })] })] })] }));
};

const EditViewButton = ({ text, icon = jsxRuntime.jsx(io.IoMdEye, {}), title = "Edit View", }) => {
    const viewModel = react.useDisclosure();
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!text === false && (jsxRuntime.jsx(react.IconButton, { icon: icon, variant: "ghost", onClick: viewModel.onOpen, "aria-label": "change sorting" })), !!text !== false && (jsxRuntime.jsx(react.Button, { leftIcon: icon, variant: "ghost", onClick: viewModel.onOpen, children: text })), jsxRuntime.jsxs(react.Modal, { isOpen: viewModel.isOpen, onClose: viewModel.onClose, size: ["full", "full", "md", "md"], children: [jsxRuntime.jsx(react.ModalOverlay, {}), jsxRuntime.jsxs(react.ModalContent, { padding: "0 0 1rem 0", children: [jsxRuntime.jsx(react.ModalHeader, { children: title }), jsxRuntime.jsx(react.ModalCloseButton, {}), jsxRuntime.jsx(react.ModalBody, { children: jsxRuntime.jsx(TableViewer, {}) })] })] })] }));
};

const PageSizeControl = ({ pageSizes = [10, 20, 30, 40, 50], }) => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(react.Menu, { children: [jsxRuntime.jsx(react.MenuButton, { as: react.Button, variant: "ghost", rightIcon: jsxRuntime.jsx(icons.ChevronDownIcon, {}), gap: "0.5rem", children: table.getState().pagination.pageSize }), jsxRuntime.jsx(react.MenuList, { children: pageSizes.map((pageSize) => (jsxRuntime.jsx(react.MenuItem, { onClick: () => {
                            table.setPageSize(Number(pageSize));
                        }, children: pageSize }, crypto.randomUUID()))) })] }) }));
};

const ResetFilteringButton = ({ text = "Reset Filtering", }) => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(react.Button, { onClick: () => {
            table.resetColumnFilters();
        }, children: text }));
};

const ResetSelectionButton = ({ text = "Reset Selection", }) => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(react.Button, { onClick: () => {
            table.resetRowSelection();
        }, children: text }));
};

const ResetSortingButton = ({ text = "Reset Sorting", }) => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(react.Button, { onClick: () => {
            table.resetSorting();
        }, children: text }));
};

const RowCountText = () => {
    const { table } = useDataTable();
    return jsxRuntime.jsx(react.Text, { children: table.getRowCount() });
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
}, sorting: defaultSorting = [], rowSelection: defaultRowSelection = {}, columnVisibility: defaultColumnVisibility = {}, children, }) => {
    const [columnOrder, setColumnOrder] = react$1.useState(defaultColumnOrder);
    const [globalFilter, setGlobalFilter] = react$1.useState(defaultGlobalFilter);
    const [densityState, setDensity] = react$1.useState(density);
    const [rowSelection, setRowSelection] = react$1.useState(defaultRowSelection);
    const [columnVisibility, setColumnVisibility] = react$1.useState(defaultColumnVisibility);
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
    react$1.useEffect(() => {
        setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
    }, []);
    react$1.useEffect(() => {
        onRowSelect(table.getState().rowSelection, data);
    }, [table.getState().rowSelection]);
    return (jsxRuntime.jsx(TableContext.Provider, { value: {
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

const useDataFromUrl = ({ url, params = {}, disableFirstFetch = false, onFetchSuccess = () => { }, defaultData, }) => {
    const [loading, setLoading] = react$1.useState(true);
    const [hasError, setHasError] = react$1.useState(false);
    const [data, setData] = react$1.useState(defaultData);
    const refreshData = async () => {
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
    react$1.useEffect(() => {
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
    const [sorting, setSorting] = react$1.useState(defaultSorting);
    const [columnFilters, setColumnFilters] = react$1.useState(defaultColumnFilter); // can set initial column filter state here
    const [pagination, setPagination] = react$1.useState(defaultPagination);
    const [rowSelection, setRowSelection] = react$1.useState(defaultRowSelection);
    const [columnOrder, setColumnOrder] = react$1.useState(defaultColumnOrder);
    const [globalFilter, setGlobalFilter] = react$1.useState(defaultGlobalFilter);
    const [densityState, setDensity] = react$1.useState(density);
    const [columnVisibility, setColumnVisibility] = react$1.useState(defaultColumnVisibility);
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
    react$1.useEffect(() => {
        refreshData();
    }, [pagination, sorting, columnFilters, globalFilter, url]);
    react$1.useEffect(() => {
        setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
    }, []);
    react$1.useEffect(() => {
        onRowSelect(table.getState().rowSelection, data.results);
    }, [table.getState().rowSelection]);
    return (jsxRuntime.jsx(TableContext.Provider, { value: {
            table: { ...table },
            refreshData: refreshData,
            globalFilter,
            setGlobalFilter,
            loading: loading,
            hasError: hasError,
        }, children: children }));
};

const TableBody = ({ pinnedBgColor = { light: "gray.50", dark: "gray.700" }, }) => {
    const { table: table$1 } = react$1.useContext(TableContext);
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredRow, setHoveredRow] = react$1.useState(-1);
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
    const { table: table$1 } = react$1.useContext(TableContext);
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
        display: "grid", children: [!isCheckBoxVisible(index, row) && (jsxRuntime.jsx(react.Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` })), isCheckBoxVisible(index, row) && (jsxRuntime.jsx(react.FormLabel, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsxRuntime.jsx(react.Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    // indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler() }) }))] }));
};

const TableControls = ({ totalText = "Total:", showFilter = false, fitTableWidth = false, fitTableHeight = false, isMobile = false, children = jsxRuntime.jsx(jsxRuntime.Fragment, {}), showFilterName = false, showFilterTags = false, filterOptions = [], }) => {
    const { loading, hasError } = useDataTable();
    return (jsxRuntime.jsxs(react.Grid, { templateRows: "auto auto auto 1fr auto", templateColumns: "1fr 1fr", width: fitTableWidth ? "fit-content" : "100%", height: fitTableHeight ? "fit-content" : "100%", justifySelf: "center", alignSelf: "center", gap: "0.5rem", children: [jsxRuntime.jsxs(react.Flex, { justifyContent: "space-between", gridColumn: "1 / span 2", children: [jsxRuntime.jsx(react.Box, { children: jsxRuntime.jsx(EditViewButton, { text: isMobile ? undefined : "View", icon: jsxRuntime.jsx(md.MdOutlineViewColumn, {}) }) }), jsxRuntime.jsxs(react.Flex, { gap: "1rem", alignItems: "center", justifySelf: "end", children: [loading && jsxRuntime.jsx(react.Spinner, { size: "sm" }), hasError && (jsxRuntime.jsx(react.Tooltip, { label: "An error occurred while fetching data", children: jsxRuntime.jsx(react.Box, { children: jsxRuntime.jsx(react.Icon, { as: bs.BsExclamationCircleFill, color: "red.400" }) }) })), showFilter && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(GlobalFilter, {}), jsxRuntime.jsx(EditFilterButton, { text: isMobile ? undefined : "Advanced Filter" })] }))] })] }), jsxRuntime.jsx(react.Flex, { gridColumn: "1 / span 2", flexFlow: "column", gap: "0.5rem", children: filterOptions.map((column) => {
                    return (jsxRuntime.jsxs(react.Flex, { alignItems: "center", flexFlow: "wrap", gap: "0.5rem", children: [showFilterName && jsxRuntime.jsxs(react.Text, { children: [column, ":"] }), jsxRuntime.jsx(FilterOptions, { column: column })] }));
                }) }), jsxRuntime.jsx(react.Flex, { gridColumn: "1 / span 2", children: showFilterTags && jsxRuntime.jsx(TableFilterTags, {}) }), jsxRuntime.jsx(react.Box, { overflow: "auto", gridColumn: "1 / span 2", width: "100%", height: "100%", children: children }), jsxRuntime.jsxs(react.Flex, { gap: "1rem", alignItems: "center", children: [jsxRuntime.jsx(PageSizeControl, {}), jsxRuntime.jsxs(react.Flex, { children: [jsxRuntime.jsx(react.Text, { paddingRight: "0.5rem", children: totalText }), jsxRuntime.jsx(RowCountText, {})] })] }), jsxRuntime.jsx(react.Box, { justifySelf: "end", children: jsxRuntime.jsx(TablePagination, {}) })] }));
};

const TableFooter = ({ pinnedBgColor = { light: "gray.50", dark: "gray.700" }, }) => {
    const table = useDataTable().table;
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredCheckBox, setHoveredCheckBox] = react$1.useState(false);
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
    return (jsxRuntime.jsx(react.Tfoot, { children: table.getFooterGroups().map((footerGroup) => (jsxRuntime.jsxs(react.Tr, { display: "flex", children: [jsxRuntime.jsxs(react.Th
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
                    onMouseEnter: () => handleRowHover(true), onMouseLeave: () => handleRowHover(false), display: "grid", children: [isCheckBoxVisible() && (jsxRuntime.jsx(react.FormLabel, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsxRuntime.jsx(react.Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: table.getIsAllRowsSelected(),
                                // indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler() }) })), !isCheckBoxVisible() && (jsxRuntime.jsx(react.Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` }))] }), footerGroup.headers.map((header) => (jsxRuntime.jsx(react.Th, { padding: "0", colSpan: header.colSpan, 
                    // styling resize and pinning start
                    maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, left: header.column.getIsPinned()
                        ? `${header.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
                        : undefined, backgroundColor: header.column.getIsPinned() ? pinnedBgColor.light : undefined, position: header.column.getIsPinned() ? "sticky" : "relative", zIndex: header.column.getIsPinned() ? 1 : undefined, _dark: {
                        backgroundColor: header.column.getIsPinned()
                            ? pinnedBgColor.dark
                            : undefined,
                    }, 
                    // styling resize and pinning end
                    display: "grid", children: jsxRuntime.jsx(react.Menu, { children: jsxRuntime.jsx(react.MenuButton, { as: react.Box, padding: `${table.getDensityValue()}px`, display: "flex", alignItems: "center", justifyContent: "start", borderRadius: "0rem", _hover: { backgroundColor: "gray.100" }, children: jsxRuntime.jsxs(react.Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
                                        ? null
                                        : reactTable.flexRender(header.column.columnDef.footer, header.getContext()), jsxRuntime.jsx(react.Box, { children: header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [header.column.getIsSorted() === false && (
                                                // <UpDownIcon />
                                                jsxRuntime.jsx(jsxRuntime.Fragment, {})), header.column.getIsSorted() === "asc" && (jsxRuntime.jsx(icons.ChevronUpIcon, {})), header.column.getIsSorted() === "desc" && (jsxRuntime.jsx(icons.ChevronDownIcon, {}))] })) })] }) }) }) }, crypto.randomUUID())))] }, crypto.randomUUID()))) }));
};

const TableHeader = ({ canResize, pinnedBgColor = { light: "gray.50", dark: "gray.700" }, }) => {
    const { table } = useDataTable();
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredCheckBox, setHoveredCheckBox] = react$1.useState(false);
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
    return (jsxRuntime.jsx(react.Thead, { children: table.getHeaderGroups().map((headerGroup) => (jsxRuntime.jsxs(react.Tr, { display: "flex", children: [jsxRuntime.jsxs(react.Th
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
                    padding: `${table.getDensityValue()}px`, onMouseEnter: () => handleRowHover(true), onMouseLeave: () => handleRowHover(false), display: "grid", children: [isCheckBoxVisible() && (jsxRuntime.jsx(react.FormLabel, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsxRuntime.jsx(react.Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: table.getIsAllRowsSelected(),
                                // indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler() }) })), !isCheckBoxVisible() && (jsxRuntime.jsx(react.Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` }))] }), headerGroup.headers.map((header) => {
                    const resizeProps = {
                        onClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        cursor: "col-resize",
                    };
                    return (jsxRuntime.jsxs(react.Th, { padding: "0rem", colSpan: header.colSpan, 
                        // styling resize and pinning start
                        maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, left: header.column.getIsPinned()
                            ? `${header.getStart("left") + SELECTION_BOX_WIDTH + table.getDensityValue() * 2}px`
                            : undefined, backgroundColor: header.column.getIsPinned() ? pinnedBgColor.light : undefined, position: header.column.getIsPinned() ? "sticky" : "relative", zIndex: header.column.getIsPinned() ? 1 : undefined, _dark: {
                            backgroundColor: header.column.getIsPinned()
                                ? pinnedBgColor.dark
                                : undefined,
                        }, 
                        // styling resize and pinning end
                        display: "grid", children: [jsxRuntime.jsxs(react.Menu, { children: [jsxRuntime.jsx(react.MenuButton, { as: react.Box, padding: `${table.getDensityValue()}px`, display: "flex", alignItems: "center", justifyContent: "start", borderRadius: "0rem", _hover: { backgroundColor: "gray.100" }, children: jsxRuntime.jsxs(react.Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
                                                    ? null
                                                    : reactTable.flexRender(header.column.columnDef.header, header.getContext()), jsxRuntime.jsx(react.Box, { children: header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [header.column.getIsSorted() === false && jsxRuntime.jsx(jsxRuntime.Fragment, {}), header.column.getIsSorted() === "asc" && (jsxRuntime.jsx(icons.ChevronUpIcon, {})), header.column.getIsSorted() === "desc" && (jsxRuntime.jsx(icons.ChevronDownIcon, {}))] })) }), jsxRuntime.jsx(react.Box, { children: header.column.getIsFiltered() && jsxRuntime.jsx(md.MdFilterListAlt, {}) })] }) }), jsxRuntime.jsx(react.Portal, { children: jsxRuntime.jsxs(react.MenuList, { children: [!header.column.getIsPinned() && (jsxRuntime.jsx(react.MenuItem, { icon: jsxRuntime.jsx(md.MdPushPin, {}), onClick: () => {
                                                        header.column.pin("left");
                                                    }, children: "Pin Column" })), header.column.getIsPinned() && (jsxRuntime.jsx(react.MenuItem, { icon: jsxRuntime.jsx(md.MdCancel, {}), onClick: () => {
                                                        header.column.pin(false);
                                                    }, children: "Cancel Pin" })), header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(react.MenuItem, { icon: jsxRuntime.jsx(gr.GrAscend, {}), onClick: () => {
                                                                table.setSorting((state) => {
                                                                    return [
                                                                        ...state.filter((column) => {
                                                                            return column.id !== header.id;
                                                                        }),
                                                                        { id: header.id, desc: false },
                                                                    ];
                                                                });
                                                            }, children: "Sort Ascending" }), jsxRuntime.jsx(react.MenuItem, { icon: jsxRuntime.jsx(gr.GrDescend, {}), onClick: () => {
                                                                table.setSorting((state) => {
                                                                    return [
                                                                        ...state.filter((column) => {
                                                                            return column.id !== header.id;
                                                                        }),
                                                                        { id: header.id, desc: true },
                                                                    ];
                                                                });
                                                            }, children: "Sort Descending" }), header.column.getIsSorted() && (jsxRuntime.jsx(react.MenuItem, { icon: jsxRuntime.jsx(md.MdClear, {}), onClick: () => {
                                                                header.column.clearSorting();
                                                            }, children: "Clear Sorting" }))] }))] }) })] }), canResize && (jsxRuntime.jsx(react.Box, { borderRight: "0.2rem solid", borderRightColor: header.column.getIsResizing() ? "gray.700" : "transparent", position: "absolute", right: "0", top: "0", height: "100%", width: "5px", userSelect: "none", style: { touchAction: "none" }, _hover: {
                                    borderRightColor: header.column.getIsResizing()
                                        ? "gray.700"
                                        : "gray.400",
                                }, ...resizeProps }))] }, crypto.randomUUID()));
                })] }, crypto.randomUUID()))) }));
};

const DefaultTable = ({ totalText = "Total:", showFilter = false, showFooter = false, fitTableWidth = false, fitTableHeight = false, isMobile = false, filterOptions = [], showFilterTags = false, showFilterName = false, }) => {
    return (jsxRuntime.jsx(TableControls, { totalText: totalText, showFilter: showFilter, fitTableWidth: fitTableWidth, fitTableHeight: fitTableHeight, isMobile: isMobile, filterOptions: filterOptions, showFilterName: showFilterName, showFilterTags: showFilterTags, children: jsxRuntime.jsxs(Table, { variant: "striped", children: [jsxRuntime.jsx(TableHeader, { canResize: true }), jsxRuntime.jsx(TableBody, {}), showFooter && jsxRuntime.jsx(TableFooter, {})] }) }));
};

const Table = ({ children, showLoading = false, loadingComponent = jsxRuntime.jsx(jsxRuntime.Fragment, { children: "Loading..." }), ...props }) => {
    const { table, loading } = useDataTable();
    if (showLoading) {
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [loading && loadingComponent, !loading && (jsxRuntime.jsx(react.Table, { width: table.getCenterTotalSize(), overflow: "auto", ...props, children: children }))] }));
    }
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(react.Table, { width: table.getCenterTotalSize(), overflowX: "auto", ...props, children: children }) }));
};

const TableCardContainer = ({ children, ...props }) => {
    return (jsxRuntime.jsx(react.Grid, { gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr 1fr"], gap: "0.5rem", ...props, children: children }));
};

const TableCards = ({ isSelectable = false }) => {
    const { table } = react$1.useContext(TableContext);
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: table.getRowModel().rows.map((row) => {
            return (jsxRuntime.jsx(react.Card, { children: jsxRuntime.jsxs(react.CardBody, { display: "flex", flexFlow: "column", gap: "0.5rem", children: [isSelectable && (jsxRuntime.jsx(react.Checkbox, { isChecked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            // indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler() })), row.getVisibleCells().map((cell) => {
                            return (jsxRuntime.jsx(react.Box, { children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) }, crypto.randomUUID()));
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
    return (jsxRuntime.jsx(react.Box, { p: '1rem', children: jsxRuntime.jsxs(react.VStack, { spacing: 4, children: [jsxRuntime.jsxs(react.FormControl, { children: [jsxRuntime.jsx(react.FormLabel, { htmlFor: "start-date", children: "Start Date" }), jsxRuntime.jsx(react.Input, { id: "start-date", type: "date", value: startDate, onChange: (e) => setStartDate(e.target.value) })] }), jsxRuntime.jsxs(react.FormControl, { children: [jsxRuntime.jsx(react.FormLabel, { htmlFor: "end-date", children: "End Date" }), jsxRuntime.jsx(react.Input, { id: "end-date", type: "date", value: endDate, onChange: (e) => setEndDate(e.target.value) })] })] }) }));
};

const RangeFilter = ({ range, setRange, defaultValue, min, max, step, }) => {
    return (jsxRuntime.jsx(react.Box, { p: 8, children: jsxRuntime.jsxs(react.VStack, { spacing: 4, children: [jsxRuntime.jsxs(react.Text, { children: ["Selected Range: ", range[0], " - ", range[1]] }), jsxRuntime.jsxs(react.RangeSlider, { "aria-label": ["min", "max"], defaultValue: defaultValue, min: min, max: max, step: step, onChangeEnd: (val) => setRange(val), children: [jsxRuntime.jsx(react.RangeSliderTrack, { children: jsxRuntime.jsx(react.RangeSliderFilledTrack, {}) }), jsxRuntime.jsx(react.RangeSliderThumb, { index: 0 }), jsxRuntime.jsx(react.RangeSliderThumb, { index: 1 })] })] }) }));
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
    return (jsxRuntime.jsx(react.Flex, { flexFlow: "wrap", p: "0.5rem", gap: "0.5rem", children: availableTags.map((tag) => (jsxRuntime.jsx(react.WrapItem, { children: jsxRuntime.jsxs(react.Tag, { size: "lg", variant: selectedTags.includes(tag) ? "solid" : "outline", cursor: "pointer", onClick: () => toggleTag(tag), children: [jsxRuntime.jsx(react.TagLabel, { children: tag }), selectedTags.includes(tag) && jsxRuntime.jsx(react.TagCloseButton, {})] }) }, tag))) }));
};

function Filter({ column }) {
    const { filterVariant } = column.columnDef.meta ?? {};
    const displayName = column.columnDef.meta?.displayName ?? column.id;
    const filterOptions = column.columnDef.meta?.filterOptions ?? [];
    if (column.columns.length > 0) {
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), column.columns.map((column) => {
                    return jsxRuntime.jsx(Filter, { column: column }, column.id);
                })] }, column.id));
    }
    if (!column.getCanFilter()) {
        return jsxRuntime.jsx(jsxRuntime.Fragment, {});
    }
    if (filterVariant === "select") {
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(react.Select, { value: column.getFilterValue() ? String(column.getFilterValue()) : "", placeholder: "Select option", onChange: (e) => {
                        column.setFilterValue(e.target.value);
                    }, children: filterOptions.map((option) => {
                        return (jsxRuntime.jsx("option", { value: option, children: option }, `${option}`));
                    }) })] }, column.id));
    }
    if (filterVariant === "tag") {
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(TagFilter, { availableTags: filterOptions, selectedTags: (column.getFilterValue() ?? []), onTagChange: (tags) => {
                        if (tags.length === 0) {
                            return column.setFilterValue(undefined);
                        }
                        column.setFilterValue(tags);
                    } })] }, column.id));
    }
    if (filterVariant === "boolean") {
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(TagFilter, { availableTags: ["true", "false"], selectedTags: (column.getFilterValue() ?? []), onTagChange: (tags) => {
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
        return (jsxRuntime.jsx(RangeFilter, { range: filterValue, setRange: function (value) {
                // throw new Error("Function not implemented.");
                column.setFilterValue(value);
            }, defaultValue: defaultValue, min: min, max: max, step: step }));
    }
    if (filterVariant === "dateRange") {
        const [start, end] = column.getFilterValue() ?? [
            "",
            "",
        ];
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(DateRangeFilter, { startDate: start, endDate: end, setStartDate: function (value) {
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
        return jsxRuntime.jsx(jsxRuntime.Fragment, { children: renderFilter(column) });
    }
    return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(react.Input, { value: column.getFilterValue() ? String(column.getFilterValue()) : "", onChange: (e) => {
                    column.setFilterValue(e.target.value);
                } })] }, column.id));
}
const TableFilter = () => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: table.getAllColumns().map((column) => {
            return jsxRuntime.jsx(Filter, { column: column }, column.id);
        }) }));
};

const TableFilterTags = () => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(react.Flex, { gap: "0.5rem", flexFlow: "wrap", children: table.getState().columnFilters.map(({ id, value }, index) => {
            return (jsxRuntime.jsxs(react.Tag, { display: "flex", gap: "0.5rem", alignItems: "center", children: [jsxRuntime.jsx(react.Text, { children: `${id}: ${value}` }), jsxRuntime.jsx(react.IconButton, { size: "xs", variant: "ghost", icon: jsxRuntime.jsx(icons.CloseIcon, {}), onClick: () => {
                            table.setColumnFilters(table.getState().columnFilters.filter((value, curIndex) => {
                                return curIndex != index;
                            }));
                        }, "aria-label": "remove filter" })] }, `${id}-${value}`));
        }) }));
};

const TableLoadingComponent = ({ render, }) => {
    const { loading } = useDataTable();
    return jsxRuntime.jsx(jsxRuntime.Fragment, { children: render(loading) });
};

const ColumnOrderChanger = ({ columns }) => {
    const [order, setOrder] = react$1.useState([]);
    const [originalOrder, setOriginalOrder] = react$1.useState([]);
    const { table } = useDataTable();
    const handleChangeOrder = (startIndex, endIndex) => {
        const newOrder = Array.from(order);
        const [removed] = newOrder.splice(startIndex, 1);
        newOrder.splice(endIndex, 0, removed);
        setOrder(newOrder);
    };
    react$1.useEffect(() => {
        setOrder(columns);
    }, [columns]);
    react$1.useEffect(() => {
        if (originalOrder.length > 0) {
            return;
        }
        if (columns.length <= 0) {
            return;
        }
        setOriginalOrder(columns);
    }, [columns]);
    return (jsxRuntime.jsxs(react.Flex, { gap: "0.5rem", flexFlow: "column", children: [jsxRuntime.jsx(react.Flex, { gap: "0.5rem", flexFlow: "column", children: order.map((columnId, index) => (jsxRuntime.jsxs(react.Flex, { gap: "0.5rem", alignItems: "center", justifyContent: "space-between", children: [jsxRuntime.jsx(react.IconButton, { onClick: () => {
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
                            return jsxRuntime.jsx("span", { children: displayName }, column.id);
                        }), jsxRuntime.jsx(react.IconButton, { onClick: () => {
                                const nextIndex = index + 1;
                                if (nextIndex < order.length) {
                                    handleChangeOrder(index, nextIndex);
                                }
                            }, disabled: index === order.length - 1, "aria-label": "", children: jsxRuntime.jsx(md.MdArrowDownward, {}) })] }, columnId))) }), jsxRuntime.jsxs(react.Flex, { gap: "0.25rem", children: [jsxRuntime.jsx(react.Button, { onClick: () => {
                            table.setColumnOrder(order);
                        }, children: "Apply" }), jsxRuntime.jsx(react.Button, { onClick: () => {
                            table.setColumnOrder(originalOrder);
                        }, children: "Reset" })] })] }));
};
const TableOrderer = () => {
    const { table } = useDataTable();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(ColumnOrderChanger, { columns: table.getState().columnOrder }) }));
};

const TablePagination = ({}) => {
    const { firstPage, getCanPreviousPage, previousPage, getState, nextPage, getCanNextPage, lastPage, } = useDataTable().table;
    return (jsxRuntime.jsxs(react.ButtonGroup, { isAttached: true, children: [jsxRuntime.jsx(react.IconButton, { icon: jsxRuntime.jsx(md.MdFirstPage, {}), onClick: () => firstPage(), isDisabled: !getCanPreviousPage(), "aria-label": "first-page", variant: "ghost" }), jsxRuntime.jsx(react.IconButton, { icon: jsxRuntime.jsx(md.MdArrowBack, {}), onClick: () => previousPage(), isDisabled: !getCanPreviousPage(), "aria-label": "previous-page", variant: "ghost" }), jsxRuntime.jsx(react.Button, { variant: "ghost", onClick: () => { }, disabled: !getCanPreviousPage(), children: getState().pagination.pageIndex + 1 }), jsxRuntime.jsx(react.IconButton, { onClick: () => nextPage(), isDisabled: !getCanNextPage(), "aria-label": "next-page", variant: "ghost", children: jsxRuntime.jsx(md.MdArrowForward, {}) }), jsxRuntime.jsx(react.IconButton, { onClick: () => lastPage(), isDisabled: !getCanNextPage(), "aria-label": "last-page", variant: "ghost", children: jsxRuntime.jsx(md.MdLastPage, {}) })] }));
};

const ReloadButton = ({ text = "Reload" }) => {
    const { refreshData } = useDataTable();
    return (jsxRuntime.jsx(react.Button, { leftIcon: jsxRuntime.jsx(io5.IoReload, {}), onClick: () => {
            refreshData();
        }, children: text }));
};

const SelectAllRowsToggle = ({ selectAllIcon = jsxRuntime.jsx(md.MdOutlineChecklist, {}), clearAllIcon = jsxRuntime.jsx(md.MdClear, {}), selectAllText, clearAllText, }) => {
    const { table } = useDataTable();
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!selectAllText === false && (jsxRuntime.jsx(react.IconButton, { icon: table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon, variant: "ghost", "aria-label": table.getIsAllRowsSelected() ? clearAllText : selectAllText, onClick: (event) => {
                    table.getToggleAllRowsSelectedHandler()(event);
                } })), !!selectAllText !== false && (jsxRuntime.jsx(react.Button, { leftIcon: table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon, variant: "ghost", onClick: (event) => {
                    table.getToggleAllRowsSelectedHandler()(event);
                }, children: table.getIsAllRowsSelected() ? clearAllText : selectAllText }))] }));
};

const TableSelector = () => {
    const { table } = react$1.useContext(TableContext);
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [table.getSelectedRowModel().rows.length > 0 && (jsxRuntime.jsxs(react.Button, { onClick: () => { }, variant: "ghost", display: "flex", gap: "0.25rem", children: [jsxRuntime.jsx(react.Box, { fontSize: "sm", children: `${table.getSelectedRowModel().rows.length}` }), jsxRuntime.jsx(react.Icon, { as: io.IoMdCheckbox })] })), !table.getIsAllPageRowsSelected() && jsxRuntime.jsx(SelectAllRowsToggle, {}), table.getSelectedRowModel().rows.length > 0 && (jsxRuntime.jsx(react.IconButton, { variant: "ghost", icon: jsxRuntime.jsx(react.Icon, { as: md.MdClear }), onClick: () => {
                    table.resetRowSelection();
                }, "aria-label": "reset selection" }))] }));
};

const TableViewer = () => {
    const { table } = useDataTable();
    const columns = table.getAllLeafColumns();
    const [columnOrder, setColumnOrder] = react$1.useState(columns.map((column, index) => {
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
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(reactBeautifulDnd.DragDropContext, { onDragEnd: handleDragEnd, children: jsxRuntime.jsx(reactBeautifulDnd.Droppable, { droppableId: "columns", children: (provided) => (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.5rem", ref: provided.innerRef, ...provided.droppableProps, children: [columns.map((column, i) => {
                            const displayName = column.columnDef.meta === undefined
                                ? column.id
                                : column.columnDef.meta.displayName;
                            return (jsxRuntime.jsx(reactBeautifulDnd.Draggable, { draggableId: column.id, index: i, children: (provided) => (jsxRuntime.jsxs(react.Grid, { ref: provided.innerRef, ...provided.draggableProps, templateColumns: "auto 1fr", gap: "0.5rem", alignItems: "center", children: [jsxRuntime.jsx(react.Flex, { ...provided.dragHandleProps, alignItems: "center", padding: "auto 0 auto 0", children: jsxRuntime.jsx(react.Icon, { as: fa.FaGripLinesVertical, color: "gray.400" }) }), jsxRuntime.jsxs(react.Flex, { justifyContent: "space-between", alignItems: "center", children: [jsxRuntime.jsxs(react.Box, { children: [" ", displayName] }), jsxRuntime.jsx(react.Switch, { isChecked: column.getIsVisible(), onChange: column.getToggleVisibilityHandler() })] })] }, column.id)) }, column.id));
                        }), provided.placeholder] })) }) }) }));
};

const TextCell = ({ label, noOfLines = [1], padding = "0rem", children, tooltipProps, ...props }) => {
    if (label) {
        return (jsxRuntime.jsx(react.Flex, { alignItems: "center", height: "100%", padding: padding, children: jsxRuntime.jsx(react.Tooltip, { label: jsxRuntime.jsx(react.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", noOfLines: [5], children: label }), placement: "auto", ...tooltipProps, children: jsxRuntime.jsx(react.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-all", noOfLines: noOfLines, ...props, children: children }) }) }));
    }
    return (jsxRuntime.jsx(react.Flex, { alignItems: "center", height: "100%", padding: padding, children: jsxRuntime.jsx(react.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-all", noOfLines: noOfLines, ...props, children: children }) }));
};

const FilterOptions = ({ column }) => {
    const { table } = useDataTable();
    const tableColumn = table.getColumn(column);
    const options = tableColumn?.columnDef.meta?.filterOptions ?? [];
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: options.map((option) => {
            const selected = table.getColumn(column)?.getFilterValue() === option;
            return (jsxRuntime.jsxs(react.Button, { size: "sm", onClick: () => {
                    if (selected) {
                        table.setColumnFilters((state) => {
                            return state.filter((filter) => {
                                return filter.id !== column;
                            });
                        });
                        return;
                    }
                    table.getColumn(column)?.setFilterValue(option);
                }, variant: selected ? "solid" : "outline", display: "flex", gap: "0.25rem", children: [option, selected && jsxRuntime.jsx(md.MdClose, {})] }, option));
        }) }));
};

const GlobalFilter = ({ icon = md.MdSearch }) => {
    const { globalFilter, setGlobalFilter } = useDataTable();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(react.Box, { children: jsxRuntime.jsxs(react.InputGroup, { children: [jsxRuntime.jsx(react.InputLeftElement, { pointerEvents: "none", children: jsxRuntime.jsx(react.Icon, { as: icon, color: "gray.300" }) }), jsxRuntime.jsx(react.Input, { value: globalFilter, onChange: (e) => {
                            setGlobalFilter(e.target.value);
                        } })] }) }) }));
};

exports.DataTable = DataTable;
exports.DataTableServer = DataTableServer;
exports.DefaultTable = DefaultTable;
exports.DensityToggleButton = DensityToggleButton;
exports.EditFilterButton = EditFilterButton;
exports.EditOrderButton = EditOrderButton;
exports.EditSortingButton = EditSortingButton;
exports.EditViewButton = EditViewButton;
exports.FilterOptions = FilterOptions;
exports.GlobalFilter = GlobalFilter;
exports.PageSizeControl = PageSizeControl;
exports.ReloadButton = ReloadButton;
exports.ResetFilteringButton = ResetFilteringButton;
exports.ResetSelectionButton = ResetSelectionButton;
exports.ResetSortingButton = ResetSortingButton;
exports.RowCountText = RowCountText;
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCardContainer = TableCardContainer;
exports.TableCards = TableCards;
exports.TableComponent = TableComponent;
exports.TableControls = TableControls;
exports.TableFilter = TableFilter;
exports.TableFilterTags = TableFilterTags;
exports.TableFooter = TableFooter;
exports.TableHeader = TableHeader;
exports.TableLoadingComponent = TableLoadingComponent;
exports.TableOrderer = TableOrderer;
exports.TablePagination = TablePagination;
exports.TableSelector = TableSelector;
exports.TableSorter = TableSorter;
exports.TableViewer = TableViewer;
exports.TextCell = TextCell;
exports.useDataFromUrl = useDataFromUrl;
exports.useDataTable = useDataTable;
