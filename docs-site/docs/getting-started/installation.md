---
sidebar_position: 1
title: Installation
---

# Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Python (recommended)

Install the Python SDK directly via pip — no build tools, no protobuf compilation required:

```bash
pip install arqondb
```

That's it. The package includes the gRPC client and all dependencies. You're ready to connect:

```python
from arqondb import ArqonDBClient

client = ArqonDBClient("127.0.0.1:7379")
client.put(b"hello", b"world")
print(client.get(b"hello"))  # b"world"
```

> **Requires Python 3.9+.** See the [Python SDK](/sdks/python) page for the full API.

---

## Server Installation

To run ArqonDB itself, you can build from source or use Docker.

### Build from Source

**Prerequisites:** Rust 1.85+ (`rustup update stable`). `protoc` is **not required** — a prebuilt binary is bundled.

```bash
# Clone the repository
git clone https://github.com/AlbericByte/ArqonDB.git
cd ArqonDB

# Build all binaries (metadata, data node, gateway)
cargo build --release --features data-node
```

### Docker

```bash
# Pull and run
docker pull arqondb/arqondb:latest
docker run -d -p 9379:9379 -p 6379:6379 arqondb/arqondb:latest
```

---

## Other Client SDKs

<Tabs>
  <TabItem value="rust" label="Rust" default>

```bash
cargo add arqondb
```

  </TabItem>
  <TabItem value="go" label="Go">

```bash
go get arqondb
```

  </TabItem>
  <TabItem value="java" label="Java">

```xml
<dependency>
    <groupId>io.arqon</groupId>
    <artifactId>arqondb</artifactId>
</dependency>
```

  </TabItem>
  <TabItem value="cpp" label="C++">

```bash
vcpkg install arqondb
```

  </TabItem>
</Tabs>

## Verify Installation

```bash
# Start a single data node
cargo run --features data-node --bin raft_engine -- /tmp/arqondb 0.0.0.0:7379

# Test with Python SDK
python3 -c "
from arqondb import ArqonDBClient
client = ArqonDBClient('127.0.0.1:7379')
print(client.ping())  # PONG
client.close()
"

# Or test with redis-cli
redis-cli -p 6379 PING
# → PONG

redis-cli -p 6379 SET hello "world"
# → OK

redis-cli -p 6379 GET hello
# → "world"
```

## Next Steps

- [Quick Start](/getting-started/quickstart) — Build your first agent memory
- [Configuration](/getting-started/configuration) — Tune ArqonDB for your workload
