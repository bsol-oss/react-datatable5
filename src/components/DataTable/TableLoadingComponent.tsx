import { useDataTableContext } from "./useDataTable";

export interface TableLoadingComponentProps {
  render: (loading: boolean) => JSX.Element;
}

export const TableLoadingComponent = ({
  render,
}: TableLoadingComponentProps) => {
  const { loading } = useDataTableContext();
  return <>{render(loading)}</>;
};
