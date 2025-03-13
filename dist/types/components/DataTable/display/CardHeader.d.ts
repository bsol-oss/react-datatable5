import { ImageProps } from "@chakra-ui/react";
import { Row } from "@tanstack/react-table";
import { IconType } from "react-icons";
export interface CardHeaderProps<TData> {
    row: Row<TData>;
    imageColumnId?: keyof TData;
    titleColumnId?: keyof TData;
    tagColumnId?: keyof TData;
    tagIcon?: IconType;
    showTag?: boolean;
    imageProps?: ImageProps;
}
export declare const CardHeader: <TData>({ row, imageColumnId, titleColumnId, tagColumnId, tagIcon, showTag, imageProps, }: CardHeaderProps<TData>) => import("react/jsx-runtime").JSX.Element;
