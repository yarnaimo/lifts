import is from '@sindresorhus/is'

export const FilterNonNull = <T>(array: (T | null | undefined)[]) => {
    return array.filter((value): value is T => !is.nullOrUndefined(value))
}
