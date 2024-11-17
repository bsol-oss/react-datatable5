# React Datatable

## Installation

```bash
npm install @tanstack/react-table @chakra-ui/react @bsol-oss/react-datatable5
```

## Usage

### Hook

The `DataTable` and `DataTableServer` utilize hook to add props. 

```tsx
const datatable = useDataTable();
const datatableServer = useDataTableServer({url: "<some-url>"});
```

### DataTable

```tsx
<DataTable columns={columns} data={data} {...datatable}>
  <Flex>
    <TablePagination />
    <EditViewButton />
    <EditFilterButton />
    <EditOrderButton />
    <PageSizeControl />
    <TableSelector />
    <GlobalFilter />
  </Flex>
  <Table>
    <TableHeader canResize />
    <TableBody />
    <TableFooter />
  </Table>
  <PageSizeControl />
  <TablePagination />
</DataTable>
```

### DataTableServer

```tsx
<DataTableServer
  columns={columns}
  {...datatable}
>
  <Flex>
    <TablePagination />
    <EditViewButton />
    <EditFilterButton />
    <DensityToggleButton />
    <EditOrderButton />
    <PageSizeControl />
    <TableSelector />
    <GlobalFilter />
  </Flex>
  <Table>
    <TableHeader canResize />
    <TableBody />
    <TableFooter />
  </Table>
  <Flex>
    <TablePagination />
    <EditViewButton />
    <EditFilterButton />
    <EditOrderButton />
    <PageSizeControl />
    <TableSelector />
  </Flex>
</DataTableServer>
```

Example Url generated by the DataTableServer

```
GET http://localhost:8333/api/v1/gpt/chat/history/all?pagination={"offset":0,"rows":10}&sorting={}&where={}&searching=hello
```

### DefaultTable

```tsx
<DataTable columns={columns} data={data} {...datatable}>
  <DefaultTable />
</DataTable>
```

### TableCardContainer, TableCards, DefaultCard

```tsx
<DataTable columns={columns} data={data} {...datatable}>
  <TableCardContainer>
    <TableCards<Product>
      renderTitle={(row) => {
        return (
          <DefaultCard
            {...{
              row: row,
              imageColumnId: "thumbnail",
              titleColumnId: "title",
              tagColumnId: "rating",
              tagIcon: MdStarRate,
            }}
          />
        );
      }}
    />
  </TableCardContainer>
  <TablePagination />
</DataTable>
```

## Development

```
npm install
npm run storybook
```
