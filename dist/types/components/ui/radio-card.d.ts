import { RadioCard } from "@chakra-ui/react";
import * as React from "react";
interface RadioCardItemProps extends RadioCard.ItemProps {
    icon?: React.ReactElement;
    label?: React.ReactNode;
    description?: React.ReactNode;
    addon?: React.ReactNode;
    indicator?: React.ReactNode | null;
    indicatorPlacement?: "start" | "end" | "inside";
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
export declare const RadioCardItem: React.ForwardRefExoticComponent<RadioCardItemProps & React.RefAttributes<HTMLInputElement>>;
export declare const RadioCardRoot: React.ForwardRefExoticComponent<RadioCard.RootProps & React.RefAttributes<HTMLDivElement>>;
export declare const RadioCardLabel: React.ForwardRefExoticComponent<RadioCard.LabelProps & React.RefAttributes<HTMLDivElement>>;
export declare const RadioCardItemIndicator: React.ForwardRefExoticComponent<RadioCard.ItemIndicatorProps & React.RefAttributes<HTMLSpanElement>>;
export {};
