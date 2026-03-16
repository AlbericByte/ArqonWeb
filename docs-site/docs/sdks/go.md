---
sidebar_position: 3
title: Go
---

# Go SDK

Official Go client for ArqonDB. Requires Go 1.21+.

## Installation

```bash
go get arqondb
```

## Quick Start

```go
package main

import (
    "context"
    "fmt"
    "log"

    "arqondb"
)

func main() {
    ctx := context.Background()

    db, err := arqondb.Connect(ctx, "localhost:9379")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    // Basic KV
    db.Put(ctx, "key", []byte("value"))
    value, _ := db.Get(ctx, "key")
    fmt.Println(string(value))

    // Agent memory
    stepID, _ := db.AddStep(ctx, "agent-1", arqondb.Think, "Analyzing data...")
    fmt.Println("Step:", stepID)
}
```

## Key-Value Operations

```go
// Put / Get / Delete
db.Put(ctx, "user:1", []byte(`{"name": "Alice"}`))
value, err := db.Get(ctx, "user:1")
db.Delete(ctx, "user:1")

// Batch write
db.BatchWrite(ctx, []arqondb.KVPair{
    {Key: "key1", Value: []byte("value1")},
    {Key: "key2", Value: []byte("value2")},
})

// Scan
results, _ := db.ScanPrefix(ctx, "user:", 100)
for _, kv := range results {
    fmt.Printf("%s = %s\n", kv.Key, kv.Value)
}
```

## Causal Graph

```go
// Add steps
observe, _ := db.AddStep(ctx, "agent-1", arqondb.Observe, "Market data received")
think, _ := db.AddStep(ctx, "agent-1", arqondb.Think, "Bullish signal")

// Add edge
db.AddEdge(ctx, observe, think, arqondb.Triggers)

// Traverse
chain, _ := db.Traverse(ctx, observe, arqondb.Forward, 10)
for _, step := range chain {
    fmt.Printf("[%s] %s\n", step.StepType, step.Content)
}
```

## Vector Search

```go
// Find similar chains
chains, _ := db.FindSimilarChains(ctx, embedding, 5, 10)
for _, chain := range chains {
    fmt.Printf("Score: %f\n", chain.Score)
    for _, step := range chain.Steps {
        fmt.Printf("  [%s] %s\n", step.StepType, step.Content)
    }
}
```

## State Branching

```go
// Fork
branch, _ := db.Fork(ctx, "main", &stepID)

// Write on branch
db.BranchPut(ctx, branch, "strategy", []byte("conservative"))

// Merge
db.MergeBranch(ctx, branch)
```

## Reactive State

```go
// Compare-and-swap
value, seq, _ := db.GetWithSeq(ctx, "state")
success, _ := db.CASPut(ctx, "state", []byte("new_value"), seq)

// Watch
ch, _ := db.WatchPrefix(ctx, "agent-1:")
for event := range ch {
    fmt.Printf("%s changed to %s\n", event.Key, event.Value)
}
```
