import { BoxProps } from '@chakra-ui/react';
import { UseTranslationResponse } from 'react-i18next';
export interface RecordDisplayProps {
    object: object | null;
    boxProps?: BoxProps;
    translate?: UseTranslationResponse<any, any>;
    prefix?: string;
}
export declare const RecordDisplay: ({ object, boxProps, translate, prefix, }: RecordDisplayProps) => import("react/jsx-runtime").JSX.Element;
