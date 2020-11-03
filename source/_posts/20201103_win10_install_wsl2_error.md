---
title: win10 安裝 WSL2 遇到錯誤 0xc03a001a
date: 2020-11-03 23:42:16
tags: windows
---

# WSL2 安裝步驟

[Windows 10 上適用於 Linux 的 Windows 子系統安裝指南](https://docs.microsoft.com/zh-tw/windows/wsl/install-win10)

# 問題
安裝步驟都照 windows 官方文件，並選擇了 ubuntu 20.04。當開啟 WSL2 時卻出現此錯誤訊息。

`WslRegisterDistribution failed with error: 0xc03a001a`

經過查詢進行了以下兩點操作後成功開啟 WSL2
1. 開啟虛擬化功能
2. 關閉 wsl2 的資料夾壓縮

## 開啟虛擬化功能

首先要進入 BIOS，我的主機板是 B360M BAZOOKA，重啟電腦後按 del 進入 BIOS 介面。 接著選擇專業模式後在 Overclocking -> CPU Feature 可以找到這兩個選項，並將他們啟用。
* Intel Virtualization Tech
* Intel VT-D Tech

## 關閉 wsl2 的資料夾壓縮

WSL2 會存放在 **C:\Users\\{User name}\AppData\Local\Packages** 底下。我安裝的是 ubuntu 20.04 所以搜尋 ubuntu 可找到 `CanonicalGroupLimited.Ubuntu20.04onWindows…`。 對他點選右鍵 -> 內容 -> 進階， 將罪魁禍首 `壓縮內容，節省磁碟空間` 取消。 在開啟 WSL2 就能正常運作了。


Reference:
* https://github.com/microsoft/WSL/issues/4299
* https://utf9k.net/blog/wsl2-vhd-issue/
