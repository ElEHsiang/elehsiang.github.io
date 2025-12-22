---
title: "C++ ScopeGuard"
date: 2025-12-22
tags: ['code','cpp']
description: " "
---

ScopeGuard 可以方便在 scope 結束時執行

```cpp
include <cstdio>
#include <functional>

struct ScopeGuard {
  explicit ScopeGuard(std::function<void()> func) { func_ = std::move(func); };
 ~ScopeGuard() {func_();};
  std::function<void()> func_;
};

int main(int argc, char *argv[]) {
  ScopeGuard guard([]() {printf("exit scope\n");});
}
```

執行結果
```
~/workspace/test/cpp ❯ ./a.out
exit scope
```
