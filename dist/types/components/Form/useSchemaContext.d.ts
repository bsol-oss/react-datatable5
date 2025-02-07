export declare const useSchemaContext: () => {
    schema: import("json-schema").JSONSchema7;
    serverUrl: string;
    order: string[];
    ignore: string[];
    onSubmit: import("react-hook-form").SubmitHandler<unknown> | undefined;
    preLoadedValues: object;
    rowNumber: string | number | undefined;
    displayText: import("./Form").DisplayTextProps;
};
