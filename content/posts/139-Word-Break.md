---
title: 139 Word Break
subtitle:
date: 2024-11-23T16:06:16+08:00
slug: 8d1530f
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
  - leetcode
categories:
  - leetcode
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
## 題目
給一個字串與一組單字，看字串是否能用這組單字組成。

## 思路
可使用 backtracking。用 index 紀錄目前字串的位置，接著將單字一個個拿出來與字串比較，相符則將 index 往後移並繼續比較，如果 index 與字串長度相等代表此字串可由這組單字組成。單用此方式會 TLE，因此增加一個 vector 紀錄已找過但無法得到答案的 index ，減少多餘運算。


```cpp
class Solution {
public:
    
    vector<int> failed;
    
    bool bt(string s, vector<string> &wordDict, int s_i) {
        bool found = false;
        
        if (s_i == s.size())
            return true;
        
        auto it = find(failed.begin(), failed.end(), s_i);
        if (it != failed.end())
            return false;
        
        for (auto w: wordDict) {
            if (s_i + w.size() <= s.size()) {
                string sub = s.substr(s_i, w.size());
                
                if (w.compare(sub) == 0) {
                    found |= bt(s, wordDict, s_i + w.size());
                }
                if (found)
                    return true;
            } 
        }
        
        failed.push_back(s_i);
        
        return false;
    }
    
    bool wordBreak(string s, vector<string>& wordDict) {
        sort(wordDict.begin(), wordDict.end());
        
        return bt(s, wordDict, 0);
        
    }
};
```
