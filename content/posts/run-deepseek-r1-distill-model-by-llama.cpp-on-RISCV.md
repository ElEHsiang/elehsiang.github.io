---
title: Run Deepseek R1 Distill Model by Llama.cpp on RISCV
subtitle:
date: 2025-06-16T16:53:48+08:00
slug: ed0d1b2
draft: false
author:
  name: 'Yun'
  link:
  email:
  avatar:
description:
keywords:
license:
comment: false
weight: 0
tags:
  - AI
categories:
  - AI
hiddenFromHomePage: false
hiddenFromSearch: false
hiddenFromRelated: false
hiddenFromFeed: false
summary:
    resources:
      - name: featured-image
        src: featured-image.jpg
      - name: featured-image-preview
        src: featured-image-preview.jpg
toc: true
math: false
lightgallery: false
password:
message:
repost:
  enable: false 
  url:

# See details front matter: https://fixit.lruihao.cn/documentation/content-management/introduction/#front-matter
---

<!--more-->
## Build llama.cpp

```shell
git clone git@github.com:ggml-org/llama.cpp.git
```

Current `llama.cpp` only support RVV on VLEN-128 so we disable RVV for now. The openMP might not support in the target environment so we also disable it.

Cross-compiler the `llama-cli` binary

```shell
cmake -B build-riscv-nov \ 
  -DCMAKE_SYSTEM_NAME=Linux \
  -DCMAKE_SYSTEM_PROCESSOR=riscv64 \
  -DCMAKE_C_COMPILER=riscv64-unknown-linux-gnu-clang \
  -DCMAKE_CXX_COMPILER=riscv64-unknown-linux-gnu-clang++ \
  -DCMAKE_BUILD_TYPE=Release \
  -DGGML_RVV=OFF \
  -DGGML_OPENMP=OFF \
  -DBUILD_SHARED_LIBS=OFF \
  .
  
cmake --build build-riscv-nov -j64
```


The `llama-cli` is in `build-riscv-nov/bin/`.

## Get model

llama.cpp use GGUF format weight so find the model like [DeepSeek-R1-Distill-Qwen-7B-GGUF](https://huggingface.co/bartowski/DeepSeek-R1-Distill-Qwen-7B-GGUF/tree/main) . In the `files and versions` tab, we can find the weight file `DeepSeek-R1-Distill-Qwen-7B-Q4_K_M.gguf`([DeepSeek-R1-Distill-Qwen-7B-Q4_K_M.gguf · bartowski/DeepSeek-R1-Distill-Qwen-7B-GGUF at main](https://huggingface.co/bartowski/DeepSeek-R1-Distill-Qwen-7B-GGUF/blob/main/DeepSeek-R1-Distill-Qwen-7B-Q4_K_M.gguf) ).

## Run model

Copy the `llama-cli` and `DeepSeek-R1-Distill-Qwen-7B-Q4_K_M.gguf` to target machine(haps/hifive board/qemu…etc). Type this command to run it

```shell
./llama-cli -m DeepSeek-R1-Distill-Qwen-7B-Q4_K_M.gguf --threads 16 -st --prompt 'What is 1+1?'
```
