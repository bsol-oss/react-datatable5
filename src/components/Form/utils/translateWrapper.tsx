import { removeIndex } from "./removeIndex";


export function translateWrapper({
    prefix, column, label, translate,
}: {
    prefix: string;
    column: string;
    label: string;
    translate: any;
}) {
    return translate.t(removeIndex(`${prefix}${column}.${label}`));
}
