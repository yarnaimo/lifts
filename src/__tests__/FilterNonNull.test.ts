import { expectType } from 'tsd'
import { FilterNonNull } from '../FilterNonNull'

test('FilterNonNull', () => {
    const array = ['a', null, 0, false, undefined]

    const result = FilterNonNull(array)

    expectType<(string | number | boolean)[]>(result)
    expect(result).toEqual(['a', 0, false])
})
