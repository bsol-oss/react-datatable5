import { Switch as ChakraSwitch } from "@chakra-ui/react";
import * as React from "react";
export interface SwitchProps extends ChakraSwitch.RootProps {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    rootRef?: React.Ref<HTMLLabelElement>;
    trackLabel?: {
        on: React.ReactNode;
        off: React.ReactNode;
    };
    thumbLabel?: {
        on: React.ReactNode;
        off: React.ReactNode;
    };
}
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement>>;
