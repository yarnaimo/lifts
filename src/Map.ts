import is from '@sindresorhus/is'
import pmap from 'p-map'

export interface IMap {
    <Element, NewElement>(
        input: Iterable<Element>,
        mapper: pmap.Mapper<Element, NewElement>,
        options?: pmap.Options,
    ): Promise<NewElement[]>

    <Element, NewElement>(
        mapper: pmap.Mapper<Element, NewElement>,
        options?: pmap.Options,
    ): (input: Iterable<Element>) => Promise<NewElement[]>
}

export const MapAsync: IMap = (arg1: any, arg2: any, arg3?: any) => {
    if (is.function_(arg1)) {
        return (arg0: any) => pmap(arg0, arg1, arg2)
    }
    return pmap(arg1, arg2, arg3) as any
}
