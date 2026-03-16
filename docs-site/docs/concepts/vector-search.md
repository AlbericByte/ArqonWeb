---
sidebar_position: 4
title: Vector Search
---

# Vector Search

ArqonDB includes a built-in **HNSW** (Hierarchical Navigable Small World) vector index for similarity search. Attach vector embeddings to reasoning steps, then find similar past reasoning chains across your agent's history.

## Distance Metrics

| Metric | Use Case |
|--------|----------|
| **L2** (Euclidean) | General-purpose distance |
| **Cosine** | Normalized text/sentence embeddings |
| **Inner Product** | Recommendation, dot-product similarity |

## Indexing

### Attach Embeddings to Steps

```python
step = db.add_step(
    agent_id="agent-1",
    step_type="Think",
    content="Momentum reversal detected in tech sector",
    embedding=[0.12, -0.34, 0.56, 0.78, ...]  # float vector
)
```

### Standalone Vector Insert

```python
db.vector_put(
    key="pattern-001",
    embedding=[0.12, -0.34, 0.56, ...],
    metadata={"symbol": "AAPL", "date": "2025-03-15"}
)
```

## Querying

### Find Similar Reasoning Chains

The key primitive for agent memory — find past reasoning chains similar to the current context:

```python
chains = db.find_similar_chains(
    embedding=current_vector,
    k=5,              # Return top 5 matches
    max_depth=10       # BFS depth for chain assembly
)

for chain in chains:
    print(f"Similarity: {chain.score}")
    for step in chain.steps:
        print(f"  [{step.step_type}] {step.content}")
```

This works in two phases:
1. **KNN Search** — Find the K nearest reasoning steps by vector similarity
2. **Chain Assembly** — BFS from each anchor step to reconstruct the full reasoning chain

### Basic KNN Search

```python
results = db.vector_search(
    embedding=query_vector,
    k=10,
    metric="cosine"
)

for result in results:
    print(f"Key: {result.key}, Distance: {result.distance}")
```

## Quantization

For large-scale deployments, ArqonDB supports quantization to reduce memory usage:

### Product Quantization (PQ)

Splits vectors into subvectors and quantizes each independently:

```toml
[vector.quantization]
type = "pq"
pq_subvectors = 8
pq_bits = 8           # 256 centroids per subvector
```

### Scalar Quantization (SQ8)

Maps each float dimension to an 8-bit integer:

```toml
[vector.quantization]
type = "sq"
```

### IVF Variants

Inverted file index combined with quantization for billion-scale search:

- **IVF-PQ** — Partitioned search with product quantization
- **IVF-SQ** — Partitioned search with scalar quantization

## Distributed Search

In a multi-node cluster, vector search fans out to all data nodes and merges results:

```
Client → Gateway → [Node 1, Node 2, Node 3]
                         ↓
                    K-way merge for global top-k
```

Each node runs local HNSW search, then results are merged at the gateway level to produce globally correct top-k results.

## Configuration

```toml
[vector]
distance_metric = "cosine"
hnsw_m = 16                  # Connections per layer (higher = better recall, more memory)
hnsw_ef_construction = 200   # Build-time beam width (higher = better index quality)
hnsw_ef_search = 50          # Query-time beam width (higher = better recall, slower)
```

### Tuning Guidelines

| Parameter | Low Value | High Value |
|-----------|-----------|------------|
| `hnsw_m` | Less memory, lower recall | More memory, higher recall |
| `hnsw_ef_construction` | Faster build, lower quality | Slower build, higher quality |
| `hnsw_ef_search` | Faster query, lower recall | Slower query, higher recall |
