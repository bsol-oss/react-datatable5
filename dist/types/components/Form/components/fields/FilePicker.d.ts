import { FilePickerMediaFile, FilePickerLabels } from '../types/CustomJSONSchema7';
import { InputDefaultProps } from './types';
interface FilePickerDialogProps {
    open: boolean;
    onClose: () => void;
    onSelect: (fileId: string) => void;
    title: string;
    filterImageOnly?: boolean;
    onFetchFiles?: (search: string) => Promise<FilePickerMediaFile[]>;
    onUploadFile?: (file: File) => Promise<string>;
    enableUpload?: boolean;
    labels?: FilePickerLabels;
    translate: (key: string) => string;
    colLabel: string;
}
export declare function FilePickerDialog({ open, onClose, onSelect, title, filterImageOnly, onFetchFiles, onUploadFile, enableUpload, labels, translate, colLabel, }: FilePickerDialogProps): import("react/jsx-runtime").JSX.Element | null;
export declare const FilePicker: ({ column, schema, prefix }: InputDefaultProps) => import("react/jsx-runtime").JSX.Element;
export {};
