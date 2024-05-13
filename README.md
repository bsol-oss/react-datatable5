# React Datatable

## Installation

```bash
npm install @tanstack/react-table @chakra-ui/react @bsol-oss/react-datatable5
```

## Usage

```tsx
<DataTable
  columns={columns}
  url={"http://localhost:8333/api/v1/gpt/chat/history/all"}
>
  <EditViewButton />
  <ResetSortingButton />
  <TableFilter />
  <ResetFilteringButton />
  <Table>
    <TableHeader />
    <TableBody />
    <TableFooter />
  </Table>
  <PageSizeControl />
  <TablePagination />
</DataTable>
```

```tsx
<DataTable
  columns={columns}
  url={"http://localhost:8333/api/v1/gpt/chat/history/all"}
>
  <Flex gap="0.25rem">
    <TablePagination />
    <ButtonGroup isAttached>
      <EditViewButton />
      <EditFilterButton />
      <EditSortingButton />
    </ButtonGroup>
    <EditOrderButton />
    <PageSizeControl />
    <ButtonGroup isAttached>
      <TableSelector />
    </ButtonGroup>
  </Flex>
  <TableCardContainer>
    <TableCards />
  </TableCardContainer>
  <TablePagination />
</DataTable>
```
