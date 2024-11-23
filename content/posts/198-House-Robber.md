---
title: 198 House Robber
subtitle:
date: 2024-11-23T16:06:17+08:00
slug: d36e97c
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
給一個 array 以不能取相鄰數的方式取出最大總和。

## 思路
在走訪陣列時我們能取得的最大值為 max(prevMax + nums[i], curMax)， prevMax 為從 i-2 前能得到的最大值，curMax 則是 i-1 前能得到的最大值。因此不斷更新 prevMax & curMax 就可得到答案。

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        int prevMax = 0, curMax = 0, tmp;
        
        if (!nums.size())
            return 0;
        
        if (nums.size() < 2)
            return nums[0];
        
        curMax = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            tmp = max(prevMax + nums[i], curMax);
            prevMax = curMax;
            curMax = tmp;
        }
        
        return curMax;
    }
};
```
