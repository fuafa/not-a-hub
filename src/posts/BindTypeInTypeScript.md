---
title: 通过类型声明学习 JavaScript 的 bind function
url: BindTypeInTypeScript
tags:
  - 坑
  - TypeScript
date: 2018.12.10
author: 我坑我自己
cover: ./hollow-knight-2.jpeg
type: hidden
desc: 以前, 学习 JavaScript 的内置函数大多通过 MDN, 对于大多数函数来说, 用 MDN 已经足够了, 稍微想了解得深一点的话就去看 spec, 了解过 TypeScript 之后, 现在又多了一个方式去了解一个函数, 本文尝试从 TypeScript 的类型声明文件配合 spec 看看是否对于一些细节较多的函数能够有一个更好的了解.
---

TypeScript version: 3.2
```ts
interface CallableFunction extends Function {
  ...

  bind<T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T): (...args: A) => R;
  bind<T, A0, A extends any[], R>
    (this: (this: T, arg0: A0, ...args: A) => R, thisArg: T, arg0: A0):
    (...args: A) => R;
  bind<T, A0, A1, A extends any[], R>
    (this: (this: T, arg0: A0, arg1: A1, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1):
    (...args: A) => R;
  bind<T, A0, A1, A2, A extends any[], R>
    (this: (this: T, arg0: A0, arg1: A1, arg2: A2, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2):
    (...args: A) => R;
  bind<T, A0, A1, A2, A3, A extends any[], R>
    (this: (this: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3):
    (...args: A) => R;
  bind<T, AX, R>
    (this: (this: T, ...args: AX[]) => R, thisArg: T, ...args: AX[]):
    (...args: AX[]) => R;
}
```

```ts
interface NewableFunction extends Function {
  ...

  bind<A extends any[], R>
    (this: new (...args: A) => R, thisArg: any):
    new (...args: A) => R;
  bind<A0, A extends any[], R>
    (this: new (arg0: A0, ...args: A) => R, thisArg: any, arg0: A0):
    new (...args: A) => R;
  bind<A0, A1, A extends any[], R>
    (this: new (arg0: A0, arg1: A1, ...args: A) => R, thisArg: any, arg0: A0, arg1: A1):
    new (...args: A) => R;
  bind<A0, A1, A2, A extends any[], R>
    (this: new (arg0: A0, arg1: A1, arg2: A2, ...args: A) => R, thisArg: any, arg0: A0, arg1: A1, arg2: A2):
    new (...args: A) => R;
  bind<A0, A1, A2, A3, A extends any[], R>
    (this: new (arg0: A0, arg1: A1, arg2: A2, arg3: A3, ...args: A) => R, thisArg: any, arg0: A0, arg1: A1, arg2: A2, arg3: A3):
    new (...args: A) => R;
  bind<AX, R>(this: new (...args: AX[]) => R, thisArg: any, ...args: AX[]): new (...args: AX[]) => R;
}
```