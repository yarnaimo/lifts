import { expectType } from 'tsd'
import { EntriesStrict, FromEntriesStrict } from '..'

type Key = 'a' | 'b' | 'c'
type Value = 'value' | 'value2' | null

const obj = {
    a: 'value',
    b: 'value2',
    c: null,
} as const

const array = [
    ['a', 'value'],
    ['b', 'value2'],
    ['c', null],
] as const

test('EntriesStrict', () => {
    const result = EntriesStrict(obj)

    expectType<[Key, Value][]>(result)
    expect(result).toEqual(array)
})

test('FromEntriesStrict', () => {
    const result = FromEntriesStrict(array)

    expectType<Record<Key, Value>>(result)
    expect(result).toEqual(obj)
})
