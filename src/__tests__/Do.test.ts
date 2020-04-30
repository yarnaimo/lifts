import { Do } from '..'

test('Do - string', () => {
    const value = 'a' as string | number

    const result = Do(() => {
        if (typeof value === 'string') {
            return value.toUpperCase()
        } else {
            return value
        }
    })

    expect(result).toBe('A')
})

test('Do - number', () => {
    const value = 0 as string | number

    const result = Do(() => {
        if (typeof value === 'string') {
            return value.toUpperCase()
        } else {
            return value
        }
    })

    expect(result).toBe(0)
})
