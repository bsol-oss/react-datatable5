/// <reference types="react" />
export declare const useSchemaContext: () => {
    schema: import("json-schema").JSONSchema7;
    serverUrl: string;
    order: string[];
    ignore: string[];
    onSubmit: ((data: unknown) => Promise<void>) | undefined;
    rowNumber: string | number | undefined;
    displayText: Partial<import("./Form").DisplayTextProps>;
    idMap: Record<string, object>;
    setIdMap: import("react").Dispatch<import("react").SetStateAction<Record<string, object>>>;
};
