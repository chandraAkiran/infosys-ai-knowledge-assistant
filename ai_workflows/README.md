# AI Workflows

This directory contains the AI orchestration layer of the
Infosys AI Knowledge Assistant.

The workflow coordinates query classification, permission-aware
retrieval, enterprise tool selection, grounded answer generation,
citation construction, and answer validation.

## Workflow

```text
User Query
    |
    v
Query Classification
    |
    v
RBAC / Permission Check
    |
    v
Tool Selection
    |
    +----------------------+
    |                      |
    v                      v
RAG Retrieval          MCP Tool
    |                  (Incident Lookup)
    |                      |
    +----------+-----------+
               |
               v
Grounded Synthesis
               |
               v
Citation Construction
               |
               v
Answer Validation
               |
               v
Final Response