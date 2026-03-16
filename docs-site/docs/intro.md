---
slug: /
sidebar_position: 1
title: Introduction
---

# ArqonDB

**The Memory Database for AI Agents.**

ArqonDB is an open-source distributed key-value database written in Rust, purpose-built as a memory database for AI agents and LLM applications. It combines an LSM-tree storage engine with HNSW vector similarity search, causal reasoning graphs, temporal graphs, agent state forking, Raft distributed consensus, and Redis protocol compatibility.

## Why ArqonDB?

Traditional databases treat AI agent state as an afterthought — shoehorning reasoning traces into relational tables or document stores. ArqonDB is built from scratch to give agents **persistent, explainable, searchable memory**.

- **Causal Graph** — Record every reasoning step as a DAG with typed nodes and edges
- **Temporal Graph** — Time-aware edges with validity intervals and point-in-time traversal
- **State Branching** — Fork/merge with copy-on-write overlays for exploring alternate paths
- **Vector Search** — Built-in HNSW index for similarity search across reasoning chains
- **Reactive State** — Compare-and-swap with watch notifications for real-time coordination
- **Distributed KV** — Sharded storage with Raft consensus, gRPC API, and Redis compatibility

## Key Numbers

| Metric | Value |
|--------|-------|
| Sequential Write vs RocksDB | **6.4x faster** |
| Sequential Read vs RocksDB | **2.3x faster** |
| Tests | 920+ |
| Lines of Rust | 64,000+ |
| PRs Merged | 132+ |
| License | Apache 2.0 |

## Quick Example

```python
from arqondb import Client

# Connect to ArqonDB cluster
db = Client("localhost:9379")

# Store agent reasoning step
db.add_step(
    agent_id="agent-1",
    step_type="Think",
    content="Analyzing market signals..."
)

# Find similar past reasoning
similar = db.find_similar_chains(embedding, k=5)
```

## Next Steps

- [Installation](/getting-started/installation) — Build from source or run with Docker
- [Quick Start](/getting-started/quickstart) — Your first agent memory in 5 minutes
- [Core Concepts](/concepts/causal-graph) — Understand causal graphs, temporal edges, and branching
- [API Reference](/api/agent-state-service) — Full AgentStateService API
