---
title: 124. Binary Tree Maximum Path Sum
date: 2021-02-15 21:48:03
tags: leetcode
---

## 題目
給一顆二元樹，找出一條路徑能得到最大的總和。

## 思路
對一個二元樹的節點可能做出的路徑有三種。
1. parent + left
2. parent + right
3. left + right

因此使用遞迴的方式找出這三種路徑的最大值。對 case 1 & 2 需要得知子節點能找出的路徑最大值，因此遞迴函式的回傳值為 max(0, cur_val, cur_val + left, cur_val + right)，代表四種情況
* 0 => 不取此點
* cur_val => 取此點
* cur_val + left => 取此點 ＋ left 子樹最大總和
* cur_val + right => 取此點 ＋ right 子樹最大總和

剩下 case 3 是 cur_val + left + right 與目前找到的 max sum 做比較。

```cpp
class Solution {
public:
    int max_sum = INT_MIN;
    
    int helper(TreeNode *root) {
        int max_val = 0;
        int left = 0, right = 0;
        int val;
        int ret;
        
        if (!root)
            return 0;
        
        val = root->val;
            
        left = helper(root->left);
        right = helper(root->right);
        
        max_sum = max(max_sum, val + left + right);
            
        ret = val;
        ret = max(ret, left + val);
        ret = max(ret, right + val);
        
        max_sum = max(max_sum, ret);
        
        ret = max(ret, 0);
        return ret;
    }
    
    int maxPathSum(TreeNode* root) {
        helper(root);
        
        return max_sum;
    }
};
```