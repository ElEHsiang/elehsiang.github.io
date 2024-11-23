---
title: 143 Reorder List
subtitle:
date: 2024-11-23T16:06:16+08:00
slug: ec477b9
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
將一個 linked list 重新用下方方式排列

    Given a singly linked list L: L0→L1→…→Ln-1→Ln,
    reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

## 思路
較簡單的方式是用一個 deque 存下所有 node，接著再依序從 deque 的頭尾將 node 串接。此方法時間＆空間複雜度都是 O(n)。另一種處理方式為
1. 尋找中間的 node
2. reverse 後半的 list
3. 串接兩段 list

這樣空間複雜度可減為 O(1)，但要注意分成兩個 list 的 head/tail 處理。以下範例 code 為第二種方式

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    void reorderList(ListNode* head) {
        ListNode *head1, *head2;
        ListNode *p1, *p2;
        ListNode *pre, *tmp;
        
        if (!head || !head->next)
            return;
        
        // find mid
        head1 = head;
        p1 = head;
        p2 = head;
        while (p2->next && p2->next->next) {
            p1 = p1->next;
            p2 = p2->next->next;
        }
        
        // reverse bottom half list
        p2 = p1->next;
        p1->next = nullptr;
        pre = nullptr;
        while (p2) {
            tmp = p2->next;
            p2->next = pre;
            pre = p2;
            p2 = tmp;
        }
        head2 = pre;
        
        // merge two lists
        for (p1 = head1, p2 = head2; p1;) {
            auto t = p1->next;
            p1->next = p2;
            p1 = p2;
            p2 = t;
        }
    }
};
```
