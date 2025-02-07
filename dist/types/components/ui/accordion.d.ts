import { Accordion } from "@chakra-ui/react";
import * as React from "react";
interface AccordionItemTriggerProps extends Accordion.ItemTriggerProps {
    indicatorPlacement?: "start" | "end";
}
export declare const AccordionItemTrigger: React.ForwardRefExoticComponent<AccordionItemTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface AccordionItemContentProps extends Accordion.ItemContentProps {
}
export declare const AccordionItemContent: React.ForwardRefExoticComponent<AccordionItemContentProps & React.RefAttributes<HTMLDivElement>>;
export declare const AccordionRoot: React.ForwardRefExoticComponent<Accordion.RootProps & React.RefAttributes<HTMLDivElement>>;
export declare const AccordionItem: React.ForwardRefExoticComponent<Accordion.ItemProps & React.RefAttributes<HTMLDivElement>>;
export {};
