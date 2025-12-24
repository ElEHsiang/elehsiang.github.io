---
title: "Mailbox"
date: 2025-12-25
tags: ['code','baremetal']
description: " "
---

### 概述

這是一種常見的 Inter-Process Communication 或是 host-device 溝通機制。如同一次只能放一封信的郵箱。傳送者傳訊息後需等待接收者拿了資料才能傳下一筆，或是直接放棄。

傳輸的大小受限於 HW register size (ex. 32/64bits)，傳輸內容通常為命令或是狀態碼。
每次傳輸都是 interrupt 所以 CPU 需要花資源處理，不適合大量的傳輸。

### 硬體實現

在 Host（例如你的電腦 CPU）與 Device（例如 PCIe 介面的網卡或加速卡）之間，雖然物理上是分開的硬體，但在邏輯上，Host 可以透過 MMIO 看到 Device 的內部暫存器。
這意味著：Host 往某個特定的記憶體位址寫入數據，實際上就是寫進了 Device 的 Mailbox 暫存器中。

#### 運作流程：

1. 映射 (Mapping)： Device 透過 PCIe 的 BAR (Base Address Register) 告訴 Host：「我的 Mailbox 在這一段位址」。
2. 投遞 (Post)： Host CPU 執行寫入指令（例如 MOV [Address], Command），數據透過 PCIe 匯流排傳輸。
3. 接收 (Receive)： Device 內部的 Mailbox 硬體收到數據，並觸發 Device 內部的 MCU 或控制器的中斷。
