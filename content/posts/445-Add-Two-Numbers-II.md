---
title: 445 Add Two Numbers II
subtitle:
date: 2024-11-23T16:06:17+08:00
slug: 5bdb2dd
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
給定兩個用 linked-list 表示的數字，回傳兩個數字加總 (同樣以 linked-list 的格式) 。

    Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
    Output: 7 -> 8 -> 0 -> 7


## 思路
數字相加要處理的是進位，高位數會需先計算低位數的進位才能得知結果。每個高位都會依賴低一位的結果直到個位數計算完成，這概念可以用遞迴實作。遞迴函式要做的有
1. 取得下一位數的 carry (呼叫下一層遞迴)
2. 建立此位數的 ListNode
3. 串接 linked-list

又給與的兩個 linked-list 長度可能不相同，要先計算好兩者長度確認何時開始相加。為了方便我將較長的 list 都換成 list1。最後記得如果有 carry 需再建立一個 ListNode 作為 list的起頭。程式碼如下

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
    int addNumberHelper(ListNode *&head, ListNode *l1, ListNode *l2, int len1, int len2) {
        int val1 = 0, val2 = 0;
        int carry;
        ListNode *tmp = NULL;
        
        if (!l1 || !l2)
            return 0;
        
        if (len1 > len2) {
            carry = addNumberHelper(tmp, l1->next, l2, len1-1, len2);
            val1 = l1->val;
        } else {
            carry = addNumberHelper(tmp, l1->next, l2->next, len1-1, len2 - 1);
            val1 = l1->val;
            val2 = l2->val;
        }
        
        head = new ListNode();
        head->val = (val1 + val2 + carry) % 10;
        head->next = tmp;
        carry = (val1 + val2 + carry) / 10;
        return carry;
    }
    
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        int len1 = 0, len2 = 0, tmp_len;
        int carry;
        ListNode *tmp, *head = NULL;
        
        tmp = l1;
        while (tmp) {
            len1++;
            tmp = tmp->next;
        }
        
        tmp = l2;
        while (tmp) {
            len2++;
            tmp = tmp->next;
        }
        
        // let l1 be the longer list
        if (len2 > len1) {
            tmp = l1;
            l1 = l2;
            l2 = tmp;
            
            tmp_len = len1;
            len1 = len2;
            len2 = tmp_len;
            
        }
        
        carry = addNumberHelper(head, l1, l2, len1, len2);
        if (carry) {
            tmp = head;
            head = new ListNode(1);
            head->next = tmp;
        }
        return head;
    }
};
```
