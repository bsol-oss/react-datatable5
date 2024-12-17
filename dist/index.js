'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('@chakra-ui/react');
var ai = require('react-icons/ai');
var md = require('react-icons/md');
var React = require('react');
var lu = require('react-icons/lu');
var icons = require('@chakra-ui/icons');
var io = require('react-icons/io');
var reactTable = require('@tanstack/react-table');
var matchSorterUtils = require('@tanstack/match-sorter-utils');
var bs = require('react-icons/bs');
var gr = require('react-icons/gr');
var io5 = require('react-icons/io5');
var hi = require('react-icons/hi');
var cg = require('react-icons/cg');
var reactBeautifulDnd = require('react-beautiful-dnd');
var fa = require('react-icons/fa');
var axios = require('axios');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const DensityToggleButton = ({ text, icon = jsxRuntime.jsx(ai.AiOutlineColumnWidth, {}), }) => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!text === false && (jsxRuntime.jsx(react.IconButton, { variant: "ghost", "aria-label": "Toggle Density", icon: icon, onClick: () => {
                    table.toggleDensity();
                } })), !!text !== false && (jsxRuntime.jsx(react.Button, { leftIcon: icon, variant: "ghost", "aria-label": "Toggle Density", onClick: () => {
                    table.toggleDensity();
                }, children: text }))] }));
};

const CloseButton = React__namespace.forwardRef(function CloseButton(props, ref) {
    return (jsxRuntime.jsx(react.IconButton, { variant: "ghost", "aria-label": "Close", ref: ref, ...props, children: props.children ?? jsxRuntime.jsx(lu.LuX, {}) }));
});

const DialogContent = React__namespace.forwardRef(function DialogContent(props, ref) {
    const { children, portalled = true, portalRef, backdrop = true, ...rest } = props;
    return (jsxRuntime.jsxs(react.Portal, { disabled: !portalled, container: portalRef, children: [backdrop && jsxRuntime.jsx(react.Dialog.Backdrop, {}), jsxRuntime.jsx(react.Dialog.Positioner, { children: jsxRuntime.jsx(react.Dialog.Content, { ref: ref, ...rest, asChild: false, children: children }) })] }));
});
const DialogCloseTrigger = React__namespace.forwardRef(function DialogCloseTrigger(props, ref) {
    return (jsxRuntime.jsx(react.Dialog.CloseTrigger, { position: "absolute", top: "2", insetEnd: "2", ...props, asChild: true, children: jsxRuntime.jsx(CloseButton, { size: "sm", ref: ref, children: props.children }) }));
});
const DialogRoot = react.Dialog.Root;
const DialogFooter = react.Dialog.Footer;
const DialogHeader = react.Dialog.Header;
const DialogBody = react.Dialog.Body;
react.Dialog.Backdrop;
const DialogTitle = react.Dialog.Title;
react.Dialog.Description;
const DialogTrigger = react.Dialog.Trigger;
const DialogActionTrigger = react.Dialog.ActionTrigger;

const EditFilterButton = ({ text, title = "Edit Filter", closeText = "Close", resetText = "Reset", icon = jsxRuntime.jsx(md.MdFilterAlt, {}), }) => {
    const filterModal = react.useDisclosure();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(DialogRoot, { size: ["full", "full", "md", "md"], children: jsxRuntime.jsxs(DialogRoot, { children: [jsxRuntime.jsx(DialogTrigger, { asChild: true, children: jsxRuntime.jsxs(react.Button, { variant: "outline", children: [icon, " ", text] }) }), jsxRuntime.jsxs(DialogContent, { children: [jsxRuntime.jsx(DialogHeader, { children: jsxRuntime.jsx(DialogTitle, { children: title }) }), jsxRuntime.jsx(DialogBody, { children: jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "1rem", children: [jsxRuntime.jsx(TableFilter, {}), jsxRuntime.jsx(ResetFilteringButton, { text: resetText })] }) }), jsxRuntime.jsxs(DialogFooter, { children: [jsxRuntime.jsx(DialogActionTrigger, { asChild: true, children: jsxRuntime.jsx(react.Button, { onClick: filterModal.onClose, children: closeText }) }), jsxRuntime.jsx(react.Button, { children: "Save" })] }), jsxRuntime.jsx(DialogCloseTrigger, {})] })] }) }) }));
};

const EditOrderButton = ({ text, icon = jsxRuntime.jsx(md.MdOutlineMoveDown, {}), title = "Change Order", }) => {
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(react.DialogRoot, { size: "cover", children: [jsxRuntime.jsx(react.DialogBackdrop, {}), jsxRuntime.jsx(react.DialogTrigger, { asChild: true, children: jsxRuntime.jsxs(react.Button, { variant: "ghost", children: [icon, text] }) }), jsxRuntime.jsxs(react.DialogContent, { children: [jsxRuntime.jsx(react.DialogCloseTrigger, {}), jsxRuntime.jsxs(react.DialogHeader, { children: [jsxRuntime.jsx(react.DialogTitle, {}), title] }), jsxRuntime.jsx(react.DialogBody, { children: jsxRuntime.jsx(react.Flex, { flexFlow: "column", gap: "0.25rem", children: jsxRuntime.jsx(TableOrderer, {}) }) }), jsxRuntime.jsx(react.DialogFooter, {})] })] }) }));
};

const TableContext = React.createContext({
    table: {},
    refreshData: () => { },
    globalFilter: "",
    setGlobalFilter: () => { },
    loading: false,
    hasError: false,
});

const useDataTableContext = () => {
    const { table, refreshData, globalFilter, setGlobalFilter, loading, hasError, } = React.useContext(TableContext);
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
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: table.getHeaderGroups().map((headerGroup) => (jsxRuntime.jsx(jsxRuntime.Fragment, { children: headerGroup.headers.map((header) => {
                const displayName = header.column.columnDef.meta === undefined
                    ? header.column.id
                    : header.column.columnDef.meta.displayName;
                return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: header.column.getCanSort() && (jsxRuntime.jsxs(react.Flex, { alignItems: "center", gap: "0.5rem", padding: "0.5rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsxs(react.Button, { variant: "ghost", onClick: () => {
                                    header.column.toggleSorting();
                                }, children: [header.column.getIsSorted() === false && jsxRuntime.jsx(icons.UpDownIcon, {}), header.column.getIsSorted() === "asc" && (jsxRuntime.jsx(icons.ChevronDownIcon, {})), header.column.getIsSorted() === "desc" && (jsxRuntime.jsx(icons.ChevronUpIcon, {}))] }), header.column.getIsSorted() && (jsxRuntime.jsx(react.Button, { onClick: () => {
                                    header.column.clearSorting();
                                }, children: jsxRuntime.jsx(icons.CloseIcon, {}) }))] })) }));
            }) }))) }));
};

