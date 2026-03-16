---
sidebar_position: 1
title: Python
---

# Python SDK

Official Python client for ArqonDB. Requires Python 3.9+.

## Installation

```bash
pip install arqondb
```

## Quick Start

```python
from arqondb import Client

# Connect
db = Client("localhost:9379")

# Basic KV
db.put("key", b"value")
value = db.get("key")

# Agent memory
step = db.add_step(
    agent_id="agent-1",
    step_type="Think",
    content="Analyzing data..."
)
```

## Connection

```python
from arqondb import Client

# Single node
db = Client("localhost:9379")

# Cluster (multiple gateways)
db = Client(["10.0.0.1:9379", "10.0.0.2:9379", "10.0.0.3:9379"])

# With options
db = Client(
    "localhost:9379",
    timeout=5.0,           # Request timeout in seconds
    max_retries=3,         # Retry on transient failures
)
```

## Key-Value Operations

```python
# Put / Get / Delete
db.put("user:1", b'{"name": "Alice"}')
value = db.get("user:1")      # bytes or None
db.delete("user:1")

# Batch write
db.batch_write([
    ("key1", b"value1"),
    ("key2", b"value2"),
    ("key3", b"value3"),
])

# Scan
results = db.scan(start="user:", end="user:~", limit=100)
results = db.scan_prefix("user:", limit=100)

# TTL
db.put("session:abc", b"data", ttl=3600)
```

## Causal Graph

```python
# Add steps
observe = db.add_step(
    agent_id="agent-1",
    step_type="Observe",
    content="Market data received"
)

think = db.add_step(
    agent_id="agent-1",
    step_type="Think",
    content="Bullish pattern detected",
    embedding=[0.1, 0.2, 0.3, ...]  # Optional
)

# Add edges
db.add_edge(src=observe, dst=think, edge_type="Triggers")

# Traverse
chain = db.traverse(start=observe, direction="Forward", max_depth=10)
for step in chain:
    print(f"[{step.step_type}] {step.content}")
```

## Temporal Graph

```python
from datetime import datetime, timedelta

now = datetime.now()

# Temporal edge
db.add_temporal_edge(
    src=step_1,
    dst=step_2,
    edge_type="Informs",
    valid_from=now,
    valid_to=now + timedelta(hours=1)
)

# Point-in-time traversal
steps = db.traverse_at(
    start=step_1,
    ts=now + timedelta(minutes=30),
    direction="Forward",
    max_depth=5
)

# Edge history
history = db.edge_history(src=step_1, dst=step_2, edge_type="Informs")
```

## State Branching

```python
# Fork
branch = db.fork(parent_id="main", snapshot_from=step_1)

# Write on branch
db.branch_put(branch, "strategy", b"conservative")
db.add_step(
    agent_id="agent-1",
    step_type="Think",
    branch_id=branch,
    content="Testing conservative approach"
)

# Read (walks parent chain)
value = db.branch_get(branch, "strategy")

# Merge or discard
db.merge_branch(branch)
# db.discard_branch(branch)
```

## Vector Search

```python
# Find similar reasoning chains
chains = db.find_similar_chains(
    embedding=[0.1, 0.2, 0.3, ...],
    k=5,
    max_depth=10
)

for chain in chains:
    print(f"Score: {chain.score}")
    for step in chain.steps:
        print(f"  [{step.step_type}] {step.content}")

# Basic KNN
results = db.vector_search(
    embedding=[0.1, 0.2, 0.3, ...],
    k=10,
    metric="cosine"
)
```

## Reactive State

```python
# Compare-and-swap
value, seq = db.get_with_seq("state")
success = db.cas_put("state", b"new_value", expected_seq=seq)

# Watch
stream = db.watch_prefix("agent-1:")
for event in stream:
    print(f"{event.key} changed to {event.value}")
```

## Async Support

```python
import asyncio
from arqondb import AsyncClient

async def main():
    db = AsyncClient("localhost:9379")

    await db.put("key", b"value")
    value = await db.get("key")

    step = await db.add_step(
        agent_id="agent-1",
        step_type="Think",
        content="Analyzing..."
    )

asyncio.run(main())
```
