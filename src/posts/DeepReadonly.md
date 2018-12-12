# Implement nested readonly/partial... object type in Typescript

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