const EditSortingButton = ({ text, icon = jsxRuntime.jsx(md.MdOutlineSort, {}), title = "Edit Sorting", }) => {
    const sortingModal = react.useDisclosure();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(DialogRoot, { size: ["full", "full", "md", "md"], children: [jsxRuntime.jsx(react.DialogBackdrop, {}), jsxRuntime.jsx(DialogTrigger, { children: jsxRuntime.jsxs(react.Button, { variant: "ghost", onClick: sortingModal.onOpen, children: [icon, " ", text] }) }), jsxRuntime.jsxs(DialogContent, { children: [jsxRuntime.jsx(DialogCloseTrigger, {}), jsxRuntime.jsxs(DialogHeader, { children: [jsxRuntime.jsx(DialogTitle, {}), title] }), jsxRuntime.jsx(DialogBody, { children: jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(TableSorter, {}), jsxRuntime.jsx(ResetSortingButton, {})] }) }), jsxRuntime.jsx(DialogFooter, {})] })] }) }));
};

const EditViewButton = ({ text, icon = jsxRuntime.jsx(io.IoMdEye, {}), title = "Edit View", }) => {
    const viewModel = react.useDisclosure();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(DialogRoot, { children: [jsxRuntime.jsx(react.DialogBackdrop, {}), jsxRuntime.jsx(DialogTrigger, { children: jsxRuntime.jsxs(react.Button, { variant: "ghost", onClick: viewModel.onOpen, children: [icon, " ", text] }) }), jsxRuntime.jsxs(DialogContent, { children: [jsxRuntime.jsx(DialogCloseTrigger, {}), jsxRuntime.jsxs(DialogHeader, { children: [jsxRuntime.jsx(DialogTitle, {}), title] }), jsxRuntime.jsx(DialogBody, { children: jsxRuntime.jsx(TableViewer, {}) }), jsxRuntime.jsx(DialogFooter, {})] })] }) }));
};

const MenuContent = React__namespace.forwardRef(function MenuContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props;
    return (jsxRuntime.jsx(react.Portal, { disabled: !portalled, container: portalRef, children: jsxRuntime.jsx(react.Menu.Positioner, { children: jsxRuntime.jsx(react.Menu.Content, { ref: ref, ...rest }) }) }));
});
React__namespace.forwardRef(function MenuArrow(props, ref) {
    return (jsxRuntime.jsx(react.Menu.Arrow, { ref: ref, ...props, children: jsxRuntime.jsx(react.Menu.ArrowTip, {}) }));
});
React__namespace.forwardRef(function MenuCheckboxItem(props, ref) {
    return (jsxRuntime.jsxs(react.Menu.CheckboxItem, { ref: ref, ...props, children: [jsxRuntime.jsx(react.Menu.ItemIndicator, { hidden: false, children: jsxRuntime.jsx(lu.LuCheck, {}) }), props.children] }));
});
React__namespace.forwardRef(function MenuRadioItem(props, ref) {
    const { children, ...rest } = props;
    return (jsxRuntime.jsxs(react.Menu.RadioItem, { ps: "8", ref: ref, ...rest, children: [jsxRuntime.jsx(react.AbsoluteCenter, { axis: "horizontal", left: "4", asChild: true, children: jsxRuntime.jsx(react.Menu.ItemIndicator, { children: jsxRuntime.jsx(lu.LuCheck, {}) }) }), jsxRuntime.jsx(react.Menu.ItemText, { children: children })] }));
});
React__namespace.forwardRef(function MenuItemGroup(props, ref) {
    const { title, children, ...rest } = props;
    return (jsxRuntime.jsxs(react.Menu.ItemGroup, { ref: ref, ...rest, children: [title && (jsxRuntime.jsx(react.Menu.ItemGroupLabel, { userSelect: "none", children: title })), children] }));
});
React__namespace.forwardRef(function MenuTriggerItem(props, ref) {
    const { startIcon, children, ...rest } = props;
    return (jsxRuntime.jsxs(react.Menu.TriggerItem, { ref: ref, ...rest, children: [startIcon, children, jsxRuntime.jsx(lu.LuChevronRight, {})] }));
});
react.Menu.RadioItemGroup;
react.Menu.ContextTrigger;
const MenuRoot = react.Menu.Root;
react.Menu.Separator;
const MenuItem = react.Menu.Item;
react.Menu.ItemText;
react.Menu.ItemCommand;
const MenuTrigger = react.Menu.Trigger;

const PageSizeControl = ({ pageSizes = [10, 20, 30, 40, 50], }) => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(MenuRoot, { children: [jsxRuntime.jsx(MenuTrigger, { asChild: true, children: jsxRuntime.jsxs(react.Button, { variant: "ghost", gap: "0.5rem", children: [table.getState().pagination.pageSize, " ", jsxRuntime.jsx(icons.ChevronDownIcon, {})] }) }), jsxRuntime.jsx(MenuContent, { children: pageSizes.map((pageSize) => (jsxRuntime.jsx(MenuItem, { value: `chakra-table-pageSize-${pageSize}`, onClick: () => {
                            table.setPageSize(Number(pageSize));
                        }, children: pageSize }))) })] }) }));
};

const ResetFilteringButton = ({ text = "Reset Filtering", }) => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(react.Button, { onClick: () => {
            table.resetColumnFilters();
        }, children: text }));
};

const ResetSelectionButton = ({ text = "Reset Selection", }) => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(react.Button, { onClick: () => {
            table.resetRowSelection();
        }, children: text }));
};

const ResetSortingButton = ({ text = "Reset Sorting", }) => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(react.Button, { onClick: () => {
            table.resetSorting();
        }, children: text }));
};

