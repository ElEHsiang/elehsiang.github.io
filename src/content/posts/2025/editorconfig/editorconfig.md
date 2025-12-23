---
title: "editorconfig"
date: 2025-12-24
tags: ['code','vim']
description: " "
---

Vim 有支援 [editorconfig](https://editorconfig.org/)，你可以在不同的 project 底下寫 `.editorconfig` 檔案作為 per-project 的 config。
在有多個專案使用不同語言或是 coding style 時很方便。

example

```toml
root = true

# C
[*.{c,h,cpp}]
indent_style = space
indent_size = 2

#cmake
[{CMakeLists.txt,*.cmake,*.rst}]
indent_style = space
indent_size = 2
```

PS. root: 讓 vim 不會再往 parent 找 editorconfig
