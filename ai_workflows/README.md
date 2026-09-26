# AI Workflows

This directory contains the AI orchestration layer of the
Infosys AI Knowledge Assistant.

## Workflow

User Query
    ↓
Query Classification
    ↓
RBAC / Permission Check
    ↓
Tool Selection
    ↓
RAG Retrieval / MCP Tool
    ↓
Grounded Synthesis
    ↓
Citation Construction
    ↓
Answer Validation
    ↓
Final Response

## Modules

### query_classification
Determines query intent and employee access permissions.

### tool_selection
Determines which enterprise knowledge source/tool should be used.

### rag_retrieval
Retrieves relevant document chunks from the vector database.

### grounded_synthesis
Uses Gemini to generate an answer using only retrieved evidence.

### citation_builder
Defines structured citations and builds the context passed to the LLM.

### answer_validation
Performs post-generation validation and insufficient-context checks.

### workflow.py
Orchestrates the complete AI workflow.

## Security

The workflow must never bypass backend authorization.
Permission filtering is applied before retrieved evidence
is passed to the synthesis layer.

## Current Tool Support

RAG is currently implemented.

MCP connector routing is reserved through the tool-selection
layer and will be integrated when backend connector services
are available.