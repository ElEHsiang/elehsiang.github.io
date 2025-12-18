---
title: "Linux Kernel ALIGN macro"
date: 2025-12-18
tags: ['code','linux']
description: " "
---

## ALIGN

向上對齊

```c
#define ALIGN(x, a)        __ALIGN_MASK(x, (typeof(x))(a) - 1)
#define __ALIGN_MASK(x, mask)   (((x) + (mask)) & ~(mask))
```

拆成兩部分看

- (x + a - 1)：保證 x 超過最近的 a 整數倍。
- & ~(a - 1)：清除低位，達成對齊。

ex.

```c
unsigned long addr = 0x1003;
unsigned long aligned = ALIGN(addr, 0x1000);  // 對齊到 4KB
// aligned = 0x2000
```

## ALIGN_DOWN

向下對齊

```c
#define ALIGN_DOWN(x, a)   ((x) & ~((typeof(x))(a) - 1))
```

- x & ~(a - 1)：直接清除低位位元，達成向下對齊。

```c
unsigned long addr = 0x1234;
unsigned long aligned_down = ALIGN_DOWN(addr, 0x1000);  // 對齊到 4KB
// aligned_down = 0x1000
```

## Linux source code

```c
#define ALIGN(x, a)		__ALIGN_KERNEL((x), (a))
#define ALIGN_DOWN(x, a)	__ALIGN_KERNEL((x) - ((a) - 1), (a))
#define __ALIGN_MASK(x, mask)	__ALIGN_KERNEL_MASK((x), (mask))
#define __ALIGN_KERNEL(x, a)		__ALIGN_KERNEL_MASK(x, (__typeof__(x))(a) - 1)
#define __ALIGN_KERNEL_MASK(x, mask)	(((x) + (mask)) & ~(mask))
```
