---
title: "C 語言循環相依 (Circular Dependency) 問題"
date: 2025-12-12
tags: ['C','code']
description: " "
---

## 問題描述

假設兩個 header 有互相引用對方的 structure 會出現 `main file cannot be included recursively` 的 error。

```c
// a.h
#ifndef A_H_
#define A_H_

#include "b.h"

struct A {
  struct B *b;
};
#endif

// b.h
#ifndef B_H_
#define B_H_

#include "a.h"

struct B {
  struct A *a;
};
#endif
```

## 原理

問題在於以下的 flow
1. 編譯器處理 `a.h`，定義了 `A_H_` 
2. 看到 `#include "b.h"` ，進到 `b.h`
3. `b.h` 中看到 `#include "a.h"` ，因已定義過 `A_H_` 所以跳過 `a.h` 的內容
4. `b.h` 中看到 `struct A *a;`，無法辨別 structure 因此編譯失敗。

## 解決方法

使用前置宣告，由於 structure 內僅是指標因此只需要認得 struct A  與 struct B  的 symbol，並不需要知道實際內容。

```c
// a.h
#ifndef A_H_
#define A_H_

// 1. 移除 #include "b.h"
// 2. 加入 struct B 的前置宣告
struct B;

struct A {
  struct B *b;
};

#endif // A_H_

// b.h
#ifndef B_H_
#define B_H_

// 1. 移除 #include "a.h"
// 2. 加入 struct A 的前置宣告
struct A;

struct B {
  struct A *a;
};

#endif // B_H_
```

前置宣告只能定義指標或 reference，無法定義一個實體。
實體也無法相互變成對方的 member，因為無法推斷 structure 的記憶體該使用多少。
