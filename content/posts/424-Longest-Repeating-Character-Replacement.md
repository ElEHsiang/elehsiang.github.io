---
title: 424 Longest Repeating Character Replacement
subtitle:
date: 2025-06-17T23:16:54+08:00
slug: 8e8d2c9
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

## 題目
給一字串，在可以將字串做 k 次單一字母變化情況下找出最長相同字母的 subarray 長度。

## 思路
可用 map 紀錄 char occurence count，並使用 maxCharCount 紀錄出現最多字母的次數，當 windowEnd - windowStart + 1 - maxCharCount > k 時，就要縮減 window 以符合條件。

換一種思考方式，可以想成最長 subarray 為 maxCharCount + k。當 windowEnd - windowStart + 1 - maxCharCount > k 代表條件已不符合因此當下最長的 subarray 會跟前一輪相同所以 windowStart 往後移動一格，並持續用這 window 往後找，直到 maxCharCount 更新(變多)時 window 才會變大。 

```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        unordered_map<char, int> charCounts;
        int windowStart = 0;
        int maxCharCount = 0;
        int maxLength = 0;

        for (int windowEnd = 0; windowEnd < s.size(); windowEnd++) {
            char endC = s[windowEnd];

            charCounts[endC]++;
            maxCharCount = max(maxCharCount, charCounts[endC]);

            if (windowEnd - windowStart + 1 - maxCharCount > k) {
                char startC = s[windowStart];

                charCounts[startC]--;
                windowStart++;
            }
            maxLength = max(maxLength, windowEnd - windowStart + 1);
        }
        return maxLength;
    }
};

<!--more-->
