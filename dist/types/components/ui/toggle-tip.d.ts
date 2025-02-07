import { Popover as ChakraPopover } from "@chakra-ui/react";
import * as React from "react";
export interface ToggleTipProps extends ChakraPopover.RootProps {
    showArrow?: boolean;
    portalled?: boolean;
    portalRef?: React.RefObject<HTMLElement>;
    content?: React.ReactNode;
}
export declare const ToggleTip: React.ForwardRefExoticComponent<ToggleTipProps & React.RefAttributes<HTMLDivElement>>;
export declare const InfoTip: React.ForwardRefExoticComponent<Partial<ToggleTipProps> & React.RefAttributes<HTMLDivElement>>;