const RowCountText = () => {
    const { table } = useDataTableContext();
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
const DataTable = ({ columns, data, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, onRowSelect = () => { }, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, children, }) => {
    const table = reactTable.useReactTable({
        _features: [DensityFeature],
        data: data,
        rowCount: data.length,
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
    React.useEffect(() => {
        setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
    }, []);
    React.useEffect(() => {
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

const DataTableServer = ({ columns, enableRowSelection = true, enableMultiRowSelection = true, enableSubRowSelection = true, onRowSelect = () => { }, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, data, loading, hasError, refreshData, children, }) => {
    const table = reactTable.useReactTable({
        _features: [DensityFeature],
        data: data.results,
        rowCount: data.count ?? 0,
        columns: columns,
        getCoreRowModel: reactTable.getCoreRowModel(),
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
    React.useEffect(() => {
        setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
    }, []);
    React.useEffect(() => {
        onRowSelect(table.getState().rowSelection, data.results);
    }, [table.getState().rowSelection]);
    React.useEffect(() => {
        table.resetPagination();
    }, [sorting, columnFilters, globalFilter]);
    return (jsxRuntime.jsx(TableContext.Provider, { value: {
            table: { ...table },
            refreshData: refreshData,
            globalFilter,
            setGlobalFilter,
            loading: loading,
            hasError: hasError,
        }, children: children }));
};

const Tag = React__namespace.forwardRef(function Tag(props, ref) {
    const { startElement, endElement, onClose, closable = !!onClose, children, ...rest } = props;
    return (jsxRuntime.jsxs(react.Tag.Root, { ref: ref, ...rest, children: [startElement && (jsxRuntime.jsx(react.Tag.StartElement, { children: startElement })), jsxRuntime.jsx(react.Tag.Label, { children: children }), endElement && (jsxRuntime.jsx(react.Tag.EndElement, { children: endElement })), closable && (jsxRuntime.jsx(react.Tag.EndElement, { children: jsxRuntime.jsx(react.Tag.CloseTrigger, { onClick: onClose }) }))] }));
});

const DefaultCard = ({ row, imageColumnId = undefined, titleColumnId = undefined, tagColumnId = undefined, tagIcon = undefined, showTag = true, }) => {
    if (!!row.original === false) {
        return jsxRuntime.jsx(jsxRuntime.Fragment, {});
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
    return (jsxRuntime.jsxs(react.Grid, { templateRows: "auto auto", gap: "1rem", children: [jsxRuntime.jsx(react.Flex, { justifyContent: "center", alignItems: "center", children: jsxRuntime.jsx(react.Image, { src: row.original[imageColumnId] }) }), jsxRuntime.jsxs(react.Flex, { gap: "0.5rem", flexFlow: "wrap", children: [jsxRuntime.jsx(react.Text, { fontWeight: "bold", fontSize: "large", children: row.original[titleColumnId] }), showTag && (jsxRuntime.jsx(Tag, { fontSize: "large", startElement: tagIcon && tagIcon({}), children: row.original[tagColumnId] }))] })] }));
};

const Checkbox = React__namespace.forwardRef(function Checkbox(props, ref) {
    const { icon, children, inputProps, rootRef, ...rest } = props;
    return (jsxRuntime.jsxs(react.Checkbox.Root, { ref: rootRef, ...rest, children: [jsxRuntime.jsx(react.Checkbox.HiddenInput, { ref: ref, ...inputProps }), jsxRuntime.jsx(react.Checkbox.Control, { children: icon || jsxRuntime.jsx(react.Checkbox.Indicator, {}) }), children != null && (jsxRuntime.jsx(react.Checkbox.Label, { children: children }))] }));
});

const TableBody = ({ pinnedBgColor = { light: "gray.50", dark: "gray.700" }, showSelector = false, alwaysShowSelector = true, }) => {
    const { table } = React.useContext(TableContext);
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredRow, setHoveredRow] = React.useState(-1);
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
    return (jsxRuntime.jsx(react.Table.Body, { children: table.getRowModel().rows.map((row, index) => {
            return (jsxRuntime.jsxs(react.Table.Row, { display: "flex", _hover: { backgroundColor: "rgba(178,178,178,0.1)" }, zIndex: 1, onMouseEnter: () => handleRowHover(index), onMouseLeave: () => handleRowHover(-1), children: [showSelector && (jsxRuntime.jsx(TableRowSelector, { index: index, row: row, hoveredRow: hoveredRow, alwaysShowSelector: alwaysShowSelector })), row.getVisibleCells().map((cell, index) => {
                        return (jsxRuntime.jsx(react.Table.Cell, { padding: `${table.getDensityValue()}px`, 
                            // styling resize and pinning start
                            maxWidth: `${cell.column.getSize()}px`, width: `${cell.column.getSize()}px`, ...getTdProps(cell), children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) }, `chakra-table-rowcell-${cell.id}-${index}`));
                    })] }, `chakra-table-row-${row.id}`));
        }) }));
};
const TableRowSelector = ({ index, row, hoveredRow, pinnedBgColor = { light: "gray.50", dark: "gray.700" }, alwaysShowSelector = true, }) => {
    const { table } = React.useContext(TableContext);
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
    return (jsxRuntime.jsxs(react.Table.Cell, { padding: `${table.getDensityValue()}px`, ...(table.getIsSomeColumnsPinned("left")
            ? {
                left: `0px`,
                backgroundColor: pinnedBgColor.light,
                position: "sticky",
                zIndex: 1,
                _dark: { backgroundColor: pinnedBgColor.dark },
            }
            : {}), 
        // styling resize and pinning end
        display: "grid", children: [!isCheckBoxVisible(index, row) && (jsxRuntime.jsx(react.Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` })), isCheckBoxVisible(index, row) && (jsxRuntime.jsx(react.Box, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsxRuntime.jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    // indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler() }) }))] }));
};

const Tooltip = React__namespace.forwardRef(function Tooltip(props, ref) {
    const { showArrow, children, disabled, portalled, content, contentProps, portalRef, ...rest } = props;
    if (disabled)
        return children;
    return (jsxRuntime.jsxs(react.Tooltip.Root, { ...rest, children: [jsxRuntime.jsx(react.Tooltip.Trigger, { asChild: true, children: children }), jsxRuntime.jsx(react.Portal, { disabled: !portalled, container: portalRef, children: jsxRuntime.jsx(react.Tooltip.Positioner, { children: jsxRuntime.jsxs(react.Tooltip.Content, { ref: ref, ...contentProps, children: [showArrow && (jsxRuntime.jsx(react.Tooltip.Arrow, { children: jsxRuntime.jsx(react.Tooltip.ArrowTip, {}) })), content] }) }) })] }));
});

const TableControls = ({ totalText = "Total:", showFilter = false, fitTableWidth = false, fitTableHeight = false, isMobile = false, children = jsxRuntime.jsx(jsxRuntime.Fragment, {}), showFilterName = false, showFilterTags = false, showReload = false, filterOptions = [], extraItems = jsxRuntime.jsx(jsxRuntime.Fragment, {}), }) => {
    const { loading, hasError } = useDataTableContext();
    return (jsxRuntime.jsxs(react.Grid, { templateRows: "auto auto auto 1fr auto", templateColumns: "1fr 1fr", width: fitTableWidth ? "fit-content" : "100%", height: fitTableHeight ? "fit-content" : "100%", justifySelf: "center", alignSelf: "center", gap: "0.5rem", children: [jsxRuntime.jsxs(react.Flex, { justifyContent: "space-between", gridColumn: "1 / span 2", children: [jsxRuntime.jsx(react.Box, { children: jsxRuntime.jsx(EditViewButton, { text: isMobile ? undefined : "View", icon: jsxRuntime.jsx(md.MdOutlineViewColumn, {}) }) }), jsxRuntime.jsxs(react.Flex, { gap: "0.5rem", alignItems: "center", justifySelf: "end", children: [loading && jsxRuntime.jsx(react.Spinner, { size: "sm" }), hasError && (jsxRuntime.jsx(Tooltip, { content: "An error occurred while fetching data", children: jsxRuntime.jsx(react.Icon, { as: bs.BsExclamationCircleFill, color: "red.400" }) })), showFilter && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(GlobalFilter, {}), jsxRuntime.jsx(EditFilterButton, { text: isMobile ? undefined : "Advanced Filter" })] })), showReload && jsxRuntime.jsx(ReloadButton, {}), extraItems] })] }), jsxRuntime.jsx(react.Flex, { gridColumn: "1 / span 2", flexFlow: "column", gap: "0.5rem", children: filterOptions.map((column) => {
                    return (jsxRuntime.jsxs(react.Flex, { alignItems: "center", flexFlow: "wrap", gap: "0.5rem", children: [showFilterName && jsxRuntime.jsxs(react.Text, { children: [column, ":"] }), jsxRuntime.jsx(FilterOptions, { column: column })] }, column));
                }) }), jsxRuntime.jsx(react.Flex, { gridColumn: "1 / span 2", children: showFilterTags && jsxRuntime.jsx(TableFilterTags, {}) }), jsxRuntime.jsx(react.Box, { overflow: "auto", gridColumn: "1 / span 2", width: "100%", height: "100%", children: children }), jsxRuntime.jsxs(react.Flex, { gap: "1rem", alignItems: "center", children: [jsxRuntime.jsx(PageSizeControl, {}), jsxRuntime.jsxs(react.Flex, { children: [jsxRuntime.jsx(react.Text, { paddingRight: "0.5rem", children: totalText }), jsxRuntime.jsx(RowCountText, {})] })] }), jsxRuntime.jsx(react.Box, { justifySelf: "end", children: jsxRuntime.jsx(TablePagination, {}) })] }));
};

const TableFooter = ({ pinnedBgColor = { light: "gray.50", dark: "gray.700" }, showSelector = false, alwaysShowSelector = true, }) => {
    const table = useDataTableContext().table;
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredCheckBox, setHoveredCheckBox] = React.useState(false);
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
    return (jsxRuntime.jsx(react.Table.Footer, { children: table.getFooterGroups().map((footerGroup) => (jsxRuntime.jsxs(react.Table.Row, { display: "flex", children: [showSelector && (jsxRuntime.jsxs(react.Table.Header
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
                    onMouseEnter: () => handleRowHover(true), onMouseLeave: () => handleRowHover(false), display: "grid", children: [isCheckBoxVisible() && (jsxRuntime.jsx(react.Box, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsxRuntime.jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: table.getIsAllRowsSelected(),
                                // indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler() }) })), !isCheckBoxVisible() && (jsxRuntime.jsx(react.Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` }))] })), footerGroup.headers.map((header) => (jsxRuntime.jsx(react.Table.Header, { padding: "0", columnSpan: `${header.colSpan}`, 
                    // styling resize and pinning start
                    maxWidth: `${header.getSize()}px`, width: `${header.getSize()}px`, display: "grid", ...getThProps(header), children: jsxRuntime.jsx(react.MenuRoot, { children: jsxRuntime.jsx(react.MenuTrigger, { asChild: true, children: jsxRuntime.jsx(react.Box, { padding: `${table.getDensityValue()}px`, display: "flex", alignItems: "center", justifyContent: "start", borderRadius: "0rem", _hover: { backgroundColor: "gray.100" }, children: jsxRuntime.jsxs(react.Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
                                            ? null
                                            : reactTable.flexRender(header.column.columnDef.footer, header.getContext()), jsxRuntime.jsx(react.Box, { children: header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [header.column.getIsSorted() === false && (
                                                    // <UpDownIcon />
                                                    jsxRuntime.jsx(jsxRuntime.Fragment, {})), header.column.getIsSorted() === "asc" && (jsxRuntime.jsx(icons.ChevronUpIcon, {})), header.column.getIsSorted() === "desc" && (jsxRuntime.jsx(icons.ChevronDownIcon, {}))] })) })] }) }) }) }) }, `chakra-table-footer-${footerGroup.id}`)))] }, `chakra-table-footergroup-${footerGroup.id}`))) }));
};

