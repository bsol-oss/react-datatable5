'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var reactTable = require('@tanstack/react-table');
require('axios');
var react$1 = require('@chakra-ui/react');
require('react-icons/io');
require('@chakra-ui/table');
require('react-icons/md');
require('@chakra-ui/icons');

const TableContext = react.createContext({
    table: {},
    refreshData: () => { },
});

const useDataTable = () => {
    const { table, refreshData } = react.useContext(TableContext);
    return { table, refreshData };
};

const TableFooter = () => {
    const table = useDataTable().table;
    return (jsxRuntime.jsx(react$1.Tfoot, { children: table.getFooterGroups().map((footerGroup) => (jsxRuntime.jsx(react$1.Tr, { children: footerGroup.headers.map((header) => (jsxRuntime.jsx(react$1.Th, { colSpan: header.colSpan, children: header.isPlaceholder
                    ? null
                    : reactTable.flexRender(header.column.columnDef.footer, header.getContext()) }, crypto.randomUUID()))) }, crypto.randomUUID()))) }));
};

exports.TableFooter = TableFooter;
