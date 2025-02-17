export declare const useSchemaContext: () => {
    schema: import("json-schema").JSONSchema7;
    serverUrl: string;
    order: string[];
    ignore: string[];
    onSubmit: ((data: unknown) => Promise<void>) | undefined;
    preLoadedValues: object;
    rowNumber: string | number | undefined;
    displayText: import("./Form").DisplayTextProps;
};
