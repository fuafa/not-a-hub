---
title: Why making TypeScript fully sound is unrealistic
url: TypeSafe
tags:
  - TypeScript
date: 2018.12.24
author: fuafa
type: TODO
desc: TypeScript is always criticized for its unsoundness, which is the main reason (my imagination) that holds many JS progammers back. As soundness is an important concept of a type system, why TypeScript doesn't make it 100% sound. With this question as many programmers have, I found the reason may conclude to JavaScript 辣鸡语言, 毁我青春.
---

众所周知, TypeScript is a superset of JavaScript, which can be translated to ***a valid JavaScript program is also a valid TypeScript program*** (IMO TypeScript may be a subset of JavaScript since the former reject programs but the latter is 100% complete -- no reject, but TypeScript does have the type system which JavaScript doesn't have. So the superset is confused.). And, we know that JavaScript is very dynamic and fundamentally flawed, its fantastic behavior often suprises the users (explain later). With these premises, if TypeScript is designed to be 100% sound, the stricter type checker will reject more programs which is valid in JavaScript (which is called false-positive in math), that violates the TypeScript's design goal.

## What's wrong with JavaScript
[As RyanCavanaugh pointed out in this issue](https://github.com/Microsoft/TypeScript/issues/9825#issuecomment-306272034)
> A fully-sound type system built on top of existing JS syntax is simply a fool's errand; it cannot be done in a way that produces a usable programming language. Even Flow doesn't do this (people will claim that it's sound; it isn't; they make trade-offs in this area as well).

> JS runtime behavior is extremely hostile toward producing a usable sound type system. Getters can return a different value each time they're invoked. The valueOf and toString functions are allowed to do literally anything they want; it's possible that the expression x + y produces a nondeterministic type due to this. The delete operator has side effects which are extremely difficult to describe with a type system. Arrays can be sparse. An object with a own property of type undefined behaves differently from an object with a prototype property of the same value. What could even be done about code like const x = { \["to" + "String"\]: 42 } + "oops"; (disallow all computed property names? disallow all primitive values? disallow operator + except when you've... done what, exactly)?

Let's go through these one by one.

1. **Getters can return a different value each time they're invoked**

Property access of an object may invoke the getter function if one is defined. Say
```js
let obj = {}
Object.defineProperty(obj, 'x', {
  get() {
    // whatever you want, and whatever is evil...
  }
})
```

2. **The valueOf and toString functions are allowed to do literally anything they want**

`valueOf` and `toString` functions may be called silently when performing `+` operation or comparation (`==`, `===`) operation, it is much like the flaw 1 above.

3. **The delete operator has side effects which are extremely difficult to describe with a type system**

I suppose a situation like this:

```js
let a = [1, 2, 3] // string[]
delete a[0] // make Array sparse, but aware in runtime
```

4. **Arrays can be sparse**

An sparse `Array<T>` is of type `undefined | T`, TypeScript will reject accessing properties of T for array item, this is sound, consider situation like an array `a = [1,2,3]` is declare to have type `Array<number>`, but accidently assigning a value to `a[1000]`, which leaves `a[3...999]` to be undefined, but the type checker will not know in compile time.

5. **An object with a own property of type undefined behaves differently from an object with a prototype property of the same value**

~~Since I can not find a situation like this can cheat the type checker, I suppose this was fixed after 2017.6.6 when this is declared. Need to check out the release notes.~~

UPDATE: I come up with this situation which describes this bug(or feature), but the implementation is stupid, seems nobody will code this way, so it remains as a note.
```ts
class C {
  x?: number
}
Object.defineProperty(C.prototype, 'x', {
  value: 'x'
})
const c = new C()
c.x = 1
function unsafe(o: C) {
  delete o.x
}
unsafe(c)
c.x + 1 // infered as number, but in runtime it is string
```

6. **What could even be done about code like const `x = { ["to" + "String"]: 42 }` + "oops"**

Computed properties is not awared by type checker in compile time. If someone accidently define a computed `toString` property(yes or not a function), which will shadow the `toString` function in the prototype, and then performing `+` operation like above, the `toString` property will be called as a callable function implicitly. Unfortunately, TypeScript doesn't know `toString` is being shodowed and it chooses to allow this behavious otherwise it may be too strict to reject most JavaScript programs.

## What's the unsound part of TypeScript
Conclude from the above, most of unsoundness is caused by mutation, or dynamically adding properties in runtime. In addition, the subtpying rules is anther and more worse frustrated unsoundness issue. There may be others unsoundness in TypeScript, but I not going to list them all (I don't know all as well, what a shame...), for further infomation, go to TypeScript issue tracker and search tag *By Design* or *Design Limitation*.

## How can I avoid unsoundness
I come up with some advises *may* reduce the unsoundness, not proved, so they are unsound as well.

1. Avoid adding properties dynamically, since TypeScript knows nothing about JavaScript runtime.
2. Use immutable data structure.
3. Adding type notation if infering fails.
4. Learn some substitution rules between complex types (Array, Object, Custom object), like Liskov substitution principle, co/contravariance etc.
5. Of caurse, always have the `strict` option on in tsconfig.
