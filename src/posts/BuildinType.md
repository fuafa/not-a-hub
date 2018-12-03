# TypeScript build in types
Typescript 的内置类型，只是作为 cheat sheet

```ts
interface I {
	X: number,
	Y: string,
	Z: boolean,
	N: null,
	U: undefined
}
```

```ts
/**
 * Pick<T, K extends keyof T>
 * 从 T 中选出 K，返回 K 的类型
 * @returns { K: T[K] }
 */
type A = Pick<, 'Z'> // return { Z: any }
```