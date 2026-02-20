import { FilePickerMediaFile, FilePickerLabels } from './types/CustomJSONSchema7';
type MediaLibraryBrowserPropsBase = {
    onFetchFiles?: (search: string) => Promise<FilePickerMediaFile[]>;
    filterImageOnly?: boolean;
    labels?: FilePickerLabels;
    enabled?: boolean;
};
type MediaLibraryBrowserPropsSingle = MediaLibraryBrowserPropsBase & {
    multiple?: false;
    onFileSelect?: (file: FilePickerMediaFile) => void;
    selectedFile?: FilePickerMediaFile;
    onSelectedFileChange?: (file: FilePickerMediaFile | undefined) => void;
};
type MediaLibraryBrowserPropsMultiple = MediaLibraryBrowserPropsBase & {
    multiple: true;
    onFileSelect?: (files: FilePickerMediaFile[]) => void;
    selectedFile?: FilePickerMediaFile[];
    onSelectedFileChange?: (files: FilePickerMediaFile[]) => void;
};
export type MediaLibraryBrowserProps = MediaLibraryBrowserPropsSingle | MediaLibraryBrowserPropsMultiple;
export declare const MediaLibraryBrowser: ({ onFetchFiles, filterImageOnly, labels, enabled, multiple, onFileSelect, selectedFile: controlledSelectedFile, onSelectedFileChange, }: MediaLibraryBrowserProps) => import("react/jsx-runtime").JSX.Element;
export {};
