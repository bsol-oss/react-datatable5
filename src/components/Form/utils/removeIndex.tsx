export function removeIndex(str: string) {
    return str.replace(/\.\d+\./g, '.');
}