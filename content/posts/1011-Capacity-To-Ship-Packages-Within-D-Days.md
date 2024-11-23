---
title: 1011. Capacity to Ship Packages Within D Days
subtitle:
date: 2024-11-23T16:06:16+08:00
slug: c97f512
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
給定連續的貨物重量 weights 與天數 D，在 D 天能載完所有貨物的船需要多大空間？

weights = [1,2,3,4,5,6,7,8,9,10], D = 5  
output: 15

## 思路
這題用要找能在 D 天載完所有貨物的最小空間。假設一天載完全部貨物船需要 sum(weights) 的空間，一天載一個貨物則至少需要 max(weights) 的空間。  
因此我們可以從 max(weights) ~ sum(weights) 的區間找出一個值將 weights 分成 D 段。演算法分兩個部分。

1. 二分法搜尋在 max(weights) ~ sum(weights) 尋找船的大小
2. 給定船的大小，能用幾天將貨物載完

```cpp
class Solution {
public:
    int shipWithinDays(vector<int>& weights, int D) {
        auto it = max_element(weights.begin(), weights.end());
        int l = *it;
        int r = accumulate(weights.begin(), weights.end(), 0) + 1;

        // 1. binary search
        while (l < r) {
            int day = 0;
            int mid = l + (r - l) / 2;
            int total = 0;

            // 2. calculate how many days should be used
            for (auto it = weights.begin(); it != weights.end(); it++) {
                int weight = *it;

                if (total + weight > mid) {
                    total = weight;
                    day += 1;
                } else {
                    total += weight;
                }
            }

            if (day < D) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }

        return l;
    }
};
```

## Reference
如何寫好 binary search 可參考: [透過 loop invariant 學習怎麼寫正確的 binary search](https://kkc.github.io/2019/03/28/learn-loop-invariant-from-binary-search/)
