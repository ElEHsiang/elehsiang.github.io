---
title: OSX profiling tools
tags: osx
---

最近接到任務要 profile apple m1 chip，主要是針對 SOC / DVFS / scheduler，因此收集些工具 & benchmark 在此紀錄。

# Tools

## dtrace

## xctrace / instruments
instruments 是 xcode 中錄 trace events / pmu / 系統資訊(ex. thermal) 的工具，同時有 GUI 介面幫助分析。
xctrace 是 instruments 錄 trace 的 command line 版本。

可記錄的資訊共 18 種
* d

### command
```
xcrun xctrace record launch -- ./dhrystone -l 100
```

## powermetrics

## taskinfo

# Benchmark

## geekbench

app store 買
燒 cpus

## lm bench

## cinebench

同時燒 cpu/gpu

## gfxbnech

燒 gpu