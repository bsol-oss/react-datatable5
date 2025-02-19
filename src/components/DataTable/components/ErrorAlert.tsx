import { Alert } from "@chakra-ui/react";
import { useDataTableContext } from "../context/useDataTableContext";
export interface ErrorAlertProps {
  showMessage?: boolean;
}

export const ErrorAlert = ({ showMessage = true }: ErrorAlertProps) => {
  const { query } = useDataTableContext();
  const { isError, error } = query;
  return (
    <>
      {isError && (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{error.name}</Alert.Title>
            {showMessage && (
              <Alert.Description>{error.message}</Alert.Description>
            )}
          </Alert.Content>
        </Alert.Root>
      )}
    </>
  );
};