const Button = React__namespace.forwardRef(function Button(props, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props;
    return (jsxRuntime.jsx(react.Button, { disabled: loading || disabled, ref: ref, ...rest, children: loading && !loadingText ? (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(react.AbsoluteCenter, { display: "inline-flex", children: jsxRuntime.jsx(react.Spinner, { size: "inherit", color: "inherit" }) }), jsxRuntime.jsx(react.Span, { opacity: 0, children: children })] })) : loading && loadingText ? (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(react.Spinner, { size: "inherit", color: "inherit" }), loadingText] })) : (children) }));
});

const TableHeader = ({ canResize, pinnedBgColor = { light: "gray.50", dark: "gray.700" }, showSelector = false, isSticky = true, alwaysShowSelector = true, tHeadProps = {}, }) => {
    const { table } = useDataTableContext();
    const SELECTION_BOX_WIDTH = 20;
    const [hoveredCheckBox, setHoveredCheckBox] = React.useState(false);
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
    return (jsxRuntime.jsx(react.Table.Header, { ...(isSticky ? stickyProps : {}), ...tHeadProps, children: table.getHeaderGroups().map((headerGroup) => (jsxRuntime.jsxs(react.Table.Row, { display: "flex", children: [showSelector && (jsxRuntime.jsxs(react.Table.ColumnHeader
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
                    padding: `${table.getDensityValue()}px`, onMouseEnter: () => handleRowHover(true), onMouseLeave: () => handleRowHover(false), display: "grid", children: [isCheckBoxVisible() && (jsxRuntime.jsx(react.Box, { margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", children: jsxRuntime.jsx(Checkbox, { width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px`, isChecked: table.getIsAllRowsSelected(),
                                // indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler() }) })), !isCheckBoxVisible() && (jsxRuntime.jsx(react.Box, { as: "span", margin: "0rem", display: "grid", justifyItems: "center", alignItems: "center", width: `${SELECTION_BOX_WIDTH}px`, height: `${SELECTION_BOX_WIDTH}px` }))] })), headerGroup.headers.map((header) => {
                    const resizeProps = {
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        cursor: "col-resize",
                    };
                    return (jsxRuntime.jsxs(react.Table.ColumnHeader, { padding: "0rem", columnSpan: `${header.colSpan}`, 
                        // styling resize and pinning start
                        width: `${header.getSize()}px`, display: "grid", gridTemplateColumns: "1fr auto", zIndex: header.index, ...getThProps(header), children: [jsxRuntime.jsxs(MenuRoot, { children: [jsxRuntime.jsx(MenuTrigger, { asChild: true, children: jsxRuntime.jsx(react.Grid, { padding: `${table.getDensityValue()}px`, display: "flex", alignItems: "center", justifyContent: "start", borderRadius: "0rem", overflow: "auto", _hover: { backgroundColor: "gray.100" }, children: jsxRuntime.jsxs(react.Flex, { gap: "0.5rem", alignItems: "center", children: [header.isPlaceholder
                                                        ? null
                                                        : reactTable.flexRender(header.column.columnDef.header, header.getContext()), jsxRuntime.jsx(react.Box, { children: header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [header.column.getIsSorted() === false && jsxRuntime.jsx(jsxRuntime.Fragment, {}), header.column.getIsSorted() === "asc" && (jsxRuntime.jsx(icons.ChevronUpIcon, {})), header.column.getIsSorted() === "desc" && (jsxRuntime.jsx(icons.ChevronDownIcon, {}))] })) }), jsxRuntime.jsx(react.Box, { children: header.column.getIsFiltered() && jsxRuntime.jsx(md.MdFilterListAlt, {}) })] }) }) }), jsxRuntime.jsxs(MenuContent, { children: [!header.column.getIsPinned() && (jsxRuntime.jsx(MenuItem, { asChild: true, value: "pin-column", children: jsxRuntime.jsxs(Button, { variant: "ghost", onClick: () => {
                                                        header.column.pin("left");
                                                    }, children: [jsxRuntime.jsx(md.MdPushPin, {}), "Pin Column"] }) })), header.column.getIsPinned() && (jsxRuntime.jsx(MenuItem, { asChild: true, value: "cancel-pin", children: jsxRuntime.jsxs(Button, { variant: "ghost", onClick: () => {
                                                        header.column.pin(false);
                                                    }, children: [jsxRuntime.jsx(md.MdCancel, {}), "Cancel Pin"] }) })), header.column.getCanSort() && (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(MenuItem, { asChild: true, value: "sort-ascend", children: jsxRuntime.jsxs(Button, { variant: "ghost", onClick: () => {
                                                                table.setSorting((state) => {
                                                                    return [
                                                                        ...state.filter((column) => {
                                                                            return column.id !== header.id;
                                                                        }),
                                                                        { id: header.id, desc: false },
                                                                    ];
                                                                });
                                                            }, children: [jsxRuntime.jsx(gr.GrAscend, {}), "Sort Ascending"] }) }), jsxRuntime.jsx(MenuItem, { asChild: true, value: "sort-descend", children: jsxRuntime.jsxs(Button, { variant: "ghost", onClick: () => {
                                                                table.setSorting((state) => {
                                                                    return [
                                                                        ...state.filter((column) => {
                                                                            return column.id !== header.id;
                                                                        }),
                                                                        { id: header.id, desc: true },
                                                                    ];
                                                                });
                                                            }, children: [jsxRuntime.jsx(gr.GrDescend, {}), "Sort Descending"] }) }), header.column.getIsSorted() && (jsxRuntime.jsx(MenuItem, { asChild: true, value: "sort-descend", children: jsxRuntime.jsxs(Button, { variant: "ghost", onClick: () => {
                                                                header.column.clearSorting();
                                                            }, children: [jsxRuntime.jsx(md.MdClear, {}), "Clear Sorting"] }) }))] }))] })] }), canResize && (jsxRuntime.jsx(react.Box, { borderRight: "0.2rem solid", borderRightColor: header.column.getIsResizing() ? "gray.700" : "transparent", position: "relative", right: "0.1rem", width: "2px", height: "100%", userSelect: "none", style: { touchAction: "none" }, _hover: {
                                    borderRightColor: header.column.getIsResizing()
                                        ? "gray.700"
                                        : "gray.400",
                                }, ...resizeProps }))] }, `chakra-table-header-${header.id}`));
                })] }, `chakra-table-headergroup-${headerGroup.id}`))) }));
};

