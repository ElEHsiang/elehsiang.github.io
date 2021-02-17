---
title: 128. Longest Consecutive Sequence
date: 2021-02-17 20:24:03
tags: leetcode
---

## 題目
給定一個數列找出可組成的連續數列有多長。

## 思路
先將數列由小到大排序，並再掃一次找最長連續數列長度。

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        int max_len = 1;
        int cur_len = 1;
        
        if (nums.empty())
            return 0;
        
        sort(nums.begin(), nums.end());
        
        for (int i = 1; i < nums.size(); i++) {
            // same as previous, ignore
            if (nums[i] - nums[i - 1] == 0) {
                continue;
            }else if (nums[i] - nums[i - 1] == 1) {
                cur_len++;
            } else {
                cur_len = 1;
            }
            
            max_len = max(max_len, cur_len);
        }
        
        return max_len;
    }
};
```