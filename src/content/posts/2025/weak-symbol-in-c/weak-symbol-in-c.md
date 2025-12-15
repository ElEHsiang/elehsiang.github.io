---
title: "Weak Symbol in C"
date: 2025-12-15
tags: ['code','C']
description: " "
---

Weak symbol 並不在 C/C++ standard 中，他屬於 compiler extension。
在 GCC or clang 中可以在 symbol 前加上以下關鍵字定義為 weak symbol

```cpp
__attribute((weak))
```

其效果在 dynamic link 與 static link 中會有所不同

- **dynamic link**: weak symbol 會被 strong symbol 的實作取代
- **static link**: 先看到的實作先用，取決於 link 順序。

假設有下面實作

`hal_weak.cc`

```cpp
__attribute((weak))
Result halMockScanDevices() {
  printf("weak symbol\n");
  return ERROR_NO_DEVICE;
}
```

`mock.cc`

```cpp
Result halMockScanDevices() {
  printf("strong symbol\n");
  return ERROR_NO_DEVICE;
}
```

`CMakeLists.txt`

```cmake
add_library(hal
    hal.cc
    hal_weak.cc
)

add_library(hal_mock
    mock.cc
)

# Helper to declare a gtest
function(add_gtest name)
  add_executable(${name} ${ARGN})
  target_compile_features(${name} PRIVATE cxx_std_17)
  target_link_libraries(${name} PRIVATE gtest gtest_main Threads::Threads)
endfunction()

add_gtest(matmul_test matmul_test.cc)
target_link_libraries(matmul_test PRIVATE hal_mock hal) # both dynamic linked & static linked use the strong symbol in hal_mock

# target_link_libraries(matmul_test PRIVATE hal hal_mock ) # dynamic linked use strong symbol, static linked use weak symbol
```
