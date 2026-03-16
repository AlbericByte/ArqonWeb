---
sidebar_position: 2
title: Temporal Graph
---

# Temporal Graph

The Temporal Graph extends the [Causal Graph](/concepts/causal-graph) with **time-aware edges**. Every edge carries a validity interval `[valid_from, valid_to]`, enabling point-in-time queries, time-window traversals, and full edge version history.

## Concepts

### Validity Intervals

Each edge is valid during a specific time range:

```
[valid_from, valid_to]
```

- `valid_from` — When the relationship became active
- `valid_to` — When the relationship expired (or `None` if still active)

### Edge Versioning

When you update a temporal edge, ArqonDB keeps the full history. Each version has its own validity interval, forming an immutable audit trail.

## API

### Add a Temporal Edge

```python
from datetime import datetime, timedelta

t0 = datetime.now()
t1 = t0 + timedelta(hours=1)

db.add_temporal_edge(
    src=step_1,
    dst=step_2,
    edge_type="Informs",
    valid_from=t0,
    valid_to=t1
)
```

### Point-in-Time Traversal

Query the graph as it existed at a specific moment:

```python
# What was the reasoning state at this exact time?
steps = db.traverse_at(
    start=step_1,
    ts=datetime(2025, 3, 15, 10, 30),
    direction="Forward",
    max_depth=5
)
```

Only edges where `valid_from <= ts < valid_to` are followed.

### Time-Window Traversal

Traverse only edges active within a time range:

```python
# What happened during the trading session?
steps = db.traverse_in_window(
    start=step_1,
    window_start=session_open,
    window_end=session_close,
    direction="Forward",
    max_depth=10
)
```

### Expire an Edge

Soft-expire an edge without deleting it:

```python
db.expire_edge(
    src=step_1,
    dst=step_2,
    edge_type="Informs",
    expire_at=datetime.now()
)
```

The edge remains in history but is no longer traversed for queries after the expiry time.

### Edge History

Retrieve the full version history of an edge:

```python
history = db.edge_history(
    src=step_1,
    dst=step_2,
    edge_type="Informs"
)

for version in history:
    print(f"  {version.valid_from} → {version.valid_to}")
```

## Example: Time-Aware Agent Memory

```python
# Morning: agent observes market open
open_step = db.add_step(
    agent_id="trader",
    step_type="Observe",
    content="Market opened +0.5%"
)

# Morning analysis
morning_think = db.add_step(
    agent_id="trader",
    step_type="Think",
    content="Bullish opening, maintain positions"
)

db.add_temporal_edge(
    src=open_step,
    dst=morning_think,
    edge_type="Informs",
    valid_from=market_open,
    valid_to=noon
)

# Afternoon: new data invalidates morning analysis
afternoon_think = db.add_step(
    agent_id="trader",
    step_type="Think",
    content="Reversal detected, cut positions"
)

db.add_temporal_edge(
    src=open_step,
    dst=afternoon_think,
    edge_type="Informs",
    valid_from=noon,
    valid_to=market_close
)

# Query: what was the agent thinking at 10am?
state_10am = db.traverse_at(
    start=open_step,
    ts=datetime(2025, 3, 15, 10, 0),
    direction="Forward",
    max_depth=5
)
# → Returns morning_think (bullish)

# Query: what was the agent thinking at 2pm?
state_2pm = db.traverse_at(
    start=open_step,
    ts=datetime(2025, 3, 15, 14, 0),
    direction="Forward",
    max_depth=5
)
# → Returns afternoon_think (cut positions)
```

## Use Cases

- **Regulatory Compliance** — Reconstruct decision state at any historical point
- **Backtesting** — Replay agent reasoning with historical time constraints
- **Debugging** — Understand which relationships were active during a failure
- **Knowledge Decay** — Automatically expire stale relationships
