export const Switch = <E extends string | number | symbol>(exp: E) => {
    return <T, U>(
        caseMap: {
            [K in E]: () => T
        },
        default_: () => U,
    ) => {
        if (exp in caseMap) {
            return caseMap[exp]() as T
        } else {
            return default_() as U
        }
    }
}
