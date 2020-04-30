# Lifts

**LI**ghtweight **F**unctional programming library for **T**ype**S**cript

## Install

```sh
yarn add lifts
# or
npm i -S lifts
```

## Usage

### Do

Shorthand for Immediately Invoked Function Expression

```ts
const date = new Date('2020-04-17')

const result: number | null = Do(() => {
    // check date is valid
    if (!isNaN(date)) {
        return date.getDate()
    } else {
        return null
    }
})
result // => 17

// equivalent to
const result = (() => {
    if (!isNaN(date)) {
        return date.getDate()
    } else {
        return null
    }
})()
```

### Switch

Object-Style `switch`

```ts
const fn = (value: string) =>
    Switch(value)(
        {
            a: () => 'String A',
            b: () => 'String B',
        },
        () => null, // default value
    )

fn('a') // => 'string A'
fn('b') // => 'string B'
fn('c') // => null (default value)
```

### Result

```ts
const parseDate = (dateStr: string): IResult<Date, Error> => {
    const date = new Date(dateStr)

    // check date is valid
    if (!isNaN(date)) {
        return Result.ok(date)
    } else {
        return Result.err(new Error('Invalid Date'))
    }
}

parseDate('2020-04-17')
// => { isOk: true, valueOrError: Date('2020-04-17') }

parseDate('foo')
// => { isOk: false, valueOrError: Error('Invalid Date') }
```

#### Result.switch

```ts
const result = parseDate('2020-04-17')

Result.switch(result)({
    ok: (value: Date) => {
        // called if result is Ok
        return value.getDate()
    },
    err: (error: Error) => {
        // called if result is Err
        return null
    },
})
// => 17
```

```ts
const result = parseDate('foo')

Result.switch(result)({
    ok: (value) => {
        return value.getDate()
    },
    err: (error) => {
        return null
    },
})
// => null
```

#### Result.wrap

Wraps Error with `Result.err()` if error caught, else wraps value with `Result.ok()`.

```ts
const result = Result.wrap(() => {
    if (condition) {
        return true
    } else {
        throw new Error()
    }
})
```

### MapAsync

<!-- ```ts
``` -->

### Pipe

<!-- ```ts
``` -->
