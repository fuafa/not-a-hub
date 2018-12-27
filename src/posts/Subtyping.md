---
title: A very Basic understanding of subtyping
url: Subtyping
tags:
  - Typing
  - TypeScript
date: 2018.12.25
author: fuafa
type: completed
desc: The very first time I met type system is back to my college age when I studied my first programming language Java, but at that time I didn't really know what it actualy means. It is the SML programming language that made me recognize a type system is not just about trivially anotating a value, but also can be expressive and elegant with many interesting features, and the subtyping is one of them.
---

Honestly, I didn't learn subtyping from SML since it doesn't have `subtyping`. SML instead uses another feature called `polymorphism` which is also known as `generic`. Some may treat `subtyping` as a kind of `polymorphism` as well, so `subtyping` is also called `polymorphism subtypes`.

## What is subtyping
The [WIKI](https://www.wikiwand.com/en/Subtyping) has a very clear description of what it is, so I will not give a formal definition here. Instead, I'd like to give some demostrations in TypeScript and see how TypeScript handles `subtyping` relation and a little `polymorphism` as well.

The following codes are run in TypeScript 3.2.x, with `strict` option on.

## Width subtyping
Say a function like this:
```ts
function foo(o: {x: number, y: string}): number {
  return x + 1
}
```
When a `foo` function is called, what kind of parameter can we pass into it? Of caurse a value has type
```ts
type T = {x: number, y: string}
```
will never be wrong. In addition, we can pass extra more informations say
```ts
type R = {x: numebr, y: string, z: boolean}
```
Since the extra property `z` will not be accessed in the function body, any number of extra properties are considered no harm, so we say type `R` is a more specialized the type `T`, and `R` is a subtype of `T`, notating as `R <: T`, any term expected a type `T` can be substituted by a type `R` with safe. TypeScript handles most of the situations like this, but not for situation like passing object literal directly, it will be treated specially and undergo `excess property checking` which would think extra properties are bugs (when mix with optional type, TypeScript pretend its typo as they describes in document). TypeScript suggests two work arounds for this:
```ts
foo({x: 1, y: '', z: true}) // error due to excess property check
// 1. Use string index signature to indicate there may be extra properties
interface ParameterType {
    y?: string;
    x?: number;
    [propName: string]: any;
}

// 2. Assign the object to another variable
const otherObj = { x: 1, y: '', z: true }
foo(otherObj)
```

## Depth subtyping
The `Width subtyping` says a type `A` with more properties considers to be a subtype of a type `B` with less properties but all included in type `A`, which doesn't hold when `B` has a field with a different type than in `A`. Consider situation like this:
```ts
function bar(o: { nested: { x: number, y: string }, r: boolean }) {
  o.nested = { x: 1, y: 'y' }
}
const obj = {
  nested: {
    x: 1,
    y: 'y',
    z: 'x'
  },
  r: true
}
bar(obj)
const _ = obj.nested.z // break the type system
```
If a type system sees `type A = typeof obj` is a subtype of `type B = Parameters<typeof bar>`, and mutation is permitted in a record field, then the type system is unsound. TypeScript is unsound that it permits `A <: B` along with mutation.

Note: if the record field is immuatable, then the `depth subtyping` is sound. So this is yet another example of how not mutation makes programming easy.

## Subtyping of Array
Array's subtyping relation matches the depth subtyping rule. For TypeScript, Arrays are covariance, which means `A <: B`, then `A[] <: B[]`. If mutation is permitted, then this subtyping relataion is unsound. This behavior is much like Java who used this rule for reusable and flexible before having generic. But Java also supplies a runtime check for mutation, and if a mutation does happen, it will raise a `ArrayStoreException` and reject the mutation. This kind of runtime check doesn't hold for TypeScript since type informations are erased in runtime.

## Subtyping of function
To determine if a function `foo` is a subtype of another function `bar`, there are two rules should hold:

1. Function's parameter types are **contravirant**, which means if `A <: B`, then `B => R <: A => R`
2. Function's return types are **covariant**, which means if `A <: B`, then `P => A <: P => B`

In general, if `A <: B`, then `B => A <: A => B`. For TypeScript, this rule holds for function, but does not for class method.

## Bounded Polymorphism
Since subtyping is also one kind polymorphism, for a language just has either generic or subtyping, one may consider use either alternatively. However it may be considered a bad decision.

1. Use subtyping instead of generic would need extra type casting which is dangerous.
2. Use generic instead of subtyping would be at a cost of significantly less code reuse.

So for a modern OOP language, it is commonly suppling both, that is `boundeed polymorphism`. Instead of just saying **a subtype of T** or **for all types T**, a `bounded polymorphism` is **for all types T which is a subtype of R**, written as:

```ts
type A<T extends R> = ...
```

This feature give a type more restriction than just generic and more expressiveness and code reuse than just subtyping.

