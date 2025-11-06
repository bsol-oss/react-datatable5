import { FilePickerMediaFile, FilePickerLabels } from './types/CustomJSONSchema7';
type MediaLibraryBrowserPropsBase = {
    onFetchFiles?: (search: string) => Promise<FilePickerMediaFile[]>;
    filterImageOnly?: boolean;
    labels?: FilePickerLabels;
    enabled?: boolean;
};
type MediaLibraryBrowserPropsSingle = MediaLibraryBrowserPropsBase & {
    multiple?: false;
    onFileSelect?: (fileId: string) => void;
    selectedFileId?: string;
    onSelectedFileIdChange?: (fileId: string) => void;
};
type MediaLibraryBrowserPropsMultiple = MediaLibraryBrowserPropsBase & {
    multiple: true;
    onFileSelect?: (fileId: string[]) => void;
    selectedFileId?: string[];
    onSelectedFileIdChange?: (fileId: string[]) => void;
};
export type MediaLibraryBrowserProps = MediaLibraryBrowserPropsSingle | MediaLibraryBrowserPropsMultiple;
export declare const MediaLibraryBrowser: ({ onFetchFiles, filterImageOnly, labels, enabled, multiple, onFileSelect, selectedFileId: controlledSelectedFileId, onSelectedFileIdChange, }: MediaLibraryBrowserProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
