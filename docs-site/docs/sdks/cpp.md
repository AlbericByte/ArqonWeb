---
sidebar_position: 5
title: C++
---

# C++ SDK

Official C++ client for ArqonDB. Requires C++17 or later.

## Installation

### vcpkg

```bash
vcpkg install arqondb
```

### CMake

```cmake
find_package(arqondb REQUIRED)
target_link_libraries(myapp PRIVATE arqondb::arqondb)
```

## Quick Start

```cpp
#include <arqondb/client.h>
#include <iostream>

int main() {
    auto db = arqondb::Client::connect("localhost:9379");

    // Basic KV
    db->put("key", "value");
    auto value = db->get("key");
    std::cout << value.value_or("not found") << std::endl;

    // Agent memory
    auto step_id = db->add_step("agent-1", arqondb::StepType::Think, "Analyzing data...");
    std::cout << "Step: " << step_id << std::endl;

    return 0;
}
```

## Key-Value Operations

```cpp
// Put / Get / Delete
db->put("user:1", R"({"name": "Alice"})");
auto value = db->get("user:1");  // std::optional<std::string>
db->del("user:1");

// Batch write
db->batch_write({
    {"key1", "value1"},
    {"key2", "value2"},
    {"key3", "value3"},
});

// Scan
auto results = db->scan_prefix("user:", 100);
for (const auto& [key, val] : results) {
    std::cout << key << " = " << val << std::endl;
}
```

## Causal Graph

```cpp
// Add steps
auto observe = db->add_step("agent-1", arqondb::StepType::Observe, "Market data received");
auto think = db->add_step("agent-1", arqondb::StepType::Think, "Bullish signal");

// Add edge
db->add_edge(observe, think, arqondb::EdgeType::Triggers);

// Traverse
auto chain = db->traverse(observe, arqondb::Direction::Forward, 10);
for (const auto& step : chain) {
    std::cout << "[" << step.step_type << "] " << step.content << std::endl;
}
```

## Vector Search

```cpp
std::vector<float> embedding = {0.1f, 0.2f, 0.3f};

auto chains = db->find_similar_chains(embedding, 5, 10);
for (const auto& chain : chains) {
    std::cout << "Score: " << chain.score << std::endl;
    for (const auto& step : chain.steps) {
        std::cout << "  [" << step.step_type << "] " << step.content << std::endl;
    }
}
```

## State Branching

```cpp
// Fork
auto branch = db->fork("main", step_id);

// Write on branch
db->branch_put(branch, "strategy", "conservative");

// Merge
db->merge_branch(branch);
```

## Reactive State

```cpp
// Compare-and-swap
auto [value, seq] = db->get_with_seq("state");
bool success = db->cas_put("state", "new_value", seq);

// Watch
db->watch_prefix("agent-1:", [](const arqondb::WatchEvent& event) {
    std::cout << event.key << " changed" << std::endl;
});
```