const DefaultTable = ({ totalText = "Total:", showFilter = false, showFooter = false, fitTableWidth = false, fitTableHeight = false, isMobile = false, filterOptions = [], showFilterTags = false, showFilterName = false, showReload = false, showSelector = false, extraItems = jsxRuntime.jsx(jsxRuntime.Fragment, {}), tableProps = {}, tHeadProps = {}, }) => {
    return (jsxRuntime.jsx(TableControls, { totalText: totalText, showFilter: showFilter, fitTableWidth: fitTableWidth, fitTableHeight: fitTableHeight, isMobile: isMobile, filterOptions: filterOptions, showFilterName: showFilterName, showFilterTags: showFilterTags, showReload: showReload, extraItems: extraItems, children: jsxRuntime.jsxs(Table, { ...tableProps, children: [jsxRuntime.jsx(TableHeader, { canResize: true, showSelector: showSelector, tHeadProps: tHeadProps }), jsxRuntime.jsx(TableBody, { showSelector: showSelector }), showFooter && jsxRuntime.jsx(TableFooter, { showSelector: showSelector })] }) }));
};

const ReloadButton = ({ text = "Reload", variant = "icon", }) => {
    const { refreshData } = useDataTableContext();
    if (variant === "icon") {
        return (jsxRuntime.jsx(Tooltip, { showArrow: true, content: "This is the tooltip content", children: jsxRuntime.jsx(Button, { variant: "ghost", onClick: () => {
                    refreshData();
                }, "aria-label": "refresh", children: jsxRuntime.jsx(io5.IoReload, {}) }) }));
    }
    return (jsxRuntime.jsx(Button, { variant: "ghost", leftIcon: jsxRuntime.jsx(io5.IoReload, {}), onClick: () => {
            refreshData();
        }, children: text }));
};

const EmptyState = React__namespace.forwardRef(function EmptyState(props, ref) {
    const { title, description, icon, children, ...rest } = props;
    return (jsxRuntime.jsx(react.EmptyState.Root, { ref: ref, ...rest, children: jsxRuntime.jsxs(react.EmptyState.Content, { children: [icon && (jsxRuntime.jsx(react.EmptyState.Indicator, { children: icon })), description ? (jsxRuntime.jsxs(react.VStack, { textAlign: "center", children: [jsxRuntime.jsx(react.EmptyState.Title, { children: title }), jsxRuntime.jsx(react.EmptyState.Description, { children: description })] })) : (jsxRuntime.jsx(react.EmptyState.Title, { children: title })), children] }) }));
});

