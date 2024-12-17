import { Tag as ChakraTag } from "@chakra-ui/react";
import * as React from "react";
export interface TagProps extends ChakraTag.RootProps {
    startElement?: React.ReactNode;
    endElement?: React.ReactNode;
    onClose?: VoidFunction;
    closable?: boolean;
}
export declare const Tag: React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLSpanElement>>;
