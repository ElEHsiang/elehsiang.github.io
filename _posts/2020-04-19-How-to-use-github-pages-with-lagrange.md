---
layout: post
title: "用 lagrange + github pages 建立網誌"
author: "Yun"
categories: journal
tags: [web, blog]
image: mountains.jpg
---

記錄下用 lagrange + github pages 時遇到什麼問題。

# 步驟
1. 安裝環境
2. 建立 repo
3. 建立 local 靜態網誌
4. 上傳網誌至 repo
5. 部署網誌

## 安裝環境
首先要安裝 ruby & jekyll，我環境是 OSX 10.14。首先用 home brew  安裝 ruby
```
brew install ruby
```
裝完後如果遇到 ruby command not found 則將 /usr/local/opt/ruby/bin:$PATH 加入 PATH

接著安裝 jekyll
```
gem install jekyll
```
此時遇到了 ```jekyll command not found```，先輸入下面 command 並查看 jekyll 是否有裝在 GEM PATHS 中
```
gem env
```
     - GEM PATHS:
     - /usr/local/lib/ruby/gems/2.7.0
     - /Users/{username}/.gem/ruby/2.7.0
     - /usr/local/Cellar/ruby/2.7.1/lib/ruby/gems/2.7.0

確認裝在哪後用 soft link 連到 /usr/local/bin 吧
```
cd /usr/local/bin && ln -s /usr/local/lib/ruby/gems/2.7.0/bin/jekyll jekyll 
```

## 建立 repo

進入自己的 github 開一個新的 repo，repo 名稱可為 username.github.io，username 就自己取吧。
記得 initialize README 先不要勾，讓他產出一個空的 repo。

## 建立 local 靜態網誌
這裡參考 [Lagrange教學](https://lenpaul.github.io/Lagrange/journal/getting-started.html) 的 local installation。檔案連結[https://github.com/LeNPaul/Lagrange/archive/gh-pages.zip](https://github.com/LeNPaul/Lagrange/archive/gh-pages.zip)

下載後解壓縮並將解出來的資料夾命名成跟你的 repo 一樣並進入該資料夾  
輸入下方指令建立靜態網誌
```
bundle install
bundle exec jekyll serve
```
會看到 server address 為 http://127.0.0.1:4000  
可從此連結看到建立好的靜態網誌

## 上傳網誌至 repo

先 init repo
```
git init
```

先將所有檔案加入做成 commit
```
git add *
git commit -s
```

接著建立 remote 並將檔案 push 到 github，REPO_URL 換成自己的 repo 網址
```
git remote add origin REPO_URL
git push
```

## 部署網誌

參考 [jekyll github actions](https://jekyllrb.com/docs/continuous-integration/github-actions/)  
建立一個 ```.github/workflow/github-pages.yml``` 檔案，內容如下
```
name: Build and deploy Jekyll site to GitHub Pages

on:
  push:
    branches:
      - master

jobs:
  github-pages:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: helaili/jekyll-action@2.0.1
        env:
          JEKYLL_PAT: ${{ secrets.JEKYLL_PAT }}
```
接著每次 push 新的網誌時就會自動 deploy 了

# 參考資料

[Lagrange教學](https://lenpaul.github.io/Lagrange/journal/getting-started.html)
[jekyll docs](https://jekyllrb.com/docs/)