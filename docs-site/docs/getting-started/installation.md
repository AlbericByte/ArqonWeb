---
sidebar_position: 1
title: Installation
---

# Installation

ArqonDB is written in Rust. You can build from source, run with Docker, or deploy on Kubernetes.

## Prerequisites

- **Rust** 1.70+ (for building from source)
- **Docker** (optional, for containerized deployment)

## Build from Source

```bash
# Clone the repository
git clone https://github.com/AlbericByte/ArqonDB.git
cd ArqonDB

# Build the data node
cargo build --release --features data-node
```

## Docker

```bash
# Pull and run
docker pull arqondb/arqondb:latest
docker run -d -p 9379:9379 -p 6379:6379 arqondb/arqondb:latest
```

## Install Client SDKs

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="python" label="Python" default>

```bash
pip install arqondb
```

  </TabItem>
  <TabItem value="rust" label="Rust">

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
# Start a single node
cargo run --bin raft_engine -- /tmp/arqondb 0.0.0.0:7379

# Test with redis-cli
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
