import { NumberInput as ChakraNumberInput } from "@chakra-ui/react";
import * as React from "react";
export interface NumberInputProps extends ChakraNumberInput.RootProps {
}
export declare const NumberInputRoot: React.ForwardRefExoticComponent<NumberInputProps & React.RefAttributes<HTMLDivElement>>;
export declare const NumberInputField: React.ForwardRefExoticComponent<ChakraNumberInput.InputProps & React.RefAttributes<HTMLInputElement>>;
export declare const NumberInputScrubber: React.ForwardRefExoticComponent<ChakraNumberInput.ScrubberProps & React.RefAttributes<HTMLDivElement>>;
export declare const NumberInputLabel: React.ForwardRefExoticComponent<ChakraNumberInput.LabelProps & React.RefAttributes<HTMLLabelElement>>;
