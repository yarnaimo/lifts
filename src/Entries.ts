export const EntriesStrict = <T extends { [key: string]: any }>(obj: T) => {
    return Object.entries(obj) as [keyof T, T[keyof T]][]
}

export const FromEntriesStrict = <
    T extends readonly (readonly [string, any])[]
>(
    array: T,
) => {
    return Object.fromEntries(array) as { [K in T[number][0]]: T[number][1] }
}
