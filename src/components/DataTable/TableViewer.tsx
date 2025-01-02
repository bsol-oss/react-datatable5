import { Box, Flex, Grid } from "@chakra-ui/react";
import { useState } from "react";
// import {
//   DragDropContext,
//   Draggable,
//   Droppable,
//   DropResult,
// } from "react-beautiful-dnd";
import { FaGripLinesVertical } from "react-icons/fa";
import { useDataTableContext } from "./useDataTableContext";
import { Switch } from "@/components/ui/switch";

export const TableViewer = () => {
  const { table } = useDataTableContext();
  const columns = table.getAllLeafColumns();
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.id)
  );

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newColumnOrder = Array.from(columnOrder);
    const [removed] = newColumnOrder.splice(result.source.index, 1);
    newColumnOrder.splice(result.destination.index, 0, removed);

    setColumnOrder(newColumnOrder);
    table.setColumnOrder(newColumnOrder);
  };

  // return (
  //   <DragDropContext onDragEnd={handleDragEnd}>
  //     <Droppable droppableId="columns">
  //       {(provided) => (
  //         <Flex
  //           flexFlow="column"
  //           gap="0.5rem"
  //           ref={provided.innerRef}
  //           {...provided.droppableProps}
  //         >
  //           {columns.map((column, index) => {
  //             const displayName =
  //               column.columnDef.meta?.displayName || column.id;

  //             return (
  //               <Draggable
  //                 key={column.id}
  //                 draggableId={column.id}
  //                 index={index}
  //               >
  //                 {(provided) => (
  //                   <Grid
  //                     ref={provided.innerRef}
  //                     {...provided.draggableProps}
  //                     templateColumns="auto 1fr"
  //                     gap="0.5rem"
  //                     alignItems="center"
  //                   >
  //                     <Flex
  //                       {...provided.dragHandleProps}
  //                       alignItems="center"
  //                       padding="0"
  //                     >
  //                       <FaGripLinesVertical color="gray.400" />
  //                     </Flex>
  //                     <Flex justifyContent="space-between" alignItems="center">
  //                       <Box>{displayName}</Box>
  //                       <Switch
  //                         checked={column.getIsVisible()}
  //                         onChange={column.getToggleVisibilityHandler()}
  //                       />
  //                     </Flex>
  //                   </Grid>
  //                 )}
  //               </Draggable>
  //             );
  //           })}
  //           {provided.placeholder}
  //         </Flex>
  //       )}
  //     </Droppable>
  //   </DragDropContext>
  // );
  return <>NotImplemented</>
};
