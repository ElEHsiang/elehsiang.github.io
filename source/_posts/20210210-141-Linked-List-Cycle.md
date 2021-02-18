---
title: 141. Linked List Cycle
date: 2021-02-18 21:22:48
tags: leetcode
---

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
