---
title: TypeScript built-in types
url: BuildinType
tags:
  - 复读机
  - TypeScript
date: 2018.09.10
author: 初号复读机
type: completed
# cover: ./hollow-knight-2.jpeg
desc: A walk through of Typescript built-in types. Since it is just a rebuild of what TypeScript had built for us, without much further research, so this post is considered meaningless and recap only.
---

Typescript version: 3.0

```ts
interface I {
  X: number
  Y: string,
  Z: boolean,
  N: null,
  U: undefined
}
```

```ts
type Pick<T, K extends keyof T> = {
  K: T[K]
}

type A = Pick<I, 'Z'> // { Z: boolean }
type B = Pick<I, 'X' | 'Y'> // { X: number, Y: string }
type C = Pick<I, 'A'> // error
```

```ts
/**
 * These 3 have the same structure, so put in together
 */
type Partial<T> = {
  [K in keyof T]?: T[K]
}
type Required<T> = {
  [K in keyof T]-?: T[K]
}
type Readonly<T> = {
  readonly [K in keyof T]: T[K]
}

/** 
 * When the type parameter is has stucture {P: any}, the result is obvious.
 */
type A = Partial<I> // return { X?: number, ... U?: undefined }

/** 
 * It is strange when the type parameter is a primitive type like string, number...
 * As `keyof string` return union of all properties of string,
 * so I were supposing the result should be { [P in Properties]: typeof Array.prototype[P] }
 */
type B<T extends string | number | boolean> = Partial<T> // result T
```

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T
}

type A = Record<'A' | 'B', number> // return { A: number, B: number }
```

```ts
type Exclude<T, U> = T extends U ? never : T
type Extract<T, U> = T extends U ? T : never // Contrary with Exclude

type A = Exclude<'X' | 'Y', 'Y' | 'Z'> // return 'X'
type B = Extract<'X' | 'Y', 'Y' | 'Z'> // return 'Y'
```

```ts
type NonNullable<T> = T extends undefined | null ? never : T

type A = NonNullable<string | string[] | undefined> // string | string[]
```

```ts
type Parameters<T extends (...args: any[]) => any> =
  T extends (...args: infer P) => any ? P : never
type ConstructorParameters<T extends new (...args: any[]) => any> =
  T extends new (...args: infer P) => any ? P : never

declare const foo: (x: number, y: string) => boolean
type A = Parameters<typeof foo> // [number, string]

class C {
  constructor(x: string, y: number) {}
}
// or
interface CC {
  new (...args: [string, number]): C
}
type B = ConstructorParameters<typeof C> // [string, number]
type D = ConstructorParameters<CC> // [string, number]
```

```ts
type ReturnType<T extends (...args: any[]) => any> =
  T extends (...args: any[]) => infer R ? R : any
type InstanceType<T extends new (...args: any[]) => any> =
  T extends new (...args: any[]) => infer R ? R : any

type A = ReturnType<typeof foo> // boolean
type B = InstanceType<typeof C> // C
```

The examples showed above are not exhaustive, just some basic usages and almost many of them are the correct usages, there are edge cases not presenting here, will be updated in the future, em... maybe.