const EmptyResult = (jsxRuntime.jsx(EmptyState, { icon: jsxRuntime.jsx(hi.HiColorSwatch, {}), title: "No results found", description: "Try adjusting your search", children: jsxRuntime.jsxs(react.List.Root, { variant: "marker", children: [jsxRuntime.jsx(react.List.Item, { children: "Try removing filters" }), jsxRuntime.jsx(react.List.Item, { children: "Try different keywords" })] }) }));
const Table = ({ children, emptyComponent = EmptyResult, ...props }) => {
    const { table } = useDataTableContext();
    if (table.getRowModel().rows.length <= 0) {
        return emptyComponent;
    }
    return (jsxRuntime.jsx(react.Table.Root, { stickyHeader: true, variant: "outline", width: table.getCenterTotalSize(), ...props, children: children }));
};

const TableCardContainer = ({ children, ...props }) => {
    return (jsxRuntime.jsx(react.Grid, { gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr 1fr"], gap: "0.5rem", ...props, children: children }));
};

const DefaultCardTitle = () => {
    return jsxRuntime.jsx(jsxRuntime.Fragment, {});
};
const TableCards = ({ isSelectable = false, showDisplayNameOnly = false, renderTitle = DefaultCardTitle, cardBodyProps = {} }) => {
    const { table } = React.useContext(TableContext);
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: table.getRowModel().rows.map((row) => {
            return (jsxRuntime.jsx(react.Card.Root, { children: jsxRuntime.jsxs(react.Card.Body, { display: "flex", flexFlow: "column", gap: "0.5rem", ...cardBodyProps, children: [isSelectable && (jsxRuntime.jsx(Checkbox, { isChecked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            // indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler() })), renderTitle(row), jsxRuntime.jsx(react.Grid, { templateColumns: "auto 1fr", gap: "1rem", children: row.getVisibleCells().map((cell) => {
                                return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs(react.Box, { children: [showDisplayNameOnly && (jsxRuntime.jsx(react.Text, { fontWeight: "bold", children: cell.column.columnDef.meta?.displayName ??
                                                        cell.column.id })), !showDisplayNameOnly && (jsxRuntime.jsx(jsxRuntime.Fragment, { children: reactTable.flexRender(cell.column.columnDef.header, 
                                                    // @ts-expect-error Assuming the CellContext interface is the same as HeaderContext
                                                    cell.getContext()) }))] }, `chakra-table-cardcolumnid-${row.id}`), jsxRuntime.jsx(react.Box, { justifySelf: "end", children: reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()) }, `chakra-table-cardcolumn-${row.id}`)] }));
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
    return (jsxRuntime.jsx(react.Box, { p: "1rem", children: jsxRuntime.jsxs(react.VStack, { children: [jsxRuntime.jsxs(react.Box, { children: [jsxRuntime.jsx(react.Box, { children: "Start Date" }), jsxRuntime.jsx(react.Input, { id: "start-date", type: "date", value: startDate, onChange: (e) => setStartDate(e.target.value) })] }), jsxRuntime.jsxs(react.Box, { children: [jsxRuntime.jsx(react.Box, { children: "End Date" }), jsxRuntime.jsx(react.Input, { id: "end-date", type: "date", value: endDate, onChange: (e) => setEndDate(e.target.value) })] })] }) }));
};

const Slider = React__namespace.forwardRef(function Slider(props, ref) {
    const { marks: marksProp, label, showValue, ...rest } = props;
    const value = props.defaultValue ?? props.value;
    const marks = marksProp?.map((mark) => {
        if (typeof mark === "number")
            return { value: mark, label: undefined };
        return mark;
    });
    const hasMarkLabel = !!marks?.some((mark) => mark.label);
    return (jsxRuntime.jsxs(react.Slider.Root, { ref: ref, thumbAlignment: "center", ...rest, children: [label && !showValue && (jsxRuntime.jsx(react.Slider.Label, { children: label })), label && showValue && (jsxRuntime.jsxs(react.HStack, { justify: "space-between", children: [jsxRuntime.jsx(react.Slider.Label, { children: label }), jsxRuntime.jsx(react.Slider.ValueText, {})] })), jsxRuntime.jsxs(react.Slider.Control, { "data-has-mark-label": hasMarkLabel || undefined, children: [jsxRuntime.jsx(react.Slider.Track, { children: jsxRuntime.jsx(react.Slider.Range, {}) }), jsxRuntime.jsx(SliderThumbs, { value: value }), jsxRuntime.jsx(SliderMarks, { marks: marks })] })] }));
});
function SliderThumbs(props) {
    const { value } = props;
    return (jsxRuntime.jsx(react.For, { each: value, children: (_, index) => (jsxRuntime.jsx(react.Slider.Thumb, { index: index, children: jsxRuntime.jsx(react.Slider.HiddenInput, {}) }, index)) }));
}
const SliderMarks = React__namespace.forwardRef(function SliderMarks(props, ref) {
    const { marks } = props;
    if (!marks?.length)
        return null;
    return (jsxRuntime.jsx(react.Slider.MarkerGroup, { ref: ref, children: marks.map((mark, index) => {
            const value = typeof mark === "number" ? mark : mark.value;
            const label = typeof mark === "number" ? undefined : mark.label;
            return (jsxRuntime.jsxs(react.Slider.Marker, { value: value, children: [jsxRuntime.jsx(react.Slider.MarkerIndicator, {}), label] }, index));
        }) }));
});

const RangeFilter = ({ range, setRange, defaultValue, min, max, step, }) => {
    return (jsxRuntime.jsx(react.Box, { p: 8, children: jsxRuntime.jsx(Slider, { width: "full", min: min, max: max, defaultValue: defaultValue, step: step, name: `Selected Range: ${range[0]} - ${range[1]}`, 
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
    return (jsxRuntime.jsx(react.Flex, { flexFlow: "wrap", p: "0.5rem", gap: "0.5rem", children: availableTags.map((tag) => (jsxRuntime.jsx(Tag, { variant: selectedTags.includes(tag) ? "solid" : "outline", cursor: "pointer", closable: selectedTags.includes(tag) ? true : undefined, onClick: () => toggleTag(tag), children: tag }))) }));
};

const Radio = React__namespace.forwardRef(function Radio(props, ref) {
    const { children, inputProps, rootRef, ...rest } = props;
    return (jsxRuntime.jsxs(react.RadioGroup.Item, { ref: rootRef, ...rest, children: [jsxRuntime.jsx(react.RadioGroup.ItemHiddenInput, { ref: ref, ...inputProps }), jsxRuntime.jsx(react.RadioGroup.ItemIndicator, {}), children && (jsxRuntime.jsx(react.RadioGroup.ItemText, { children: children }))] }));
});
const RadioGroup = react.RadioGroup.Root;

const Filter = ({ column }) => {
    const { filterVariant } = column.columnDef.meta ?? {};
    const displayName = column.columnDef.meta?.displayName ?? column.id;
    const filterOptions = column.columnDef.meta?.filterOptions ?? [];
    // const collection = createListCollection({
    //   items: filterOptions,
    // });
    if (column.columns.length > 0) {
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), column.columns.map((column) => {
                    return jsxRuntime.jsx(Filter, { column: column }, column.id);
                })] }, column.id));
    }
    if (!column.getCanFilter()) {
        return jsxRuntime.jsx(jsxRuntime.Fragment, {});
    }
    if (filterVariant === "select") {
        return (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.25rem", children: [jsxRuntime.jsx(react.Text, { children: displayName }), jsxRuntime.jsx(RadioGroup, { value: column.getFilterValue() ? String(column.getFilterValue()) : "", onValueChange: (details) => {
                        column.setFilterValue(details.value);
                    }, children: jsxRuntime.jsx(react.Flex, { flexFlow: 'wrap', gap: '0.5rem', children: filterOptions.map((item) => (jsxRuntime.jsx(Radio, { value: item, children: item }, item))) }) })] }, column.id));
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
};
const TableFilter = () => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: table.getAllColumns().map((column) => {
            return jsxRuntime.jsx(Filter, { column: column }, column.id);
        }) }));
};

