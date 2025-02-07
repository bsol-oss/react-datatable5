/// <reference types="react" />
import type { HTMLChakraProps, RecipeProps } from "@chakra-ui/react";
export interface LinkButtonProps extends HTMLChakraProps<"a", RecipeProps<"button">> {
}
export declare const LinkButton: import("react").ForwardRefExoticComponent<LinkButtonProps & import("react").RefAttributes<HTMLAnchorElement>>;
