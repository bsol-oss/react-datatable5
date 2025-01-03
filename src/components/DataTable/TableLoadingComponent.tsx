import { ReactNode } from "react";
import { useDataTableContext } from "./useDataTableContext";

export interface TableLoadingComponentProps {
  render: (loading: boolean) => ReactNode;
}

export const TableLoadingComponent = ({
  render,
}: TableLoadingComponentProps) => {
  const { loading } = useDataTableContext();
  return <>{render(loading)}</>;
};
