---
title: 102 Binary Tree Level Order Traversal
subtitle:
date: 2024-11-23T16:06:15+08:00
slug: f1956c0
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
給一顆二元樹，將每個層 (樹高) 的值存入 vector<vector\<int>> 中。

ex.

      3
    9   20
變成

    [
        [3],
        [9, 20]
    ]


## 思路
對樹做完一層再下一層的操作可以使用 queue。
1. 將第一層的 node 推入 queue 中
2. 處理一層的 node (數量為 queue.size()) 並同時將下一層的 node 推入尾端
   
重複 2 直到 queue 裡沒節點。

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
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> ans;
        deque<TreeNode *> queue;
        
        if (!root)
            return ans;
        
        queue.push_back(root);
        while (queue.size()) {
            int size = queue.size();
            vector<int> levelQueue;

            for (int i = 0; i < size; i++) {
                TreeNode *p = queue.front();
                queue.pop_front();
                
                levelQueue.push_back(p->val);
                
                if (p->left)
                    queue.push_back(p->left);
                if (p->right)
                    queue.push_back(p->right);
            }
            ans.push_back(levelQueue);
        }
        
        return ans;
    }
};
```
