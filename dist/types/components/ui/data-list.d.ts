import { DataList as ChakraDataList } from "@chakra-ui/react";
import * as React from "react";
export declare const DataListRoot: React.ForwardRefExoticComponent<ChakraDataList.RootProps & React.RefAttributes<HTMLDListElement>>;
interface ItemProps extends ChakraDataList.ItemProps {
    label: React.ReactNode;
    value: React.ReactNode;
    info?: React.ReactNode;
    grow?: boolean;
}
export declare const DataListItem: React.ForwardRefExoticComponent<ItemProps & React.RefAttributes<HTMLDivElement>>;
export {};
