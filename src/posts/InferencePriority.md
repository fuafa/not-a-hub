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