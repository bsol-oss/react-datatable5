import { FlexProps, TextProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
export interface TextCellProps {
    text?: string | number | null | undefined | string[];
    href?: string;
    onClick?: () => void;
    isCopyable?: boolean;
    isBadge?: boolean;
    badgeColor?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink';
    colorPalette?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink';
    label?: string;
    noOfLines?: number[];
    children?: string | number | ReactNode | ReactNode[];
    containerProps?: FlexProps;
    textProps?: TextProps;
}
export declare const TextCell: ({ text, href, onClick, isCopyable, isBadge, badgeColor, colorPalette, label, containerProps, textProps, children, }: TextCellProps) => import("react/jsx-runtime").JSX.Element;
