---
title: '105. Construct Binary Tree from Preorder and Inorder Traversal'
date: 2021-02-10 13:29:41
tags:
---

## 題目
給定 predorder & inorder traverse 樹的的結果，重建這棵樹。

## 思路
回憶一下 preorder & inorder 是如何做，兩者都是 DFS 的 traverse 方式。
* Preorder: root->left->right
* Inorder: left->root->right

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
    
    TreeNode* buildTree(vector<int>& preorder, int pLeft, int pRight, vector<int>& inorder, int iLeft, int iRight) {
        TreeNode *n;
        int pivot;
        int val;
        
        if (pLeft > pRight || iLeft > iRight)
            return NULL;
        
        val = preorder[pLeft];
        n = new TreeNode(preorder[pLeft]);
        
        for (int i = iLeft; i <= iRight; i++) {
            if (inorder[i] == val) {
                pivot = i;
                break;
            }
        }
        
        n->left = buildTree(preorder, pLeft + 1, pLeft + pivot - iLeft, inorder, iLeft, pivot - 1);
        n->right = buildTree(preorder, pLeft + pivot - iLeft + 1, pRight, inorder, pivot + 1, iRight);
            
        return n;
    }
    
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {

        return buildTree(preorder, 0, preorder.size() - 1, inorder, 0, inorder.size() - 1);
    }
};
```

## Reference
[Tree Traversals](https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/)