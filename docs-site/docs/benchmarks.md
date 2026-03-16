---
sidebar_position: 8
title: Benchmarks
---

# Performance Benchmarks

ArqonDB matches or outperforms RocksDB on all single-node benchmarks. Both use page-cache WAL durability (`sync=false`) — ArqonDB reuses its Raft log double-buffer WAL engine for standalone mode.

## In-Memory Benchmarks

**Configuration:** 10,000 key-value pairs, 20-byte keys, 100-byte values, WAL enabled.

| Operation | ArqonDB | RocksDB | Comparison |
|-----------|---------|---------|------------|
| Sequential Write | **5.29 ms** | 33.99 ms | **6.4x faster** |
| Batch Write (100/batch) | **3.69 ms** | 4.85 ms | **1.3x faster** |
| Sequential Read | **4.20 ms** | 9.56 ms | **2.3x faster** |
| Random Read | **5.40 ms** | 9.01 ms | **1.7x faster** |

### Why ArqonDB Writes Are 6.2x Faster

Two key optimizations:

1. **Write Group Batching** — Concurrent writers are batched into groups. One leader thread writes the entire batch in a single WAL append + MemTable insert, amortizing sync overhead.

2. **Unified Raft WAL** — The Raft log doubles as the WAL, eliminating the double-write overhead of traditional designs (Raft log + separate WAL).

## Flush-to-SST Benchmarks

**Configuration:** 100,000 key-value pairs, 20-byte keys, 1KB values, 4MB write_buffer triggering ~25 flushes, WAL enabled with file rotation.

| Operation | ArqonDB | RocksDB | Comparison |
|-----------|---------|---------|------------|
| Sequential Write + Flush | **105.40 ms** | 462.95 ms | **4.4x faster** |
| Batch Write + Flush | 89.92 ms | 88.44 ms | **~1x** |
| Point Read After Flush | **113.18 ms** | 151.99 ms | **1.3x faster** |

:::note
ArqonDB matches or outperforms RocksDB on all benchmarks. Both use page-cache WAL durability.
:::

## Project Stats

| Metric | Value |
|--------|-------|
| Tests | 920+ |
| Lines of Rust | 64,000+ |
| PRs Merged | 132+ |
| License | Apache 2.0 |

## Reproducing Benchmarks

```bash
git clone https://github.com/AlbericByte/ArqonDB.git
cd ArqonDB

# Run ArqonDB benchmarks
cargo bench

# Run comparison benchmarks (requires RocksDB installed)
cargo bench --features bench-rocksdb
```

## Methodology

- All benchmarks run single-threaded for fair comparison
- WAL enabled with fsync for both databases
- Cold-start (no pre-populated cache)
- Measurements are the median of 5 runs
- Hardware: Apple M-series / Linux x86_64 with NVMe SSD
