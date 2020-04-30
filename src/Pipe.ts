type Fn<Pr extends boolean, In, Out> = (
    input: In,
) => Pr extends true ? Out | PromiseLike<Out> : Out

type PromiseIf<IsP extends boolean, T> = IsP extends true ? Promise<T> : T

export interface IPipe<IsP extends boolean> {
    <A, B>(input0: A, op1: Fn<IsP, A, B>): PromiseIf<IsP, B>

    <A, B, C>(input0: A, op1: Fn<IsP, A, B>, op2: Fn<IsP, B, C>): PromiseIf<
        IsP,
        C
    >

    <A, B, C, D>(
        input0: A,
        op1: Fn<IsP, A, B>,
        op2: Fn<IsP, B, C>,
        op3: Fn<IsP, C, D>,
    ): PromiseIf<IsP, D>

    <A, B, C, D, E>(
        input0: A,
        op1: Fn<IsP, A, B>,
        op2: Fn<IsP, B, C>,
        op3: Fn<IsP, C, D>,
        op4: Fn<IsP, D, E>,
    ): PromiseIf<IsP, E>

    <A, B, C, D, E, F>(
        input0: A,
        op1: Fn<IsP, A, B>,
        op2: Fn<IsP, B, C>,
        op3: Fn<IsP, C, D>,
        op4: Fn<IsP, D, E>,
        op5: Fn<IsP, E, F>,
    ): PromiseIf<IsP, F>

    <A, B, C, D, E, F, G>(
        input0: A,
        op1: Fn<IsP, A, B>,
        op2: Fn<IsP, B, C>,
        op3: Fn<IsP, C, D>,
        op4: Fn<IsP, D, E>,
        op5: Fn<IsP, E, F>,
        op6: Fn<IsP, F, G>,
    ): PromiseIf<IsP, G>

    <A, B, C, D, E, F, G, H>(
        input0: A,
        op1: Fn<IsP, A, B>,
        op2: Fn<IsP, B, C>,
        op3: Fn<IsP, C, D>,
        op4: Fn<IsP, D, E>,
        op5: Fn<IsP, E, F>,
        op6: Fn<IsP, F, G>,
        op7: Fn<IsP, G, H>,
    ): PromiseIf<IsP, H>

    <A, B, C, D, E, F, G, H, I>(
        input0: A,
        op1: Fn<IsP, A, B>,
        op2: Fn<IsP, B, C>,
        op3: Fn<IsP, C, D>,
        op4: Fn<IsP, D, E>,
        op5: Fn<IsP, E, F>,
        op6: Fn<IsP, F, G>,
        op7: Fn<IsP, G, H>,
        op8: Fn<IsP, H, I>,
    ): PromiseIf<IsP, I>

    <A, B, C, D, E, F, G, H, I, J>(
        input0: A,
        op1: Fn<IsP, A, B>,
        op2: Fn<IsP, B, C>,
        op3: Fn<IsP, C, D>,
        op4: Fn<IsP, D, E>,
        op5: Fn<IsP, E, F>,
        op6: Fn<IsP, F, G>,
        op7: Fn<IsP, G, H>,
        op8: Fn<IsP, H, I>,
        op9: Fn<IsP, I, J>,
    ): PromiseIf<IsP, J>
}

export const P: IPipe<false> = (input: any, ...functions: any[]) => {
    let currentValue = input

    for (const fn of functions) {
        currentValue = fn(currentValue)
    }

    return currentValue
}

export const PP: IPipe<true> = async (input: any, ...functions: any[]) => {
    let currentValue = input

    for (const fn of functions) {
        currentValue = await fn(currentValue)
    }

    return currentValue
}
