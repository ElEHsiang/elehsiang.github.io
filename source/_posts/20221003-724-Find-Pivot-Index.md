---
title: 724. Find Pivot Index
date: 2022-10-03 22:10:41
tags: leetcode
---

## 題目
找一個 index 左邊加總相等於右邊加總

## 思路
先算出總值，接著從左邊開始一個個相加計算 left_sum。
如果 left_sum = total_sum - nums[i] - left_sum, 則 i 即是 pivot index。

Constraints 如下  
`1 <= nums.length <= 10^4`  
`-1000 <= nums[i] <= 1000`

最大為 10^7，小於 int 範圍因此能用此方法

```cpp
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        if (nums.size() == 1)
            return 0;
        if (nums.size() == 0)
            return -1;

        int sum = 0;
        int lsum = 0;
        for (int x: nums)
            sum += x;

        for (int i = 0; i < nums.size(); i++) {
            if (sum - lsum - nums[i] == lsum)
                return i;

            lsum += nums[i];
        }

        return -1;
    }
};
```