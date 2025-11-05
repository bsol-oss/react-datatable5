import { DefaultTableProps } from './DefaultTable';
export interface DefaultTableServerProps extends DefaultTableProps {
    /**
     * Optional isLoading prop to override auto-detected loading state.
     * If not provided, will automatically detect from DataTableServerContext.
     */
    isLoading?: boolean;
}
/**
 * DefaultTableServer is a wrapper around DefaultTable that automatically
 * detects server-side loading state from DataTableServerContext.
 *
 * Use this component when working with DataTableServer to automatically
 * show skeleton loading state during data fetching.
 *
 * @example
 * ```tsx
 * <DataTableServer columns={columns} {...datatableServer}>
 *   <DefaultTableServer />
 * </DataTableServer>
 * ```
 */
export declare const DefaultTableServer: ({ isLoading: isLoadingOverride, ...props }: DefaultTableServerProps) => import("react/jsx-runtime").JSX.Element;
