---
title: 128 Longest Consecutive Sequence
subtitle:
date: 2024-11-23T16:06:17+08:00
slug: 323fe85
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
給定一個數列找出可組成的連續數列有多長。

## 思路
先將數列由小到大排序，並再掃一次找最長連續數列長度。

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        int max_len = 1;
        int cur_len = 1;
        
        if (nums.empty())
            return 0;
        
        sort(nums.begin(), nums.end());
        
        for (int i = 1; i < nums.size(); i++) {
            // same as previous, ignore
            if (nums[i] - nums[i - 1] == 0) {
                continue;
            }else if (nums[i] - nums[i - 1] == 1) {
                cur_len++;
            } else {
                cur_len = 1;
            }
            
            max_len = max(max_len, cur_len);
        }
        
        return max_len;
    }
};
```
