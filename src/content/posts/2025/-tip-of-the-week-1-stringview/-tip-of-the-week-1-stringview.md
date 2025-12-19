---
title: "閱讀: Tip of the Week #1 string_view"
date: 2025-12-19
tags: ['code','cpp']
description: " "
---

`string_view`  介於 `char *`  與 `std::string` 中間，提供以下幾點好處

- 能接收不同字串 type (ex. `char *` 、 `const std::string&`)
- 不會產生 deep copy
- 相較於 `char *` 不需強迫使用 `\0` 當作結尾，減少使用上 `strlen`  的呼叫
- 方便處理位於字串中的子字串

但當需要使用 `printf` 或是真的需要實體記憶體紀錄字傳內容時，還是分別用 `char *`  與 `std::string`。
