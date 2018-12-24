---
title: How to implement DeepReadonly in TypeScript
url: DeepReadonly
tags:
  - TypeScript
date: 2018.10.10
author: 文学少女
type: todo
desc: The `TypeScript` lib provides a `Readonly` type to make all properties in a given type parameter `T` readonly. However, this built-in util type doesn't apply for nested properties in an object. This post will give an implementation which work for nested properties and try to explain some require knowledge.
---

因为各种限定的实现是一样的，所以这里就以 readonly 举例子
首先定义出对于 Object 和 Array 的分支处理
```ts
type DeepReadonlyObject<T> = {
	[P in T]: DeepReadonly<T[P]>	
}
```

```ts
interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>{}
```

这里用 interface 是因为 typescript 的 type-alise 不允许 递归调用，例如：
```ts
type A<T> = T extends number ? T : A<T> // 报错
```

```ts
type DeepReadonly<T> = {
	T extends Array<infer U> ? DeepReadonlyArray<U> :
	T extends {} ? DeepReadonlyObject<T> :
	T
}
```