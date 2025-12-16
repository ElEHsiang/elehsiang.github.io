---
title: "clangd 設定"
date: 2025-12-16
tags: ["code"]
description: " "
---
如果是 cross compile 產生的 compile_commands.json 在使用 lsp 時可能出現 clangd error。
可以設定 `.clangd` configure file 修改 flags 避免找不到對應的 compile flags。

ex.

```yaml
CompileFlags:
    Remove: [-mabi=lp64, -march=armv8.5-a]
```

也可以用以下格式

```yaml
CompileFlags:
  Remove:
    # 移除你遇到的具體錯誤
    - -fmin-function-alignment*
    - -mabi=*
    
    # 建議一併加入以下常見的 GCC Kernel 參數，以防萬一
    - -fconserve-stack
    - -fno-allow-store-data-races
    - -fno-var-tracking-assignments
    - -mno-fp-ret-in-387
    - -mskip-rax-setup
    - -mrecord-mcount
    - -mindirect-branch-register
    - -fno-inline-functions-called-once
    - --param=allow-store-data-races=0
```

reference:
[clangd configuration](https://clangd.llvm.org/config.html)
