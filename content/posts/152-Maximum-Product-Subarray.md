---
title: 152 Maximum Product Subarray
subtitle:
date: 2024-11-23T16:06:16+08:00
slug: f9d5139
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
給一個數列尋找 subarray 能得到的最大乘積。

## 思路
由於是乘積，所以可能遇到 subarray 中出現兩個負數相乘而得到正數，因此需要紀錄 subarray 可得到的最小＆最大值。在走訪 array 時會不斷比較下列三者並找紀錄最小＆最大值。
* current value
* 前方 subarray 能乘得的最小值
* 前方 subarray 能乘得的最大值


```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int curMax, curMin, res;
        int localMax, localMin;
        int v;
        
        if (!nums.size())
            return 0;
        
        curMax = curMin = res = nums[0];
        
        for (int i = 1; i < nums.size(); i++) {
            v = nums[i];
            localMax = max(v, v * curMax);
            localMax = max(localMax, v * curMin);
            
            localMin = min(v, v * curMax);
            localMin = min(localMin, v * curMin);
            
            curMax = localMax;
            curMin = localMin;
            
            res = max(res, curMax);
        }

        return res;
    }
};
```
