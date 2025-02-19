import { EmptyState as ChakraEmptyState, VStack } from "@chakra-ui/react";
import { HiColorSwatch } from "react-icons/hi";
import { useDataTableContext } from "../context/useDataTableContext";
export interface EmptyStateProps {
  title?: string;
  description?: string;
}

export const EmptyState = ({
  title = "No records",
  description = "Add a new events to get started or refine your search",
}: EmptyStateProps) => {
  const { query } = useDataTableContext();
  const { data } = query;
  return (
    <>
      {(data ?? { count: 0 }).count <= 0 && (
        <ChakraEmptyState.Root>
          <ChakraEmptyState.Content>
            <ChakraEmptyState.Indicator>
              <HiColorSwatch />
            </ChakraEmptyState.Indicator>
            <VStack textAlign="center">
              <ChakraEmptyState.Title>{title}</ChakraEmptyState.Title>
              <ChakraEmptyState.Description>
                {description}
              </ChakraEmptyState.Description>
            </VStack>
          </ChakraEmptyState.Content>
        </ChakraEmptyState.Root>
      )}
    </>
  );
};
