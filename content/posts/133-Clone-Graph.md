---
title: 133 Clone Graph
subtitle:
date: 2024-11-23T16:06:15+08:00
slug: b9cab74
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
給一個 graph 做 deepcopy。

## 思路
複製 graph 需要走過每個 node 並建立一個相同副本，因此要做兩件事
1. 紀錄已建立的 node
2. 紀錄已走訪的 node

此次使用 set 紀錄以走訪的 node，並用 vector 紀錄已建出的 node。演算法流程如下
1. 走訪 node
2. 確認 node 是否已走訪過，已走訪過就 return
3. 建立此 node 的 neighbors
4. 將此 node 加入已走訪的 vector
5. 走訪每一個 neighbor (回到 2.)

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};
*/

class Solution {
public:
    set<Node *> visited;
    vector<Node *> created;
    
    Node *findNode(int val) {
        auto it = find_if(created.begin(), created.end(), [val] (const Node *n) {return n->val == val;});
        if (it == created.end())
            return nullptr;
        
        return *it;
    }
    
    Node *createNode(int val) {
        Node *n = new Node(val);
        
        created.push_back(n);
        
        return n;
    }
    
    Node *helper(Node *node) {
        Node *n;
        
        if (node == nullptr)
            return nullptr;
        
        n = findNode(node->val);
        
        if (visited.find(n) != visited.end())
            return n;
        
        if (n == nullptr) {
            n = createNode(node->val);
        } 
        
        for (auto it : node->neighbors) {
                Node *v = findNode(it->val);
                if (v == nullptr) {
                    v = createNode(it->val);
                }
                n->neighbors.push_back(v);
        }
        
        visited.insert(n);
        
        for (auto it : node->neighbors) {
            helper(it);
        }
        
        return n;
    }
    
    Node* cloneGraph(Node* node) {
        Node *start;
        
        start = helper(node);
        
        return start;
    }
};
```