const TableFilterTags = () => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(react.Flex, { gap: "0.5rem", flexFlow: "wrap", children: table.getState().columnFilters.map(({ id, value }) => {
            return (jsxRuntime.jsxs(Tag, { gap: "0.5rem", children: [`${id}: ${value}`, jsxRuntime.jsx(react.IconButton, { variant: "ghost", "aria-label": "remove filter", onClick: () => {
                            table.setColumnFilters(table.getState().columnFilters.filter((filter) => {
                                return filter.value != value;
                            }));
                        }, children: jsxRuntime.jsx(cg.CgClose, {}) })] }, `${id}-${value}`));
        }) }));
};

const TableLoadingComponent = ({ render, }) => {
    const { loading } = useDataTableContext();
    return jsxRuntime.jsx(jsxRuntime.Fragment, { children: render(loading) });
};

const ColumnOrderChanger = ({ columns }) => {
    const [order, setOrder] = React.useState([]);
    const [originalOrder, setOriginalOrder] = React.useState([]);
    const { table } = useDataTableContext();
    const handleChangeOrder = (startIndex, endIndex) => {
        const newOrder = Array.from(order);
        const [removed] = newOrder.splice(startIndex, 1);
        newOrder.splice(endIndex, 0, removed);
        setOrder(newOrder);
    };
    React.useEffect(() => {
        setOrder(columns);
    }, [columns]);
    React.useEffect(() => {
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
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(ColumnOrderChanger, { columns: table.getState().columnOrder }) }));
};

const TablePagination = () => {
    const { firstPage, getCanPreviousPage, previousPage, getState, nextPage, getCanNextPage, lastPage, } = useDataTableContext().table;
    return (jsxRuntime.jsxs(react.Group, { attached: true, children: [jsxRuntime.jsx(react.IconButton, { onClick: () => firstPage(), disabled: !getCanPreviousPage(), "aria-label": "first-page", variant: "ghost", children: jsxRuntime.jsx(md.MdFirstPage, {}) }), jsxRuntime.jsx(react.IconButton, { onClick: () => previousPage(), disabled: !getCanPreviousPage(), "aria-label": "previous-page", variant: "ghost", children: jsxRuntime.jsx(md.MdArrowBack, {}) }), jsxRuntime.jsx(Button, { variant: "ghost", onClick: () => { }, disabled: !getCanPreviousPage(), children: getState().pagination.pageIndex + 1 }), jsxRuntime.jsx(react.IconButton, { onClick: () => nextPage(), disabled: !getCanNextPage(), "aria-label": "next-page", variant: "ghost", children: jsxRuntime.jsx(md.MdArrowForward, {}) }), jsxRuntime.jsx(react.IconButton, { onClick: () => lastPage(), disabled: !getCanNextPage(), "aria-label": "last-page", variant: "ghost", children: jsxRuntime.jsx(md.MdLastPage, {}) })] }));
};

const SelectAllRowsToggle = ({ selectAllIcon = jsxRuntime.jsx(md.MdOutlineChecklist, {}), clearAllIcon = jsxRuntime.jsx(md.MdClear, {}), selectAllText = "", clearAllText = "", }) => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [!!selectAllText === false && (jsxRuntime.jsx(react.IconButton, { icon: table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon, variant: "ghost", "aria-label": table.getIsAllRowsSelected() ? clearAllText : selectAllText, onClick: (event) => {
                    table.getToggleAllRowsSelectedHandler()(event);
                } })), !!selectAllText !== false && (jsxRuntime.jsx(react.Button, { leftIcon: table.getIsAllRowsSelected() ? clearAllIcon : selectAllIcon, variant: "ghost", onClick: (event) => {
                    table.getToggleAllRowsSelectedHandler()(event);
                }, children: table.getIsAllRowsSelected() ? clearAllText : selectAllText }))] }));
};

const TableSelector = () => {
    const { table } = React.useContext(TableContext);
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [table.getSelectedRowModel().rows.length > 0 && (jsxRuntime.jsxs(react.Button, { onClick: () => { }, variant: "ghost", display: "flex", gap: "0.25rem", children: [jsxRuntime.jsx(react.Box, { fontSize: "sm", children: `${table.getSelectedRowModel().rows.length}` }), jsxRuntime.jsx(react.Icon, { as: io.IoMdCheckbox })] })), !table.getIsAllPageRowsSelected() && jsxRuntime.jsx(SelectAllRowsToggle, {}), table.getSelectedRowModel().rows.length > 0 && (jsxRuntime.jsx(react.IconButton, { variant: "ghost", icon: jsxRuntime.jsx(react.Icon, { as: md.MdClear }), onClick: () => {
                    table.resetRowSelection();
                }, "aria-label": "reset selection" }))] }));
};

