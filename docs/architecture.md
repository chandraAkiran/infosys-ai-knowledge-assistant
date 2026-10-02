# Architecture

## Overview

The Infosys AI Knowledge Assistant is a full-stack enterprise knowledge assistant built around document retrieval, grounded generation, citations, role-based access control, and enterprise tool integration.

## High-Level Architecture

```text
User
  |
  v
Next.js Frontend
  |
  v
FastAPI Backend
  |
  +--> Authentication
  |
  +--> AI Workflow
  |      +--> Query Classification
  |      +--> RBAC Check
  |      +--> Tool Selection
  |      +--> RAG Retrieval
  |      +--> MCP Incident Lookup
  |      +--> Grounded Synthesis
  |      +--> Citation Builder
  |      +--> Answer Validation
  |
  +--> PostgreSQL
  |
  +--> Chroma Vector Database
  |
  +--> Enterprise Connectors
