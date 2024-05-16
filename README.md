# React Datatable

## Installation

```bash
npm install @tanstack/react-table @chakra-ui/react @bsol-oss/react-datatable5
```

## Usage

### DataTable

```tsx
<DataTable columns={columns} data={data}>
  <Flex>
    <TablePagination />
    <ButtonGroup isAttached>
      <EditViewButton />
      <EditFilterButton />
    </ButtonGroup>
    <EditOrderButton />
    <PageSizeControl />
    <ButtonGroup isAttached>
      <TableSelector />
    </ButtonGroup>
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
  url={"http://localhost:8333/api/v1/gpt/chat/history/all"}
>
  <Flex>
    <TablePagination />
    <ButtonGroup isAttached>
      <EditViewButton />
      <EditFilterButton />
      <DensityToggleButton />
    </ButtonGroup>
    <EditOrderButton />
    <PageSizeControl />
    <ButtonGroup isAttached>
      <TableSelector />
    </ButtonGroup>
    <GlobalFilter />
  </Flex>
  <Table>
    <TableHeader canResize />
    <TableBody />
    <TableFooter />
  </Table>
  <Flex gap="0.25rem">
    <TablePagination />
    <ButtonGroup isAttached>
      <EditViewButton />
      <EditFilterButton />
    </ButtonGroup>
    <EditOrderButton />
    <PageSizeControl />
    <ButtonGroup isAttached>
      <TableSelector />
    </ButtonGroup>
  </Flex>
</DataTableServer>
```

Example Url generated by the DataTableServer

```
GET
	http://localhost:8333/api/v1/gpt/chat/history/all?pagination={"offset":0,"rows":10}&sorting={}&where={}&searching=hello
```