const Switch = React__namespace.forwardRef(function Switch(props, ref) {
    const { inputProps, children, rootRef, trackLabel, thumbLabel, ...rest } = props;
    return (jsxRuntime.jsxs(react.Switch.Root, { ref: rootRef, ...rest, children: [jsxRuntime.jsx(react.Switch.HiddenInput, { ref: ref, ...inputProps }), jsxRuntime.jsxs(react.Switch.Control, { children: [jsxRuntime.jsx(react.Switch.Thumb, { children: thumbLabel && (jsxRuntime.jsx(react.Switch.ThumbIndicator, { fallback: thumbLabel?.off, children: thumbLabel?.on })) }), trackLabel && (jsxRuntime.jsx(react.Switch.Indicator, { fallback: trackLabel.off, children: trackLabel.on }))] }), children != null && (jsxRuntime.jsx(react.Switch.Label, { children: children }))] }));
});

const TableViewer = () => {
    const { table } = useDataTableContext();
    const columns = table.getAllLeafColumns();
    const [columnOrder, setColumnOrder] = React.useState(columns.map((column) => column.id));
    const handleDragEnd = (result) => {
        if (!result.destination)
            return;
        const newColumnOrder = Array.from(columnOrder);
        const [removed] = newColumnOrder.splice(result.source.index, 1);
        newColumnOrder.splice(result.destination.index, 0, removed);
        setColumnOrder(newColumnOrder);
        table.setColumnOrder(newColumnOrder);
    };
    return (jsxRuntime.jsx(reactBeautifulDnd.DragDropContext, { onDragEnd: handleDragEnd, children: jsxRuntime.jsx(reactBeautifulDnd.Droppable, { droppableId: "columns", children: (provided) => (jsxRuntime.jsxs(react.Flex, { flexFlow: "column", gap: "0.5rem", ref: provided.innerRef, ...provided.droppableProps, children: [columns.map((column, index) => {
                        const displayName = column.columnDef.meta?.displayName || column.id;
                        return (jsxRuntime.jsx(reactBeautifulDnd.Draggable, { draggableId: column.id, index: index, children: (provided) => (jsxRuntime.jsxs(react.Grid, { ref: provided.innerRef, ...provided.draggableProps, templateColumns: "auto 1fr", gap: "0.5rem", alignItems: "center", children: [jsxRuntime.jsx(react.Flex, { ...provided.dragHandleProps, alignItems: "center", padding: "0", children: jsxRuntime.jsx(fa.FaGripLinesVertical, { color: "gray.400" }) }), jsxRuntime.jsxs(react.Flex, { justifyContent: "space-between", alignItems: "center", children: [jsxRuntime.jsx(react.Box, { children: displayName }), jsxRuntime.jsx(Switch, { checked: column.getIsVisible(), onChange: column.getToggleVisibilityHandler() })] })] })) }, column.id));
                    }), provided.placeholder] })) }) }));
};

const TextCell = ({ label, padding = "0rem", children, ...props }) => {
    if (label) {
        return (jsxRuntime.jsx(react.Flex, { alignItems: "center", height: "100%", padding: padding, children: jsxRuntime.jsx(Tooltip, { content: jsxRuntime.jsx(react.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", children: label }), children: jsxRuntime.jsx(react.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-all", ...props, children: children }) }) }));
    }
    return (jsxRuntime.jsx(react.Flex, { alignItems: "center", height: "100%", padding: padding, children: jsxRuntime.jsx(react.Text, { as: "span", overflow: "hidden", textOverflow: "ellipsis", wordBreak: "break-all", ...props, children: children }) }));
};

const useDataFromUrl = ({ url, params = {}, disableFirstFetch = false, onFetchSuccess = () => { }, defaultData, }) => {
    const [loading, setLoading] = React.useState(true);
    const [hasError, setHasError] = React.useState(false);
    const [data, setData] = React.useState(defaultData);
    const [timer, setTimer] = React.useState();
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
    React.useEffect(() => {
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
    const [sorting, setSorting] = React.useState(defaultSorting);
    const [columnFilters, setColumnFilters] = React.useState(defaultColumnFilters); // can set initial column filter state here
    const [pagination, setPagination] = React.useState(defaultPagination);
    const [rowSelection, setRowSelection] = React.useState(defaultRowSelection);
    const [columnOrder, setColumnOrder] = React.useState(defaultColumnOrder);
    const [globalFilter, setGlobalFilter] = React.useState(defaultGlobalFilter);
    const [density, setDensity] = React.useState(defaultDensity);
    const [columnVisibility, setColumnVisibility] = React.useState(defaultColumnVisibility);
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
    const [sorting, setSorting] = React.useState(defaultSorting);
    const [columnFilters, setColumnFilters] = React.useState(defaultColumnFilters); // can set initial column filter state here
    const [pagination, setPagination] = React.useState(defaultPagination);
    const [rowSelection, setRowSelection] = React.useState(defaultRowSelection);
    const [columnOrder, setColumnOrder] = React.useState(defaultColumnOrder);
    const [globalFilter, setGlobalFilter] = React.useState(defaultGlobalFilter);
    const [density, setDensity] = React.useState(defaultDensity);
    const [columnVisibility, setColumnVisibility] = React.useState(defaultColumnVisibility);
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
    React.useEffect(() => {
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

const InputGroup = React__namespace.forwardRef(function InputGroup(props, ref) {
    const { startElement, startElementProps, endElement, endElementProps, children, startOffset = "6px", endOffset = "6px", ...rest } = props;
    return (jsxRuntime.jsxs(react.Group, { ref: ref, ...rest, children: [startElement && (jsxRuntime.jsx(react.InputElement, { pointerEvents: "none", ...startElementProps, children: startElement })), React__namespace.cloneElement(children, {
                ...(startElement && {
                    ps: `calc(var(--input-height) - ${startOffset})`,
                }),
                ...(endElement && { pe: `calc(var(--input-height) - ${endOffset})` }),
                ...children.props,
            }), endElement && (jsxRuntime.jsx(react.InputElement, { placement: "end", ...endElementProps, children: endElement }))] }));
});

const GlobalFilter = () => {
    const { table } = useDataTableContext();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(InputGroup, { flex: "1", startElement: jsxRuntime.jsx(md.MdSearch, {}), children: jsxRuntime.jsx(react.Input, { placeholder: "Outline", variant: "outline", onChange: (e) => {
                    table.setGlobalFilter(e.target.value);
                } }) }) }));
};

exports.DataTable = DataTable;
exports.DataTableServer = DataTableServer;
exports.DefaultCard = DefaultCard;
exports.DefaultCardTitle = DefaultCardTitle;
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
exports.useDataTableContext = useDataTableContext;
exports.useDataTableServer = useDataTableServer;
