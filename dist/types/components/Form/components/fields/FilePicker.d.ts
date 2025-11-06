import { FilePickerMediaFile, FilePickerLabels } from '../types/CustomJSONSchema7';
import { InputDefaultProps } from './types';
interface MediaBrowserDialogProps {
    open: boolean;
    onClose: () => void;
    onSelect: (file: FilePickerMediaFile) => void;
    title: string;
    filterImageOnly?: boolean;
    onFetchFiles?: (search: string) => Promise<FilePickerMediaFile[]>;
    onUploadFile?: (file: File) => Promise<string>;
    enableUpload?: boolean;
    labels?: FilePickerLabels;
    translate: (key: string) => string;
    colLabel: string;
}
export declare function MediaBrowserDialog({ open, onClose, onSelect, title, filterImageOnly, onFetchFiles, onUploadFile, enableUpload, labels, translate, colLabel, }: MediaBrowserDialogProps): import("react/jsx-runtime").JSX.Element | null;
export declare const FilePicker: ({ column, schema, prefix }: InputDefaultProps) => import("react/jsx-runtime").JSX.Element;
export {};
