import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { Column } from "@tanstack/react-table";
import { ReactNode, useEffect, useRef, useState } from "react";
import { FaGripLinesVertical } from "react-icons/fa6";
import invariant from "tiny-invariant";
import { Switch } from "../ui/switch";
import { useDataTableContext } from "./context/useDataTableContext";
interface ColumnCardProps {
  columnId: string;
}

function ColumnCard({ columnId }: ColumnCardProps) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false); // NEW
  const { table } = useDataTableContext();

  const displayName = columnId;
  const column = table.getColumn(columnId);
  invariant(column);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => {
        return { column: table.getColumn(columnId) };
      },
      onDragStart: () => setDragging(true), // NEW
      onDrop: () => setDragging(false), // NEW
    });
  }, [columnId, table]);

  return (
    <Grid
      ref={ref}
      templateColumns="auto 1fr"
      gap="0.5rem"
      alignItems="center"
      style={dragging ? { opacity: 0.4 } : {}} // fading the piece during dragging
    >
      <Flex alignItems="center" padding="0">
        <FaGripLinesVertical color="gray.400" />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>{displayName}</Box>
        <Switch
          checked={column.getIsVisible()}
          onChange={column.getToggleVisibilityHandler()}
        />
      </Flex>
    </Grid>
  );
}

interface CardContainerProps {
  location: number;
  children: ReactNode;
}

function CardContainer({ location, children }: CardContainerProps) {
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ location }),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, [location]);

  // const isDark = (location + location) % 2 === 1;

  function getColor(isDraggedOver: boolean): string {
    if (isDraggedOver) {
      return "skyblue";
    }
    // return isDark ? "lightgrey" : "white";
    return "white";
  }

  return (
    <Box backgroundColor={getColor(isDraggedOver)} ref={ref}>
      {children}
    </Box>
  );
}

export const TableViewer = () => {
  const { table } = useDataTableContext();

  const [order, setOrder] = useState<string[]>(
    table.getAllLeafColumns().map((column) => {
      return column.id;
    })
  );

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) {
          return;
        }
        const destinationLocation = destination.data.location as number;
        // const sourceLocation = source.data.location;
        const sourceColumn = source.data.column as Column<any>;
        const columnOrder = order.map((id) => {
          if (id == sourceColumn.id) {
            return "<marker>";
          }
          return id;
        });

        const columnBefore = columnOrder.slice(0, destinationLocation + 1);
        const columnAfter = columnOrder.slice(
          destinationLocation + 1,
          columnOrder.length
        );
        const newOrder = [
          ...columnBefore,
          sourceColumn.id,
          ...columnAfter,
        ].filter((id) => id != "<marker>");

        table.setColumnOrder(newOrder);
        setOrder(newOrder);
      },
    });
  }, [order, table]);
  return (
    <Flex flexFlow={"column"} gap={"0.25rem"}>
      {table.getState().columnOrder.map((columnId, index) => {
        return (
          <CardContainer location={index}>
            <ColumnCard columnId={columnId}></ColumnCard>
          </CardContainer>
        );
      })}
    </Flex>
  );
};
