import { Box, Flex, Grid, Icon, Switch } from "@chakra-ui/react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FaGripLinesVertical } from "react-icons/fa";
import { useDataTableContext } from "./useDataTable";

export const TableViewer = () => {
  const { table } = useDataTableContext();
  const columns = table.getAllLeafColumns();
  const [columnOrder, setColumnOrder] = useState(
    columns.map((column, index) => {
      return column.id;
    })
  );

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newColumnOrder = Array.from(columnOrder);
    const [removed] = newColumnOrder.splice(result.source.index, 1);
    newColumnOrder.splice(result.destination.index, 0, removed);

    setColumnOrder(newColumnOrder);
    table.setColumnOrder(newColumnOrder);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="columns">
          {(provided) => (
            <Flex
              flexFlow={"column"}
              gap={"0.5rem"}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columns.map((column, i) => {
                const displayName =
                  column.columnDef.meta === undefined
                    ? column.id
                    : column.columnDef.meta.displayName;
                return (
                  <Draggable key={column.id} draggableId={column.id} index={i}>
                    {(provided) => (
                      <Grid
                        key={column.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        templateColumns={"auto 1fr"}
                        gap="0.5rem"
                        alignItems={"center"}
                      >
                        <Flex
                          {...provided.dragHandleProps}
                          alignItems={"center"}
                          padding={"auto 0 auto 0"}
                        >
                          {/* <FaGripLinesVertical /> */}
                          <Icon as={FaGripLinesVertical} color={"gray.400"} />
                        </Flex>
                        <Flex
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Box> {displayName}</Box>
                          <Switch
                            isChecked={column.getIsVisible()}
                            onChange={column.getToggleVisibilityHandler()}
                          />
                        </Flex>
                      </Grid>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
