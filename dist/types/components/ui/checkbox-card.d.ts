import { CheckboxCard as ChakraCheckboxCard } from "@chakra-ui/react";
import * as React from "react";
export interface CheckboxCardProps extends ChakraCheckboxCard.RootProps {
    icon?: React.ReactElement;
    label?: React.ReactNode;
    description?: React.ReactNode;
    addon?: React.ReactNode;
    indicator?: React.ReactNode | null;
    indicatorPlacement?: "start" | "end" | "inside";
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
export declare const CheckboxCard: React.ForwardRefExoticComponent<CheckboxCardProps & React.RefAttributes<HTMLInputElement>>;
export declare const CheckboxCardIndicator: React.ForwardRefExoticComponent<ChakraCheckboxCard.IndicatorProps & React.RefAttributes<SVGSVGElement>>;
