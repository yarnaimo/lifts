import { MapAsync, P, PP } from '..'

const arr = [0, 1]

const stringifyResolve = async (n: number) => String(n)

const stringifyReject = async (n: number) => {
    if (n % 2) {
        throw new Error()
    }
    return String(n)
}

test('P', () => {
    const r1 = P(1, (n) => n * 3)
    expect(r1).toBe(3)
})

test('PP', async () => {
    const r1 = await PP(
        arr,
        MapAsync((n: number) => n * 3),
        MapAsync(stringifyResolve),
    )
    expect(r1).toEqual(['0', '3'])

    const p2 = PP(
        arr,
        MapAsync((n: number) => n * 3),
        MapAsync(stringifyReject),
    )
    await expect(p2).rejects.toThrowError()
})
