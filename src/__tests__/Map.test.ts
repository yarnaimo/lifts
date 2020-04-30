import { MapAsync } from '..'

const arr = [0, 1]
const arrStr = ['0', '1']

const stringifyResolve = async (n: number) => String(n)

const stringifyReject = async (n: number) => {
    if (n % 2) {
        throw new Error()
    }
    return String(n)
}

test('MapAsync - resolve', async () => {
    const fs = [
        () => MapAsync(arr, stringifyResolve),
        () => MapAsync(stringifyResolve)(arr),
    ]

    for (const f of fs) {
        await expect(f()).resolves.toEqual(arrStr)
    }
})

test('MapAsync - reject', async () => {
    const fs = [
        () => MapAsync(arr, stringifyReject),
        () => MapAsync(stringifyReject)(arr),
    ]

    for (const f of fs) {
        await expect(f()).rejects.toThrowError()
    }
})
