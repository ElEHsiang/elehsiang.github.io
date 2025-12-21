---
title: "helix config"
date: 2025-12-22
tags: ['editor']
description: " "
---

平常使用的 editor 是 [kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim) 加上自己的改動。
最近在使用上會偶有卡頓，特別是開很大的檔案的時候(可能碰到的專案如 linux kernel, IREE, QEMU...etc)。
剛好看到 [Julia Evans 的網誌](https://jvns.ca/blog/2025/10/10/notes-on-switching-to-helix-from-vim/)，因此嘗試使用 rust 開發的 [helix editor](https://helix-editor.com/)。

使用上感受速度非常快，各種功能如 lsp, fzf 等等幾乎也都內建好，安裝與設定上沒遇到問題。
最大麻煩是....key binding 與 visual 的概念跟 vim 不同，十幾年的肌肉記憶在轉換上還是遇到了麻煩。
目前參考網誌中改了版簡單的 config 。

```toml
theme = "kanagawa"
[editor]
# Sync clipboard with system clipboard
default-yank-register = "+"
true-color = true
clipboard-provider = "pasteboard"

[editor.cursor-shape]
insert = "bar"
normal = "block"
select = "underline"

[keys.normal]
# I didn't like that Ctrl+C was the default "toggle comments" shortcut
"#" = "toggle_comments"

# I didn't feel like learning a different way
# to go to the beginning/end of a line so
# I remapped ^ and $
"^" = "goto_first_nonwhitespace"
"$" = "goto_line_end"

[keys.select]
"^" = "goto_first_nonwhitespace"
"$" = "goto_line_end"
# Escape the madness! No more fighting with the cursor! Or with multiple cursors!
esc = ["collapse_selection", "keep_primary_selection", "normal_mode"]

[keys.normal.space]
# I write a lot of text so I need to constantly reflow,
# and missed vim's `gq` shortcut
l = ":reflow"

[keys.normal.g]
"_" = "goto_line_end"
```

設定後雖然與 vim 操作還是有差，大致上可用了。但像 vim 按 '*' 可以 search selection + hightliht all search 這種方便功能還是沒有，對於在很長一段 code 要找些變數的使用還是稍嫌不便一些。
