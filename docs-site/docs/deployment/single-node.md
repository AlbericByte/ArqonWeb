---
sidebar_position: 1
title: Single Node
---

# Single Node Deployment

The simplest way to run ArqonDB — ideal for development and testing.

## Build

```bash
git clone https://github.com/AlbericByte/ArqonDB.git
cd ArqonDB
cargo build --release --features data-node
```

## Run

```bash
cargo run --bin raft_engine -- /tmp/arqondb 0.0.0.0:7379
```

| Parameter | Description |
|-----------|-------------|
| `/tmp/arqondb` | Data directory for WAL, SST files, metadata |
| `0.0.0.0:7379` | gRPC bind address |

## Ports

Once running, the following ports are available:

| Port | Protocol | Description |
|------|----------|-------------|
| 7379 | gRPC | Data node internal |
| 9379 | gRPC | Client API |
| 9380 | HTTP | REST API & management console |
| 6379 | Redis | RESP2 compatible |

## Verify

```bash
# Test Redis protocol
redis-cli -p 6379 PING
# → PONG

# Test KV operations
redis-cli -p 6379 SET hello "world"
redis-cli -p 6379 GET hello
# → "world"

# Test with Python SDK
python3 -c "
from arqondb import Client
db = Client('localhost:9379')
db.put('test', b'hello')
print(db.get('test'))
"
```

## Data Directory Structure

```
/tmp/arqondb/
├── wal/              # Write-ahead log files
├── sst/              # Sorted String Table files
├── meta/             # Raft metadata and snapshots
└── vector/           # HNSW vector index files
```

## macOS: Run as Background Service

Create a launchd plist to run ArqonDB as a background service:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>io.arqondb.server</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/raft_engine</string>
        <string>/var/lib/arqondb</string>
        <string>0.0.0.0:7379</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/var/log/arqondb/stdout.log</string>
    <key>StandardErrorPath</key>
    <string>/var/log/arqondb/stderr.log</string>
</dict>
</plist>
```

```bash
# Install
cp io.arqondb.server.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/io.arqondb.server.plist

# Check status
launchctl list | grep arqondb
```

:::caution
Single node mode has no replication. Use [Docker](/deployment/docker) or [Kubernetes](/deployment/kubernetes) for production deployments with fault tolerance.
:::
