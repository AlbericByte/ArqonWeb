---
sidebar_position: 4
title: Java
---

# Java SDK

Official Java client for ArqonDB. Requires Java 17+.

## Installation

### Maven

```xml
<dependency>
    <groupId>io.arqon</groupId>
    <artifactId>arqondb</artifactId>
    <version>0.1.0</version>
</dependency>
```

### Gradle

```groovy
implementation 'io.arqon:arqondb:0.1.0'
```

## Quick Start

```java
import io.arqon.ArqonClient;

public class Main {
    public static void main(String[] args) {
        var db = ArqonClient.connect("localhost:9379");

        // Basic KV
        db.put("key", "value".getBytes());
        byte[] value = db.get("key");

        // Agent memory
        String stepId = db.addStep("agent-1", StepType.THINK, "Analyzing data...");
        System.out.println("Step: " + stepId);
    }
}
```

## Key-Value Operations

```java
// Put / Get / Delete
db.put("user:1", "{\"name\": \"Alice\"}".getBytes());
byte[] value = db.get("user:1");
db.delete("user:1");

// Batch write
db.batchWrite(List.of(
    new KVPair("key1", "value1".getBytes()),
    new KVPair("key2", "value2".getBytes())
));

// Scan
List<KVPair> results = db.scanPrefix("user:", 100);
for (KVPair kv : results) {
    System.out.printf("%s = %s%n", kv.key(), new String(kv.value()));
}
```

## Causal Graph

```java
// Add steps
String observe = db.addStep("agent-1", StepType.OBSERVE, "Market data received");
String think = db.addStep("agent-1", StepType.THINK, "Bullish signal");

// Add edge
db.addEdge(observe, think, EdgeType.TRIGGERS);

// Traverse
List<Step> chain = db.traverse(observe, Direction.FORWARD, 10);
for (Step step : chain) {
    System.out.printf("[%s] %s%n", step.stepType(), step.content());
}
```

## Vector Search

```java
float[] embedding = {0.1f, 0.2f, 0.3f};

List<ChainResult> chains = db.findSimilarChains(embedding, 5, 10);
for (ChainResult chain : chains) {
    System.out.printf("Score: %f%n", chain.score());
    for (Step step : chain.steps()) {
        System.out.printf("  [%s] %s%n", step.stepType(), step.content());
    }
}
```

## State Branching

```java
// Fork
String branch = db.fork("main", stepId);

// Write on branch
db.branchPut(branch, "strategy", "conservative".getBytes());

// Merge
db.mergeBranch(branch);
```

## Reactive State

```java
// Compare-and-swap
var result = db.getWithSeq("state");
boolean success = db.casPut("state", "new_value".getBytes(), result.seq());

// Watch
db.watchPrefix("agent-1:", event -> {
    System.out.printf("%s changed to %s%n", event.key(), new String(event.value()));
});
```
