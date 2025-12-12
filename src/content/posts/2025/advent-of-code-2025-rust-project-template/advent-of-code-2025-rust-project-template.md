---
title: "Advent of Code 2025 rust project template"
date: 2025-12-11
tags: ['rust','code']
description: " "
---

[Advent of Code](https://adventofcode.com/2025) 是一個每年在 12 月以聖誕節為主題的程式挑戰活動。
基本上每天會有新的題目，每個題目分成兩個部分，每解完一部分就可以得到一顆星星。
玩家可以用 google 或 github 帳號登入取得屬於自己的 input 並嘗試挑戰。

今年想說來玩玩看並順便練習一下 rust，畢竟工作上沒有什麼機會使用到。
這個 project 範例可以建立每日的 source code 框架並讓使用者實作演算法。

Project layout 如下
```
.
├── Cargo.lock
├── Cargo.toml
├── inputs
│   ├── day01.txt
│   ├── test_day01.txt
├── scripts
│   └── scaffold.sh
└── src
    ├── bin
    │   ├── day00.rs
    └── lib.rs
```

**inputs** 有兩種，`dayXX.txt` 是從 AoC 下載回來的 input，`test_datXX.txt` 可以放題目上的測資。

**scripts** 是方便產生新一天的source code。執行方式為
```shell
# 建立第三天的 source code
./scripts/scaffold.sh 03
```

**src** 放程式碼，`lib.rs` 是讀檔的 helper function。`bin` 底下是每天的 source code，命名規則是 `dayXX.rs`。可用下方的 command 執行
```shell
cargo run --bin day01
```

Cargo.toml 內容
```toml
[package]
name = "aoc_2025"
version = "0.1.0"
edition = "2024"

[dependencies]
anyhow = "1.0"
itertools = "0.13"
regex = "1.10"
```

`day00.rs` 內容如下
```rust
// src/bin/day00.rs
use anyhow::Result;
use aoc_2025::{read_input, read_test_input}; // 引用 lib.rs 中的 helper

fn main() -> Result<()> {
    let date = 03;

    // 1. 讀取輸入
    let test_input = read_test_input(date);

    // 2. 執行 Part 1
    let p1_test_result = part1(&test_input)?;
    println!("Test Part 1: {}", p1_test_result);

    // 3. 執行 Part 2
    let p2_test_result = part2(&test_input)?;
    println!("Test Part 2: {}", p2_test_result);

    // 1. 讀取輸入
    let input = read_input(date);

    // 2. 執行 Part 1
    let p1_result = part1(&input)?;
    println!("Part 1: {}", p1_result);

    // 3. 執行 Part 2
    let p2_result = part2(&input)?;
    println!("Part 2: {}", p2_result);

    Ok(())
}

fn part1(input: &str) -> Result<i64> {
    // 實作邏輯...
    // 範例：計算行數
    let mut sum = 0;

    for line in input.lines() {
    }

    Ok(sum)
}

fn part2(input: &str) -> Result<i32> {
    // 實作邏輯...
    // 範例：計算行數
    let mut count = 0;

    for line in input.lines() {
    }

    Ok(count)
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_INPUT: &str = "\
Line 1
Line 2
Line 3";

    #[test]
    fn test_part1() {
        assert_eq!(part1(TEST_INPUT).unwrap(), 3);
    }
}

```

開始挑戰吧！
