---
layout: post
title: "用 ebpf 在 android 追蹤 syscall open 檔案"
author: "Yun"
categories: journal
tags: [android, ebpf]
---


在 Arm64 上 syscall open 並不存在，而是使用 syscall openat。
一開始利用 ebpf attach sys_enter_openat，發現每次利用 bpf_probe_read_str 取得 filename 時都回傳 -EFAULT (bad address)。
```C
SYSCALL_DEFINE4(openat, int, dfd, const char __user *, filename, int, flags,                                                                          
                umode_t, mode)
{
        if (force_o_largefile())
                flags |= O_LARGEFILE;

        return do_sys_open(dfd, filename, flags, mode);
}
```

因此懷疑是否無法取得 user space memory。
bpf_probe_read_str 會 disable page fault 才進行 copy from user。 可能因 user space memory 在 page table 找不到對應 page 無法存取。
```C
long strncpy_from_unsafe(char *dst, const void *unsafe_addr, long count)
{	
		...
        pagefault_disable();

        do {
                ret = __get_user(*dst++, (const char __user __force *)src++);
        } while (dst[-1] && ret == 0 && src - unsafe_addr < count);

        dst[-1] = '\0';
        pagefault_enable();
		...
}     
```

從 openat 的 call flow 可看到在呼叫 **do_filp_open** 時已經做完 copy_from_user 拿到 filename，想取得開啟的檔案可以 hook 在 **do_filp_open**。取得 file name 後可用 bpf_trace_printk 打出，不過要注意 bpf_trace_printk 能印的參數有限。 code 如下
```c
struct filename {
	const char *name;
}
struct pt_regs {
	u64 regs[31];
};
SEC("kprobe/do_filp_open")
int kprobe_do_filp_open(struct pt_regs *ctx)
{
#define BUF_LEN 256
	char *filename;
	char buf[BUF_LEN + 1];

	bpf_probe_read(&filename, sizeof(filename), ctx->args[1]);
	bpf_probe_read_str(buf, sizeof(buf), filename);
	// file name is stored in buf
}
```

將 bulid 好的 object file 放到 system/etc/bpf 下，android 在開機時會自動 load，可從 /sys/fs/bpf/ 查看有哪些 bpf program & map。  
也可用 logcat 看 LibBpfLoader bpf program load 是否成功。  
當我們想使用 bpf program 時可用 android libbpf 的 bpf_attach_kprobe attach。

example.

```c
// prototype
int bpf_attach_kprobe(int progfd, enum bpf_probe_attach_type attach_type,
                      const char *ev_name, const char *fn_name, uint64_t fn_offset)

// example
int ret = bpf_attach_kprobe(mProgFd, BPF_PROBE_ENTRY, "", "do_filp_open", 0);
```
bpf_attach_kprobe 的參數
* progfd: fd
* attach_type: BPF_PROBE_ENTRY / BPF_PROBE_RETURN
* ev_name: 影響 /sys/kernel/tracing/events/kprobes/ 出現的名稱
* fn_name: 要 hook 的 function
* fn_offset: function offset

### Kprobe usage

單純使用 kprobe 取得 do_filp_open 的檔案名稱。

echo "p:myprobe do_filp_open filename=+0(+0(%x1)):string" > /sys/kernel/tracing/kprobe_events

echo 1 > /sys/kernel/tracing/events/kprobes/myprobe/enable

### 參考連結

[https://stackoverflow.com/questions/55762129/kprobe-events-fetch-args-works-for-x86-but-not-arm64](https://stackoverflow.com/questions/55762129/kprobe-events-fetch-args-works-for-x86-but-not-arm64)

[https://lists.linuxfoundation.org/pipermail/iovisor-dev/2017-September/001035.html](https://lists.linuxfoundation.org/pipermail/iovisor-dev/2017-September/001035.html)

[https://source.android.com/devices/architecture/kernel/bpf#attaching_programs_to_tracepoints_and_kprobes](https://source.android.com/devices/architecture/kernel/bpf#attaching_programs_to_tracepoints_and_kprobes)