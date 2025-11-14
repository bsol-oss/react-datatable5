import { OnChangeFn, Updater, RowData, TableFeature } from '@tanstack/react-table';
export type DensityState = 'xs' | 'sm' | 'md' | 'lg';
export interface DensityTableState {
    density: DensityState;
}
export interface DensityOptions {
    enableDensity?: boolean;
    onDensityChange?: OnChangeFn<DensityState>;
}
export interface DensityInstance {
    setDensity: (updater: Updater<DensityState>) => void;
    toggleDensity: (value?: DensityState) => void;
    getDensityValue: (value?: DensityState) => number;
}
declare module '@tanstack/react-table' {
    interface TableState extends DensityTableState {
    }
    interface TableOptionsResolved<TData extends RowData> extends DensityOptions {
    }
    interface Table<TData extends RowData> extends DensityInstance {
    }
}
export declare const DensityFeature: TableFeature<any>;
