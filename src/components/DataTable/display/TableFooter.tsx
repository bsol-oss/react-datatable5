import { Box, Flex, MenuRoot, MenuTrigger, Table } from '@chakra-ui/react';
import { flexRender } from '@tanstack/react-table';
import { useState } from 'react';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { Checkbox } from '../../ui/checkbox';
import { useDataTableContext } from '../context/useDataTableContext';
import {
  areAllRowsSelected,
  createToggleAllRowsHandler,
} from '../utils/selectors';

export interface TableFooterProps {
  showSelector?: boolean;
  alwaysShowSelector?: boolean;
}

export const TableFooter = ({
  showSelector = false,
  alwaysShowSelector = true,
}: TableFooterProps) => {
  const { table, rowSelection, setRowSelection } = useDataTableContext();
  const SELECTION_BOX_WIDTH = 20;
  const [hoveredCheckBox, setHoveredCheckBox] = useState<boolean>(false);

  const handleRowHover = (isHovered: boolean) => {
    setHoveredCheckBox(isHovered);
  };

  const isCheckBoxVisible = () => {
    if (alwaysShowSelector) {
      return true;
    }
    if (areAllRowsSelected(table, rowSelection)) {
      return true;
    }
    if (hoveredCheckBox) {
      return true;
    }
    return false;
  };

  return (
    <Table.Footer>
      {table.getFooterGroups().map((footerGroup) => (
        <Table.Row
          display={'flex'}
          key={`chakra-table-footergroup-${footerGroup.id}`}
        >
          {showSelector && (
            <Table.Cell
              padding={`${table.getDensityValue()}px`}
              onMouseEnter={() => handleRowHover(true)}
              onMouseLeave={() => handleRowHover(false)}
              display={'grid'}
              justifyItems={'center'}
              alignItems={'center'}
              {...{
                color: {
                  base: 'colorPalette.900',
                  _dark: 'colorPalette.100',
                },
                bg: { base: 'colorPalette.50', _dark: 'colorPalette.950' },
              }}
            >
              {isCheckBoxVisible() ? (
                <Checkbox
                  width={`${SELECTION_BOX_WIDTH}px`}
                  height={`${SELECTION_BOX_WIDTH}px`}
                  {...{
                    checked: areAllRowsSelected(table, rowSelection),
                    // indeterminate: areSomeRowsSelected(table, rowSelection),
                    onChange: createToggleAllRowsHandler(
                      table,
                      rowSelection,
                      setRowSelection
                    ),
                  }}
                />
              ) : (
                <Box
                  as="span"
                  width={`${SELECTION_BOX_WIDTH}px`}
                  height={`${SELECTION_BOX_WIDTH}px`}
                />
              )}
            </Table.Cell>
          )}
          {footerGroup.headers.map((header) => (
            <Table.Cell
              padding={'0'}
              key={`chakra-table-footer-${header.column.id}-${footerGroup.id}`}
              columnSpan={`${header.colSpan}`}
              // styling resize and pinning start
              maxWidth={`${header.getSize()}px`}
              width={`${header.getSize()}px`}
              display={'grid'}
            >
              <MenuRoot>
                <MenuTrigger asChild>
                  <Box
                    padding={`${table.getDensityValue()}px`}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'start'}
                    borderRadius={'0rem'}
                  >
                    <Flex gap="0.5rem" alignItems={'center'}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                      <Box>
                        {header.column.getCanSort() && (
                          <>
                            {header.column.getIsSorted() === false && <></>}
                            {header.column.getIsSorted() === 'asc' && (
                              <BiUpArrow />
                            )}
                            {header.column.getIsSorted() === 'desc' && (
                              <BiDownArrow />
                            )}
                          </>
                        )}
                      </Box>
                    </Flex>
                  </Box>
                </MenuTrigger>
              </MenuRoot>
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Footer>
  );
};
