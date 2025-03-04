import { HoverCard } from "@chakra-ui/react";
import * as React from "react";
interface HoverCardContentProps extends HoverCard.ContentProps {
    portalled?: boolean;
    portalRef?: React.RefObject<HTMLElement>;
}
export declare const HoverCardContent: React.ForwardRefExoticComponent<HoverCardContentProps & React.RefAttributes<HTMLDivElement>>;
export declare const HoverCardArrow: React.ForwardRefExoticComponent<HoverCard.ArrowProps & React.RefAttributes<HTMLDivElement>>;
export declare const HoverCardRoot: React.FC<HoverCard.RootProps>;
export declare const HoverCardTrigger: React.ForwardRefExoticComponent<HoverCard.TriggerProps & React.RefAttributes<HTMLButtonElement>>;
export {};
