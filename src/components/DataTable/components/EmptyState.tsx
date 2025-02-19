import { EmptyState as ChakraEmptyState, VStack } from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import { HiColorSwatch } from "react-icons/hi";
import { useDataTableServer } from "../useDataTableServer";
import { useDataTableServerContext } from "../context/useDataTableServerContext";
export interface EmptyStateProps {
  query: UseQueryResult;
  title?: string;
  description?: string;
}

export const EmptyState = ({
  title = "No records",
  description = "Add a new events to get started or refine your search",
}: EmptyStateProps) => {
  const { isEmpty } = useDataTableServerContext();
  return (
    <>
      {isEmpty && (
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
