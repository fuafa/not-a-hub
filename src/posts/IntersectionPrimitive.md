---
title: Intersection of Primitive types
url: IntersectionPrimitive
tags:
  - TypeScript
date: 2018.12.04
author: fuafa
type: completed
desc: Why at all TypeScript allows type T = number & string.
---

原文发表于知乎 [Typescript有什么冷门但是很好用的特性？
](https://www.zhihu.com/question/276172039/answer/544767103)

Typescript 有一种高级类型叫做 intersection types, 一般用来表示两个对象类型的和 (不知道表达正不正确), 例如:

```ts
type AB = { A: number } & { B: string }
```

一个变量的类型为 AB 需要同时具有 A，B两个属性.
但是两个原始类型的联合类型是什么意思呢? 例如:

```ts
type NumberString = number & string
```
在这个 [issue](https://github.com/Microsoft/TypeScript/issues/12435) 中 DanielRosenwasser 给出了一种可能性, 貌似可以理解为给变量加一个单位，代码直接复制过来了...

```ts
type Feet = number & "feet";
type Inches = number & "inches"

function feet(x: number): Feet {
    return x as Feet;
}

function addFeet(a: Feet, b: Feet) {
    return (a + b) as Feet;
}

function feetToInches(x: Feet) {
    return (x * 12) as Inches
}

let a = feet(10);
let b = feet(20)
addFeet(a, b); //okay

addFeet(10, 20); // error
addFeet(a, feetToInches(b)); // error
```

上面的代码 which prevent from 把两个不同单位的变量（在 js 里都是 number）相加，虽然不知道是不是正确的用法，但是也算是十分有趣。
