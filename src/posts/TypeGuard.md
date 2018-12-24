---
title: Special Types in TypeScript
url: TypeGuard
tags:
  - suki
  - test
date: 2018.10.10
author: fuafa
type: hidden
desc: xxxx
---

1. TypeScript's `any` assigns to thing, but TypeScript's `{} | void` only assigns to `{} | void` (存疑)
2. `any` is assignable *to* and *from* all other types, both a top type and a bottom type, with no corresponding term in term of type-theory
3. Top type T: (all extends T), bottom type R: (nothing extends R)