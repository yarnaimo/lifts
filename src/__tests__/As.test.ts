import { expectType } from 'tsd'
import { As } from '../As'

test('As', () => {
    const result = As<string>('a')

    expectType<string>(result)
    expect(result).toBe('a')
})

test('As - Error', () => {
    // @ts-expect-error
    As<string>(0)
})
