import { UseTranslationResponse } from 'react-i18next';
export interface DataDisplayProps {
    variant?: 'horizontal' | 'stats' | '';
    translate?: UseTranslationResponse<any, any>;
}
export declare const DataDisplay: ({ variant }: DataDisplayProps) => import("react/jsx-runtime").JSX.Element;
