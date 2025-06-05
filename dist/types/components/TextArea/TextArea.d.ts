import type React from "react";
interface CustomTextareaProps {
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    rows?: number;
    maxLength?: number;
    autoFocus?: boolean;
    invalid?: boolean;
    required?: boolean;
    label?: string;
    helperText?: string;
    errorText?: string;
}
declare const Textarea: React.ForwardRefExoticComponent<CustomTextareaProps & React.RefAttributes<HTMLDivElement>>;
export { Textarea };
