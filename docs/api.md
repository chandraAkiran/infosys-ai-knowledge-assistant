# API Documentation

## Production Backend

https://infosys-ai-knowledge-assistant-ifkw.onrender.com

## Swagger Documentation

https://infosys-ai-knowledge-assistant-ifkw.onrender.com/docs

## Authentication

### POST /auth/login

Authenticates a user and returns an access token.

### GET /users/me

Returns the authenticated user's information.

## Query

### POST /query

Runs the complete AI workflow including classification, permission handling, RAG retrieval, MCP tool selection, grounded synthesis, citations, and answer validation.

## Retrieval

### POST /retrieval/query

Performs document retrieval against the vector database.

## Documents

### POST /documents/upload

Uploads a supported document.

### POST /documents/{document_id}/index

Indexes an uploaded document into the vector database.

## Feedback

### POST /feedback

Stores user feedback.

## Analytics

### GET /analytics/overview

Returns analytics information available to the authenticated user.

## Administration

Administrative endpoints provide user management, connector management, governance, and audit-log functionality.

## Authentication Header

Authenticated requests use:

Authorization: Bearer <access_token>
