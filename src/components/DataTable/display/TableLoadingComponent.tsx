import { ReactNode } from "react";
import { useDataTableServerContext } from "../context/useDataTableServerContext";
export interface TableLoadingComponentProps {
  render: (loading: boolean) => ReactNode;
}

export const TableLoadingComponent = ({
  render,
}: TableLoadingComponentProps) => {
  const { query } = useDataTableServerContext();
  return <>{render(query.isLoading)}</>;
};
