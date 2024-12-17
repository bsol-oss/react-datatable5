import { Menu as ChakraMenu } from "@chakra-ui/react";
import * as React from "react";
interface MenuContentProps extends ChakraMenu.ContentProps {
    portalled?: boolean;
    portalRef?: React.RefObject<HTMLElement>;
}
export declare const MenuContent: React.ForwardRefExoticComponent<MenuContentProps & React.RefAttributes<HTMLDivElement>>;
export declare const MenuArrow: React.ForwardRefExoticComponent<ChakraMenu.ArrowProps & React.RefAttributes<HTMLDivElement>>;
export declare const MenuCheckboxItem: React.ForwardRefExoticComponent<ChakraMenu.CheckboxItemProps & React.RefAttributes<HTMLDivElement>>;
export declare const MenuRadioItem: React.ForwardRefExoticComponent<ChakraMenu.RadioItemProps & React.RefAttributes<HTMLDivElement>>;
export declare const MenuItemGroup: React.ForwardRefExoticComponent<ChakraMenu.ItemGroupProps & React.RefAttributes<HTMLDivElement>>;
export interface MenuTriggerItemProps extends ChakraMenu.ItemProps {
    startIcon?: React.ReactNode;
}
export declare const MenuTriggerItem: React.ForwardRefExoticComponent<MenuTriggerItemProps & React.RefAttributes<HTMLDivElement>>;
export declare const MenuRadioItemGroup: React.ForwardRefExoticComponent<ChakraMenu.RadioItemGroupProps & React.RefAttributes<HTMLDivElement>>;
export declare const MenuContextTrigger: React.ForwardRefExoticComponent<ChakraMenu.ContextTriggerProps & React.RefAttributes<HTMLElement>>;
export declare const MenuRoot: React.FC<ChakraMenu.RootProps>;
export declare const MenuSeparator: React.ForwardRefExoticComponent<ChakraMenu.SeparatorProps & React.RefAttributes<HTMLDivElement>>;
export declare const MenuItem: React.ForwardRefExoticComponent<ChakraMenu.ItemProps & React.RefAttributes<HTMLDivElement>>;
export declare const MenuItemText: React.ForwardRefExoticComponent<ChakraMenu.ItemTextProps & React.RefAttributes<HTMLDivElement>>;
export declare const MenuItemCommand: React.ForwardRefExoticComponent<ChakraMenu.CommandProps & React.RefAttributes<HTMLElement>>;
export declare const MenuTrigger: React.ForwardRefExoticComponent<ChakraMenu.TriggerProps & React.RefAttributes<HTMLButtonElement>>;
export {};
