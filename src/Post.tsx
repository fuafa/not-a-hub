import React from 'react'
import { number } from 'prop-types';

// type X<T> = Exclude<keyof T, 'X' | 'Y'>
// interface I {
// 	X: any,
// 	Y: any,
// 	Z: any
// }
// let o = {
// 	X: 1,
// 	Y: '2',
// 	Z: true,
// 	F: null
// }
// type R = typeof o 
// type Y = X<I>
// type Z = Pick<I, X<I>>

// function dropXY<T extends R>(obj: T): Z {
// 	const { X, Y, ...rest } =  obj

// 	return rest
// }


// /**
//  * Pick<T, K extends keyof T>
//  * 从 T 中选出 K，返回 K 的类型
//  * @returns { K: T[K] }
//  */
// type A = Pick<I, 'Z'> // return { Z: any } 

// /**
//  * Record<K extends keyof any, T>
//  * 理解为构建一个新的 Record
//  * @returns { [P in K]: T}
//  */
// type B = Record<'Z', number> // return { Z: number }

// /**
//  * Exclude<T, U>
//  * 从 T 中减去 U，返回剩下的类型
//  * @returns T extends U ? never : T
//  */
// type C = Exclude<'Z' | 'A', 'Z'> // return 'A'

// /**
//  * Extract<T, U>
//  * 返回 T 如果 T 是 U 的子类型 else never
//  */
// type D = Extract<'Z' | 'A', 'A' | 'Z' | 'B'>

// /**
//  * NonNullable<T>
//  * 返回非空类型
//  */
// type E = NonNullable<null | 'Z' | undefined>
// type F<T extends keyof R> = NonNullable<R>
// let ff: F<keyof R> = {
// 	// F: null
// 	X: 1,
// 	Y: '1',
// 	Z: true,
// 	F: null
// }
// // type DeepReadOnlyArray<T> = ReadonlyArray<T>
// interface DeepReadOnlyArray<T> extends ReadonlyArray<DeepReadOnly<T>> {}
// type DeepReadOnlyObject<T> = {
// 	readonly [P in keyof T]: DeepReadOnly<T[P]>
// }
// type DeepReadOnly<T> =
// 	T extends Array<infer U> ? DeepReadOnlyArray<U> :
// 	T extends {} ? DeepReadOnlyObject<T> :
// 	T

// let deepObj = {
// 	a: {
// 		b: {
// 			c: 1
// 		}
// 	}
// }
// type DeepObj = typeof deepObj
// let deepObjCopy: DeepReadOnly<DeepObj>
// type asdf = DeepReadOnly<{a:{b: {c: number, d: number[]}}}>
// let asd: asdf = {
// 	a: {
// 		b: {
// 			c: 1,
// 			d: [1,2,3]
// 		}
// 	}
// }
// asd.a.b.c = 1
// asd.a.b.d[0] = 1

