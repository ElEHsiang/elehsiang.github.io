---
title: 141 Linked List Cycle
subtitle:
date: 2024-11-23T16:06:16+08:00
slug: 4f10808
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
給一個 linked list 確認是否有迴圈。

## 思路
拿兩個 pointer 從頭開始走，一個一次走一步，一個一次走兩步，相遇即是有迴圈。如果先走的 pointer 到了終點代表沒迴圈。

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode *first, *second;
        
        if (!head)
            return false;
        
        first = head;
        second = head->next;
        
        while (second) {
            if (first == second)
                return true;
            
            first = first->next;
            
            if (second->next) {
                second = second->next->next;
            } else {
                return false;
            }
        }
        
        return false;
    }
};
```
