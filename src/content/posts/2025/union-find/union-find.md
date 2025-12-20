---
title: "Union find"
date: 2025-12-20
tags: ['code','algorithm']
description: " "
---

Disjoint-Set 是一種 forest 的結構，有許多不相連的樹。
尋找節點是否在同一樹中的演算法。

主要操作有兩個

- find
- union

假設有五個 node 0 ~ 4，每個人的源頭(parent)初始化都是自己。

## 找源頭

```python
def find(x):
	if x == parent[x]:
		return x
	return find(parent(x))
```

讓每個點都能直接連到源頭的最佳化 (path compression)

```python
def find(x):
	if x == parent[x]:
		return x
	parent[x] = find(parent[x])
	return parent[x]
```

## 相連

```python
def union(x, y):
	px = find(x)
	py = find(y)

	parent[px] = py
```

0 與 3 相連 => parent[0] = 3

3 與 4 相連 => parent[3] = 4

1 與 2 相連 => parent[1] = 2

問題: node 0 屬於哪個組

parent[0] = 3， parent[3] = 4，會找到 0 屬於 group 4

code:

```python
def is_union(x, y) -> bool:
	root_x = find(x)
	root_y = find(y)

	if root_x == root_y:
		return True
	else:
		return False
```
