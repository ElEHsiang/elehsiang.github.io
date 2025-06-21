---
title: "Run linux on qemu-system-aarch64"
date: 2024-11-23
tags: ['linux','qemu']
description: ""
---
**以下測試環境為 Macbook pro 2014, OSX 10.15.6 運行 ubuntu 20.04 on parallels**

主要有三個部分要建立，分別是
* rootfs
* linux kernel
* qemu
  
先安裝些基本工具
```bash
sudo apt-get install build-essential gcc-aarch64-linux-gnu libncurses5-dev libssl-dev
```

## Rootfs

為了建立 rootfs，我選擇使用 [buildroot](https://buildroot.org/)，他可以快建立 embedded system 常用的東西 ex. rootfs, busybox.


先將 buildroot repo clone 下來
```bash
git clone git://git.buildroot.net/buildroot
```

接著利用 menuconfig 選則 config

```bash
make menuconfig
```

開啟下列選項

* Target options → Target Architecture → AArch64 little-endian
* Toolchain → Toolchain type → External toolchain → Linaro AArch64 2018.05
* System configuration →  Run a getty (login prompt) after boot → TTY port → ttyAMA0
* Filesystem images → cpio the root filesystem (for use as an initial RAM filesystem)

接著下 make 出 rootfs， build 出來的 image 會在 **output/images/rootfs.cpio**，記住這個路徑接下來會用到。

```bash
make
```

## Linux kernel

將 linux kernel 載回

```bash
git clone git://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git
```

先選擇要使用的 kernel config，config 位置在 arch/arm64/configs 底下，可先使用已有的 defconfig，對 kernel 較熟後可以再依需求開關。個人習慣建一個資料夾 out 放編譯出的東西，因此參數加上 O=out。要編譯的目標平台是 arm64，也須在 make 的參數中指定。

```bash
make O=out ARCH=arm64 defconfig
```

此時可以看到 out 資料夾下出現 .config，這就是從 defconfig 產生的完整 config 檔。

接著用 menuconfig 開啟必要的 config

```bash
make O=out ARCH=arm64 menuconfig
```

出現選單後可用 '/' 尋找 config 位置並開啟下面這幾個 config ，搜尋時輸入 COINFIG 名稱即可。 ex. 想開啟 CONFIG_PCI，搜尋時直接搜 "PCI"。接著設定 cmdline & init ramfs，cmdline 設 "console-ttyAMA0" 對應到 buildroot 編譯時選的 config，init ramfs 則是 buildroot 編出
的 output/images/rootfs.cpio。

```C
CONFIG_DEVTMPFS=y
CONFIG_DEVTMPFS_MOUNT=y

CONFIG_CMDLINE="console-ttyAMA0"
CONFIG_INITRAMFS_SOURCE="/home/yun/workspace/buildroot/output/images/rootfs.cpio"

CONFIG_PCI=y
CONFIG_VIRTIO_PCI=y
CONFIG_PCI_HOST_GENERIC=y
CONFIG_NET_9P=y
CONFIG_NET_9P_VIRTIO=y
CONFIG_NET_9P_DEBUG=y (Optional)
CONFIG_9P_FS=y
CONFIG_9P_FS_POSIX_ACL=y
```
將 config 存好後就下 make 編譯吧！記得指定 cross compile 的 compiler。編完可以看到 out 下產生很多檔案。
```
make O=out ARCH=arm64 CROSS_COMPILE=aarch64-linux-gnu-
```

## Qemu

Ｕbuntu 可以直接靠 apt-get 安裝。
```bash
sudo apt-get install qemu
```

### Launch qemu

用下面 command 啟動 qemu，記得將 kernel 位置改成你 build 出來的 image 路徑，路徑為 **out/arch/arm64/boot/Image**。

```bash
qemu-system-aarch64 \
        -machine virt,virtualization=true,gic-version=3 \
        -nographic \
        -m size=1024M \
        -cpu cortex-a57 \
        -smp 2 \
        -kernel /home/yun/workspace/linux/out/arch/arm64/boot/Image \
        --append "console=ttyAMA0"
```

linux 就被帶起來，login 時輸入 root 即可。
```
 [    0.000000] Booting Linux on physical CPU 0x0000000000 [0x411fd070]
[    0.000000] Linux version 5.9.0-mainline-dirty (yun@ubuntu) (aarch64-linux-gnu-gcc (Ubuntu 9.3.0-17ubuntu1~20.04) 9.3.0, GNU ld (GNU Binutils for Ubuntu) 2.34) #16 SMP PREEMPT Fri Dec 11 15:33:21 CST 2020
[    0.000000] Machine model: linux,dummy-virt
[    0.000000] efi: UEFI not found.
[    0.000000] cma: Reserved 16 MiB at 0x000000007f000000
[    0.000000] Zone ranges:
[    0.000000]   DMA      [mem 0x0000000040000000-0x000000007fffffff]
[    0.000000]   DMA32    empty
[    0.000000]   Normal   empty
[    0.000000] Movable zone start for each node
[    0.000000] Early memory node ranges
[    0.000000]   node   0: [mem 0x0000000040000000-0x000000007fffffff]
[    0.000000] Initmem setup node 0 [mem 0x0000000040000000-0x000000007fffffff]
...
Welcome to Buildroot
buildroot login: root
```

### Exit qemu

```bash
ctrl-A X
```

## Share Folder

使用 qemu 有時想 host/geust 可以共用資料夾。可以利用下面的 command 設定 (需要的 config 在一開始已經開啟)。fsdev 的 path 就是你想要共用的資料夾

```bash
qemu-system-aarch64 \
        -machine virt,virtualization=true,gic-version=3 \
        -nographic \
        -m size=1024M \
        -cpu cortex-a57 \
        -smp 2 \
        -kernel /home/yun/workspace/linux/out/arch/arm64/boot/Image \
        -fsdev local,security_model=passthrough,id=test_dev,path=/home/yun/workspace/qemu/share \
       -device virtio-9p-pci,id=fsdev0,fsdev=test_dev,mount_tag=test_mount \
        --append "console=ttyAMA0"
```

進入 guest OS 後將共用資料夾掛載起來即可。

```bash
mount -t 9p -o trans=virtio test_mount /mnt
```
