---
title: Module System
url: TsModule
tags:
  - suki
  - test
date: 2018.10.10
author: fuafa
type: hidden
desc: xxxx
---
# Module

1. 如果 import 进来的 module identifier 只用作 type anotation 而不是 expression, 最终生成的 js 文件不会真正的执行 require 函数 ( 对于 dynamic import 会怎么样？ )。例:
```ts
// module.ts
export default class C {
	//...
}
```
```ts
// main.ts
import C from './module'
const c: typeof C // this sentence will not actualy require C from module.ts
```

2. ?

```ts
// lib.d.ts
declare namespace N {
	type T = number | string
}

// 很多库的类型文件都这么写，包括 React, Highlight.js, 
// 但是 Typescript 推荐不要 export a namespace from a module...
// 需要进一步看看...
export = N // This sentence makes lib.d.ts a module
export as namespace N // Only available in a module
```