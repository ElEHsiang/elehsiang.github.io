---
title: 91 Decode Ways
subtitle:
date: 2024-11-23T16:06:16+08:00
slug: 4e817bb
draft: true
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
  - draft
categories:
  - draft
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
假定英文字母可由以下方式 decode，給定一串數字可以有幾種 decode 方法。

    A => 1
    B => 2 
    ...
    Z => 26

## 思路
假設只有 'A' ~ 'I' (1 ~ 9) 的數字可以 decode，字串 "226" 能解碼的方式只有一種： 'BBF'。字母有 26 個，所以要考量到兩個情況:

1. 一位數字 1 ~ 9
2. 兩位數字 10 ~ 26

使用一個陣列記錄在第幾個數字前可以得出幾種組合。以 "226" 為例

dp[0] 代表 "" 一種組合  
dp[1] 代表 "2" 一種組合 "B"  
dp[2] 代表 "22" 可有兩種組合 "BB" & "V"，因此數量是 dp[0] + dp[1]
接著以此類推即可得到答案。

ps. 特例 case 是字串開頭為 '0' 時無法 decode

```cpp
class Solution {
public:
    int numDecodings(string s) {
        int length = s.size();
        vector<int> dp (length + 1, 0);
        
        if (s.empty() || s[0] == '0')
            return 0;
        
        dp[0] = 1;
        
        for (int i = 1; i <= length; i++) {
            if (s[i-1] != '0')
                dp[i] = dp[i - 1];
            
            if (i > 1 && (s[i - 2] == '1' || (s[i - 2] == '2' && s[i-1] <= '6')))
                dp[i] += dp[i - 2];
        }
        
        return dp[length];
    }
};
```