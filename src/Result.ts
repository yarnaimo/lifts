import { Promisable } from './_types'

export class Result {
    static ok<T>(value: T) {
        return new Ok<T>(value)
    }
    static err<E>(error: E) {
        return new Err<E>(error)
    }

    static switch<T, E>(result: IResult<T, E>) {
        return <FT, FE>({
            ok,
            err,
        }: {
            ok: (value: T) => FT
            err: (error: E) => FE
        }) => {
            return result.isOk
                ? ok(result.valueOrError)
                : err(result.valueOrError)
        }
    }

    static wrap<T, E = unknown>(fn: () => Promise<T>): Promise<IResult<T, E>>
    static wrap<T, E = unknown>(fn: () => T): IResult<T, E>

    static wrap<T, E = unknown>(
        fn: () => Promisable<T>,
    ): Promisable<IResult<T, E>> {
        try {
            const rawResult = fn()

            if (rawResult instanceof Promise) {
                return rawResult
                    .then((r) => Result.ok(r))
                    .catch((error) => Result.err<E>(error))
            } else {
                return Result.ok(rawResult)
            }
        } catch (error) {
            return Result.err<E>(error)
        }
    }
}

export type IResult<T, E> = Ok<T> | Err<E>

export abstract class AbsResult<T, E> {
    abstract isOk: boolean
    abstract valueOrError: T | E
    // abstract getOrNull(): T | null
}

export class Ok<T> extends AbsResult<T, any> {
    isOk: true = true
    valueOrError: T

    constructor(valueOrError: T) {
        super()
        this.valueOrError = valueOrError
    }

    // getOrNull(): T {
    //     return this.valueOrError
    // }
}

export class Err<E> extends AbsResult<any, E> {
    isOk: false = false
    valueOrError: E

    constructor(valueOrError: E) {
        super()
        this.valueOrError = valueOrError
    }

    // getOrNull(): null {
    //     return null
    // }
}
