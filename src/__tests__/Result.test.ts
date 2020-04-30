import { expectType } from 'tsd'
import { IResult, Result } from '..'

const okValue = 'Succeeded'
const errorMessage = 'Error Message'

const pair = () => {
    return [Result.ok(okValue), Result.err(new Error(errorMessage))]
}

test('result value', () => {
    const [resOk, resErr] = pair()

    expectType<IResult<string, Error>[]>([resOk, resErr])

    expect(resOk.valueOrError).toBe(okValue)
    expect(resErr.valueOrError).toBeInstanceOf(Error)
    expect((resErr.valueOrError as Error).message).toBe(errorMessage)
})

test('switch', () => {
    const [resOk, resErr] = pair()

    const fn = (res: IResult<string, Error>) =>
        Result.switch(res)({
            ok: (value) => {
                return value.toUpperCase()
            },
            err: (error) => {
                return error.message.length
            },
        })

    const swOk = fn(resOk)
    expectType<string | number>(swOk)
    expect(swOk).toBe(okValue.toUpperCase())

    const swErr = fn(resErr)
    expect(swErr).toBe(errorMessage.length)
})

test('switch - throw', async () => {
    const [resOk, resErr] = pair()

    const fn = (res: IResult<string, Error>) =>
        Result.switch(res)({
            ok: (value) => {
                return value.toUpperCase()
            },
            err: (error) => {
                throw error
            },
        })

    const swOk = fn(resOk)
    expectType<string>(swOk)
    expect(swOk).toBe(okValue.toUpperCase())

    expect(() => fn(resErr)).toThrowError()
})

test('wrap - sync', async () => {
    const resOk = Result.wrap(() => okValue)
    expect(resOk.valueOrError).toBe(okValue)

    const resErr = Result.wrap(() => {
        if (true) {
            throw new Error(errorMessage)
        }
        return okValue
    })
    expect(resErr.valueOrError).toBeInstanceOf(Error)
    expect((resErr.valueOrError as Error).message).toBe(errorMessage)

    expectType<IResult<string, unknown>[]>([resOk, resErr])
})

test('wrap - async', async () => {
    const resOk = await Result.wrap(async () => okValue)
    expect(resOk.valueOrError).toBe(okValue)

    const resErr = await Result.wrap(async () => {
        if (true) {
            throw new Error(errorMessage)
        }
        return okValue
    })
    expect(resErr.valueOrError).toBeInstanceOf(Error)
    expect((resErr.valueOrError as Error).message).toBe(errorMessage)

    expectType<IResult<string, unknown>[]>([resOk, resErr])
})
