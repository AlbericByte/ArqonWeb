---
sidebar_position: 1
title: Causal Graph
---

# Causal Graph

The Causal Graph is ArqonDB's core primitive for recording AI agent reasoning. It models decision-making as a **directed acyclic graph (DAG)** where each node is a reasoning step and each edge captures a causal relationship.

## Step Types

Every node in the graph has one of five types:

| Step Type | Purpose | Example |
|-----------|---------|---------|
| **Observe** | External data ingestion | "Market volatility increased 15%" |
| **Think** | Internal reasoning | "High volatility suggests reducing positions" |
| **Act** | Action taken | "Reduce all positions by 30%" |
| **Tool** | Tool invocation | "Called risk_calculator(portfolio)" |
| **Result** | Outcome recorded | "P&L: -2.3% drawdown avoided" |

## Edge Types

Edges between steps are semantically typed:

| Edge Type | Meaning |
|-----------|---------|
| **Triggers** | Step A directly caused Step B |
| **Informs** | Step A provided context for Step B |
| **Branches** | Step A led to a fork in reasoning |
| **Merges** | Step A is a merge point from multiple branches |

## Creating Steps and Edges

```python
from arqondb import Client

db = Client("localhost:9379")

# Create steps
observe = db.add_step(
    agent_id="agent-1",
    step_type="Observe",
    content="Received earnings report for AAPL"
)

think = db.add_step(
    agent_id="agent-1",
    step_type="Think",
    content="Earnings beat estimates by 12%, bullish signal"
)

act = db.add_step(
    agent_id="agent-1",
    step_type="Act",
    content="Buy 100 shares AAPL at market"
)

# Create causal edges
db.add_edge(src=observe, dst=think, edge_type="Triggers")
db.add_edge(src=think, dst=act, edge_type="Triggers")
```

This creates the graph:

```
[Observe] Earnings report
    │ Triggers
    ▼
[Think] Bullish signal
    │ Triggers
    ▼
[Act] Buy AAPL
```

## Traversal

Walk the graph in any direction with BFS:

```python
# Forward traversal: follow effects
effects = db.traverse(
    start=observe,
    direction="Forward",
    max_depth=10
)

# Backward traversal: find root causes
causes = db.traverse(
    start=act,
    direction="Backward",
    max_depth=10
)

# Both directions: full connected subgraph
context = db.traverse(
    start=think,
    direction="Both",
    max_depth=5
)
```

## Attaching Embeddings

Steps can carry vector embeddings for similarity search:

```python
step = db.add_step(
    agent_id="agent-1",
    step_type="Think",
    content="Momentum reversal detected",
    embedding=[0.12, -0.34, 0.56, ...]  # float vector
)
```

See [Vector Search](/concepts/vector-search) for finding similar reasoning chains.

## Use Cases

- **Audit Trails** — Trace any action back to its root observations
- **Explainability** — Show why an agent made a specific decision
- **Debugging** — Find where reasoning went wrong by walking the graph
- **Learning** — Compare successful vs. failed reasoning patterns
