import { expectType } from 'tsd'
import { Switch } from '..'

test('Switch - literal - matched', () => {
    const value = 'b' as 'a' | 'b'

    const result = Switch(value)(
        {
            a: () => 'string A',
            b: () => 'string B',
        },
        () => null,
    )
    expectType<string | null>(result)
    expect(result).toBe('string B')
})

test('Switch - literal - default', () => {
    const value = 'c' as 'a' | 'b'

    const result = Switch(value)(
        {
            a: () => 'string A',
            b: () => 'string B',
        },
        () => null,
    )
    expectType<string | null>(result)
    expect(result).toBe(null)
})

test('Switch - number - matched', () => {
    const value = 1 as number

    const result = Switch(value)(
        {
            [0]: () => 'string 0',
            [1]: () => 'string 1',
        },
        () => null,
    )
    expectType<string | null>(result)
    expect(result).toBe('string 1')
})
