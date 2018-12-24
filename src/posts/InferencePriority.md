---
title: 'TypeScript inference Priority'
url: InferencePriority
tags:
  - TypeScript
date: 2018.10.10
author: fuafa
type: todo
desc: 在看 Vue 的 TypeScript 的声明文件和一些相关博客时, 了解到在一个 union Type 中, 如果变量同时满足多个类型, TypeScript 会根据类型的类型 (有点拗口) 的相对应优先级来决定 assign 给该变量哪个类型, 本文采取通过举例来了解一下该机制.
---
```ts
export const enum InferencePriority {
	Contravariant     = 1 << 0,  // Inference from contravariant position
	NakedTypeVariable = 1 << 1,  // Naked type variable in union or intersection type
	MappedType        = 1 << 2,  // Reverse inference for mapped type
	ReturnType        = 1 << 3,  // Inference made from return type of generic function
}

export interface InferenceInfo {
	typeParameter: TypeParameter;
	candidates: Type[];
	inferredType: Type;
	priority: InferencePriority;
	topLevel: boolean;
	isFixed: boolean;
}

export const enum InferenceFlags {
	InferUnionTypes = 1 << 0,  // Infer union types for disjoint candidates (otherwise unknownType)
	NoDefault       = 1 << 1,  // Infer unknownType for no inferences (otherwise anyType or emptyObjectType)
	AnyDefault      = 1 << 2,  // Infer anyType for no inferences (otherwise emptyObjectType)
}
```