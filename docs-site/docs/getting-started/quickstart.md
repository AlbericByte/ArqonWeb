---
sidebar_position: 2
title: Quick Start
---

# Quick Start

This guide walks you through storing and querying agent memory with ArqonDB in under 5 minutes.

## 1. Start ArqonDB

```bash
cargo run --bin raft_engine -- /tmp/arqondb 0.0.0.0:7379
```

## 2. Connect with Python

```python
from arqondb import Client

db = Client("localhost:9379")
```

## 3. Record Reasoning Steps

ArqonDB models agent reasoning as a **causal graph** — a directed acyclic graph (DAG) where each node is a step and edges capture causality.

```python
# Step 1: Agent observes something
observe = db.add_step(
    agent_id="agent-1",
    step_type="Observe",
    content="Market volatility increased 15%"
)

# Step 2: Agent thinks about it
think = db.add_step(
    agent_id="agent-1",
    step_type="Think",
    content="High volatility suggests reducing position sizes"
)

# Link: Observe → Think (causal relationship)
db.add_edge(
    src=observe,
    dst=think,
    edge_type="Triggers"
)

# Step 3: Agent acts
act = db.add_step(
    agent_id="agent-1",
    step_type="Act",
    content="Reduce all positions by 30%"
)

db.add_edge(
    src=think,
    dst=act,
    edge_type="Triggers"
)
```

## 4. Traverse the Reasoning Chain

```python
# Walk forward from the observation
chain = db.traverse(
    start=observe,
    direction="Forward",
    max_depth=10
)

for step in chain:
    print(f"[{step.step_type}] {step.content}")
# [Observe] Market volatility increased 15%
# [Think] High volatility suggests reducing position sizes
# [Act] Reduce all positions by 30%
```

## 5. Search Similar Past Reasoning

Attach vector embeddings to steps, then find similar reasoning chains:

```python
# Store a step with embedding
db.add_step(
    agent_id="agent-1",
    step_type="Think",
    content="Analyzing momentum signals...",
    embedding=embedding_vector  # list of floats
)

# Find similar past chains
similar = db.find_similar_chains(
    embedding=current_vector,
    k=5,
    max_depth=10
)
```

## 6. Fork and Explore

Create a branch to explore alternative strategies without affecting the main timeline:

```python
# Fork from current state
branch = db.fork(parent_id="main", snapshot_from=think)

# Try an alternative approach on the branch
db.add_step(
    agent_id="agent-1",
    step_type="Act",
    branch_id=branch,
    content="Hedge with options instead"
)

# If the branch strategy works, merge it back
db.merge_branch(branch)
```

## What's Next?

- [Causal Graph](/concepts/causal-graph) — Deep dive into reasoning traces
- [Temporal Graph](/concepts/temporal-graph) — Time-aware edges and point-in-time queries
- [State Branching](/concepts/state-branching) — Fork/merge semantics in detail
- [AgentStateService API](/api/agent-state-service) — Full API reference
