---
sidebar_position: 3
title: Configuration
---

# Configuration

ArqonDB can be configured via command-line arguments, configuration files, or environment variables.

## Command-Line Arguments

```bash
cargo run --bin raft_engine -- <data_dir> <bind_address> [options]
```

| Argument | Description | Default |
|----------|-------------|---------|
| `data_dir` | Directory for WAL, SST files, and metadata | Required |
| `bind_address` | gRPC listen address | `0.0.0.0:7379` |

## Storage Engine

### Write-Ahead Log (WAL)

```toml
[wal]
enabled = true
sync_mode = "fsync"     # "fsync", "fdatasync", or "none"
max_file_size = "64MB"
```

### MemTable

```toml
[memtable]
write_buffer_size = "4MB"    # Flush threshold
max_write_buffers = 3        # Concurrent immutable memtables
```

### SST Files

```toml
[sst]
block_size = "4KB"
compression = "zstd"         # "zstd", "snappy", "lz4", or "none"
bloom_filter_bits = 10       # Bits per key for bloom filter
```

### Block Cache

```toml
[cache]
capacity = "256MB"
shard_bits = 4               # 16 shards for concurrent access
```

### Compaction

```toml
[compaction]
strategy = "leveled"
level0_file_num_trigger = 4
max_levels = 7
target_file_size = "64MB"
```

## Vector Index

```toml
[vector]
distance_metric = "cosine"   # "l2", "cosine", or "inner_product"
hnsw_m = 16                  # Max connections per layer
hnsw_ef_construction = 200   # Build-time search width
hnsw_ef_search = 50          # Query-time search width
```

### Quantization

```toml
[vector.quantization]
type = "pq"                  # "pq" (Product), "sq" (Scalar), or "none"
pq_subvectors = 8
pq_bits = 8
```

## Networking

### Gateway

```toml
[gateway]
grpc_port = 9379
http_port = 9380
redis_port = 6379
max_connections = 10000
```

### Raft

```toml
[raft]
heartbeat_interval = "150ms"
election_timeout_min = "300ms"
election_timeout_max = "500ms"
snapshot_interval = 10000     # Log entries between snapshots
```

## Cluster

```toml
[cluster]
node_id = 1
metadata_peers = ["10.0.0.1:7380", "10.0.0.2:7380", "10.0.0.3:7380"]
data_peers = ["10.0.0.1:7379", "10.0.0.2:7379", "10.0.0.3:7379"]
replication_factor = 3
```

## Environment Variables

All configuration options can be set via environment variables with the `ARQON_` prefix:

```bash
export ARQON_DATA_DIR=/var/lib/arqondb
export ARQON_GRPC_PORT=9379
export ARQON_REDIS_PORT=6379
export ARQON_WAL_SYNC_MODE=fsync
export ARQON_CACHE_CAPACITY=512MB
export ARQON_VECTOR_DISTANCE_METRIC=cosine
```
