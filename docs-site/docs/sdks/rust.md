---
sidebar_position: 2
title: Rust
---

# Rust SDK

Official Rust client for ArqonDB. Requires Rust 1.70+.

## Installation

```toml
[dependencies]
arqondb = "0.1"
tokio = { version = "1", features = ["full"] }
```

## Quick Start

```rust
use arqondb::Client;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let db = Client::connect("localhost:9379").await?;

    // Basic KV
    db.put("key", b"value").await?;
    let value = db.get("key").await?;

    // Agent memory
    let step = db.add_step("agent-1", "Think", "Analyzing data...").await?;

    Ok(())
}
```

## Connection

```rust
use arqondb::{Client, ClientConfig};

// Single node
let db = Client::connect("localhost:9379").await?;

// Cluster
let db = Client::connect_cluster(&[
    "10.0.0.1:9379",
    "10.0.0.2:9379",
    "10.0.0.3:9379",
]).await?;

// With options
let config = ClientConfig::builder()
    .timeout(Duration::from_secs(5))
    .max_retries(3)
    .build();
let db = Client::connect_with_config("localhost:9379", config).await?;
```

## Key-Value Operations

```rust
// Put / Get / Delete
db.put("user:1", br#"{"name": "Alice"}"#).await?;
let value: Option<Vec<u8>> = db.get("user:1").await?;
db.delete("user:1").await?;

// Batch write
db.batch_write(&[
    ("key1", b"value1"),
    ("key2", b"value2"),
    ("key3", b"value3"),
]).await?;

// Scan
let results = db.scan("user:", "user:~", 100).await?;
let results = db.scan_prefix("user:", 100).await?;

// TTL
db.put_with_ttl("session:abc", b"data", Duration::from_secs(3600)).await?;
```

## Causal Graph

```rust
use arqondb::{StepType, EdgeType, Direction};

// Add steps
let observe = db.add_step("agent-1", StepType::Observe, "Market data received").await?;
let think = db.add_step_with_embedding(
    "agent-1",
    StepType::Think,
    "Bullish pattern detected",
    &[0.1, 0.2, 0.3],
).await?;

// Add edges
db.add_edge(&observe, &think, EdgeType::Triggers).await?;

// Traverse
let chain = db.traverse(&observe, Direction::Forward, 10).await?;
for step in chain {
    println!("[{}] {}", step.step_type, step.content);
}
```

## Vector Search

```rust
// Find similar chains
let chains = db.find_similar_chains(&embedding, 5, 10).await?;

for chain in chains {
    println!("Score: {}", chain.score);
    for step in chain.steps {
        println!("  [{}] {}", step.step_type, step.content);
    }
}
```

## State Branching

```rust
// Fork
let branch = db.fork("main", Some(&step_id)).await?;

// Write on branch
db.branch_put(&branch, "strategy", b"conservative").await?;

// Merge
db.merge_branch(&branch).await?;
```

## Reactive State

```rust
use futures::StreamExt;

// Compare-and-swap
let (value, seq) = db.get_with_seq("state").await?;
let success = db.cas_put("state", b"new_value", seq).await?;

// Watch
let mut stream = db.watch_prefix("agent-1:").await?;
while let Some(event) = stream.next().await {
    println!("{} changed", event.key);
}
```
