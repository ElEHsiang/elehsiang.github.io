---
title: 8. Validate Binary Search Tree
date: 2021-02-01 00:52:08
tags: leetcode
---

## 題目
檢查一棵樹是否為二元搜尋樹，二元搜尋樹的條件為對任一節點右方的任何節點都會大於自己，位於左方的任何節點都會小於自己。

## 思路
由於是樹狀結構我們可以用遞迴方式檢查每個節點 ，判斷的條件為此節點的值是否在可允許的區間內。每往下一層檢查，如果檢查的是右方節點則區間最小值要更新，如果檢查的是左方節點則要更新允許區間的最大值。  
ex. 以此例看，root 節點允許區間是 (LLONG_MIN, LLONG_MAX)。往右方檢查節點 3 時允許區間變為 (2, LLONG_MAX)。往左方檢查節點 1 時允許區間為 (LLONG_MIN, 2)。

       2  
    1     3

要注意的是 INT_MIN/INT_MAX 也是可能出現的值所以要用 LLONG_MIN/LLONG_MAX 當起始條件判斷。

程式碼：
```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    
    bool helper(TreeNode* root, long min, long max) {
        bool isValid = true;
        
        if (!root)
            return true;
        
        if (root->val <= min || root->val >= max)
            return false;
        
        if (root->left)
            isValid &= helper(root->left, min, root->val);
        
        if (root->right)
            isValid &= helper(root->right, root->val, max);
        
        return isValid;
    }
    
    bool isValidBST(TreeNode* root) {
        return helper(root, LLONG_MIN, LLONG_MAX);  
    }
};
```