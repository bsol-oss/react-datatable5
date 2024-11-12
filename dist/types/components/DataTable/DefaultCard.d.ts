import { Row } from "@tanstack/react-table";
import { IconType } from "react-icons";
export interface DefaultCardProps<TData> {
    row: Row<TData>;
    imageColumnId?: keyof TData;
    titleColumnId?: keyof TData;
    tagColumnId?: keyof TData;
    tagIcon?: IconType;
    showTag?: boolean;
}
export declare const DefaultCard: <TData>({ row, imageColumnId, titleColumnId, tagColumnId, tagIcon, showTag, }: DefaultCardProps<TData>) => import("react/jsx-runtime").JSX.Element;
