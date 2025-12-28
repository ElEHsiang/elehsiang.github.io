---
title: "clang-format"
date: 2025-12-28
tags: ['code','cpp']
description: " "
---

clang-format 可以用來幫助自動化 format 程式碼，也可以針對 git staged file 使用。

這邊是一份 Google C++ Style Guide 的 clang-format 設定，可以放在專案的根目錄中檔名為 .clang-format 。

```yaml
# 基於 Google C++ Style Guide 的樣式設定
# 官方文件參考: https://google.github.io/styleguide/cppguide.html

BasedOnStyle: Google

# 縮排寬度為 2 個空格
IndentWidth: 2

# 每行最大字元限制為 80
ColumnLimit: 80

# 指標對齊方式：靠左 (例如 int* p; 而非 int *p;)
# Google 規範中，指標符號 * 應靠近型別
DerivePointerAlignment: false
PointerAlignment: Left

# 存取修飾詞 (public, private) 的縮排偏移
# Google 規定這些關鍵字應比 class 縮排少 1 或 2 格，通常是 1
AccessModifierOffset: -1

# 允許將簡單的函式放在同一行
# Google 允許在不影響可讀性的情況下將極短的函式合併為一行
AllowShortFunctionsOnASingleLine: All

# 大括號換行風格
# Google 規定左大括號 { 不換行
BreakBeforeBraces: Attach

# 命名空間縮排
# Google 規範通常不縮排 namespace 內部的內容，以節省水平空間
NamespaceIndentation: None

# Include 排序區塊定義
# 讓 clang-format 自動按照 Google 的規範排序標頭檔
IncludeCategories:
  - Regex:           '^<ext/.*>\s*$'
    Priority:        2
  - Regex:           '^<.*\.h>\s*$'
    Priority:        1
  - Regex:           '^<.*>\s*$'
    Priority:        2
  - Regex:           '.*'
    Priority:        3

# 使用 C++11 之後的標準語法
Standard: Latest

# 在 return 語句中保留註解
KeepEmptyLinesAtTheStartOfBlocks: false

# 限制連續空行的數量
MaxEmptyLinesToKeep: 1
```

當你 git add 改動好檔案時想為這些檔案跑 formatter，可以下

```shell
git-clang-format
```

接著看 git diff 就能看到 format 後的差異。

當然也可以針對某一系列改動作 format，例如:

```shell
git clang-format --diff <commit1> <commit2>
```
